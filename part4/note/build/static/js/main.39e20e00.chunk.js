(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{41:function(t,n,e){"use strict";e.r(n);var c=e(17),o=e.n(c),r=e(8),a=e(6),i=e(2),u=e(0),s=function(t){var n=t.note,e=t.toggleImportant,c=n.important?"make not important":"make important";return Object(u.jsxs)("li",{children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},l=e(5),f=e.n(l),j="/api/notes",d=function(){return f.a.get(j).then((function(t){return t.data}))},b=function(t){return f.a.post(j,t).then((function(t){return t.data}))},h=function(t,n){return f.a.put("".concat(j,"/").concat(t),n).then((function(t){return t.data})).catch((function(t){console.log(t)}))},p=function(t){var n=Object(i.useState)([]),e=Object(a.a)(n,2),c=e[0],o=e[1],l=Object(i.useState)(""),f=Object(a.a)(l,2),j=f[0],p=f[1],O=Object(i.useState)(!0),m=Object(a.a)(O,2),v=m[0],g=m[1];Object(i.useEffect)((function(){d().then((function(t){o(t)})).catch((function(t){return console.log(t)}))}),[]);var x=v?c:c.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{id:"show-button",onClick:function(){return g(!v)},children:["Show ",v?"important":"all"]})}),Object(u.jsx)("ul",{children:x.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=c.find((function(n){return n.id===t})),e=Object(r.a)(Object(r.a)({},n),{},{important:!n.important});h(t,e).then((function(n){o(c.map((function(e){return e.id!==t?e:n})))})).catch((function(e){alert("the note '".concat(n.content,"' was already deleted from server")),o(c.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:j,date:(new Date).toISOString(),important:Math.random()<.5};b(n).then((function(t){o(c.concat(t)),p("")}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){p("".concat(t.target.value)),console.log("new note: ",t.target.value)},placeholder:"New note"}),Object(u.jsx)("button",{type:"submit",children:"Save"})]})]})};o.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.39e20e00.chunk.js.map