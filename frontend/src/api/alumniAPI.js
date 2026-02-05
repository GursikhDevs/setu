import axios from "axios";
const Pre_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${Pre_API_URL}/suggestion/publicAlumni?page=1&limit=10`;
// http://localhost:3000/suggestion/suggestAlumni?page=1&limit=10
export const fetchRandomAlumni = async () => {
  const res = await axios.get(API_URL);
  // console.log(res.data.suggestions);
  

  const data = res.data.suggestions;

  // shuffle
  const shuffled = data.sort(() => 0.5 - Math.random());

  // return only 10
  return shuffled.slice(0, 10);
};



