import { Evento } from "./evento";
import { RedeSocial } from "./rede-social";
import { UserUpdate } from "./user-update";

export interface Palestrante {
  id: number;
  user: UserUpdate;
  miniCurriculo: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
