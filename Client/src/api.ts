import type { Place, User, PlaceInput } from '../types';

const BASE = import.meta.env.VITE_SERVER_URL + '/api';

const request = async <T,>(path: string, options: RequestInit = {}, token?: string): Promise<T> => {
    const res = await fetch(BASE + path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw Object.assign(new Error(err.message ?? 'Request failed'), { status: res.status });
    }
    return res.json();
};

export const getPlaces = () => request<Place[]>('/places');
export const login = (name: string, password: string) =>
    request<User>('/login', { method: 'POST', body: JSON.stringify({ name, password }) });
export const register = (name: string, password: string) =>
    request<{ ID: number; Name: string }>('/users', { method: 'POST', body: JSON.stringify({ name, password }) });
export const addPlace = (p: PlaceInput, token: string) =>
    request<Place>('/places', { method: 'POST', body: JSON.stringify(p) }, token);
export const editPlace = (id: number, p: PlaceInput, token: string) =>
    request<Place>(`/places/${id}`, { method: 'PUT', body: JSON.stringify(p) }, token);
export const deletePlace = (id: number, token: string) =>
    request<Place>(`/places/${id}`, { method: 'DELETE' }, token);