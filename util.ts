import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";

export function getErrorMessageOnCookie(
  headers: Headers,
): { message: string | undefined; resHeaders: Headers } {
  const cookies = getCookies(headers);
  const errorMessage = cookies["formError"] != undefined
    ? decodeURIComponent(cookies["formError"])
    : undefined;

  const resHeaders = new Headers();
  deleteCookie(resHeaders, "formError", { path: "/" });

  return { message: errorMessage, resHeaders: resHeaders };
}

export function setErrorMessageOnCookie(
  headers: Headers,
  message: string,
): Headers {
  setCookie(headers, {
    name: "formError",
    value: encodeURIComponent(message),
    path: "/",
  });
  return headers;
}
