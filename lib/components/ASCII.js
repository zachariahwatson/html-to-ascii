"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASCII = ASCII;
var react_1 = require("react");
var useGridContext_1 = require("../hooks/useGridContext");
var useReveal_1 = require("../hooks/useReveal");
var getIndex = function (x, y, grid) {
    var col = (x / grid.fontWidth) | 0;
    var row = (y / grid.fontHeight) | 0;
    return row * grid.cols + col;
};
var drawRect = function (_a) {
    var rect = _a.rect, grid = _a.grid;
    var rectLeft = Math.floor(rect.rect.left / grid.fontWidth) * grid.fontWidth;
    var rectRight = Math.floor(rect.rect.right / grid.fontWidth) * grid.fontWidth;
    var rectTop = Math.floor(rect.rect.top / grid.fontHeight) * grid.fontHeight;
    var rectBottom = Math.floor(rect.rect.bottom / grid.fontHeight) * grid.fontHeight;
    //verticals
    //left
    if ((rect.classList.contains("ascii-border") &&
        !["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some(function (c) {
            return rect.classList.contains(c);
        })) ||
        rect.classList.contains("ascii-border-l")) {
        for (var i = rectTop + grid.fontHeight; i < rectBottom; i += grid.fontHeight) {
            var l = getIndex(rectLeft, i, grid);
            switch (grid.grid[l]) {
                case grid.options.t:
                case grid.options.b:
                case grid.options.tr:
                case grid.options.br:
                    grid.grid[l] = grid.options.li;
                    break;
                default:
                    grid.grid[l] = grid.options.l;
            }
        }
    }
    //right
    if ((rect.classList.contains("ascii-border") &&
        !["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some(function (c) {
            return rect.classList.contains(c);
        })) ||
        rect.classList.contains("ascii-border-r")) {
        for (var i = rectTop + grid.fontHeight; i < rectBottom; i += grid.fontHeight) {
            var r = getIndex(rectRight, i, grid);
            switch (grid.grid[r]) {
                case grid.options.t:
                case grid.options.b:
                case grid.options.tl:
                case grid.options.bl:
                    grid.grid[r] = grid.options.ri;
                    break;
                default:
                    grid.grid[r] = grid.options.r;
            }
        }
    }
    //horizontals
    //top
    if ((rect.classList.contains("ascii-border") &&
        !["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some(function (c) {
            return rect.classList.contains(c);
        })) ||
        rect.classList.contains("ascii-border-t")) {
        for (var i = rectLeft + grid.fontWidth; i < rectRight; i += grid.fontWidth) {
            var t = getIndex(i, rectTop, grid);
            switch (grid.grid[t]) {
                case grid.options.l:
                case grid.options.r:
                case grid.options.bl:
                case grid.options.br:
                    grid.grid[t] = grid.options.ti;
                    break;
                default:
                    grid.grid[t] = grid.options.t;
            }
        }
    }
    //bottom
    if ((rect.classList.contains("ascii-border") &&
        !["ascii-border-l", "ascii-border-r", "ascii-border-t", "ascii-border-b"].some(function (c) {
            return rect.classList.contains(c);
        })) ||
        rect.classList.contains("ascii-border-b")) {
        for (var i = rectLeft + grid.fontWidth; i < rectRight; i += grid.fontWidth) {
            var b = getIndex(i, rectBottom, grid);
            switch (grid.grid[b]) {
                case grid.options.l:
                case grid.options.r:
                case grid.options.tl:
                case grid.options.tr:
                    grid.grid[b] = grid.options.bi;
                    break;
                default:
                    grid.grid[b] = grid.options.b;
            }
        }
    }
    //corners
    //tl
    if (["ascii-border", "ascii-border-tl"].some(function (c) { return rect.classList.contains(c); }) ||
        ["ascii-border-l", "ascii-border-t"].every(function (c) { return rect.classList.contains(c); })) {
        var tl = getIndex(rectLeft, rectTop, grid);
        switch (grid.grid[tl]) {
            case grid.options.t:
            case grid.options.b:
            case grid.options.tr:
                grid.grid[tl] = grid.options.bi;
                break;
            case grid.options.l:
            case grid.options.r:
            case grid.options.bl:
                grid.grid[tl] = grid.options.ri;
                break;
            case grid.options.br:
                grid.grid[tl] = grid.options.i;
                break;
            default:
                grid.grid[tl] = grid.options.tl;
        }
    }
    //tr
    if (["ascii-border", "ascii-border-tr"].some(function (c) { return rect.classList.contains(c); }) ||
        ["ascii-border-r", "ascii-border-t"].every(function (c) { return rect.classList.contains(c); })) {
        var tr = getIndex(rectRight, rectTop, grid);
        switch (grid.grid[tr]) {
            case grid.options.t:
            case grid.options.b:
            case grid.options.tl:
                grid.grid[tr] = grid.options.bi;
                break;
            case grid.options.l:
            case grid.options.r:
            case grid.options.br:
                grid.grid[tr] = grid.options.li;
                break;
            case grid.options.bl:
                grid.grid[tr] = grid.options.i;
                break;
            default:
                grid.grid[tr] = grid.options.tr;
        }
    }
    //br
    if (["ascii-border", "ascii-border-br"].some(function (c) { return rect.classList.contains(c); }) ||
        ["ascii-border-r", "ascii-border-b"].every(function (c) { return rect.classList.contains(c); })) {
        var br = getIndex(rectRight, rectBottom, grid);
        if (rect.type === "textarea") {
            grid.grid[br] = "▼";
        }
        else {
            switch (grid.grid[br]) {
                case grid.options.l:
                case grid.options.r:
                case grid.options.tr:
                    grid.grid[br] = grid.options.li;
                    break;
                case grid.options.t:
                case grid.options.b:
                case grid.options.bl:
                    grid.grid[br] = grid.options.ti;
                    break;
                case grid.options.tl:
                    grid.grid[br] = grid.options.i;
                    break;
                default:
                    grid.grid[br] = grid.options.br;
            }
        }
    }
    //bl
    if (["ascii-border", "ascii-border-bl"].some(function (c) { return rect.classList.contains(c); }) ||
        ["ascii-border-l", "ascii-border-b"].every(function (c) { return rect.classList.contains(c); })) {
        var bl = getIndex(rectLeft, rectBottom, grid);
        switch (grid.grid[bl]) {
            case grid.options.l:
            case grid.options.r:
            case grid.options.tl:
                grid.grid[bl] = grid.options.ri;
                break;
            case grid.options.t:
            case grid.options.b:
            case grid.options.br:
                grid.grid[bl] = grid.options.ti;
                break;
            case grid.options.tr:
                grid.grid[bl] = grid.options.i;
                break;
            default:
                grid.grid[bl] = grid.options.bl;
        }
    }
    //fill
    if (rect.classList.contains("ascii-fill")) {
        for (var y = rectTop + grid.fontHeight; y < rectBottom; y += grid.fontHeight) {
            for (var x = rectLeft + grid.fontWidth; x < rectRight; x += grid.fontWidth) {
                grid.grid[getIndex(x, y, grid)] = grid.options.fill;
            }
        }
    }
    //characters
    if (rect.classList.contains("ascii-text")) {
        rect.characters.forEach(function (c) {
            var cRectLeft = Math.floor(c.rect.left / grid.fontWidth) * grid.fontWidth;
            var cRectBottom = Math.floor(c.rect.bottom / grid.fontHeight) * grid.fontHeight;
            grid.grid[getIndex(cRectLeft, cRectBottom, grid)] = c.char;
        });
    }
};
function getElements(ref) {
    if (!ref.current)
        return [];
    return Array.from(ref.current.querySelectorAll('[class*="ascii"]')).map(function (el) {
        var _a;
        //console.log("element", el)
        var c = [];
        var textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (textWalker.nextNode()) {
            var textNode = textWalker.currentNode;
            var text = (_a = textNode.textContent) !== null && _a !== void 0 ? _a : "";
            for (var i = 0; i < text.length; i++) {
                if (text[i].trim() === "")
                    continue;
                //console.log(text[i])
                var range = document.createRange();
                range.setStart(textNode, i);
                range.setEnd(textNode, i + 1);
                var rect = range.getBoundingClientRect();
                //if (rect.width === 0 || rect.height === 0) continue
                c.push({ char: text[i], rect: rect });
            }
        }
        return {
            rect: el.getBoundingClientRect(),
            characters: c,
            type: el.tagName.toLowerCase(),
            classList: el.classList,
        };
    });
}
function ASCII(_a) {
    var children = _a.children;
    var parentRef = (0, react_1.useRef)(null);
    var grid = (0, useGridContext_1.useGridContext)();
    var _b = (0, react_1.useState)([]), rects = _b[0], setRects = _b[1];
    var _c = (0, react_1.useReducer)(function (x) { return x + 1; }, 0), reRender = _c[1];
    var reveal = (0, useReveal_1.useReveal)(grid.grid, 30);
    (0, react_1.useLayoutEffect)(function () {
        if (!parentRef.current)
            return;
        var frame;
        var loop = function () {
            setRects(getElements(parentRef));
            frame = requestAnimationFrame(loop);
        };
        loop();
        return function () { return cancelAnimationFrame(frame); };
    }, []);
    // clear canvas
    // maybe find better way
    for (var i = 0; i < grid.grid.length; i++) {
        grid.grid[i] = String.fromCharCode(160);
    }
    rects === null || rects === void 0 ? void 0 : rects.forEach(function (rect) {
        drawRect({ rect: rect, grid: grid });
    });
    return (<div ref={parentRef}>
			<div style={{ width: grid.truncWidth, height: grid.truncHeight }} className="absolute opacity-0 top-0 left-0 bg-none pointer-events-none">
				{children}
			</div>
			{parentRef.current && (<div style={{ width: grid.truncWidth, height: grid.truncHeight }} className="leading-none wrap-break-word">
					{reveal.join("")}
				</div>)}
		</div>);
}
