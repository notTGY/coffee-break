(()=>{var w=Symbol();function v(t,n,...o){return t===w?o:typeof t=="function"?t({...n,children:o}):{...n,elem:t,children:o}}var k=(t,n)=>{let o={$el:t,elem:t.nodeName.toLowerCase()},c,l=()=>{c=m(o,n(),t),N(o),o=c},N=a=>{(a.children??[]).map(N),a.repaint||(a.$el.remove(),a=null)},m=(a,s,H)=>{Array.isArray(s)&&(s={children:s}),typeof s=="string"&&(s={innerText:s}),s.elem=s.elem||"span",!a||(c=a.elem!==s.elem)?(a&&c&&N(a),s.$el=document.createElement(s.elem),H.append(s.$el)):(a.repaint=!0,s.$el=a.$el,s.cleanup=a.cleanup);let{$el:E,elem:ut,children:A,cleanup:P,...b}=s;if(P)for(let i in P)E.removeEventListener(i.substring(2),s.cleanup[i]);s.cleanup={};for(let i in b)typeof(c=b[i])>"u"||(i.indexOf("on")!=0?E[i]=c:E.addEventListener(i.substring(2),s.cleanup[i]=L=>{b[i](L),l()}));return A?{...s,children:A.map((i,L)=>m(a&&a.children&&a.children[L],i,E))}:s};return l(),l},e={dom:v,frag:w,init:k};var f="gh auth failed",M="22c1513e621ddbb25ba7",W=t=>window.localStorage.setItem("token",t),y=()=>window.localStorage.getItem("token"),u=()=>window.location.assign(`https://github.com/login/oauth/authorize?client_id=${M}`),R=window.location.search,p=new URLSearchParams(R),C=p.get("code");C&&W(C);var S=()=>{let t=y();if(t)return t;u()};var r=0,U=async()=>{let t=S();try{(await(await fetch("/api/recording/toggle",{method:"POST",body:JSON.stringify({token:t})})).json()).message===f&&u()}catch(n){console.error(n)}},K=async()=>{let t,n=S();try{let c=await(await fetch("/api/recording/status",{method:"POST",body:JSON.stringify({token:n})})).json();c.message===f&&u(),t=c.res}catch(o){console.error(o)}return t},$=async()=>{let t=await K();newButtonState=t?3:1,r===0&&(r=newButtonState,window.rerender())},h=async()=>{await U(),r=3,window.rerender()},j=async()=>{await U(),r=1,window.rerender()},q=()=>{switch(r){case 1:r=2,window.rerender(),h();break;case 3:r=4,window.rerender(),j();break}},V=()=>{let t,n,o;switch(r){case 1:t="button button-up",n=e.dom("span",null,"\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0440\u044B\u0432"),o=!1;break;case 3:t="button button-down",n=e.dom("span",null,"\u041F\u0435\u0440\u0435\u0440\u044B\u0432 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435"),o=!1;break;case 2:t="button button-down",n=e.dom("div",{className:"loader"}),o=!0;break;default:case 4:t="button button-up",n=e.dom("div",{className:"loader"}),o=!0;break}return{elem:"button",onclick:q,className:t,disabled:o,children:[n]}},Y=()=>e.dom("div",{id:"root"},e.dom("div",{className:"button-wrapper"},e.dom(V,null)));r===0&&$();var O=t=>{let o=t.getDay(),c=o<=0?7-1:o-1,l=t.valueOf()-c*864e5,N=new Date(l),m=new Date(l+6*864e5),a=new Date(l-6*864e5),s=new Date(l+8*864e5);return{weekStart:N,weekEnd:m,prev:a,next:s}};var X=`\u041D\u0430\u0436\u043C\u0438 \u043D\u0430 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0443 \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0435\u0451 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \u043F\u043E \u0434\u043D\u044F\u043C \u043D\u0435\u0434\u0435\u043B\u0438.
`;var z=["c","l","d","i"],Q={["c"]:"\u0447\u0438\u0441\u043B\u043E \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u043E\u0432",["l"]:"\u0441\u0440\u0435\u0434\u043D\u044F\u044F \u0434\u043B\u0438\u043D\u0430 \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u043E\u0432",["d"]:"\u0441\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043C\u0435\u0436\u0434\u0443 \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u0430\u043C\u0438",["i"]:"\u0438\u043D\u0434\u0435\u043A\u0441 \u0437\u0430\u0447\u0438\u043B\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u0438"},I={["c"]:"#8338ec",["l"]:"#3a86ff",["d"]:"#465f2a",["i"]:"#71b48d"},T=new Date,d=0,D={},Z=async t=>{let n=S();try{let c=await(await fetch("/api/stats",{method:"POST",body:JSON.stringify({token:n,start:t})})).json();return c.message===f&&u(),c.res}catch(o){console.error(o)}},F=()=>{let{weekStart:t}=O(T),n=t.valueOf();return D[n]?D[n]:(Z(n).then(o=>{D[n]=o,o&&window.rerender()}),D[n]={})},tt=()=>{let{weekStart:t,weekEnd:n,next:o,prev:c}=O(T);return e.dom("div",{className:"pager-row"},e.dom("button",{className:"pager",onclick:()=>T=c,innerText:"<"}),e.dom("span",{className:"pager-date",onclick:()=>T=new Date},t.toLocaleDateString(),"-",n.toLocaleDateString()),e.dom("button",{className:"pager",onclick:()=>T=o,innerText:">"}))},et=()=>e.dom("div",{className:"stats-description",innerText:X}),nt=({stat:t,data:n})=>e.dom("button",{className:"selector-card",onclick:()=>{t!=d?d=t:d=0}},e.dom("span",{innerText:Q[t]}),e.dom("div",{className:"selector-data-placeholder"},n!=null?e.dom("span",{className:"selector-data",innerText:n,style:`color:${I[t]}`}):e.dom("div",{className:"loader"}))),ot=({data:t})=>({elem:"div",className:"selector",children:z.map(n=>e.dom(nt,{stat:n,data:t?t[n]:null}))}),st=(t,n)=>{let{weekStart:o}=O(T),c=new Date(o.valueOf()+n*864e5);return e.dom("div",{style:`color:${I[d]}`,className:"info-circle-wrapper"},e.dom("div",{style:`border-bottom-color:${I[d]}`,className:"info-circle"},t??e.dom("div",{className:"loader"})),e.dom("span",null,c.toLocaleDateString(void 0,{day:"numeric",month:"short"})))},ct=({data:t})=>{let o=(t?t[d]:null)||new Array(7).fill(null,0,7);return d===0&&(o=[]),{elem:"div",className:"detailed-data",children:o.map(st)}},x=()=>{let t=F(),{week:n,day:o}=t;return e.dom("div",{id:"root"},e.dom("div",{className:"stats-wrapper"},e.dom(tt,null),e.dom(et,null),e.dom(ot,{data:n}),e.dom(ct,{data:o})))};var at=`
\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0441\u0430\u0439\u0442 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u043E\u0432 \u0441\u0431\u0435\u0440.tech!

\u041C\u044B \u0432\u0441\u0435 \u0437\u043D\u0430\u0435\u043C, \u043A\u0430\u043A \u0432\u0430\u0436\u043D\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u044B \u0438 \u0437\u0430\u0440\u044F\u0436\u0430\u0442\u044C\u0441\u044F \u044D\u043D\u0435\u0440\u0433\u0438\u0435\u0439 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0434\u043D\u044F, \u0438 \u0447\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043B\u0443\u0447\u0448\u0435 \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E, \u0447\u0435\u043C \u0432\u044B\u043F\u0438\u0442\u044C \u0447\u0430\u0448\u0435\u0447\u043A\u0443 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u043A\u043E\u0444\u0435? \u0412\u043E\u0442 \u0442\u0443\u0442-\u0442\u043E \u0438 \u043F\u0440\u0438\u0433\u043E\u0434\u0438\u0442\u0441\u044F \u043C\u043E\u0451 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u0421 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u043E\u0432 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043B\u0435\u0433\u043A\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u044B \u0442\u0440\u0430\u0442\u0438\u0442\u0435 \u043D\u0430 \u043A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u0438, \u0438 \u0432\u0438\u0434\u0435\u0442\u044C, \u043A\u0430\u043A \u043E\u043D\u043E \u0441\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0434\u0435\u043B\u0438, \u043C\u0435\u0441\u044F\u0446\u0430 \u0438\u043B\u0438 \u0434\u0430\u0436\u0435 \u0433\u043E\u0434\u0430.

\u042D\u0442\u043E \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u0443\u0437\u043D\u0430\u0442\u044C, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0432\u044B \u0442\u0440\u0430\u0442\u0438\u0442\u0435 \u043D\u0430 \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u044B, \u043D\u043E \u0438 \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043A \u0442\u043E\u043C\u0443, \u043A\u0430\u043A \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 \u0441\u0432\u043E\u0435 \u0432\u0440\u0435\u043C\u044F. \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u044F \u0441\u0432\u043E\u0438 \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u044B \u043D\u0430 \u043A\u043E\u0444\u0435 \u0438 \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044F \u0434\u0430\u043D\u043D\u044B\u0435, \u0432\u044B, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0434\u0430\u0436\u0435 \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u043E\u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0435\u043C\u0443 \u0440\u0430\u0431\u043E\u0442\u043E\u0434\u0430\u0442\u0435\u043B\u044E, \u0447\u0442\u043E \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u044B\u043C\u0438, \u0437\u0430\u0442\u0440\u0430\u0447\u0438\u0432\u0430\u044F \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443 \u043C\u0435\u043D\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438. \u041F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u044D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u044C\u0431\u044B \u043E \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0438 \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u043D\u043E\u0439 \u043F\u043B\u0430\u0442\u044B \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043B\u044C\u0433\u043E\u0442\u0430\u0445.

\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u043E\u0432 \u0442\u0430\u043A\u0436\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C \u043E\u0441\u0442\u0430\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0441\u0432\u044F\u0437\u0438 \u0441 \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C\u0438 \u0438 \u0434\u0440\u0443\u0437\u044C\u044F\u043C\u0438, \u0434\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u0432\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043D\u043E. \u0422\u0430\u043A \u0447\u0442\u043E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435, \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0440\u044B\u0432 \u0438 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435, \u043A\u0430\u043A \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u0440\u044B\u0432\u043E\u0432 \u043D\u0430 \u043A\u043E\u0444\u0435 \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043C\u043E\u0447\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0430\u0448\u0435 \u0432\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0441\u0442\u043E\u044F.

\u0418, \u043A\u0441\u0442\u0430\u0442\u0438, \u0435\u0441\u043B\u0438 \u0432\u044B \u0438\u0449\u0435\u0442\u0435 Software Engineer \u0432 \u0441\u0432\u043E\u044E \u043A\u043E\u043C\u0430\u043D\u0434\u0443, \u043D\u0435 \u0441\u0442\u0435\u0441\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F \u043A\u043E \u043C\u043D\u0435!
`,B=()=>e.dom("div",{id:"root"},e.dom("article",{className:"about"},at,e.dom("a",{href:"https://www.linkedin.com/in/tgy47/"},"LinkedIn")));var G=document.getElementById("root");var _=0,it=()=>{switch(_){case 1:return e.dom(x,null);case 2:return e.dom(B,null);default:case 0:return e.dom(Y,null)}},g;G.innerHTML="";g=e.init(G,it);window.rerender=g;var rt=document.getElementById("clock"),lt=document.getElementById("stats"),dt=document.getElementById("info");rt.addEventListener("click",()=>{_=0,g()});lt.addEventListener("click",()=>{_=1,g()});dt.addEventListener("click",()=>{_=2,g()});})();
