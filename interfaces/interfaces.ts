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
  tipo_event_id: number;
  created_at: string;
  updated_at: string;
}
export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  nivel: number;
  createdAt: string;
  updatedAt: string;
}
export interface TodoState {
  bitacoras1: Bitacoras[];
  loading: boolean;
}
export interface Events {
  events: BitaEvent[];
  loading: boolean;
}

export interface TodoState1 {
  users1: Users[];
  loading: boolean;
}

export interface Bitacora {
  id: number;
  author_id: number;
  author: [];
  bitacora_date: string;
  created_at: string;
  updated_at: string;
  count: [];
}
export interface BitacoraId {
  bitacoraId: Bitacora[];
  bitacora: string;
  author: string;
  bitacoraDate: string;
  totalEvents: string;
}
export interface InitialStateType {
  bitacoraId: Bitacora[];
  loading: boolean;
}
