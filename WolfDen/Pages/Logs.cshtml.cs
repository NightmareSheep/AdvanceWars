using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;

namespace WolfDen.Pages
{
    public class LogsModel : PageModel
    {
        public string[] Logs { get; set; }

        public void OnGet()
        {
            Logs = Directory.GetFiles("wwwroot/logs").Select(f => Path.GetFileName(f)).ToArray();
        }
    }
}