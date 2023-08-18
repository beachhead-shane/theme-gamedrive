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
		#endregion

		#region Private Methods

		#endregion
	}
}