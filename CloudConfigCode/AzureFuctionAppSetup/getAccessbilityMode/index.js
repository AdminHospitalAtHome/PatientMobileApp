module.exports = async function (context, req, accessbilityMode) {

    context.res = {
        status: 200,
        body: accessbilityMode
    };
}
