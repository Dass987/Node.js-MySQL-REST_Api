const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/', (request, response) => {
	
	mysqlConnection.query('SELECT * FROM employees', (error, rows, fields) => {
		
		if (!error) {
			response.json(rows);
		} else {
			console.log(error);
		}

	});

});

router.get('/:id', (request, response) => {
	
	mysqlConnection.query(`SELECT * FROM employees WHERE id = ?`, (request.params.id), (error, rows, fields) => {
		
		if (!error) {
			response.json(rows);
		} else {
			console.log(error);
		}

	});

});

router.post('/', (request, response) => {
	
	const { id, name, salary } = request.body;
	const query = `
		CALL employeeAddOrEdit(?, ?, ?);
	`;

	mysqlConnection.query(query, [id, name, salary], (error, rows, fields) => {
		
		if (!error) {
			response.json({status: 'Employee Saved!'});
		} else {
			console.log(error);
		}

	});

});

router.put('/:id', (request, response) => {
	
	const { id } = request.params;
	const { name, salary } = request.body;

	const query = `CALL employeeAddOrEdit(?, ?, ?)`;

	mysqlConnection.query(query, [id, name, salary], (error, rows, fields) => {

		if (!error) {
			response.json({status: 'Employee Updated!'});
		} else {
			console.log(error);
		}

	});

});

router.delete('/:id', (request, response) => {
	
	const  { id } = request.params;
	
	mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (error, rows, field) => {

		if (!error) {
			response.json({status: 'Employee Deleted!'});
		} else {
			console.log(error);
		}

	});

});

module.exports = router;