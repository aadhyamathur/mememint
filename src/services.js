import axios from "axios";
export const getMemes = async () => {
  const { data } = await axios.get("https://api.imgflip.com/get_memes");
  console.log(data);
  return data;
};
