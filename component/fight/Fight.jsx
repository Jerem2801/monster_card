import { MessagesProvider } from '@/component/fight/resultDisplay/MessagesProvider';
import MonsterPage from './MonsterPage';
import ResultDisplayDialogBox from '@/component/fight/resultDisplay/ResultDisplayDialogBox';

export default function Fight({ encounterId }) {
  return (
    <MessagesProvider>
      {/* Fixe tout à hauteur écran - topnav */}
      <div className="relative h-[calc(100vh-5rem)] overflow-hidden">
        {/* Contenu principal scrollable, avec une marge à droite pour ne pas chevaucher */}
        <div className="h-full overflow-y-auto pr-80">
          <MonsterPage encounterId={encounterId} />
        </div>

        {/* Boîte de résultats fixée à droite, indépendante */}
        <ResultDisplayDialogBox />
      </div>
    </MessagesProvider>
  );
}
