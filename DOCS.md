# MiniBlog Elite Architecture Documentation (C4 Model)

This document provides a high-level overview of the MiniBlog system architecture using the C4 model.

## 1. System Context Diagram
Describes how the MiniBlog system interacts with users and external entities.

```mermaid
graph TD
    User((Blogger / Reader))
    System[MiniBlog System]
    ExternalAPI[External CDN/Assets]

    User -- "Reads/Writes posts" --> System
    System -- "Loads assets" --> ExternalAPI
```

## 2. Container Diagram (Micro-services & Data Store)
Detailed view of the internal containers.

```mermaid
graph LR
    subgraph K8S_Cluster [Kubernetes / Docker Cluster]
        Frontend[Frontend - React/Vite]
        Backend[Backend - Node.js/Express]
        Database[(PostgreSQL Database)]
        Redis[(Optional: Redis Cache)]
        
        Prometheus[Prometheus Metrics]
        Grafana[Grafana Dashboard]
    end

    User((User)) -- "Browser (HTTPS)" --> Frontend
    Frontend -- "API Calls" --> Backend
    Backend -- "Queries" --> Database
    Backend -- "Cache/Session" --> Redis
    
    Prometheus -- "Scrapes Metrics" --> Backend
    Grafana -- "Visualizes" --> Prometheus
```

## 3. Deployment Architecture (GitOps Flow)
How code travels from developer to production.

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as GitHub (Dev Branch)
    participant CI as GitHub Actions (CI)
    participant Argo as ArgoCD (GitOps)
    participant K8s as Kubernetes Cluster

    Dev->>Git: git push
    Git->>CI: Trigger Workflow
    CI->>CI: Lint, Security Scan, Build Image
    CI->>Git: Update K8s Manifests (Optional)
    Argo->>Git: Poll for changes
    Argo->>K8s: Sync State (Apply manifests)
```

## 4. Security Architecture (DevSecOps)
```mermaid
graph TD
    Code[Source Code] --> Hadolint[Hadolint - Dockerfile]
    Code --> Snyk[Snyk - Dependencies]
    Code --> Checkov[Checkov - IaC]
    Build[Docker Image] --> Trivy[Trivy - Image Scan]
    Deploy[Deployment] --> OPA[OPA - Policy Check]
```
