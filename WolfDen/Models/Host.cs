using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Models
{
    public class Host
    {
        [Required]
        [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$")]
        public string Name { get; set; }
        public int MapId { get; set; }
        public bool FFA { get; set; }
    }
}
