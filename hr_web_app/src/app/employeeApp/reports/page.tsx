'use client';

import { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface ReportData {
    totalRequests: number;
    approvedRequests: number;
    pendingRequests: number;
    rejectedRequests: number;
    totalAmount: number;
    approvalRate: number;
}
interface ExportHistory {
    id: string;
    date: string;
    format: string;
    fileName: string;
}

export default function ReportsPage() {
    const [dateFrom, setDateFrom] = useState('2024-01-01');
    const [dateTo, setDateTo] = useState('2024-02-15');
    const [selectedFormat, setSelectedFormat] = useState('pdf');

    const reportData: ReportData = {
        totalRequests: 12,
        approvedRequests: 8,
        pendingRequests: 2,
        rejectedRequests: 2,
        totalAmount: 2650,
        approvalRate: 67,
    };

    const [exportHistory] = useState<ExportHistory[]>([
        {
            id: '1',
            date: '2024-02-13',
            format: 'PDF',
            fileName: 'requests_report_2024-02-13.pdf',
        },
        {
            id: '2',
            date: '2024-02-01',
            format: 'CSV',
            fileName: 'requests_history_2024-02-01.csv',
        },
        {
            id: '3',
            date: '2024-01-20',
            format: 'PDF',
            fileName: 'requests_report_2024-01-20.pdf',
        },
    ]);

    const stats = [
        {
            label: 'Total Requests',
            value: reportData.totalRequests,
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Approved',
            value: reportData.approvedRequests,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Pending',
            value: reportData.pendingRequests,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            label: 'Total Amount',
            value: reportData.totalAmount,
            icon: DollarSign,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    const handleExport = (format: string) => {
        console.log(`Exporting as ${format} from ${dateFrom} to ${dateTo}`);
        // In real app, call API to generate and download file
        alert(`Report will be downloaded as ${format}`);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Reports</h1>
                <p className="text-gray-600">View your request analytics and export reports.</p>
            </div>

            {/* Date Range Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className={`${stat.bgColor} border border-gray-200 rounded-lg p-6`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Export Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
                {/* Export Options */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Export Report</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Export your request history in your preferred format
                    </p>

                    <div className="space-y-3 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                            <select
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pdf">PDF Report</option>
                                <option value="csv">CSV (Excel)</option>
                                <option value="xlsx">Excel (.xlsx)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => handleExport(selectedFormat)}
                            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Download Report
                        </button>
                        <p className="text-xs text-gray-500 text-center">
                            Period: {new Date(dateFrom).toLocaleDateString()} to {new Date(dateTo).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 text-blue-900">Summary</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-blue-800">Approval Rate</span>
                            <span className="text-2xl font-bold text-blue-600">{reportData.approvalRate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-blue-800">Total Requests</span>
                            <span className="text-2xl font-bold text-blue-600">{reportData.totalRequests}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-blue-800">Total Amount</span>
                            <span className="text-2xl font-bold text-blue-600">{reportData.totalAmount}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                            <span className="text-blue-800 font-medium">Status Breakdown</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                <span className="text-sm text-blue-800">Approved: {reportData.approvedRequests}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                                <span className="text-sm text-blue-800">Pending: {reportData.pendingRequests}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm text-blue-800">Rejected: {reportData.rejectedRequests}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export History */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Recent Exports</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">File Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Format</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 hidden sm:table-cell">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exportHistory.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.fileName}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                            {item.format}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {exportHistory.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-600">No exports yet. Create your first export above.</p>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2">📊 Report Tips</h3>
                <ul className="text-sm text-green-800 space-y-1">
                    <li>• Use date filters to focus on specific periods</li>
                    <li>• PDF reports are great for sharing with stakeholders</li>
                    <li>• CSV exports work with Excel for further analysis</li>
                    <li>• All exports include detailed request information</li>
                </ul>
            </div>
        </div>
    );
}