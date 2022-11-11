/* Copyright (c) 2018-2022 Marco Stahl */
// Seems pointless, but makes things more type-safe.
export function first(array) {
    return array[0];
}
// Seems pointless, but makes things more type-safe.
export function last(array) {
    return array[array.length - 1];
}
export function mapOptional(x, f) {
    if (x === undefined) {
        return undefined;
    }
    return f(x);
}
export function getYearFromTimestamp(timestamp) {
    return new Date(timestamp).getFullYear();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlDQUF5QztBQUV6QyxvREFBb0Q7QUFDcEQsTUFBTSxVQUFVLEtBQUssQ0FBSSxLQUF1QjtJQUM5QyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsb0RBQW9EO0FBQ3BELE1BQU0sVUFBVSxJQUFJLENBQUksS0FBdUI7SUFDN0MsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBTyxDQUFnQixFQUFFLENBQWM7SUFDaEUsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ25CLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFNBQTBCO0lBQzdELE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0MsQ0FBQyJ9