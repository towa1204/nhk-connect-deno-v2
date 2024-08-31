import { Handlers } from "$fresh/server.ts";
import Select from "../components/Select.tsx";
import Input from "../islands/Input.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

export default function SettingsPage() {
  const areaNumber = "010";

  const areaMaster = [
    { value: "010", label: "札幌" },
    { value: "011", label: "函館" },
    { value: "012", label: "旭川" },
  ];

  const initalAPIKey = "Sample Key";

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
        <header className="mb-4 flex justify-between gap-3">
          <hgroup>
            <h2 className="text-lg font-medium !leading-none text-black">
              Program
            </h2>
            <h3 className="mt-1 !leading-tight text-gray-500">
              Set programs to be notified
            </h3>
          </hgroup>
        </header>
      </div>

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
        <form>
          <Select selected={areaNumber} options={areaMaster} />
          <Input
            placeholder="NHK API Key"
            isSecret={true}
            value={initalAPIKey}
          />
        </form>
      </div>

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
      </div>
    </div>
  );
}
