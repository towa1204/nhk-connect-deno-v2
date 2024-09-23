import { Handlers, PageProps } from "$fresh/server.ts";
import SaveButton from "../../components/SaveButton.tsx";
import Select from "../../components/Select.tsx";
import {
  reqGetNotification,
  reqPostNotification,
} from "../../domain/nhk-connect/client.ts";
import { ValidationError } from "../../domain/nhk-connect/exception.ts";
import { Notification } from "../../domain/nhk-connect/type.ts";
import Input from "../../islands/Input.tsx";
import {
  getErrorMessageOnCookie,
  setErrorMessageOnCookie,
} from "../../util.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { message, resHeaders } = getErrorMessageOnCookie(req.headers);

    const notification = await reqGetNotification();

    const initialData: Notification & { errorMessage?: string } = {
      ...notification,
      errorMessage: message,
    };

    return ctx.render(initialData, { headers: resHeaders });
  },
  async POST(req, ctx) {
    /** バリデーションはAPI側でやる */
    const form = await req.formData();

    // const selectType = form.get("type") as string;
    const userID = form.get("userid") as string;
    const accessToken = form.get("token") as string;

    const resHeaders = new Headers({
      "Location": ctx.url.pathname,
    });

    try {
      await reqPostNotification({
        selectNow: "LINE",
        LINEAPI: {
          userID,
          accessToken,
        },
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

export default function NotificationPage(
  { data }: PageProps<Notification & { errorMessage?: string }>,
) {
  const { selectNow, LINEAPI, errorMessage } = data;
  return (
    <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
      <header className="mb-4 flex justify-between gap-3">
        <hgroup>
          <h2 className="text-lg font-medium !leading-none text-black">
            Notification
          </h2>
          <h3 className="mt-1 !leading-tight text-gray-500">
            Set notification type and configuration
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
          name="type"
          selected={selectNow}
          options={[{ value: selectNow, label: selectNow }]}
        />

        <div className="mt-5">
          <header className="mb-4 flex justify-between gap-3">
            <hgroup>
              <h3 className="mt-1 font-medium !leading-tight text-black">
                LINE API
              </h3>
            </hgroup>
          </header>

          <Input
            name="userid"
            placeholder="UserID"
            isSecret={false}
            value={LINEAPI.userID}
          />

          <Input
            name="token"
            placeholder="AccessToken"
            isSecret={true}
            value={LINEAPI.accessToken}
          />
        </div>

        <div className="mt-3">
          <SaveButton isDisabled={false} />
        </div>
      </form>
    </div>
  );
}
