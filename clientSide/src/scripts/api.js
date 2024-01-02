// api.js
const handleErrors = (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };
  
  const fetchData = async (endpoint) => {
    const url = "http://127.0.0.1:5000"
    try {
      const response = await fetch(url + endpoint);
      return handleErrors(response);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  };
  
  export default fetchData;
  