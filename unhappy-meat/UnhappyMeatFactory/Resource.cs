namespace UnhappyMeatFactory
{

    public enum ResourceType
    {
        None,
        Cow,
        Human,
        Meat,

    }

    public enum Class
    {
        Person,
        Animal,
        Plant,
        InOrganic,

    }

    public struct Resource
    {
        public readonly ResourceType Type;
        public readonly int Corruption;
        public readonly Class Class;
        public Resource(ResourceType type, int corruption, Class c)
        {
            Type = type;
            Corruption = corruption;
            Class = c;
        }
    }
}
