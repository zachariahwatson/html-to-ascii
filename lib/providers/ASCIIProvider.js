"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASCIIProvider = ASCIIProvider;
var GridContext_1 = require("../contexts/GridContext");
var useWindowDimensions_1 = require("../hooks/useWindowDimensions");
var defaultOptions_1 = require("../utils/defaultOptions");
function initGrid(_a) {
    var width = _a.width, height = _a.height;
    var fontHeight = 16;
    var courierRatio = 1229 / 2048;
    var fontWidth = fontHeight * courierRatio;
    var truncWidth = width - (width % fontWidth);
    var truncHeight = height - (height % fontHeight);
    var windowWidth = width;
    var windowHeight = height;
    var rows = Math.floor(truncHeight / fontHeight);
    var cols = Math.floor(truncWidth / fontWidth);
    var grid = Array.from({ length: rows * cols }, function () { return String.fromCharCode(160); });
    var options = defaultOptions_1.defaultOptions;
    return {
        fontHeight: fontHeight,
        courierRatio: courierRatio,
        fontWidth: fontWidth,
        truncWidth: truncWidth,
        truncHeight: truncHeight,
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        rows: rows,
        cols: cols,
        grid: grid,
        options: options,
    };
}
function ASCIIProvider(_a) {
    var children = _a.children;
    var _b = (0, useWindowDimensions_1.useWindowDimensions)(), width = _b.width, height = _b.height;
    var grid = initGrid({ width: width, height: height });
    return <GridContext_1.GridContext.Provider value={grid}>{children}</GridContext_1.GridContext.Provider>;
}
