export interface Conductor{
    conductorID: number,
    telefono: string,
    alumno: {
        alumnoID: number,
        nombre: string,
        apellidos: string,
    }, 
    vehiculo: {
        patente: string,
        tipo_vehiculo: string,
        marca: string,
        modelo: string,
        color: string,
        anno_fabricacion: number,
        num_asientos: number,
    }     
}