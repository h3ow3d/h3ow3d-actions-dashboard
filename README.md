# h3ow3d Actions Dashboard

Real-time GitHub Actions status dashboard for all h3ow3d repositories.

## Features

- 🔄 **Auto-refresh**: Updates every minute
- 🎨 **Visual Status**: Color-coded status indicators
- 📊 **Categorized View**: Organized by repository type (common, modules, infra, services)
- 🔗 **Quick Links**: Direct links to workflow runs
- 🔐 **Secure**: GitHub token stored locally in browser
- ⚡ **Fast**: Built with React + Vite
- 🐳 **Docker Ready**: Run in a container with one command

## Quick Start (Docker - Recommended)

The easiest way to run the dashboard:

```bash
# Build and run
make docker-build
make docker-run

# Or use docker-compose
docker-compose up -d
```

Dashboard will be available at http://localhost:8080

### Makefile Commands

```bash
make help              # Show all available commands
make install           # Install dependencies
make dev               # Run development server
make docker-build      # Build Docker image
make docker-run        # Run Docker container
make docker-stop       # Stop container
make docker-logs       # View container logs
make docker-rebuild    # Rebuild and restart
make up                # Quick rebuild and run
make down              # Quick stop
make clean             # Clean build artifacts
```

## Setup (Development)

1. **Install dependencies**:
   ```bash
   make install
   # or
   npm install
   ```

2. **Run development server**:
   ```bash
   make dev
   # or
   npm run dev
   ```

3. **Open in browser**: http://localhost:3000

## GitHub Token Configuration

When you first open the dashboard (either Docker or dev), it will ask for a GitHub Personal Access Token:

1. **Create token**: [Create here](https://github.com/settings/tokens/new?scopes=repo&description=h3ow3d-dashboard)
2. **Required scope**: `repo`
3. **Enter in dashboard**: Token is stored in browser localStorage
4. **Security**: Token never leaves your browser (only sent to GitHub API)

## Build for Production

```bash
# Build static files
make build

# Preview production build
make preview

# Build Docker image
make docker-build
```

## Docker Deployment

### Using Makefile (Recommended)
```bash
make docker-rebuild
```

### Using Docker Compose
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

### Manual Docker Commands
```bash
# Build
docker build -t h3ow3d-actions-dashboard .

# Run
docker run -d \
  --name h3ow3d-dashboard \
  -p 8080:80 \
  --restart unless-stopped \
  h3ow3d-actions-dashboard

# View logs
docker logs -f h3ow3d-dashboard

# Stop
docker stop h3ow3d-dashboard
docker rm h3ow3d-dashboard
```

## Features

### Status Indicators
- ✅ **Green**: Workflow succeeded
- ❌ **Red**: Workflow failed
- 🟠 **Orange**: Workflow in progress
- ⚠️ **Yellow**: Workflow completed with warnings
- ⚪ **Gray**: No runs or error

### Information Displayed
- Workflow name
- Branch name
- Latest commit message
- Link to workflow run
- Last update time

## Repository Categories

- **Common**: Shared workflows and templates
- **Modules**: Terraform infrastructure modules
- **Infra**: Infrastructure deployment
- **Services**: Application services

## Customization

To add or remove repositories, edit `REPOSITORIES` in `src/App.jsx`:

```javascript
const REPOSITORIES = {
  common: [
    { name: 'repo-name', description: 'Description' },
  ],
  // ... more categories
}
```

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- GitHub REST API

## License

MIT
