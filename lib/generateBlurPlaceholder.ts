export default async function getBase64ImageUrl(
  image: string
): Promise<string> {

  let url = "";
  const response = await fetch(
    `https://wsrv.nl/?url=${process.env.NEXT_PUBLIC_CDN_URL}/${image}&w=8&h=8&output=jpg&q=70`,
  );
  const buffer = await response.arrayBuffer();

  url = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;

  return url;
}
