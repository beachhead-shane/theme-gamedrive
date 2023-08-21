//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public abstract class FactoryEntity : MonoBehaviour, IDropTarget
    {
        #region Public Properties
        public Factory Factory;
        public Transform ResourceSpawnPoint;
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Init()
        {
            Factory = new Factory(OnProduce);

        }
        public bool CanAcceptDraggable(IDraggableResource draggable)
        {
            return Factory.CanAcceptResource(draggable.DraggedResource);
        }

        public void DropDraggable(IDraggableResource draggable)
        {
            Factory.Consume(draggable.DraggedResource);
            draggable.BeConsumed();
        }

        public void IsHoveredOver(bool highlighted)
        {
            Debug.Log($"[{this.gameObject.name}] is highlighted ({highlighted})");
        }
        #endregion

        #region Private Methods
        private void OnProduce(Resource resource)
        {
            Debug.Log($"[{this.gameObject.name}] produced ({resource.Type})");
            if (DataKeeper.Instance.TryGetResourceEntity(resource.Type, out ResourceEntity resourceEntity))
            {
                Debug.Log($"[{this.gameObject.name}] Spawned ({resource.Type})");
                Instantiate(resourceEntity, ResourceSpawnPoint.position, ResourceSpawnPoint.rotation);
            }
        }

        public void OnClick()
        {
            Factory.Produce();
        }
        #endregion
    }
}