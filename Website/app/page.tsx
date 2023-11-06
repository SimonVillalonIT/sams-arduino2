import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Feature from "@/components/home/feature"

export default function page() {

    return (
        <>
            <section
                className="relative min-h-screen flex flex-col justify-center items-center"
                style={{
                    backgroundAttachment: "fixed",
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(hero-image.jpg)",
                    backgroundSize: "contain",
                }}
            >
                <div className="opacity-60"></div>
                <div className="text-center text-neutral-content">
                    <div className="max-w-md"> <h1 className="mb-5 text-5xl font-extrabold">SAMS</h1>
                        <p className="bold mb-5">Tu solucion a las aulas con ruidos molestos</p>
                        <Button variant="secondary" asChild>
                            <Link href="/auth">Empieza ya</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Características
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Esta moderna aplicación cuenta con nuevas características que mejoraran su experiencia como guardado de datos, monitoreo en tiempo real, etc.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <Feature alt="caracteristica historico" src="/historic.svg" />
                    <Feature alt="caracteristica autenticacion" src="/auth.svg" />
                    <Feature alt="caracteristica analisis" src="/analitics.svg" />
                    <Feature alt="caracteristica compartir" src="/team.svg" />
                    <Feature height={50} width={150} alt="caracteristica tiempo real" src="/realtime.svg" />
                    <Feature width={200} alt="caracteristica diseño" src="/design.svg" />
                </div>
            </section >
        </>)
}
