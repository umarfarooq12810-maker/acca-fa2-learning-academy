const chapters = [
 ["Accounting principles, concepts & characteristics","Syllabus area A"],
 ["Accounting equation, double entry & information flow","Syllabus area B"],
 ["Journals, general ledgers & ledger balancing","Syllabus area C"],
 ["Sales, purchases, sales tax, cash & bank","Syllabus area D"],
 ["Inventory","Syllabus area D"],
 ["Tangible non-current assets & depreciation","Syllabus area D"],
 ["Accruals, prepayments & income adjustments","Syllabus area D"],
 ["Receivables, payables, provisions & capital","Syllabus area D"],
 ["Bank and payables reconciliations","Syllabus area E"],
 ["Trial balance, errors & financial statements","Syllabus areas F–G"],
 ["Partnerships","Syllabus area H"]
];
const questions = [
 {topic:"Accounting principles",text:"Which accounting concept assumes that a business will continue operating for the foreseeable future?",opts:["Going concern","Prudence","Materiality","Duality"],answer:0,why:"The going concern assumption presumes that the entity will continue in operational existence for the foreseeable future."},
 {topic:"Qualitative characteristics",text:"Which qualitative characteristic means that financial information is complete, neutral and free from material error?",opts:["Comparability","Faithful representation","Timeliness","Understandability"],answer:1,why:"Faithful representation requires information to represent the substance of the economic phenomena it purports to represent."},
 {topic:"Accounting equation",text:"A sole trader introduces $5,000 cash as capital. What is the effect on assets and capital?",opts:["Assets increase $5,000; capital increases $5,000","Assets decrease $5,000; capital increases $5,000","Assets increase $5,000; liabilities increase $5,000","No effect"],answer:0,why:"Cash (an asset) increases and owner's capital (equity) increases by the same amount."}
];
const storeKey="fa2-academy-progress-v1";
let progress=JSON.parse(localStorage.getItem(storeKey)||'{"attempts":0,"correct":0,"visited":[]}');
let qIndex=0, selected=null, checked=false, supabase=null, currentUser=null;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(storeKey,JSON.stringify(progress));renderStats();}
function renderChapters(){$("chapter-grid").innerHTML=chapters.map((c,i)=>`<article class="chapter-card"><div><span class="chapter-number">CHAPTER ${String(i+1).padStart(2,"0")}</span><h3>${c[0]}</h3><p>${c[1]} · Learning module in development</p></div><button class="text-button" data-chapter="${i}">Mark as visited →</button></article>`).join("");document.querySelectorAll("[data-chapter]").forEach(b=>b.addEventListener("click",()=>{if(!progress.visited.includes(+b.dataset.chapter))progress.visited.push(+b.dataset.chapter);save();b.textContent="Visited ✓";}));}
function renderQuestion(){const q=questions[qIndex%questions.length];selected=null;checked=false;$("q-topic").textContent=q.topic;$("q-counter").textContent=`Starter question ${qIndex+1}`;$("question-text").textContent=q.text;$("answers").innerHTML=q.opts.map((o,i)=>`<label class="answer-option"><input type="radio" name="answer" value="${i}"><span>${String.fromCharCode(65+i)}. ${o}</span></label>`).join("");$("feedback").textContent="";$("feedback").className="feedback";$("check-answer").disabled=false;$("next-question").disabled=true;document.querySelectorAll('input[name="answer"]').forEach(x=>x.addEventListener("change",()=>selected=+x.value));}
function checkAnswer(){if(selected===null){$("feedback").textContent="Select an answer first.";return;}if(checked)return;checked=true;const q=questions[qIndex%questions.length],ok=selected===q.answer;progress.attempts++;if(ok)progress.correct++;save();$("feedback").className="feedback "+(ok?"good":"bad");$("feedback").textContent=(ok?"Correct. ":"Not quite. ")+q.why;$("check-answer").disabled=true;$("next-question").disabled=false;}
function renderStats(){const a=progress.attempts,c=progress.correct,p=a?Math.round(c/a*100):0;$("overall-progress").textContent=p+"%";$("accuracy-bar").style.width=p+"%";$("attempt-count").textContent=a;$("chapter-count").textContent=`${progress.visited.length} / 11`;$("stat-attempted").textContent=a;$("stat-correct").textContent=c;$("stat-accuracy").textContent=p+"%";$("stat-chapters").textContent=`${progress.visited.length} / 11`;}
async function setupAuth(){const cfg=window.FA2_CONFIG||{};if(!cfg.supabaseUrl||!cfg.supabaseAnonKey||!window.supabase){$("auth-message").textContent="Guest mode is active. Add Supabase URL and anon key in config.js to enable public registration.";return;}supabase=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);const {data}=await supabase.auth.getSession();currentUser=data.session?.user||null;updateAuth();supabase.auth.onAuthStateChange((_e,s)=>{currentUser=s?.user||null;updateAuth();});}
function updateAuth(){$("auth-status").textContent=currentUser?`Signed in: ${currentUser.email}`:"Guest mode";}
$("check-answer").addEventListener("click",checkAnswer);$("next-question").addEventListener("click",()=>{qIndex++;renderQuestion();});
$("auth-form").addEventListener("submit",async e=>{e.preventDefault();if(!supabase){$("auth-message").textContent="Registration is not configured yet. Follow README.md to connect a free Supabase project.";return;}const {data,error}=await supabase.auth.signUp({email:$("email").value,password:$("password").value});$("auth-message").textContent=error?error.message:"Account request submitted. Check your email if confirmation is enabled.";});
$("signin").addEventListener("click",async()=>{if(!supabase){$("auth-message").textContent="Connect Supabase first (see README.md).";return;}const {error}=await supabase.auth.signInWithPassword({email:$("email").value,password:$("password").value});$("auth-message").textContent=error?error.message:"Signed in.";});
$("signout").addEventListener("click",async()=>{if(supabase)await supabase.auth.signOut();});
renderChapters();renderQuestion();renderStats();setupAuth();
