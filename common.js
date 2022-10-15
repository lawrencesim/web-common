!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.common=t():e.common=t()}(this,(()=>(()=>{"use strict";var e={297:(e,t,n)=>{n.d(t,{Z:()=>f});var o=setTimeout;function r(e){return Boolean(e&&void 0!==e.length)}function i(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function s(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn((function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(e){return void l(t.promise,e)}c(t.promise,o)}else(1===e._state?c:l)(t.promise,e._value)}))):e._deferreds.push(t)}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void p((o=n,r=t,function(){o.apply(r,arguments)}),e)}e._state=1,e._value=t,u(e)}catch(t){l(e,t)}var o,r}function l(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&a._immediateFn((function(){e._handled||a._unhandledRejectionFn(e._value)}));for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e((function(e){n||(n=!0,c(t,e))}),(function(e){n||(n=!0,l(t,e))}))}catch(e){if(n)return;n=!0,l(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return s(this,new d(e,t,n)),n},a.prototype.finally=function(e){var t=this.constructor;return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){return t.reject(n)}))}))},a.all=function(e){return new a((function(t,n){if(!r(e))return n(new TypeError("Promise.all accepts an array"));var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var i=o.length;function a(e,r){try{if(r&&("object"==typeof r||"function"==typeof r)){var s=r.then;if("function"==typeof s)return void s.call(r,(function(t){a(e,t)}),n)}o[e]=r,0==--i&&t(o)}catch(e){n(e)}}for(var s=0;s<o.length;s++)a(s,o[s])}))},a.allSettled=function(e){return new this((function(t,n){if(!e||void 0===e.length)return n(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var r=o.length;function i(e,n){if(n&&("object"==typeof n||"function"==typeof n)){var a=n.then;if("function"==typeof a)return void a.call(n,(function(t){i(e,t)}),(function(n){o[e]={status:"rejected",reason:n},0==--r&&t(o)}))}o[e]={status:"fulfilled",value:n},0==--r&&t(o)}for(var a=0;a<o.length;a++)i(a,o[a])}))},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a((function(t){t(e)}))},a.reject=function(e){return new a((function(t,n){n(e)}))},a.race=function(e){return new a((function(t,n){if(!r(e))return n(new TypeError("Promise.race accepts an array"));for(var o=0,i=e.length;o<i;o++)a.resolve(e[o]).then(t,n)}))},a._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){o(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};const f=a}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}if(n.d(o,{default:()=>d}),Element.prototype.remove||(Element.prototype.remove=function(){this.parentNode?this.parentNode.removeChild(this):this.removeNode()}),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach((function(e){e.hasOwnProperty("append")||Object.defineProperty(e,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach((function(e){t.appendChild(e instanceof Node?e:document.createTextNode(String(e)))})),this.appendChild(t)}})})),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach((function(e){e.hasOwnProperty("prepend")||Object.defineProperty(e,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach((function(e){t.appendChild(e instanceof Node?e:document.createTextNode(String(e)))})),this.insertBefore(t,this.firstChild)}})})),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),"document"in self&&((!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g")))&&function(e){if("Element"in e){var t="classList",n=e.Element.prototype,o=Object,r=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},i=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},a=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},s=function(e,t){if(""===t)throw new a("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(t))throw new a("INVALID_CHARACTER_ERR","The token must not contain space characters.");return i.call(e,t)},c=function(e){for(var t=r.call(e.getAttribute("class")||""),n=t?t.split(/\s+/):[],o=0,i=n.length;o<i;o++)this.push(n[o]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},l=c.prototype=[],u=function(){return new c(this)};if(a.prototype=Error.prototype,l.item=function(e){return this[e]||null},l.contains=function(e){return~s(this,e+"")},l.add=function(){var e,t=arguments,n=0,o=t.length,r=!1;do{e=t[n]+"",~s(this,e)||(this.push(e),r=!0)}while(++n<o);r&&this._updateClassName()},l.remove=function(){var e,t,n=arguments,o=0,r=n.length,i=!1;do{for(e=n[o]+"",t=s(this,e);~t;)this.splice(t,1),i=!0,t=s(this,e)}while(++o<r);i&&this._updateClassName()},l.toggle=function(e,t){var n=this.contains(e),o=n?!0!==t&&"remove":!1!==t&&"add";return o&&this[o](e),!0===t||!1===t?t:!n},l.replace=function(e,t){var n=s(e+"");~n&&(this.splice(n,1,t),this._updateClassName())},l.toString=function(){return this.join(" ")},o.defineProperty){var d={get:u,enumerable:!0,configurable:!0};try{o.defineProperty(n,t,d)}catch(e){void 0!==e.number&&-2146823252!==e.number||(d.enumerable=!1,o.defineProperty(n,t,d))}}else o.prototype.__defineGetter__&&n.__defineGetter__(t,u)}}(self),function(){var e=document.createElement("_");if(e.classList.add("c1","c2"),!e.classList.contains("c2")){var t=function(e){var t=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(e){var n,o=arguments.length;for(n=0;n<o;n++)e=arguments[n],t.call(this,e)}};t("add"),t("remove")}if(e.classList.toggle("c3",!1),e.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:n.call(this,e)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(e,t){var n=this.toString().split(" "),o=n.indexOf(e+"");~o&&(n=n.slice(o),this.remove.apply(this,n),this.add(t),this.add.apply(this,n.slice(1)))}),e=null}()),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),String.prototype.repeat||(String.prototype.repeat=function(e){if(null==this)throw new TypeError('can"t convert '+this+" to object");if((e=+e)!=e)return"";if(0===(e=Math.floor(e)))return"";if(e<=0)throw new RangeError("repeat count must be non-negative");if(e===1/0)throw new RangeError("repeat count must be less than infinity");var t=""+this;if(0===t.length)return"";if(t.length*e>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var n="",o=0;o<e;o++)n+=t;return n}),String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(e,t){return t=!t||t<0?0:+t,this.substring(t,t+e.length)===e}}),String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{value:function(e,t){return(void 0===t||t>this.length)&&(t=this.length),this.substring(t-e.length,t)===e}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t=Object(this),n=t.length>>>0,o=arguments[1],r=0;r<n;){var i=t[r];if(e.call(o,i,r,t))return i;r++}},configurable:!0,writable:!0}),Array.from||(Array.from=function(){var e;try{e=Symbol.iterator?Symbol.iterator:"Symbol(Symbol.iterator)"}catch(t){e="Symbol(Symbol.iterator)"}var t=Object.prototype.toString,n=function(e){return"function"==typeof e||"[object Function]"===t.call(e)};return toNumber=function(e){var t=Number(e);return isNaN(t)||!isFinite(t)?0:Math.floor(Math.abs(t))},setGetItemHandler=function(t,n){var o=t&&n[e]();return function(e){return t?o.next():n[e]}},getArray=function(e,t,n,o,r,i){for(var a=0;a<n||r;){var s=o(a),c=r?s.value:s;if(r&&s.done)return t;t[a]=i?void 0===e?i(c,a):i.call(e,c,a):c,a+=1}if(r)throw new TypeError("Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1");return t.length=n,t},function(t){var o=this,r=Object(t),i=n(r[e]);if(null==t&&!i)throw new TypeError("Array.from requires an array-like object or iterator - not null or undefined");var a,s=arguments.length>1?arguments[1]:void 0;if(void 0!==s){if(!n(s))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(a=arguments[2])}var c=toNumber(r.length),l=n(o)?Object(new o(c)):new Array(c);return getArray(a,l,c,setGetItemHandler(i,r),i,s)}}()),Array.prototype.getOverlaps||Object.defineProperty(Array.prototype,"getOverlaps",{value:function(e){return this.filter((function(t){return~e.indexOf(t)}))}}),Array.getOverlaps||Object.defineProperty(Array,"getOverlaps",{value:function(e,t){return e.getOverlaps(t)}}),Array.prototype.overlaps||Object.defineProperty(Array.prototype,"overlaps",{value:function(e){return void 0!==this.find((function(t){return~e.indexOf(t)}))}}),Array.overlaps||Object.defineProperty(Array,"overlaps",{value:function(e,t){return e.overlaps(t)}}),Object.isObject||Object.defineProperty(Object,"isObject",{value:function(t){return null!=t&&"object"===e(t)&&!Array.isArray(t)}}),Object.isObjectLiteral||Object.defineProperty(Object,"isObjectLiteral",{value:function(e){return null!=e&&Object.getPrototypeOf(e)===Object.prototype}}),String.prototype.capitalize||Object.defineProperty(String.prototype,"capitalize",{value:function(e){e=e?Array.from(e).filter((function(e){return e&&" "!==e})).map((function(e){var t=e.charCodeAt(0);return t>47&&t<58||t>64&&t<91||t>96&&t<123?e:"\\"+e})):[];var t=new RegExp("(?:^|[".concat(e.join(""),"\\s])\\S"),"g");return this.replace(t,(function(e){return e.toUpperCase()}))}}),!String.prototype.semanticCompare||!String.prototype.heuristicCompare){var t=function(e,t){var n;n=(t=t||{}).handleDecimal&&t.handleNegative?/(\-?\d+\.?\d+)|(\-?\.\d+)|(\-?\d+)/g:t.handleDecimal?/(\d+\.?\d+)|(\.\d+)|(\d+)/g:t.handleNegative?/\-?\d+/g:/\d+/g;var o,r={str:this},i={str:e},a=[r,i];for(a.forEach((function(e){e.matches=e.str.matchAll(n),e.match=e.matches.next(),e.chunk="",e.index=0,e.isnum=!1,e.done=!1}));!r.done||!i.done;){if(a.forEach((function(e){e.done||(e.match.done?(e.done=!0,e.isnum=!1,e.chunk=e.str.slice(e.index),e.index=e.str.length):e.match.value.index>e.index?(e.isnum=!1,e.chunk=e.str.slice(e.index,e.match.value.index),e.index=e.match.value.index):(e.isnum=!0,e.chunk=e.match.value[0],e.index=e.match.value.index+e.chunk.length,e.match=e.matches.next()))})),o=r.isnum&&i.isnum?(o=parseFloat(r.chunk)-parseFloat(i.chunk))?o<0?-1:1:0:r.chunk.localeCompare(i.chunk))return o;if(r.done!==i.done)return r.done?-1:1}return 0};String.prototype.semanticCompare||Object.defineProperty(String.prototype,"semanticCompare",{value:t}),String.prototype.heuristicCompare||Object.defineProperty(String.prototype,"heuristicCompare",{value:t})}function r(e,t,n,o){for(var i in t)i in e?Object.isObjectLiteral(e[i])&&Object.isObjectLiteral(t[i])?r(e[i],t[i],n,o):n&&(e[i]=o(t[i])):e[i]=o(t[i]);return e}Number.prototype.addCommas||Object.defineProperty(Number.prototype,"addCommas",{value:function(e){e=isNaN(e=Math.abs(e))?0:e;var t=Math.abs(+this||0),n=parseInt(t.toFixed(e))+"";return(t<0?"-":"")+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+(e?"."+Math.abs(t-n).toFixed(e).slice(2):"")}}),Number.prototype.addCommasSmart||Object.defineProperty(Number.prototype,"addCommasSmart",{value:function(e){if(0===this)return"0.0";var t=Math.abs(this);return t<(e=e||.001)?"0.0":t<.01?this.toExponential(3):t<.1?this.toExponential(2):t<.3?this.addCommas(3):t<1?this.addCommas(2):t<100?this.addCommas(1):this.addCommas(0)}}),Element.prototype.isVisible||Object.defineProperty(Element.prototype,"isVisible",{value:function(){return null!==this.offsetParent&&(!this.style.visibility||"hidden"!==this.style.visibility.toLowerCase())}}),Element.prototype.setAttributes||Object.defineProperty(Element.prototype,"setAttributes",{value:function(e){for(var t in e)this.setAttribute(t,e[t])}}),Element.prototype.css||Object.defineProperty(Element.prototype,"css",{value:function(e,t){if(e&&e.constructor===Object)for(var n in e)this.style[n]=e[n];else this.style[e]=t}}),Element.prototype.center||Object.defineProperty(Element.prototype,"center",{value:function(){this.css({position:"absolute",top:Math.max(0,(window.innerHeight-this.offsetHeight)/2+(window.scrollY||window.pageYOffset)),left:Math.max(0,(window.innerWidth-this.offsetWidth)/2+(window.scrollX||window.pageXOffset))})}}),window.DateUTC=function(e,t,n,o,r,i){return new Date(Date.UTC(parseInt(e),t?parseInt(t)-1:0,n?parseInt(n):1,o?parseInt(o):0,r?parseInt(r):0,i?parseInt(i):0))},Date.prototype.asUTC||Object.defineProperty(Date.prototype,"asUTC",{value:function(){return new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds()))}}),Date.prototype.toUTC||Object.defineProperty(Date.prototype,"toUTC",{value:function(){return new Date(Date.UTC(this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()))}}),Date.prototype.asUTCDate||Object.defineProperty(Date.prototype,"asUTCDate",{value:function(){return new Date(Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()))}}),Date.prototype.toUTCDate||Object.defineProperty(Date.prototype,"toUTCDate",{value:function(){return new Date(Date.UTC(this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate()))}}),Date.prototype.addDays||Object.defineProperty(Date.prototype,"addDays",{value:function(e){return new Date(this.getTime()+864e5*e)}}),Date.prototype.monthOfYear||Object.defineProperty(Date.prototype,"monthOfYear",{value:function(){return this.getMonth()+1}}),Date.prototype.daysInMonth||Object.defineProperty(Date.prototype,"daysInMonth",{value:function(){return new Date(this.getFullYear(),this.getMonth(),0).getDate()}});const i={getElement:function(e){if(e){if("string"==typeof e)return document.querySelector(e);if("undefined"!=typeof jQuery&&e instanceof jQuery){var t=e.get();return t.length?t[0]:void 0}if("function"===e[Symbol.iterator]){if(Array.isArray(e))return e.length&&e[0]||void 0;var n=e.next();return n.done?void 0:n.value}return e instanceof Element?e:null}},getElementList:function(e){return e?"string"==typeof e?Array.from(document.querySelectorAll(e)):"function"===e[Symbol.iterator]?Array.isArray(e)?e:Array.from(e):"undefined"!=typeof jQuery&&e instanceof jQuery?e.get():e instanceof Element?[e]:[]:[]},extend:function(e,t,n,o,i){var a;if(Object.isObjectLiteral(n)&&(void 0===o&&(o=n.deepCopy),void 0===i&&(i=n.modifyObj),n=n.allowOverwrite),a=o?structuredClone&&"function"==typeof structuredClone?structuredClone:function(e){return JSON.parse(JSON.stringify(e))}:function(e){return e},!t)return i?e:a(e);if(!e)return a(t);var s=i?e:r({},e,!0,a);return r(s,t,n,a)},getUrlGetVars:function(){var e={};return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,(function(t,n,o){e[n]=o})),e},newWindow:function(e,t,n,o,r){Object.isObjectLiteral(t)&&(void 0===n&&(n=t.width),void 0===o&&(o=t.height),void 0===r&&(r=t.minimal),t=t.name);var i=void 0!==window.screenLeft?window.screenLeft:screen.left,a=void 0!==window.screenTop?window.screenTop:screen.top,s="width="+n+", height="+o+", left="+(i+.5*((window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width)-n))+", top="+(a+.5*((window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height)-o));r&&(s+=", toolbar=no, menubar=no, status=no, location=no");var c=window.open(e,"",s);if(c&&!c.closed&&void 0!==c.closed)return c&&c.focus(),c;alert("Could not open new window, to view '"+t+"' allow an exception for this domain in your pop-up blocker's settings.")},ajax:function(e){if(e||(e={}),!e.url)throw"No URL provided";e.method||(e.method="GET"),e.dataType||(e.dataType=""),e.async||(e.async=!0),e.success||(e.success=function(){}),e.error||(e.error=function(){});var t="POST"===e.method.toUpperCase();if(!t&&e.data){e.url.endsWith("?")||(e.url+="?");var o=[];for(var r in e.data)o.push(encodeURI(r+"="+e.data[r]));e.url+=o.join("&")}var i=new XMLHttpRequest,a=e.dataType.toLowerCase();"json"!==a&&(i.responseType=e.dataType);var s=function(n){i.onreadystatechange=function(t){return function(t){if(4===i.readyState){if(200===i.status){var n=i.responseText;if("json"===a){try{n=JSON.parse(n)}catch(t){e.error(i,i.statusText,i.responseText)}e.success(n,i.statusText,i)}else e.success(n,i.statusText,i)}else e.error(i,i.statusText,i.responseText);!function(t,n,o){try{e.complete&&e.complete(n,o)}finally{t&&t()}}(t,i,i.statusText)}}(n)},i.open(e.method,e.url,e.async,e.user,e.password),t?(i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(reqParams)):i.send()};return e.promise?new(Promise||n(297).Z)(s):(s(),i)},animate:function(e,t,o,r,i){if(Object.isObjectLiteral(e)&&(void 0===t&&(t=e.properties),void 0===o&&(o=e.durationMs||e.duration),void 0===r&&(r=e.timingFunction||e.timing),void 0===i&&(i=e.complete),e=e.element),e){if("number"!=typeof o)throw"Duration must be specified as numeric type in milliseconds.";var a=.001*o+"s",s="";for(var c in t)s&&(s+=", "),s+=c+" "+a+" "+(r||"ease");e.css({"-webkit-transition":s,"-moz-transition":s,transition:s});var l=Promise||n(297).Z;return new l((function(n){window.setTimeout((function(){e.css(t),n()}),5)})).then((function(){return new l((function(t){window.setTimeout((function(){e.css({"-webkit-transition":"","-moz-transition":"",transition:""}),i&&i(),t()}),o+5)}))}))}}},a={addGrabCursorFunctionality:function(e){this.getElementList(e).forEach((function(e){e.classList.add("grab"),e.addEventListener("mousedown",(function(){this.classList.remove("grab"),this.classList.add("grabbing")})),e.addEventListener("mouseup",(function(){this.classList.remove("grabbing"),this.classList.add("grab")}))}))},createDropdown:function(e,t){var n=this;this.getElementList(e).forEach((function(e){e.classList.add("cm-dropdown"),n.addDropdown(e,t)}))},clearDropdown:function(e){this.getElementList(e).forEach((function(e){e.classList.remove("cm-dropdown"),e.querySelectorAll("cm-dropdown-menu").forEach((function(e){return e.remove()}))}))},addTooltip:function(e,t,n,o){var r=["right","left","top","bottom"];Object.isObjectLiteral(t)&&(void 0===n&&(n=t.direction),void 0===o&&(o=t.force),t=t.message),this.getElementList(e).forEach((function(e){if(t){var i=n&&n.toLowerCase().trim();i&&~r.indexOf(i)||(i="top"),r.forEach((function(t){i===t?e.classList.add("cm-tooltip-"+t):e.classList.remove("cm-tooltip-"+t)})),o&&e.classList.add("cm-tooltip-force"),e.setAttribute("cm-tooltip-msg",t)}else e.classList.remove("cm-tooltip-left","cm-tooltip-right","cm-tooltip-top","cm-tooltip-bottom","cm-tooltip-force"),e.removeAttribute("cm-tooltip-msg")}))},removeTooltip:function(e){this.getElementList(e).forEach((function(e){e.classList.remove("cm-tooltip-left","cm-tooltip-right","cm-tooltip-top","cm-tooltip-bottom","cm-tooltip-force"),e.removeAttribute("cm-tooltip-msg")}))},appendHelpIcon:function(e,t,n,o,r){var i=this;Object.isObjectLiteral(t)&&(void 0===n&&(n=t.direction),void 0===o&&(o=t.style),void 0===r&&(r=t.force),t=t.message),this.getElementList(e).forEach((function(e){var a=document.createElement("i");a.classList.add("cm-icon"),a.innerHTML="?",o&&a.css(o),e.append(a),i.addTooltip(a,t,n,r)}))},removeHelpIcon:function(e){this.getElementList(e).forEach((function(e){var t=e.querySelectorAll("i.cm-icon");t&&t.length&&t.forEach((function(e){return e.remove()}))}))},_modalsInit:!1,_modalOnClose:null,_modalOpened:!0,_modalNotExitable:!1,_initModalFunctionality:function(){var e=this;if(!this._modalsInit||!document.querySelector("#cm-modal-outer")){var t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("div");t.className="cm-modal-inner",n.setAttribute("id","cm-modal-outer"),o.setAttribute("id","cm-modal-container"),document.body.append(o),o.append(n),n.append(t),n.style.visibility="hidden",n.addEventListener("click",(function(t){e._modalNotExitable||t.target.closest("#cm-modal-container div")||e.closeModal()})),this._modalsInit=!0}},isModalOpen:function(){return!!this._modalsInit&&(this._modalOpened=null!==document.querySelector("#cm-modal-outer").offsetParent,this._modalOpened)},openModal:function(e,t){return this.setModal(!0,e,t)},setModal:function(e,t,n){this._modalsInit||this._initModalFunctionality(),n=n||{};var o=document.querySelector("#cm-modal-outer");if(e){var r=o.querySelector(".cm-modal-inner");if(r.setAttribute("id",n.id?n.id:""),"undefined"!=typeof jQuery&&t instanceof jQuery||"undefined"!=typeof $&&t instanceof $?(r.innerHTML="",r.append(t[0])):t instanceof Element?(r.innerHTML="",r.append(t)):"string"==typeof t&&(r.innerHTML=t),!n.hideCloser){var i=document.createElement("div");i.setAttribute("id","cm-modal-closer"),i.addEventListener("click",this.closeModal.bind(this,!1)),r.append(i)}return n.showBackground?o.css("background-color",""):o.css("background-color","transparent"),n.onClose?this._modalOnClose=n.onClose:this._modalOnClose=null,o.style.visibility="",this._modalOpened=!0,this._modalNotExitable=!!n.notExitable,r}this.closeModal()},setModalAsLoading:function(e,t){e||(e="Loading.."),t||(t={}),t.id||(t.id="cm-modal-loading-dialog"),void 0===t.addDetails&&(t.addDetails=!1),t.addDetailsText||(t.addDetailsText="Please wait.."),void 0===t.showBackground&&(t.showBackground=!0),void 0===t.notExitable&&(t.notExitable=!0),void 0===t.hideCloser&&(t.hideCloser=!0);var n=document.createElement("div");if(n.innerHTML="&nbsp;"+e,t.addDetails){var o=document.createElement("p");o.className="cm-modal-loading-details",o.innerHTML=t.addDetailsText,n.append(o)}return this.openModal(n,t)},changeModal:function(e,t,n){if(this._modalsInit||this._initModalFunctionality(),!this.isModalOpen())return this.setModal(!0,e),void(t&&t());var o=document.querySelector("#cm-modal-outer").querySelector(".cm-modal-inner"),r=o.offsetWidth+"px",i=o.offsetHeight+"px";if(o.css({width:r,height:i}),o.innerHTML=e,t&&t(),!n){var a=document.createElement("div");a.setAttribute("id","cm-modal-closer"),a.addEventListener("click",this.closeModal.bind(this,!1)),o.append(a)}o.css({height:"",width:""});var s=o.offsetWidth+"px",c=o.offsetHeight+"px";o.css({width:r,height:i,overflow:"hidden"});var l="width 0.2s ease, height 0.2s ease";return o.css({"-webkit-transition":l,"-moz-transition":l,transition:l}),window.setTimeout((function(){o.css({height:c,width:s}),window.setTimeout((function(){o.css({height:"",width:"","-webkit-transition":l,"-moz-transition":l,transition:l,overflow:""})}),210)}),10),o},hideModal:function(e){this.closeModal(e)},closeModal:function(e){var t=document.querySelector("#cm-modal-outer");t.style.visibility="hidden",t.querySelector(".cm-modal-inner").innerHTML="",this._modalOnClose&&(e||this._modalOnClose(),this._modalOnClose=null,this._modalOpened=!1)}};if(navigator&&window){var s={};if(String.prototype.matchAll)for(var c=navigator.userAgent.toLowerCase().matchAll(/(chrome|firefox|safari|opera|opr|edge|edg|brave|samsungbrowser|ucbrowser|yabrowser|qtwebengine(?=\/))\/?\s*(\d+)/g),l=c.next();!l.done;)s[l.value[1]]=parseInt(l.value[2]),l=c.next();else{var u=navigator.userAgent.toLowerCase().match(/(msie|trident(?=\/))\/?\s*(\d+)/);"msie"===u[1]?(s.isIE=!0,s.ie=s.ieVersion=parseInt(u[2])):"trident"===u[1]&&(s.isIE=!0,s.ie=s.ieVersion=parseInt(ua.split("rv:")[1]))}s.samsungbrowser?(s.samsung=s.samsungbrowser,delete s.samsungbrowser,s.isSamsungInternet=!0):s.ucbrowser?s.isUCBrowser=!0:s.yabrowser?(s.yandex=s.yabrowser,delete s.yabrowser,s.isYandex=!0):s.qtwebengine?s.isQtWebEngine=!0:s.opera||s.opr?(s.opera||(s.opera=s.opr,delete s.opr),s.isOpera=!0):s.edg||s.edge?(s.edge||(s.edge=s.edg,delete s.edg),s.isEdge=!0):s.brave?s.isBrave=!0:s.chrome?s.isChrome=!0:s.safari?s.isSafari=!0:s.firefox&&(s.isFirefox=!0),window.browser=window.browserType=s}a.getElementList=i.getElementList,i.ui=a;const d=i})(),o.default})()));