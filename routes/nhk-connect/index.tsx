import AppCard from "../../components/AppCard.tsx";

export default function NCHome() {
  const appName = "nhk-connect";
  const appsInfo = [
    {
      name: "Program",
      description: `通知する番組を設定`,
      link: `${appName}/program`,
    },
    {
      name: "NHK API",
      description: `NHK APIキーを設定`,
      link: `${appName}/nhkapi`,
    },
    {
      name: "Notification",
      description: `通知タイプを設定`,
      link: `${appName}/notification`,
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
