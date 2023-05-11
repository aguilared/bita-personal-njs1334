export interface Todo {
  id: string;
  desc: string;
  completed: boolean;
}
export interface Bitacoras {
  id: number;
  author_id: number;
  author: [];
  bitacora_date: string;
  created_at: string;
  updated_at: string;
  count: [];
}
export interface BitaEvent {
  id: number;
  bitacora_id: number;
  author_id: number;
  description: string;
  event_date: string;
  event_id: number;
  created_at: string;
  updated_at: string;
}

export interface TodoState {
  bitacoras1: Bitacoras[];
  loading: boolean;
}
export interface BitaEvents {
  bitaEvents: BitaEvent[];
  loading: boolean;
}
