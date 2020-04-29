const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('token');
    const functionCode = core.getInput('function-js')
    console.log('the function code is', functionCode)
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event meow payload: ${payload}`);



    const bodyParams = {
            type: 'DESTINATION',
            function: {
            display_name: "Test API13",
            code: functionCode,
            buildpack: "boreal"
            }
    }
    const config = {
        headers: { Authorization: `Bearer e4wpiMxQjZnNxO-rhTj3n5lhrHzGGadoJP_3QqNR0qY.VnW0iDTC_e73DGZX1i31pHF0Xarsx2mBf6KLMyjd-Ms` }
    };
    axios.post('https://platform.segmentapis.com/v1beta/workspaces/qUhs3P50k3/functions',
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