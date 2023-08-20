using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MakeFlourFromWheat : IFactoryBehaviour
	{
        public bool HasCorrectInputs(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Wheat);
        }

        public List<Resource> Manufacture(List<Resource> selectedInputs)
        {
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;
            aspects.Remove(AspectType.Plant);
            aspects.Add(AspectType.CookingIngredient, 1);
            return new List<Resource>() { new Resource(ResourceType.Flour, aspects) };
        }

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            List<Resource> outputs = new List<Resource>();

            if (HasCorrectInputs(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Wheat);
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
