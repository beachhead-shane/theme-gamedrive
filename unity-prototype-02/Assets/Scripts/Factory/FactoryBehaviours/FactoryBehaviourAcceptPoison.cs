using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourAcceptPoison : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(ResourceType resourcetype)
        {
            return resourcetype == ResourceType.Poison;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return true;
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            return Resource.Default();
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            return r;
        }
    }
}