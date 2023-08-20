using System;
namespace UnhappyMeatFactory
{
    public static class BehaviourHelper
    {
        public static bool HasInput(List<Resource> listOfInputs, ResourceType resourceType)
        {
            bool result = false;

            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == resourceType)
                {
                    result = true;
                    break;
                }
            }

            return result;
        }

        public static Resource GetFirstInput(List<Resource> listOfInputs, ResourceType resourceType)
        {
            Resource resource = Resource.Default();
            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == resourceType)
                {
                    resource = listOfInputs[i];
                    break;
                }
            }
            return resource;
        }

        public static int GetInputIndex(List<Resource> listOfInputs, ResourceType resourceType)
        {
            int index = -1;
            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == resourceType)
                {
                    index = i;
                    break;
                }
            }
            return index;
        }

        public static void RemoveInput(List<Resource> listOfInputs, ResourceType resourceType)
        {
            int index = -1;
            for (int i = 0; i < listOfInputs.Count; i++)
            {
                if (listOfInputs[i].Type == resourceType)
                {
                    index = i;
                    break;
                }
            }

            listOfInputs.RemoveAt(index);
        }
    }
}

