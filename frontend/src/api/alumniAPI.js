import axios from "axios";

const API_URL = "";

export const fetchRandomAlumni = async () => {
  const res = await axios.get(API_URL);

  const data = res.data;

  // shuffle
  const shuffled = data.sort(() => 0.5 - Math.random());

  // return only 10
  return shuffled.slice(0, 10);
};



