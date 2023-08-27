//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using Mono.Cecil;
using UnityEngine;

namespace RenderHeads
{
    public class HumanFactory : FactoryEntity
    {
        #region Public Properties

        #endregion

        #region Private Properties
        [SerializeField]
        private HumanEntity humanEntity;
        #endregion

        #region Public Methods
        public void Start()
        {
            Init();
            Factory.AddBehaviour(new FactoryBehaviourPoisonToDead());
            Factory.AddBehaviour(new FactoryBehaviourBurgerToPoop());
            Factory.Consume(this.GetComponent<HumanEntity>().Resource);

            if (SpawnResourceOnAwake)
            {
                ForceResourceSpawn();
            }
        }

        public override void Init()
        {
            Factory = new Factory(OnPreProduce, CheckToDie);
        }

        public override void OnClick()
        {
            Debug.Log($"[{this.gameObject.name}] {humanEntity.Resource.ToString()}");
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

        protected override void OnPreProduce(List<Resource> resources)
        {
            for (int i = 0; i < resources.Count; i++)
            {
                if (resources[i].Aspects.ContainsKey(AspectType.Corruption))
                {
                    if (!humanEntity.Resource.Aspects.ContainsKey(AspectType.Corruption))
                    {
                        humanEntity.Resource.Aspects.Add(AspectType.Corruption, resources[i].Aspects[AspectType.Corruption]);
                    }
                    else
                    {
                        humanEntity.Resource.Aspects[AspectType.Corruption] = resources[i].Aspects[AspectType.Corruption];
                    }
                }
            }

            humanEntity.UpdateSprite();
        }

        private void CheckToDie(Resource resource)
        {
            if (resource.Type == ResourceType.DeadHuman)
            {
                ResourcePool.Instance.TransformResource(humanEntity, ResourceType.DeadHuman);
            }
            else
            {
                OnProduce(resource);
            }
        }
        #endregion
    }
}