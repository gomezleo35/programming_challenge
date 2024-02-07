const axios = require('axios');
const quotationsModel = require('../models/quotationsModel');
require('dotenv').config();

const urlProveedor =  process.env.EXTERNAL_API_URL;

/**
 * Obtiene las cotizaciones del dólar desde un proveedor externo.
 * @async
 * @returns {Promise<{purchaseValue: number, saleValue: number}>} Un objeto con los valores de compra y venta del dólar.
 * @throws {Error} Si hay un error al obtener las cotizaciones del proveedor.
 */

const getQuote = async () => {
    try {
        const response = await axios.get(urlProveedor);
        const purchaseValue = response && response.data ? response.data.buy : null;
        const saleValue = response && response.data ? response.data.sell : null;

        if (!purchaseValue || !saleValue) {
            throw Error('Invalid data received from the provider.');
        }

        return { purchaseValue, saleValue };
    } catch (error) {
        let message = 'Error getting and storing quote.';

        if (error.response && error.response.status === 404) {
            message = 'Resource not available: The requested endpoint does not exist on the server.';
        } else if (error.response && error.response.status === 500) {
            message = 'Sorry, something went wrong. Please try again later. Error 500.';
        }

        console.error(message, error.message);
    }
};

/**
 * Almacena la cotización de compra y venta del dólar en la base de datos.
 * @async
 * @param {Object} dbCredentials - Credenciales de conexión a la base de datos.
 * @param {string} dbCredentials.host - Host de la base de datos.
 * @param {string} dbCredentials.user - Usuario de la base de datos.
 * @param {string} dbCredentials.password - Contraseña de la base de datos.
 * @param {string} dbCredentials.database - Nombre de la base de datos.
 * @param {Object} quote - Objeto que contiene la cotización de compra y venta del dólar.
 * @param {number} quote.purchaseValue - Valor de compra del dólar.
 * @param {number} quote.saleValue - Valor de venta del dólar.
 * @throws {Error} Si hay un error al almacenar la cotización en la base de datos.
 */

const storeQuote = async (dbCredentials, quote) => {
    try {
        await quotationsModel.insertQuotation(dbCredentials, quote.purchaseValue, quote.saleValue);
    } catch (error) {
        console.error('Error storing quote:', error.message);
    }
};

module.exports = {
	getQuote,
    storeQuote
};
