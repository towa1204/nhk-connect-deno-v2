import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <>
      <header className="lt-md:!px-4 flex w-full items-center justify-start space-x-4 px-8 py-4">
        <div className="text-lg font-bold">nhk-connect-deno</div>
        <div className="flex space-x-4">
          <a href="/">Programs</a>
          <a href="/settings">Settings</a>
        </div>
      </header>
      <div className="lt-md:!px-4 mx-auto w-full px-8 md:max-w-7xl">
        <Component />
      </div>
    </>
  );
}
