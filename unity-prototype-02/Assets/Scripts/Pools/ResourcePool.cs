//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Mono.Cecil;
using UnityEngine;

namespace RenderHeads
{
    public class ResourcePool : MonoBehaviour
    {
        #region Public Properties
        public static ResourcePool Instance
        {
            get
            {
                return _instance;
            }
        }
        public float ResourceZ = 0f;
        #endregion

        #region Private Properties
        private static ResourcePool _instance;
        private HashSet<ResourceEntity> _activeResourceEntities = new HashSet<ResourceEntity>();

        private List<FactoryResourceConnection> _factoryOutputs = new List<FactoryResourceConnection>();
        private List<FactoryWorkerConnection> _factoryWorkers = new List<FactoryWorkerConnection>();

        #endregion

        #region Public Methods
        public void Awake()
        {
            _instance = this;
        }
        public bool TryRequestResource(Resource resource, Transform spawnTransform, out ResourceEntity resourceEntity)
        {
            resourceEntity = null;
            bool result = DataKeeper.Instance.TryGetResourceEntity(resource.Type, out ResourceEntity foundResourceEntity);
            if (result)
            {
                Vector3 spawnPosition = new Vector3(spawnTransform.position.x, spawnTransform.position.y, ResourceZ);
                resourceEntity = Instantiate(foundResourceEntity, spawnPosition, spawnTransform.rotation, this.transform);
                resourceEntity.Init(resource);

                _activeResourceEntities.Add(resourceEntity);
            }
            return result;
        }

        public void DestroyResource(ResourceEntity resourceEntity)
        {
            ClearFactoryOutput(resourceEntity);

            if (resourceEntity is HumanEntity)
            {
                ClearFactoryWorker(resourceEntity as HumanEntity);
            }

            _activeResourceEntities.Remove(resourceEntity);

            Destroy(resourceEntity.gameObject);
        }

        public bool GetResourceOutput(FactoryEntity factory, out ResourceEntity resource)
        {
            resource = null;
            if (TryGetResourceConnection(factory, out FactoryResourceConnection factoryResourceConnection))
            {
                resource = factoryResourceConnection.ResourceEntity;
            }

            return resource != null;
        }

        public bool GetResourceFactory(ResourceEntity resourceEntity, out FactoryEntity factory)
        {
            factory = null;
            if (TryGetResourceConnection(resourceEntity, out FactoryResourceConnection factoryResourceConnection))
            {
                factory = factoryResourceConnection.FactoryEntity;
            }

            return factory != null;
        }

        public bool GetFactoryWorker(FactoryEntity factory, out HumanEntity human)
        {
            human = null;
            if (TryGetWorkerConnection(factory, out FactoryWorkerConnection factoryWorkerConnection))
            {
                human = factoryWorkerConnection.HumanEntity;
            }

            return human != null;
        }

        public bool GetWorkerFactory(HumanEntity human, out FactoryEntity factory)
        {
            factory = null;
            if (TryGetWorkerConnection(human, out FactoryWorkerConnection factoryWorkerConnection))
            {
                factory = factoryWorkerConnection.FactoryEntity;
            }

            return factory != null;
        }

        public bool AssignResourceOutputToFactory(FactoryEntity factory, ResourceEntity resource)
        {
            if (GetResourceOutput(factory, out ResourceEntity foundResource))
            {
                Debug.LogError($"[ResourcePool] Factory already has a resource in the output!");
                return false;
            }

            FactoryResourceConnection factoryResourceConnection = new FactoryResourceConnection(factory, resource);

            _factoryOutputs.Add(factoryResourceConnection);

            return true;
        }



        public bool AssignWorkerToFactory(FactoryEntity factory, HumanEntity human)
        {
            if (GetFactoryWorker(factory, out HumanEntity foundHuman))
            {
                Debug.LogError($"[ResourcePool] Factory already has a worker!");
                return false;
            }

            ClearFactoryOutput(human);
            ClearFactoryWorker(human);

            FactoryWorkerConnection factoryWorkerConnection = new FactoryWorkerConnection(factory, human);

            _factoryWorkers.Add(factoryWorkerConnection);

            return true;
        }

        #endregion

        #region Private Methods
        private void ClearFactoryOutput(FactoryEntity factory)
        {
            if (TryGetResourceConnection(factory, out FactoryResourceConnection factoryResourceConnection))
            {
                _factoryOutputs.Remove(factoryResourceConnection);
            }
        }

        private void ClearFactoryOutput(ResourceEntity resource)
        {
            if (TryGetResourceConnection(resource, out FactoryResourceConnection factoryResourceConnection))
            {
                _factoryOutputs.Remove(factoryResourceConnection);
            }
        }

        private void ClearFactoryWorker(FactoryEntity factory)
        {
            if (TryGetWorkerConnection(factory, out FactoryWorkerConnection factoryWorkerConnection))
            {
                _factoryWorkers.Remove(factoryWorkerConnection);
            }
        }

        private void ClearFactoryWorker(HumanEntity human)
        {
            if (TryGetWorkerConnection(human, out FactoryWorkerConnection factoryWorkerConnection))
            {
                _factoryWorkers.Remove(factoryWorkerConnection);
            }
        }

        private bool TryGetResourceConnection(FactoryEntity factory, out FactoryResourceConnection factoryResourceConnection)
        {
            factoryResourceConnection = default;
            for (int i = 0; i < _factoryOutputs.Count; i++)
            {
                if (_factoryOutputs[i].FactoryEntity == factory)
                {
                    factoryResourceConnection = _factoryOutputs[i];
                    return true;
                }
            }

            return false;
        }

        private bool TryGetResourceConnection(ResourceEntity resource, out FactoryResourceConnection factoryResourceConnection)
        {
            factoryResourceConnection = default;
            for (int i = 0; i < _factoryOutputs.Count; i++)
            {
                if (_factoryOutputs[i].ResourceEntity == resource)
                {
                    factoryResourceConnection = _factoryOutputs[i];
                    return true;
                }
            }

            return false;
        }

        private bool TryGetWorkerConnection(HumanEntity human, out FactoryWorkerConnection factoryWorkerConnection)
        {
            factoryWorkerConnection = default;
            for (int i = 0; i < _factoryWorkers.Count; i++)
            {
                if (_factoryWorkers[i].HumanEntity == human)
                {
                    factoryWorkerConnection = _factoryWorkers[i];
                    return true;
                }
            }

            return false;
        }

        private bool TryGetWorkerConnection(FactoryEntity factory, out FactoryWorkerConnection factoryWorkerConnection)
        {
            factoryWorkerConnection = default;
            for (int i = 0; i < _factoryWorkers.Count; i++)
            {
                if (_factoryWorkers[i].FactoryEntity == factory)
                {
                    factoryWorkerConnection = _factoryWorkers[i];
                    return true;
                }
            }

            return false;
        }
        #endregion
    }
}