'use client';

import { useParams } from 'next/navigation';
import EncounterForm from '@/component/encounter/EncounterForm';

export default function Page() {
    const params = useParams();
    const encounterId = params.id;

    return (
        <div>
            <EncounterForm encounterId={encounterId} />
        </div>
    );
}
