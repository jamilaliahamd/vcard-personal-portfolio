function printQuotationsReport(quotation){const quote=quotation||db.quotations[0];if(!quote)return;const page=window.open('', '_blank', 'width=900,height=800');if(!page)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;const items=Array.isArray(quote.items)?quote.items:[];const total=Number(quote.amount||items.reduce((sum,item)=>sum+Number(item.total||0),0));const rows=items.map(item=>`<tr><td>${escapeHtml(item.item||'')}</td><td>${escapeHtml(item.description||'')}</td><td>${Number(item.quantity||0)}</td><td>${escapeHtml(item.unit||'')}</td><td>${money(Number(item.total||0))}</td></tr>`).join('');page.document.write(`<!doctype html><html><head><title>Quotation - ${escapeHtml(quote.id)}</title><style>*{box-sizing:border-box}body{margin:0;padding:30px;background:linear-gradient(135deg,#edf3ff 0%,#dfeeff 38%,#f4f8ff 100%);font-family:Arial,sans-serif;color:#17212f}.sheet{max-width:960px;margin:auto;background:linear-gradient(180deg,#ffffff 0%,#f5f9ff 100%);border:2px solid #2d67f0;border-radius:20px;overflow:hidden;box-shadow:0 28px 64px rgba(24,66,151,.28)}.header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:28px 36px;background:linear-gradient(135deg,#0f315d,#1b4da0);color:#fff;border-bottom:4px solid #d4a72c}.company{display:flex;align-items:center;gap:16px}.company img{width:82px;height:82px;object-fit:contain;background:#fff;border-radius:12px;padding:8px}.company h1{margin:0;font-size:24px}.company p{margin:4px 0;color:#dfe9ff;font-size:12px}.status-chip{padding:8px 12px;border-radius:999px;background:#eaf5ff;color:#0e4fad;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.8px}.meta{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:24px 36px;background:#f7f9fd}.meta-card{padding:16px 18px;background:#fff;border:1px solid #e3eaf4;border-radius:12px}.meta-card span{display:block;font-size:10px;text-transform:uppercase;color:#73859b;letter-spacing:.8px;margin-bottom:6px}.meta-card b{font-size:14px;color:#182a42}.content{padding:24px 36px 36px}.title-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.title-row h2{margin:0;font-size:26px;color:#1d2d43}.title-row span{font-size:13px;color:#62738a}.table-wrap{overflow:auto}.table-wrap table{width:100%;border-collapse:collapse;table-layout:fixed}.table-wrap th,.table-wrap td{text-align:left;padding:14px 12px;border-bottom:1px solid #e5ebf2}.table-wrap th{background:#f2f6fe;color:#214b87;font-size:11px;text-transform:uppercase;letter-spacing:.8px}.table-wrap tbody tr:nth-child(even){background:#fafbfd}.total-bar{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding:18px 20px;background:#fff8dc;border:1px solid #f0d88d;border-radius:12px;color:#8a6500;font-size:14px;font-weight:700}.total-bar strong{font-size:24px;color:#8a6500}.note{margin-top:18px;padding:16px 18px;background:#edf4ff;border-left:4px solid #1b4da0;color:#183a68;border-radius:10px;line-height:1.6}@media print{body{padding:0;background:#edf3ff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.sheet{border-radius:0;box-shadow:none;border-width:2px;max-width:none}.header{background:linear-gradient(135deg,#0f315d,#1b4da0)!important;color:#fff;border-bottom:4px solid #d4a72c}.meta,.summary,.note,.totals,.footer{background:#f8fbff!important}.meta-card,.summary-card,.note{box-shadow:inset 0 0 0 1px rgba(45,103,240,.16)}button{display:none!important}}@page{size:A4;margin:12mm} </style></head><body><div class="sheet"><div class="header"><div class="company"><img src="${logoUrl}" alt="Arkan AL-Omda Limited Co. logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p></div></div><div class="status-chip">${escapeHtml(quote.status||'Draft')}</div></div><div class="meta"><div class="meta-card"><span>Customer</span><b>${escapeHtml(quote.customer||'')}</b></div><div class="meta-card"><span>Project</span><b>${escapeHtml(quote.project||'')}</b></div><div class="meta-card"><span>Quotation #</span><b>${escapeHtml(quote.id||'')}</b></div><div class="meta-card"><span>Contact</span><b>${escapeHtml(quote.customerPhone||quote.phone||'')}</b></div><div class="meta-card"><span>Location</span><b>${escapeHtml(quote.projectLocation||quote.address||'')}</b></div><div class="meta-card"><span>Date</span><b>${escapeHtml(quote.valid||quote.date||'')}</b></div></div><div class="content"><div class="title-row"><h2>Quotation</h2><span>${escapeHtml(quote.id)}</span></div><div class="table-wrap"><table><thead><tr><th>Material</th><th>Description</th><th>Qty</th><th>Unit</th><th>Unit price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table></div><div class="total-bar"><span>Amount due</span><strong>${money(total)}</strong></div>${quote.notes?`<div class="note">${escapeHtml(quote.notes)}</div>`:''}<button onclick="window.print()" style="display:block;margin:22px auto 0;padding:10px 18px;border:0;border-radius:6px;background:#2d67f0;color:#fff;font-weight:700;cursor:pointer">Print quotation</button></div></div></body></html>`);page.document.close();}document.addEventListener('click', event=>{const printQuotation=event.target.closest('[data-print-quotation]');if(printQuotation){const quotation=db.quotations.find(item=>item.id===printQuotation.dataset.printQuotation);if(quotation)printQuotationsReport(quotation);return}},true);
'use strict';

const seed = {
  customers: [
    {id:'CUS-001',name:'Horizon Living Group',phone:'+1 415 555 0148',email:'projects@horizonliving.co',address:'1880 Market Street, San Francisco',projects:2,billed:148500},
    {id:'CUS-002',name:'Northline Retail',phone:'+1 415 555 0192',email:'facilities@northline.com',address:'2200 Bryant Street, San Francisco',projects:1,billed:76200},
    {id:'CUS-003',name:'Maya Patel',phone:'+1 510 555 0117',email:'maya.patel@email.com',address:'42 Lakeview Avenue, Oakland',projects:1,billed:42800},
    {id:'CUS-004',name:'Cedar & Co. Developments',phone:'+1 628 555 0122',email:'hello@cedarco.dev',address:'19 Mission Road, Daly City',projects:2,billed:112400}
  ],
  workers: [
    {id:'W-001',name:'Jordan Lee',skill:'Lead electrician',phone:'+1 415 555 0101',rate:42,project:'Horizon Residence',tasks:12,cost:8064,overtimeHours:8,overtimePay:504,attendance:'96%',attendanceDays:25,attendanceTotal:26,transport:350,color:'blue'},
    {id:'W-002',name:'Samira Khan',skill:'Electrical engineer',phone:'+1 415 555 0102',rate:48,project:'Northline Retail Fitout',tasks:8,cost:7296,overtimeHours:5,overtimePay:360,attendance:'98%',attendanceDays:25,attendanceTotal:26,transport:300,color:'green'},
    {id:'W-003',name:'Marco Ruiz',skill:'Journeyman electrician',phone:'+1 415 555 0103',rate:35,project:'Cedar Apartments',tasks:16,cost:6720,overtimeHours:11,overtimePay:578,attendance:'93%',attendanceDays:24,attendanceTotal:26,transport:420,color:'orange'},
    {id:'W-004',name:'Taylor Brooks',skill:'Apprentice electrician',phone:'+1 415 555 0104',rate:26,project:'Available',tasks:5,cost:3120,overtimeHours:3,overtimePay:117,attendance:'91%',attendanceDays:23,attendanceTotal:26,transport:250,color:'purple'}
  ],
  projects: [
    {id:'PRJ-2401',name:'Horizon Residence',customer:'Horizon Living Group',location:'San Francisco, CA',type:'Residential wiring',start:'2026-04-08',due:'2026-09-28',budget:96500,cost:68400,status:'In Progress',progress:72,notes:'Full house wiring, lighting and service upgrade.'},
    {id:'PRJ-2402',name:'Northline Retail Fitout',customer:'Northline Retail',location:'San Francisco, CA',type:'Commercial wiring',start:'2026-05-14',due:'2026-10-14',budget:78200,cost:41200,status:'In Progress',progress:54,notes:'Retail lighting, DB installation, emergency power.'},
    {id:'PRJ-2403',name:'Cedar Apartments',customer:'Cedar & Co. Developments',location:'Daly City, CA',type:'Multi-unit residential',start:'2026-06-02',due:'2026-11-30',budget:126000,cost:28700,status:'Planning',progress:18,notes:'12-unit electrical rough-in and final fit-off.'},
    {id:'PRJ-2398',name:'Lakeview Solar Upgrade',customer:'Maya Patel',location:'Oakland, CA',type:'Solar electrical',start:'2026-02-10',due:'2026-06-29',budget:42800,cost:40100,status:'Completed',progress:100,notes:'Solar inverter and EV charger installation.'},
    {id:'PRJ-2404',name:'Mission Office Rewire',customer:'Cedar & Co. Developments',location:'San Francisco, CA',type:'Commercial wiring',start:'2026-07-19',due:'2026-12-12',budget:69300,cost:8600,status:'On Hold',progress:12,notes:'Awaiting building permit approval.'},
    {id:'PRJ-2405',name:'Pier 7 Maintenance',customer:'Northline Retail',location:'San Francisco, CA',type:'Maintenance',start:'2026-08-01',due:'2026-09-18',budget:18400,cost:6200,status:'In Progress',progress:63,notes:'Quarterly preventive maintenance.'}
  ],
  tasks: [
    {id:'TSK-1001',name:'Main DB installation',project:'Horizon Residence',worker:'Jordan Lee',rate:42,start:'Sep 01',due:'Sep 12',status:'In Progress'},
    {id:'TSK-1002',name:'Lighting installation',project:'Northline Retail Fitout',worker:'Samira Khan',rate:48,start:'Aug 22',due:'Sep 10',status:'In Progress'},
    {id:'TSK-1003',name:'Conduit installation',project:'Cedar Apartments',worker:'Marco Ruiz',rate:35,start:'Sep 14',due:'Sep 30',status:'Pending'},
    {id:'TSK-1004',name:'Solar inverter commissioning',project:'Lakeview Solar Upgrade',worker:'Jordan Lee',rate:42,start:'Jun 20',due:'Jun 28',status:'Completed'},
    {id:'TSK-1005',name:'Preventive inspection',project:'Pier 7 Maintenance',worker:'Taylor Brooks',rate:26,start:'Sep 04',due:'Sep 08',status:'In Progress'}
  ],
  materials: [
    {id:'MAT-001',name:'THHN Copper Cable',brand:'Southwire',spec:'10 AWG / 500 ft',unit:'roll',price:248,previous:232,stock:18,min:10,supplier:'Graybar Electric',updated:'Sep 05, 2026',source:'Graybar quote'},
    {id:'MAT-002',name:'LED Panel Light',brand:'Lithonia',spec:'2x2 ft / 40W',unit:'each',price:38.5,previous:41,stock:64,min:25,supplier:'CED Greentech',updated:'Sep 04, 2026',source:'CED Greentech'},
    {id:'MAT-003',name:'20A MCB',brand:'Schneider',spec:'QO / 1-pole',unit:'each',price:12.75,previous:11.2,stock:9,min:20,supplier:'Rexel USA',updated:'Sep 06, 2026',source:'Rexel USA'},
    {id:'MAT-004',name:'PVC Conduit',brand:'Carlon',spec:'3/4 in / 10 ft',unit:'length',price:5.4,previous:5.4,stock:124,min:50,supplier:'Platt Electric',updated:'Aug 29, 2026',source:'Platt Electric'},
    {id:'MAT-005',name:'Weatherproof DB Box',brand:'Square D',spec:'12-way / outdoor',unit:'each',price:186,previous:178,stock:7,min:8,supplier:'Graybar Electric',updated:'Sep 02, 2026',source:'Graybar quote'},
    {id:'MAT-006',name:'Grounding Rod',brand:' nVent ERICO',spec:'5/8 in x 8 ft copper',unit:'each',price:24,previous:24,stock:42,min:15,supplier:'Rexel USA',updated:'Sep 01, 2026',source:'Rexel USA'}
  ],
  quotations: [{id:'QT-2026-018',customer:'Horizon Living Group',customerPhone:'+1 415 555 0148',project:'Horizon Residence',projectLocation:'San Francisco, CA',amount:96500,valid:'Sep 21, 2026',status:'Approved',date:'2026-09-09',items:[{item:'THHN Copper Cable',description:'10 AWG / 500 ft copper cable',quantity:12,unit:'roll',unitPrice:248,total:2976},{item:'Weatherproof DB Box',description:'12-way outdoor DB box',quantity:8,unit:'each',unitPrice:186,total:1488},{item:'LED Panel Light',description:'2x2 ft LED panel',quantity:40,unit:'each',unitPrice:38.50,total:1540}]},{id:'QT-2026-017',customer:'Cedar & Co. Developments',customerPhone:'+1 628 555 0122',project:'Cedar Apartments',projectLocation:'Daly City, CA',amount:126000,valid:'Sep 12, 2026',status:'Sent',date:'2026-09-09',items:[{item:'PVC Conduit',description:'3/4 in electrical conduit',quantity:80,unit:'length',unitPrice:6,total:480},{item:'20A MCB',description:'Schneider one-pole breaker',quantity:8,unit:'each',unitPrice:12.75,total:102}]},{id:'QT-2026-016',customer:'Northline Retail',customerPhone:'+1 415 555 0192',project:'Northline Retail Fitout',projectLocation:'San Francisco, CA',amount:78200,valid:'Aug 30, 2026',status:'Expired',date:'2026-09-09',items:[{item:'Electrical cable roll',description:'General electrical cable roll',quantity:8,unit:'roll',unitPrice:248,total:1984},{item:'Lighting Fixture',description:'LED shop light fixture',quantity:24,unit:'each',unitPrice:30,total:720}]}],
  expenses: [{id:'EXP-001',description:'Copper cable order',project:'Horizon Residence',category:'Material',date:'Sep 05, 2026',amount:12400},{id:'EXP-002',description:'Site transport and delivery',project:'Northline Retail Fitout',category:'Transportation',date:'Sep 03, 2026',amount:1850},{id:'EXP-003',description:'Scissor lift rental',project:'Northline Retail Fitout',category:'Equipment',date:'Aug 28, 2026',amount:2400},{id:'EXP-004',description:'DB boxes and breakers',project:'Cedar Apartments',category:'Material',date:'Aug 25, 2026',amount:8300}],
  payments: [{id:'PAY-0291',customer:'Horizon Living Group',project:'Horizon Residence',date:'Sep 04, 2026',method:'Bank transfer',amount:30000,status:'Paid'},{id:'PAY-0290',customer:'Northline Retail',project:'Northline Retail Fitout',date:'Aug 29, 2026',method:'Card',amount:18400,status:'Paid'},{id:'PAY-0289',customer:'Cedar & Co. Developments',project:'Cedar Apartments',date:'Aug 18, 2026',method:'Bank transfer',amount:25000,status:'Paid'}],
  invoices: [{id:'INV-2026-044',customer:'Horizon Living Group',project:'Horizon Residence',issued:'Sep 04, 2026',due:'Sep 18, 2026',amount:30000,status:'Paid'},{id:'INV-2026-043',customer:'Northline Retail',project:'Northline Retail Fitout',issued:'Aug 29, 2026',due:'Sep 12, 2026',amount:18400,status:'Paid'},{id:'INV-2026-042',customer:'Cedar & Co. Developments',project:'Cedar Apartments',issued:'Aug 18, 2026',due:'Sep 01, 2026',amount:25000,status:'Overdue'}]
};

const storeKey = 'voltwise-clean-data-v1';
const ADMIN_EMAIL = 'Arkan.al.omda@gmail.com';
const ADMIN_PASSWORD = 'jamil03000';
let adminLoggedIn = false;
let cloudDatabase = null;
let cloudSyncEnabled = false;
let cloudWriteTimer = null;
let applyingCloudData = false;
let cloudBaseline = null;
const emptyDatabase = {customers:[],workers:[],projects:[],tasks:[],materials:[],quotations:[],expenses:[],payments:[],invoices:[]};
let db = JSON.parse(localStorage.getItem(storeKey) || 'null') || JSON.parse(JSON.stringify(seed));
db.materials.forEach(material=>{material.sellingPrice=Number(material.sellingPrice ?? material.price);material.price=material.sellingPrice;if(material.marketPrice!==null&&material.marketPrice!==undefined&&material.marketPrice!=='')material.marketPrice=Number(material.marketPrice);else material.marketPrice=null;});
const setSyncStatus = (message, state='offline') => { const status = byId('syncStatus'); if(status){ status.textContent = message; status.dataset.state = state; } };
const cloneData = value => JSON.parse(JSON.stringify(value));
const sameData = (left, right) => JSON.stringify(left) === JSON.stringify(right);
function mergeConcurrentData(remoteData, localData, baseline){
  const merged = {...cloneData(emptyDatabase), ...cloneData(remoteData || {})};
  Object.keys(emptyDatabase).forEach(collection => {
    const remoteRecords = Array.isArray(remoteData?.[collection]) ? remoteData[collection] : [];
    const localRecords = Array.isArray(localData?.[collection]) ? localData[collection] : [];
    const baselineRecords = Array.isArray(baseline?.[collection]) ? baseline[collection] : [];
    const localById = new Map(localRecords.filter(record => record?.id).map(record => [record.id, record]));
    const baselineById = new Map(baselineRecords.filter(record => record?.id).map(record => [record.id, record]));
    const remoteById = new Map(remoteRecords.filter(record => record?.id).map(record => [record.id, record]));
    const localChangedIds = new Set();
    localById.forEach((record, id) => { if (!sameData(record, baselineById.get(id))) localChangedIds.add(id); });
    baselineById.forEach((record, id) => { if (!localById.has(id)) localChangedIds.add(id); });
    localChangedIds.forEach(id => { if (localById.has(id)) remoteById.set(id, cloneData(localById.get(id))); else remoteById.delete(id); });
    merged[collection] = [...remoteById.values()];
  });
  return merged;
}
const save = () => {
  localStorage.setItem(storeKey, JSON.stringify(db));
  if (!cloudSyncEnabled || applyingCloudData || !cloudDatabase) return;
  clearTimeout(cloudWriteTimer);
  cloudWriteTimer = setTimeout(() => cloudDatabase.transaction(remoteData => mergeConcurrentData(remoteData, db, cloudBaseline)).then(() => setSyncStatus('Live sync connected', 'online')).catch(() => setSyncStatus('Sync error', 'error')), 250);
};
function connectCloudSync(){
  const config = window.VOLTWISE_FIREBASE_CONFIG || {};
  if (!config.apiKey || !config.authDomain || !config.databaseURL || !config.projectId || !config.appId || !window.firebase) { setSyncStatus('Local device only', 'offline'); return; }
  setSyncStatus('Connecting...', 'connecting');
  try {
    if (!firebase.apps.length) firebase.initializeApp(config);
    cloudDatabase = firebase.database().ref(storeKey);
    firebase.auth().signInAnonymously().then(() => {
      cloudSyncEnabled = true;
      setSyncStatus('Live sync connected', 'online');
      cloudDatabase.on('value', snapshot => {
        const remoteData = snapshot.val();
        if (!remoteData || typeof remoteData !== 'object') { save(); return; }
        applyingCloudData = true;
        cloudBaseline = cloneData(remoteData);
        db = {...cloneData(emptyDatabase), ...remoteData};
        localStorage.setItem(storeKey, JSON.stringify(db));
        sanitizeStoredData();
        refresh();
        applyingCloudData = false;
      }, error => {
        setSyncStatus(error?.code === 'PERMISSION_DENIED' ? 'Enable database rules' : 'Database unavailable', 'error');
      });
    }).catch(error => {
      setSyncStatus(error?.code === 'auth/operation-not-allowed' ? 'Enable Anonymous Auth' : 'Firebase login failed', 'error');
    });
  } catch (error) { setSyncStatus('Firebase unavailable', 'error'); }
}
const cleanText = (value, fallback='') => {
  const text = String(value ?? '').trim();
  return text || fallback;
};
const normalizeQuotationRecord = quotation => {
  const items = Array.isArray(quotation?.items) ? quotation.items.map(item => ({
    item: cleanText(item?.item, 'Material'),
    description: cleanText(item?.description, ''),
    quantity: Number.isFinite(Number(item?.quantity)) ? Number(item.quantity) : 0,
    unit: cleanText(item?.unit, 'each'),
    unitPrice: Number.isFinite(Number(item?.unitPrice)) ? Number(item.unitPrice) : 0,
    total: Number.isFinite(Number(item?.total)) ? Number(item.total) : 0,
  })).filter(item => item.item || item.quantity || item.unitPrice) : [];
  const amount = Number.isFinite(Number(quotation?.amount)) ? Number(quotation.amount) : items.reduce((sum, item) => sum + item.total, 0);
  return {
    ...quotation,
    id: cleanText(quotation?.id, 'QT-00000'),
    customer: cleanText(quotation?.customer, 'Customer'),
    customerPhone: cleanText(quotation?.customerPhone, quotation?.phone || 'Phone not provided'),
    project: cleanText(quotation?.project, 'Project'),
    projectLocation: cleanText(quotation?.projectLocation, quotation?.address || 'Location not provided'),
    valid: cleanText(quotation?.valid, quotation?.date || 'Date not set'),
    status: cleanText(quotation?.status, 'Draft'),
    amount,
    items,
  };
};
const sanitizeStoredData = () => {
  db.quotations = (Array.isArray(db.quotations) ? db.quotations : []).map(normalizeQuotationRecord);
  save();
};
function syncProjectNameReferences(oldName, newName){
  const previous = String(oldName ?? '').trim();
  const next = String(newName ?? '').trim();
  if (!previous || previous === next) return;
  const collections = ['workers','tasks','expenses','payments','invoices','quotations'];
  collections.forEach(collection => {
    if (!Array.isArray(db[collection])) return;
    db[collection] = db[collection].map(record => {
      if (!record || typeof record !== 'object') return record;
      if (typeof record.project === 'string' && record.project === previous) {
        record.project = next;
      }
      return record;
    });
  });
  db.projects = (db.projects || []).map(project => {
    if (project && typeof project.name === 'string' && project.name === previous) {
      project.name = next;
    }
    return project;
  });
}
sanitizeStoredData();
const themeKey = 'voltwise-dark-mode';
const setTheme = enabled => { document.body.classList.toggle('dark', enabled); const toggle = byId('themeToggle'); if(toggle) toggle.textContent = enabled ? 'Light mode' : 'Dark mode'; localStorage.setItem(themeKey, String(enabled)); };
const money = value => 'SAR ' + Number(value || 0).toLocaleString('en-US', {maximumFractionDigits: 2});
const escapeHtml = text => String(text ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const status = value => `<span class="status ${String(value).toLowerCase().replaceAll(' ','-')}">${escapeHtml(value)}</span>`;
const rowActions = id => `<span class="row-actions"><button title="Edit" data-edit="${id}">Edit</button><button title="Delete" data-delete="${id}">Delete</button></span>`;
const quotationRowActions = id => `<span class="row-actions project-row-actions"><button type="button" class="quotation-print-action" title="Print quotation" data-print-quotation="${escapeHtml(id)}">&#128424; Print</button><button type="button" class="quotation-edit-action" title="Edit quotation" data-edit="${escapeHtml(id)}">Edit</button><button type="button" class="quotation-delete-action" title="Delete quotation" data-delete="${escapeHtml(id)}">Delete</button></span>`;
const byId = id => document.getElementById(id);
const getAdminCredentials = () => ({email:ADMIN_EMAIL,password:ADMIN_PASSWORD});
const setAuthMode = mode => { const signIn = mode === 'signin'; byId('adminLoginForm')?.classList.toggle('auth-form-hidden', !signIn); byId('adminSignupForm')?.classList.toggle('auth-form-hidden', signIn); byId('signInTab')?.classList.toggle('active', signIn); byId('signUpTab')?.classList.toggle('active', !signIn); byId('signInTab')?.setAttribute('aria-selected', String(signIn)); byId('signUpTab')?.setAttribute('aria-selected', String(!signIn)); if(byId('authHeading')) byId('authHeading').textContent = signIn ? 'Welcome back' : 'Sign up'; };
function chatReply(question){
  const text=String(question||'').toLowerCase();
  if(/hello|hi|hey|سلام/.test(text)) return 'Hello. I can help you navigate and understand this workspace.';
  if(/overview|dashboard|summary/.test(text)) return `Your workspace has ${db.projects.length} projects, ${db.customers.length} customers, ${db.workers.length} workers, ${db.materials.length} materials, and ${db.quotations.length} quotations. Open Dashboard for the full picture.`;
  if(/project|job|status|progress/.test(text)){const active=db.projects.filter(item=>item.status==='In Progress').length;const average=db.projects.length?Math.round(db.projects.reduce((sum,item)=>sum+Number(item.progress||0),0)/db.projects.length):0;return `You have ${active} projects in progress. Average project progress is ${average}%. Open Projects to review budgets, due dates, customers, and actions.`;}
  if(/customer|client/.test(text)) return `Customers stores contact details, locations, project counts, and billed totals. There are ${db.customers.length} customer records available.`;
  if(/worker|labour|labor|team|people/.test(text)) return `Workers shows skills, assigned projects, rates, attendance, labour cost, overtime, transport, and print actions. There are ${db.workers.length} workers in the workspace.`;
  if(/material|stock|inventory|price/.test(text)) return `Materials tracks stock, minimum levels, suppliers, specifications, and current prices. Open Materials for inventory or Market prices for supplier updates.`;
  if(/quotation|quote/.test(text)) return `Quotations lets you search, edit, delete, and print customer quotations. There are ${db.quotations.length} quotations available.`;
  if(/expense|cost|finance|payment|invoice/.test(text)) return `Expenses records project spending by category. Finance also includes invoices and payments, with totals shown on the dashboard.`;
  if(/report|analytics|export/.test(text)) return 'Reports combines project progress, costs, payments, customers, and projected margin. Use the filters, then generate or export the report.';
  if(/login|sign in|password|admin|security/.test(text)) return 'Admin access requires the approved administrator email and password. Logout returns the workspace to the locked screen.';
  if(/how|help|use|navigate/.test(text)) return 'Use the top navigation to open Dashboard, Projects, Workers, Customers, Quotations, Materials, Expenses, Reports, or Admin. Ask me about any section.';
  return 'I can answer questions about this website and its workspace: projects, customers, workers, materials, quotations, expenses, reports, dashboard, and admin access.';
}
function addChatMessage(message,type='assistant'){const messages=byId('chatMessages');if(!messages)return;const bubble=document.createElement('div');bubble.className=`chat-message ${type}`;bubble.textContent=message;messages.appendChild(bubble);messages.scrollTop=messages.scrollHeight;}
function sendChatQuestion(question){const value=String(question||'').trim();if(!value)return;addChatMessage(value,'user');addChatMessage(chatReply(value));}
const updateDashboardDate = () => { const date = byId('dashboardDate'); if(date) date.textContent = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}); };

function applyAdminAccessState(){
  const isLoggedIn = adminLoggedIn;
  const authLock = byId('authLock');
  const adminStatus = byId('adminLoginStatus');
  const adminMessage = byId('adminLoginMessage');
  const inlineMessage = byId('adminInlineMessage');
  const credentialInputs = [byId('adminEmailField'), byId('adminEmailInput'), byId('adminSignupEmail'), byId('adminPasswordField'), byId('adminPasswordInput'), byId('adminSignupPassword')];

  document.body.classList.toggle('admin-locked', !isLoggedIn);

  if (authLock) {
    authLock.classList.toggle('open', !isLoggedIn);
  }

  if (adminStatus) {
    adminStatus.textContent = isLoggedIn
      ? 'Admin access unlocked. The dashboard and all options are available.'
      : 'Enter the administrator email and password to unlock the dashboard and all options.';
    adminStatus.classList.toggle('success', isLoggedIn);
    adminStatus.classList.toggle('error', !isLoggedIn && !credentialInputs.some(input => input && input.value));
  }

  if (adminMessage) {
    adminMessage.textContent = isLoggedIn ? 'Login successful.' : '';
    adminMessage.classList.remove('error', 'success');
    if (isLoggedIn) adminMessage.classList.add('success');
  }

  if (inlineMessage) {
    inlineMessage.textContent = isLoggedIn ? 'Admin access is active.' : 'Use the administrator password to continue.';
    inlineMessage.classList.toggle('success', isLoggedIn);
    inlineMessage.classList.remove('error');
  }

  credentialInputs.forEach(input => {
    if (input) {
      input.value = '';
    }
  });

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (!isLoggedIn) {
      item.disabled = item.dataset.view !== 'settings';
      item.style.opacity = item.dataset.view === 'settings' ? '1' : '0.35';
    } else {
      item.disabled = false;
      item.style.opacity = '1';
    }
  });
}

function loginAdmin(email, password){
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '').trim();
  const credentials = getAdminCredentials();
  const adminStatus = byId('adminLoginStatus');
  const adminMessage = byId('adminLoginMessage');
  const inlineMessage = byId('adminInlineMessage');

  if (normalizedEmail === String(credentials.email).trim().toLowerCase() && normalizedPassword === credentials.password) {
    adminLoggedIn = true;
    applyAdminAccessState();
    if (adminStatus) {
      adminStatus.textContent = 'Admin access unlocked. The dashboard and all options are available.';
      adminStatus.classList.remove('error');
      adminStatus.classList.add('success');
    }
    if (adminMessage) {
      adminMessage.textContent = 'Login successful.';
      adminMessage.classList.remove('error');
      adminMessage.classList.add('success');
    }
    if (inlineMessage) {
      inlineMessage.textContent = 'Admin access unlocked.';
      inlineMessage.classList.remove('error');
      inlineMessage.classList.add('success');
    }
    navigate('dashboard');
    notify('Admin login successful');
    return true;
  }

  adminLoggedIn = false;
  applyAdminAccessState();
  if (adminStatus) {
    adminStatus.textContent = 'Incorrect email or password. Please try again.';
    adminStatus.classList.remove('success');
    adminStatus.classList.add('error');
  }
  if (adminMessage) {
    adminMessage.textContent = 'Incorrect email or password. Please try again.';
    adminMessage.classList.remove('success');
    adminMessage.classList.add('error');
  }
  if (inlineMessage) {
    inlineMessage.textContent = 'Incorrect email or password. Please try again.';
    inlineMessage.classList.remove('success');
    inlineMessage.classList.add('error');
  }
  notify('Incorrect password');
  return false;
}

function signupAdmin(email, password){
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '').trim();
  const message = byId('adminSignupMessage');
  if (!normalizedEmail || !normalizedEmail.includes('@') || normalizedPassword.length < 6) {
    if (message) {
      message.textContent = 'Enter a valid email and a password with at least 6 characters.';
      message.classList.remove('success');
      message.classList.add('error');
    }
    return false;
  }
  if (byId('adminSignupEmail')) byId('adminSignupEmail').value = normalizedEmail;
  if (byId('adminEmailField')) byId('adminEmailField').value = normalizedEmail;
  if (byId('adminSignupMessage')) {
    byId('adminSignupMessage').textContent = 'Admin access created. Sign in to continue.';
    byId('adminSignupMessage').classList.remove('error');
    byId('adminSignupMessage').classList.add('success');
  }
  setAuthMode('signin');
  notify('Admin access created');
  return true;
}

function logoutAdmin(){
  adminLoggedIn = false;
  applyAdminAccessState();
  navigate('settings');
  notify('Logged out');
}

function renderDashboard(){
  if (!byId('metrics') || !byId('activeProjectsTable') || !byId('alertsList') || !byId('activityList') || !byId('barChart') || !byId('dashboardReportContent')) return;
  const materialCost = db.materials.reduce((sum,material)=>sum + (material.price * material.stock),0);
  const labourCost = db.workers.reduce((sum,worker)=>sum + worker.cost,0);
  const expenseTotal = db.expenses.reduce((sum,expense)=>sum + expense.amount,0);
  const pendingPayments = db.invoices.filter(invoice=>invoice.status !== 'Paid').reduce((sum,invoice)=>sum + invoice.amount,0);
  const lowStock = db.materials.filter(material=>material.stock < material.min);
  const overdue = db.invoices.filter(invoice=>invoice.status === 'Overdue');
  const onHold = db.projects.filter(project=>project.status === 'On Hold');
  const attention = [...lowStock.slice(0,2).map(material=>({type:'Stock',title:`${material.name} is below minimum`,detail:`${material.stock} ${material.unit} remaining`,tone:'warning'})),...overdue.slice(0,2).map(invoice=>({type:'Invoice',title:`${invoice.id} needs follow-up`,detail:`${money(invoice.amount)} overdue`,tone:'danger'})),...onHold.slice(0,1).map(project=>({type:'Project',title:`${project.name} is on hold`,detail:'Review permit or delivery status',tone:'neutral'}))];
  const metrics = [['Projects',db.projects.length,'Total in workspace','blue'],['Active projects',db.projects.filter(p=>p.status==='In Progress').length,'Currently in progress','green'],['Completed',db.projects.filter(p=>p.status==='Completed').length,'Jobs delivered','orange'],['Customers',db.customers.length,'Active relationships','purple'],['Material value',money(materialCost),'Current inventory','blue'],['Labour cost',money(labourCost),'Crew allocation','green'],['Total expenses',money(expenseTotal),'Recorded spending','orange'],['Pending payments',money(pendingPayments),'Needs collection','red']];
  byId('metrics').innerHTML = metrics.map(item=>`<div class="metric-card ${item[3]}"><div class="metric-top"><span>${item[0]}</span><span class="metric-dot"></span></div><div class="metric-value">${item[1]}</div><span class="metric-change">${item[2]}</span></div>`).join('');
  byId('activeProjectsTable').innerHTML = db.projects.filter(p=>p.status!=='Completed').slice(0,4).map(dashboardProjectRow).join('') || emptyRow(5,'No projects yet. Add your first project to start tracking work.');
  byId('alertsList').innerHTML = attention.length ? attention.map(item=>`<div class="dashboard-alert"><span class="alert-marker ${item.tone}">${item.type.charAt(0)}</span><div><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.detail)}</small></div></div>`).join('') : '<div class="empty-state">You are all caught up.</div>';
  const activity = [...db.expenses.slice(0,2).map(expense=>({title:`${expense.description} recorded`,detail:`${money(expense.amount)} - ${expense.date}`,tone:'expense'})),...db.tasks.filter(task=>task.status==='In Progress').slice(0,2).map(task=>({title:`${task.name} is in progress`,detail:`${task.project} - ${task.worker}`,tone:'task'}))].slice(0,5);
  byId('activityList').innerHTML = activity.length ? activity.map(item=>`<div class="activity-item"><span class="activity-marker ${item.tone}"></span><div><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.detail)}</small></div></div>`).join('') : '<div class="empty-state">No recent activity yet.</div>';
  const performance = [{month:'Apr',revenue:42,expense:18},{month:'May',revenue:54,expense:24},{month:'Jun',revenue:63,expense:31},{month:'Jul',revenue:71,expense:39},{month:'Aug',revenue:84,expense:48},{month:'Sep',revenue:96,expense:56}];
  byId('barChart').innerHTML = performance.map(item=>`<div class="bar-group"><div class="bars"><i class="bar revenue" style="height:${item.revenue}%" title="${item.month} revenue"></i><i class="bar expense" style="height:${item.expense}%" title="${item.month} expenses"></i></div><span>${item.month}</span></div>`).join('');
  const outstanding = db.invoices.filter(invoice=>invoice.status !== 'Paid').reduce((sum,invoice)=>sum + invoice.amount,0);
  const completedTasks = db.tasks.filter(task=>task.status === 'Completed').length;
  const lowStockCount = lowStock.length;
  const reportProfit = -expenseTotal;
  byId('dashboardReportContent').innerHTML = `<article class="dashboard-report-card"><h3>Financial overview</h3><dl><div><dt>Outstanding invoices</dt><dd class="warning">${money(outstanding)}</dd></div><div><dt>Estimated balance</dt><dd class="report-total">${money(reportProfit)}</dd></div></dl></article><article class="dashboard-report-card"><h3>Work overview</h3><dl><div><dt>Total projects</dt><dd>${db.projects.length}</dd></div><div><dt>Active projects</dt><dd>${db.projects.filter(p=>p.status==='In Progress').length}</dd></div><div><dt>Completed projects</dt><dd class="positive">${db.projects.filter(p=>p.status==='Completed').length}</dd></div><div><dt>Tasks completed</dt><dd>${completedTasks} of ${db.tasks.length}</dd></div></dl></article><article class="dashboard-report-card"><h3>Resources and records</h3><dl><div><dt>Customers</dt><dd>${db.customers.length}</dd></div><div><dt>Workers</dt><dd>${db.workers.length}</dd></div><div><dt>Materials tracked</dt><dd>${db.materials.length}</dd></div><div><dt>Low stock items</dt><dd class="${lowStockCount?'warning':'positive'}">${lowStockCount}</dd></div></dl></article>`;
}
function projectRow(p, actions=false){return `<tr><td><div class="project-table-cell"><span class="project-table-label">Project</span><b>${escapeHtml(p.name)}</b><small>${p.id}</small></div></td><td>${escapeHtml(p.customer)}</td><td>${escapeHtml(p.type)}</td><td>${money(p.budget)}</td><td><div class="progress-wrap"><span class="progress"><i style="width:${p.progress}%"></i></span><small>${p.progress}%</small></div></td><td>${status(p.status)}</td>${actions?`<td><span class="row-actions project-row-actions"><button title="Print project quotation" data-print-project="${escapeHtml(p.id)}">&#128424; Print</button><button title="Edit project" data-edit="${escapeHtml(p.id)}">Edit</button><button title="Delete project" data-delete="${escapeHtml(p.id)}">Delete</button></span></td>`:''}</tr>`}
function dashboardProjectRow(p){return `<tr><td><div class="dashboard-project-cell"><span class="dashboard-project-label">Project</span><b>${escapeHtml(p.name)}</b><small>${p.id}</small></div></td><td>${escapeHtml(p.customer)}</td><td><div class="progress-wrap"><span class="progress"><i style="width:${p.progress}%"></i></span><small>${p.progress}%</small></div></td><td>${escapeHtml(p.due)}</td><td>${status(p.status)}</td></tr>`}
function projectReportStats(project){
  const tasks = db.tasks.filter(task => task.project === project.name);
  const pendingTasks = tasks.filter(task => task.status !== 'Completed');
  const remainingTasks = pendingTasks.length;
  const laborHours = pendingTasks.reduce((sum, task) => sum + Math.max(4, Number(task.rate || 0) * 2), 0);
  const dueDate = project.due || 'Not set';
  const overdue = project.status !== 'Completed' && dueDate !== 'Not set' && new Date(dueDate) < new Date();
  return { tasks, remainingTasks, laborHours, dueDate, overdue };
}

function defaultReportFilters(){
  return { project: 'all', customer: 'all', dateFrom: '', dateTo: '', category: 'all' };
}

let reportFilters = defaultReportFilters();

function populationReportFilters(){
  const projectFilter = byId('reportProjectFilter');
  const customerFilter = byId('reportCustomerFilter');
  if (!projectFilter || !customerFilter) return;
  const projects = [...db.projects].sort((a, b) => String(a.name).localeCompare(String(b.name)));
  const customers = [...new Set(db.projects.map(project => project.customer).filter(Boolean))].sort();
  projectFilter.innerHTML = '<option value="all">All Projects</option>' + projects.map(project => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.name)}</option>`).join('');
  customerFilter.innerHTML = '<option value="all">All Customers</option>' + customers.map(customer => `<option value="${escapeHtml(customer)}">${escapeHtml(customer)}</option>`).join('');
  projectFilter.value = reportFilters.project || 'all';
  customerFilter.value = reportFilters.customer || 'all';
  const dateFrom = byId('reportDateFrom');
  const dateTo = byId('reportDateTo');
  const category = byId('reportCostCategory');
  if (dateFrom) dateFrom.value = reportFilters.dateFrom || '';
  if (dateTo) dateTo.value = reportFilters.dateTo || '';
  if (category) category.value = reportFilters.category || 'all';
}

function projectMatchesFilters(project){
  if (reportFilters.project !== 'all' && project.id !== reportFilters.project && project.name !== reportFilters.project) return false;
  if (reportFilters.customer !== 'all' && String(project.customer || '') !== String(reportFilters.customer)) return false;

  const projectName = project.name || '';
  const expenseRows = db.expenses.filter(expense => expense.project === projectName);
  const paymentRows = db.payments.filter(payment => payment.project === projectName);
  const projectDates = [project.start, project.due, ...expenseRows.map(expense => expense.date), ...paymentRows.map(payment => payment.date)].filter(Boolean);

  if (reportFilters.dateFrom) {
    const fromDate = new Date(reportFilters.dateFrom);
    if (!projectDates.some(date => {
      const parsed = new Date(date);
      return !Number.isNaN(parsed.getTime()) && parsed >= fromDate;
    })) return false;
  }

  if (reportFilters.dateTo) {
    const toDate = new Date(reportFilters.dateTo);
    if (!projectDates.some(date => {
      const parsed = new Date(date);
      return !Number.isNaN(parsed.getTime()) && parsed <= toDate;
    })) return false;
  }

  if (reportFilters.category !== 'all') {
    const categoryText = String(reportFilters.category).toLowerCase();
    const matches = expenseRows.some(expense => {
      const text = `${expense.category || ''} ${expense.description || ''}`.toLowerCase();
      if (categoryText === 'material') return /material/i.test(text);
      if (categoryText === 'labour') return /labour|worker|crew|wage/i.test(text);
      if (categoryText === 'food') return /food|meal|lunch|dinner|breakfast|snack/i.test(text);
      if (categoryText === 'transportation') return /transport|travel|vehicle|delivery/i.test(text);
      if (categoryText === 'fuel') return /fuel|gas|diesel/i.test(text);
      if (categoryText === 'tools') return /tool|saw|drill|hammer/i.test(text);
      if (categoryText === 'equipment') return /equipment|machine|generator/i.test(text);
      if (categoryText === 'accommodation') return /accommodation|hotel|room|stay/i.test(text);
      if (categoryText === 'electricity') return /electric|wire|cable|lighting|power/i.test(text);
      if (categoryText === 'miscellaneous') return /misc|miscellaneous|general/i.test(text);
      if (categoryText === 'other') return !/material|labour|food|transport|fuel|tool|equipment|accommodation|electric|misc/i.test(text);
      return text.includes(categoryText);
    });
    if (!matches) return false;
  }

  return true;
}

function getProjectFinancialData(project){
  const projectName = project.name || '';
  const quotation = db.quotations.find(item => item.project === projectName) || null;
  const paymentRows = db.payments.filter(payment => payment.project === projectName);
  const expenseRows = db.expenses.filter(expense => expense.project === projectName);
  const labourRows = db.workers.filter(worker => worker.project === projectName);

  const materialCost = expenseRows.filter(expense => /material/i.test(String(expense.category || ''))).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const labourCost = labourRows.reduce((sum, worker) => sum + Number(worker.cost || 0) + Number(worker.overtimePay || 0) + Number(worker.transport || 0), 0);
  const otherExpenseTotal = expenseRows.filter(expense => !/material/i.test(String(expense.category || ''))).reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const totalProjectCost = materialCost + labourCost + otherExpenseTotal;
  const totalPaid = paymentRows.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const quotationAmount = Number(quotation?.amount || project.budget || 0);
  const revenue = quotationAmount > 0 ? Math.max(quotationAmount, totalPaid) : totalPaid;
  const grossProfit = revenue - totalProjectCost;
  const profit = Math.max(0, grossProfit);
  const loss = Math.max(0, -grossProfit);
  const profitMargin = revenue ? (grossProfit / revenue) * 100 : 0;
  const outstanding = Math.max(0, quotationAmount - totalPaid);

  return {
    project,
    quotation,
    quotationAmount,
    paymentRows,
    expenseRows,
    labourRows,
    materialCost,
    labourCost,
    otherExpenseTotal,
    totalProjectCost,
    totalPaid,
    revenue,
    profit,
    loss,
    outstanding,
    profitMargin,
  };
}

function renderProjectReports(){
  const container = byId('reportProjectContent');
  if (!container) return;
  populationReportFilters();

  const filteredProjects = [...db.projects].filter(project => projectMatchesFilters(project));
  if (!filteredProjects.length) {
    container.innerHTML = '<div class="panel"><div class="empty-state">No projects match the selected filters.</div></div>';
    return;
  }

  const selectedProject = (() => {
    const selected = byId('reportProjectFilter')?.value || 'all';
    if (selected !== 'all') {
      return filteredProjects.find(project => project.id === selected || project.name === selected) || filteredProjects[0];
    }
    return filteredProjects[0];
  })();

  const data = getProjectFinancialData(selectedProject);
  const summaryCards = [
    { label: 'Contract amount', value: money(data.quotationAmount), tone: 'blue' },
    { label: 'Total paid', value: money(data.totalPaid), tone: 'green' },
    { label: 'Project cost', value: money(data.totalProjectCost), tone: 'red' },
    { label: 'Outstanding', value: money(data.outstanding), tone: data.outstanding > 0 ? 'warning' : 'muted' },
    { label: 'Profit', value: money(data.profit), tone: data.profit > 0 ? 'positive' : 'muted' },
    { label: 'Loss', value: money(data.loss), tone: data.loss > 0 ? 'negative' : 'muted' },
  ];

  const materialRows = data.expenseRows.filter(expense => /material/i.test(String(expense.category || '')));
  const labourRowsHtml = data.labourRows.length ? data.labourRows.map(worker => {
    const total = Number(worker.cost || 0) + Number(worker.overtimePay || 0) + Number(worker.transport || 0);
    return `<tr><td>${escapeHtml(worker.name || 'Worker')}</td><td>${escapeHtml(worker.skill || 'Labour')}</td><td>${escapeHtml(worker.project || '—')}</td><td>${money(total)}</td></tr>`;
  }).join('') : '<tr><td colspan="4" class="empty-table">No labour records found.</td></tr>';

  const expenseRowsHtml = data.expenseRows.length ? data.expenseRows.map(expense => `<tr><td>${escapeHtml(expense.date || '—')}</td><td>${escapeHtml(expense.category || 'Other')}</td><td>${escapeHtml(expense.description || 'Expense')}</td><td>${money(Number(expense.amount || 0))}</td></tr>`).join('') : '<tr><td colspan="4" class="empty-table">No expense records found.</td></tr>';
  const paymentRowsHtml = data.paymentRows.length ? data.paymentRows.map(payment => `<tr><td>${escapeHtml(payment.date || '—')}</td><td>${escapeHtml(payment.method || '—')}</td><td>${escapeHtml(payment.reference || payment.id || payment.description || '—')}</td><td>${money(Number(payment.amount || 0))}</td></tr>`).join('') : '<tr><td colspan="4" class="empty-table">No payment records found.</td></tr>';
  const materialRowsHtml = materialRows.length ? materialRows.map(expense => `<tr><td>${escapeHtml(expense.description || 'Material')}</td><td>${escapeHtml(expense.category || 'Material')}</td><td>${escapeHtml(expense.date || '—')}</td><td>${money(Number(expense.amount || 0))}</td></tr>`).join('') : '<tr><td colspan="4" class="empty-table">No material costs found.</td></tr>';

  container.innerHTML = `
    <div class="report-summary-strip">
      ${summaryCards.map(card => `<div class="report-summary-card ${card.tone}"><span>${escapeHtml(card.label)}</span><strong>${escapeHtml(card.value)}</strong></div>`).join('')}
    </div>
    <section class="panel report-overview-panel">
      <div class="panel-heading"><div><h2>Project overview</h2><p class="muted">${escapeHtml(selectedProject.name)} • ${escapeHtml(selectedProject.customer || 'Unassigned customer')}</p></div></div>
      <div class="report-overview-grid">
        <div><span>Project</span><strong>${escapeHtml(selectedProject.name)}</strong></div>
        <div><span>Customer</span><strong>${escapeHtml(selectedProject.customer)}</strong></div>
        <div><span>Status</span><strong>${escapeHtml(selectedProject.status)}</strong></div>
        <div><span>Due date</span><strong>${escapeHtml(selectedProject.due)}</strong></div>
        <div><span>Budget</span><strong>${money(Number(selectedProject.budget || 0))}</strong></div>
        <div><span>Progress</span><strong>${Number(selectedProject.progress || 0)}%</strong></div>
        <div><span>Revenue</span><strong>${money(data.revenue)}</strong></div>
        <div><span>Profit margin</span><strong>${Number(data.profitMargin || 0).toFixed(2)}%</strong></div>
      </div>
    </section>
    <section class="report-two-column">
      <div class="panel">
        <div class="panel-heading"><div><h2>Material costs</h2><p class="muted">Tracked material purchases against the project.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th></tr></thead><tbody>${materialRowsHtml}</tbody><tfoot><tr><th colspan="3">Material total</th><th>${money(data.materialCost)}</th></tr></tfoot></table></div>
      </div>
      <div class="panel">
        <div class="panel-heading"><div><h2>Labour cost</h2><p class="muted">Wages, overtime and transport tied to this project.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>Worker</th><th>Role</th><th>Project</th><th>Amount</th></tr></thead><tbody>${labourRowsHtml}</tbody><tfoot><tr><th colspan="3">Labour total</th><th>${money(data.labourCost)}</th></tr></tfoot></table></div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><h2>Expenses by date</h2><p class="muted">All recorded project expenses.</p></div></div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead><tbody>${expenseRowsHtml}</tbody><tfoot><tr><th colspan="3">Expense total</th><th>${money(data.otherExpenseTotal)}</th></tr></tfoot></table></div>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><h2>Payment summary</h2><p class="muted">Completed payments and current outstandings.</p></div></div>
      <div class="report-payment-summary">
        <div><span>Quoted amount</span><strong>${money(data.quotationAmount)}</strong></div>
        <div><span>Paid</span><strong>${money(data.totalPaid)}</strong></div>
        <div><span>Outstanding</span><strong>${money(data.outstanding)}</strong></div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Method</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${paymentRowsHtml}</tbody><tfoot><tr><th colspan="3">Total payments</th><th>${money(data.totalPaid)}</th></tr></tfoot></table></div>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><h2>Profit / loss</h2><p class="muted">Net result from revenue and total cost.</p></div></div>
      <div class="report-profit-block ${data.profit > 0 ? 'positive' : data.loss > 0 ? 'negative' : 'muted'}">
        <div><span>Revenue</span><strong>${money(data.revenue)}</strong></div>
        <div><span>Total cost</span><strong>${money(data.totalProjectCost)}</strong></div>
        <div><span>Net result</span><strong>${data.profit > 0 ? money(data.profit) : money(data.loss)}</strong></div>
      </div>
    </section>
  `;
}

function resetReportFilters(){
  reportFilters = defaultReportFilters();
  populationReportFilters();
  renderProjectReports();
}

function printSelectedProjectReport(){
  const selected = byId('reportProjectFilter')?.value || 'all';
  const projects = selected !== 'all' ? db.projects.filter(project => project.id === selected || project.name === selected) : [...db.projects];
  const project = projects[0] || db.projects[0];
  if (!project) {
    notify('No project available to print');
    return;
  }

  const data = getProjectFinancialData(project);
  const page = window.open('', '_blank', 'width=1000,height=900');
  if (!page) return;

  const materialRowsHtml = data.expenseRows.filter(expense => /material/i.test(String(expense.category || ''))).map(expense => `<tr><td>${escapeHtml(expense.description || 'Material')}</td><td>${escapeHtml(expense.category || 'Material')}</td><td>${escapeHtml(expense.date || '—')}</td><td>${money(Number(expense.amount || 0))}</td></tr>`).join('') || '<tr><td colspan="4">No material costs</td></tr>';
  const labourRowsHtml = data.labourRows.length ? data.labourRows.map(worker => { const total = Number(worker.cost || 0) + Number(worker.overtimePay || 0) + Number(worker.transport || 0); return `<tr><td>${escapeHtml(worker.name || 'Worker')}</td><td>${escapeHtml(worker.skill || 'Labour')}</td><td>${escapeHtml(worker.project || '—')}</td><td>${money(total)}</td></tr>`; }).join('') : '<tr><td colspan="4">No labour costs</td></tr>';
  const otherExpenseRowsHtml = data.expenseRows.filter(expense => !/material/i.test(String(expense.category || ''))).map(expense => `<tr><td>${escapeHtml(expense.date || '—')}</td><td>${escapeHtml(expense.category || 'Other')}</td><td>${escapeHtml(expense.description || 'Expense')}</td><td>${money(Number(expense.amount || 0))}</td></tr>`).join('') || '<tr><td colspan="4">No other expenses</td></tr>';
  const paymentHtml = data.paymentRows.length ? data.paymentRows.map(payment => `<tr><td>${escapeHtml(payment.date || '—')}</td><td>${escapeHtml(payment.method || '—')}</td><td>${escapeHtml(payment.reference || payment.id || payment.description || '—')}</td><td>${money(Number(payment.amount || 0))}</td></tr>`).join('') : '<tr><td colspan="4">No payments</td></tr>';
  const reportDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  page.document.write(`<!doctype html><html><head><title>${escapeHtml(project.name)} report</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;margin:0;background:#f4f6f8;padding:18px;color:#17212f}*{box-sizing:border-box}.sheet{max-width:980px;margin:auto;background:#fff;border:1px solid #dfe5ec;border-radius:10px;overflow:hidden}.header{display:flex;justify-content:space-between;align-items:center;padding:24px 28px;background:#182a42;color:#fff}.header h1{margin:0;font-size:24px}.header p{margin:6px 0 0;color:#d9e2ef;font-size:12px}.summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:20px 28px;background:#f8fafc}.card{border:1px solid #e7edf6;padding:12px 14px;border-radius:8px;background:#fff}.card span{display:block;font-size:10px;color:#7b8798;text-transform:uppercase;letter-spacing:.7px}.card strong{display:block;margin-top:8px;font-size:17px}.section{padding:0 28px 20px}.info{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.info div{padding:10px 12px;border:1px solid #edf1f5;border-radius:8px;background:#fafcff}.info span{display:block;color:#78869a;font-size:10px;text-transform:uppercase;margin-bottom:5px}.table-wrap{overflow:auto;border:1px solid #e8edf2;border-radius:8px}.table-wrap table{width:100%;border-collapse:collapse}th,td{padding:9px 10px;border-bottom:1px solid #edf1f5;text-align:left;font-size:12px}thead th{background:#f6f9fd;color:#6f7c8c;font-size:10px;text-transform:uppercase;letter-spacing:.6px}tfoot th{background:#fff8dc;color:#8a6500}.profit-panel{border:1px solid #ead9a2;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#fffdf4 0%,#fff9ea 100%)}.profit-header{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#f4d77a;color:#3a2c0a;font-weight:700;text-transform:uppercase;letter-spacing:.8px;font-size:11px}.profit-table{width:100%;border-collapse:collapse}.profit-table th,.profit-table td{padding:12px 16px;border-bottom:1px solid #f0e7c8;text-align:left;font-size:12px}.profit-table th{background:#fff5cf;color:#6d5216}.profit-table td:last-child,.profit-table th:last-child{text-align:right}.profit-table tbody tr:last-child td{border-bottom:none}.profit-total{background:#1f2d3d;color:#fff;font-weight:700}.profit-total td{padding:14px 16px}.profit-highlight{color:#0f8a5f;font-weight:700}.profit-warning{color:#b87000;font-weight:700}.footer{padding:20px 28px 28px;color:#7c899b;font-size:11px}@media print{body{padding:0}.sheet{border:0;border-radius:0;box-shadow:none}}</style></head><body><div class="sheet"><header class="header"><div><h1>${escapeHtml(project.name)}</h1><p>Project financial report</p></div><div><p>Report date: ${escapeHtml(reportDate)}</p><p>Customer: ${escapeHtml(project.customer)}</p><p>Status: ${escapeHtml(project.status)}</p></div></header><div class="summary"><div class="card"><span>Contract amount</span><strong>${money(data.quotationAmount)}</strong></div><div class="card"><span>Total paid</span><strong>${money(data.totalPaid)}</strong></div><div class="card"><span>Project cost</span><strong>${money(data.totalProjectCost)}</strong></div><div class="card"><span>Outstanding</span><strong>${money(data.outstanding)}</strong></div></div><div class="section"><div class="info"><div><span>Project</span><b>${escapeHtml(project.name)}</b></div><div><span>Customer</span><b>${escapeHtml(project.customer)}</b></div><div><span>Location</span><b>${escapeHtml(project.location || 'Not set')}</b></div><div><span>Type</span><b>${escapeHtml(project.type || 'Project')}</b></div><div><span>Due date</span><b>${escapeHtml(project.due || 'Not set')}</b></div><div><span>Progress</span><b>${Number(project.progress || 0)}%</b></div></div></div><div class="section"><h2>1. Material cost</h2><div class="table-wrap"><table><thead><tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th></tr></thead><tbody>${materialRowsHtml}</tbody><tfoot><tr><th colspan="3">Material total</th><th>${money(data.materialCost)}</th></tr></tfoot></table></div></div><div class="section"><h2>2. Labour cost</h2><div class="table-wrap"><table><thead><tr><th>Worker</th><th>Role</th><th>Project</th><th>Amount</th></tr></thead><tbody>${labourRowsHtml}</tbody><tfoot><tr><th colspan="3">Labour total</th><th>${money(data.labourCost)}</th></tr></tfoot></table></div></div><div class="section"><h2>3. Other expenses</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead><tbody>${otherExpenseRowsHtml}</tbody><tfoot><tr><th colspan="3">Expense total</th><th>${money(data.otherExpenseTotal)}</th></tr></tfoot></table></div></div><div class="section"><h2>Complete report</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Method</th><th>Reference</th><th>Amount</th></tr></thead><tbody>${paymentHtml}</tbody><tfoot><tr><th colspan="3">Total payments</th><th>${money(data.totalPaid)}</th></tr></tfoot></table></div></div><div class="section"><div class="profit-panel"><div class="profit-header"><span>Profit / loss</span><span>${data.profit > 0 ? 'Profit' : data.loss > 0 ? 'Loss' : 'Balanced'}</span></div><table class="profit-table"><thead><tr><th>Item</th><th>Amount</th></tr></thead><tbody><tr><td>Revenue</td><td>${money(data.revenue)}</td></tr><tr><td>Total cost</td><td>${money(data.totalProjectCost)}</td></tr><tr><td>Profit</td><td class="profit-highlight">${money(data.profit)}</td></tr><tr><td>Loss</td><td class="profit-warning">${money(data.loss)}</td></tr><tr><td>Outstanding</td><td>${money(data.outstanding)}</td></tr><tr><td>Profit margin</td><td>${Number(data.profitMargin || 0).toFixed(2)}%</td></tr><tr class="profit-total"><td>Final result</td><td class="${data.profit > 0 ? 'profit-highlight' : data.loss > 0 ? 'profit-warning' : ''}">${data.profit > 0 ? `Profit ${money(data.profit)}` : data.loss > 0 ? `Loss ${money(data.loss)}` : 'Balanced'}</td></tr></tbody></table></div></div><div class="footer">Complete project report generated for ${escapeHtml(project.name)}.</div></div></body></html>`);
  page.document.close();
  page.focus();
  page.print();
}

function exportProjectReportExcel(){
  const selected = byId('reportProjectFilter')?.value || 'all';
  const project = selected !== 'all' ? db.projects.find(item => item.id === selected || item.name === selected) || db.projects[0] : db.projects[0];
  if (!project) {
    notify('No project available for export');
    return;
  }

  const data = getProjectFinancialData(project);
  const rows = [
    ['Project', project.name],
    ['Customer', project.customer],
    ['Status', project.status],
    ['Due date', project.due],
    ['Quotation amount', data.quotationAmount],
    ['Revenue', data.revenue],
    ['Total cost', data.totalProjectCost],
    ['Total paid', data.totalPaid],
    ['Outstanding', data.outstanding],
    ['Profit', data.profit],
    ['Loss', data.loss],
    ['Profit margin %', Number(data.profitMargin || 0).toFixed(2)],
  ];

  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${String(project.name || 'project-report').replace(/\s+/g, '-').toLowerCase()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function bindReportControls(){
  byId('generateReport')?.addEventListener('click', renderProjectReports);
  byId('resetReportFilters')?.addEventListener('click', resetReportFilters);
  byId('exportPdfReport')?.addEventListener('click', printSelectedProjectReport);
  byId('exportExcelReport')?.addEventListener('click', exportProjectReportExcel);

  ['reportProjectFilter', 'reportCustomerFilter', 'reportDateFrom', 'reportDateTo', 'reportCostCategory'].forEach(id => {
    const control = byId(id);
    if (!control) return;
    const update = () => {
      reportFilters.project = byId('reportProjectFilter')?.value || 'all';
      reportFilters.customer = byId('reportCustomerFilter')?.value || 'all';
      reportFilters.dateFrom = byId('reportDateFrom')?.value || '';
      reportFilters.dateTo = byId('reportDateTo')?.value || '';
      reportFilters.category = byId('reportCostCategory')?.value || 'all';
      renderProjectReports();
    };
    control.addEventListener('change', update);
    control.addEventListener('input', update);
  });
}

bindReportControls();

function renderProjects(){if(!byId('projectsTable'))return;const query=(byId('projectSearch')?.value||'').toLowerCase(), filter=byId('projectStatusFilter')?.value||'all';byId('projectsTable').innerHTML=db.projects.filter(p=>(filter==='all'||p.status===filter)&&`${p.name} ${p.customer} ${p.type}`.toLowerCase().includes(query)).map(p=>projectRow(p,true)).join('')||emptyRow(7,'No projects found');}
function renderCustomers(){if(!byId('customersTable'))return;const query=(byId('customerSearch')?.value||'').toLowerCase();byId('customersTable').innerHTML=db.customers.filter(c=>`${c.name} ${c.email} ${c.address}`.toLowerCase().includes(query)).map(c=>`<tr><td><div class="project-cell"><span class="project-mark">${c.name.charAt(0)}</span><span>${escapeHtml(c.name)}<small>${c.id}</small></span></div></td><td>${escapeHtml(c.email)}<small>${escapeHtml(c.phone)}</small></td><td>${escapeHtml(c.address)}</td><td>${c.projects}</td><td>${money(c.billed)}</td><td><span class="row-actions customer-row-actions"><button class="customer-edit-action" title="Edit customer" data-edit="${c.id}">Edit</button><button title="Delete customer" data-delete="${c.id}">Delete</button><button title="Print customer" data-print-customer="${c.id}">Print</button></span></td></tr>`).join('')||emptyRow(6,'No customers found');}
function renderMaterials(){if(!byId('materialsTable')||!byId('inventoryValue')||!byId('lowStockCount')||!byId('priceUpdateCount'))return;const query=(byId('materialSearch')?.value||'').toLowerCase();byId('materialsTable').innerHTML=db.materials.filter(m=>`${m.name} ${m.brand} ${m.spec}`.toLowerCase().includes(query)).map(m=>{const selling=Number(m.sellingPrice??m.price),market=Number.isFinite(Number(m.marketPrice))?Number(m.marketPrice):null,difference=market===null?null:selling-market;return `<tr class="material-row"><td><div class="material-identity"><span class="material-mark">${escapeHtml(m.name.charAt(0))}</span><span><b>${escapeHtml(m.name)}</b><small>${m.id}</small></span></div></td><td><b>${escapeHtml(m.brand)}</b><small>${escapeHtml(m.spec)}</small></td><td><span class="material-stock ${m.stock<m.min?'is-low':''}">${m.stock} ${m.unit}</span>${m.stock<m.min?status('Low stock'):''}</td><td><strong class="material-price">${money(selling)}</strong><small>selling / ${m.unit}</small><small class="market-reference">Market: ${market===null?'Not Available':money(market)}${difference===null?'':` Â· Diff ${money(difference)}`}</small></td><td>${escapeHtml(m.supplier)}</td><td>${m.updated}</td><td><span class="material-actions project-row-actions"><button title="Edit material" data-edit="${escapeHtml(m.id)}">Edit</button><button title="Delete material" data-delete="${escapeHtml(m.id)}">Delete</button><button title="Print material" data-print-material="${escapeHtml(m.id)}">&#128424; Print</button></span></td></tr>`}).join('')||emptyRow(7,'No materials found');byId('inventoryValue').textContent=money(db.materials.reduce((s,m)=>s+m.stock*Number(m.sellingPrice??m.price),0));byId('lowStockCount').textContent=db.materials.filter(m=>m.stock<m.min).length;byId('priceUpdateCount').textContent=db.materials.filter(m=>m.price!==m.previous).length;}
function renderMarket(){if(!byId('marketTable'))return;byId('marketTable').innerHTML=db.materials.map(m=>{const selling=Number(m.sellingPrice??m.price),market=Number.isFinite(Number(m.marketPrice))?Number(m.marketPrice):null,difference=market===null?null:selling-market;return `<tr><td><b>${escapeHtml(m.name)}</b><small>${m.brand}</small></td><td>${escapeHtml(m.spec)} - ${m.unit}</td><td><b>${money(selling)}</b><small>Selling price</small></td><td>${market===null?'Not Available':money(market)}<small>Market price</small></td><td class="${difference!==null&&difference<0?'negative':''}">${difference===null?'Not Available':money(difference)}</td><td>${escapeHtml(m.source||'Not verified')}<small>${m.updated}</small></td><td><button class="text-button" data-price="${m.id}">Update</button></td></tr>`}).join('');}
function renderTasks(){if(!byId('tasksTable'))return;const query=(byId('taskSearch')?.value||'').toLowerCase(),filter=byId('taskStatusFilter')?.value||'all';byId('tasksTable').innerHTML=db.tasks.filter(t=>(filter==='all'||t.status===filter)&&`${t.name} ${t.project} ${t.worker}`.toLowerCase().includes(query)).map(t=>`<tr><td><b>${escapeHtml(t.name)}</b><small>${t.id}</small></td><td>${escapeHtml(t.project)}</td><td>${escapeHtml(t.worker)}</td><td>${money(t.rate)}/hr</td><td>${t.start} - ${t.due}</td><td>${status(t.status)}</td><td>${rowActions(t.id)}</td></tr>`).join('')||emptyRow(7,'No tasks found');}
const workerTotal = worker => Number(worker.cost||0) + Number(worker.overtimePay||0) + Number(worker.transport||0);
function renderWorkers(){if(!byId('workersGrid')||!byId('workersTable'))return;byId('workersGrid').innerHTML=db.workers.map(w=>`<div class="person-card"><div class="person-top"><div class="person-avatar">${w.name.split(' ').map(n=>n[0]).join('')}</div><div><h3>${escapeHtml(w.name)}</h3><p class="skill">${escapeHtml(w.skill)}</p></div><div class="worker-card-actions"><button class="secondary-button worker-edit" data-edit="${w.id}" type="button">Edit</button><button class="secondary-button worker-delete" data-delete="${w.id}" type="button">Delete</button><button class="secondary-button worker-print" data-print-worker="${w.id}" type="button">Print slip</button></div></div><div class="person-meta"><div><span>Assigned project</span><b>${escapeHtml(w.project)}</b></div><div><span>Daily laborer rate</span><b>${money(w.rate)}/day</b></div><div><span>Labour cost</span><b>${money(w.cost)}</b></div><div><span>Overtime</span><b>${w.overtimeHours||0} hrs / ${money(w.overtimePay)}</b></div><div><span>Attendance</span><b>${escapeHtml(w.attendance||'0%')} (${w.attendanceDays||0}/${w.attendanceTotal||0} days)</b></div><div><span>Total money</span><b>${money(workerTotal(w))}</b></div></div></div>`).join('');byId('workersTable').innerHTML=db.workers.map(w=>`<tr><td><b>${escapeHtml(w.name)}</b><small>${escapeHtml(w.skill)}</small></td><td>${escapeHtml(w.project)}</td><td>${money(w.rate)}/day</td><td>${money(w.cost)}</td><td>${w.overtimeHours||0} hrs / ${money(w.overtimePay)}</td><td>${escapeHtml(w.attendance||'0%')} (${w.attendanceDays||0}/${w.attendanceTotal||0} days)</td><td>${money(workerTotal(w))}</td><td><button class="secondary-button worker-print" data-print-worker="${w.id}" type="button">Print slip</button></td><td>${rowActions(w.id)}</td></tr>`).join('');}
function estimateSmartQuote(data){
  const floors = Math.max(1, Number(data.floors || 1));
  const rooms = Math.max(1, Number(data.rooms || 1));
  const buildingType = String(data.buildingType || 'House');
  const totalRooms = floors * rooms;
  const materialAverage = db.materials.length ? db.materials.reduce((sum, item) => sum + (Number(item.price) || 0), 0) / db.materials.length : 0;
  const wireBudget = db.materials.find(item => /wire|cable/i.test(item.name))?.price || materialAverage || 1;
  const lightBudget = db.materials.find(item => /light|led/i.test(item.name))?.price || materialAverage || 1;
  const socketBudget = db.materials.find(item => /socket|switch/i.test(item.name))?.price || materialAverage || 1;
  const fanBudget = db.materials.find(item => /fan/i.test(item.name))?.price || materialAverage || 1;
  const powerMultiplier = {'House':1.0,'Building':1.2,'Office':1.25,'Shop':1.1,'Other':1.1}[buildingType] || 1;
  const itemMaterial = Math.max(1, totalRooms) * (wireBudget * 8 + lightBudget * 2 + socketBudget * 4 + fanBudget + 80) * powerMultiplier;
  const labor = Math.max(1, totalRooms) * (Number(db.workers.length ? db.workers.reduce((sum, worker) => sum + Number(worker.rate || 0), 0) / db.workers.length : 40) * 3.8);
  const rawAmount = itemMaterial + labor + Number(data.additionalCharges || 0) + Number(data.tax || 0) - Number(data.discount || 0);
  return Math.max(0, Math.round(rawAmount));
}
function renderFinance(){const quotationsTable=byId('quotationsTable');const expensesTable=byId('expensesTable');const invoicesTable=byId('invoicesTable');const expenseTotal=byId('expenseTotal');if(!quotationsTable||!expensesTable||!invoicesTable)return;quotationsTable.innerHTML=db.quotations.map(q=>`<tr><td><b>${q.id}</b></td><td>${escapeHtml(q.customer)}<small>${escapeHtml(q.project)}</small></td><td>${money(q.amount)}</td><td>${q.valid}</td><td>${q.status === 'Sent' ? '' : status(q.status)}</td><td>${quotationRowActions(q.id)}</td></tr>`).join('');expensesTable.innerHTML=db.expenses.map(e=>`<tr><td><b>${escapeHtml(e.description)}</b><small>${e.id}</small></td><td>${escapeHtml(e.project)}</td><td>${escapeHtml(e.category)}</td><td>${e.date}</td><td><b>${money(e.amount)}</b></td><td>${rowActions(e.id)}</td></tr>`).join('');invoicesTable.innerHTML=db.invoices.map(i=>`<tr><td><b>${i.id}</b><small>${escapeHtml(i.item||'Invoice')}</small></td><td>${escapeHtml(i.customer)}<small>${escapeHtml(i.project)}${i.quantity?` Â· Qty ${i.quantity}`:''}</small></td><td>${i.issued||'Draft'}</td><td>${i.due}</td><td><b>${money(i.amount)}</b></td><td>${status(i.status)}</td><td>${rowActions(i.id)}</td></tr>`).join('')||emptyRow(7,'No invoices yet. Generate an invoice to add one.');if(expenseTotal)expenseTotal.textContent=money(db.expenses.reduce((s,e)=>s+e.amount,0));const estimate = db.quotations.length ? Math.max(...db.quotations.map(q=>Number(q.amount||0))) : 0;const smartCustomerName=byId('smartCustomerName');if(smartCustomerName)smartCustomerName.textContent = db.customers[0]?.name || 'Customer';const smartProjectName=byId('smartProjectName');if(smartProjectName)smartProjectName.textContent = db.projects[0]?.name || 'Project';const smartBuildingType=byId('smartBuildingType');if(smartBuildingType)smartBuildingType.textContent = 'House';const smartRoomsMeta=byId('smartRoomsMeta');if(smartRoomsMeta)smartRoomsMeta.textContent = `${Math.max(1,db.projects[0]?.floors||1)} floors Â· ${Math.max(1,db.projects[0]?.rooms||1)} rooms`;const smartElectricalItems=byId('smartElectricalItems');if(smartElectricalItems)smartElectricalItems.textContent = 'LED Lights Â· Fans Â· Sockets Â· Switches';const smartMaterialCount=byId('smartMaterialCount');if(smartMaterialCount)smartMaterialCount.textContent = `${db.materials.length} price items`;const smartPriceSource=byId('smartPriceSource');if(smartPriceSource)smartPriceSource.textContent = 'Editable price list';const smartQuoteTotal=byId('smartQuoteTotal');if(smartQuoteTotal)smartQuoteTotal.textContent = money(estimate || 0);const smartRoomEstimate=byId('smartRoomEstimate');if(smartRoomEstimate)smartRoomEstimate.textContent = `${Math.max(1,db.projects[0]?.rooms||1)} rooms`;const smartLaborEstimate=byId('smartLaborEstimate');if(smartLaborEstimate)smartLaborEstimate.textContent = money(Math.max(1,db.workers.length)*Number(db.workers[0]?.rate||0)*4);}
function renderQuotationPreview(quotation){const preview=byId('quotationPreview');if(!preview)return;const items=Array.isArray(quotation?.items)?quotation.items:[];const subtotal=items.reduce((sum,item)=>sum+Number(item.total||0),0);const discount=Number(quotation?.discount||0);const tax=Number(quotation?.tax||0);const additionalCharges=Number(quotation?.additionalCharges||0);const total=Math.max(0,subtotal+tax+additionalCharges-discount);preview.innerHTML=quotation?`<div class="panel-heading"><div><h2>Prepared quotation</h2><p class="muted">${escapeHtml(quotation.id)} â€¢ ${escapeHtml(quotation.customer||'Customer')}</p></div><button type="button" class="secondary-button quotation-front-print" data-print-quotation="${escapeHtml(quotation.id)}">Print quotation</button></div><div class="quotation-company"><img src="./compny logo.jpeg" alt="Arkan AL-Omda Limited Co. logo"><div><h3>${companyContact.name}</h3><p>${companyContact.address}</p></div></div><div class="quotation-meta"><div><span>Customer</span><b>${escapeHtml(quotation.customer||'')}</b></div><div><span>Project</span><b>${escapeHtml(quotation.project||'')}</b></div><div><span>Quotation #</span><b>${escapeHtml(quotation.id||'')}</b></div><div><span>Contact</span><b>${escapeHtml(quotation.customerPhone||'')}</b></div><div><span>Location</span><b>${escapeHtml(quotation.projectLocation||'')}</b></div><div><span>Date</span><b>${escapeHtml(quotation.date||'')}</b></div></div><div class="table-wrap"><table><thead><tr><th>Material</th><th>Description</th><th>Qty</th><th>Unit</th><th>Unit price</th><th>Total</th></tr></thead><tbody>${items.map(item=>`<tr><td>${escapeHtml(item.item||'')}</td><td>${escapeHtml(item.description||'')}</td><td>${Number(item.quantity||0)}</td><td>${escapeHtml(item.unit||'')}</td><td>${money(Number(item.unitPrice||0))}</td><td>${money(Number(item.total||0))}</td></tr>`).join('')||`<tr><td colspan="6" style="text-align:center;padding:24px;color:#7b8798">No materials added yet.</td></tr>`}</tbody></table></div><div class="quotation-total"><span>Grand total</span><b>${money(total)}</b></div>${quotation.notes?`<div class="quotation-note">${escapeHtml(quotation.notes)}</div>`:''}`:`<div class="panel-heading"><div><h2>Prepared quotation</h2><p class="muted">No quotation selected</p></div></div><div class="empty-state">No quotation selected yet.</div>`;}
const baseRenderFinance = renderFinance;
renderFinance = function(){baseRenderFinance();const table=byId('quotationsTable');if(!table)return;const selected=db.quotations.find(q=>q.id===selectedQuotationId)||db.quotations[0]||null;selectedQuotationId=selected?.id||null;table.innerHTML=db.quotations.map(q=>{const customer=db.customers.find(c=>c.name===q.customer)||{};const createdBy=customer.id||'Customer';const contact=customer.phone||q.customerPhone||'Phone not provided';const location=customer.address||q.projectLocation||q.address||'Location not provided';const materialCount=Array.isArray(q.items)?q.items.length:0;return `<tr class="quotation-list-row ${q.id===selectedQuotationId?'is-selected':''}" data-select-quotation="${escapeHtml(q.id)}"><td><div class="project-cell quotation-identity"><span class="project-mark">${escapeHtml((q.customer||'Q').charAt(0))}</span><span><b>${escapeHtml(q.customer||'Customer')}</b><small>${escapeHtml(createdBy)}</small></span></div></td><td>${escapeHtml(contact)}<small>${escapeHtml(q.project||'Project')}</small></td><td>${escapeHtml(location)}</td><td>${materialCount}</td><td>${money(Number(q.amount||0))}</td><td>${quotationRowActions(q.id)}</td></tr>`;}).join('')||emptyRow(6,'No quotations yet. Add a quotation to begin.');renderQuotationPreview(selected);};
function emptyRow(cols,message){return `<tr><td colspan="${cols}" style="text-align:center;padding:30px;color:#8b97a8">${message}</td></tr>`;}

const forms={
  'new-project':{title:'New project',eyebrow:'Workspace / Projects',collection:'projects',fields:[['name','Project name','text',true],['customer','Customer','text',true],['type','Project type','text',true],['location','Location','text',true],['budget','Estimated budget','number',true],['due','Expected completion','date',true],['status','Status','select',true,['Planning','Quotation','Approved','In Progress','On Hold','Completed','Cancelled']],['progress','Progress %','number',true],['notes','Notes','textarea',false]]},
  'new-worker':{title:'Add worker',eyebrow:'Workspace / Workers',collection:'workers',fields:[['name','Worker name','text',true],['skill','Role / skill','text',true],['phone','Phone','text',true],['rate','Daily laborer rate','number',true],['project','Project name','text',true],['cost','Labour cost','number',true],['overtimeHours','Overtime hours','number',true],['overtimePay','Overtime pay','number',true],['attendance','Attendance','text',true],['attendanceDays','Attendance days','number',true],['attendanceTotal','Total attendance days','number',true],['totalMoney','Total money','number',false]]},
  'new-customer':{title:'Add customer',eyebrow:'Workspace / Customers',collection:'customers',fields:[['name','Customer name','text',true],['phone','Phone','text',true],['email','Email','email',true],['address','Address','text',true]]},
  'new-material':{title:'Add material',eyebrow:'Finance & stock / Materials',collection:'materials',fields:[['name','Material name','text',true],['category','Category','text',false],['brand','Brand','text',true],['model','Model','text',false],['description','Description','text',false],['spec','Specification','text',true],['unit','Unit','text',true],['price','Selling price','number',true],['marketPrice','Current market price','number',false],['stock','Stock quantity','number',true],['min','Minimum stock level','number',true],['supplier','Supplier','text',true]]},
  'update-price':{title:'Update market price',eyebrow:'Finance & stock / Market prices',collection:'materials',fields:[['id','Material ID (example MAT-003)','text',true],['marketPrice','Current market price','number',false],['source','Market / supplier source','text',true]]},
  'new-task':{title:'Add work task',eyebrow:'Workspace / Tasks',collection:'tasks',fields:[['name','Task name','text',true],['project','Project','text',true],['worker','Assigned worker','text',true],['rate','Labour rate / hour','number',true],['status','Status','select',true,['Pending','In Progress','Completed']],['due','Completion date','text',true]]},
  'new-expense':{title:'Add expense',eyebrow:'Finance / Expenses',collection:'expenses',fields:[['description','Description','text',true],['project','Project','text',true],['category','Category','select',true,['Material','Labour Cost','Food / Meals','Transport & Fuel','Other Expenses','Other']],['amount','Amount','number',true]]},
  'new-invoice':{title:'Generate invoice',eyebrow:'Finance / Invoices',collection:'invoices',fields:[['customer','Customer','text',true],['project','Project','text',true],['item','Item description','text',true],['quantity','Quantity','number',true],['unitPrice','Unit price','number',true],['amount','Total amount','number',false],['due','Due date','text',true],['status','Status','select',true,['Pending','Paid','Overdue']]]},
  'new-quotation':{title:'Generate quotation',eyebrow:'Workspace / Quotations',collection:'quotations',fields:[['customer','Customer Name','text',true],['phone','Customer Phone','text',true],['project','Project Name','text',true],['address','Project Address','text',true],['quotationNumber','Quotation Number','text',true],['date','Date','date',true],['notes','Optional project notes','textarea',false],['discount','Discount','number',false],['tax','Tax','number',false],['additionalCharges','Additional Charges','number',false],['amount','Final total','number',false],['status','Status','select',true,['Draft','Sent','Approved']]]},
};
let activeForm=null;
let editingRecord=null;
let selectedQuotationId=null;
function quotationItemRow(item={}){return `<div class="quotation-item-row" data-quotation-item><input name="material" list="quotation-material-options" type="text" placeholder="Search material" value="${escapeHtml(item.item||'')}" autocomplete="off"><input name="materialId" type="hidden" value="${escapeHtml(item.materialId||'')}"><input name="description" type="text" placeholder="Auto-filled description" value="${escapeHtml(item.description||'')}" readonly><input name="quantity" type="number" min="0.01" step="any" placeholder="Qty" value="${item.quantity??''}"><input name="unit" type="text" placeholder="Unit" value="${escapeHtml(item.unit||'')}" readonly><input name="unitPrice" type="number" min="0" step="0.01" placeholder="Selling price" value="${item.unitPrice??''}" readonly><input name="total" type="number" min="0" step="0.01" placeholder="Amount" value="${item.total??''}" readonly><button type="button" class="secondary-button" data-remove-quotation-item title="Remove item">Remove</button></div>`;}
function quotationItemsEditor(items=[]){const rows=Array.isArray(items)&&items.length?items:[{}];return `<div class="field full quotation-items-editor"><label>Quotation items</label><datalist id="quotation-material-options">${db.materials.map(material=>`<option value="${escapeHtml(material.name)}">${escapeHtml(material.id)}</option>`).join('')}</datalist><div class="quotation-item-head"><span>Material</span><span>Description</span><span>Quantity</span><span>Unit</span><span>Unit price</span><span>Amount</span><span></span></div><div data-quotation-items>${rows.map(quotationItemRow).join('')}</div><p class="quotation-material-message" data-quotation-message></p><button type="button" class="secondary-button" data-add-quotation-item>Add item</button><div class="quotation-total-summary"><span>Subtotal <b data-quotation-subtotal>SAR 0</b></span><span>Grand total <b data-quotation-grand-total>SAR 0</b></span></div></div>`;}
function findMaterial(name){const query=String(name||'').trim().toLowerCase();return db.materials.find(material=>material.name.toLowerCase()===query)||null;}
function recalculateQuotation(form){const rows=[...form.querySelectorAll('[data-quotation-item]')];let subtotal=0;rows.forEach(row=>{const quantity=Number(row.querySelector('[name="quantity"]')?.value||0),price=Number(row.querySelector('[name="unitPrice"]')?.value||0),total=Number.isFinite(quantity*price)?quantity*price:0;const totalField=row.querySelector('[name="total"]');if(totalField)totalField.value=total?total.toFixed(2):'';subtotal+=total;});const discount=Number(form.querySelector('[name="discount"]')?.value||0),tax=Number(form.querySelector('[name="tax"]')?.value||0),additional=Number(form.querySelector('[name="additionalCharges"]')?.value||0),grandTotal=Math.max(0,subtotal+tax+additional-discount);const amountField=form.querySelector('[name="amount"]');if(amountField)amountField.value=grandTotal.toFixed(2);const subtotalLabel=form.querySelector('[data-quotation-subtotal]');if(subtotalLabel)subtotalLabel.textContent=money(subtotal);const grandLabel=form.querySelector('[data-quotation-grand-total]');if(grandLabel)grandLabel.textContent=money(grandTotal);}
function syncQuotationMaterial(row){const materialField=row.querySelector('[name="material"]'),material=findMaterial(materialField?.value),message=byId('modalFields')?.querySelector('[data-quotation-message]');if(!material){row.querySelector('[name="materialId"]').value='';if(materialField?.value.trim()&&message)message.textContent='Material not found';return false;}const price=Number(material.sellingPrice??material.price);if(!Number.isFinite(price)||price<0){if(message)message.textContent='This material does not have a selling price. Please update it in Materials.';return false;}row.querySelector('[name="materialId"]').value=material.id;row.querySelector('[name="description"]').value=material.description||material.spec||'';row.querySelector('[name="unit"]').value=material.unit||'';row.querySelector('[name="unitPrice"]').value=price.toFixed(2);if(message)message.textContent='';return true;}
function readQuotationItems(form){return [...form.querySelectorAll('[data-quotation-item]')].map(row=>{const material=findMaterial(row.querySelector('[name="material"]')?.value),value=name=>row.querySelector(`[name="${name}"]`)?.value.trim()||'',quantity=Number(value('quantity')),unitPrice=Number(value('unitPrice')),total=quantity*unitPrice;return {materialId:material?.id||value('materialId'),item:value('material'),description:value('description'),quantity,unit:value('unit'),unitPrice,total};}).filter(item=>item.item||item.quantity||item.unitPrice);}
function normalizeQuotationData(data,form){const items=readQuotationItems(form),invalid=!items.length||items.some(item=>!findMaterial(item.item)||!Number.isFinite(item.quantity)||item.quantity<=0||!Number.isFinite(item.unitPrice)||item.unitPrice<0);if(invalid)throw new Error('Add a valid material with quantity greater than 0 and a selling price before saving.');data.items=items;const subtotal=items.reduce((sum,item)=>sum+item.total,0);data.subtotal=subtotal;data.amount=Math.max(0,subtotal+Number(data.tax||0)+Number(data.additionalCharges||0)-Number(data.discount||0));return data;}
function normalizeImportHeader(header=''){return String(header??'').trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');}
function resolveImportField(row, aliases=[]){const map={};Object.keys(row||{}).forEach(key=>{map[normalizeImportHeader(key)]=row[key];});for(const alias of aliases){if(map[alias]!==undefined&&map[alias]!==null&&String(map[alias]).trim()!=='')return String(map[alias]).trim();}return ''}
function parseImportNumber(value, fallback=0){const raw=String(value ?? '').replace(/[^0-9.+-]/g,'');const result=Number(raw);return Number.isFinite(result)?result:fallback;}
function buildImportQuotationFromRow(row){const customer=resolveImportField(row,['customer','customer_name','client','client_name','name','business_name'])||'';const phone=resolveImportField(row,['phone','customer_phone','contact_phone','telephone','mobile','contact'])||'';const project=resolveImportField(row,['project','project_name','job','job_name','project_title','work_name'])||'';const address=resolveImportField(row,['address','project_location','project_address','location','site','site_address'])||'';const quoteNumber=resolveImportField(row,['quotation_number','quote_number','quotationid','id','quote_id','quotation_id','quotation_no','quote_no'])||'';const date=resolveImportField(row,['date','quotation_date','valid','validity','date_issued','issued_date'])||new Date().toISOString().slice(0,10);
const status=resolveImportField(row,['status','state','quotation_status','quote_status'])||'Draft';const material=resolveImportField(row,['material','material_name','item','product','name','description','line_item','item_name'])||'';const description=resolveImportField(row,['description','specification','spec','details','item_description'])||material||'';const quantity=parseImportNumber(resolveImportField(row,['quantity','qty','units','qty_required','qty_required','quantity_required','amount_quantity']),0);
const unit=resolveImportField(row,['unit','uom','unit_of_measure'])||'each';const unitPrice=parseImportNumber(resolveImportField(row,['unit_price','selling_price','price','unitPrice','rate','sale_price']),0);
const total=parseImportNumber(resolveImportField(row,['total','amount','line_total','total_amount','extended_price','line_amount']),0) || Math.max(0, quantity * unitPrice);
const amount=parseImportNumber(resolveImportField(row,['amount','grand_total','quote_amount','final_total','total_amount','net_total']),0) || total;
if(!customer||!project||!material||quantity<=0||unitPrice<=0)return null;
return {key:quoteNumber||`${customer}||${project}`,customer,customerPhone:phone,project,projectLocation:address,valid:date,date,status,items:[{item:material,description,quantity:Math.max(0,quantity),unit,unitPrice:Math.max(0,unitPrice),total:Math.max(0,total)}],amount:Math.max(0,amount)};
}
function importQuotationExcel(file){if(!file)return;if(!window.XLSX){notify('The workbook parser is not available in this browser.');return;}const allowed=['xlsx','xls','csv'];const ext=String(file.name||'').split('.').pop()?.toLowerCase();if(!allowed.includes(ext)){notify('Please upload a workbook or CSV file with a valid Excel extension (.xlsx,.xls,.csv).');return;}const reader=new FileReader();reader.onload=function(){try{const workbook=XLSX.read(reader.result,{type:'array',cellDates:true});const sheet=workbook.Sheets[workbook.SheetNames[0]];const rows=XLSX.utils.sheet_to_json(sheet,{defval:'',raw:false});if(!Array.isArray(rows)||rows.length===0){notify('No valid quotation rows were found in the selected sheet. Please check the sheet columns and try again.');return;}const validRecords=[];rows.forEach(row=>{const record=buildImportQuotationFromRow(row);if(!record)return;validRecords.push(record);});if(!validRecords.length){notify('No valid quotation rows were found in the selected sheet. Please include customer, project, material, quantity, and price columns.');return;}const quoteBatch=[];validRecords.forEach(record=>{const normalized={id:`QT-${String(Date.now()).slice(-5)}-${Math.round(Math.random()*99)}`,customer:record.customer,customerPhone:record.customerPhone||'Phone not provided',project:record.project,projectLocation:record.projectLocation||'Location not provided',valid:record.valid||record.date||new Date().toISOString().slice(0,10),date:record.date||record.valid||new Date().toISOString().slice(0,10),status:record.status&&record.status.trim()?record.status.trim():'Draft',amount:Math.max(0,Number(record.amount)||record.items.reduce((sum,item)=>sum+Number(item.total||0),0)),items:record.items.map(item=>({item:item.item||'Material',description:item.description||'',quantity:Math.max(0,Number(item.quantity)||0),unit:item.unit||'each',unitPrice:Math.max(0,Number(item.unitPrice)||0),total:Math.max(0,Number(item.total)||0)}))};normalized.amount=Math.max(0,normalized.items.reduce((sum,item)=>sum+Number(item.total||0),0));quoteBatch.push(normalized);});db.quotations.unshift(...quoteBatch);save();refresh();notify(`${quoteBatch.length} quotation${quoteBatch.length===1?'':'s'} uploaded and saved.`);}catch(error){notify('The uploaded sheet could not be read. Please confirm the file is an Excel or CSV workbook.');console.error(error);}};reader.readAsArrayBuffer(file);}
byId('uploadQuotationExcel')?.addEventListener('click',()=>byId('quotationExcelFile')?.click());
byId('quotationExcelFile')?.addEventListener('change',event=>{const file=event.target.files?.[0];if(file)importQuotationExcel(file);event.target.value='';});
byId('saveQuotationChanges')?.addEventListener('click',() => {save();refresh();notify('Quotation workspace saved successfully.');});
byId('printQuotationPage')?.addEventListener('click',() => {const selected=db.quotations.find(item=>item.id===selectedQuotationId)||db.quotations[0]||null;if(selected){printQuotationsReport(selected);}else{notify('No quotation is available to print.');}});
function openForm(key, preset={}){
  activeForm = forms[key];
  const collection = activeForm.collection;
  editingRecord = preset.id ? (db[collection] || []).find(record => record.id === preset.id) || null : null;
  byId('modalTitle').textContent = editingRecord ? `Edit ${collection === 'projects' ? 'project' : collection.slice(0, -1)}` : activeForm.title;
  byId('modalEyebrow').textContent = activeForm.eyebrow;
  byId('modalFields').innerHTML = activeForm.fields.map(f => {
    const val = f[0] === 'totalMoney' ? workerTotal(preset) : (preset[f[0]] ?? '');
    const readonly = f[0] === 'totalMoney' ? ' readonly' : '';
    const control = f[2] === 'file' ? `<input name="${f[0]}" type="file" accept="image/*,.pdf" ${f[3] ? 'required' : ''}>` : f[2] === 'select' ? `<select name="${f[0]}" ${f[3] ? 'required' : ''}><option value="">Select...</option>${f[4].map(o => `<option ${o === val ? 'selected' : ''}>${o}</option>`).join('')}</select>` : f[2] === 'textarea' ? `<textarea name="${f[0]}" ${f[3] ? 'required' : ''}>${escapeHtml(val)}</textarea>` : `<input name="${f[0]}" type="${f[2]}" value="${escapeHtml(val)}" ${f[3] ? 'required' : ''}${readonly}>`;
    return `<div class="field ${f[2] === 'textarea' ? 'full' : ''}"><label>${f[1]}${f[3] ? ' *' : ''}</label>${control}</div>`;
  }).join('');
  byId('modalBackdrop').classList.add('open');
  byId('modalFields').querySelector('input,select,textarea')?.focus();
}
const baseOpenForm = openForm;
openForm = function(key,preset={}){const record=key==='new-quotation'&&preset.id?{...preset,phone:preset.phone||preset.customerPhone,address:preset.address||preset.projectLocation,quotationNumber:preset.quotationNumber||preset.id}:preset;baseOpenForm(key,record);if(key==='new-quotation'){byId('modalFields').insertAdjacentHTML('beforeend',quotationItemsEditor(record.items));byId('modalFields').querySelector('[name="amount"]').required=false;const form=byId('modalForm');[...form.querySelectorAll('[data-quotation-item]')].forEach(row=>{if(findMaterial(row.querySelector('[name="material"]')?.value))syncQuotationMaterial(row);});recalculateQuotation(form);if(preset.id){editingRecord=db.quotations.find(item=>item.id===preset.id)||null;if(editingRecord)byId('modalTitle').textContent='Edit quotation';}}};
byId('modalForm').addEventListener('submit',event=>{if(!editingRecord||activeForm.collection!=='projects')return;event.preventDefault();event.stopImmediatePropagation();const data=Object.fromEntries(new FormData(event.target).entries());const numericFields=['budget','cost','progress','due','amount','billed','projects','tasks'];const previousProjectName=String(editingRecord.name||'');Object.keys(data).forEach(key=>{if(numericFields.includes(key))data[key]=Number(data[key]||0)});const nextProjectName=String(data.name||'').trim();if(!nextProjectName){notify('Project name is required');return;}const oldName = previousProjectName;Object.assign(editingRecord,data);syncProjectNameReferences(oldName,nextProjectName);save();closeForm();refresh();notify('Project updated');},true);
byId('modalForm').addEventListener('submit',event=>{if(!editingRecord||activeForm.collection!=='workers')return;event.preventDefault();event.stopImmediatePropagation();const data=Object.fromEntries(new FormData(event.target).entries());const numericFields=['budget','cost','progress','rate','price','stock','min','amount','billed','projects','tasks','quantity','unitPrice','overtimeHours','overtimePay','transport','attendanceDays','attendanceTotal'];Object.keys(data).forEach(key=>{if(numericFields.includes(key))data[key]=Number(data[key]||0)});data.totalMoney=Number(data.cost||0)+Number(data.overtimePay||0);Object.assign(editingRecord,data);save();closeForm();refresh();notify('Worker updated');},true);
byId('modalForm').addEventListener('submit',event=>{if(!editingRecord||activeForm.collection!=='quotations')return;event.preventDefault();event.stopImmediatePropagation();try{const data=Object.fromEntries(new FormData(event.target).entries());const numericFields=['floors','rooms','discount','tax','additionalCharges','amount'];Object.keys(data).forEach(key=>{if(numericFields.includes(key))data[key]=Number(data[key]||0)});normalizeQuotationData(data,event.target);data.customerPhone=data.phone;data.projectLocation=data.address;delete data.phone;delete data.address;delete data.quotationNumber;Object.assign(editingRecord,data);save();closeForm();refresh();notify('Quotation updated');}catch(error){notify(error.message);}},true);
byId('modalForm').addEventListener('submit',event=>{if(editingRecord||activeForm?.collection!=='quotations')return;event.preventDefault();event.stopImmediatePropagation();try{const data=Object.fromEntries(new FormData(event.target).entries());const numericFields=['floors','rooms','discount','tax','additionalCharges','amount'];Object.keys(data).forEach(key=>{if(numericFields.includes(key))data[key]=Number(data[key]||0)});normalizeQuotationData(data,event.target);data.customerPhone=data.phone;data.projectLocation=data.address;delete data.phone;delete data.address;delete data.quotationNumber;data.id=`QT-${String(Date.now()).slice(-5)}`;db.quotations.unshift(data);save();closeForm();refresh();notify('Quotation saved');}catch(error){notify(error.message);}},true);
byId('modalForm').addEventListener('input',event=>{if(activeForm?.collection!=='quotations')return;const row=event.target.closest('[data-quotation-item]');if(row&&(event.target.name==='material'||event.target.name==='quantity')){if(event.target.name==='material')syncQuotationMaterial(row);recalculateQuotation(event.target.form);}if(['discount','tax','additionalCharges'].includes(event.target.name))recalculateQuotation(event.target.form);});
byId('modalForm').addEventListener('change',event=>{if(activeForm?.collection!=='quotations')return;const row=event.target.closest('[data-quotation-item]');if(row&&event.target.name==='material'){syncQuotationMaterial(row);recalculateQuotation(event.target.form);}});
byId('modalForm').addEventListener('click',event=>{if(activeForm?.collection!=='quotations')return;const add=event.target.closest('[data-add-quotation-item]');if(add){byId('modalFields').querySelector('[data-quotation-items]').insertAdjacentHTML('beforeend',quotationItemRow());return;}const remove=event.target.closest('[data-remove-quotation-item]');if(remove){const rows=byId('modalFields').querySelectorAll('[data-quotation-item]');if(rows.length>1){remove.closest('[data-quotation-item]').remove();recalculateQuotation(byId('modalForm'));}}});
function closeForm(){byId('modalBackdrop').classList.remove('open');activeForm=null;editingRecord=null;}
function notify(message='Quotation workspace ready.'){const toast=byId('toast');toast.querySelector('b').textContent=message;toast.querySelector('small').textContent='Quotation workspace ready.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600);}
function printWorkerSlip(worker){const slip=window.open('','_blank','width=720,height=760');if(!slip)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;slip.document.write(`<!doctype html><html><head><title>Worker pay slip - ${escapeHtml(worker.name)}</title><style>body{font-family:Arial,sans-serif;color:#17212f;padding:36px;max-width:640px;margin:auto}.company{display:flex;align-items:center;gap:14px;border-bottom:2px solid #d4a72c;padding-bottom:18px;margin-bottom:24px}.company img{width:64px;height:64px;object-fit:contain;border-radius:8px}.company h1{font-size:22px;margin:0 0 5px}.company p{color:#65748b;margin:0;font-size:12px}.slip{border:1px solid #dce2eb;border-radius:10px;padding:24px}.slip h2{margin:0 0 14px;font-size:18px}.row{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e9edf2;padding:12px 0}.row:last-child{border-bottom:0;font-weight:700;font-size:18px;color:#b07d00}.label{color:#65748b}button{margin-top:24px;padding:10px 16px;border:0;background:#2d67f0;color:#fff;border-radius:6px}@media print{button{display:none}}</style></head><body><div class="company"><img src="${logoUrl}" alt="Arkan AL-Omda Limited Co. logo"><div><h1>Arkan AL-Omda Limited Co.</h1><p>Street Khazan, Riyadh</p><p>CR 1010081839 | VAT 300807052800003</p><p>T. 0114030073 | F. 0114038511 | P.O. Box 650, Code 11373</p></div></div><div class="slip"><h2>Worker pay slip</h2><div class="row"><span class="label">Worker name</span><b>${escapeHtml(worker.name)}</b></div><div class="row"><span class="label">Role</span><b>${escapeHtml(worker.skill)}</b></div><div class="row"><span class="label">Phone</span><b>${escapeHtml(worker.phone||'Not provided')}</b></div><div class="row"><span class="label">Project</span><b>${escapeHtml(worker.project)}</b></div><div class="row"><span class="label">Daily laborer rate</span><b>${money(worker.rate)}</b></div><div class="row"><span class="label">Labour cost</span><b>${money(worker.cost)}</b></div><div class="row"><span class="label">Overtime</span><b>${worker.overtimeHours||0} hours / ${money(worker.overtimePay)}</b></div><div class="row"><span class="label">Attendance</span><b>${escapeHtml(worker.attendance||'Not provided')} (${worker.attendanceDays||0}/${worker.attendanceTotal||0} days)</b></div><div class="row"><span class="label">Total money</span><b>${money(workerTotal(worker))}</b></div></div><button onclick="window.print()">Print slip</button></body></html>`);slip.document.close();}
function printCustomerRecord(customer){const page=window.open('','_blank','width=720,height=650');if(!page)return;page.document.write(`<!doctype html><html><head><title>Customer record - ${escapeHtml(customer.name)}</title><style>body{font-family:Arial,sans-serif;color:#17212f;padding:36px;max-width:640px;margin:auto}.company{border-bottom:2px solid #d4a72c;padding-bottom:18px;margin-bottom:24px}.company h1{font-size:22px;margin:0 0 5px}.company p{color:#65748b;margin:4px 0;font-size:12px}.record{border:1px solid #dce2eb;border-radius:10px;padding:24px}.row{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e9edf2;padding:12px 0}.row:last-child{border-bottom:0;font-weight:700;font-size:17px;color:#b07d00}.label{color:#65748b}button{margin-top:24px;padding:10px 16px;border:0;background:#2d67f0;color:#fff;border-radius:6px}@media print{button{display:none}}</style></head><body><div class="company"><h1>Arkan AL-Omda Limited Co.</h1><p>Street Khazan, Riyadh</p><p>CR 1010081839 | VAT 300807052800003</p><p>T. 0114030073 | F. 0114038511 | P.O. Box 650, Code 11373</p></div><div class="record"><div class="row"><span class="label">Customer</span><b>${escapeHtml(customer.name)}</b></div><div class="row"><span class="label">Customer ID</span><b>${escapeHtml(customer.id)}</b></div><div class="row"><span class="label">Email</span><b>${escapeHtml(customer.email)}</b></div><div class="row"><span class="label">Phone</span><b>${escapeHtml(customer.phone)}</b></div><div class="row"><span class="label">Address</span><b>${escapeHtml(customer.address)}</b></div><div class="row"><span class="label">Projects</span><b>${customer.projects||0}</b></div><div class="row"><span class="label">Total billed</span><b>${money(customer.billed)}</b></div></div><button onclick="window.print()">Print customer record</button></body></html>`);page.document.close();}
const companyContact = {name:'Arkan AL-Omda Limited Co.',email:'Arkan.al.omda@gmail.com',mobile:'0503084920',address:'Street Khazan, Riyadh',cr:'1010081839',vat:'300807052800003',phone:'0114030073',fax:'0114038511',poBox:'650 - Code 11373'};
function printMaterialRecord(material){const page=window.open('','_blank','width=760,height=760');if(!page)return;const selling=Number(material.sellingPrice??material.price),market=Number.isFinite(Number(material.marketPrice))?Number(material.marketPrice):null;page.document.write(`<!doctype html><html><head><title>Material - ${escapeHtml(material.name)}</title><style>*{box-sizing:border-box}body{margin:0;padding:32px;background:linear-gradient(135deg,#edf3ff 0%,#dfeeff 38%,#f4f8ff 100%);color:#17212f;font:13px Arial,sans-serif}.sheet{max-width:680px;margin:auto;background:linear-gradient(180deg,#ffffff 0%,#f5f9ff 100%);border:2px solid #2d67f0;border-radius:16px;overflow:hidden;box-shadow:0 24px 48px rgba(24,66,151,.22)}.header{display:flex;align-items:center;gap:16px;padding:24px 28px;background:linear-gradient(135deg,#0f315d,#1b4da0);color:#fff;border-bottom:4px solid #d4a72c}.header img{width:70px;height:70px;object-fit:contain;background:#fff;border-radius:8px;padding:4px}.header h1{margin:0 0 6px;font-size:20px}.header p{margin:2px 0;color:#d9e2ef;font-size:11px}.content{padding:26px 28px}.title{display:flex;justify-content:space-between;border-bottom:1px solid #e2e8ef;padding-bottom:14px;margin-bottom:16px}.title h2{margin:0;font-size:21px}.details{display:grid;grid-template-columns:1fr 1fr}.detail{padding:13px 0;border-bottom:1px solid #e8edf2}.detail label{display:block;color:#7b8798;font-size:10px;text-transform:uppercase;margin-bottom:5px}.detail b{font-size:13px}.total{display:flex;justify-content:space-between;margin-top:20px;padding:16px;background:#fff8dc;color:#8a6500;font-size:18px;font-weight:700}button{display:block;margin:22px auto 0;padding:10px 18px;border:0;border-radius:6px;background:#2d67f0;color:#fff}@media print{body{padding:0;background:#edf3ff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.sheet{border:0;border-width:2px;box-shadow:none;max-width:none}.header{background:linear-gradient(135deg,#0f315d,#1b4da0)!important;color:#fff;border-bottom:4px solid #d4a72c}.content,.title,.details,.detail,.total{background:transparent!important}button{display:none!important}}@page{size:A4;margin:12mm}</style></head><body><main class="sheet"><header class="header"><img src="${new URL('./compny logo.jpeg',window.location.href).href}" alt="Company logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | ${companyContact.mobile}</p></div></header><section class="content"><div class="title"><h2>Material record</h2><b>${escapeHtml(material.id)}</b></div><section class="details"><div class="detail"><label>Material</label><b>${escapeHtml(material.name)}</b></div><div class="detail"><label>Brand</label><b>${escapeHtml(material.brand||'Not provided')}</b></div><div class="detail"><label>Specification</label><b>${escapeHtml(material.spec||'Not provided')}</b></div><div class="detail"><label>Unit</label><b>${escapeHtml(material.unit||'Not provided')}</b></div><div class="detail"><label>Stock</label><b>${material.stock} ${escapeHtml(material.unit||'')}</b></div><div class="detail"><label>Supplier</label><b>${escapeHtml(material.supplier||'Not provided')}</b></div><div class="detail"><label>Selling price</label><b>${money(selling)}</b></div><div class="detail"><label>Market price</label><b>${market===null?'Not Available':money(market)}</b></div></section><div class="total"><span>Inventory value</span><strong>${money(Number(material.stock||0)*selling)}</strong></div><button onclick="window.print()">Print material</button></section></main></body></html>`);page.document.close();page.onload=()=>page.print();}
function printExpenseRecord(expense){const page=window.open('','_blank','width=760,height=700');if(!page)return;page.document.write(`<!doctype html><html><head><title>Expense - ${escapeHtml(expense.id)}</title><style>*{box-sizing:border-box}body{margin:0;padding:32px;background:#eef2f6;color:#17212f;font:13px Arial,sans-serif}.sheet{max-width:680px;margin:auto;background:#fff;border:1px solid #d9e0e8}.header{display:flex;align-items:center;gap:16px;padding:24px 28px;background:#182a42;color:#fff;border-bottom:4px solid #d4a72c}.header img{width:70px;height:70px;object-fit:contain;background:#fff;border-radius:8px;padding:4px}.header h1{margin:0 0 6px;font-size:20px}.header p{margin:2px 0;color:#d9e2ef;font-size:11px}.content{padding:26px 28px}.title{display:flex;justify-content:space-between;border-bottom:1px solid #e2e8ef;padding-bottom:14px;margin-bottom:16px}.title h2{margin:0;font-size:21px}.details{display:grid;grid-template-columns:1fr 1fr}.detail{padding:14px 0;border-bottom:1px solid #e8edf2}.detail label{display:block;color:#7b8798;font-size:10px;text-transform:uppercase;margin-bottom:5px}.detail b{font-size:13px}.total{display:flex;justify-content:space-between;margin-top:20px;padding:16px;background:#fff8dc;color:#8a6500;font-size:19px;font-weight:700}button{display:block;margin:22px auto 0;padding:10px 18px;border:0;border-radius:6px;background:#2d67f0;color:#fff}@media print{body{padding:0;background:#fff}.sheet{border:0}.header{-webkit-print-color-adjust:exact;print-color-adjust:exact}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src="${new URL('./compny logo.jpeg',window.location.href).href}" alt="Company logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | ${companyContact.mobile}</p></div></header><section class="content"><div class="title"><h2>Expense record</h2><b>${escapeHtml(expense.id)}</b></div><section class="details"><div class="detail"><label>Description</label><b>${escapeHtml(expense.description)}</b></div><div class="detail"><label>Project</label><b>${escapeHtml(expense.project)}</b></div><div class="detail"><label>Category</label><b>${escapeHtml(expense.category)}</b></div><div class="detail"><label>Date</label><b>${escapeHtml(expense.date||'Not set')}</b></div></section><div class="total"><span>Expense amount</span><strong>${money(expense.amount)}</strong></div><button onclick="window.print()">Print expense</button></section></main></body></html>`);page.document.close();page.onload=()=>page.print();}
function printProjectQuotation(project){const quotation=db.quotations.find(item=>item.project===project.name);if(quotation){printQuotationsReport(quotation);return}const page=window.open('','_blank','width=900,height=800');if(!page)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;page.document.write(`<!doctype html><html><head><title>Project quotation - ${escapeHtml(project.name)}</title><style>*{box-sizing:border-box}body{margin:0;padding:32px;background:#eef2f6;color:#17212f;font:13px Arial,sans-serif}.sheet{max-width:900px;margin:auto;background:#fff;border:1px solid #d9e0e8}.header{display:flex;align-items:center;gap:18px;padding:28px 34px;background:#182a42;color:#fff;border-bottom:5px solid #d4a72c}.header img{width:88px;height:88px;object-fit:contain;background:#fff;border-radius:9px;padding:4px}.header h1{margin:0 0 8px;font-size:24px}.header p{margin:3px 0;color:#d9e2ef;font-size:11px}.content{padding:30px 34px}.title{display:flex;justify-content:space-between;border-bottom:1px solid #e2e8ef;padding-bottom:16px;margin-bottom:20px}.title h2{margin:0;font-size:24px}.details{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px 0;border-top:2px solid #d4a72c;border-bottom:1px solid #e2e8ef}.details span{display:block;margin-bottom:6px;color:#7b8798;font-size:10px;text-transform:uppercase}.details b{font-size:14px}.description{margin-top:22px;padding:16px 18px;background:#f7f9fc;border-left:4px solid #2d67f0;line-height:1.6}.total{display:flex;justify-content:space-between;margin-top:24px;padding:18px 20px;background:#fff8dc;color:#8a6500;font-size:20px;font-weight:700}button{display:block;margin:25px auto;padding:11px 22px;border:0;border-radius:7px;background:#2d67f0;color:#fff}@media print{body{padding:0;background:#fff}.sheet{border:0}.header{-webkit-print-color-adjust:exact;print-color-adjust:exact}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src="${logoUrl}" alt="Arkan AL-Omda Limited Co. logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p></div></header><section class="content"><div class="title"><h2>Project quotation</h2><b>${escapeHtml(project.id)}</b></div><section class="details"><div><span>Customer</span><b>${escapeHtml(project.customer||'Not provided')}</b></div><div><span>Project</span><b>${escapeHtml(project.name)}</b></div><div><span>Type</span><b>${escapeHtml(project.type||'Not provided')}</b></div><div><span>Status</span><b>${escapeHtml(project.status||'Not provided')}</b></div><div><span>Due date</span><b>${escapeHtml(project.due||'Not set')}</b></div><div><span>Budget</span><b>${money(project.budget)}</b></div></section><div class="description"><b>Project description</b><br>${escapeHtml(project.notes||'Project quotation details and scope of work.')}</div><div class="total"><span>Quotation amount</span><strong>${money(project.budget)}</strong></div><button onclick="window.print()">Print quotation</button></section></main></body></html>`);page.document.close();}
function printProjectsReport(){const query=(byId('projectSearch')?.value||'').toLowerCase(),filter=byId('projectStatusFilter')?.value||'all',projects=db.projects.filter(p=>(filter==='all'||p.status===filter)&&`${p.name} ${p.customer} ${p.type}`.toLowerCase().includes(query)),page=window.open('','_blank','width=980,height=820');if(!page)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href,totalBudget=projects.reduce((sum,project)=>sum+Number(project.budget||0),0),totalCost=projects.reduce((sum,project)=>sum+Number(project.cost||0),0),averageProgress=projects.length?Math.round(projects.reduce((sum,project)=>sum+Number(project.progress||0),0)/projects.length):0;page.document.write(`<html><head><title>Projects report</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#17212f;font-family:Arial,sans-serif;padding:28px}.sheet{max-width:920px;margin:auto;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(26,39,58,.12)}.header{display:flex;align-items:center;gap:18px;padding:24px 30px;background:#182a42;color:#fff;border-bottom:5px solid #d4a72c}.header img{width:74px;height:74px;object-fit:contain;background:#fff;border-radius:10px;padding:5px}.header h1{font-size:22px;margin:0 0 8px}.header p{font-size:11px;line-height:1.6;margin:0;color:#d9e2ef}.content{padding:28px}.title-row{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #e5eaf0;padding-bottom:18px;margin-bottom:18px}.title-row h2{margin:0;font-size:22px}.title-row span{color:#7c899b;font-size:11px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:22px}.summary-card{border:1px solid #e1e6ed;border-radius:9px;padding:14px}.summary-card span{display:block;color:#78869a;font-size:10px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:7px}.summary-card b{font-size:17px}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:760px}th{text-align:left;background:#f8f1d7;color:#8a6500;font-size:11px;padding:12px 10px;border-bottom:2px solid #d4a72c}td{padding:12px 10px;border-bottom:1px solid #e8edf2;font-size:11px;vertical-align:top}td b{display:block;font-size:12px}td small{display:block;color:#7c899b;margin-top:4px}.status{font-weight:700;color:#2d67f0}.footer{padding:0 30px 24px;text-align:center;color:#7c899b;font-size:10px}button{display:block;margin:20px auto 0;border:0;border-radius:7px;background:#2d67f0;color:#fff;padding:11px 20px;font-weight:700}@media(max-width:700px){body{padding:10px}.header{padding:18px}.content{padding:18px}.summary{grid-template-columns:1fr 1fr}}@media print{body{background:#fff;padding:0}.sheet{border:0;box-shadow:none;max-width:none}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src=${logoUrl}><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p><p>T. ${companyContact.phone} | F. ${companyContact.fax} | P.O. Box ${companyContact.poBox}</p></div></header><section class="content"><div class="title-row"><h2>Complete projects report</h2><span>${filter==='all'?'All projects':escapeHtml(filter)}</span></div><div class="summary"><div class="summary-card"><span>Projects</span><b>${projects.length}</b></div><div class="summary-card"><span>Total budget</span><b>${money(totalBudget)}</b></div><div class="summary-card"><span>Total cost</span><b>${money(totalCost)}</b></div><div class="summary-card"><span>Average progress</span><b>${averageProgress}%</b></div></div><div class="table-wrap"><table><thead><tr><th>Project</th><th>Customer</th><th>Type</th><th>Budget</th><th>Cost</th><th>Progress</th><th>Due date</th><th>Status</th></tr></thead><tbody>${projects.map(project=>`<tr><td><b>${escapeHtml(project.name)}</b><small>${escapeHtml(project.id)}</small></td><td>${escapeHtml(project.customer)}</td><td>${escapeHtml(project.type)}</td><td>${money(project.budget)}</td><td>${money(project.cost)}</td><td>${project.progress}%</td><td>${escapeHtml(project.due)}</td><td><span class="status">${escapeHtml(project.status)}</span></td></tr>`).join('')||'<tr><td colspan="8">No projects found.</td></tr>'}</tbody></table></div></section><footer class="footer">Prepared by ${companyContact.name}.</footer></main><button onclick="window.print()">Print projects report</button></body></html>`);page.document.close();}
function printBusinessReport(){const page=window.open('','_blank','width=900,height=800');if(!page)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;const received=db.payments.reduce((sum,item)=>sum+Number(item.amount||0),0),expenses=db.expenses.reduce((sum,item)=>sum+Number(item.amount||0),0),outstanding=db.invoices.filter(item=>item.status!=='Paid').reduce((sum,item)=>sum+Number(item.amount||0),0),budget=db.projects.reduce((sum,item)=>sum+Number(item.budget||0),0),cost=db.projects.reduce((sum,item)=>sum+Number(item.cost||0),0),averageProgress=db.projects.length?Math.round(db.projects.reduce((sum,item)=>sum+Number(item.progress||0),0)/db.projects.length):0;page.document.write(`<html><head><title>Business report</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#17212f;font-family:Arial,sans-serif;padding:28px}.sheet{max-width:850px;margin:auto;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(26,39,58,.12)}.header{display:flex;align-items:center;gap:18px;padding:24px 30px;background:#182a42;color:#fff;border-bottom:5px solid #d4a72c}.header img{width:74px;height:74px;object-fit:contain;background:#fff;border-radius:10px;padding:5px}.header h1{font-size:22px;margin:0 0 8px}.header p{font-size:11px;line-height:1.6;margin:0;color:#d9e2ef}.content{padding:28px}.title{display:flex;justify-content:space-between;border-bottom:1px solid #e5eaf0;padding-bottom:16px;margin-bottom:18px}.title h2{margin:0;font-size:22px}.title span{color:#7c899b;font-size:11px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.card{border:1px solid #e1e6ed;border-radius:10px;overflow:hidden}.card h3{margin:0;padding:13px 16px;background:#f8f1d7;color:#8a6500;font-size:12px;text-transform:uppercase;letter-spacing:.6px}.row{display:flex;justify-content:space-between;padding:13px 16px;border-top:1px solid #e8edf2;font-size:13px}.row b{color:#182a42}.footer{text-align:center;padding:0 30px 24px;color:#7c899b;font-size:10px}button{display:block;margin:20px auto 0;border:0;border-radius:7px;background:#2d67f0;color:#fff;padding:11px 20px;font-weight:700}@media(max-width:650px){body{padding:10px}.header{padding:18px}.content{padding:18px}.grid{grid-template-columns:1fr}}@media print{body{background:#fff;padding:0}.sheet{border:0;box-shadow:none;max-width:none}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src="${logoUrl}" alt="${companyContact.name} logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p><p>T. ${companyContact.phone} | F. ${companyContact.fax} | P.O. Box ${companyContact.poBox}</p></div></header><section class="content"><div class="title"><h2>Complete business report</h2><span>Saudi Riyal (SAR)</span></div><div class="grid"><section class="card"><h3>Financial summary</h3><div class="row"><span>Payments received</span><b>${money(received)}</b></div><div class="row"><span>Total expenses</span><b>${money(expenses)}</b></div><div class="row"><span>Outstanding invoices</span><b>${money(outstanding)}</b></div><div class="row"><span>Estimated balance</span><b>${money(received-expenses)}</b></div></section><section class="card"><h3>Project summary</h3><div class="row"><span>Total projects</span><b>${db.projects.length}</b></div><div class="row"><span>Total budget</span><b>${money(budget)}</b></div><div class="row"><span>Total project cost</span><b>${money(cost)}</b></div><div class="row"><span>Average progress</span><b>${averageProgress}%</b></div></section><section class="card"><h3>Work summary</h3><div class="row"><span>Active projects</span><b>${db.projects.filter(item=>item.status==='In Progress').length}</b></div><div class="row"><span>Completed projects</span><b>${db.projects.filter(item=>item.status==='Completed').length}</b></div><div class="row"><span>Tasks completed</span><b>${db.tasks.filter(item=>item.status==='Completed').length} of ${db.tasks.length}</b></div></section><section class="card"><h3>Resources</h3><div class="row"><span>Customers</span><b>${db.customers.length}</b></div><div class="row"><span>Workers</span><b>${db.workers.length}</b></div><div class="row"><span>Materials tracked</span><b>${db.materials.length}</b></div><div class="row"><span>Low stock items</span><b>${db.materials.filter(item=>item.stock<item.min).length}</b></div></section></div></section><footer class="footer">Prepared by ${companyContact.name}.</footer></main><button onclick="window.print()">Print business report</button></body></html>`);page.document.close();}
function printWorkerSlip(worker){const slip=window.open('','_blank','width=760,height=820');if(!slip)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;const total=workerTotal(worker);slip.document.write(`<html><head><title>Worker pay slip - ${escapeHtml(worker.name)}</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#17212f;font-family:Arial,sans-serif;padding:32px}.sheet{max-width:680px;margin:auto;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(26,39,58,.12)}.header{display:flex;align-items:center;gap:18px;padding:24px 28px;background:#182a42;color:#fff;border-bottom:5px solid #d4a72c}.header img{width:72px;height:72px;object-fit:contain;background:#fff;border-radius:10px;padding:5px}.header h1{font-size:22px;margin:0 0 8px}.header p{font-size:11px;line-height:1.6;margin:0;color:#d9e2ef}.content{padding:28px}.title-row{display:flex;justify-content:space-between;align-items:end;gap:16px;border-bottom:1px solid #e5eaf0;padding-bottom:18px;margin-bottom:16px}.title-row h2{margin:0;font-size:21px}.title-row span{color:#7c899b;font-size:11px}.details{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e1e6ed;border-radius:10px;overflow:hidden}.detail{padding:14px 16px;border-bottom:1px solid #e8edf2}.detail:nth-child(odd){border-right:1px solid #e8edf2}.detail:nth-last-child(-n+2){border-bottom:0}.label{display:block;color:#78869a;font-size:10px;text-transform:uppercase;letter-spacing:.7px;margin-bottom:5px}.detail b{font-size:13px}.summary{margin-top:18px;border:1px solid #ead9a2;border-radius:10px;overflow:hidden}.summary h3{margin:0;padding:12px 16px;background:#fff8dc;color:#8a6500;font-size:12px;text-transform:uppercase;letter-spacing:.7px}.summary-row{display:flex;justify-content:space-between;padding:13px 16px;border-top:1px solid #f0e7c8;font-size:13px}.total{display:flex;justify-content:space-between;align-items:center;padding:18px 16px;background:#d4a72c;color:#241d0b;font-size:20px;font-weight:700}.footer{padding:0 28px 24px;color:#7c899b;font-size:10px;text-align:center}button{display:block;margin:20px auto 0;border:0;border-radius:7px;background:#2d67f0;color:#fff;padding:11px 20px;font-weight:700}@media(max-width:600px){body{padding:10px}.header{padding:18px}.content{padding:18px}.details{grid-template-columns:1fr}.detail:nth-child(odd){border-right:0}.detail:nth-last-child(-n+2){border-bottom:1px solid #e8edf2}.detail:last-child{border-bottom:0}}@media print{body{background:#fff;padding:0}.sheet{border:0;box-shadow:none;max-width:none}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src="${logoUrl}" alt="${companyContact.name} logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p><p>T. ${companyContact.phone} | F. ${companyContact.fax} | P.O. Box ${companyContact.poBox}</p></div></header><section class="content"><div class="title-row"><h2>Worker pay slip</h2><span>Saudi Riyal (SAR)</span></div><div class="details"><div class="detail"><span class="label">Worker name</span><b>${escapeHtml(worker.name)}</b></div><div class="detail"><span class="label">Role</span><b>${escapeHtml(worker.skill)}</b></div><div class="detail"><span class="label">Phone</span><b>${escapeHtml(worker.phone||'Not provided')}</b></div><div class="detail"><span class="label">Project</span><b>${escapeHtml(worker.project)}</b></div><div class="detail"><span class="label">Attendance</span><b>${escapeHtml(worker.attendance||'Not provided')} (${worker.attendanceDays||0}/${worker.attendanceTotal||0} days)</b></div><div class="detail"><span class="label">Daily laborer rate</span><b>${money(worker.rate)}</b></div></div><section class="summary"><h3>Payment summary</h3><div class="summary-row"><span>Labour cost</span><b>${money(worker.cost)}</b></div><div class="summary-row"><span>Overtime (${worker.overtimeHours||0} hours)</span><b>${money(worker.overtimePay)}</b></div><div class="total"><span>Total money</span><strong>${money(total)}</strong></div></section></section><footer class="footer">Thank you for your work. This document was prepared by ${companyContact.name}.</footer></main><button onclick="window.print()">Print slip</button></body></html>`);slip.document.close();}
function printCustomerRecord(customer){const page=window.open('','_blank','width=760,height=760');if(!page)return;const logoUrl=new URL('./compny logo.jpeg',window.location.href).href;page.document.write(`<html><head><title>Customer record - ${escapeHtml(customer.name)}</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#17212f;font-family:Arial,sans-serif;padding:32px}.sheet{max-width:680px;margin:auto;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(26,39,58,.12)}.header{display:flex;align-items:center;gap:18px;padding:24px 28px;background:#182a42;color:#fff;border-bottom:5px solid #d4a72c}.header img{width:72px;height:72px;object-fit:contain;background:#fff;border-radius:10px;padding:5px}.header h1{font-size:22px;margin:0 0 8px}.header p{font-size:11px;line-height:1.6;margin:0;color:#d9e2ef}.content{padding:28px}.title-row{display:flex;justify-content:space-between;align-items:end;gap:16px;border-bottom:1px solid #e5eaf0;padding-bottom:18px;margin-bottom:16px}.title-row h2{margin:0;font-size:21px}.title-row span{color:#7c899b;font-size:11px}.details{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e1e6ed;border-radius:10px;overflow:hidden}.detail{padding:15px 16px;border-bottom:1px solid #e8edf2}.detail:nth-child(odd){border-right:1px solid #e8edf2}.detail:nth-last-child(-n+2){border-bottom:0}.label{display:block;color:#78869a;font-size:10px;text-transform:uppercase;letter-spacing:.7px;margin-bottom:5px}.detail b{font-size:13px}.total{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding:18px 16px;background:#d4a72c;color:#241d0b;border-radius:10px;font-size:20px;font-weight:700}.footer{padding:0 28px 24px;color:#7c899b;font-size:10px;text-align:center}button{display:block;margin:20px auto 0;border:0;border-radius:7px;background:#2d67f0;color:#fff;padding:11px 20px;font-weight:700}@media(max-width:600px){body{padding:10px}.header{padding:18px}.content{padding:18px}.details{grid-template-columns:1fr}.detail:nth-child(odd){border-right:0}.detail:nth-last-child(-n+2){border-bottom:1px solid #e8edf2}.detail:last-child{border-bottom:0}}@media print{body{background:#fff;padding:0}.sheet{border:0;box-shadow:none;max-width:none}button{display:none}}</style></head><body><main class="sheet"><header class="header"><img src="${logoUrl}" alt="${companyContact.name} logo"><div><h1>${companyContact.name}</h1><p>${companyContact.address}</p><p>${companyContact.email} | Cell: ${companyContact.mobile}</p><p>CR ${companyContact.cr} | VAT ${companyContact.vat}</p><p>T. ${companyContact.phone} | F. ${companyContact.fax} | P.O. Box ${companyContact.poBox}</p></div></header><section class="content"><div class="title-row"><h2>Customer record</h2><span>Customer profile</span></div><div class="details"><div class="detail"><span class="label">Customer name</span><b>${escapeHtml(customer.name)}</b></div><div class="detail"><span class="label">Customer ID</span><b>${escapeHtml(customer.id)}</b></div><div class="detail"><span class="label">Email</span><b>${escapeHtml(customer.email)}</b></div><div class="detail"><span class="label">Phone</span><b>${escapeHtml(customer.phone)}</b></div><div class="detail"><span class="label">Address</span><b>${escapeHtml(customer.address)}</b></div><div class="detail"><span class="label">Projects</span><b>${customer.projects||0}</b></div></div><div class="total"><span>Total billed</span><strong>${money(customer.billed)}</strong></div></section><footer class="footer">Prepared by ${companyContact.name}.</footer></main><button onclick="window.print()">Print customer record</button></body></html>`);page.document.close();}
function clearStaticDemoContent(){byId('invoicePreview')?.remove();const report=byId('view-reports');if(report){const profit=report.querySelector('.profit-number');if(profit)profit.innerHTML='SAR 0 <small>estimated profit</small>';const bars=report.querySelector('.report-bars');if(bars)bars.innerHTML='<div class="empty-state">Add projects, expenses, and payments to generate your first report.</div>';}}
function repairLegacyText(){const replacements=[["\u00e2\u2020\u2012",' - '],["\u00e2\u2020\u2019",' -> '],["\u00e2\u0153\u2013",'OK'],["\u00c3\u2014",'Delete']];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>replacements.forEach(([from,to])=>{node.nodeValue=node.nodeValue.replaceAll(from,to)}));}
function applyCompanyName(){document.querySelectorAll('.invoice-company h2').forEach(node=>node.textContent='Arkan AL-Omda Limited Co.');document.querySelectorAll('.invoice-company img').forEach(node=>node.alt='Arkan AL-Omda Limited Co. logo');}
function refresh(){applyAdminAccessState();updateDashboardDate();renderDashboard();renderProjects();renderProjectReports();renderCustomers();renderMaterials();renderMarket();renderTasks();renderWorkers();renderFinance();clearStaticDemoContent();repairLegacyText();applyCompanyName();}
let refreshTimer = null;
function debouncedRefresh(){
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => refresh(), 120);
}
let previousView = 'dashboard';
function navigate(view, remember=true){
  const isLoggedIn = adminLoggedIn;
  if (!isLoggedIn && view !== 'settings') {
    view = 'settings';
  }
  const currentView=document.querySelector('.view.active')?.id.replace('view-','')||'dashboard';
  if(remember&&currentView!==view)previousView=currentView;
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${view}`));
  const breadcrumb=byId('breadcrumbTitle');
  if(breadcrumb)breadcrumb.textContent=view.charAt(0).toUpperCase()+view.slice(1);
  byId('sidebar').classList.remove('open');
  window.scrollTo(0,0);
}

document.addEventListener('click', event=>{const printWorker=event.target.closest('[data-print-worker]');if(printWorker){const worker=db.workers.find(item=>item.id===printWorker.dataset.printWorker);if(worker)printWorkerSlip(worker);return}const printCustomer=event.target.closest('[data-print-customer]');if(printCustomer){const customer=db.customers.find(item=>item.id===printCustomer.dataset.printCustomer);if(customer)printCustomerRecord(customer);return}const nav=event.target.closest('[data-view]');if(nav){navigate(nav.dataset.view);return}const link=event.target.closest('[data-view-link]');if(link){navigate(link.dataset.viewLink);return}const action=event.target.closest('[data-action]');if(action){openForm(action.dataset.action,action.dataset.action==='new-invoice'?{item:'Exhaust Fan',quantity:2}:{});return}if(event.target.closest('[data-price]')){const material=db.materials.find(m=>m.id===event.target.closest('[data-price]').dataset.price);openForm('update-price',{id:material.id,marketPrice:material.marketPrice,source:material.source});return}if(event.target.closest('[data-delete]')){const button=event.target.closest('[data-delete]');const collection=Object.keys(db).find(key=>db[key].some(item=>item.id===button.dataset.delete));if(collection&&confirm('Delete this record?')){db[collection]=db[collection].filter(item=>item.id!==button.dataset.delete);save();refresh();notify('Record deleted');}return}if(event.target.closest('[data-edit]')){const button=event.target.closest('[data-edit]');const collection=Object.keys(db).find(key=>db[key].some(item=>item.id===button.dataset.edit));const record=db[collection]?.find(item=>item.id===button.dataset.edit);if(record){const key=Object.keys(forms).find(k=>forms[k].collection===collection);if(key)openForm(key,record);}return}});
byId('modalForm').addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(event.target).entries());const formTitle=activeForm.title;const collection=activeForm.collection;if(formTitle==='Update market price'){const material=db.materials.find(m=>m.id===data.id);if(material){material.marketPrice=data.marketPrice===''?null:Number(data.marketPrice);material.source=data.source;material.updated=new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'});}}else{const prefix={projects:'PRJ',customers:'CUS',materials:'MAT',tasks:'TSK',expenses:'EXP',payments:'PAY',invoices:'INV',workers:'W',quotations:'QT'}[collection];data.id=`${prefix}-${String(Date.now()).slice(-5)}`;const numericFields=['budget','cost','progress','rate','price','stock','min','amount','billed','projects','tasks','quantity','unitPrice','overtimeHours','overtimePay','transport','attendanceDays','attendanceTotal'];if(numericFields.some(k=>data[k]!==undefined))Object.keys(data).forEach(k=>{if(numericFields.includes(k))data[k]=Number(data[k]||0)});if(data.marketPrice!=='')data.marketPrice=Number(data.marketPrice);else data.marketPrice=null;if(collection==='workers')data.totalMoney=Number(data.cost||0)+Number(data.overtimePay||0);if(collection==='invoices'){data.amount=data.amount||data.quantity*data.unitPrice;data.issued='Today'}if(collection==='projects'){data.cost=0;data.progress=data.progress||0}if(collection==='materials'){data.sellingPrice=data.price;data.previous=data.price;data.updated='Today';data.source=data.supplier}if(collection==='customers'){data.projects=0;data.billed=0}if(collection==='tasks'){data.start='Today'}db[collection].unshift(data);}save();closeForm();refresh();notify(formTitle.includes('price')?'Market price updated':'Saved successfully');});

byId('modalClose').addEventListener('click',closeForm);byId('modalCancel').addEventListener('click',closeForm);byId('modalBackdrop').addEventListener('click',event=>{if(event.target===byId('modalBackdrop'))closeForm()});byId('mobileMenu')?.addEventListener('click',()=>byId('sidebar').classList.toggle('open'));byId('backButton')?.addEventListener('click',()=>navigate(previousView,false));byId('themeToggle')?.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));byId('saveSettings')?.addEventListener('click',()=>notify('Settings saved'));byId('printProjects')?.addEventListener('click',()=>window.print());byId('printQuotation')?.addEventListener('click',()=>printQuotationsReport());byId('dashboardPrint')?.addEventListener('click',()=>window.print());byId('notificationButton')?.addEventListener('click',()=>notify('3 items need attention'));byId('workersTableToggle')?.addEventListener('click',()=>{const panel=byId('workersTablePanel');const cards=byId('workersGrid');const showing=panel.hasAttribute('hidden');panel.toggleAttribute('hidden',!showing);cards.toggleAttribute('hidden',showing);byId('workersTableToggle').textContent=showing?'Card view':'Table view';});
byId('adminLoginForm')?.addEventListener('submit',event=>{event.preventDefault();loginAdmin(byId('adminEmailField')?.value,byId('adminPasswordField')?.value);});
byId('adminInlineLoginForm')?.addEventListener('submit',event=>{event.preventDefault();loginAdmin(byId('adminEmailInput')?.value,byId('adminPasswordInput')?.value);});
byId('adminLoginButton')?.addEventListener('click',()=>loginAdmin(byId('adminEmailField')?.value,byId('adminPasswordField')?.value));
byId('adminSignupForm')?.addEventListener('submit',event=>{event.preventDefault();signupAdmin(byId('adminSignupEmail')?.value,byId('adminSignupPassword')?.value);});
byId('signInTab')?.addEventListener('click',()=>setAuthMode('signin'));
byId('signUpTab')?.addEventListener('click',()=>setAuthMode('signup'));
byId('adminLogoutButton')?.addEventListener('click',logoutAdmin);
byId('chatLauncher')?.addEventListener('click',()=>{const window=byId('chatWindow');if(!window)return;const opening=window.hidden;window.hidden=!opening;byId('chatLauncher').setAttribute('aria-expanded',String(opening));if(opening)byId('chatInput')?.focus();});
byId('chatClose')?.addEventListener('click',()=>{byId('chatWindow')?.setAttribute('hidden','');byId('chatLauncher')?.setAttribute('aria-expanded','false');});
byId('chatForm')?.addEventListener('submit',event=>{event.preventDefault();const input=byId('chatInput');sendChatQuestion(input?.value);if(input)input.value='';});
document.querySelectorAll('[data-chat-prompt]').forEach(button=>button.addEventListener('click',()=>sendChatQuestion(button.dataset.chatPrompt)));
setAuthMode('signin');
connectCloudSync();

byId('printProjects')?.addEventListener('click',event=>{event.stopImmediatePropagation();printProjectsReport();},true);
byId('printReport')?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();printSelectedProjectReport();},true);
byId('printQuotation')?.addEventListener('click',event=>{event.stopImmediatePropagation();const quotation=db.quotations.find(item=>item.id===selectedQuotationId)||db.quotations[0];if(quotation)printQuotationsReport(quotation);},true);
document.addEventListener('click',event=>{const printProject=event.target.closest('[data-print-project]');if(printProject){const project=db.projects.find(item=>item.id===printProject.dataset.printProject);if(project)printProjectQuotation(project);}},true);
document.addEventListener('click',event=>{const printMaterial=event.target.closest('[data-print-material]');if(printMaterial){const material=db.materials.find(item=>item.id===printMaterial.dataset.printMaterial);if(material)printMaterialRecord(material);}},true);
document.addEventListener('click',event=>{const printExpense=event.target.closest('[data-print-expense]');if(printExpense){const expense=db.expenses.find(item=>item.id===printExpense.dataset.printExpense);if(expense)printExpenseRecord(expense);}},true);
document.addEventListener('click',event=>{const row=event.target.closest('[data-select-quotation]');if(row&&!event.target.closest('button')){selectedQuotationId=row.dataset.selectQuotation;renderFinance();}},true);
const openQuotationPrintDocument=printQuotationsReport;
printQuotationsReport=function(quotation){const originalOpen=window.open;let printPage=null;window.open=function(...args){printPage=originalOpen.apply(window,args);if(printPage)printPage.onload=()=>printPage.print();return printPage;};try{openQuotationPrintDocument(quotation);}finally{window.open=originalOpen;}};
const openProjectPrintDocument=printProjectQuotation;
printProjectQuotation=function(project){const originalOpen=window.open;let printPage=null;window.open=function(...args){printPage=originalOpen.apply(window,args);if(printPage)printPage.onload=()=>printPage.print();return printPage;};try{openProjectPrintDocument(project);}finally{window.open=originalOpen;}};
const renderQuotationRows=renderFinance;
function renderExpenseWorkspace(){const table=byId('expensesTable');if(!table)return;const query=(byId('expenseSearch')?.value||'').trim().toLowerCase();const category=byId('expenseCategoryFilter')?.value||'all';const expenses=db.expenses;const normalizeCategory=(value='')=>String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();const matchesCategory=item=>{if(category==='all')return true;const itemCategory=normalizeCategory(item.category);const filterCategory=normalizeCategory(category);if(filterCategory==='transport & fuel')return itemCategory.includes('transport')||itemCategory.includes('fuel')||itemCategory.includes('vehicle')||itemCategory.includes('travel')||itemCategory.includes('delivery');if(filterCategory==='other expenses')return !/material|labour|labor|food|transport|fuel|vehicle|travel|delivery/i.test(itemCategory) || /equipment|tools|misc|electric|accommodation/.test(itemCategory);return itemCategory===filterCategory || itemCategory.includes(filterCategory) || filterCategory.includes(itemCategory);};const filtered=expenses.filter(item=>matchesCategory(item) && `${item.id} ${item.description} ${item.project} ${item.category}`.toLowerCase().includes(query));
  const normalizeExpenseCategory=(value='')=>String(value||'').trim();
  const isMaterialExpense=item=>/material/i.test(normalizeExpenseCategory(item.category));
  const isLabourExpense=item=>/labour|labor|crew|wage|salary/i.test(normalizeExpenseCategory(item.category));
  const isFoodExpense=item=>/food|meal|lunch|dinner|breakfast|snack/i.test(normalizeExpenseCategory(item.category));
  const isTransportExpense=item=>/transport|travel|vehicle|delivery|trip|fuel|diesel|gas|car/i.test(normalizeExpenseCategory(item.category));
  const isOtherExpense=item=>!isMaterialExpense(item) && !isLabourExpense(item) && !isFoodExpense(item) && !isTransportExpense(item);
  const categoryClass=item=>String(item.category||'other').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'other';
  table.innerHTML=filtered.map(item=>`<tr class="expense-row"><td><div class="expense-identity"><span class="expense-mark">${escapeHtml((item.description||'E').charAt(0))}</span><span><b>${escapeHtml(item.description)}</b><small>${escapeHtml(item.id)}</small></span></div></td><td>${escapeHtml(item.project)}</td><td><span class="expense-category ${categoryClass(item)}">${escapeHtml(item.category)}</span></td><td>${escapeHtml(item.date||'Not set')}</td><td><strong>${money(item.amount)}</strong></td><td><span class="row-actions project-row-actions expense-row-actions"><button title="Edit expense" data-edit="${escapeHtml(item.id)}">Edit</button><button title="Delete expense" data-delete="${escapeHtml(item.id)}">Delete</button><button title="Print expense" data-print-expense="${escapeHtml(item.id)}">&#128424; Print</button></span></td></tr>`).join('')||emptyRow(6,'No expenses found');
  const total=expenses.reduce((sum,item)=>sum+Number(item.amount||0),0),material=expenses.filter(isMaterialExpense).reduce((sum,item)=>sum+Number(item.amount||0),0),labour=expenses.filter(isLabourExpense).reduce((sum,item)=>sum+Number(item.amount||0),0),food=expenses.filter(isFoodExpense).reduce((sum,item)=>sum+Number(item.amount||0),0),transport=expenses.filter(isTransportExpense).reduce((sum,item)=>sum+Number(item.amount||0),0),other=expenses.filter(isOtherExpense).reduce((sum,item)=>sum+Number(item.amount||0),0);
  byId('expenseTotal').textContent=money(total);byId('materialExpenseTotal').textContent=money(material);byId('labourExpenseTotal').textContent=money(labour);byId('foodExpenseTotal').textContent=money(food);byId('transportExpenseTotal').textContent=money(transport);byId('otherExpenseTotal').textContent=money(other);byId('expenseCount').textContent=`${expenses.length} record${expenses.length===1?'':'s'}`;}


renderFinance=function(){
  const query=(byId('quotationSearch')?.value||'').trim().toLowerCase();
  const filteredQuotations = !query ? db.quotations : db.quotations.filter(q=>`${q.id||''} ${q.customer||''} ${q.project||''} ${q.status||''}`.toLowerCase().includes(query));
  const quotationsTable=byId('quotationsTable');
  if(quotationsTable){
    quotationsTable.innerHTML = filteredQuotations.map(q=>`<tr><td><b>${q.id}</b></td><td>${escapeHtml(q.customer)}<small>${escapeHtml(q.project)}</small></td><td>${money(q.amount)}</td><td>${q.valid}</td><td>${q.status === 'Sent' ? '' : status(q.status)}</td><td>${quotationRowActions(q.id)}</td></tr>`).join('') || emptyRow(6,'No quotations found');
  }
  renderExpenseWorkspace();
};

['projectSearch','projectStatusFilter','customerSearch','materialSearch','taskSearch','taskStatusFilter'].forEach(id=>byId(id)?.addEventListener('input',debouncedRefresh));
byId('quotationSearch')?.addEventListener('input',debouncedRefresh);
byId('expenseSearch')?.addEventListener('input',debouncedRefresh);
byId('expenseCategoryFilter')?.addEventListener('change',debouncedRefresh);
setTheme(localStorage.getItem(themeKey)==='true');
refresh();


