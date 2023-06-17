import { atom } from "recoil";

export const markersAtom = atom({
  key: "markers",
  default: [],
});

export const currentMarkerAtom = atom({
  key: "marker",
  default: null,
});

export const newMarkerAtom = atom({
  key: "new-marker",
  default: {
    isAdding: false,
    isAdded: false,
  },
});
