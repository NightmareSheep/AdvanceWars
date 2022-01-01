using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            return "Base get";
        }

        [HttpGet("GetMap")]
        public async Task<ActionResult<string>> GetMap()
        {
            return "without map id";
        }


        [HttpGet("GetMap/{mapId}")]
        public async Task<ActionResult<string>> GetMap(string mapId)
        {
            return "with map id";
        }

        [Route("/api/map/{mapId}")]
        [HttpGet]
        public async Task<ActionResult<string>> GetMap2(string mapId)
        {
            return "full route";
        }
    }
}
