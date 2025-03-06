import axios from "axios";

const addUserRole = async (
  newUserRole,
  setUserRole,
  setNewUserRole,
  setError,
  handleCloseModal,
  divisions
) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.post(
      "https://thrive-be.app-dev.altru.id/api/v1/roles",
      newUserRole,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      // Cari division_name berdasarkan division_id
      const division = divisions.find((d) => d.id === newUserRole.division_id);
      const division_name = division ? division.division_name : "Unknown";

      setUserRole((prevUserRole) => [
        { ...response.data.data, division_name },
        ...prevUserRole,
      ]);
      
      setNewUserRole({
        role_name: "",
        division_id: "",
        status: "",
      });
      handleCloseModal();
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    console.error("Error details:", err);
    if (err.response) {
      console.error("Response error:", err.response.data);
      setError(`Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
    } else if (err.request) {
      console.error("No response from server:", err.request);
      setError("No response received from the server.");
    } else {
      console.error("General error:", err.message);
      setError(`Error: ${err.message}`);
    }
  }
};

export default addUserRole;
