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

## Workflow

GitHub Actions follow `service-cp-crime-hearing-results-validator`:

| File | When it runs |
|------|----------------|
| `.github/workflows/ci-draft.yml` | Pull request or push to `main` or `team/**` |
| `.github/workflows/ci-released.yml` | Published release, or a manual run from `main` |
| `.github/workflows/ci-build-publish.yml` | Shared jobs: version, `npm test`, Docker image |

A pull request runs the tests only. A push also builds `Dockerfile` and pushes:

```
ghcr.io/hmcts/cpp-context-ai-assisted-business-analyst:<version>
```

The same push calls Azure DevOps pipeline 460 with `artifactType=docker`. That pipeline checks out this commit and builds `Dockerfile` into:

```
crmdvrepo01.azurecr.io/hmcts/cpp-context-ai-assisted-business-analyst:<version>_<YYYYMMDDHHMMSS>
```

Version rules match the results validator. A release uses the tag. A `team/**` branch uses `<branch>-<short-sha>`. `main` uses `<package.json version>-<short-sha>`. The repository needs the `HMCTS_CP_ADO_PAT` secret, the same secret results-validator passes into pipeline 460.

## AKS

STE stack 98 is registered in `cpp-aks-deploy` as release `cpp-context-ai-assisted-business-analyst`, using the `springboot-app` chart on port 4550. It is enabled in `helmsman_vars/steccm98.env`.

```
https://steccm98.ingress01.ste.nl.cjscp.org.uk/cpp-context-ai-assisted-business-analyst/
```
