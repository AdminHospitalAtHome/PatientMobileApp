module.exports = async function (context, req, recentHeartRate) {

    context.res = {
        status: 200,
        body: recentHeartRate
    };
}
