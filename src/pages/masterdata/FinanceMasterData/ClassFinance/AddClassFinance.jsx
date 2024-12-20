import axios from "axios";

const addClassFinance = async (
  newClassFinance,
  setClassFinance,
  setNewClassFinance,
  setError,
  handleCloseModal
) => {
    try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Authorization token is missing.");
      
        const response = await axios.post(
          "https://thrive-be.app-dev.altru.id/api/v1/finance/classes",
          newClassFinance,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (response.data.success) {
          setClassFinance((prevClassFinance) => [response.data.data, ...prevClassFinance]);
          setNewClassFinance({
            name: "",
            code: "",
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

export default addClassFinance;
