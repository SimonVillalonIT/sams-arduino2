import { DataTypes, UUIDV4 } from 'sequelize'
import { db } from '../database/connectdb.js';
import bcrypt from "bcryptjs"

const User = db.define("user", {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
    type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


//Hashear la contraseña antes de subirla a la base de datos
User.beforeCreate(async (user) => {
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        console.log("Error en el hasheo: ", error)
    }
});

//Validar si la contraseña es correcta
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export default User

