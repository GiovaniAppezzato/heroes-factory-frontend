interface HeroFormFieldProps {
  error?: string;
  htmlFor: string;
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function HeroFormField({
  error,
  htmlFor,
  label,
  children,
  fullWidth = false,
}: HeroFormFieldProps) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-[#30343a]"
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
