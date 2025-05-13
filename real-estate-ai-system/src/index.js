// /home/jamie/Downloads/realestate-ai-system/real-estate-ai-system/src/index.js
const PropertyBuyerFinder = require('./workflows/propertyBuyerFinder');
const ValuationSystem = require('./workflows/valuationSystem');
const MarketAnalyzer = require('./workflows/marketAnalyzer');
const WorkflowErrorHandler = require('./utils/errorHandler');
const CSVProcessor = require('./data/csvProcessor');
const DatabaseManager = require('./data/databaseManager');
const PropertyClassifier = require('./ai/propertyClassifier');

class RealEstateAISystem {
    constructor(config) {
        this.buyerFinder = new PropertyBuyerFinder();
        this.valuationSystem = new ValuationSystem();
        this.marketAnalyzer = new MarketAnalyzer();
        this.errorHandler = new WorkflowErrorHandler();
        
        // New components
        this.csvProcessor = new CSVProcessor();
        this.dbManager = new DatabaseManager(config.database);
        this.propertyClassifier = new PropertyClassifier();
    }

    async processPropertyData(csvFilePath) {
        try {
            // Step 1: Read and validate CSV
            const rawData = await this.csvProcessor.readCSV(csvFilePath);
            
            // Step 2: Clean and normalize data
            const cleanedData = await this.csvProcessor.cleanData(rawData);
            
            // Step 3: Classify properties and calculate metrics
            const enrichedData = await this.propertyClassifier.enrichProperties(cleanedData);
            
            // Step 4: Save to database
            const result = await this.dbManager.batchInsert('properties', enrichedData);
            
            return {
                success: true,
                processedCount: result.length,
                summary: await this.generateDataSummary(result)
            };
        } catch (error) {
            this.errorHandler.handleError(error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async generateDataSummary(data) {
        return {
            totalProperties: data.length,
            byPropertyType: await this.marketAnalyzer.groupByPropertyType(data),
            averageMetrics: await this.marketAnalyzer.calculateAverageMetrics(data)
        };
    }
}

module.exports = RealEstateAISystem;