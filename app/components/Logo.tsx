import { PiggyBank } from "lucide-react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <PiggyBank className="stroke h-11 w-11 stroke-amber-500 stroke-[1.5]" />
      <p className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-3xl font-bold leading-tight tracking-tighter">
        BudgetTracker
      </p>
    </Link>
  );
}
export default Logo;
