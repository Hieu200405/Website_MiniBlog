#!/bin/bash

# --- Kind Cluster Setup Script (DevOps Elite) ---
# Supports Local Ingress and Multi-node simulation

CLUSTER_NAME="miniblog-cluster"

echo "🚀 Starting Kind cluster setup: $CLUSTER_NAME..."

# 1. Create Kind Cluster with Ingress Port Mapping
cat <<EOF | kind create cluster --name "$CLUSTER_NAME" --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
- role: worker
EOF

echo "✅ Cluster created. Installing Nginx Ingress Controller..."

# 2. Install Nginx Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

echo "⏳ Waiting for Ingress Controller to be ready (this may take a few minutes)..."

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=300s

echo "🎉 Kind Cluster is ready! You can now run 'make k8s-deploy' to start the app."
echo "Note: Map 'miniblog.local' to 127.0.0.1 in your /etc/hosts file."
