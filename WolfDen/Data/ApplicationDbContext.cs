using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WolfDen.Models;
using WolfDen.Models.SaveAndLoad;
using WolfDen.Other;

namespace WolfDen.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Map> Maps { get; set; }
        public DbSet<PlayerColor> PlayerColor { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var seed = new Seed();
            foreach (var map in seed.Maps)
            {
                builder.Entity<Tile>().HasData(map.Tiles);
                map.Tiles = null;
            }
            builder.Entity<Map>().HasData(seed.Maps);
            builder.Entity<PlayerColor>().HasData(seed.Colors);
        }
    }
}
