export interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  unitPriceInclVat?: number;
  vatRate: number;
  totalExclVat?: number;
  vatAmount?: number;
  totalInclVat?: number;
  total: number;
}

export type InvoicePaymentMethod = 'bank_transfer' | 'cash' | 'card' | 'stripe' | 'paypal' | 'manual';

export type InvoicePaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

export interface InvoicePayment {
  id: string;
  method: InvoicePaymentMethod;
  amount: number;
  currency: string;
  date: string;
  status: InvoicePaymentStatus;
  reference?: string;
  provider?: {
    kind: 'stripe' | 'paypal';
    stripeSessionId?: string;
    stripePaymentIntent?: string;
    paypalOrderId?: string;
  };
  note?: string;
}

export interface InvoiceAddress {
  name: string;
  companyName?: string;
  companyCode?: string;
  vatCode?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  series: string;
  sequenceNumber: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled' | 'overdue';

  orderId?: string;
  /** Human-friendly order number for rendering PDFs. */
  orderNumber?: string;
  /** Optional title displayed in the PDF header bar. */
  documentTitle?: string;
  pdfUrl?: string;
  currency?: string;
  
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  
  seller: InvoiceAddress;
  buyer: InvoiceAddress;
  
  items: InvoiceItem[];
  
  // Amounts
  subtotal: number;
  totalVat: number;
  total: number;
  
  paymentMethod?: InvoicePaymentMethod;
  paymentReference?: string;

  payments?: InvoicePayment[];
  
  bankName?: string;
  bankAccount?: string;
  swift?: string;
  
  notes?: string;
  termsAndConditions?: string;
  
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface InvoiceGenerateRequest {
  buyer: InvoiceAddress;
  items: Omit<InvoiceItem, 'total'>[];
  paymentMethod?: Invoice['paymentMethod'];
  payments?: InvoicePayment[];
  notes?: string;
  dueInDays?: number;

pricesIncludeVat?: boolean;

  orderNumber?: string;
  documentTitle?: string;

  orderId?: string;
  currency?: string; // defaults to EUR when omitted
}

export interface InvoiceSettings {
  series: string;
  nextSequenceNumber: number;
  seller: InvoiceAddress;
  bankName: string;
  bankAccount: string;
  swift: string;
  termsAndConditions: string;
  vatRate: number; // default VAT rate

  currency?: string; // defaults to EUR when omitted
}
