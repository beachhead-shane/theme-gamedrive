//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class HumanFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourBurgerToPoop());
            Factory.Consume(this.GetComponent<HumanEntity>().Resource);

            if (SpawnResourceOnAwake)
            {
                ForceResourceSpawn();
            }
        }
        #endregion

        #region Private Methods
        protected override bool RequiresWorker()
        {
            return false;
        }

        protected override void ForceResourceSpawn()
        {
            List<Resource> resources = new List<Resource>()
            {
                Resource.Default(ResourceType.Burger),
            };
            Factory.Consume(resources);
            Factory.Produce();
        }
        #endregion
    }
}