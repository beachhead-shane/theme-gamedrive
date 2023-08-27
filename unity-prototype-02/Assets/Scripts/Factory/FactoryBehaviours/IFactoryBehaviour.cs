using System;
using System.Collections.Generic;

namespace RenderHeads
{
    public interface IFactoryBehaviour
    {
        public bool CanAcceptResource(ResourceType resourcetype);
        public bool CanManufacture(List<Resource> listOfInputs);
        public Resource Run(List<Resource> listOfInputs);
    }
}

