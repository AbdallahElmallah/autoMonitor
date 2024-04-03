export function pluralize(count: number, key: string): string {
    if (count === 0 || count === 1) {
        // Remove 's' from key when count is 0 or 1
        return `There is ${count} ${key.replace(/s$/, '')}`;
    } else {
        return `There are ${count} ${key}`;
    }
}