interface StatCardProps {
  label: string;
  value: number | string;
  accent?: string;
}

export default function StatCard({ label, value, accent = "text-gold" }: StatCardProps) {
  return (
    <div className="rounded-sm border border-gold/10 bg-charcoal-light p-6">
      <p className="text-sm uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-2 font-display text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
