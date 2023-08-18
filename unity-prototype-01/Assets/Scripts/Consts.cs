//RenderHeads - Jeff Rusch
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace RenderHeads
{
    public enum PageType
    {
        None,
        Staff,
        Fleet
    }

    public enum BiologicalType
    {
        Person,
        Lion,
        Buck
    }

    public enum BiologicalStatType
    {
        Health,
        Energy,
        Happiness,
        Intoxication,
        MoveSpeed,
        Acceleration,
    }

    public enum MechanicalStatType
    {
        Integrity,
        Fuel,
        TopSpeed,
        Acceleration
    }

    public enum PersonTraitType
    {
        Naturalism,
        Investigation,
        Folklore,
        Drunkard,
        DareDevil,
        Robust,
        Athelete,
        Old,
        Feeble,
    }
}