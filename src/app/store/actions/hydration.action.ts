import { createAction, props } from '@ngrx/store';
import { IAppState } from '../states/app.state';

export enum EHydrationProfile {
  HYDRATE = '[hydrate] store',
  HYDRATE_SUCCESS = '[hydrate] store success',
  HYDRATE_FAILURE = '[hydrate] store failure',
}

export const hydrationStore = createAction(EHydrationProfile.HYDRATE);

export const hydrationStoreSuccess = createAction(
  EHydrationProfile.HYDRATE_SUCCESS,
  props<{ state: IAppState }>()
);

export const hydrationStoreFailure = createAction(
  EHydrationProfile.HYDRATE_FAILURE
);
export function hydrate(hydrate: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
    throw new Error('Function not implemented.');
}
