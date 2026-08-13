import { ArrowUpRight } from 'lucide-react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

export default function LiveProjectButton({
  label = 'Live Project',
  href = '#projects',
  className = '',
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {label}
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
    </a>
  );
}
