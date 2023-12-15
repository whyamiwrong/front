import { atom } from "recoil";

export const adImgs = atom({
    key: "adImgs",
    default: [
      "public/logo_512x512.png",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
 
    ],
  });