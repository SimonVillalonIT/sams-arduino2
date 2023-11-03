import { usersSockets } from "./index.js";

export const sendUpdate = (deviceUsers, data) => {
    for (const deviceUser of deviceUsers) {
        const userId = deviceUser.dataValues.userId;
        let userSocket = usersSockets.get(userId);
        if (userSocket) {
            console.log("sending message");
            userSocket.emit("deviceUpdate", data);
        }
    }
};