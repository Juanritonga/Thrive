import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../components/Table";

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
  const [updatedProject, setUpdatedProject] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
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

  const handleAddProject = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      if (!newProject.name.trim() || !newProject.status.trim()) {
        alert("Isi Terlebih Dahulu");
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

  const fetchProjectDetail = async (projectId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.get(
        `https://thrive-be.app-dev.altru.id/api/v1/projects/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setProjectDetail(response.data.data); // Menyimpan detail proyek ke state
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    }
  };

  const handleProjectClick = (projectId) => {
    fetchProjectDetail(projectId);
  };

  const handleEditProject = async (projectId, updatedData) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      // Validate the required fields before making the request
      if (
        !updatedData.name.trim() ||
        !updatedData.entity_id ||
        !updatedData.status.trim()
      ) {
        alert("All fields (name, entity_id, status) are required.");
        setLoading(false);
        return;
      }

      // Optimistically update the project in the UI before the API request
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, ...updatedData } : project
        )
      );

      // Make the API request to update the project
      const response = await axios.put(
        `https://thrive-be.app-dev.altru.id/api/v1/projects/${projectId}`,
        {
          name: updatedData.name.trim(),
          entity_id: updatedData.entity_id,
          status: updatedData.status.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check the response success
      if (response.data.success) {
        const updatedProject = response.data.data;

        // Update project list with the new data after a successful update
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId ? updatedProject : project
          )
        );

        setError(null);
        setEditModalOpen(false);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      // If an error occurs, revert the optimistic update and show an error message
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, status: project.status }
            : project
        )
      );

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
    if (selectedProject) {
      setUpdatedProject({ ...selectedProject });
    }
    fetchProjects();
    fetchEntities();
  }, [selectedProject, currentPage, limit]);

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

  const columns = [
    { header: "Project ID", accessor: "project_id" },
    { header: "Nama Project", accessor: "name" },
    { header: "Dibuat Oleh", accessor: "created_by" },
    {
      header: "Tanggal Update",
      accessor: (project) =>
        new Date(project.updated_at)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
    },
    {
      header: "Status",
      accessor: (project) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            project.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {project.status}
        </span>
      ),
    },
  ];
  
  const actions = [
    {
      label: "Update",
      icon: "fas fa-edit",
      buttonClass: "bg-blue-500 text-white hover:bg-blue-600",
      handler: (project) => {
        setSelectedProject(project);
        setEditModalOpen(true);
      },
    },
    {
      label: "Delete",
      icon: "fas fa-trash",
      buttonClass: "bg-red-500 text-white hover:bg-red-600",
      handler: (project) => {
        setSelectedProject(project);
        setDeleteModalOpen(true);
      },
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
          <Table columns={columns} data={filteredData} actions={actions} onRowClick={(project) => handleProjectClick(project.id)} />
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
                    id="entity"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newProject.entity_id || ""}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
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

      {projectDetail && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="modal-content bg-white rounded-lg max-w-2xl w-full shadow-lg overflow-hidden">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold">Project Detail</h2>
              <button
                className="text-white hover:text-gray-200"
                onClick={() => setProjectDetail(null)} // Close modal
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 text-sm text-gray-600">
                {/* Project ID */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Project ID :</p>
                  <p className="text-gray-700">{projectDetail.project_id}</p>
                </div>

                {/* Project Name */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Name :</p>
                  <p className="text-gray-700">{projectDetail.name}</p>
                </div>

                {/* Status */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Status :</p>
                  <p
                    className={`text-${
                      projectDetail.status === "active" ? "green" : "red"
                    }-600`}
                  >
                    {projectDetail.status.charAt(0).toUpperCase() +
                      projectDetail.status.slice(1)}
                  </p>
                </div>

                {/* Created By */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Created By :</p>
                  <p className="text-gray-700">{projectDetail.created_by}</p>
                </div>

                {/* Created At */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Created At :</p>
                  <p className="text-gray-700">
                    {new Date(projectDetail.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Updated At */}
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">Updated At :</p>
                  <p className="text-gray-700">
                    {new Date(projectDetail.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Edit Project</h2>
              <button
                className="text-white"
                onClick={() => setEditModalOpen(false)} // Close modal without saving
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleEditProject(selectedProject.id, updatedProject); // Submit the data
                }}
              >
                {/* Nama Project */}
                <div className="mb-4">
                  <label
                    htmlFor="editName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nama Project
                  </label>
                  <input
                    type="text"
                    id="editName"
                    placeholder="Project Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={updatedProject.name || selectedProject.name}
                    onChange={(e) =>
                      setUpdatedProject({
                        ...updatedProject,
                        name: e.target.value.trim(),
                      })
                    }
                  />
                </div>

                {/* Entitas */}
                <div className="mb-4">
                  <label
                    htmlFor="editEntity"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Entitas
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={
                      updatedProject.entity_id ||
                      selectedProject.entity_id ||
                      ""
                    }
                    onChange={(e) =>
                      setUpdatedProject({
                        ...updatedProject,
                        entity_id: e.target.value, 
                      })
                    }
                  >
                    {/* Pastikan entities tidak kosong */}
                    {entities && entities.length > 0 ? (
                      entities.map((entity) => (
                        <option key={entity.id} value={entity.id}>
                          {entity.entity_name} 
                        </option>
                      ))
                    ) : (
                      <option disabled>No entities available</option> 
                    )}
                  </select>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label
                    htmlFor="editStatus"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="editStatus"
                    value={updatedProject.status || selectedProject.status}
                    onChange={(e) =>
                      setUpdatedProject({
                        ...updatedProject,
                        status: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    onClick={() => setEditModalOpen(false)} // Close modal without saving
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center bg-red-500 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Hapus Project</h2>
              <button
                className="text-white"
                onClick={() => setDeleteModalOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 text-center">
              <p className="text-lg">
                Apakah Anda yakin ingin menghapus project ini?
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                  onClick={() => {
                    handleDeleteProject(selectedProject.id);
                    setDeleteModalOpen(false);
                  }}
                >
                  Ya
                </button>
                <button
                  className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
