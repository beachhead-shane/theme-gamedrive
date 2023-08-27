using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourWheatWaterToCow : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(Resource resource)
        {
            return resource.Type == ResourceType.Wheat || resource.Type == ResourceType.Water;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Wheat) && BehaviourHelper.HasInput(listOfInputs, ResourceType.Water);
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = new Dictionary<AspectType, int>();

            for (int i = 0; i < selectedInputs.Count; i++)
            {
                foreach (var a in selectedInputs[i].Aspects.Keys)
                {
                    if (!aspects.ContainsKey(a))
                    {
                        aspects.Add(a, selectedInputs[i].Aspects[a]);
                    }
                    else
                    {
                        aspects[a] += selectedInputs[i].Aspects[a];
                    }
                }
            }

            aspects.Remove(AspectType.Liquid);
            aspects.Remove(AspectType.Plant);
            aspects.Remove(AspectType.Animal);

            return new Resource(ResourceType.Cow, aspects);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Wheat);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);

                resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Water);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);

                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}