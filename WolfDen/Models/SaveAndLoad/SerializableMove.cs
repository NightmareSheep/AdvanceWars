using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Models.SaveAndLoad
{
    [Serializable]
    public class SerializableMove
    {
        public string UserId { get; set; }
        public string Data { get; set; }
    }
}
