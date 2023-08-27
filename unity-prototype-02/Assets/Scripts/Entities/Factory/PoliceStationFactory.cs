//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class PoliceStationFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourSpawnPolice());

            ResourcePool.Instance.AddResourceRequestAction((resource) =>
            {
                if (resource.Type == ResourceType.DeadHuman)
                {
                    TryProduce();
                }
            });
        }

        #endregion

        #region Private Methods
        protected override bool RequiresWorker()
        {
            return false;
        }

        protected override void ForceResourceSpawn()
        {

        }
        #endregion
    }
}