using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MakeWheatFromWater : FactoryBehaviour, IFactoryBehaviour
	{
        protected override bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Water);
        }

        protected override List<Resource> Manufacture(List<Resource> selectedInputs)
        {
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;
            aspects.Add(AspectType.Plant, 1);

            return new List<Resource>() { new Resource(ResourceType.Wheat, aspects) };
        }

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            List<Resource> outputs = new List<Resource>();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Water);
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
