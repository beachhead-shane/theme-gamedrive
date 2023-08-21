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
        private IDraggableResource activeDraggable;
        private Vector3 activeDraggableStartPosition;
        private float draggingZ = -1;
        private Vector3 lastDragPosition;

        private Vector2 startClickPosition = Vector2.zero;
        [SerializeField]
        private float clickDistanceThreshold = 1f;
        private enum PointerState
        {
            None,
            Click,
            Drag
        }
        [SerializeField]
        private PointerState pointerState = PointerState.None;
        #endregion

        #region Public Methods
        public void Update()
        {
            if (Input.GetMouseButtonDown(0))
            {
                HandleMouseButtonDown();
            }
            else if (Input.GetMouseButtonUp(0))
            {
                HandleMouseButtonUp();
            }
            else if (Input.GetMouseButton(0))
            {
                HandleMouseDrag();
            }
        }

        private void HandleMouseButtonDown()
        {
            startClickPosition = Input.mousePosition;
        }

        private void HandleMouseButtonUp()
        {
            if (IsClick() && NoActiveDragOperation())
            {
                PerformClickAction();
                ResetPointerState();
            }
            else if (IsDrag())
            {
                EndDrag();
                ResetPointerState();
            }
        }

        private void HandleMouseDrag()
        {
            if (ShouldBeginDrag())
            {
                StartDragIfNeeded();
            }

            if (IsDrag())
            {
                Drag();
            }
        }

        private bool IsClick()
        {
            return pointerState == PointerState.None && Vector2.Distance(startClickPosition, Input.mousePosition) < clickDistanceThreshold;
        }

        private bool IsDrag()
        {
            return pointerState == PointerState.Drag;
        }

        private bool NoActiveDragOperation()
        {
            return activeDraggable == null;
        }

        private bool ShouldBeginDrag()
        {
            return pointerState == PointerState.None;
        }

        private void PerformClickAction()
        {
            if (GetInteractable(out IInteractable interactable) && NoActiveDragOperation())
            {
                interactable.OnClick();
            }
        }

        private void StartDragIfNeeded()
        {
            if (GetInteractable(out IDraggableResource draggable) && NoActiveDragOperation())
            {
                BeginDrag(draggable);
                pointerState = PointerState.Drag;
            }
        }

        private void ResetPointerState()
        {
            pointerState = PointerState.None;
        }



        public void BeginDrag(IDraggableResource draggable)
        {
            Debug.Log($"BeginDrag!");
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
            activeDraggable.Drag(new Vector3(lastDragPosition.x, lastDragPosition.y, activeDraggableStartPosition.z));
            if (GetInteractable(out IDropTarget dropTarget))
            {
                Debug.Log($"Found ({dropTarget})!");
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

            activeDraggable.EndDrag();
            activeDraggable = null;
        }
        #endregion

        #region Private Methods

        private bool GetInteractable<T>(out T interactable) where T : IInteractable
        {
            interactable = default;
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit))
            {
                Transform hitTransform = hit.transform;
                // Debug.Log($"Hit ({hitTransform.name})!");
                interactable = hitTransform.GetComponentInParent<T>();
            }

            return interactable != null;
        }
        #endregion
    }
}