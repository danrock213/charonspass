'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTributeById, saveTribute, addRSVPToTribute } from '@/lib/data/tributes';
import { Tribute } from '@/types/tribute';

export default function TributeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'tribute' | 'obituary' | 'details'>('tribute');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<Partial<Tribute>>({});

  const [rsvpName, setRsvpName] = useState('');
  const [attending, setAttending] = useState(true);
  const [rsvpError, setRsvpError] = useState('');

  // Load tribute data by ID
  const loadTribute = () => {
    if (typeof id !== 'string') return;

    setLoading(true);
    const found = getTributeById(id);
    if (found) {
      setTribute(found);
      setFormState(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTribute();
  }, [id]);

  // Handle form input changes for editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'rsvpEnabled') {
      // Special handling for RSVP checkbox inside funeralDetails
      setFormState((prev) => ({
        ...prev,
        funeralDetails: {
          ...(prev.funeralDetails || { rsvpList: [] }),
          rsvpEnabled: checked,
        },
      }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save edits
  const handleSave = () => {
    if (!formState.name || formState.name.trim() === '') {
      alert('Name is required.');
      return;
    }
    if (!tribute) return;

    const updatedTribute: Tribute = {
      ...tribute,
      ...formState,
      birthDate: formState.birthDate || '',
      deathDate: formState.deathDate || '',
      obituaryText: formState.obituaryText || '',
      funeralDetails: formState.funeralDetails || tribute.funeralDetails || {
        rsvpEnabled: false,
        rsvpList: [],
      },
    };

    saveTribute(updatedTribute);
    setTribute(updatedTribute);
    setIsEditing(false);
  };

  // Cancel editing and revert form state
  const handleCancel = () => {
    if (tribute) setFormState(tribute);
    setIsEditing(false);
  };

  // Handle RSVP submission
  const handleRSVP = () => {
    setRsvpError('');
    if (!rsvpName.trim()) {
      setRsvpError('Please enter your name before submitting.');
      return;
    }
    if (!id) return;

    addRSVPToTribute(id, rsvpName.trim(), attending);
    setRsvpName('');
    loadTribute();
  };

  // Format dates nicely
  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Unknown';

  // Keyboard navigation for tabs (optional)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = ['tribute', 'obituary', 'details'];
    const currentIndex = tabs.indexOf(activeTab);
    if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex] as typeof activeTab);
      tabRefs.current[tabs[nextIndex]]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex] as typeof activeTab);
      tabRefs.current[tabs[prevIndex]]?.focus();
    }
  };

  if (loading) {
    return (
      <main
        className="max-w-4xl mx-auto mt-20 text-center text-gray-500"
        role="status"
        aria-live="polite"
      >
        <p>Loading tribute...</p>
      </main>
    );
  }

  if (notFound || !tribute) {
    return (
      <main className="max-w-4xl mx-auto mt-20 text-center text-gray-500" role="alert">
        <p>Tribute not found.</p>
        <button
          onClick={() => router.push('/tribute')}
          className="mt-4 px-4 py-2 border rounded text-[#1D3557] hover:bg-gray-100"
          aria-label="Back to tribute list"
        >
          Back to Tributes
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1D3557]">{tribute.name}</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 border border-[#1D3557] rounded hover:bg-[#F4A261] hover:text-white transition"
            aria-label="Edit tribute"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!formState.name || formState.name.trim() === ''}
              className={`px-3 py-1 rounded transition ${
                !formState.name || formState.name.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#1D3557] text-white hover:bg-[#457B9D]'
              }`}
              aria-label="Save tribute changes"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <nav
        className="mb-6 flex gap-4 border-b border-gray-300"
        role="tablist"
        aria-label="Tribute detail sections"
        onKeyDown={handleKeyDown}
      >
        {['tribute', 'obituary', 'details'].map((tab) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[tab] = el)}
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? 'border-b-2 border-[#1D3557] text-[#1D3557]'
                : 'text-gray-600 hover:text-[#1D3557]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      {activeTab === 'tribute' && (
        <section role="tabpanel" tabIndex={0} aria-labelledby="tribute-tab">
          {isEditing ? (
            <div className="flex flex-col gap-4 max-w-lg">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Name *</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required
                  aria-required="true"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Birth Date</span>
                <input
                  type="date"
                  name="birthDate"
                  value={formState.birthDate || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Death Date</span>
                <input
                  type="date"
                  name="deathDate"
                  value={formState.deathDate || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </label>
            </div>
          ) : (
            <div className="max-w-lg space-y-2">
              <p>
                <strong>Born:</strong> {formatDate(tribute.birthDate)}
              </p>
              <p>
                <strong>Died:</strong> {formatDate(tribute.deathDate)}
              </p>
            </div>
          )}
        </section>
      )}

      {activeTab === 'obituary' && (
        <section role="tabpanel" tabIndex={0} aria-labelledby="obituary-tab">
          {isEditing ? (
            <textarea
              name="obituaryText"
              value={formState.obituaryText || ''}
              onChange={handleChange}
              rows={8}
              className="w-full border rounded p-3"
              placeholder="Write the obituary here..."
              aria-label="Obituary text"
            />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700">
              {tribute.obituaryText || 'No obituary available.'}
            </p>
          )}
        </section>
      )}

      {activeTab === 'details' && (
        <section role="tabpanel" tabIndex={0} aria-labelledby="details-tab">
          {isEditing ? (
            <div className="max-w-lg flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rsvpEnabled"
                  checked={!!formState.funeralDetails?.rsvpEnabled}
                  onChange={handleChange}
                  aria-checked={!!formState.funeralDetails?.rsvpEnabled}
                  aria-label="Enable RSVP"
                />
                <span>Enable RSVP</span>
              </label>
            </div>
          ) : (
            <p>
              RSVP Enabled:{' '}
              {tribute.funeralDetails?.rsvpEnabled ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">No</span>
              )}
            </p>
          )}

          {tribute.funeralDetails?.rsvpEnabled && (
            <>
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold text-[#1D3557] mb-2">RSVP</h3>
                <p className="mb-2 text-sm text-gray-500">
                  Let us know if you're planning to attend.
                </p>
                <div className="flex gap-2 items-center mb-2 max-w-md">
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Your name"
                    className="border p-2 rounded flex-grow"
                    aria-label="Your name"
                  />
                  <select
                    value={attending ? 'yes' : 'no'}
                    onChange={(e) => setAttending(e.target.value === 'yes')}
                    className="border p-2 rounded"
                    aria-label="RSVP attendance"
                  >
                    <option value="yes">Attending</option>
                    <option value="no">Not Attending</option>
                  </select>
                  <button
                    onClick={handleRSVP}
                    className="px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
                    disabled={!rsvpName.trim()}
                    aria-disabled={!rsvpName.trim()}
                  >
                    Submit
                  </button>
                </div>
                {rsvpError && (
                  <p className="text-red-600 text-sm mt-1" role="alert">
                    {rsvpError}
                  </p>
                )}
              </div>

              {tribute.funeralDetails?.rsvpList?.length ? (
                <div className="mt-6 max-w-md">
                  <h4 className="font-medium text-[#1D3557] mb-2">RSVP Responses</h4>
                  <ul className="list-disc pl-6 text-sm text-gray-700">
                    {tribute.funeralDetails.rsvpList.map((rsvp, idx) => (
                      <li key={idx}>
                        {rsvp.name} — {rsvp.attending ? 'Attending' : 'Not Attending'}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No RSVPs yet.</p>
              )}
            </>
          )}
        </section>
      )}

      <button
        onClick={() => router.push('/tribute')}
        className="mt-10 px-4 py-2 border border-[#1D3557] rounded text-[#1D3557] hover:bg-[#F4A261] hover:text-white transition"
        aria-label="Back to tribute list"
      >
        ← Back to Tribute List
      </button>
    </main>
  );
}
