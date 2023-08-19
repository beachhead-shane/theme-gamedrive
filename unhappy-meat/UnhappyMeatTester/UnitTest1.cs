using UnhappyMeatFactory;

namespace UnhappyMeatTester;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }


    [Test]
    public void ShouldReturnMeatGivenACow()
    {



        Factory farm = new Factory();
        farm.Consume(new List<Resource>() { new Resource(ResourceType.Cow, 0, Class.Animal) });
        farm.Consume(new List<Resource>() { new Resource(ResourceType.Human, 10, Class.Person) });

        Factory butcher = new Factory();
        butcher.AddBehaviour(new ButcherMeatBehaviour());
        SupplyChainNode startNode = new SupplyChainNode(farm, null);
        SupplyChainNode butcheryNode = new SupplyChainNode(butcher, startNode);


        List<Resource> result = startNode.ProcessSupplyChain(new List<Resource>());
        Assert.That(result[0].Type == ResourceType.Meat);
        Assert.That(result[0].Corruption == 0);


         result = startNode.ProcessSupplyChain(new List<Resource>());
        Assert.That(result[0].Type == ResourceType.Meat);
        Assert.That(result[0].Corruption == 99);



    }
}
