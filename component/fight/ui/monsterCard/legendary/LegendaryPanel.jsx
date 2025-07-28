import { getLegendaryContent } from './lib/legendaryUtils';

export default function LegendaryPanel({ monster }) {
    const bloodiedContent = getLegendaryContent(monster.bloodied);
    const lastStandContent = getLegendaryContent(monster.last_stand);

    return (
        <div>
            {monster.legendary && (
                <div className="mt-2 flex flex-col border-t-2 border-gray-600 pt-4">
                    <div>
                        <span className="font-bold">ENSANGLANTÉ :</span> {bloodiedContent}
                    </div>
                    <div>
                        <span className="font-bold">DERNIÈRE CHANCE:</span> {lastStandContent}
                    </div>
                </div>
            )}
        </div>
    );
}
