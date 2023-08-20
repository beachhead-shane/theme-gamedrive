using System;
namespace UnhappyMeatFactory
{
	public interface IFactoryBehaviour
    {
        public bool CanManufacture(List<Resource> listOfInputs);
        public List<Resource> Run(List<Resource> listOfInputs);
    }
}
