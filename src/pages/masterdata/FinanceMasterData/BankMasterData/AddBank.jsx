import axios from "axios";

const addBank = async (
  newBank,
  setBank,
  setNewBank,
  setError,
  handleCloseModal
) => {
    try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Authorization token is missing.");
      
        const response = await axios.post(
          "https://thrive-be.app-dev.altru.id/api/v1/banks",
          newBank,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        if (response.data.success) {
          setBank((prevBank) => [response.data.data, ...prevBank]);
          setNewBank({
            bank: "",
            account_number: "",
            account_code: "",
            currency_id: "",
            division_id: "",
            status: "Active",
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

export default addBank;
