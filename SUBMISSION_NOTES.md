# Submission checklist

This archive contains the application, CI/CD workflows, Kubernetes manifests, and the course infrastructure configuration.

## GitHub Actions secrets required

Create these repository secrets before running the CD workflows:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `BACKEND_ECR_REPOSITORY`
- `FRONTEND_ECR_REPOSITORY`
- `EKS_CLUSTER_NAME`
- `REACT_APP_MOVIE_API_URL`

`REACT_APP_MOVIE_API_URL` should contain the reachable backend LoadBalancer URL when deploying the frontend.

## Expected pipeline flow

1. Frontend CI: lint and tests run in parallel; the Docker build waits for both.
2. Backend CI: lint and tests run in parallel; the Docker build waits for both.
3. Frontend CD: quality checks -> Docker image -> ECR -> Kustomize -> EKS rollout.
4. Backend CD: quality checks -> Docker image -> ECR -> Kustomize -> EKS rollout.

All deployment images use the triggering Git commit SHA.

## Important

The Terraform state files and local `.terraform` directory are intentionally excluded from this archive. They should not be committed to source control.

Capture fresh screenshots from your own GitHub Actions runs and deployed endpoints for the final evidence. Do not reuse comparison/example screenshots.
