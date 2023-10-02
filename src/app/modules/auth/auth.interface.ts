export interface IAuth {
    id: number;
    nombre: string;
    apellidos: string;
    rut: string;
    correo: string;
    contrasena: string;
    tipo: string;
}

export interface IAuthConductor {
    id: number;
    tipoVehiculo: string;
    patente: string;
    modelo: string;
    marca: string;
    color: string;
    anio: number;
    capacidad: number;
    tipo: string;

}

