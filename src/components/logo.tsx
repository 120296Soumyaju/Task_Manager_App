import { CheckSquare } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CheckSquare className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight">TaskFlow</span>
    </div>
  );
}
