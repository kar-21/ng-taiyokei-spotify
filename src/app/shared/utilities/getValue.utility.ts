import { Observable } from 'rxjs';

export const getValue = (observable: Observable<any>): any => {
  let value;
  observable.subscribe((v) => (value = v));
  return value;
};
