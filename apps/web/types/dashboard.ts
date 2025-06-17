// types/dashboard.ts
export interface ChecklistItem {
  id: string;
  title: string;
  dueDate?: string;
  checked: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  type: string;
  booked: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
}

export interface Activity {
  id: string;
  message: string;
  date: string;
}
