using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Tiles;

namespace WolfDen.Game
{
    public class NormalCaptureBehaviour : IBehaviour
    {
        public string Class { get { return GetType().Name; } }
        public string Id { get; set; }
        public Unit Unit { get; set; }
        public int BaseCaptureStrength { get; set; }
        public int CaptureCompletion { get; set; }
        public int CaptureProgress { get; set; }
        public IMoveBehaviour MoveBehaviour { get; set; }
        public IHealth HealthStats { get; set; }
        public Game Game { get; set; }

        public NormalCaptureBehaviour(Game game, Unit unit, int baseCaptureStrength, int captureCompletion, IMoveBehaviour moveBehaviour, IHealth healthStats)
        {
            Unit = unit;
            BaseCaptureStrength = baseCaptureStrength;
            CaptureCompletion = captureCompletion;
            MoveBehaviour = moveBehaviour;
            HealthStats = healthStats;
            Game = game;
            MoveBehaviour.MoveEvent += (sender, args) =>
            {
                CaptureProgress = 0;
            };
        }

        public bool ExecuteMove(dynamic data)
        {
            try
            {
                if (MoveBehaviour.ExecuteMove(data.moveCommand as object))
                {
                    var building = Unit.Node as Building;
                    if (building == null || building.Owner == Unit.Owner)
                        return false;
                    CaptureProgress += (int)Math.Floor(HealthStats.CurrentHealth / (float)HealthStats.MaxHealth * BaseCaptureStrength);
                    if (CaptureProgress >= CaptureCompletion)
                    {
                        var previousOwner = building.Owner;
                        building.Owner = Unit.Owner;
                        building.RaiseBuildingCaptureEvent(previousOwner, Unit.Owner);
                    }
                    return true;
                }
                return false;
            }
            catch (Exception exception)
            {
                return false;
            }
        }

        public void Destroy()
        {
        }
    }
}
