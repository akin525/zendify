import React, { useEffect, useState } from "react";
import { GlobalSearch } from "iconsax-react";
import { FaTimes } from "react-icons/fa";
import { WidthWrapper } from "@/components/Layout";

type SearchProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  disabled?: boolean;
};

export function SearchBar({
  placeholder = "search...",
  onSearch = () => {},
  disabled = false,
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  useEffect(() => {
    if (searchQuery === "") {
      handleClear();
    }
  }, [searchQuery]);

  return (
    <WidthWrapper>
      <div className="relative my-2 flex w-full flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              type="name"
              id="search_transactions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-12 w-full rounded-xl border bg-white px-12 pr-20 text-sm outline-none focus:border-primary disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800"
              placeholder={placeholder}
              disabled={disabled}
            />

            {/* Search Icon */}
            <div className="absolute left-3 top-3 text-neutral-400">
              <GlobalSearch size="24" />
            </div>

            {/* Clear Icon */}
            {searchQuery && (
              <button
                className="absolute right-4 top-3 cursor-pointer select-none font-bold text-neutral-400"
                onClick={handleClear}
              >
                <FaTimes size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}
