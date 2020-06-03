# Manage Segment Functions

## Overview
The purpose of this repo is to provide a workflow which uses [Github Actions](https://help.github.com/en/actions) to manage Segment Functions within your existing Software Development Lifecycle (SDLC). By leveraging this repo you can write function code in your own IDE to Create and Update functions in your Segment workspace.

The goal is to submit this action to the [Github Action Marketplace](https://github.com/marketplace/category/free), so that any user can take advantage of this workflow to manage functions in their own environment.

## Key Benefits
- Leverage function version control from Git and Github.
- Use git commit history to revert functions to previous versions.
- Integrate function code with automated testing currently leveraged in your SDLC.


## Set Up
- Create a main.yml file in your own repo where your function exists (not this repo), within a .github/workflows folder. So like `.github/workflows/main.yml`
- Copy the content of the [main.yml](https://github.com/samgehret/manageSegmentFunction/blob/master/.github/workflows/main.yml) to the main.yml in your own repo.
- Within your main.yml in your function repo, input your token, workspaceID, function-type and function-name.
- Make sure to update the relative path to your function within the bash script in the main.yml file.
- When you push your function code to your master branch, it should create a function in your Segment workspace.
- Check the "Actions" section (look for the link at the top of your repo) to check on the status of the upload.
- Check your Segment workspace to see if the function was sucessfully added.
- If added, grab the function-id and input it into main.yml to allow your function to be updated. This can be found in the URL when looking at an indvidual function `https://app.segment.com/demo-segment-workspace/functions/catalog/<FUNCTION ID HERE>/edit/code`


## Components

#### Inputs
- `token`
**Required** The auhtorization token generated in Segment.
- `workspaceID`
**Required** The auto generated id of your workspace (found in workspace settings). This is NOT the workspace slug.
- `function-code`
**Required** Do not change this. This reads your function code.
- `function-name`
**Required** The display name of your function inside the Segment UI
- `function-type`
**Required** Specify either Source or Destination Function
- `function-id`
The id of your Segment function (assigned after it is created). You need to add this after the function is created.
