# --- Project MiniBlog DevOps Orchestrator ---
# Standard Makefile for high-end DevOps systems

.PHONY: help up down build test logs k8s-up k8s-down clean kind-setup argocd-setup

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# --- Docker Compose Commands ---

up: ## Start the system in development mode
	docker-compose up -d --build

down: ## Stop and remove all containers
	docker-compose down

build: ## Rebuild all docker images
	docker-compose build

logs: ## Follow all logs
	docker-compose logs -f

monitor: ## Start the monitoring stack (Prometheus/Grafana)
	docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d

# --- Testing & Quality ---

test-backend: ## Run backend unit tests
	cd backend && npm test

test-load: ## Run k6 load tests (Requires k6 installed)
	k6 run tests/load/performance.js

test-e2e: ## Run Playwright E2E tests
	cd frontend && npx playwright test

# --- Kubernetes & GitOps Commands ---

kind-setup: ## Initialize a local Kubernetes cluster using Kind
	bash scripts/setup-kind.sh

argocd-setup: ## Install ArgoCD and Argo Rollouts in the cluster
	kubectl create namespace argocd || true
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
	kubectl create namespace argo-rollouts || true
	kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

gitops-deploy: ## Apply the ArgoCD Application manifest
	kubectl apply -f gitops/miniblog-app.yaml

k8s-deploy: ## Deploy using traditional manifests
	kubectl apply -f k8s/

k8s-status: ## Check status of all K8s resources
	kubectl get all -n default

k8s-clean: ## Delete all K8s resources
	kubectl delete -f k8s/

# --- Utility ---

clean: ## Clean up logs and temporary files
	rm -rf backend/logs/*.log
	rm -rf frontend/dist
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

version: ## Show current system version
	@echo "MiniBlog DevOps System v1.2.0-Elite"
