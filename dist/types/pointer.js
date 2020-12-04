"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
function Pointer(identifier) {
    const [className, objectId] = identifier.split(/\//);
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}
exports.Pointer = Pointer;
