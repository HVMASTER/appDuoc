export interface Solicitud{  
    origen: string;
    destino: string;
    estado: string;
    id_user: number;
    
}

export interface ObtenerSolicitud {
    id_solicitud: number;
    origen: string;
    destino: string;
    asientos: number;
}
