namespace UnhappyMeatFactory
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
    }

    public enum AspectType
    {
        Person,
        Animal,
        Plant,
        InOrganic,
        Liquid,
        Food,
        Corruption,
        CookingIngredient
    }

    public struct Resource
    {
        public readonly ResourceType Type;
        public Dictionary<AspectType, int> Aspects = new Dictionary<AspectType, int>();

        public Resource(ResourceType type)
        {
            Type = type;
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

        public bool HasAspect(AspectType aspectType)
        {
            return Aspects.Keys.Contains(aspectType);
        }

        public int AspectValue(AspectType aspectType)
        {
            return HasAspect(aspectType)? Aspects[aspectType]:0;
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
                s+= $"{a.Key}: {a.Value}\n";
            }

            return s;
        }
    }
}
