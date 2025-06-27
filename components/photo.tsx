"use client";

import Link from "next/link";

export default function Photo({
    id,
    photoUrl,
    team
}: { id: string, photoUrl: string, team: string }) {
    return (
        <Link
            key={id}
            href={`/?photoId=${id}`}
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
            <img
                key={id}
                alt={`Team ${team}'s photo`}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                style={{ transform: "translate3d(0, 0, 0)" }}
                src={`https://wsrv.nl/?url=${process.env.NEXT_PUBLIC_CDN_URL}/${photoUrl}&q=100`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
            />
        </Link>
    )
}