import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Loginxxx";
import Layout from "./pages/Layoutxxxx";
import MasterData from "./pages/masterdata/MasterData";
import Project from "./pages/masterdata/Projectxxx";
import FinanceMasterData from "./pages/masterdata/FinanceMasterData";
import Finance from "./pages/Financexxx/Finance";
import BankFinance from "./pages/Financexxx/BankFinance";
import TranscodeFinance from "./pages/Financexxx/TranscodeFinance";
import Format from "./pages/Cashbookxxx/Format";
import CashBook from "./pages/Cashbookxxx/CashBook";
import BankC from "./pages/Cashbookxxx/BankCashBook";
import PettyCash from "./pages/Cashbookxxx/PettyCash";
import CashAdvance from "./pages/Cashbookxxx/CashAdvance";
import Reimbursement from "./pages/Cashbookxxx/Reimbursement";
import EntryCashAdvance from "./pages/Cashbookxxx/Entry/entryca";
import Dashboard from "./pages/Dashboardxxx";
import Bank from "./pages/masterdata/FinanceMasterData/BankMasterData";
import ClassF from "./pages/masterdata/FinanceMasterData/ClassFinance/ClassFinance";
import Chart from "./pages/masterdata/FinanceMasterData/ChartOfAccount";
import Currency from "./pages/masterdata/FinanceMasterData/Currency";
import Tax from "./pages/masterdata/FinanceMasterData/Tax";
import UserData from "./pages/masterdata/User/UserData";
import UserRole from "./pages/masterdata/User/UserRole";
import Division from "./pages/masterdata/User/Division";
import RoleAccess from "./pages/masterdata/User/RoleAccess";
import Departement from "./pages/masterdata/User/Department";
import UserMasterData from "./pages/masterdata/UserMasterData";
import GeneralLedgerDashboard from "./pages/generalledger/GeneralLedgerDashboard";
import Setup from "./pages/generalledger/Setup";
import MainCOAMapping from "./pages/generalledger/COAMapping/MainCOAMapping";
import SubCOAMapping from "./pages/generalledger/COAMapping/SubCOAMapping";
import COADivision from "./pages/generalledger/COAMapping/COADivision";
import TransactionType from "./pages/generalledger/Setup/TransactionType";
import BudgetGroup from "./pages/generalledger/Setup/BudgetGroup";
import AccountPeriod from "./pages/generalledger/Setup/AccountPeriod";

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
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/Login" />}
          />

          <Route path="master-data" element={<MasterData />}>
            <Route path="user" element={<UserMasterData />}>
              <Route index element={<Navigate to="user-data" replace />} />
              <Route path="user-data" element={<UserData />} />
              <Route path="user-role" element={<UserRole />} />
              <Route path="division" element={<Division />} />
              <Route path="role-Access" element={<RoleAccess />} />
              <Route path="departement" element={<Departement />} />
            </Route>
            <Route path="user-data" element={<UserData />} />
            <Route path="user-role" element={<UserRole />} />
            <Route path="division" element={<Division />} />
            <Route path="role-access" element={<RoleAccess />} />
            <Route path="departement" element={<Departement />} />
            <Route path="project" element={<Project />} />
            <Route path="finance" element={<FinanceMasterData />}>
              <Route index element={<Navigate to="class-finance" replace />} />
              <Route path="bank" element={<Bank />} />
              <Route path="class-finance" element={<ClassF />} />
              <Route path="chart" element={<Chart />} />
              <Route path="currency" element={<Currency />} />
              <Route path="tax" element={<Tax />} />
            </Route>
          </Route>

          <Route path="finance" element={<Finance />}>
            <Route index element={<Navigate to="bank" replace />} />
            <Route path="bank" element={<BankFinance />} />
            <Route path="transcode" element={<TranscodeFinance />} />
          </Route>

          <Route path="cash-book" element={<CashBook />}>
            <Route path="format" element={<Format />} />
            <Route path="bank-cash-book" element={<BankC />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="petty-cash" element={<PettyCash />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="cash-advance" element={<CashAdvance />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="reimbursement" element={<Reimbursement />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
          </Route>

          <Route path="general-ledger" element={<GeneralLedgerDashboard />}>
            <Route path="main-coa-mapping" element={<MainCOAMapping />}>
              <Route index element={<Navigate to="coa-mapping" replace />} />
              <Route path="coa-mapping" element={<SubCOAMapping />} />
              <Route path="coa-division" element={<COADivision />} />
            </Route>
            <Route path="setup" element={<Setup />}>
              <Route
                index
                element={<Navigate to="transaction-type" replace />}
              />
              <Route path="transaction-type" element={<TransactionType />} />
              <Route path="budget-group" element={<BudgetGroup />} />
              <Route path="account-period" element={<AccountPeriod />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
