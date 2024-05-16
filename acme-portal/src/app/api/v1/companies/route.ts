import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const fakerUrl = "https://fakerapi.it/api/v1/companies";

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);

  const proxiedUrl = new URL(pathname + search, fakerUrl);
  console.log(`Proxying to: ` + proxiedUrl, pathname, search);

  const response = await fetch(proxiedUrl, {
    headers: request.headers,
  });

  const headers = toResponseHeaders(response);
  const responseBody =
    response.status !== 304 && response.status !== 204
      ? await response.blob()
      : null;

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
