.PHONY: help install dev build preview docker-build docker-run docker-stop clean

# Default target
.DEFAULT_GOAL := help

# Variables
IMAGE_NAME := h3ow3d-actions-dashboard
CONTAINER_NAME := h3ow3d-dashboard
PORT := 8080

help: ## Show this help message
	@echo "h3ow3d Actions Dashboard - Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Run development server (npm)
	npm run dev

build: ## Build for production
	npm run build

preview: ## Preview production build locally
	npm run preview

docker-build: ## Build Docker image
	docker build -t $(IMAGE_NAME) .

docker-run: ## Run Docker container
	@echo "Starting dashboard on http://localhost:$(PORT)"
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):80 \
		--restart unless-stopped \
		$(IMAGE_NAME)
	@echo "Dashboard running at http://localhost:$(PORT)"

docker-stop: ## Stop and remove Docker container
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	docker rm $(CONTAINER_NAME) 2>/dev/null || true

docker-logs: ## View Docker container logs
	docker logs -f $(CONTAINER_NAME)

docker-restart: docker-stop docker-run ## Restart Docker container

docker-rebuild: docker-stop docker-build docker-run ## Rebuild and restart Docker container

docker-shell: ## Open shell in running container
	docker exec -it $(CONTAINER_NAME) sh

clean: ## Clean build artifacts and node_modules
	rm -rf dist node_modules

lint: ## Run linter
	npm run lint

# Quick shortcuts
up: docker-rebuild ## Quick rebuild and run (alias)
down: docker-stop ## Quick stop (alias)
logs: docker-logs ## Quick logs (alias)
