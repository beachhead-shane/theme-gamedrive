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
        public Transform WorkerPoint;

        public bool SpawnResourceOnAwake = false;
        public bool SpawnWorkerOnAwake = true;
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Init()
        {
            Factory = new Factory(OnProduce);

            if (SpawnWorkerOnAwake && RequiresWorker())
            {
                if (ResourcePool.Instance.TryRequestResource(Resource.Default(ResourceType.Human), WorkerPoint, out ResourceEntity worker))
                {
                    ResourcePool.Instance.AssignWorkerToFactory(this, worker as HumanEntity);
                }
            }
        }
        public bool CanAcceptDraggable(IDraggableResource draggable)
        {
            if (RequiresWorker())
            {
                if (draggable is HumanEntity)
                {
                    return true;
                }
            }
            else if (!RequiresWorker() && !HasOutputSlotFilled() && Factory.CanAcceptResource(draggable.DraggedResource))
            {
                return true;
            }
            return false;
        }

        public void DropDraggable(IDraggableResource draggable)
        {
            if (RequiresWorker())
            {
                if (draggable is HumanEntity)
                {
                    TryAttachWorker(draggable as HumanEntity);
                }
            }
            else
            {
                Factory.Consume(draggable.DraggedResource);
                draggable.BeConsumed();
                Factory.Produce();
            }
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
            if (!HasOutputSlotFilled())
            {
                Factory.Produce();
            }
        }

        private void OnProduce(Resource resource)
        {
            Debug.Log($"[{this.gameObject.name}] produced ({resource.Type})");

            if (ResourcePool.Instance.TryRequestResource(resource, ResourceSpawnPoint,  out ResourceEntity resourceEntity))
            {
                Debug.Log($"[{this.gameObject.name}] Spawned ({resource.Type})");
                ResourcePool.Instance.AssignResourceOutputToFactory(this, resourceEntity);
            }
        }

        protected virtual bool RequiresWorker()
        {
            return !HasWorker();
        }

        protected bool TryAttachWorker(HumanEntity humanEntity)
        {
            if (!RequiresWorker())
            {
                return false;
            }

            ResourcePool.Instance.AssignWorkerToFactory(this, humanEntity);

            humanEntity.MoveTo(WorkerPoint.position);
            return true;
        }

        protected bool HasOutputSlotFilled()
        {
            return ResourcePool.Instance.GetResourceOutput(this, out ResourceEntity resourceEntity);
        }

        protected bool HasWorker()
        {
            return ResourcePool.Instance.GetFactoryWorker(this, out HumanEntity humanEntity);
        }

        protected abstract void ForceResourceSpawn();
        #endregion
    }
}