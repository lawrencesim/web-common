!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CommonTable=t():e.CommonTable=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}({7:function(e,t,r){"use strict";function n(e,t,r){return this.tableData=null,this.hdrGroups=[],this.headerObjs=[],this.headerElems=[],this.tableElement=document.createElement("table"),this.tbodyElement=document.createElement("tbody"),this.tableElement.append(this.tbodyElement),this.tableElement.className="cm-table",e&&this.tableElement.setAttribute("id",e),t&&this.tableElement.classList.add(t),r&&r.append(this.tableElement),this}r.r(t),n.prototype.appendTo=function(e){return e.append(this.tableElement),this},n.prototype.prependTo=function(e){return e.prepend(this.tableElement),this},n.prototype.addColumn=function(e,t,r,n){return e&&e.hasOwnProperty("title")&&e.hasOwnProperty("key")&&!t&&!r?(e.group||(e.group=null),this.headerObjs.push(e)):(e||(e=null),n||(n={}),this.headerObjs.push({group:e,title:t,key:r,format:n.format,hdrStyles:n.hdrStyles,colStyles:n.colStyles,onClick:n.onClick,sortable:void 0===n.sortable||n.sortable})),this},n.prototype.createHeaders=function(e,t){var r=this;this.tbodyElement.innerHTML="";for(var n=[],o=0;o<2;++o){var a=document.createElement("tr");a.setAttribute("cm-table-rowtype","header-row"),this.tbodyElement.append(a),n.push(a)}var l=null,i=null;return this.headerObjs.forEach((function(o){o.group&&(l&&o.group===l?i.setAttribute("colspan",1+parseInt(i.getAttribute("colspan"))):(l=o.group,(i=document.createElement("th")).innerHTML=o.group,i.setAttributes({style:"text-align:center;",colspan:1,"cm-table-celltype":"header-group"}),n[0].append(i)));var a=document.createElement("th");a.innerHTML=o.title,a.setAttribute("cm-table-celltype","header");var s={};if(o.colStyles)for(var u in o.colStyles)s[u]=o.colStyles[u];if(o.hdrStyles)for(var c in o.hdrStyles)s[c]=o.hdrStyles[c];a.css(s);var p,d,f=e&&e===o.key;if(f){var b=document.createElement("i");b.className="icon-"+(t?"ascending":"descending"),a.append(b)}o.sortable&&(a.css("cursor","pointer"),a.addEventListener("click",(p=o.key,d=!f||!t,function(e){e.stopPropagation(),r.populateTable(null,p,d)}))),o.group?n[1].append(a):(a.setAttribute("rowspan",2),n[0].append(a))})),n[1].hasChildNodes()||(n[1].remove(),n[0].querySelectorAll("th").forEach((function(e){return e.setAttribute("rowspan","")}))),this},n.prototype.populateTable=function(e,t,r){var n=this;this.createHeaders(t,r),e&&(this.tableData=e);var o=this.tableData;return t&&o.length&&(o=this.tableData.slice()).sort((function(e,n){var o=0,a=[e[t],n[t]],l=[void 0===a[0],void 0===a[1]];if(l[0]!==l[1])o=l[0]?-1:1;else if(!l[0])if("number"==typeof a[0]&&"number"==typeof a[1])o=a[0]-a[1];else{var i=[Date.parse(a[0]),Date.parse(a[1])];o=isNaN(i[0])||isNaN(i[0])?a[0].localeCompare(a[1]):i[0]-i[1]}return r?o:-o})),o.forEach((function(e){var t=document.createElement("tr");t.setAttribute("cm-table-rowtype","data"),n.headerObjs.forEach((function(r){var n=e[r.key];if(r.format)try{n=r.format(n)}catch(e){}var o,a,l=document.createElement("td");if(l.setAttribute("cm-table-celltype","data"),t.append(l),r.colStyles&&l.css(r.colStyles),r.onClick){var i=document.createElement("a");i.setAttribute("href","#"),i.innerHTML=n,l.append(i),i.addEventListener("click",(o=r.onClick,a=e,function(e){o(a),e.preventDefault()}))}else l.innerHTML=n})),n.tbodyElement.append(t)})),this},t.default=n}}).default}));