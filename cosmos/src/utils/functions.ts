export function startAndEnd(str: string): string {
    const maxLength = 35;
    const startLength = 4;
    const endLength = 4;
    
    if (str.length > maxLength) {
      return `${str.substring(0, startLength)}...${str.substring(str.length - endLength)}`;
    }
    
    return str;
}