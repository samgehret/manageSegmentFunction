const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')
const functionCode = core.getInput('function-code')
const functionName = core.getInput('function-name')
const workspaceID = core.getInput('workspaceID')
const functionID = core.getInput('function-id')
console.log('the function code is', functionCode)

const token = `Bearer MsG-1YOmQ6BtIGSLfzjjExucZgjFg7Es9_K-nGvrTks.cMmh4lTiUHaHY9syJKh0nNxp87uzMGhtGf1qxvwHJLg`

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = token;

    return config;
});

try {

    // TO WRITE LOGIC FOR FIGURING OUT IF A FUNCTION EXISTS OR NOT



    // Set AUTH header for all axios requests

    const createBodyParams = {
        type: 'DESTINATION',
        function: {
            display_name: functionName,
            code: functionCode,
            buildpack: "boreal"
        }
    }

    axios.get(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceID}/functions`, {
        params: {
            type: 'DESTINATION'
        }
    })
        .then(function (response) {
            console.log(response.data.functions)
            const functionsList = response.data.functions
            if (functionID) {
                console.log('found functionID')
                functionsList.forEach(functionReturned => {
                    if (functionReturned.id == functionID) {
                        console.log('function exists, update')
                        const patchBodyParams = {
                            update_mask: ["function.code"],
                            function: {
                                id: functionReturned.id,
                                workspace_id: workspaceID,
                                code: functionCode
                            }
                        }
                        updateFunction(workspaceID, patchBodyParams)
                    }
                })
            }
            else {
                console.log('creating new function')
                createFunction(workspaceID, createBodyParams)
            }

        })
} catch (error) {
    core.setFailed(error.message);
}

function updateFunction(workspaceIDInput, patchParamsInput) {
    axios.patch(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceIDInput}/functions`,
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