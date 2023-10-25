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
    
}
