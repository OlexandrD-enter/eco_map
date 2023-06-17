import { atom } from "recoil";

export const markersAtom = atom({
    key: "markers",
    default: []
  })

  export const currentMarkerAtom = atom({
    key: "marker",
    default: null
  })

  