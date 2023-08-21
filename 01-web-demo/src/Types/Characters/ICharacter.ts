enum CharacterRole {
  Custodian = "Custodian", //James Radebe
  LodgeManager = "Lodge Manager",
  Staff = "Staff",
}

export interface MissionAction {
  uid: string;
  questionFrom: Character;
  modifyRelationship: Array<{ character: Character; value: number }>;
  rewardMultiplier: number;
  missionType: MissionType;
}

export enum MissionType {
  GameDrive = "GameDrive",
  EndGame = "EndGame",
}
interface ICharacterActionQuestionOption {
  response: string;
  riskProfile: number;
  missionAction: MissionAction;
}
export interface ICharacterAction {
  question: string;
  options: Array<ICharacterActionQuestionOption>;
}
export interface ICharacterStats {
  relationshipStrength: number;
}
export interface ICharacter {
  showRelationship: boolean;
  name: Character;
  role: CharacterRole;
  description: string;
  thumbnailSrc: string;
  stats: ICharacterStats;
  actions: Array<ICharacterAction>;
}
``;
export const enum Character {
  Tracker = "Tracker",
  JamesRadebe = "James Radebe",
  LysandraKorr = "Lysandra Korr",
}

export const Custodian: () => ICharacter = () => {
  return {
    showRelationship: true,
    name: Character.JamesRadebe,
    role: CharacterRole.Custodian,
    thumbnailSrc: "custodian.png",
    stats: {
      relationshipStrength: 3,
    },
    actions: [],
    description:
      "A stern, middle-aged man with sharp, assessing eyes that have seen decades of bureaucratic battles. His graying hair and crisp uniform speak of a life dedicated to the protection of Tatawala Nature Reserve. While his demeanor is often rigid, there's an underlying passion for the land and its creatures. His reputation as a strict enforcer of rules is tempered by a deep respect from those who understand his mission.",
  };
};

export const Tracker: () => ICharacter = () => {
  return {
    showRelationship: false,
    name: Character.Tracker,
    thumbnailSrc: "tracker.png",
    role: CharacterRole.Staff,

    stats: {
      relationshipStrength: 6,
    },
    actions: [],
    description: "",
  };
};

export const LysandraKorr: () => ICharacter = () => {
  return {
    showRelationship: true,
    name: Character.LysandraKorr,
    thumbnailSrc: "lysandra.png",
    role: CharacterRole.LodgeManager,
    stats: {
      relationshipStrength: 6,
    },
    actions: [
      {
        question:
          "I've got guests lined up for a game drive, but there's a VIP, Elon Tusk, who's requesting a private tour. He's willing to pay a premium, and I'll split the extra profits with you if we can prioritize him. What do you think?",
        options: [
          {
            response: "Sure, sounds like a deal! We'll accommodate Mr. Tusk",
            riskProfile: 4,
            missionAction: {
              uid: crypto.randomUUID(),
              rewardMultiplier: 2,
              modifyRelationship: [
                { character: Character.LysandraKorr, value: 2 },
                { character: Character.JamesRadebe, value: -2 },
              ],
              missionType: MissionType.GameDrive,
              questionFrom: Character.LysandraKorr,
            },
          },
          {
            response:
              "No, I'd rather serve the family that's been waiting patiently.",
            riskProfile: 1,
            missionAction: {
              uid: crypto.randomUUID(),
              rewardMultiplier: 1,
              modifyRelationship: [
                { character: Character.LysandraKorr, value: -2 },
                { character: Character.JamesRadebe, value: 2 },
              ],
              missionType: MissionType.GameDrive,
              questionFrom: Character.LysandraKorr,
            },
          },
        ],
      },
    ],
    description:
      "A vibrant woman in her early forties, Lysandra exudes a magnetic charisma. Her sun-kissed skin and freckles hint at countless hours spent outdoors, while her keen hazel eyes miss no detail. Her lodge's success is a testament to her entrepreneurial spirit. With a mane of curly auburn hair often pulled back in a loose bun, she moves with a grace that suggests a background in dance. Lysandra's laughter is infectious, and her passion for wildlife is palpable.",
  };
};
