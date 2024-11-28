// Define la interfaz del jugador
export interface IPlayer {
    id?: string;
    name?: string;
    surname?: string;
    fechaNacimiento?: string;
    nationality?: string;
    position?: string;
    jerseyNumber?: number;
    height?: number;
    seniority?: string;
    imagePath?: string;
    pointsLastGame?: number;
    rebounds?: number;
    totalFouls?: number;
    foulsLastGame?: number;
    gamesPlayed?: number;
    points?: number[];
    videos?: string[];
    interior?: number;
    exterior?: number;
    rightHanded?: number;
    leftHanded?: number;
    coordinated?: number;
    strong?: number;
    hardworking?: number;
    competitive?: number;
    technicalDescription?: string;
    tacticalDescription?: string;
    defensiveDescription?: string;
  }
  