import { post } from "@/utils/xhr";

export const chatBotService = async (message) => {
    try {
        const response = await post({
            url: '/chat',
            data: {
                message
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error", error);
    }
}
