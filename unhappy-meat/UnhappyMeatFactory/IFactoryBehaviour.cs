using System;
namespace UnhappyMeatFactory
{
	public  interface IFactoryBehaviour
    {

        public  List<Resource> Run(List<Resource> listOfInputs);
	}
}
