using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MakeCowFromNothingBehaviour: IFactoryBehaviour
	{

        public List<Resource> Run(List<Resource> listOfInputs)
        {

            return new List<Resource>(){ new Resource(ResourceType.Cow, listOfInputs[0].Corruption, Class.Animal)};

        }
    }
}
