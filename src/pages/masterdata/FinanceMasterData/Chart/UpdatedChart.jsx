import axios from "axios";

const updatedDivision = async (
  updatedDivision,
  setDivision,
  setError,
  handleCloseUpdatedModal
) => {
  try {
    if (!updatedDivision || !updatedDivision.id) {
      throw new Error("Invalid user role data.");
    }

    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.put(
      `https://thrive-be.app-dev.altru.id/api/v1/divisions/${updatedDivision.id}`,
      updatedDivision,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setDivision((prevDivisions) =>
        prevDivisions.map((division) =>
          division.id === updatedDivision.id ? response.data.data : division
        )
      );
      handleCloseUpdatedModal();
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    console.error("Error details:", err);
    
    let errorMessage = "An unknown error occurred.";
    if (err.response) {
      console.error("Response error:", err.response.data);
      errorMessage = `Error: ${err.response.status} - ${err.response.data.message || "Unknown error"}`;
    } else if (err.request) {
      console.error("No response from server:", err.request);
      errorMessage = "No response received from the server.";
    } else {
      console.error("General error:", err.message);
      errorMessage = `Error: ${err.message}`;
    }

    setError(errorMessage);
  }
};

export default updatedDivision;
