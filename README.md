# Op-Intents

Intent based wallet architecture with account abstration.

## Features

- GPT bases chat bot with intent architecture
- Passkeys - (no private keys)
- Gasless transactions
- Instant cross chain transfers between OPBNB and BSC
- Transfer, swap and bridge tokens using the chatbot.

![ss](/opintents.png)

## Running the project locally

### Environment Variables

There are two environment variables files.

#### packages/client

\
In packages/client copy the contents of .env.example to .env.local

Use a new account for NEXT_PUBLIC_DEPLOYER and fund it with at least 1 BNB on
both BSC testnet and OPBNB testnet chains.

This way contract address will be same on both chains.

`UPSTASH_REDIS_REST_URL`= \
`UPSTASH_REDIS_REST_TOKEN`= \
`GOOGLE_CLIENT_ID`= \
`GOOGLE_CLIENT_SECRET`= \
`NEXTAUTH_URL`= http://localhost:3000 \
`NEXTAUTH_SECRET`= \
`NEXT_PUBLIC_DEPLOYER`= private key \
`OPENAI_KEY`=

#### packages/shared

\
In packages/shared copy the contents of .env.example to .env

`DEPLOYER_PRIVATE_KEY` = Same as NEXT_PUBLIC_DEPLOYER \

### Installation

In the root directory run

```bash
  yarn install
```

### Deploying contracts

In the root directory run

```bash
  yarn shared:deploy
```

### Building shared package

In the root directory run

```bash
  yarn shared:build
```

### Configuring client

\
Copy the

`AccountFactory address`, \
`BUSD address`, \
 `Swapper Address`

from the terminal to the file \
 `packages/client/src/services/passkeyService` to the respective variables at
the top.

### Running frontend

In the root directory run

```bash
  yarn client:dev
```
