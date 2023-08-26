//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public struct FactoryWorkerConnection
    {
        #region Public Properties
        public FactoryEntity FactoryEntity;
        public HumanEntity HumanEntity;

        public FactoryWorkerConnection(FactoryEntity factoryEntity, HumanEntity humanEntity)
        {
            FactoryEntity = factoryEntity;
            HumanEntity = humanEntity;
        }
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods

        #endregion

        #region Private Methods

        #endregion
    }
}