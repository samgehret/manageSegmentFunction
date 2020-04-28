const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('token');
    const functionCode = core.getInput('function-js')
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event meow payload: ${payload}`);
    const bodyParams = {
            type: 'DESTINATION',
            function: {
            display_name: "Test API8",
            code: functionCode,
            buildpack: "boreal"
            }
    }
    const config = {
        headers: { Authorization: `Bearer DDeaRf5arluteOr1u9deUu8KcqkcBD621Q1tQb-VX4s.J_QDecOc1ZE7FbCHhoSR2MAvOtPTZRb9uuSR60yZkTU` }
    };
    axios.post('https://platform.segmentapis.com/v1beta/workspaces/mOcpeJK5n7/functions',
        bodyParams,
        config)
        .then(function (response) {
            // console.log(response.data)
            console.log('getting here')
        })

} catch (error) {
    core.setFailed(error.message);
}

// test2