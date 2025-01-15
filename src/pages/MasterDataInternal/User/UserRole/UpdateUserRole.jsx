import axios from "axios";

const updateUserRole = async (
  updatedUserRole,
  setUserRole,
  setError,
  handleCloseUpdatedModal
) => {
  try {
    // Validasi data yang diperlukan
    if (!updatedUserRole || !updatedUserRole.id) {
      throw new Error("Invalid user role data.");
    }

    // Ambil token otorisasi
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    // Debugging: Log payload
    console.log("Payload being sent:", JSON.stringify(updatedUserRole, null, 2));

    // Lakukan permintaan PUT ke API
    const response = await axios.put(
      `https://thrive-be.app-dev.altru.id/api/v1/roles/${updatedUserRole.id}`,
      updatedUserRole,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Debugging: Log respons server
    console.log("Response data:", response.data);

    // Tangani respons sukses
    if (response.data.success) {
      setUserRole((prevUserRole) =>
        prevUserRole.map((role) =>
          role.id === updatedUserRole.id ? response.data.data : role
        )
      );
      handleCloseUpdatedModal();
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    // Debugging: Log detail error
    if (err.response) {
      console.error("Response error data:", err.response.data);
      console.error("Response status:", err.response.status);
    } else if (err.request) {
      console.error("No response received from server:", err.request);
    } else {
      console.error("Error message:", err.message);
    }

    // Menentukan pesan error untuk ditampilkan
    const errorMessage =
      err.response?.data?.message
        ? `Error: ${err.response.status} - ${err.response.data.message}`
        : err.request
        ? "No response received from the server."
        : err.message || "An unknown error occurred.";

    setError(errorMessage);
  }
};

export default updateUserRole;
