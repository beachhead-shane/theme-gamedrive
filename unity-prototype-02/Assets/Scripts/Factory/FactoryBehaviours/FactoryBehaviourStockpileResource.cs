using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourStockpileResource : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(Resource resource)
        {
            return true;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return false;
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            return Resource.Default();
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            //if (CanManufacture(listOfInputs))
            //{
            //    List<Resource> selectedInputs = new List<Resource>();
            //    Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Wheat);
            //    selectedInputs.Add(resource);
            //    listOfInputs.Remove(resource);
            //    r = Manufacture(selectedInputs);
            //}

            return r;
        }
    }
}