(this["webpackJsonptwitch-ban-assist"]=this["webpackJsonptwitch-ban-assist"]||[]).push([[0],{16:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function a(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},17:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(4),l=n.n(c),o=n(7),u=n(3),i="ok7ldffjfrdafeme3x5jfob7rxhmlv",s=["chat:read","chat:edit","channel:moderate"];function m(){var e=Object(u.c)("access_token",f),t=e.isLoading,n=e.isError,a=e.data,r=e.error,c=function(e){return Object(u.c)([e,!1,"user_id"],h,{enabled:e})}(a),l=c.isLoading,o=c.isError,i=c.data,s=c.error;return{isLoading:t||l,isError:n||o,data:{token:a,user:"undefined"===typeof i?null:i},error:r||s}}function f(){return d.apply(this,arguments)}function d(){return(d=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(t=localStorage.getItem("token"))){e.next=6;break}if(null!==(t=b())){e.next=5;break}return e.abrupt("return",null);case 5:localStorage.setItem("token",t);case 6:return e.next=8,h(t);case 8:if(null!==e.sent){e.next=12;break}return localStorage.removeItem("token"),e.abrupt("return",null);case 12:return e.abrupt("return",t);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(e){return p.apply(this,arguments)}function p(){return(p=Object(o.a)(l.a.mark((function e(t){var n,a,r,c,o,u,i,s,m,f=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=f.length>1&&void 0!==f[1]&&f[1],r=parseInt(null!==(n=localStorage.getItem("validation_time"))&&void 0!==n?n:0,10),c=localStorage.getItem("user_id"),o=localStorage.getItem("user_name"),a||!(r>Date.now()-36e5)||null===c){e.next=6;break}return e.abrupt("return",{user_id:c,user_name:o});case 6:return e.next=8,fetch("https://id.twitch.tv/oauth2/validate",{headers:{Authorization:"OAuth ".concat(t)}});case 8:if((u=e.sent).ok){e.next=11;break}return e.abrupt("return",null);case 11:return e.prev=11,e.next=14,u.json();case 14:return i=e.sent,s="undefined"!==typeof i.user_id?i.user_id:null,m="undefined"!==typeof i.login?i.login:null,localStorage.setItem("user_id",s),localStorage.setItem("user_name",m),localStorage.setItem("validation_time",Date.now().toString()),e.abrupt("return",null===s||null===m?null:{user_id:s,user_name:m});case 23:return e.prev=23,e.t0=e.catch(11),e.abrupt("return",null);case 26:case"end":return e.stop()}}),e,null,[[11,23]])})))).apply(this,arguments)}function b(){var e=window.location.hash;if(e.length<=1)return null;var t=function(e){for(var t={},n=("?"===e[0]?e.substr(1):e).split("&"),a=0,r=n.length;a<r;a++){var c=n[a].split("=");t[decodeURIComponent(c[0])]=decodeURIComponent(c[1]||"")}return t}(e.substr(1));return"undefined"===typeof t.access_token||"undefined"===typeof t.token_type||"bearer"!==t.token_type?null:(window.location.hash="",t.access_token)}n(27);var g=function(){var e="https://id.twitch.tv/oauth2/authorize?client_id=".concat(i,"&redirect_uri=").concat(encodeURIComponent("https://kingdutch.github.io/twitch-ban-assist/"),"&response_type=token&scope=").concat(s.join(" "));return r.a.createElement("main",{className:"Anonymous"},r.a.createElement("p",null,"You must authenticate with Twitch to use this tool."),r.a.createElement("p",null,"The tool will request the following permissions:",r.a.createElement("ul",null,r.a.createElement("li",null,"Read and Write chat messages ",r.a.createElement("br",null)," ",r.a.createElement("span",{className:"i"},"required to be able to issue commands such as ban to Twitch.")),r.a.createElement("li",null,"Perform moderation tasks on your behalf ",r.a.createElement("br",null)," ",r.a.createElement("span",{className:"i"},"required to automatically ban users in the channel you're a moderator in.")))),r.a.createElement("p",{className:"center"},r.a.createElement("a",{href:e,className:"btn btn-primary"},"Authenticate")))},E=n(1),v=n(11),_=n(2);function j(e){return w.apply(this,arguments)}function w(){return(w=Object(o.a)(l.a.mark((function e(t){var n,a,r,c,o,u,s=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:null,a=s.length>2&&void 0!==s[2]?s[2]:{},(r=new URL(t,"https://api.twitch.tv/")).search=new URLSearchParams(a).toString(),c={"Client-Id":i},null!==n&&(c.Authorization="Bearer ".concat(n)),e.next=8,fetch(r.toString(),{headers:c});case 8:return o=e.sent,e.next=11,o.json();case 11:if("undefined"===typeof(u=e.sent).status||!(u.status<200||u.status>300)){e.next=14;break}throw u;case 14:return e.abrupt("return",u);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(28);var O=n(5);function k(e){var t=(e||"").toLowerCase();return"#"===t[0]?t:"#"+t}var y=function(e){var t=e.chatClient,n=e.follows,c=e.user_name,l=Object(a.useState)((function(){return n.reduce((function(e,t){return Object(_.a)({},e,Object(O.a)({},t.to_name,!1))}),{})}),[n]),o=Object(E.a)(l,2),u=o[0],i=o[1],s=Object(a.useState)((function(){return{length:0}})),m=Object(E.a)(s,2),f=m[0],d=m[1];Object(a.useEffect)((function(){var e=function(e,n){if(n===c){var a=t.isMod(e,c)||e===k(c);d((function(t){return Object(_.a)({},t,Object(O.a)({length:t.length+1},e,a))}))}};return t.on("join",e),function(){t.off("join",e)}}),[t,d,c]);var h=Object(a.useState)({target_user:"",reason:""}),p=Object(E.a)(h,2),b=p[0],g=p[1],v=Object(a.useState)({}),j=Object(E.a)(v,2),w=j[0],y=j[1],x=Object.entries(u).filter((function(e){var t=Object(E.a)(e,2),n=t[0];t[1];return f[k(n)]})).every((function(e){var t=Object(E.a)(e,2);t[0];return t[1]})),S=n.filter((function(e){return f[k(e.to_name)]})),C=S.map((function(e){var t,n;return r.a.createElement("tr",{key:e.to_id},r.a.createElement("td",null,r.a.createElement("input",{type:"checkbox",value:e.to_name,checked:null!==(t=u[e.to_name])&&void 0!==t&&t,onChange:function(){return i((function(t){return Object(_.a)({},t,Object(O.a)({},e.to_name,!t[e.to_name]))}))}})),r.a.createElement("td",null,e.to_name),r.a.createElement("td",null,null!==(n=w[k(e.to_name)])&&void 0!==n?n:""))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",{className:"table-select"},r.a.createElement("caption",null,"Select streams to apply ban to"),r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,r.a.createElement("input",{type:"checkbox",checked:x,onChange:function(){return i(Object.fromEntries(S.map((function(e){return[e.to_name,!x]}))))}})),r.a.createElement("th",null,"Broadcaster"),r.a.createElement("th",null,"Status"))),r.a.createElement("tbody",null,f.length<n.length?r.a.createElement("tr",null,r.a.createElement("td",{colSpan:2},"Finding moderator channels, checked ",f.length,"/",n.length)):C)),r.a.createElement("p",null,r.a.createElement("label",null,"Username",r.a.createElement("br",null),r.a.createElement("input",{type:"text",required:!0,value:b.target_user,onChange:function(e){var t=e.target.value;g((function(e){return Object(_.a)({},e,{target_user:t})}))}}))),r.a.createElement("p",null,r.a.createElement("label",null,"Reason",r.a.createElement("br",null),r.a.createElement("input",{value:b.reason,type:"text",onChange:function(e){var t=e.target.value;g((function(e){return Object(_.a)({},e,{reason:t})}))}}))),r.a.createElement("p",null,r.a.createElement("button",{disabled:0===b.target_user.length,onClick:function(){var e=b.target_user,n=b.reason;g({target_user:"",reason:""});var a=Object.fromEntries(Object.entries(u).filter((function(e){var t=Object(E.a)(e,2);t[0];return t[1]})).map((function(t){var n=Object(E.a)(t,2),a=n[0];n[1];return[a,"Banning ".concat(e,"...")]})));y(a);for(var r=function(){var a=k(l[c]);t.ban(a,e,n).then((function(){return y((function(t){return Object(_.a)({},t,Object(O.a)({},a,"Banned ".concat(e)))}))})).catch((function(e){return y((function(t){return Object(_.a)({},t,Object(O.a)({},a,"Error ".concat(e.message)))}))}))},c=0,l=Object.keys(a);c<l.length;c++)r()},className:"btn btn-primary"},"Ban")))},x=n(15),S=null;function C(e,t,n,a){null===S&&null!==e&&null!==t&&0!==n.length&&(S=function(e,t,n){return new x.Client({options:{debug:!1},connection:{reconnect:!1,secure:!0},identity:{username:t,password:"oauth:".concat(e)},channels:[].concat(Object(v.a)(n),[t]),logger:{info:function(){return null},warn:console.warn,error:console.error}})}(e,t,n)).connect().then((function(){a({error:null,client:S})})).catch((function(e){a({error:e,client:null})}))}var I=function(e){var t=e.token,n=e.user_id,c=e.user_name,l=function(e,t,n){var a=Object(u.c)(["helix/users/follows",e,{from_id:t}],j,{staleTime:6e5}),r=a.isLoading,c=a.isError,l=a.data,o=a.error;return r||c||(l=Object(_.a)({},l,{data:[].concat(Object(v.a)(l.data),[{followed_at:"2020-01-01T00:00:01Z",from_id:t,from_name:n,to_id:t,to_name:n}])})),{isLoading:r,isError:c,data:l,error:o}}(t,n,c),o=l.isLoading,i=l.isError,s=l.data,m=l.error,f=Object(a.useState)({error:null,client:null}),d=Object(E.a)(f,2),h=d[0],p=h.error,b=h.client,g=d[1],w=Object(a.useRef)(null);if(w.current=b,Object(a.useEffect)((function(){return function(){null!==w.current&&(w.current.disconnect(),w.current=null)}}),[w]),o)return r.a.createElement("p",null,"Loading follower list.....");if(i)return r.a.createElement("p",null,"Error loading follower list: ",m.message);C(t,c,s.data.map((function(e){return e.to_name})),g);var O=r.a.createElement("p",null,"Logged in as: ",c);return null===p&&null===b?r.a.createElement(r.a.Fragment,null,O,r.a.createElement("p",null,"Connecting to chatserver....")):null!==p?r.a.createElement(r.a.Fragment,null,O,r.a.createElement("p",null,"Error connecting to chatserver: ",p.message)):r.a.createElement(r.a.Fragment,null,O,r.a.createElement(y,{chatClient:b,follows:s.data,user_name:c}))};var L=function(){var e=m(),t=e.isLoading,n=e.isError,a=e.data,c=a.user,l=a.token,o=e.error;return t?r.a.createElement("p",null,"Loading..."):n?r.a.createElement("p",null,"Unexpected error while authenticating: ",o.message):null===c?r.a.createElement(g,null):r.a.createElement("main",{className:"Authenticated"},r.a.createElement(I,{user_id:c.user_id,user_name:c.user_name,token:l}))};n(44);var N=function(){return r.a.createElement("footer",{className:"Footer"},r.a.createElement("span",null,"\xa9 Copyright 2020 - Kingdutch"),r.a.createElement("span",null,r.a.createElement("a",{href:"https://github.com/Kingdutch/twitch-ban-assist/"},"Open Source on GitHub")))};t.a=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(L,null),r.a.createElement(N,null))}},18:function(e,t,n){e.exports=n(19)},19:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),r=n(9),c=n.n(r),l=n(3),o=(n(24),n(25),n(17)),u=n(16),i=new l.a;"undefined"!==typeof e.setMaxListeners&&e.setMaxListeners(0),c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(l.b,{queryCache:i},a.a.createElement(o.a,null))),document.getElementById("root")),u.a()}.call(this,n(12))},24:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},32:function(e,t){},43:function(e,t){},44:function(e,t,n){}},[[18,1,2]]]);
//# sourceMappingURL=main.f74c31b2.chunk.js.map