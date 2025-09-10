export type CustomerStatus = "vip" | "active" | "inactive";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  lastOrder: string;
  status: CustomerStatus;
  notes?: string;
  joinDate: string;
  image?: string | null;
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Jane Adebayo",
    phone: "+234 801 234 5678",
    email: "jane.adebayo@email.com",
    location: "Lagos, Nigeria",
    totalOrders: 12,
    totalSpent: "₦285,000",
    lastOrder: "2 days ago",
    status: "vip",
    notes: "Prefers WhatsApp communication. Regular customer. Loves Ankara styles.",
    joinDate: "Oct 2023",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mike Johnson",
    phone: "+234 802 345 6789",
    email: "mike.j@email.com",
    location: "Abuja, Nigeria",
    totalOrders: 7,
    totalSpent: "₦175,000",
    lastOrder: "1 week ago",
    status: "active",
    notes: "Interested in sneakers and electronics. Corporate buyer.",
    joinDate: "Nov 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Okafor",
    phone: "+234 803 456 7890",
    email: "sarah.okafor@email.com",
    location: "Port Harcourt, Nigeria",
    totalOrders: 4,
    totalSpent: "₦95,000",
    lastOrder: "3 days ago",
    status: "active",
    notes: "Fashion enthusiast. Prefers Instagram communication.",
    joinDate: "Dec 2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Emeka",
    phone: "+234 804 567 8901",
    email: "david.emeka@email.com",
    location: "Enugu, Nigeria",
    totalOrders: 15,
    totalSpent: "₦420,000",
    lastOrder: "3 months ago",
    status: "inactive",
    notes: "High-value customer but hasn't ordered recently. Bulk buyer.",
    joinDate: "Aug 2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Blessing Okoro",
    phone: "+234 805 678 9012",
    email: "blessing.okoro@email.com",
    location: "Kano, Nigeria",
    totalOrders: 3,
    totalSpent: "₦65,000",
    lastOrder: "5 days ago",
    status: "active",
    notes: "New customer. Interested in accessories.",
    joinDate: "Jan 2024",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
];
