const  mongoose =require('mongoose') ;
let db_port = process.env.DB_PORT,db_host = process.env.DB_HOST, db_name = process.env.DB_NAME;

mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, {useNewUrlParser: true});
var conn = mongoose.connection
conn.on('connected',() =>{
    console.log('Database Connected Successfully ');
})
conn.on('error',(err) =>{
    console.error('DB error : ', err);
})
module.exports ={
    conn
}