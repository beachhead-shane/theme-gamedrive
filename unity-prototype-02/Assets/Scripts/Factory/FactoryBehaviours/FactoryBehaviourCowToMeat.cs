using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourCowToMeat : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(ResourceType resourcetype)
        {
            return resourcetype == ResourceType.Cow;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Cow);
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;

            return new Resource(ResourceType.Meat, aspects);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Cow);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);
                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}