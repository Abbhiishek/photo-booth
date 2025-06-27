import Carousel from "@/components/Carousel";
import getBase64ImageUrl from "@/lib/generateBlurPlaceholder";
import getPictures, { Picture } from "@/lib/photo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ Id: string }>
}


async function getPhoto(photoId: number): Promise<Picture> {
  const pictures = await getPictures();
  const picture = pictures.find((picture) => picture.index === photoId);
  if (!picture) {
    throw new Error("Photo not found");
  }
  return picture;
}


export default async function PhotoPage({ params }: Props) {
    const param = await params;

    const index = Number(param.Id);

    const currentPhoto = await getPhoto(index)

    if (!currentPhoto) {
        return notFound();
    }

    const blurDataUrl = await getBase64ImageUrl(currentPhoto.photoUrl);
    return (
        <main className="mx-auto max-w-[1960px] p-10">
            <Carousel
                currentPhoto={currentPhoto}
                index={index}
                blurDataUrl={blurDataUrl}
            />
        </main>
    )
}

