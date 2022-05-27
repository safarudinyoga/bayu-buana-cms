export default function ThousandSeparator(value, maxDigit = 8) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: maxDigit })
}