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


    const listBodyParams = {
        type: 'DESTINATION'
    }

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
            functionsList.forEach(functionReturned => {
                console.log(functionReturned.id)
                if (functionID && functionReturned.id == functionID) {
                    console.log('function exists, update')
                    updateFunction()
                    break
                }
                else {
                    console.log('function does not exist, create new')
                    createFunction(workspaceID, createBodyParams)
                    break
                }
            })
        })




    // TO FILL OUT FOR PATCH / UPDATE
    // const patchBodyParams = {
    //     update_mask
    // }




} catch (error) {
    core.setFailed(error.message);
}

function updateFunction() {
    console.log('calling updating function')
}

function createFunction(workspaceIDInput, createBodyParamsInput) {
    console.log('calling creating function')

    axios.post(`https://platform.segmentapis.com/v1beta/workspaces/${workspaceIDInput}/functions`,
        {
            type: 'DESTINATION',
            function: {
                display_name: core.getInput('function-name'),
                code: core.getInput('function-code'),
                buildpack: "boreal"
            }
        })
        .then(function (response) {
            console.log(response)
            console.log('Function Created Successfully')
        })
}