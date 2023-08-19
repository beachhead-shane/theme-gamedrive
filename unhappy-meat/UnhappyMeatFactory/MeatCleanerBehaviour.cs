using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class MeatSanitizerBehaviour: IFactoryBehaviour
	{

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == ResourceType.Meat)
                {

                    listOfInputs[i] = new Resource(ResourceType.Meat, 0, Class.Animal);
                }
            }

            return listOfInputs;
        }
    }
}
