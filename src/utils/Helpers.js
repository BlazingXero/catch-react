export default {
    convert: (number) => {
        if (isNaN(number) || number === 0) return null

        const price = (number / 100).toFixed(2)
        return "$" + price
    },
}