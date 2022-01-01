using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Factories;
using WolfDen.Game.Templates;

namespace WolfDen.Game.Tiles
{
    public class ProducingBuildingListing
    {
        public string Class { get { return GetType().Name; } }
        public string Id { get; set; }
        public UnitTemplate UnitTemplate { get; set; }
        public int Cost { get; }
        public string Name { get; }
        public string ShopImage { get; }

        public ProducingBuildingListing(string id, UnitTemplate unitTemplate, int cost, string name, string shopImage)
        {
            Id = id;
            UnitTemplate = unitTemplate;
            Cost = cost;
            Name = name;
            ShopImage = shopImage;
        }

        public ProducingBuildingListing(string id, UnitTemplateFactory factory, string name, int cost) : this(id, factory.GetUnitTemplate(name), cost, name, string.Format("{0}.png", name))
        {

        }
    }
}