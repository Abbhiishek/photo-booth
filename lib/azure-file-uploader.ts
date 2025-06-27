import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { PHOTO_FOLDER } from './utils';

const AzureStorageConnectionString =
  process.env.AZURE_STORAGE_CONNECTION_STRING ||
  'YOUR_AZURE_STORAGE_CONNECTION_STRING';

export async function uploadToAzureBlob({
  files,
  entityId,
  container = PHOTO_FOLDER,
}: {
  files: File[];
  entityId: string;
  container?: string;
}) {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AzureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient(
      container || PHOTO_FOLDER
    );

    await containerClient.createIfNotExists({ access: 'blob' });

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const blobPath = `${entityId}/${uuidv4()}_${file.name.replace(/\s/g, '-')}`;
        const blobClient = containerClient.getBlockBlobClient(blobPath);

        const buffer = Buffer.from(await file.arrayBuffer());

        await blobClient.uploadData(buffer, {
          blobHTTPHeaders: {
            blobContentType: file.type,
          },
        });

        return {
          name: file.name,
          fileUrl: blobPath,
        };
      })
    );

    return {
      success: true,
      data: uploadResults,
    };
  } catch (error) {
    console.error('Error uploading to Azure Blob:', error);
    return {
      success: false,
      error: 'Failed to upload files to Azure Blob',
    };
  }
}
