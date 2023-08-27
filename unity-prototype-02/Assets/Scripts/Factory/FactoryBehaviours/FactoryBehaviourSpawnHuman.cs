using System;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourSpawnHuman : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(ResourceType resourcetype)
        {
            return false;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            return true;
        }

        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");

            return Resource.Default(ResourceType.Human);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.None);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);
                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}