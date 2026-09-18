# Stage 1: Build the static Docusaurus site
FROM node:lts-bookworm-slim AS builder
WORKDIR /app
COPY wrangles-docs/package.json wrangles-docs/package-lock.json ./
RUN npm ci
COPY wrangles-docs/ .
COPY registry /registry
RUN npm run build

# Stage 2: Lightweight Python runtime for static serving + recipe execution
FROM python:3.11-slim-bookworm
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=3000

COPY wrangles-docs/requirements.txt ./
RUN python -m pip install --no-cache-dir --disable-pip-version-check --no-compile -r requirements.txt

COPY wrangles-docs/run_recipe.py ./run_recipe.py
COPY wrangles-docs/start_prod.py ./start_prod.py
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["python", "./start_prod.py"]
