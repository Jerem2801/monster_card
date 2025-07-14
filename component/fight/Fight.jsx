import { MessagesProvider } from '@/component/fight/resultDisplay/MessagesProvider';
import MonsterPage from './MonsterPage';
import ResultDisplayDialogBox from '@/component/fight/resultDisplay/ResultDisplayDialogBox';

export default function Fight({ encounterId }) {
    return (
        <MessagesProvider>
            <div className="flex" style={{ height: 'calc(100vh - 5rem)' }}>
                {/* Zone principale scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <MonsterPage encounterId={encounterId} />
                </div>

                {/* Panneau latéral fixe */}
                <div className="w-80 bg-white py-6">
                    <ResultDisplayDialogBox />
                </div>
            </div>
        </MessagesProvider>
    );
}
