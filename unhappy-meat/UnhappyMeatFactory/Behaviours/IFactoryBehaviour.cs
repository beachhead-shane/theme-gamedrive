using System;
namespace UnhappyMeatFactory
{
	public interface IFactoryBehaviour
    {
        public List<Resource> Run(List<Resource> listOfInputs);
        public bool HasCorrectInputs(List<Resource> listOfInputs);
        public List<Resource> Manufacture(List<Resource> selectedInputs);
    }
}
