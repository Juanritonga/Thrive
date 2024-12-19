import axios from "axios";
import { useState, useEffect } from "react";
import addUserData from "./UserData/AddUserData";
import updatedUserData from "./UserData/UpdatedUserData";
import Table from "@/components/Table";

const User = () => {
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    full_name: "",
    position: "",
    role_id: "",
    entity_id: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    password: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    full_name: "",
    position: "",
    role_id: "",
    entity_id: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    password: "",
  });
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenEditModal = (userData) => {
    setEditUserData({
      ...userData,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { page: 1, limit: 20 },
        }
      );

      if (response.data.success) {
        setUsers(response.data.data.items);
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

  const fetchRoles = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/roles",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { limit: 10 },
        }
      );

      console.log("Roles fetched:", response.data.data.items);

      if (response.data.success) {
        setRoles(response.data.data.items);
        if (!newUserData.role_id) {
          setNewUserData((prev) => ({
            ...prev,
            role_id: response.data.data.items[0]?.id || "", // Set entity_id awal jika belum ada
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

  const fetchEntities = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/entities",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { limit: 10 },
        }
      );

      console.log("Entities fetched:", response.data.data.items);

      if (response.data.success) {
        setEntities(response.data.data.items);
        if (!newUserData.entity_id) {
          setNewUserData((prev) => ({
            ...prev,
            entity_id: response.data.data.items[0]?.id || "", // Set entity_id awal jika belum ada
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
  const handleDeleteUserData = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.delete(
        `https://thrive-be.app-dev.altru.id/api/v1/users/${editUserData.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Refresh the user roles list
        fetchUsers();
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
  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchEntities();
  }, []);

  const handleUpdateUserData = async () => {
    setLoading(true); // Set loading to true when starting the request
    await updatedUserData(
      editUserData,
      setUsers,
      setError,
      handleCloseEditModal
    );
    fetchUsers();
  };
  const handleAddUserData = async () => {
    setLoading(true); // Set loading to true when starting the request
    await addUserData(
      newUserData,
      setUsers,
      setNewUserData,
      setError,
      handleCloseModal
    );
    fetchUsers(); // Call this after adding a class to refresh the data
  };

  const filteredData = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: "User ID", accessor: "user_id" },
    { header: "Full Name", accessor: "full_name" },
    { header: "Role", accessor: "role" },
    { header: "Entity", accessor: "entity" },
    {
      header: "Status",
      accessor: (user) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            user.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {user.status}
        </span>
      ),
    },
  ];
  
  const actions = [
    {
      label: "Edit",
      icon: "fas fa-edit",
      buttonClass: "bg-gray-200 text-gray-400",
      handler: (user) => handleOpenEditModal(user),
    },
  ];
  

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
          <Table columns={columns} data={filteredData} actions={actions} />
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
                {/* Entitas */}
                <div>
                  <label
                    htmlFor="FullName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="FullName"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserData.full_name}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="FullName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Posisi
                  </label>
                  <input
                    type="text"
                    id="position"
                    placeholder="Posisi"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserData.position} // Nilai default 'Position' ditampilkan jika belum ada perubahan
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        position: e.target.value, // Update nilai posisi sesuai input
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserData.role_id || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        role_id: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {roles.map(
                      (
                        role // Changed `role` to `roles`
                      ) => (
                        <option key={role.id} value={role.id}>
                          {role.role_name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="entity"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Entitas
                  </label>
                  <select
                    id="entity"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserData.entity_id || ""}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        entity_id: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Entity
                    </option>
                    {entities.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.entity_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nama Project */}
                <div>
                  <label
                    htmlFor="code"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="code"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newUserData.phone}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="addres"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="addres"
                  placeholder="Alamat"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newUserData.address}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, address: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newUserData.status}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, status: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newUserData.password}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, password: e.target.value })
                  }
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  className="w-full sm:w-1/2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                {loading ? (
                  <button
                    className="w-full sm:w-1/2 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
                    disabled
                  >
                    Processing...
                  </button>
                ) : (
                  <button
                    className="w-full sm:w-1/2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    onClick={handleAddUserData}
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Edit User Data</h2>
              <button className="text-white" onClick={handleCloseEditModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-8">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editUserData.full_name}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Position */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  value={editUserData.position}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      position: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={editUserData.role_id || ""}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      role_id: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entity ID */}
              <div>
                <label
                  htmlFor="entity"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Entitas
                </label>
                <select
                  id="entity"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newUserData.entity_id || ""}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      entity_id: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Entity
                  </option>
                  {entities.map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.entity_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editUserData.phone}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={editUserData.address}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md"
                  value={editUserData.status}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={handleDeleteUserData}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handleUpdateUserData}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
