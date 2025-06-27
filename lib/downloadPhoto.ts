export function forceDownload(blobUrl: string, filename: string) {
  const a: HTMLAnchorElement = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function downloadPhoto(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'photo.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
