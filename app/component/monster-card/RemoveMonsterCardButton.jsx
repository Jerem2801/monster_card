export default function RemoveMonsterCardButton({removeMonsterCard}){
    return (		
        <div className="clearfix">
            <button
                onClick={removeMonsterCard}
                className="float-right cursor-pointer text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
                aria-label="Remove Monster"
            >
                x
            </button>
        </div>);
}