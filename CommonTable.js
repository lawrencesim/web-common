!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CommonTable=t():e.CommonTable=t()}(this,(function(){return(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function r(e,t,r){return this.tableData=null,this.hdrGroups=[],this.headerObjs=[],this.headerElems=[],this.tableElement=document.createElement("table"),this.tbodyElement=document.createElement("tbody"),this.tableElement.append(this.tbodyElement),this.tableElement.className="cm-table",e&&this.tableElement.setAttribute("id",e),t&&this.tableElement.classList.add(t),r&&r.append(this.tableElement),this}e.d(t,{default:()=>n}),r.prototype.appendTo=function(e){return e.append(this.tableElement),this},r.prototype.prependTo=function(e){return e.prepend(this.tableElement),this},r.prototype.addColumn=function(e,t,r,n){return e&&e.hasOwnProperty("title")&&e.hasOwnProperty("key")&&!t&&!r?(e.group||(e.group=null),this.headerObjs.push(e)):(e||(e=null),n||(n={}),this.headerObjs.push({group:e,title:t,key:r,format:n.format,hdrStyles:n.hdrStyles,colStyles:n.colStyles,onClick:n.onClick,sortable:void 0===n.sortable||n.sortable})),this},r.prototype.createHeaders=function(e,t){var r=this;this.tbodyElement.innerHTML="";for(var n=[],a=0;a<2;++a){var o=document.createElement("tr");o.setAttribute("cm-table-rowtype","header-row"),this.tbodyElement.append(o),n.push(o)}var l=null,s=null;return this.headerObjs.forEach((function(a){a.group&&(l&&a.group===l?s.setAttribute("colspan",1+parseInt(s.getAttribute("colspan"))):(l=a.group,(s=document.createElement("th")).innerHTML=a.group,s.setAttributes({style:"text-align:center;",colspan:1,"cm-table-celltype":"header-group"}),n[0].append(s)));var o=document.createElement("th");o.innerHTML=a.title,o.setAttribute("cm-table-celltype","header");var i={};if(a.colStyles)for(var c in a.colStyles)i[c]=a.colStyles[c];if(a.hdrStyles)for(var p in a.hdrStyles)i[p]=a.hdrStyles[p];o.css(i);var u,d,h=e&&e===a.key;if(h){var b=document.createElement("i");b.className="icon-"+(t?"ascending":"descending"),o.append(b)}a.sortable&&(o.css("cursor","pointer"),o.addEventListener("click",(u=a.key,d=!h||!t,function(e){e.stopPropagation(),r.populateTable(null,u,d)}))),a.group?n[1].append(o):(o.setAttribute("rowspan",2),n[0].append(o))})),n[1].hasChildNodes()||(n[1].remove(),n[0].querySelectorAll("th").forEach((function(e){return e.setAttribute("rowspan","")}))),this},r.prototype.populateTable=function(e,t,r){var n=this;this.createHeaders(t,r),e&&(this.tableData=e);var a=this.tableData;return t&&a.length&&(a=this.tableData.slice()).sort((function(e,n){var a=0,o=[e[t],n[t]],l=[void 0===o[0],void 0===o[1]];if(l[0]!==l[1])a=l[0]?-1:1;else if(!l[0])if("number"==typeof o[0]&&"number"==typeof o[1])a=o[0]-o[1];else{var s=[Date.parse(o[0]),Date.parse(o[1])];a=isNaN(s[0])||isNaN(s[0])?o[0].localeCompare(o[1]):s[0]-s[1]}return r?a:-a})),a.forEach((function(e){var t=document.createElement("tr");t.setAttribute("cm-table-rowtype","data"),n.headerObjs.forEach((function(r){var n=e[r.key];if(r.format)try{n=r.format(n)}catch(e){}var a,o,l=document.createElement("td");if(l.setAttribute("cm-table-celltype","data"),t.append(l),r.colStyles&&l.css(r.colStyles),r.onClick){var s=document.createElement("a");s.setAttribute("href","#"),s.innerHTML=n,l.append(s),s.addEventListener("click",(a=r.onClick,o=e,function(e){a(o),e.preventDefault()}))}else l.innerHTML=n})),n.tbodyElement.append(t)})),this};const n=r;return t.default})()}));