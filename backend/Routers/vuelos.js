const vuelos = require('../Models/vuelos');
const express = require('express');
const router = express.Router();
const logger = require('../Configs/Logger');

router.get('/vuelos/:codigo_vuelo', (req,res) => {
	logger.info('Se realiza consulta de vuelo con el codigo ' + req.params.codigo_vuelo);
	vuelos.getVueloByCodigo(req.params.codigo_vuelo)
		.then(vuelos=>{
			res.status(200).send(vuelos);
		})
		.catch(err=>{
			logger.error(err);
			res.status(500).send({
				mesage: 'Error al obtener el vuelo'
			});
		});
});

module.exports = router;
