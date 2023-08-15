//RenderHeads - Jeff Rusch
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class StaffPage : Page
    {
        #region Public Properties

        #endregion

        #region Private Properties
        [SerializeField]
        private ListButton listButtonprefab;
        [SerializeField]
        private List<ListButton> listButtons = new List<ListButton>();
        [SerializeField]
        private Transform listButtonSpawn;

        #endregion

        #region Public Methods
        public override void Init(Action<PageType> pageChangeAction, Action pageBackAction)
        {
            base.Init(pageChangeAction, pageBackAction);

        }
        #endregion

        #region Private Methods
        //private void AddButton
        #endregion
    }
}