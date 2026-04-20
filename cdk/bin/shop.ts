#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AWSShopStack } from "../lib/shop-stack";

const app = new cdk.App();
new AWSShopStack(app, "AWSShopStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
