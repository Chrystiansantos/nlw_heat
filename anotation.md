# NLW HEAT

Irei instalar o ts-node-dev, após instalalo irei rodar o seguinte comando para criar o arquivo de configuracao do ts.

```
❯ yarn tsc --init
```

Para executar a apliacao dentro de package, irei criar um script com o seguinte codigo:

```
"dev": "ts-node-dev src/app.ts"
quando uso o prisma preciso desse --exit-child pra ele dar refresh no app
"dev": "ts-node-dev --exit-child src/app.ts"
```

## Instalando o Prisma ORM

Irei instalar a lid do prisma da seguinte forma

```bash
❯ yarn add prisma -D
# Para criar o arquivo de configuracao e uma pasta de schema do prisma
❯ yarn prisma init
```

### Criando uma table no prisma

Irei dentro do meu arquivo Schema.prisma e irei, fazer da seguinte forma para criar uma tabela e suas colunas

Dentro do meu src irei criar uma pasta chamada prisma com um arquivo index.ts que sera resposavel por fazer a conexão com o banco de dados

```ts
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
```

E agora irei importar dentro do meu service para fazer as querys na base de dados

```ts
// Nome do model
model User {
  // Aqui defino que o id e do tipo string, @id que ele e o id e que ele sera um uuid geravel
  id         String @id @default(uuid())
  name       String
  github_id  Int
  avatar_url String
  login      String

  // Aqui eu passo o nome da tabela
  @@map("users")
}
```

## Criando relacionamento no Prisma

Para criar o relacionamento basicamente preciso criar um campo na tabela e passar o nome do Model e ao dar um tab ele ira criar um relacionamento ou identar o codigo.

```
model User {
  id         String @id @default(uuid())
  name       String
  github_id  Int
  avatar_url String
  login      String

  // Aqui eu passo o nome da tabela
  @@map("users")
  messages Message[]
}

model Message {
  id         String   @id @default(uuid())
  text       String
  created_at DateTime @default(now())
  <!-- Um pra muitos -->
  user User @relation(fields: [user_id], references: [id])

  @@map("messages")
  user_id String
}

```

## Verificando os dado na base

Ao rodar o comando ele abrir um link no navegador para que conseguir verificar os dados cadastrados na base

```bash
❯ yarn prisma studio
```

```
  // Buscando e criando registro na tabela de user

  let user = await prismaClient.user.findFirst({
        where: {
          github_id: id
        }
      })

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            github_id: id,
            login,
            avatar_url,
            name,
          }
        })
      }
```

Após isso no meu terminal irei rodar o seguinte comando:

```bash
❯ yarn prisma migrate dev

```

## COnfigurando o github Oauth

## Configurando webSocket

Primeiro passo irei instalar o socket.io

```bash
❯ yarn add socket.io
❯ yarn add @types/socket.io -D
```

Dentro do meu app.ts, irei importar o http e o server de dentro do socket.io

```
import { Server } from 'socket.io'
import http from 'http'
```

E ai agora irei criar meu servidor com o http da seguinte forma, e irei passar o app pra dentro do servicer http e em seguida dentro do Server do socket irei passar o server http da seguinte forma:

```
const app = express();

const serverHttp = http.createServer(app);
const io = new Server(serverHttp)

<!-- Ao final do arquivo vou exportar o serverHttp e o io -->
export { serverHttp, io }
```

Ao final do app no app.listen() irei trocar para serverHttp.listen()

Pra ouvir o evento no front um exemplo basico sera da seguinte forma:

Agora no meu service onde desejo emitir um evento irei importar o io, e disparar da seguinte maneira:

```js
io.emit("new_message", infoWs);
```

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NLW HEAT</title>
  </head>

  <body>
    <script
      src="https://cdn.socket.io/4.3.2/socket.io.min.js"
      integrity="sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs"
      crossorigin="anonymous"
    ></script>
    <script>
      const socket = io("http://localhost:4000");
      socket.on("new_message", (data) => console.log(data));
    </script>
  </body>
</html>
```

## Usando Socker.io no front

Primeiro passo irei instalar a lib do socket da seguinte forma:

```
❯ yarn add socket.io-client
```

A seguir irei importar da seguitne forma:

```ts
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

// dessa forma irei ouvir as mensagens
socket.on("new_message", (newMessage) => {
  console.log(newMessage);
});
```

## Animação usando Moti.

Primero preciso instalar o moti usando o yarn.

```bash
❯ yarn add moti
❯ expo install react-native-reanimated
```

Agora dentro do meu arquivo babel config precisarei incluir o seguinte plugin:

```js
    plugins: ['react-native-reanimated/plugin'],
```

Dentro do meu componente animado irei importar o MotiView, para usar como View.

```tsx
import { MotiView } from "moti";

<MotiView
  // estado inicial da animacao
  from={{ opacity: 0, translateY: -50 }}
  // estado final da animacao
  animate={{ opacity: 1, translateY: 0 }}
  // duracao da animacao
  transition={{ type: "timing", duration: 700 }}
  style={styles.container}
>
  // Aqui dentro coloco os demais elementos do meu component
</MotiView>;
```

## Autenticação com github

Primeiro passo preciso instalar essas duas libs:

```bash
❯ expo install expo-auth-session expo-random
```

A seguir dentro do meu contexto responsavel por fazer o login irei importar tudo de dentro do expot-auth-session da seguinte maneira:

```
import * as AuthSession from 'expo-auth-session';
```

Irei no Github irei em developer setings e irei criar uma config usando o OAuth, apos preencher as informacoes ele ira me gerar a 2 chaves pra fazer a autenticacao:

Irei em app.json acrescentar o seguinte obj:

```json
"scheme": "app",
```

E a seguir dentro da minha funcao que executa o sign irei passar o seguinte codigo para me autenticar com o Github:

```ts
const CLIENT_ID = "";
const SCOPE = "user";

const authUrl = `http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

const signIn = async () => {
  console.log("signin");
  const { params } = (await AuthSession.startAsync({
    authUrl,
  })) as IAuthorizationResponse;

  console.log(params);
};
```

## Utilizando socket.io

Primeiro passo irei instalar utilizando o seguinte comando:

```bash
❯ yarn add socket.io-client
```

Irei dentro do meu componente no caso de mensagem irei importar o socket.io client.

import { io } from 'socket.io-client';

Para ouvir as mensagens irei fazer da seguinte forma:

```tsx
const socket = io(String(api.defaults.baseURL));

const messagesQueue: IMessage[] = [];

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
  console.log(newMessage);
});
```