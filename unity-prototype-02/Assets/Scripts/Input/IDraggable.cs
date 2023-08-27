//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public interface IDraggableResource : IInteractable
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public Vector3 GetStartPosition();
        public void BeginDrag();
        public bool IsDragging { get; }
        public float DragSpeed { get; }
        public Resource DraggedResource { get; }
        public void Drag(Vector3 position);
        public void EndDrag();
        public void MoveTo(Vector3 position);
        public void BeConsumed();
        public virtual IFactoryBehaviour[] GetFactoryBehaviours()
        {
            return new IFactoryBehaviour[] { };
        }
        #endregion

        #region Private Methods

        #endregion
    }
}