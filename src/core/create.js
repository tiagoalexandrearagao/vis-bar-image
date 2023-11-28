const fs = require("fs");
const path = require("path");

function appendScript(currentChartName) {
  const pathPackageJson = path.resolve("package.json");

  if (!arquivoExiste(pathPackageJson)) {
    console.error("Erro: O arquivo package.json não foi encontrado.");
    process.exit(1);
  }

  const packageJson = require(pathPackageJson);

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  let novaLinha = `yarn build --env.input='./src/${currentChartName}.js' --env.output='${currentChartName}.js'`;
  // Adiciona a nova linha ao bloco "scripts"
  packageJson.scripts[`${currentChartName}`] = novaLinha;

  // Escreve de volta ao arquivo package.json
  fs.writeFileSync(pathPackageJson, JSON.stringify(packageJson, null, 2));

  console.log(
    `Linha adicionada ao bloco "scripts" no arquivo package.json: ${novaLinha}`
  );
}

// Função para garantir que um diretório exista
function garantirDiretorio(diretorio) {
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
    console.log(`Diretório criado: ${diretorio}`);
  }
}

// Função para verificar se um arquivo existe
function arquivoExiste(caminho) {
  return fs.existsSync(caminho);
}

// Função para substituir uma palavra em um texto
function substituirPalavraNoTexto(texto, oldWord, newWordContent) {
  return texto.replace(
    new RegExp("\\b" + oldWord + "\\b", "g"),
    newWordContent
  );
}

function appendVisualizationManifest(chartExists, appendString) {
  try {
    const filePath = path.resolve("manifest.lkml");
    let fileContent = "";

    try {
      fileContent = fs.readFileSync(filePath, "utf8");
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error.message);
      return;
    }

    if (fileContent.includes(chartExists)) {
      console.log("A visualização ja existe no arquivo.");
      return;
    }

    let newContent = `${fileContent.trim()}\n\n
    ${appendString}
    `;

    try {
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log("Visualization adicionada ao arquivo com sucesso.");
    } catch (erroEscrita) {
      console.error("Erro ao escrever no arquivo:", erroEscrita.message);
    }
  } catch (error) {
    console.log("Erro ao criar uma visualization no arquivo manifest", error);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function deployContent(origem, destino) {
  try {
    // Ler o conteúdo do arquivo de origem
    const data = fs.readFileSync(origem, "utf8");

    // Encontrar o conteúdo entre os marcadores
    const inicio = data.indexOf("//BEGIN") + "//BEGIN".length;
    const fim = data.indexOf("//END");
    const conteudo = data.substring(inicio, fim).trim();

    // Ler o conteúdo do arquivo de destino
    let conteudoDestino = fs.readFileSync(destino, "utf8");

    // Encontrar os marcadores no arquivo de destino
    const inicioDestino = conteudoDestino.indexOf("//BEGIN");
    const fimDestino =
      conteudoDestino.indexOf("//END", inicioDestino) + "//END".length;

    // Substituir o conteúdo entre os marcadores no arquivo de destino
    conteudoDestino =
      conteudoDestino.substring(0, inicioDestino) +
      "//BEGIN\n" +
      conteudo +
      "\n//END" +
      conteudoDestino.substring(fimDestino);

    // Escrever de volta no arquivo de destino
    fs.writeFileSync(destino, conteudoDestino);

    console.log("Conteúdo substituído com sucesso!");
  } catch (err) {
    console.error("Erro:", err.message);
  }
}

// Função para copiar um arquivo de um diretório para outro e substituir uma palavra
function copiarArquivoSubstituirPalavra(
  origem,
  destino,
  oldWord,
  newWordContent
) {
  const origemPath = path.resolve(origem);
  const destinoPath = path.resolve(destino);

  garantirDiretorio(path.dirname(destinoPath));

  if (!arquivoExiste(origemPath)) {
    console.error(`Erro: O arquivo de origem não existe - ${origem}`);
    process.exit(1);
  }

  const originContent = fs.readFileSync(origemPath, "utf8");
  const conteudoDestino = substituirPalavraNoTexto(
    originContent,
    oldWord,
    newWordContent
  );

  fs.writeFileSync(destinoPath, conteudoDestino);

  console.log(`Criando arquivo do projeto: ${destino}`);
}

// Obter argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length < 1) {
  process.exit(1);
}

let chartName = args[0];
chartName = String(chartName).toLowerCase();

// Lista de arquivos a serem copiados
const arquivosParaCopiar = [
  {
    origem: "./src/core/pattern/file_initial.js",
    destino: `./src/${chartName}.js`,
    currentChartName: chartName,
  },
  {
    origem: "./src/core/pattern/path_initial/index.js",
    destino: `./src/charts/${chartName}/index.js`,
    currentChartName: chartName,
  },
  {
    origem: "./src/core/pattern/path_initial/common/index.js",
    destino: `./src/charts/${chartName}/common/index.js`,
    currentChartName: chartName,
  },
  {
    origem: "./src/core/pattern/style_initial/index.js",
    destino: `./src/charts/${chartName}/style/index.js`,
    currentChartName: chartName,
  },
  // Adicione mais arquivos conforme necessário
];

appendScript(chartName);

let chartExists = `id: "looker-${chartName}-marketplace"`;

let appendString = `
visualization: {
  id: "looker-${chartName}-marketplace"
  file: "/dist/${chartName}.js"
  label: "${capitalizeFirstLetter(chartName)}"
  dependencies: [
    "https://code.jquery.com/jquery-2.2.4.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js",
    "https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js",
  ]
}
`;

appendVisualizationManifest(chartExists, appendString);
// Copiar os arquivos
arquivosParaCopiar.forEach(({ origem, destino, currentChartName }) =>
  copiarArquivoSubstituirPalavra(origem, destino, "toReplace", currentChartName)
);

// Copiar o arquivo de origem para o destino e substituir a palavra

//teste deploy
// Chamada da função
const arquivoOrigem = "./src/origem.txt";
const arquivoDestino = "./src/destino.txt";

deployContent(arquivoOrigem, arquivoDestino);
