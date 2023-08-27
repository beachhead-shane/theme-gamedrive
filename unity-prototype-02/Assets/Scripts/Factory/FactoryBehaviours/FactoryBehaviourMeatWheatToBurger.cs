﻿using System;
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

            return new Resource(ResourceType.Burger, aspects);
        }

        public Resource Run(List<Resource> listOfInputs)
        {
            Debug.Log($"[{this.GetType()}] Running");
            Resource r = Resource.Default();

            if (CanManufacture(listOfInputs))
            {
                List<Resource> selectedInputs = new List<Resource>();
                Resource resource = BehaviourHelper.GetFirstInput(listOfInputs, ResourceType.Bread);
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