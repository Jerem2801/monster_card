'use client';

import { useParams } from 'next/navigation';
import EncounterFormPage from '@/component/encounter/form/EncounterFormPage';

export default function Page() {
    const params = useParams();
    const encounterId = params.id;

    return (
        <div>
            <EncounterFormPage encounterId={encounterId} />
        </div>
    );
}
