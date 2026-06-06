export function HeroCardSkeleton() {
  return (
    <div className="flex h-[190px] w-full animate-pulse flex-col items-center justify-center rounded-[10px] bg-white px-5 shadow-[0_4px_10px_rgba(31,41,55,0.12)]">
      <div className="h-[104px] w-[104px] rounded-full bg-[#e8e4e1]" />
      <div className="mt-5 h-[18px] w-24 rounded-full bg-[#e8e4e1]" />
    </div>
  );
}
