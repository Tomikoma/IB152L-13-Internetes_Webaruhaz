export interface OrderToBeDelivered {
  id: number;
  user_Id: number;
  buyingDate: Date;
  payDate: Date;
  status: string;
  totalPrice: number;
  city: string;
}
