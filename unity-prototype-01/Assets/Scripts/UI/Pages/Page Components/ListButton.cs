//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;

namespace RenderHeads
{
    public class ListButton : MonoBehaviour
    {
        #region Public Properties
        public Guid Guid;
        #endregion

        #region Private Properties
        [SerializeField]
        private TextMeshProUGUI textMesh;
        [SerializeField]
        private Image backgroundImage;
        private System.Action<Guid> onButtonClickAction;
        #endregion

        #region Public Methods
        public void Init(string buttonText, Guid Guid, System.Action<Guid> onButtonClickAction)
        {
            this.Guid = Guid;
            textMesh.SetText(buttonText);
            this.onButtonClickAction = onButtonClickAction;
            Selected(false);
        }

        public void ButtonClick()
        {
            onButtonClickAction(Guid);
        }

        internal void Selected(bool isSelected)
        {
            backgroundImage.color = (isSelected) ? Color.cyan : Color.white;
        }
        #endregion

        #region Private Methods
        #endregion
    }
}