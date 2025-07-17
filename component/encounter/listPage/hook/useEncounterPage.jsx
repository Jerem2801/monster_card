import { useState, useCallback } from 'react';
import { fetchApi } from '@/lib/api';

export function useEncounters() {
    const [encounters, setEncounters] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadEncounters = useCallback(async () => {
        setIsLoading(true);
        try {
        const data = await fetchApi('/api/encounter/');
        setEncounters(data.encounters);
        } catch (e) {
        console.error('Erreur de chargement :', e);
        } finally {
        setIsLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (id) => {
        const response = await fetch(`/api/encounter/${id}?id=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setRefresh(prev => !prev);
        } else {
            alert('Erreur lors de la suppression de la rencontre');
        }
    }, []);



  return {
    encounters,
    refresh,
    isLoading,
    loadEncounters,
    handleDelete,
  };
}
