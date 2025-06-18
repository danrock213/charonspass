export interface RSVP {
  name: string;
  attending: boolean;
  timestamp: string; // ISO string
}

export interface FuneralDetails {
  rsvpEnabled?: boolean;
  rsvpList?: RSVP[];
  dateTime?: string;         // Covers 'funeralDate' and time
  location?: string;         // Replaces 'funeralLocation'
  rsvpLink?: string;         // Replaces 'funeralRsvpLink'
  notes?: string;
}

export interface Tribute {
  id: string;
  name: string;
  birthDate: string;
  deathDate?: string;
  bio?: string;
  obituaryText?: string;
  photoBase64?: string;
  photoUrl?: string;
  story?: string;
  createdBy?: string;
  funeralDetails?: FuneralDetails;
  tags?: string[];
}
