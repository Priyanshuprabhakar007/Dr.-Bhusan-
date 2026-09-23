import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AppointmentSubmission } from '../../types';
import {
  Calendar,
  Search,
  Download,
  Phone,
  Mail,
  Clock,
  Trash2,
  X
} from 'lucide-react';

export const AppointmentsManager: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    deleteAppointment
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<AppointmentSubmission | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const filteredAppointments = safeAppointments.filter(lead => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      lead.patientName.toLowerCase().includes(q) ||
      lead.phone.includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.cancerTypeOrConcern.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: AppointmentSubmission['status']) => {
    updateAppointmentStatus(id, newStatus);
    if (selectedLead?.id === id) {
      setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveNotes = (id: string) => {
    if (!selectedLead) return;
    updateAppointmentStatus(id, selectedLead.status, notesInput);
    setSelectedLead(prev => (prev ? { ...prev, notes: notesInput } : null));
  };

  const handleExportCSV = () => {
    const headers = [
      'Appointment ID',
      'Patient Name',
      'Phone',
      'Email',
      'Preferred Date',
      'Preferred Slot',
      'Consultation Type',
      'Cancer Type / Concern',
      'Status',
      'Booked At'
    ];
    const rows = filteredAppointments.map(a => [
      a.id,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.preferredDate}"`,
      `"${a.preferredSlot}"`,
      `"${a.consultationType}"`,
      `"${a.cancerTypeOrConcern}"`,
      `"${a.status}"`,
      `"${a.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oncology_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Oncology Consultations & Clinic Bookings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Review in-person hospital OPD and remote video consultations submitted via the booking portal.
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
          {['all', 'New', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#073F3D] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'all' ? `All (${safeAppointments.length})` : status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search patient, phone, cancer type..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 pl-5">Patient Details</th>
                <th className="p-3.5">Requested Slot</th>
                <th className="p-3.5">Consultation Type</th>
                <th className="p-3.5">Cancer Concern</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No matching appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-[#071D2D]">{apt.patientName}</div>
                      <div className="text-[11px] text-slate-500">{apt.phone} • {apt.email}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{apt.preferredDate}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{apt.preferredSlot}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        apt.consultationType.includes('Hospital')
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-teal-50 text-teal-800'
                      }`}>
                        {apt.consultationType}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 line-clamp-1">
                        {apt.cancerTypeOrConcern}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={apt.status}
                        onChange={e => handleStatusChange(apt.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                          apt.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : apt.status === 'Completed'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3.5 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLead(apt);
                          setNotesInput(apt.notes || '');
                        }}
                        className="px-3 py-1 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#149A96]" />
                <div>
                  <h3 className="text-base font-bold text-[#071D2D]">
                    Consultation Details
                  </h3>
                  <span className="text-xs text-slate-400">Ref: {selectedLead.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">Patient Name</span>
                  <span className="font-bold text-[#071D2D] text-sm">{selectedLead.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Contact Number</span>
                  <span className="font-semibold text-slate-800">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Preferred Date & Slot</span>
                  <span className="font-semibold text-slate-800">
                    {selectedLead.preferredDate} ({selectedLead.preferredSlot})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Consultation Mode</span>
                  <span className="font-bold text-[#073F3D]">{selectedLead.consultationType}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Cancer Type / Reason for Consultation</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {selectedLead.cancerTypeOrConcern}
                </p>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Clinic Coordination & Patient Notes
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={e => setNotesInput(e.target.value)}
                placeholder="Add notes about call back, OPD room number assigned, or patient medical history..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
              <button
                type="button"
                onClick={() => handleSaveNotes(selectedLead.id)}
                className="px-4 py-1.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold cursor-pointer"
              >
                Save Notes
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this appointment entry?')) {
                    deleteAppointment(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#149A96]" />
                  <span>Call Patient</span>
                </a>
                <a
                  href={`https://wa.me/${(selectedLead?.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
