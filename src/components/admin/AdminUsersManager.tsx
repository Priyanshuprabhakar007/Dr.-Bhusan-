import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AdminRole, AdminUser } from '../../types/admin';
import {
  Users,
  Shield,
  Plus,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';

export const AdminUsersManager: React.FC = () => {
  const {
    currentAdminUser,
    adminRole,
    adminUsers,
    addAdminUser,
    updateAdminUserRole,
    updateAdminUserStatus,
    deleteAdminUser
  } = useData();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('content_manager');
  const [invitePass, setInvitePass] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Security barrier: only super_admin can manage admin accounts
  if (adminRole !== 'super_admin') {
    return (
      <div className="bg-white border border-rose-200 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Super Admin Privileges Required
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Access to administrative user management, roles, and credentials is restricted to Dr. Bhushan Parmar (Super Administrator).
        </p>
      </div>
    );
  }

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdminUser(
      {
        email: inviteEmail.trim().toLowerCase(),
        name: inviteName.trim(),
        role: inviteRole,
        passwordHash: '',
        salt: '',
        status: 'active',
        lastLogin: 'Never'
      },
      invitePass
    );

    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInvitePass('');
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Administrative Team & Role Permissions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Provision and manage staff accounts for oncology content authors and inquiry coordinators.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#18B8B4]" />
          <span>Provision New Administrator</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Administrator team updated successfully!</span>
        </div>
      )}

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100">
          <span className="font-bold text-[#073F3D] block">Super Admin</span>
          <span className="text-slate-600 mt-1 block">Full system authority, doctor profile, credentials, user management, and security keys.</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-800 block">Content Manager</span>
          <span className="text-slate-600 mt-1 block">Edit cancer pages, symptoms, treatments, blog articles, body explorer, and media.</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100">
          <span className="font-bold text-sky-900 block">Enquiry Manager</span>
          <span className="text-slate-600 mt-1 block">View and coordinate patient appointments, second opinions, and contact phone requests.</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 pl-5">Staff Member</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Account Status</th>
                <th className="p-3.5">Last Login</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {adminUsers.map(user => {
                const isCurrentSelf = user.id === currentAdminUser?.id;
                return (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-[#071D2D] flex items-center space-x-2">
                        <span>{user.name}</span>
                        {isCurrentSelf && (
                          <span className="text-[10px] px-2 py-0.2 bg-teal-100 text-[#073F3D] font-semibold rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{user.email}</div>
                    </td>

                    <td className="p-3.5">
                      <select
                        disabled={isCurrentSelf}
                        value={user.role}
                        onChange={e => updateAdminUserRole(user.id, e.target.value as AdminRole)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold bg-white disabled:opacity-60"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="content_manager">Content Manager</option>
                        <option value="enquiry_manager">Enquiry Manager</option>
                      </select>
                    </td>

                    <td className="p-3.5">
                      <button
                        type="button"
                        disabled={isCurrentSelf}
                        onClick={() =>
                          updateAdminUserStatus(
                            user.id,
                            user.status === 'active' ? 'disabled' : 'active'
                          )
                        }
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          user.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        } disabled:opacity-60`}
                      >
                        {user.status === 'active' ? 'Active' : 'Disabled'}
                      </button>
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {user.lastLogin || 'Recent'}
                    </td>

                    <td className="p-3.5 pr-5 text-right">
                      {!isCurrentSelf && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove administrator account for ${user.name}?`)) {
                              deleteAdminUser(user.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#071D2D]">
                Provision Administrator Account
              </h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Staff Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  placeholder="e.g. Dr. A. Sharma / Clinic Coordinator"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="staff@oncology.care"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Role Authority
                </label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
                >
                  <option value="content_manager">Content Manager (Articles & Pages)</option>
                  <option value="enquiry_manager">Enquiry Manager (Appointments & Leads)</option>
                  <option value="super_admin">Super Admin (Full System Access)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Temporary Master Password
                </label>
                <input
                  type="password"
                  required
                  value={invitePass}
                  onChange={e => setInvitePass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white font-semibold transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
