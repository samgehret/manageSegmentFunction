# Manage Segment Functions

## Overview
The purpose of this repo is to provide a workflow which uses [Github Actions](https://help.github.com/en/actions) to manage Segment Functions within your existing Software Development Lifecycle (SDLC). By leveraging this repo you can write function code in your own IDE to Create and Update functions in your Segment workspace.

The goal is to submit this action to the [Github Action Marketplace](https://github.com/marketplace/category/free), so that any user can take advantage of this workflow to manage functions in their own environment.

## Key Benefits
- Leverage function version control from Git and Github.
- Use git commit history to revert functions to previous versions.
- Integrate function code with automated testing currently leveraged in your SDLC.


## Components

### action.yml

#### Inputs
- `token`
**Required** The auhtorization token generated in Segment.
- `workspaceID`
**Required** The id of your workspace (found in workspace settings)
- `function-code`
**Required** Do not change this. This reads your function code.
- `function-name`
**Required** The display name of your function inside the Segment UI
- `function-id`
The id of your Segment function (assigned after it is created). You need to add this after the function is created.

### index.js
Houses the source code for interacting with the Segment platform. No need to edit this unless you have a bespoke use case.

### main.yml

### function javascript code