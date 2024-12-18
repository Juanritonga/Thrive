import axios from "axios";
import { useState, useEffect } from "react";
import addUserRole from "./UserRole/AddUserRole";
import updatedUserRole from "./UserRole/UpdatedUserRole";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

const UserRole = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState({
    role_name: "",
    division_id: "",
    status: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserRole, setEditUserRole] = useState({
    role_name: "",
    division_id: "",
    status: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (userRole) => {
    setEditUserRole({
      ...userRole,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchUserRoles = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await api.get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setUserRoles(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error:", err.response || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/divisions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      });

      if (response.data.success) {
        setDivisions(response.data.data.items);
        if (!newUserRole.division_id) {
          setNewUserRole((prev) => ({
            ...prev,
            division_id: response.data.data.items[0]?.id || "", // Set division_id if not set
          }));
        }
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    }
  };

  const handleDeleteUserRole = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.delete(`/roles/${editUserRole.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Refresh the user roles list
        fetchUserRoles();
        handleCloseEditModal();
      } else {
        throw new Error(response.data.message || "Failed to delete role.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async () => {
    setLoading(true); // Set loading to true when starting the request
    await updatedUserRole(
      editUserRole,
      setUserRoles,
      setError,
      handleCloseEditModal
    );
    fetchUserRoles();
  };

  const handleAddUserRole = async () => {
    setLoading(true); // Set loading to true when starting the request
    await addUserRole(
      newUserRole,
      setUserRoles,
      setNewUserRole,
      setError,
      handleCloseModal
    );
    fetchUserRoles(); // Call this after adding a role to refresh the data
  };

  const filteredData = userRoles.filter((userRole) =>
    Object.values(userRole)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUserRoles();
    fetchDivisions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-custom-blue border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
        </div>
        <button
          className="bg-custom-blue text-white px-2 py-2 rounded-lg w-full sm:w-auto"
          onClick={handleOpenModal}
        >
          Tambah Baru
        </button>
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Role ID</th>
                <th className="py-3 px-4 border">Role Name</th>
                <th className="py-3 px-4 border">Division ID</th>
                <th className="py-3 px-4 border">Division Code</th>
                <th className="py-3 px-4 border">Division Name</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Create</th>
                <th className="py-3 px-4 border">Update</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((userRole) => (
                <tr
                  key={userRole.id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{userRole.role_id}</td>
                  <td className="py-3 px-4">{userRole.role_name}</td>
                  <td className="py-3 px-4">{userRole.division_id}</td>
                  <td className="py-3 px-4">{userRole.division_code}</td>
                  <td className="py-3 px-4">{userRole.division_name}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        userRole.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {userRole.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(userRole.created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(userRole.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="font-bold bg-gray-200 text-gray-400 p-3 rounded-lg w-10 h-10 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={() => handleOpenEditModal(userRole)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="RoleName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Role Name
                  </label>
                  <input
                    type="text"
                    id="RoleName"
                    placeholder="Role Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserRole.role_name}
                    onChange={(e) =>
                      setNewUserRole({
                        ...newUserRole,
                        role_name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Division */}
                <div>
                  <label
                    htmlFor="division"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Division
                  </label>
                  <select
                    id="division"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserRole.division_id || ""}
                    onChange={(e) =>
                      setNewUserRole({
                        ...newUserRole,
                        division_id: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Division
                    </option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.division_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserRole.status || ""}
                    onChange={(e) =>
                      setNewUserRole({
                        ...newUserRole,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handleAddUserRole}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Edit User Role</h2>
              <button className="text-white" onClick={handleCloseEditModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-8">
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  value={editUserRole.role_name}
                  onChange={(e) =>
                    setEditUserRole({
                      ...editUserRole,
                      role_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="division"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Division
                </label>
                <select
                  id="division"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={editUserRole.division_id || ""}
                  onChange={(e) =>
                    setEditUserRole({
                      ...editUserRole,
                      division_id: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Division
                  </option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.division_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md"
                  value={editUserRole.status}
                  onChange={(e) =>
                    setEditUserRole({
                      ...editUserRole,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={handleDeleteUserRole}
              >
                Delete
              </button>

              <div className="flex justify-end">
                <button
                  className="bg-custom-blue text-white py-2 px-6 rounded-lg"
                  onClick={handleUpdateUserRole}
                >
                  Save
                </button>
              </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRole;
