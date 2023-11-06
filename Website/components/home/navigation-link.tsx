import NextLink from "next/link"

export default function Link({ text, href }: { text: string, href: string }) {
    return (
        <NextLink href={href} className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60" >
            {text}
        </NextLink>)
}
