export interface Users {
  alumnoID: number;
  nombre: string;
  apellidos: string;
  rut: string;
  correo: string;
  contrasena: string;
  tipo: string;
  direccion: {
    calle: string;
    comuna: string;
    ciudad: string;
    codigo_postal: string;
  }
}