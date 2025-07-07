'use client';

import { useParams } from 'next/navigation';
import EncounterForm from '@/app/component/EncounterForm';

export default function Page() {
  const params = useParams();
  const encounterId = params.id;

  return (
    <div className="p-8">
      <EncounterForm encounterId={encounterId} />
    </div>
  );
}
