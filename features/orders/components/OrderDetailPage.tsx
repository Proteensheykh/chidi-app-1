import React from 'react';
import { Order, OrderStatus } from '../types';

export interface OrderDetailPageProps {
  order: Order | null;
  onBack: () => void;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  order,
  onBack,
  onUpdateStatus,
}) => {
  if (!order) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="mb-4 text-blue-600">
          &larr; Back to Orders
        </button>
        <p>Order not found</p>
      </div>
    );
  }

  const statusOptions: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(order.id, e.target.value as OrderStatus);
  };

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-600">
        &larr; Back to Orders
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="border rounded-md p-1 text-sm"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{order.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">{order.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  order.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : order.paymentStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span>{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>{order.customerPhone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-center py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.productName}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">{item.price}</td>
                <td className="text-right py-2">
                  {/* Simple calculation for display purposes */}
                  {`₦${
                    parseInt(item.price.replace(/[₦,]/g, '')) * item.quantity
                  }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td colSpan={3} className="text-right py-2">
                Total:
              </td>
              <td className="text-right py-2">{order.total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {order.notes && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Notes</h2>
          <p className="text-gray-700">{order.notes}</p>
        </div>
      )}
    </div>
  );
};
