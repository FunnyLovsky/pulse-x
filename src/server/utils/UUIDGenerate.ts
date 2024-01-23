export class UUIDGenerator {
    static generate(): string {
        const cryptoObj = window.crypto;
        if (cryptoObj) {
            const array = new Uint16Array(8);
            cryptoObj.getRandomValues(array);
            return (
                this.toHex(array[0]) +
                this.toHex(array[1]) +
                '-' +
                this.toHex(array[2]) +
                '-' +
                this.toHex(array[3]) +
                '-' +
                this.toHex(array[4]) +
                '-' +
                this.toHex(array[5]) +
                this.toHex(array[6]) +
                this.toHex(array[7])
            );
        } else {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        }
    }

    private static toHex(value: number): string {
        return value.toString(16).padStart(4, '0');
    }
}
