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
        [SerializeField]
        private ResourceEntity outputPile;
        #endregion

        #region Public Methods
        public void Init()
        {
            Factory = new Factory(OnProduce);

        }
        public bool CanAcceptDraggable(IDraggableResource draggable)
        {
            return outputPile == null && Factory.CanAcceptResource(draggable.DraggedResource);
        }

        public void DropDraggable(IDraggableResource draggable)
        {
            Factory.Consume(draggable.DraggedResource);
            draggable.BeConsumed();
            Factory.Produce();
        }

        public void IsHoveredOver(bool highlighted)
        {
            Debug.Log($"[{this.gameObject.name}] is highlighted ({highlighted})");
        }

        public void OnClick()
        {
            TryProduce();
        }
        #endregion

        #region Private Methods
        private void TryProduce()
        {
            if (outputPile == null)
            {
                Factory.Produce();
            }
        }

        private void OnProduce(Resource resource)
        {
            Debug.Log($"[{this.gameObject.name}] produced ({resource.Type})");
            if (DataKeeper.Instance.TryGetResourceEntity(resource.Type, out ResourceEntity resourceEntity))
            {
                Debug.Log($"[{this.gameObject.name}] Spawned ({resource.Type})");
                outputPile = Instantiate(resourceEntity, ResourceSpawnPoint.position, ResourceSpawnPoint.rotation);
            }
        }


        #endregion
    }
}