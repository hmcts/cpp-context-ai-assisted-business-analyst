# cpp-context-ai-assisted-business-analyst

Fastify service for AI Assisted Business Analysis on HMCTS Common Platform.

## Local development

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Health check: `http://localhost:4550/cpp-context-ai-assisted-business-analyst/health`

Page: `http://localhost:4550/cpp-context-ai-assisted-business-analyst/`

## Pipeline

`azure-pipelines.yaml` follows the other context pipelines: pull requests run `ContextVerify`, and a push to `main` or `team/*` publishes the image.

The shared Java `context-validation` template is not used. That template builds a Maven WildFly image. This service publishes `Dockerfile` through `pipelines/image-publish.yaml` in `cpp-azure-devops-templates`.

Image:

```
crmdvrepo01.azurecr.io/hmcts/cpp-context-ai-assisted-business-analyst:<short-sha>
crmdvrepo01.azurecr.io/hmcts/cpp-context-ai-assisted-business-analyst:latest
```

## AKS

STE stack 20 is registered in `cpp-aks-deploy` as release `cpp-context-ai-assisted-business-analyst`, using the `springboot-app` chart on port 4550.

```
https://steccm20.ingress01.ste.nl.cjscp.org.uk/cpp-context-ai-assisted-business-analyst/
```
