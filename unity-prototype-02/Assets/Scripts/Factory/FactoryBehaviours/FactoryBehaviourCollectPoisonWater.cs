using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourCollectPoisonWater : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(Resource resource)
        {
            return resource.Type == ResourceType.Water;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Water);
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = new Dictionary<AspectType, int>();
            aspects.Add(AspectType.Corruption, 100);

            return new Resource(ResourceType.Water, aspects);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Water);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);
                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}