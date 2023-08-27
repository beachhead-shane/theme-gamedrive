//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class ResourceEntity : MonoBehaviour, IDraggableResource
    {
        #region Public Properties
        public Resource Resource;

        public bool IsDragging => isDragging;
        public float DragSpeed => 10f;
        public Resource DraggedResource => Resource;
        #endregion

        #region Private Properties
        private bool isDragging = false;
        private Vector3 targetPosition;
        #endregion

        #region Public Methods
        public void Init(Resource resource)
        {
            Resource = resource;
            targetPosition = this.transform.position;
        }

        public void Update()
        {
            this.transform.position = Vector3.Lerp(this.transform.position, targetPosition, Time.unscaledDeltaTime * DragSpeed);
        }

        public void Drag(Vector3 position)
        {
            targetPosition = position;
        }

        public Vector3 GetStartPosition()
        {
            return transform.position;
        }

        public void BeginDrag()
        {
            isDragging = true;

            enableColliders(false);
        }

        public void EndDrag()
        {
            isDragging = false;
            enableColliders(true);
        }

        public void IsHoveredOver(bool highlighted)
        {
            Debug.Log($"[{this.gameObject.name}] is highlighted ({highlighted})");
        }

        public void OnClick()
        {

        }
        #endregion

        #region Private Methods
        private void enableColliders(bool enable)
        {
            Collider[] colliders = GetComponentsInChildren<Collider>();
            for (int i = 0; i < colliders.Length; i++)
            {
                colliders[i].enabled = enable;
            }
        }

        public void MoveTo(Vector3 position)
        {
            targetPosition = position;
        }

        public void BeConsumed()
        {
            ResourcePool.Instance.DestroyResource(this);
        }


        #endregion
    }
}