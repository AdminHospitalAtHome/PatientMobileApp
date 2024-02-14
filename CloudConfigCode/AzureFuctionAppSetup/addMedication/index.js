
module.exports = async function (context, req) {

    // Parse the request body
    const data = req.body;

    try {
        const input = {
            "name": data.name,
            "prescription": data.prescription
        };
        context.bindings.sqlOutput = JSON.stringify(input)

        context.res = {
            status: 200,
            body: context.bindings.sqlOutput
        };

    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "Error adding medication in the database."
        };
    }
};
