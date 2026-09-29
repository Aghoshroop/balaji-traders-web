import { AVAILABILITY_LABELS, AVAILABILITY_COLORS } from '@/types';
import type { AvailabilityStatus } from '@/types';

interface BadgeProps {
  status: AvailabilityStatus;
  size?: 'sm' | 'md';
}

export default function AvailabilityBadge({ status, size = 'sm' }: BadgeProps) {
  const label = AVAILABILITY_LABELS[status];
  const colorClasses = AVAILABILITY_COLORS[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-semibold ${colorClasses} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'in-stock' ? 'bg-emerald-600' :
        status === 'available' ? 'bg-sky-600' :
        status === 'limited' ? 'bg-amber-600' :
        status === 'new-arrival' ? 'bg-purple-600' :
        status === 'ask' ? 'bg-slate-500' :
        'bg-blue-600'
      }`} />
      {label}
    </span>
  );
}
