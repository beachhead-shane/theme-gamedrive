//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public enum Operation
    {
        Equal,
        LessThan,
        GreatherThan,
    }

    [System.Serializable]
    public struct AspectSpriteData
    {
        #region Public Properties
        public Sprite Sprite;
        public AspectType AspectType;
        public Operation Operation;
        public int Value;
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods
        public bool AspectMatch(Dictionary<AspectType, int> aspects)
        {
            foreach (AspectType aspect in aspects.Keys)
            {
                if (aspect == AspectType)
                {
                    if (PassOperation(aspects[aspect]))
                    {
                        return true;
                    }
                }
            }

            return false;
        }
        #endregion

        #region Private Methods
        private bool PassOperation(int aspectValue)
        {
            switch (Operation)
            {
                case Operation.Equal:
                    return aspectValue == Value;
                case Operation.LessThan:
                    return aspectValue < Value;
                case Operation.GreatherThan:
                    return aspectValue > Value;
                default:
                    return false;
            }
        }
        #endregion
    }
}