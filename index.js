const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')
const functionCode = core.getInput('function-code')
const functionName = core.getInput('function-name')
const workspaceID = core.getInput('workspaceID')
const functionID = core.getInput('function-id')
const token = core.getInput('token')
console.log('the function code is', functionCode)

// Need to figure out how to abstract this token out of this repo and into some kind of environment variable.
// const token = `Bearer MsG-1YOmQ6BtIGSLfzjjExucZgjFg7Es9_K-nGvrTks.cMmh4lTiUHaHY9syJKh0nNxp87uzMGhtGf1qxvwHJLg`

// Appends the Auth Header to all Axios requests.
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});
try {
    //First returns a list of all functions in a workspace
    axios.get(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceID}/functions`, {
        params: {
            type: 'DESTINATION'
        }
    })
        .then(function (response) {
            console.log(response.data.functions)
            const functionsList = response.data.functions
            // Checks for presence of a FunctionID input and checks to see if it exists
            if (functionID) {
                console.log('found functionID')
                functionsList.forEach(functionReturned => {
                    // If the function exists, update it.
                    if (functionReturned.id == functionID) {
                        console.log('function exists, update')
                        // Build body for Update / Patch request
                        const patchBodyParams = {
                            update_mask: "function.code",
                            function: {
                                id: functionID,
                                workspace_id: workspaceID,
                                code: functionCode,
                                buildpack: "boreal"
                            }
                        }
                        updateFunction(workspaceID, patchBodyParams, functionID)
                    }
                })
            }
            else {
                // If function is not found, default to creating a new one.
                console.log('creating new function')
                // Puts together the body of the payload sent to Create function endpoint.
                const createBodyParams = {
                    type: 'DESTINATION',
                    function: {
                        display_name: functionName,
                        code: functionCode,
                        buildpack: "boreal"
                    }
                }
                createFunction(workspaceID, createBodyParams)
            }

        })
} catch (error) {
    core.setFailed(error.message);
}

function updateFunction(workspaceIDInput, patchParamsInput, functionIDInput) {
    axios.patch(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceIDInput}/functions/${functionIDInput}`,
        patchParamsInput)
    console.log('calling updating function')
}

function createFunction(workspaceIDInput, createBodyParamsInput) {
    console.log('calling creating function')
    axios.post(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceIDInput}/functions`,
        createBodyParamsInput)
        .then(function (response) {
            console.log('Function Created Successfully')
        })
}