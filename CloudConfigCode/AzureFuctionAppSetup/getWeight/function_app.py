import azure.functions as func
import logging

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="getWeight")
def getWeight(req: func.HttpRequest) -> func.HttpResponse:

    try:
        req_body = req.get_json()
        patientID = req_body.get('PatientID')
        if not patientID:
            return func.HttpResponse(
                "Missing PatientID in Body",
                status_code=400
            )
        patientID = req_body.get('PatientID')
        if not patientID:
            return func.HttpResponse(
                "Missing PatientID in Body",
                status_code=400
            )
        endDateTime = req_body.get('EndDateTime')
        if not endDateTime:
            return func.HttpResponse(
                "Missing EndDateTime in Body",
                status_code=400
            )
        startDateTime = req_body.get('StartDateTime')
        if not startDateTime:
            return func.HttpResponse(
                "Missing StartDateTime in Body",
                status_code=400
            )
        

    except ValueError:
        return func.HttpResponse(
             "Something Went Wrong",
             status_code=500
        )