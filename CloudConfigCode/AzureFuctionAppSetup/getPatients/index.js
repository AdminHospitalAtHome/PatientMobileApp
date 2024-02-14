module.exports = async function (context, req, allPatients) {

    context.res = {
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',

        },
        status: 200, /* Defaults to 200 */
        body: allPatients
    };
}
