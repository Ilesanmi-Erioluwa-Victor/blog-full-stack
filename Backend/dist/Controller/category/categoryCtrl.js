"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryCtrl = exports.UpdateCategory = exports.GetCategoryCtrl = exports.GetAllCategoryCtrl = exports.CreateCategoryCtrl = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Category_1 = __importDefault(require("../../Model/category/Category"));
const ValidateMongoDbId_1 = __importDefault(require("../../Utils/ValidateMongoDbId"));
exports.CreateCategoryCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    try {
        const category = await Category_1.default.create({
            user: req.AuthId,
            title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
        });
        res.json(category);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.GetAllCategoryCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const category = await Category_1.default.find({})
            .populate('user')
            .sort('-createdAt');
        res.json(category);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.GetCategoryCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const category = await Category_1.default.findById(id)
            .populate('user')
            .sort('-createdAt');
        res.json(category);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.UpdateCategory = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const category = await Category_1.default.findByIdAndUpdate(id, {
            title: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title,
        }, { new: true, runValidators: true });
        res.json(category);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.DeleteCategoryCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const category = await Category_1.default.findByIdAndDelete(id);
        res.json(category);
    }
    catch (error) {
        res.json(error.message);
    }
});
