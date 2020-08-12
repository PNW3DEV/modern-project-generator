# ignw-project-generator
Project Generator - Micro-generator framework that makes it easy for an entire team to create web project files with a level of uniformity.


### Prerequisites
* NodeJS

### Getting Started
**Add ignw-project-generator to your project**
```
npm install --save-dev ignw-project-generator
```

## Usage
```
// package.json
{
  "scripts": {
      "plop": "plop --plopfile ./node_modules/project-generator/plopfile.ts"
  },
  ...
}
```
CLI Example: `npm run plop`

This command will scaffold/bootstrap the selected project using the template files in the plop generator repo.

## Full Example
```
> plop

? workspace: (Use arrow keys)
❯ create-react-app
  gatsby
  next
  node-backend-service
  node-express
  node-fastify
  node-gql
(Move up and down to reveal more choices)
? organization name test-org
? workspace name test-app
⠋ Install Dependencies
====================================
actions [
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/.env',
    templateFile: './templates/node-gql/.env',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/Dockerfile',
    templateFile: './templates/node-gql/Dockerfile',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/codegen.yml',
    templateFile: './templates/node-gql/codegen.yml',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/docker-compose.yaml',
    templateFile: './templates/node-gql/docker-compose.yaml',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/package.json',
    templateFile: './templates/node-gql/package.json',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/app.ts',
    templateFile: './templates/node-gql/src/app.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/middleware/limiter.middleware.ts',
    templateFile: './templates/node-gql/src/middleware/limiter.middleware.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/middleware/token.middleware.ts',
    templateFile: './templates/node-gql/src/middleware/token.middleware.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/server.ts',
    templateFile: './templates/node-gql/src/server.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/util/firebase.ts',
    templateFile: './templates/node-gql/src/util/firebase.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/util/logger.ts',
    templateFile: './templates/node-gql/src/util/logger.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/tsconfig.json',
    templateFile: './templates/node-gql/tsconfig.json',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/.env',
    templateFile: './templates/node-gql/.env',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/Dockerfile',
    templateFile: './templates/node-gql/Dockerfile',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/codegen.yml',
    templateFile: './templates/node-gql/codegen.yml',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/docker-compose.yaml',
    templateFile: './templates/node-gql/docker-compose.yaml',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/package.json',
    templateFile: './templates/node-gql/package.json',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/app.ts',
    templateFile: './templates/node-gql/src/app.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/middleware/limiter.middleware.ts',
    templateFile: './templates/node-gql/src/middleware/limiter.middleware.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/middleware/token.middleware.ts',
    templateFile: './templates/node-gql/src/middleware/token.middleware.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/server.ts',
    templateFile: './templates/node-gql/src/server.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/util/firebase.ts',
    templateFile: './templates/node-gql/src/util/firebase.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/src/util/logger.ts',
    templateFile: './templates/node-gql/src/util/logger.ts',
    force: true
  },
  {
    type: 'add',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app/tsconfig.json',
    templateFile: './templates/node-gql/tsconfig.json',
    force: true
  },
  {
    type: 'npmInstall',
    path: '/Users/desmondjones/code/github.com/project-generator/test-app',
    verbose: true
  }
]
====================================
✔  ++ /test-app/.env
✔  ++ /test-app/Dockerfile
✔  ++ /test-app/codegen.yml
✔  ++ /test-app/docker-compose.yaml
✔  ++ /test-app/package.json
✔  ++ /test-app/src/app.ts
✔  ++ /test-app/src/middleware/limiter.middleware.ts
✔  ++ /test-app/src/middleware/token.middleware.ts
✔  ++ /test-app/src/server.ts
✔  ++ /test-app/src/util/firebase.ts
✔  ++ /test-app/src/util/logger.ts
✔  ++ /test-app/tsconfig.json
✔  ++ /test-app/.env
✔  ++ /test-app/Dockerfile
✔  ++ /test-app/codegen.yml
✔  ++ /test-app/docker-compose.yaml
✔  ++ /test-app/package.json
✔  ++ /test-app/src/app.ts
✔  ++ /test-app/src/middleware/limiter.middleware.ts
✔  ++ /test-app/src/middleware/token.middleware.ts
✔  ++ /test-app/src/server.ts
✔  ++ /test-app/src/util/firebase.ts
✔  ++ /test-app/src/util/logger.ts
✔  ++ /test-app/tsconfig.json
... npm install
...
```
