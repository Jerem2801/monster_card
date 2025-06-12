export default function AdvantageButton({remove, add, advantage}) {
  return (
    <div className="flex items-center gap-2">
      <button className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded" onClick={remove}>-</button>
        {advantage}
      <button className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded" onClick={add}>+</button>
    </div>);
}