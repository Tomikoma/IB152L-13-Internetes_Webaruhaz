export interface OrderToBeDelivered {
  ID: number;
  USER_ID: number;
  BUYINGDATE: Date;
  PAYDATE: Date;
  STATUS: string;
  TOTALPRICE: number;
  CITY: string;
}
