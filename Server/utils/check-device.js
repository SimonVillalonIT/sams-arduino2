import { deviceHeartbeats } from "../middlewares/check-device.js";
import Device from "../models/device-model.js";

function checkDeviceDisconnections() {
    const now = Date.now();
    deviceHeartbeats.forEach(async(timestamp, deviceId) => {
        const timeSinceLastHeartbeat = now - timestamp;
        if (timeSinceLastHeartbeat > 3000) {
            await Device.update({ active: false }, { where: { id: deviceId } });
            deviceHeartbeats.delete(deviceId); // Remove the disconnected device
        }
    });
}

setInterval(checkDeviceDisconnections, 5000);