# iam-policy-generator

## About this project

### Description

A simple web app that can be used to generate IAM policies for AWS.

### Tech stack

React, Semantic UI

### Goals

The eventual goal is to make IAM policy generation really simple for users and make it really hard to make mistakes. In order to do this, lots of tasks need to be done:

- Provide an easy intuitive interface for advanced AWS users to create complex policies
- Provide CRUD policy generation for services for users who aren't familiar with AWS
- Provide commonly used templates as an easy way to generate policies (S3 Read, Assume Role, S3 Write etc.)
- Use gathered AWS data to accurately suggest resources based on action/services
- Allow users to export the generated policy in a variety of formats (JSON, TerraForm, YAML etc.)
- Provide recommendations for the generated policies (display a list of common mistakes for specific situations)

## Notes

- Currently this is a very much WIP repo that I am working on for fun. If you are interested in contributing, feel free to ping me on [LinkedIn](https://www.linkedin.com/in/jay-dhulia/).
- I am mainly building this for fun and as a way to learn, so don't expect anything too much :)

## Project Status

### Progress so far

- AWS Service is now searchable and can be selected
- Based on the AWS Service selected, actions can be selected

### Next items on the list

- Allow users to remove actions
- Prevent duplicate actions
- Change in service -> figure out what should be the best approach
- Allow users to add statements
- Resources
- Conditions
- Show output on right (JSON, TerraForm, YAML etc dropdown)
- Dropdown on left for selecting creating a policy from a template vs creating from scratch
- Generate actions from CRUD operations

## Credit

The dataset used in this repo is originally generated from: https://github.com/iann0036/iam-dataset.
