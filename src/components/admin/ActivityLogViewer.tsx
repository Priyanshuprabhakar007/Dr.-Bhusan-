import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Clock,
  Search,
  Filter,
  Shield,
  User,
  Activity,
  FileText
} from 'lucide-react';

export const ActivityLogViewer: React.FC = () => {
  const { activityLogs } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter(log => {
    const q = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      log.entityType.toLowerCase().includes(q) ||
      (log.details && log.details.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Administrative Audit Trail & Activity Log
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Immutable tracking log of administrative logins, content revisions, and status updates.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search action, user, entity..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 pl-5">Timestamp</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Entity Type</th>
                <th className="p-3.5 pr-5">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400">
                    No matching activity events found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <tr key={`${log.id || 'log'}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 pl-5 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-[#071D2D]">{log.userName}</div>
                      <div className="text-[10px] text-slate-400">{log.userEmail}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 px-2 py-0.5 rounded-md bg-slate-100">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-600 font-medium capitalize">
                      {log.entityType}
                    </td>

                    <td className="p-3.5 pr-5 text-slate-600 text-[11px]">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
