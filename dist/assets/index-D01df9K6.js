(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();function Ye(t,e){var r={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(r[s[i]]=t[s[i]]);return r}function Ir(t,e,r,s){function i(n){return n instanceof r?n:new r(function(o){o(n)})}return new(r||(r=Promise))(function(n,o){function a(d){try{c(s.next(d))}catch(f){o(f)}}function l(d){try{c(s.throw(d))}catch(f){o(f)}}function c(d){d.done?n(d.value):i(d.value).then(a,l)}c((s=s.apply(t,e||[])).next())})}const Pr=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class $t extends Error{constructor(e,r="FunctionsError",s){super(e),this.name=r,this.context=s}}class Rr extends $t{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Rt extends $t{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class jt extends $t{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var ht;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(ht||(ht={}));class jr{constructor(e,{headers:r={},customFetch:s,region:i=ht.Any}={}){this.url=e,this.headers=r,this.region=i,this.fetch=Pr(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Ir(this,arguments,void 0,function*(r,s={}){var i;let n,o;try{const{headers:a,method:l,body:c,signal:d,timeout:f}=s;let u={},{region:h}=s;h||(h=this.region);const p=new URL(`${this.url}/${r}`);h&&h!=="any"&&(u["x-region"]=h,p.searchParams.set("forceFunctionRegion",h));let g;c&&(a&&!Object.prototype.hasOwnProperty.call(a,"Content-Type")||!a)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(u["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(u["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(u["Content-Type"]="application/json",g=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?g=JSON.stringify(c):g=c;let m=d;f&&(o=new AbortController,n=setTimeout(()=>o.abort(),f),d?(m=o.signal,d.addEventListener("abort",()=>o.abort())):m=o.signal);const v=yield this.fetch(p.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},u),this.headers),a),body:g,signal:m}).catch(T=>{throw new Rr(T)}),w=v.headers.get("x-relay-error");if(w&&w==="true")throw new Rt(v);if(!v.ok)throw new jt(v);let y=((i=v.headers.get("Content-Type"))!==null&&i!==void 0?i:"text/plain").split(";")[0].trim(),b;return y==="application/json"?b=yield v.json():y==="application/octet-stream"||y==="application/pdf"?b=yield v.blob():y==="text/event-stream"?b=v:y==="multipart/form-data"?b=yield v.formData():b=yield v.text(),{data:b,error:null,response:v}}catch(a){return{data:null,error:a,response:a instanceof jt||a instanceof Rt?a.context:void 0}}finally{n&&clearTimeout(n)}})}}var Lr=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}},Ur=class{constructor(t){var e,r,s;this.shouldThrowOnError=!1,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.urlLengthLimit=(s=t.urlLengthLimit)!==null&&s!==void 0?s:8e3,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}then(t,e){var r=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const s=this.fetch;let i=s(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async n=>{let o=null,a=null,l=null,c=n.status,d=n.statusText;if(n.ok){var f,u;if(r.method!=="HEAD"){var h;const v=await n.text();v===""||(r.headers.get("Accept")==="text/csv"||r.headers.get("Accept")&&(!((h=r.headers.get("Accept"))===null||h===void 0)&&h.includes("application/vnd.pgrst.plan+text"))?a=v:a=JSON.parse(v))}const g=(f=r.headers.get("Prefer"))===null||f===void 0?void 0:f.match(/count=(exact|planned|estimated)/),m=(u=n.headers.get("content-range"))===null||u===void 0?void 0:u.split("/");g&&m&&m.length>1&&(l=parseInt(m[1])),r.isMaybeSingle&&r.method==="GET"&&Array.isArray(a)&&(a.length>1?(o={code:"PGRST116",details:`Results contain ${a.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},a=null,l=null,c=406,d="Not Acceptable"):a.length===1?a=a[0]:a=null)}else{var p;const g=await n.text();try{o=JSON.parse(g),Array.isArray(o)&&n.status===404&&(a=[],o=null,c=200,d="OK")}catch{n.status===404&&g===""?(c=204,d="No Content"):o={message:g}}if(o&&r.isMaybeSingle&&(!(o==null||(p=o.details)===null||p===void 0)&&p.includes("0 rows"))&&(o=null,c=200,d="OK"),o&&r.shouldThrowOnError)throw new Lr(o)}return{error:o,data:a,count:l,status:c,statusText:d}});return this.shouldThrowOnError||(i=i.catch(n=>{var o;let a="",l="",c="";const d=n==null?void 0:n.cause;if(d){var f,u,h,p;const v=(f=d==null?void 0:d.message)!==null&&f!==void 0?f:"",w=(u=d==null?void 0:d.code)!==null&&u!==void 0?u:"";a=`${(h=n==null?void 0:n.name)!==null&&h!==void 0?h:"FetchError"}: ${n==null?void 0:n.message}`,a+=`

Caused by: ${(p=d==null?void 0:d.name)!==null&&p!==void 0?p:"Error"}: ${v}`,w&&(a+=` (${w})`),d!=null&&d.stack&&(a+=`
${d.stack}`)}else{var g;a=(g=n==null?void 0:n.stack)!==null&&g!==void 0?g:""}const m=this.url.toString().length;return(n==null?void 0:n.name)==="AbortError"||(n==null?void 0:n.code)==="ABORT_ERR"?(c="",l="Request was aborted (timeout or manual cancellation)",m>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${m} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((d==null?void 0:d.name)==="HeadersOverflowError"||(d==null?void 0:d.code)==="UND_ERR_HEADERS_OVERFLOW")&&(c="",l="HTTP headers exceeded server limits (typically 16KB)",m>this.urlLengthLimit&&(l+=`. Your request URL is ${m} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(o=n==null?void 0:n.name)!==null&&o!==void 0?o:"FetchError"}: ${n==null?void 0:n.message}`,details:a,hint:l,code:c},data:null,count:null,status:0,statusText:""}})),i.then(t,e)}returns(){return this}overrideTypes(){return this}},Dr=class extends Ur{select(t){let e=!1;const r=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:s,referencedTable:i=s}={}){const n=i?`${i}.order`:"order",o=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${o?`${o},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const s=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:s=r}={}){const i=typeof s>"u"?"offset":`${s}.offset`,n=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${t}`),this.url.searchParams.set(n,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:s=!1,wal:i=!1,format:n="text"}={}){var o;const a=[t?"analyze":null,e?"verbose":null,r?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),l=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${n}; for="${l}"; options=${a};`),n==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const Lt=new RegExp("[,()]");var he=class extends Dr{eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Lt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Lt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:s}={}){let i="";s==="plain"?i="pl":s==="phrase"?i="ph":s==="websearch"&&(i="w");const n=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${i}fts${n}.${e}`),this}match(t){return Object.entries(t).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},Br=class{constructor(t,{headers:e={},schema:r,fetch:s,urlLengthLimit:i=8e3}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=s,this.urlLengthLimit=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:s}=e??{},i=r?"HEAD":"GET";let n=!1;const o=(t??"*").split("").map(c=>/\s/.test(c)&&!n?"":(c==='"'&&(n=!n),c)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",o),s&&l.append("Prefer",`count=${s}`),new he({method:i,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(t,{count:e,defaultToNull:r=!0}={}){var s;const i="POST",{url:n,headers:o}=this.cloneRequestState();if(e&&o.append("Prefer",`count=${e}`),r||o.append("Prefer","missing=default"),Array.isArray(t)){const a=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(a.length>0){const l=[...new Set(a)].map(c=>`"${c}"`);n.searchParams.set("columns",l.join(","))}}return new he({method:i,url:n,headers:o,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:s,defaultToNull:i=!0}={}){var n;const o="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&a.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),i||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((d,f)=>d.concat(Object.keys(f)),[]);if(c.length>0){const d=[...new Set(c)].map(f=>`"${f}"`);a.searchParams.set("columns",d.join(","))}}return new he({method:o,url:a,headers:l,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}update(t,{count:e}={}){var r;const s="PATCH",{url:i,headers:n}=this.cloneRequestState();return e&&n.append("Prefer",`count=${e}`),new he({method:s,url:i,headers:n,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:t}={}){var e;const r="DELETE",{url:s,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new he({method:r,url:s,headers:i,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit})}};function Oe(t){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Oe(t)}function Nr(t,e){if(Oe(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Oe(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Fr(t){var e=Nr(t,"string");return Oe(e)=="symbol"?e:e+""}function qr(t,e,r){return(e=Fr(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Ut(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function Fe(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ut(Object(r),!0).forEach(function(s){qr(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ut(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}var Mr=class ur{constructor(e,{headers:r={},schema:s,fetch:i,timeout:n,urlLengthLimit:o=8e3}={}){this.url=e,this.headers=new Headers(r),this.schemaName=s,this.urlLengthLimit=o;const a=i??globalThis.fetch;n!==void 0&&n>0?this.fetch=(l,c)=>{const d=new AbortController,f=setTimeout(()=>d.abort(),n),u=c==null?void 0:c.signal;if(u){if(u.aborted)return clearTimeout(f),a(l,c);const h=()=>{clearTimeout(f),d.abort()};return u.addEventListener("abort",h,{once:!0}),a(l,Fe(Fe({},c),{},{signal:d.signal})).finally(()=>{clearTimeout(f),u.removeEventListener("abort",h)})}return a(l,Fe(Fe({},c),{},{signal:d.signal})).finally(()=>clearTimeout(f))}:this.fetch=a}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Br(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(e){return new ur(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(e,r={},{head:s=!1,get:i=!1,count:n}={}){var o;let a;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(d)),f=s&&Object.values(r).some(d);f?(a="POST",c=r):s||i?(a=s?"HEAD":"GET",Object.entries(r).filter(([h,p])=>p!==void 0).map(([h,p])=>[h,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([h,p])=>{l.searchParams.append(h,p)})):(a="POST",c=r);const u=new Headers(this.headers);return f?u.set("Prefer",n?`count=${n},return=minimal`:"return=minimal"):n&&u.set("Prefer",`count=${n}`),new he({method:a,url:l,headers:u,schema:this.schemaName,body:c,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit})}};class Vr{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const s=r.versions;if(s&&s.node){const i=s.node,n=parseInt(i.replace(/^v/,"").split(".")[0]);return n>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${n} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${n} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static createWebSocket(e,r){const s=this.getWebSocketConstructor();return new s(e,r)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const Hr="2.99.2",Wr=`realtime-js/${Hr}`,Kr="1.0.0",hr="2.0.0",Dt=hr,ft=1e4,Gr=1e3,zr=100;var J;(function(t){t[t.connecting=0]="connecting",t[t.open=1]="open",t[t.closing=2]="closing",t[t.closed=3]="closed"})(J||(J={}));var R;(function(t){t.closed="closed",t.errored="errored",t.joined="joined",t.joining="joining",t.leaving="leaving"})(R||(R={}));var V;(function(t){t.close="phx_close",t.error="phx_error",t.join="phx_join",t.reply="phx_reply",t.leave="phx_leave",t.access_token="access_token"})(V||(V={}));var pt;(function(t){t.websocket="websocket"})(pt||(pt={}));var te;(function(t){t.Connecting="connecting",t.Open="open",t.Closing="closing",t.Closed="closed"})(te||(te={}));class Jr{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,i)}_encodeJsonUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:{},o=new TextEncoder().encode(JSON.stringify(i)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(e,r,s){var i,n;const o=e.topic,a=(i=e.ref)!==null&&i!==void 0?i:"",l=(n=e.join_ref)!==null&&n!==void 0?n:"",c=e.payload.event,d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},f=Object.keys(d).length===0?"":JSON.stringify(d);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`ref length ${a.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(f.length>255)throw new Error(`metadata length ${f.length} exceeds maximum of 255`);const u=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+a.length+o.length+c.length+f.length,h=new ArrayBuffer(this.HEADER_LENGTH+u);let p=new DataView(h),g=0;p.setUint8(g++,this.KINDS.userBroadcastPush),p.setUint8(g++,l.length),p.setUint8(g++,a.length),p.setUint8(g++,o.length),p.setUint8(g++,c.length),p.setUint8(g++,f.length),p.setUint8(g++,r),Array.from(l,v=>p.setUint8(g++,v.charCodeAt(0))),Array.from(a,v=>p.setUint8(g++,v.charCodeAt(0))),Array.from(o,v=>p.setUint8(g++,v.charCodeAt(0))),Array.from(c,v=>p.setUint8(g++,v.charCodeAt(0))),Array.from(f,v=>p.setUint8(g++,v.charCodeAt(0)));var m=new Uint8Array(h.byteLength+s.byteLength);return m.set(new Uint8Array(h),0),m.set(new Uint8Array(s),h.byteLength),m.buffer}decode(e,r){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return r(s)}if(typeof e=="string"){const s=JSON.parse(e),[i,n,o,a,l]=s;return r({join_ref:i,ref:n,topic:o,event:a,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),s=r.getUint8(0),i=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,i)}}_decodeUserBroadcast(e,r,s){const i=r.getUint8(1),n=r.getUint8(2),o=r.getUint8(3),a=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+i));l=l+i;const d=s.decode(e.slice(l,l+n));l=l+n;const f=s.decode(e.slice(l,l+o));l=l+o;const u=e.slice(l,e.byteLength),h=a===this.JSON_ENCODING?JSON.parse(s.decode(u)):u,p={type:this.BROADCAST_EVENT,event:d,payload:h};return o>0&&(p.meta=JSON.parse(f)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>r.includes(s)))}}class fr{constructor(e,r){this.callback=e,this.timerCalc=r,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=r}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var C;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(C||(C={}));const Bt=(t,e,r={})=>{var s;const i=(s=r.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((n,o)=>(n[o]=Yr(o,t,e,i),n),{}):{}},Yr=(t,e,r,s)=>{const i=e.find(a=>a.name===t),n=i==null?void 0:i.type,o=r[t];return n&&!s.includes(n)?pr(n,o):gt(o)},pr=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return es(e,r)}switch(t){case C.bool:return Xr(e);case C.float4:case C.float8:case C.int2:case C.int4:case C.int8:case C.numeric:case C.oid:return Qr(e);case C.json:case C.jsonb:return Zr(e);case C.timestamp:return ts(e);case C.abstime:case C.date:case C.daterange:case C.int4range:case C.int8range:case C.money:case C.reltime:case C.text:case C.time:case C.timestamptz:case C.timetz:case C.tsrange:case C.tstzrange:return gt(e);default:return gt(e)}},gt=t=>t,Xr=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Qr=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},Zr=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},es=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,s=t[r];if(t[0]==="{"&&s==="}"){let n;const o=t.slice(1,r);try{n=JSON.parse("["+o+"]")}catch{n=o?o.split(","):[]}return n.map(a=>pr(e,a))}return t},ts=t=>typeof t=="string"?t.replace(" ","T"):t,gr=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class st{constructor(e,r,s={},i=ft){this.channel=e,this.event=r,this.payload=s,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,r){var s;return this._hasReceived(e)&&r((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:r}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=r=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=r,this._matchReceive(r)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,r){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:r})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:r}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(r))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var Nt;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Nt||(Nt={}));class Ae{constructor(e,r){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(r==null?void 0:r.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},i=>{const{onJoin:n,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Ae.syncState(this.state,i,n,o),this.pendingDiffs.forEach(l=>{this.state=Ae.syncDiff(this.state,l,n,o)}),this.pendingDiffs=[],a()}),this.channel._on(s.diff,{},i=>{const{onJoin:n,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=Ae.syncDiff(this.state,i,n,o),a())}),this.onJoin((i,n,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:n,newPresences:o})}),this.onLeave((i,n,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:n,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,r,s,i){const n=this.cloneDeep(e),o=this.transformState(r),a={},l={};return this.map(n,(c,d)=>{o[c]||(l[c]=d)}),this.map(o,(c,d)=>{const f=n[c];if(f){const u=d.map(m=>m.presence_ref),h=f.map(m=>m.presence_ref),p=d.filter(m=>h.indexOf(m.presence_ref)<0),g=f.filter(m=>u.indexOf(m.presence_ref)<0);p.length>0&&(a[c]=p),g.length>0&&(l[c]=g)}else a[c]=d}),this.syncDiff(n,{joins:a,leaves:l},s,i)}static syncDiff(e,r,s,i){const{joins:n,leaves:o}={joins:this.transformState(r.joins),leaves:this.transformState(r.leaves)};return s||(s=()=>{}),i||(i=()=>{}),this.map(n,(a,l)=>{var c;const d=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),d.length>0){const f=e[a].map(h=>h.presence_ref),u=d.filter(h=>f.indexOf(h.presence_ref)<0);e[a].unshift(...u)}s(a,d,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const d=l.map(f=>f.presence_ref);c=c.filter(f=>d.indexOf(f.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,r){return Object.getOwnPropertyNames(e).map(s=>r(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((r,s)=>{const i=e[s];return"metas"in i?r[s]=i.metas.map(n=>(n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n)):r[s]=i,r},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Ft;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Ft||(Ft={}));var Ce;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(Ce||(Ce={}));var G;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(G||(G={}));class ge{constructor(e,r={config:{}},s){var i,n;if(this.topic=e,this.params=r,this.socket=s,this.bindings={},this.state=R.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.timeout=this.socket.timeout,this.joinPush=new st(this,V.join,this.params,this.timeout),this.rejoinTimer=new fr(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=R.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(o=>o.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=R.closed,this.socket._remove(this)}),this._onError(o=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,o),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",o=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,o),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this._on(V.reply,{},(o,a)=>{this._trigger(this._replyEventName(a),o)}),this.presence=new Ae(this),this.broadcastEndpointURL=gr(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((n=(i=this.params.config)===null||i===void 0?void 0:i.broadcast)===null||n===void 0)&&n.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,r=this.timeout){var s,i,n;if(this.socket.isConnected()||this.socket.connect(),this.state==R.closed){const{config:{broadcast:o,presence:a,private:l}}=this.params,c=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&i!==void 0?i:[],d=!!this.bindings[Ce.PRESENCE]&&this.bindings[Ce.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,f={},u={broadcast:o,presence:Object.assign(Object.assign({},a),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(f.access_token=this.socket.accessTokenValue),this._onError(h=>e==null?void 0:e(G.CHANNEL_ERROR,h)),this._onClose(()=>e==null?void 0:e(G.CLOSED)),this.updateJoinPayload(Object.assign({config:u},f)),this.joinedOnce=!0,this._rejoin(r),this.joinPush.receive("ok",async({postgres_changes:h})=>{var p;if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(G.SUBSCRIBED);return}else{const g=this.bindings.postgres_changes,m=(p=g==null?void 0:g.length)!==null&&p!==void 0?p:0,v=[];for(let w=0;w<m;w++){const y=g[w],{filter:{event:b,schema:T,table:x,filter:$}}=y,O=h&&h[w];if(O&&O.event===b&&ge.isFilterValueEqual(O.schema,T)&&ge.isFilterValueEqual(O.table,x)&&ge.isFilterValueEqual(O.filter,$))v.push(Object.assign(Object.assign({},y),{id:O.id}));else{this.unsubscribe(),this.state=R.errored,e==null||e(G.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=v,e&&e(G.SUBSCRIBED);return}}).receive("error",h=>{this.state=R.errored,e==null||e(G.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(G.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,s){return this.state===R.joined&&e===Ce.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(e,r,s)}async httpSend(e,r,s={}){var i;if(r==null)return Promise.reject("Payload is required for httpSend()");const n={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(n.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o={method:"POST",headers:n,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:r,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(i=s.timeout)!==null&&i!==void 0?i:this.timeout);if(a.status===202)return{success:!0};let l=a.statusText;try{const c=await a.json();l=c.error||c.message||l}catch{}return Promise.reject(new Error(l))}async send(e,r={}){var s,i;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:o}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var o,a,l;const c=this._push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=R.leaving;const r=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(V.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(i=>{s=new st(this,V.leave,{},e),s.receive("ok",()=>{r(),i("ok")}).receive("timeout",()=>{r(),i("timed out")}).receive("error",()=>{i("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=R.closed,this.bindings={}}async _fetchWithTimeout(e,r,s){const i=new AbortController,n=setTimeout(()=>i.abort(),s),o=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:i.signal}));return clearTimeout(n),o}_push(e,r,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new st(this,e,r,s);return this._canPush()?i.send():this._addToPushBuffer(i),i}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>zr){const r=this.pushBuffer.shift();r&&(r.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${r.event}`,r.payload))}}_onMessage(e,r,s){return r}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,r,s){var i,n;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:d}=V;if(s&&[a,l,c,d].indexOf(o)>=0&&s!==this._joinRef())return;let u=this._onMessage(o,r,s);if(r&&!u)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(h=>{var p,g,m;return((p=h.filter)===null||p===void 0?void 0:p.event)==="*"||((m=(g=h.filter)===null||g===void 0?void 0:g.event)===null||m===void 0?void 0:m.toLocaleLowerCase())===o}).map(h=>h.callback(u,s)):(n=this.bindings[o])===null||n===void 0||n.filter(h=>{var p,g,m,v,w,y;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in h){const b=h.id,T=(p=h.filter)===null||p===void 0?void 0:p.event;return b&&((g=r.ids)===null||g===void 0?void 0:g.includes(b))&&(T==="*"||(T==null?void 0:T.toLocaleLowerCase())===((m=r.data)===null||m===void 0?void 0:m.type.toLocaleLowerCase()))}else{const b=(w=(v=h==null?void 0:h.filter)===null||v===void 0?void 0:v.event)===null||w===void 0?void 0:w.toLocaleLowerCase();return b==="*"||b===((y=r==null?void 0:r.event)===null||y===void 0?void 0:y.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===o}).map(h=>{if(typeof u=="object"&&"ids"in u){const p=u.data,{schema:g,table:m,commit_timestamp:v,type:w,errors:y}=p;u=Object.assign(Object.assign({},{schema:g,table:m,commit_timestamp:v,eventType:w,new:{},old:{},errors:y}),this._getPayloadRecords(p))}h.callback(u,s)})}_isClosed(){return this.state===R.closed}_isJoined(){return this.state===R.joined}_isJoining(){return this.state===R.joining}_isLeaving(){return this.state===R.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,r,s){const i=e.toLocaleLowerCase(),n={type:i,filter:r,callback:s};return this.bindings[i]?this.bindings[i].push(n):this.bindings[i]=[n],this}_off(e,r){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(i=>{var n;return!(((n=i.type)===null||n===void 0?void 0:n.toLocaleLowerCase())===s&&ge.isEqual(i.filter,r))})),this}static isEqual(e,r){if(Object.keys(e).length!==Object.keys(r).length)return!1;for(const s in e)if(e[s]!==r[s])return!1;return!0}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(V.close,{},e)}_onError(e){this._on(V.error,{},r=>e(r))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=R.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=Bt(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=Bt(e.columns,e.old_record)),r}}const it=()=>{},qe={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},rs=[1e3,2e3,5e3,1e4],ss=1e4,is=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class ns{constructor(e,r){var s;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=ft,this.transport=null,this.heartbeatIntervalMs=qe.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=it,this.ref=0,this.reconnectTimer=null,this.vsn=Dt,this.logger=it,this.conn=null,this.sendBuffer=[],this.serializer=new Jr,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=i=>i?(...n)=>i(...n):(...n)=>fetch(...n),!(!((s=r==null?void 0:r.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey,this.endPoint=`${e}/${pt.websocket}`,this.httpEndpoint=gr(e),this._initializeOptions(r),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=Vr.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const r=e.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,r){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,r??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const e=await Promise.all(this.channels.map(r=>r.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,r,s){this.logger(e,r,s)}connectionState(){switch(this.conn&&this.conn.readyState){case J.connecting:return te.Connecting;case J.open:return te.Open;case J.closing:return te.Closing;default:return te.Closed}}isConnected(){return this.connectionState()===te.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,r={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(n=>n.topic===s);if(i)return i;{const n=new ge(`realtime:${e}`,r,this);return this.channels.push(n),n}}push(e){const{topic:r,event:s,payload:i,ref:n}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${r} ${s} (${n})`,i),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Gr,"heartbeat timeout"),setTimeout(()=>{var r;this.isConnected()||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout()},qe.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let r=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));r&&(this.log("transport",`leaving duplicate topic "${e}"`),r.unsubscribe())}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,r=>{if(r.topic==="phoenix"&&r.event==="phx_reply"&&r.ref&&r.ref===this.pendingHeartbeatRef){const c=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(r.payload.status==="ok"?"ok":"error",c)}catch(d){this.log("error","error in heartbeat callback",d)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:s,event:i,payload:n,ref:o}=r,a=o?`(${o})`:"",l=n.status||"";this.log("receive",`${l} ${s} ${i} ${a}`.trim(),n),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(i,n,o)),this._triggerStateCallbacks("message",r)})}_clearTimer(e){var r;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((r=this.reconnectTimer)===null||r===void 0||r.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e),this.conn.readyState===J.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===J.open||this.conn.readyState===J.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.accessTokenValue&&(this.channels.forEach(r=>{r.updateJoinPayload({access_token:this.accessTokenValue})}),this.sendBuffer=[],this.channels.forEach(r=>{r._isJoining()&&(r.joinPush.sent=!1,r.joinPush.send())})),this.flushSendBuffer()}).catch(r=>{this.log("error","error waiting for auth on connect",r),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(e){var r;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e);try{this.heartbeatCallback("error")}catch(r){this.log("error","error in heartbeat callback",r)}}_triggerChanError(){this.channels.forEach(e=>e._trigger(V.error))}_appendParams(e,r){if(Object.keys(r).length===0)return e;const s=e.match(/\?/)?"&":"?",i=new URLSearchParams(r);return`${e}${s}${i}`}_workerObjectUrl(e){let r;if(e)r=e;else{const s=new Blob([is],{type:"application/javascript"});r=URL.createObjectURL(s)}return r}_setConnectionState(e,r=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=r)}async _performAuth(e=null){let r,s=!1;if(e)r=e,s=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(i){this.log("error","Error fetching access token from callback",i),r=this.accessTokenValue}else r=this.accessTokenValue;s?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(i=>{const n={access_token:r,version:Wr};r&&i.updateJoinPayload(n),i.joinedOnce&&i._isJoined()&&i._push(V.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_triggerStateCallbacks(e,r){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(r)}catch(i){this.log("error",`error in ${e} callback`,i)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new fr(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},qe.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var r,s,i,n,o,a,l,c,d,f,u,h;switch(this.transport=(r=e==null?void 0:e.transport)!==null&&r!==void 0?r:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:ft,this.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:qe.HEARTBEAT_INTERVAL,this.worker=(n=e==null?void 0:e.worker)!==null&&n!==void 0?n:!1,this.accessToken=(o=e==null?void 0:e.accessToken)!==null&&o!==void 0?o:null,this.heartbeatCallback=(a=e==null?void 0:e.heartbeatCallback)!==null&&a!==void 0?a:it,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:Dt,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(c=e==null?void 0:e.reconnectAfterMs)!==null&&c!==void 0?c:p=>rs[p-1]||ss,this.vsn){case Kr:this.encode=(d=e==null?void 0:e.encode)!==null&&d!==void 0?d:(p,g)=>g(JSON.stringify(p)),this.decode=(f=e==null?void 0:e.decode)!==null&&f!==void 0?f:(p,g)=>g(JSON.parse(p));break;case hr:this.encode=(u=e==null?void 0:e.encode)!==null&&u!==void 0?u:this.serializer.encode.bind(this.serializer),this.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}var Ie=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function os(t,e,r){const s=new URL(e,t);if(r)for(const[i,n]of Object.entries(r))n!==void 0&&s.searchParams.set(i,n);return s.toString()}async function as(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function ls(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:i,body:n,headers:o}){const a=os(t.baseUrl,s,i),l=await as(t.auth),c=await e(a,{method:r,headers:{...n?{"Content-Type":"application/json"}:{},...l,...o},body:n?JSON.stringify(n):void 0}),d=await c.text(),f=(c.headers.get("content-type")||"").includes("application/json"),u=f&&d?JSON.parse(d):d;if(!c.ok){const h=f?u:void 0,p=h==null?void 0:h.error;throw new Ie((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:h})}return{status:c.status,headers:c.headers,data:u}}}}function Me(t){return t.join("")}var cs=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:Me(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Me(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Me(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Me(t.namespace)}`}),!0}catch(e){if(e instanceof Ie&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof Ie&&r.status===409)return;throw r}}};function oe(t){return t.join("")}var ds=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${oe(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof Ie&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof Ie&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},us=class{constructor(t){var s;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=ls({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(s=t.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new cs(this.client,e),this.tableOps=new ds(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}},Xe=class extends Error{constructor(t,e="storage",r,s){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}};function Qe(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Se=class extends Xe{constructor(t,e,r,s="storage"){super(t,s,e,r),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},mr=class extends Xe{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const hs=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),fs=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},mt=t=>{if(Array.isArray(t))return t.map(r=>mt(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,s])=>{const i=r.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[i]=mt(s)}),e},ps=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t);function Pe(t){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pe(t)}function gs(t,e){if(Pe(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Pe(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ms(t){var e=gs(t,"string");return Pe(e)=="symbol"?e:e+""}function vs(t,e,r){return(e=ms(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function qt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?qt(Object(r),!0).forEach(function(s){vs(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):qt(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}const Mt=t=>{var e;return t.msg||t.message||t.error_description||(typeof t.error=="string"?t.error:(e=t.error)===null||e===void 0?void 0:e.message)||JSON.stringify(t)},ys=async(t,e,r,s)=>{if(t&&typeof t=="object"&&"status"in t&&"ok"in t&&typeof t.status=="number"){const i=t,n=i.status||500;if(typeof i.json=="function")i.json().then(o=>{const a=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||n+"";e(new Se(Mt(o),n,a,s))}).catch(()=>{if(s==="vectors"){const o=n+"";e(new Se(i.statusText||`HTTP ${n} error`,n,o,s))}else{const o=n+"";e(new Se(i.statusText||`HTTP ${n} error`,n,o,s))}});else{const o=n+"";e(new Se(i.statusText||`HTTP ${n} error`,n,o,s))}}else e(new mr(Mt(t),t,s))},bs=(t,e,r,s)=>{const i={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"||t==="HEAD"||!s?k(k({},i),r):(fs(s)?(i.headers=k({"Content-Type":"application/json"},e==null?void 0:e.headers),i.body=JSON.stringify(s)):i.body=s,e!=null&&e.duplex&&(i.duplex=e.duplex),k(k({},i),r))};async function xe(t,e,r,s,i,n,o){return new Promise((a,l)=>{t(r,bs(e,s,i,n)).then(c=>{if(!c.ok)throw c;if(s!=null&&s.noResolveJson)return c;if(o==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>a(c)).catch(c=>ys(c,l,s,o))})}function vr(t="storage"){return{get:async(e,r,s,i)=>xe(e,"GET",r,s,i,void 0,t),post:async(e,r,s,i,n)=>xe(e,"POST",r,i,n,s,t),put:async(e,r,s,i,n)=>xe(e,"PUT",r,i,n,s,t),head:async(e,r,s,i)=>xe(e,"HEAD",r,k(k({},s),{},{noResolveJson:!0}),i,void 0,t),remove:async(e,r,s,i,n)=>xe(e,"DELETE",r,i,n,s,t)}}const ws=vr("storage"),{get:Re,post:M,put:vt,head:_s,remove:Tt}=ws,N=vr("vectors");var _e=class{constructor(t,e={},r,s="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=e,this.fetch=hs(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=k(k({},this.headers),{},{[t]:e}),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(Qe(r))return{data:null,error:r};throw r}}},xs=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e}then(t,e){return this.execute().then(t,e)}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Qe(e))return{data:null,error:e};throw e}}};let yr;yr=Symbol.toStringTag;var Es=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[yr]="BlobDownloadBuilder",this.promise=null}asStream(){return new xs(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Qe(e))return{data:null,error:e};throw e}}};const ks={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Vt={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Ss=class extends _e{constructor(t,e={},r,s){super(t,e,s,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,s){var i=this;return i.handleOperation(async()=>{let n;const o=k(k({},Vt),s);let a=k(k({},i.headers),t==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;typeof Blob<"u"&&r instanceof Blob?(n=new FormData,n.append("cacheControl",o.cacheControl),l&&n.append("metadata",i.encodeMetadata(l)),n.append("",r)):typeof FormData<"u"&&r instanceof FormData?(n=r,n.has("cacheControl")||n.append("cacheControl",o.cacheControl),l&&!n.has("metadata")&&n.append("metadata",i.encodeMetadata(l))):(n=r,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=i.toBase64(i.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!o.duplex&&(o.duplex="half")),s!=null&&s.headers&&(a=k(k({},a),s.headers));const c=i._removeEmptyFolders(e),d=i._getFinalPath(c),f=await(t=="PUT"?vt:M)(i.fetch,`${i.url}/object/${d}`,n,k({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{path:c,id:f.Id,fullPath:f.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,s){var i=this;const n=i._removeEmptyFolders(t),o=i._getFinalPath(n),a=new URL(i.url+`/object/upload/sign/${o}`);return a.searchParams.set("token",e),i.handleOperation(async()=>{let l;const c=k({upsert:Vt.upsert},s),d=k(k({},i.headers),{"x-upsert":String(c.upsert)});return typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",c.cacheControl)):(l=r,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType),{path:n,fullPath:(await vt(i.fetch,a.toString(),l,{headers:d})).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(t);const i=k({},r.headers);e!=null&&e.upsert&&(i["x-upsert"]="true");const n=await M(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:i}),o=new URL(r.url+n.url),a=o.searchParams.get("token");if(!a)throw new Xe("No token returned by API");return{signedUrl:o.toString(),path:t,token:a}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var s=this;return s.handleOperation(async()=>await M(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers}))}async copy(t,e,r){var s=this;return s.handleOperation(async()=>({path:(await M(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(t,e,r){var s=this;return s.handleOperation(async()=>{let i=s._getFinalPath(t);const n=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let o=await M(s.fetch,`${s.url}/object/sign/${i}`,k({expiresIn:e},n?{transform:r.transform}:{}),{headers:s.headers});const a=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"",l=n&&o.signedURL.includes("/object/sign/")?o.signedURL.replace("/object/sign/","/render/image/sign/"):o.signedURL;return{signedUrl:encodeURI(`${s.url}${l}${a}`)}})}async createSignedUrls(t,e,r){var s=this;return s.handleOperation(async()=>{const i=await M(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:t},{headers:s.headers}),n=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return i.map(o=>k(k({},o),{},{signedUrl:o.signedURL?encodeURI(`${s.url}${o.signedURL}${n}`):null}))})}download(t,e,r){const s=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",i=this.transformOptsToQueryString((e==null?void 0:e.transform)||{}),n=i?`?${i}`:"",o=this._getFinalPath(t),a=()=>Re(this.fetch,`${this.url}/${s}/${o}${n}`,{headers:this.headers,noResolveJson:!0},r);return new Es(a,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>mt(await Re(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await _s(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(i){if(e.shouldThrowOnError)throw i;if(Qe(i)){var s;const n=i instanceof Se?i.status:i instanceof mr?(s=i.originalError)===null||s===void 0?void 0:s.status:void 0;if(n!==void 0&&[400,404].includes(n))return{data:!1,error:i}}throw i}}getPublicUrl(t,e){const r=this._getFinalPath(t),s=[],i=e!=null&&e.download?`download=${e.download===!0?"":e.download}`:"";i!==""&&s.push(i);const n=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object",o=this.transformOptsToQueryString((e==null?void 0:e.transform)||{});o!==""&&s.push(o);let a=s.join("&");return a!==""&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${r}${a}`)}}}async remove(t){var e=this;return e.handleOperation(async()=>await Tt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async list(t,e,r){var s=this;return s.handleOperation(async()=>{const i=k(k(k({},ks),e),{},{prefix:t||""});return await M(s.fetch,`${s.url}/object/list/${s.bucketId}`,i,{headers:s.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const s=k({},t);return await M(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(t){const e=[];return t.width&&e.push(`width=${t.width}`),t.height&&e.push(`height=${t.height}`),t.resize&&e.push(`resize=${t.resize}`),t.format&&e.push(`format=${t.format}`),t.quality&&e.push(`quality=${t.quality}`),e.join("&")}};const $s="2.99.2",Ne={"X-Client-Info":`storage-js/${$s}`};var Ts=class extends _e{constructor(t,e={},r,s){const i=new URL(t);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase."));const n=i.href.replace(/\/$/,""),o=k(k({},Ne),e);super(n,o,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await Re(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await Re(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await M(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await vt(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await M(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Tt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},As=class extends _e{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Ne),e);super(s,i,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await M(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const s=r.toString(),i=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await Re(e.fetch,i,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Tt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!ps(t))throw new Xe("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new us({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(i,n){const o=i[n];return typeof o!="function"?o:async(...a)=>{try{return{data:await o.apply(i,a),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},Cs=class extends _e{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Ne),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await N.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await N.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},Os=class extends _e{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Ne),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Is=class extends _e{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},Ne),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await N.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},Ps=class extends Is{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new Rs(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},Rs=class extends Cs{constructor(t,e,r,s){super(t,e,s),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new js(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},js=class extends Os{constructor(t,e,r,s,i){super(t,e,i),this.vectorBucketName=r,this.indexName=s}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},Ls=class extends Ts{constructor(t,e={},r,s){super(t,e,r,s)}from(t){return new Ss(this.url,this.headers,t,this.fetch)}get vectors(){return new Ps(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new As(this.url+"/iceberg",this.headers,this.fetch)}};const br="2.99.2",fe=30*1e3,yt=3,nt=yt*fe,Us="http://localhost:9999",Ds="supabase.auth.token",Bs={"X-Client-Info":`gotrue-js/${br}`},bt="X-Supabase-Api-Version",wr={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Ns=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Fs=10*60*1e3;class je extends Error{constructor(e,r,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=s}}function _(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class qs extends je{constructor(e,r,s){super(e,r,s),this.name="AuthApiError",this.status=r,this.code=s}}function Ms(t){return _(t)&&t.name==="AuthApiError"}class re extends je{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class z extends je{constructor(e,r,s,i){super(e,s,i),this.name=r,this.status=s}}class D extends z{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function ot(t){return _(t)&&t.name==="AuthSessionMissingError"}class ae extends z{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ve extends z{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class He extends z{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Vs(t){return _(t)&&t.name==="AuthImplicitGrantRedirectError"}class Ht extends z{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Hs extends z{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class wt extends z{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function at(t){return _(t)&&t.name==="AuthRetryableFetchError"}class Wt extends z{constructor(e,r,s){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=s}}class _t extends z{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Ge="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Kt=` 	
\r=`.split(""),Ws=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Kt.length;e+=1)t[Kt[e].charCodeAt(0)]=-2;for(let e=0;e<Ge.length;e+=1)t[Ge[e].charCodeAt(0)]=e;return t})();function Gt(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(Ge[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(Ge[s]),e.queuedBits-=6}}function _r(t,e,r){const s=Ws[t];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function zt(t){const e=[],r=o=>{e.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},n=o=>{zs(o,s,r)};for(let o=0;o<t.length;o+=1)_r(t.charCodeAt(o),i,n);return e.join("")}function Ks(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function Gs(t,e){for(let r=0;r<t.length;r+=1){let s=t.charCodeAt(r);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(t.charCodeAt(r+1)-56320&65535|i)+65536,r+=1}Ks(s,e)}}function zs(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let s=1;s<6;s+=1)if(!(t>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function me(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<t.length;i+=1)_r(t.charCodeAt(i),r,s);return new Uint8Array(e)}function Js(t){const e=[];return Gs(t,r=>e.push(r)),new Uint8Array(e)}function se(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};return t.forEach(i=>Gt(i,r,s)),Gt(null,r,s),e.join("")}function Ys(t){return Math.round(Date.now()/1e3)+t}function Xs(){return Symbol("auth-callback")}const L=()=>typeof window<"u"&&typeof document<"u",X={tested:!1,writable:!1},xr=()=>{if(!L())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(X.tested)return X.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),X.tested=!0,X.writable=!0}catch{X.tested=!0,X.writable=!1}return X.writable};function Qs(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((i,n)=>{e[n]=i})}catch{}return r.searchParams.forEach((s,i)=>{e[i]=s}),e}const Er=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Zs=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",pe=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},Q=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return r}},j=async(t,e)=>{await t.removeItem(e)};class Ze{constructor(){this.promise=new Ze.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}Ze.promiseConstructor=Promise;function We(t){const e=t.split(".");if(e.length!==3)throw new _t("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!Ns.test(e[s]))throw new _t("JWT not in base64url format");return{header:JSON.parse(zt(e[0])),payload:JSON.parse(zt(e[1])),signature:me(e[2]),raw:{header:e[0],payload:e[1]}}}async function ei(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function ti(t,e){return new Promise((s,i)=>{(async()=>{for(let n=0;n<1/0;n++)try{const o=await t(n);if(!e(n,null,o)){s(o);return}}catch(o){if(!e(n,o)){i(o);return}}})()})}function ri(t){return("0"+t.toString(16)).substr(-2)}function si(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=r.length;let i="";for(let n=0;n<56;n++)i+=r.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,ri).join("")}async function ii(t){const r=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",r),i=new Uint8Array(s);return Array.from(i).map(n=>String.fromCharCode(n)).join("")}async function ni(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await ii(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function le(t,e,r=!1){const s=si();let i=s;r&&(i+="/PASSWORD_RECOVERY"),await pe(t,`${e}-code-verifier`,i);const n=await ni(s);return[n,s===n?"plain":"s256"]}const oi=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function ai(t){const e=t.headers.get(bt);if(!e||!e.match(oi))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function li(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function ci(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const di=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function ce(t){if(!di.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function lt(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const s=r.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ui(t,e){return new Proxy(t,{get:(r,s,i)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const n=s.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,s,i)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,s,i)}})}function Jt(t){return JSON.parse(JSON.stringify(t))}const Z=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),hi=[502,503,504];async function Yt(t){var e;if(!Zs(t))throw new wt(Z(t),0);if(hi.includes(t.status))throw new wt(Z(t),t.status);let r;try{r=await t.json()}catch(n){throw new re(Z(n),n)}let s;const i=ai(t);if(i&&i.getTime()>=wr["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?s=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(s=r.error_code),s){if(s==="weak_password")throw new Wt(Z(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new D}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((n,o)=>n&&typeof o=="string",!0))throw new Wt(Z(r),t.status,r.weak_password.reasons);throw new qs(Z(r),t.status||500,s)}const fi=(t,e,r,s)=>{const i={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),r))};async function E(t,e,r,s){var i;const n=Object.assign({},s==null?void 0:s.headers);n[bt]||(n[bt]=wr["2024-01-01"].name),s!=null&&s.jwt&&(n.Authorization=`Bearer ${s.jwt}`);const o=(i=s==null?void 0:s.query)!==null&&i!==void 0?i:{};s!=null&&s.redirectTo&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await pi(t,e,r+a,{headers:n,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function pi(t,e,r,s,i,n){const o=fi(e,s,i,n);let a;try{a=await t(r,Object.assign({},o))}catch(l){throw console.error(l),new wt(Z(l),0)}if(a.ok||await Yt(a),s!=null&&s.noResolveJson)return a;try{return await a.json()}catch(l){await Yt(l)}}function q(t){var e;let r=null;vi(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=Ys(t.expires_in)));const s=(e=t.user)!==null&&e!==void 0?e:t;return{data:{session:r,user:s},error:null}}function Xt(t){const e=q(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,s)=>r&&typeof s=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Y(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function gi(t){return{data:t,error:null}}function mi(t){const{action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n}=t,o=Ye(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Qt(t){return t}function vi(t){return t.access_token&&t.refresh_token&&t.expires_in}const ct=["global","local","others"];class yi{constructor({url:e="",headers:r={},fetch:s}){this.url=e,this.headers=r,this.fetch=Er(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,r=ct[0]){if(ct.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ct.join(", ")}`);try{return await E(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,r={}){try{return await E(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:Y})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:r}=e,s=Ye(e,["options"]),i=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(i.new_email=s==null?void 0:s.newEmail,delete i.newEmail),await E(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:mi,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(_(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await E(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Y})}catch(r){if(_(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,s,i,n,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},d=await E(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:Qt});if(d.error)throw d.error;const f=await d.json(),u=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,h=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=g}),c.total=parseInt(u)),{data:Object.assign(Object.assign({},f),c),error:null}}catch(c){if(_(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ce(e);try{return await E(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Y})}catch(r){if(_(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){ce(e);try{return await E(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:Y})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,r=!1){ce(e);try{return await E(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:Y})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){ce(e.userId);try{const{data:r,error:s}=await E(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:r,error:s}}catch(r){if(_(r))return{data:null,error:r};throw r}}async _deleteFactor(e){ce(e.userId),ce(e.id);try{return{data:await E(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(_(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,s,i,n,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},d=await E(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:Qt});if(d.error)throw d.error;const f=await d.json(),u=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,h=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=g}),c.total=parseInt(u)),{data:Object.assign(Object.assign({},f),c),error:null}}catch(c){if(_(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await E(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await E(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(_(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await E(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:s=>{var i;return{data:{providers:(i=s==null?void 0:s.providers)!==null&&i!==void 0?i:[]},error:null}}})}catch(r){if(_(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await E(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await E(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await E(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(_(r))return{data:null,error:r};throw r}}}function Zt(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}const K={debug:!!(globalThis&&xr()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class kr extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class bi extends kr{}async function wi(t,e,r){K.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",t,e);const s=new globalThis.AbortController;e>0&&setTimeout(()=>{s.abort(),K.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",t)},e),await Promise.resolve();try{return await globalThis.navigator.locks.request(t,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){K.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",t,i.name);try{return await r()}finally{K.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",t,i.name)}}else{if(e===0)throw K.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",t),new bi(`Acquiring an exclusive Navigator LockManager lock "${t}" immediately failed`);if(K.debug)try{const n=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(n,null,"  "))}catch(n){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",n)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await r()}})}catch(i){if((i==null?void 0:i.name)==="AbortError"&&e>0)return K.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",t),console.warn(`@supabase/gotrue-js: Lock "${t}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(t,{mode:"exclusive",steal:!0},async n=>{if(n){K.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",t,n.name);try{return await r()}finally{K.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",t,n.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r()}));throw i}}function _i(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Sr(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function xi(t){return parseInt(t,16)}function Ei(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function ki(t){var e;const{chainId:r,domain:s,expirationTime:i,issuedAt:n=new Date,nonce:o,notBefore:a,requestId:l,resources:c,scheme:d,uri:f,version:u}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!f)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(u!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${u}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const h=Sr(t.address),p=d?`${d}://${s}`:s,g=t.statement?`${t.statement}
`:"",m=`${p} wants you to sign in with your Ethereum account:
${h}

${g}`;let v=`URI: ${f}
Version: ${u}
Chain ID: ${r}${o?`
Nonce: ${o}`:""}
Issued At: ${n.toISOString()}`;if(i&&(v+=`
Expiration Time: ${i.toISOString()}`),a&&(v+=`
Not Before: ${a.toISOString()}`),l&&(v+=`
Request ID: ${l}`),c){let w=`
Resources:`;for(const y of c){if(!y||typeof y!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);w+=`
- ${y}`}v+=w}return`${m}
${v}`}class P extends Error{constructor({message:e,code:r,cause:s,name:i}){var n;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(n=i??(s instanceof Error?s.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=r}}class ze extends P{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function Si({error:t,options:e}){var r,s,i;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new P({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=n.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new P({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new P({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((i=n.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new P({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new P({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new P({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return n.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new P({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new P({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const o=window.location.hostname;if($r(o)){if(n.rp.id!==o)return new P({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new P({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new P({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new P({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new P({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function $i({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new P({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new P({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const s=window.location.hostname;if($r(s)){if(r.rpId!==s)return new P({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new P({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new P({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new P({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Ti{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Ai=new Ti;function Ci(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:s}=t,i=Ye(t,["challenge","user","excludeCredentials"]),n=me(e).buffer,o=Object.assign(Object.assign({},r),{id:me(r.id).buffer}),a=Object.assign(Object.assign({},i),{challenge:n,user:o});if(s&&s.length>0){a.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];a.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:me(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return a}function Oi(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,s=Ye(t,["challenge","allowCredentials"]),i=me(e).buffer,n=Object.assign(Object.assign({},s),{challenge:i});if(r&&r.length>0){n.allowCredentials=new Array(r.length);for(let o=0;o<r.length;o++){const a=r[o];n.allowCredentials[o]=Object.assign(Object.assign({},a),{id:me(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return n}function Ii(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:se(new Uint8Array(t.response.attestationObject)),clientDataJSON:se(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Pi(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,s=t.getClientExtensionResults(),i=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:se(new Uint8Array(i.authenticatorData)),clientDataJSON:se(new Uint8Array(i.clientDataJSON)),signature:se(new Uint8Array(i.signature)),userHandle:i.userHandle?se(new Uint8Array(i.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function $r(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function er(){var t,e;return!!(L()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Ri(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ze("Browser returned unexpected credential type",e)}:{data:null,error:new ze("Empty credential response",e)}}catch(e){return{data:null,error:Si({error:e,options:t})}}}async function ji(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new ze("Browser returned unexpected credential type",e)}:{data:null,error:new ze("Empty credential response",e)}}catch(e){return{data:null,error:$i({error:e,options:t})}}}const Li={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Ui={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Je(...t){const e=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),r=i=>i instanceof ArrayBuffer||ArrayBuffer.isView(i),s={};for(const i of t)if(i)for(const n in i){const o=i[n];if(o!==void 0)if(Array.isArray(o))s[n]=o;else if(r(o))s[n]=o;else if(e(o)){const a=s[n];e(a)?s[n]=Je(a,o):s[n]=Je(o)}else s[n]=o}return s}function Di(t,e){return Je(Li,t,e||{})}function Bi(t,e){return Je(Ui,t,e||{})}class Ni{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:s,signal:i},n){var o;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!a)return{data:null,error:l};const c=i??Ai.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:d}=a.webauthn.credential_options.publicKey;if(!d.name){const f=s;if(f)d.name=`${d.id}:${f}`;else{const h=(await this.client.getUser()).data.user,p=((o=h==null?void 0:h.user_metadata)===null||o===void 0?void 0:o.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";d.name=`${d.id}:${p}`}}d.displayName||(d.displayName=d.name)}switch(a.webauthn.type){case"create":{const d=Di(a.webauthn.credential_options.publicKey,n==null?void 0:n.create),{data:f,error:u}=await Ri({publicKey:d,signal:c});return f?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:f}},error:null}:{data:null,error:u}}case"request":{const d=Bi(a.webauthn.credential_options.publicKey,n==null?void 0:n.request),{data:f,error:u}=await ji(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:d,signal:c}));return f?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:f}},error:null}:{data:null,error:u}}}}catch(a){return _(a)?{data:null,error:a}:{data:null,error:new re("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:r,webauthn:s}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new je("rpId is required for WebAuthn authentication")};try{if(!er())return{data:null,error:new re("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:s},signal:i},{request:n});if(!o)return{data:null,error:a};const{webauthn:l}=o;return this._verify({factorId:e,challengeId:o.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:s,credential_response:l.credential_response}})}catch(o){return _(o)?{data:null,error:o}:{data:null,error:new re("Unexpected error in authenticate",o)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new je("rpId is required for WebAuthn registration")};try{if(!er())return{data:null,error:new re("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this._enroll({friendlyName:e});if(!o)return await this.client.mfa.listFactors().then(d=>{var f;return(f=d.data)===null||f===void 0?void 0:f.all.find(u=>u.factor_type==="webauthn"&&u.friendly_name===e&&u.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:a};const{data:l,error:c}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:r,rpOrigins:s},signal:i},{create:n});return l?this._verify({factorId:o.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(o){return _(o)?{data:null,error:o}:{data:null,error:new re("Unexpected error in register",o)}}}}_i();const Fi={url:Us,storageKey:Ds,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Bs,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function tr(t,e,r){return await r()}const de={};class Le{get jwks(){var e,r;return(r=(e=de[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){de[this.storageKey]=Object.assign(Object.assign({},de[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=de[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){de[this.storageKey]=Object.assign(Object.assign({},de[this.storageKey]),{cachedAt:e})}constructor(e){var r,s,i;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},Fi),e);if(this.storageKey=n.storageKey,this.instanceID=(r=Le.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Le.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&L()){const o=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(o),this.logDebugMessages&&console.trace(o)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.admin=new yi({url:n.url,headers:n.headers,fetch:n.fetch}),this.url=n.url,this.headers=n.headers,this.fetch=Er(n.fetch),this.lock=n.lock||tr,this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,this.lockAcquireTimeout=n.lockAcquireTimeout,n.lock?this.lock=n.lock:this.persistSession&&L()&&(!((s=globalThis==null?void 0:globalThis.navigator)===null||s===void 0)&&s.locks)?this.lock=wi:this.lock=tr,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Ni(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:xr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Zt(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=Zt(this.memoryStorage)),L()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(o){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",o)}(i=this.broadcastChannel)===null||i===void 0||i.addEventListener("message",async o=>{this._debug("received broadcast notification from other tab or client",o);try{await this._notifyAllSubscribers(o.data.event,o.data.session,!1)}catch(a){this._debug("#broadcastChannel","error",a)}})}n.skipAutoInitialize||this.initialize().catch(o=>{this._debug("#initialize()","error",o)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${br}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let r={},s="none";if(L()&&(r=Qs(window.location.href),this._isImplicitGrantCallback(r)?s="implicit":await this._isPKCECallback(r)&&(s="pkce")),L()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:n}=await this._getSessionFromURL(r,s);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Vs(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return{error:n}}const{session:o,redirectType:a}=i;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return _(r)?this._returnResult({error:r}):this._returnResult({error:new re("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,s,i;try{const n=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:q}),{data:o,error:a}=n;if(a||!o)return this._returnResult({data:{user:null,session:null},error:a});const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(_(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var r,s,i;try{let n;if("email"in e){const{email:d,password:f,options:u}=e;let h=null,p=null;this.flowType==="pkce"&&([h,p]=await le(this.storage,this.storageKey)),n=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:u==null?void 0:u.emailRedirectTo,body:{email:d,password:f,data:(r=u==null?void 0:u.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken},code_challenge:h,code_challenge_method:p},xform:q})}else if("phone"in e){const{phone:d,password:f,options:u}=e;n=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:f,data:(s=u==null?void 0:u.data)!==null&&s!==void 0?s:{},channel:(i=u==null?void 0:u.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken}},xform:q})}else throw new Ve("You must provide either an email or phone number and a password");const{data:o,error:a}=n;if(a||!o)return await j(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:a});const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let r;if("email"in e){const{email:n,password:o,options:a}=e;r=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Xt})}else if("phone"in e){const{phone:n,password:o,options:a}=e;r=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Xt})}else throw new Ve("You must provide either an email or phone number and a password");const{data:s,error:i}=r;if(i)return this._returnResult({data:{user:null,session:null},error:i});if(!s||!s.session||!s.user){const n=new ae;return this._returnResult({data:{user:null,session:null},error:n})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(r){if(_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,s,i,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,s,i,n,o,a,l,c,d,f,u;let h,p;if("message"in e)h=e.message,p=e.signature;else{const{chain:g,wallet:m,statement:v,options:w}=e;let y;if(L())if(typeof m=="object")y=m;else{const U=window;if("ethereum"in U&&typeof U.ethereum=="object"&&"request"in U.ethereum&&typeof U.ethereum.request=="function")y=U.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof m!="object"||!(w!=null&&w.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=m}const b=new URL((r=w==null?void 0:w.url)!==null&&r!==void 0?r:window.location.href),T=await y.request({method:"eth_requestAccounts"}).then(U=>U).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!T||T.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const x=Sr(T[0]);let $=(s=w==null?void 0:w.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!$){const U=await y.request({method:"eth_chainId"});$=xi(U)}const O={domain:b.host,address:x,statement:v,uri:b.href,version:"1",chainId:$,nonce:(i=w==null?void 0:w.signInWithEthereum)===null||i===void 0?void 0:i.nonce,issuedAt:(o=(n=w==null?void 0:w.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(a=w==null?void 0:w.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=w==null?void 0:w.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=w==null?void 0:w.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=w==null?void 0:w.signInWithEthereum)===null||d===void 0?void 0:d.resources};h=ki(O),p=await y.request({method:"personal_sign",params:[Ei(h),x]})}try{const{data:g,error:m}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:p},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(u=e.options)===null||u===void 0?void 0:u.captchaToken}}:null),xform:q});if(m)throw m;if(!g||!g.session||!g.user){const v=new ae;return this._returnResult({data:{user:null,session:null},error:v})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:m})}catch(g){if(_(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var r,s,i,n,o,a,l,c,d,f,u,h;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:m,wallet:v,statement:w,options:y}=e;let b;if(L())if(typeof v=="object")b=v;else{const x=window;if("solana"in x&&typeof x.solana=="object"&&("signIn"in x.solana&&typeof x.solana.signIn=="function"||"signMessage"in x.solana&&typeof x.solana.signMessage=="function"))b=x.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(y!=null&&y.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");b=v}const T=new URL((r=y==null?void 0:y.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in b&&b.signIn){const x=await b.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},y==null?void 0:y.signInWithSolana),{version:"1",domain:T.host,uri:T.href}),w?{statement:w}:null));let $;if(Array.isArray(x)&&x[0]&&typeof x[0]=="object")$=x[0];else if(x&&typeof x=="object"&&"signedMessage"in x&&"signature"in x)$=x;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in $&&"signature"in $&&(typeof $.signedMessage=="string"||$.signedMessage instanceof Uint8Array)&&$.signature instanceof Uint8Array)p=typeof $.signedMessage=="string"?$.signedMessage:new TextDecoder().decode($.signedMessage),g=$.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in b)||typeof b.signMessage!="function"||!("publicKey"in b)||typeof b!="object"||!b.publicKey||!("toBase58"in b.publicKey)||typeof b.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${T.host} wants you to sign in with your Solana account:`,b.publicKey.toBase58(),...w?["",w,""]:[""],"Version: 1",`URI: ${T.href}`,`Issued At: ${(i=(s=y==null?void 0:y.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((n=y==null?void 0:y.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${y.signInWithSolana.notBefore}`]:[],...!((o=y==null?void 0:y.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${y.signInWithSolana.expirationTime}`]:[],...!((a=y==null?void 0:y.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${y.signInWithSolana.chainId}`]:[],...!((l=y==null?void 0:y.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${y.signInWithSolana.nonce}`]:[],...!((c=y==null?void 0:y.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${y.signInWithSolana.requestId}`]:[],...!((f=(d=y==null?void 0:y.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||f===void 0)&&f.length?["Resources",...y.signInWithSolana.resources.map($=>`- ${$}`)]:[]].join(`
`);const x=await b.signMessage(new TextEncoder().encode(p),"utf8");if(!x||!(x instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=x}}try{const{data:m,error:v}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:se(g)},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:q});if(v)throw v;if(!m||!m.session||!m.user){const w=new ae;return this._returnResult({data:{user:null,session:null},error:w})}return m.session&&(await this._saveSession(m.session),await this._notifyAllSubscribers("SIGNED_IN",m.session)),this._returnResult({data:Object.assign({},m),error:v})}catch(m){if(_(m))return this._returnResult({data:{user:null,session:null},error:m});throw m}}async _exchangeCodeForSession(e){const r=await Q(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(r??"").split("/");try{if(!s&&this.flowType==="pkce")throw new Hs;const{data:n,error:o}=await E(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:q});if(await j(this.storage,`${this.storageKey}-code-verifier`),o)throw o;if(!n||!n.session||!n.user){const a=new ae;return this._returnResult({data:{user:null,session:null,redirectType:null},error:a})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign(Object.assign({},n),{redirectType:i??null}),error:o})}catch(n){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(n))return this._returnResult({data:{user:null,session:null,redirectType:null},error:n});throw n}}async signInWithIdToken(e){try{const{options:r,provider:s,token:i,access_token:n,nonce:o}=e,a=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:n,nonce:o,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:q}),{data:l,error:c}=a;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new ae;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,s,i,n,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,d=null;this.flowType==="pkce"&&([c,d]=await le(this.storage,this.storageKey));const{error:f}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:d},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:f})}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:d}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:d})}throw new Ve("You must provide either an email or phone number.")}catch(a){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async verifyOtp(e){var r,s;try{let i,n;"options"in e&&(i=(r=e.options)===null||r===void 0?void 0:r.redirectTo,n=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:a}=await E(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:i,xform:q});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(_(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithSSO(e){var r,s,i,n,o;try{let a=null,l=null;this.flowType==="pkce"&&([a,l]=await le(this.storage,this.storageKey));const c=await E(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:gi});return!((n=c.data)===null||n===void 0)&&n.url&&L()&&!(!((o=e.options)===null||o===void 0)&&o.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(a){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)throw s;if(!r)throw new D;const{error:i}=await E(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:i})})}catch(e){if(_(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const r=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:n}=e,{error:o}=await E(this.fetch,"POST",r,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},redirectTo:n==null?void 0:n.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:o})}else if("phone"in e){const{phone:s,type:i,options:n}=e,{data:o,error:a}=await E(this.fetch,"POST",r,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a})}throw new Ve("You must provide either an email or phone number and a type")}catch(r){if(_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await r()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=r();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await Q(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<nt:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const o=await Q(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=lt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};e.user=ui(e.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{session:null},error:n}):this._returnResult({data:{session:i},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Y}):await this._useSession(async r=>{var s,i,n;const{data:o,error:a}=r;if(a)throw a;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new D}:await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&n!==void 0?n:void 0,xform:Y})})}catch(r){if(_(r))return ot(r)&&(await this._removeSession(),await j(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r))}async _updateUser(e,r={}){try{return await this._useSession(async s=>{const{data:i,error:n}=s;if(n)throw n;if(!i.session)throw new D;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await le(this.storage,this.storageKey));const{data:c,error:d}=await E(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:Y});if(d)throw d;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(s){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new D;const r=Date.now()/1e3;let s=r,i=!0,n=null;const{payload:o}=We(e.access_token);if(o.exp&&(s=o.exp,i=s<=r),i){const{data:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};n=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});n={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:s-r,expires_at:s},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(r){if(_(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async r=>{var s;if(!e){const{data:o,error:a}=r;if(a)throw a;e=(s=o.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new D;const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):i?this._returnResult({data:{user:i.user,session:i},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){try{if(!L())throw new He("No browser detected.");if(e.error||e.error_description||e.error_code)throw new He(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Ht("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new He("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Ht("No code detected.");const{data:w,error:y}=await this._exchangeCodeForSession(e.code);if(y)throw y;const b=new URL(window.location.href);return b.searchParams.delete("code"),window.history.replaceState(window.history.state,"",b.toString()),{data:{session:w.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:n,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=e;if(!n||!a||!o||!c)throw new He("No session defined in URL");const d=Math.round(Date.now()/1e3),f=parseInt(a);let u=d+f;l&&(u=parseInt(l));const h=u-d;h*1e3<=fe&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${f}s`);const p=u-f;d-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,u,d):d-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,u,d);const{data:g,error:m}=await this._getUser(n);if(m)throw m;const v={provider_token:s,provider_refresh_token:i,access_token:n,expires_in:f,expires_at:u,refresh_token:o,token_type:c,user:g.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:v,redirectType:e.type},error:null})}catch(s){if(_(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const r=await Q(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&r)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var s;const{data:i,error:n}=r;if(n&&!ot(n))return this._returnResult({error:n});const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(Ms(a)&&(a.status===404||a.status===401||a.status===403)||ot(a)))return this._returnResult({error:a})}return e!=="others"&&(await this._removeSession(),await j(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const r=Xs(),s={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,s),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async r=>{var s,i;try{const{data:{session:n},error:o}=r;if(o)throw o;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),console.error(n)}})}async resetPasswordForEmail(e,r={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await le(this.storage,this.storageKey,!0));try{return await E(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(n){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:r,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;try{const{data:s,error:i}=await this._useSession(async n=>{var o,a,l,c,d;const{data:f,error:u}=n;if(u)throw u;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await E(this.fetch,"GET",h,{headers:this.headers,jwt:(d=(c=f.session)===null||c===void 0?void 0:c.access_token)!==null&&d!==void 0?d:void 0})});if(i)throw i;return L()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:e.provider,url:s==null?void 0:s.url},error:null})}catch(s){if(_(s))return this._returnResult({data:{provider:e.provider,url:null},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var s;try{const{error:i,data:{session:n}}=r;if(i)throw i;const{options:o,provider:a,token:l,access_token:c,nonce:d}=e,f=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=n==null?void 0:n.access_token)!==null&&s!==void 0?s:void 0,body:{provider:a,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:q}),{data:u,error:h}=f;return h?this._returnResult({data:{user:null,session:null},error:h}):!u||!u.session||!u.user?this._returnResult({data:{user:null,session:null},error:new ae}):(u.session&&(await this._saveSession(u.session),await this._notifyAllSubscribers("USER_UPDATED",u.session)),this._returnResult({data:u,error:h}))}catch(i){if(await j(this.storage,`${this.storageKey}-code-verifier`),_(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:o}=r;if(o)throw o;return await E(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(r,"begin");try{const s=Date.now();return await ti(async i=>(i>0&&await ei(200*Math.pow(2,i-1)),this._debug(r,"refreshing attempt",i),await E(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:q})),(i,n)=>{const o=200*Math.pow(2,i);return n&&at(n)&&Date.now()+o-s<fe})}catch(s){if(this._debug(r,"error",s),_(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",s),L()&&!r.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,r;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await Q(this.storage,this.storageKey);if(i&&this.userStorage){let o=await Q(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:i.user},await pe(this.userStorage,this.storageKey+"-user",o)),i.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:lt()}else if(i&&!i.user&&!i.user){const o=await Q(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(i.user=o.user,await j(this.storage,this.storageKey+"-user"),await pe(this.storage,this.storageKey,i)):i.user=lt()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const n=((r=i.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<nt;if(this._debug(s,`session has${n?"":" not"} expired with margin of ${nt}s`),n){if(this.autoRefreshToken&&i.refresh_token){const{error:o}=await this._callRefreshToken(i.refresh_token);o&&(console.error(o),at(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(i.access_token);!a&&(o!=null&&o.user)?(i.user=o.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var r,s;if(!e)throw new D;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new Ze;const{data:n,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!n.session)throw new D;await this._saveSession(n.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",n.session);const a={data:n.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(n){if(this._debug(i,"error",n),_(n)){const o={data:null,error:n};return at(n)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(n),n}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,r,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",r,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:r});const n=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,r)}catch(l){n.push(l)}});if(await Promise.all(o),n.length>0){for(let a=0;a<n.length;a+=1)console.error(n[a]);throw n[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await j(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},e),s=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&r.user&&await pe(this.userStorage,this.storageKey+"-user",{user:r.user});const i=Object.assign({},r);delete i.user;const n=Jt(i);await pe(this.storage,this.storageKey,n)}else{const i=Jt(r);await pe(this.storage,this.storageKey,i)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await j(this.storage,this.storageKey),await j(this.storage,this.storageKey+"-code-verifier"),await j(this.storage,this.storageKey+"-user"),this.userStorage&&await j(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&L()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),fe);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/fe);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${fe}ms, refresh threshold is ${yt} ticks`),i<=yt&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof kr)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!L()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,s){const i=[`provider=${encodeURIComponent(r)}`];if(s!=null&&s.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[n,o]=await le(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(s!=null&&s.queryParams){const n=new URLSearchParams(s.queryParams);i.push(n.toString())}return s!=null&&s.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async r=>{var s;const{data:i,error:n}=r;return n?this._returnResult({data:null,error:n}):await E(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:o}=r;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await E(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((i=l==null?void 0:l.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var s;const{data:i,error:n}=r;if(n)return this._returnResult({data:null,error:n});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Ii(e.webauthn.credential_response):Pi(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:l}=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),this._returnResult({data:a,error:l}))})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var s;const{data:i,error:n}=r;if(n)return this._returnResult({data:null,error:n});const o=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});if(o.error)return o;const{data:a}=o;if(a.type!=="webauthn")return{data:a,error:null};switch(a.webauthn.type){case"create":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Ci(a.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Oi(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(e){const{data:r,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:s}=await this.getUser();if(s)return{data:null,error:s};const i={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])i.all.push(n),n.status==="verified"&&i[n.factor_type].push(n);return{data:i,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,s,i,n;if(e)try{const{payload:h}=We(e);let p=null;h.aal&&(p=h.aal);let g=p;const{data:{user:m},error:v}=await this.getUser(e);if(v)return this._returnResult({data:null,error:v});((s=(r=m==null?void 0:m.factors)===null||r===void 0?void 0:r.filter(b=>b.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(g="aal2");const y=h.amr||[];return{data:{currentLevel:p,nextLevel:g,currentAuthenticationMethods:y},error:null}}catch(h){if(_(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:o},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=We(o.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((n=(i=o.user.factors)===null||i===void 0?void 0:i.filter(h=>h.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(d="aal2");const u=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:u},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?await E(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new D})})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new D});const o=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&L()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new D});const o=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&L()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;return s?this._returnResult({data:null,error:s}):r?await E(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new D})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?(await E(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new D})})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let s=r.keys.find(a=>a.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(a=>a.kid===e),s&&this.jwks_cached_at+Fs>i)return s;const{data:n,error:o}=await E(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=i,s=n.keys.find(a=>a.kid===e),!s)?null:s}async getClaims(e,r={}){try{let s=e;if(!s){const{data:h,error:p}=await this.getSession();if(p||!h.session)return this._returnResult({data:null,error:p});s=h.session.access_token}const{header:i,payload:n,signature:o,raw:{header:a,payload:l}}=We(s);r!=null&&r.allowExpired||li(n.exp);const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!c){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:n,header:i,signature:o},error:null}}const d=ci(i.alg),f=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,f,o,Js(`${a}.${l}`)))throw new _t("Invalid JWT signature");return{data:{claims:n,header:i,signature:o},error:null}}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}}Le.nextInstanceID={};const qi=Le,Mi="2.99.2";let $e="";typeof Deno<"u"?$e="deno":typeof document<"u"?$e="web":typeof navigator<"u"&&navigator.product==="ReactNative"?$e="react-native":$e="node";const Vi={"X-Client-Info":`supabase-js-${$e}/${Mi}`},Hi={headers:Vi},Wi={schema:"public"},Ki={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Gi={};function Ue(t){"@babel/helpers - typeof";return Ue=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ue(t)}function zi(t,e){if(Ue(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Ue(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ji(t){var e=zi(t,"string");return Ue(e)=="symbol"?e:e+""}function Yi(t,e,r){return(e=Ji(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function rr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function I(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?rr(Object(r),!0).forEach(function(s){Yi(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):rr(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}const Xi=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Qi=()=>Headers,Zi=(t,e,r)=>{const s=Xi(r),i=Qi();return async(n,o)=>{var a;const l=(a=await e())!==null&&a!==void 0?a:t;let c=new i(o==null?void 0:o.headers);return c.has("apikey")||c.set("apikey",t),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),s(n,I(I({},o),{},{headers:c}))}};function en(t){return t.endsWith("/")?t:t+"/"}function tn(t,e){var r,s;const{db:i,auth:n,realtime:o,global:a}=t,{db:l,auth:c,realtime:d,global:f}=e,u={db:I(I({},l),i),auth:I(I({},c),n),realtime:I(I({},d),o),storage:{},global:I(I(I({},f),a),{},{headers:I(I({},(r=f==null?void 0:f.headers)!==null&&r!==void 0?r:{}),(s=a==null?void 0:a.headers)!==null&&s!==void 0?s:{})}),accessToken:async()=>""};return t.accessToken?u.accessToken=t.accessToken:delete u.accessToken,u}function rn(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(en(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var sn=class extends qi{constructor(t){super(t)}},nn=class{constructor(t,e,r){var s,i;this.supabaseUrl=t,this.supabaseKey=e;const n=rn(t);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",n),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",n),this.storageUrl=new URL("storage/v1",n),this.functionsUrl=new URL("functions/v1",n);const o=`sb-${n.hostname.split(".")[0]}-auth-token`,a={db:Wi,realtime:Gi,auth:I(I({},Ki),{},{storageKey:o}),global:Hi},l=tn(r??{},a);if(this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(i=l.global.headers)!==null&&i!==void 0?i:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,f)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=Zi(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(I({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new Mr(new URL("rest/v1",n).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Ls(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new jr(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:s}=await t.auth.getSession();return(e=(r=s.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,storageKey:n,flowType:o,lock:a,debug:l,throwOnError:c},d,f){const u={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new sn({url:this.authUrl.href,headers:I(I({},u),d),storageKey:n,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,flowType:o,lock:a,debug:l,throwOnError:c,fetch:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(h=>h.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new ns(this.realtimeUrl.href,I(I({},t),{},{params:I(I({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const on=(t,e,r)=>new nn(t,e,r);function an(){if(typeof window<"u")return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}an()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const ln="https://xuisqgaijknpryuzwmwz.supabase.co",cn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aXNxZ2FpamtucHJ5dXp3bXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDc1MTYsImV4cCI6MjA4OTI4MzUxNn0.jElhsSz2ao9c-J7khL5j4ZfGIth2jtzVbgwlX3HIq_c",S=on(ln,cn),ne={async signUp(t,e,r,s){const{data:i,error:n}=await S.auth.signUp({email:t,password:e,options:{data:{nombre:r,cargo:s}}});if(n)throw n;if(i.user){const{error:o}=await S.from("usuarios").insert({id:i.user.id,email:i.user.email,password:"",nombre:r,cargo:s});if(o)throw o}return i},async signIn(t,e){const{data:r,error:s}=await S.auth.signInWithPassword({email:t,password:e});if(s)throw s;return r},async signOut(){const{error:t}=await S.auth.signOut();if(t)throw t},async getCurrentUser(){const{data:{user:t},error:e}=await S.auth.getUser();if(e)throw e;return t},async getUserProfile(t){const{data:e,error:r}=await S.from("usuarios").select("*").eq("id",t).maybeSingle();if(r)throw r;return e},onAuthStateChange(t){return S.auth.onAuthStateChange((e,r)=>{(async()=>await t(e,r))()})}};function dn(){return`
    <div class="auth-container">
      <div class="auth-card">
        <h1>Sistema de Cotización de Seguros</h1>
        <div id="auth-message"></div>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" class="btn" id="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  `}function un(t){const e=document.getElementById("login-form"),r=document.getElementById("auth-message");function s(i,n=!1){r.innerHTML=`<div class="${n?"error-message":"success-message"}">${i}</div>`}e&&e.addEventListener("submit",async i=>{i.preventDefault();const n=document.getElementById("login-btn");n.disabled=!0,n.textContent="Iniciando...";try{const o=document.getElementById("email").value,a=document.getElementById("password").value;await ne.signIn(o,a),t("/dashboard")}catch(o){s(o.message||"Error al iniciar sesión",!0),n.disabled=!1,n.textContent="Iniciar Sesión"}})}const be={async getAll(){const{data:t,error:e}=await S.from("polizas").select(`
        *,
        aseguradora:aseguradoras(id, nombre, comision_porcentaje),
        vendedor:vendedores(id, nombre, comision_porcentaje)
      `).order("fecha",{ascending:!1});if(e)throw e;return t||[]},async create(t){const e=await S.auth.getUser();if(!e.data.user)throw new Error("Usuario no autenticado");const{data:r,error:s}=await S.from("polizas").insert({...t,usuario_id:e.data.user.id}).select().single();if(s)throw s;return r},async update(t,e){const{data:r,error:s}=await S.from("polizas").update(e).eq("id",t).select().single();if(s)throw s;return r},async delete(t){const{error:e}=await S.from("polizas").delete().eq("id",t);if(e)throw e},async getStats(){const{data:t,error:e}=await S.from("polizas").select("monto");if(e)throw e;const r=(t==null?void 0:t.reduce((i,n)=>i+parseFloat(n.monto||0),0))||0,s=(t==null?void 0:t.length)||0;return{total:r,count:s}}},De={async getAll(){const{data:t,error:e}=await S.from("aseguradoras").select("*").order("nombre");if(e)throw e;return t||[]},async create(t){const{data:e,error:r}=await S.from("aseguradoras").insert([t]).select().single();if(r)throw r;return e},async update(t,e){const{data:r,error:s}=await S.from("aseguradoras").update(e).eq("id",t).select().single();if(s)throw s;return r},async delete(t){const{error:e}=await S.from("aseguradoras").delete().eq("id",t);if(e)throw e}},we={async getAll(){const{data:t,error:e}=await S.from("vendedores").select("*").eq("activo",!0).order("nombre");if(e)throw e;return t||[]},async create(t){const{data:e,error:r}=await S.from("vendedores").insert([t]).select().single();if(r)throw r;return e},async update(t,e){const{data:r,error:s}=await S.from("vendedores").update(e).eq("id",t).select().single();if(s)throw s;return r},async delete(t){const{error:e}=await S.from("vendedores").update({activo:!1}).eq("id",t);if(e)throw e}},hn={async getAll(){const{data:t,error:e}=await S.from("vehiculos").select("*").order("marca",{ascending:!0}).order("modelo",{ascending:!0});if(e)throw e;return t||[]},async create(t){const e=await S.auth.getUser();if(!e.data.user)throw new Error("Usuario no autenticado");const{data:r,error:s}=await S.from("vehiculos").insert({...t,usuario_id:e.data.user.id}).select().single();if(s)throw s;return r},async delete(t){const{error:e}=await S.from("vehiculos").delete().eq("id",t);if(e)throw e},async importFromCSV(t){const e=await S.auth.getUser();if(!e.data.user)throw new Error("Usuario no autenticado");const r=t.map(n=>({...n,usuario_id:e.data.user.id})),{data:s,error:i}=await S.from("vehiculos").insert(r).select();if(i)throw i;return s}},fn={async processCSV(t){const e=t.split(`
`).filter(a=>a.trim());if(e.length===0)throw new Error("El archivo está vacío");const r=await De.getAll();if(r.length===0)throw new Error("Debe crear al menos una compañía aseguradora antes de importar");const s=await we.getAll(),i=r[0],n=s.length>0?s[0]:null,o={success:0,errors:[],total:e.length};for(let a=0;a<e.length;a++){const l=e[a].trim();if(l)try{const c=l.split(",").map(v=>v.trim());if(c.length<3){o.errors.push({line:a+1,content:l,error:"Formato inválido: se esperan al menos 3 columnas (MARCA,MODELO,AÑO)"});continue}const d=c[0],f=c[1],u=c[2];if(!d||!f){o.errors.push({line:a+1,content:l,error:"Marca o modelo vacío"});continue}const h=parseInt(u);if(isNaN(h)||h<1900||h>2100){o.errors.push({line:a+1,content:l,error:`Año inválido: ${u}`});continue}const p=`AUTO-${d.substring(0,3).toUpperCase()}-${h}-${Date.now()}-${a}`,g=`Propietario ${d} ${f}`,m={fecha:new Date().toISOString().split("T")[0],ejecutivo_venta:(n==null?void 0:n.nombre)||"Importación",vendedor_id:(n==null?void 0:n.id)||null,categoria:"Automotriz",estado:"Pendiente",numero_poliza:p,nombre_asegurado:g,marca:d,modelo:f,ano:h,aseguradora_id:i.id,deducible:0,prima_bruta_anual_uf:0,prima_neta_anual_uf:0,prima_bruta_mensual_uf:0,prima_neta_mensual_uf:0,monto:0};await be.create(m),o.success++}catch(c){o.errors.push({line:a+1,content:l,error:c.message})}}return o}},sr="https://mindicador.cl/api",Tr={async getUF(){try{const t=await fetch(`${sr}/uf`);if(!t.ok)throw new Error("Error al obtener UF");return(await t.json()).serie[0].valor}catch(t){throw console.error("Error getting UF:",t),t}},async getUSD(){try{const t=await fetch(`${sr}/dolar`);if(!t.ok)throw new Error("Error al obtener USD");return(await t.json()).serie[0].valor}catch(t){throw console.error("Error getting USD:",t),t}},async getAll(){try{const[t,e]=await Promise.all([this.getUF(),this.getUSD()]);return{uf:t,usd:e}}catch(t){throw console.error("Error getting indicators:",t),t}}};let Ee=null,Ke=null;async function ir(){try{if(!Ee||!Ke||Date.now()-Ke>24*60*60*1e3)try{Ee=await Tr.getAll(),Ke=Date.now()}catch(b){console.error("Error obteniendo indicadores, usando valores por defecto:",b),Ee={uf:37e3,usd:950},Ke=Date.now()}const t=Ee.uf,e=Ee.usd,r=new Date,s=r.getFullYear(),i=r.getMonth(),n=new Date(s,i,1),o=new Date(s,i+1,0,23,59,59),{data:a}=await S.from("polizas").select(`
        *,
        vendedores:vendedor_id(nombre),
        aseguradoras:aseguradora_id(nombre)
      `).gte("fecha",n.toISOString()).lte("fecha",o.toISOString()),{data:l}=await S.from("vendedores").select("*").order("nombre"),c=(a==null?void 0:a.length)||0,d=(a==null?void 0:a.reduce((b,T)=>b+parseFloat(T.comision_neta_uf||0),0))||0,f=(a==null?void 0:a.reduce((b,T)=>b+parseFloat(T.comision_vendedor_uf||0),0))||0,u=d-f,h=f*.19,p=d*t,g=f*t,m=u*t,v=h*t,w=(l==null?void 0:l.map(b=>{const T=(a==null?void 0:a.filter($=>$.vendedor_id===b.id))||[],x=T.reduce(($,O)=>$+parseFloat(O.comision_vendedor_uf||0),0);return{nombre:b.nombre,polizas:T.length,comision:x}}))||[];return w.sort((b,T)=>T.comision-b.comision),`
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h1>Dashboard General</h1>
          <p style="color: #6b7280; margin-top: 8px;">${n.toLocaleDateString("es-CL",{month:"long",year:"numeric"})}</p>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="background: white; padding: 12px 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
            <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">UF</div>
            <div style="font-size: 18px; font-weight: 700; color: #2563eb;">$${t.toLocaleString("es-CL",{maximumFractionDigits:2})}</div>
          </div>
          <div style="background: white; padding: 12px 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
            <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">USD</div>
            <div style="font-size: 18px; font-weight: 700; color: #10b981;">$${e.toLocaleString("es-CL",{maximumFractionDigits:2})}</div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px;">
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2563eb;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Total Pólizas</div>
          <div style="font-size: 36px; font-weight: 700; color: #2563eb;">${c}</div>
          <div style="color: #9ca3af; font-size: 13px; margin-top: 4px;">Este mes</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #7c3aed;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Comisión Total</div>
          <div style="font-size: 28px; font-weight: 700; color: #7c3aed;">${d.toFixed(2)} UF</div>
          <div style="color: #7c3aed; font-size: 16px; margin-top: 4px;">$${p.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #10b981;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Utilidad LIVE</div>
          <div style="font-size: 28px; font-weight: 700; color: #10b981;">${u.toFixed(2)} UF</div>
          <div style="color: #059669; font-size: 16px; margin-top: 4px;">$${m.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #ef4444;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Impuesto (19%)</div>
          <div style="font-size: 28px; font-weight: 700; color: #ef4444;">${h.toFixed(2)} UF</div>
          <div style="color: #dc2626; font-size: 16px; margin-top: 4px;">$${v.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">Top Ejecutivos por Comisión</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${w.slice(0,5).map((b,T)=>`
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: ${T===0?"#fef3c7":"#f9fafb"}; border-radius: 6px;">
                <div>
                  <div style="font-weight: 600; color: #1f2937;">${b.nombre}</div>
                  <div style="font-size: 13px; color: #6b7280;">${b.polizas} pólizas</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 700; color: #2563eb; font-size: 18px;">${b.comision.toFixed(2)} UF</div>
                  <div style="font-size: 13px; color: #6b7280;">$${(b.comision*t).toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">Pólizas por Ejecutivo</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${w.map(b=>{const T=Math.max(...w.map($=>$.polizas),1),x=b.polizas/T*100;return`
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="font-size: 14px; color: #1f2937; font-weight: 500;">${b.nombre}</span>
                    <span style="font-size: 14px; color: #6b7280; font-weight: 600;">${b.polizas}</span>
                  </div>
                  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #2563eb, #7c3aed); height: 100%; width: ${x}%; transition: width 0.3s ease;"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>

      <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Resumen Ejecutivos</h3>
        <div style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ejecutivo</th>
                <th>Pólizas</th>
                <th>Comisión (UF)</th>
                <th>Comisión (CLP)</th>
                <th>Promedio por Póliza</th>
              </tr>
            </thead>
            <tbody>
              ${w.map(b=>`
                <tr>
                  <td style="font-weight: 500;">${b.nombre}</td>
                  <td style="text-align: center;">${b.polizas}</td>
                  <td style="text-align: right; font-weight: 600; color: #2563eb;">${b.comision.toFixed(2)}</td>
                  <td style="text-align: right;">$${(b.comision*t).toLocaleString("es-CL",{maximumFractionDigits:0})}</td>
                  <td style="text-align: right;">${b.polizas>0?(b.comision/b.polizas).toFixed(2):"0.00"} UF</td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr style="background: #f9fafb; font-weight: 700;">
                <td>TOTAL</td>
                <td style="text-align: center;">${c}</td>
                <td style="text-align: right; color: #2563eb;">${f.toFixed(2)}</td>
                <td style="text-align: right;">$${g.toLocaleString("es-CL",{maximumFractionDigits:0})}</td>
                <td style="text-align: right;">${c>0?(f/c).toFixed(2):"0.00"} UF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `}catch(t){return console.error("Error:",t),'<div class="error-message">Error al cargar el dashboard</div>'}}let At=[],nr=null;async function xt(){try{const{data:{user:t}}=await S.auth.getUser(),{data:e}=await S.from("usuarios").select("*").eq("id",t.id).maybeSingle();return nr=e,(e==null?void 0:e.rol)!=="admin"?'<div class="error-message">No tienes permisos para acceder a esta sección</div>':(await Et(),`
      <div class="view-header">
        <h1>Gestión de Usuarios</h1>
        <button class="btn-primary" id="new-usuario-btn">+ Nuevo Usuario</button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${At.map(r=>`
              <tr>
                <td>${r.nombre||"-"}</td>
                <td>${r.email}</td>
                <td>${r.cargo||"-"}</td>
                <td>
                  <span class="badge badge-${r.rol==="admin"?"success":"info"}">
                    ${r.rol==="admin"?"Administrador":"Vendedor"}
                  </span>
                </td>
                <td>${new Date(r.created_at).toLocaleDateString("es-CL")}</td>
                <td>
                  <button class="btn-icon" onclick="window.editUsuario('${r.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  ${r.id!==nr.id?`
                    <button class="btn-icon btn-danger" onclick="window.deleteUsuario('${r.id}')" title="Eliminar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  `:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div id="usuario-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="modal-title">Nuevo Usuario</h2>
            <button class="modal-close" id="close-modal">&times;</button>
          </div>
          <form id="usuario-form">
            <input type="hidden" id="usuario-id" />
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre *</label>
                <input type="text" id="nombre" required />
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cargo">Cargo</label>
                <input type="text" id="cargo" />
              </div>
              <div class="form-group">
                <label for="rol">Rol *</label>
                <select id="rol" required>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div class="form-group" id="password-group">
              <label for="password">Contraseña *</label>
              <input type="password" id="password" minlength="6" />
              <small>Mínimo 6 caracteres</small>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" id="cancel-btn">Cancelar</button>
              <button type="submit" class="btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `)}catch(t){return console.error("Error:",t),'<div class="error-message">Error al cargar usuarios</div>'}}async function Et(){const{data:t,error:e}=await S.from("usuarios").select("*").order("created_at",{ascending:!1});if(e)throw e;At=t||[]}function kt(){const t=document.getElementById("new-usuario-btn"),e=document.getElementById("usuario-modal"),r=document.getElementById("close-modal"),s=document.getElementById("cancel-btn"),i=document.getElementById("usuario-form");function n(a=null){const l=document.getElementById("modal-title"),c=document.getElementById("password-group"),d=document.getElementById("password");a?(l.textContent="Editar Usuario",document.getElementById("usuario-id").value=a.id,document.getElementById("nombre").value=a.nombre||"",document.getElementById("email").value=a.email,document.getElementById("cargo").value=a.cargo||"",document.getElementById("rol").value=a.rol||"vendedor",c.style.display="none",d.required=!1):(l.textContent="Nuevo Usuario",i.reset(),document.getElementById("usuario-id").value="",c.style.display="block",d.required=!0),e.style.display="flex"}function o(){e.style.display="none",i.reset()}t==null||t.addEventListener("click",()=>n()),r==null||r.addEventListener("click",o),s==null||s.addEventListener("click",o),window.editUsuario=async a=>{const l=At.find(c=>c.id===a);l&&n(l)},window.deleteUsuario=async a=>{if(confirm("¿Estás seguro de eliminar este usuario?"))try{const{error:l}=await S.auth.admin.deleteUser(a),{error:c}=await S.from("usuarios").delete().eq("id",a);if(c)throw c;alert("Usuario eliminado exitosamente"),await Et(),document.getElementById("view-container").innerHTML=await xt(),kt()}catch(l){console.error("Error:",l),alert("Error al eliminar usuario: "+l.message)}},i==null||i.addEventListener("submit",async a=>{a.preventDefault();const l=document.getElementById("usuario-id").value,c=document.getElementById("nombre").value,d=document.getElementById("email").value,f=document.getElementById("cargo").value,u=document.getElementById("rol").value,h=document.getElementById("password").value;try{if(l){const{error:p}=await S.from("usuarios").update({nombre:c,email:d,cargo:f,rol:u}).eq("id",l);if(p)throw p;alert("Usuario actualizado exitosamente")}else{const{data:p,error:g}=await S.auth.signUp({email:d,password:h});if(g)throw g;const{error:m}=await S.from("usuarios").insert({id:p.user.id,email:d,nombre:c,cargo:f,rol:u});if(m)throw m;alert("Usuario creado exitosamente")}o(),await Et(),document.getElementById("view-container").innerHTML=await xt(),kt()}catch(p){console.error("Error:",p),alert("Error al guardar usuario: "+p.message)}}),e==null||e.addEventListener("click",a=>{a.target===e&&o()})}let Ct=[],ue=[],Be="",ve="",ke=37580,dt=null,ut=null;async function pn(){try{await gn();const t=new Date,e=t.getFullYear(),r=t.getMonth()+1;return ve=ve||`${e}-${String(r).padStart(2,"0")}`,`
      <div class="view-header">
        <h1>Reportes de Comisiones</h1>
      </div>

      <div class="filters-container" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
          <div class="form-group" style="margin: 0;">
            <label for="vendedor-select">Ejecutivo</label>
            <select id="vendedor-select" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              <option value="">Seleccionar ejecutivo</option>
              ${Ct.map(s=>`
                <option value="${s.id}" ${Be===s.id?"selected":""}>${s.nombre}</option>
              `).join("")}
            </select>
          </div>
          <div class="form-group" style="margin: 0;">
            <label for="month-select">Mes</label>
            <input type="month" id="month-select" value="${ve}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <button class="btn-primary" id="generate-report-btn">Generar Reporte</button>
        </div>
      </div>

      <div id="report-container"></div>
    `}catch(t){return console.error("Error:",t),'<div class="error-message">Error al cargar reportes</div>'}}async function gn(){const{data:t}=await S.from("vendedores").select("*").order("nombre");Ct=t||[]}function mn(){const t=document.getElementById("generate-report-btn"),e=document.getElementById("vendedor-select"),r=document.getElementById("month-select");t==null||t.addEventListener("click",async()=>{if(Be=e.value,ve=r.value,!Be||!ve){alert("Por favor selecciona un ejecutivo y un mes");return}await vn()})}async function vn(){const t=document.getElementById("report-container");t.innerHTML='<div style="text-align: center; padding: 40px;">Cargando reporte...</div>';try{(!dt||!ut||Date.now()-ut>24*60*60*1e3)&&(dt=await Tr.getAll(),ut=Date.now()),ke=dt.uf;const[e,r]=ve.split("-"),s=new Date(e,r-1,1),i=new Date(e,r,0,23,59,59),{data:n}=await S.from("polizas").select(`
        *,
        vendedores:vendedor_id(nombre, comision_porcentaje, tipo_comision),
        aseguradoras:aseguradora_id(nombre)
      `).eq("vendedor_id",Be).gte("fecha",s.toISOString()).lte("fecha",i.toISOString()).order("fecha");ue=n||[];const o=Ct.find(m=>m.id===Be),a=ue.reduce((m,v)=>m+parseFloat(v.comision_neta_uf||0),0),l=ue.reduce((m,v)=>m+parseFloat(v.comision_vendedor_uf||0),0),c=l,d=l*.19,f=a-l,u=a*ke,h=l*ke,p=d*ke,g=f*ke;t.innerHTML=`
      <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
          <div>
            <h2 style="margin: 0; color: #1f2937; font-size: 24px;">Reporte de Comisiones</h2>
            <p style="margin: 8px 0 0 0; color: #6b7280;">
              ${(o==null?void 0:o.nombre)||""} - ${new Date(e,r-1).toLocaleDateString("es-CL",{month:"long",year:"numeric"})}
            </p>
          </div>
          <div style="text-align: right;">
            <div style="color: #6b7280; font-size: 14px;">Total Pólizas</div>
            <div style="font-size: 32px; font-weight: 700; color: #0ea5e9;">${ue.length}</div>
          </div>
        </div>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Comisión Total LIVE x Mes</div>
              <div style="font-size: 28px; font-weight: 700;">${l.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${h.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
            </div>
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Comisión Total LIVE x Mes NETA</div>
              <div style="font-size: 28px; font-weight: 700;">${c.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${h.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
            </div>
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Impuesto</div>
              <div style="font-size: 28px; font-weight: 700;">${d.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${p.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #6366f1;">
            <div style="color: #4b5563; font-size: 14px; margin-bottom: 8px;">Comisión NETA en UF</div>
            <div style="font-size: 28px; font-weight: 700; color: #1f2937;">${a.toFixed(3)} UF</div>
            <div style="font-size: 18px; color: #6b7280; margin-top: 4px;">$${u.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
          </div>
          <div style="background: #ecfdf5; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
            <div style="color: #065f46; font-size: 14px; margin-bottom: 8px;">Utilidad Final LIVE</div>
            <div style="font-size: 28px; font-weight: 700; color: #047857;">${f.toFixed(3)} UF</div>
            <div style="font-size: 18px; color: #059669; margin-top: 4px;">$${g.toLocaleString("es-CL",{maximumFractionDigits:0})}</div>
          </div>
        </div>

        ${ue.length>0?`
          <div style="margin-top: 32px;">
            <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Detalle de Pólizas</h3>
            <div style="overflow-x: auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Asegurado</th>
                    <th>N° Póliza</th>
                    <th>Compañía</th>
                    <th>Prima Neta UF</th>
                    <th>Com. Total UF</th>
                    <th>Com. Vendedor UF</th>
                  </tr>
                </thead>
                <tbody>
                  ${ue.map(m=>{var v;return`
                    <tr>
                      <td>${new Date(m.fecha).toLocaleDateString("es-CL")}</td>
                      <td>${m.nombre_asegurado}</td>
                      <td>${m.numero_poliza}</td>
                      <td>${((v=m.aseguradoras)==null?void 0:v.nombre)||"-"}</td>
                      <td>${parseFloat(m.prima_neta_anual_uf||0).toFixed(2)}</td>
                      <td>${parseFloat(m.comision_neta_uf||0).toFixed(2)}</td>
                      <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(m.comision_vendedor_uf||0).toFixed(2)}</td>
                    </tr>
                  `}).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `:`
          <div style="text-align: center; padding: 40px; color: #6b7280;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 16px;">
              <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <p>No hay pólizas para el ejecutivo y mes seleccionado</p>
          </div>
        `}
      </div>
    `}catch(e){console.error("Error:",e),t.innerHTML='<div class="error-message">Error al generar el reporte</div>'}}async function Ot(){try{const e=await(await fetch("https://mindicador.cl/api/uf")).json();return parseFloat(e.serie[0].valor)}catch(t){return console.error("Error obteniendo valor UF:",t),38e3}}async function Ar(t,e,r){var c;const{data:s,error:i}=await S.from("polizas").select(`
      *,
      vendedores (nombre, tipo_comision, comision_porcentaje, porcentaje_comision, monto_fijo_comision),
      aseguradoras (nombre)
    `).eq("vendedor_id",t).gte("fecha",`${r}-${String(e).padStart(2,"0")}-01`).lt("fecha",e===12?`${r+1}-01-01`:`${r}-${String(e+1).padStart(2,"0")}-01`).eq("estado","Vigente");if(i)throw console.error("Error fetching polizas:",i),i;let n=0,o=0;const a=[],l=await Ot();for(const d of s||[]){const f=parseFloat(d.comision_vendedor_uf||0);parseFloat(d.comision_neta_uf||0);const u=f*l,h=parseFloat(d.prima_bruta_anual_uf||0),p=h*l,g=parseFloat(d.prima_bruta_mensual_uf||0),m=g*l;n+=u,o+=f,a.push({mes:new Date(d.fecha).toLocaleString("es-CL",{month:"short"}),anio:new Date(d.fecha).getFullYear(),categoria:d.categoria||"N/A",estado:d.estado,fecha:d.fecha,deducible:d.deducible||0,prima_compania:p,prima_bruta_anual:p,anual_en_uf:h,prima_neta:m,prima_bruta_mensual:m,mensual_en_uf:g,comision_uf:f,comision_clp:u,aseguradora:((c=d.aseguradoras)==null?void 0:c.nombre)||d.compania||"N/A",poliza_numero:d.numero_poliza||"N/A"})}return{polizas:a,totalComisionCLP:n,totalComisionUF:o,cantidadPolizas:(s==null?void 0:s.length)||0}}async function yn(t,e,r){try{const s=await Ot(),i=await Ar(t,e,r),n=i.totalComisionCLP,o=0,a=15.25,l=n*(a/100),c=n-l-o,{data:d,error:f}=await S.from("vendedores").select("*").eq("id",t).single();if(f)throw console.error("Error fetching vendedor:",f),f;const u={vendedor_id:t,periodo_mes:e,periodo_anio:r,total_comision_uf:i.totalComisionUF,total_comision_clp:i.totalComisionCLP,total_honorarios:n,retencion_impuesto:l,total_liquido:c,valor_uf:s,porcentaje_retencion:a,negativa_fuga:o,updated_at:new Date().toISOString()},{data:h,error:p}=await S.from("liquidaciones").upsert(u,{onConflict:"vendedor_id,periodo_mes,periodo_anio"}).select().single();if(p)throw console.error("Error upserting liquidacion:",p),p;return{...h,vendedor:d,detallePolizas:i.polizas}}catch(s){throw console.error("Error in generarLiquidacion:",s),s}}async function bn(t=null,e=null){try{let r=S.from("liquidaciones").select(`
        *,
        vendedores (nombre, email, rut)
      `).order("periodo_anio",{ascending:!1}).order("periodo_mes",{ascending:!1});t!==null&&(r=r.eq("periodo_mes",t)),e!==null&&(r=r.eq("periodo_anio",e));const{data:s,error:i}=await r;if(i)throw console.error("Error fetching liquidaciones:",i),i;return s||[]}catch(r){return console.error("Error in obtenerLiquidaciones:",r),[]}}async function Cr(t){try{const{data:e,error:r}=await S.from("liquidaciones").select(`
        *,
        vendedores (nombre, email, rut)
      `).eq("id",t).maybeSingle();if(r)throw console.error("Error fetching liquidacion:",r),r;if(!e)throw new Error("Liquidación no encontrada");const s=await Ar(e.vendedor_id,e.periodo_mes,e.periodo_anio);return{...e,detallePolizas:s.polizas||[]}}catch(e){throw console.error("Error in obtenerLiquidacionPorId:",e),e}}async function wn(t){const{error:e}=await S.from("liquidaciones").delete().eq("id",t);if(e)throw e}function A(t){return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",minimumFractionDigits:0}).format(t)}function W(t){return new Intl.NumberFormat("es-CL",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}function _n(t){var l,c;if(!t){console.error("No se proporcionó liquidación");return}const r=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][t.periodo_mes-1],s=((l=t.vendedores)==null?void 0:l.nombre)||((c=t.vendedor)==null?void 0:c.nombre)||"Vendedor",i=new Date().toLocaleDateString("es-CL");let n=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Liquidación ${s} - ${r} ${t.periodo_anio}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .header-info {
          border: 2px solid #000;
          padding: 5px 10px;
        }
        .header-info td {
          padding: 3px 10px;
        }
        .section-title {
          background-color: #6366f1;
          color: white;
          padding: 8px;
          text-align: center;
          font-weight: bold;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .honorarios-table td {
          border: 1px solid #000;
          padding: 8px;
        }
        .honorarios-table .label {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .honorarios-table .total {
          background-color: #6366f1;
          color: white;
          font-weight: bold;
        }
        .honorarios-table .negativa {
          color: red;
        }
        .detalle-table {
          font-size: 10px;
          margin-top: 10px;
        }
        .detalle-table th {
          background-color: #1e293b;
          color: white;
          padding: 8px 4px;
          border: 1px solid #ddd;
          font-weight: bold;
        }
        .detalle-table td {
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
        }
        .detalle-table .pink-row {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        .detalle-table .total-row {
          background-color: #6366f1;
          color: white;
          font-weight: bold;
        }
        .amount {
          text-align: right;
        }
        .vendor-title {
          background-color: #6366f1;
          color: white;
          padding: 8px;
          font-weight: bold;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <table class="header-info">
          <tr><td><strong>Nombre</strong></td><td>${s}</td></tr>
        </table>
        <table class="header-info">
          <tr><td><strong>Fecha</strong></td><td>${i}</td></tr>
        </table>
      </div>

      <div class="section-title">BOLETA HONORARIOS</div>

      <table class="honorarios-table">
        <tr>
          <td class="label">Ventas de seguros</td>
          <td></td>
          <td class="amount">${A(t.total_honorarios)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label negativa">Negativa (x fuga)</td>
          <td class="amount negativa">${A(t.negativa_fuga)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label">Total Honorarios</td>
          <td class="amount">${A(t.total_honorarios)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label">${t.porcentaje_retencion}% Impto. Retenido</td>
          <td class="amount">${A(t.retencion_impuesto)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="total">Total Líquido</td>
          <td class="total amount">${A(t.total_liquido)}</td>
        </tr>
      </table>

      <div class="vendor-title">Tabla ${s}</div>

      <table class="honorarios-table" style="margin-bottom: 10px;">
        <tr>
          <td style="width: 200px;"><strong>${s}</strong></td>
          <td style="text-align: center;"><strong>Comisión en UF</strong></td>
          <td style="text-align: center;"><strong>Comisión en $</strong></td>
        </tr>
        <tr>
          <td><strong>${s}</strong></td>
          <td class="amount">${W(t.total_comision_uf)}</td>
          <td class="amount">${A(t.total_honorarios)}</td>
        </tr>
      </table>
  `;t.detallePolizas&&t.detallePolizas.length>0&&(n+=`
      <table class="detalle-table">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Año</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Ded</th>
            <th>Prima Compañía</th>
            <th>Prima Bruta Anual</th>
            <th>Anual en UF</th>
            <th>Prima Neta</th>
            <th>Prima Bruta Mensual</th>
            <th>Mensual en UF</th>
            <th>Comisión en UF</th>
            <th>Comisión en $</th>
          </tr>
        </thead>
        <tbody>
    `,t.detallePolizas.forEach((d,f)=>{const u=f%2===0?"":"pink-row";n+=`
        <tr class="${u}">
          <td>${d.mes}</td>
          <td>${d.anio}</td>
          <td>${d.categoria}</td>
          <td>${d.estado}</td>
          <td>${new Date(d.fecha).toLocaleDateString("es-CL")}</td>
          <td>${d.deducible}</td>
          <td>${A(d.prima_compania)}</td>
          <td>${A(d.prima_bruta_anual)}</td>
          <td>${W(d.anual_en_uf)}</td>
          <td>${A(d.prima_neta)}</td>
          <td>${A(d.prima_bruta_mensual)}</td>
          <td>${W(d.mensual_en_uf)}</td>
          <td>${W(d.comision_uf)}</td>
          <td>${A(d.comision_clp)}</td>
        </tr>
      `}),n+=`
          <tr class="total-row">
            <td colspan="12">Total general</td>
            <td>${W(t.total_comision_uf)}</td>
            <td>${A(t.total_honorarios)}</td>
          </tr>
        </tbody>
      </table>
    `),n+=`
    </body>
    </html>
  `;const o=document.createElement("iframe");o.style.position="fixed",o.style.right="0",o.style.bottom="0",o.style.width="0",o.style.height="0",o.style.border="none",document.body.appendChild(o);const a=o.contentWindow.document;a.open(),a.write(n),a.close(),o.contentWindow.focus(),setTimeout(()=>{o.contentWindow.print(),setTimeout(()=>{document.body.removeChild(o)},1e3)},500)}let ye=[],or=[],ar=0,Or=null;async function xn(){const t=document.getElementById("view-container");if(!t)return console.error("view-container not found"),"";const e=`
    <div class="view-header">
      <h1>Liquidaciones de Sueldos</h1>
      <button class="btn-primary" onclick="window.mostrarModalGenerarLiquidacion()">
        + Generar Liquidación
      </button>
    </div>

    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 32px;">
      <div style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;">
        <div style="flex: 0 0 auto;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1e293b; font-size: 13px;">Mes</label>
          <select id="filtroMes" onchange="window.filtrarLiquidaciones()" style="padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;">
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div style="flex: 0 0 auto;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1e293b; font-size: 13px;">Año</label>
          <select id="filtroAnio" onchange="window.filtrarLiquidaciones()" style="padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;">
            <option value="">Todos los años</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Valor UF Actual</div>
          <div class="stat-value" id="valorUFActual" style="font-size: 20px;">-</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e0e7ff;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="13" x2="8" y2="13"></line>
            <line x1="12" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Cantidad de Liquidaciones</div>
          <div class="stat-value" id="totalLiquidaciones" style="font-size: 20px;">0</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e0e7ff;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Total a Pagar</div>
          <div class="stat-value" id="totalAPagar" style="font-size: 20px;">$0</div>
        </div>
      </div>
    </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Período</th>
              <th>Comisión UF</th>
              <th>Comisión CLP</th>
              <th>Total Honorarios</th>
              <th>Retención</th>
              <th>Líquido a Pagar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="tableLiquidaciones">
            <tr>
              <td colspan="8" style="text-align: center; padding: 32px; color: #94a3b8;">
                Cargando liquidaciones...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div id="modalGenerarLiquidacion" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>Generar Liquidación</h2>
        <form id="formGenerarLiquidacion" onsubmit="window.handleGenerarLiquidacion(event)">
          <div class="form-group">
            <label for="vendedorSelect">Vendedor *</label>
            <select id="vendedorSelect" required>
              <option value="">Seleccione un vendedor</option>
            </select>
          </div>

          <div class="form-group">
            <label for="mesSelect">Mes *</label>
            <select id="mesSelect" required>
              <option value="">Seleccione el mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="anioSelect">Año *</label>
            <select id="anioSelect" required>
              <option value="">Seleccione el año</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div class="btn-group">
            <button type="button" class="btn-secondary" onclick="window.cerrarModalGenerarLiquidacion()">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              Generar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div id="modalDetalleLiquidacion" class="modal" style="display: none;">
      <div class="modal-content" style="max-width: 1200px; width: 95%; max-height: 90vh;">
        <h2>Detalle de Liquidación</h2>
        <div id="detalleContent" style="margin-top: 24px;">
        </div>
      </div>
    </div>
  `;t.innerHTML=e,await En()}async function En(){try{ar=await Ot(),document.getElementById("valorUFActual").textContent=A(ar),or=await we.getAll();const t=document.getElementById("vendedorSelect");t&&(t.innerHTML='<option value="">Seleccione un vendedor</option>',or.forEach(e=>{t.innerHTML+=`<option value="${e.id}">${e.nombre}</option>`})),await et()}catch(t){console.error("Error cargando datos:",t),alert("Error al cargar los datos")}}async function et(t=null,e=null){try{if(t===null&&e===null){const r=new Date;t=r.getMonth()+1,e=r.getFullYear(),document.getElementById("filtroMes").value=t,document.getElementById("filtroAnio").value=e}ye=await bn(t,e),kn(),Sn()}catch(r){console.error("Error cargando liquidaciones:",r)}}function kn(){const t=document.getElementById("tableLiquidaciones");if(!ye||ye.length===0){t.innerHTML=`
      <tr>
        <td colspan="8">
          <div class="empty-state" style="margin: 0; box-shadow: none; padding: 40px 20px;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <h3>No hay liquidaciones registradas</h3>
            <p>Comienza generando tu primera liquidación</p>
          </div>
        </td>
      </tr>
    `;return}t.innerHTML=ye.map(e=>{var i;const s=`${["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][e.periodo_mes-1]} ${e.periodo_anio}`;return`
      <tr>
        <td>${((i=e.vendedores)==null?void 0:i.nombre)||"N/A"}</td>
        <td>${s}</td>
        <td>${W(e.total_comision_uf)} UF</td>
        <td>${A(e.total_comision_clp)}</td>
        <td>${A(e.total_honorarios)}</td>
        <td>${A(e.retencion_impuesto)}</td>
        <td><strong>${A(e.total_liquido)}</strong></td>
        <td style="display: flex; gap: 8px;">
          <button class="btn-icon" onclick="window.verDetalleLiquidacion('${e.id}')" title="Ver Detalle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="btn-icon" onclick="window.descargarPDF('${e.id}')" title="Descargar PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </td>
      </tr>
    `}).join("")}function Sn(){const t=ye.length,e=ye.reduce((r,s)=>r+parseFloat(s.total_liquido||0),0);document.getElementById("totalLiquidaciones").textContent=t,document.getElementById("totalAPagar").textContent=A(e)}window.mostrarModalGenerarLiquidacion=function(){document.getElementById("modalGenerarLiquidacion").style.display="flex";const t=new Date().getMonth()+1,e=new Date().getFullYear();document.getElementById("mesSelect").value=t,document.getElementById("anioSelect").value=e};window.cerrarModalGenerarLiquidacion=function(){document.getElementById("modalGenerarLiquidacion").style.display="none",document.getElementById("formGenerarLiquidacion").reset()};window.handleGenerarLiquidacion=async function(t){t.preventDefault();const e=document.getElementById("vendedorSelect").value,r=parseInt(document.getElementById("mesSelect").value),s=parseInt(document.getElementById("anioSelect").value);if(!e||!r||!s){alert("Por favor complete todos los campos");return}try{const i=t.target.querySelector('button[type="submit"]');i.disabled=!0,i.textContent="Generando...",await yn(e,r,s),alert("Liquidación generada exitosamente"),window.cerrarModalGenerarLiquidacion(),await et()}catch(i){console.error("Error generando liquidación:",i),alert("Error al generar la liquidación: "+i.message)}finally{const i=t.target.querySelector('button[type="submit"]');i&&(i.disabled=!1,i.textContent="Generar")}};window.filtrarLiquidaciones=async function(){const t=document.getElementById("filtroMes").value,e=document.getElementById("filtroAnio").value;await et(t?parseInt(t):null,e?parseInt(e):null)};window.verDetalleLiquidacion=async function(t){var e,r,s,i;try{const n=await Cr(t);Or=n;const o=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],a=document.getElementById("detalleContent");let l=`
      <div style="padding: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
          <div>
            <strong>Vendedor:</strong> ${((e=n.vendedores)==null?void 0:e.nombre)||"N/A"}<br>
            <strong>Período:</strong> ${o[n.periodo_mes-1]} ${n.periodo_anio}
          </div>
          <div>
            <strong>Valor UF:</strong> ${A(n.valor_uf)}<br>
            <strong>Fecha Generación:</strong> ${new Date(n.created_at).toLocaleDateString("es-CL")}
          </div>
        </div>

        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">BOLETA HONORARIOS</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">Ventas de seguros</td>
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${A(n.total_comision_clp)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #dc2626;">Negativa (x fuga)</td>
            <td style="padding: 12px 16px; text-align: right; color: #dc2626;">${A(n.negativa_fuga)}</td>
          </tr>
          <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">Total Honorarios</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${A(n.total_honorarios)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">${n.porcentaje_retencion}% Impto. Retenido</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${A(n.retencion_impuesto)}</td>
          </tr>
          <tr style="background: #6366f1; color: white; font-weight: 600;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px;">Total Líquido</td>
            <td style="padding: 12px 16px; text-align: right;">${A(n.total_liquido)}</td>
          </tr>
        </table>

        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Tabla ${((r=n.vendedores)==null?void 0:r.nombre)||"Vendedor"}</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr style="background: #1e293b; color: white;">
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600;">${((s=n.vendedores)==null?void 0:s.nombre)||"Vendedor"}</th>
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">Comisión en UF</th>
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">Comisión en $</th>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">${((i=n.vendedores)==null?void 0:i.nombre)||"Vendedor"}</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${W(n.total_comision_uf)}</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${A(n.total_honorarios)}</td>
          </tr>
        </table>
    `;n.detallePolizas&&n.detallePolizas.length>0&&(l+=`
        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Detalle de Pólizas</h3>
        </div>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="background: #1e293b; color: white;">
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Mes</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Año</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Categoría</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Estado</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Fecha</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Aseguradora</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Prima Bruta Anual</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Anual en UF</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Comisión $</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Comisión UF</th>
              </tr>
            </thead>
            <tbody>
      `,n.detallePolizas.forEach((c,d)=>{const f=d%2===0?"#ffffff":"#f8fafc";l+=`
          <tr style="background: ${f}; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 12px; text-align: center; font-size: 13px;">${c.mes}</td>
            <td style="padding: 10px 12px; text-align: center; font-size: 13px;">${c.anio}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${c.categoria}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${c.estado}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${new Date(c.fecha).toLocaleDateString("es-CL")}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${c.aseguradora}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${A(c.prima_bruta_anual)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${W(c.anual_en_uf)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${A(c.comision_clp)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${W(c.comision_uf)}</td>
          </tr>
        `}),l+=`
              <tr style="background: #6366f1; color: white; font-weight: 600;">
                <td colspan="8" style="padding: 12px 16px; text-align: right;">Total general</td>
                <td style="padding: 12px 16px; text-align: right;">${A(n.total_honorarios)}</td>
                <td style="padding: 12px 16px; text-align: right;">${W(n.total_comision_uf)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `),l+=`
        <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end;">
          <button class="btn-secondary" onclick="window.cerrarModalDetalleLiquidacion()">
            Cerrar
          </button>
          <button class="btn-primary" onclick="window.descargarPDF('${n.id}')">
            Descargar PDF
          </button>
        </div>
      </div>
    `,a.innerHTML=l,document.getElementById("modalDetalleLiquidacion").style.display="flex"}catch(n){console.error("Error cargando detalle:",n),alert("Error al cargar el detalle de la liquidación")}};window.cerrarModalDetalleLiquidacion=function(){document.getElementById("modalDetalleLiquidacion").style.display="none",Or=null};window.descargarPDF=async function(t){try{const e=await Cr(t);_n(e)}catch(e){console.error("Error generando PDF:",e),alert("Error al generar el PDF")}};window.eliminarLiquidacionHandler=async function(t){if(confirm("¿Está seguro de eliminar esta liquidación?"))try{await wn(t),alert("Liquidación eliminada exitosamente"),await et()}catch(e){console.error("Error eliminando liquidación:",e),alert("Error al eliminar la liquidación")}};let Te=null,ie=[],F=[],B=[],$n=[],ee={total:0,count:0},H="home";async function Tn(){try{if(Te=await ne.getCurrentUser(),!Te)throw new Error("No se pudo obtener el usuario actual");const t=await ne.getUserProfile(Te.id);return ie=await be.getAll(),F=await De.getAll(),B=await we.getAll(),$n=await hn.getAll(),ee=await be.getStats(),`
      <div class="app-layout">
        <aside class="sidebar">
          <div class="sidebar-header">
            <img src="/logo-blanco-sin-fondo.png" alt="Seguros LIVE" />
          </div>
          <nav class="sidebar-nav">
            <a href="#" class="nav-item ${H==="home"?"active":""}" data-view="home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </a>
            <a href="#" class="nav-item ${H==="polizas"?"active":""}" data-view="polizas">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Pólizas
            </a>
            ${(t==null?void 0:t.cargo)==="Admin"?`
            <a href="#" class="nav-item ${H==="companias"?"active":""}" data-view="companias">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Compañías
            </a>
            <a href="#" class="nav-item ${H==="vendedores"?"active":""}" data-view="vendedores">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Ejecutivos
            </a>
            `:""}
            <a href="#" class="nav-item ${H==="reportes"?"active":""}" data-view="reportes">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"></path>
                <path d="M18 17V9"></path>
                <path d="M13 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg>
              Reportes
            </a>
            <a href="#" class="nav-item ${H==="liquidaciones"?"active":""}" data-view="liquidaciones">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Liquidaciones
            </a>
            ${(t==null?void 0:t.rol)==="admin"?`
              <a href="#" class="nav-item ${H==="usuarios"?"active":""}" data-view="usuarios">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Usuarios
              </a>
            `:""}
          </nav>
          <div class="sidebar-footer">
            <div class="user-info">
              <span>${(t==null?void 0:t.nombre)||Te.email}</span>
            </div>
            <button class="btn-logout" id="logout-btn">Cerrar Sesión</button>
          </div>
        </aside>

        <main class="main-content">
          <div id="view-container"></div>
        </main>

        <div class="container" style="display: none;">
          <div class="dashboard-grid">
            <div class="card">
              <h2>Total de Pólizas</h2>
              <div class="stat-value">${ee.count}</div>
              <div class="stat-label">Pólizas registradas</div>
            </div>

            <div class="card">
              <h2>Monto Total</h2>
              <div class="stat-value">$${ee.total.toLocaleString("es-CL")}</div>
              <div class="stat-label">Suma de todas las pólizas</div>
            </div>

            <div class="card">
              <h2>Promedio</h2>
              <div class="stat-value">$${ee.count>0?(ee.total/ee.count).toLocaleString("es-CL",{maximumFractionDigits:0}):0}</div>
              <div class="stat-label">Por póliza</div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Configuración</h2>
              <div style="display: flex; gap: 10px;">
                <button class="btn-secondary" id="manage-aseguradoras-btn">Aseguradoras</button>
                <button class="btn-secondary" id="manage-vendedores-btn">Vendedores</button>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h3 style="margin-bottom: 10px;">Aseguradoras (${F.length})</h3>
                ${F.length===0?'<p style="color: #888;">No hay aseguradoras configuradas</p>':`
                  <div style="font-size: 14px;">
                    ${F.slice(0,3).map(e=>`
                      <div style="padding: 8px; border-bottom: 1px solid #eee;">
                        ${e.nombre} - ${e.comision_porcentaje}%
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
              <div>
                <h3 style="margin-bottom: 10px;">Vendedores (${B.length})</h3>
                ${B.length===0?'<p style="color: #888;">No hay vendedores configurados</p>':`
                  <div style="font-size: 14px;">
                    ${B.slice(0,3).map(e=>`
                      <div style="padding: 8px; border-bottom: 1px solid #eee;">
                        ${e.nombre} - ${e.tipo_comision==="prima_bruta_mensual"?"Prima Bruta Mensual":e.comision_porcentaje+"%"}
                      </div>
                    `).join("")}
                  </div>
                `}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Pólizas Recientes</h2>
              <button class="btn-primary" id="new-poliza-btn">+ Nueva Póliza</button>
            </div>

            ${ie.length===0?`
              <p style="text-align: center; color: #888; padding: 40px;">
                No hay pólizas registradas. ¡Crea tu primera póliza!
              </p>
            `:`
              <div style="overflow-x: auto;">
                <table class="table" style="min-width: 1200px;">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Ejecutivo</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th>Asegurado</th>
                      <th>N° Póliza</th>
                      <th>Compañía</th>
                      <th>Prima Bruta UF</th>
                      <th>Prima Neta UF</th>
                      <th>Com. Total UF</th>
                      <th>Com. Vendedor UF</th>
                      <th>Utilidad LIVE</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ie.map(e=>{var r;return`
                      <tr>
                        <td>${new Date(e.fecha).toLocaleDateString("es-CL")}</td>
                        <td>${e.ejecutivo_venta||"-"}</td>
                        <td>${e.categoria||"-"}</td>
                        <td><span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${e.estado==="Vigente"?"#d4edda":e.estado==="Pendiente"?"#fff3cd":"#f8d7da"}; color: ${e.estado==="Vigente"?"#155724":e.estado==="Pendiente"?"#856404":"#721c24"};">${e.estado||"-"}</span></td>
                        <td>${e.nombre_asegurado}</td>
                        <td>${e.numero_poliza}</td>
                        <td>${((r=e.aseguradora)==null?void 0:r.nombre)||"-"}</td>
                        <td>${parseFloat(e.prima_bruta_anual_uf||0).toFixed(2)}</td>
                        <td>${parseFloat(e.prima_neta_anual_uf||0).toFixed(2)}</td>
                        <td>${parseFloat(e.comision_neta_uf||0).toFixed(2)}</td>
                        <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(e.comision_vendedor_uf||0).toFixed(2)}</td>
                        <td style="font-weight: 600; color: #28a745;">${parseFloat(e.utilidad_live||0).toFixed(2)}</td>
                        <td>
                          <button class="btn-secondary" onclick="window.editPoliza('${e.id}')">Editar</button>
                          <button class="btn-secondary" onclick="window.deletePoliza('${e.id}')" style="color: #c33;">Eliminar</button>
                        </td>
                      </tr>
                    `}).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
        <div id="modal-container"></div>
      </div>
    `}catch(t){return console.error("Error loading dashboard:",t),`
      <div class="container" style="padding: 40px; text-align: center;">
        <div style="background: #fee; border: 1px solid #fcc; border-radius: 8px; padding: 24px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c33; margin-bottom: 16px;">Error al cargar el dashboard</h2>
          <p style="color: #666; margin-bottom: 16px;">${t.message}</p>
          <p style="color: #999; font-size: 14px;">Por favor, verifica tu conexión y configuración.</p>
          <button onclick="location.reload()" class="btn-primary" style="margin-top: 16px;">Reintentar</button>
        </div>
      </div>
    `}}function An(t){const e=document.getElementById("logout-btn"),r=document.querySelectorAll(".nav-item");e&&e.addEventListener("click",async()=>{await ne.signOut(),t("/login")}),r.forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const n=s.getAttribute("data-view");lr(n)})}),lr(H),window.editPoliza=s=>{const i=ie.find(n=>n.id===s);i&&St(i)}}async function lr(t){const e=await ne.getUserProfile(Te.id);if((t==="companias"||t==="vendedores")&&(e==null?void 0:e.cargo)!=="Admin"){H="home";const s=document.getElementById("view-container");s.innerHTML=await ir();return}H=t,document.querySelectorAll(".nav-item").forEach(s=>{s.classList.remove("active"),s.getAttribute("data-view")===t&&s.classList.add("active")});const r=document.getElementById("view-container");switch(t){case"home":r.innerHTML=await ir();break;case"polizas":r.innerHTML=Cn(),Pn();break;case"companias":r.innerHTML=On(),Rn();break;case"vendedores":r.innerHTML=In(),jn();break;case"reportes":r.innerHTML=await pn(),mn();break;case"liquidaciones":await xn();break;case"usuarios":r.innerHTML=await xt(),kt();break}}function Cn(){return`
    <div class="view-header">
      <h1>Gestión de Pólizas</h1>
      <div style="display: flex; gap: 10px;">
        <button class="btn-secondary" id="import-csv-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Importar CSV
        </button>
        <button class="btn-primary" id="new-poliza-btn">+ Nueva Póliza</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e3f2fd;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Total Pólizas</div>
          <div class="stat-value">${ee.count}</div>
        </div>
      </div>
    </div>

    ${ie.length===0?`
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <h3>No hay pólizas registradas</h3>
        <p>Comienza creando tu primera póliza</p>
        <button class="btn-primary" onclick="document.getElementById('new-poliza-btn').click()">+ Nueva Póliza</button>
      </div>
    `:`
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ejecutivo</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Asegurado</th>
              <th>N° Póliza</th>
              <th>Compañía</th>
              <th>Prima Bruta UF</th>
              <th>Prima Neta UF</th>
              <th>Com. Total UF</th>
              <th>Com. Vendedor UF</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${ie.map(t=>{var e;return`
              <tr>
                <td>${new Date(t.fecha).toLocaleDateString("es-CL")}</td>
                <td>${t.ejecutivo_venta||"-"}</td>
                <td>${t.categoria||"-"}</td>
                <td><span class="badge badge-${t.estado==="Vigente"?"success":t.estado==="Pendiente"?"warning":"danger"}">${t.estado||"-"}</span></td>
                <td>${t.nombre_asegurado}</td>
                <td>${t.numero_poliza}</td>
                <td>${((e=t.aseguradora)==null?void 0:e.nombre)||"-"}</td>
                <td>${parseFloat(t.prima_bruta_anual_uf||0).toFixed(2)}</td>
                <td>${parseFloat(t.prima_neta_anual_uf||0).toFixed(2)}</td>
                <td>${parseFloat(t.comision_neta_uf||0).toFixed(2)}</td>
                <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(t.comision_vendedor_uf||0).toFixed(2)}</td>
                <td>
                  <button class="btn-icon" onclick="window.editPoliza('${t.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deletePoliza('${t.id}')" title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `}).join("")}
          </tbody>
        </table>
      </div>
    `}
  `}function On(){return`
    <div class="view-header">
      <h1>Gestión de Compañías</h1>
      <button class="btn-primary" id="new-aseguradora-btn">+ Nueva Compañía</button>
    </div>

    ${F.length===0?`
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
        <h3>No hay compañías registradas</h3>
        <p>Agrega tu primera compañía aseguradora</p>
      </div>
    `:`
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>% Comisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${F.map(t=>`
              <tr>
                <td><strong>${t.nombre}</strong></td>
                <td>${t.comision_porcentaje}%</td>
                <td>
                  <button class="btn-icon" onclick="window.editAseguradora('${t.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deleteAseguradora('${t.id}')" title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}
  `}function In(){return`
    <div class="view-header">
      <h1>Gestión de Ejecutivos</h1>
      <button class="btn-primary" id="new-vendedor-btn">+ Nuevo Ejecutivo</button>
    </div>

    ${B.length===0?`
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
        <h3>No hay ejecutivos registrados</h3>
        <p>Agrega tu primer ejecutivo</p>
      </div>
    `:`
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Comisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${B.map(t=>`
              <tr>
                <td><strong>${t.nombre}</strong></td>
                <td>${t.tipo_comision==="prima_bruta_mensual"?"Prima Bruta Mensual":"Porcentaje"}</td>
                <td>${t.tipo_comision==="prima_bruta_mensual"?"Prima Bruta Mensual":t.comision_porcentaje+"%"}</td>
                <td>
                  <button class="btn-icon" onclick="window.editVendedor('${t.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deleteVendedor('${t.id}')" title="Inactivar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <line x1="9" y1="10" x2="15" y2="10"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}
  `}function Pn(){const t=document.getElementById("new-poliza-btn"),e=document.getElementById("import-csv-btn");t&&t.addEventListener("click",()=>{St()}),e&&e.addEventListener("click",()=>{Ln()}),window.editPoliza=r=>{const s=ie.find(i=>i.id===r);s&&St(s)},window.deletePoliza=async r=>{if(confirm("¿Estás seguro de eliminar esta póliza?"))try{await be.delete(r),window.location.reload()}catch(s){alert("Error al eliminar la póliza: "+s.message)}}}function Rn(){const t=document.getElementById("new-aseguradora-btn");t&&t.addEventListener("click",()=>{cr()}),window.editAseguradora=e=>{const r=F.find(s=>s.id===e);r&&cr(r)},window.deleteAseguradora=async e=>{if(confirm("¿Eliminar esta compañía?"))try{await De.delete(e),window.location.reload()}catch(r){alert("Error: "+r.message)}}}function jn(){const t=document.getElementById("new-vendedor-btn");t&&t.addEventListener("click",()=>{dr()}),window.editVendedor=e=>{const r=B.find(s=>s.id===e);r&&dr(r)},window.deleteVendedor=async e=>{if(confirm("¿Inactivar este ejecutivo?"))try{await we.delete(e),window.location.reload()}catch(r){alert("Error: "+r.message)}}}function St(t=null){const e=!!t,r=document.getElementById("modal-container");if(!e&&F.length===0){alert(`Debe registrar al menos una compañía aseguradora antes de crear una póliza.

Vaya a la sección "Compañías" para agregar una.`);return}r.innerHTML=`
    <div class="modal">
      <div class="modal-content" style="max-width: 900px;">
        <h2>${e?"Editar Póliza":"Nueva Póliza"}</h2>
        <form id="poliza-form" class="excel-form">
          <div class="form-section">
            <h3>Datos de la Póliza</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" value="${t!=null&&t.fecha?new Date(t.fecha).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}" required />
              </div>
              <div class="form-group">
                <label for="ejecutivo_venta">Ejecutivo de Venta *</label>
                <select id="ejecutivo_venta" required>
                  <option value="">Seleccionar ejecutivo</option>
                  ${B.length===0?'<option value="" disabled>No hay ejecutivos registrados</option>':""}
                  ${B.map(x=>`
                    <option value="${x.nombre}" ${(t==null?void 0:t.ejecutivo_venta)===x.nombre?"selected":""}>
                      ${x.nombre}
                    </option>
                  `).join("")}
                </select>
                ${B.length===0?'<small style="color: #dc2626;">Primero debe agregar ejecutivos en la sección Ejecutivos</small>':""}
              </div>
              <div class="form-group">
                <label for="categoria">Categoría *</label>
                <select id="categoria" required>
                  <option value="">Seleccionar categoría</option>
                  <option value="Automotriz" ${(t==null?void 0:t.categoria)==="Automotriz"?"selected":""}>Automotriz</option>
                  <option value="Salud" ${(t==null?void 0:t.categoria)==="Salud"?"selected":""}>Salud</option>
                  <option value="Vida" ${(t==null?void 0:t.categoria)==="Vida"?"selected":""}>Vida</option>
                  <option value="Hogar" ${(t==null?void 0:t.categoria)==="Hogar"?"selected":""}>Hogar</option>
                </select>
              </div>
              <div class="form-group">
                <label for="estado">Estado *</label>
                <select id="estado" required>
                  <option value="">Seleccionar estado</option>
                  <option value="Vigente" ${(t==null?void 0:t.estado)==="Vigente"?"selected":""}>Vigente</option>
                  <option value="Pendiente" ${(t==null?void 0:t.estado)==="Pendiente"?"selected":""}>Pendiente</option>
                  <option value="Anulada" ${(t==null?void 0:t.estado)==="Anulada"?"selected":""}>Anulada</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos del Asegurado</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="nombre_asegurado">Nombre Completo *</label>
                <input type="text" id="nombre_asegurado" value="${(t==null?void 0:t.nombre_asegurado)||""}" required />
              </div>
              <div class="form-group">
                <label for="rut_asegurado">RUT</label>
                <input type="text" id="rut_asegurado" value="${(t==null?void 0:t.rut_asegurado)||""}" placeholder="12.345.678-9" />
              </div>
              <div class="form-group">
                <label for="email_asegurado">Email</label>
                <input type="email" id="email_asegurado" value="${(t==null?void 0:t.email_asegurado)||""}" placeholder="correo@ejemplo.com" />
              </div>
              <div class="form-group">
                <label for="telefono_asegurado">Teléfono</label>
                <input type="tel" id="telefono_asegurado" value="${(t==null?void 0:t.telefono_asegurado)||""}" placeholder="+56 9 1234 5678" />
              </div>
              <div class="form-group">
                <label for="direccion_asegurado">Dirección</label>
                <input type="text" id="direccion_asegurado" value="${(t==null?void 0:t.direccion_asegurado)||""}" />
              </div>
              <div class="form-group">
                <label for="comuna_asegurado">Comuna</label>
                <input type="text" id="comuna_asegurado" value="${(t==null?void 0:t.comuna_asegurado)||""}" placeholder="Santiago, Providencia, etc." />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos del Vehículo</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="patente">Patente</label>
                <input type="text" id="patente" value="${(t==null?void 0:t.patente)||""}" placeholder="ABCD12" />
              </div>
              <div class="form-group">
                <label for="marca">Marca</label>
                <input type="text" id="marca" value="${(t==null?void 0:t.marca)||""}" placeholder="Toyota, Chevrolet, etc." />
              </div>
              <div class="form-group">
                <label for="modelo">Modelo</label>
                <input type="text" id="modelo" value="${(t==null?void 0:t.modelo)||""}" placeholder="Corolla, Cruze, etc." />
              </div>
              <div class="form-group">
                <label for="ano">Año</label>
                <input type="number" id="ano" value="${(t==null?void 0:t.ano)||""}" placeholder="2024" min="1900" max="2100" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos de la Póliza y Compañía</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="numero_poliza">N° Póliza *</label>
                <input type="text" id="numero_poliza" value="${(t==null?void 0:t.numero_poliza)||""}" required />
              </div>
              <div class="form-group">
                <label for="aseguradora_id">Compañía *</label>
                <select id="aseguradora_id" required>
                  <option value="">Seleccionar compañía</option>
                  ${F.length===0?'<option value="" disabled>No hay compañías registradas</option>':""}
                  ${F.map(x=>`
                    <option value="${x.id}" data-comision="${x.comision_porcentaje}" ${(t==null?void 0:t.aseguradora_id)===x.id?"selected":""}>
                      ${x.nombre} (${x.comision_porcentaje}%)
                    </option>
                  `).join("")}
                </select>
                ${F.length===0?'<small style="color: #dc2626;">Primero debe agregar compañías en la sección Compañías</small>':""}
              </div>
              <div class="form-group">
                <label for="deducible">Deducible</label>
                <input type="number" id="deducible" step="1" value="${(t==null?void 0:t.deducible)||0}" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Valores Primas (ingrese Bruta o Neta, se calcula automático)</h3>
            <div class="form-grid-3">
              <div class="form-group">
                <label for="prima_bruta_anual_uf">Prima Bruta Anual UF</label>
                <input type="number" id="prima_bruta_anual_uf" step="0.01" value="${(t==null?void 0:t.prima_bruta_anual_uf)||""}" />
              </div>
              <div class="form-group">
                <label for="prima_neta_anual_uf">Prima Neta Anual UF</label>
                <input type="number" id="prima_neta_anual_uf" step="0.01" value="${(t==null?void 0:t.prima_neta_anual_uf)||""}" />
              </div>
              <div class="form-group">
                <label for="prima_bruta_mensual_uf">Prima Bruta Mensual UF</label>
                <input type="number" id="prima_bruta_mensual_uf" step="0.01" value="${(t==null?void 0:t.prima_bruta_mensual_uf)||""}" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="prima_neta_mensual_uf">Prima Neta Mensual UF</label>
                <input type="number" id="prima_neta_mensual_uf" step="0.01" value="${(t==null?void 0:t.prima_neta_mensual_uf)||""}" readonly class="readonly-field" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Comisiones (calculadas automáticamente)</h3>
            <div class="form-grid-3">
              <div class="form-group">
                <label for="porcentaje_aseguradora">% Comisión Aseguradora</label>
                <input type="number" id="porcentaje_aseguradora" step="0.01" value="" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="comision_neta_uf">Comisión Total UF</label>
                <input type="number" id="comision_neta_uf" step="0.01" value="${(t==null?void 0:t.comision_neta_uf)||""}" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="porcentaje_vendedor">% Comisión Vendedor</label>
                <input type="number" id="porcentaje_vendedor" step="0.01" value="" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="comision_vendedor_uf">Comisión Vendedor UF</label>
                <input type="number" id="comision_vendedor_uf" step="0.01" value="${(t==null?void 0:t.comision_vendedor_uf)||""}" readonly class="readonly-field" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Observaciones</h3>
            <div class="form-group">
              <label for="observaciones">Notas adicionales</label>
              <textarea id="observaciones" rows="3" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;">${(t==null?void 0:t.observaciones)||""}</textarea>
            </div>
          </div>

          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-modal-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${e?"Actualizar":"Crear"}</button>
          </div>
        </form>
      </div>
    </div>
  `;const s=document.getElementById("poliza-form"),i=document.getElementById("cancel-modal-btn"),n=document.getElementById("prima_bruta_anual_uf"),o=document.getElementById("prima_neta_anual_uf"),a=document.getElementById("prima_bruta_mensual_uf"),l=document.getElementById("prima_neta_mensual_uf"),c=document.getElementById("aseguradora_id"),d=document.getElementById("ejecutivo_venta"),f=document.getElementById("porcentaje_aseguradora"),u=document.getElementById("comision_neta_uf"),h=document.getElementById("porcentaje_vendedor"),p=document.getElementById("comision_vendedor_uf");function g(){const x=parseFloat(n.value)||0;x>0?o.value=(x/1.19).toFixed(2):o.value="",v(),y()}function m(){const x=parseFloat(o.value)||0;x>0?n.value=(x*1.19).toFixed(2):n.value="",v(),y()}function v(){const x=parseFloat(n.value)||0,$=parseFloat(o.value)||0;a.value=x>0?(x/12).toFixed(2):"",l.value=$>0?($/12).toFixed(2):""}function w(){const x=c.value,$=F.find(O=>O.id===x);$?f.value=parseFloat($.comision_porcentaje||0).toFixed(2):f.value="",y()}function y(){const x=parseFloat(o.value)||0,$=parseFloat(f.value)||0;x>0&&$>0?u.value=(x*$/100).toFixed(2):u.value="",T()}function b(){const x=d.value,$=B.find(O=>O.nombre===x);$?$.tipo_comision==="prima_bruta_mensual"?(h.value="Prima Bruta Mensual",h.readOnly=!0):(h.value=parseFloat($.comision_porcentaje||0).toFixed(2),h.readOnly=!1):(h.value="",h.readOnly=!1),T()}function T(){const x=d.value,$=B.find(O=>O.nombre===x);if(!$){p.value="";return}if($.tipo_comision==="prima_bruta_mensual"){const O=parseFloat(a.value)||0;p.value=O>0?O.toFixed(2):""}else{const O=parseFloat(u.value)||0,U=parseFloat(h.value)||0;O>0&&U>0?p.value=(O*U/100).toFixed(2):p.value=""}}n.addEventListener("input",g),o.addEventListener("input",m),c.addEventListener("change",w),d.addEventListener("change",b),v(),w(),b(),i.addEventListener("click",()=>{r.innerHTML=""}),s.addEventListener("submit",async x=>{x.preventDefault();const $=document.getElementById("aseguradora_id").value,O=parseFloat(n.value)||0,U=parseFloat(o.value)||0;if(!$){alert("Debe seleccionar una compañía aseguradora."),document.getElementById("aseguradora_id").focus();return}if(O===0&&U===0){alert("Debe ingresar al menos la Prima Bruta o Prima Neta."),n.focus();return}const It=document.getElementById("ejecutivo_venta").value,tt=B.find(rt=>rt.nombre===It),Pt={fecha:document.getElementById("fecha").value,ejecutivo_venta:It,vendedor_id:(tt==null?void 0:tt.id)||null,categoria:document.getElementById("categoria").value,estado:document.getElementById("estado").value,numero_poliza:document.getElementById("numero_poliza").value,nombre_asegurado:document.getElementById("nombre_asegurado").value,rut_asegurado:document.getElementById("rut_asegurado").value,email_asegurado:document.getElementById("email_asegurado").value,telefono_asegurado:document.getElementById("telefono_asegurado").value,direccion_asegurado:document.getElementById("direccion_asegurado").value,comuna_asegurado:document.getElementById("comuna_asegurado").value,patente:document.getElementById("patente").value,marca:document.getElementById("marca").value,modelo:document.getElementById("modelo").value,ano:document.getElementById("ano").value?parseInt(document.getElementById("ano").value):null,aseguradora_id:$,deducible:parseFloat(document.getElementById("deducible").value)||0,prima_bruta_anual_uf:parseFloat(n.value)||0,prima_neta_anual_uf:parseFloat(o.value)||0,prima_bruta_mensual_uf:parseFloat(a.value)||0,prima_neta_mensual_uf:parseFloat(l.value)||0,comision_neta_uf:parseFloat(u.value)||0,comision_vendedor_uf:parseFloat(p.value)||0,observaciones:document.getElementById("observaciones").value,monto:parseFloat(o.value)||0};try{e?await be.update(t.id,Pt):await be.create(Pt),r.innerHTML="",window.location.reload()}catch(rt){alert("Error: "+rt.message)}})}function Ln(){const t=document.getElementById("modal-container");t.innerHTML=`
    <div class="modal">
      <div class="modal-content" style="max-width: 600px;">
        <h2>Importar Vehículos desde CSV</h2>

        <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0; color: #0369a1; font-size: 14px;">Formato del archivo</h3>
          <p style="margin: 0 0 12px 0; color: #0c4a6e; font-size: 13px;">
            El archivo debe ser CSV con valores separados por comas (,)
          </p>
          <div style="background: white; border: 1px solid #bae6fd; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px;">
            <div style="color: #64748b; margin-bottom: 4px;">Ejemplo:</div>
            <div style="color: #0f172a;">ASTON MARTIN,DB11,2018</div>
            <div style="color: #0f172a;">BMW,430I,2019</div>
            <div style="color: #0f172a;">AUDI,A5,2023</div>
          </div>
          <p style="margin: 12px 0 0 0; color: #0c4a6e; font-size: 12px;">
            <strong>Columnas:</strong> MARCA, MODELO, AÑO
          </p>
        </div>

        <div style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 32px; text-align: center; background: #f8fafc; margin-bottom: 20px;">
          <input type="file" id="csv-file-input" accept=".csv,.txt" style="display: none;" />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="margin: 0 auto 12px;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <div style="margin-bottom: 8px; color: #475569; font-weight: 500;">
            Selecciona un archivo CSV
          </div>
          <button type="button" class="btn-primary" id="select-file-btn">Elegir archivo</button>
          <div id="file-name-display" style="margin-top: 12px; color: #64748b; font-size: 14px;"></div>
        </div>

        <div id="import-progress" style="display: none; margin-bottom: 20px;">
          <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
            <div style="font-size: 14px; color: #334155; margin-bottom: 8px;">Procesando...</div>
            <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progress-bar" style="background: #3b82f6; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progress-text" style="font-size: 12px; color: #64748b; margin-top: 8px;"></div>
          </div>
        </div>

        <div id="import-result" style="display: none; margin-bottom: 20px;"></div>

        <div class="btn-group">
          <button type="button" class="btn-secondary" id="cancel-import-btn">Cancelar</button>
          <button type="button" class="btn-primary" id="process-import-btn" disabled>Importar</button>
        </div>
      </div>
    </div>
  `;const e=document.getElementById("csv-file-input"),r=document.getElementById("select-file-btn"),s=document.getElementById("file-name-display"),i=document.getElementById("process-import-btn"),n=document.getElementById("cancel-import-btn"),o=document.getElementById("import-progress"),a=document.getElementById("import-result");let l=null;r.addEventListener("click",()=>{e.click()}),e.addEventListener("change",c=>{const d=c.target.files[0];d&&(l=d,s.innerHTML=`
        <div style="display: inline-flex; align-items: center; gap: 8px; background: #f0f9ff; padding: 8px 12px; border-radius: 6px; border: 1px solid #0ea5e9;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <span style="color: #0c4a6e; font-weight: 500;">${d.name}</span>
          <span style="color: #64748b; font-size: 12px;">(${(d.size/1024).toFixed(1)} KB)</span>
        </div>
      `,i.disabled=!1)}),i.addEventListener("click",async()=>{if(l)try{i.disabled=!0,r.disabled=!0,o.style.display="block",a.style.display="none";const c=document.getElementById("progress-bar"),d=document.getElementById("progress-text");c.style.width="30%",d.textContent="Leyendo archivo...";const f=await l.text();c.style.width="60%",d.textContent="Procesando registros...";const u=await fn.processCSV(f);c.style.width="100%",d.textContent="Completado",setTimeout(()=>{o.style.display="none",a.style.display="block";const h=u.errors.length>0,p=(u.success/u.total*100).toFixed(0);a.innerHTML=`
          <div style="background: ${u.success>0?"#f0fdf4":"#fef2f2"}; border: 1px solid ${u.success>0?"#22c55e":"#ef4444"}; border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${u.success>0?"#22c55e":"#ef4444"}" stroke-width="2">
                ${u.success>0?'<polyline points="20 6 9 17 4 12"></polyline>':'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
              </svg>
              <div>
                <div style="font-weight: 600; color: ${u.success>0?"#166534":"#991b1b"}; font-size: 16px;">
                  ${u.success>0?"Importación completada":"Error en la importación"}
                </div>
                <div style="color: ${u.success>0?"#15803d":"#b91c1c"}; font-size: 14px; margin-top: 4px;">
                  ${u.success} de ${u.total} registros importados (${p}%)
                </div>
              </div>
            </div>

            ${h?`
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid ${u.success>0?"#bbf7d0":"#fecaca"};">
                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Errores encontrados (${u.errors.length}):</div>
                <div style="max-height: 200px; overflow-y: auto; background: white; border: 1px solid #fecaca; border-radius: 4px; padding: 8px;">
                  ${u.errors.slice(0,10).map(g=>`
                    <div style="padding: 8px; border-bottom: 1px solid #fee2e2; font-size: 12px;">
                      <div style="color: #991b1b; font-weight: 500;">Línea ${g.line}: ${g.error}</div>
                      <div style="color: #64748b; font-family: monospace; margin-top: 4px;">${g.content}</div>
                    </div>
                  `).join("")}
                  ${u.errors.length>10?`<div style="padding: 8px; color: #64748b; font-size: 12px;">... y ${u.errors.length-10} errores más</div>`:""}
                </div>
              </div>
            `:""}
          </div>
        `,u.success>0&&setTimeout(()=>{window.location.reload()},2e3)},500)}catch(c){o.style.display="none",a.style.display="block",a.innerHTML=`
        <div style="background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <div style="font-weight: 600; color: #991b1b;">Error al procesar el archivo</div>
              <div style="color: #b91c1c; font-size: 14px; margin-top: 4px;">${c.message}</div>
            </div>
          </div>
        </div>
      `,i.disabled=!1,r.disabled=!1}}),n.addEventListener("click",()=>{t.innerHTML=""})}function cr(t=null){const e=!!t,r=document.getElementById("modal-container");r.innerHTML=`
    <div class="modal">
      <div class="modal-content">
        <h2>${e?"Editar Compañía":"Nueva Compañía"}</h2>
        <form id="edit-aseguradora-form">
          <div class="form-group">
            <label for="edit_aseg_nombre">Nombre</label>
            <input type="text" id="edit_aseg_nombre" value="${(t==null?void 0:t.nombre)||""}" required />
          </div>
          <div class="form-group">
            <label for="edit_aseg_comision">% Comisión</label>
            <input type="number" id="edit_aseg_comision" step="0.01" min="0" max="100" value="${(t==null?void 0:t.comision_porcentaje)||""}" required />
          </div>
          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-edit-aseg-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${e?"Actualizar":"Crear"}</button>
          </div>
        </form>
      </div>
    </div>
  `;const s=document.getElementById("edit-aseguradora-form");document.getElementById("cancel-edit-aseg-btn").addEventListener("click",()=>{r.innerHTML=""}),s.addEventListener("submit",async n=>{n.preventDefault();const o=document.getElementById("edit_aseg_nombre").value.trim(),a=parseFloat(document.getElementById("edit_aseg_comision").value);if(!o){alert("El nombre es requerido");return}try{e?await De.update(t.id,{nombre:o,comision_porcentaje:a}):await De.create({nombre:o,comision_porcentaje:a}),window.location.reload()}catch(l){alert("Error: "+l.message)}})}function dr(t=null){const e=!!t,r=document.getElementById("modal-container");r.innerHTML=`
    <div class="modal">
      <div class="modal-content">
        <h2>${e?"Editar Ejecutivo":"Nuevo Ejecutivo"}</h2>
        <form id="edit-vendedor-form">
          <div class="form-group">
            <label for="edit_vend_nombre">Nombre</label>
            <input type="text" id="edit_vend_nombre" value="${(t==null?void 0:t.nombre)||""}" required />
          </div>
          <div class="form-group">
            <label for="edit_vend_tipo_comision">Tipo de Comisión</label>
            <select id="edit_vend_tipo_comision" required>
              <option value="porcentaje" ${(t==null?void 0:t.tipo_comision)==="porcentaje"?"selected":""}>Porcentaje (%)</option>
              <option value="prima_bruta_mensual" ${(t==null?void 0:t.tipo_comision)==="prima_bruta_mensual"?"selected":""}>Prima Bruta Mensual</option>
            </select>
          </div>
          <div class="form-group" id="edit_vend_comision_group" style="display: ${(t==null?void 0:t.tipo_comision)==="prima_bruta_mensual"?"none":"block"};">
            <label for="edit_vend_comision">% Comisión</label>
            <input type="number" id="edit_vend_comision" step="0.01" min="0" max="100" value="${(t==null?void 0:t.comision_porcentaje)||""}" required />
          </div>
          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-edit-vend-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${e?"Actualizar":"Crear"}</button>
          </div>
        </form>
      </div>
    </div>
  `;const s=document.getElementById("edit-vendedor-form"),i=document.getElementById("cancel-edit-vend-btn"),n=document.getElementById("edit_vend_tipo_comision"),o=document.getElementById("edit_vend_comision_group"),a=o.querySelector("input");n.addEventListener("change",l=>{l.target.value==="prima_bruta_mensual"?(o.style.display="none",a.required=!1):(o.style.display="block",a.required=!0)}),i.addEventListener("click",()=>{r.innerHTML=""}),s.addEventListener("submit",async l=>{l.preventDefault();const c=document.getElementById("edit_vend_nombre").value.trim(),d=document.getElementById("edit_vend_tipo_comision").value,f=d==="porcentaje"?parseFloat(document.getElementById("edit_vend_comision").value):0;if(!c){alert("El nombre es requerido");return}try{const u={nombre:c,tipo_comision:d,comision_porcentaje:f};e?await we.update(t.id,u):await we.create(u),window.location.reload()}catch(u){alert("Error: "+u.message)}})}class Un{constructor(){this.routes={"/login":{render:dn,setup:un,requiresAuth:!1},"/dashboard":{render:Tn,setup:An,requiresAuth:!0}},this.currentPath="/login"}async init(){window.addEventListener("popstate",()=>this.handleRoute()),ne.onAuthStateChange(async(e,r)=>{e==="SIGNED_IN"?this.navigate("/dashboard"):e==="SIGNED_OUT"&&this.navigate("/login")}),await this.handleRoute()}async handleRoute(){const e=window.location.pathname,r=this.routes[e]||this.routes["/login"];try{const s=await ne.getCurrentUser();if(r.requiresAuth&&!s){this.navigate("/login",!1);return}if(!r.requiresAuth&&s&&e==="/login"){this.navigate("/dashboard",!1);return}this.currentPath=e,await this.render(r)}catch{r.requiresAuth?this.navigate("/login",!1):await this.render(r)}}async render(e){const r=document.getElementById("app");if(typeof e.render=="function"){const s=await e.render();r.innerHTML=s,e.setup&&e.setup(this.navigate.bind(this))}}navigate(e,r=!0){r&&window.history.pushState({},"",e),this.handleRoute()}}const Dn=new Un;document.addEventListener("DOMContentLoaded",()=>{Dn.init()});
