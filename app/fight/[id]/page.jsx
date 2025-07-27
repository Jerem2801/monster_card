'use client';

import { useParams } from 'next/navigation';
import FightPage from '@/component/fight/FightPage';

export default function Page() {
    const params = useParams();
    const encounterId = params.id;

    return (
        <div>
            <FightPage encounterId={encounterId} />
        </div>
    );
}
