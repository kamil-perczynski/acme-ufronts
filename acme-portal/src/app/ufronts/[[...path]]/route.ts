import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import { AppConfig } from "~/features/AppConfig";
import { toUfrontUrl } from "~/features/ufronts/ufrontUrls";
import { Configuration } from "~/global";

export const dynamic = "force-dynamic";

const appConfig = AppConfig.load<Configuration>();

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const config = await appConfig.get();

  const ufrontName = params.path[0].startsWith("@")
    ? params.path[0] + "/" + params.path[1]
    : params.path[0];
  const ufrontBaseUrl = new URL(toUfrontUrl(ufrontName, config)).origin;

  if (!ufrontBaseUrl) {
    return notFound();
  }

  const { pathname, search } = new URL(request.url);

  console.log(
    `Proxying "${ufrontName}" to: ` + ufrontBaseUrl,
    pathname,
    search
  );
  const proxiedUrl = new URL(pathname + search, ufrontBaseUrl);

  const response = await fetch(proxiedUrl, {
    cache: "force-cache",
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
