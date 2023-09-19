import azure.functions as func
import logging

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="uploadWeight")
def uploadWeight(req: func.HttpRequest) -> func.HttpResponse:
    #logging.info('Python HTTP trigger function processed a request.')
    logging.info('WHY')
    patientID = req.params.get('PatientID')
    dateTimeTaken = req.params.get('DateTimeTaken')
    weightInPounds = req.params.get('WeightInPounds') 
    ifManualInput = req.params.get('IfManualInput')
    
    # Check for all values
    if not patientID:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            patientID = req_body.get('PatientID') 

    logging.info('tesst')

            

    if patientID:
        return func.HttpResponse(f"Hello, {patientID}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )