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

## secretos para variables de entorno para mongo
```bash
aws ssm put-parameter  --name "/nest/dev/mongo/uri" --value "dev-password" --type SecureString
```

```bash
aws ssm get-parameter --name "/nest/dev/mongo/uri" --with-decryption
```

## secretos para variables de entorno para jwt

```bash
aws ssm put-parameter  --name "/nest/dev/jwt/secret" --value "dev-jwt-secret-super-safe" --type SecureString
```