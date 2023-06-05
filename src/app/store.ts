import { configureStore, ThunkAction, Action, DevToolsEnhancerOptions, combineReducers, $CombinedState, CombinedState } from '@reduxjs/toolkit';
import {COUNTER_FEATURE_KEY, counterSlice} from '../features/counter/counterSlice';
import { JUMBO_FEATURE_KEY, jumboSlice } from '../features/jumbo/jumboSlice';

const isDev = process.env.NODE_ENV !== 'production';


const devToolsOptions: DevToolsEnhancerOptions = {
  // this name will be visible in the Redux DevTools extension when debugging the application
  name: 'DEMO-DI-IN-REDUX-TOOLKIT',    
  shouldHotReload: false
};

const slices = {
  [COUNTER_FEATURE_KEY]: counterSlice,
  [JUMBO_FEATURE_KEY]: jumboSlice,
}

const staticReducers = {
  [COUNTER_FEATURE_KEY]: counterSlice.reducer,
  [JUMBO_FEATURE_KEY]: jumboSlice.reducer
}
const rootReducer = combineReducers(staticReducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: isDev ? devToolsOptions : false,
  enhancers: []    
});


export type AppStore = typeof store;
export function storeProvider(): AppStore {
  return store
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// This function should serve the tests.
export const resetAllSlices = () => {
  Object.values(slices).forEach((reducer) => {
    const resetAction = reducer.actions?.reset;    

    if (resetAction) {    
      store.dispatch(resetAction());    
    }

  });
}
