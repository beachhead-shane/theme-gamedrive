using System;
using System.Collections.Generic;

namespace RenderHeads
{
    public abstract class FactoryBehaviour
    {
        protected bool IsOneShot = false;

        protected FactoryBehaviour(bool isOneShot = false)
        {
            IsOneShot = isOneShot;
        }

        protected abstract Resource Manufacture(List<Resource> selectedInputs);
    }
}