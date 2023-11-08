"use client";
import { Card } from "@/components/ui/card";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

const Home = () => {
  const [state, setState] = useState({});
  const { id } = useUserStore();

  const socketInitializer = () => {
    socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("user", { id: id });
    });
    socket.on("deviceUpdate", (data: {}) => {
      console.log(data);
      setState(data);
    });
  };

  useEffect(() => socketInitializer(), []);
  return (
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
