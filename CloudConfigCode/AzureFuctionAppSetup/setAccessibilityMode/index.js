module.exports = async function (context, req, accessibilityMode) {
    context.res = {
        status: 200,
        body: accessibilityMode
    };
}
