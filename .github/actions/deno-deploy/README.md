# Deno Deploy Action

This GitHub Action handles deployment of projects to Deno Deploy with automatic organization fallback support.

## Features

- **Automatic Organization Fallback**: If deploying to an organization fails (e.g., personal GitHub accounts), automatically falls back to personal account deployment
- **Clear Error Messages**: Provides helpful instructions when organization deployment fails
- **Project Management**: Create, deploy, and delete Deno Deploy projects
- **Environment Support**: Deploy to production or preview environments
- **Secure Environment Variables**: Support for .env files during deployment

## Organization Handling

When you specify an organization parameter (typically using `${{ github.repository_owner }}`), the action will:

1. **First attempt** to create/deploy the project under the specified organization
2. **If organization doesn't exist**, automatically fall back to your personal Deno Deploy account
3. **Provide clear guidance** on how to create the organization if desired

This is particularly useful when:
- Using the same workflow across personal and organization repositories
- Deploying from personal GitHub accounts that don't have matching Deno organizations
- Testing workflows before setting up proper organizations

## Usage

```yaml
- name: Deploy to Deno
  uses: ./.github/actions/deno-deploy
  with:
    action: deploy
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    project_name: my-project
    organization: ${{ github.repository_owner }}  # Automatic fallback if org doesn't exist
    entrypoint: worker/main.ts
    production: true
```

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `action` | Yes | `deploy` | Action to perform: 'deploy' or 'delete' |
| `token` | Yes | - | Deno Deploy access token |
| `project_name` | Yes | - | The Deno Deploy project name |
| `entrypoint` | No | `worker/main.ts` | The entrypoint script |
| `root` | No | `.` | The root directory of the script |
| `organization` | No | - | Organization to deploy to (with automatic fallback) |
| `env_file` | No | - | Path to .env file for deployment |
| `production` | No | `true` | Deploy to production (uses --prod flag) |

## Outputs

| Output | Description |
|--------|-------------|
| `deployment_url` | The deployment URL after successful deployment |

## Examples

### Deploy with Organization Fallback

```yaml
- uses: ./.github/actions/deno-deploy
  with:
    action: deploy
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    project_name: my-app
    organization: ${{ github.repository_owner }}
```

### Deploy to Personal Account Only

```yaml
- uses: ./.github/actions/deno-deploy
  with:
    action: deploy
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    project_name: my-app
    # No organization specified - deploys to personal account
```

### Delete Project

```yaml
- uses: ./.github/actions/deno-deploy
  with:
    action: delete
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    project_name: my-app
```

## Error Handling

If organization deployment fails, you'll see helpful output like:

```
⚠️  WARNING: Organization 'username' not found in Deno Deploy

Attempting to create project under personal account instead...
✅ Successfully created project under personal account

ℹ️  Note: To deploy to an organization in the future, create a team named
   'username' at https://dash.deno.com/account#organizations
```

If both organization and personal account deployment fail:

```
❌ ERROR: Failed to create project in both organization and personal account

To fix this issue, you have two options:

1. Create a Deno Deploy organization/team named 'username' at:
   https://dash.deno.com/account#organizations

2. Remove the organization parameter from your workflow to deploy to your personal account

For more information, see: https://docs.deno.com/deploy/manual/organizations
```

## Creating Deno Organizations

To create a matching organization for your GitHub account:

1. Go to [Deno Deploy Dashboard](https://dash.deno.com/account#organizations)
2. Click "New Organization"
3. Use the same name as your GitHub username/organization
4. Future deployments will automatically use the organization

## Requirements

- Deno Deploy account and access token
- GitHub Actions environment
- Deno-compatible project structure
