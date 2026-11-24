import type { MouseEvent } from 'react';
import type { Place } from '../../types';

type PlaceActionsProps = {
    place: Place;
    onEdit: (id: number, name: string) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
};

export function PlaceActions({ place, onEdit, onDelete }: PlaceActionsProps) {
    const handleEdit = async (e: MouseEvent) => {
        e.stopPropagation();
        const name = window.prompt('New name for the place:', place.Name)?.trim();
        if (!name || name === place.Name) return;

        try {
            await onEdit(place.ID, name);
        } catch (err) {
            window.alert(err instanceof Error ? err.message : 'Could not edit the place');
        }
    };

    const handleDelete = async (e: MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm(`Delete "${place.Name}"?`)) return;

        try {
            await onDelete(place.ID);
        } catch (err) {
            window.alert(err instanceof Error ? err.message : 'Could not delete the place');
        }
    };

    return (
        <span className="place-actions">
            <button
                type="button"
                className="icon-button"
                title="Edit"
                aria-label={`Edit ${place.Name}`}
                onClick={handleEdit}
            >
                ✏️
            </button>
            <button
                type="button"
                className="icon-button"
                title="Delete"
                aria-label={`Delete ${place.Name}`}
                onClick={handleDelete}
            >
                🗑️
            </button>
        </span>
    );
}