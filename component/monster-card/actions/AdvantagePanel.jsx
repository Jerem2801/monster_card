export default function AdvantagePanel({ advantage, setAdvantage, onThrowDice, closeWindows,diceProperty }) {
	function getMinTotal({ numberDice, valueDice, bonus }) {
		return (1 + numberDice) + bonus;
	}

	function getMaxTotal({ numberDice, valueDice, bonus }) {
		return (numberDice*valueDice) + bonus;
	}



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative flex flex-col items-center gap-6 border border-gray-200">
		{/* Bouton fermer */}
		<button
			onClick={closeWindows}
			aria-label="Fermer la fenêtre"
			className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition-colors"
		>
			&times;
		</button>

		{/* Titre */}
		<h2 className="text-xl font-semibold text-gray-800">Ajuster l’avantage</h2>

		<div className="w-full bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
			<p>
				<strong>
					Fourchette :
				</strong> 
				<span className="text-red-500 ml-1 mr-1">
					 {getMinTotal(diceProperty)} 
				</span> 
					- 
				<span className="text-green-500 ml-1.5" >
					{getMaxTotal(diceProperty)} 
				</span>
			</p>
		</div>

		{/* Contrôle d’avantage */}
		<div className="flex items-center justify-center gap-6">
			<button
			onClick={() => setAdvantage((a) => a - 1)}
			aria-label="Réduire avantage"
			className="bg-red-100 text-red-600 hover:bg-red-200 font-bold text-xl w-10 h-10 rounded-full shadow transition"
			>
			−
			</button>

			<span className="text-3xl font-bold text-gray-700 w-10 text-center">{advantage}</span>

			<button
			onClick={() => setAdvantage((a) => a + 1)}
			aria-label="Augmenter avantage"
			className="bg-green-100 text-green-600 hover:bg-green-200 font-bold text-xl w-10 h-10 rounded-full shadow transition"
			>
			+
			</button>
		</div>

		{/* Bouton lancer */}
		<button
			onClick={onThrowDice}
			className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
		>
			Lancer le dé 🎲
		</button>
		</div>

    </div>
  );
}
