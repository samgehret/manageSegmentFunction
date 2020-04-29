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
        headers: { Authorization: `Bearer 03JpV5vEXYnS1lTGL6eApoLOt820dDlI1lBCkCYvlog.remIKZlBYUJvxUpGMTlM3zp28l2Ehb4VdjtoAHwIVcc` }
    };
    axios.post('https://platform.segmentapis.com/v1beta/workspaces/cUMIZIkR1y/functions',
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