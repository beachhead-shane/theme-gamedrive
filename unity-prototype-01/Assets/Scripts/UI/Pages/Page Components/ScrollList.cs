//RenderHeads - Jeff Rusch
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public class ScrollList : MonoBehaviour
    {
        #region Public Properties
        public int SelectedIndex = -1;
        #endregion

        #region Private Properties
        [SerializeField]
        private ListButton listButtonPrefab;
        [SerializeField]
        private List<ListButton> listButtons = new List<ListButton>();


        #endregion
        private System.Action<Guid> onClickAction;
        #region Public Methods
        public void Init(System.Action<Guid> onClickAction)
        {
            this.onClickAction = onClickAction;
        }

        public ListButton AddButton(string buttonText, Guid guid)
        {
            ListButton listButton = Instantiate(listButtonPrefab, this.transform);
            listButtons.Add(listButton);
            listButton.Init(buttonText, guid, OnButtonClick);

            if (SelectedIndex < 0)
            {
                OnButtonClick(guid);
            }

            return listButton;
        }
        #endregion

        #region Private Methods
        private void OnButtonClick(Guid guid)
        {
            SelectButton(guid);
            onClickAction(guid);
        }

        private int GetButtonIndexFromGuid(Guid guid)
        {
            int index = -1;
            for (int i = 0; i < listButtons.Count; i++)
            {
                if (listButtons[i].Guid == guid)
                {
                    index = i;
                    break;
                }
            }

            return index;
        }

        private void SelectButton(Guid guid)
        {
            for (int i = 0; i < listButtons.Count; i++)
            {
                if (listButtons[i].Guid == guid)
                {
                    listButtons[i].Selected(true);
                    SelectedIndex = i;
                }
                else
                {
                    listButtons[i].Selected(false);
                }
            }
        }

        internal void Clear()
        {
            for (int i = 0; i < listButtons.Count; i++)
            {
                Destroy(listButtons[i].gameObject);
            }

            listButtons.Clear();
        }
        #endregion
    }
}