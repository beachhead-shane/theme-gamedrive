//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;

namespace RenderHeads
{
    public class PageController : MonoBehaviour
    {
        #region Public Properties

        #endregion

        #region Private Properties
        [SerializeField]
        private List<Page> pages = new List<Page>();
        #endregion

        #region Public Methods
        public void Init(System.Action<PageType> pageChangeAction, System.Action pageBackAction)
        {
            pages = GetComponentsInChildren<Page>().ToList();

            for (int i = 0; i < pages.Count; i++)
            {
                pages[i].Init(pageChangeAction, pageBackAction);
            }
        }

        public void SetPage(PageType pageType)
        {
            for (int i = 0; i < pages.Count; i++)
            {
                if (pages[i].PageType == pageType)
                {
                    pages[i].gameObject.SetActive(true);
                } else
                {
                    pages[i].gameObject.SetActive(false);
                }
            }
        }
        #endregion

        #region Private Methods

        #endregion
    }
}