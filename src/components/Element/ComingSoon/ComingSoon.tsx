import { WidthWrapper } from "@/components/Layout";
import { Information } from "iconsax-react";

export function ComingSoon() {
  return (
    <WidthWrapper>
      <div className="flex w-full flex-wrap justify-center pb-5 pt-20 ">
        <div className="flex w-full max-w-[600px] flex-col items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-4 py-20">
          <Information size="72" className="animate-bounce text-emerald-500" />
          <h2 className="text-center text-2xl font-bold  text-emerald-500">
            Coming Soon!
          </h2>
          <p className="text-sm text-neutral-600">
            still in development... check back later.
          </p>
        </div>
      </div>
    </WidthWrapper>
  );
}
