using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Models
{
    public class ClientError
    {
        public string Message { get; set; }
        public string Url { get; set; }
        public string LineNumber { get; set; }
        public string Stack { get; set; }
    }
}
