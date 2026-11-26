(() => {
'use strict';
const $=id=>document.getElementById(id);
const language=$('language');
const words={
sv:['Mitt konto','Logga in','Skapa konto','Glömt lösenord','Logga ut','E-post','Lösenord (minst 12 tecken vid registrering)','Spara planen på mitt konto','Mina kontoplaner','Uppdatera listan','Radera','Bekräfta radering?','Kontrollera din e-post.','Åtgärden misslyckades. Kontrollera uppgifterna och försök igen.','Sparad på kontot.','Inga kontoplaner ännu.','Spara nytt lösenord','Lösenordet har ändrats.','Logga in för att spara på kontot.','Planer på kontot sparas online. Undvik känsliga personuppgifter. Lokala planer överförs inte automatiskt.','Stäng'],
en:['My account','Sign in','Create account','Forgot password','Sign out','Email','Password (at least 12 characters for registration)','Save plan to my account','My account plans','Refresh list','Delete','Confirm deletion?','Check your email.','Action failed. Check your details and try again.','Saved to your account.','No account plans yet.','Save new password','Password changed.','Sign in to save to your account.','Account plans are stored online. Avoid sensitive personal information. Local plans are not transferred automatically.','Close'],
fa:['حساب من','ورود','ایجاد حساب','فراموشی رمز عبور','خروج','ایمیل','رمز عبور (حداقل ۱۲ نویسه برای ثبت‌نام)','ذخیره برنامه در حساب','برنامه‌های حساب من','به‌روزرسانی فهرست','حذف','حذف شود؟','ایمیل خود را بررسی کنید.','عملیات ناموفق بود. دوباره تلاش کنید.','در حساب ذخیره شد.','هنوز برنامه‌ای در حساب نیست.','ذخیره رمز جدید','رمز تغییر کرد.','برای ذخیره در حساب وارد شوید.','برنامه‌های حساب آنلاین ذخیره می‌شوند. اطلاعات حساس وارد نکنید. برنامه‌های محلی خودکار منتقل نمی‌شوند.','بستن'],
ar:['حسابي','تسجيل الدخول','إنشاء حساب','نسيت كلمة المرور','تسجيل الخروج','البريد الإلكتروني','كلمة المرور (١٢ حرفاً على الأقل للتسجيل)','حفظ الخطة في حسابي','خطط حسابي','تحديث القائمة','حذف','تأكيد الحذف؟','تحقق من بريدك الإلكتروني.','تعذّر الإجراء. تحقق من البيانات وحاول مجدداً.','تم الحفظ في الحساب.','لا توجد خطط في الحساب بعد.','حفظ كلمة المرور الجديدة','تم تغيير كلمة المرور.','سجل الدخول للحفظ في حسابك.','تُحفظ خطط الحساب على الإنترنت. تجنب البيانات الحساسة. لا تُنقل الخطط المحلية تلقائياً.','إغلاق'],
so:['Akoonkayga','Gal','Samee akoon','Illowday furaha sirta','Ka bax','Iimayl','Furaha sirta (ugu yaraan 12 xaraf markaad isdiiwaangelinayso)','Qorshaha ku kaydi akoonkayga','Qorshayaasha akoonkayga','Cusboonaysii liiska','Tirtir','Ma xaqiijinaysaa tirtirka?','Hubi iimaylkaaga.','Hawshu way fashilantay. Mar kale isku day.','Akoonka ayaa lagu kaydiyey.','Weli qorshe akoon kuma jiro.','Kaydi furaha cusub','Furaha waa la beddelay.','Gal si aad akoonka ugu kaydiso.','Qorshayaasha akoonka internetka ayaa lagu kaydiyaa. Ka fogow xog xasaasi ah. Qorshayaasha qalabka si toos ah looma wareejiyo.','Xir'],
tr:['Hesabım','Giriş yap','Hesap oluştur','Şifremi unuttum','Çıkış yap','E-posta','Şifre (kayıt için en az 12 karakter)','Planı hesabıma kaydet','Hesabımdaki planlar','Listeyi yenile','Sil','Silmek istediğinize emin misiniz?','E-postanızı kontrol edin.','İşlem başarısız. Bilgilerinizi kontrol edip tekrar deneyin.','Hesaba kaydedildi.','Henüz hesap planı yok.','Yeni şifreyi kaydet','Şifre değiştirildi.','Hesaba kaydetmek için giriş yapın.','Hesap planları çevrimiçi saklanır. Hassas kişisel bilgilerden kaçının. Yerel planlar otomatik aktarılmaz.','Kapat']
};
const w=i=>(words[language.value]||words.sv)[i];
const el=(tag,parent,txt)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;if(parent)parent.append(n);return n};
const labels=[];
function label(n,i){labels.push([n,i]);n.textContent=w(i);return n}
function btn(parent,i,fn){const b=label(el('button',parent),i);b.type='button';b.addEventListener('click',fn);return b}
const toggle=btn(document.querySelector('header'),0,()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden){heading.focus();if(user&&!recovery)refresh()}});
toggle.className='secondary';
toggle.setAttribute('aria-controls','accountBeta');const panel=el('section');panel.className='panel';panel.id='accountBeta';panel.hidden=true;panel.style.cssText='max-width:1060px;margin:18px auto;padding:24px';document.querySelector('header').after(panel);
const heading=label(el('h2',panel),0);heading.tabIndex=-1;
btn(panel,20,()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus()}).className='secondary';
label(el('p',panel),19);
const msg=el('p',panel);msg.setAttribute('role','status');
const form=el('form',panel);
const emailLabel=el('label',form);label(el('span',emailLabel),5);const email=el('input',emailLabel);email.type='email';email.autocomplete='email';email.required=true;
const passLabel=el('label',form);label(el('span',passLabel),6);const pass=el('input',passLabel);pass.type='password';pass.autocomplete='current-password';pass.required=true;
for(const input of [email,pass])input.style.cssText='display:block;width:100%;max-width:440px;padding:12px;border:1px solid #879f90;border-radius:9px;margin:8px 0 16px;font:inherit';
const controls=el('div',form);controls.className='actions';
const login=btn(controls,1,()=>{});login.type='submit';form.onsubmit=e=>{e.preventDefault();auth(recovery?'change':'login')};
const signup=btn(controls,2,()=>auth('signup'));
const forgot=btn(controls,3,()=>auth('reset'));forgot.className='secondary';
const change=btn(controls,16,()=>auth('change'));
const account=el('div',panel);const identity=el('p',account);
btn(account,4,()=>auth('logout'));
label(el('h3',account),8);btn(account,9,()=>refresh());
const list=el('div',account);
const cloud=btn($('savePlan').parentElement,7,()=>save());
cloud.className='secondary';const cloudStatus=el('p',$('savePlan').parentElement);cloudStatus.setAttribute('role','status');
const endpoint='https://owuhvthdmqhucwingexh.supabase.co';
const key='sb_publishable_lhyMo7AZzT2AiFGoJGUYIA_Y8rjF1_l';
let client,user=null,recovery=false,busy=false,epoch=0;
const redirect=window.location.origin+'/';
const say=(i,target=msg)=>{target.textContent=w(i)};
function state(){toggle.setAttribute('aria-expanded',String(!panel.hidden));form.hidden=!!user&&!recovery;account.hidden=!user||recovery;emailLabel.hidden=recovery;email.required=!recovery;login.hidden=recovery;signup.hidden=recovery;forgot.hidden=recovery;change.hidden=!recovery;pass.autocomplete=recovery?'new-password':'current-password';identity.textContent=user?.email||'';if(!user||recovery){list.replaceChildren();cloudStatus.textContent=''} }
function accept(session){const next=session?.user||null;if(user?.id!==next?.id){epoch++;list.replaceChildren();cloudStatus.textContent='';pass.value=''}user=next;state()}
async function auth(mode){if(!client||busy)return; if(mode==='reset'&&!email.reportValidity())return;if(['login','signup'].includes(mode)&&(!email.reportValidity()||!pass.reportValidity()))return;if(['signup','change'].includes(mode)&&pass.value.length<12){say(13);pass.focus();return}busy=true;msg.textContent='';try{let response;switch(mode){case 'login':response=await client.auth.signInWithPassword({email:email.value.trim(),password:pass.value});break;case 'signup':response=await client.auth.signUp({email:email.value.trim(),password:pass.value,options:{emailRedirectTo:redirect}});break;case 'reset':response=await client.auth.resetPasswordForEmail(email.value.trim(),{redirectTo:redirect});break;case 'change':response=await client.auth.updateUser({password:pass.value});break;case 'logout':response=await client.auth.signOut();break}if(response.error)throw response.error;pass.value='';if(mode==='logout'){recovery=false;accept(null);email.value='';msg.textContent=''}else if(mode==='change'){recovery=false;state();say(17);refresh()}else if(mode==='reset'||mode==='signup'&&!response.data.session){say(12)}else{accept(response.data.session);refresh()}}catch{say(13)}finally{busy=false}}
async function refresh(){if(!client||!user||recovery)return;const owner=user.id,version=++epoch;list.replaceChildren();try{const {data,error}=await client.from('action_plans').select('id,title,content,created_at').eq('user_id',owner).order('created_at',{ascending:false}).limit(100);if(error)throw error;if(version!==epoch||user?.id!==owner||recovery)return;if(!data.length)el('p',list,w(15));for(const plan of data){const details=el('details',list);details.style.margin='12px 0';el('summary',details,plan.title);const pre=el('pre',details,typeof plan.content?.text==='string'?plan.content.text:'');pre.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;font:inherit';btn(details,10,async()=>{if(user?.id!==owner||!confirm(w(11)))return;try{const result=await client.from('action_plans').delete().eq('id',plan.id).eq('user_id',owner);if(result.error)throw result.error;if(user?.id===owner)refresh()}catch{if(user?.id===owner)say(13)}})}}catch{if(version===epoch&&user?.id===owner)say(13)}}
let saving=false;
async function save(){if(!client||!user||recovery){panel.hidden=false;toggle.setAttribute('aria-expanded','true');say(18);panel.scrollIntoView({block:'start'});return}if(saving||typeof lastPlan!=='string'||!lastPlan)return;const owner=user.id;saving=true;cloud.disabled=true;cloudStatus.textContent='';try{const {error}=await client.from('action_plans').insert({user_id:owner,title:$('summary').textContent,language:language.value,content:{text:lastPlan,steps:lastPlanSteps}});if(error)throw error;if(user?.id===owner){say(14,cloudStatus);if(!panel.hidden)refresh()}}catch{if(user?.id===owner)say(13,cloudStatus)}finally{saving=false;cloud.disabled=false}}
language.addEventListener('change',()=>{for(let j=labels.length-1;j>=0;j--){const [n,i]=labels[j];if(n.isConnected)n.textContent=w(i);else labels.splice(j,1);}msg.textContent='';cloudStatus.textContent='';if(user&&!panel.hidden)refresh()});
state();
try{if(!window.supabase?.createClient)throw Error('Unavailable');client=window.supabase.createClient(endpoint,key);client.auth.onAuthStateChange((event,session)=>{if(event==='PASSWORD_RECOVERY'){recovery=true;panel.hidden=false}if(event==='SIGNED_OUT')recovery=false;accept(session);if(user&&!recovery&&!panel.hidden)setTimeout(refresh,0)}); }catch{say(13);form.hidden=true;cloud.disabled=true}
})();