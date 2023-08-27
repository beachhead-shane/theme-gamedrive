using System;
using System.Collections.Generic;

namespace RenderHeads
{
    public class FactoryBehaviourHumanToMeat : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(Resource resource)
        {
            return resource.Type == ResourceType.Human;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Human);
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Console.WriteLine($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = new Dictionary<AspectType, int>();
            aspects.Add(AspectType.Corruption, 100);
            aspects.Add(AspectType.Human, 1);

            return new Resource(ResourceType.Meat, aspects);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Console.WriteLine($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Human);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);
                r = (Manufacture(selectedInputs));
            }

            return r;
        }
    }
}