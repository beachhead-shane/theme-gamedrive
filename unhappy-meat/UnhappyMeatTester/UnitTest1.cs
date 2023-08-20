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
      /* Factory farm = new Factory();
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
        Assert.That(result[0].Corruption == 99);*/
    }

    [Test]
    public void ShouldRun4Nodes()
    {
        Factory rainWaterCollector = new Factory();
        rainWaterCollector.AddBehaviour(new CollectRainWater());

        Factory wheatFarm = new Factory();
        wheatFarm.AddBehaviour(new MakeWheatFromWater());

        Factory ranch = new Factory();
        ranch.AddBehaviour(new MakeCowFromWheat());

        Factory butcher = new Factory();
        butcher.AddBehaviour(new ButcherCowMeatBehaviour());

        SupplyChainNode startNode = new SupplyChainNode(rainWaterCollector, null);
        SupplyChainNode wheatNode = new SupplyChainNode(wheatFarm, startNode);
        SupplyChainNode ranchNode = new SupplyChainNode(ranch, wheatNode);
        SupplyChainNode butcheryNode = new SupplyChainNode(butcher, ranchNode);

        List < Factory > factoryChain = new List<Factory>();
         startNode.BuildSupplyPath(ref factoryChain);

        List<Resource> rescoures = new List<Resource>();

        foreach(Factory f in factoryChain)
        {
            f.Consume(rescoures);
           rescoures =  f.Produce();
        }

        Assert.That(rescoures.Count == 1);
        Assert.That(rescoures[0].Type == ResourceType.Meat);
    }

    [Test]
    public void ShouldRun4NodesAndPassCorruption()
    {
        Factory rainWaterCollector = new Factory();
        rainWaterCollector.AddBehaviour(new CollectPollutedWater());

        Factory wheatFarm = new Factory();
        wheatFarm.AddBehaviour(new MakeWheatFromWater());

        Factory ranch = new Factory();
        ranch.AddBehaviour(new MakeCowFromWheat());

        Factory butcher = new Factory();
        butcher.AddBehaviour(new ButcherCowMeatBehaviour());

        SupplyChainNode startNode = new SupplyChainNode(rainWaterCollector, null);
        SupplyChainNode wheatNode = new SupplyChainNode(wheatFarm, startNode);
        SupplyChainNode ranchNode = new SupplyChainNode(ranch, wheatNode);
        SupplyChainNode butcheryNode = new SupplyChainNode(butcher, ranchNode);

        List<Factory> factoryChain = new List<Factory>();
        startNode.BuildSupplyPath(ref factoryChain);

        List<Resource> rescoures = new List<Resource>();

        foreach (Factory f in factoryChain)
        {
            f.Consume(rescoures);
            rescoures = f.Produce();
        }

        Assert.That(rescoures.Count == 1);
        Assert.That(rescoures[0].Type == ResourceType.Meat);
        Assert.That(rescoures[0].HasAspect(AspectType.Corruption));
    }

    [Test]
    public void ShouldRunNodeBranching()
    {
        Factory rainWaterCollector = new Factory();
        rainWaterCollector.AddBehaviour(new CollectPollutedWater());

        Factory wheatFarm = new Factory();
        wheatFarm.AddBehaviour(new MakeWheatFromWater());

        Factory ranch = new Factory();
        ranch.AddBehaviour(new MakeCowFromWheat());

        Factory mill = new Factory();
        mill.AddBehaviour(new MakeFlourFromWheat());

        SupplyChainNode startNode = new SupplyChainNode(rainWaterCollector, null);
        SupplyChainNode wheatNode = new SupplyChainNode(wheatFarm, startNode);
        SupplyChainNode ranchNode = new SupplyChainNode(ranch, wheatNode);
        SupplyChainNode millNode = new SupplyChainNode(mill, wheatNode);

        List<Factory> factoryChain = new List<Factory>();
        startNode.BuildSupplyPath(ref factoryChain);

        List<Resource> rescoures = new List<Resource>();

        foreach (Factory f in factoryChain)
        {
            f.Consume(rescoures);
            rescoures = f.Produce();
        }

        Console.WriteLine(rescoures[0].Type);
        Assert.That(rescoures.Count == 1);
        Assert.That(rescoures[0].Type == ResourceType.Cow);
        Assert.That(rescoures[0].HasAspect(AspectType.Corruption));


        startNode.BuildSupplyPath(ref factoryChain);

        foreach (Factory f in factoryChain)
        {
            f.Consume(rescoures);
            rescoures = f.Produce();
        }

        Console.WriteLine(rescoures[0].Type);
        Assert.That(rescoures.Count == 1);
        Assert.That(rescoures[0].Type == ResourceType.Flour);
        Assert.That(rescoures[0].HasAspect(AspectType.Corruption));

        startNode.BuildSupplyPath(ref factoryChain);

        foreach (Factory f in factoryChain)
        {
            f.Consume(rescoures);
            rescoures = f.Produce();
        }

        Console.WriteLine(rescoures[0].Type);
        Assert.That(rescoures.Count == 1);
        Assert.That(rescoures[0].Type == ResourceType.Cow);
        Assert.That(rescoures[0].HasAspect(AspectType.Corruption));
    }

    [Test]
    public void ShouldRun2Inputs()
    {
        Factory buchery = new Factory();
        buchery.Consume(new List<Resource>() { new Resource(ResourceType.Cow, new Dictionary<AspectType, int> { { AspectType.Animal, 1 } }) });
        buchery.AddBehaviour(new ButcherCowMeatBehaviour());

        Factory bakery = new Factory();
        bakery.Consume(new List<Resource>() { new Resource(ResourceType.Flour, new Dictionary<AspectType, int> { { AspectType.CookingIngredient, 1 } }) });
        bakery.AddBehaviour(new MakeBreadFromFlour());

        Factory kitchen = new Factory();
        kitchen.AddBehaviour(new MakeBurgerFromMeatAndBread());

        SupplyChainNode meatNode = new SupplyChainNode(buchery, null);
        SupplyChainNode breadNode = new SupplyChainNode(bakery, null);
        SupplyChainNode kitchenNode1 = new SupplyChainNode(kitchen, meatNode);
        SupplyChainNode kitchenNode2 = new SupplyChainNode(kitchen, breadNode);

        List<Factory> meatChain = new List<Factory>();
        meatNode.BuildSupplyPath(ref meatChain);

        List<Resource> resources = new List<Resource>();

        foreach (Factory f in meatChain)
        {
            f.Consume(resources);
            resources = f.Produce();
        }

        Console.WriteLine($"Resources after meat chain ({resources.Count}) ({resources[0]})");
        Console.WriteLine($"Resources in kitchen ({kitchen.Resources.Count}) ({kitchen.Resources[0]})");
        Assert.That(resources.Count == 1);
        Assert.That(resources[0].Type == ResourceType.None);
        Assert.That(kitchen.Resources[0].Type == ResourceType.Meat);

        List<Factory> breadChain = new List<Factory>();
        breadNode.BuildSupplyPath(ref breadChain);
        resources = new List<Resource>();

        

        foreach (Factory f in breadChain)
        {
            f.Consume(resources);
            resources = f.Produce();
        }

        Console.WriteLine($"Resources after bread chain ({resources.Count}) ({resources[0]})");
        Console.WriteLine($"Resources in kitchen ({kitchen.Resources.Count}");
        Assert.That(resources.Count == 1);
        Assert.That(resources[0].Type == ResourceType.Burger);
        //Assert.That(rescoures[0].Corruption == 99);


    }
}
