export function escapeString (str: string): string {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/u0000/g, '\\0')
}