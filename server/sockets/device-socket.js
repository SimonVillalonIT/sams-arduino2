import { usersSockets } from "./index.js"

export const sendUpdate = async (deviceUsers, data) => {
    for (const deviceUser of deviceUsers) {
    const userId = deviceUser.dataValues.userId;
    let userSocket = usersSockets.get(userId)
    if (userSocket) {
      try {
        await userSocket.emit('deviceUpdate', data);
      } catch (error) {
        console.error(`Error sending update to user ${userId}: ${error}`);
      }
    }
  }
}

