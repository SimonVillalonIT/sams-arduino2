import { deviceHeartbeats } from "../middlewares/check-device.js";
import Device from "../models/device-model.js";
import { sendDisconneted } from "../sockets/device-socket.js";
import UserDeviceModel from "../models/user-device-model.js";

function checkDeviceDisconnections() {
    const now = Date.now();
    deviceHeartbeats.forEach(async (timestamp, deviceId) => {
        const timeSinceLastHeartbeat = now - timestamp;
        if (timeSinceLastHeartbeat > 3000) {
            const deviceUsers = await UserDeviceModel.findAll({
                where: {
                    device_id: deviceId,
                },
                attributes: {
                    exclude: ["id"],
                },
            });
            await Device.update({ active: false }, { where: { id: deviceId } });
            sendDisconneted(deviceUsers, deviceId)
            deviceHeartbeats.delete(deviceId); // Remove the disconnected device
        }
    });
}

setInterval(checkDeviceDisconnections, 5000);
