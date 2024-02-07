const { Client } = require('pg');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS quotation
    (
        id SERIAL PRIMARY KEY,
        purchase_value NUMERIC,
        sale_value NUMERIC,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

/**
 * Inicializa la conexión a la base de datos y crea la tabla de cotizaciones si no existe.
 * @async
 * @param {Object} dbCredentials - Credenciales de conexión a la base de datos.
 * @param {number} dbCredentials.host - Host de la base de datos.
 * @param {string} dbCredentials.user - Usuario de la base de datos.
 * @param {string} dbCredentials.password - Contraseña de la base de datos.
 * @param {string} dbCredentials.database - Nombre de la base de datos.
 * @returns {Promise<Client>} Cliente de la base de datos.
 * @throws {Error} Si hay un error al inicializar la base de datos.
 */

const initializeDatabase = async (dbCredentials) => {
	try {
		const client = new Client(dbCredentials);
		await client.connect();
		await client.query(createTableQuery);
		console.info('Database initialized.');
		return client;
	} catch (error) {
		console.info('Error initializing database:', error.message);
		throw error;
	}
};

/**
 * Inserta una cotización en la base de datos.
 * @async
 * @param {Object} dbCredentials - Credenciales de conexión a la base de datos.
 * @param {number} dbCredentials.host - Host de la base de datos.
 * @param {string} dbCredentials.user - Usuario de la base de datos.
 * @param {string} dbCredentials.password - Contraseña de la base de datos.
 * @param {string} dbCredentials.database - Nombre de la base de datos.
 * @param {number} purchaseValue - Valor de compra de la cotización.
 * @param {number} saleValue - Valor de venta de la cotización.
 * @throws {Error} Si hay un error al insertar la cotización en la base de datos.
 */

const insertQuotation = async (dbCredentials, purchaseValue, saleValue) => {
	try {
		let dbClient = await initializeDatabase(dbCredentials);
		if (!dbClient || !dbClient._connected)  {
            throw new Error('Database connection is not initialized. Call initializeDatabase first.');
        }
		const query ='INSERT INTO quotation (purchase_value, sale_value) VALUES ($1, $2)';
		await dbClient.query(query, [purchaseValue, saleValue]);
		console.info(`Stored Quote: BUY: ${purchaseValue} and SALE: ${saleValue}`);
	} catch (error) {
		console.error('Error inserting quotation:', error.message);
		throw error;
	}
};

module.exports = {
	initializeDatabase,
	insertQuotation,
};
