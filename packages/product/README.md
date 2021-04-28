# Product microservice

## Overview

This service implements all operations connected with products sold at MyShop. As an example, I went with Minsk tours as products.

## Set up

- If run as a standalone repo, install dependencies `npm i`. Otherwise running `npm i` from the root is enough.

- Create initial tables with seed data: `npm run seed`

## Deployment

- Deploy with development bundle (unoptimized): `npm run deploy:dev`

- Deploy with production bundle (optimized): `npm run deploy:prod`
