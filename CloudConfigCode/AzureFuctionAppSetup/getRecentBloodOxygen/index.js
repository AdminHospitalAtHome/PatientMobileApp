module.exports = async function (context, req, recentBloodOxygen) {

    context.res = {
        status: 200,
        body: recentBloodOxygen
    };
}
