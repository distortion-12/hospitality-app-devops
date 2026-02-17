# Hospitality Management Application  
Python • Docker • Jenkins CI/CD • Kubernetes • AWS

A lightweight FastAPI-based Hospitality REST API deployed to Kubernetes with a zero-downtime rolling update strategy.

## Features

This project demonstrates the end-to-end deployment of a **Hospitality Management web application** built using **Python**.  
The application is containerized using **Docker**, deployed using **Kubernetes**, and automated through a **CI/CD pipeline with Jenkins**.  

## Endpoints

- `GET /healthz` - Health check
- `GET /availability?room_type=standard` - Check room availability
- `POST /book` - Book a room

Example request:

- **Backend:** Python 
- **Containerization:** Docker
- **CI/CD:** Jenkins
- **Orchestration:** Kubernetes (K8s)
- **Cloud:** AWS
- **Version Control:** Git

## Local build and run (Docker)

```bash
docker build -t hospitality-api:1.0.0 .
docker run --rm -p 8000:8000 hospitality-api:1.0.0
```

Test locally:

```bash
curl "http://localhost:8000/availability?room_type=standard"
```

## Minikube deployment

```bash
minikube start

docker build -t hospitality-api:1.0.0 .
minikube image load hospitality-api:1.0.0

kubectl apply -f k8s/
kubectl rollout status deployment/hospitality-api

minikube service hospitality-api --url
```

## Rolling update

```bash
# Build and load a new version
docker build -t hospitality-api:1.0.1 .
minikube image load hospitality-api:1.0.1

# Trigger the rolling update
kubectl set image deployment/hospitality-api hospitality-api=hospitality-api:1.0.1
kubectl rollout status deployment/hospitality-api
```

## CI/CD (GitHub Actions)

The workflow in [.github/workflows/ci-cd.yaml](.github/workflows/ci-cd.yaml) builds the Docker image and applies the Kubernetes manifests. It expects a repository secret named `KUBECONFIG_CONTENT` containing your kubeconfig file contents.
