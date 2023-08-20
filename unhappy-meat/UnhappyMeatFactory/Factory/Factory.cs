using System;
namespace UnhappyMeatFactory
{
    public class Factory
    {
        protected List<IFactoryBehaviour> Behaviours = new List<IFactoryBehaviour>();

        public List<Resource> Resources = new List<Resource> ();

        public Factory()
        {

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
            Resources.AddRange(inputs);
        }

        public List<Resource> Produce()
        {
            List<Resource> inputs = Resources;

            foreach (var b in Behaviours)
            {
                inputs = b.Run(inputs);
            }

            return inputs;

        }
    }
}
