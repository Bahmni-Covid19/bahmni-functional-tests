const path = require('path');
const axios = require('axios')

async function getOpenMRSResponse(request){
    return await axios.get(request
        , {
            headers: {
                'Authorization': `token ${process.env.receptionist}`
            }
        })
}

module.exports={
    getOpenMRSResponse:getOpenMRSResponse
}