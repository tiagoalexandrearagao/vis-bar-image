# Looker - Visualizações Personalizadas

![](docs/graphic.jpg)

Projeto para criação de gráficos personalizados para o Looker

> ### **1 - Organização de pastas e arquivos**

---

`**./dist/[name].js**`: Arquivo de distribuição.

`**manifest.lkml**`: Arquivo de configuração de dependências externas do Looker. O objeto de visualização é definido aqui

`**marketplace.json**`: Um arquivo JSON contendo informações que o instalador do Marketplace usa para configurar este projeto.

`**/src**`: Este diretório conterá todo o código-fonte da visualização.

`**/src/[nome do gráfico].js**`: Arquivo **principal** que importará o index.js da pasta da visualização

`**/src/charts/[pasta do gráfico]/index.js**`: O código-fonte da visualização.

> ### **2 - Documentação oficial**

---

[https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md](https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md)

> ### **3 - Configurar o gráfico no arquivo package.json**

---

**Declaração:**

```
 "scripts": {
    ...
    "[comando]": "yarn build --env.input='./src/[arquivo de entrada].js' --env.output='[arquivo de saída].js'"
    ....
  },
```

**Exemplo real de implementação:**

```
 "scripts": {
    ...
    "banner": "yarn build --env.input='./src/banner.js' --env.output='banner.js'"
    ....
  },
```

> ### **4 - Para gerar o JS de distribuição:**

---

**No prompt de comando, entre na raiz do projeto e execute:**

```
yarn [nome do gráfico]
```

**Exemplo real de execução:**

```
yarn banner
```
