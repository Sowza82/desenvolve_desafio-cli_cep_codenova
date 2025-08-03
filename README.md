
---

# 🧾 CLI de Consulta de CEP 

## 💡 Objetivo

Construir uma ferramenta simples de linha de comando (CLI) usando Node.js para consultar informações de endereço a partir de um CEP, consumindo a API pública [ViaCEP](https://viacep.com.br).

---

## ⚙️ Funcionalidades

- Entrada de CEP via terminal (com ou sem traços/pontos)
- Validação automática do formato do CEP
- Busca de endereço via API do ViaCEP
- Exibição formatada dos dados no terminal
- Histórico de buscas salvos localmente
- Menu interativo com opção de repetir consulta ou sair

---

## 🚧 Etapas do Projeto

1. Inicializar o projeto Node.js:
   ```bash
   npm init -y

2. Criar o arquivo principal (index.js)


3. Usar node-fetch com async/await para consumir a API


4. Validar entrada do usuário com expressões regulares


5. Tratar erros como CEP inválido ou inexistente


6. Exibir dados formatados com console.log, chalk e console.table


7. Permitir múltiplas consultas com menu interativo


8. [Opcional] Publicar a ferramenta no NPM para uso global




---

🧪 Tecnologias e Habilidades Aplicadas

Node.js

JavaScript ES6+

fetch + async/await

Regex para validação

Promises e manipulação de erros

Leitura e escrita com fs

Terminal interativo com readline

Uso de bibliotecas externas: chalk, ora, node-fetch



---

🚀 Como Usar

1. Clonar o projeto

git clone https://github.com/Sowza82/desenvolve_desafio-cli_cep_codenova.git
cd desenvolve_desafio-cli_cep_codenova
npm install

2. Rodar o CLI

node index.js

3. Ou passar o CEP diretamente (em versões futuras)

node index.js 01001000


---
