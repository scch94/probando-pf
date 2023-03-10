const { DataTypes }=require("sequelize"); 

module.exports= sequelize=>{
    sequelize.define('Usuario',{
        nombre:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        password:{
            type:DataTypes.STRING,
            allownull:false 
        },
        rol:{
            type:DataTypes.ENUM('user','admin'),
            allownull:false,
            defaultValue:"user"
        },
        estado:{
            type:DataTypes.ENUM('activo','desactivado'),
            allownull:false,
            defaultValue:'activo'
        },
        direccion:{
            type:DataTypes.STRING,
        },
        pais:{
            type:DataTypes.STRING,
        },
        ciudad:{
            type:DataTypes.STRING
        },
        img:{
            type:DataTypes.STRING,
            defaultValue:"https://thumbs.dreamstime.com/z/icono-del-usuario-en-estilo-plano-de-moda-aislado-fondo-gris-s%C3%ADmbolo-123663211.jpg"
        }
    })
}

