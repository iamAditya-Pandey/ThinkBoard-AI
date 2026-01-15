import { BrainCircuit } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
        <BrainCircuit className="w-6 h-6 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
        ThinkBoard
      </span>
    </div>
  );
};