//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    [CreateAssetMenu(fileName = "BiologicalData", menuName = "BiologicalData")]
    public class BiologicalData : ScriptableObject
    {
        #region Public Properties
        public BiologicalType BiologicalType;
        public List<BiologicalStat> BiologicalStats = new List<BiologicalStat>();
        #endregion

        #region Private Properties

        #endregion

        #region Public Methods

        #endregion

        #region Private Methods

        #endregion
    }
}