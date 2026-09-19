# ONG Esperança Viva

Site institucional da ONG Esperança Viva, criado para apresentar a organização, divulgar seus projetos sociais e permitir o cadastro de voluntários e apoiadores.

## Funcionalidades

- Página inicial com apresentação da ONG e chamada para conhecer os projetos.
- Página de projetos sociais, voluntariado e formas de doação.
- Formulário de cadastro com validação nativa do navegador e mensagens de feedback.
- Salvamento automático do rascunho do formulário no `localStorage`.
- Registro local dos dez cadastros mais recentes no `localStorage`.
- Navegação entre telas com atualização dinâmica de conteúdo via JavaScript.
- Layout responsivo e recursos básicos de acessibilidade, como textos alternativos, labels e regiões com atualização anunciada.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica das páginas e formulários.
- **CSS3:** estilos, layout responsivo, estados de validação e menu adaptável.
- **JavaScript (ES Modules):** navegação, renderização, validação de campos e persistência local.
- **Web Storage API:** armazenamento de rascunhos e histórico no navegador.
- **Imagens JPG:** recursos visuais dos projetos e da apresentação institucional.

## Pré-requisitos

- Um navegador moderno com suporte a ES Modules e `localStorage`.
- Um servidor HTTP local para carregar os módulos JavaScript corretamente.
- Python 3, Node.js ou outra ferramenta capaz de servir arquivos estáticos. Não há dependências externas obrigatórias.

## Instalação e execução

1. Clone o repositório:

	```bash
	git clone https://github.com/lucasalvesbarreto-collab/super-octo-garbanzo.git
	cd super-octo-garbanzo
	```

2. Inicie um servidor HTTP local na raiz do projeto. Com Python 3:

	```bash
	python -m http.server 8000
	```

3. Abra `http://localhost:8000/html/index.html` no navegador.

Também é possível usar a extensão Live Server do VS Code ou outro servidor de arquivos estáticos. A execução direta pelo protocolo `file://` não é recomendada porque pode bloquear módulos JavaScript e recursos relativos.

## Build

O projeto utiliza Webpack para gerar os arquivos prontos para publicação na pasta `dist/`. O comando de build de produção é:

```bash
npm ci
npm run build
```

O script `npm run build` executa `webpack --mode production`, processa as três páginas HTML, empacota os módulos JavaScript e copia os diretórios `css/` e `imagens/` para `dist/`.

Para desenvolvimento, execute:

```bash
npm run dev
```

O servidor de desenvolvimento fica disponível em `http://localhost:8080`.

## Deploy

O deploy é feito no Netlify. A configuração está em `netlify.toml` e utiliza:

- **Build command:** `npm run build`;
- **Publish directory:** `dist`;
- **Node.js:** versão 20.

O diretório `dist/` é gerado durante o build e não deve ser versionado.

## CI/CD

O workflow `.github/workflows/ci-cd.yml` usa GitHub Actions e é executado em pull requests e em pushes para a branch `main`.

No CI, o workflow:

1. instala as dependências com `npm ci`;
2. executa `npm run build`;
3. armazena o conteúdo de `dist` como artefato.

No CD, após um push em `main`, o artefato validado é publicado no Netlify com `netlify-cli`. Para o deploy funcionar, o repositório GitHub precisa ter os seguintes secrets configurados:

- `NETLIFY_AUTH_TOKEN`;
- `NETLIFY_SITE_ID`.

Para validar a estrutura manualmente antes da publicação, execute:

```bash
python -m http.server 8000
```

## Testes

Não há suíte de testes automatizados configurada atualmente. A verificação manual mínima deve cobrir:

- abertura da página inicial;
- navegação para projetos e cadastro;
- validação de campos obrigatórios, e-mail, CPF, telefone e CEP;
- recuperação do rascunho após atualizar a página;
- confirmação de que o cadastro é salvo no armazenamento local;
- visualização em desktop e dispositivos móveis.

## Estrutura do projeto

```text
.
├── css/
│   └── style.css
├── html/
│   ├── cadastro.html
│   ├── index.html
│   └── projetos.html
├── imagens/
│   ├── apresentacao.jpg
│   ├── projeto-alimento.jpg
│   └── projeto-educacao.jpg
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── netlify.toml
├── package.json
├── package-lock.json
├── webpack.config.js
├── js/
│   ├── router.js
│   ├── storage.js
│   └── validacao.js
└── README.md
```

## Dados armazenados no navegador

O formulário utiliza duas chaves do `localStorage`:

- `ong-esperanca-viva:cadastro:rascunho`: dados preenchidos mas ainda não enviados.
- `ong-esperanca-viva:cadastro:historico`: histórico local limitado aos dez últimos cadastros.

Esses dados ficam apenas no navegador do usuário. O projeto não possui backend nem envia informações para um serviço externo.

## Versionamento e releases

O projeto adota Semantic Versioning no formato `MAJOR.MINOR.PATCH`:

- `MAJOR`: alteração incompatível com a versão anterior.
- `MINOR`: nova funcionalidade compatível.
- `PATCH`: correção ou melhoria compatível.

A release inicial é:

- **Tag:** `v1.0.0`
- **Mensagem da tag:** `release: versão inicial do projeto`
- **Commit associado:** `51682cb` (`first commit`)

As mensagens de commit seguintes devem seguir Conventional Commits, por exemplo `feat: adiciona seção de doações`, `fix: corrige validação do cadastro` e `docs: atualiza instruções de execução`.

## Contribuição

1. Crie uma branch para a alteração.
2. Faça mudanças pequenas e verificáveis.
3. Execute a validação manual descrita na seção de testes.
4. Registre o trabalho com uma mensagem no padrão Conventional Commits.
5. Abra um pull request descrevendo o comportamento alterado.

## Licença

Este projeto não possui uma licença de código aberto declarada no repositório no momento.
