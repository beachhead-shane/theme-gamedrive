import { createSlice } from "@reduxjs/toolkit";
import {
  Feature,
  HasFeature,
  ItemType,
  MessageAction,
} from "./Types/Items/Item";
import { store } from "./state";
import {
  addCharacterAction,
  highlightItem,
  placeItem,
  selectItem,
  sendMessage,
  setView,
} from "./gameReducer";
import { View } from "./Types/View";
import { Character, MissionType } from "./Types/Characters/ICharacter";

export interface tutorialSlice {
  tutorialIndex: 0;
}

export const tutorialSteps = [
  () => {
    console.log("dispatching message");
    store.dispatch(
      sendMessage({
        character: Character.JamesRadebe,
        from: "The Custodian",
        message: `As the government-appointed overseer of this land, I must emphasize the importance of your role here. Your lodge operates under our jurisdiction, and we expect you to uphold the highest standards of conservation. Any infractions against our wildlife policies will be dealt with swiftly and decisively.

          For your convenience and to ensure transparency, we've provided a satellite feed. This will allow you to monitor both your lodge and the broader reserve.`,
        action: [
          {
            friendlyName: "Show Satellite Feed",
            action: MessageAction.EnableMap,
            features: [Feature.Highlight],
          },
        ],
        isRead: false,
        isSelected: false,
      })
    );

    return true;
  },
  () => {
    if (!store.getState().game.features?.map) {
      return false;
    }
    store.dispatch(
      sendMessage({
        character: Character.JamesRadebe,
        from: "The Custodian",
        message: `To get acquainted with the satellite interface, I'd suggest starting with your lodge. I'll place a marker on the map for you. Click on it, and a range of options and details will become available..`,
        action: [
          {
            friendlyName: "Thanks, i'll take a look!",
            action: MessageAction.Dismiss,
            features: [Feature.Highlight],
          },
        ],
        isRead: false,
        isSelected: false,
      })
    );

    return true;
  },
  () => {
    if (store.getState().game.messages.length > 0) {
      return false;
    }
    store.dispatch(placeItem({ x: 6, y: 7, item: ItemType.Lodge }));
    store.dispatch(highlightItem({ x: 6, y: 7 }));
    return true;
  },

  () => {
    if (
      store
        .getState()
        .game.cells.findIndex((x) => x.item.itemType === ItemType.Tracker) < 0
    ) {
      return false;
    }
    store.dispatch(selectItem(store.getState().game.selectedItemUID));
    store.dispatch(placeItem({ x: 1, y: 8, item: ItemType.Lion }));
    const tracker = store
      .getState()
      .game.cells.find((x) => x.item.itemType === ItemType.Tracker);

    store.dispatch(highlightItem({ x: tracker.x, y: tracker.y }));
    store.dispatch(
      sendMessage({
        character: Character.JamesRadebe,
        from: "The Custodian",
        message: `"Excellent, I see your tracker is prepared and on the field. The lodge to your east, managed by Lysandra Korr, has reported a lion moving in our direction. I'd advise you to deploy your tracker to locate and monitor its movements. It's crucial for the safety of your guests and staff."`,
        action: [
          {
            friendlyName: "Sure, I'll radio that in!",
            action: MessageAction.Dismiss,
            features: [Feature.Highlight],
          },
        ],
        isRead: false,
        isSelected: false,
      })
    );

    return true;
  },

  () => {
    const game = store.getState().game;
    console.log("foo", game.bankBalance, game.messages.length);
    if (
      game.bankBalance < 60 &&
      game.messages.length === 0 &&
      game.cells.findIndex((x) => x.item.itemType === ItemType.Tracker) < 0
    ) {
      store.dispatch(
        sendMessage({
          character: Character.JamesRadebe,
          from: "The Custodian",
          message: `I warned you about Tusk. Remember, your operation here is under my purview. However, I'll offer you another opportunity. There's an upcoming wildlife conservation workshop; I suggest you get involved. It will also serve as a good PR boost for your lodge.`,
          action: [
            {
              friendlyName:
                "Thank you for the second chance, Mr. Radebe. I'll get right on organizing that workshop.",
              action: MessageAction.DonateMoney,
              features: [Feature.Highlight],
            },
          ],
          isRead: false,
          isSelected: false,
        })
      );

      return;
    }

    const index = store
      .getState()
      .game.cells.findIndex((x) => x.item.itemType === ItemType.Lion);
    if (index < 0) {
      return false;
    }

    if (HasFeature(store.getState().game.cells[index].item, Feature.Visible)) {
      store.dispatch(selectItem(store.getState().game.selectedItemUID));
      store.dispatch(
        sendMessage({
          character: Character.JamesRadebe,
          from: "The Custodian",
          message: `Well done on locating the lion. Now, it's time to capitalize on this opportunity. Head over to your relationships screen and inform Lysandra Korr. She has guests eager for such sightings, and if they have a memorable experience, she's willing to share the profits with you. It's a win-win for both lodges.`,
          action: [
            {
              friendlyName: "Sounds good!",
              action: MessageAction.EnableRelationships,
              features: [Feature.Highlight],
            },
          ],
          isRead: false,
          isSelected: false,
        })
      );

      return true;
    }
  },

  () => {
    if (store.getState().game.activeMissions.length === 0) {
      return false;
    }
    store.dispatch(setView(View.Map));

    store.dispatch(
      sendMessage({
        character: Character.JamesRadebe,
        from: "The Custodian",
        message: `I've noticed Lysandra dispatching a game vehicle in your direction. I trust you've made a wise decision regarding that Tusk individual. Word around here is that he's more of a storm than a breeze.`,
        action: [
          {
            friendlyName:
              "Thanks for the heads up. I'll keep a close eye on the situation.",
            action: MessageAction.Dismiss,
            features: [Feature.Highlight],
          },
        ],
        isRead: false,
        isSelected: false,
      })
    );

    return true;
  },

  () => {
    const game = store.getState().game;
    if (game.activeMissions.length > 0) {
      return false;
    }

    //bad outcome
    if (
      game.characters.find((x) => x.name === Character.JamesRadebe).stats
        .relationshipStrength < 2
    ) {
      store.dispatch(
        sendMessage({
          character: Character.Tracker,
          from: "Tracker",
          message: `"Elon Tusk just stepped out of the game vehicle and tried to take a selfie with the lion. He's really agitated her. Mr. Radebe is definitely not going to be pleased about this.`,
          action: [
            {
              friendlyName:
                "Thanks for the headsup, ill try do some damage control.",
              action: MessageAction.Dismiss,
              features: [Feature.Highlight],
            },
          ],
          isRead: false,
          isSelected: false,
        })
      );
      store.dispatch(
        addCharacterAction({
          character: Character.JamesRadebe,
          characterAction: {
            question: `I did warn you about that Tusk character!

              Don't forget, your operation here exists at my discretion. However, I'm willing to give you another chance. I've been hearing whispers that he's initiating some sort of project over at Lysandra's Lodge.

              Do you have any insights into what exactly he's planning?`,
            options: [
              {
                response:
                  "As far as I know, Mr. Tusk is just another guest at Lysandra's Lodge (Lie). ",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.JamesRadebe,
                },
              },
              {
                response:
                  "Yes, Mr. Tusk is in the process of installing an advanced wildlife tracking system at Lysandra's Lodge (Truth).",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.JamesRadebe,
                },
              },
            ],
          },
        })
      );

      store.dispatch(
        addCharacterAction({
          character: Character.LysandraKorr,
          characterAction: {
            question: `Mr. Tusk was absolutely thrilled with his experience and is eager to return.

              In fact, he's expressed interest in sponsoring a high-tech wildlife monitoring system for the reserve.

              He believes it will not only help with conservation efforts but also provide real-time data for guests to engage with during their stay. Can you keep this between us for now?`,
            options: [
              {
                response:
                  "Great, Can I get access? You secret is safe with me.",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.LysandraKorr,
                },
              },
              {
                response: "I can' afford to cross Mr Radebe now...",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.LysandraKorr,
                },
              },
            ],
          },
        })
      );
      return true;
    } else {
      store.dispatch(
        sendMessage({
          character: Character.Tracker,
          from: "Tracker",
          message: `The family had an incredible experience. The lioness approached the vehicle quite closely, making for some unforgettable moments. They're on their way back to Lysandra's Lodge as we speak.`,
          action: [
            {
              friendlyName: "Thats great to hear.",
              action: MessageAction.Dismiss,
              features: [Feature.Highlight],
            },
          ],
          isRead: false,
          isSelected: false,
        })
      );
      store.dispatch(
        addCharacterAction({
          character: Character.JamesRadebe,
          characterAction: {
            question: `You handled the situation with Mr. Tusk admirably.

            However, I've been hearing whispers that he's initiating some sort of project over at Lysandra's Lodge.

            Do you have any insights into what exactly he's planning?`,
            options: [
              {
                response:
                  "Yes, Mr. Tusk is in the process of installing an advanced wildlife tracking system at Lysandra's Lodge. She has no intentions of sharing the technology with me (Truth)",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.JamesRadebe,
                },
              },
              {
                response:
                  "As far as I know, Mr. Tusk is just another guest at Lysandra's Lodge, taking in the natural beauty like anyone else would (Lie)",
                riskProfile: 6,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 1,
                  questionFrom: Character.JamesRadebe,
                },
              },
            ],
          },
        })
      );

      store.dispatch(
        addCharacterAction({
          character: Character.LysandraKorr,
          characterAction: {
            question: `Mr. Tusk wasn't pleased about missing the game drive, so he's taking matters into his own hands.

            He's setting up a state-of-the-art wildlife tracking system at my lodge for his personal drives.

            I'm not inclined to extend access to you at this time... unless you can keep it between us?`,
            options: [
              {
                response:
                  "Thats' your perogative. I am sure Mr Radebe would be interested in this.",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.LysandraKorr,
                },
              },

              {
                response: "Sure, your secret is safe with me",
                riskProfile: 1,
                missionAction: {
                  missionType: MissionType.EndGame,
                  uid: crypto.randomUUID(),
                  modifyRelationship: [],
                  rewardMultiplier: 2,
                  questionFrom: Character.LysandraKorr,
                },
              },
            ],
          },
        })
      );
      return true;
    }
  },
];
const initialState: tutorialSlice = {
  tutorialIndex: 0,
};

const slice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    advanceTutorial(state) {
      state.tutorialIndex++;
    },
    loadSaveForTutorialSlice(state) {
      if (localStorage.getItem("board_state")) {
        const stateFromDisk = JSON.parse(localStorage.getItem("board_state"))[
          "tutorial"
        ];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state.tutorialIndex = stateFromDisk.tutorialIndex;
      }
    },
  },
});

export const { advanceTutorial, loadSaveForTutorialSlice } = slice.actions;
export default slice.reducer;
