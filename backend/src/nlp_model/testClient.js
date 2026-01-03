import axios from 'axios'

const ML_API_URL = "http://localhost:8000/analyze";

export async function analyzeReview(text) {
  const response = await axios.post(ML_API_URL, {
    text
  });

  return response.data;
}

// Example usage
(async () => {
  const result = await analyzeReview("Hello, my dog is not cute");
  console.log(result);
})();
