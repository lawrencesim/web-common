export default {

    getElement(element) {
        if(!element) return undefined;
        if(typeof element === "string") {
            return document.querySelector(element);
        }
        if(typeof jQuery !== "undefined" && element instanceof jQuery) {
            let get = element.get();
            return get.length ? get[0] : undefined;
        }
        if(element[Symbol.iterator] === "function") {
            if(Array.isArray(element)) {
                return element.length && element[0] || undefined;
            }
            let next = element.next();
            return next.done ? undefined : next.value;
        }
        return element;
    }, 

    getElementList(element) {
        if(!element) return [];
        if(typeof element === "string") {
            return Array.from(document.querySelectorAll(element));
        }
        if(element[Symbol.iterator] === "function") {
            return Array.isArray(element) ? element : Array.from(element);
        }
        if(typeof jQuery !== "undefined" && element instanceof jQuery) {
            return element.get();
        }
        return [element];
    }, 

    extend(obj, extend, allowOverwrite, deepCopy) {
        if(!extend) return !deepCopy ? obj : JSON.parse(JSON.stringify(obj));
        if(!obj) return !deepCopy ? extend : JSON.parse(JSON.stringify(extend));
        let clone = {};
        for(let key in obj) {
            clone[key] = !deepCopy ? obj[key] : JSON.parse(JSON.stringify(obj[key]));
        }
        for(let key in extend) {
            if(allowOverwrite || !(key in clone)) {
                clone[key] = !deepCopy ? extend[key] : JSON.parse(JSON.stringify(extend[key]));
            }
        }
        return clone;
    }, 
    
    getUrlGetVars() {
        var vars = {};
        window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi, 
            (m,key,value) => { vars[key] = value; }
        );
        return vars;
    }, 

    newWindow(url, name, width, height, minimal) {
        if(Object.isObject(url)) {
            if(typeof name === "undefined") name = url.name;
            if(typeof width === "undefined") width = url.width;
            if(typeof height === "undefined") height = url.height;
            if(typeof minimal === "undefined") minimal = url.minimal;
        }
        // center window, from http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
        // Fixes dual-screen position                          Most browsers       Firefox
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left, 
            dualScreenTop  = window.screenTop  !== undefined ? window.screenTop  : screen.top, 
            winWidth  = window.innerWidth  ? window.innerWidth  : document.documentElement.clientWidth  ? document.documentElement.clientWidth  : screen.width, 
            winHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height, 
            left = dualScreenLeft + 0.5*(winWidth - width), 
            top  = dualScreenTop  + 0.5*(winHeight - height), 
            options = "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top;
        if(minimal) options += ", toolbar=no, menubar=no, status=no, location=no";
        var newWin = window.open(url, '', options);
        if(!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            alert("Could not open new window, to view '" + name + "' allow an exception for this domain in your pop-up blocker's settings.");
        } else {
            if(newWin) newWin.focus();
            return newWin;
        }
    }, 

    // note, we could update this to use fetch() API, but at that point, easier to just use fetch API
    ajax(params) {
        if(!params)          params = {};
        if(!params.url)      throw "No URL provided";
        if(!params.method)   params.method = "GET";
        if(!params.dataType) params.dataType = "";
        if(!params.async)    params.async = true;
        if(!params.success)  params.success = () => {};
        if(!params.error)    params.error = () => {};

        var complete = (resolve, xhr, statusText) => {
            try {
                if(params.complete) params.complete(xhr, statusText);
            } finally {
                if(resolve) resolve();
            }
        };

        let methodIsPost = params.method.toUpperCase() === "POST";
        if(!methodIsPost && params.data) {
            if(!params.url.endsWith("?")) params.url += "?";
            let reqParams = [];
            for(let key in params.data) {
                reqParams.push(encodeURI(key + '=' + params.data[key]));
            }
            params.url += reqParams.join("&");
        }

        var xhr = new XMLHttpRequest(), 
            responseType = params.dataType.toLowerCase();
        // NOTE: json response type not supported in IE, Edge, or Opera
        if(responseType !== "json") xhr.responseType = params.dataType;
        var onReadyStateChange = resolve => {
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200) {
                var res = xhr.responseText;
                if(responseType === "json") {
                    try {
                        res = JSON.parse(res);
                    } catch(e) {
                        params.error(xhr, xhr.statusText, xhr.responseText);
                    }
                    params.success(res, xhr.statusText, xhr);
                } else {
                    params.success(res, xhr.statusText, xhr);
                }
            } else {
                params.error(xhr, xhr.statusText, xhr.responseText);
            }
            complete(resolve, xhr, xhr.statusText);
        };
        var finishXHR = resolve => {
            xhr.onreadystatechange = evt => onReadyStateChange(resolve);
            xhr.open(
                params.method, 
                params.url, 
                params.async, 
                params.user, 
                params.password
            );
            if(methodIsPost) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(reqParams);
            } else {
                xhr.send();
            }
        };
        if(params.promise) {
            return new (Promise || require('promise-polyfill').default)(finishXHR);
        }
        finishXHR();
        return xhr;
    }, 

    animate(element, properties, durationMs, timingFunction, complete) {
        if(Object.isObject(element)) {
            if(typeof properties === "undefined") properties = element.properties;
            if(typeof durationMs === "undefined") durationMs = element.durationMs || element.duration;
            if(typeof timingFunction === "undefined") timingFunction = element.timingFunction || element.timing;
            if(typeof complete === "undefined") complete = element.complete;
        }

        if(typeof durationMs !== "number") throw "Duration must be specified as numeric type in milliseconds.";
        let durationSecs = durationMs*0.001 + "s", 
            transition = "";
        for(let key in properties) {
            if(transition) transition += ", ";
            transition += key + " " + durationSecs + " " + (timingFunction || "ease");
        }
        element.css({
            '-webkit-transition': transition, 
            '-moz-transition': transition, 
            'transition': transition
        });
        var PO = Promise || require('promise-polyfill').default, 
            delayMs = 5;
        return new PO(resolve => {
            window.setTimeout(() => {
                element.css(properties);
                resolve();
            }, delayMs);
        }).then(() => {
            return new PO(resolve => {
                window.setTimeout(() => {
                    element.css({
                        '-webkit-transition': "", 
                        '-moz-transition': "", 
                        'transition': ""
                    });
                    if(complete) complete();
                    resolve();
                }, durationMs+delayMs);
            });
        });
    }
    
};
