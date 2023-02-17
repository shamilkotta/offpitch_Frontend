import axiosInstance from "axios";
import useAxiosPrivate from "./userAxiosPrivate";

function useImageUploader() {
  const axios = useAxiosPrivate();

  const uploadImageToCloudinary = ({ file, onProgress = () => {} }) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      const imageData = new FormData();
      try {
        const res = await axios.get("/user/image-signature");
        imageData.append("file", file);
        imageData.append("api_key", process.env.REACT_APP_API_KEY);
        imageData.append("signature", res.data?.data?.signature);
        imageData.append("timestamp", res.data?.data?.timestamp);
        imageData.append("folder", "offpitch");
      } catch (err) {
        reject(err);
      }

      try {
        const cloudinaryResponse = await axiosInstance.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`,
          imageData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress(e) {
              onProgress((e.loaded / e.total) * 100);
            },
          }
        );
        const photoData = {
          public_id: cloudinaryResponse.data.public_id,
          version: cloudinaryResponse.data.version,
          signature: cloudinaryResponse.data.signature,
        };
        resolve({ success: true, photoData });
      } catch (err) {
        reject(err);
      }
    });

  return uploadImageToCloudinary;
}

export default useImageUploader;
