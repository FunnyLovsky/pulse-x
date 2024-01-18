export const formatNumber = (number: number): string => {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}