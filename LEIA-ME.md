# Ítalo ERP 2.3 — simples para iPhone

Esta atualização foi feita a partir da versão 2.2, mantendo os mesmos arquivos, a mesma chave do LocalStorage (`italo_erp_v2_db`) e o mesmo formato de banco de dados (`schemaVersion: 2`). **Não precisa apagar os dados existentes.**

## Novidades

- **Adicionar produto:** nome, marca, IMEI/série (opcional, um por linha), quantidade, fornecedor, custo unitário e garantia em meses. Ao salvar, o estoque já recebe a quantidade. Para produtos com número de série, a quantidade acompanha a lista de números inseridos.
- **Editar produto:** a quantidade digitada significa **unidades adicionais**, não o total. Exemplo: 3 unidades atuais + 2 novas = 5.
- **Venda rápida:** digitar o nome do cliente diretamente, escolher um produto do estoque e a quantidade, definir preço, despesas extras, garantia do comprador e forma de pagamento. Escolher o IMEI no caso de produtos rastreados individualmente. Não há nova opção de venda sob encomenda.
- **A receber:** por padrão, a venda é considerada paga. Para valor não recebido, digite **0** no campo "Valor recebido"; para pagamento parcial, informe quanto já entrou. O saldo aparece na tela "A receber".
- **Recibo em texto:** gerado após salvar a venda; também fica acessível nos detalhes da venda. Botões para copiar ou abrir o WhatsApp com o texto preenchido. O cliente é selecionado no WhatsApp, sem necessidade de cadastrar seu número no ERP.
- **Indicadores clicáveis na tela inicial:** vendas do mês → vendas filtradas; lucro → financeiro; estoque → estoque; a receber → vendas com saldo pendente.
- **Interface iPhone:** campos com 16 px ou mais para evitar o zoom automático do Safari; formulários com rolagem e botão de salvar visível.

## Como publicar no GitHub Pages

1. **Faça backup no ERP atual** em **Mais → Configurações → Exportar backup**. Guarde o JSON no iCloud Drive ou no computador.
2. Extraia este ZIP.
3. Substitua **todos os arquivos** no mesmo repositório GitHub Pages em que você está testando o ERP 2.2 (inclusive `service-worker.js`). Não apague o repositório nem mude a URL atual.
4. Aguarde a implantação do GitHub Pages e atualize o Safari. Feche e reabra o web app instalado, se houver.
5. Teste com dados fictícios. Não limpe dados do Safari e não desinstale o app enquanto quiser preservar o conteúdo local.

## Observações importantes

- O sistema usa **somente LocalStorage** neste momento. Não há sincronização de dados entre iPhone e computador. O armazenamento pode ser perdido por limpeza de dados ou políticas do navegador.
- Não há login ou banco de dados no servidor. Use a versão como protótipo de testes e faça backup com frequência.
- Backups feitos nas versões 2.0, 2.1 e 2.2 continuam importáveis porque o formato interno do banco foi preservado.
- Vendas antigas, inclusive encomendas criadas anteriormente, permanecem no histórico; novas encomendas não podem ser criadas pela tela simplificada.
- O recibo é um comprovante comercial simples, não substitui documento fiscal quando obrigatório.
- O prazo de garantia cadastrado é apenas uma informação registrada pelo lojista; **não reduz garantias e direitos previstos em lei**.
- A métrica de lucro é gerencial/estimada e não substitui apuração contábil. Acesso via iPhone ainda requer testes no próprio Safari, além dos testes automatizados feitos em Chromium com viewport móvel.
