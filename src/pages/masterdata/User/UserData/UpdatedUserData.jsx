import axios from "axios";

const updatedUserData = async (
  updatedUserData,
  setUserData,
  setError,
  handleCloseUpdatedModal
) => {
  try {
    if (!updatedUserData || !updatedUserData.id) {
      throw new Error("Invalid user data.");
    }

    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    console.log("Payload being sent:", JSON.stringify(updatedUserData, null, 2));

    const response = await axios.put(
      `https://thrive-be.app-dev.altru.id/api/v1/users/${updatedUserData.id}`,
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response data:", response.data);

    if (response.data.success) {
      setUserData((prevUserData) =>
        prevUserData.map((data) =>
          data.id === updatedUserData.id ? response.data.data : data
        )
      );
      handleCloseUpdatedModal();
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    if (err.response) {
      console.error("Response error data:", err.response.data);
      console.error("Response status:", err.response.status);
    } else if (err.request) {
      console.error("No response received from server:", err.request);
    } else {
      console.error("Error message:", err.message);
    }

    const errorMessage =
      err.response?.data?.message
        ? `Error: ${err.response.status} - ${err.response.data.message}`
        : err.request
        ? "No response received from the server."
        : err.message || "An unknown error occurred.";

    setError(errorMessage);
  }
};

export default updatedUserData;
