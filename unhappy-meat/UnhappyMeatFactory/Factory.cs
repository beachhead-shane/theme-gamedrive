using System;
namespace UnhappyMeatFactory
{
    public class Factory
    {
        protected List<IFactoryBehaviour> Behaviours = new List<IFactoryBehaviour>();

         Queue<Resource> Resources = new Queue<Resource>();

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
            inputs.ForEach(x => { Resources.Enqueue(x); });
        }

        public List<Resource> Produce()
        {

            Resource r = new Resource(ResourceType.None, 0, Class.InOrganic);
            List<Resource> inputs = new List<Resource>() {  };

            if (Resources.Count > 0)
            {
                r = Resources.Dequeue();
            }
            inputs.Add(r);
            foreach (var b in Behaviours)
            {
                inputs = b.Run(inputs);
            }

            return inputs;

        }
    }
}
