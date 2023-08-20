using System;
namespace UnhappyMeatFactory
{
    public abstract class FactoryBehaviour
    {
        protected abstract List<Resource> Manufacture(List<Resource> selectedInputs);
    }
}

