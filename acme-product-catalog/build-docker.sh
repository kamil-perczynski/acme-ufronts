#!/bin/bash

docker buildx build \
  --push \
  --tag 462027713001.dkr.ecr.eu-north-1.amazonaws.com/acme-product-catalog:latest \
  --platform linux/amd64,linux/arm64 .
