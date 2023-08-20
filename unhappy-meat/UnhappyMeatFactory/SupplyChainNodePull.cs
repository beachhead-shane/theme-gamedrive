using System;
using System.Collections.Generic;

namespace UnhappyMeatFactory
{
	public class SupplyChainNodePull
	{
		public SupplyChainNodePull Parent;

		public List<SupplyChainNodePull> Children = new List<SupplyChainNodePull>();

        public Factory Factory;

		public SupplyChainNodePull(Factory f, SupplyChainNodePull parent )
		{
			Factory = f;
			Parent = parent;
			if (parent != null)
			{
				parent.Children.Add(this);
			}
		}

        //public List<Resource> TryProduce(List<Resource> inputs)
        //{
        //    Console.WriteLine($"[{Factory.Name}] Before - inputs: ({inputs.Count})");
        //    if (inputs.Count > 0)
        //    {
        //        Console.WriteLine($"inputs Type: ({inputs[0].Type})");
        //    }

        //   // List<Resource> outputs = new List<Resource>();
        //    Factory.Consume(inputs);
        //    if (Factory.CanProduce())
        //    {
        //        inputs = Factory.Produce();
        //    }
        //    else
        //    {
        //        foreach (var child in Children)
        //        {
        //            child.TryProduce(new List<Resource>());
        //        }
        //    }

        //    if (Parent != null)
        //    {
        //        Parent.TryProduce(inputs);
        //    }

        //    Console.WriteLine($"[{Factory.Name}] After - inputs: ({inputs.Count})");
        //    if (inputs.Count > 0)
        //    {
        //        Console.WriteLine($"Output Type: ({inputs[0].Type})");
        //    }

        //    return inputs;
        //}

        //public List<Resource> TryProduce()
        //{
        //    List<Resource> outputs = new List<Resource>();
        //    if (!Factory.CanProduce())
        //    {
        //        RequestChildren();
        //    }

        //    if (Factory.CanProduce())
        //    {
        //        Console.WriteLine($"[{Factory.Name}] Producing");
        //        outputs = Factory.Produce();
        //    }

        //    Console.WriteLine($"[{Factory.Name}] Completed");
        //    return outputs;
        //}

        //public void RequestResource()
        //{
        //    Console.WriteLine($"[{Factory.Name}] Requested");
        //    if (Factory.CanProduce())
        //    {
        //        List<Resource> outputs = Factory.Produce();
        //        Parent.Factory.Consume(outputs);
        //        Parent.Factory.Produce();
        //    } else
        //    {
        //        RequestChildren();
        //    }
        //}

        //private void RequestChildren()
        //{
        //    Console.WriteLine($"[{Factory.Name}] Requesting");
        //    for (int i = 0; i < Children.Count; i++)
        //    {
        //        Children[i].RequestResource();
        //    }
        //}

    }
}
