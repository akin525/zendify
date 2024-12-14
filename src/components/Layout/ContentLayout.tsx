import { useState } from "react";
import { MainLayout } from "./MainLayout";
import { Sidebar } from "./Sidebar";

export function ContentLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`relative min-h-screen overflow-hidden bg-gray-100 dark:bg-neutral-900`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <MainLayout toggleSidebar={toggleSidebar} />
      </div>
    </>
  );
}
