export interface Payment {
  bankAccount: string;
  splitPayment: boolean;
  notes?: string;
}

export interface CreatePurchaseForm {
  invoices: InvoiceItem[];
  client: PurchasingClient;
  deliveryAddress: DeliveryAddress;
  payment: Payment;
}

export interface PurchasingClient {
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  addressLine: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
}

export interface InvoiceItem {
  name: string;
  price: string;
  qty: string;
  discount: boolean;
  vat: string;
}
