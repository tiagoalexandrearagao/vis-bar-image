const fs = require("fs");
const path = require("path");

// Função para garantir que um diretório exista
function garantirDiretorio(diretorio) {
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
    console.log(`Diretório criado: ${diretorio}`);
  }
}

function arquivoExiste(caminho) {
  return fs.existsSync(caminho);
}

// Função para adicionar uma linha ao bloco "scripts" no arquivo package.json
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

// Função para copiar um arquivo de uma pasta para outra
function copiarArquivo(origem, destino, nomeChart) {
  const origemPath = path.resolve(origem);
  const destinoPath = path.resolve(destino);

  garantirDiretorio(path.dirname(destinoPath));

  if (arquivoExiste(destinoPath)) {
    console.error(
      `Erro: O arquivo ${destino} já existe no destino. A cópia foi interrompida.`
    );
    return;
  }

  const readStream = fs.createReadStream(origemPath);
  const writeStream = fs.createWriteStream(destinoPath);
  readStream.pipe(writeStream);

  console.log(`${origem} foi copiado para ${destino}`);
}

// Função para realizar a substituição de uma palavra em um arquivo
function substituirPalavraNoArquivo(caminho, palavraOriginal, palavraNova) {
  const conteudo = fs.readFileSync(caminho, "utf8");
  const novoConteudo = conteudo.replace(
    new RegExp("\\b" + palavraOriginal + "\\b", "g"),
    palavraNova
  );
  fs.writeFileSync(caminho, novoConteudo);
}

let nome_grafico = process.argv;
nome_grafico = nome_grafico[2];

adicionarLinhaNoPackageJson(nome_grafico);

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

// Copiar os arquivos
arquivosParaCopiar.forEach(({ origem, destino, nomeChart }) =>
  copiarArquivo(origem, destino, nomeChart)
);

arquivosParaCopiar.forEach(({ origem, destino, nomeChart }) =>
  substituirPalavraNoArquivo(destino, "toReplace", nomeChart)
);
