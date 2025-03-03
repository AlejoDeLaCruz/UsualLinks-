import bcrypt from "bcrypt";

//ARCHIVO PARA HASHEAR LAS CONTRASEÑAS Y COMPROBAR SI EL PASSWORD ES VALIDO

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); //SALT genera hashes diferentes para cada password por mas de que las contraseñas sean iguales
};

export const checkPassword = async (enteredPassword: string, hash: string) => {
    return await bcrypt.compare(enteredPassword, hash);
};
