import Passive from './Passive';

export default function PassivePanel({ monster, addMonsterCard }) {
    return (
        <div>
            {monster.passif && monster.passif.length > 0 && (
                <div className="rounded-sm p-2 italic" style={{ backgroundColor: '#d6d3d1' }}>
                    {monster.passif.map(passifDetail => (
                        <Passive
                            key={passifDetail.name}
                            passive={passifDetail}
                            addMonsterCard={addMonsterCard}
                            monsterName={monster.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
