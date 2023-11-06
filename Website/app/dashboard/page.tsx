"use client";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

const Home = () => {
    const [state, setState] = useState({});
    const { id } = useUserStore();
    useEffect(() => socketInitializer(), []);

    const socketInitializer = () => {
        socket = io("http://localhost:8080");

        socket.on("connect", () => {
            console.log("connected");
            socket.emit("user", { id: id });
        });
        socket.on("deviceUpdate", (data: {}) => {
            setState(data);
        });
    };

    return <div>{JSON.stringify(state)}</div>;
};

export default Home;
