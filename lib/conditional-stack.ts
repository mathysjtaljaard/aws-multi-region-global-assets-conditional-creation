import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_s3 as s3, CfnCondition, Fn } from 'aws-cdk-lib';


const bucket_name = 'mathysglobalbucket';
export class ConditionalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ConditionalQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const s3_bucket = s3.Bucket.fromBucketAttributes(this, 's3_bucket_from_name', { bucketName: bucket_name })

    const s3_bucket_exists = new CfnCondition(this, 'DoesS3BucketExist', {
      expression: Fn.conditionEquals(s3_bucket.bucketName, '')
    })
    //

    const the_bucket = new s3.Bucket(this, bucket_name, {
      versioned: true,
      bucketName: bucket_name,
    })

    const cfnBucket = the_bucket.node.defaultChild as s3.CfnBucket
    cfnBucket.cfnOptions.condition = s3_bucket_exists

  }
}
