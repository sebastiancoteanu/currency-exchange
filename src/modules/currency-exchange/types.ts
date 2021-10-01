export interface Currency {
  symbol: CurrencySymbol;
  abbreviation: string;
  value: string;
  rate: number;
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
