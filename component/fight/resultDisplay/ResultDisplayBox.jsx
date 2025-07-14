import { useEffect, useState } from 'react';
import { Popover } from 'flowbite-react';

export default function ResultDisplayBox({ msg }) {
  const { name, format, result, advantage,monsterName } = msg.text;

  const content = (
    <div className="w-64 text-sm text-gray-500">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
        <h3 className="font-semibold text-gray-900">Popover title</h3>
      </div>
      <div className="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
    </div>
  );

  let totalColor = 'text-gray-800 border-gray-300 bg-white';
  if (result.type === 'critic') {
    totalColor = 'text-green-600 border-green-400 bg-green-50 shadow-sm';
  } else if (result.type === 'failed') {
    totalColor = 'text-red-600 border-red-400 bg-red-50 shadow-sm';
  }

  // Animation d'opacité simple
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const advantageLabel =
    advantage > 0 ? (
      <span className="ml-2 font-medium text-green-600">(+{advantage})</span>
    ) : advantage < 0 ? (
      <span className="ml-2 font-medium text-red-600">({advantage})</span>
    ) : null;

  return (
    <div className="flex items-center justify-between rounded bg-gray-100 p-3">
      {/* Partie gauche */}
      <div className="flex flex-1 flex-col justify-between pr-4">
        <div className="mb-1 text-base font-bold text-gray-800">{monsterName}</div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <span>{name} : {format}</span>
          {advantageLabel}
          
          
        </div>
      </div>

      {/* Partie droite avec fade-in */}
      <Popover content={content} trigger="hover" portal={true}>
        <div
          className={`flex h-12 w-12 flex-col items-center justify-center rounded border text-lg font-bold ${totalColor}`}
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: visible ? 'auto' : 'none', // évite les bugs sur le hover si opacity=0
          }}
        >
          {result.total}
        </div>
      </Popover>
    </div>
  );
}
