interface HeroDetailFieldProps {
  label: string;
  value: string;
}

export function HeroDetailField({ label, value }: HeroDetailFieldProps) {
  return (
    <div>
      <dt className="text-[15px] font-semibold text-[#30343a]">{label}</dt>
      <dd className="mt-2 text-[15px] text-[#3f444c]">{value || "-"}</dd>
    </div>
  );
}
