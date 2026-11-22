export type User = { ID: number; Name: string; Token: string };

export type PlaceInput = {
    Name: string;
    Latitude: number;
    Longitude: number;
    UserID: number;
};

export type Place = {
    ID: number;
    Name: string;
    UserID: number;
    Latitude: number;
    Longitude: number;
};