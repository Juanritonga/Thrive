import axios from "axios";
import { useState, useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionOpenId, setActionOpenId] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    entity_id: "",
    status: "",
  });
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const fetchProjects = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/projects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { page: currentPage, limit: limit },
        }
      );

      if (response.data.success) {
        setProjects(response.data.data.items || []);
        setTotalPages(response.data.data.total_pages || 1);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setLoading(false);
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
          params: { page: currentPage, limit: limit },
        }
      );

      console.log("Entities fetched:", response.data.data.items);

      if (response.data.success) {
        setEntities(response.data.data.items);
        if (!newProject.entity_id) {
          setNewProject((prev) => ({
            ...prev,
            entity_id: response.data.data.items[0]?.id || "",
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

  const handleAddProject = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      if (!newProject.name.trim() || !newProject.status.trim()) {
        setError("Project name and status are required.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://thrive-be.app-dev.altru.id/api/v1/projects",
        {
          name: newProject.name.trim(),
          entity_id: newProject.entity_id,
          status: newProject.status.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const newAddedProject = response.data.data;

        setProjects((prevProjects) => [newAddedProject, ...prevProjects]);
        setNewProject({
          name: "",
          entity_id: entities[0]?.id || "",
          status: "",
        });
        await fetchProjects();
        setError(null);
      } else {
        setError(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.delete(
        `https://thrive-be.app-dev.altru.id/api/v1/projects/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        setActionOpenId(null); // Close the action dropdown after deletion
        setError(null);
      } else {
        setError(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    }
  };

  const handleActionToggle = (projectId) => {
    setActionOpenId((prevId) => (prevId === projectId ? null : projectId));
  };

  useEffect(() => {
    fetchProjects();
    fetchEntities();
  }, [currentPage, limit]);

  const filteredData = projects.filter(
    (project) =>
      project &&
      Object.values(project).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
          className="bg-custom-blue text-white px-2 py-2 p-4 rounded-lg w-full sm:w-auto flex items-center justify-center space-x-2"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus text-white"></i>
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Project ID</th>
                <th className="py-3 px-4 border">Nama Project</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((project) => (
                <tr
                  key={project.id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{project.project_id}</td>
                  <td className="py-3 px-4">{project.name}</td>
                  <td className="py-3 px-4">{project.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(project.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-6 py-1 rounded-full font-bold w-max ${
                        project.status === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      {actionOpenId === project.id ? (
                        <button
                          className="font-bold text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12"
                          onClick={() => handleActionToggle(project.id)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-custom-blue text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-md text-white bg-custom-blue"
              value={limit}
              onChange={(e) =>
                setCurrentPage(1) || setLimit(Number(e.target.value))
              }
            >
              <option value={10}>10 Baris</option>
              <option value={20}>20 Baris</option>
              <option value={50}>50 Baris</option>
            </select>
          </div>
        </div>
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
                    htmlFor="entity"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Entitas
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newProject.entity_id || "1"}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        entity_id: e.target.value,
                      })
                    }
                  >
                    <option value="1" disabled>
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
                    htmlFor="projectName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nama Project
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    placeholder="Project Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                  />
                </div>
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
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                    onClick={handleAddProject}
                  >
                    <i className="fa-solid fa-plus text-white mr-2"></i>
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
