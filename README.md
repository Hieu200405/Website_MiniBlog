# 🚀 MiniBlog: Elite DevOps & Fullstack Showcase

[![Backend CI](https://github.com/Hieu200405/Website_MiniBlog/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/Hieu200405/Website_MiniBlog/actions)
[![Frontend CI](https://github.com/Hieu200405/Website_MiniBlog/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Hieu200405/Website_MiniBlog/actions)
[![Security Scan](https://img.shields.io/badge/Security-Trivy%2FSnyk%2FCheckov-emerald)](https://github.com/Hieu200405/Website_MiniBlog/security)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MiniBlog is a high-end, production-ready Fullstack application designed as a **Gold Standard** for DevOps engineers. It integrates modern Web architecture with advanced automation, observability, and cloud-native practices.

---

## 💎 Elite Features

### 🎨 Modern Aesthetics
- **Glossmorphism UI**: High-end React frontend built with **Tailwind CSS v4** and **Framer Motion**.
- **DevOps Dashboard**: Real-time system status widget (API/DB health) integrated.
- **Dark Mode**: Premium default dark theme for developer focus.

### 🛡️ DevSecOps & Quality
- **Automated Security**: Integrated **Hadolint**, **Snyk**, **Checkov**, and **Trivy** in CI/CD.
- **Policy Enforcement**: **OPA (Open Policy Agent)** rules to prevent root-privilege containers.
- **Testing**: **Jest** integration tests, **k6** Load testing, and **Playwright** E2E user flow.

### ☁️ Cloud Native & GitOps
- **Kubernetes Ready**: Full manifests for **Deployment**, **Service**, **Ingress**, and **HPA**.
- **Helm Charts**: Flexible configuration management for multi-environment deployments.
- **GitOps Flow**: Configured for **ArgoCD** and **Argo Rollouts** (Canary Deployment).

---

## 🗺️ System Architecture (C4 Model)
Explore detailed diagrams in [DOCS.md](./DOCS.md).

---

## 🚀 Quick Start (DevEx)

Manage the entire system using our professional **Makefile**:

```bash
# 1. Start the system in development mode
make up

# 2. Start the Monitoring Stack (Grafana/Prometheus)
make monitor

# 3. Setup a local Kubernetes cluster (Kind)
make kind-setup

# 4. Run E2E Tests
make test-e2e
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Interactive API Docs**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs) (Swagger UI)
- **Grafana Dashboard**: [http://localhost:3001](http://localhost:3001) (admin/admin)

---

## 📂 Project Structure

```bash
Website_MiniBlog/
├── backend/            # Express API + Winston + Prom-client
├── frontend/           # React + Tailwind v4 + Playwright
├── k8s/                # Kubernetes Manifests (Prod-ready)
├── helm/               # Helm Charts (IaC)
├── monitoring/         # Prometheus & Grafana Configs
├── security/           # OPA Policies & Vault Sidecar
├── scripts/            # Automation (Kind, Setup)
├── tests/              # Load Testing (k6)
├── Makefile            # Project Orchestrator
└── README.md           # This document
```

---

## 🤝 Contribution & License

This project is open-source under the MIT License. Built with ❤️ for the DevOps Community.
