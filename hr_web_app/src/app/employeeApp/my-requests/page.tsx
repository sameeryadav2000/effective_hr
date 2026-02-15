'use client';

import { useState } from 'react';
import { ChevronDown, Edit, Trash2, MessageSquare, Download } from 'lucide-react';

interface Comment {
  id: string;
  from: string;
  text: string;
  date: string;
}

interface RequestDetail {
  id: string;
  title: string;
  description: string;
  type: 'Expense' | 'Purchase' | 'Leave';
  amount?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  approver: string;
  timeline: {
    submitted: string;
    reviewed?: string;
    approved?: string;
  };
  comments: Comment[];
  attachments?: string[];
}

export default function MyRequestsPage() {
  const [requests] = useState<RequestDetail[]>([
    {
      id: '1',
      title: 'Office Supplies - Desk Lamp',
      description: 'Purchased a desk lamp for better office lighting',
      type: 'Purchase',
      amount: '$150.00',
      status: 'Approved',
      submittedDate: '2024-02-10',
      approver: 'John Manager',
      timeline: {
        submitted: '2024-02-10',
        reviewed: '2024-02-12',
        approved: '2024-02-13',
      },
      comments: [
        {
          id: '1',
          from: 'John Manager',
          text: 'Looks good! This is within budget.',
          date: '2024-02-13',
        },
      ],
      attachments: ['receipt.pdf', 'invoice.pdf'],
    },
    {
      id: '2',
      title: 'Client Meeting - Travel Reimbursement',
      description: 'Flight and hotel for client visit in New York',
      type: 'Expense',
      amount: '$450.00',
      status: 'Pending',
      submittedDate: '2024-02-12',
      approver: 'John Manager',
      timeline: {
        submitted: '2024-02-12',
      },
      comments: [
        {
          id: '1',
          from: 'John Manager',
          text: 'Can you provide the receipts for the hotel?',
          date: '2024-02-13',
        },
      ],
      attachments: ['flight_receipt.pdf'],
    },
    {
      id: '3',
      title: 'Annual Leave - 5 Days',
      description: 'Taking time off for vacation',
      type: 'Leave',
      status: 'Approved',
      submittedDate: '2024-02-01',
      approver: 'Sarah Employee',
      timeline: {
        submitted: '2024-02-01',
        approved: '2024-02-01',
      },
      comments: [],
      attachments: [],
    },
    {
      id: '4',
      title: 'Software License - Adobe Creative Cloud',
      description: 'Annual subscription for design tools',
      type: 'Purchase',
      amount: '$600.00',
      status: 'Rejected',
      submittedDate: '2024-01-28',
      approver: 'Mike Finance',
      timeline: {
        submitted: '2024-01-28',
        reviewed: '2024-01-30',
      },
      comments: [
        {
          id: '1',
          from: 'Mike Finance',
          text: 'Budget exceeded for this quarter. Please resubmit next quarter.',
          date: '2024-01-30',
        },
      ],
      attachments: [],
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Requests</h1>
        <p className="text-gray-600">View all your submitted requests and their status.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Pending
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Approved
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
          Rejected
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4 sm:space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
            {/* Header */}
            <div
              onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
              className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{request.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 flex-wrap">
                    <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Approver: {request.approver}</span>
                    {request.amount && (
                      <>
                        <span>•</span>
                        <span className="font-semibold text-gray-700">{request.amount}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Expand Button */}
                <button className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg transition">
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedId === request.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === request.id && (
              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-6">
                {/* Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="w-0.5 h-12 bg-blue-200 my-1"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Submitted</p>
                        <p className="text-sm text-gray-600">{new Date(request.timeline.submitted).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {request.timeline.reviewed && (
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <div className="w-0.5 h-12 bg-blue-200 my-1"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Under Review</p>
                          <p className="text-sm text-gray-600">{new Date(request.timeline.reviewed).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {request.timeline.approved && (
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Approved</p>
                          <p className="text-sm text-gray-600">{new Date(request.timeline.approved).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments */}
                {request.comments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Comments ({request.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {request.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-gray-900">{comment.from}</p>
                            <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {request.attachments && request.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Attachments</h4>
                    <div className="space-y-2">
                      {request.attachments.map((file, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                        >
                          <Download className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700">{file}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {request.status === 'Pending' && (
                  <div className="flex gap-2 pt-4 border-t border-gray-200 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4" />
                      Withdraw
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">No requests yet. Create your first request to get started.</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Request Status Guide</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <span className="font-medium">Pending</span> - Waiting for your manager to review</li>
          <li>• <span className="font-medium">Approved</span> - Your request has been approved and is being processed</li>
          <li>• <span className="font-medium">Rejected</span> - Your request was rejected. Check the comments for feedback</li>
        </ul>
      </div>
    </div>
  );
}