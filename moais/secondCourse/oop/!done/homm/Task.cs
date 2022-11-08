using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance.MapObjects
{
    public interface IHaveArmyObject
    {
        Army Army { get; }
    }

    public interface IOwnedObject
    {
        int Owner { set; }
    }

    public interface IHaveRewardObject
    {
        Treasure Treasure { get; }
    }

    public class Dwelling : IOwnedObject
    {
        public int Owner { get; set; }
    }

    public class Mine : IOwnedObject, IHaveArmyObject, IHaveRewardObject
    {
        public int Owner { get; set; }
        public Army Army { get; set; }
        public Treasure Treasure { get; set; }
    }

    public class Creeps : IHaveArmyObject, IHaveRewardObject
    {
        public Army Army { get; set; }
        public Treasure Treasure { get; set; }
    }

    public class Wolves : IHaveArmyObject
    {
        public Army Army { get; set; }
    }

    public class ResourcePile : IHaveRewardObject
    {
        public Treasure Treasure { get; set; }
    }

    public static class Interaction
    {
        public static void Make(Player player, object mapObject)
        {
            if (mapObject is IHaveArmyObject armyObject)
            {
                if (!player.CanBeat(armyObject.Army))
                {
                    player.Die();
                    return;
                }
            }

            if (mapObject is IOwnedObject ownedObject)
            {
                ownedObject.Owner = player.Id;
            }

            if (mapObject is IHaveRewardObject rewardObject)
            {
                player.Consume(rewardObject.Treasure);
            }
        }
    }
}