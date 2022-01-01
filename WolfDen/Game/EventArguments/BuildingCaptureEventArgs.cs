using WolfDen.Game;

namespace WolfDen.Game.EventArguments
{
    public class BuildingCaptureEventArgs
    {
        public AdvanceWarsPlayer PreviousOwner;
        public AdvanceWarsPlayer NewOwner;

        public BuildingCaptureEventArgs(AdvanceWarsPlayer previousOwner, AdvanceWarsPlayer newOwner)
        {
            PreviousOwner = previousOwner;
            NewOwner = newOwner;
        }
    }
}