"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
// NotFoundError
const errorHandler = (error, req, res, next) => {
    const message = error.message || 'encounter error';
    const status = error.statusCode || 500;
    console.log('Error message', message);
    if (error instanceof express_validation_1.ValidationError) {
        return res.status(error.statusCode).json(error);
    }
    else {
        res.status(status).json({
            message,
            error: 'Error message',
        });
    }
    next();
};
exports.default = errorHandler;
