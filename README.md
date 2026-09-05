# Movie Picture Pipeline

This repository contains a small React/Flask movie service together with the delivery automation used to run it on Kubernetes.

## Services

- `starter/frontend`: React client. The API base URL is supplied at image build time through `REACT_APP_MOVIE_API_URL`.
- `starter/backend`: Flask service with a movie catalog at `/movies` and individual records at `/movies/<id>`.

## Delivery design

The frontend and backend have separate GitHub Actions workflows. Pull requests run the relevant quality checks. Changes merged to `main` can build an image, publish that image to Amazon ECR, and release the same commit-tagged image to Amazon EKS.

For each service, linting and tests are separate jobs. The container job has both checks in its `needs` list, so a failed quality gate prevents publication. Kubernetes manifests are rendered with Kustomize and applied with `kubectl`.

AWS credentials are read from GitHub repository secrets; they are not stored in the repository.

## Local verification

### Frontend

```bash
cd starter/frontend
npm ci
npm run lint
CI=true npm test
docker build --build-arg REACT_APP_MOVIE_API_URL=http://localhost:5000 -t movie-frontend:local .
```

### Backend

```bash
cd starter/backend
pipenv install --dev
pipenv run lint
pipenv run test
docker build -t movie-backend:local .
```

### Intentional CI failure checks

The project keeps explicit switches for demonstrating that the pipeline stops on quality failures:

```bash
cd starter/frontend
FAIL_TEST=true CI=true npm test
FAIL_LINT=true npm run lint
```

```bash
cd starter/backend
FAIL_TEST=true pipenv run test
pipenv run lint-fail
```

Use these only when collecting failure-path evidence, then run the normal commands again.

## Kubernetes checks

After a deployment, useful checks include:

```bash
kubectl get pods
kubectl get services
kubectl rollout status deployment/frontend
kubectl rollout status deployment/backend
```

The frontend should display the movie titles returned by the backend. The API should return the catalog from `/movies`.

## Evidence

Fresh screenshots should be captured from the user's own GitHub Actions runs and deployed endpoints. The repository does not include comparison/example screenshots.

## AWS cleanup

When the exercise is complete, remove the temporary infrastructure with:

```bash
cd setup/terraform
terraform destroy
```

Terraform state and local environment directories should remain outside source control.
