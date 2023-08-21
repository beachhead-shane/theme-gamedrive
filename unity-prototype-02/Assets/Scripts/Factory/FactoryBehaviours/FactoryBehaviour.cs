using System;
using System.Collections.Generic;

namespace RenderHeads
{
    public abstract class FactoryBehaviour
    {
        protected abstract Resource Manufacture(List<Resource> selectedInputs);
    }
}