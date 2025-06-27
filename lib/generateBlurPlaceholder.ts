export default async function getBase64ImageUrl(
  image: string
): Promise<string> {

  let url = "";
  const response = await fetch(
    `https://wsrv.nl/?url=${process.env.NEXT_PUBLIC_CDN_URL}${image}&q=70&blur=100`,
  );
  const buffer = await response.arrayBuffer();

  url = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;

  return url;
}
