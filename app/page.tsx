import Photo from "@/components/photo";
import PhotoModal from "@/components/photo-modal";
import { buttonVariants } from "@/components/ui/button";
import getPictures from "@/lib/photo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: Promise<{ photoId: string }> }) {
  const pictures = await getPictures();
  const { photoId } = await searchParams;
  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <PhotoModal
          images={pictures}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[529px] flex-col items-center justify-end gap-4 overflow-hidden rounded-xl bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center">
              <Image
                layout="fill"
                src="https://static.wikia.nocookie.net/gravityfalls/images/e/ea/S1e19_bill_snap.png/revision/latest/smart/width/250/height/250?cb=20130905173319" alt="hexafalls background" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <Image src="https://www.hexafalls.tech/assets/hexafalls-DVbWU-kb.png" alt="Logo" width={200} height={200} />
          <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
            HexaFalls Hackathon &apos;25
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            Capture and share the magic of 32 hours of innovation, creativity, and unforgettable moments from HexaFalls Hackathon &apos;25.
          </p>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "mt-6 cursor-pointer z-10")}
            href="/upload"
            rel="noreferrer"
          >
            Upload your photos
          </Link>
        </div>
        {pictures.map(({ photoUrl, index, team }) => (
          <Photo
            key={index}
            id={index.toString()}
            photoUrl={photoUrl}
            team={team}
          />
        ))}
      </div>
    </main>
  );
}
