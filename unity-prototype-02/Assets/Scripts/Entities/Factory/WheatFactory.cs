//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class WheatFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourWaterToWheat());
        }
        #endregion

        #region Private Methods

        #endregion
    }
}