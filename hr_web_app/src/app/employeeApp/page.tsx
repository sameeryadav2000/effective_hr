'use client';

import { useState } from 'react';
import { Plus, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Request {
  id: string;
  title: string;
  type: 'Expense' | 'Purchase' | 'Leave';
  amount?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  approver?: string;
}

export default function EmployeeDashboard() {
  const [requests] = useState<Request[]>([
    {
      id: '1',
      title: 'Office Supplies - Desk Lamp',
      type: 'Purchase',
      amount: '$150.00',
      status: 'Approved',
      submittedDate: '2024-02-10',
      approver: 'John Manager',
    },
    {
      id: '2',
      title: 'Client Meeting - Travel Reimbursement',
      type: 'Expense',
      amount: '$450.00',
      status: 'Pending',
      submittedDate: '2024-02-12',
      approver: 'John Manager',
    },
    {
      id: '3',
      title: 'Annual Leave - 5 Days',
      type: 'Leave',
      status: 'Approved',
      submittedDate: '2024-02-01',
      approver: 'Sarah Employee',
    },
    {
      id: '4',
      title: 'Software License - Adobe Creative Cloud',
      type: 'Purchase',
      amount: '$600.00',
      status: 'Rejected',
      submittedDate: '2024-01-28',
      approver: 'Mike Finance',
    },
  ]);

  const stats = [
    {
      label: 'Pending Approval',
      value: requests.filter(r => r.status === 'Pending').length.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Approved',
      value: requests.filter(r => r.status === 'Approved').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Rejected',
      value: requests.filter(r => r.status === 'Rejected').length.toString(),
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Expense':
        return 'bg-blue-100 text-blue-800';
      case 'Purchase':
        return 'bg-purple-100 text-purple-800';
      case 'Leave':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} border border-gray-200 rounded-lg p-6`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Create Request Button */}
      <div className="mb-8">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Request
        </button>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Requests</h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{request.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {request.amount || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(request.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{request.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(request.submittedDate).toLocaleDateString()}</p>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition flex-shrink-0">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(request.type)}`}>
                  {request.type}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                {request.amount && (
                  <span className="text-xs text-gray-600 font-medium">{request.amount}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600">No requests yet. Create your first request to get started.</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Quick Tip</h3>
        <p className="text-sm text-blue-800">
          You can create a new request anytime using the "Create New Request" button. Your manager will review it and approve or reject it.
        </p>
      </div>
    </div>
  );
}