//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class PoisonEntity : ResourceEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public override IFactoryBehaviour[] GetFactoryBehaviours()
        {
            return new IFactoryBehaviour[] { new FactoryBehaviourCollectPoisonWater() };
        }
        #endregion

        #region Private Methods

        #endregion
    }
}