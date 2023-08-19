using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class HumanManureBehaviour: IFactoryBehaviour
	{

        public List<Resource> Run(List<Resource> listOfInputs)
        {

            for (int i =0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == ResourceType.Cow)
                {
                    int corruptions = listOfInputs[i].Corruption + 1;
                    listOfInputs[i] = new Resource(ResourceType.Cow, corruptions, Class.Animal);
                }
            }

            return listOfInputs;

        }
    }
}
