import { IAppState } from 'src/app/store/states/app.state';
import { Action, ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import * as HydrationActions from '../actions/hydration.action';

export const hydrationMetaReducer =
  (reducer: ActionReducer<IAppState>): ActionReducer<IAppState> =>
  (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
