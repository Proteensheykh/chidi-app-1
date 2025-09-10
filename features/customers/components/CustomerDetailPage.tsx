import React from 'react';
import { Customer } from '../types';
import { Order } from '../../orders/types';

export interface CustomerDetailPageProps {
  customer: Customer | null;
  orders?: Order[];
  onBack: () => void;
  onCreateOrder: () => void;
}

export const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({
  customer,
  orders = [],
  onBack,
  onCreateOrder,
}) => {
  if (!customer) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="mb-4 text-blue-600">
          &larr; Back to Customers
        </button>
        <p>Customer not found</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-600">
        &larr; Back to Customers
      </button>

      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 overflow-hidden">
          {customer.image ? (
            <img src={customer.image} alt={customer.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-600">
              {customer.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <div className="flex space-x-2 text-sm text-gray-600">
            <span>{customer.phone}</span>
            <span>•</span>
            <span>{customer.email}</span>
          </div>
          <div className="mt-1">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                customer.status === 'vip'
                  ? 'bg-purple-100 text-purple-800'
                  : customer.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {customer.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>{customer.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders:</span>
              <span>{customer.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Spent:</span>
              <span className="font-medium">{customer.totalSpent}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Notes</h2>
          <p className="text-gray-700">{customer.notes || "No notes available"}</p>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order History</h2>
        <button
          onClick={onCreateOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Create New Order
        </button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'confirmed'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'pending'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">No orders yet</p>
          <button
            onClick={onCreateOrder}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Create First Order
          </button>
        </div>
      )}
    </div>
  );
};
