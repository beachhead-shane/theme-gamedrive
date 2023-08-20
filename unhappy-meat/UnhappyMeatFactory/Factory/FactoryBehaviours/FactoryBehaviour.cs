using System;
namespace UnhappyMeatFactory
{
    public abstract class FactoryBehaviour
    {
        protected abstract bool CanManufacture(List<Resource> listOfInputs);
        protected abstract List<Resource> Manufacture(List<Resource> selectedInputs);
    }
}

