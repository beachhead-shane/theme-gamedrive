using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MakeBurgerFromMeatAndBread : IFactoryBehaviour
	{
        public bool HasCorrectInputs(List<Resource> listOfInputs)
        {
            bool result = BehaviourHelper.HasInput(listOfInputs, ResourceType.Meat) && BehaviourHelper.HasInput(listOfInputs, ResourceType.Bread);
            return result;
        }

        public List<Resource> Manufacture(List<Resource> selectedInputs)
        {
            Dictionary<AspectType, int> aspects = new Dictionary<AspectType, int>();
            aspects.Add(AspectType.Food, 100);
            aspects.Remove(AspectType.CookingIngredient);

            for (int i = 0; i < selectedInputs.Count; i++)
            {
                foreach (AspectType a in selectedInputs[i].Aspects.Keys)
                {
                    if (!aspects.ContainsKey(a) && selectedInputs[i].Aspects[a] > 0)
                    {
                        aspects.Add(a, selectedInputs[i].Aspects[a]);
                    }
                    else
                    {
                        if (selectedInputs[i].Aspects[a] > aspects[a])
                        {
                            aspects[a] = selectedInputs[i].Aspects[a];
                        }
                    }
                }
            }

            return new List<Resource>() { new Resource(ResourceType.Burger, aspects) };
        }

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            List<Resource> outputs = new List<Resource>();

            if (HasCorrectInputs(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();

                Resource meatResource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Meat);
                selectedInputs.Add(meatResource);
                listOfInputs.Remove(meatResource);

                Resource breadResource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Bread);
                selectedInputs.Add(breadResource);
                listOfInputs.Remove(breadResource);

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
