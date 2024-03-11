import axios from "axios";
axios.defaults.baseURL =  "https://api.unsplash.com/search/";
const accessKey = "DxNx8ag7qR1sBP2BlE1NYERM8B41pVzrktr-8gB7Iqg";
export const fetchPhotosWithTopic = async (searchQuery, page) => {

    try {
           const response = await axios.get("photos", {
      params: {
        client_id: accessKey,
        query: searchQuery,
        page,
        per_page: 10,
        },
           });
       const modifiedData = response.data.results.map((photo) => {
      return {
        ...photo,
        alt_description: photo.alt_description,
          user: photo.user,
        likes: photo.likes,
      };
    });
        return{ ...response.data,  results: modifiedData};
    } catch (error) {
        console.error( error);
         throw error;
    }
}
