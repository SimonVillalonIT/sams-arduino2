import {DataTypes} from "sequelize";

import {db} from "../database/connectdb";

const Settings = db.define("user", {
  // Model attributes are defined here
  id : {
    type : DataTypes.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true,
  },
  "max-warning" : {
    type : DataTypes.INTEGER,
    allowNull : false,
    defaultValue : 30,
  },
  "max-acepted" :
      {type : DataTypes.INTEGER, allowNull : false, defaultValue : 20}
});

export default Settings
