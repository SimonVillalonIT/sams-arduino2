import { Server } from "socket.io";

export let io;
export const usersSockets = new Map();

export default function sockets(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });
    io.on("connection", (socket) => {
        socket.on("user", ({ id }) => {
            usersSockets.set(id, socket);
            console.log(id);
        });
        socket.on("ping", () => {
            console.log("Received a ping");
        });
        socket.on("disconnect", () => {
            for (const [key, value] of usersSockets) {
                if (value === socket) {
                    usersSockets.delete(key);
                }
            }
        });
    });
}