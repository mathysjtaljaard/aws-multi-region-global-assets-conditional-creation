import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_s3 as s3, CfnCondition, CfnOutput, Fn, RemovalPolicy } from 'aws-cdk-lib';


const bucket_name = 'mathysglobalbucket';
export class ConditionalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Possibility 1
    /*
      1. Search for the bucket from the attributes such as arn or bucket name
      2. Define the conditional logic 
      3. Create the bucket conditionally
      4. Search for the bucket from the attributes such as arn or bucket name
    */
    let searchForS3BucketGivenName = s3.Bucket.fromBucketAttributes(this, 's3_bucket_from_name', { bucketName: bucket_name })

    const doesBucketExists = new CfnCondition(this, 'DoesS3BucketExist', {
      expression: Fn.conditionEquals(searchForS3BucketGivenName.bucketName, '')
    })

    // Possiblity 2
    /*
      1. Import the bucket arn using Fn.importValue()
      2. Define the conditional logic 
      3. Create the bucket conditionally
      4. Search for the bucket from the attributes such as arn or bucket name
    */
    /*
     const valueOfBucketOutputArnValue = Fn.importValue('mathysglobalbucket)
     const doesBucketExists = new CfnCondition(this, 'DoesS3BucketExist', {
       expression: Fn.conditionEquals(valueOfBucketOutputArnValue, '')
     })
    */
    const creatingBucketConditionally = new s3.Bucket(this, bucket_name, {
      versioned: true,
      bucketName: bucket_name,
      removalPolicy: RemovalPolicy.DESTROY
    })

    const cfnBucket = creatingBucketConditionally.node.defaultChild as s3.CfnBucket
    cfnBucket.cfnOptions.condition = doesBucketExists

    const createdBucket = s3.Bucket.fromBucketAttributes(this, 's3_bucket_from_name', { bucketName: bucket_name })

    // use this variable going forward for resources needing access to the S3 Bucket
    // outputs
    // Possible to use `Fn.importValue(exportName)` 

    new CfnOutput(this, 'S3BucketOutput', {
      value: createdBucket.bucketArn,
      exportName: 'mathysglobalbucket'
    })

  }
}
