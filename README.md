# Group 10D12 DO-48: Hospitality Management Application
## Division
D12
## Group
Group 10D12
## Project Number
DO-48
## Problem Statement
Deploy Hospitality App to Kubernetes

**Python • Docker • GitHub Actions • Kubernetes • AWS EKS**

A production-ready Hospitality Management REST API with automated CI/CD pipeline, containerized deployment, and Kubernetes orchestration on AWS.

[![CI-CD](https://github.com/distortion-12/hospitality-app-devops/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/distortion-12/hospitality-app-devops/actions/workflows/ci-cd.yaml)

## 🏗️ Architecture

```
┌─────────────────┐
│   Git Push      │
│    (main)       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│   GitHub Actions (CI/CD)    │
│  - Docker Build & Push      │
│  - K8s Deployment           │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   AWS EKS Cluster           │
│  - hospitality-api pods     │
│  - Rolling Updates          │
│  - Service & Ingress        │
└─────────────────────────────┘
```

## 📋 Overview

This project demonstrates:
- ✅ **FastAPI** backend for hospitality management
- ✅ **Docker** containerization with multi-stage builds
- ✅ **GitHub Actions** automated CI/CD pipeline
- ✅ **Kubernetes** deployment on AWS EKS
- ✅ **Zero-downtime** rolling updates
- ✅ **Infrastructure as Code** (IaC) with YAML manifests

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Docker & Docker Compose
- kubectl
- AWS credentials configured
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/distortion-12/hospitality-app-devops.git
   cd hospitality-app-devops
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv .venv
   .venv\Scripts\Activate.ps1  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run application:**
   ```bash
   python app/main.py
   ```
   API available at: `http://localhost:8000`

### Docker Build & Run

```bash
docker build -t hospitality-api:latest .
docker run -p 8000:8000 hospitality-api:latest
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/healthz` | Health check |
| `GET` | `/availability?room_type=standard` | Check room availability |
| `POST` | `/book` | Book a room |

**Example:**
```bash
curl "http://localhost:8000/availability?room_type=standard"
curl -X POST http://localhost:8000/book \
  -H "Content-Type: application/json" \
  -d '{"room_type": "standard", "nights": 2}'
```

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t hospitality-api:1.0.0 .
```

### Run Container
```bash
docker run -d \
  --name hospitality-api \
  -p 8000:8000 \
  hospitality-api:1.0.0
```

### View Logs
```bash
docker logs hospitality-api
```

## ☸️ Kubernetes Deployment

### Local Testing (Minikube)

```bash
# Start Minikube
minikube start

# Build and load image
docker build -t hospitality-api:latest .
minikube image load hospitality-api:latest

# Deploy manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get svc

# Access service
minikube service hospitality-api --url
```

### AWS EKS Deployment

The project automatically deploys to AWS EKS via GitHub Actions when pushing to `main` branch.

**Verify deployment:**
```bash
kubectl get deployment hospitality-api
kubectl get pods -l app=hospitality-api
kubectl get svc hospitality-api

# Check logs
kubectl logs -l app=hospitality-api --tail=50
```

**Describe deployment:**
```bash
kubectl describe deployment hospitality-api
kubectl describe svc hospitality-api
```

## 🔄 Rolling Updates

The CI/CD pipeline automatically triggers rolling updates on every push to main:

```bash
# Manual rolling update (if needed)
kubectl set image deployment/hospitality-api \
  hospitality-api=hospitality-api:v1.0.1

# Monitor rollout
kubectl rollout status deployment/hospitality-api
```

## 🔧 CI/CD Pipeline

### GitHub Actions Workflow

Located in `.github/workflows/ci-cd.yaml`

**Triggers:** Push to `main` branch

**Steps:**
1. Checkout code
2. Setup Docker Buildx
3. Build Docker image (tag: commit SHA)
4. Save image as artifact
5. Configure kubectl
6. Apply K8s manifests to EKS
7. Update deployment image

### Setup Instructions

1. **Add KUBECONFIG_CONTENT Secret:**
   - Go to GitHub Repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `KUBECONFIG_CONTENT`
   - Value: Base64-encoded kubeconfig file content
   ```bash
   # Get your kubeconfig
   cat ~/.kube/config
   ```

2. **Verify Workflow:**
   - Push to main branch
   - Check **Actions** tab for workflow run
   - Confirm all steps pass ✅

## 📁 Project Structure

```
hospitality-app-devops/
├── app/
│   ├── main.py              # FastAPI application
│   ├── __pycache__/
│   └── static/
│       ├── index.html       # Frontend
│       ├── app.js           # JavaScript
│       └── styles.css       # Styling
│
├── .github/
│   └── workflows/
│       └── ci-cd.yaml       # GitHub Actions workflow
│
├── k8s/
│   ├── deployment.yaml      # Kubernetes deployment
│   ├── service.yaml         # Kubernetes service
│   └── ingress.yaml         # Kubernetes ingress
│
├── terraform/
│   └── main.tf              # Terraform configuration for AWS infrastructure (EKS)
│
├── Dockerfile               # Container image definition
├── requirements.txt         # Python dependencies
├── commands.md              # Useful commands reference
└── README.md                # Project documentation

```

## 🛠️ Troubleshooting

### Pod fails to start
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Service not accessible
```bash
kubectl get svc hospitality-api
kubectl get endpoints hospitality-api
```

### Check image pull errors
```bash
kubectl get events --sort-by='.lastTimestamp'
```

### Rollback deployment
```bash
kubectl rollout history deployment/hospitality-api
kubectl rollout undo deployment/hospitality-api --to-revision=<number>
```

## 📊 Monitoring

### View all resources
```bash
kubectl get all -l app=hospitality-api
```

### Real-time pod logs
```bash
kubectl logs -f deployment/hospitality-api
```

### Pod resource usage
```bash
kubectl top pods -l app=hospitality-api
```

## 🔐 Security Notes

- ✅ Secrets encrypted in GitHub Actions
- ✅ KUBECONFIG_CONTENT masked in workflow logs
- ⚠️ Limit secret access to trusted contributors
- ✅ Use container image scanning in pre-production

## 📝 Environment Variables

Required environment variables (set in k8s deployment):
- `PORT`: API server port (default: 8000)

## Group Memebers
- TANISH ISRANI
- ABHISHEK GUPTA
- SOURABH PATEL
- SAMARTH PATIDAR
- YASH DASHORE
- RAMAKANT SINGH

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Push to branch
4. Create Pull Request
5. CI/CD pipeline runs automatically

## 📞 Support

For issues or questions:
- Check [commands.md](commands.md) for useful commands
- Review workflow logs in GitHub Actions
- Verify kubectl connectivity to EKS cluster

## 📄 License

This project is open source and available under the MIT License.
