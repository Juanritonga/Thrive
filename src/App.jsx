import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import MasterDataInternal from "./pages/MasterDataInternal/MasterDataInternal";
import Project from "./pages/MasterDataInternal/Project";
import FinanceInternal from "./pages/MasterDataInternal/FinanceInternal";
import FinanceExternal from "./pages/FinanceExternal/FinanceExternal";
import BankFinanceExternal from "./pages/FinanceExternal/BankFinanceExternal";
import TranscodeFinanceExternal from "./pages/FinanceExternal/TranscodeFinanceExternal";
import Format from "./pages/Cashbook/Format";
import CashBook from "./pages/Cashbook/Cashbook";
import BankC from "./pages/Cashbook/BankCashBook";
import PettyCash from "./pages/Cashbook/PettyCash";
import CashAdvance from "./pages/Cashbook/CashAdvance";
import Reimbursement from "./pages/Cashbook/Reimbursement";
import EntryCashAdvance from "./pages/Cashbook/Entry/EntryCashAdvance";
import Dashboard from "./pages/Dashboard";
import BankFinanceInternal from "./pages/FinanceInternal/BankFinanceInternal";
import ClassFinance from "./pages/FinanceInternal/ClassFinance";
import Chart from "./pages/FinanceInternal/ChartOfAccount";
import Currency from "./pages/FinanceInternal/Currency";
import TaxFinanceInternal from "./pages/FinanceInternal/TaxFinanceInternal";
import UserData from "./pages/MasterDataInternal/User/UserData";
import UserRole from "./pages/MasterDataInternal/User/UserRole";
import Division from "./pages/MasterDataInternal/User/Division";
import RoleAccess from "./pages/MasterDataInternal/User/RoleAccess";
import Entitas from "./pages/MasterDataInternal/User/Entity";
import GeneralLedgerDashboard from "./pages/xxxGeneralLedger/GeneralLedgerDashboard";
import Setup from "./pages/xxxGeneralLedger/Setup";
import MainCOAMapping from "./pages/xxxGeneralLedger/COAMapping/MainCOAMapping";
import SubCOAMapping from "./pages/xxxGeneralLedger/COAMapping/SubCOAMapping";
import COADivision from "./pages/xxxGeneralLedger/COAMapping/COADivision";
import TransactionType from "./pages/xxxGeneralLedger/Setup/TransactionType";
import BudgetGroup from "./pages/xxxGeneralLedger/Setup/BudgetGroup";
import AccountPeriod from "./pages/xxxGeneralLedger/Setup/AccountPeriod";
import EntryBank from "./pages/Cashbook/Entry/EntryBank";
import EntryReimbursement from "./pages/Cashbook/Entry/EntryReimbursement";
import ProjectExternal from "./pages/ProjectExternal/ProjectExternal";
import ProjectMaster from "./pages/ProjectExternal/ProjectMaster";
import Master from "./pages/ProjectExternal/ProjectMaster/Master";
import Phase from "./pages/ProjectExternal/ProjectMaster/Phase";
import Property from "./pages/ProjectExternal/ProjectMaster/Property";
import PropertyPhase from "./pages/ProjectExternal/ProjectMaster/PropertyPhase";
import SetupProject from "./pages/ProjectExternal/SetupProject";
import SetupClass from "./pages/ProjectExternal/Setup/SetupClass";
import SetupComponent from "./pages/ProjectExternal/Setup/SetupComponent";
import Cost from "./pages/ProjectExternal/Setup/Cost";
import Budget from "./pages/ProjectExternal/Budget";
import Entry from "./pages/ProjectExternal/Budget/Entry";
import Approval from "./pages/ProjectExternal/Budget/Approval";
import Report from "./pages/ProjectExternal/Report";
import YoYBudget from "./pages/ProjectExternal/Budget/DetailApproval/YoYBudget";
import Breakdown from "./pages/ProjectExternal/Budget/DetailApproval/Breakdown";

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

          <Route path="master-data" element={<MasterDataInternal />}>
            <Route index element={<Navigate to="user-role" replace />} />
            <Route path="user-data" element={<UserData />} />
            <Route path="user-role" element={<UserRole />} />
            <Route path="division" element={<Division />} />
            <Route path="role-access" element={<RoleAccess />} />
            <Route path="entitas" element={<Entitas />} />
            <Route path="project" element={<Project />} />
          </Route>

          <Route path="finance" element={<FinanceInternal />}>
            <Route path="bank" element={<BankFinanceInternal />} />
            <Route path="class-finance" element={<ClassFinance />} />
            <Route path="chart" element={<Chart />} />
            <Route path="currency" element={<Currency />} />
            <Route path="tax" element={<TaxFinanceInternal />} />
          </Route>

          <Route path="finance" element={<FinanceExternal />}>
            <Route index element={<Navigate to="bank" replace />} />
            <Route path="bank" element={<BankFinanceExternal />} />
            <Route path="transcode" element={<TranscodeFinanceExternal />} />
          </Route>

          <Route path="cash-book" element={<CashBook />}>
            <Route index element={<Navigate to="bank-cash-book" replace />} />
            <Route path="format" element={<Format />} />
            <Route path="bank-cash-book" element={<BankC />}>
              <Route path=":id" element={<EntryBank />} />
            </Route>
            <Route path="petty-cash" element={<PettyCash />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="cash-advance" element={<CashAdvance />}>
              <Route path=":id" element={<EntryCashAdvance />} />
            </Route>
            <Route path="reimbursement" element={<Reimbursement />}>
              <Route path=":id" element={<EntryReimbursement />} />
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

          <Route path="project" element={<ProjectExternal />}></Route>
          <Route path="managementproject" element={<ProjectMaster />}>
            <Route path="master" element={<Master />} />
            <Route path="phase" element={<Phase />} />
            <Route path="property" element={<Property />} />
            <Route path="_propertyphase" element={<PropertyPhase />} />
          </Route>
          <Route path="setup-project" element={<SetupProject />}>
            <Route path="class" element={<SetupClass />} />
            <Route path="component" element={<SetupComponent />} />
            <Route path="cost" element={<Cost />} />
          </Route>
          <Route path="budget" element={<Budget />}>
            <Route path="approval" element={<Approval />}></Route>
            <Route path="entry" element={<Entry />} />
          </Route>
          <Route path="report" element={<Report />}></Route>
          <Route path="/budget/approval/yoy-budget" element={<YoYBudget />} />
          <Route path="/budget/approval/breakdown" element={<Breakdown />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
