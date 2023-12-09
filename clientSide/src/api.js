// api.js
const handleErrors = (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };
  
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return handleErrors(response);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  };
  
  export default fetchData;
  