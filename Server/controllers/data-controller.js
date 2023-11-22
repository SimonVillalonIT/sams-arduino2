import { db } from "../database/connectdb.js";
class DataController {
    constructor() {}

    async getDashboard(req, res) {
        const userId = req.uid;
        const query = `
    SELECT
        d.name as noisyClassroom,
        MAX(h.sensor1 + h.sensor2 + h.sensor3 + h.sensor4 + h.sensor5 + h.sensor6) / 6 as 'soundLevel',
        subquery.devices,
        COUNT(DISTINCT CASE WHEN d.active = true THEN ud.device_id END) AS 'activeDevices'
    FROM
        historic h
    JOIN
        \`user-device\` ud ON ud.device_id = h.device_id AND ud.user_id = ?
    JOIN
        device d ON d.id = ud.device_id
    JOIN
        (
            SELECT COUNT(device_id) as devices
            FROM \`user-device\`
            WHERE user_id = ?
        ) as subquery
    WHERE
        (d.active = true OR d.active = false)
    GROUP BY
        d.active;
`;
        const [results] = await db.query(query, {
            replacements: [userId, userId],
        });
        res.json({
            data: results[0],
            error: null,
        });
    }

    async getGraph(req, res) {
        const userId = req.uid;
        const query = `
    SELECT
        h.updated_at,
        (h.sensor1 + h.sensor2 + h.sensor3 + h.sensor4 + h.sensor5 + h.sensor6) / 6 as 'soundLevel'
    FROM
        historic h
    WHERE
        h.device_id = (
            SELECT
                h2.device_id
            FROM
                historic h2
            JOIN
                \`user-device\` ud ON ud.device_id = h2.device_id
            WHERE
                ud.user_id = ?
            GROUP BY
                h2.device_id
            ORDER BY
                MAX(h2.sensor1 + h2.sensor2 + h2.sensor3 + h2.sensor4 + h2.sensor5 + h2.sensor6) / 6 DESC
            LIMIT 1
        )
    ORDER BY
        h.updated_at;
  `;
        const [results] = await db.query(query, {
            replacements: [userId],
        });

        res.json({
            data: results,
            error: null,
        });
    }

    async getDeviceGraph(req, res) {
        const { id } = req.params;
        const query =
            "SELECT sensor1, sensor2, sensor3, sensor4,sensor5,sensor6,updated_at FROM historic h WHERE h.device_id = ?";
        const [results] = await db.query(query, {
            replacements: [id],
        });

        res.json({
            data: results,
            error: null,
        });
    }
}
export default new DataController();