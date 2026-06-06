export function HeroCardSkeleton() {
  return (
    <div className="flex h-43.5 w-full animate-pulse flex-col items-center justify-center rounded-[10px] bg-white px-5 shadow-[0_4px_10px_rgba(31,41,55,0.12)]">
      <div className="h-23.5 w-23.5 rounded-full bg-[#e8e4e1]" />
      <div className="mt-5 h-4 w-20 rounded-full bg-[#e8e4e1]" />
    </div>
  );
}
