"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGridContext = void 0;
var react_1 = require("react");
var GridContext_1 = require("../contexts/GridContext");
var useGridContext = function () {
    return (0, react_1.useContext)(GridContext_1.GridContext);
};
exports.useGridContext = useGridContext;
