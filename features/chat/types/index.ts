export interface AIConversation {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'chidi';
  timestamp: Date | string;
  topic: string;
  customer?: string;
  message?: string;
  reply?: string;
  status?: string;
  customerInfo?: {
    phone: string;
    orders: number;
    lastOrder: string;
    image: string | null;
  };
}

export const INITIAL_CONVERSATIONS: AIConversation[] = [
  {
    id: '1',
    content: 'How do I track my inventory?',
    sender: 'user',
    timestamp: new Date('2024-01-15T10:30:00'),
    topic: 'Inventory Management',
  },
  {
    id: '2',
    content: 'Can you help me create a sales report for December?',
    sender: 'user',
    timestamp: new Date('2024-01-10T14:15:00'),
    topic: 'Sales Reports',
  },
  {
    id: '3',
    content: 'What are the best selling products this month?',
    sender: 'user',
    timestamp: new Date('2024-01-05T09:45:00'),
    topic: 'Sales Analysis',
  },
  {
    id: '4',
    content: 'Is my order ready for pickup?',
    sender: 'user',
    timestamp: '2024-01-18T11:20:00',
    topic: 'Order Status',
    customer: 'Jane Adebayo',
    message: 'Is my order ready for pickup?',
    reply: 'Yes, your order #ORD-001234 is ready for pickup at our store.',
    status: 'resolved',
    customerInfo: {
      phone: '+234 801 234 5678',
      orders: 5,
      lastOrder: '3 days ago',
      image: null,
    }
  },
];
