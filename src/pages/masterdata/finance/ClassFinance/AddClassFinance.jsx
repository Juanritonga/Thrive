import axios from "axios";

const addClassFinance = async (
  newClassF,
  setClassFs,
  setNewClassF,
  setError,
  handleCloseModal
) => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await axios.post(
      "https://thrive-be.app-dev.altru.id/api/v1/finance/classes",
      newClassF,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setClassFs((prevClassFs) => [response.data.data, ...prevClassFs]); 
      setNewClassF({ name: "", code: "", status: "" });
      handleCloseModal();
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || err.message || "An error occurred."
    );
  }
};

export default addClassFinance;
