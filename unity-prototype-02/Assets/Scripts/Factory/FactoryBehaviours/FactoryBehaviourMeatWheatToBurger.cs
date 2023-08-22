using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourMeatWheatToBurger : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(ResourceType resourcetype)
        {
            return resourcetype == ResourceType.Bread || resourcetype == ResourceType.Meat;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return BehaviourHelper.HasInput(listOfInputs, ResourceType.Bread) && BehaviourHelper.HasInput(listOfInputs, ResourceType.Meat);
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            Dictionary<AspectType, int> aspects = selectedInputs[0].Aspects;

            return new Resource(ResourceType.Burger, aspects);
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

                resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Meat);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);

                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}