import axios from "axios";

export const getFileContent = async (fileUrl) => {
    try {
        const response = await axios.get(fileUrl);
        return response.data; // محتوای فایل در اینجا بازگردانده می‌شود
    } catch (error) {
        console.error('Error fetching file content:', error);
        //throw error; // ارور ممکن است برای مدیریت خطاها بازگردانده شود
        return false
    }
};