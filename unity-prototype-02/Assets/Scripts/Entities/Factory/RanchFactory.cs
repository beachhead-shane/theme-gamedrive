//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class RanchFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourWheatWaterToCow());

            if (SpawnResourceOnAwake)
            {
                ForceResourceSpawn();
            }
        }
        #endregion

        #region Private Methods
        protected override void ForceResourceSpawn()
        {
            List<Resource> resources = new List<Resource>()
            {
                Resource.Default(ResourceType.Wheat),
                Resource.Default(ResourceType.Water)
            };
            Factory.Consume(resources);
            Factory.Produce();
        }
        #endregion
    }
}