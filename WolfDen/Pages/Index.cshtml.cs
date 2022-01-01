using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using WolfDen.Services;
using WolfDen.Models.SaveAndLoad;

namespace WolfDen.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly ISerializationService _serializationService;

        public IndexModel(ILogger<IndexModel> logger, ISerializationService serializationService)
        {
            _logger = logger;
            _serializationService = serializationService;
        }

        public void OnGet()
        {

        }
    }
}
