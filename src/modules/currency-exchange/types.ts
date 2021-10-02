import { Dispatch } from 'redux';
import { Payload } from '../../shared/reducers/types';

export interface Currency {
  symbol: CurrencySymbol;
  abbreviation: string;
  value: number;
  rate?: number;
}

export type CurrencySymbol = SupportedCurrencySymbols | string;

export enum SupportedCurrencySymbols {
  USD = '$',
  EUR = '€',
  CRC = '₡',
  GBP = '£',
  ILS = '₪',
  INR = '₹',
  JPY = '¥',
  KRW = '₩',
  NGN = '₦',
  PHP = '₱',
  PLN = 'zł',
  PYG = '₲',
  THB = '฿',
  UAH = '₴',
  VND = '₫',
}

export type FetchedExchangeRates = Record<string, number>;

export type GetExchangeCurrenciesAction =
  (currencyAbbreviation: string) => Payload<Currency[]> | ((dispatch: Dispatch) => Payload<Currency[]>);

export type SetComparingCurrencyAction = (currency: Currency) => Payload<Currency>;
