//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class MeatEntity : ResourceEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init(Resource.Default(ResourceType.Meat));
        }
        #endregion

        #region Private Methods

        #endregion
    }
}