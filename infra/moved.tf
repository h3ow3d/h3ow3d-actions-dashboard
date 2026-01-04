# Migrate existing resources into the frontend module

moved {
  from = aws_s3_bucket.dashboard
  to   = module.frontend.aws_s3_bucket.frontend
}

moved {
  from = aws_s3_bucket_public_access_block.dashboard
  to   = module.frontend.aws_s3_bucket_public_access_block.frontend
}

moved {
  from = aws_s3_bucket_versioning.dashboard
  to   = module.frontend.aws_s3_bucket_versioning.frontend
}

moved {
  from = aws_s3_bucket_lifecycle_configuration.dashboard
  to   = module.frontend.aws_s3_bucket_lifecycle_configuration.frontend
}

moved {
  from = aws_cloudfront_origin_access_control.dashboard
  to   = module.frontend.aws_cloudfront_origin_access_control.frontend
}

moved {
  from = aws_cloudfront_distribution.dashboard
  to   = module.frontend.aws_cloudfront_distribution.frontend
}

moved {
  from = aws_s3_bucket_policy.dashboard
  to   = module.frontend.aws_s3_bucket_policy.frontend
}
