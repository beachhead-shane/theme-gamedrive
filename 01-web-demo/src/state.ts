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
    console.log("running middleware", action);
    listenerApi.cancelActiveListeners();
    if (store.getState().tutorial.tutorialIndex < tutorialSteps.length) {
      if (tutorialSteps[store.getState().tutorial.tutorialIndex]()) {
        store.dispatch(advanceTutorial());
      }
    }
  },
});

export const store = configureStore({
  reducer: {
    game: gameReducer,
    tutorial: tutorialReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
