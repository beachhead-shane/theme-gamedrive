//RenderHeads - Jeff Rusch
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public enum FactoryType
    {
        WaterSource,
        WheatField,
        Ranch,
        Butchery,
        Mill,
        Makery,
        Kitchen
    }

    [System.Serializable]
    public class Factory
    {
        #region Public Properties
        public List<Resource> InputPile = new List<Resource>();
        #endregion

        #region Private Properties
        protected List<IFactoryBehaviour> Behaviours = new List<IFactoryBehaviour>();
        private Action<Resource> onproduceAction;

        public Factory(Action<Resource> onProduce)
        {
            onproduceAction = onProduce;
        }
        #endregion

        #region Public Methods
        public void AddBehaviour(IFactoryBehaviour behaviour)
        {
            Behaviours.Add(behaviour);
        }
        public void RemoveBehaviour(IFactoryBehaviour behaviour)
        {
            Behaviours.Remove(behaviour);
        }

        public void Consume(List<Resource> inputs)
        {
            InputPile.AddRange(inputs);
        }

        public void Consume(Resource input)
        {
            InputPile.Add(input);
        }

        public bool CanAcceptResource(Resource resource)
        {
            foreach (var b in Behaviours)
            {
                if (b.CanAcceptResource(resource.Type))
                {
                    return true;
                }
            }

            return false;
        }

        public bool CanProduce()
        {
            foreach (var b in Behaviours)
            {
                if (b.CanManufacture(InputPile))
                {
                    return true;
                }
            }

            return false;
        }

        public void Produce()
        {
            Debug.Assert(Behaviours.Count > 0, "[Factory] No Behaviours set!");

            foreach (var b in Behaviours)
            {
                Resource r = b.Run(InputPile);
                if (r.Type != ResourceType.None)
                {
                    onproduceAction(r);
                    break;
                }
            }
        }
        #endregion

        #region Private Methods

        #endregion
    }
}