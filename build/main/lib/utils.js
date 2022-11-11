"use strict";
/* © 2018-2022 Marco Stahl */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearFromTimestamp = exports.mapOptional = exports.last = exports.first = void 0;
// Seems pointless, but makes things more type-safe.
function first(array) {
    return array[0];
}
exports.first = first;
// Seems pointless, but makes things more type-safe.
function last(array) {
    return array[array.length - 1];
}
exports.last = last;
function mapOptional(x, f) {
    if (x === undefined) {
        return undefined;
    }
    return f(x);
}
exports.mapOptional = mapOptional;
function getYearFromTimestamp(timestamp) {
    return new Date(timestamp).getFullYear();
}
exports.getYearFromTimestamp = getYearFromTimestamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBNkI7OztBQUU3QixvREFBb0Q7QUFDcEQsU0FBZ0IsS0FBSyxDQUFJLEtBQXVCO0lBQzlDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFGRCxzQkFFQztBQUVELG9EQUFvRDtBQUNwRCxTQUFnQixJQUFJLENBQUksS0FBdUI7SUFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsb0JBRUM7QUFFRCxTQUFnQixXQUFXLENBQU8sQ0FBZ0IsRUFBRSxDQUFjO0lBQ2hFLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNuQixPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQU5ELGtDQU1DO0FBRUQsU0FBZ0Isb0JBQW9CLENBQUMsU0FBMEI7SUFDN0QsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQyxDQUFDO0FBRkQsb0RBRUMifQ==