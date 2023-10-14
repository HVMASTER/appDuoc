export interface Solicitud{
    idSolicitud: number,
    estado: string,
    origen: string,
    destino: string,
    alumno: [{
        alumnoID: number,
        nombre: string,
        apellidos: string
    },
    {
        alumnoID: number,
        nombre: string,
        apellidos: string
    },
    {
        alumnoID: number,
        nombre: string,
        apellidos: string
    },
    {
        alumnoID: number,
        nombre: string,
        apellidos: string
    },],
    conductor: {
        conductorID: number,
        nombre: string,
        apellidos: string,
    },
    vehiculo: {
        patente: string,
        tipo_vehiculo: string,
        cantidad_asientos: string,
    },
    asiento_disponible: [{
        numero: number,
        disponible: true
    },
    {
        numero: number,
        disponible: true
    },
    {
        numero: number,
        disponible: true
    },
    {
        numero: number,
        disponible: true
    }]
}
