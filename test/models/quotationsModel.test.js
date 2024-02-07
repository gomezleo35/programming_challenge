jest.mock('pg');
const Model = require('../../models/quotationsModel');
const { Client } = require('pg');

describe('initializeDatabase', () => {
    it('should initialize the database', async () => {
        const mockConnect = jest.fn();
        const mockQuery = jest.fn();

        Client.mockImplementation(() => {
            return {
                connect: mockConnect,
                query: mockQuery,
            };
        });

        const response = await Model.initializeDatabase();

        expect(mockConnect).toHaveBeenCalled();
        expect(mockQuery).toHaveBeenCalled();
        expect(response.connect).toBe(mockConnect);
        expect(response.query).toBe(mockQuery);
    });
    it('should throw an error when initialization fails', async () => {
        const errorMessage = 'Failed to initialize';
        const dbCredentials = {
            user: 'testUser',
            host: 'testHost',
            database: 'testDatabase',
            password: 'testPassword',
            port: 5432,
        };

        Client.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(Model.initializeDatabase(dbCredentials)).rejects.toThrow(errorMessage);
    });
});

describe('insertQuotation', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('should insert a quotation into the database', async () => {
        const mockConnect = jest.fn();
        const mockQuery = jest.fn();

        const dbCredentials = {};

        const purchaseValue = 100;
        const saleValue = 150;

        const mockClient = {
            connect: mockConnect,
            query: mockQuery,
            _connected: true
        };

        Client.mockReturnValueOnce(mockClient);

        await Model.insertQuotation(dbCredentials, purchaseValue, saleValue);

        expect(mockConnect).toHaveBeenCalled();
        expect(mockQuery).toHaveBeenCalledWith(
            'INSERT INTO quotation (purchase_value, sale_value) VALUES ($1, $2)',
            [purchaseValue, saleValue]
        );
        expect(console.info).toHaveBeenCalledWith(`Stored Quote: BUY: ${purchaseValue} and SALE: ${saleValue}`);
    });

    it('should throw an error when insertion fails', async () => {
        const errorMessage = 'Failed to insert quotation';
        const dbCredentials = {};

        const purchaseValue = 100;
        const saleValue = 150;

        const mockClient = {
            connect: jest.fn(),
            query: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
            _connected: true
        };

        Client.mockReturnValueOnce(mockClient);

        await expect(Model.insertQuotation(dbCredentials, purchaseValue, saleValue)).rejects.toThrow(errorMessage);
    });

    it('should throw an error when database connection is not initialized', async () => {
        const errorMessage = 'Database connection is not initialized. Call initializeDatabase first.';
        const dbCredentials = {};

        Client.mockReturnValueOnce(null);

        await expect(Model.insertQuotation(dbCredentials, 100, 150)).rejects.toThrow(errorMessage);
    });
});
