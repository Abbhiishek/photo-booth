'use server';

import db from "@/db";
import { team } from "@/db/schema/team";
import { category } from "@/db/schema/options";
import { photo } from "@/db/schema/photo";
import { uploadToAzureBlob } from '../../lib/azure-file-uploader';
import { PHOTO_FOLDER } from '../../lib/utils';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import sharp from "sharp";

interface UploadFormData {
  images: File[];
  teamId: number;
  tags: string[];
  categoryId: number;
  caption?: string;
}

export async function uploadPhotos(formData: UploadFormData) {
  try {
    // Get team and category info
    const [uploaderTeam] = await db.select().from(team).where(eq(team.id, formData.teamId));
    const [selectedCategory] = await db.select().from(category).where(eq(category.id, formData.categoryId));

    if (!uploaderTeam) {
      throw new Error('Team not found');
    }

    if (!selectedCategory) {
      throw new Error('Category not found');
    }

    // Upload files to Azure Blob Storage
    const { success, data, error } = await uploadToAzureBlob({
      files: formData.images,
      entityId: uploaderTeam.name.toLowerCase().replace(/\s+/g, '-'),
      container: PHOTO_FOLDER,
    });

    if (!success || !data) {
      throw new Error(error || 'Failed to upload files');
    }

    // Insert photo records into database
    const photoRecords = await Promise.all(data.map(async (asset) => {

      const image = formData.images.find(image => image.name === asset.name);
      if (!image) return;
      const buffer = await image.arrayBuffer();
      const meta = await sharp(buffer).metadata();
      return {
      photoUrl: `/${PHOTO_FOLDER}/${asset.fileUrl}`,
      teamId: formData.teamId,
      tags: formData.tags,
      categoryId: formData.categoryId,
      caption: formData.caption || null,
      status: 'pending' as const,
      isFeatured: false,
      metadata: {
        ...meta,
      },
    }}));

    await db.insert(photo).values(photoRecords.filter((record): record is NonNullable<typeof record> => record !== undefined));

    // Revalidate the upload page to show fresh data
    revalidatePath('/');

    return {
      success: true,
      message: `Successfully uploaded ${data.length} photo(s)`,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
