const con = require('../Configs/cone');

module.exports={
	getVueloByCodigo(codigoVuelo){
	     return new Promise((resolve, reject)=>{
		con.query('select * from vuelosavioncito.vuelos  where codigoVuelo = ?', codigoVuelo, (err,rows)=> {
			if(err) reject(err);
			else resolve(rows);
		})
	     })
	}
}
