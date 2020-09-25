const validate = async function (decoded, request, h) {
    const isValid = true
    return { isValid, decoded }
}
module.exports = {
    validate
}
