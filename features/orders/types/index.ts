export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  notes?: string;
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerId: 1,
    customerName: "Jane Adebayo",
    customerPhone: "+234 801 234 5678",
    items: [
      { productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" },
      { productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" }
    ],
    total: "₦50,000",
    status: "delivered",
    paymentStatus: "paid",
    orderDate: "Feb 15, 2024",
    notes: "Customer requested gift wrapping"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerId: 2,
    customerName: "Mike Johnson",
    customerPhone: "+234 802 345 6789",
    items: [
      { productId: 2, productName: "Casual Sneakers", quantity: 1, price: "₦25,000" }
    ],
    total: "₦25,000",
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "Feb 20, 2024",
    notes: ""
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerId: 3,
    customerName: "Sarah Okafor",
    customerPhone: "+234 803 456 7890",
    items: [
      { productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" }
    ],
    total: "₦15,000",
    status: "confirmed",
    paymentStatus: "paid",
    orderDate: "Feb 25, 2024",
    notes: "Express delivery requested"
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerId: 1,
    customerName: "Jane Adebayo",
    customerPhone: "+234 801 234 5678",
    items: [
      { productId: 2, productName: "Casual Sneakers", quantity: 2, price: "₦50,000" }
    ],
    total: "₦50,000",
    status: "pending",
    paymentStatus: "pending",
    orderDate: "Feb 28, 2024",
    notes: ""
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customerId: 5,
    customerName: "Blessing Okoro",
    customerPhone: "+234 805 678 9012",
    items: [
      { productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" },
      { productId: 4, productName: "Wireless Earbuds", quantity: 1, price: "₦18,000" }
    ],
    total: "₦53,000",
    status: "processing",
    paymentStatus: "paid",
    orderDate: "Mar 1, 2024",
    notes: "First-time customer"
  }
];
