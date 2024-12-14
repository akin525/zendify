// import { ComingSoon } from "@/components/Element";
import { Route, Routes } from "react-router-dom";
import Terminal from "./Terminal";
import AllTerminal from "./AllTerminal";
import MappedTerminal from "./MappedTerminal";
import UnmappedTerminal from "./UnmappedTerminal";
import { PageError } from "@/components/Element/Error";
import TerminalDetails from "./TerminalDetails";
import TerminalTransactions from "./TerminalTransactions";
import { ComingSoon } from "@/components/Element";
import MapTerminal from "../../../components/Element/MapTerminal.tsx";
import DashboardTerminal from "../../../components/Element/DashboardTerminal.tsx";
import AllTerminalTransactions from "../components/AllTerminalTransaction.tsx";
import ConfigureTerminal from "@/components/Element/ConfigureTerminal.tsx";
export function TerminalRoutes() {
  return (
    <Routes>
      {/* <Route path="" element={<ComingSoon />} /> */}
        <Route path="terminal-transaction" element={<AllTerminalTransactions />} />

      <Route path="" element={<Terminal />}>
        <Route index element={<AllTerminal />} />
        <Route path="mapped" element={<MappedTerminal />} />
        <Route path="unmapped" element={<UnmappedTerminal />} />
      </Route>

      <Route path="/:id" element={<TerminalDetails />}>
        {/* <Route index path="/transactions" element={<TerminalTransactions />} /> */}
          <Route path="map-terminal" element={<MapTerminal />} />  {/* Add MapTerminal route */}
          <Route path="transactions" element={<TerminalTransactions />} />
        <Route path="daily-report" element={<ComingSoon />} />
        <Route path="dashboard" element={<DashboardTerminal />} />
        <Route path="configure" element={<ConfigureTerminal />} />
      </Route>

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
