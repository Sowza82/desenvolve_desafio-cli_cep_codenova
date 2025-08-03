const readline = require('readline');
const fetch = require('node-fetch');
const chalk = require('chalk')
const ora = require('ora').default;
const fs = require('fs');

const HISTORICO_PATH = './historico.json';

function validarCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

function salvarHistorico(endereco) {
  let historico = [];

  if (fs.existsSync(HISTORICO_PATH)) {
    historico = JSON.parse(fs.readFileSync(HISTORICO_PATH));
  }

  historico.push({ ...endereco, data: new Date().toLocaleString() });
  fs.writeFileSync(HISTORICO_PATH, JSON.stringify(historico, null, 2));
}

function exibirHistorico() {
  if (!fs.existsSync(HISTORICO_PATH)) {
    console.log(chalk.yellow("\nNenhum histórico encontrado."));
    return;
  }

  const historico = JSON.parse(fs.readFileSync(HISTORICO_PATH));

  console.log(chalk.cyan.bold("\n📜 Histórico de Consultas:"));
  historico.forEach((item, i) => {
    console.log(
      `${i + 1}. [${item.data}] - ${item.cep} - ${item.logradouro}, ${item.bairro} - ${item.cidade}/${item.estado}`
    );
  });
}

function buscarEnderecoporCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  return fetch(url)
    .then(response => response.json())
    .then(dados => {
      if (dados.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        DDD: dados.ddd,
      };
    });
}

function menu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(chalk.green.bold("\n== CONSULTA DE CEP =="));
  console.log("1. Consultar CEP");
  console.log("2. Ver histórico");
  console.log("3. Sair\n");

  rl.question("Digite o número da opção desejada: ", (respostaMenu) => {
    if (respostaMenu === '1') {
      rl.question("\nDigite o CEP (aceita com ou sem traço/ponto): ", (cep) => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (!validarCEP(cepLimpo)) {
          console.log(chalk.red("❌ CEP inválido. Informe exatamente 8 números."));

          rl.question("\nDeseja tentar novamente? (s/n): ", (resposta) => {
            rl.close();
            if (resposta.toLowerCase() === 's') menu();
            else console.log(chalk.magenta("👋 Encerrando o programa..."));
          });
          return;
        }

        const spinner = ora("🔎 Buscando endereço...").start();

        buscarEnderecoporCEP(cepLimpo)
          .then(endereco => {
            spinner.succeed("✅ Endereço encontrado!");
            console.log(chalk.cyan.bold('\n📍 Endereço:'));
            console.table(endereco);

            salvarHistorico(endereco);

            rl.question("\nDeseja fazer uma nova consulta? (s/n): ", (resposta) => {
              rl.close();
              if (resposta.toLowerCase() === 's') menu();
              else console.log(chalk.magenta("👋 Encerrando o programa..."));
            });
          })
          .catch(error => {
            spinner.fail("❌ Erro ao buscar o CEP.");
            console.log(chalk.red(`\nErro: ${error.message}`));
            rl.question("\nDeseja tentar novamente? (s/n): ", (resposta) => {
              rl.close();
              if (resposta.toLowerCase() === 's') menu();
              else console.log(chalk.magenta("👋 Encerrando o programa..."));
            });
          });
      });
    } else if (respostaMenu === '2') {
      exibirHistorico();
      rl.close();
      return menu();
    } else if (respostaMenu === '3') {
      console.log(chalk.magenta("👋 Saindo do programa..."));
      rl.close();
    } else {
      console.log(chalk.red("❌ Opção inválida. Tente novamente."));
      rl.close();
      return menu();
    }
  });
}

menu();
