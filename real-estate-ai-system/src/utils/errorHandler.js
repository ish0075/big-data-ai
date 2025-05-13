// src/utils/errorHandler.js
const axios = require('axios');

class WorkflowErrorHandler {
    constructor() {
        this.webhookUrl = process.env.N8N_WEBHOOK_URL;
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }

    async handleError(error, context) {
        console.error(`Error in ${context}:`, error);

        // Log error to database
        await this.logError(error, context);

        // Notify administrators
        await this.notifyAdmins(error, context);

        // Attempt retry if applicable
        if (context.canRetry && this.retryAttempts > 0) {
            return this.retryOperation(context.operation, this.retryAttempts);
        }
    }

    async logError(error, context) {
        // Implement error logging to database
    }

    async notifyAdmins(error, context) {
        try {
            await axios.post(`${this.webhookUrl}/error-notification`, {
                error: error.message,
                context: context,
                timestamp: new Date().toISOString()
            });
        } catch (notificationError) {
            console.error('Failed to notify administrators:', notificationError);
        }
    }

    async retryOperation(operation, attemptsLeft) {
        try {
            return await operation();
        } catch (error) {
            if (attemptsLeft > 0) {
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.retryOperation(operation, attemptsLeft - 1);
            }
            throw error;
        }
    }
}

module.exports = WorkflowErrorHandler;