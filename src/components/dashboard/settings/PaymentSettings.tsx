// components/dashboard/PaymentSettings.tsx
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4: string;
  brand: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentSettings: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      expiry: '08/24',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const deleteMethod = (id: string) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <p className="text-gray-600">Manage your payment methods and billing</p>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {method.brand} •••• {method.last4}
                  </span>
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Expires {method.expiry}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <>
                  <button
                    onClick={() => setDefaultMethod(method.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMethod(method.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Payment Method */}
      {showAddForm ? (
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Method</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add Card
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors w-full justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Payment Method
        </button>
      )}

      {/* Billing Address */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                defaultValue="123 Main St"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                defaultValue="New York"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                defaultValue="NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                defaultValue="10001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Update Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;