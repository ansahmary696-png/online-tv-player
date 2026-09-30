#!/usr/bin/env bash
set -e

cp .env.production.example .env
docker compose up --build -d
docker compose ps
