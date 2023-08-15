//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class UIController : MonoBehaviour
    {
        #region Public Properties
        public Sidebar Sidebar;
        public PageController PageController;

        public PageType CurrentOpenWindow = PageType.None;
        public PageType PreviousOpenWindow = PageType.None;
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public void Start()
        {
            Sidebar.Init(OnSidebarSelect);
            PageController.Init(OnSidebarSelect, Back);
            OnSidebarSelect(PageType.None);
        }

        public void Back()
        {
            OnSidebarSelect(PreviousOpenWindow);
        }
        #endregion

        #region Private Methods
        private void OnSidebarSelect(PageType pageType)
        {
            PageType previousWindow = CurrentOpenWindow;

            if (pageType == PageType.None)
            {
                previousWindow = PageType.None;
            }
            else if (pageType == PreviousOpenWindow)
            {
                previousWindow = PageType.None;
            }

            PreviousOpenWindow = previousWindow;
            CurrentOpenWindow = pageType;
            Sidebar.SetSidebarSelected(pageType);
            PageController.SetPage(pageType);
        }
        #endregion
    }
}