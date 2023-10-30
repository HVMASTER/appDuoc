export interface Solicitud{  
    id_solicitud: number;
    origen: string;
    destino: string;
    estado: string;
    id_user: number;
    asientos: number;
    
}

export interface GuardarSolicitud{  
    origen: string;
    destino: string;
    estado: string;
    id_user: number;
    id_vehiculo: number;
    
}

export interface ObtenerSolicitud {
    id_solicitud: number;
    id_user: number;
    origen: string;
    destino: string;
    asientos: number;
    id_vehiculo: any;
}

export interface ObtenerId{
    id_user: number;
    id_solicitud: number;
    id_vehiculo: number;
}
