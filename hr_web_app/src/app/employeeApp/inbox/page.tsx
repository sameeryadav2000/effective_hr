'use client';

import { useState } from 'react';
import { Mail, Check, MessageSquare, AlertCircle, Clock } from 'lucide-react';

interface InboxItem {
  id: string;
  title: string;
  message: string;
  type: 'Approved' | 'Rejected' | 'Comment' | 'Pending';
  requestId: string;
  from: string;
  date: string;
  read: boolean;
}

export default function InboxPage() {
  const [inbox] = useState<InboxItem[]>([
    {
      id: '1',
      title: 'Request Approved',
      message: 'Your office supplies purchase request has been approved.',
      type: 'Approved',
      requestId: '1',
      from: 'John Manager',
      date: '2024-02-13',
      read: true,
    },
    {
      id: '2',
      title: 'Awaiting Approval',
      message: 'Your travel reimbursement is awaiting manager review.',
      type: 'Pending',
      requestId: '2',
      from: 'John Manager',
      date: '2024-02-12',
      read: false,
    },
    {
      id: '3',
      title: 'Request Rejected',
      message: 'Your Adobe Creative Cloud license request was rejected. Budget limit exceeded.',
      type: 'Rejected',
      requestId: '4',
      from: 'Mike Finance',
      date: '2024-02-10',
      read: true,
    },
    {
      id: '4',
      title: 'New Comment',
      message: 'John Manager commented: "Can you provide the receipt for this expense?"',
      type: 'Comment',
      requestId: '2',
      from: 'John Manager',
      date: '2024-02-09',
      read: true,
    },
    {
      id: '5',
      title: 'Request Approved',
      message: 'Your leave request for 5 days has been approved.',
      type: 'Approved',
      requestId: '3',
      from: 'Sarah Employee',
      date: '2024-02-08',
      read: true,
    },
    {
      id: '6',
      title: 'Awaiting Approval',
      message: 'Your new request is submitted and waiting for approval.',
      type: 'Pending',
      requestId: '5',
      from: 'System',
      date: '2024-02-07',
      read: true,
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Approved':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'Rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'Comment':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Mail className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Approved':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'Rejected':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'Comment':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'Pending':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const unreadCount = inbox.filter(item => !item.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Inbox</h1>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-gray-600">Stay updated on your requests and approvals.</p>
      </div>

      {/* Filters/Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Unread
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Approved
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Pending
        </button>
      </div>

      {/* Inbox List */}
      <div className="space-y-3 sm:space-y-4">
        {inbox.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-4 sm:p-5 transition cursor-pointer ${getTypeColor(item.type)} ${
              !item.read ? 'border-l-4' : ''
            }`}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 flex items-start pt-1">
                {getTypeIcon(item.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {!item.read && (
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-2">{item.message}</p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="font-medium">{item.from}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <button className="text-xs text-blue-600 hover:underline font-medium">
                    View Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {inbox.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Your inbox is empty</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📬 Inbox Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• You'll get notifications when your requests are approved or rejected</li>
          <li>• Managers may comment on your requests asking for more information</li>
          <li>• Filter by status to find what you're looking for quickly</li>
        </ul>
      </div>
    </div>
  );
}