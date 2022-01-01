using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Factories
{
    public class CoFactory
    {
        private Dictionary<BuildingType, Dictionary<string, ProducingBuildingListing>> GetStandardListings(Game game, TurnResolver turnResolver)
        {
            var unitFactory = new UnitTemplateFactory();
            var listings = new Dictionary<BuildingType, Dictionary<string, ProducingBuildingListing>>();

            // Factory
            var listingList = new List<ProducingBuildingListing>() {
                new ProducingBuildingListing("Infantry", unitFactory.GetInfantryTemplate(), 1000, "Infantry", "Infantry.png"),
                new ProducingBuildingListing("Mech", unitFactory.GetMechTemplate(), 3000, "Mech", "Mech.png"),
                new ProducingBuildingListing("Recon", unitFactory.GetReconTemplate(), 4000, "Recon", "Recon.png"),
                new ProducingBuildingListing("AntiAir", unitFactory, "AntiAir", 8000),
                new ProducingBuildingListing("Tank", unitFactory, "Tank", 7000),
                new ProducingBuildingListing("MediumTank", unitFactory, "MediumTank", 16000),
                new ProducingBuildingListing("Artillery", unitFactory, "Artillery", 6000),
                new ProducingBuildingListing("Rockets", unitFactory, "Rockets", 15000),
                new ProducingBuildingListing("APC", unitFactory, "APC", 5000),
                new ProducingBuildingListing("NeoTank", unitFactory, "NeoTank", 22000),
            };
            var factoryListings = new Dictionary<string, ProducingBuildingListing>();
            foreach (var listing in listingList)
                factoryListings.Add(listing.Id, listing);
            listings.Add(BuildingType.factory, factoryListings);

            // Airfield
            var airfieldUnits = new List<ProducingBuildingListing>() {
                new ProducingBuildingListing("Fighter", unitFactory, "Fighter", 20000),
                new ProducingBuildingListing("Bomber", unitFactory, "Bomber", 22000),
                new ProducingBuildingListing("Copter", unitFactory, "Copter", 9000),
                new ProducingBuildingListing("TransportCopter", unitFactory.GetUnitTemplate("TransportCopter"), 5000, "Transport Copter", "TransportCopter.png"),
            };
            var airfieldUnitsAndIds = new Dictionary<string, ProducingBuildingListing>();
            foreach (var unit in airfieldUnits)
                airfieldUnitsAndIds.Add(unit.Id, unit);
            listings.Add(BuildingType.airfield, airfieldUnitsAndIds);

            // Shipyard
            var shipyardUnits = new List<ProducingBuildingListing>() {
                new ProducingBuildingListing("Battleship", unitFactory, "Battleship", 28000),
                new ProducingBuildingListing("Cruiser", unitFactory, "Cruiser", 18000),
                new ProducingBuildingListing("Lander", unitFactory, "Lander", 7000),
                new ProducingBuildingListing("Sub", unitFactory, "Sub", 14000),
            };
            var shipyardUnitsAndIds = new Dictionary<string, ProducingBuildingListing>();
            foreach (var unit in shipyardUnits)
                shipyardUnitsAndIds.Add(unit.Id, unit);
            listings.Add(BuildingType.shipyard, shipyardUnitsAndIds);

            return listings;
        }

        public CO GetAndy(Game game, TurnResolver turnResolver)
        {
            return new CO("Andy", 100, 100) { Listings = GetStandardListings(game, turnResolver) };
        }

        public CO getMax(Game game, TurnResolver turnResolver)
        {
            return new CO("Max", 100, 100) { Listings = GetStandardListings(game, turnResolver) };
        }

        public CO Andy { get { return new CO("Andy", 100, 100); } }

        public CO GetCO(string name, Game game, TurnResolver turnResolver)
        {
            switch (name)
            {
                case "Andy":
                    return GetAndy(game, turnResolver);
                case "Max":
                    return getMax(game, turnResolver);
                case "Sami":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Nell":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Eagle":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Drake":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Jess":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Olaf":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Grit":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Colin":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Kanbei":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Sonja":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Sensei":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Sturm":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Hawke":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Lash":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Adder":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Flak":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                case "Hachi":
                    return new CO(name, 100, 100) { Listings = GetStandardListings(game, turnResolver) };
                default:
                    return GetAndy(game, turnResolver);
            }
        }
    }
}
