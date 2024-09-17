export type Programs = {
  programs: { titlle: string }[];
};

export type NHKAPI = {
  area: string;
  services: string[];
  nhkAPIKey: string;
};

export type Notification = {
  selectNow: "LINE";
  LINEAPI: {
    userID: string;
    accessToken: string;
  };
};
