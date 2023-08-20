using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
    public class CollectPollutedWater :FactoryBehaviour, IFactoryBehaviour
    {
        protected override bool CanManufacture(List<Resource> listOfInputs)
        {
            return true;
        }

        protected override List<Resource> Manufacture(List<Resource> selectedInputs)
        {
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;
            aspects.Add(AspectType.Corruption, 20);

            return new List<Resource>() { new Resource(ResourceType.Water, aspects) };
        }

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            List<Resource> outputs = new List<Resource>();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.None);
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

