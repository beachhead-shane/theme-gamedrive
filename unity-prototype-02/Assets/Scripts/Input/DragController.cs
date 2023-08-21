//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class DragController : MonoBehaviour
    {
        #region Public Properties
       

        #endregion

        #region Private Properties
        [SerializeField]
        private bool isDragging;
        private IDraggableResource activeDraggable;
        private Vector3 activeDraggableStartPosition;
        private float draggingZ = -1;
        private Vector3 lastDragPosition;
        private IDropTarget dropTarget;
        private float clickTimer = 0f;
        private float clickDuration = 0.1f;

        private enum PointerState
        {
            None,
            Click,
            Drag
        }

        private PointerState pointerState = PointerState.None;
        #endregion

        #region Public Methods
        public void Update()
        {
            if (GetDropTarget(out dropTarget))
            {
                Debug.Log($"found drop target ({dropTarget})");
            }


            if (Input.GetMouseButtonDown(0))
            {
                if (GetDraggable(out IDraggableResource draggable))
                {
                    if (activeDraggable == null)
                    {
                        BeginDrag(draggable);
                    }
                }
            }
            if (Input.GetMouseButtonUp(0))
            {
                if (activeDraggable != null)
                {
                    EndDrag();
                }
            }

            if (Input.GetMouseButton(0))
            {
                if (activeDraggable != null)
                {
                    Drag();
                }

                pointerState = PointerState.None;
            }

        }
 

        public void BeginDrag(IDraggableResource draggable)
        {
            Debug.Log($"BeginDrag!");
            isDragging = true;
            activeDraggable = draggable;
            activeDraggableStartPosition = draggable.GetStartPosition();
            activeDraggable.BeginDrag();
        }

        public void Drag()
        {
            Debug.Log($"Dragging");
            Vector3 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            pos = new Vector3(pos.x, pos.y, draggingZ);
            activeDraggable.Drag(pos);
            lastDragPosition = pos;
        }

        public void EndDrag()
        {
            Debug.Log($"EndDrag!");
            isDragging = false;
            activeDraggable.Drag(new Vector3(lastDragPosition.x, lastDragPosition.y, activeDraggableStartPosition.z));
            activeDraggable.EndDrag();
            if (dropTarget!= null)
            {
                if (dropTarget.CanAcceptDraggable(activeDraggable))
                {
                    dropTarget.DropDraggable(activeDraggable);

                } else
                {
                    activeDraggable.MoveTo(activeDraggableStartPosition);
                }

            } else
            {

                activeDraggable.MoveTo(activeDraggableStartPosition);
            }
            activeDraggable = null;
        }
        #endregion

        #region Private Methods
        private bool GetDraggable(out IDraggableResource draggable)
        {
            draggable = null;
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit))
            {
                Transform hitTransform = hit.transform;
                draggable = hitTransform.GetComponentInParent<IDraggableResource>();
            }

            return draggable != null;
        }

        private bool GetDropTarget(out IDropTarget dropTarget)
        {
            dropTarget = null;
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit))
            {
                Transform hitTransform = hit.transform;
                dropTarget = hitTransform.GetComponentInParent<IDropTarget>();
            }

            return dropTarget != null;
        }
        #endregion
    }
}