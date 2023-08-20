using System;
namespace UnhappyMeatFactory
{
	public class SupplyChainNodePush
	{
		public SupplyChainNodePush Parent;

		public List<SupplyChainNodePush> Children = new List<SupplyChainNodePush>();

		public SupplyChainNodePush ActiveChild => Children[activeSupplyChainChildIndex];

        public Factory Factory;

		private int activeSupplyChainChildIndex = 0;

		public SupplyChainNodePush(Factory f, SupplyChainNodePush parent )
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
