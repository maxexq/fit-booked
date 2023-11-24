import { Contants } from "@/constant";

export const getAllEquiment = async () => {
  const response = await fetch(Contants.API_URL + `/equipment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return res.json();
  });

  return response;
};
