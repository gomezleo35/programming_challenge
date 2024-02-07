jest.mock('axios');
const axios = require('axios');
const { getQuote, storeQuote } = require('../../controllers/quotationsController');
const quotationsModel = require('../../models/quotationsModel');

jest.mock('../../models/quotationsModel');

describe('getQuote', () => {
    it('should return purchase and sale values on successful API call', async () => {
        const mockResponse = {
          data: {
            buy: 1.23,
            sell: 1.22,
          },
        };

        axios.get.mockImplementation(() => {
            return Promise.resolve(mockResponse);
          });
        
        const result = await getQuote();
      
        expect(result).toEqual({
          purchaseValue: mockResponse.data.buy,
          saleValue: mockResponse.data.sell,
        });
      });

      it('should handle errors and log appropriate messages a 404 code', async () => {
        const errorMessage = 'Resource not available: The requested endpoint does not exist on the server.';
        const errorResponse = {
          response: {
            status: 404,
          },
          message: 'BAD REQUEST.',
        };
    
        axios.get.mockRejectedValue(errorResponse);
    
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(); //que hace esto?
    
        await getQuote();
    
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage, errorResponse.message);
      });
      it('should handle errors and log appropriate messages a code 500', async () => {
        const errorMessage = 'Sorry, something went wrong. Please try again later. Error 500.';
        const errorResponse = {
          response: {
            status: 500,
          },
          message: 'SERVER ERROR.',
        };
    
        axios.get.mockRejectedValue(errorResponse);
    
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(); //que hace esto?
    
        await getQuote();
    
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage, errorResponse.message);
      });
      it('should handle errors and log appropriate messages a any code', async () => {
        const errorMessage = 'Error getting and storing quote.';
        const errorResponse = {
          response: {
            status: 300,
          },
          message: 'ANY ERROR.',
        };
    
        axios.get.mockRejectedValue(errorResponse);
    
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    
        await getQuote();
    
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage, errorResponse.message);
      });
      it('should handle errors when the API response is not correct', async () => {
        const errorMessage = 'Error getting and storing quote.';
        const errorResponse = 'Invalid data received from the provider.'
        const mockResponse = {
          data: {
            buy: 1.23,
            sell: null,
          },
        };

        axios.get.mockImplementation(() => {
            return Promise.resolve(mockResponse);
          });

        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
        
        await getQuote();
      
        expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage, errorResponse);
      });
});



describe('storeQuote', () => {
  it('should store the quote in the database', async () => {
      const dbCredentials = {
          host: 'localhost',
          user: 'testUser',
          password: 'testPassword',
          database: 'testDatabase',
      };
      const quote = {
          purchaseValue: 1.23,
          saleValue: 1.22,
      };

      await storeQuote(dbCredentials, quote);

      expect(quotationsModel.insertQuotation).toHaveBeenCalledWith(dbCredentials, quote.purchaseValue, quote.saleValue);
  });

  it('should handle errors when storing the quote', async () => {
    const dbCredentials = {
        host: 'localhost',
        user: 'testUser',
        password: 'testPassword',
        database: 'testDatabase',
    };
    const quote = {
        purchaseValue: 1.23,
        saleValue: 1.22,
    };
    const errorMessage = 'Error storing quote: Database connection error';

    quotationsModel.insertQuotation.mockRejectedValue(new Error('Database connection error'));
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    await storeQuote(dbCredentials, quote);

    const messageResponse = consoleErrorMock.mock.calls[4][0] + " " + consoleErrorMock.mock.calls[4][1];

    expect(messageResponse).toBe(errorMessage);
  });
});