import { ValidationError } from "./exception.ts";
import { NHKAPI } from "./type.ts";

const baseUri = Deno.env.get("NHK_CONNECT_API_BASE_URI");
const token = Deno.env.get("NHK_CONNECT_API_TOKEN");

type NHKConnectAPIError = {
  code: string;
  message: string;
};

export async function reqGetNHKAPI(): Promise<NHKAPI> {
  const res = await fetch(
    `${baseUri}/config/nhkapi`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const error: NHKConnectAPIError = await res.json();
    throw new Error(`${error.message}`);
  }

  return await res.json() as NHKAPI;
}

export async function reqPostNHKAPI(reqBody: NHKAPI) {
  const res = await fetch(
    `${baseUri}/config/nhkapi`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    },
  );

  if (res.status === 400) {
    const error: NHKConnectAPIError = await res.json();
    throw new ValidationError({ message: `${error.message}` });
  }

  if (!res.ok) {
    const error: NHKConnectAPIError = await res.json();
    throw new Error(`${error.message}`);
  }
}
