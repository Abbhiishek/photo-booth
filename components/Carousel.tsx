"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SharedModal from "./SharedModal";
import { useEffect } from "react";
import { Picture } from "@/lib/photo";

export default function Carousel({
  index,
  currentPhoto,
  blurDataUrl
}: {
  index: number;
  currentPhoto: Picture;
  blurDataUrl: string;
}) {
  const router = useRouter();

  function closeModal() {
    router.push("/");
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <Image
          src={blurDataUrl}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
}
