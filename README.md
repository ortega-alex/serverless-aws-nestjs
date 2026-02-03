# Serverless AWS

## Setup

```bash
npm install
```

## Commands

```bash
npm run server:deploy
npm run server:offline
npm run server:logs
npm run server:remove
```

## diagrama de lo que creamos

```
CloudFormation Stack
 ├── Lambda Function
 ├── API Gateway
 ├── IAM Role
 └── CloudWatch Logs
```