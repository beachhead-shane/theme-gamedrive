//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public struct FactoryResourceConnection
    {
        #region Public Properties
        public FactoryEntity FactoryEntity;
        public ResourceEntity ResourceEntity;

        public FactoryResourceConnection(FactoryEntity factoryEntity, ResourceEntity resourceEntity)
        {
            FactoryEntity = factoryEntity;
            ResourceEntity = resourceEntity;
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