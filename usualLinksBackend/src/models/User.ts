import mongoose, {Schema} from 'mongoose';

interface InterfaceUser {
    handle: string;
    name: string;
    email: string;
    password: string;
}

//DEFINIMOS EL SCHEMA:

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,  //name no puede ser vacio
        trim: true       //que se eliminen los espacios en blanco al final y al principio
    },
    email: {
        type: String,
        required: true,
        trim: true,     //que se eliminen los espacios en blanco al final y al principio
        unique: true,    //que sean unicos los emails
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
});

//CREACION DEL MODELO CON EL ORM:

const User = mongoose.model<InterfaceUser>('User', userSchema);    

export default User;