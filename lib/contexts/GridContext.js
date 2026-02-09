"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridContext = void 0;
var react_1 = require("react");
var defaultOptions_1 = require("../utils/defaultOptions");
exports.GridContext = (0, react_1.createContext)({
    fontHeight: 0,
    courierRatio: 0,
    fontWidth: 0,
    truncWidth: 0,
    truncHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    rows: 0,
    cols: 0,
    grid: [],
    options: defaultOptions_1.defaultOptions,
});
