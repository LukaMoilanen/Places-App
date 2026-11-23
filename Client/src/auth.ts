import type { User } from '../types';

// The key we use inside the browser's local storage
const STORAGE_KEY = 'user';

// Save the logged-in user (this object contains the token) in local storage
export const saveUser = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// Read the user back (used when the page is opened or refreshed)
export const loadUser = (): User | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const user = saved ? JSON.parse(saved) : null;
        return user?.Token ? user : null;
    } catch {
        return null;
    }
};

// Remove the user + token (used when logging out)
export const clearUser = () => {
    localStorage.removeItem(STORAGE_KEY);
};
