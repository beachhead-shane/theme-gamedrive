using System;
using System.Collections.Generic;
using Mono.Cecil;
using UnityEngine;

namespace RenderHeads
{
    public class FactoryBehaviourBeMurdered : FactoryBehaviour, IFactoryBehaviour
    {
        public bool CanAcceptResource(Resource resource)
        {
            return resource.Type == ResourceType.Human && resource.HasAspect(AspectType.Corruption) && resource.Aspects[AspectType.Corruption] > 100;
        }

        public bool CanManufacture(List<Resource> listOfInputs)
        {
            bool hasCorruptHuman = false;
            int humanCount = 0;

            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == ResourceType.Human)
                {
                    humanCount++;
                    if (listOfInputs[0].HasAspect(AspectType.Corruption) && listOfInputs[0].Aspects[AspectType.Corruption] > 100)
                    {
                        hasCorruptHuman = true;
                    }
                }
            }

            return hasCorruptHuman && humanCount > 1;
        }
        protected override Resource Manufacture(List<Resource> selectedInputs)
        {
            Debug.Log($"[{this.GetType()}] Manufacturing");
            return new Resource(ResourceType.DeadHuman);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Human);
                selectedInputs.Add(resource);
                listOfInputs.Remove(resource);

                r = Manufacture(selectedInputs);
            }

            return r;
        }
    }
}