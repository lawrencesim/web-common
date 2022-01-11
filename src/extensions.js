//****************************************************************************************************
// Misc prototype extensions
//****************************************************************************************************
/**
 * Get overlapping values with second array. Uses strict equality.
 * @param {Array} arr
 * @returns {Array} Array of overlapping values.
 */
if(!Array.prototype.getOverlaps) {
    Object.defineProperty(Array.prototype, 'getOverlaps', {
        value(arr) {
            return this.filter(v => ~arr.indexOf(v));
        }
    });
}
if(!Array.getOverlaps) {
    Object.defineProperty(Array, 'getOverlaps', {
        value: (a, b) => a.getOverlaps(b)
    });
}

/**
 * Check if at least one value overlaps with second array. Uses strict equality.
 * @param {Array} arr
 * @returns {Boolean} True if overlaps.
 */
if(!Array.prototype.overlaps) {
    Object.defineProperty(Array.prototype, 'overlaps', {
        value(arr) {
            return typeof this.find(v => ~arr.indexOf(v)) !== 'undefined';
        }
    });
}
if(!Array.overlaps) {
    Object.defineProperty(Array, 'overlaps', {
        value: (a, b) => a.overlaps(b)
    });
}

/** Check is given object is an object-type. That is, not a primitive, string, or array. Useful for 
 * when parameters must be ensured is an object-literal/dictionary.
 * @param {anything} obj - The variable to be checked.
 */
if(!Object.isObject) {
    Object.defineProperty(Object, 'isObject', {
        value: obj => Object.getPrototypeOf(obj) === Object.prototype
    });
}

/**
 * Capitalize the first letter of every word. (A word is determined by any string preceded by 
 * whitespace, as such ignores second word in hyphenated compound words).
 * @returns {String} Capitalized version of this string.
 */
if(!String.prototype.capitalize) {
    Object.defineProperty(String.prototype, 'capitalize', {
        value() {
            return this.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
        }
    });
}

/**
 * Compare strings with numbers such that a "number" is not compared alphabetically by character but 
 * as the numeric value. Right now only handles positive integers. Compares character by character 
 * such that numbers encountered at the same "place" are compared. If numbers are of different 
 * character length but equal numerically, continues reading strings, adjusting "place" for different 
 * digit length. E.g. "a01b02" will compare as equal to "a1b2".
 * @param {String} compare string
 * @returns {Number} -1 if before, 0 if equal, 1 if after.
 */
if(!String.prototype.heuristicCompare) {
    Object.defineProperty(String.prototype, 'heuristicCompare', {
        value(compareString) {
            let thisChunks = this.match(/(\d+|[^\d]+)/g), 
                thatChunks = compareString.match(/(\d+|[^\d]+)/g), 
                i = 0, chunkA, chunkB, compare;
            while(true) {
                if(i === thisChunks.length) {
                    return i === thatChunks.length ? 0 : -1;
                } else if(i === thatChunks.length) {
                    return 1;
                }
                chunkA = thisChunks[i];
                chunkB = thatChunks[i];
                if(/\d/.test(chunkA) && /\d/.test(chunkB)) {
                    compare = parseInt(chunkA) - parseInt(chunkB);
                } else {
                    compare = chunkA.localeCompare(chunkB);
                }
                if(compare) return compare < 0 ? -1 : 1;
                ++i;
            }
            return 0;
        }
    });
}

/**
 * Return string value of this number with commas added.
 * @param {Number} precision - Decimal precision.
 * @returns {String}
 */
if(!Number.prototype.addCommas) {
    Object.defineProperty(Number.prototype, 'addCommas', {
        value(precision) {
            precision  = isNaN(precision = Math.abs(precision)) ? 0 : precision;
            let n = Math.abs(+this || 0), 
                number = parseInt(n.toFixed(precision)) + "";
            return (
                (n < 0 ? "-" : "")
                + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                + (precision ? "." + Math.abs(n - number).toFixed(precision).slice(2) : "")
            );
        }
    });
}

/**
 * Return string value of this number with commas added. Precision is handled dynamically based on my
 * abitrary rules but generally maintains at least two significant digits. Values less than 0.1 are 
 * presented in scientific notation.
 * @param {Number} [minimum=0.001] - Minimum number (absoltue value), on which anything less than 
 *        becomes zero.
 * @returns {String}
 */
if(!Number.prototype.addCommasSmart) {
    Object.defineProperty(Number.prototype, 'addCommasSmart', {
        value(minimum) {
            if(this === 0.0) return "0.0";
            let n = Math.abs(this);
            minimum = minimum || 0.001;
            if(n < minimum) {
                return "0.0";
            } else if(n < 0.01) {
                return this.toExponential(3);
            } else if(n < 0.1) {
                return this.toExponential(2);
            } else if(n < 0.3) {
                return this.addCommas(3);
            } else if(n < 1.0) {
                return this.addCommas(2);
            } else if(n < 100.0) {
                return this.addCommas(1);
            }
            return this.addCommas(0);
        }
    });
}

/**
 * Simple is-visible check using offsetParent trick. Note it will have issues with elements in fixed 
 * positions;
 * @returns {Boolean} True if visible.
 */
if(!Element.prototype.isVisible) {
    Object.defineProperty(Element.prototype, 'isVisible', {
        value() {
            return (
                this.offsetParent !== null 
                && (!this.style.visibility || this.style.visibility.toLowerCase() !== "hidden")
            );
        }
    });
}

/**
 * Quickly set multiple attributes at once.
 * @param {Object} attrs - Literal of key-value attribute pairs.
 */
if(!Element.prototype.setAttributes) {
    Object.defineProperty(Element.prototype, 'setAttributes', {
        value(attrs) {
            for(let key in attrs) this.setAttribute(key, attrs[key]);
        }
    });
}

/**
 * Shortcut for setting CSS styles.
 * @param {Object|String} style - Either a string for style name (paired with 2nd attribute value), or
 *        an object literal of multiple styles as key-value pairs.
 * @param {String} [value] - If style is key/string, the value for said CSS style.
 */
if(!Element.prototype.css) {
    Object.defineProperty(Element.prototype, 'css', {
        value(style, value) {
            if(style && style.constructor === Object) {
                for(let key in style) this.style[key] = style[key];
            } else {
                this.style[style] = value;
            }
        }
    });
}

/**
 * Center itself in the window with absolute positioning.
 */
if(!Element.prototype.center) {
    Object.defineProperty(Element.prototype, 'center', {
        value() {
            this.css({
                position: "absolute", 
                top:  Math.max(0, ((window.innerHeight - this.offsetHeight) / 2) + (window.scrollY || window.pageYOffset)),
                left: Math.max(0, ((window.innerWidth  - this.offsetWidth)  / 2) + (window.scrollX || window.pageXOffset))
            });
        }
    });
}

//****************************************************************************************************
// Date prototype extensions
//****************************************************************************************************
window.DateUTC = function(year, month, day, hour, min, sec) {
    //if(!month && !day && !hour && !min && !sec) return new Date(parseInt(year));
    return new Date(Date.UTC(
        parseInt(year), 
        month ? parseInt(month)-1 : 0, 
        day   ? parseInt(day)     : 1, 
        hour  ? parseInt(hour)    : 0, 
        min   ? parseInt(min)     : 0, 
        sec   ? parseInt(sec)     : 0
    ));
};

if(!Date.prototype.asUTC) {
    Object.defineProperty(Date.prototype, 'asUTC', {
        value() {
            return new Date(Date.UTC(
                this.getFullYear(), 
                this.getMonth(), 
                this.getDate(), 
                this.getHours(), 
                this.getMinutes(), 
                this.getSeconds()
            ));
        }
    });
}

if(!Date.prototype.toUTC) {
    Object.defineProperty(Date.prototype, 'toUTC', {
        value() {
            return new Date(Date.UTC(
                this.getUTCFullYear(), 
                this.getUTCMonth(), 
                this.getUTCDate(), 
                this.getUTCHours(), 
                this.getUTCMinutes(), 
                this.getUTCSeconds()
            ));
        }
    });
}

if(!Date.prototype.asUTCDate) {
    Object.defineProperty(Date.prototype, 'asUTCDate', {
        value() {
            return new Date(Date.UTC(
                this.getFullYear(), 
                this.getMonth(), 
                this.getDate()
            ));
        }
    });
}

if(!Date.prototype.toUTCDate) {
    Object.defineProperty(Date.prototype, 'toUTCDate', {
        value() {
            return new Date(Date.UTC(
                this.getUTCFullYear(), 
                this.getUTCMonth(), 
                this.getUTCDate()
            ));
        }
    });
}

if(!Date.prototype.addDays) {
    Object.defineProperty(Date.prototype, 'addDays', {
        value(days) {
            return new Date(this.getTime() + days*86400000);
        }
    });
}

if(!Date.prototype.monthOfYear) {
    Object.defineProperty(Date.prototype, 'monthOfYear', {
        value() {
            return this.getMonth()+1;
        }
    });
}

if(!Date.prototype.daysInMonth) {
    Object.defineProperty(Date.prototype, 'daysInMonth', {
        value() {
            return (new Date(this.getFullYear(), this.getMonth(), 0)).getDate();
        }
    });
}

export default true;