"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowDimensions = useWindowDimensions;
var react_1 = require("react");
function useWindowDimensions() {
    var _a = (0, react_1.useState)({
        width: 0,
        height: 0,
    }), dimensions = _a[0], setDimensions = _a[1];
    (0, react_1.useEffect)(function () {
        var update = function () { return setDimensions({ width: window.innerWidth, height: window.innerHeight }); };
        update(); // Set initial size
        window.addEventListener("resize", update);
        return function () { return window.removeEventListener("resize", update); };
    }, []);
    return dimensions;
}
