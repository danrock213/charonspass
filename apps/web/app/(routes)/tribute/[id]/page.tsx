'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTributeById, saveTribute, addRSVPToTribute } from '@/lib/data/tributes';
import { Tribute } from '@/types/tribute';

export default function TributeDetailPage() {
  const params = useParams();
  // Ensure id is a string, fallback to empty string if not present
  const id =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : '';

  const router = useRouter();

  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [formState, setFormState] = useState<Partial<Tribute>>({});
  const [activeTab, setActiveTab] = useState<'tribute' | 'obituary' | 'details'>('tribute');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [rsvpName, setRsvpName] = useState('');
  const [attending, setAttending] = useState(true);
  const [rsvpError, setRsvpError] = useState('');

  // Use a ref to store tab buttons
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Stable callback for ref assignment to avoid React warnings
  const setTabRef = useCallback(
    (tab: string) => (el: HTMLButtonElement | null) => {
      tabRefs.current[tab] = el;
    },
    []
  );

  useEffect(() => {
    if (!id) return;

    async function fetchTribute() {
      setLoading(true);
      try {
        const found = await getTributeById(id);
        if (found) {
          setTribute(found);
          setFormState(found);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTribute();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'rsvpEnabled' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormState((prev) => ({
        ...prev,
        funeralDetails: {
          ...(prev.funeralDetails || { rsvpList: [] }),
          rsvpEnabled: checked,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (!formState.name || formState.name.trim() === '' || !tribute) return;

    const updated: Tribute = {
      ...tribute,
      ...formState,
      birthDate: formState.birthDate || '',
      deathDate: formState.deathDate || '',
      obituaryText: formState.obituaryText || '',
      funeralDetails:
        formState.funeralDetails || tribute.funeralDetails || {
          rsvpEnabled: false,
          rsvpList: [],
        },
    };

    saveTribute(updated);
    setTribute(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (tribute) {
      setFormState(tribute);
      setIsEditing(false);
    }
  };

  const handleRSVP = async () => {
    setRsvpError('');
    if (!rsvpName.trim()) {
      setRsvpError('Please enter your name before submitting.');
      return;
    }

    if (!id) return;

    try {
      await addRSVPToTribute(id, rsvpName.trim(), attending);
      setRsvpName('');
      // Refresh tribute data after RSVP
      const found = await getTributeById(id);
      if (found) setTribute(found);
    } catch {
      setRsvpError('Failed to submit RSVP. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = ['tribute', 'obituary', 'details'];
    const index = tabs.indexOf(activeTab);
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (nextIndex !== index) {
      setActiveTab(tabs[nextIndex] as typeof activeTab);
      tabRefs.current[tabs[nextIndex]]?.focus();
    }
  };

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Unknown';

  if (loading)
    return (
      <main className="max-w-4xl mx-auto mt-20 text-center text-gray-500">
        Loading tribute...
      </main>
    );

  if (notFound || !tribute) {
    return (
      <main className="max-w-4xl mx-auto mt-20 text-center text-gray-500">
        <p>Tribute not found.</p>
        <button
          onClick={() => router.push('/tribute')}
          className="mt-4 px-4 py-2 border rounded text-[#1D3557] hover:bg-gray-100"
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
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!formState.name?.trim()}
              className={`px-3 py-1 rounded transition ${
                !formState.name?.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#1D3557] text-white hover:bg-[#457B9D]'
              }`}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <nav
        className="mb-6 flex gap-4 border-b border-gray-300"
        role="tablist"
        aria-label="Tribute Tabs"
        onKeyDown={handleKeyDown}
      >
        {['tribute', 'obituary', 'details'].map((tab) => (
          <button
            key={tab}
            ref={setTabRef(tab)}
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

      {/* TABS */}
      {activeTab === 'tribute' && (
        <section>
          {isEditing ? (
            <div className="flex flex-col gap-4 max-w-lg">
              <label>
                <span>Name *</span>
                <input
                  name="name"
                  value={formState.name || ''}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </label>
              <label>
                <span>Birth Date</span>
                <input
                  type="date"
                  name="birthDate"
                  value={formState.birthDate || ''}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </label>
              <label>
                <span>Death Date</span>
                <input
                  type="date"
                  name="deathDate"
                  value={formState.deathDate || ''}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
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
        <section>
          {isEditing ? (
            <textarea
              name="obituaryText"
              value={formState.obituaryText || ''}
              onChange={handleChange}
              rows={8}
              className="w-full border rounded p-3"
            />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700">
              {tribute.obituaryText || 'No obituary available.'}
            </p>
          )}
        </section>
      )}

      {activeTab === 'details' && (
        <section>
          {isEditing ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rsvpEnabled"
                checked={!!formState.funeralDetails?.rsvpEnabled}
                onChange={handleChange}
              />
              <span>Enable RSVP</span>
            </label>
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
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#1D3557] mb-2">RSVP</h3>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => {
                    setRsvpName(e.target.value);
                    if (rsvpError) setRsvpError('');
                  }}
                  placeholder="Your name"
                  className="border p-2 rounded mr-2"
                />
                <select
                  value={attending ? 'yes' : 'no'}
                  onChange={(e) => setAttending(e.target.value === 'yes')}
                  className="border p-2 rounded mr-2"
                >
                  <option value="yes">Attending</option>
                  <option value="no">Not Attending</option>
                </select>
                <button
                  onClick={handleRSVP}
                  disabled={!rsvpName.trim()}
                  className="px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
                >
                  Submit
                </button>
                {rsvpError && <p className="text-red-600 text-sm mt-1">{rsvpError}</p>}
              </div>

              <div className="mt-4">
                {tribute.funeralDetails.rsvpList?.length ? (
                  <ul className="list-disc pl-6">
                    {tribute.funeralDetails.rsvpList.map((r, idx) => (
                      <li key={idx}>
                        {r.name} — {r.attending ? 'Attending' : 'Not Attending'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No RSVPs yet.</p>
                )}
              </div>
            </>
          )}
        </section>
      )}

      <button
        onClick={() => router.push('/tribute')}
        className="mt-10 px-4 py-2 border border-[#1D3557] rounded text-[#1D3557] hover:bg-[#F4A261] hover:text-white transition"
      >
        ← Back to Tribute List
      </button>
    </main>
  );
}
