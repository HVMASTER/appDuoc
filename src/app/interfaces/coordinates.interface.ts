export interface Coordinates {
    map(arg0: (coordenada: any) => void): unknown;
    id_solicitud: number;
    id_user: number;
    origen_lat: number;
    origen_lng: number;
    dest_lat: number;
    dest_lng: number;
}