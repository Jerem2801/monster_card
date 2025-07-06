'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MonsterCard from '@/app/ui/monstercard/MonsterCard';

export default function EncounterDetailPage() {
  const params = useParams();
  const encounterId = params.id;

  const [selectedMonsters, setSelectedMonsters] = useState([]);

  useEffect(() => {
    async function fetchEncounterDetail() {
      const res = await fetch(`/api/encounter/${encounterId}`);
      if (!res.ok) {
        console.error('Erreur fetch encounter detail');
        return;
      }
      const data = await res.json();
      setSelectedMonsters(data.details);
    }
    fetchEncounterDetail();
  }, [encounterId]);

  // Gère l’ajout/suppression de monstres etc selon ta logique...

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Détails de la rencontre {encounterId}</h1>

      <div className="flex flex-wrap gap-4">
        {selectedMonsters.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} selected={true} />
        ))}
      </div>
    </div>
  );
}
