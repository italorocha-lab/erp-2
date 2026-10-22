# Ítalo ERP 2.1 — protótipo PWA local

Aplicação simples para testar gestão de eletrônicos no iPhone e no computador. Funciona sem dependências, sem API e sem banco de dados remoto. **Não substitui o ERP original.**

## Atualização 2.1 (21/10/2026)

- O campo **Fornecedor principal** aparece no cadastro/edição de produtos. Você pode digitar o nome; se for novo, ele é criado automaticamente em Fornecedores, sem duplicar nomes equivalentes.
- Na tela **Entradas**, um fornecedor padrão pode vir preenchido a partir do produto; também é possível informar um novo fornecedor diretamente na entrada. O fornecedor real da compra pertence à entrada e pode diferir do fornecedor principal do produto.
- Os pop-ups, inclusive a **Nova venda**, agora têm conteúdo rolável no iPhone e rodapé de ações fixo e alcançável.
- Ao adicionar/remover itens da venda, o aplicativo preserva a posição de rolagem.
- O cache PWA mudou de versão para atualizar os arquivos no navegador.
- A chave de armazenamento e o formato do backup continuam **os mesmos**. Os produtos antigos permanecem válidos e podem receber um fornecedor principal na edição.

**Antes de atualizar:** salve um backup em Configurações; depois substitua os arquivos do repositório, mantendo o endereço do site. Não exclua dados do Safari para forçar atualização.

## Como testar

1. Abra `index.html` no computador para um teste inicial; para testar o modo instalado no iPhone, publique todos os arquivos em um site com HTTPS (por exemplo, um **novo repositório GitHub Pages**).
2. No Safari do iPhone, abra a URL da versão 2.0 e use **Compartilhar → Adicionar à Tela de Início**.
3. Em **Mais → Configurações**, toque em **Carregar demonstração** para testar com dados inventados.
4. Quando quiser cadastrar produtos reais, limpe a demonstração, crie os produtos, depois as **Entradas**; só então conclua vendas com estoque.
5. Faça **backup JSON** periodicamente. Os dados não sincronizam entre aparelhos.

## Como publicar sem substituir seu sistema atual

1. Crie um novo repositório chamado `erp-2` no GitHub.
2. Envie os arquivos `index.html`, `styles.css`, `app.js`, `service-worker.js`, `manifest.webmanifest` e os três ícones `.png` para a **raiz** do repositório.
3. Em Settings → Pages, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Depois que o Pages publicar, o endereço esperado terá o formato `https://SEU-USUARIO.github.io/erp-2/`. A URL real depende do nome e da publicação do repositório.
5. Abra a URL no Safari do iPhone e adicione à tela inicial.

## O que já está incluído

- Dashboard com valores do mês, estoque disponível, custo do estoque e valores a receber.
- Produtos com controle por IMEI/série ou por quantidade, alerta de estoque mínimo, SKU e preços padrão.
- Entradas com custo real, fornecedor e IMEI; bloqueio de duplicidade de série.
- Vendas com vários itens, alocação de custo FIFO por entrada, taxas, frete, outras despesas, valor recebido e cancelamento (com devolução lógica ao estoque).
- Encomendas sem baixa no estoque até a conclusão, com escolha do IMEI na finalização.
- Clientes, fornecedores, WhatsApp, despesas e receitas extras.
- Garantias vinculadas à venda e ao item, custo e status.
- Backup e importação JSON da própria versão 2.0; demo removível.
- Interface adaptada para tela pequena; service worker para disponibilizar a interface após primeiro carregamento online.

## Limitações intencionais da versão de testes

- **LocalStorage:** dados isolados por navegador e endereço. Limpar dados do site ou usar outro aparelho pode causar perda ou ausência de dados. Safari pode remover armazenamento em certas condições. Faça backup fora do navegador.
- **Sem login seguro:** por ser um protótipo sem backend, não use para dados confidenciais. O app não tem a senha `admin` do sistema anterior.
- **Backup do ERP antigo:** não é aceito automaticamente; será preciso conhecer e mapear o formato de dados original para uma migração futura.
- **Financeiro gerencial:** não faz conciliação bancária, contas parceladas, emissão fiscal ou regime de competência contábil completo. O resultado utiliza preços/custos/taxas/despesas registrados; mercadorias entram no resultado quando vendidas. Recebimentos são valores acumulados por venda.
- **Garantia:** controle operacional; a lei aplicável precisa ser observada separadamente.
- **Offline:** interface pode abrir offline após primeira instalação/carregamento e cache completo; não há sincronização, resolução de conflitos nem garantias de preservação dos dados do navegador.
- **Estornos e devoluções parciais:** não incluídos; cancelamento é da venda completa e bloqueado se houver garantia vinculada.

## Estrutura dos arquivos

- `index.html` — entrada do aplicativo
- `styles.css` — visual responsivo
- `app.js` — telas, validações, cálculos e LocalStorage
- `service-worker.js` — cache dos arquivos do aplicativo
- `manifest.webmanifest` — instalação PWA
- `icon-180.png`, `icon-192.png`, `icon-512.png` — ícones

## Segurança na atualização

Não altere o nome da chave `italo_erp_v2_db` nem a estrutura dos dados sem preparar migração. Nunca exclua o repositório original por causa deste protótipo. Antes de publicar uma versão nova, exporte um backup JSON e teste a importação em ambiente separado.
