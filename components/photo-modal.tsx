"use client";

import { Dialog } from "@headlessui/react";
import React, { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import SharedModal from "./SharedModal";
import getPictures from "@/lib/photo";

export default function PhotoModal({ images }: { images: Awaited<ReturnType<typeof getPictures>> }) {

    const searchParams = useSearchParams();
    const photoId = searchParams.get("photoId");
    const overlayRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const index = Number(photoId);


    const [direction, setDirection] = useState(0);
    const [curIndex, setCurIndex] = useState(index);

    function handleClose() {
        router.push("/");
    }


    function changePhotoId(newVal: number) {
        if (newVal > index) {
            setDirection(1);
        } else {
            setDirection(-1);
        }
        setCurIndex(newVal);
        router.push(`/?photoId=${newVal}`);
    }


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                if (index + 1 < images.length) {
                    changePhotoId(index + 1);
                }
            } else if (event.key === "ArrowLeft") {
                if (index > 0) {
                    changePhotoId(index - 1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [index, images.length, changePhotoId]);


    return (
        <Dialog
            static
            open={true}
            onClose={handleClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <motion.div
                ref={overlayRef}
                key="backdrop"
                className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            <SharedModal
                index={curIndex}
                direction={direction}
                images={images}
                changePhotoId={changePhotoId}
                closeModal={handleClose}
                navigation={true}
            />
        </Dialog>
    )
}