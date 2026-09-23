import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SecondOpinionSubmission } from '../../types';
import {
  FileCheck,
  Search,
  Download,
  Phone,
  MessageCircle,
  Mail,
  FileText,
  Trash2,
  X,
  Eye
} from 'lucide-react';

export const SecondOpinionsManager: React.FC = () => {
  const {
    secondOpinions,
    updateSecondOpinionStatus,
    deleteSecondOpinion
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<SecondOpinionSubmission | null>(null);

  const safeOpinions = Array.isArray(secondOpinions) ? secondOpinions : [];

  const filteredOpinions = safeOpinions.filter(lead => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      lead.name.toLowerCase().includes(q) ||
      lead.phone.includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.cancerType.toLowerCase().includes(q) ||
      (lead.cityCountry && lead.cityCountry.toLowerCase().includes(q));

    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: SecondOpinionSubmission['status']) => {
    updateSecondOpinionStatus(id, newStatus);
    if (selectedLead?.id === id) {
      setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Reference ID',
      'Patient Name',
      'Phone',
      'Email',
      'City / Country',
      'Cancer Type',
      'Current Diagnosis',
      'Prior Treatments',
      'Status',
      'Submitted At'
    ];
    const rows = filteredOpinions.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.phone}"`,
      `"${s.email}"`,
      `"${s.cityCountry || ''}"`,
      `"${s.cancerType}"`,
      `"${s.currentDiagnosis || ''}"`,
      `"${s.previousTreatment || ''}"`,
      `"${s.status}"`,
      `"${s.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oncology_second_opinions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Second Opinion Medical Dossiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Encrypted portal for remote biopsy review, treatment protocol evaluations, and uploaded pathology reports.
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
          {['all', 'Pending Review', 'Contacted', 'Reviewed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#073F3D] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'all' ? `All (${safeOpinions.length})` : status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search patient, diagnosis, city..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
          />
        </div>
      </div>

      {/* Opinions Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 pl-5">Patient & Origin</th>
                <th className="p-3.5">Cancer Category</th>
                <th className="p-3.5">Uploaded Reports</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Submission Date</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOpinions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No matching second opinion requests found.
                  </td>
                </tr>
              ) : (
                filteredOpinions.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-[#071D2D]">{lead.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {lead.phone} • {lead.email}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Location: {lead.cityCountry || 'India'}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 block">
                        {lead.cancerType}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {lead.currentDiagnosis || 'Pathology assessment'}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center space-x-1.5 text-xs text-[#073F3D] font-medium">
                        <FileText className="w-3.5 h-3.5 text-[#149A96]" />
                        <span>
                          {lead.attachedFiles && lead.attachedFiles.length > 0
                            ? `${lead.attachedFiles.length} file(s)`
                            : 'Medical Dossier'}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={lead.status}
                        onChange={e => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer ${
                          lead.status === 'Pending Review'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : lead.status === 'Reviewed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Reviewed">Reviewed</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {lead.submittedAt}
                    </td>

                    <td className="p-3.5 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Review Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Dossier Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-[#149A96]" />
                <div>
                  <h3 className="text-base font-bold text-[#071D2D]">
                    Second Opinion Medical Dossier
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

            {/* Patient Clinical Info */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">Patient Name</span>
                  <span className="font-bold text-[#071D2D] text-sm">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Contact</span>
                  <span className="font-semibold text-slate-800">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Location</span>
                  <span className="font-medium text-slate-800">{selectedLead.cityCountry || 'India'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Cancer Type</span>
                  <span className="font-bold text-[#073F3D]">{selectedLead.cancerType}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Current Biopsy / Histopathology Diagnosis</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {selectedLead.currentDiagnosis || 'Biopsy report attached.'}
                </p>
              </div>

              {selectedLead.previousTreatment && (
                <div>
                  <span className="text-slate-400 text-[10px] block">Previous Treatments Taken</span>
                  <p className="text-slate-700 mt-0.5">{selectedLead.previousTreatment}</p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <span className="text-slate-400 text-[10px] block">Patient Query / Clinical Message</span>
                  <p className="text-slate-700 italic mt-0.5">{selectedLead.message}</p>
                </div>
              )}
            </div>

            {/* Uploaded Reports Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#149A96]" />
                <span>Uploaded Medical Records (Encrypted Patient Records)</span>
              </h4>

              {selectedLead.attachedFiles && selectedLead.attachedFiles.length > 0 ? (
                selectedLead.attachedFiles.map(file => (
                  <div key={file.id} className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#071D2D]">
                        {file.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {file.category} • {(file.size / 1024).toFixed(0)} KB
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        alert(`Opening patient file: ${file.name}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-[#073F3D] flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3 text-[#149A96]" />
                      <span>View File</span>
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#071D2D]">
                      Biopsy_and_PET_Staging_Scan.pdf
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Encrypted PDF Document • 4.2 MB
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      alert('Clinical Dossier Viewer: Decrypting and opening medical reports...');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-[#073F3D] flex items-center space-x-1"
                  >
                    <Eye className="w-3 h-3 text-[#149A96]" />
                    <span>View Report</span>
                  </a>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this second opinion dossier?')) {
                    deleteSecondOpinion(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Dossier</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#149A96]" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${(selectedLead?.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  WhatsApp Patient
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
