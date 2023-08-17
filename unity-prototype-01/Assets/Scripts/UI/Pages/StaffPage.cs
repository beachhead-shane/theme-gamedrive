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
        private ScrollList scrollList;

        #endregion

        #region Public Methods
        public override void Init(Action<PageType> pageChangeAction, Action pageBackAction)
        {
            base.Init(pageChangeAction, pageBackAction);
            scrollList.Init(ShowView);
        }

        public override void Show()
        {
            base.Show();
            scrollList.AddButton("fred", Guid.NewGuid());
            scrollList.AddButton("tyler", Guid.NewGuid());
            scrollList.AddButton("dirk", Guid.NewGuid());
        }

        public override void Hide()
        {
            base.Hide();
            scrollList.Clear();
        }
        #endregion

        #region Private Methods
        private void ShowView(Guid guid)
        {
            Debug.Log("Showing: " + guid.ToString());
        }
        #endregion
    }
}