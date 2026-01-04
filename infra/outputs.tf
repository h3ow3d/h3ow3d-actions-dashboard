output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = module.frontend.s3_bucket_name
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = "arn:aws:s3:::${module.frontend.s3_bucket_name}"
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.frontend.cloudfront_domain_name
}

output "website_url" {
  description = "URL to access the dashboard"
  value       = module.frontend.website_url
}

output "certificate_arn" {
  description = "ARN of the ACM certificate (if using custom domain)"
  value       = module.frontend.certificate_arn
}

output "route53_record_name" {
  description = "DNS name of the Route53 record (if using custom domain)"
  value       = module.frontend.domain_name
}

# Lambda Function URLs
output "webhook_receiver_url" {
  description = "URL for GitHub webhook receiver (add this to your GitHub App webhook settings)"
  value       = aws_lambda_function_url.webhook_receiver.function_url
}

output "sse_handler_url" {
  description = "URL for SSE streaming endpoint (used by frontend to receive real-time updates)"
  value       = aws_lambda_function_url.sse_handler.function_url
}

# Lambda Function Names
output "webhook_receiver_function_name" {
  description = "Name of the webhook receiver Lambda function"
  value       = aws_lambda_function.webhook_receiver.function_name
}

output "sse_handler_function_name" {
  description = "Name of the SSE handler Lambda function"
  value       = aws_lambda_function.sse_handler.function_name
}
