import { Minus, Plus } from "lucide-react";

function QuantitySelector({
  quantity,
  increase,
  decrease,
}) {
  return (
    <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50">
      <button
        onClick={decrease}
        className="px-4 py-3 hover:bg-slate-100"
      >
        <Minus size={16} />
      </button>

      <span className="min-w-12 text-center font-bold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="px-4 py-3 hover:bg-slate-100"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default QuantitySelector;