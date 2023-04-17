import axios from "axios";
export const getMemes = async () => {
  const { data } = await axios.get("https://api.imgflip.com/get_memes");
  console.log(data);
  return data;
};

export const editMeme = async (id, topText, bottomText) => {
  const body = new URLSearchParams({
    template_id: id,
    text0: topText,
    text1: bottomText,
    username: process.env.REACT_APP_IMG_FLIP_USERNAME,
    password: process.env.REACT_APP_IMG_FLIP_PASSWORD,
  });

  try {
    const response = await axios.post(
      "https://api.imgflip.com/caption_image",
      body
    );
    const imageUrl = response.data.data.url;
    return imageUrl;
  } catch (error) {
    console.error("Failed to create meme", error);
  }
};
