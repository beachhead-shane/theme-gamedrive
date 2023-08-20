using UnhappyMeatFactory;

namespace UnhappyMeatTester;

public class PullChainTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void ShouldRunSimplePullChain()
    {
        //Factory wheatField = new Factory("wheatField");
        //wheatField.AddBehaviour(new MakeWheatFromWater());

        //Factory well = new Factory("well");
        //well.AddBehaviour(new CollectRainWater());

        //SupplyChainNodePull endChainNode = new SupplyChainNodePull(wheatField, null);
        //SupplyChainNodePull wellNode = new SupplyChainNodePull(well, endChainNode);

        //List<Resource> outputs = endChainNode.TryProduce();
        //Console.WriteLine($"[ShouldRunSimplePullChain] output Count: {outputs.Count}");
        //Assert.That(outputs.Count > 0);
        //Assert.That(outputs[0].Type == ResourceType.Wheat);
    }

    [Test]
    public void ShouldRunSimple3PullChain()
    {
        //Factory mill = new Factory("mill");
        //mill.AddBehaviour(new MakeFlourFromWheat());

        //Factory wheatField = new Factory("wheatField");
        //wheatField.AddBehaviour(new MakeWheatFromWater());

        //Factory well = new Factory("well");
        //well.AddBehaviour(new CollectRainWater());

        //SupplyChainNodePull endChainNode = new SupplyChainNodePull(mill, null);
        //SupplyChainNodePull wheatNode = new SupplyChainNodePull(wheatField, endChainNode);
        //SupplyChainNodePull wellNode = new SupplyChainNodePull(well, wheatNode);

        //List<Resource> outputs = endChainNode.TryProduce();
        //Console.WriteLine($"[ShouldRunSimplePullChain] output Count: {outputs.Count}");
        //Assert.That(outputs.Count > 0);
        //Assert.That(outputs[0].Type == ResourceType.Flour);
    }
}