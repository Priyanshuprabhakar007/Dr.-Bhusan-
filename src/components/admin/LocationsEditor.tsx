import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { LocationItem } from '../../types/admin';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Star,
  ExternalLink,
  Edit2
} from 'lucide-react';

export const LocationsEditor: React.FC = () => {
  const { 
    locations = [], 
    updateLocations, 
    addLocation, 
    deleteLocation, 
    updatePracticeLocation 
  } = useData() as any;

  const safeLocations = Array.isArray(locations) ? locations : [];

  const [selectedLocId, setSelectedLocId] = useState<string>(() => safeLocations[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const currentLoc = safeLocations.find(l => l.id === selectedLocId) || safeLocations[0];

  const handleFieldChange = (id: string, field: keyof LocationItem, val: any) => {
    const updated = locations.map((l: LocationItem) => (l.id === id ? { ...l, [field]: val } : l));
    updateLocations(updated);

    // If setting as primary, sync to practiceLocation
    if (field === 'isPrimary' && val === true) {
      const target = updated.find((l: LocationItem) => l.id === id);
      if (target) {
        updatePracticeLocation({
          hospitalName: target.hospitalName,
          department: target.department,
          addressLine1: target.addressLine1,
          city: target.city,
          state: target.state,
          pincode: target.pincode,
          phonePrimary: target.phonePrimary,
          whatsappNumber: target.whatsappNumber,
          emailContact: target.emailContact,
          consultationTimings: `${target.openingTime} - ${target.closingTime}`,
          daysAvailable: target.consultationDays,
          googleMapsEmbedUrl: target.googleMapsEmbedUrl,
          googleMapsDirectionsUrl: target.googleMapsDirectionsUrl
        });
      }
    }
  };

  const handleSetPrimary = (id: string) => {
    const updated = locations.map((l: LocationItem) => ({ ...l, isPrimary: l.id === id }));
    updateLocations(updated);
    const target = updated.find((l: LocationItem) => l.id === id);
    if (target) {
      updatePracticeLocation({
        hospitalName: target.hospitalName,
        department: target.department,
        addressLine1: target.addressLine1,
        city: target.city,
        state: target.state,
        pincode: target.pincode,
        phonePrimary: target.phonePrimary,
        whatsappNumber: target.whatsappNumber,
        emailContact: target.emailContact,
        consultationTimings: `${target.openingTime} - ${target.closingTime}`,
        daysAvailable: target.consultationDays,
        googleMapsEmbedUrl: target.googleMapsEmbedUrl,
        googleMapsDirectionsUrl: target.googleMapsDirectionsUrl
      });
    }
    triggerToast();
  };

  const handleAddNewLocation = () => {
    const newLoc: LocationItem = {
      id: 'loc-' + Date.now(),
      hospitalName: 'New Oncology Consultation OPD',
      department: 'Medical Oncology Suite',
      addressLine1: 'Main Healthcare Avenue',
      city: 'Chandigarh',
      state: 'UT',
      pincode: '160012',
      phonePrimary: '+91 98141 23456',
      whatsappNumber: '+91 98141 23456',
      emailContact: 'drbhushanparmar@gmail.com',
      consultationDays: 'Wednesday & Friday',
      openingTime: '02:00 PM',
      closingTime: '05:00 PM',
      googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Mohali&t=&z=14&ie=UTF8&iwloc=&output=embed',
      googleMapsDirectionsUrl: 'https://maps.google.com',
      locationImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      active: true,
      isPrimary: false,
      order: safeLocations.length + 1
    };
    addLocation(newLoc);
    setSelectedLocId(newLoc.id);
    setIsAddingNew(false);
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#071D2D] font-heading">
            Hospital & Consultation Locations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage practice hospitals, consultation timings, emergency numbers, and Google Maps links.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleAddNewLocation}
            className="px-4 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#18B8B4]" />
            <span>Add New Location</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Location saved successfully! Changes are live on public website and footer.</span>
        </div>
      )}

      {/* Location Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeLocations.map(loc => {
          const isSelected = loc.id === selectedLocId;
          return (
            <div
              key={loc.id}
              onClick={() => setSelectedLocId(loc.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white border-[#149A96] shadow-md ring-2 ring-[#149A96]/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#073F3D] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#071D2D]">
                        {loc.hospitalName}
                      </h4>
                      {loc.isPrimary && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span>Primary</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {loc.city}, {loc.state} • {loc.consultationDays}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    loc.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {loc.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Form for Current Location */}
      {currentLoc && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#071D2D]">
                Editing: {currentLoc.hospitalName}
              </h3>
              <p className="text-xs text-slate-500">
                Hospital address, consultation schedule, and patient contact channels.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {!currentLoc.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(currentLoc.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center space-x-1 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Set as Primary Hospital</span>
                </button>
              )}
              {safeLocations.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this consultation location?')) {
                      deleteLocation(currentLoc.id);
                      setSelectedLocId(safeLocations[0]?.id || '');
                    }
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hospital / Institution Name
              </label>
              <input
                type="text"
                value={currentLoc.hospitalName}
                onChange={e => handleFieldChange(currentLoc.id, 'hospitalName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department / OPD Suite
              </label>
              <input
                type="text"
                value={currentLoc.department}
                onChange={e => handleFieldChange(currentLoc.id, 'department', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                value={currentLoc.addressLine1}
                onChange={e => handleFieldChange(currentLoc.id, 'addressLine1', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City, State, Pincode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={currentLoc.city}
                  onChange={e => handleFieldChange(currentLoc.id, 'city', e.target.value)}
                  className="px-2 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={currentLoc.state}
                  onChange={e => handleFieldChange(currentLoc.id, 'state', e.target.value)}
                  className="px-2 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={currentLoc.pincode}
                  onChange={e => handleFieldChange(currentLoc.id, 'pincode', e.target.value)}
                  className="px-2 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary OPD Phone
              </label>
              <input
                type="text"
                value={currentLoc.phonePrimary}
                onChange={e => handleFieldChange(currentLoc.id, 'phonePrimary', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Desk Number
              </label>
              <input
                type="text"
                value={currentLoc.whatsappNumber}
                onChange={e => handleFieldChange(currentLoc.id, 'whatsappNumber', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Days
              </label>
              <input
                type="text"
                value={currentLoc.consultationDays}
                onChange={e => handleFieldChange(currentLoc.id, 'consultationDays', e.target.value)}
                placeholder="e.g. Monday to Saturday"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Timings
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Opening: 10:00 AM"
                  value={currentLoc.openingTime}
                  onChange={e => handleFieldChange(currentLoc.id, 'openingTime', e.target.value)}
                  className="px-2 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Closing: 04:30 PM"
                  value={currentLoc.closingTime}
                  onChange={e => handleFieldChange(currentLoc.id, 'closingTime', e.target.value)}
                  className="px-2 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Google Maps Embed URL (iframe source)
              </label>
              <input
                type="text"
                value={currentLoc.googleMapsEmbedUrl}
                onChange={e => handleFieldChange(currentLoc.id, 'googleMapsEmbedUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#149A96]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={triggerToast}
              className="px-5 py-2 rounded-xl bg-[#073F3D] hover:bg-[#071D2D] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#18B8B4]" />
              <span>Save Location Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
