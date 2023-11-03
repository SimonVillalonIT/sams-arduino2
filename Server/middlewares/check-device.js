export const deviceHeartbeats = new Map(); // Map to track last heartbeats

export default function checkDevice(req, res, next) {
    if (req.body.id) {
        const deviceId = req.body.id
        deviceHeartbeats.set(deviceId, Date.now()); // Update last heartbeat timestamp
    }
    next();
};

