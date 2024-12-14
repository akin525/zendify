import { Information } from "iconsax-react";
import { ComingSoon } from ".";

export function Notice({ type }) {
  const render = () => {
    switch (type) {
      case "development":
        return <InDevelopment />;
      case "coming-soon":
        return <ComingSoon />;
      default:
        return null;
    }
  };

  return <>{render()}</>;
}

const InDevelopment = () => {
  return (
    <div className="mb-3 mt-1 flex h-max w-full justify-center">
      <div className="my-3 mt-1 flex h-8 w-max animate-bounce items-center justify-center gap-2 rounded-2xl bg-primary/5 px-6 delay-75">
        <Information size={20} className="text-secondary" />
        <p className="bg text-neutral-0 py-2 text-sm font-medium text-secondary">
          Feature still in development!
        </p>
      </div>
    </div>
  );
};
