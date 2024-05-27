import cn from "clsx";
import Image from "next/image";

export function Screenshot({ src, alt, full, width }) {
    return (
        <div
            className={cn(
                "-mb-4 mt-6 flex justify-center overflow-hidden rounded-xl border dark:border-zinc-800"
                // full ? 'bg-white' : 'bg-zinc-100'
            )}
        >
            <Image
                src={src}
                alt={alt}
                className={cn(
                    "select-none bg-white",
                    width ? "" : "w-auto",
                    full ? "" : "ring-1 ring-gray-200"
                )}
                width={width}
            />
        </div>
    );
}
