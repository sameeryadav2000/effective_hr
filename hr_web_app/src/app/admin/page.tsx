'use client';

import { useState } from 'react';
import { Plus, Users, Settings, LogOut, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Approver' | 'Employee';
  status: 'Active' | 'Pending';
  joinedDate: string;
}

interface InviteForm {
  email: string;
  role: 'Employee' | 'Approver';
}

export default function AdminDashboard() {
  const [companyName] = useState('Acme Corp');
  const [adminEmail] = useState('admin@acme.com');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState<InviteForm>({ email: '', role: 'Employee' });
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Manager',
      email: 'john@acme.com',
      role: 'Approver',
      status: 'Active',
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sarah Employee',
      email: 'sarah@acme.com',
      role: 'Employee',
      status: 'Active',
      joinedDate: '2024-01-20',
    },
    {
      id: '3',
      name: 'Mike Finance',
      email: 'mike@acme.com',
      role: 'Approver',
      status: 'Pending',
      joinedDate: '2024-02-01',
    },
  ]);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSuccess('');

    if (!inviteForm.email) {
      setInviteError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteForm.email)) {
      setInviteError('Please enter a valid email');
      return;
    }

    // Check if email already exists
    if (teamMembers.some(m => m.email === inviteForm.email)) {
      setInviteError('This email is already invited');
      return;
    }

    // Simulate adding team member
    const newMember: TeamMember = {
      id: String(teamMembers.length + 1),
      name: inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: inviteForm.role === 'Approver' ? 'Approver' : 'Employee',
      status: 'Pending',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setTeamMembers([...teamMembers, newMember]);
    setInviteSuccess(`Invite sent to ${inviteForm.email}`);
    setInviteForm({ email: '', role: 'Employee' });
    setTimeout(() => {
      setShowInviteForm(false);
      setInviteSuccess('');
    }, 2000);
  };

  const stats = [
    { label: 'Team Members', value: teamMembers.length.toString(), icon: Users },
    { label: 'Active Approvers', value: teamMembers.filter(m => m.role === 'Approver' && m.status === 'Active').length.toString(), icon: CheckCircle },
    { label: 'Pending Invites', value: teamMembers.filter(m => m.status === 'Pending').length.toString(), icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Request Hub</h1>
            <p className="text-xs sm:text-sm text-gray-600">{companyName}</p>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <span className="hidden sm:inline text-sm font-medium">Admin</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{adminEmail}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  Company Settings
                </a>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-gray-600">Manage your team, invitations, and approval workflows.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invite Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              
              <button
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-4"
              >
                <Plus className="w-5 h-5" />
                Invite Team Member
              </button>

              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 mb-4">
                <Settings className="w-5 h-5" />
                Approval Settings
              </button>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Request Types</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Expense Reimbursement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Purchase Requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Leave Requests
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team Members & Invite Form */}
          <div className="lg:col-span-2">
            {/* Invite Form */}
            {showInviteForm && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Invite Team Member</h3>
                <form onSubmit={handleInviteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => {
                        setInviteForm({ ...inviteForm, email: e.target.value });
                        setInviteError('');
                      }}
                      placeholder="team@acme.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {inviteError && (
                      <p className="mt-2 text-sm text-red-600">{inviteError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={inviteForm.role}
                      onChange={(e) =>
                        setInviteForm({
                          ...inviteForm,
                          role: e.target.value as 'Employee' | 'Approver',
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Employee">Employee (Submitter)</option>
                      <option value="Approver">Approver (Manager)</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-600">
                      Employees submit requests. Approvers review and approve/reject.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Send Invite
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInviteForm(false);
                        setInviteForm({ email: '', role: 'Employee' });
                        setInviteError('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {inviteSuccess && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">{inviteSuccess}</p>
                  </div>
                )}
              </div>
            )}

            {/* Team Members List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Team Members ({teamMembers.length})</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 hidden sm:table-cell">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium">{member.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{member.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {teamMembers.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No team members yet. Start by inviting your first team member.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 sm:p-8">
          <h3 className="text-lg font-semibold mb-3">📚 Getting Started</h3>
          <p className="text-gray-700 mb-4">
            Your Request Hub workspace is ready! Here's what to do next:
          </p>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Invite your team members</li>
            <li>Set up your approval workflows in Settings</li>
            <li>Share the dashboard link with your team</li>
            <li>Start creating and approving requests</li>
          </ol>
        </div>
      </div>
    </div>
  );
}