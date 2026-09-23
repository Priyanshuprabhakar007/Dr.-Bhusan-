import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FormBuilderConfig } from '../../types/admin';
import {
  FileCode,
  Save,
  CheckCircle2,
  Bell,
  Check
} from 'lucide-react';

export const FormBuilderEditor: React.FC = () => {
  const { formBuilderConfig, updateFormBuilderConfig } = useData();

  const [activeForm, setActiveForm] = useState<'appointmentForm' | 'secondOpinionForm' | 'contactForm'>('appointmentForm');
  const [configState, setConfigState] = useState<FormBuilderConfig>(formBuilderConfig);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormBuilderConfig(configState);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const currentFormConfig = configState?.[activeForm] || {
    notificationEmail: 'enquiries@drbhushanparmar.com',
    successMessage: 'Thank you. Your request has been logged.',
    fields: {}
  };

  const fieldsList = currentFormConfig.fields || {};

  const handleToggleField = (fieldKey: string, keyToToggle: 'required' | 'enabled') => {
    const existingField = fieldsList[fieldKey] || { label: '', placeholder: '', required: false, enabled: true };
    setConfigState(prev => ({
      ...prev,
      [activeForm]: {
        ...prev[activeForm],
        fields: {
          ...(prev[activeForm]?.fields || {}),
          [fieldKey]: {
            ...existingField,
            [keyToToggle]: !existingField[keyToToggle]
          }
        }
      }
    }));
  };

  const handleUpdateField = (fieldKey: string, prop: 'label' | 'placeholder', val: string) => {
    const existingField = fieldsList[fieldKey] || { label: '', placeholder: '', required: false, enabled: true };
    setConfigState(prev => ({
      ...prev,
      [activeForm]: {
        ...prev[activeForm],
        fields: {
          ...(prev[activeForm]?.fields || {}),
          [fieldKey]: {
            ...existingField,
            [prop]: val
          }
        }
      }
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Patient Form Builder & Field Rules
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Customize input fields, placeholders, required validations, and staff email alerts for patient intake forms.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4 text-[#18B8B4]" />
          <span>Save Form Config</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Form fields and email notifications updated!</span>
        </div>
      )}

      {/* Form Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200">
        {[
          { key: 'appointmentForm', label: 'Appointment Consultation Form' },
          { key: 'secondOpinionForm', label: 'Second Opinion Medical Upload Form' },
          { key: 'contactForm', label: 'General Contact & Enquiry Form' }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveForm(tab.key as any)}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeForm === tab.key
                ? 'border-[#073F3D] text-[#073F3D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Notification Settings */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center space-x-1.5">
            <Bell className="w-3.5 h-3.5 text-[#149A96]" />
            <span>Staff Notification Email for Submissions</span>
          </label>
          <input
            type="email"
            value={currentFormConfig.notificationEmail}
            onChange={e =>
              setConfigState(prev => ({
                ...prev,
                [activeForm]: {
                  ...prev[activeForm],
                  notificationEmail: e.target.value
                }
              }))
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Success Screen Confirmation Text
          </label>
          <input
            type="text"
            value={currentFormConfig.successMessage}
            onChange={e =>
              setConfigState(prev => ({
                ...prev,
                [activeForm]: {
                  ...prev[activeForm],
                  successMessage: e.target.value
                }
              }))
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
          />
        </div>
      </div>

      {/* Fields List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-[#071D2D] pb-2 border-b border-slate-100 flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-[#149A96]" />
          <span>Configurable Fields</span>
        </h3>

        <div className="space-y-3">
          {Object.entries(fieldsList).map(([fieldKey, f]) => (
            <div
              key={fieldKey}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="block text-[10px] text-slate-400 font-mono">
                    Field ID: {fieldKey}
                  </label>
                  <input
                    type="text"
                    value={f.label}
                    onChange={e => handleUpdateField(fieldKey, 'label', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400">Placeholder Text</label>
                  <input
                    type="text"
                    value={f.placeholder}
                    onChange={e => handleUpdateField(fieldKey, 'placeholder', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <label className="flex items-center space-x-1.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={f.required}
                    onChange={() => handleToggleField(fieldKey, 'required')}
                    className="rounded text-[#149A96]"
                  />
                  <span>Required</span>
                </label>

                <button
                  type="button"
                  onClick={() => handleToggleField(fieldKey, 'enabled')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    (f?.enabled ?? true) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {(f?.enabled ?? true) ? 'Enabled' : 'Hidden'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
