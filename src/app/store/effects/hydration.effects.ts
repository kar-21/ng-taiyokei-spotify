import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import * as HydrationActions from '../actions/hydration.action';

@Injectable()
export class HydrationEffect implements OnInitEffects {
  constructor(private actions: Actions, private store: Store) {}

  hydrate = createEffect(() =>
    this.actions.pipe(
      ofType(HydrationActions.EHydrationProfile.HYDRATE),
      map(() => {
        const storageValue = localStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            HydrationActions.hydrationStoreSuccess({ state });
          } catch {
            localStorage.removeItem('state');
          }
        }
        return HydrationActions.hydrationStoreFailure();
      })
    )
  );

  serialize = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          HydrationActions.EHydrationProfile.HYDRATE_SUCCESS,
          HydrationActions.EHydrationProfile.HYDRATE_FAILURE
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem('state', JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrationStore();
  }
}
