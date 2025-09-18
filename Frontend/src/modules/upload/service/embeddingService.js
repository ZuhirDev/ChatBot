import { post } from "@/utils/xhr";

export const embeddingService = async (files) => {
    try {
        const formData = new FormData();
        files.forEach(f => formData.append('files', f.file));

        const response = await post({
            url: '/chat/upload',
            data: formData,         
            headers: {
                'Content-Type': 'multipart/form-data'
            }   
        });

        return response.data;
    } catch (error) {
        console.log("Error", error);
    }
}
