//RenderHeads - Jeff Rusch
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class Page : MonoBehaviour
    {
        #region Public Properties
        public PageType PageType;

        #endregion

        #region Private Properties
        private System.Action<PageType> pageChangeAction;
        private System.Action pageBackAction;
        #endregion

        #region Public Methods
        public virtual void Init(System.Action<PageType> pageChangeAction, System.Action pageBackAction)
        {
            this.pageChangeAction = pageChangeAction;
            this.pageBackAction = pageBackAction;
        }

        public void SetPage(PageType pageType)
        {
            pageChangeAction(pageType);
        }

        public void Pageback()
        {
            pageBackAction();
        }

        public void Close()
        {
            pageChangeAction(PageType.None);
        }

        public virtual void Show()
        {
            this.gameObject.SetActive(true);
        }

        public virtual void Hide()
        {
            this.gameObject.SetActive(false);
        }
        #endregion

        #region Private Methods

        #endregion
    }
}