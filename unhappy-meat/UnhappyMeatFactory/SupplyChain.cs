using System;
namespace UnhappyMeatFactory
{
	public class SupplyChainNode
	{
		public SupplyChainNode Parent;

		public List<SupplyChainNode> Children = new List<SupplyChainNode>();

		public SupplyChainNode ActiveChild => Children[activeSupplyChainChildIndex];

        public Factory Factory;

		private int activeSupplyChainChildIndex = 0;

		public SupplyChainNode(Factory f, SupplyChainNode parent )
		{
			Factory = f;
			Parent = parent;
			if (parent != null)
			{
				parent.Children.Add(this);
			}
		}

		public void BuildSupplyPath( ref List<Factory> foundFactories)
		{
			foundFactories.Add(this.Factory);
			if (Children.Count > 0)
			{
                ActiveChild.BuildSupplyPath(ref foundFactories);
				ShuffleActiveChild();

            }
		}

		private void ShuffleActiveChild()
		{
			activeSupplyChainChildIndex = (activeSupplyChainChildIndex + 1) % Children.Count;

        }
	}
}
