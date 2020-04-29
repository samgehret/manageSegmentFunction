const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

try {

// TO WRITE LOGIC FOR FIGURING OUT IF A FUNCTION EXISTS OR NOT



    const functionCode = core.getInput('function-code')
    const functionName = core.getInput('function-name')
    console.log('the function code is', functionCode)

    const bodyParams = {
            type: 'DESTINATION',
            function: {
            display_name: functionName,
            code: functionCode,
            buildpack: "boreal"
            }
    }

    // TO FILL OUT FOR PATCH / UPDATE
    // const patchBodyParams = {
    //     update_mask
    // }

    const config = {
        headers: { Authorization: `Bearer e4wpiMxQjZnNxO-rhTj3n5lhrHzGGadoJP_3QqNR0qY.VnW0iDTC_e73DGZX1i31pHF0Xarsx2mBf6KLMyjd-Ms` }
    };
    axios.post('https://platform.segmentapis.com/v1beta/workspaces/qUhs3P50k3/functions',
        bodyParams,
        config)
        .then(function (response) {
            // console.log(response.data)
            console.log('Function Created Successfully')
        })

} catch (error) {
    core.setFailed(error.message);
}

// test2