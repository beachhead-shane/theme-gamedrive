import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import gameReducer, { processBoard } from "./gameReducer";
import tutorialReducer, {
  advanceTutorial,
  tutorialSteps,
} from "./tutorialReducer";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: processBoard,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    if (store.getState().tutorial.tutorialIndex < tutorialSteps.length) {
      if (tutorialSteps[store.getState().tutorial.tutorialIndex]()) {
        store.dispatch(advanceTutorial());
      }
    }
  },
});

const boardSaver = createListenerMiddleware();
boardSaver.startListening({
  actionCreator: processBoard,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    localStorage.setItem("board_state", JSON.stringify(store.getState()));
  },
});

export const store = configureStore({
  reducer: {
    game: gameReducer,
    tutorial: tutorialReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .prepend(boardSaver.middleware),
});
