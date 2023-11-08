import { usersSockets } from "./index.js";

export const sendUpdate = (deviceUsers, data) => {
    for (const deviceUser of deviceUsers) {
        const userId = deviceUser.dataValues.userId;
        let userSocket = usersSockets.get(userId);
        if (userSocket) {
            userSocket.emit("deviceUpdate", data);
            console.log({ message: "deviceUpdate", data });
        }
    }
};