const BASE_URL = "https://swapi.dev/api/"; // Replace with your API base URL

// Helper function to handle response data
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}

// GET request
export async function get(url) {
  const response = await fetch(`${BASE_URL}${url}`);
  return handleResponse(response);
}
