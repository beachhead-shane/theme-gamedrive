using System;
namespace UnhappyMeatFactory
{
	public class SupplyChainNode
	{
		public SupplyChainNode Parent;

		//TODO make a list for multiple leaf nodes
		public SupplyChainNode Child;

		public Factory Factory;

		public SupplyChainNode(Factory f, SupplyChainNode parent )
		{
			Factory = f;
			Parent = parent;
			if (parent != null)
			{
				parent.Child = this;
			}
		}

		public List<Resource> ProcessSupplyChain(List<Resource> inputs)
		{

			if (Parent == null)
			{
				Factory.Consume(inputs);
				inputs = Factory.Produce();
				if (Child == null)
				{
					return inputs;
				}
                return Child.ProcessSupplyChain(inputs);
            }
			else
			{
				if (Child== null)
				{
                    Factory.Consume(inputs);
                    inputs = Factory.Produce();
					return inputs;
                }
				return Child.ProcessSupplyChain(inputs);
			}


		}




	}
}
