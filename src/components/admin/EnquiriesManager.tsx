import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ContactEnquiryItem } from '../../types/admin';
import {
  Mail,
  Search,
  Download,
  Phone,
  MessageCircle,
  Trash2,
  X
} from 'lucide-react';

export const EnquiriesManager: React.FC = () => {
  const {
    contactEnquiries,
    updateContactEnquiryStatus,
    deleteContactEnquiry
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiryItem | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const safeContactEnquiries = Array.isArray(contactEnquiries) ? contactEnquiries : [];

  const filteredEnquiries = safeContactEnquiries.filter(e => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: ContactEnquiryItem['status']) => {
    updateContactEnquiryStatus(id, newStatus);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveNotes = (id: string) => {
    if (!selectedEnquiry) return;
    updateContactEnquiryStatus(id, selectedEnquiry.status, notesInput);
    setSelectedEnquiry(prev => (prev ? { ...prev, notes: notesInput } : null));
  };

  const handleExportCSV = () => {
    const headers = ['Enquiry ID', 'Name', 'Phone', 'Email', 'Message', 'Source Page', 'Date', 'Status'];
    const rows = filteredEnquiries.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${e.sourcePage}"`,
      `"${e.submittedDate}"`,
      `"${e.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            General Patient & Family Enquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Messages, questions, and contact callback requests submitted across website pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#149A96]" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'New', 'Replied', 'Archived'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#073F3D] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'all' ? `All (${safeContactEnquiries.length})` : status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search name, message, phone..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 pl-5">Contact Details</th>
                <th className="p-3.5">Message Excerpt</th>
                <th className="p-3.5">Page Origin</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-[#071D2D]">{enq.name}</div>
                      <div className="text-[11px] text-slate-500">{enq.phone} • {enq.email}</div>
                    </td>

                    <td className="p-3.5">
                      <p className="text-xs text-slate-800 line-clamp-2 max-w-sm">
                        {enq.message}
                      </p>
                    </td>

                    <td className="p-3.5 text-slate-500 text-[11px]">
                      {enq.sourcePage}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={enq.status}
                        onChange={e => handleStatusChange(enq.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : enq.status === 'Replied'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Replied">Replied</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {enq.submittedDate}
                    </td>

                    <td className="p-3.5 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setNotesInput(enq.notes || '');
                        }}
                        className="px-3 py-1 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#149A96]" />
                <div>
                  <h3 className="text-base font-bold text-[#071D2D]">
                    Enquiry Details
                  </h3>
                  <span className="text-xs text-slate-400">Date: {selectedEnquiry.submittedDate}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">Sender Name</span>
                  <span className="font-bold text-[#071D2D] text-sm">{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Phone Number</span>
                  <span className="font-semibold text-slate-800">{selectedEnquiry.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Email</span>
                <span className="font-medium text-slate-800">{selectedEnquiry.email}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Message</span>
                <p className="text-slate-800 mt-1 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Staff Follow-up Notes
              </label>
              <textarea
                rows={2}
                value={notesInput}
                onChange={e => setNotesInput(e.target.value)}
                placeholder="Spoke with family, scheduled OPD appointment..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={() => handleSaveNotes(selectedEnquiry.id)}
                className="px-4 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold"
              >
                Save Notes
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this enquiry?')) {
                    deleteContactEnquiry(selectedEnquiry.id);
                    setSelectedEnquiry(null);
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#149A96]" />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="px-3 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
