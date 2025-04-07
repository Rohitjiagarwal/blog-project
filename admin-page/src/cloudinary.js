import axios from "axios";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog_images"); // Create this preset in Cloudinary

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dc6od4wrd/image/upload`,
    formData
  );
  return response.data.secure_url; // Returns the image URL
};

export default uploadImage;