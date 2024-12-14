export function WidthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full justify-center">
      <div className={`relative h-full w-full max-w-[1440px]`}>{children}</div>
    </div>
  );
}
