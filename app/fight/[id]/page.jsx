'use client';

import { useParams } from 'next/navigation';
import Fight from '@/component/fight/Fight';

export default function Page() {
    const params = useParams();
    const encounterId = params.id;

    return (
        <div>
            <Fight encounterId={encounterId} />
        </div>
    );
}
