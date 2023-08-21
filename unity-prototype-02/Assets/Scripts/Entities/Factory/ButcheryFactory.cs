//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class ButcheryFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourCowToMeat());
            Factory.AddBehaviour(new FactoryBehaviourHumanToMeat());
        }
        #endregion

        #region Private Methods

        #endregion
    }
}