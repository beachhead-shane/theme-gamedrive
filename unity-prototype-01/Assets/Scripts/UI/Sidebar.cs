//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using System;

namespace RenderHeads
{
    public class Sidebar : MonoBehaviour
    {
        #region Public Properties

        #endregion

        #region Private Properties
        [SerializeField]
        private List<SidebarButton> sidebarButtons = new List<SidebarButton>();
        #endregion

        #region Public Methods
        public void Init(Action<PageType> onClickAction)
        {
            sidebarButtons = GetComponentsInChildren<SidebarButton>().ToList();

            for (int i = 0; i < sidebarButtons.Count; i++)
            {
                sidebarButtons[i].Init(onClickAction);
            }
        }

        public void SetSidebarSelected(PageType sidebarButtonType)
        {
            for (int i = 0; i < sidebarButtons.Count; i++)
            {
                sidebarButtons[i].SetSelected(sidebarButtons[i].SidebarButtonType == sidebarButtonType);
            }
        }
        #endregion

        #region Private Methods

        #endregion
    }
}