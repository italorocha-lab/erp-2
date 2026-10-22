# Ítalo ERP 2.2 — versão de testes para iPhone

ERP local-first (HTML/CSS/JavaScript) para testes de operação. Os dados são salvos somente no navegador pelo `localStorage`. Não tem backend, login seguro nem sincronização entre dispositivos.

## Correções da versão 2.2

1. **Quantidade no cadastro:** Novo produto permite registrar estoque inicial imediatamente, sem mudar de tela. Na edição, o campo **Quantidade para adicionar** cria uma nova entrada e não substitui o estoque atual. A tela mostra o saldo atual. Deixar **0** salva apenas a ficha.
2. **Controle por IMEI:** Quando o produto está configurado **Por IMEI / número de série**, informe um IMEI por linha. A quantidade é automaticamente ajustada à contagem de linhas. O sistema exige um IMEI por unidade e bloqueia números repetidos no histórico. Para produtos que não têm IMEI, selecione **Por quantidade**.
3. **Fornecedores:** O fornecedor informado na ficha fica ligado à nova entrada criada pelo cadastro; outros fornecedores podem ser escolhidos no fluxo **Entradas**.
4. **Zoom e teclado do iPhone:** Campos agora usam tamanho de fonte de no mínimo 16px para evitar o zoom automático do Safari. O app não foca automaticamente o primeiro campo no celular. O rodapé do modal continua fixo, e o formulário tem rolagem própria; uma adaptação de altura usa a área visível quando o teclado é aberto. O zoom manual do iPhone permanece disponível.
5. **Persistência:** Produto e entrada inicial são gravados juntos na mesma operação de armazenamento; os registros são considerados na venda e no lucro estimado.

## Atualização no GitHub Pages

1. **ANTES DE ATUALIZAR, faça backup:** no ERP existente, abra **Mais → Configurações → Baixar backup** e guarde o arquivo JSON fora do Safari.
2. Extraia o ZIP. Envie para a raiz do **mesmo repositório** os arquivos `index.html`, `styles.css`, `app.js`, `service-worker.js`, `manifest.webmanifest` e os três ícones PNG, substituindo as versões anteriores.
3. Acesse o endereço de sempre no Safari e atualize a página. O cache do PWA foi incrementado para `v3`. Se o ícone da tela inicial ainda exibir a versão antiga, abra primeiro o site no Safari, atualize, feche o app instalado e abra novamente. **Não apague os dados do site, nem desinstale o PWA para forçar a atualização.**
4. Não é necessário importar backup na atualização normal no **mesmo endereço/navegador**. A chave `italo_erp_v2_db` e a estrutura de dados `schemaVersion:2` não foram alteradas.

## Como testar o produto do print que está com zero unidades

- Vá em **Estoque**, toque no lápis do produto **Teste**.
- Desça até **Adicionar unidades ao estoque**. O saldo atual será mostrado (por exemplo, **0 un.**).
- No campo **Quantidade para adicionar**, informe, por exemplo, `2`.
- Se o controle do produto for **Por quantidade**, não será necessário informar IMEI. Se for **Por IMEI**, preencha 2 IMEIs diferentes, um por linha.
- Confira o **Custo de compra por unidade** e o fornecedor, então toque em **Salvar produto**.
- A lista exibirá **2 un.**. Em **Vendas → Nova venda**, o produto estará disponível.

**Atenção:** se você editar um produto com 2 unidades em estoque e informar mais 3 em **Quantidade para adicionar**, o saldo passará para 5; essa operação não serve para corrigir/remover saldos. Para entradas subsequentes, também pode usar o botão `+` do estoque e a tela **Entradas**.

## Limitações

- Dados em `localStorage` são isolados por navegador, perfil e origem do site; **não** sincronizam do PC para o iPhone.
- Limpar dados do Safari ou certas políticas de armazenamento podem remover registros. Exporte backups frequentemente.
- Nenhuma alteração foi feita no ERP original publicado em `/sistema/`.
- Esta versão foi testada no Chromium com emulação de viewport móvel, não no Safari físico. Verifique foco, rolagem e comportamento do teclado no seu iPhone após publicar.
- Vendas concluídas exigem saldo em estoque. Encomendas podem ser registradas sem estoque físico e concluídas depois de receber os produtos.

## Estrutura

- `index.html`: estrutura HTML e metadados PWA
- `styles.css`: interface responsiva
- `app.js`: regra de negócio, operações de estoque/venda e persistência
- `service-worker.js`: cache de instalação/offline
- `manifest.webmanifest`: dados de instalação
- ícones: `icon-180.png`, `icon-192.png`, `icon-512.png`
