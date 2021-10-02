export const EXCHANGE_VALUE_REGEX = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;

// eslint-disable-next-line max-len
export const EXCHANGE_RATES_URL = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_API_KEY}/latest`;

// TIME IN SECONDS
export const EXCHANGE_RATES_POLLING_TIME = 1000 * 3600 * 24;
