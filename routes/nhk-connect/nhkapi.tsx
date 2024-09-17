import { Handlers, PageProps } from "$fresh/server.ts";
import SaveButton from "../../components/SaveButton.tsx";
import Select from "../../components/Select.tsx";
import Input from "../../islands/Input.tsx";
import { areaMaster } from "../../domain/nhk-connect/master.ts";
import { NHKAPI } from "../../domain/nhk-connect/type.ts";
import {
  getErrorMessageOnCookie,
  setErrorMessageOnCookie,
} from "../../util.ts";
import {
  reqGetNHKAPI,
  reqPostNHKAPI,
} from "../../domain/nhk-connect/client.ts";
import { ValidationError } from "../../domain/nhk-connect/exception.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { message, resHeaders } = getErrorMessageOnCookie(req.headers);

    const nhkapiProps = await reqGetNHKAPI();

    const initialData: NHKAPI & { errorMessage?: string } = {
      ...nhkapiProps,
      errorMessage: message,
    };
    return ctx.render(initialData, { headers: resHeaders });
  },

  async POST(req, ctx) {
    /** バリデーションはAPI側でやる */
    const form = await req.formData();
    const areaNumber = form.get("areaNumber") as string;
    const apiKey = form.get("apiKey") as string;

    const resHeaders = new Headers({
      "Location": ctx.url.pathname,
    });

    try {
      await reqPostNHKAPI({
        area: areaNumber,
        services: ["g1", "e1"],
        nhkAPIKey: apiKey,
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        setErrorMessageOnCookie(resHeaders, e.message);
      } else {
        throw new Error("予期せぬエラー", { cause: e });
      }
    }

    return new Response(null, {
      status: 303,
      headers: resHeaders,
    });
  },
};

export default function NHKAPIPage(
  { data }: PageProps<NHKAPI & { errorMessage?: string }>,
) {
  const { area, nhkAPIKey, errorMessage } = data;
  return (
    <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
      <header className="mb-4 flex justify-between gap-3">
        <hgroup>
          <h2 className="text-lg font-medium !leading-none text-black">
            NHK API
          </h2>
          <h3 className="mt-1 !leading-tight text-gray-500">
            Set broadcast area and API key
          </h3>
        </hgroup>
      </header>

      {errorMessage != undefined && (
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Validation Error!</span> {errorMessage}
        </div>
      )}

      <form method="post">
        <Select
          name="areaNumber"
          selected={area}
          options={areaMaster}
        />
        <Input
          name="apiKey"
          placeholder="NHK API Key"
          isSecret={true}
          value={nhkAPIKey}
        />
        <div className="mt-3">
          <SaveButton isDisabled={false} />
        </div>
      </form>
    </div>
  );
}
