# ── Estágio 1: Build do React ──────────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Copia os arquivos de configuração das dependências primeiro
# para aproveitar o cache das camadas do Docker
COPY package.json package-lock.json ./

# Instala todas as dependências (dev + prod para o build)
RUN npm install

# Copia o restante do código fonte
COPY . .

# Gera o bundle estático na pasta /app/dist
RUN npm run build

# ── Estágio 2: Servidor de produção ───────────────────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app

# Instala o servidor estático 'serve' globalmente
# Isso garante que o container seja rápido e não precise baixar nada ao iniciar
RUN npm install -g serve

# Copia apenas a pasta 'dist' gerada no primeiro estágio
COPY --from=builder /app/dist ./dist

# Expõe a porta que o seu Jenkins está configurado para usar
EXPOSE 9526

# Comando para rodar o servidor servindo a pasta 'dist'
# -s: Modo Single Page Application (redireciona tudo para index.html, essencial para React Router)
# -l: Define a porta de escuta
CMD ["serve", "-s", "dist", "-l", "9526"]
