/* eslint-disable no-unused-vars */
import { Picture } from "./photo";
export interface ImageProps {
  id: string;
  photoUrl: string;
  status: "pending" | "approved" | "rejected";
  teamId: number | null;
  tags: string[] | null;
  categoryId: number | null;
  caption: string | null;
  isFeatured: boolean | null;
  metadata: {
    width: number;
    height: number;
  };
}

export interface SharedModalProps {
  index: number;
  images?: Picture[];
  currentPhoto?: Picture;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
