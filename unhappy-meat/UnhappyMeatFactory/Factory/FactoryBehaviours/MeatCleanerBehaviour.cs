using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MeatSanitizerBehaviour:FactoryBehaviour, IFactoryBehaviour
	{
        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Meat);
        }

        protected override List<Resource> Manufacture(List<Resource> selectedInputs)
        {
            Console.WriteLine($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;
            aspects.Remove(AspectType.Corruption);

            return new List<Resource>() { new Resource(ResourceType.Meat, aspects) };
        }

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            Console.WriteLine($"[{this.GetType()}] Running");
            List<Resource> outputs = new List<Resource>();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Meat);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);
                outputs.AddRange(Manufacture(selectedInputs));
            }

            if (outputs.Count == 0)
            {
                Resource r = Resource.Default();
                outputs.Add(r);
            }
            return outputs;
        }
    }
}
