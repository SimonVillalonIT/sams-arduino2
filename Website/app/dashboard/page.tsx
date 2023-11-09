"use client"
import { Card } from "@/components/ui/card";
import api from "@/lib/axios";
import useUserStore from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

type classroom = {

}

const Home = () => {
    const { id } = useUserStore();
    const [state, setState] = useState({})
    const { data, isError, isLoading } = useQuery({
        queryKey: ["classrooms"],
        queryFn: async () => {
            const { data } = await api.get("/device/")
            return data.data
        },
        retry: false
    })

    useEffect(() => {
        setState(data)
    }, [data])

    const socketInitializer = () => {
        socket = io("http://localhost:8080");

        socket.on("connect", () => {
            socket.emit("user", { id: id });
        });
        socket.on("deviceUpdate", (data: {}) => {
            setState(data);
        });
    };

    useEffect(() => socketInitializer(), []);

    if (isLoading) return <p>Loading...</p>

    if (isError) return <h1>No se encontraron dispositivos</h1>

    if (data) return (
        <section className="px-8">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Tus dispositivos
            </h2>
            <div>
                <Card className="w-64 h-80">{JSON.stringify(state)}</Card>
            </div>
        </section>
    );
};

export default Home;
