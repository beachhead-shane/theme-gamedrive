import { createSlice } from "@reduxjs/toolkit";
import { ItemType, MessageAction } from "./Types/Items/Item";
import { store } from "./state";
import { pause, placeItem, selectItem, sendMessage } from "./gameReducer";

export interface tutorialSlice {
  tutorialIndex: 0;
}

export const tutorialSteps = [
  () => {
    console.log("dispatching message");
    store.dispatch(
      sendMessage({
        from: "The Custodian",
        message: `Welcome to Tatawala Nature Reserve. As the government-appointed overseer of this land, I must emphasize the importance of your role here. Your lodge operates under our jurisdiction, and we expect you to uphold the highest standards of conservation. Any infractions against our wildlife policies will be dealt with swiftly and decisively.

          For your convenience and to ensure transparency, we've provided a satellite feed. This will allow you to monitor both your lodge and the broader reserve.`,
        action: [
          {
            friendlyName: "Show Satellite Feed",
            action: MessageAction.EnableMap,
          },
        ],
      })
    );

    return true;
  },
  () => {
    if (!store.getState().game.features.map) {
      return false;
    }
    store.dispatch(
      sendMessage({
        from: "The Custodian",
        message: `To get acquainted with the satellite interface, I'd suggest starting with your lodge. I'll place a marker on the map for you. Click on it, and a range of options and details will become available. Go ahead, click on the lodge and explore the available actions.`,
        action: [
          {
            friendlyName: "Thanks, i'll take a look!",
            action: MessageAction.Dismiss,
          },
        ],
      })
    );

    return true;
  },
  () => {
    if (store.getState().game.messages.length > 0) {
      return false;
    }
    store.dispatch(placeItem({ x: 6, y: 7, item: ItemType.Lodge }));
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
    store.dispatch(
      sendMessage({
        from: "The Custodian",
        message: `"Excellent, I see your tracker is prepared and on the field. The lodge to your east, managed by Lysandra Korr, has reported a lion moving in our direction. I'd advise you to deploy your tracker to locate and monitor its movements. It's crucial for the safety of your guests and staff."`,
        action: [
          {
            friendlyName: "Sure, I'll radio that in!",
            action: MessageAction.Dismiss,
          },
        ],
      })
    );

    return true;
  },

  () => {
    const index = store
      .getState()
      .game.cells.findIndex((x) => x.item.itemType === ItemType.Lion);
    if (index < 0) {
      return false;
    }

    if (store.getState().game.cells[index].item.isVisible) {
      store.dispatch(selectItem(store.getState().game.selectedItemUID));
      store.dispatch(pause());
      store.dispatch(
        sendMessage({
          from: "The Custodian",
          message: `Well done on locating the lion. Now, it's time to capitalize on this opportunity. Head over to your relationships screen and inform Lysandra Korr. She has guests eager for such sightings, and if they have a memorable experience, she's willing to share the profits with you. It's a win-win for both lodges.`,
          action: [
            {
              friendlyName: "Sounds good!",
              action: MessageAction.EnableRelationships,
            },
          ],
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
