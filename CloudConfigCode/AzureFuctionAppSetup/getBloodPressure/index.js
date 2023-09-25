module.exports = async function (context, req, bloodPressure) {
    context.res = {
        status: 200,
        body: bloodPressure
    };
}