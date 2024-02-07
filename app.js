const quotationsController = require('./controllers/quotationsController');
require('dotenv').config();

const timeExecution = parseInt(process.env.TIME_EXECUTION);
const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
};

/**
 * Función principal para iniciar la aplicación de obtención y almacenamiento de cotizaciones de dólar.
 * La aplicación obtiene la cotización de dólar de un proveedor externo, la imprime en la consola y la almacena en una base de datos a intervalos regulares.
 * @async
 */

(async () => {
	try {
		const resp = await quotationsController.getQuote();
		console.log(`The current quote is: BUY: $${resp.purchaseValue} and SALE: $${resp.saleValue}`);
		quotationsController.storeQuote(dbCredentials, resp);
		setInterval(async () => {
			const resp = await quotationsController.getQuote();
			console.log(`The current quote is: BUY: $${resp.purchaseValue} and SALE: $${resp.saleValue}`);
			quotationsController.storeQuote(dbCredentials, resp);
		}, timeExecution);
	} catch (error) {
		console.error('App initialization error:', error.message);
	}
})();
