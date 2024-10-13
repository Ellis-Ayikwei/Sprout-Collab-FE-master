const { default: axiosInstance } = require("helpers/configEndpoints")

const joinCollab = (userid, collabid) => {

    axiosInstance.post(`collaborations/${collabid}/collaboration_members`, {
        user_id: userid
    })
    
}


export default joinCollab