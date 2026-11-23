import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { login, register } from '../api';
import type { User } from '../../types';

type AuthFormProps = {
    onLogin: (user: User) => void;
};

export function AuthForm({ onLogin }: AuthFormProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                // create the account first, then log in with it
                await register(name, password);
            }
            const user = await login(name, password);
            onLogin(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isRegister ? 'Register' : 'Log in'}</h2>
            <input
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
                {isRegister ? 'Register' : 'Log in'}
            </button>
            <button
                type="button"
                className="link-button"
                onClick={() => {
                    setIsRegister(!isRegister);
                    setError('');
                }}
            >
                {isRegister
                    ? 'Already have an account? Log in'
                    : 'No account yet? Register'}
            </button>
        </form>
    );
}
