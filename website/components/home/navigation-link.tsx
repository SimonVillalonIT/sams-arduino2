import { cn } from "@/lib/utils"
import NextLink from "next/link"

export default function Link({ text, href, contrast }: { text: string, href: string, contrast?: boolean }) {
    return (<NextLink href={href} className={cn("px-4 duration-200 py-3 rounded-xl text-sm hover:bg-slate-700/20", contrast && "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary ml-2")  } >
        {text}
    </NextLink>)

}
