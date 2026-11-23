import { useState } from 'react';
import type { SyntheticEvent } from 'react';

type AddPlaceFormProps = {
    position: { lat: number; lng: number } | null;
    onAdd: (name: string) => Promise<void>;
};

export function AddPlaceForm({ position, onAdd }: AddPlaceFormProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await onAdd(name);
            setName('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not add the place');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a place</h2>
            <input
                placeholder="Place name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <p className={position ? 'hint hint-selected' : 'hint'}>
                {position
                    ? `✓ Location selected: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
                    : 'Click on the map to choose the location'}
            </p>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={saving || !position}>
                Add place
            </button>
        </form>
    );
}
