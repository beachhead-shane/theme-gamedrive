//RenderHeads - Jeff Rusch
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

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
        private Action<List<Resource>> onpreproduceAction;
        private Action<Resource> onproduceAction;

        public Factory(Action<List<Resource>> onpreproduce, Action<Resource> onProduce)
        {
            onpreproduceAction = onpreproduce;
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
            onpreproduceAction(InputPile);
            Debug.Assert(Behaviours.Count > 0, "[Factory] No Behaviours set!");
            List<Resource> outputs = new List<Resource>();
            foreach (var b in Behaviours)
            {
                bool useOutputs = outputs.Count > 0;

                Resource r = b.Run((useOutputs)?outputs:InputPile);

                if (r.Type != ResourceType.None)
                {
                    outputs.Add(r);
                }
            }

            List<Resource> cleanedOutputs = outputs.FindAll(x => x.Type != ResourceType.None);

            if (cleanedOutputs.Count > 0 && cleanedOutputs[0].Type != ResourceType.None)
            {
                onproduceAction(cleanedOutputs[0]);
            }
        }
        #endregion

        #region Private Methods

        #endregion
    }
}