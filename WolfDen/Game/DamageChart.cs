using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WolfDen.Game
{
    public class DamageChart
    {
        private static DamageChart _instance;
        public static DamageChart Instance => _instance ?? (_instance = new DamageChart());

        public string Class { get { return GetType().Name; } }
        public Dictionary<UnitType, Dictionary<UnitType, int>> DmgChart { get; set; }

        public DamageChart()
        {
            DmgChart = new Dictionary<UnitType, Dictionary<UnitType, int>>();

            // Infantry
            var unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 55);
            unitChart.Add(UnitType.Mech, 45);
            unitChart.Add(UnitType.Recon, 12);
            unitChart.Add(UnitType.Tank, 5);
            unitChart.Add(UnitType.MediumTank, 1);
            unitChart.Add(UnitType.APC, 14);
            unitChart.Add(UnitType.Artillery, 15);
            unitChart.Add(UnitType.Rockets, 25);
            unitChart.Add(UnitType.AntiAir, 5);
            unitChart.Add(UnitType.Missiles, 25);
            unitChart.Add(UnitType.NeoTank, 1);
            unitChart.Add(UnitType.Copter, 7);
            unitChart.Add(UnitType.TransportCopter, 7);
            unitChart.Add(UnitType.DestructablePipe, 1);
            DmgChart.Add(UnitType.Infantry, unitChart);

            // Mech
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 65);
            unitChart.Add(UnitType.Mech, 55);
            unitChart.Add(UnitType.Recon, 85);
            unitChart.Add(UnitType.Tank, 55);
            unitChart.Add(UnitType.MediumTank, 15);
            unitChart.Add(UnitType.APC, 75);
            unitChart.Add(UnitType.Artillery, 70);
            unitChart.Add(UnitType.Rockets, 85);
            unitChart.Add(UnitType.AntiAir, 65);
            unitChart.Add(UnitType.Missiles, 85);
            unitChart.Add(UnitType.NeoTank, 15);
            unitChart.Add(UnitType.Copter, 9);
            unitChart.Add(UnitType.TransportCopter, 35);
            unitChart.Add(UnitType.DestructablePipe, 15);
            DmgChart.Add(UnitType.Mech, unitChart);

            // recon
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 70);
            unitChart.Add(UnitType.Mech, 65);
            unitChart.Add(UnitType.Recon, 35);
            unitChart.Add(UnitType.Tank, 6);
            unitChart.Add(UnitType.MediumTank, 1);
            unitChart.Add(UnitType.APC, 45);
            unitChart.Add(UnitType.Artillery, 45);
            unitChart.Add(UnitType.Rockets, 55);
            unitChart.Add(UnitType.AntiAir, 4);
            unitChart.Add(UnitType.Missiles, 28);
            unitChart.Add(UnitType.NeoTank, 1);
            unitChart.Add(UnitType.Copter, 10);
            unitChart.Add(UnitType.TransportCopter, 35);
            unitChart.Add(UnitType.DestructablePipe, 1);
            DmgChart.Add(UnitType.Recon, unitChart);

            // Tank
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 75);
            unitChart.Add(UnitType.Mech, 70);
            unitChart.Add(UnitType.Recon, 85);
            unitChart.Add(UnitType.Tank, 55);
            unitChart.Add(UnitType.MediumTank, 15);
            unitChart.Add(UnitType.APC, 75);
            unitChart.Add(UnitType.Artillery, 70);
            unitChart.Add(UnitType.Rockets, 85);
            unitChart.Add(UnitType.AntiAir, 65);
            unitChart.Add(UnitType.Missiles, 85);
            unitChart.Add(UnitType.NeoTank, 15);
            unitChart.Add(UnitType.Copter, 10);
            unitChart.Add(UnitType.TransportCopter, 40);
            unitChart.Add(UnitType.Lander, 10);
            unitChart.Add(UnitType.Cruiser, 1);
            unitChart.Add(UnitType.Sub, 1);
            unitChart.Add(UnitType.Battleship, 1);
            unitChart.Add(UnitType.DestructablePipe, 15);
            DmgChart.Add(UnitType.Tank, unitChart);

            // Medium tank
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 105);
            unitChart.Add(UnitType.Mech, 95);
            unitChart.Add(UnitType.Recon, 105);
            unitChart.Add(UnitType.Tank, 85);
            unitChart.Add(UnitType.MediumTank, 55);
            unitChart.Add(UnitType.APC, 105);
            unitChart.Add(UnitType.Artillery, 105);
            unitChart.Add(UnitType.Rockets, 105);
            unitChart.Add(UnitType.AntiAir, 105);
            unitChart.Add(UnitType.Missiles, 105);
            unitChart.Add(UnitType.NeoTank, 45);
            unitChart.Add(UnitType.Copter, 12);
            unitChart.Add(UnitType.TransportCopter, 45);
            unitChart.Add(UnitType.Lander, 35);
            unitChart.Add(UnitType.Cruiser, 45);
            unitChart.Add(UnitType.Sub, 10);
            unitChart.Add(UnitType.Battleship, 10);
            unitChart.Add(UnitType.DestructablePipe, 55);
            DmgChart.Add(UnitType.MediumTank, unitChart);

            // NeoTank
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 125);
            unitChart.Add(UnitType.Mech, 115);
            unitChart.Add(UnitType.Recon, 125);
            unitChart.Add(UnitType.Tank, 105);
            unitChart.Add(UnitType.MediumTank, 75);
            unitChart.Add(UnitType.NeoTank, 55);
            unitChart.Add(UnitType.APC, 125);
            unitChart.Add(UnitType.Artillery, 115);
            unitChart.Add(UnitType.Rockets, 125);
            unitChart.Add(UnitType.AntiAir, 115);
            unitChart.Add(UnitType.Missiles, 125);
            unitChart.Add(UnitType.Copter, 22);
            unitChart.Add(UnitType.TransportCopter, 55);
            unitChart.Add(UnitType.Lander, 40);
            unitChart.Add(UnitType.Cruiser, 50);
            unitChart.Add(UnitType.Sub, 15);
            unitChart.Add(UnitType.Battleship, 10);
            unitChart.Add(UnitType.DestructablePipe, 75);
            DmgChart.Add(UnitType.NeoTank, unitChart);

            // Artillery
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 90);
            unitChart.Add(UnitType.Mech, 85);
            unitChart.Add(UnitType.Recon, 80);
            unitChart.Add(UnitType.Tank, 70);
            unitChart.Add(UnitType.MediumTank, 45);
            unitChart.Add(UnitType.APC, 70);
            unitChart.Add(UnitType.Artillery, 75);
            unitChart.Add(UnitType.Rockets, 80);
            unitChart.Add(UnitType.AntiAir, 75);
            unitChart.Add(UnitType.Missiles, 80);
            unitChart.Add(UnitType.NeoTank, 40);
            unitChart.Add(UnitType.Lander, 55);
            unitChart.Add(UnitType.Cruiser, 65);
            unitChart.Add(UnitType.Sub, 60);
            unitChart.Add(UnitType.Battleship, 40);
            unitChart.Add(UnitType.DestructablePipe, 45);
            DmgChart.Add(UnitType.Artillery, unitChart);

            // Rockets
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 95);
            unitChart.Add(UnitType.Mech, 90);
            unitChart.Add(UnitType.Recon, 90);
            unitChart.Add(UnitType.Tank, 80);
            unitChart.Add(UnitType.MediumTank, 55);
            unitChart.Add(UnitType.APC, 80);
            unitChart.Add(UnitType.Artillery, 80);
            unitChart.Add(UnitType.Rockets, 85);
            unitChart.Add(UnitType.AntiAir, 85);
            unitChart.Add(UnitType.Missiles, 90);
            unitChart.Add(UnitType.NeoTank, 50);
            unitChart.Add(UnitType.Lander, 60);
            unitChart.Add(UnitType.Cruiser, 85);
            unitChart.Add(UnitType.Sub, 85);
            unitChart.Add(UnitType.Battleship, 55);
            unitChart.Add(UnitType.DestructablePipe, 55);
            DmgChart.Add(UnitType.Rockets, unitChart);

            // Anti air
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 105);
            unitChart.Add(UnitType.Mech, 105);
            unitChart.Add(UnitType.Recon, 60);
            unitChart.Add(UnitType.Tank, 25);
            unitChart.Add(UnitType.MediumTank, 10);
            unitChart.Add(UnitType.APC, 50);
            unitChart.Add(UnitType.Artillery, 50);
            unitChart.Add(UnitType.Rockets, 55);
            unitChart.Add(UnitType.AntiAir, 45);
            unitChart.Add(UnitType.Missiles, 55);
            unitChart.Add(UnitType.Fighter, 65);
            unitChart.Add(UnitType.NeoTank, 5);
            unitChart.Add(UnitType.Copter, 120);
            unitChart.Add(UnitType.TransportCopter, 120);
            unitChart.Add(UnitType.Bomber, 75);
            unitChart.Add(UnitType.DestructablePipe, 10);
            DmgChart.Add(UnitType.AntiAir, unitChart);

            // Missiles
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Copter, 120);
            unitChart.Add(UnitType.TransportCopter, 120);
            unitChart.Add(UnitType.Fighter, 100);
            unitChart.Add(UnitType.Bomber, 100);
            DmgChart.Add(UnitType.Missiles, unitChart);

            // Copter
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 75);
            unitChart.Add(UnitType.Mech, 75);
            unitChart.Add(UnitType.Recon, 55);
            unitChart.Add(UnitType.Tank, 55);
            unitChart.Add(UnitType.MediumTank, 25);
            unitChart.Add(UnitType.NeoTank, 20);
            unitChart.Add(UnitType.APC, 60);
            unitChart.Add(UnitType.Artillery, 65);
            unitChart.Add(UnitType.Rockets, 65);
            unitChart.Add(UnitType.AntiAir, 25);
            unitChart.Add(UnitType.Missiles, 65);
            unitChart.Add(UnitType.Copter, 65);
            unitChart.Add(UnitType.TransportCopter, 95);
            unitChart.Add(UnitType.Lander, 25);
            unitChart.Add(UnitType.Cruiser, 55);
            unitChart.Add(UnitType.Sub, 25);
            unitChart.Add(UnitType.Battleship, 25);
            unitChart.Add(UnitType.DestructablePipe, 25);
            DmgChart.Add(UnitType.Copter, unitChart);



            // Fighter
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Copter, 100);
            unitChart.Add(UnitType.TransportCopter, 100);
            unitChart.Add(UnitType.Fighter, 55);
            unitChart.Add(UnitType.Bomber, 100);
            DmgChart.Add(UnitType.Fighter, unitChart);

            // Bomber
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 110);
            unitChart.Add(UnitType.Mech, 110);
            unitChart.Add(UnitType.Recon, 105);
            unitChart.Add(UnitType.Tank, 105);
            unitChart.Add(UnitType.MediumTank, 95);
            unitChart.Add(UnitType.NeoTank, 90);
            unitChart.Add(UnitType.APC, 105);
            unitChart.Add(UnitType.Artillery, 105);
            unitChart.Add(UnitType.Rockets, 105);
            unitChart.Add(UnitType.AntiAir, 95);
            unitChart.Add(UnitType.Missiles, 105);
            unitChart.Add(UnitType.Lander, 95);
            unitChart.Add(UnitType.Cruiser, 85);
            unitChart.Add(UnitType.Sub, 95);
            unitChart.Add(UnitType.Battleship, 75);
            unitChart.Add(UnitType.DestructablePipe, 95);
            DmgChart.Add(UnitType.Bomber, unitChart);

            // Cruiser
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Bomber, 65);
            unitChart.Add(UnitType.Fighter, 55);
            unitChart.Add(UnitType.TransportCopter, 115);
            unitChart.Add(UnitType.Copter, 115);
            unitChart.Add(UnitType.Sub, 90);
            DmgChart.Add(UnitType.Cruiser, unitChart);

            // Sub
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Lander, 95);
            unitChart.Add(UnitType.Cruiser, 25);
            unitChart.Add(UnitType.Sub, 55);
            unitChart.Add(UnitType.Battleship, 55);
            DmgChart.Add(UnitType.Sub, unitChart);

            // Battleship
            unitChart = new Dictionary<UnitType, int>();
            unitChart.Add(UnitType.Infantry, 95);
            unitChart.Add(UnitType.Mech, 90);
            unitChart.Add(UnitType.Recon, 90);
            unitChart.Add(UnitType.Tank, 85);
            unitChart.Add(UnitType.MediumTank, 55);
            unitChart.Add(UnitType.NeoTank, 50);
            unitChart.Add(UnitType.APC, 80);
            unitChart.Add(UnitType.Artillery, 80);
            unitChart.Add(UnitType.Rockets, 85);
            unitChart.Add(UnitType.AntiAir, 85);
            unitChart.Add(UnitType.Missiles, 90);
            unitChart.Add(UnitType.Lander, 95);
            unitChart.Add(UnitType.Cruiser, 95);
            unitChart.Add(UnitType.Sub, 95);
            unitChart.Add(UnitType.Battleship, 50);
            unitChart.Add(UnitType.DestructablePipe, 55);
            DmgChart.Add(UnitType.Battleship, unitChart);


        }

        public int BaseDamage(UnitType attacker, UnitType defender)
        {
            if (DmgChart.ContainsKey(attacker) && DmgChart[attacker].ContainsKey(defender))
                return DmgChart[attacker][defender];
            return 0;
        }
    }
}
