const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const filesDownloaded=sequelize.define('FilesDownloaded',{
    fileUrl:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

module.exports=filesDownloaded;