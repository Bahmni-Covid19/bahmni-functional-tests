const path = require('path');
const axios = require('axios')
var _date = require("./date");

async function getOpenMRSResponse(request){
    return await axios.get(request
        , {
            headers: {
                'Authorization': `token ${process.env.receptionist}`
            }
        })
}

async function makeOpenMRSCall(patientUUID,visitType,URL){
    var yesterday = _date.getddmmyyyyFormattedDate(_date.yesterday())
    var tomorrow = _date.getddmmyyyyFormattedDate(_date.tomorrow())

    var request_URL = process.env.bahmniHost+URL
        .replace("<patientId>",patientUUID)
        .replace("<fromDate>",yesterday)
        .replace("<toDate>",tomorrow)
        .replace("<visitType>",visitType)

    console.log(request_URL)
    var prescriptionsVisitResponse = await getOpenMRSResponse(request_URL)
    console.log(prescriptionsVisitResponse.data);
    console.log(prescriptionsVisitResponse.status);
    console.log(prescriptionsVisitResponse.statusText);
    console.log(prescriptionsVisitResponse.headers);
    console.log(prescriptionsVisitResponse.config);
    
}

module.exports={
    getOpenMRSResponse:getOpenMRSResponse,
    makeOpenMRSCall:makeOpenMRSCall
}