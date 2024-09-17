import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, url }: PageProps) {
  const appName = url.pathname.split("/")[1];

  // const app = {
  //   "scrapbox-stream-notify": {
  //     name: "ssn",
  //     pages: [],
  //   },
  //   "nhk-connect": {
  //     name: "nc",
  //     pages: [
  //       "nhkapi",
  //       "notification",
  //       "program",
  //     ],
  //   },
  // };

  return (
    <>
      <header className="flex w-full items-center justify-start space-x-4 px-4 py-4">
        <div className="text-lg font-bold">
          <a href="/">Kanri</a>
        </div>
        {appName !== ""
          ? (
            <div className="flex space-x-4">
              <a href={`/${appName}`}>{appName}</a>
            </div>
          )
          : null}
      </header>
      <div className="mx-auto w-full px-4 md:max-w-7xl">
        <Component />
      </div>
    </>
  );
}
