using System;
using UnhappyMeatFactory;

namespace UnhappyMeatFactory
{
	public class ButcherMeatBehaviour: IFactoryBehaviour
	{

        public List<Resource> Run(List<Resource> listOfInputs)
        {
            Resource r  = new Resource(ResourceType.None, 0, Class.InOrganic);
            List<Resource> outputs = new List<Resource>();
            if (listOfInputs.Count() == 1 && listOfInputs[0].Class == Class.Animal)
            {
                r = new Resource(ResourceType.Meat, listOfInputs[0].Corruption, Class.Animal);
            }
            else if
                     (listOfInputs.Count() == 1 && listOfInputs[0].Class == Class.Person)
                {
                    r = new Resource(ResourceType.Meat, 99, Class.Person);
                }

            outputs.Add(r);

            return outputs;
        }
    }
}
