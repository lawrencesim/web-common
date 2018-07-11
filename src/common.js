!function(root, factory) {
    // CommonJS-based (e.g. NodeJS) API
    if(typeof module === "object" && module.exports) {
        module.exports = factory();
    // AMD-based (e.g. RequireJS) API
    } else if(typeof define === "function" && define.amd) {
        define(factory);
    // Regular instantiation 
    } else {
        root.common = factory();
    }
}(this, function() {
    
    if(!window.cmLibGlobals || !window.cmLibGlobals.helpersDefined) {
        window.cmLibGlobals = {};
        
        //****************************************************************************************************
        // Misc prototype extensions
        //****************************************************************************************************
        /**
         * Capitalize the first letter of every word. (A word is determined by any string preceded by 
         * whitespace, as such ignores second word in hyphenated compound words).
         * @returns {string} Capitalized version of this string.
         */
        String.prototype.capitalize = function() {
            return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };
        
        /**
         * Return string value of this number with commas added.
         * @param {number} precision - Decimal precision.
         * @returns {String}
         */
        Number.prototype.addCommas = function(precision){
            var n = this, 
                precision = isNaN(precision = Math.abs(precision)) ? 0 : precision, 
                sign = n < 0 ? "-" : "", 
                number = parseInt(n = Math.abs(+n || 0).toFixed(precision)) + "", 
                digits = (digits = number.length) > 3 ? digits % 3 : 0;
            return sign + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (precision ? "." + Math.abs(n - number).toFixed(precision).slice(2) : "");
        };
        
        /**
         * Quickly set multiple attributes at once.
         * @param {Object} attrs - Literal of key-value attribute pairs.
         */
        Element.prototype.setAttributes = function(attrs) {
            for(var key in attrs) {
                this.setAttribute(key, attrs[key]);
            }
        };
        
        /**
         * Shortcut for setting CSS styles.
         * @param {Object|String} style - Either a string for style name (paired with 2nd attribute value), or
         *        an object literal of multiple styles as key-value pairs.
         * @param {String} [value] - If style is key/string, the value for said CSS style.
         */
        Element.prototype.css = function(style, value) {
            if(style instanceof String && value instanceof String) {
                this.style[style] = value;
            } else {
                for(var key in style) {
                    this.style[key] = style[key];
                }
            }
        };
        
        //****************************************************************************************************
        // Date prototype extensions
        //****************************************************************************************************
        /**
         * Because javascript's Date library is lacking. Major difference is it ensures entered as UTC time 
         * and month is supplied as 1-12 number, not 0-11.
         * @param {number} year - Either year or millisecond epoch time (if latter, leave rest params null)
         * @param {number} month - Month 1-12 !!Important!!, this is different than normal, which works 0-11
         * @param {number} day - Day 1-31
         * @param {number} hour - Hour 0-23
         * @param {number} min - Minute 0-59
         * @param {number} sec - Second 0-59
         * @returns {Date}
         */
        DateUTC = function(year, month, day, hour, min, sec) {
            if(!month && !day && !hour && !min && !sec) {
                return new Date(parseInt(year));
            }
            return new Date(Date.UTC(
                parseInt(year), 
                month ? parseInt(month)-1 : 0, 
                day   ? parseInt(day)     : 1, 
                hour  ? parseInt(hour)    : 0, 
                min   ? parseInt(min)     : 0, 
                sec   ? parseInt(sec)     : 0
            ));
        };
        window.DateUTC = DateUTC;
        
        /**
         * Convert date to UTC date assuming that the time as given in local time was incorrectly meant for 
         * UTC. E.g., a value of 8:00 PST will just be converted to 8:00 UTC instead of properly translated to
         * 16:00 UTC.
         * @returns {Date}
         */
        Date.prototype.asUTC = function() {
            return new Date(Date.UTC(
                this.getFullYear(), 
                this.getMonth(), 
                this.getDate(),  
                this.getHours(), 
                this.getMinutes(), 
                this.getSeconds()
            ));
        };
        
        /**
         * Convert to date dropping any time information and assuming 12:00 AM UTC. Uses UTC date of instance.
         * E.g. Jan 1 at 20:00 hours PST will result in Jan 2 at 0:00 hours UTC, or Jan 1 at 16:00 hours PST.
         * @returns {Date}
         */
        Date.prototype.asUTCDate = function() {
            return new Date(Date.UTC(
                this.getUTCFullYear(), 
                this.getUTCMonth(), 
                this.getUTCDate()
            ));
        };
        
        /**
         * Convert to date dropping any time information and assuming 12:00 AM UTC. Uses local date of 
         * instance. Thus Jan 1 at 20:00 hours PST will result in Jan 1 at 0:00 hours UTC, or Dec 31 of the 
         * previous year in PST.
         * @returns {Date}
         */
        Date.prototype.toUTCDate = function() {
            return new Date(Date.UTC(
                this.getFullYear(), 
                this.getMonth(), 
                this.getDate()
            ));
        };
        
        /**
         * Get new date instance with amount of days added (or subtracted if negative).
         * @param {number} days
         * @returns {Date}
         */
        Date.prototype.addDays = function(days) {
            return new Date(this.getTime() + days*86400000);
        };
        
        /**
         * Get the number of days in this date instance's (UTC) month and year.
         * @returns {number} number of days in month
         */
        Date.prototype.daysInMonth = function() {
            return (new Date(this.getUTCFullYear(), this.getUTCMonth()+1, 0)).getDate();
        };
        
        //****************************************************************************************************
        // JQuery specific helper functions
        //****************************************************************************************************
        window.cmLibGlobals.initJQueryHelpers = function() {
            if(!window.cmLibGlobals.jqueryHelpersDefined) {
                /**
                 * Center itself in the window with absolute positioning.
                 * @returns {jQuery} Itself.
                 */
                jQuery.fn.center = function() {
                    this.css({
                        position: "absolute", 
                        top:  Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()),
                        left: Math.max(0, (($(window).width()  - $(this).outerWidth())  / 2) + $(window).scrollLeft())
                    });
                    return this;
                };

                /**
                 * Add tooltip.
                 * @param {string} tooltipMsg - The tooltip content.
                 * @param {string} [direction="right"] - Side in which tooltip should appear.
                 * @param {boolean} [force] - If true, tooltip is always visible.
                 * @returns {jQuery} Itself.
                 */
                jQuery.fn.addTooltip = function(tooltipMsg, direction, force) {
                    if(!tooltipMsg) {
                        this.removeClass("cm-tooltip-left cm-tooltip-right cm-tooltip-top cm-tooltip-bottom cm-tooltip-force");
                        this.removeAttribute("cm-tooltip-msg");
                        return;
                    }
                    var dirs = ["right", "left", "top", "bottom"], 
                        iDir = -1;
                    if(direction) {
                        iDir = $.inArray(direction.toLowerCase().trim(), dirs);
                    }
                    if(iDir >= 0) {
                        for(var i = 0; i < dirs.length; i++) {
                            if(i === iDir) {
                                this.addClass("cm-tooltip-"+dirs[i]);
                            } else {
                                this.removeClass("cm-tooltip-"+dirs[i]);
                            }
                        }
                    }
                    if(!!force) { this.addClass("cm-tooltip-force"); }
                    this.attr("cm-tooltip-msg", tooltipMsg);
                    return this;
                };

                /**
                 * Add help icon with tooltip.
                 * @param {string} tooltipMsg - The tooltip content.
                 * @param {string} [direction="right"] - Side in which tooltip should appear.
                 * @param {Object} [style] - Additional optional styles to the icon.
                 * @param {boolean} [force] - If true, tooltip is always visible.
                 * @returns {jQuery} Itself.
                 */
                jQuery.fn.appendHelpIcon = function(tooltipMsg, direction, style, force) {
                    if(!direction) { direction = "top"; }
                    var i = $("<i>", {"class": "cm-icon", "text": "?"}).appendTo(this)
                        .addTooltip(tooltipMsg, direction, force);
                    if(style) { i.css(style); }
                    return this;
                };

                jQuery.fn.removeHelpIcon = function() {
                    this.find(".cm-icon").remove();
                };

                window.cmLibGlobals.jqueryHelpersDefined = true;
            }
        };
        if(typeof jQuery !== "undefined" && typeof $ !== "undefined") {
            window.cmLibGlobals.initJQueryHelpers();
        }
        
        //****************************************************************************************************
        // Useful functions to put in global
        //****************************************************************************************************
        /**
         * Formats given element selection as iterable of DOM Element objects. JQuery selections are 
         * transformed via get(), NodeLists or otherwise iterable are return as is, and a singular element 
         * selection is simply wrapper in an array.
         * @param {jQuery|NodeList|Element} element - Object to return as element list.
         * @returns {Array} Array of Element objects.
         */
        window.cmLibGlobals.getElementList = function(element) {
            if(!element) return [];
            if(jQuery && element instanceof jQuery) {
                return element.get();
            }
            if(element[Symbol.iterator] === "function") {
                return element;
            }
            return [element];
        };
        
        //****************************************************************************************************
        // Misc. Globals
        //****************************************************************************************************
        window.defaultErrorMessage = "This site is experiencing some technical difficulties. Please try again later. ";
        
        // note, none of these browser checks are future-proof, periodically update as necessary
        var ua = navigator.userAgent.toLowerCase();
        window.browser = window.browserType = {};
        window.browserType.isOpera   = (!!window.opr && !!opr.addons) || !!window.opera || ua.indexOf(' opr/') >= 0;
        window.browserType.isFirefox = typeof InstallTrigger !== 'undefined';
        window.browserType.isSafari  = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        window.browserType.isChrome  = !!window.chrome && !!window.chrome.webstore && !window.browserType.isOpera;
        window.browserType.isIE      = /*@cc_on!@*/false || !!document.documentMode;
        window.browserType.isEdge    = !window.browserType.isIE && !!window.StyleMedia;
        if(window.browserType.isIE) {
            if(ua.indexOf('msie') >= 0) {
                window.browserType.ieVersion = parseInt(ua.split('msie')[1]);
            } else if(ua.indexOf('trident/') >= 0) {
                window.browserType.ieVersion = parseInt(ua.split('rv:')[1]);
            } else {
                window.browserType.ieVersion = 9999;
            }
        } else if(window.browserType.isEdge) {
            var match = ua.match(/edge\/([0-9]+)\./);
            window.browserType.edgeVersion = match ? parseInt(match[1]) : 9999;
        } else if(window.browserType.isChrome) {
            var match = ua.match(/chrom(e|ium)\/([0-9]+)\./);
            window.browserType.chromeVersion = match ? parseInt(match[2]) : 9999;
        } else if(window.browserType.isFirefox) {
            var match = ua.match(/firefox\/([0-9]+)\./);
            window.browserType.firefoxVersion = match ? parseInt(match[1]) : 9999;
        } else if(window.browserType.isSafari) {
            var match = ua.match(/safari\/([0-9]+)\./);
            window.browserType.safariVersion = match ? parseInt(match[1]) : 9999;
        } else if(window.browserType.isOpera) {
            var match = ua.match(/opera|opr\/([0-9]+)\./);
            window.browserType.operaVersion = match ? parseInt(match[1]) : 9999;
        }
        
        //****************************************************************************************************
        // Prep for modal content
        //****************************************************************************************************
        // Add modal content (if not already existing)
        (function() {
            if(!document.querySelector("#cm-modal-outer")) {
                var inner = document.createElement("div"), 
                    outer = document.createElement("div"), 
                    container = document.createElement("div");
                inner.className = "cm-modal-inner";
                outer.setAttribute("id", "cm-modal-outer");
                container.setAttribute("id", "cm-modal-container");
                document.body.append(container);
                container.append(outer);
                outer.append(inner);
            }
            var outer = document.querySelector("#cm-modal-outer");
            outer.style['visibility'] = "hidden";
            // Add modal close functionality by clicking anywhere not in the modal
            outer.addEventListener('click', function(evt) {
                if(window.cmLibGlobals.modalNotExitable) { return; }
                if(!evt.target.closest('#cm-modal-container div')) {
                    window.cmLibGlobals.closeModal();
                }
            });
        }());
        /**
         * Close any open modal.
         * @param {boolean} suppressOnClose - If true, suppresses onClose event, if one is attached.
         */
        window.cmLibGlobals.closeModal = function(suppressOnClose) {
            var outer = document.querySelector("#cm-modal-outer");
            outer.style['visibility'] = "hidden";
            outer.querySelector(".cm-modal-inner").innerHTML = "";
            if(window.cmLibGlobals.modalOnClose) {
                if(!suppressOnClose) {
                    window.cmLibGlobals.modalOnClose();
                }
                window.cmLibGlobals.modalOnClose = null;
                window.cmLibGlobals.modalOpened = false;
            }
        };
        // set global helpers as defined
        window.cmLibGlobals.helpersDefined = true;
    }
    
    //********************************************************************************************************
    // Return object of utility functions
    //********************************************************************************************************
    var commonGlobals = window.cmLibGlobals;
    
    return {
        
        /**
         * Find GET parameters in current URL.
         * @returns {Object} Literal of key-value GET variables found in URL.
         */
        getUrlGetVars: function() {
            var vars = {};
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }, 
        
        /**
         * Adds the handling of adding/removing the 'grab' and 'grabbing' css classes on mouse drag events. 
         * Original for the map (as OpenLayers doesn't do this automatically) but useful for a lot of other 
         * stuff, like custom dialog boxes/windows.
         * @param {Element|NodeList|jQuery} element - Element ot add functionality to. May be single element, 
         *        a NodeList/Array of elements, or a jQuery selection.
         */
        addGrabCursorFunctionality: function(element) {
            var elList = commonGlobals.getElementList(element);
            for(var i = 0; i < elList.length; ++i) {
                e = elList[i];
                e.classList.add("grab");
                e.addEventListener('mousedown', function() {
                    this.classList.remove("grab");
                    this.classList.add("grabbing");
                });
                e.addEventListener('mouseup', function() {
                    this.classList.remove("grabbing");
                    this.classList.add("grab");
                });
            }
        }, 

        /**
         * Custom function to create a new window. Has a lot of useful functionality that gets commonly used, 
         * e.g. having every new window centered on the monitor, even accounting for dual monitor setups.
         * @param {event} event - Event object (useful on links where you want to keep the middle-mouse clicks
         *        and ctrl+left-clicks as new tabs as those are filtered and ignored).
         * @param {string} url - Link URL.
         * @param {string} name - New window name.
         * @param {number} width - Width in pixels.
         * @param {number} height - Height in pixels.
         * @param {boolean} minimal - If true forces hiding of menubar, statusbar, and location (although with
         *        many modern browsers this has no effect).
         * @returns {Window} The new window object.
         */
        newWindow: function(event, url, name, width, height, minimal) {
            if(!event) event = window.event;
            if(event === undefined || !(event.which === 2 || (event.which === 1 && event.ctrlKey))) {
                // center window, from http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
                // Fixes dual-screen position                          Most browsers       Firefox
                var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
                var dualScreenTop  = window.screenTop  !== undefined ? window.screenTop  : screen.top;
                var winWidth  = window.innerWidth  ? window.innerWidth  : document.documentElement.clientWidth  ? document.documentElement.clientWidth : screen.width;
                var winHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
                var left = dualScreenLeft + 0.5*(winWidth - width);
                var top  = dualScreenTop  + 0.5*(winHeight - height);
                var options = "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top;
                if(minimal) {
                    options += ", scrollbars=yes, menubar=no, statusbar=no, location=no";
                } else {
                    options += ", scrollbars=yes, menubar=yes, statusbar=yes, location=yes";
                }
                var newWin = window.open(url, '', options);
                if(!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
                    alert("Could not open new window, to view '" + name + "' allow an exception for this domain in your pop-up blocker's settings.");
                    return null;
                } else {
                    if(newWin) { newWin.focus(); }
                    return newWin;
                }
            }
        }, 
        
        /**
         * Create a dropdown menu on an element.
         * @param {jQuery} element - jQuery object for element to add functionality to.
         * @param {array} menu - An array of object literals defining the menu. The parameters 'id', 'class', 
         *        'style', and 'text', if they exist, are applied. For functionality, either add 'href' and 
         *        optionally 'target' parameters or supply a callback to an 'onClick' parameter. To create a 
         *        submenu, simply add a 'menu' parameter with the same nested structure.
         */
        createDropdown: function(element, menu) {
            var addDropdown = function(outer, menuObj) {
                var inner = document.createElement("div");
                inner.className = 'cm-dropdown-menu';
                outer.append(inner);
                for(var j = 0; j < menuObj.length; j++) {
                    var m = menuObj[j];
                    var menuItem = document.createElement("div");
                    menuItem.setAttribute("id", m.id ? m.id : '');
                    menuItem.className = 'cm-dropdown-menu-item';
                    inner.append(menuItem);
                    if(m.class) { menuItem.classList.add(m.class); }
                    if(m.style) { menuItem.css(m.style); }
                    if(m.href) {
                        var a  = document.createElement("a");
                        a.setAttributes({
                            href: m.href, 
                            target: m.target ? m.target : '',
                            text: m.text
                        });
                        menuItem.append(a);
                    } else {
                        menuItem.innerHTML = m.text;
                    }
                    if(m.onClick) {
                        menuItem.addEventListener('click', m.onClick);
                    }
                    if(m.menu) {
                        menuItem.classList.add("cm-dropdown");
                        addDropdown(menuItem, m.menu);
                    }
                }
            };
            var elList = commonGlobals.getElementList(element);
            for(var i = 0; i < elList.lenght; ++i) {
                elList[i].classList.add("cm-dropdown");
                addDropdown(elList[i], menu);
            }
        }, 
        
        /**
         * Remove dropdown menu functionality from an element.
         * @param {jQuery} element - jQuery object for element to remove from.
         */
        clearDropdown: function(element) {
            var elList = commonGlobals.getElementList(element);
            for(var i = 0; i < elList.lenght; ++i) {
                elList[i].classList.remove("cm-dropdown");
                var menuList = elList[i].querySelectorAll("cm-dropdown-menu");
                for(var j = 0; j < menuList.lenght; ++j) {
                    menuList[j].remove();
                }
            }
        }, 
        
        //****************************************************************************************************
        // Modal dialogs. On first loading common 3 elements (#cm-modal-outer, #cm-modal-container, and 
        // #cm-modal-content) are added to the document body. These are required for the below functions to 
        // work.
        //****************************************************************************************************
        /**
         * Check whether modal is open.
         * @returns {Boolean} Whether modal window is opened.
         */
        isModalOpen: function() {
            window.cmLibGlobals.modalOpened = document.querySelector("#cm-modal-outer").offsetParent !== null;
            return window.cmLibGlobals.modalOpened;
        }, 

        /**
         * Create (or destroy) a modal dialog.
         * @param {string} content - The HTML content of the modal dialog.
         * @param {Object} [options]
         * @param {string} [options.id] - Whether to attach an ID to the modal content div.
         * @param {boolean} [options.hideCloser] - If set true, does not automatically apply a close modal "X"
         *        to the top right of the content.
         * @param {boolean} [options.notExitable] - Modal content closes when clicking outside of modal, by 
         *        default. Set true to override this (that is, modal can only be closed programmatically -- 
         *        which by default is still allowed via the closer).
         * @param {boolean} [options.showBackground] - Whether to have a semi-transparent div over the 
         *        background (so as to visually signify the modal status). Keep in mind in older browsers that
         *        don't support transparency it'll just grey out the entire background.
         * @param {callback} [options.onClose] - Function to run before closing modal. Note this does not run 
         *        if simply changing/swapping out modal content.
         * @return {Element} Element for modal container ("#cm-modal-outer .cm-modal-inner") or none if modal 
         *         was closed.
         */
        openModal: function(content, options) {
            this.setModal(true, content, options);
        }, 
        
        /**
         * Create (or destroy) a modal dialog.
         * @param {boolean} visible - True creates, false closes.
         * @param {string|Element|jQuery} content - The HTML content of the modal dialog.
         * @param {Object} [options]
         * @param {string} [options.id] - Whether to attach an ID to the modal content div.
         * @param {boolean} [options.hideCloser] - If set true, does not automatically apply a close modal "X"
         *        to the top right of the content.
         * @param {boolean} [options.notExitable] - Modal content closes when clicking outside of modal, by 
         *        default. Set true to override this (that is, modal can only be closed programmatically -- 
         *        which by default is still allowed via the closer).
         * @param {boolean} [options.showBackground] - Whether to have a semi-transparent div over the 
         *        background (so as to visually signify the modal status). Keep in mind in older browsers that
         *        don't support transparency it'll just grey out the entire background.
         * @param {callback} [options.onClose] - Function to run before closing modal. Note this does not run 
         *        if simply changing/swapping out modal content.
         * @return {Element} Element for modal container ("#cm-modal-outer .cm-modal-inner") or none if modal 
         *         was closed.
         */
        setModal: function(visible, content, options) {
            if(!options) { options = {}; }
            var modalContainer = document.querySelector("#cm-modal-outer");
            if(!visible) {
                commonGlobals.closeModal();
            } else {
                var modalContent = modalContainer.querySelector(".cm-modal-inner");
                modalContent.setAttribute("id", options.id ? options.id : "");
                if(
                    (typeof jQuery !== "undefined" && content instanceof jQuery)
                    || (typeof $ !== "undefined" && content instanceof $)
                ) {
                    modalContent.innerHTML = "";
                    modalContent.append(content[0]);
                } else if(content instanceof Element) {
                    modalContent.innerHTML = "";
                    modalContent.append(content);
                } else if(typeof content === "string") {
                    modalContent.innerHTML = content;
                }
                if(!options.hideCloser) {
                    var closer = document.createElement("div");
                    closer.setAttribute("id", "cm-modal-closer");
                    closer.addEventListener("click", function() {
                        commonGlobals.closeModal();
                    });
                    modalContent.append(closer);
                }
                if(!options.showBackground) {
                    modalContainer.css('background-color', 'transparent');
                } else {
                    modalContainer.css('background-color', '');
                }
                if(options.onClose) {
                    commonGlobals.modalOnClose = options.onClose;
                } else {
                    commonGlobals.modalOnClose = null;
                }
                modalContainer.style["visibility"] = "";
                commonGlobals.modalOpened = true;
                commonGlobals.modalNotExitable = !!options.notExitable;
                return modalContent;
            }
        }, 
        
        /**
         * Create (or destroy) a modal dialog with a default loading message (in this case: "Loading..").
         * @param {boolean} visible - True creates, false closes.
         * @param {Object} options
         * @param {string} [content="Loading.."] - The loading message string.
         * @param {string} [options.imgUrl="images/loader.gif"] - The link to a loading image. If 
         *        null/undefined, looks for "images/loader.gif". If false, does not append any loading image.
         * @param {boolean} [options.addDetails=true] - If true, adds paragraph with class `loading-details` 
         *        for use of addition information.
         * @param {string} [options.addDetailsText="Please wait.."] - If options.addDetails is true, loads 
         *        this as loading details text.
         * @param {string} [options.id="modal-loading-dialog"] - ID attached to modal content div.
         * @param {boolean} [options.showBackground=true] - Whether to hve a semi-transparent div over the 
         *        background (so as to visually signify the modal status). Keep in mind in older browsers that
         *        don't support transparency it'll just grey out the entire background.
         * @param {boolean} [options.notExitable=true] - Modal content closes when clicking outside of modal,
         *        bt default.  Set true to override this (that is, modal can only be closed programmatically).
         * @param {boolean} [options.hideCloser=true] - If set true, does not automatically apply a close modal
         *        "X" to the top right of the content.
         * @param {callback} [options.onClose] - Function to run before closing modal. Note this does not run 
         *        if simply changing/swapping out modal content.
         * @return {Element} Element for modal container ("#cm-modal-outer .cm-modal-inner") or none if modal 
         *         was closed.
         */
        setModalAsLoading: function(visible, content, options) {
            if(!visible) {
                this.setModal(false);
            } else {
                if(!content)                             { content = "Loading.."; }
                if(!options)                             { options = {}; }
                if(!options.id)                          { options.id = "cm-modal-loading-dialog"; }
                if(options.addDetails === undefined)     { options.addDetails = false; }
                if(!options.addDetailsText)              { options.addDetailsText = "Please wait.."; }
                if(options.showBackground === undefined) { options.showBackground = true; }
                if(options.notExitable === undefined)    { options.notExitable = true; }
                if(options.hideCloser === undefined)     { options.hideCloser = true; }
                if(!options.imgUrl && options.imgUrl !== false)  { options.imgUrl = "images/loader.gif"; }
                var loadingDialog = document.createElement("div");
                loadingDialog.innerHTML = "&nbsp;" + content;
                if(options.imgUrl) {
                    var img = document.createElement("img");
                    img.setAttributes({'src': options.imgUrl, 'alt': 'loading'});
                    loadingDialog.prepend(img);
                }
                if(options.addDetails) {
                    var p = document.createElement("p");
                    p.className = 'cm-modal-loading-details';
                    p.innerHTML = options.addDetailsText;
                    loadingDialog.append(p);
                }
                return this.setModal(visible, loadingDialog, options);
            }
        }, 
        
        /**
         * Change modal dialog content while leaving all other options the same. Added benefit of measures to 
         * keep the content-size changes from being too jarring when swapping content. However, if there is an
         * inline width/height defined in the style, these will be lost.
         * @param {string} content - The HTML content of the modal dialog.
         * @param {callback} [prepContentCallback] - If some prep work is needed before determining the new 
         *        dimensions.
         * @param {boolean} [hideCloser] - Due to HTML refresh, closer will be readded unless this is set to 
         *        true.
         * @return {Element} Element for modal container ("#cm-modal-outer .cm-modal-inner") or none if modal 
         *         was closed.
         */
        changeModal: function(content, prepContentCallback, hideCloser) {
            if(!this.isModalOpen()) {
                this.setModal(true, content);
                if(prepContentCallback) { prepContentCallback(); }
                return;
            }
            var modalContent = document.querySelector("#cm-modal-outer").querySelector(".cm-modal-inner"), 
                oldWidth  = modalContent.offsetWidth, 
                oldHeight = modalContent.offsetHeight;
            // fix dimensions
            modalContent.css({'width': oldWidth, 'height': oldHeight});
            // new content
            modalContent.innerHTML = content;
            if(prepContentCallback) prepContentCallback();
            // add closer
            if(!hideCloser) {
                var closer = document.createElement("div");
                closer.setAttribute("id", "cm-modal-closer");
                closer.addEventListener("click", function() {
                    commonGlobals.closeModal();
                });
                modalContent.append(closer);
            }
            // fast store new dims before reverting
            modalContent.css({'height': '', 'width': ''});
            var newWidth  = modalContent.offsetWidth, 
                newHeight = modalContent.offsetHeight;
            modalContent.css({'width': oldWidth, 'height': oldHeight});
            // animate then reset to auto
            var duration = 0.2;
            var transitionValue = "width " + duration + "s ease 0, height " + duration + "s ease 0";
            modalContent.css({
                '-webkit-transition': transitionValue, 
                '-moz-transition': transitionValue, 
                'transition': transitionValue
            });
            modalContent.css({height: newHeight, width: newWidth});
            window.setTimeout(duration, function() {
                modalContent.css({'height': '', 'width': ''});
            });
            return modalContent;
        }, 
        
        /**
         * Hide any currently visible modal. Same as closeModal().
         * @param {boolean} suppressOnClose - If true, suppresses onClose event, if one is attached.
         */
        hideModal: function(suppressOnClose) {
            commonGlobals.closeModal(suppressOnClose);
        }, 
        
        /**
         * Hide any currently visible modal. Same as hideModal().
         * @param {boolean} suppressOnClose - If true, suppresses onClose event, if one is attached.
         */
        closeModal: function(suppressOnClose) {
            commonGlobals.closeModal(suppressOnClose);
        }
        
    };
    
// END IIFE Constructor
});
