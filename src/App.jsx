import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Layout from "./pages/layout";
import MasterData from "./pages/masterdata/master-data";
import User from "./pages/masterdata/user";
import Project from "./pages/masterdata/project";
import FinanceMasterData from "./pages/masterdata/FinanceMasterData";
import Finance from "./pages/finance/finance";
import Format from "./pages/cashbook/format";
import CashBook from "./pages/cashbook/cashbook";
import BankC from "./pages/cashbook/bankchasbook";
import PettyCash from "./pages/cashbook/pettycash";
import CashAdvance from "./pages/cashbook/cashadvance";
import Reimbursement from "./pages/cashbook/reimbursement";
import EntryCashAdvance from "./pages/cashbook/Entry/entryca";
import Dashboard from "./pages/dashboard";
import Bank from "./pages/masterdata/finance/bank";
import ClassF from "./pages/masterdata/finance/classF";
import Chart from "./pages/masterdata/finance/chart";
import Currency from "./pages/masterdata/finance/currency";
import Tax from "./pages/masterdata/finance/tax";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route path="master-data" element={<MasterData />}>
            <Route path="user" element={<User />} />
            <Route path="project" element={<Project />} />
            <Route path="finance" element={<FinanceMasterData />}>
              <Route path="bank" element={<Bank />} />
              <Route path="classF" element={<ClassF />} />
              <Route path="chart" element={<Chart />} />
              <Route path="currency" element={<Currency />} />
              <Route path="tax" element={<Tax />} />
            </Route>
          </Route>

          <Route path="finance" element={<Finance />}>
            
          </Route>

          <Route path="cashbook" element={<CashBook />}>
            <Route path="format" element={<Format />} />
            <Route path="bankchasbook" element={<BankC />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="pettycash" element={<PettyCash />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="cashadvance" element={<CashAdvance />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="reimbursement" element={<Reimbursement />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
