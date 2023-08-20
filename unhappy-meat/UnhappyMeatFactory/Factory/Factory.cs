using System;
namespace UnhappyMeatFactory
{
    public class Factory
    {
        protected List<IFactoryBehaviour> Behaviours = new List<IFactoryBehaviour>();

        public List<Resource> InputPile = new List<Resource> ();
        public List<Resource> OutPile = new List<Resource>();

        public string Name;

        public Factory()
        {
            Name = "Factory";
        }

        public Factory(string name)
        {
            Name = name;
        }

        public void AddBehaviour(IFactoryBehaviour behaviour)
        {
            Behaviours.Add(behaviour);
        }
        public void RemoveBehaviour(IFactoryBehaviour behaviour)
        {
            Behaviours.Remove(behaviour);
        }

        public void Consume(List<Resource> inputs)
        {
            InputPile.AddRange(inputs);
        }

        public bool CanProduce()
        {
            foreach (var b in Behaviours)
            {
                if (b.CanManufacture(InputPile))
                {
                    return true;
                }
            }

            return false;
        }

        public void Produce()
        {
            List<Resource> inputs = InputPile;

            foreach (var b in Behaviours)
            {
                inputs = b.Run(inputs);
            }

            OutPile.AddRange(inputs);
        }
    }
}
