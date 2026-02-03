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

## crear secretos para variables de entorno seguras

```bash
aws ssm put-parameter  --name "/nest/dev/db/password" --value "dev-password" --type SecureString
```

## actualizar secretos
```bash
aws ssm put-parameter-value --name "/nest/dev/db/password" --value "dev-password" --type SecureString --overwrite
```

## para ver el valor del secreto

```bash
aws ssm get-parameter --name "/nest/dev/db/password" --with-decryption
```