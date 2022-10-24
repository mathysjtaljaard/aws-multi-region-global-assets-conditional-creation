# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Notes:

### Access:

With the new AWS CDK v2 there is additional `resources` created. ECR (Elastic Container Registery) and also System Manager Params (SSM).

- Access Policy (Note: This is **`not`** the recommend `Least Privileged Access Model` but will get `cdk boostrap` to work )
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "cloudformation:*",
                "dynamodb:*",
                "ssm:*Parameter*",
                "iam:*",
                "cloudwatch:*",
                "ecr:*",
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/cdk-*"
        }
    ]
}
```

### Conditional Creation of S3 Bucket

- [Inspartional Came From This Article](https://loige.co/create-resources-conditionally-with-cdk/)

`TLDR;`

- Perform an S3 Bucket from Name lookup or do an Function Import Value
- - If bucket name is '' we will set the the S3 Bucket condition to true which relates to the creation of the bucket
- - if the bucket name isn't blank then the S3 Bucket condition is false and the bucket isn't created. 
- Now do a search again and use the given arn to setup your resources. 
- When deploying cross region, your conditional logic will look for the `global s3 resource` prior to creating it

---- 
More to come