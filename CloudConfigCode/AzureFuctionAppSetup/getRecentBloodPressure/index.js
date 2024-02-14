module.exports = async function (context, req, recentBloodPressure) {

    context.res = {
        status: 200,
        body: recentBloodPressure
    };
}
