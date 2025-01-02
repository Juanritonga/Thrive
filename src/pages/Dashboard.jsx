import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Registrasi elemen Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  // Dummy data untuk dashboard
  const projects = [
    { id: 1, name: "Project Alpha", progress: 80 },
    { id: 2, name: "Project Beta", progress: 60 },
    { id: 3, name: "Project Gamma", progress: 40 },
  ];

  const users = [
    { id: 1, name: "Alice Johnson", role: "Admin" },
    { id: 2, name: "Bob Smith", role: "Manager" },
    { id: 3, name: "Charlie Brown", role: "Developer" },
  ];

  const departments = ["HR", "Finance", "IT", "Operations", "Marketing"];
  const divisions = ["Division A", "Division B", "Division C"];

  const finance = {
    class: "Premium",
    chart: "Chart Placeholder",
    currency: "USD",
    bank: "Citibank",
    tax: "15%",
  };

  // Data untuk Bar Chart (Progress Projects)
  const barChartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: "Progress (%)",
        data: projects.map((project) => project.progress),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  // Data untuk Pie Chart (Users by Role)
  const pieChartData = {
    labels: ["Admin", "Manager", "Developer"],
    datasets: [
      {
        label: "Users by Role",
        data: [1, 1, 1], // Jumlah per role (sesuai dummy data)
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Projects Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <Bar data={barChartData} />
        </div>

        {/* User Data Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Data</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center mb-3"
              >
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{user.role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pie Chart for User Roles */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Roles Distribution</h2>
          <Pie data={pieChartData} />
        </div>

        {/* Departments Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          <ul>
            {departments.map((department, index) => (
              <li key={index} className="mb-2">
                {department}
              </li>
            ))}
          </ul>
        </div>

        {/* Divisions Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Divisions</h2>
          <ul>
            {divisions.map((division, index) => (
              <li key={index} className="mb-2">
                {division}
              </li>
            ))}
          </ul>
        </div>

        {/* Finance Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 md:col-span-2 xl:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Finance Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">Class</h3>
              <p className="text-gray-700">{finance.class}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">Chart</h3>
              <p className="text-gray-700">{finance.chart}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">Currency</h3>
              <p className="text-gray-700">{finance.currency}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">Bank</h3>
              <p className="text-gray-700">{finance.bank}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">Tax</h3>
              <p className="text-gray-700">{finance.tax}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
