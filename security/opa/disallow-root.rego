package kubernetes.admission

import data.kubernetes.modules

# Policy: Disallow containers from running as Root
# Reference: Elite DevOps Compliance Standard

deny[msg] {
    input.request.kind.kind == "Pod"
    container := input.request.object.spec.containers[_]
    not container.securityContext.runAsNonRoot
    msg := sprintf("Container '%v' in Pod '%v' is not allowed to run as root. Please set 'securityContext.runAsNonRoot: true'.", [container.name, input.request.object.metadata.name])
}

deny[msg] {
    input.request.kind.kind == "Pod"
    container := input.request.object.spec.containers[_]
    container.securityContext.runAsUser == 0
    msg := sprintf("Container '%v' in Pod '%v' is running as user 0 (Root). This is forbidden.", [container.name, input.request.object.metadata.name])
}
