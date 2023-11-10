const fs = require("fs");
const path = require("path");

function adicionarLinhaNoPackageJson(nomeChart) {
  const caminhoPackageJson = path.resolve("package.json");

  if (!arquivoExiste(caminhoPackageJson)) {
    console.error("Erro: O arquivo package.json não foi encontrado.");
    process.exit(1);
  }

  const packageJson = require(caminhoPackageJson);

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  let novaLinha = `yarn build --env.input='./src/${nomeChart}.js' --env.output='${nomeChart}.js'`;
  // Adiciona a nova linha ao bloco "scripts"
  packageJson.scripts[`${nomeChart}`] = novaLinha;

  // Escreve de volta ao arquivo package.json
  fs.writeFileSync(caminhoPackageJson, JSON.stringify(packageJson, null, 2));

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
function substituirPalavraNoTexto(texto, palavraOriginal, palavraNova) {
  return texto.replace(
    new RegExp("\\b" + palavraOriginal + "\\b", "g"),
    palavraNova
  );
}

// Função para copiar um arquivo de um diretório para outro e substituir uma palavra
function copiarArquivoSubstituirPalavra(
  origem,
  destino,
  palavraOriginal,
  palavraNova
) {
  const origemPath = path.resolve(origem);
  const destinoPath = path.resolve(destino);

  garantirDiretorio(path.dirname(destinoPath));

  if (!arquivoExiste(origemPath)) {
    console.error(`Erro: O arquivo de origem não existe - ${origem}`);
    process.exit(1);
  }

  const conteudoOrigem = fs.readFileSync(origemPath, "utf8");
  const conteudoDestino = substituirPalavraNoTexto(
    conteudoOrigem,
    palavraOriginal,
    palavraNova
  );

  fs.writeFileSync(destinoPath, conteudoDestino);

  console.log(
    `Arquivo copiado de ${origem} para ${destino} e palavra substituída: ${palavraOriginal} -> ${palavraNova}`
  );
}

// Obter argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error(
    "Uso: node copiarArquivoSubstituirPalavra.js <origem> <destino> <palavraOriginal> <palavraNova>"
  );
  process.exit(1);
}

const nome_grafico = args[0];

// Lista de arquivos a serem copiados
const arquivosParaCopiar = [
  {
    origem: "./src/core/pattern/file_initial.js",
    destino: `./src/${nome_grafico}.js`,
    nomeChart: nome_grafico,
  },
  {
    origem: "./src/core/pattern/path_initial/index.js",
    destino: `./src/charts/${nome_grafico}/index.js`,
    nomeChart: nome_grafico,
  },
  {
    origem: "./src/core/pattern/path_initial/common/index.js",
    destino: `./src/charts/${nome_grafico}/common/index.js`,
    nomeChart: nome_grafico,
  },
  // Adicione mais arquivos conforme necessário
];

adicionarLinhaNoPackageJson(nome_grafico);

// Copiar os arquivos
arquivosParaCopiar.forEach(({ origem, destino, nomeChart }) =>
  copiarArquivoSubstituirPalavra(origem, destino, "toReplace", nomeChart)
);

// Copiar o arquivo de origem para o destino e substituir a palavra
