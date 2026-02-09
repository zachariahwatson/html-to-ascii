"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReveal = useReveal;
var react_1 = require("react");
function useReveal(grid, speed) {
    if (speed === void 0) { speed = 1; }
    var _a = (0, react_1.useState)(0), index = _a[0], setIndex = _a[1];
    (0, react_1.useEffect)(function () {
        var frame;
        var loop = function () {
            setIndex(function (i) {
                if (i >= grid.length)
                    return i;
                return i + speed;
            });
            frame = requestAnimationFrame(loop);
        };
        loop();
        return function () { return cancelAnimationFrame(frame); };
    }, [grid, speed]);
    return grid.slice(0, index);
}
