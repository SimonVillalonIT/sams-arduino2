import Image from "next/image"

const Feature = ({ alt, src, width, height }: { alt: string, src: string, width?: number, height?: number }) => (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-center items-center rounded-md p-6">
            <Image className="object-contain" alt={alt} src={src} width={width ?? 250} height={height ?? 250} />
        </div>
    </div>

)
export default Feature
