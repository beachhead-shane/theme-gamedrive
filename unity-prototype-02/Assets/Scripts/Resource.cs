//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace RenderHeads
{
    public enum ResourceType
    {
        None,
        Water,
        Wheat,
        Cow,
        Human,
        Meat,
        Burger,
        Flour,
        Bread,
        Poop,
    }

    public enum AspectType
    {
        Human,
        Animal,
        Plant,
        Liquid,
        Food,
        Corruption,
        CookingIngredient,
        Waste
    }

    [System.Serializable]
    public struct Resource
    {
        public ResourceType Type;
        public Dictionary<AspectType, int> Aspects;

        public Resource(ResourceType type)
        {
            Type = type;
            Aspects = new Dictionary<AspectType, int>();
        }

        public Resource(ResourceType type, Dictionary<AspectType, int> aspects)
        {
            Type = type;
            Aspects = aspects;
        }

        public static Resource Default()
        {
            return new Resource(ResourceType.None);
        }

        public static Resource Default(ResourceType resourceType)
        {
            Dictionary<AspectType, int> aspects = new Dictionary<AspectType, int>();
            switch (resourceType)
            {
                case ResourceType.Water:
                    aspects.Add(AspectType.Liquid, 1);
                    break;
                case ResourceType.Wheat:
                    aspects.Add(AspectType.Plant, 1);
                    break;
                case ResourceType.Cow:
                    aspects.Add(AspectType.Animal, 1);
                    break;
                case ResourceType.Human:
                    aspects.Add(AspectType.Human, 1);
                    break;
                case ResourceType.Meat:
                    aspects.Add(AspectType.Animal, 1);
                    break;
                case ResourceType.Burger:
                    aspects.Add(AspectType.Food, 100);
                    break;
                case ResourceType.Flour:
                    aspects.Add(AspectType.CookingIngredient, 1);
                    break;
                case ResourceType.Bread:
                    aspects.Add(AspectType.Food, 20);
                    break;
                case ResourceType.Poop:
                    aspects.Add(AspectType.Corruption, 20);
                    break;
                default:
                    return new Resource(ResourceType.None);
            }

            return new Resource(resourceType, aspects);
        }

        public bool HasAspect(AspectType aspectType)
        {
            return Aspects.Keys.Contains(aspectType);
        }

        public int AspectValue(AspectType aspectType)
        {
            return HasAspect(aspectType) ? Aspects[aspectType] : 0;
        }

        public Resource AddAspect(AspectType aspectType, int value)
        {
            Dictionary<AspectType, int> aspects = this.Aspects;
            aspects.Add(aspectType, value);

            return new Resource(this.Type, aspects);
        }

        public Resource RemoveAspect(AspectType aspectType)
        {
            Dictionary<AspectType, int> aspects = this.Aspects;
            if (HasAspect(aspectType))
            {
                aspects.Remove(aspectType);
            }

            return new Resource(this.Type, aspects);
        }

        public override string ToString()
        {
            string s = $"Type: {Type}";
            if (Aspects.Keys.Count > 0)
            {
                s += $"\nAspects:\n";
            }
            foreach (var a in Aspects)
            {
                s += $"{a.Key}: {a.Value}\n";
            }

            return s;
        }
    }
}