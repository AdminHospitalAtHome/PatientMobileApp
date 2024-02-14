module.exports = async function (context, req, recentWeight) {

    context.res = {
        status: 200,
        body: recentWeight
    };
}
