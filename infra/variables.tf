variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-west-2"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "actions-dashboard"
}

variable "domain_name" {
  description = "Custom domain name for the dashboard (optional)"
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID (required if domain_name is set)"
  type        = string
  default     = ""
}

variable "cloudfront_price_class" {
  description = "CloudFront price class (PriceClass_All, PriceClass_200, PriceClass_100)"
  type        = string
  default     = "PriceClass_100" # US, Canada, Europe
}

variable "github_token_parameter_name" {
  description = "SSM Parameter name for GitHub token (optional - users can store in localStorage)"
  type        = string
  default     = ""
}

# GitHub App Configuration (for webhook support)
variable "github_webhook_secret" {
  description = "GitHub webhook secret for validating webhook signatures"
  type        = string
  sensitive   = true
  default     = ""
}

variable "github_app_id" {
  description = "GitHub App ID (optional - for future GitHub App integration)"
  type        = string
  default     = ""
}

variable "github_app_private_key" {
  description = "GitHub App private key (optional - for future GitHub App integration)"
  type        = string
  sensitive   = true
  default     = ""
}
