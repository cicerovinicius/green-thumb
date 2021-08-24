# Greenthumb - Desafio

Desafio para a RedVentures desenvolvido por Cicero Vinicius, utilizando o webpack para melhor organizar os assets (css/scss, imagens e js) e o parcel para iniciar o servidor local.
Os assets podem ser encontrados na pasta "assets", dividos em "dist" (versão em produção, já minificado) e "src" (versão em desenvolvimento, scss por exemplo).

Para baixar as dependências é só utilizar:

```bash
npm install
```

E para rodar o projeto pode-se utilizar as seguintes formas:

### Parcel

```bash
npm run start
```

### Webpack
Utilizado para minificar os arquivos e compilar o Sass => CSS

```bash
npm run watch
```
ou o script abaixo para minificar os arquivos:

```bash
npm run prod
```

### PHP
Caso possua o PHP instalado na máquina você pode utilizar o comando abaixo para emular um servidor local:

```bash
php -S localhost:8000
```
trocando o "8000" pela porta desejada.


Ou simplesmente abrindo o arquivo "index.html" diretamente no navegador.
