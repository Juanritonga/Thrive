import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Layout from "./pages/layout";
import Format from "./pages/cashbook/format";
import CashBook from "./pages/cashbook/cashbook";
import BankC from "./pages/cashbook/bankchasbook";
import PettyCash from "./pages/cashbook/pettycash";
import CashAdvance from "./pages/cashbook/cashadvance";
import Reimbursement from "./pages/cashbook/reimbursement";
import EntryCashAdvance from "./pages/cashbook/Entry/entryca";

import Dashboard from "./pages/dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          {/* If authenticated, go to dashboard, otherwise redirect to login */}
          <Route
            index
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Routes for other pages */}
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
