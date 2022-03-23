export default function capitalizeFirstLetter(text) {
    const lowerText = text.toLowerCase();
    return text.charAt(0).toUpperCase() + lowerText.slice(1)
}