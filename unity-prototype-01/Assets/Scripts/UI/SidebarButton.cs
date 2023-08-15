//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace RenderHeads
{
    public class SidebarButton : MonoBehaviour
    {
        #region Public Properties
        public PageType SidebarButtonType;
        #endregion

        #region Private Properties
        [SerializeField]
        private Image image;
        private System.Action<PageType> onClickAction;
        #endregion

        #region Public Methods
        public void Init(System.Action<PageType> onClickAction)
        {
            this.onClickAction = onClickAction;
        }

        public void OnClick()
        {
            Debug.Log("Clicked");
            onClickAction(SidebarButtonType);
        }

        public void SetSelected(bool isSelected)
        {
            if (isSelected)
            {
                image.color = Color.cyan;
            }
            else
            {
                image.color = Color.white;
            }
        }
        #endregion

        #region Private Methods

        #endregion
    }
}