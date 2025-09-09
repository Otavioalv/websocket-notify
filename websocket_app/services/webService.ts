import webApi from "./webApi";


export const createUser = async () => {
    try {
        const endPoint: string = "/create-user";

        await webApi.post(endPoint, {});

        return;
    } catch(err) {
        console.log(err);
        return;
    }
}