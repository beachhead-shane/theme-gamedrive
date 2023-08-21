//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using System;

namespace RenderHeads
{
	[CreateAssetMenu(fileName = "DataKeeper", menuName = "DataKeeper")]
	public class DataKeeper : ScriptableObject
	{
		#region Public Properties
		public static DataKeeper Instance
		{
			get
			{
				if (_instance == null)
				{
					Init();
				}

				return _instance;
			}
		}
		[Serializable]
        public struct ResourceAsset
		{
			public ResourceType ResourceType;
			public ResourceEntity ResourceEntity;
		}

		public ResourceAsset[] ResourceAssets;
        #endregion

        #region Private Properties
        private static DataKeeper _instance;
		#endregion

		#region Public Methods
		public static void Init()
		{
			_instance = Resources.LoadAll(string.Empty, typeof(DataKeeper)).FirstOrDefault() as DataKeeper;
			Debug.Log($"[DataKeeper] Initializated ({_instance != null})");
		}

		public bool TryGetResourceEntity(ResourceType resourceType, out ResourceEntity resourceEntity)
		{
			resourceEntity = null;

            for (int i = 0; i < ResourceAssets.Length; i++)
			{
				if (ResourceAssets[i].ResourceType== resourceType)
				{
					resourceEntity = ResourceAssets[i].ResourceEntity;
					break;
                }
			}

			return resourceEntity != null;
		}
		#endregion

		#region Private Methods

		#endregion
	}

	
}