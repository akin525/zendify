import { useTheme } from "@/contexts";
import { Moon, Sun1 } from "iconsax-react";

export function ThemeSwitcher({ showMode = false }) {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center gap-1  font-medium text-neutral-600 dark:bg-transparent dark:text-neutral-400 ${showMode ? "h-10 rounded-xl bg-primary/5 px-6 " : ""}`}
    >
      {theme ? (
        <Sun1 size="24" variant="Bold" />
      ) : (
        <Moon size="24" variant="Bold" />
      )}

      {showMode && (
        <span className="ml-2">{theme ? "Light Mode" : "Dark Mode"}</span>
      )}
    </button>
  );
}
