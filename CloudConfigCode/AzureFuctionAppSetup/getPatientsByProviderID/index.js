module.exports = async function (context, req, patients) {

    context.res = {
        status: 200, /* Defaults to 200 */
        body: patients
    };
}
