import AppCard from "../components/AppCard.tsx";

export default function Home() {
  const appsInfo = [
    {
      name: "scrapbox-stream-notify ",
      description: `Scrapboxプロジェクトの更新をDiscordに通知する`,
      link: "/scrapbox-stream-notify",
    },
    {
      name: "nhk-connect",
      description: `NHKの番組情報を通知する`,
      link: "/nhk-connect",
    },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-start">
      {appsInfo.map(({ name, description, link }) => {
        return <AppCard name={name} description={description} link={link} />;
      })}
    </div>
  );
}
