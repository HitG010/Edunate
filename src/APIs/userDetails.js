import axios from "axios";

export const getUserDetails = async () => {
    try {
        const response = await axios.get("http://localhost:5000/fetchUser", {
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (err) {
        console.error(err);
        return null; // Return null in case of error
    }
};