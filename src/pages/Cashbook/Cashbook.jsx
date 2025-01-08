import { Outlet, useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CashBook = () => {
  // Dummy data untuk Pie Chart
  const bankData = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 10 data bank
  const pettyCashData = [5, 10, 15, 20, 25, 30, 35, 40, 45]; // 9 data petty cash
  const cashAdvanceData = [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31,
  ]; // 16 data cash advance
  const reimbursementData = [2, 4, 6, 8, 10, 12, 14, 16, 18]; // 9 data reimbursement
  const formatData = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]; // 11 data format

  // Total untuk Pie Chart
  const totalBank = bankData.reduce((acc, val) => acc + val, 0);
  const totalPettyCash = pettyCashData.reduce((acc, val) => acc + val, 0);
  const totalCashAdvance = cashAdvanceData.reduce((acc, val) => acc + val, 0);
  const totalReimbursement = reimbursementData.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalFormat = formatData.reduce((acc, val) => acc + val, 0);

  // Data untuk Pie Chart
  const pieChartData = {
    labels: ["Bank", "Petty Cash", "Cash Advance", "Reimbursement", "Format"],
    datasets: [
      {
        data: [
          totalBank,
          totalPettyCash,
          totalCashAdvance,
          totalReimbursement,
          totalFormat,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Bank
          "rgba(255, 99, 132, 0.6)", // Petty Cash
          "rgba(53, 162, 235, 0.6)", // Cash Advance
          "rgba(255, 159, 64, 0.6)", // Reimbursement
          "rgba(153, 102, 255, 0.6)", // Format
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 99, 132)",
          "rgb(53, 162, 235)",
          "rgb(255, 159, 64)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js data setup untuk Bar Chart
  const barChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Month ${i + 1}`), // Generating month labels for the X-axis
    datasets: [
      {
        label: "Bank",
        data: bankData,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Updated color for professionalism
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "Petty Cash",
        data: pettyCashData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "Cash Advance",
        data: cashAdvanceData,
        backgroundColor: "rgba(53, 162, 235, 0.6)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Reimbursement",
        data: reimbursementData,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
      {
        label: "Format",
        data: formatData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
    ],
  };

  // Menggunakan useLocation untuk memeriksa lokasi saat ini
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      {/* Cek apakah path adalah '/cash-book' untuk menampilkan chart */}
      {location.pathname === "/cash-book" ? (
        <div className="flex-1 p-6 mt-0">
          <div className="grid grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                CashBook Overview
              </h2>
              <div className="w-full max-w-xs mx-auto">
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              {location.pathname === "/cash-book" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    CashBook Overview
                  </h2>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        tooltip: {
                          enabled: true,
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Month",
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Amount",
                          },
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default CashBook;
