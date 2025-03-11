export type User = {
    handle: string,
    name: string,
    email: string
    password: string
}

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
    password: string,
    password_confirmation: string
} //EL PICK AGARRA CAMPOS ESPECIFICOS DE OTRO TYPE DIFERENTE EN ESTE CASO USER