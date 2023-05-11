export interface Todo {
  id: string;
  desc: string;
  completed: boolean;
}
export interface Bitacora {
  id: number;
  author: string;
  authorId: number;
  bitacoraDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoState {
  bitacoras1: Bitacora[];
  loading: boolean;
}
