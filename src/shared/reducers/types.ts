import { Dispatch } from 'redux';

export interface Payload<T> {
  type: string;
  payload: Promise<T> | T;
  // eslint-disable-next-line
  meta?: any;
}

export type GetAction<T, U> =
  (args: T) => Payload<U> | ((dispatch: Dispatch) => Payload<U>);

export type BaseAction<T> = (payload: T) => Payload<T>;
