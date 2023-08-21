//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public interface IInteractable
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void IsHoveredOver(bool highlighted);
        public void OnClick();
        #endregion

        #region Private Methods

        #endregion
    }
}