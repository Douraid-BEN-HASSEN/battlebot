import { TYPE_INFOS_REQUEST } from "./Types";

export const KEY_TO_ACTION = {
  z: "Ordre : Avance",
  q: "Ordre : Tourne à gauche",
  s: "Ordre : Recule ",
  d: "Ordre : Tourne à droite",
  o: "Ordre : Action 1",
  p: "Ordre : Action 2",
  a: "Ordre : S'arrêter",
} as any;

export const DEFAULT_INFOS_REQUEST = {
  address : '127.0.0.1' , 
  port : 80
} as TYPE_INFOS_REQUEST