/* Ítalo ERP 2.0 — protótipo local-first, sem dependências externas.
   Dados ficam apenas no navegador atual. Esta versão NÃO possui autenticação de servidor. */
(() => {
'use strict';
const KEY = 'italo_erp_v2_db';
const VERSION = 2;
const CATEGORIES = ['Celular', 'Tablet', 'Notebook', 'Áudio', 'Smartwatch', 'Acessório', 'Outro'];
const WARRANTY_STATUS = {aberta:'Aberta',em_analise:'Em análise',finalizada:'Finalizada'};
const I = {
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
 box:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/>',
 cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 2h3l3 13h13l2-10H5"/>',
 wallet:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18m-6 5h3"/>',
 more:'<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 arrow:'<path d="m9 18 6-6-6-6"/>',
 close:'<path d="M18 6 6 18M6 6l12 12"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 chart:'<path d="M3 3v18h18M7 15l4-5 4 3 5-7"/>',
 trend:'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-11a3 3 0 0 1 0 6m1 1a5 5 0 0 1 3 5"/>',
 truck:'<path d="M3 5h11v13H3zM14 9h4l3 4v5h-7"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
 shield:'<path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="m19.5 9 1.4 1-1 3-1.7.3-.8 1.6.8 1.5-2.3 2.2-1.6-.9-1.6.7-.3 1.8h-3l-.3-1.8-1.6-.7-1.6.9-2.2-2.2.8-1.5-.8-1.6-1.7-.3-1-3 1.4-1 0-2 2.3-2.2 1.7.8 1.6-.7.3-1.8h3l.3 1.8 1.6.7 1.6-.8 2.3 2.2z"/>',
 download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
 upload:'<path d="M12 21V9m-4 4 4-4 4 4M4 7V3h16v4"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 warning:'<path d="m12 3 10 18H2zM12 9v5m0 3h.01"/>',
 edit:'<path d="m15 5 4 4M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L4.8 16.2z"/>',
 trash:'<path d="M4 7h16m-10 4v7m4-7v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
 file:'<path d="M5 3h10l5 5v13H5zM15 3v5h5M9 13h7M9 17h7"/>',
 bank:'<path d="m2 9 10-6 10 6M4 10v10m5-10v10m6-10v10m5-10v10M2 21h20"/>',
 layers:'<path d="m12 2 10 6-10 6L2 8zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v5m0-8h.01"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 receipt:'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8"/>',
 refresh:'<path d="M4 12a8 8 0 0 1 14-5l2 2m0-6v6h-6M20 12a8 8 0 0 1-14 5l-2-2m0 6v-6h6"/>'
};
const icon = (name) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${I[name]||I.box}</svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr = esc;
const money = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(n)||0);
const nfmt = n => new Intl.NumberFormat('pt-BR').format(Number(n)||0);
const amount = n => Math.round((Number(n)||0)*100)/100;
const nonneg = n => Number.isFinite(Number(n)) && Number(n)>=0;
const localDate = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const dateText = str => {if (!str) return '—'; const [y,m,d]=String(str).slice(0,10).split('-'); return y&&m&&d?`${d}/${m}/${y}`:'—';};
const monthKey = localDate().slice(0,7);
const toMonth = s => String(s||'').slice(0,7);
const uid = () => (globalThis.crypto?.randomUUID?.() || ('id-'+Date.now()+'-'+Math.random().toString(36).slice(2,10)));
const initial = () => ({schemaVersion:VERSION,products:[],entries:[],sales:[],clients:[],suppliers:[],expenses:[],warranties:[],settings:{businessName:'Ítalo Rocha'},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
const arrays = ['products','entries','sales','clients','suppliers','expenses','warranties'];
function validDB(o){return o && typeof o==='object' && o.schemaVersion===VERSION && arrays.every(k=>Array.isArray(o[k])) && o.settings && typeof o.settings==='object';}
let db; let storageError='';
try{ const value=localStorage.getItem(KEY); const parsed=value?JSON.parse(value):initial(); if(!validDB(parsed)) throw Error('Estrutura de dados incompatível.'); db=parsed; }catch(e){db=initial();storageError='Não foi possível ler os dados locais: '+e.message;}
let view='dashboard';let query='';let stockFilter='todos';let saleFilter='todos';let draftCart=[];let draftMode='concluida';let draftSaleFields={};let currentModal='';
const byId = (array,id) => array.find(x=>x.id===id);
const prod = id => byId(db.products,id);
const client = id => byId(db.clients,id);
const supplier = id => byId(db.suppliers,id);
const prodName = id => prod(id)?.name || 'Produto removido';
const clientName = id => client(id)?.name || 'Consumidor não informado';
const supplierName = id => supplier(id)?.name || 'Não informado';
const numericField = (fd,key,def=0) => {const raw=fd.get(key);if(raw===null||String(raw).trim()==='')return def; const num=Number(raw);if(!Number.isFinite(num)||num<0) throw Error('Valor inválido: '+key);return amount(num);};
const required = (fd,k,label) => { const v=String(fd.get(k)||'').trim(); if(!v)throw Error(`Informe ${label}.`);return v;};
function commit(mutator,message){
 try{
  const copy=structuredClone(db); mutator(copy); copy.updatedAt=new Date().toISOString();
  if(!validDB(copy))throw Error('Dados não passaram na validação.');
  localStorage.setItem(KEY,JSON.stringify(copy)); db=copy;storageError='';closeModal();render(); if(message) toast(message);return true;
 }catch(e){toast(e.message||'Erro ao salvar.','error');return false;}
}
let toastTimer;
function toast(message,type=''){const r=document.getElementById('toast-root');r.innerHTML=`<div class="toast ${type}">${esc(message)}</div>`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{r.innerHTML='';},4200);}
function available(productId, data=db){
 const product=byId(data.products,productId);
 const batches=data.entries.filter(e=>e.productId===productId).sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.createdAt).localeCompare(String(b.createdAt)));
 const usedSerials=new Set(),usedQty={};
 for (const s of data.sales.filter(s=>s.status==='concluida')) for (const item of (s.items||[])) if(item.productId===productId) for(const a of item.allocations||[]){
  if(a.serial)usedSerials.add(a.serial.toUpperCase()); else usedQty[a.entryId]=(usedQty[a.entryId]||0)+a.qty;
 }
 if(product?.tracking==='serial'){
  const serials=[];
  for (const e of batches) for (const serial of e.serials||[]) if(!usedSerials.has(String(serial).toUpperCase())) serials.push({serial,entryId:e.id,unitCost:e.unitCost});
  return {qty:serials.length,serials,batches:[]};
 }
 const freeBatches=batches.map(e=>({entryId:e.id,qty:Math.max(0,Number(e.quantity||0)-(usedQty[e.id]||0)),unitCost:e.unitCost})).filter(x=>x.qty>0);
 return {qty:freeBatches.reduce((a,b)=>a+b.qty,0),serials:[],batches:freeBatches};
}
function allocatedItems(items,data=db){
 const temp=structuredClone(data);
 const result=[];
 for(const item of items){
  const product=byId(data.products,item.productId);
  if(!product)throw Error('Produto não encontrado.');
  const quantity=Number(item.quantity);
  if(!Number.isInteger(quantity)||quantity<1)throw Error('Quantidade inválida.');
  const stock=available(product.id,temp);
  let alloc=[];
  if(product.tracking==='serial'){
   if((item.serials||[]).length!==quantity) throw Error(`Selecione o IMEI/nº de série de cada unidade de ${product.name}.`);
   for(const serial of item.serials){
    const unit=stock.serials.find(x=>x.serial.toUpperCase()===String(serial).toUpperCase());
    if(!unit||alloc.some(a=>a.serial.toUpperCase()===String(serial).toUpperCase())) throw Error(`IMEI/série ${serial} indisponível.`);
    alloc.push({entryId:unit.entryId,qty:1,serial:unit.serial,unitCost:unit.unitCost});
   }
  }else{
   let needed=quantity;
   for(const batch of stock.batches){ const take=Math.min(needed,batch.qty);if(take>0){alloc.push({entryId:batch.entryId,qty:take,unitCost:batch.unitCost});needed-=take;}if(needed===0)break; }
   if(needed>0)throw Error(`Estoque insuficiente para ${product.name}. Disponível: ${stock.qty}.`);
  }
  const newItem={productId:product.id,productName:product.name,quantity,serials:item.serials||[],unitPrice:amount(item.unitPrice),allocations:alloc};
  result.push(newItem);
  temp.sales.push({id:uid(),status:'concluida',items:[newItem]});
 }
 return result;
}
const saleTotal = s => amount((s.items||[]).reduce((sum,i)=>sum+Number(i.quantity||0)*Number(i.unitPrice||0),0));
const saleCost = s => amount((s.items||[]).reduce((sum,i)=>sum+(i.allocations||[]).reduce((a,x)=>a+Number(x.qty||0)*Number(x.unitCost||0),0),0));
const saleProfit = s => amount(saleTotal(s)-saleCost(s)-Number(s.fees||0)-Number(s.shipping||0)-Number(s.otherCosts||0));
const saleEffectiveDate = s => s.completedAt||s.date;
const completed = () => db.sales.filter(s=>s.status==='concluida');
function metrics(){
 const sales=completed().filter(s=>toMonth(saleEffectiveDate(s))===monthKey);
 const revenue=amount(sales.reduce((a,s)=>a+saleTotal(s),0));
 const costs=amount(sales.reduce((a,s)=>a+saleCost(s),0));
 const grossNet=amount(sales.reduce((a,s)=>a+saleProfit(s),0));
 const otherIncome=db.expenses.filter(e=>e.type==='receita'&&toMonth(e.date)===monthKey).reduce((a,e)=>a+Number(e.amount),0);
 const ops=db.expenses.filter(e=>e.type==='despesa'&&toMonth(e.date)===monthKey).reduce((a,e)=>a+Number(e.amount),0);
 const warrantyCost=db.warranties.filter(w=>toMonth(w.costDate||w.date)===monthKey).reduce((a,w)=>a+Number(w.cost||0),0);
 const profit=amount(grossNet+otherIncome-ops-warrantyCost);
 const stock=db.products.reduce((a,p)=>a+available(p.id).qty,0);
 const stockValue=amount(db.products.reduce((sum,p)=>{const a=available(p.id);return sum+(p.tracking==='serial'?a.serials.reduce((v,x)=>v+x.unitCost,0):a.batches.reduce((v,x)=>v+x.qty*x.unitCost,0));},0));
 const receivable=amount(completed().reduce((a,s)=>a+Math.max(0,saleTotal(s)-Number(s.amountPaid||0)),0));
 return {sales,revenue,costs,profit,stock,stockValue,receivable,orders:db.sales.filter(s=>s.status==='encomenda').length,openWarranty:db.warranties.filter(w=>w.status!=='finalizada').length};
}
function b(label,color='gray'){return `<span class="tag ${color}">${esc(label)}</span>`;}
function empty(heading,description,action='',label=''){return `<div class="empty"><div class="empty-icon">${icon('box')}</div><div class="empty-title">${esc(heading)}</div><p>${esc(description)}</p>${action?`<button class="btn btn-soft" data-action="${attr(action)}">${icon('plus')}${esc(label)}</button>`:''}</div>`;}
function personOptions(type,selected=''){ const arr=type==='clients'?db.clients:db.suppliers;return `<option value="">${type==='clients'?'Consumidor não informado':'Não informado'}</option>`+arr.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<option value="${attr(p.id)}" ${selected===p.id?'selected':''}>${esc(p.name)}</option>`).join('');}
function productOptions(selected=''){return '<option value="">Selecione um produto</option>'+db.products.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<option value="${attr(p.id)}" ${selected===p.id?'selected':''}>${esc(p.name)} · ${available(p.id).qty} disponível(is)</option>`).join('');}
function top(title,subtitle,actions='',eyebrow='SUA OPERAÇÃO'){return `<div class="page-top"><div><div class="eyebrow">${esc(eyebrow)}</div><h1 class="page-title">${esc(title)}</h1><p class="page-sub">${esc(subtitle)}</p></div><div class="header-actions">${actions}</div></div>`;}
const newButton=(label,action)=>`<button class="btn btn-primary" data-action="${action}">${icon('plus')}<span>${esc(label)}</span></button>`;
const labelIcon=(name,label)=>`${icon(name)}<span>${esc(label)}</span>`;
const NAV=[['dashboard','Início','home'],['stock','Estoque','box'],['sales','Vendas','cart'],['finance','Financeiro','wallet'],['more','Mais','more']];
function navRender(){
 const active= ['clients','suppliers','entries','warranties','settings'].includes(view)?'more':view;
 const all=[...NAV.slice(0,4),['entries','Entradas','layers'],['clients','Clientes','users'],['suppliers','Fornecedores','truck'],['warranties','Garantias','shield'],['settings','Configurações','settings']];
 document.getElementById('sidebar').innerHTML=`<div class="brand"><div class="brand-mark">IR</div><div><div class="brand-name">Ítalo ERP</div><div class="brand-sub">Gestão simples · v2.0</div></div></div><div class="side-group-title">PRINCIPAL</div>${all.map(([id,label,ico],i)=>`${i===4?'<div class="side-group-title">GERENCIAMENTO</div>':''}<button class="menu-btn ${view===id?'active':''}" data-action="nav" data-view="${id}">${icon(ico)}${esc(label)}</button>`).join('')}<div class="side-foot"><span class="dot"></span> Dados locais neste aparelho</div>`;
 document.getElementById('bottom-nav').innerHTML=NAV.map(([id,label,ico])=>`<button class="bottom-btn ${active===id?'active':''}" data-action="nav" data-view="${id}" ${active===id?'aria-current="page"':''}>${icon(ico)}<span>${label}</span></button>`).join('');
}
function render(){navRender();const main=document.getElementById('main'); const pages={dashboard:renderDashboard,stock:renderStock,sales:renderSales,finance:renderFinance,more:renderMore,clients:()=>renderPersons('clients'),suppliers:()=>renderPersons('suppliers'),entries:renderEntries,warranties:renderWarranties,settings:renderSettings}; main.innerHTML=(pages[view]||renderDashboard)();}
function renderDashboard(){
 const m=metrics(),recent=completed().slice().sort((a,b)=>String(saleEffectiveDate(b)).localeCompare(String(saleEffectiveDate(a)))).slice(0,5);
 const months=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];let d=new Date();
 const days=Array.from({length:7},(_,i)=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()-(6-i));const date=localDate(x);return {label:['dom','seg','ter','qua','qui','sex','sáb'][x.getDay()],total:completed().filter(s=>saleEffectiveDate(s)===date).reduce((sum,s)=>sum+saleTotal(s),0)};});
 const max=Math.max(1,...days.map(d=>d.total)); const lows=db.products.filter(p=>p.minStock>0&&available(p.id).qty<=p.minStock);
 return top('Visão geral','Um resumo de tudo que acontece na sua loja.',`<button class="btn" data-action="export">${icon('download')}<span class="label-wide">Backup</span></button>`,`${months[d.getMonth()]} DE ${d.getFullYear()}`)+
 `<section class="hero"><div><div class="hero-label">PAINEL DE CONTROLE</div><h2>Seu negócio, na palma da mão.</h2><p>Cadastre, venda e acompanhe seus resultados em poucos toques.</p></div><button class="btn" data-action="open-sale">${icon('plus')} Nova venda</button></section>`+
 (storageError?`<div class="notice">${icon('warning')}<span>${esc(storageError)}</span></div>`:'')+
 `<section class="grid-kpis"><div class="kpi"><div class="kpi-top"><span class="kpi-label">Vendas do mês</span><span class="kpi-icon">${icon('cart')}</span></div><div class="kpi-value">${money(m.revenue)}</div><div class="kpi-foot">${m.sales.length} venda(s) concluída(s)</div></div>
 <div class="kpi"><div class="kpi-top"><span class="kpi-label">Resultado estimado</span><span class="kpi-icon green">${icon('trend')}</span></div><div class="kpi-value ${m.profit<0?'negative':''}">${money(m.profit)}</div><div class="kpi-foot">Após custos, despesas e garantias</div></div>
 <div class="kpi"><div class="kpi-top"><span class="kpi-label">Unidades em estoque</span><span class="kpi-icon amber">${icon('box')}</span></div><div class="kpi-value">${nfmt(m.stock)}</div><div class="kpi-foot">${money(m.stockValue)} em custo de compra</div></div>
 <div class="kpi"><div class="kpi-top"><span class="kpi-label">A receber</span><span class="kpi-icon red">${icon('wallet')}</span></div><div class="kpi-value">${money(m.receivable)}</div><div class="kpi-foot">${m.orders} encomenda(s) pendente(s)</div></div></section>`+
 `<div class="section-grid"><div class="stack"><div class="panel"><div class="panel-head"><div><h2 class="section-title">Movimento dos últimos 7 dias</h2><div class="section-note">Total vendido por dia, em R$</div></div></div><div class="panel-pad"><div class="bar-chart">${days.map(x=>`<div class="bar-col"><div class="bar-val">${x.total?money(x.total).replace('R$ ','').replace('R$ ',''):'—'}</div><div class="bar ${x.total?'':'zero'}" style="height:${Math.max(4,x.total/max*83)}%"></div><div class="bar-label">${x.label}</div></div>`).join('')}</div></div></div>
 <div class="panel"><div class="panel-head"><div><h2 class="section-title">Últimas vendas</h2><div class="section-note">Vendas mais recentes</div></div><button class="btn btn-link" data-action="nav" data-view="sales">Ver todas ${icon('arrow')}</button></div>${recent.length?recent.map(s=>`<div class="activity clickable" style="margin:0 19px" data-action="sale-detail" data-id="${attr(s.id)}"><div class="activity-icon">${icon('cart')}</div><div><div class="activity-title">${esc(clientName(s.clientId))}</div><div class="activity-sub">${esc(s.items.map(i=>i.productName).join(', '))} · ${dateText(saleEffectiveDate(s))}</div></div><div class="activity-right">${money(saleTotal(s))}</div></div>`).join(''):empty('Sem vendas ainda','Sua primeira venda aparecerá aqui.','open-sale','Registrar venda')}</div></div>
 <div class="stack"><div class="panel"><div class="panel-pad"><div class="mini-head"><h2 class="section-title">Acesso rápido</h2></div><div class="action-stack">${[['open-entry','Registrar entrada','layers'],['open-sale','Nova venda','cart'],['open-product','Cadastrar produto','box'],['open-warranty','Abrir garantia','shield']].map(([a,l,i])=>`<button class="action-tile" data-action="${a}"><span class="action-tile-left">${icon(i)}${esc(l)}</span>${icon('arrow')}</button>`).join('')}</div></div></div><div class="panel"><div class="panel-pad"><div class="mini-head"><h2 class="section-title">Atenção</h2>${m.orders+m.openWarranty+lows.length?b('Pendências','amber'):b('Tudo em dia','green')}</div>${[['Encomendas aguardando',m.orders,'sales'],['Garantias em andamento',m.openWarranty,'warranties'],['Produtos com estoque baixo',lows.length,'stock']].map(([l,n,v])=>`<div class="stat-pair"><span>${esc(l)}</span><button class="btn btn-link" data-action="nav" data-view="${v}"><strong>${n}</strong>${icon('arrow')}</button></div>`).join('')}</div></div></div></div>`+
 (!db.products.length?`<div class="notice info margin-top">${icon('info')}<span>Comece cadastrando um produto e uma entrada, ou carregue os <strong>dados de demonstração</strong> em Configurações para explorar o aplicativo.</span></div>`:'');
}
function renderStock(){
 let rows=db.products.filter(p=>(p.name+' '+p.sku+' '+p.brand+' '+p.category).toLowerCase().includes(query.toLowerCase())).filter(p=>stockFilter==='todos'||(stockFilter==='baixo'&&p.minStock>0&&available(p.id).qty<=p.minStock)||(stockFilter==='disponivel'&&available(p.id).qty>0)||(stockFilter==='zerado'&&available(p.id).qty===0)).sort((a,b)=>a.name.localeCompare(b.name));
 return top('Estoque','Celulares por IMEI e acessórios por quantidade.',newButton('Novo produto','open-product'))+
 `<div class="filter-line"><div class="searchbox">${icon('search')}<input class="input" data-search="1" placeholder="Buscar modelo, SKU ou marca" value="${attr(query)}" aria-label="Buscar produtos"/></div><select class="select" data-filter="stock" aria-label="Filtrar estoque"><option value="todos" ${stockFilter==='todos'?'selected':''}>Todos os produtos</option><option value="disponivel" ${stockFilter==='disponivel'?'selected':''}>Com estoque</option><option value="baixo" ${stockFilter==='baixo'?'selected':''}>Estoque baixo</option><option value="zerado" ${stockFilter==='zerado'?'selected':''}>Sem estoque</option></select></div>`+
 `<div class="panel">${rows.length?`<div class="table-wrap"><table><thead><tr><th>Produto</th><th>Tipo</th><th>Disponível</th><th>Preço padrão</th><th>Preço de custo</th><th class="right">Ações</th></tr></thead><tbody>${rows.map(p=>`<tr><td>${pTitle(p)}</td><td>${esc(p.category)}</td><td>${stockBadge(p)}</td><td class="money">${money(p.price)}</td><td class="money">${money(p.cost)}</td><td class="right"><button class="btn btn-sm" data-action="open-entry" data-id="${attr(p.id)}">${icon('plus')} Entrada</button> <button class="btn btn-sm" data-action="edit-product" data-id="${attr(p.id)}">${icon('edit')}</button></td></tr>`).join('')}</tbody></table></div><div class="card-list">${rows.map(p=>`<div class="list-card">${pTitle(p)}<div class="card-right"><div class="tr-main">${money(p.price)}</div>${stockBadge(p)}<div style="margin-top:7px"><button class="btn btn-sm" data-action="edit-product" data-id="${attr(p.id)}">${icon('edit')}</button><button class="btn btn-sm btn-soft" data-action="open-entry" data-id="${attr(p.id)}">${icon('plus')}</button></div></div></div>`).join('')}</div>`:empty('Nenhum produto encontrado','Cadastre um produto para começar a controlar as entradas.','open-product','Cadastrar produto')}</div>`;
}
const pTitle=p=>`<div class="item-with-logo"><div class="item-logo ${p.tracking==='serial'?'':'violet'}">${esc(p.name.substring(0,2).toUpperCase())}</div><div><div class="item-name">${esc(p.name)}</div><div class="item-meta">${esc(p.brand||p.category)}${p.sku?' · '+esc(p.sku):''}</div></div></div>`;
const stockBadge=p=>{const q=available(p.id).qty;return b(`${q} un.`,q===0?'red':p.minStock>0&&q<=p.minStock?'amber':'green');};
function saleBadge(s){return s.status==='concluida'?b('Concluída','green'):s.status==='encomenda'?b('Encomenda','amber'):b('Cancelada','red');}
function renderSales(){
 const rows=db.sales.filter(s=>saleFilter==='todos'||s.status===saleFilter).filter(s=>(clientName(s.clientId)+' '+(s.items||[]).map(i=>i.productName+' '+i.serials.join(' ')).join(' ')).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>String(b.createdAt||b.date).localeCompare(String(a.createdAt||a.date)));
 return top('Vendas','Registre suas vendas e acompanhe encomendas.',newButton('Nova venda','open-sale'))+`<div class="filter-line"><div class="searchbox">${icon('search')}<input class="input" data-search="1" placeholder="Buscar cliente, produto ou IMEI" value="${attr(query)}" aria-label="Buscar vendas"/></div><select class="select" data-filter="sales" aria-label="Filtrar vendas"><option value="todos" ${saleFilter==='todos'?'selected':''}>Todas as vendas</option><option value="concluida" ${saleFilter==='concluida'?'selected':''}>Concluídas</option><option value="encomenda" ${saleFilter==='encomenda'?'selected':''}>Encomendas</option><option value="cancelada" ${saleFilter==='cancelada'?'selected':''}>Canceladas</option></select></div><div class="panel">${rows.length?`<div class="table-wrap"><table><thead><tr><th>Cliente / Itens</th><th>Data</th><th>Valor</th><th>Resultado estimado</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(s=>`<tr><td><div class="tr-main">${esc(clientName(s.clientId))}</div><div class="tr-sub">${esc(s.items.map(i=>i.productName+(i.quantity>1?' x'+i.quantity:'')).join(', '))}</div></td><td>${dateText(saleEffectiveDate(s))}</td><td class="money">${money(saleTotal(s))}</td><td class="money ${s.status==='concluida'?'positive':''}">${s.status==='concluida'?money(saleProfit(s)):'—'}</td><td>${saleBadge(s)}</td><td><button class="btn btn-sm" data-action="sale-detail" data-id="${attr(s.id)}">Detalhes</button></td></tr>`).join('')}</tbody></table></div><div class="card-list">${rows.map(s=>`<div class="list-card clickable" data-action="sale-detail" data-id="${attr(s.id)}"><div class="item-with-logo"><div class="item-logo">${icon('cart')}</div><div><div class="item-name">${esc(clientName(s.clientId))}</div><div class="item-meta">${esc(s.items.map(i=>i.productName).join(', '))}</div><div class="item-meta">${dateText(saleEffectiveDate(s))}</div></div></div><div class="card-right"><div class="tr-main">${money(saleTotal(s))}</div>${saleBadge(s)}</div></div>`).join('')}</div>`:empty('Nenhuma venda encontrada','Registre uma venda ou encomenda.','open-sale','Nova venda')}</div>`;
}
function renderEntries(){
 const rows=db.entries.slice().sort((a,b)=>String(b.createdAt||b.date).localeCompare(String(a.createdAt||a.date)));
 return top('Entradas de estoque','Histórico de compras e recebimentos.',newButton('Nova entrada','open-entry'))+`<div class="panel">${rows.length?`<div class="table-wrap"><table><thead><tr><th>Produto</th><th>Data</th><th>Fornecedor</th><th>Quantidade</th><th>Custo total</th><th></th></tr></thead><tbody>${rows.map(e=>`<tr><td><div class="tr-main">${esc(prodName(e.productId))}</div><div class="tr-sub">${esc((e.serials||[]).join(', ').slice(0,110))}</div></td><td>${dateText(e.date)}</td><td>${esc(supplierName(e.supplierId))}</td><td>${e.quantity}</td><td>${money(e.quantity*e.unitCost)}</td><td><button class="btn btn-sm btn-danger" data-action="delete-entry" data-id="${attr(e.id)}">${icon('trash')}</button></td></tr>`).join('')}</tbody></table></div><div class="card-list">${rows.map(e=>`<div class="list-card"><div class="item-with-logo"><div class="item-logo violet">${icon('layers')}</div><div><div class="item-name">${esc(prodName(e.productId))}</div><div class="item-meta">${dateText(e.date)} · ${esc(supplierName(e.supplierId))}</div></div></div><div class="card-right"><div class="tr-main">${money(e.quantity*e.unitCost)}</div>${b(e.quantity+' un.','gray')}<div><button class="btn btn-sm btn-danger" data-action="delete-entry" data-id="${attr(e.id)}">${icon('trash')}</button></div></div></div>`).join('')}</div>`:empty('Nenhuma entrada','As entradas de estoque ficam registradas aqui.','open-entry','Registrar entrada')}</div>`;
}
function renderPersons(type){
 const isClient=type==='clients',arr=db[type].filter(x=>(x.name+' '+x.phone+' '+x.city).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));
 const title=isClient?'Clientes':'Fornecedores',singular=isClient?'cliente':'fornecedor';
 return top(title,isClient?'Contatos e histórico de compradores.':'Parceiros que fornecem suas mercadorias.',newButton('Novo '+singular,isClient?'open-client':'open-supplier'))+`<div class="filter-line"><div class="searchbox">${icon('search')}<input class="input" data-search="1" placeholder="Buscar nome, telefone ou cidade" value="${attr(query)}" aria-label="Buscar contatos"/></div></div><div class="panel">${arr.length?`<div class="table-wrap"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Cidade</th><th>Registros vinculados</th><th class="right">Ações</th></tr></thead><tbody>${arr.map(p=>`<tr><td class="tr-main">${esc(p.name)}</td><td>${esc(p.phone||'—')}</td><td>${esc(p.city||'—')}</td><td>${isClient?db.sales.filter(s=>s.clientId===p.id).length:db.entries.filter(e=>e.supplierId===p.id).length}</td><td class="right"><button class="btn btn-sm" data-action="edit-person" data-type="${type}" data-id="${attr(p.id)}">${icon('edit')} Editar</button>${p.phone?` <a class="btn btn-sm" href="https://wa.me/${esc(phoneDigits(p.phone))}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de ${attr(p.name)}">WhatsApp</a>`:''}</td></tr>`).join('')}</tbody></table></div><div class="card-list">${arr.map(p=>`<div class="list-card"><div class="item-with-logo"><div class="item-logo violet">${icon('users')}</div><div><div class="item-name">${esc(p.name)}</div><div class="item-meta">${esc(p.city||'Sem cidade')} · ${esc(p.phone||'Sem telefone')}</div></div></div><button class="btn btn-sm" data-action="edit-person" data-type="${type}" data-id="${attr(p.id)}">${icon('edit')}</button></div>`).join('')}</div>`:empty(`Nenhum ${singular} encontrado`,`Cadastre os dados do ${singular} para associar às movimentações.`,isClient?'open-client':'open-supplier','Adicionar '+singular)}</div>`;
}
function renderFinance(){
 const m=metrics(),period=db.expenses.filter(e=>toMonth(e.date)===monthKey),ops=period.filter(x=>x.type==='despesa').reduce((a,x)=>a+Number(x.amount),0),extra=period.filter(x=>x.type==='receita').reduce((a,x)=>a+Number(x.amount),0),warranty= db.warranties.filter(x=>toMonth(x.costDate||x.date)===monthKey).reduce((a,x)=>a+Number(x.cost||0),0);
 const rows=db.expenses.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
 return top('Financeiro','Veja o resultado das vendas e registre despesas.',newButton('Novo lançamento','open-expense'))+`<div class="grid-kpis"><div class="kpi"><div class="kpi-top"><span class="kpi-label">Receita com vendas</span><span class="kpi-icon">${icon('cart')}</span></div><div class="kpi-value">${money(m.revenue)}</div><div class="kpi-foot">Vendas concluídas no mês</div></div><div class="kpi"><div class="kpi-top"><span class="kpi-label">Mercadorias vendidas</span><span class="kpi-icon amber">${icon('box')}</span></div><div class="kpi-value">${money(m.costs)}</div><div class="kpi-foot">Custo das unidades vendidas</div></div><div class="kpi"><div class="kpi-top"><span class="kpi-label">Despesas operacionais</span><span class="kpi-icon red">${icon('wallet')}</span></div><div class="kpi-value">${money(ops+warranty)}</div><div class="kpi-foot">Inclui ${money(warranty)} de garantias</div></div><div class="kpi"><div class="kpi-top"><span class="kpi-label">Resultado do mês</span><span class="kpi-icon green">${icon('trend')}</span></div><div class="kpi-value ${m.profit<0?'negative':''}">${money(m.profit)}</div><div class="kpi-foot">Inclui ${money(extra)} em receitas extras</div></div></div>`+
 `<div class="notice info">${icon('info')}<span>O resultado é uma estimativa gerencial, não um extrato de caixa. Compras para estoque não são lançadas automaticamente como despesas; seu custo entra no resultado quando os itens são vendidos. Taxas e fretes são informados em cada venda.</span></div>`+
 `<div class="panel"><div class="panel-head"><h2 class="section-title">Lançamentos avulsos</h2><span class="badge-count">${rows.length} lançamento(s)</span></div>${rows.length?`<div class="table-wrap"><table><thead><tr><th>Descrição</th><th>Data</th><th>Categoria</th><th>Situação</th><th>Valor</th><th></th></tr></thead><tbody>${rows.map(e=>`<tr><td class="tr-main">${esc(e.description)}</td><td>${dateText(e.date)}</td><td>${esc(e.category)}</td><td>${b(e.paid?'Pago / recebido':'Pendente',e.paid?'green':'amber')}</td><td class="money ${e.type==='despesa'?'negative':'positive'}">${e.type==='despesa'?'-':'+'} ${money(e.amount)}</td><td><button class="btn btn-sm" data-action="edit-expense" data-id="${attr(e.id)}">${icon('edit')}</button></td></tr>`).join('')}</tbody></table></div><div class="card-list">${rows.map(e=>`<div class="list-card"><div class="item-with-logo"><div class="item-logo ${e.type==='despesa'?'orange':''}">${icon('wallet')}</div><div><div class="item-name">${esc(e.description)}</div><div class="item-meta">${dateText(e.date)} · ${esc(e.category)}</div></div></div><div class="card-right"><div class="tr-main ${e.type==='despesa'?'negative':'positive'}">${e.type==='despesa'?'-':'+'}${money(e.amount)}</div><button class="btn btn-sm" data-action="edit-expense" data-id="${attr(e.id)}">${icon('edit')}</button></div></div>`).join('')}</div>`:empty('Nenhum lançamento','Despesas operacionais e receitas extras aparecerão aqui.','open-expense','Registrar lançamento')}</div>`;
}
function renderWarranties(){
 const rows=db.warranties.slice().sort((a,b)=>String(b.createdAt||b.date).localeCompare(String(a.createdAt||a.date)));
 return top('Garantias','Acompanhe solicitações, custos e resoluções.',newButton('Abrir garantia','open-warranty'))+`<div class="notice info">${icon('info')}<span>Registre a garantia legal do cliente separadamente de eventuais coberturas do fabricante e do fornecedor. Os prazos dependem do tipo de problema e das regras aplicáveis.</span></div><div class="panel">${rows.length?`<div class="table-wrap"><table><thead><tr><th>Produto / Cliente</th><th>Aberta em</th><th>Problema</th><th>Custo</th><th>Situação</th><th></th></tr></thead><tbody>${rows.map(w=>`<tr><td><div class="tr-main">${esc(prodName(w.productId))}</div><div class="tr-sub">${esc(clientName(w.clientId))}${w.serial?' · '+esc(w.serial):''}</div></td><td>${dateText(w.date)}</td><td>${esc(w.problem)}</td><td>${money(w.cost)}</td><td>${b(WARRANTY_STATUS[w.status]||w.status,w.status==='finalizada'?'green':'amber')}</td><td><button class="btn btn-sm" data-action="edit-warranty" data-id="${attr(w.id)}">${icon('edit')}</button></td></tr>`).join('')}</tbody></table></div><div class="card-list">${rows.map(w=>`<div class="list-card"><div class="item-with-logo"><div class="item-logo orange">${icon('shield')}</div><div><div class="item-name">${esc(prodName(w.productId))}</div><div class="item-meta">${esc(w.problem)} · ${dateText(w.date)}</div></div></div><div class="card-right">${b(WARRANTY_STATUS[w.status]||w.status,w.status==='finalizada'?'green':'amber')}<div style="margin-top:7px"><button class="btn btn-sm" data-action="edit-warranty" data-id="${attr(w.id)}">${icon('edit')}</button></div></div></div>`).join('')}</div>`:empty('Nenhuma solicitação','Abra uma garantia associando-a a uma venda concluída.','open-warranty','Abrir garantia')}</div>`;
}
function renderMore(){
 const extra=[['entries','Entradas de estoque','layers'],['clients','Clientes','users'],['suppliers','Fornecedores','truck'],['warranties','Garantias','shield'],['settings','Configurações e backup','settings']];
 return top('Mais opções','Todas as outras ferramentas do seu ERP.')+`<div class="more-grid">${extra.map(([v,t,i])=>`<button class="link-row" data-action="nav" data-view="${v}">${icon(i)}${esc(t)}<span class="end">${icon('arrow')}</span></button>`).join('')}</div><div class="notice info margin-top">${icon('info')}<span>Versão de testes: os dados ficam somente neste navegador e não sincronizam com outros dispositivos. Faça backups frequentes.</span></div>`;
}
function renderSettings(){
 return top('Configurações','Seus dados e ferramentas de teste.')+`<div class="settings-cards"><div class="settings-card">${icon('download')}<h3>Exportar backup</h3><p>Baixe todos os cadastros, entradas, vendas, despesas e garantias em um arquivo JSON. Guarde uma cópia fora do navegador.</p><button class="btn btn-primary" data-action="export">${icon('download')} Baixar backup</button></div>
 <div class="settings-card">${icon('upload')}<h3>Importar backup</h3><p>Restaure um arquivo exportado por <strong>esta versão 2.0</strong>. A importação substitui os dados atuais após confirmação.</p><button class="btn" data-action="choose-import">${icon('upload')} Escolher arquivo</button><input id="import-file" class="sr-only" type="file" accept=".json,application/json"/></div>
 <div class="settings-card">${icon('layers')}<h3>Dados de demonstração</h3><p>Preencha o ERP com exemplos fictícios de aparelhos, acessórios, vendas, clientes, entrada, despesa e garantia. Útil para testar as telas.</p><button class="btn" data-action="seed">${icon('plus')} Carregar demonstração</button></div>
 <div class="settings-card dangerzone">${icon('trash')}<h3>Apagar dados de teste</h3><p>Apaga os registros desta versão neste navegador. A operação não pode ser desfeita sem um backup.</p><button class="btn btn-danger" data-action="reset">${icon('trash')} Limpar todos os dados</button></div></div>
 <div class="notice margin-top">${icon('warning')}<span><strong>Atenção:</strong> LocalStorage não é um banco de dados seguro nem sincronizado. No Safari do iPhone, dados podem ser removidos ao limpar o histórico ou os dados do site, ou por políticas de armazenamento. Esta versão não tem login seguro e não deve ser usada para informações sensíveis. Faça backup antes de testes importantes.</span></div>
 <div class="panel panel-pad margin-top"><h2 class="section-title">Sobre a versão de testes</h2><p class="muted-block">ERP 2.0 · Dados armazenados sob a chave <code>${KEY}</code> · Modelo de dados v${VERSION}. Esta versão é independente do ERP original: os backups da versão antiga não são importados automaticamente.</p><div class="stat-pair"><span>Produtos</span><strong>${db.products.length}</strong></div><div class="stat-pair"><span>Entradas</span><strong>${db.entries.length}</strong></div><div class="stat-pair"><span>Vendas e encomendas</span><strong>${db.sales.length}</strong></div><div class="stat-pair"><span>Última alteração</span><strong>${esc(db.updatedAt?new Date(db.updatedAt).toLocaleString('pt-BR'):'—')}</strong></div></div>`;
}
function modalFrame(title,subtitle,fields,submitLabel='Salvar',size='',footer=''){
 currentModal=title;
 document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" data-backdrop="1"><div class="modal ${size}" role="dialog" aria-modal="true" aria-label="${attr(title)}"><div class="modal-header"><div><h2>${esc(title)}</h2>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div><button class="icon-btn" data-action="close-modal" aria-label="Fechar">${icon('close')}</button></div><form id="modal-form"><div class="modal-content">${fields}</div><div class="modal-footer"><button class="btn" type="button" data-action="close-modal">Voltar</button>${footer}<button class="btn btn-primary" type="submit">${icon('check')}${esc(submitLabel)}</button></div></form></div></div>`;
 setTimeout(()=>{document.querySelector('#modal-form input:not([type="hidden"]),#modal-form select')?.focus({preventScroll:true});},10);
}
function closeModal(){document.getElementById('modal-root').innerHTML='';currentModal='';draftCart=[];draftSaleFields={};}
const field=(name,label,value='',type='text',extras='')=>`<div class="field"><label for="f-${name}">${esc(label)}</label><input class="input" id="f-${name}" name="${name}" type="${type}" value="${attr(value)}" ${extras}/></div>`;
const selectField=(name,label,options,extra='')=>`<div class="field"><label for="f-${name}">${esc(label)}</label><select class="select" id="f-${name}" name="${name}" ${extra}>${options}</select></div>`;
function productModal(id=''){
 const p=prod(id)||{};const categories=CATEGORIES.map(c=>`<option ${p.category===c?'selected':''}>${c}</option>`).join('');
 const tracking=`<option value="serial" ${p.tracking==='serial'||!p.tracking?'selected':''}>Por IMEI / número de série</option><option value="quantity" ${p.tracking==='quantity'?'selected':''}>Por quantidade</option>`;
 modalFrame(id?'Editar produto':'Novo produto','Cadastre o modelo uma única vez. As unidades entram em Entradas.',`<input type="hidden" name="id" value="${attr(id)}"/><div class="fields mobile-one">${field('name','Nome do produto *',p.name,'text','required maxlength="130"')}${field('brand','Marca',p.brand,'text','maxlength="70"')}${selectField('category','Categoria',categories)}${field('sku','Código / SKU',p.sku,'text','maxlength="50"')}${selectField('tracking','Controle de estoque',tracking,id?'':'')}${field('minStock','Alerta de estoque mínimo',p.minStock??0,'number','min="0" step="1"')}${field('cost','Custo padrão (R$)',p.cost??'','number','min="0" step="0.01" inputmode="decimal" placeholder="0,00"')}${field('price','Preço de venda padrão (R$)',p.price??'','number','min="0" step="0.01" inputmode="decimal" placeholder="0,00"')}</div><div class="tip margin-top">O custo real é informado em cada entrada e registrado na venda. O preço padrão é apenas uma sugestão.</div>${id?`<hr class="form-divider"/><div class="form-heading">Ações</div><button type="button" class="btn btn-danger btn-sm" data-action="delete-product" data-id="${attr(id)}">${icon('trash')} Excluir produto sem movimentação</button>`:''}`,'Salvar produto');
 document.getElementById('modal-form').dataset.form='product';
}
function entryModal(preselected=''){
 if(!db.products.length){toast('Cadastre um produto antes de registrar entradas.','error');productModal();return;}
 modalFrame('Registrar entrada','Cadastre um recebimento do fornecedor.',`<div class="fields">${selectField('productId','Produto *',productOptions(preselected),'required data-entry-product="1"')}<div class="field"><label for="f-supplierId">Fornecedor</label><select class="select" name="supplierId" id="f-supplierId">${personOptions('suppliers')}</select></div>${field('date','Data da entrada',localDate(),'date','required')}${field('quantity','Quantidade *',1,'number','min="1" step="1" required')}${field('unitCost','Custo unitário (R$) *',preselected?prod(preselected)?.cost??0:0,'number','min="0" step="0.01" inputmode="decimal" required')}<div class="field span2" id="entry-serials-wrap"><label for="f-serials">IMEIs / números de série (um por linha)</label><textarea class="textarea" name="serials" id="f-serials" rows="4" placeholder="Informe exatamente um IMEI por unidade"></textarea><div class="helper">Obrigatório para produtos controlados por IMEI/série.</div></div><div class="field span2"><label for="f-notes">Observações</label><textarea class="textarea" id="f-notes" name="notes" rows="2" maxlength="900"></textarea></div></div>`,'Registrar entrada');document.getElementById('modal-form').dataset.form='entry';entryTrackingChange();
}
function entryTrackingChange(){const f=document.getElementById('modal-form');if(!f||f.dataset.form!=='entry')return;const p=prod(f.elements.productId.value);const wrap=document.getElementById('entry-serials-wrap');if(wrap)wrap.classList.toggle('hidden',!p||p.tracking!=='serial');if(p&&p.tracking==='serial'){f.elements.quantity.placeholder='Quantidade de IMEIs';}if(p&&f.elements.unitCost&&!(f.elements.unitCost.dataset.edited))f.elements.unitCost.value=p.cost||0;}
function personModal(type,id=''){
 const p=byId(db[type],id)||{},singular=type==='clients'?'cliente':'fornecedor';
 modalFrame(id?'Editar '+singular:'Novo '+singular,'Informações básicas de contato.',`<input type="hidden" name="id" value="${attr(id)}"/><input type="hidden" name="type" value="${type}"/><div class="fields mobile-one">${field('name','Nome *',p.name,'text','required maxlength="130"')}${field('phone','WhatsApp / telefone',p.phone,'tel','maxlength="26"')}${field('city','Cidade / UF',p.city,'text','maxlength="90"')}<div class="field"><label for="f-notes">Observações</label><textarea class="textarea" id="f-notes" name="notes" maxlength="900">${esc(p.notes||'')}</textarea></div></div>${id?`<hr class="form-divider"/><button class="btn btn-danger btn-sm" type="button" data-action="delete-person" data-type="${type}" data-id="${attr(id)}">${icon('trash')} Excluir contato não utilizado</button>`:''}`,'Salvar');document.getElementById('modal-form').dataset.form='person';
}
function expenseModal(id=''){
 const e=byId(db.expenses,id)||{};modalFrame(id?'Editar lançamento':'Novo lançamento','Registre despesas ou receitas fora das vendas.',`<input type="hidden" name="id" value="${attr(id)}"/><div class="fields">${selectField('type','Tipo',`<option value="despesa" ${e.type==='despesa'?'selected':''}>Despesa</option><option value="receita" ${e.type==='receita'?'selected':''}>Receita extra</option>`)}${field('date','Data',e.date||localDate(),'date','required')}<div class="field span2">${field('description','Descrição *',e.description||'','text','required maxlength="130"')}</div>${field('category','Categoria',e.category||'Operacional','text','maxlength="70"')}${field('amount','Valor (R$) *',e.amount??'','number','min="0" step="0.01" required')}<div class="field span2"><label><input type="checkbox" name="paid" ${e.id&&!e.paid?'':'checked'}/> Já foi pago / recebido</label><span class="helper">O resultado gerencial considera despesas e receitas pelo lançamento, mesmo pendentes.</span></div></div>${id?`<hr class="form-divider"/><button class="btn btn-danger btn-sm" type="button" data-action="delete-expense" data-id="${attr(id)}">${icon('trash')} Excluir lançamento</button>`:''}`,'Salvar lançamento');document.getElementById('modal-form').dataset.form='expense';
}
function readSaleDraft(){
 const f=document.getElementById('modal-form');if(!f||f.dataset.form!=='sale')return;
 draftSaleFields={}; for(const name of ['clientId','date','paymentMethod','installments','fees','shipping','otherCosts','amountPaid','notes']){draftSaleFields[name]=f.elements[name]?.value??'';}
}
function saleModal(){
 if(!db.products.length){toast('Cadastre um produto antes de registrar vendas.','error');productModal();return;}
 draftCart=[];draftMode='concluida';draftSaleFields={date:localDate(),paymentMethod:'Pix',installments:'1',amountPaid:''};drawSaleModal();
}
function drawSaleModal(){
 const v=k=>draftSaleFields[k]??'';
 const selectedProd=db.products[0];
 const productPicker=productOptions();
 const cartSum=amount(draftCart.reduce((a,i)=>a+i.quantity*i.unitPrice,0));
 const itemRows=draftCart.length?draftCart.map((item,i)=>`<div class="cart-row"><div class="cart-row-main">${esc(prodName(item.productId))}<small>${item.quantity} × ${money(item.unitPrice)}${item.serials?.length?' · '+esc(item.serials.join(', ')):''}</small></div><strong class="money small">${money(item.quantity*item.unitPrice)}</strong><button class="icon-btn" type="button" aria-label="Remover item" data-action="cart-remove" data-index="${i}">${icon('close')}</button></div>`).join(''):'<div class="dashed">Adicione um produto à venda.</div>';
 modalFrame('Nova venda','Venda imediata ou pedido sob encomenda.',`<div class="sell-mode"><button type="button" class="${draftMode==='concluida'?'active':''}" data-action="sale-mode" data-mode="concluida">Venda com estoque</button><button type="button" class="${draftMode==='encomenda'?'active':''}" data-action="sale-mode" data-mode="encomenda">Sob encomenda</button></div><div class="fields" style="margin-top:17px">${selectField('clientId','Cliente',personOptions('clients',v('clientId')))}${field('date','Data',v('date')||localDate(),'date','required')}</div>
 <hr class="form-divider"/><div class="form-heading">Itens da venda</div><div class="cart-builder"><div class="fields"><div class="field span2"><label for="cart-product">Produto *</label><select id="cart-product" class="select" data-cart-product="1">${productPicker}</select></div><div class="field" id="cart-qty-wrap"><label for="cart-qty">Quantidade</label><input id="cart-qty" class="input" type="number" min="1" step="1" value="1"/></div><div class="field"><label for="cart-price">Preço por unidade (R$)</label><input id="cart-price" class="input" type="number" min="0" step="0.01" inputmode="decimal" value="0"/></div><div class="field span2 hidden" id="cart-serial-wrap"><label for="cart-serial">Selecione IMEI / nº de série</label><select id="cart-serial" class="select"></select></div></div><div class="tip" id="cart-stock-tip" style="margin:10px 0"></div><button class="btn btn-soft full" type="button" data-action="cart-add">${icon('plus')} Adicionar item</button></div><div class="cart-items">${itemRows}</div><div class="cart-summary"><span>Total</span><strong>${money(cartSum)}</strong></div>
 <hr class="form-divider"/><div class="form-heading">Pagamento e custos</div><div class="fields">${selectField('paymentMethod','Forma de pagamento', ['Pix','Dinheiro','Débito','Crédito','Transferência','Outro'].map(x=>`<option ${v('paymentMethod')===x?'selected':''}>${x}</option>`).join(''))}${field('installments','Parcelas',v('installments')||1,'number','min="1" max="24" step="1"')}${field('fees','Taxas do cartão (R$)',v('fees'),'number','min="0" step="0.01" inputmode="decimal"')}${field('shipping','Frete pago pela loja (R$)',v('shipping'),'number','min="0" step="0.01" inputmode="decimal"')}${field('otherCosts','Outras despesas da venda (R$)',v('otherCosts'),'number','min="0" step="0.01" inputmode="decimal"')}${field('amountPaid','Valor já recebido (R$)',v('amountPaid'),'number',`min="0" step="0.01" inputmode="decimal" placeholder="${draftMode==='concluida'?'Em branco = total pago':'Em branco = R$ 0'}"`)}<div class="field span2"><label for="f-notes">Observações</label><textarea class="textarea" id="f-notes" name="notes" maxlength="900">${esc(v('notes'))}</textarea><div class="helper">Para parcelamento, informe as taxas totais estimadas. O aplicativo ainda não gera parcelas individuais.</div></div></div><div class="warn-inline">${draftMode==='encomenda'?'Encomendas não baixam estoque nem contam como vendas no resultado até serem concluídas.':'Ao concluir, os itens são retirados do estoque. O IMEI escolhido fica vinculado à venda.'}</div>`,'Salvar '+(draftMode==='encomenda'?'encomenda':'venda'),'wide');
 document.getElementById('modal-form').dataset.form='sale';
 cartProductChange();
}
function cartProductChange(){
 const p=prod(document.getElementById('cart-product')?.value);
 const serialWrap=document.getElementById('cart-serial-wrap'),qtyWrap=document.getElementById('cart-qty-wrap'),serialSelect=document.getElementById('cart-serial'),tip=document.getElementById('cart-stock-tip'),price=document.getElementById('cart-price');
 if(!serialWrap||!qtyWrap)return;
 serialWrap.classList.toggle('hidden',!p||p.tracking!=='serial'||draftMode==='encomenda');
 qtyWrap.classList.toggle('hidden',!!p&&p.tracking==='serial');
 if(p){
  price.value=p.price||0;
  const availableSerials=available(p.id).serials.filter(s=>!draftCart.some(i=>i.serials?.some(x=>x.toUpperCase()===s.serial.toUpperCase())));
  serialSelect.innerHTML='<option value="">Selecione a unidade</option>'+availableSerials.map(x=>`<option value="${attr(x.serial)}">${esc(x.serial)}</option>`).join('');
  const already=draftCart.filter(i=>i.productId===p.id).reduce((n,i)=>n+i.quantity,0);
  const count=Math.max(0,available(p.id).qty-already);
  tip.textContent=draftMode==='encomenda'?'Pedido sob encomenda: não é necessário possuir estoque agora.':`${count} unidade(s) disponível(is) para esta venda.`;
 }else{price.value=0;serialSelect.innerHTML='';tip.textContent='Selecione um produto para conferir o estoque.';}
}
function cartAdd(){
 readSaleDraft();
 const id=document.getElementById('cart-product').value;const p=prod(id);
 if(!p)throw Error('Selecione um produto.');
 const qty=p.tracking==='serial'?1:Number(document.getElementById('cart-qty').value);
 const price=Number(document.getElementById('cart-price').value);
 if(!Number.isInteger(qty)||qty<1)throw Error('Informe uma quantidade válida.');
 if(!Number.isFinite(price)||price<0)throw Error('Informe um preço válido.');
 const serial=p.tracking==='serial'&&draftMode==='concluida'?document.getElementById('cart-serial').value:'';
 if(p.tracking==='serial'&&draftMode==='concluida'&&!serial)throw Error('Selecione o IMEI/número de série.');
 if(draftMode==='concluida'){
  const stock=available(p.id).qty;const inCart=draftCart.filter(i=>i.productId===p.id).reduce((a,i)=>a+i.quantity,0);
  if(stock<inCart+qty)throw Error(`Estoque insuficiente: ${Math.max(0,stock-inCart)} unidade(s) disponível(is).`);
 }
 draftCart.push({productId:id,quantity:qty,serials:serial?[serial]:[],unitPrice:amount(price)});drawSaleModal();
}
function saleDetail(id){
 const s=byId(db.sales,id);if(!s)return;
 const totals=saleTotal(s),cost=saleCost(s),profit=saleProfit(s);
 const rows=s.items.map(i=>`<div class="stat-pair"><div><strong>${esc(i.productName)}</strong><div class="tr-sub">${i.quantity} x ${money(i.unitPrice)}${i.serials?.length?' · '+esc(i.serials.join(', ')):''}</div></div><strong>${money(i.quantity*i.unitPrice)}</strong></div>`).join('');
 const fields=`<div class="mini-head"><span class="small muted">Venda ${esc(id.slice(0,8).toUpperCase())} · ${dateText(saleEffectiveDate(s))}</span>${saleBadge(s)}</div><div class="details-grid"><div class="details-box"><div class="details-box-label">Cliente</div><div class="details-box-value" style="font-size:14px">${esc(clientName(s.clientId))}</div></div><div class="details-box"><div class="details-box-label">Pagamento</div><div class="details-box-value" style="font-size:14px">${esc(s.paymentMethod)} · ${s.installments||1}x</div></div></div><div class="form-heading">Itens</div>${rows}<div class="form-heading">Resumo financeiro</div>${[['Total da venda',totals],['Custo das mercadorias',-cost],['Taxas do pagamento',-Number(s.fees||0)],['Frete pago pela loja',-Number(s.shipping||0)],['Outras despesas',-Number(s.otherCosts||0)]].map(([l,v])=>`<div class="stat-pair"><span>${esc(l)}</span><strong>${v<0?'-':''}${money(Math.abs(v))}</strong></div>`).join('')}<div class="stat-pair"><strong>Resultado estimado</strong><strong class="${profit>=0?'positive':'negative'}">${s.status==='concluida'?money(profit):'Não reconhecido'}</strong></div><div class="stat-pair"><span>Já recebido</span><strong>${money(s.amountPaid||0)}</strong></div>${s.status==='concluida'?`<div class="stat-pair"><span>A receber</span><strong>${money(Math.max(0,totals-(s.amountPaid||0)))}</strong></div>`:''}${s.notes?`<div class="form-heading">Observações</div><div class="muted-block">${esc(s.notes)}</div>`:''}<div class="warn-inline">Cancelamentos devolvem as unidades ao estoque. O registro da venda continua no histórico.</div>`;
 const footer=`${s.status==='encomenda'?`<button class="btn btn-soft" type="button" data-action="finalize-order" data-id="${attr(id)}">Concluir encomenda</button>`:''}${s.status!=='cancelada'?`<button class="btn btn-danger" type="button" data-action="cancel-sale" data-id="${attr(id)}">Cancelar</button>`:''}${s.status==='concluida'?`<button class="btn" type="button" data-action="receive-sale" data-id="${attr(id)}">Registrar recebimento</button>`:''}`;
 modalFrame('Detalhes da venda','Confira os itens, valores e status.',fields,'Fechar','wide',footer);document.getElementById('modal-form').dataset.form='read-only';document.querySelector('#modal-form button[type=submit]').textContent='Fechar';
}
function finalizeOrderModal(id){
 const s=byId(db.sales,id);if(!s||s.status!=='encomenda')return;
 let fields=`<input type="hidden" name="saleId" value="${attr(id)}"/><div class="notice info">${icon('info')}<span>Confira se todos os produtos já deram entrada no estoque antes de concluir o pedido.</span></div><div class="fields">${field('completedAt','Data de conclusão',localDate(),'date','required')}${field('amountPaid','Total já recebido (R$)',s.amountPaid??'','number','min="0" step="0.01" required')}</div><div class="form-heading">Unidades da encomenda</div>`;
 s.items.forEach((item,index)=>{
  const p=prod(item.productId),stock=available(item.productId);
  fields+=`<div class="stat-pair"><strong>${esc(item.productName)} x${item.quantity}</strong>${b(stock.qty+' em estoque',stock.qty>=item.quantity?'green':'red')}</div>`;
  if(p?.tracking==='serial'){
   fields+=`<div class="field" style="margin:8px 0 12px"><label>IMEI/série para ${esc(p.name)}</label><select class="select" name="serial-${index}" required><option value="">Selecione</option>${stock.serials.map(x=>`<option value="${attr(x.serial)}">${esc(x.serial)}</option>`).join('')}</select></div>`;
  }
 });
 modalFrame('Concluir encomenda','Baixa de estoque e reconhecimento da venda.',fields,'Concluir venda','wide');document.getElementById('modal-form').dataset.form='finalize-order';
}
function warrantySaleOptions(selected=''){return '<option value="">Selecione uma venda</option>'+completed().slice().sort((a,b)=>String(saleEffectiveDate(b)).localeCompare(String(saleEffectiveDate(a)))).map(s=>`<option value="${attr(s.id)}" ${selected===s.id?'selected':''}>${dateText(saleEffectiveDate(s))} · ${esc(clientName(s.clientId))} · ${money(saleTotal(s))}</option>`).join('');}
function warrantyItemOptions(saleId,selected=''){
 const s=byId(db.sales,saleId);if(!s)return '<option value="">Escolha primeiro uma venda</option>';
 return '<option value="">Selecione o item</option>'+s.items.flatMap((item,i)=>item.serials?.length?item.serials.map(serial=>({value:i+'::'+serial,label:item.productName+' · '+serial})): [{value:i+'::',label:item.productName+' · '+item.quantity+' un.'}]).map(x=>`<option value="${attr(x.value)}" ${selected===x.value?'selected':''}>${esc(x.label)}</option>`).join('');
}
function warrantyModal(id=''){
 if(!completed().length){toast('É necessário ter uma venda concluída para abrir uma garantia.','error');return;}
 const w=byId(db.warranties,id)||{};
 modalFrame(id?'Editar garantia':'Abrir garantia','Controle um atendimento pós-venda.',`<input type="hidden" name="id" value="${attr(id)}"/><div class="fields mobile-one">${selectField('saleId','Venda de origem *',warrantySaleOptions(w.saleId),'required data-warranty-sale="1"')}${selectField('saleItem','Produto / IMEI *',warrantyItemOptions(w.saleId,w.itemKey),'required data-warranty-item="1"')}${field('date','Data da solicitação',w.date||localDate(),'date','required')}${selectField('status','Situação',Object.entries(WARRANTY_STATUS).map(([k,v])=>`<option value="${k}" ${w.status===k?'selected':''}>${v}</option>`).join(''))}<div class="field span2">${field('problem','Problema informado *',w.problem||'','text','required maxlength="200"')}</div>${field('cost','Custo da garantia (R$)',w.cost??0,'number','min="0" step="0.01" inputmode="decimal"')}${field('costDate','Data do custo',w.costDate||w.date||localDate(),'date')}<div class="field span2"><label for="f-resolution">Observações / solução</label><textarea class="textarea" id="f-resolution" name="resolution" maxlength="1500">${esc(w.resolution||'')}</textarea></div></div>`,'Salvar garantia');document.getElementById('modal-form').dataset.form='warranty';
}
function warrantySaleChange(){const f=document.getElementById('modal-form');if(!f||f.dataset.form!=='warranty')return;f.elements.saleItem.innerHTML=warrantyItemOptions(f.elements.saleId.value);}
function saveForm(ev){
 ev.preventDefault();const form=ev.target;if(!(form instanceof HTMLFormElement))return;
 const mode=form.dataset.form;const fd=new FormData(form);
 try{
 if(mode==='product'){
  const id=String(fd.get('id')||''),name=required(fd,'name','o nome do produto');const tracking=String(fd.get('tracking'));
  const sku=String(fd.get('sku')||'').trim();if(sku&&db.products.some(p=>p.sku.toLowerCase()===sku.toLowerCase()&&p.id!==id))throw Error('Este SKU já pertence a outro produto.');
  const minStock=numericField(fd,'minStock');if(!Number.isInteger(minStock))throw Error('Estoque mínimo precisa ser inteiro.');
  const record={name,brand:String(fd.get('brand')||'').trim(),category:String(fd.get('category')),sku,tracking,minStock,cost:numericField(fd,'cost'),price:numericField(fd,'price')};
  if(!['serial','quantity'].includes(tracking))throw Error('Tipo de controle inválido.');
  if(id){const p=prod(id);if(!p)throw Error('Produto não encontrado.');if(p.tracking!==tracking&&(db.entries.some(e=>e.productId===id)||db.sales.some(s=>s.items.some(i=>i.productId===id))))throw Error('Não é possível mudar o tipo de controle após uma movimentação.');commit(copy=>Object.assign(byId(copy.products,id),record),'Produto atualizado.');}
  else commit(copy=>copy.products.push({id:uid(),...record,createdAt:new Date().toISOString()}),'Produto cadastrado.');
 }
 else if(mode==='entry'){
  const productId=required(fd,'productId','o produto'),p=prod(productId);if(!p)throw Error('Produto inválido.');
  const quantity=numericField(fd,'quantity'),unitCost=numericField(fd,'unitCost'),date=required(fd,'date','a data');
  if(!Number.isInteger(quantity)||quantity<1)throw Error('Quantidade deve ser um número inteiro maior que zero.');
  const serials=String(fd.get('serials')||'').split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean);
  if(p.tracking==='serial'){
   if(serials.length!==quantity)throw Error(`Informe exatamente ${quantity} IMEI(s) / número(s) de série.`);
   if(new Set(serials.map(x=>x.toUpperCase())).size!==serials.length)throw Error('Há IMEIs/séries repetidos nesta entrada.');
   const existing=new Set(db.entries.flatMap(e=>e.serials||[]).map(s=>s.toUpperCase()));if(serials.some(s=>existing.has(s.toUpperCase())))throw Error('Um IMEI/série já existe no histórico de entradas.');
  }
  const entry={id:uid(),productId,supplierId:String(fd.get('supplierId')||''),date,quantity,unitCost,serials:p.tracking==='serial'?serials:[],notes:String(fd.get('notes')||'').trim(),createdAt:new Date().toISOString()};
  commit(copy=>copy.entries.push(entry),'Entrada registrada: '+quantity+' unidade(s).');
 }
 else if(mode==='person'){
  const type=String(fd.get('type'));if(!['clients','suppliers'].includes(type))throw Error('Cadastro inválido.');
  const id=String(fd.get('id')||'');const record={name:required(fd,'name','o nome'),phone:String(fd.get('phone')||'').trim(),city:String(fd.get('city')||'').trim(),notes:String(fd.get('notes')||'').trim()};
  if(id){if(!byId(db[type],id))throw Error('Contato não encontrado.');commit(copy=>Object.assign(byId(copy[type],id),record),'Cadastro atualizado.');}
  else commit(copy=>copy[type].push({id:uid(),...record,createdAt:new Date().toISOString()}),'Cadastro salvo.');
 }
 else if(mode==='expense'){
  const id=String(fd.get('id')||'');const record={type:String(fd.get('type')),date:required(fd,'date','a data'),description:required(fd,'description','a descrição'),category:String(fd.get('category')||'Operacional').trim(),amount:numericField(fd,'amount'),paid:fd.get('paid')==='on'};
  if(!['receita','despesa'].includes(record.type))throw Error('Tipo inválido.');
  if(id){if(!byId(db.expenses,id))throw Error('Lançamento não encontrado.');commit(copy=>Object.assign(byId(copy.expenses,id),record),'Lançamento atualizado.');}
  else commit(copy=>copy.expenses.push({id:uid(),...record,createdAt:new Date().toISOString()}),'Lançamento registrado.');
 }
 else if(mode==='sale'){
  if(!draftCart.length)throw Error('Adicione pelo menos um produto à venda.');
  const date=required(fd,'date','a data'),clientId=String(fd.get('clientId')||''),fees=numericField(fd,'fees'),shipping=numericField(fd,'shipping'),otherCosts=numericField(fd,'otherCosts');
  const items=draftMode==='concluida'?allocatedItems(draftCart):draftCart.map(i=>({...i,productName:prodName(i.productId),allocations:[]}));
  const total=saleTotal({items});const amountPaid=fd.get('amountPaid')===''?(draftMode==='concluida'?total:0):numericField(fd,'amountPaid');
  if(amountPaid>total)throw Error('Valor recebido não pode ser maior que o total da venda.');
  const installments=numericField(fd,'installments',1);if(!Number.isInteger(installments)||installments<1||installments>24)throw Error('Informe 1 a 24 parcelas.');
  const record={id:uid(),date,completedAt:draftMode==='concluida'?date:null,status:draftMode,items,clientId,paymentMethod:String(fd.get('paymentMethod')||'Pix'),installments,fees,shipping,otherCosts,amountPaid,notes:String(fd.get('notes')||'').trim(),createdAt:new Date().toISOString()};
  commit(copy=>copy.sales.push(record),draftMode==='concluida'?'Venda concluída e estoque atualizado.':'Encomenda registrada.');
 }
 else if(mode==='finalize-order'){
  const id=required(fd,'saleId','a encomenda'),s=byId(db.sales,id);if(!s||s.status!=='encomenda')throw Error('Encomenda não está pendente.');
  const items=s.items.map((i,index)=>{const p=prod(i.productId);return {productId:i.productId,quantity:i.quantity,unitPrice:i.unitPrice,serials:p?.tracking==='serial'?[required(fd,'serial-'+index,'o IMEI de '+i.productName)]:[]};});
  const allocations=allocatedItems(items);const total=saleTotal({items:allocations}),paid=numericField(fd,'amountPaid');if(paid>total)throw Error('Valor recebido maior que total.');
  commit(copy=>{const target=byId(copy.sales,id);target.items=allocations;target.status='concluida';target.completedAt=required(fd,'completedAt','a data de conclusão');target.amountPaid=paid;},'Encomenda concluída e estoque atualizado.');
 }
 else if(mode==='warranty'){
  const saleId=required(fd,'saleId','a venda'),s=byId(db.sales,saleId);if(!s||s.status!=='concluida')throw Error('Selecione uma venda concluída.');
  const itemKey=required(fd,'saleItem','o item'),[indexStr,serial]=itemKey.split('::'),index=Number(indexStr);if(!Number.isInteger(index)||!s.items[index])throw Error('Item inválido.');
  const si=s.items[index],p=prod(si.productId);if(p?.tracking==='serial'&&!si.serials.includes(serial))throw Error('IMEI não pertence à venda.');
  const id=String(fd.get('id')||'');const record={saleId,itemKey,productId:si.productId,clientId:s.clientId,serial:serial||'',date:required(fd,'date','a data de abertura'),status:String(fd.get('status')),problem:required(fd,'problem','o problema'),cost:numericField(fd,'cost'),costDate:String(fd.get('costDate')||fd.get('date')),resolution:String(fd.get('resolution')||'').trim()};
  if(!WARRANTY_STATUS[record.status])throw Error('Status inválido.');
  if(id){if(!byId(db.warranties,id))throw Error('Garantia não encontrada.');commit(copy=>Object.assign(byId(copy.warranties,id),record),'Garantia atualizada.');}
  else commit(copy=>copy.warranties.push({id:uid(),...record,createdAt:new Date().toISOString()}),'Garantia aberta.');
 }
 else if(mode==='read-only') closeModal();
 }catch(err){toast(err.message||'Não foi possível salvar.','error');}
}
function phoneDigits(s){let digits=String(s||'').replace(/\D/g,'');if(digits.length===10||digits.length===11)digits='55'+digits;return digits;}
function downloadJSON(obj,filename){
 const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json;charset=utf-8'});
 const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),10000);
}
function exportDB(){try{downloadJSON({application:'ItaloERP',exportedAt:new Date().toISOString(),data:db},`italo-erp2-backup-${localDate()}.json`);toast('Backup gerado. Guarde o arquivo fora do navegador.');}catch(e){toast('Não foi possível gerar backup: '+e.message,'error');}}
function confirmAction(message){return window.confirm(message);}
async function importDB(file){
 if(!file)return;
 try{
  if(file.size>15*1024*1024)throw Error('Arquivo muito grande (máximo 15 MB).');
  const parsed=JSON.parse(await file.text());if(parsed.application!=='ItaloERP'||!validDB(parsed.data))throw Error('Backup incompatível. Importe um backup JSON criado por este ERP 2.0.');
  if(!confirmAction('ATENÇÃO: a importação substitui todos os registros atuais. Um backup do conteúdo atual será baixado antes. Deseja continuar?'))return;
  exportDB();const copy=parsed.data;copy.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(copy));db=copy;closeModal();view='dashboard';query='';render();toast('Backup restaurado. Confira seus registros.');
 }catch(e){toast('Falha na importação: '+e.message,'error');}finally{const input=document.getElementById('import-file');if(input)input.value='';}
}
function addDemo(){
 if(arrays.some(k=>db[k].length)&&!confirmAction('Esta ação vai SUBSTITUIR os dados atuais por dados fictícios. Deseja continuar?'))return;
 if(arrays.some(k=>db[k].length)) exportDB();
 const data=initial();const p1=uid(),p2=uid(),p3=uid(),c1=uid(),c2=uid(),f1=uid(),e1=uid(),e2=uid(),e3=uid(),s1=uid(),s2=uid();
 data.products=[
  {id:p1,name:'iPhone 14 Pro Max 256 GB',brand:'Apple',category:'Celular',sku:'IPH14PM256',tracking:'serial',minStock:1,cost:2650,price:2890},
  {id:p2,name:'Smartwatch T900 Ultra',brand:'T900',category:'Smartwatch',sku:'T900',tracking:'quantity',minStock:3,cost:65,price:125},
  {id:p3,name:'JBL Flip 7',brand:'JBL',category:'Áudio',sku:'JBL-FLIP7',tracking:'serial',minStock:1,cost:570,price:690}];
 data.clients=[{id:c1,name:'Cliente Exemplo',phone:'62900000000',city:'Goiânia - GO'},{id:c2,name:'Loja Exemplo',phone:'62911111111',city:'Anápolis - GO'}];
 data.suppliers=[{id:f1,name:'Fornecedor Exemplo',phone:'62922222222',city:'Goiânia - GO'}];
 data.entries=[{id:e1,productId:p1,supplierId:f1,date:localDate(),quantity:2,unitCost:2650,serials:['DEMO-IPHONE-0001','DEMO-IPHONE-0002'],createdAt:new Date().toISOString()},
 {id:e2,productId:p2,supplierId:f1,date:localDate(),quantity:15,unitCost:65,serials:[],createdAt:new Date().toISOString()},
 {id:e3,productId:p3,supplierId:f1,date:localDate(),quantity:1,unitCost:570,serials:['DEMO-JBL-0001'],createdAt:new Date().toISOString()}];
 data.sales=[{id:s1,status:'concluida',date:localDate(),completedAt:localDate(),clientId:c1,items:[{productId:p1,productName:'iPhone 14 Pro Max 256 GB',quantity:1,serials:['DEMO-IPHONE-0001'],unitPrice:2890,allocations:[{entryId:e1,qty:1,serial:'DEMO-IPHONE-0001',unitCost:2650}]}],paymentMethod:'Pix',installments:1,fees:0,shipping:0,otherCosts:10,amountPaid:2890,createdAt:new Date().toISOString()},
 {id:s2,status:'concluida',date:localDate(),completedAt:localDate(),clientId:c2,items:[{productId:p2,productName:'Smartwatch T900 Ultra',quantity:3,serials:[],unitPrice:125,allocations:[{entryId:e2,qty:3,unitCost:65}]}],paymentMethod:'Crédito',installments:2,fees:19,shipping:0,otherCosts:0,amountPaid:375,createdAt:new Date().toISOString()}];
 data.expenses=[{id:uid(),type:'despesa',date:localDate(),description:'Material de embalagem',category:'Operacional',amount:18,paid:true}];
 data.warranties=[{id:uid(),saleId:s1,itemKey:'0::DEMO-IPHONE-0001',clientId:c1,productId:p1,serial:'DEMO-IPHONE-0001',date:localDate(),status:'em_analise',problem:'Teste de solicitação',cost:0,costDate:localDate(),resolution:'Apenas demonstração'}];
 commit(copy=>Object.assign(copy,data),'Dados de demonstração carregados.');
}
async function actionHandler(e){
 const el=e.target.closest('[data-action]');if(!el)return;
 const a=el.dataset.action,id=el.dataset.id,type=el.dataset.type;
 try{
  switch(a){
   case 'nav':view=el.dataset.view;query='';stockFilter='todos';saleFilter='todos';closeModal();render();window.scrollTo({top:0,behavior:'instant'});break;
   case 'close-modal':closeModal();break;
   case 'open-product':productModal();break;
   case 'edit-product':productModal(id);break;
   case 'open-entry':entryModal(id);break;
   case 'open-sale':saleModal();break;
   case 'sale-detail':saleDetail(id);break;
   case 'open-client':personModal('clients');break;
   case 'open-supplier':personModal('suppliers');break;
   case 'edit-person':personModal(type,id);break;
   case 'open-expense':expenseModal();break;
   case 'edit-expense':expenseModal(id);break;
   case 'open-warranty':warrantyModal();break;
   case 'edit-warranty':warrantyModal(id);break;
   case 'sale-mode':readSaleDraft();draftMode=el.dataset.mode;drawSaleModal();break;
   case 'cart-add':cartAdd();break;
   case 'cart-remove':readSaleDraft();draftCart.splice(Number(el.dataset.index),1);drawSaleModal();break;
   case 'finalize-order':finalizeOrderModal(id);break;
   case 'cancel-sale':{
    const s=byId(db.sales,id);if(!s||s.status==='cancelada')return;
    if(db.warranties.some(w=>w.saleId===id))throw Error('Esta venda possui garantia vinculada. Encerre e revise o atendimento antes de cancelar.');
    if(!confirmAction('Cancelar esta venda? As unidades voltarão a ficar disponíveis no estoque; os registros permanecerão no histórico.'))return;
    commit(copy=>{const target=byId(copy.sales,id);target.status='cancelada';target.cancelledAt=localDate();},'Venda cancelada.');break;
   }
   case 'receive-sale':{
    const s=byId(db.sales,id);if(!s||s.status!=='concluida')return;
    const total=saleTotal(s); const value=window.prompt(`Total da venda: ${money(total)}\nValor recebido ATÉ AGORA (acumulado):`,String(s.amountPaid||0));if(value===null)return;
    const num=Number(value.replace(',','.'));if(!Number.isFinite(num)||num<0||num>total)throw Error('Informe o total já recebido entre zero e o valor da venda.');
    commit(copy=>{byId(copy.sales,id).amountPaid=amount(num);},'Recebimento atualizado.');break;
   }
   case 'delete-entry':{
    const entry=byId(db.entries,id);if(!entry)return;
    if(db.sales.some(s=>s.status==='concluida'&&s.items.some(i=>(i.allocations||[]).some(x=>x.entryId===id))))throw Error('Entrada vinculada a uma venda. Não pode ser apagada.');
    if(!confirmAction('Excluir esta entrada sem vendas vinculadas? Isso removerá as unidades do estoque.'))return;
    commit(copy=>{copy.entries=copy.entries.filter(x=>x.id!==id);},'Entrada excluída.');break;
   }
   case 'delete-product':{
    if(db.entries.some(e=>e.productId===id)||db.sales.some(s=>s.items.some(i=>i.productId===id)))throw Error('Produto já movimentado. Preserve o histórico; não pode excluir.');
    if(!confirmAction('Excluir este produto sem movimentação?'))return;
    commit(copy=>{copy.products=copy.products.filter(x=>x.id!==id);},'Produto excluído.');break;
   }
   case 'delete-person':{
    if(type==='clients'&&db.sales.some(s=>s.clientId===id)||type==='suppliers'&&db.entries.some(x=>x.supplierId===id))throw Error('Contato com movimentações não pode ser excluído.');
    if(!['clients','suppliers'].includes(type)||!confirmAction('Excluir cadastro sem vínculos?'))return;
    commit(copy=>{copy[type]=copy[type].filter(x=>x.id!==id);},'Contato excluído.');break;
   }
   case 'delete-expense':if(confirmAction('Excluir este lançamento financeiro?'))commit(copy=>{copy.expenses=copy.expenses.filter(x=>x.id!==id);},'Lançamento excluído.');break;
   case 'export':exportDB();break;
   case 'choose-import':document.getElementById('import-file')?.click();break;
   case 'seed':addDemo();break;
   case 'reset':{
    if(!confirmAction('Tem certeza? Todos os dados do ERP 2.0 neste navegador serão apagados.'))return;
    if(!confirmAction('CONFIRME NOVAMENTE: esta ação é irreversível sem um backup. Deseja apagar tudo?'))return;
    exportDB();commit(copy=>Object.assign(copy,initial()),'Dados locais apagados.');break;
   }
  }
 }catch(err){toast(err.message||'Ocorreu um erro.','error');}
}
document.addEventListener('click', actionHandler);
document.addEventListener('submit',saveForm);
document.addEventListener('change',e=>{
 if(e.target.matches('#import-file')){importDB(e.target.files?.[0]);return;}
 if(e.target.matches('[data-entry-product]')){entryTrackingChange();return;}
 if(e.target.matches('#cart-product')){cartProductChange();return;}
 if(e.target.matches('[data-warranty-sale]')){warrantySaleChange();return;}
 if(e.target.matches('[data-filter]')){if(e.target.dataset.filter==='stock')stockFilter=e.target.value;else saleFilter=e.target.value;render();}
});
document.addEventListener('input',e=>{
 if(e.target.matches('#f-unitCost'))e.target.dataset.edited='1';
 if(e.target.matches('[data-search]')){
  query=e.target.value;const start=e.target.selectionStart,end=e.target.selectionEnd;render();const input=document.querySelector('[data-search]');if(input){input.focus();input.setSelectionRange(start,end);}
 }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&currentModal){closeModal();}});
document.addEventListener('click',e=>{if(e.target.matches('[data-backdrop]'))closeModal();});
render();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}
})();
