//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public interface IDropTarget : IInteractable
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public bool CanAcceptDraggable(IDraggableResource draggable);
        public void DropDraggable(IDraggableResource draggable);
        #endregion

        #region Private Methods

        #endregion
    }
}