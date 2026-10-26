# Ítalo ERP 2.5 — garantia simples

Versão de teste local baseada no ERP 2.4. **Não altera nem publica o sistema do GitHub automaticamente.**

## Mudança solicitada

- Cadastro de produto: um só campo **Garantia do aparelho**, texto livre e vazio para um novo produto. Sem fornecedor/fabricante separado nem prazos automáticos.
- Exemplos: `30 dias`, `1 ano Apple`, `3 meses restantes de garantia Apple`, `Garantia Apple até 22/01/2027`, `15 dias do fornecedor`.
- Na venda: um campo **Garantia informada ao cliente** também em texto livre; recebe como sugestão o que está salvo na ficha, mas pode ser editado ou apagado.
- No recibo de WhatsApp: imprime exatamente o texto escolhido na venda, sem inventar data de vencimento para frases livres.
- Registros existentes: fichas antigas com garantias separadas mostram ambos os valores no campo único, até o usuário revisar e salvar; vendas anteriores conservam seus dados e recibos.
- Na tela de estoque, mostra a descrição cadastrada.
- As demais funções de estoque, vendas, financeiro, IMEI e backup seguem disponíveis.

**A garantia legal do consumidor é independente do texto gerencial informado.**

## Testar na rede local sem ZIP

No Debian que hospeda a cópia de testes, mantenha os arquivos do ERP 2.4. É necessário substituir **apenas `app.js`** para testar esta alteração. Recomenda-se antes fazer um backup no menu do ERP e uma cópia do JavaScript anterior.

```bash
cd ~/italo-erp-teste
cp app.js app.js.anterior
# Depois de baixar o app.js novo para ~/Downloads:
cp ~/Downloads/app.js ./app.js
```

Se o servidor local ainda não estiver ativo:

```bash
cd ~/italo-erp-teste
python3 -m http.server 8765 --bind 0.0.0.0
```

No iPhone, com o mesmo Wi-Fi, abra `http://IP-DO-DEBIAN:8765/?teste=25` no Safari. Assim é possível atualizar o JavaScript sem publicar no GitHub. Confira: novo produto, edição de produto, venda com garantia e recibo WhatsApp.

**Não limpar os dados do Safari**: o LocalStorage é por navegador/endereço. O código mantém `italo_erp_v2_db` e `schemaVersion: 2`.

## Testes efetuados no ambiente de desenvolvimento

17 verificações automatizadas em Chromium móvel com página carregada em memória e LocalStorage simulado, cobrindo cadastro, edição, venda, estoque por IMEI, recibo e leitura/edição de dados legados. `node --check` sem erros. **Falta validação pelo Safari físico e HTTP real em sua rede local.**

## Publicar no GitHub Pages (pacote completo)

Este arquivo ZIP possui todos os arquivos necessários na raiz (não contém uma pasta adicional).

1. Faça **Exportar backup** no ERP atual antes de atualizar.
2. Extraia o ZIP e envie **todos os arquivos** à raiz do repositório GitHub Pages do ERP, substituindo os existentes.
3. Aguarde a publicação do Pages e reabra o site. Em caso de cache antigo, atualize novamente após alguns instantes e feche/reabra o app do iPhone.
4. Não limpe os dados do Safari nem desinstale o aplicativo: o armazenamento atual fica no LocalStorage, específico do endereço e navegador.

Arquivos do aplicativo: `index.html`, `app.js`, `styles.css`, `service-worker.js`, `manifest.webmanifest`, `icon-180.png`, `icon-192.png`, `icon-512.png`.
