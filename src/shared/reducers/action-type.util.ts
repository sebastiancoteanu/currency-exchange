export const REQUEST = (actionType: string): string => `${actionType}_PENDING`;

export const SUCCESS = (actionType: string): string => `${actionType}_FULFILLED`;

export const FAILURE = (actionType: string): string => `${actionType}_REJECTED`;
