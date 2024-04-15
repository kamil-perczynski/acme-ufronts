import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

const ufronts: Record<string, string> = {
  "acme-product-catalog": "http://localhost:4101",
  "acme-clients": "http://localhost:4201",
};

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const ufrontBaseUrl = ufronts[params.path[0]];
  if (!ufrontBaseUrl) {
    return notFound();
  }

  const { pathname, search } = new URL(request.url);
  
  console.log("(${}) Proxying to: " + ufrontBaseUrl, pathname, search);
  const proxiedUrl = new URL(pathname + search, ufrontBaseUrl);

  const response = await fetch(proxiedUrl, { cache: "no-cache" });

  const headers = toResponseHeaders(response);

  const responseBody = await response.blob();

  return new Response(responseBody, {
    status: response.status,
    headers: headers,
  });
}
function toResponseHeaders(response: Response) {
  const headers = new Headers();

  Array.from(response.headers.entries())
    .filter(([key]) => key.toLowerCase() != "content-encoding")
    .forEach(([k, v]) => headers.append(k, v));

  return headers;
}
