(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["motorcortex"] = factory();
	else
		root["motorcortex"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = __webpack_require__(2);

var roots = __webpack_require__(27);

var Type, // cyclic
    Enum;

util.codegen = __webpack_require__(35);
util.fetch   = __webpack_require__(37);
util.path    = __webpack_require__(39);

/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (object) {
        var keys  = Object.keys(object),
            array = new Array(keys.length),
            index = 0;
        while (index < keys.length)
            array[index] = object[keys[index++]];
        return array;
    }
    return [];
};

/**
 * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
 * @param {Array.<*>} array Array to convert
 * @returns {Object.<string,*>} Converted object
 */
util.toObject = function toObject(array) {
    var object = {},
        index  = 0;
    while (index < array.length) {
        var key = array[index++],
            val = array[index++];
        if (val !== undefined)
            object[key] = val;
    }
    return object;
};

var safePropBackslashRe = /\\/g,
    safePropQuoteRe     = /"/g;

/**
 * Tests whether the specified name is a reserved word in JS.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
util.isReserved = function isReserved(name) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
};

/**
 * Returns a safe property accessor for the specified property name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
    return "." + prop;
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

var camelCaseRe = /_([a-z])/g;

/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(camelCaseRe, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Compares reflected fields by id.
 * @param {Field} a First field
 * @param {Field} b Second field
 * @returns {number} Comparison value
 */
util.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
};

/**
 * Decorator helper for types (TypeScript).
 * @param {Constructor<T>} ctor Constructor function
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {Type} Reflected type
 * @template T extends Message<T>
 * @property {Root} root Decorators root
 */
util.decorateType = function decorateType(ctor, typeName) {

    /* istanbul ignore if */
    if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
    }

    /* istanbul ignore next */
    if (!Type)
        Type = __webpack_require__(19);

    var type = new Type(typeName || ctor.name);
    util.decorateRoot.add(type);
    type.ctor = ctor; // sets up .encode, .decode etc.
    Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
    Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
    return type;
};

var decorateEnumIndex = 0;

/**
 * Decorator helper for enums (TypeScript).
 * @param {Object} object Enum object
 * @returns {Enum} Reflected enum
 */
util.decorateEnum = function decorateEnum(object) {

    /* istanbul ignore if */
    if (object.$type)
        return object.$type;

    /* istanbul ignore next */
    if (!Enum)
        Enum = __webpack_require__(1);

    var enm = new Enum("Enum" + decorateEnumIndex++, object);
    util.decorateRoot.add(enm);
    Object.defineProperty(object, "$type", { value: enm, enumerable: false });
    return enm;
};

/**
 * Decorator root (TypeScript).
 * @name util.decorateRoot
 * @type {Root}
 * @readonly
 */
Object.defineProperty(util, "decorateRoot", {
    get: function() {
        return roots["decorated"] || (roots["decorated"] = new (__webpack_require__(17))());
    }
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Enum;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(5);
((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

var Namespace = __webpack_require__(7),
    util = __webpack_require__(0);

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this enum
 * @param {Object.<string,string>} [comments] The value comments for this enum
 */
function Enum(name, values, options, comment, comments) {
    ReflectionObject.call(this, name, options);

    if (values && typeof values !== "object")
        throw TypeError("values must be an object");

    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */
    this.valuesById = {};

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = Object.create(this.valuesById); // toJSON, marker

    /**
     * Enum comment text.
     * @type {string|null}
     */
    this.comment = comment;

    /**
     * Value comment texts, if any.
     * @type {Object.<string,string>}
     */
    this.comments = comments || {};

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.

    if (values)
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (typeof values[keys[i]] === "number") // use forward entries only
                this.valuesById[ this.values[keys[i]] = values[keys[i]] ] = keys[i];
}

/**
 * Enum descriptor.
 * @interface IEnum
 * @property {Object.<string,number>} values Enum values
 * @property {Object.<string,*>} [options] Enum options
 */

/**
 * Constructs an enum from an enum descriptor.
 * @param {string} name Enum name
 * @param {IEnum} json Enum descriptor
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
    enm.reserved = json.reserved;
    return enm;
};

/**
 * Converts this enum to an enum descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IEnum} Enum descriptor
 */
Enum.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"  , this.options,
        "values"   , this.values,
        "reserved" , this.reserved && this.reserved.length ? this.reserved : undefined,
        "comment"  , keepComments ? this.comment : undefined,
        "comments" , keepComments ? this.comments : undefined
    ]);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @param {string} [comment] Comment, if any
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
Enum.prototype.add = function add(name, id, comment) {
    // utilized by the parser but not by .fromJSON

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (!util.isInteger(id))
        throw TypeError("id must be an integer");

    if (this.values[name] !== undefined)
        throw Error("duplicate name '" + name + "' in " + this);

    if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);

    if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);

    if (this.valuesById[id] !== undefined) {
        if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
    } else
        this.valuesById[this.values[name] = id] = name;

    this.comments[name] = comment || null;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
Enum.prototype.remove = function remove(name) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    var val = this.values[name];
    if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);

    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];

    return this;
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(21);

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(34);

// base class of rpc.Service
util.EventEmitter = __webpack_require__(36);

// float handling accross browsers
util.float = __webpack_require__(38);

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(22);

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(41);

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(40);

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(55);

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ global.dcodeIO && /* istanbul ignore next */ global.dcodeIO.Long || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = exports.Deferred = function Deferred() {
    _classCallCheck(this, Deferred);

    var _this = this;
    this.promise = new Promise(function (resolve, reject) {
        _this.reject = reject;
        _this.resolve = resolve;
    });
};

var ConnectionState = exports.ConnectionState = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Field;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(5);
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

var Enum  = __webpack_require__(1),
    types = __webpack_require__(6),
    util  = __webpack_require__(0);

var Type; // cyclic

var ruleRe = /^required|optional|repeated$/;

/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @name Field
 * @classdesc Reflected message field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a field from a field descriptor.
 * @param {string} name Field name
 * @param {IField} json Field descriptor
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
};

/**
 * Not an actual constructor. Use {@link Field} instead.
 * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports FieldBase
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function Field(name, id, type, rule, extend, options, comment) {

    if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = undefined;
    }

    ReflectionObject.call(this, name, options);

    if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");

    if (!util.isString(type))
        throw TypeError("type must be a string");

    if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");

    if (extend !== undefined && !util.isString(extend))
        throw TypeError("extend must be a string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // toJSON

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // toJSON, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // toJSON

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {Type|null}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {OneOf|null}
     */
    this.partOf = null;

    /**
     * The field type's default value.
     * @type {*}
     */
    this.typeDefault = null;

    /**
     * The field's default value on prototypes.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */
    this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */ false;

    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */
    this.bytes = type === "bytes";

    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum|null}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {Field|null}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {Field|null}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {boolean|null}
     * @private
     */
    this._packed = null;

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Determines whether this field is packed. Only relevant when repeated and working with proto2.
 * @name Field#packed
 * @type {boolean}
 * @readonly
 */
Object.defineProperty(Field.prototype, "packed", {
    get: function() {
        // defaults to packed=true if not explicity set to false
        if (this._packed === null)
            this._packed = this.getOption("packed") !== false;
        return this._packed;
    }
});

/**
 * @override
 */
Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed") // clear cached before setting
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Field descriptor.
 * @interface IField
 * @property {string} [rule="optional"] Field rule
 * @property {string} type Field type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Extension field descriptor.
 * @interface IExtensionField
 * @extends IField
 * @property {string} extend Extended type
 */

/**
 * Converts this field to a field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IField} Field descriptor
 */
Field.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "rule"    , this.rule !== "optional" && this.rule || undefined,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
Field.prototype.resolve = function resolve() {

    if (this.resolved)
        return this;

    if ((this.typeDefault = types.defaults[this.type]) === undefined) { // if not a basic type, resolve it
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
            this.typeDefault = null;
        else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
    }

    // use explicitly set default value if present
    if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
    }

    // remove unnecessary options
    if (this.options) {
        if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
        if (!Object.keys(this.options).length)
            this.options = undefined;
    }

    // convert to internal data type if necesssary
    if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

        /* istanbul ignore else */
        if (Object.freeze)
            Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)

    } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
    }

    // take special care of maps and repeated fields
    if (this.map)
        this.defaultValue = util.emptyObject;
    else if (this.repeated)
        this.defaultValue = util.emptyArray;
    else
        this.defaultValue = this.typeDefault;

    // ensure proper value on prototype
    if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
 * @typedef FieldDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} fieldName Field name
 * @returns {undefined}
 */

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @param {T} [defaultValue] Default value
 * @returns {FieldDecorator} Decorator function
 * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
 */
Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

    // submessage: decorate the submessage and use its name as the type
    if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;

    // enum reference: create a reflected copy of the enum and keep reuseing it
    else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;

    return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
    };
};

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {Constructor<T>|string} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @returns {FieldDecorator} Decorator function
 * @template T extends Message<T>
 * @variation 2
 */
// like Field.d but without a default value

Field._configure = function configure(Type_) {
    Type = Type_;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = ReflectionObject;

ReflectionObject.className = "ReflectionObject";

var util = __webpack_require__(0);

var Root; // cyclic

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (options && !util.isObject(options))
        throw TypeError("options must be an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {Namespace|null}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Comment text, if any.
     * @type {string|null}
     */
    this.comment = null;

    /**
     * Defining file name.
     * @type {string|null}
     */
    this.filename = null;
}

Object.defineProperties(ReflectionObject.prototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});

/**
 * Converts this reflection object to its descriptor representation.
 * @returns {Object.<string,*>} Descriptor
 * @abstract
 */
ReflectionObject.prototype.toJSON = /* istanbul ignore next */ function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    if (this.root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */
ReflectionObject.prototype.toString = function toString() {
    var className = this.constructor.className,
        fullName  = this.fullName;
    if (fullName.length)
        return className + " " + fullName;
    return className;
};

ReflectionObject._configure = function(Root_) {
    Root = Root_;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Common type constants.
 * @namespace
 */
var types = exports;

var util = __webpack_require__(0);

var s = [
    "double",   // 0
    "float",    // 1
    "int32",    // 2
    "uint32",   // 3
    "sint32",   // 4
    "fixed32",  // 5
    "sfixed32", // 6
    "int64",    // 7
    "uint64",   // 8
    "sint64",   // 9
    "fixed64",  // 10
    "sfixed64", // 11
    "bool",     // 12
    "string",   // 13
    "bytes"     // 14
];

function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while (i < values.length) o[s[i + offset]] = values[i++];
    return o;
}

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */
types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @const
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {null} message=null Message default
 */
types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */
types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */
types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */
types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(5);
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

var Enum     = __webpack_require__(1),
    Field    = __webpack_require__(4),
    util     = __webpack_require__(0);

var Type,    // cyclic
    Service; // "

/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a namespace from JSON.
 * @memberof Namespace
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array, toJSONOptions) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Tests if the specified id is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedId = function isReservedId(reserved, id) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id)
                return true;
    return false;
};

/**
 * Tests if the specified name is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedName = function isReservedName(reserved, name) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (reserved[i] === name)
                return true;
    return false;
};

/**
 * Not an actual constructor. Use {@link Namespace} instead.
 * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {ReflectionObject[]|null}
     * @private
     */
    this._nestedArray = null;
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}

/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */
Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
    }
});

/**
 * Namespace descriptor.
 * @interface INamespace
 * @property {Object.<string,*>} [options] Namespace options
 * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
 */

/**
 * Any extension field descriptor.
 * @typedef AnyExtensionField
 * @type {IExtensionField|IExtensionMapField}
 */

/**
 * Any nested object descriptor.
 * @typedef AnyNestedObject
 * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
 */
// ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

/**
 * Converts this namespace to a namespace descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {INamespace} Namespace descriptor
 */
Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
    return util.toObject([
        "options" , this.options,
        "nested"  , arrayToJSON(this.nestedArray, toJSONOptions)
    ]);
};

/**
 * Adds nested objects to this namespace from nested object descriptors.
 * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
 * @returns {Namespace} `this`
 */
Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    /* istanbul ignore else */
    if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
                ( nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : nested.id !== undefined
                ? Field.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
 */
Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name]
        || null;
};

/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */
Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
    throw Error("no such enum: " + name);
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
Namespace.prototype.add = function add(object) {

    if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");

    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);

            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
Namespace.prototype.remove = function remove(object) {

    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);

    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;

    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
Namespace.prototype.define = function define(path, json) {

    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path))
        throw TypeError("illegal path");
    if (path && path.length && path[0] === "")
        throw Error("path must be relative");

    var ptr = this;
    while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
                throw Error("path conflicts with non-namespace objects");
        } else
            ptr.add(ptr = new Namespace(part));
    }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
 * @returns {Namespace} `this`
 */
Namespace.prototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return this.resolve();
};

/**
 * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
 * @param {string|string[]} path Path to look up
 * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 */
Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

    /* istanbul ignore next */
    if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = undefined;
    } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [ filterTypes ];

    if (util.isString(path) && path.length) {
        if (path === ".")
            return this.root;
        path = path.split(".");
    } else if (!path.length)
        return this;

    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);

    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found) {
        if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
                return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
            return found;

    // Otherwise try each nested namespace
    } else
        for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
                return found;

    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path, filterTypes);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 * @variation 2
 */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
Namespace.prototype.lookupType = function lookupType(path) {
    var found = this.lookup(path, [ Type ]);
    if (!found)
        throw Error("no such type: " + path);
    return found;
};

/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Enum} Looked up enum
 * @throws {Error} If `path` does not point to an enum
 */
Namespace.prototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, [ Enum ]);
    if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type or enum
 * @throws {Error} If `path` does not point to a type or enum
 */
Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
    var found = this.lookup(path, [ Type, Enum ]);
    if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
Namespace.prototype.lookupService = function lookupService(path) {
    var found = this.lookup(path, [ Service ]);
    if (!found)
        throw Error("no such Service '" + path + "' in " + this);
    return found;
};

Namespace._configure = function(Type_, Service_) {
    Type    = Type_;
    Service = Service_;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageTypes = exports.motorcortex_parameter_list_msg = exports.motorcortex_parameter_msg = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _motorcortex = __webpack_require__(9);

var _motorcortex2 = _interopRequireDefault(_motorcortex);

var _protobufjs = __webpack_require__(47);

var _protobufjs2 = _interopRequireDefault(_protobufjs);

var _long = __webpack_require__(23);

var _long2 = _interopRequireDefault(_long);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var motorcortex_parameter_msg = exports.motorcortex_parameter_msg = 1;
var motorcortex_parameter_list_msg = exports.motorcortex_parameter_list_msg = 2;

var PrimitiveTypes = function () {
    function PrimitiveTypes(type_name) {
        _classCallCheck(this, PrimitiveTypes);

        switch (type_name) {
            case 'BOOL':
                this.decoder = function (val, index) {
                    return val.getUint8(index * Uint8Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    for (var i = 0; i < val.length; ++i) {
                        val[i] != 0 ? 1 : 0;
                    }
                    console.log(val);
                    return new Uint8Array(new Uint8Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'DOUBLE':
                this.decoder = function (val, index) {
                    return val.getFloat64(index * Float64Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Float64Array(val).buffer);
                };
                this.rounding = function (val, precision) {
                    var rounded_val = [];
                    for (var i = 0; i < val.length; ++i) {
                        rounded_val.push(val[i] ? val[i].toFixed(precision) : 0);
                    }
                    return rounded_val;
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseFloat(item);
                    });
                };
                break;
            case 'FLOAT':
                this.decoder = function (val, index) {
                    return val.getFloat32(index * Float32Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Float32Array(val).buffer);
                };
                this.rounding = function (val, precision) {
                    var rounded_val = [];
                    for (var i = 0; i < val.length; ++i) {
                        rounded_val.push(val[i] ? val[i].toFixed(precision) : 0);
                    }
                    return rounded_val;
                };
                this.toNumber = function (val) {
                    val.split(',').map(function (item) {
                        return parseFloat(item);
                    });
                };
                break;
            case 'INT8':
                this.decoder = function (val, index) {
                    return val.getInt8(index * Int8Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Int8Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'UINT8':
                this.decoder = function (val, index) {
                    return val.getUint8(index * Uint8Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Uint8Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'INT16':
                this.decoder = function (val, index) {
                    return val.getInt16(index * Int16Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Int16Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'UINT16':
                this.decoder = function (val, index) {
                    return val.getUint16(index * Uint16Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Uint16Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'INT32':
                this.decoder = function (val, index) {
                    return val.getInt32(index * Int32Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Int32Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'UINT32':
                this.decoder = function (val, index) {
                    return val.getUint32(index * Uint32Array.BYTES_PER_ELEMENT, true);
                };
                this.encoder = function (val) {
                    return new Uint8Array(new Uint32Array(val).buffer);
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'INT64':
                this.decoder = function (val, index) {
                    var offset = index * Int32Array.BYTES_PER_ELEMENT * 2;
                    var lv = new _long2.default(val.getInt32(offset, true), val.getInt32(offset + Int32Array.BYTES_PER_ELEMENT, true));
                    return lv.toNumber();
                };
                this.encoder = function (val) {
                    var buf = new Uint8Array(val.length * Int32Array.BYTES_PER_ELEMENT * 2);
                    var data_view = new DataView(buf.buffer);

                    for (var i = 0; i < val.length; i++) {
                        var vl = _long2.default.fromNumber(val[i], false);
                        var offset = i * Int32Array.BYTES_PER_ELEMENT * 2;
                        data_view.setInt32(offset, vl.low, true);
                        data_view.setInt32(offset + Int32Array.BYTES_PER_ELEMENT, vl.high, true);
                    }
                    return buf;
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'UINT64':
                this.decoder = function (val, index) {
                    var offset = index * Uint32Array.BYTES_PER_ELEMENT * 2;
                    var lv = new _long2.default(val.getUint32(offset, true), val.getUint32(offset + Uint32Array.BYTES_PER_ELEMENT, true), true);
                    return lv.toNumber();
                };
                this.encoder = function (val) {
                    var buf = new Uint8Array(val.length * Uint32Array.BYTES_PER_ELEMENT * 2);
                    var data_view = new DataView(buf.buffer);

                    for (var i = 0; i < val.length; i++) {
                        var vl = _long2.default.fromNumber(val[i], true);
                        var offset = i * Uint32Array.BYTES_PER_ELEMENT * 2;
                        data_view.setUint32(offset, vl.low, true);
                        data_view.setUint32(offset + Uint32Array.BYTES_PER_ELEMENT, vl.high, true);
                    }
                    return buf;
                };
                this.toNumber = function (val) {
                    return val.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                };
                break;
            case 'STRING':
                this.decoder = function (val, index) {
                    return new TextDecoder('utf-8').decode(val);
                };
                this.encode = function (val) {
                    return new Uint8Array(val);
                };
                break;
            case 'USER_TYPE':
                this.decoder = function (val, index) {
                    return new Uint8Array(val);
                };
                this.encode = function (val) {
                    return new Uint8Array(val);
                };
                break;
            default:
                this.decoder = function () {
                    return 'undefined';
                };
        }
    }

    _createClass(PrimitiveTypes, [{
        key: 'decode',
        value: function decode(data_view, number_of_elements) {
            if (number_of_elements == 1) {
                return this.decoder(data_view, 0);
            } else {
                var values = [];
                for (var i = 0; i < number_of_elements; i++) {
                    values.push(this.decoder(data_view, i));
                }
                return values;
            }
        }
    }, {
        key: 'encode',
        value: function encode(value) {
            if ((typeof value === 'string' || value instanceof String) && this.toNumber) {
                value = this.toNumber(value);
            }
            // if value is not an array, convert to the array
            return this.encoder(value.length ? value : [value]);
        }
    }, {
        key: 'round',
        value: function round(value, precision) {
            return this.rounding ? this.rounding(value.length ? value : [value], precision) : value;
        }
    }]);

    return PrimitiveTypes;
}();

/**
 * Class for handling motorcortex data types: load proto and hash files,
 * creates a dictionary with all available data types, resolves data types by
 * name or by hash, performs encoding and decoding of the messages.
 */


var MessageTypes = exports.MessageTypes = function () {
    /**
     * Creates message types object
     * @constructor
     * @example
     * let motorcortex_types = new motorcortex.MessageTypes();
     */
    function MessageTypes() {
        _classCallCheck(this, MessageTypes);

        this.types_by_hash = {};
        this.types_by_name = {};
        this.root = new _protobufjs2.default.Root();
    }

    _createClass(MessageTypes, [{
        key: 'loadedFiles',
        value: function loadedFiles() {
            return this.proto_hash_pair_list;
        }

        /**
         * Loads an array of .proto and .json file pairs.
         * @param {object[]} proto_hash_pair_list a list of corresponding proto message files and hash files.
         * @return {Promise<string>} Returns a Promise, which is resolved when loading is complete.
         * @example
         * let motorcortex_types = new motorcortex.MessageTypes();
         * let type_load_done = motorcortex_types.load([{
         *      proto: 'msg/motorcortex.proto',
         *      hash: 'msg/motorcortex_hash.json'}, {
         *      proto: 'msg/motionJS.proto',
         *      hash: 'msg/motionJS_hash.json'}, {
         *      proto: 'msg/motionSL.proto',
         *      hash: 'msg/motionSL_hash.json'
         * }]);
         *
         * type_load_done.then(function () {
         *      console.log('Loaded all data types');}).catch(function (reason) {
         *      console.error('Failed to load data types: ' + reason);
         * });
         */

    }, {
        key: 'load',
        value: function load(proto_hash_pair_list) {

            this.proto_hash_pair_list = proto_hash_pair_list;

            var all_loaded_resolve = void 0;
            var all_loaded_reject = void 0;
            var all_loaded = new Promise(function (resolve, reject) {
                all_loaded_resolve = resolve;
                all_loaded_reject = reject;
            });

            var hash_loaded_resolve = void 0;
            var hash_loaded_reject = void 0;
            var hash_loaded = new Promise(function (resolve, reject) {
                hash_loaded_resolve = resolve;
                hash_loaded_reject = reject;
            });

            var _this = this;
            var proto_loaded = Promise.all(this._loadProto(proto_hash_pair_list));
            proto_loaded.then(function () {
                // loading hashes from json files
                var hash_load_array = [];
                for (var i = 0; i < proto_hash_pair_list.length; i++) {
                    var proto_hash_pair = proto_hash_pair_list[i];
                    var hash_file = proto_hash_pair['hash'];
                    if (!hash_file) {
                        return new Promise(function (resolve, reject) {
                            reject(Error('Hash file is not specified'));
                        });
                    }
                    hash_load_array.push(_this._loadHash(hash_file, _this.root));
                }

                Promise.all(hash_load_array).then(function () {
                    hash_loaded_resolve();
                }).catch(function (msg) {
                    hash_loaded_reject(msg);
                });
            }).catch(function (e) {
                return new Promise(function (resolve, reject) {
                    reject(Error(e));
                });
            }
            // Error('Failed to load proto: ' + e))
            );

            hash_loaded.then(function () {
                // save basic types
                var primitive_types = _this._loadEnum(_this.types_by_name['motorcortex.DataType']);
                for (var hash in primitive_types) {
                    if (hash > 0) {
                        var type_name = primitive_types[hash];
                        // add decoders/encoders to the common array
                        if (_this.types_by_hash[hash]) {
                            // if hash already exists, reject
                            all_loaded_reject(Error('Type with hash ' + hash.toString(16) + ' already exists, type name: ', _this.types_by_hash[hash].toString()));
                        } else {
                            var type_primitive = new PrimitiveTypes(type_name);
                            _this.types_by_hash[hash] = type_primitive;
                            _this.types_by_name[type_name] = type_primitive;
                        }
                    }
                }
                var parameter_flags = _this.getTypeByName('motorcortex.ParameterFlag');
                if (parameter_flags) {
                    _motorcortex2.default.ParameterFlag = parameter_flags.values;
                }
                var parameter_types = _this.getTypeByName('motorcortex.ParameterType');
                if (parameter_types) {
                    _motorcortex2.default.ParameterType = parameter_types.values;
                }
                var permissions = _this.getTypeByName('motorcortex.Permission');
                if (permissions) {
                    _motorcortex2.default.Permission = permissions.values;
                }
                var status_codes = _this.getTypeByName('motorcortex.StatusCode');
                if (status_codes) {
                    _motorcortex2.default.StatusCode = status_codes.values;
                }
                var user_groups = _this.getTypeByName('motorcortex.UserGroup');
                if (user_groups) {
                    _motorcortex2.default.UserGroup = user_groups.values;
                }
                var data_types = _this.getTypeByName('motorcortex.DataType');
                if (data_types) {
                    _motorcortex2.default.DataType = data_types.values;
                }
                var uints = _this.getTypeByName('motorcortex.Unit');
                if (uints) {
                    _motorcortex2.default.Unit = uints.values;
                }
                // if everything is fine Ok, resolve
                all_loaded_resolve();
            }).catch(function (msg) {
                all_loaded_reject(msg);
            });

            return all_loaded;
        }
    }, {
        key: 'verifyPayload',
        value: function verifyPayload(type_name, payload) {
            var type = this.types_by_name[type_name];
            if (!type) {
                console.error('Could not find type: ' + type_name);
            }

            return type.verify(payload);
        }

        /**
         * Returns an instance of the loaded data type and fills it with payload.
         * @param {string} type_name Type name from the proto files.
         * @param {object} [payload] Payload data to fill.
         * @return {object} Instance of the requested type, filled with payload.
         * @example
         * let load_msg = motorcortex_types.createType('motorcortex.LoadMsg', { path: '', fileName: 'control.xml' });
         * let encoded_msg = this.encode(load_msg);
         */

    }, {
        key: 'createType',
        value: function createType(type_name, payload) {
            var type = this.types_by_name[type_name];
            if (!type) {
                console.error('Could not find type: ' + type_name);
            }
            var type_inst = type.create(payload);
            type_inst.hash = type.hash;
            type_inst.encode = function () {
                return type.encode(type_inst).finish();
            };

            return type_inst;
        }
    }, {
        key: 'getTypeByHash',
        value: function getTypeByHash(type_hash) {
            var type = this.types_by_hash[type_hash];
            if (!type) {
                console.error('Could not find type with hash: ' + type_hash);
            }
            return type;
        }

        /**
         * Returns type with given name
         * @param {string} type_name Name of the message type from the proto files.
         * @return {object} Returns a Protobuf Type
         * @example
         * let ErrorList = motorcortex_types.getTypeByName('motorcortex.ErrorList');
         * let error_list = ErrorList.decode(encoded_msg);
         * console.log('Error list: ', error_list);
         */

    }, {
        key: 'getTypeByName',
        value: function getTypeByName(type_name) {
            var type = this.types_by_name[type_name];
            if (!type) {
                console.error('Could not find type with name: ' + type_name);
            }
            return type;
        }
    }, {
        key: 'decodeValue',
        value: function decodeValue(parameter) {
            if (!(parameter.status & _motorcortex2.default.getStatusCode('FAILED'))) {
                var type_id = parameter.info.dataType;
                var value = parameter.value;
                var decoder = this.getTypeByHash(type_id);
                var number_of_elements = parameter.info.numberOfElements;

                // user types
                if (type_id >= _motorcortex2.default.DataType['BYTES']) {
                    return value;
                } else if (type_id == _motorcortex2.default.DataType['STRING']) {
                    // c-strings
                    var i = 0;
                    var str = '';
                    while (value[i] != 0 && i < value.length) {
                        str += String.fromCharCode(value[i++]);
                    }
                    return str;
                }

                // all other types
                return decoder.decode(new DataView(value.buffer, value.byteOffset), number_of_elements);
            } else {
                console.log('Failed to decode parameter, error code: ' + parameter.status);
            }

            return 0;
        }
    }, {
        key: 'roundValue',
        value: function roundValue(data_type, value, precision) {
            var decoder = this.getTypeByHash(data_type);
            return decoder.round(value, precision);
        }
    }, {
        key: '_load_',
        value: function _load_(proto_hash_pair_list) {

            var _this = this;
            // loading data types from proto files
            var proto_builder = ProtoBuf.newBuilder();

            var _loop = function _loop(i) {
                var proto_hash_pair = proto_hash_pair_list[i];
                var proto_file = proto_hash_pair['proto'];
                if (!proto_file) {
                    return {
                        v: new Promise(function (resolve, reject) {
                            reject(Error('Proto file is not specified'));
                        })
                    };
                }
                proto_builder = ProtoBuf.loadProtoFile(proto_file, proto_builder);
                if (!proto_builder) {
                    return {
                        v: new Promise(function (resolve, reject) {
                            reject(Error('Failed to save Proto file: ' + proto_file));
                        })
                    };
                }
            };

            for (var i = 0; i < proto_hash_pair_list.length; i++) {
                var _ret = _loop(i);

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }

            // loading hashes from json files
            var hash_load_array = [];
            for (var i = 0; i < proto_hash_pair_list.length; i++) {
                var proto_hash_pair = proto_hash_pair_list[i];
                var hash_file = proto_hash_pair['hash'];
                if (!hash_file) {
                    return new Promise(function (resolve, reject) {
                        reject(Error('Hash file is not specified'));
                    });
                }
                hash_load_array.push(_this._loadHash(hash_file, proto_builder));
            }

            // wait until data types structures are build,
            // add decoders/encoders for basic data structures
            return Promise.all(hash_load_array).then(function () {
                new Promise(function (resolve, reject) {
                    // save basic types
                    var primitive_types = _this._loadEnum(_this.types_by_name['motorcortex.DataType']);
                    for (var hash in primitive_types) {
                        if (hash > 0) {
                            var type_name = primitive_types[hash];
                            // add decoders/encoders to the common array
                            if (_this.types_by_hash[hash]) {
                                // if hash already exists, reject
                                reject(Error('Type with hash ' + hash.toString(16) + ' already exists, type name: ', _this.types_by_hash[hash].toString()));
                            } else {
                                var type_primitive = new PrimitiveTypes(type_name);
                                _this.types_by_hash[hash] = type_primitive;
                                _this.types_by_name[type_name] = type_primitive;
                            }
                        }
                    }
                    // if everything is fine Ok, resolve
                    resolve();
                });
            });
        }
    }, {
        key: '_loadProto',
        value: function _loadProto(proto_hash_pair_list) {
            var clbs = [];
            // loading data types from proto files
            for (var i = 0; i < proto_hash_pair_list.length; i++) {
                var proto_hash_pair = proto_hash_pair_list[i];
                var _proto_file = proto_hash_pair['proto'];
                if (!_proto_file) {
                    return new Promise(function (resolve, reject) {
                        reject(Error('Proto file is not specified'));
                    });
                }
                clbs.push(this.root.load(_proto_file));
            }

            return clbs;
        }
    }, {
        key: '_loadHash',
        value: function _loadHash(url, proto_builder) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xmlhttp = new XMLHttpRequest(); // Used for loading json files;
                // Event handler for loading json file;
                xmlhttp.onreadystatechange = function () {
                    // when json is loaded, build hash table and make a callback
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            var data = JSON.parse(xmlhttp.responseText);
                            for (var key in data) {
                                var obj = data[key];
                                var hash = parseInt(obj.hash);
                                var type = proto_builder.lookupTypeOrEnum(obj.type);
                                if (type) {
                                    type.hash = hash;
                                    // // checking if type is an instantiatable type (not enum)
                                    // if (typeof type !== 'object') {
                                    //     // storing hash inside the type
                                    //     type.hash = hash;
                                    //     console.log(type + ' is not an object');
                                    // }
                                    if (_this.types_by_hash[hash]) {
                                        // if hash already exists, reject
                                        reject(Error('Type with hash ' + hash.toString(16) + ' already exists, type name: ', _this.types_by_hash[hash].toString()));
                                    } else {
                                        // create two dictionaries, one with hash is a key, second type name is a key
                                        _this.types_by_hash[hash] = type;
                                        _this.types_by_name[obj.type] = type;
                                        // if message type is ParameterMsg or ParameterListMsg, set the flag,
                                        // to automatically decode its value
                                        if (obj.type == 'motorcortex.ParameterMsg') {
                                            _this.types_by_hash[hash].decode_value = motorcortex_parameter_msg;
                                        } else if (obj.type == 'motorcortex.ParameterListMsg') {
                                            _this.types_by_hash[hash].decode_value = motorcortex_parameter_list_msg;
                                        }
                                    }
                                } else {
                                    console.error('Failed to resolve proto builder for the type: ' + obj.type);
                                }
                            }
                            // if all ok resolve
                            resolve();
                        } else {
                            reject(Error('Failed to load Hash file: ' + url));
                        }
                    }
                };
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
            });
        }
    }, {
        key: '_loadEnum',
        value: function _loadEnum(enumerator) {
            return enumerator.valuesById;
        }
    }]);

    return MessageTypes;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



/**
 * @fileOverview Motorcortex Bindings for JavaScript
 * @author Alexey Zakharov <zakharov@vectioneer.com>
 * @license Copyright (C) Vectioneer - All Rights Reserved
 * @copyright Vectioneer
 * @module motorcortex
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusToStr = exports.getDataType = exports.getUserGroup = exports.getStatusCode = exports.getPermission = exports.getParameterType = exports.getParameterFlag = exports.RequestAsync = exports.Request = exports.SubscribeAsync = exports.Subscribe = exports.SessionState = exports.SessionManager = exports.MessageTypes = exports.version = exports.name = undefined;

var _core = __webpack_require__(33);

var motorcortex = new _core.Motorcortex();

/**
 *  Name of the module
 */
var name = exports.name = 'motorcortex';

/**
 *  Version of the module
 */
var version = exports.version = motorcortex.version;

/**
 * Class MessageTypes is responsible for encoding/decoding motorcortex messages.
 * @see MessageTypes
 * @example
 * let motorcortex_types = new motorcortex.MessageTypes();
 * let type_load_done = motorcortex_types.load([{
 *      proto: 'msg/motorcortex.proto',
 *      hash: 'msg/motorcortex_hash.json'}, {
 *      proto: 'msg/motionJS.proto',
 *      hash: 'msg/motionJS_hash.json'}, {
 *      proto: 'msg/motionSL.proto',
 *      hash: 'msg/motionSL_hash.json'
 * }]);
 *
 * type_load_done.then(function () {
 *      console.log('Loaded all data types');
 *      let load_msg = motorcortex_types.createType('motorcortex.LoadMsg', { path: '', fileName: 'control.xml' });
 *      let encoded_msg = this.encode(load_msg);
 * }).catch(function (reason) {
 *      console.error('Failed to load data types: ' + reason);
 * });
 */
var MessageTypes = exports.MessageTypes = motorcortex.MessageTypes;

/**
 * Class SesseionManager is responsible for opening/closing and reconnecting
 * session.
 *
 */
var SessionManager = exports.SessionManager = motorcortex.SessionManager;
var SessionState = exports.SessionState = motorcortex.SessionState;

/**
 * Class Subscribe is responsible for parameter and group subscriptions.
 * @see Subscribe
 * @example
 * let sub = new motorcortex.Subscribe(req);
 * let sub_conn_done = sub.connect('ws://localhost:5557');
 * sub_conn_done.then(function () {
 *      console.log('Subscribe connection is established');
 *      let data_sub = sub.subscribe(['root/Control/jointReferenceGenerator/enable',
 *          'root/Control/jointReferenceGenerator/signalGenerator01/amplitude',
 *          'root/Control/jointReferenceGenerator/signalGenerator02/amplitude'], 'group1');
 *      data_sub.notify(function(msg) {
 *          console.log('Received an update: ' + msg.toString());
 *      });
 * }).catch(function (reason) {
 *      console.error('Failed to establish connection: ' + reason);
 * });
 */
var Subscribe = exports.Subscribe = motorcortex.Subscribe;

/**
 * Asynchronous version of the Subscribe class
 * @see Subscribe
 * @example
 * let sub = new motorcortex.SubscribeAsync(req);
 * let sub_conn_done = sub.connect('ws://localhost:5557');
 * sub_conn_done.then(function () {
 *      console.log('Subscribe connection is established');
 *      let data_sub = sub.subscribe(['root/Control/jointReferenceGenerator/enable',
 *          'root/Control/jointReferenceGenerator/signalGenerator01/amplitude',
 *          'root/Control/jointReferenceGenerator/signalGenerator02/amplitude'], 'group1');
 *      data_sub.notify(function(msg) {
 *          console.log('Received an update: ' + msg.toString());
 *      });
 * }).catch(function (reason) {
 *      console.error('Failed to establish connection: ' + reason);
 * });
 */
var SubscribeAsync = exports.SubscribeAsync = motorcortex.SubscribeAsync;

/**
 * Class Request is responsible for sending commands to motorcortex core:
 * for example set/get parameter value commands.
 * @see Request
 * @example
 * let req = new motorcortex.Request(motorcortex_types);
 * let req_conn_done = req.connect(`ws://localhost:5558`, 10000, 100);
 * req_conn_done.then(function () {
 *      console.log('Request connection is established');
 *      req.setParameter('root/Control/dummyBoolArray6', [1, 2, 3, 4]).then(function (reply) {
 *          if (reply.status === motorcortex.getStatusCode('OK')) {
 *              console.log('Parameter set to a new value.);
 *          }
 *      });
 * }
 */
var Request = exports.Request = motorcortex.Request;

/**
 * Asynchronous version of the Request class:
 * for example set/get parameter value commands.
 * @see Request
 * @example
 * let req = new motorcortex.RequestAsync(motorcortex_types);
 * let req_conn_done = req.connect(`ws://localhost:5558`, 10000, 100);
 * req_conn_done.then(function () {
 *      console.log('Request connection is established');
 *      req.setParameter('root/Control/dummyBoolArray6', [1, 2, 3, 4]).then(function (reply) {
 *          if (reply.status === motorcortex.getStatusCode('OK')) {
 *              console.log('Parameter set to a new value.);
 *          }
 *      });
 * }
 */
var RequestAsync = exports.RequestAsync = motorcortex.RequestAsync;

/**
 * Returns properties of the parameter in tree, like overwrite or linked, etc.
 * @param {string} name Name of the flag/property.
 * @return {number} Id of the flags. Multiple flags could be encoded in the return value.
 * @see ./msg/motorcortex.proto
 * @example
 * let flags = parameter.info.flags
 * if (flags & motorcortex.getParameterFlag('OVERWRITE_IS_ACTIVE')) {
 *      console.log('Parameter overwrite is active');
 * }
 * if (flag & motorcortex.getParameterFlag('LINK_IS_ACTIVE')) {
 *      console.log('Parameter is linked');
 * }
 */
var getParameterFlag = exports.getParameterFlag = function getParameterFlag(name) {
  return motorcortex.ParameterFlag[name];
};

/**
 * Returns type of the parameter in tree: input, output or parameter.
 * @param {string} name Name of the type.
 * @return {number} Id of the type
 * @see ./msg/motorcortex.proto
 * @example
 * let type = parameter.info.param_type
 * switch (type) {
 *      case motorcortex.getParameterType('INPUT'):
 *          console.log('Parameter type is an input');
 *      case motorcortex.getParameterType('OUTPUT'):
 *          console.log('Parameter type is an output');
 *      case motorcortex.getParameterType('PARAMETER'):
 *          console.log('Parameter type is a parameter');
 * }
 */
var getParameterType = exports.getParameterType = function getParameterType(name) {
  return motorcortex.ParameterType[name];
};

/**
 * Returns type of the parameter permission. Different users/groups may require
 * access to different and/or protected parts of the parameter tree.
 * Permission flags allow fine-tuning access levels of the groups.
 * The Motorcortex permissions structure is similar to that of Unix file permissions.
 * Permissions are represented either in symbolic notation or in octal notation.
 * (Note: User rights are not yet implemented, instead use Group rights)
 *
 * For example:
 *
 * ---------- (0000): no permission
 *
 * -rwx------ (0700): read, write, & execute only for owner (Note: currently
 * not implemented, user group flags instead)
 *
 * -rwxrwx--- (0770): read, write, & execute for owner and group
 * (Note: execute flag is used as a permission to open folders)
 *
 * -rwxrwxr-x (0775): read, write, & execute for owner and group,
 * read & execute for all others.
 *
 * -rwxrwxrwx (0777): full access
 *
 * @param {string} name Name of the permission.
 * @return {number} Id of the permission
 * @see ./msg/motorcortex.proto
 * @example
 * let permissions = parameter.info.permissions
 * switch (type) {
 *      case motorcortex.getParameterType('USER_READ'):
 *          console.log('User has read access');
 *      case motorcortex.getParameterType('USER_WRITE'):
 *          console.log('User has write access');
 *      case motorcortex.getParameterType('USER_EXECUTE'):
 *          console.log('User can open parameter folder');
 * }
 */
var getPermission = exports.getPermission = function getPermission(name) {
  return motorcortex.Permission[name];
};

/**
 * Returns a status code of the requested operation.
 * @param {string} name Name of status.
 * @return {number} Id of status.
 * @see ./msg/motorcortex.proto
 * @example
 * if (msg.status === motorcortex.getStatusCode('READ_ONLY_MODE')) {
 *      console.log('User is logged-in, read only mode.');
 * }
 */
var getStatusCode = exports.getStatusCode = function getStatusCode(name) {
  return motorcortex.StatusCode[name];
};

/**
 * Returns a user group.
 * @param {string} name Name of the group.
 * @return {number} Id of group.
 * @see ./msg/motorcortex.proto
 * @example
 * if (parameter.info.group_id === motorcortex.getUserGroup('ADMINISTRATOR')) {
 *      console.log('Parameter belongs to administrator user group');
 * }
 */
var getUserGroup = exports.getUserGroup = function getUserGroup(name) {
  return motorcortex.UserGroup[name];
};

/**
 * Returns a data type of the item in the parameter tree.
 * @param {string} name Type name of the parameter (see motorcortex.proto, enum DataType).
 * @return {number} id of the data type.
 * @see ./msg/motorcortex.proto
 * @example
 * let type_id = parameter.info.dataType;
 * if (type_id === motorcortex.getDataType('STRING')) {
 *      console.log('Parameter has type string');
 * }
 */
var getDataType = exports.getDataType = function getDataType(name) {
  return motorcortex.DataType[name];
};

/**
 * Converts a status and error codes to a string description
 * @param {number} code An error code.
 * @return {string} Error description.
 * @see ./msg/motorcortex.proto
 * @example
 * let login_reply = req.login('operator', 'operator123');
 * login_reply.then(function (reply) { console.log('Success!') }).catch(function (reply) {
 *      console.log('Failed: ' + motorcortex.statusToStr(reply.status));
 * });
 */
var statusToStr = exports.statusToStr = function statusToStr(code) {
  return motorcortex.statusToStr(code);
};

exports.default = motorcortex;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Request = exports.ParameterTree = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message_types = __webpack_require__(8);

var _motorcortex = __webpack_require__(9);

var _motorcortex2 = _interopRequireDefault(_motorcortex);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage(storage) {
        _classCallCheck(this, Storage);

        this.__storage = storage;
    }

    _createClass(Storage, [{
        key: 'getItem',
        value: function getItem(alias) {
            return new Promise(function (resolve, reject) {
                reject();
            });
        }
    }, {
        key: 'setItem',
        value: function setItem(alias, value) {
            return new Promise(function (resolve, reject) {
                reject();
            });
        }
    }]);

    return Storage;
}();

var LocalStorage = function (_Storage) {
    _inherits(LocalStorage, _Storage);

    function LocalStorage(storage) {
        _classCallCheck(this, LocalStorage);

        return _possibleConstructorReturn(this, (LocalStorage.__proto__ || Object.getPrototypeOf(LocalStorage)).call(this, storage));
    }

    _createClass(LocalStorage, [{
        key: 'getItem',
        value: function getItem(alias) {
            var tree = this.__storage.getItem(alias);
            return new Promise(function (resolve, reject) {
                if (tree) {
                    resolve(tree);
                } else {
                    reject('Failed to load a parameter tree from the Local Storage');
                }
            });
        }
    }, {
        key: 'setItem',
        value: function setItem(alias, value) {
            console.log('setItem');
            this.__storage.setItem(alias, value);
            return new Promise(function (resolve, reject) {
                resolve(value);
            });
        }
    }]);

    return LocalStorage;
}(Storage);

var IndexDB = function (_Storage2) {
    _inherits(IndexDB, _Storage2);

    function IndexDB(storage) {
        _classCallCheck(this, IndexDB);

        return _possibleConstructorReturn(this, (IndexDB.__proto__ || Object.getPrototypeOf(IndexDB)).call(this, storage));
    }

    _createClass(IndexDB, [{
        key: 'getItem',
        value: function getItem(alias) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var req = _this.__storage.open(alias, 1);
                req.onsuccess = function (event) {
                    var db = req.result;
                    var transaction = db.transaction('tree', 'readwrite');
                    var object_store_request = db.transaction('tree', 'readonly').objectStore('tree').get('0');
                    object_store_request.onsuccess = function (event) {
                        resolve(object_store_request.result);
                    };
                };
                req.onupgradeneeded = function (event) {
                    event.target.transaction.abort();
                };
                req.onerror = function (event) {
                    reject('Failed to load a parameter tree from the IndexDB');
                };
            });
        }
    }, {
        key: 'setItem',
        value: function setItem(alias, value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var req = _this.__storage.open(alias, 1);
                req.onupgradeneeded = function (event) {
                    var db = req.result;
                    var object_store = db.createObjectStore('tree');
                };
                req.onsuccess = function (event) {
                    var db = req.result;
                    var object_store_request = db.transaction('tree', 'readwrite').objectStore('tree').put(value, '0');
                    object_store_request.onsuccess = function (event) {
                        resolve(value);
                    };
                    object_store_request.onerror = function (event) {
                        console.log('Failed to save parameter tree in the IndexDB storage');
                        console.log(event);
                        // return resolve anyway
                        resolve(value);
                    };
                };
                req.onerror = function (event) {
                    console.log('Failed to access IndexDB storage');
                    // return resolve anyway
                    resolve(value);
                };
            });
        }
    }]);

    return IndexDB;
}(Storage);

var StorageFactory = function () {
    function StorageFactory() {
        _classCallCheck(this, StorageFactory);
    }

    _createClass(StorageFactory, [{
        key: 'create',
        value: function create() {
            if (this.getIndexDB()) {
                console.log('Motorcortex is using Index DB for the cache');
                return new IndexDB(this.getIndexDB());
            } else if (typeof localStorage !== 'undefined') {
                console.log('Motorcortex is using Local Storage for the cache');
                return new LocalStorage(localStorage);
            }
            console.log('Local storage in not supported, chaching disabled');
            return new Storage('undefined');
        }
    }, {
        key: 'getIndexDB',
        value: function getIndexDB() {
            return indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;
        }
    }]);

    return StorageFactory;
}();

// class represents a parameter tree,
// parameter tree is loaded by Request.getParameterTree
// the tree could be received either from the cache or from the server


var ParameterTree = exports.ParameterTree = function () {
    function ParameterTree() {
        _classCallCheck(this, ParameterTree);

        this.__parameter_tree = [];
        this.__parameter_map = {};
        var storage_factory = new StorageFactory();
        this.__storage = storage_factory.create();
    }

    // checks if tree is already loaded


    _createClass(ParameterTree, [{
        key: 'hasLoaded',
        value: function hasLoaded() {
            return !!this.__parameter_tree.length;
        }

        // saving parameter tree to the local storage

    }, {
        key: 'save',
        value: function save(parameter_tree_msg) {
            var _this = this;
            var hash = this.__buildHash(parameter_tree_msg);
            var paramter_tree_json = this.__mapToJson(parameter_tree_msg);
            return new Promise(function (resolve, reject) {
                _this.__storage.setItem(hash, paramter_tree_json).then(function (paramter_tree_json) {
                    _this.__initTree(_this.__jsonToMap(paramter_tree_json));
                    // _this.__parameter_tree = _this.__jsonToMap(paramter_tree_json);
                    // _this.__parameter_map = {};
                    // for (let i = 0; i < _this.__parameter_tree.length; ++i) {
                    //     let info = _this.__parameter_tree[i];
                    //     _this.__parameter_map[info.path] = info;
                    // }
                    resolve(_this.__parameter_tree);
                }).catch(function (msg) {
                    // this sould not happen, because Storage always do resolve in the setItem
                    reject('Failed to save parameter tree in the cache');
                });
            });
        }

        // load parameter tree from the local storage

    }, {
        key: 'load',
        value: function load(hash) {
            var _this = this;
            var load_handle = new Promise(function (resolve, reject) {
                var storage_handle = _this.__storage.getItem(hash).then(function (paramter_tree_json) {
                    _this.__parameter_tree = _this.__jsonToMap(paramter_tree_json);
                    _this.__parameter_map = {};
                    for (var i = 0; i < _this.__parameter_tree.length; ++i) {
                        var info = _this.__parameter_tree[i];
                        _this.__parameter_map[info.path] = info;
                    }
                    resolve(_this.__parameter_tree);
                }).catch(function (msg) {
                    reject(msg);
                });
            });
            return load_handle;
        }
    }, {
        key: 'getTree',
        value: function getTree() {
            return this.__parameter_tree;
        }

        // returns complete info of the parameter

    }, {
        key: 'getInfo',
        value: function getInfo(parameter_path) {
            return this.__parameter_map[parameter_path];
        }

        // returns data type of the parameter

    }, {
        key: 'getDataType',
        value: function getDataType(parameter_path) {
            var info = this.getInfo(parameter_path);
            if (info) return info.dataType;
            return info;
        }
    }, {
        key: '__buildHash',
        value: function __buildHash(parameter_tree) {
            var hash = 0,
                chr = void 0;
            for (var i = 0; i < parameter_tree.length; ++i) {
                var param = parameter_tree[i];
                var str = param.path;
                hash += param.dataSize + param.dataType + param.id + param.numberOfElements + param.paramType + param.unit + param.groupId + param.permissions;
                for (var b = 0; b < str.length; ++b) {
                    chr = str.charCodeAt(b);
                    hash = (hash << 5) - hash + chr;
                    hash |= 0;
                }
            }
            return new Uint32Array([hash])[0];
        }

        //interanl

    }, {
        key: '__mapToJson',
        value: function __mapToJson(map) {
            return JSON.stringify(map);
        }
    }, {
        key: '__jsonToMap',
        value: function __jsonToMap(jsonStr) {
            return JSON.parse(jsonStr);
        }
    }, {
        key: '__initTree',
        value: function __initTree(tree) {
            this.__parameter_tree = tree;
            for (var i = 0; i < this.__parameter_tree.length; ++i) {
                var info = this.__parameter_tree[i];
                this.__parameter_map[info.path] = info;
            }
        }
    }]);

    return ParameterTree;
}();

// Req/Rep communication with the server,
// used for sending commands and
// requesting parameter values.

var REP_HEADER = 0x80000000;

var RequestData = function () {
    function RequestData(qeue_handle) {
        _classCallCheck(this, RequestData);

        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.reject = reject;
            _this.resolve = resolve;
        });

        this._timer_handle = undefined;
        this._qeue_handle = qeue_handle;
        this._id = undefined;
    }

    _createClass(RequestData, [{
        key: 'set',
        value: function set(id, timeout_msec) {
            this._id = id;
            this._qeue_handle.set(id, this);
            this.startTimer(timeout_msec);
        }
    }, {
        key: 'startTimer',
        value: function startTimer(timeout_msec) {
            var _this = this;
            var _timeout_msec = timeout_msec;
            _this._timer_handle = setTimeout(function () {
                _this.error('Failed to get reply in ' + _timeout_msec + ' msec');
            }, _timeout_msec);
        }
    }, {
        key: 'reply',
        value: function reply(decoded_data) {
            if (this._timer_handle) {
                clearTimeout(this._timer_handle);
            }
            var status = decoded_data.status;
            if (!(status & _motorcortex2.default.getStatusCode('FAILED')) || status === undefined) {
                this.resolve(decoded_data);
            } else {
                this.reject(decoded_data);
            }
            var id = this._id;
            if (id >= 0) {
                this._qeue_handle.delete(id);
            }
        }
    }, {
        key: 'error',
        value: function error(error_data) {
            if (this._timer_handle) {
                clearTimeout(this._timer_handle);
            }
            this.reject(error_data);
            var id = this._id;
            if (id >= 0) {
                this._qeue_handle.delete(id);
            }
        }
    }]);

    return RequestData;
}();

/**
 * Request/Reply communication is used to send commands to a motorcortex server.
 */


var Request = function () {
    /**
     * Creates request object
     * @constructor
     * @param {MessageTypes} protobuf_types Reference to an instance of the MessageTypes class.
     * @example
     * // Loading messages
     * let motorcortex_types = new motorcortex.MessageTypes();
     * let type_load_done = motorcortex_types.load([{
     *      'proto': 'motorcortex.proto',
     *      'hash': 'motorcortex_hash.json'}]);
     * // Creating Request connection
     * let req = new motorcortex.Request(motorcortex_types);
     * let req_conn_done = req.connect(`ws://localhost:5558`);
     */
    function Request(protobuf_types) {
        _classCallCheck(this, Request);

        this.protobuf_types = protobuf_types;
        this.parameter_tree = new ParameterTree(protobuf_types);
        this.websocket = null;
        this.request_id = 0;
        this.replies = new Map();
        this.request_channel = null;
    }

    /**
     * Returns loaded message types.
     */


    _createClass(Request, [{
        key: 'getMessageTypes',
        value: function getMessageTypes() {
            return this.protobuf_types;
        }
    }, {
        key: 'onSubscribeMessage',
        value: function onSubscribeMessage(e) {
            var _this4 = this;

            var data = e.data;
            var id = data.id;
            var request = data.request;
            var reply = null;

            switch (request.type) {
                case 'createGroup':
                    reply = this.createGroup(request.path_list, request.group_alias, request.frq_divider);
                    break;
                case 'removeGroup':
                    reply = this.removeGroup(request.group_alias);
                    break;
                default:
                    reply = new Promise(function (resolve, reject) {
                        reject('Unknown request type:' + request.type);
                    });
            }

            reply.then(function (e) {
                _this4.request_channel.postMessage({ id: id, reply: { type: 'success', result: e } });
            }).catch(function (e) {
                _this4.request_channel.postMessage({ id: id, reply: { type: 'error', result: e } });
            });
        }
    }, {
        key: 'registerSubscriber',
        value: function registerSubscriber(port) {
            this.request_channel = port;
            this.request_channel.onmessage = this.onSubscribeMessage.bind(this);
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }, {
        key: 'loadedFiles',
        value: function loadedFiles() {
            return this.protobuf_types.loadedFiles();
        }

        /**
         * Actual Request/reply connection state.
         * @return {number} Returns a connection state.
         * @example
         * CONNECTING   0    The connection is not yet open
         * OPEN         1    The connection is open and ready to communicate
         * CLOSING      2    The connection is in the process of closing
         * CLOSED       3    The connection is closed or could not be opened
         */

    }, {
        key: 'connectionState',
        value: function connectionState() {
            return this.websocket ? this.websocket.readyState : 3;
        }

        /**
         * Opens a request connection.
         * @param {string} url Motorcortex server URL.
         * @param {number} timeout_ms Reply timeout in milliseconds.
         * @param {number} max_request_queue_size Maximum size of the request queue.
         * @return {Promise<string>} A promise, which completes when connection is ready.
         * If connection fails, a short error description is passed to the catch method.
         *
         * @example
         * let req = new motorcortex.Request(motorcortex_types);
         * let req_conn_done = req.connect(`ws://${server}:5558`, 10000, 100);
         * req_conn_done
         * .then(function () {
         *       console.log('Request connection is established');
         *   })
         *.catch(function (reason) {
         *       console.error('Failed to establish connection: ' + reason);
         *   });
         */

    }, {
        key: 'connect',
        value: function connect(url, timeout_ms, max_request_queue_size) {
            this.timeout_ms = timeout_ms ? timeout_ms : 1000;
            this.max_request_qeue_size = max_request_queue_size ? max_request_queue_size : 1000;
            // initializing and connecting websocket
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._emptyReplyQueue();
                _this.websocket = new WebSocket(url, 'rep.sp.nanomsg.org');
                _this.websocket.binaryType = 'arraybuffer';
                _this.websocket.onopen = function (e) {
                    resolve();
                };
                _this.websocket.onerror = function (e) {
                    _this.websocket.close();
                    reject('Failed to connect to: ' + url);
                };
                _this.websocket.onmessage = function (e) {
                    _this._onMessage(e);
                };
                _this.websocket.onclose = function (e) {
                    _this.connectionClosed();
                };
            });
        }
    }, {
        key: 'connectionClosed',
        value: function connectionClosed() {}

        /**
         * Closes connection to the server
         */

    }, {
        key: 'close',
        value: function close() {
            if (this.connectionState() !== _utils.ConnectionState.CLOSING && this.connectionState() !== _utils.ConnectionState.CLOSED) {
                this.websocket.close();
            }
            this._emptyReplyQueue();
        }

        /**
         * Encodes a data type from MessageTypes to a binary wire type.
         * @param {Object} A message created by MotorcortexTypes.
         * @return {Uint8Array} msg A binary array with encoded message.
         * @example
         * let motion_script = motorcortex_types.createType('motion_spec.MotionScript', {.id = 1, name = 'Test script'});
         * motion_script.script = `print('Hello world');`;
         * let encoded_msg = req.encode(motion_script);
         * req.send(encoded_msg);
         */

    }, {
        key: 'encode',
        value: function encode(msg) {
            // building wire message

            // getting type id
            var type_id = msg.hash;
            // encoding proto data

            var wire_msg = msg.encode();
            // allocating array for the wire message, request id size + type id size + data length
            var request_data = new Uint8Array(4 + 4 + wire_msg.length);
            // encodeing type id
            request_data[4] = type_id & 0xff;
            request_data[5] = type_id >> 8 & 0xff;
            request_data[6] = type_id >> 16 & 0xff;
            request_data[7] = type_id >> 24 & 0xff;
            // encoding data
            request_data.set(wire_msg, 8);

            return request_data;
        }

        /**
         * Sends an encoded request to the server
         * @param {Uint8Array} encoded_msg A binary array with encoded message.
         * @param {integer} Timeout in milliseconds.
         * @return {Promise<Object>} Returns a Promise, which completes when reply from the server is received.
         * If request fails, catch callback is triggered.
         * @example
         * let joint2cart = calcJointToCart({
         *      cartpose: [0, 0, 0, 0, 0, 0],
         *      jointpose: [0, 0, 1.57, 0, 1.57, 0] });
         * let reply = req.send(req.encode(joint2cart));
         * reply.then(function (msg) {
         *      console.log('Got reply: ' + JSON.stringify(msg));
         * }).catch(function (msg) {
         *      console.error('Failed: ' + JSON.stringify(msg));
         * });
         */

    }, {
        key: 'send',
        value: function send(encoded_msg, timeout_ms) {
            if (!timeout_ms) {
                timeout_ms = this.timeout_ms;
            }
            var request_data = new RequestData(this.replies);
            if (this.replies.size < this.max_request_qeue_size) {
                var con_state = this.connectionState();
                if (con_state == _utils.ConnectionState.OPEN) {
                    // getting request id
                    var req_id = this._incReqId();
                    // encoding request id
                    encoded_msg[0] = REP_HEADER + (req_id & 0x7f000000) >> 24;
                    // encoding request id
                    encoded_msg[1] = (req_id & 0x00ff0000) >> 16;
                    encoded_msg[2] = (req_id & 0x0000ff00) >> 8;
                    encoded_msg[3] = req_id & 0x000000ff;
                    // adding promise with request id to the dict
                    request_data.set(req_id, timeout_ms);
                    this.websocket.send(encoded_msg);
                } else {
                    request_data.error('Failed to send request, connection to the server is not ready');
                }
            } else {
                request_data.error('Failed to send request, request queue if full');
            }

            return request_data.promise;
        }

        /**
         * Sends a login request to the server
         * @param {string} login User login.
         * @param {string} password User password.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves if login is successful and fails otherwise.
         * Returned message has a status code, which indicates a status of the login.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let login_reply = req.login('operator', 'god123');
         * login_reply.then(function (reply) {
         *      console.log('Logged-in successful: ' + motorcortex.statusToStr(reply.status));
         * }).catch( function(reply) {
         *      console.log('Failed to login: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'login',
        value: function login(_login, password) {
            return this.send(this.__encodeLogin(_login, password));
        }
    }, {
        key: '__encodeLogin',
        value: function __encodeLogin(login, password) {
            return this.encode(this.protobuf_types.createType('motorcortex.LoginMsg', {
                login: login,
                password: password
            }));
        }

        /**
         *
         *
         *
         *
         *
         */

    }, {
        key: 'getSessionTokenMsg',
        value: function getSessionTokenMsg() {
            var get_session_token_msg = this.protobuf_types.createType('motorcortex.GetSessionTokenMsg');
            return this.send(this.encode(get_session_token_msg));
        }

        /**
         *
         *
         *
         *
         *
         */

    }, {
        key: 'restoreSessionMsg',
        value: function restoreSessionMsg(token) {
            var restore_session_msg = this.protobuf_types.createType('motorcortex.RestoreSessionMsg', {
                token: token
            });
            return this.send(this.encode(restore_session_msg));
        }

        /**
         * Sends logout request to the server
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves if login is successful and fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let logout_reply = req.logout();
         * logout_reply.then(function (reply) {
         *      console.log('Logged-out successful: ' + motorcortex.statusToStr(reply.status));
         * }).catch( function(reply) {
         *      console.log('Failed to logout: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'logout',
        value: function logout() {
            var logout_msg = this.protobuf_types.createType('motorcortex.LogoutMsg');
            return this.send(this.encode(logout_msg));
        }

        /**
         * Requests a parameter tree from the cache or from the server
         * @param {integer} Timeout in milliseconds.
         * @return {Promise<ParameterTreeMsg>} Returns a Promise, which resolves when parameter tree is received or fails
         * otherwise. ParameterTreeMsg message has a status files to check the status of the operation.
         * @see motorcortex.proto, ParameterTreeMsg, StatusCode
         * @example
         * let param_tree_reply = req.getParameterTree();
         * param_tree_reply.then(function (param_tree) {
         *      console.log('Got parameter tree msg: ' + JSON.stringify(param_tree));
         * }).catch( function(param_tree) {
         *      console.log('Failed to get parameter tree: ' + motorcortex.statusToStr(param_tree.status));
         * });
         */

    }, {
        key: 'getParameterTree',
        value: function getParameterTree(timeout_msec) {
            var _this = this;
            // first request the cache of the parameter tree from the server
            return new Promise(function (resolve, reject) {
                _this.getParameterTreeHash().then(function (msg) {
                    // if cache from the server corresponds to the hash of the local cached version,
                    // use local version
                    _this.parameter_tree.load(msg.hash)
                    // found tree in the cache
                    .then(function (param_tree) {
                        console.log('Loaded parameter tree from the cache');
                        // returns an instance of the Class ParameterTree
                        resolve(_this.parameter_tree);
                    })
                    // did not find tree in the cache, request new tree
                    .catch(function (msg) {
                        console.log('Parameter tree was not found in the cache, loading new from the server');
                        // getting and instantiating data type from the loaded dict
                        var param_tree_msg = _this.protobuf_types.createType('motorcortex.GetParameterTreeMsg');
                        // send request
                        _this.send(_this.encode(param_tree_msg), timeout_msec).then(function (msg) {
                            // if reply received, save the tree the cache
                            _this.parameter_tree.save(msg.params, _this.protobuf_types).then(function (param_tree) {
                                // return the tree to the user
                                console.log('Loaded new parameter tree from the server');
                                // returns an instance of the Class ParameterTree
                                resolve(_this.parameter_tree);
                            }).catch(function (msg) {
                                // failed to save the tree
                                console.log('Failed to save parameter tree to the cache');
                                reject(msg);
                            });
                        }).catch(function (msg) {
                            console.log('Failed to request parameter tree from the server');
                            console.log(msg);
                            reject(msg);
                        });
                    });
                }).catch(function (msg) {
                    console.log('Failed to request parameter tree cache');
                    reject(msg);
                });
            });
        }

        /**
         * Requests a parameter tree hash from the server
         * @return {Promise<ParameterTreeHashMsg>} Returns a Promise, which resolves when tree hash message is received or
         * fails otherwise.
         * @see motorcortex.proto, ParameterTreeHashMsg, StatusCode
         * @example
         * let tree_hash_reply = req.getParameterTreeHash();
         * tree_hash_reply.then(function (tree_hash) {
         *      console.log('Got parameter tree hash: ' + tree_hash.hash);
         * }).catch( function(tree_hash) {
         *      console.log('Failed to get tree hash: ' + motorcortex.statusToStr(tree_hash.status));
         * });
         *
         */

    }, {
        key: 'getParameterTreeHash',
        value: function getParameterTreeHash() {
            // getting and instantiating data type from the loaded dict
            var param_tree_hash_msg = this.protobuf_types.createType('motorcortex.GetParameterTreeHashMsg');
            // encoding and sending data
            return this.send(this.encode(param_tree_hash_msg));
        }

        /**
         * Requests a parameter with full information and value from the server
         * @param {string} path Parameter path in the tree.
         * @return {Promise<ParameterMsg>} Returns a Promise, which resolves when parameter message is successfully obtained,
         * fails otherwise.
         * @see motorcortex.proto, ParameterMsg, StatusCode
         * @example
         * let param_reply = req.getParameter('root/Control/actualActuatorPositions');
         * param_reply.then(function (param) {
         *      console.log('Got parameter: ' + JSON.stringify(param));
         * }).catch( function(param) {
         *      console.log('Failed to get parameter: ' + motorcortex.statusToStr(param.status));
         * });
         */

    }, {
        key: 'getParameter',
        value: function getParameter(path) {
            // encoding and sending data
            return this.send(this.encode(this._buildGetParameterMsg(path)));
        }

        /**
         * Sets new value to a parameter with given path.
         * @param {string} path Parameter path in the tree.
         * @param {any} value New parameter value.
         * @param {{offset, length}=} options Various options to parametrize Set operation. For example 'offset' and
         * 'length' could be used to set an element offset and number of the elements to update in the destination array.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter value is updated or fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * // updates a value of a simple parameter
         * let reply_handle = req.setParameter('root/Motorcontroller/actualmode', 2);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         *
         * // updates an array
         * req.setParameter('root/Control/dummyDoubleArray6', [1.1,1.2,1.3,1.4,1.5,1.6]);
         * // updates single element of array with the offset 2 (index 3)
         * req.setParameter('root/Control/dummyDoubleArray6', 1.0, {offset: 2});
         * // updates 2 elements of the arrays with the offset 4
         * req.setParameter('root/Control/dummyDoubleArray6', [10.0, 20.0], {offset: 4, length: 2});
         */

    }, {
        key: 'setParameter',
        value: function setParameter(path, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            // encoding and sending parameter message
            return this.send(this.encode(this._buildSetParameterMsg(path, value, options)));
        }

        /**
         * Overwrites actual value of the parameter and depending on the flag forces this value to stay active.
         * This method of setting values is useful during debug and installation process, it is not recommended to use
         * this method during normal operation.
         * @param {string} path Parameter path in the tree.
         * @param {any} value New parameter value.
         * @param {bool=} force_activate Forces new value to stay active. By default is set to 'false'.
         * @param {{offset, length}=} options Various options to parametrize Set operation. For example 'offset' and
         * 'length' could be used to set an element offset and number of the elements to update in the destination array.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter value is updated or fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * // overwrite and force to stay active a value of a simple parameter
         * let reply_handle = req.overwriteParameter('root/Motorcontroller/actualmode', 2, true);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         *
         * // overwrite and force to stay active an array
         * req.overwriteParameter('root/Control/dummyDoubleArray6', [1.1,1.2,1.3,1.4,1.5,1.6], true);
         * // overwrite and release force of a single element of the array with an offset 2 (index 3)
         * req.overwriteParameter('root/Control/dummyDoubleArray6', 1.0, {offset: 2});
         * // overwrite and force to stay active 2 elements of the arrays with an offset 4
         * req.overwriteParameter('root/Control/dummyDoubleArray6', [10.0, 20.0], {offset: 4, length: 2});
         */

    }, {
        key: 'overwriteParameter',
        value: function overwriteParameter(path, value) {
            var force_activate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            //encode and sending overwrite parameter value
            return this.send(this.encode(this._buildOverwriteParameterMsg(path, value, force_activate, options)));
        }

        /**
         * Deactivate overwrite operation of the parameter.
         * @param {string} path Path to a parameter in the tree.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter overwrite is deactivated or fails
         * otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = releaseParameter('root/Motorcontroller/actualmode');
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to release overwrite of the parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'releaseParameter',
        value: function releaseParameter(path) {
            var release_param_msg = this.protobuf_types.createType('motorcortex.ReleaseParameterMsg');
            release_param_msg.path = path;

            return this.send(this.encode(release_param_msg));
        }

        /**
         * Sets new values to a parameter list.
         * @param {Array<{path,value,options}>} param_list A list of the parameters to update values.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameters from the list are updated,
         * otherwise fails.
         * @see setParameter, motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = req.setParameterList([{path: 'root/Motorcontroller/actualmode', value: 2},
         *      {path: 'root/Control/dummyDoubleArray6', value: [1.1,1.2,1.3,1.4,1.5,1.6]},
         *      {path: 'root/Control/dummyDoubleArray6', value: [10.0, 20.0], options:  {offset: 4, length: 2}}]);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set list of parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'setParameterList',
        value: function setParameterList(param_list) {
            // instantiating message type
            var set_param_list_msg = this.protobuf_types.createType('motorcortex.SetParameterListMsg');
            // filling with sub messages
            for (var i = 0; i < param_list.length; ++i) {
                var param = param_list[i];
                set_param_list_msg.params.push(this._buildSetParameterMsg(param['path'], param['value'], param['options']));
            }

            // encoding and sending data
            return this.send(this.encode(set_param_list_msg));
        }

        /**
         * Get info and values of requested parameters.
         * @param {Array<string>} path_list List of parameter paths.
         * @param {number} timeout_ms Reply timeout in milliseconds.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when list of the parameter values is received,
         * otherwise fails.
         * @see getParameter, motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = req.getParameterList(['root/Motorcontroller/actualmode, 'root/Control/dummyDoubleArray6']);
         * reply_handle.then( function(param_list) {
         *      console.log('Got parameter list: ' + JSON.stringify(param_list));
         * }).catch( function(param_list) {
         *      console.log('Failed to get parameter list: ' + motorcortex.statusToStr(param_list.status));
         * });
         */

    }, {
        key: 'getParameterList',
        value: function getParameterList(path_list, timeout_ms) {
            // instantiating message type
            var get_param_list_msg = this.protobuf_types.createType('motorcortex.GetParameterListMsg');
            // filling with sub messages
            for (var i = 0; i < path_list.length; ++i) {
                var path = path_list[i];
                get_param_list_msg.params.push(this._buildGetParameterMsg(path));
            }
            // encoding and sending data
            return this.send(this.encode(get_param_list_msg), timeout_ms);
        }

        /**
         * Create a subscription group for a list of the parameters. This method is used inside Subscription class, use
         * subscription class instead.
         * @param {Array<string>} path_list List of the parameters to subscribe to.
         * @param {string} group_alias Name of the group.
         * @param {number=} frq_divider Frequency divider is downscaling factor of the group publish rate.
         * Default value is 1, every cycle of the publisher.
         * @return {Promise<GroupStatusMsg>} Returns a Promise, which resolves when subscription is complete, fails
         * otherwise.
         * @see Subscription, motorcortex.proto, GroupStatusMsg, StatusCode
         * @example
         * // creates a group with two signals, which is published every 10th cycle.
         * let group_handle = req.createGroup(['root/Motorcontroller/actualmode, 'root/Control/dummyDoubleArray6'],
         *      'myGroup1', 10);
         * reply_handle.then( function(group) {
         *      console.log('Group layout: ' + JSON.stringify(group));
         * }).catch( function(group) {
         *      console.log('Failed to create group: ' + motorcortex.statusToStr(group.status));
         * });
         */

    }, {
        key: 'createGroup',
        value: function createGroup(path_list, group_alias, frq_divider) {
            // instantiating message type
            var create_group_msg = this.protobuf_types.createType('motorcortex.CreateGroupMsg');
            create_group_msg.alias = group_alias ? group_alias : 'undefined';
            create_group_msg.paths = [].concat(path_list);
            create_group_msg.frqDivider = frq_divider > 1 ? frq_divider : 1;

            // encoding and sending data
            var handle = this.send(this.encode(create_group_msg));
            handle.group_alias = create_group_msg.alias;

            return handle;
        }

        /**
         * Unsubscribes from the group. This method is used inside Subscription class, use
         * subscription class instead.
         * @param {string} group_alias Name of the group to unsubscribe from.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when the unsubscribe operation is complete,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let group_handle = req.removeGroup('myGroup1');
         * group_handle.catch( function(group) {
         *      console.log('Failed to remove group: ' + motorcortex.statusToStr(group.status));
         * });
         */

    }, {
        key: 'removeGroup',
        value: function removeGroup(group_alias) {
            // instantiating message type
            var remove_group_msg = this.protobuf_types.createType('motorcortex.RemoveGroupMsg', { alias: group_alias });

            // encoding and sending data
            return this.send(this.encode(remove_group_msg));
        }

        /**
         * Request a server to save a parameter tree in the file.
         * @param {string} file_name A file name where to save actual state of the parameter tree
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when save operation is completed,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply = req.save('controls.xml');
         * reply.catch( function(save) {
         *      console.log('Failed to save parameters:' + motorcortex.statusToStr(save.status));
         * });
         */

    }, {
        key: 'save',
        value: function save(file_name) {
            // instantiating message type
            var save_msg = this.protobuf_types.createType('motorcortex.SaveMsg', {
                path: '',
                fileName: file_name
            });

            // encoding and sending data
            return this.send(this.encode(save_msg));
        }

        /**
         * Request a server to load value from the file to the parameter tree.
         * @param {string} file_name A file name from which to load values to the parameter tree.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when load operation is complete,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply = req.load('controls.xml');
         * reply.catch( function(load) {
         *      console.log('Failed to load parameters:' + motorcortex.statusToStr(load.status));
         * });
         */

    }, {
        key: 'load',
        value: function load(file_name) {
            // instantiating message type
            var load_msg = this.protobuf_types.createType('motorcortex.LoadMsg', {
                path: '',
                fileName: file_name
            });

            // encoding and sending data
            return this.send(this.encode(load_msg));
        }

        /**********internal methods**************/

    }, {
        key: '_onMessage',
        value: function _onMessage(e) {
            var data = e.data;
            // receiving reply message, first four bytes is reply id and protocol id
            var msg = new DataView(data);
            var reply_id = msg.getUint32(0);
            // checking if protocol id is correct
            if (reply_id & REP_HEADER) {
                reply_id = reply_id - REP_HEADER;
                // requesting resolve method from replies dict
                var reply = this.replies.get(reply_id);
                if (reply) {
                    // decoding type id, offset is 4 bytes, size is 4 bytes (1 - uint32)
                    var type_id = msg.getUint32(4, true);
                    // getting instance of the message type by hash
                    var message_type = this.protobuf_types.getTypeByHash(type_id);
                    if (message_type) {
                        var decoded_msg = message_type.decode(new Uint8Array(data, 8));
                        // starus code is requered to decide what to call: resolve or reject.
                        // few messges still don't have this field, adding a dummy field to prevent an error
                        // depending on message type, perform additional operation to decode fo the value
                        switch (message_type.decode_value) {
                            case _message_types.motorcortex_parameter_msg:
                                decoded_msg.value = this.protobuf_types.decodeValue(decoded_msg);
                                break;
                            case _message_types.motorcortex_parameter_list_msg:
                                for (var i = 0; i < decoded_msg.params.length; i++) {
                                    var _msg = decoded_msg.params[i];
                                    _msg.value = this.protobuf_types.decodeValue(_msg);
                                }
                                break;
                            default:
                                break;
                        }
                        // decode wire message into data type instance, with offset 8 bytes
                        // calling resovle method
                        reply.reply(decoded_msg);
                    } else {
                        console.log('Failed to decode hash: ', type_id.toString(16));
                    }
                } else {
                    console.log('Got message with unknown reply id');
                }
            } else {
                console.log('Req/Rep got message with unknown control info format');
            }
        }
    }, {
        key: '_incReqId',
        value: function _incReqId() {
            return this.request_id++;
        }
    }, {
        key: '_buildSetPayload',
        value: function _buildSetPayload(path, value, options) {
            // encoding parameter value
            var payload = {};
            var error = null;
            payload.path = path;
            var offset = options.offset ? options.offset : 0;
            var length = options.length ? options.length : 0;
            if (offset + length > 0) {
                payload.offset = { type: 1, offset: offset, length: length };
            }

            if (value.encode) {
                payload.value = value.encode();
            } else {
                // if typename is not set, checking cached ParameterTree for the type
                var param_value = null;
                var type_name = options.type_name;
                if (!type_name) {
                    var type_id = this.parameter_tree.getDataType(path);
                    if (type_id) {
                        param_value = this.protobuf_types.getTypeByHash(type_id);
                    } else {
                        error = 'Failed to resolve path:' + path;
                    }
                } else {
                    param_value = this.protobuf_types.createType(type_name);
                }
                if (param_value) {
                    payload.value = param_value.encode(value);
                }
            }

            return [payload, error];
        }
    }, {
        key: '_buildOverwriteParameterMsg',
        value: function _buildOverwriteParameterMsg(path, value, activate, options) {
            // prepare payload
            var _buildSetPayload2 = this._buildSetPayload(path, value, options),
                _buildSetPayload3 = _slicedToArray(_buildSetPayload2, 2),
                payload = _buildSetPayload3[0],
                error = _buildSetPayload3[1];

            if (error) {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }

            payload.activate = activate;
            // creating and fill type instance
            return this.protobuf_types.createType('motorcortex.OverwriteParameterMsg', payload);
        }
    }, {
        key: '_buildSetParameterMsg',
        value: function _buildSetParameterMsg(path, value, options) {
            // prepare payload
            var _buildSetPayload4 = this._buildSetPayload(path, value, options),
                _buildSetPayload5 = _slicedToArray(_buildSetPayload4, 2),
                payload = _buildSetPayload5[0],
                error = _buildSetPayload5[1];

            if (error) {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            }

            // creating and fill type instance
            return this.protobuf_types.createType('motorcortex.SetParameterMsg', payload);
        }
    }, {
        key: '_buildGetParameterMsg',
        value: function _buildGetParameterMsg(path) {
            // getting and instantiating data type from the loaded dict
            var get_param_msg = this.protobuf_types.createType('motorcortex.GetParameterMsg');
            get_param_msg.path = path;

            return get_param_msg;
        }
    }, {
        key: '_emptyReplyQueue',
        value: function _emptyReplyQueue() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.replies.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    this.replies.get(key).error('Failed to get request, connection closed');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Request;
}();

exports.Request = Request;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = OneOf;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(5);
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

var Field = __webpack_require__(4),
    util  = __webpack_require__(0);

/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object.<string,*>} [fieldNames] Field names
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function OneOf(name, fieldNames, options, comment) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);

    /* istanbul ignore if */
    if (!(fieldNames === undefined || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");

    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */
    this.oneof = fieldNames || []; // toJSON, marker

    /**
     * Fields that belong to this oneof as an array for iteration.
     * @type {Field[]}
     * @readonly
     */
    this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Oneof descriptor.
 * @interface IOneOf
 * @property {Array.<string>} oneof Oneof field names
 * @property {Object.<string,*>} [options] Oneof options
 */

/**
 * Constructs a oneof from a oneof descriptor.
 * @param {string} name Oneof name
 * @param {IOneOf} json Oneof descriptor
 * @returns {OneOf} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options, json.comment);
};

/**
 * Converts this oneof to a oneof descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IOneOf} Oneof descriptor
 */
OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , this.options,
        "oneof"   , this.oneof,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
                oneof.parent.add(oneof.fieldsArray[i]);
}

/**
 * Adds a field to this oneof and removes it from its current parent, if any.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOf.prototype.add = function add(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
    this.oneof.push(field.name);
    this.fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof and puts it back to the oneof's parent.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOf.prototype.remove = function remove(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    var index = this.fieldsArray.indexOf(field);

    /* istanbul ignore if */
    if (index < 0)
        throw Error(field + " is not a member of " + this);

    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);

    /* istanbul ignore else */
    if (index > -1) // theoretical
        this.oneof.splice(index, 1);

    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self = this;
    // Collect present fields
    for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
        }
    }
    // Add not yet present fields
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOf.prototype.onRemove = function onRemove(parent) {
    for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
    ReflectionObject.prototype.onRemove.call(this, parent);
};

/**
 * Decorator function as returned by {@link OneOf.d} (TypeScript).
 * @typedef OneOfDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} oneofName OneOf name
 * @returns {undefined}
 */

/**
 * OneOf decorator (TypeScript).
 * @function
 * @param {...string} fieldNames Field names
 * @returns {OneOfDecorator} Decorator function
 * @template T extends string
 */
OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length),
        index = 0;
    while (index < arguments.length)
        fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor)
            .add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
        });
    };
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscribe = exports.Subscription = exports.Parameter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(10);

var _motorcortex = __webpack_require__(9);

var _motorcortex2 = _interopRequireDefault(_motorcortex);

var _utils = __webpack_require__(3);

var _long = __webpack_require__(23);

var _long2 = _interopRequireDefault(_long);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NSEC_IN_SEC = 1000000000;

/**
 * Parameter value with a timestamp
 */

var Parameter = exports.Parameter = function () {
    function Parameter(timestamp, value) {
        _classCallCheck(this, Parameter);

        this.timestamp = timestamp;
        this.value = value;
    }

    /**
     * Gets a parameter timestamp and a value
     * @returns {{Timestamp, DataType}} Returns an object with parameter timestamp and value.
     * @see motorcortex.proto DataType
     * @example
     * // Reads latest update from the subscription
     * let parameters = subscription.read();
     * // Iterates through all the parameters
     * for (let parameter of parameters) {
     *      // Gets time and value
     *      let time_value_pair = parameter.get();
     *      console.log('Parameter timestamp: ' + time_value_pair.timestamp + ' value: ', time_value_pair.value);
     * }
     */


    _createClass(Parameter, [{
        key: 'get',
        value: function get() {
            return { timestamp: this.timestamp, value: this.value };
        }

        /**
         * Gets parameter timestamp
         * @returns {Timestamp} Returns parameter timestamp.
         * @example
         * // Reads latest update from the subscription
         * let parameters = subscription.read();
         * // Iterates through all the parameters
         * for (let parameter of parameters) {
         *      // Gets time
         *      console.log('Parameter timestamp: ' + parameter.getTimestamp());
         * }
         */

    }, {
        key: 'getTimestamp',
        value: function getTimestamp() {
            return this.timestamp;
        }

        /**
         * Gets parameter value
         * @returns {DataType} Returns parameter value.
         * @see motorcortex.proto DataType
         * @example
         * Reads latest update from the subscription
         * let parameters = subscription.read();
         * // Iterates through all the parameters
         * for (let parameter of parameters) {
         *      // Gets value
         *      console.log('Parameter value: ', parameter.getValue());
         * }
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }

        /**
         * Gets parameter as a string
         * @returns {string} String formatted as 'timestamp: parameter'.
         * @example
         * Reads latest update from the subscription
         * let parameters = subscription.read();
         * // Iterates through all the parameters
         * for (let parameter of parameters) {
         *      // Gets value
         *      console.log('Parameter value: ', parameter.toString());
         * }
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.timestamp.toString() + ': ' + this.value.toString();
        }
    }]);

    return Parameter;
}();

/**
 * Subscription class represents an active subscription group. It returns latest values and timestamps of the
 * group parameters. Subscription class could be used as an observer, which notifies on every update or could be
 * used as polling.
 */


var Subscription = exports.Subscription = function () {
    function Subscription(group_alias, protobuf_types) {
        _classCallCheck(this, Subscription);

        var _this = this;
        _this.__info = null;
        _this.__values = null;
        _this.__layout = null;
        _this.__decoder = null;
        _this.__group_alias = group_alias;
        _this.__protobuf_types = protobuf_types;
        _this.__protobuf_datatypes = _this.__protobuf_types.types_by_name['motorcortex.DataType'].values;
        _this.__observer = null;
        _this.__is_complete = false;
        _this.__promise = new Promise(function (resolve, reject) {
            _this.__resolve = resolve;
            _this.__reject = reject;
        });
    }

    /**
     * Returns subscription identifier
     * @return {number}
     */


    _createClass(Subscription, [{
        key: 'id',
        value: function id() {
            return this.__info.id;
        }

        /**
         * Return group alias
         * @return {string}
         */

    }, {
        key: 'alias',
        value: function alias() {
            return this.__group_alias;
        }

        /**
         * This callback is resolved when subscription is ready or failed.
         * @callback SubscriptionClb
         * @param {GroupStatusMsg} status A status and layout of the subscribe request.
         */

        /**
         * Returns a Promise which is resolved when subscription request is complete.
         * @param {SubscriptionClb} subscription_complete A callback which is resolved when subscription is complete.
         * @return {Promise<GroupStatusMsg>}
         * @see motorcortex.proto GroupStatusMsg
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      console.log("Subscribed: " + subscription);
         * }).catch(function (subscription) {
         *      console.log("Subscription failed: " + + motorcortex.statusToStr(subscription.status));
         * });
         */

    }, {
        key: 'then',
        value: function then(subscription_complete) {
            this.__promise.then(subscription_complete);
            return this;
        }

        /**
         * Returns a Promise which is resolved when subscription request fails.
         * @param {SubscriptionClb} subscription_failed A callback which is resolved when subscription fails.
         * @return {Promise<GroupStatusMsg>}
         * @see motorcortex.proto GroupStatusMsg
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      console.log("Subscribed: " + subscription);
         * }).catch(function (subscription) {
         *      console.log("Subscription failed: " + + motorcortex.statusToStr(subscription.status));
         * });
         */

    }, {
        key: 'catch',
        value: function _catch(subscription_failed) {
            this.__promise.catch(subscription_failed);
            return this;
        }

        /**
         * Reads the latest values of the parameters in the group
         * @return {Array<Parameter>} Returns a list of parameters.
         */

    }, {
        key: 'read',
        value: function read() {
            return this.__is_complete ? this.__values.slice() : null;
        }

        /**
         * Gets a layout of the group.
         * @return {Array<string>} Returns ordered list of the parameters in the group.
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      let group_layout = data_sub.layout();
         *      console.log("Subscribed for: " + group_layout.toString());
         * });
         */

    }, {
        key: 'layout',
        value: function layout() {
            return this.__is_complete ? this.__layout : null;
        }

        /**
         * This callback notifies when subscription is updated with new values.
         * @callback SubscriptionUpdateClb
         * @param {Array<Parameter>} parameters A list of values and timestamps, ordered according to the group layout.
         */

        /**
         * Sets an observer, which is notified on every group update.
         * @param {SubscriptionUpdateClb} observer A callback to notify when new values are available.
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      data_sub.notify(function (parameters) {
         *          console.log('Received group update');
         *          let layout = data_sub.layout();
         *          for(let i = 0; i < layout.length; i++) {
         *              console.log("Parameter: " + layout[i] + " value: " + parameters[i].toString());
         *          }
         *      }
         * });
         */

    }, {
        key: 'notify',
        value: function notify(observer) {
            this.__observer = observer;
        }

        /**********internal methods**************/

    }, {
        key: '_complete',
        value: function _complete(msg, param_list) {
            this.__values = [];
            this.__layout = [];
            this.__decoder = [];
            if (msg.status == _motorcortex2.default.getStatusCode('OK')) {
                this.__info = msg;
                var params = this.__info.params;
                for (var i = 0; i < params.length; i++) {
                    this.__values.push(new Parameter(0, new Array(params[i].info.numberOfElements)));
                    this.__layout.push(params[i].info.path);
                    var data_type = params[i].info.dataType;
                    this.__decoder.push(this.__protobuf_types.getTypeByHash(data_type));
                }
                this.__is_complete = true;
                this.__resolve(msg);
            } else {
                this.__reject('Failed to subscribe to the group name: ' + this.__group_alias + ', parameter path is wrong: ' + param_list.toString());
            }
        }
    }, {
        key: '_update',
        value: function _update(msg, header_offset) {
            var _this = this;
            //  setTimeout(function() {
            for (var i = 0; i < _this.__info.params.length; i++) {
                // ref to the parameter info
                var param = _this.__info.params[i];
                // need to know parameter offset and size in the message
                var offset = param.offset + header_offset;
                var size = param.size;

                if (offset + size <= msg.byteLength) {

                    // first decode timestamp, which is 16 bytes
                    // first 8 bytes is sec
                    var msg_data_view = new DataView(msg, offset);
                    var sec_val = new _long2.default(msg_data_view.getUint32(0, true), msg_data_view.getUint32(4, true), true);
                    // next 8 bytes is nsec
                    var nsec_val = new _long2.default(msg_data_view.getUint32(8, true), msg_data_view.getUint32(12, true), true);
                    // create time data structure
                    var time = sec_val.toNumber() + nsec_val.toNumber() / NSEC_IN_SEC;
                    var number_of_elements = param.info.numberOfElements;
                    var type_id = param.info.dataType;
                    var value = void 0;
                    var TIMESTAMP_HEADER = 16;
                    switch (type_id) {
                        // user types
                        case _this.__protobuf_datatypes['USER_TYPE']:
                            value = new Uint8Array(msg, offset + 16);
                            break;
                        // c-strings
                        case _this.__protobuf_datatypes['STRING']:
                            var byte_view = new Uint8Array(msg, offset + 16);
                            value = '';
                            var o = 0;
                            while (byte_view[o] != 0 && o < byte_view.byteLength) {
                                value += String.fromCharCode(byte_view[o++]);
                            }
                            break;
                        default:
                            var decoder = _this.__decoder[i];
                            value = decoder.decode(new DataView(msg, offset + TIMESTAMP_HEADER), number_of_elements);
                    }

                    _this.__values[i] = new Parameter(time, value);
                }
            }

            // updating observers
            if (_this.__observer) {
                _this.__observer(_this.__values.slice());
            }
        }
    }, {
        key: '_failed',
        value: function _failed(msg) {
            this.__reject(msg);
        }
    }, {
        key: '_getObserver',
        value: function _getObserver() {
            return this.__observer;
        }
    }]);

    return Subscription;
}();

/**
 * Subscribe class is used to receive continuous parameter updates from motorcortex server.
 * Subscribe class simplifies creating and removing subscription groups.
 */


var Subscribe = exports.Subscribe = function () {
    /**
     * Creates subscribe
     * @constructor
     * @param {Request} request A reference to the request object.
     */
    function Subscribe(request) {
        _classCallCheck(this, Subscribe);

        this.websocket = null;
        this.request = request;
        this.subscriptions = new Map();
    }

    /**
     * Actual Publish/Subscribe connection state.
     * @return {number} Returns a connection state.
     * @example
     * CONNECTING   0    The connection is not yet open
     * OPEN         1    The connection is open and ready to communicate
     * CLOSING      2    The connection is in the process of closing
     * CLOSED       3    The connection is closed or could not be opened
     */


    _createClass(Subscribe, [{
        key: 'connectionState',
        value: function connectionState() {
            var SOCKET_CLOSED = 3;
            return this.websocket ? this.websocket.readyState : SOCKET_CLOSED;
        }

        /**
         * Opens a subscribe connection.
         * @param {string} url Motorcortex server URL.
         * @return {Promise<string>} A promise, which completes when connection is ready.
         * If connection is failed, short error description is passed to the cathe method.
         * @example
         * let sub = new motorcortex.Subscribe(req);
         * let sub_conn_done = sub.connect(`ws://${server}:5557`);
         * sub_conn_done.then(function () {
         *      console.log('Subscribe connection is established');
         * })
         * .catch(function (reason) {
         *      console.error('Failed to establish connection: ' + reason);
         * });
         */

    }, {
        key: 'connect',
        value: function connect(url) {
            // initializing and connecting websocket
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.websocket = new WebSocket(url, 'pub.sp.nanomsg.org');
                _this.websocket.binaryType = 'arraybuffer';
                _this.websocket.onopen = function (e) {
                    resolve();
                };
                _this.websocket.onerror = function (e) {
                    _this.websocket.close();
                    reject('Failed to connect to: ' + url);
                };
                _this.websocket.onmessage = function (e) {
                    _this._onMessage(e);
                };
                _this.websocket.onclose = function (e) {
                    _this.connectionClosed();
                };
            });
        }
    }, {
        key: 'connectionClosed',
        value: function connectionClosed() {
            return this.request.connectionClosed();
        }

        /**
         * Closes connection to the server
         */

    }, {
        key: 'close',
        value: function close() {
            if (this.connectionState() !== _utils.ConnectionState.CLOSING && this.connectionState() !== _utils.ConnectionState.CLOSED) {
                this.websocket.close();
            }
        }

        /**
         * Create a subscription group for a list of the parameters.
         * @param {Array<string>} path_list List of the parameters to subscribe to.
         * @param {string} group_alias Name of the group.
         * @param {number=} frq_divider Frequency divider is a downscaling factor of the group publish rate.
         * Default value is 1, every cycle of the publisher.
         * @return {Subscription<GroupStatusMsg>} Returns a subscription handle, which acts as a JavaScript Promise,
         * it is resolved when subscription is ready or failed. After the subscription
         * is ready the handle is used to retrieve latest data.
         * @see Subscription, motorcortex.proto, GroupStatusMsg, StatusCode
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      console.log('Subscription is ready');
         *      // when subscription is ready, setting an update callback
         *      data_sub.notify(function (parameters) {
         *          console.log('Received group update');
         *          let layout = data_sub.layout();
         *          for(let i = 0; i < layout.length; i++) {
         *              console.log("Parameter: " + layout[i] + " value: " + parameters[i].toString());
         *          }
         *      }
         * }).catch(function (subscription) {
         *      console.log('Failed to subscribe: ' + motorcortex.statusToStr(group.status));
         * });
         */

    }, {
        key: 'subscribe',
        value: function subscribe(path_list, group_alias, frq_divider) {
            // create a group subscription
            var subscription = new Subscription(group_alias, this.request.getMessageTypes());
            var _this = this;
            // send subscribe request to the server
            this.request.createGroup(path_list, group_alias, frq_divider).then(function (msg) {
                // add subscription to the active sub. list and call subscription complete routine
                _this.subscriptions.set(msg.id, subscription);
                subscription._complete(msg, path_list);
            }).catch(function (e) {
                // if subscription failed, call failed routine
                subscription._failed(e);
            });
            return subscription;
        }

        /**
         * Unsubscribes from the group.
         * @param {string} group_alias Name of the group to unsubscribe from.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when the unsubscribe operation is complete,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let unsub_handle = req.unsubscribe('myGroup1');
         * unsub_handle.catch( function(unsubscribe) {
         *      console.log('Failed to remove group: ' + motorcortex.statusToStr(unsubscribe.status));
         * });
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(group_alias) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.subscriptions.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (this.subscriptions.get(key).alias() === group_alias) {
                        this.subscriptions.delete(key);
                        break;
                    }
                }
                // send remove group request to the server
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this.request.removeGroup(group_alias);
        }

        // Interanl methods

    }, {
        key: '_onMessage',
        value: function _onMessage(e) {
            // get group id, it is 4 bytes
            var msg = new DataView(e.data);
            var hash = msg.getUint32(0, true);
            // find subscription by the id
            var sub = this.subscriptions.get(hash);
            if (sub) {
                // if it exists, update its value
                var HEADER_OFFSET = 4;
                sub._update(e.data, HEADER_OFFSET);
            }
        }
    }]);

    return Subscribe;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = MapField;

// extends Field
var Field = __webpack_require__(4);
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types   = __webpack_require__(6),
    util    = __webpack_require__(0);

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function MapField(name, id, keyType, type, options, comment) {
    Field.call(this, name, id, type, undefined, undefined, options, comment);

    /* istanbul ignore if */
    if (!util.isString(keyType))
        throw TypeError("keyType must be a string");

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {ReflectionObject|null}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Map field descriptor.
 * @interface IMapField
 * @extends {IField}
 * @property {string} keyType Key type
 */

/**
 * Extension map field descriptor.
 * @interface IExtensionMapField
 * @extends IMapField
 * @property {string} extend Extended type
 */

/**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {IMapField} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
};

/**
 * Converts this map field to a map field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMapField} Map field descriptor
 */
MapField.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "keyType" , this.keyType,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
MapField.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined)
        throw Error("invalid key type: " + this.keyType);

    return Field.prototype.resolve.call(this);
};

/**
 * Map field decorator (TypeScript).
 * @name MapField.d
 * @function
 * @param {number} fieldId Field id
 * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
 * @returns {FieldDecorator} Decorator function
 * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
 */
MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

    // submessage value: decorate the submessage and use its name as the type
    if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;

    // enum reference value: create a reflected copy of the enum and keep reuseing it
    else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;

    return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Message;

var util = __webpack_require__(2);

/**
 * Constructs a new message instance.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Properties<T>} [properties] Properties to set
 * @template T extends object
 */
function Message(properties) {
    // not used internally
    if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/*eslint-disable valid-jsdoc*/

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<T>} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.create = function create(properties) {
    return this.$type.create(properties);
};

/**
 * Encodes a message of this type.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {string|null} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {T} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {T} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};

/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */
Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
};

/*eslint-enable valid-jsdoc*/

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Method;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(5);
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

var util = __webpack_require__(0);

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this method
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {

    /* istanbul ignore next */
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }

    /* istanbul ignore if */
    if (!(type === undefined || util.isString(type)))
        throw TypeError("type must be a string");

    /* istanbul ignore if */
    if (!util.isString(requestType))
        throw TypeError("requestType must be a string");

    /* istanbul ignore if */
    if (!util.isString(responseType))
        throw TypeError("responseType must be a string");

    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

    /**
     * Resolved request type.
     * @type {Type|null}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {Type|null}
     */
    this.resolvedResponseType = null;

    /**
     * Comment for this method
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Method descriptor.
 * @interface IMethod
 * @property {string} [type="rpc"] Method type
 * @property {string} requestType Request type
 * @property {string} responseType Response type
 * @property {boolean} [requestStream=false] Whether requests are streamed
 * @property {boolean} [responseStream=false] Whether responses are streamed
 * @property {Object.<string,*>} [options] Method options
 */

/**
 * Constructs a method from a method descriptor.
 * @param {string} name Method name
 * @param {IMethod} json Method descriptor
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
};

/**
 * Converts this method to a method descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMethod} Method descriptor
 */
Method.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "type"           , this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
        "requestType"    , this.requestType,
        "requestStream"  , this.requestStream,
        "responseType"   , this.responseType,
        "responseStream" , this.responseStream,
        "options"        , this.options,
        "comment"        , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Method.prototype.resolve = function resolve() {

    /* istanbul ignore if */
    if (this.resolved)
        return this;

    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);

    return ReflectionObject.prototype.resolve.call(this);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(2);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                if ((wireType = this.uint32() & 7) === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Root;

// extends Namespace
var Namespace = __webpack_require__(7);
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

var Field   = __webpack_require__(4),
    Enum    = __webpack_require__(1),
    OneOf   = __webpack_require__(11),
    util    = __webpack_require__(0);

var Type,   // cyclic
    parse,  // might be excluded
    common; // "

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */
function Root(options) {
    Namespace.call(this, "", options);

    /**
     * Deferred extension fields.
     * @type {Field[]}
     */
    this.deferred = [];

    /**
     * Resolved file names of loaded files.
     * @type {string[]}
     */
    this.files = [];
}

/**
 * Loads a namespace descriptor into a root namespace.
 * @param {INamespace} json Nameespace descriptor
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */
Root.fromJSON = function fromJSON(json, root) {
    if (!root)
        root = new Root();
    if (json.options)
        root.setOptions(json.options);
    return root.addJSON(json.nested);
};

/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string|null} Resolved path to `target` or `null` to skip the file
 */
Root.prototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */
function SYNC() {} // eslint-disable-line no-empty-function

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
Root.prototype.load = function load(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback)
        return util.asPromise(load, self, filename, options);

    var sync = callback === SYNC; // undocumented

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        /* istanbul ignore if */
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        if (sync)
            throw err;
        cb(err, root);
    }

    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{")
                source = JSON.parse(source);
            if (!util.isString(source))
                self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options),
                    resolved,
                    i = 0;
                if (parsed.imports)
                    for (; i < parsed.imports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.imports[i]))
                            fetch(resolved);
                if (parsed.weakImports)
                    for (i = 0; i < parsed.weakImports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.weakImports[i]))
                            fetch(resolved, true);
            }
        } catch (err) {
            finish(err);
        }
        if (!sync && !queued)
            finish(null, self); // only once anyway
    }

    // Fetches a single file
    function fetch(filename, weak) {

        // Strip path if this file references a bundled definition
        var idx = filename.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common)
                filename = altname;
        }

        // Skip if already loaded / attempted
        if (self.files.indexOf(filename) > -1)
            return;
        self.files.push(filename);

        // Shortcut bundled definitions
        if (filename in common) {
            if (sync)
                process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }

        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak)
                    finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            util.fetch(filename, function(err, source) {
                --queued;
                /* istanbul ignore if */
                if (!callback)
                    return; // terminated meanwhile
                if (err) {
                    /* istanbul ignore else */
                    if (!weak)
                        finish(err);
                    else if (!queued) // can't be covered reliably
                        finish(null, self);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename))
        filename = [ filename ];
    for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self.resolvePath("", filename[i]))
            fetch(resolved);

    if (sync)
        return self;
    if (!queued)
        finish(null, self);
    return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:IParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
Root.prototype.loadSync = function loadSync(filename, options) {
    if (!util.isNode)
        throw Error("not supported");
    return this.load(filename, options, SYNC);
};

/**
 * @override
 */
Root.prototype.resolveAll = function resolveAll() {
    if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
};

// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;

/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Root} root Root instance
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function tryHandleExtension(root, field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
Root.prototype._handleAdd = function _handleAdd(object) {
    if (object instanceof Field) {

        if (/* an extension field (implies not part of a oneof) */ object.extend !== undefined && /* not already handled */ !object.extensionField)
            if (!tryHandleExtension(this, object))
                this.deferred.push(object);

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            object.parent[object.name] = object.values; // expose enum values as property of its parent

    } else if (!(object instanceof OneOf)) /* everything else is a namespace */ {

        if (object instanceof Type) // Try to handle any deferred extensions
            for (var i = 0; i < this.deferred.length;)
                if (tryHandleExtension(this, this.deferred[i]))
                    this.deferred.splice(i, 1);
                else
                    ++i;
        for (var j = 0; j < /* initializes */ object.nestedArray.length; ++j) // recurse into the namespace
            this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
            object.parent[object.name] = object; // expose namespace as property of its parent
    }

    // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
    // properties of namespaces just like static code does. This allows using a .d.ts generated for
    // a static module with reflection-based solutions where the condition is met.
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
Root.prototype._handleRemove = function _handleRemove(object) {
    if (object instanceof Field) {

        if (/* an extension field */ object.extend !== undefined) {
            if (/* already handled */ object.extensionField) { // remove its sister field
                object.extensionField.parent.remove(object.extensionField);
                object.extensionField = null;
            } else { // cancel the extension
                var index = this.deferred.indexOf(object);
                /* istanbul ignore else */
                if (index > -1)
                    this.deferred.splice(index, 1);
            }
        }

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose enum values

    } else if (object instanceof Namespace) {

        for (var i = 0; i < /* initializes */ object.nestedArray.length; ++i) // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose namespaces

    }
};

Root._configure = function(Type_, parse_, common_) {
    Type = Type_;
    parse = parse_;
    common = common_;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

// extends Namespace
var Namespace = __webpack_require__(7);
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

var Method = __webpack_require__(15),
    util   = __webpack_require__(0),
    rpc    = __webpack_require__(28);

/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {Method[]|null}
     * @private
     */
    this._methodsArray = null;
}

/**
 * Service descriptor.
 * @interface IService
 * @extends INamespace
 * @property {Object.<string,IMethod>} methods Method descriptors
 */

/**
 * Constructs a service from a service descriptor.
 * @param {string} name Service name
 * @param {IService} json Service descriptor
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    /* istanbul ignore else */
    if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested)
        service.addJSON(json.nested);
    service.comment = json.comment;
    return service;
};

/**
 * Converts this service to a service descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IService} Service descriptor
 */
Service.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , inherited && inherited.options || undefined,
        "methods" , Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */ {},
        "nested"  , inherited && inherited.nested || undefined,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Methods of this service as an array for iteration.
 * @name Service#methodsArray
 * @type {Method[]}
 * @readonly
 */
Object.defineProperty(Service.prototype, "methodsArray", {
    get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
    }
});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * @override
 */
Service.prototype.get = function get(name) {
    return this.methods[name]
        || Namespace.prototype.get.call(this, name);
};

/**
 * @override
 */
Service.prototype.resolveAll = function resolveAll() {
    var methods = this.methodsArray;
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override
 */
Service.prototype.add = function add(object) {

    /* istanbul ignore if */
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * @override
 */
Service.prototype.remove = function remove(object) {
    if (object instanceof Method) {

        /* istanbul ignore if */
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
 */
Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
    for (var i = 0, method; i < /* initializes */ this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r","c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
        });
    }
    return rpcService;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Type;

// extends Namespace
var Namespace = __webpack_require__(7);
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

var Enum      = __webpack_require__(1),
    OneOf     = __webpack_require__(11),
    Field     = __webpack_require__(4),
    MapField  = __webpack_require__(13),
    Service   = __webpack_require__(18),
    Message   = __webpack_require__(14),
    Reader    = __webpack_require__(16),
    Writer    = __webpack_require__(20),
    util      = __webpack_require__(0),
    encoder   = __webpack_require__(26),
    decoder   = __webpack_require__(25),
    verifier  = __webpack_require__(30),
    converter = __webpack_require__(24),
    wrappers  = __webpack_require__(31);

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {Object.<number,Field>|null}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {Field[]|null}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {OneOf[]|null}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {Constructor<{}>}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(Type.prototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {

            /* istanbul ignore if */
            if (this._fieldsById)
                return this._fieldsById;

            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;

                /* istanbul ignore if */
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);

                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */
    ctor: {
        get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {

            // Ensure proper prototype
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
                (ctor.prototype = new Message()).constructor = ctor;
                util.merge(ctor.prototype, prototype);
            }

            // Classes and messages reference their reflected type
            ctor.$type = ctor.prototype.$type = this;

            // Mix in static methods
            util.merge(ctor, Message, true);

            this._ctor = ctor;

            // Messages have non-enumerable default values on their prototype
            var i = 0;
            for (; i < /* initializes */ this.fieldsArray.length; ++i)
                this._fieldsArray[i].resolve(); // ensures a proper value

            // Messages have non-enumerable getters and setters for each virtual oneof field
            var ctorProperties = {};
            for (i = 0; i < /* initializes */ this.oneofsArray.length; ++i)
                ctorProperties[this._oneofsArray[i].resolve().name] = {
                    get: util.oneOfGetter(this._oneofsArray[i].oneof),
                    set: util.oneOfSetter(this._oneofsArray[i].oneof)
                };
            if (i)
                Object.defineProperties(ctor.prototype, ctorProperties);
        }
    }
});

/**
 * Generates a constructor function for the specified type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
Type.generateConstructor = function generateConstructor(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["p"], mtype.name);
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen
            ("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen
            ("this%s=[]", util.safeProp(field.name));
    return gen
    ("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
    /* eslint-enable no-unexpected-multiline */
};

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}

/**
 * Message type descriptor.
 * @interface IType
 * @extends INamespace
 * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
 * @property {Object.<string,IField>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 */

/**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {IType} json Message type descriptor
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields),
        i = 0;
    for (; i < names.length; ++i)
        type.add(
            ( typeof json.fields[names[i]].keyType !== "undefined"
            ? MapField.fromJSON
            : Field.fromJSON )(names[i], json.fields[names[i]])
        );
    if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add( // most to least likely
                ( nested.id !== undefined
                ? Field.fromJSON
                : nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    if (json.comment)
        type.comment = json.comment;
    return type;
};

/**
 * Converts this message type to a message type descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IType} Message type descriptor
 */
Type.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"    , inherited && inherited.options || undefined,
        "oneofs"     , Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields"     , Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; }), toJSONOptions) || {},
        "extensions" , this.extensions && this.extensions.length ? this.extensions : undefined,
        "reserved"   , this.reserved && this.reserved.length ? this.reserved : undefined,
        "group"      , this.group || undefined,
        "nested"     , inherited && inherited.nested || undefined,
        "comment"    , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return Namespace.prototype.resolveAll.call(this);
};

/**
 * @override
 */
Type.prototype.get = function get(name) {
    return this.fields[name]
        || this.oneofs && this.oneofs[name]
        || this.nested && this.nested[name]
        || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
Type.prototype.add = function add(object) {

    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.

        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);

        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.

        /* istanbul ignore if */
        if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {

        /* istanbul ignore if */
        if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<{}>} Message instance
 */
Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).

    var fullName = this.fullName,
        types    = [];
    for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);

    // Replace setup methods with type-specific generated functions
    this.encode = encoder(this)({
        Writer : Writer,
        types  : types,
        util   : util
    });
    this.decode = decoder(this)({
        Reader : Reader,
        types  : types,
        util   : util
    });
    this.verify = verifier(this)({
        types : types,
        util  : util
    });
    this.fromObject = converter.fromObject(this)({
        types : types,
        util  : util
    });
    this.toObject = converter.toObject(this)({
        types : types,
        util  : util
    });

    // Inject custom wrappers for common types
    var wrapper = wrappers[fullName];
    if (wrapper) {
        var originalThis = Object.create(this);
        // if (wrapper.fromObject) {
            originalThis.fromObject = this.fromObject;
            this.fromObject = wrapper.fromObject.bind(originalThis);
        // }
        // if (wrapper.toObject) {
            originalThis.toObject = this.toObject;
            this.toObject = wrapper.toObject.bind(originalThis);
        // }
    }

    return this;
};

/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError<{}>} If required fields are missing
 */
Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader))
        reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {null|string} `null` if valid, otherwise the reason why it is not
 */
Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message<{}>} Message instance
 */
Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};

/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @interface IConversionOptions
 * @property {Function} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {Function} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {Function} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};

/**
 * Decorator function as returned by {@link Type.d} (TypeScript).
 * @typedef TypeDecorator
 * @type {function}
 * @param {Constructor<T>} target Target constructor
 * @returns {undefined}
 * @template T extends Message<T>
 */

/**
 * Type decorator (TypeScript).
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {TypeDecorator<T>} Decorator function
 * @template T extends Message<T>
 */
Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
        util.decorateType(target, typeName);
    };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(2);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */
    Long.prototype.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    }

    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */
    Long.isLong = isLong;

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */
    Long.fromString = fromString;

    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Long}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Long.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     */
    Long.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Long}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Long}
     */
    Long.ZERO = ZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Long}
     */
    Long.UZERO = UZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Long}
     */
    Long.ONE = ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Long}
     */
    Long.UONE = UONE;

    /**
     * @type {!Long}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Long}
     */
    Long.NEG_ONE = NEG_ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Long}
     */
    Long.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Long}
     */
    Long.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Long.prototype
     * @inner
     */
    var LongPrototype = Long.prototype;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */
    LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */
    LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */
    LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */
    LongPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */
    LongPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     */
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     */
    LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     */
    LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     */
    LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     */
    LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     */
    LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.equals = function equals(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.eq = LongPrototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.neq = LongPrototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lt = LongPrototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lte = LongPrototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gt = LongPrototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.compare = function compare(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.comp = LongPrototype.compare;

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     */
    LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     */
    LongPrototype.neg = LongPrototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     */
    LongPrototype.add = function add(addend) {
        if (!isLong(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.sub = LongPrototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.mul = LongPrototype.multiply;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.div = LongPrototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.mod = LongPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     */
    LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.and = function and(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.or = function or(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.xor = function xor(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shl = LongPrototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shr = LongPrototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     */
    LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     */
    LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };

    /**
     * Converts this Long to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */
    LongPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    }

    /**
     * Converts this Long to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */
    LongPrototype.toBytesLE = function() {
        var hi = this.high,
            lo = this.low;
        return [
             lo         & 0xff,
            (lo >>>  8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
             hi         & 0xff,
            (hi >>>  8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    }

    /**
     * Converts this Long to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */
    LongPrototype.toBytesBE = function() {
        var hi = this.high,
            lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>>  8) & 0xff,
             hi         & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>>  8) & 0xff,
             lo         & 0xff
        ];
    }

    return Long;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Runtime message from/to plain object converters.
 * @namespace
 */
var converter = exports;

var Enum = __webpack_require__(1),
    util = __webpack_require__(0);

/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                if (field.repeated && values[keys[i]] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", keys[i])
                ("case %i:", values[keys[i]])
                    ("m%s=%j", prop, values[keys[i]])
                    ("break");
            } gen
            ("}");
        } else gen
            ("if(typeof d%s!==\"object\")", prop)
                ("throw TypeError(%j)", field.fullName + ": object expected")
            ("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
                ("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)
                ("else if(typeof d%s===\"string\")", prop)
                    ("m%s=parseInt(d%s,10)", prop, prop)
                ("else if(typeof d%s===\"number\")", prop)
                    ("m%s=d%s", prop, prop)
                ("else if(typeof d%s===\"object\")", prop)
                    ("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", prop)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)
                ("else if(d%s.length)", prop)
                    ("m%s=d%s", prop, prop);
                break;
            case "string": gen
                ("m%s=String(d%s)", prop, prop);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", prop, prop);
                break;
            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen(["d"], mtype.name + "$fromObject")
    ("if(d instanceof this.ctor)")
        ("return d");
    if (!fields.length) return gen
    ("return new this.ctor");
    gen
    ("var m=new this.ctor");
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            prop   = util.safeProp(field.name);

        // Map fields
        if (field.map) { gen
    ("if(d%s){", prop)
        ("if(typeof d%s!==\"object\")", prop)
            ("throw TypeError(%j)", field.fullName + ": object expected")
        ("m%s={}", prop)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[ks[i]]")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", prop)
        ("if(!Array.isArray(d%s))", prop)
            ("throw TypeError(%j)", field.fullName + ": array expected")
        ("m%s=[]", prop)
        ("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[i]")
        ("}")
    ("}");

        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!=null){", prop); // !== undefined && !== null
        genValuePartial_fromObject(gen, field, /* not sorted */ i, prop);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    } return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else gen
            ("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
            ("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", prop)
                ("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true": "", prop);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default: gen
            ("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen(["m", "o"], mtype.name + "$toObject")
    ("if(!o)")
        ("o={}")
    ("var d={}");

    var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0;
    for (; i < fields.length; ++i)
        if (!fields[i].partOf)
            ( fields[i].resolve().repeated ? repeatedFields
            : fields[i].map ? mapFields
            : normalFields).push(fields[i]);

    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen
        ("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen
    ("}");
    }

    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen
        ("d%s={}", util.safeProp(mapFields[i].name));
        gen
    ("}");
    }

    if (normalFields.length) { gen
    ("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop  = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
        ("if(util.Long){")
            ("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)
        ("}else")
            ("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) gen
        ("d%s=o.bytes===String?%j:%s", prop, String.fromCharCode.apply(String, field.typeDefault), "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]");
            else gen
        ("d%s=%j", prop, field.typeDefault); // also messages (=null)
        } gen
    ("}");
    }
    var hasKs2 = false;
    for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            prop  = util.safeProp(field.name);
        if (field.map) {
            if (!hasKs2) { hasKs2 = true; gen
    ("var ks2");
            } gen
    ("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)
        ("d%s={}", prop)
        ("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[ks2[j]]")
        ("}");
        } else if (field.repeated) { gen
    ("if(m%s&&m%s.length){", prop, prop)
        ("d%s=[]", prop)
        ("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[j]")
        ("}");
        } else { gen
    ("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
        genValuePartial_toObject(gen, field, /* sorted */ index, prop);
        if (field.partOf) gen
        ("if(o.oneofs)")
            ("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen
    ("}");
    }
    return gen
    ("return d");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = decoder;

var Enum    = __webpack_require__(1),
    types   = __webpack_require__(6),
    util    = __webpack_require__(0);

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["r", "l"], mtype.name + "$decode")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k" : ""))
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");

    var i = 0;
    for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref   = "m" + util.safeProp(field.name); gen
            ("case %i:", field.id);

        // Map fields
        if (field.map) { gen
                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("k=r.%s()", field.keyType)
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.long[field.keyType] !== undefined) {
                if (types.basic[type] === undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
                if (types.basic[type] === undefined) gen
                ("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[k]=r.%s()", ref, type);
            }

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "%s.push(types[%i].decode(r))"
                    : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "%s=types[%i].decode(r)"
                : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen
                ("%s=r.%s()", ref, type);
        gen
                ("break");
    // Unknown fields
    } gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")

        ("}")
    ("}");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = encoder;

var Enum     = __webpack_require__(1),
    types    = __webpack_require__(6),
    util     = __webpack_require__(0);

/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genTypePartial(gen, field, fieldIndex, ref) {
    return field.resolvedType.group
        ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
        : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}

/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var gen = util.codegen(["m", "w"], mtype.name + "$encode")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;

    // "when a message is serialized its known fields should be written sequentially by field number"
    var fields = /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);

    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            index    = mtype._fieldsArray.indexOf(field),
            type     = field.resolvedType instanceof Enum ? "int32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
    ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen
            ("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen
            (".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen
        ("}")
    ("}");

            // Repeated fields
        } else if (field.repeated) { gen
    ("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

        ("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()");

            // Non-packed
            } else { gen

        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genTypePartial(gen, field, index, ref + "[i]");
                else gen
            ("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);

            } gen
    ("}");

        // Non-repeated
        } else {
            if (field.optional) gen
    ("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined)
        genTypePartial(gen, field, index, ref);
            else gen
        ("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(54);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = tokenize;

var delimRe        = /[\s{}=;:[\],'"()<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

var setCommentRe = /^ *[*/]+ */,
    setCommentAltRe = /^\s*\*?\/*/,
    setCommentSplitRe = /\n/g,
    whitespaceRe = /\s/,
    unescapeRe = /\\(.?)/g;

var unescapeMap = {
    "0": "\0",
    "r": "\r",
    "n": "\n",
    "t": "\t"
};

/**
 * Unescapes a string.
 * @param {string} str String to unescape
 * @returns {string} Unescaped string
 * @property {Object.<string,string>} map Special characters map
 * @memberof tokenize
 */
function unescape(str) {
    return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
            case "\\":
            case "":
                return $1;
            default:
                return unescapeMap[$1] || "";
        }
    });
}

tokenize.unescape = unescape;

/**
 * Gets the next token and advances.
 * @typedef TokenizerHandleNext
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Peeks for the next token.
 * @typedef TokenizerHandlePeek
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Pushes a token back to the stack.
 * @typedef TokenizerHandlePush
 * @type {function}
 * @param {string} token Token
 * @returns {undefined}
 */

/**
 * Skips the next token.
 * @typedef TokenizerHandleSkip
 * @type {function}
 * @param {string} expected Expected token
 * @param {boolean} [optional=false] If optional
 * @returns {boolean} Whether the token matched
 * @throws {Error} If the token didn't match and is not optional
 */

/**
 * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
 * @typedef TokenizerHandleCmnt
 * @type {function}
 * @param {number} [line] Line number
 * @returns {string|null} Comment text or `null` if none
 */

/**
 * Handle object returned from {@link tokenize}.
 * @interface ITokenizerHandle
 * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
 * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
 * @property {TokenizerHandlePush} push Pushes a token back to the stack
 * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
 * @property {number} line Current line number
 */

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
 * @returns {ITokenizerHandle} Tokenizer handle
 */
function tokenize(source, alternateCommentMode) {
    /* eslint-disable callback-return */
    source = source.toString();

    var offset = 0,
        length = source.length,
        line = 1,
        commentType = null,
        commentText = null,
        commentLine = 0,
        commentLineEmpty = false;

    var stack = [];

    var stringDelim = null;

    /* istanbul ignore next */
    /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */
    function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }

    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
    function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }

    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
    function charAt(pos) {
        return source.charAt(pos);
    }

    /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {undefined}
     * @inner
     */
    function setComment(start, end) {
        commentType = source.charAt(start++);
        commentLine = line;
        commentLineEmpty = false;
        var lookback;
        if (alternateCommentMode) {
            lookback = 2;  // alternate comment parsing: "//" or "/*"
        } else {
            lookback = 3;  // "///" or "/**"
        }
        var commentOffset = start - lookback,
            c;
        do {
            if (--commentOffset < 0 ||
                    (c = source.charAt(commentOffset)) === "\n") {
                commentLineEmpty = true;
                break;
            }
        } while (c === " " || c === "\t");
        var lines = source
            .substring(start, end)
            .split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i]
                .replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "")
                .trim();
        commentText = lines
            .join("\n")
            .trim();
    }

    function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);

        // see if remaining line matches comment pattern
        var lineText = source.substring(startOffset, endOffset);
        // look for 1 or 2 slashes since startOffset would already point past
        // the first slash that started the comment.
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
    }

    function findEndOfLine(cursor) {
        // find end of cursor's line
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
        }
        return endOffset;
    }

    /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */
    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr,
            start,
            isDoc;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
                if (curr === "\n")
                    ++line;
                if (++offset === length)
                    return null;
            }

            if (charAt(offset) === "/") {
                if (++offset === length) {
                    throw illegal("comment");
                }
                if (charAt(offset) === "/") { // Line
                    if (!alternateCommentMode) {
                        // check for triple-slash comment
                        isDoc = charAt(start = offset + 1) === "/";

                        while (charAt(++offset) !== "\n") {
                            if (offset === length) {
                                return null;
                            }
                        }
                        ++offset;
                        if (isDoc) {
                            setComment(start, offset - 1);
                        }
                        ++line;
                        repeat = true;
                    } else {
                        // check for double-slash comments, consolidating consecutive lines
                        start = offset;
                        isDoc = false;
                        if (isDoubleSlashCommentLine(offset)) {
                            isDoc = true;
                            do {
                                offset = findEndOfLine(offset);
                                if (offset === length) {
                                    break;
                                }
                                offset++;
                            } while (isDoubleSlashCommentLine(offset));
                        } else {
                            offset = Math.min(length, findEndOfLine(offset) + 1);
                        }
                        if (isDoc) {
                            setComment(start, offset);
                        }
                        line++;
                        repeat = true;
                    }
                } else if ((curr = charAt(offset)) === "*") { /* Block */
                    // check for /** (regular comment mode) or /* (alternate comment mode)
                    start = offset + 1;
                    isDoc = alternateCommentMode || charAt(start) === "*";
                    do {
                        if (curr === "\n") {
                            ++line;
                        }
                        if (++offset === length) {
                            throw illegal("comment");
                        }
                        prev = curr;
                        curr = charAt(offset);
                    } while (prev !== "*" || curr !== "/");
                    ++offset;
                    if (isDoc) {
                        setComment(start, offset - 2);
                    }
                    repeat = true;
                } else {
                    return "/";
                }
            }
        } while (repeat);

        // offset !== length if we got here

        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === "\"" || token === "'")
            stringDelim = token;
        return token;
    }

    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
    function push(token) {
        stack.push(token);
    }

    /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */
    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
    function skip(expected, optional) {
        var actual = peek(),
            equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }

    /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */
    function cmnt(trailingLine) {
        var ret = null;
        if (trailingLine === undefined) {
            if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
                ret = commentText;
            }
        } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine) {
                peek();
            }
            if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
                ret = commentText;
            }
        }
        return ret;
    }

    return Object.defineProperty({
        next: next,
        peek: peek,
        push: push,
        skip: skip,
        cmnt: cmnt
    }, "line", {
        get: function() { return line; }
    });
    /* eslint-enable callback-return */
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = verifier;

var Enum      = __webpack_require__(1),
    util      = __webpack_require__(0);

function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected";
}

/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(%s){", ref)
                ("default:")
                    ("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen
                ("case %i:", field.resolvedType.values[keys[j]]);
            gen
                    ("break")
            ("}");
        } else {
            gen
            ("{")
                ("var e=types[%i].verify(%s);", fieldIndex, ref)
                ("if(e)")
                    ("return%j+e", field.name + ".")
            ("}");
        }
    } else {
        switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32": gen
                ("if(!util.isInteger(%s))", ref)
                    ("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                    ("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double": gen
                ("if(typeof %s!==\"number\")", ref)
                    ("return%j", invalid(field, "number"));
                break;
            case "bool": gen
                ("if(typeof %s!==\"boolean\")", ref)
                    ("return%j", invalid(field, "boolean"));
                break;
            case "string": gen
                ("if(!util.isString(%s))", ref)
                    ("return%j", invalid(field, "string"));
                break;
            case "bytes": gen
                ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                    ("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.key32Re.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool": gen
            ("if(!util.key2Re.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */

    var gen = util.codegen(["m"], mtype.name + "$verify")
    ("if(typeof m!==\"object\"||m===null)")
        ("return%j", "object expected");
    var oneofs = mtype.oneofsArray,
        seenFirstField = {};
    if (oneofs.length) gen
    ("var p={}");

    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            ref   = "m" + util.safeProp(field.name);

        if (field.optional) gen
        ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null

        // map fields
        if (field.map) { gen
            ("if(!util.isObject(%s))", ref)
                ("return%j", invalid(field, "object"))
            ("var k=Object.keys(%s)", ref)
            ("for(var i=0;i<k.length;++i){");
                genVerifyKey(gen, field, "k[i]");
                genVerifyValue(gen, field, i, ref + "[k[i]]")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(!Array.isArray(%s))", ref)
                ("return%j", invalid(field, "array"))
            ("for(var i=0;i<%s.length;++i){", ref);
                genVerifyValue(gen, field, i, ref + "[i]")
            ("}");

        // required or present fields
        } else {
            if (field.partOf) {
                var oneofProp = util.safeProp(field.partOf.name);
                if (seenFirstField[field.partOf.name] === 1) gen
            ("if(p%s===1)", oneofProp)
                ("return%j", field.partOf.name + ": multiple values");
                seenFirstField[field.partOf.name] = 1;
                gen
            ("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen
        ("}");
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = __webpack_require__(14);

/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */

/**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ?
                    object["@type"].substr(1) : object["@type"];
                // type_url prefix is optional, but path seperator is required
                return this.create({
                    type_url: "/" + type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

function webpackBootstrapFunc (modules) {
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.l = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }

/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // identity function for calling harmony imports with the correct context
/******/  __webpack_require__.i = function(value) { return value; };

/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };

/******/  // define __esModule on exports
/******/  __webpack_require__.r = function(exports) {
/******/    Object.defineProperty(exports, '__esModule', { value: true });
/******/  };

/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };

/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/";

/******/  // on error function for async loading
/******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE)
  return f.default || f // try to call default if defined to also support babel esmodule exports
}

var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+'
var dependencyRegExp = '\\((\/\\*.*?\\*\/)?\s?.*?(' + moduleNameReqExp + ').*?\\)' // additional chars when output.pathinfo is true

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp (str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

function isNumeric(n) {
  return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}

function getModuleDependencies (sources, module, queueName) {
  var retval = {}
  retval[queueName] = []

  var fnString = module.toString()
  var wrapperSignature = fnString.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/)
  if (!wrapperSignature) return retval
  var webpackRequireName = wrapperSignature[1]

  // main bundle deps
  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g')
  var match
  while ((match = re.exec(fnString))) {
    if (match[3] === 'dll-reference') continue
    retval[queueName].push(match[3])
  }

  // dll deps
  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g')
  while ((match = re.exec(fnString))) {
    if (!sources[match[2]]) {
      retval[queueName].push(match[1])
      sources[match[2]] = __webpack_require__(match[1]).m
    }
    retval[match[2]] = retval[match[2]] || []
    retval[match[2]].push(match[4])
  }

  // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
  var keys = Object.keys(retval);
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < retval[keys[i]].length; j++) {
      if (isNumeric(retval[keys[i]][j])) {
        retval[keys[i]][j] = 1 * retval[keys[i]][j];
      }
    }
  }

  return retval
}

function hasValuesInQueues (queues) {
  var keys = Object.keys(queues)
  return keys.reduce(function (hasValues, key) {
    return hasValues || queues[key].length > 0
  }, false)
}

function getRequiredModules (sources, moduleId) {
  var modulesQueue = {
    main: [moduleId]
  }
  var requiredModules = {
    main: []
  }
  var seenModules = {
    main: {}
  }

  while (hasValuesInQueues(modulesQueue)) {
    var queues = Object.keys(modulesQueue)
    for (var i = 0; i < queues.length; i++) {
      var queueName = queues[i]
      var queue = modulesQueue[queueName]
      var moduleToCheck = queue.pop()
      seenModules[queueName] = seenModules[queueName] || {}
      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
      seenModules[queueName][moduleToCheck] = true
      requiredModules[queueName] = requiredModules[queueName] || []
      requiredModules[queueName].push(moduleToCheck)
      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName)
      var newModulesKeys = Object.keys(newModules)
      for (var j = 0; j < newModulesKeys.length; j++) {
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || []
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]])
      }
    }
  }

  return requiredModules
}

module.exports = function (moduleId, options) {
  options = options || {}
  var sources = {
    main: __webpack_require__.m
  }

  var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId)

  var src = ''

  Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
    var entryModule = 0
    while (requiredModules[module][entryModule]) {
      entryModule++
    }
    requiredModules[module].push(entryModule)
    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'
    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n'
  })

  src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '}))(self);'

  var blob = new window.Blob([src], { type: 'text/javascript' })
  if (options.bare) { return blob }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

  var workerUrl = URL.createObjectURL(blob)
  var worker = new window.Worker(workerUrl)
  worker.objectURL = workerUrl

  return worker
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Motorcortex = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(10);

var _request_async = __webpack_require__(42);

var _message_types = __webpack_require__(8);

var _subscribe = __webpack_require__(12);

var _subscribe_async = __webpack_require__(44);

var _session_manager = __webpack_require__(43);

var _package = __webpack_require__(58);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Motorcortex = exports.Motorcortex = function () {
    function Motorcortex() {
        _classCallCheck(this, Motorcortex);

        this.version = _package.version;
        this.MessageTypes = _message_types.MessageTypes;
        this.Request = _request.Request;
        this.RequestAsync = _request_async.RequestAsync;
        this.Subscribe = _subscribe.Subscribe;
        this.SubscribeAsync = _subscribe_async.SubscribeAsync;
        this.SessionManager = _session_manager.SessionManager;
        this.SessionState = _session_manager.SessionState;
        this.ParameterFlag = {};
        this.ParameterType = {};
        this.Permission = {};
        this.StatusCode = {};
        this.UserGroup = {};
        this.DataType = {};
        this.Unit = {};
    }

    _createClass(Motorcortex, [{
        key: 'getParameterFlag',
        value: function getParameterFlag(name) {
            return this.ParameterFlag[name];
        }
    }, {
        key: 'getParameterType',
        value: function getParameterType(name) {
            return this.ParameterType[name];
        }
    }, {
        key: 'getPermission',
        value: function getPermission(name) {
            return this.Permission[name];
        }
    }, {
        key: 'getStatusCode',
        value: function getStatusCode(name) {
            return this.StatusCode[name];
        }
    }, {
        key: 'getUserGroup',
        value: function getUserGroup(name) {
            return this.UserGroup[name];
        }
    }, {
        key: 'getDataType',
        value: function getDataType(name) {
            return this.DataType[name];
        }
    }, {
        key: 'statusToStr',
        value: function statusToStr(code) {
            if (typeof code === 'undefined') {
                return 'Status code undefined';
            }
            switch (code) {
                case this.StatusCode['OK']:
                    return 'Success';
                case this.StatusCode['FAILED']:
                    return 'Failed (0x' + this.StatusCode['FAILED'].toString(16) + ')';
                case this.StatusCode['FAILED_TO_DECODE']:
                    return 'Failed to decode request (0x' + this.StatusCode['FAILED_TO_DECODE'].toString(16) + ')';
                case this.StatusCode['SUB_LIST_IS_FULL']:
                    return 'Failed to subscribe, subscription list is full (0x' + this.StatusCode['SUB_LIST_IS_FULL'].toString(16) + ')';
                case this.StatusCode['WRONG_PARAMETER_PATH']:
                    return 'Failed to find parameter (0x' + this.StatusCode['WRONG_PARAMETER_PATH'].toString(16) + ')';
                case this.StatusCode['FAILED_TO_SET_REQUESTED_FRQ']:
                    return 'Failed to set requested frequency (0x' + this.StatusCode['FAILED_TO_SET_REQUESTED_FRQ'].toString(16) + ')';
                case this.StatusCode['FAILED_TO_OPEN_FILE']:
                    return 'Failed to open file (0x' + this.StatusCode['FAILED_TO_OPEN_FILE'].toString(16) + ')';
                case this.StatusCode['READ_ONLY_MODE']:
                    return 'Logged in, read-only mode (0x' + this.StatusCode['USER_LOGGED_IN_NO_CONTROL'].toString(16) + ')';
                case this.StatusCode['WRONG_PASSWORD']:
                    return 'Wrong login or password (0x' + this.StatusCode['WRONG_PASSWORD'].toString(16) + ')';
                case this.StatusCode['USER_NOT_LOGGED_IN']:
                    return 'Operation is not permitted, user is not logged in (0x' + this.StatusCode['USER_NOT_LOGGED_IN'].toString(16) + ')';
                case this.StatusCode['PERMISSION_DENIED']:
                    return 'Operation is not permitted, user has no rights (0x' + this.StatusCode['PERMISSION_DENIED'].toString(16) + ')';
                default:
                    // return 'Unknown error. Code: ' + code.toString(16);
                    return code.toString(16);
            }
        }
    }]);

    return Motorcortex;
}();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = codegen;

/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} functionParams Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 */
function codegen(functionParams, functionName) {

    /* istanbul ignore if */
    if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }

    var body = [];

    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     * @throws {Error} If format parameter counts do not match
     */

    function Codegen(formatStringOrScope) {
        // note that explicit array handling below makes this ~50% faster

        // finish the function
        if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
                console.log("codegen: " + source); // eslint-disable-line no-console
            source = "return " + source;
            if (formatStringOrScope) {
                var scopeKeys   = Object.keys(formatStringOrScope),
                    scopeParams = new Array(scopeKeys.length + 1),
                    scopeValues = new Array(scopeKeys.length),
                    scopeOffset = 0;
                while (scopeOffset < scopeKeys.length) {
                    scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                    scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                }
                scopeParams[scopeOffset] = source;
                return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }
            return Function(source)(); // eslint-disable-line no-new-func
        }

        // otherwise append to body
        var formatParams = new Array(arguments.length - 1),
            formatOffset = 0;
        while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
                case "d": case "f": return String(Number(value));
                case "i": return String(Math.floor(value));
                case "j": return JSON.stringify(value);
                case "s": return String(value);
            }
            return "%";
        });
        if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
    }

    function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    }

    Codegen.toString = toString;
    return Codegen;
}

/**
 * Begins generating a function.
 * @memberof util
 * @function codegen
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @variation 2
 */

/**
 * When set to `true`, codegen will log generated code to console. Useful for debugging.
 * @name util.codegen.verbose
 * @type {boolean}
 */
codegen.verbose = false;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = fetch;

var asPromise = __webpack_require__(21),
    inquire   = __webpack_require__(22);

var fs = inquire("fs");

/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Options as used by {@link util.fetch}.
 * @typedef FetchOptions
 * @type {Object}
 * @property {boolean} [binary=false] Whether expecting a binary response
 * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
 */

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} filename File path or url
 * @param {FetchOptions} options Fetch options
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */
function fetch(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (!options)
        options = {};

    if (!callback)
        return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

    // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
    if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch.xhr(filename, options, callback)
                : err
                ? callback(err)
                : callback(null, options.binary ? contents : contents.toString("utf8"));
        });

    // use the XHR version otherwise.
    return fetch.xhr(filename, options, callback);
}

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchOptions} [options] Fetch options
 * @returns {Promise<string|Uint8Array>} Promise
 * @variation 3
 */

/**/
fetch.xhr = function fetch_xhr(filename, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {

        if (xhr.readyState !== 4)
            return undefined;

        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));

        // if binary data is expected, make sure that some sort of array is returned, even if
        // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
        if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
                buffer = [];
                for (var i = 0; i < xhr.responseText.length; ++i)
                    buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
    };

    if (options.binary) {
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
        if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
    }

    xhr.open("GET", filename);
    xhr.send();
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts    = path.split("/"),
        absolute = isAbsolute(path),
        prefix   = "";
    if (absolute)
        prefix = parts.shift() + "/";
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestAsync = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(10);

var _utils = __webpack_require__(3);

var _webworkifyWebpack = __webpack_require__(32);

var _webworkifyWebpack2 = _interopRequireDefault(_webworkifyWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Request/Reply communication is used to send commands to a motorcortex server.
 */

var RequestAsync = function () {

    /**
     * Creates request object
     * @constructor
     * @param {MessageTypes} protobuf_types Reference to an instance of the MessageTypes class.
     * @example
     * // Loading messages
     * let motorcortex_types = new motorcortex.MessageTypes();
     * let type_load_done = motorcortex_types.load([{
     *      'proto': 'motorcortex.proto',
     *      'hash': 'motorcortex_hash.json'}]);
     * // Creating Request connection
     * let req = new motorcortex.Request(motorcortex_types);
     * let req_conn_done = req.connect(`ws://localhost:5558`);
     */
    function RequestAsync(protobuf_types) {
        _classCallCheck(this, RequestAsync);

        this.worker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(45));
        this.worker_queue = {};
        this.worker_task_id = 0;
        this.protobuf_types = protobuf_types;
        this.connection_state = _utils.ConnectionState.CLOSED;

        var _this = this;
        this.worker.addEventListener('message', function (e) {
            var data = e.data;
            var id = data.id;
            var reply = data.reply;

            // if id >= this is a reply to the request
            if (id >= 0) {
                if (reply.type == 'success') {
                    _this.worker_queue[id].resolve(reply.result);
                } else {
                    _this.worker_queue[id].reject(reply.result);
                }
                delete _this.worker_queue[id];
            }
            // if id < 0 this not a reply, but event from the worker
            else {
                    if (reply.type == 'connection_closed') {
                        _this.connection_state = _utils.ConnectionState.CLOSED;
                        _this.connectionClosed();
                    }
                }
        }, false);
    }

    /**
     * Returns loaded message types.
     */


    _createClass(RequestAsync, [{
        key: 'getMessageTypes',
        value: function getMessageTypes() {
            return this.protobuf_types;
        }
    }, {
        key: 'post',
        value: function post(arg) {
            var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var clb = new _utils.Deferred();
            this.worker_queue[this.worker_task_id] = clb;
            this.worker.postMessage({ id: this.worker_task_id++, request: arg }, port);
            return clb.promise;
        }
    }, {
        key: 'registerSubscriber',
        value: function registerSubscriber(port) {
            return this.post({ type: 'registerSubscribe' }, [port]);
        }
    }, {
        key: 'loadedFiles',
        value: function loadedFiles() {
            return this.protobuf_types.loadedFiles();
        }
    }, {
        key: 'loadProto',
        value: function loadProto(protobuf_files) {
            var index = document.URL.lastIndexOf('/');
            var url = document.URL.substring(0, index + 1);

            var full_address = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = protobuf_files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var proto_pair = _step.value;

                    full_address.push({
                        proto: url + proto_pair.proto,
                        hash: url + proto_pair.hash
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this.post({ type: 'loadProto', files: full_address });
        }
    }, {
        key: 'connect',
        value: function connect(url, timeout_ms, max_request_queue_size) {
            this.connection_state = _utils.ConnectionState.CONNECTING;
            var loaded_files = this.protobuf_types.loadedFiles();
            if (!loaded_files) {
                throw "No files are loaded, call load first.";
            }
            var types_loaded = this.loadProto(loaded_files);
            var connected = this.post({
                type: 'connect',
                url: url,
                timeout_ms: timeout_ms,
                max_request_queue_size: max_request_queue_size
            });
            var ret = new _utils.Deferred();
            var _this = this;
            Promise.all([types_loaded, connected]).then(function (e) {
                _this.connection_state = _utils.ConnectionState.OPEN;
                ret.resolve(e);
            }).catch(function (e) {
                _this.connection_state = _utils.ConnectionState.CLOSED;
                ret.reject(e);
            });
            return ret.promise;
        }

        /**
         * Actual Request/reply connection state.
         * @return {number} Returns a connection state.
         * @example
         * CONNECTING   0    The connection is not yet open
         * OPEN         1    The connection is open and ready to communicate
         * CLOSING      2    The connection is in the process of closing
         * CLOSED       3    The connection is closed or could not be opened
         */

    }, {
        key: 'connectionState',
        value: function connectionState() {
            return this.connection_state;
        }
    }, {
        key: 'connectionClosed',
        value: function connectionClosed() {}

        /**
         * Closes connection to the server
         */

    }, {
        key: 'close',
        value: function close() {
            if (this.connectionState() !== _utils.ConnectionState.CLOSING && this.connectionState() !== _utils.ConnectionState.CLOSED) {
                this.connection_state = _utils.ConnectionState.CLOSING;
                this.post({ type: 'close' });
            }
        }

        ///////////
        /**
         * Sends a login request to the server
         * @param {string} login User login.
         * @param {string} password User password.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves if login is successful and fails otherwise.
         * Returned message has a status code, which indicates a status of the login.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let login_reply = req.login('operator', 'god123');
         * login_reply.then(function (reply) {
         *      console.log('Logged-in successful: ' + motorcortex.statusToStr(reply.status));
         * }).catch( function(reply) {
         *      console.log('Failed to login: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'login',
        value: function login(_login, password) {
            return this.post({ type: 'login', login: _login, password: password });
        }

        /**
         * Sends logout request to the server
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves if login is successful and fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let logout_reply = req.logout();
         * logout_reply.then(function (reply) {
         *      console.log('Logged-out successful: ' + motorcortex.statusToStr(reply.status));
         * }).catch( function(reply) {
         *      console.log('Failed to logout: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'logout',
        value: function logout() {
            return this.post({ type: 'logout' });
        }

        /**
         *
         *
         *
         *
         *
         */

    }, {
        key: 'getSessionTokenMsg',
        value: function getSessionTokenMsg() {
            return this.post({ type: 'getSessionTokenMsg' });
        }

        /**
         *
         *
         *
         *
         *
         */

    }, {
        key: 'restoreSessionMsg',
        value: function restoreSessionMsg(token) {
            return this.post({ type: 'restoreSessionMsg', token: token });
        }

        /**
         * Requests a parameter tree from the cache or from the server
         * @param {integer} Timeout in milliseconds.
         * @return {Promise<ParameterTreeMsg>} Returns a Promise, which resolves when parameter tree is received or fails
         * otherwise. ParameterTreeMsg message has a status files to check the status of the operation.
         * @see motorcortex.proto, ParameterTreeMsg, StatusCode
         * @example
         * let param_tree_reply = req.getParameterTree();
         * param_tree_reply.then(function (param_tree) {
         *      console.log('Got parameter tree msg: ' + JSON.stringify(param_tree));
         * }).catch( function(param_tree) {
         *      console.log('Failed to get parameter tree: ' + motorcortex.statusToStr(param_tree.status));
         * });
         */

    }, {
        key: 'getParameterTree',
        value: function getParameterTree(timeout_msec) {
            var reply = this.post({ type: 'getParameterTree', timeout_msec: timeout_msec });
            return new Promise(function (resolve, reject) {
                reply.then(function (tree) {
                    var param_tree = new _request.ParameterTree();
                    param_tree.__initTree(tree);
                    resolve(param_tree);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Requests a parameter tree hash from the server
         * @return {Promise<ParameterTreeHashMsg>} Returns a Promise, which resolves when tree hash message is received or
         * fails otherwise.
         * @see motorcortex.proto, ParameterTreeHashMsg, StatusCode
         * @example
         * let tree_hash_reply = req.getParameterTreeHash();
         * tree_hash_reply.then(function (tree_hash) {
         *      console.log('Got parameter tree hash: ' + tree_hash.hash);
         * }).catch( function(tree_hash) {
         *      console.log('Failed to get tree hash: ' + motorcortex.statusToStr(tree_hash.status));
         * });
         *
         */

    }, {
        key: 'getParameterTreeHash',
        value: function getParameterTreeHash() {
            return this.post({ type: 'getParameterTreeHash' });
        }

        /**
         * Requests a parameter with full information and value from the server
         * @param {string} path Parameter path in the tree.
         * @return {Promise<ParameterMsg>} Returns a Promise, which resolves when parameter message is successfully obtained,
         * fails otherwise.
         * @see motorcortex.proto, ParameterMsg, StatusCode
         * @example
         * let param_reply = req.getParameter('root/Control/actualActuatorPositions');
         * param_reply.then(function (param) {
         *      console.log('Got parameter: ' + JSON.stringify(param));
         * }).catch( function(param) {
         *      console.log('Failed to get parameter: ' + motorcortex.statusToStr(param.status));
         * });
         */

    }, {
        key: 'getParameter',
        value: function getParameter(path) {
            return this.post({ type: 'getParameter', path: path });
        }

        /**
         * Sets new value to a parameter with given path.
         * @param {string} path Parameter path in the tree.
         * @param {any} value New parameter value.
         * @param {{offset, length}=} options Various options to parametrize Set operation. For example 'offset' and
         * 'length' could be used to set an element offset and number of the elements to update in the destination array.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter value is updated or fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * // updates a value of a simple parameter
         * let reply_handle = req.setParameter('root/Motorcontroller/actualmode', 2);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         *
         * // updates an array
         * req.setParameter('root/Control/dummyDoubleArray6', [1.1,1.2,1.3,1.4,1.5,1.6]);
         * // updates single element of array with the offset 2 (index 3)
         * req.setParameter('root/Control/dummyDoubleArray6', 1.0, {offset: 2});
         * // updates 2 elements of the arrays with the offset 4
         * req.setParameter('root/Control/dummyDoubleArray6', [10.0, 20.0], {offset: 4, length: 2});
         */

    }, {
        key: 'setParameter',
        value: function setParameter(path, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return this.post({ type: 'setParameter', path: path, value: value, options: options });
        }

        /**
         * Overwrites actual value of the parameter and depending on the flag forces this value to stay active.
         * This method of setting values is useful during debug and installation process, it is not recommended to use
         * this method during normal operation.
         * @param {string} path Parameter path in the tree.
         * @param {any} value New parameter value.
         * @param {bool=} force_activate Forces new value to stay active. By default is set to 'false'.
         * @param {{offset, length}=} options Various options to parametrize Set operation. For example 'offset' and
         * 'length' could be used to set an element offset and number of the elements to update in the destination array.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter value is updated or fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * // overwrite and force to stay active a value of a simple parameter
         * let reply_handle = req.overwriteParameter('root/Motorcontroller/actualmode', 2, true);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         *
         * // overwrite and force to stay active an array
         * req.overwriteParameter('root/Control/dummyDoubleArray6', [1.1,1.2,1.3,1.4,1.5,1.6], true);
         * // overwrite and release force of a single element of the array with an offset 2 (index 3)
         * req.overwriteParameter('root/Control/dummyDoubleArray6', 1.0, {offset: 2});
         * // overwrite and force to stay active 2 elements of the arrays with an offset 4
         * req.overwriteParameter('root/Control/dummyDoubleArray6', [10.0, 20.0], {offset: 4, length: 2});
         */

    }, {
        key: 'overwriteParameter',
        value: function overwriteParameter(path, value) {
            var force_activate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return this.post({
                type: 'overwriteParameter', path: path, value: value,
                force_activate: force_activate, options: options
            });
        }

        /**
         * Deactivate overwrite operation of the parameter.
         * @param {string} path Path to a parameter in the tree.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameter overwrite is deactivated or fails
         * otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = releaseParameter('root/Motorcontroller/actualmode');
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to release overwrite of the parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'releaseParameter',
        value: function releaseParameter(path) {
            return this.post({ type: 'releaseParameter', path: path });
        }

        /**
         * Sets new values to a parameter list.
         * @param {Array<{path,value,options}>} param_list A list of the parameters to update values.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when parameters from the list are updated,
         * otherwise fails.
         * @see setParameter, motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = req.setParameterList([{path: 'root/Motorcontroller/actualmode', value: 2},
         *      {path: 'root/Control/dummyDoubleArray6', value: [1.1,1.2,1.3,1.4,1.5,1.6]},
         *      {path: 'root/Control/dummyDoubleArray6', value: [10.0, 20.0], options:  {offset: 4, length: 2}}]);
         * reply_handle.catch( function(reply) {
         *      console.log('Failed to set list of parameter: ' + motorcortex.statusToStr(reply.status));
         * });
         */

    }, {
        key: 'setParameterList',
        value: function setParameterList(param_list) {
            return this.post({ type: 'setParameterList', param_list: param_list });
        }

        /**
         * Get info and values of requested parameters.
         * @param {Array<string>} path_list List of parameter paths.
         * @param {number} timeout_ms Reply timeout in milliseconds.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when list of the parameter values is received,
         * otherwise fails.
         * @see getParameter, motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply_handle = req.getParameterList(['root/Motorcontroller/actualmode, 'root/Control/dummyDoubleArray6']);
         * reply_handle.then( function(param_list) {
         *      console.log('Got parameter list: ' + JSON.stringify(param_list));
         * }).catch( function(param_list) {
         *      console.log('Failed to get parameter list: ' + motorcortex.statusToStr(param_list.status));
         * });
         */

    }, {
        key: 'getParameterList',
        value: function getParameterList(path_list, timeout_ms) {
            return this.post({ type: 'getParameterList', path_list: path_list, timeout_ms: timeout_ms });
        }
    }, {
        key: 'createGroup',
        value: function createGroup(path_list, group_alias, frq_divider) {
            return this.post({
                type: 'createGroup', path_list: path_list, group_alias: group_alias,
                frq_divider: frq_divider
            });
        }
    }, {
        key: 'removeGroup',
        value: function removeGroup(group_alias) {
            return this.post({ type: 'removeGroup', group_alias: group_alias });
        }

        /**
         * Request a server to save a parameter tree in the file.
         * @param {string} file_name A file name where to save actual state of the parameter tree
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when save operation is completed,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply = req.save('controls.xml');
         * reply.catch( function(save) {
         *      console.log('Failed to save parameters:' + motorcortex.statusToStr(save.status));
         * });
         */

    }, {
        key: 'save',
        value: function save(file_name) {
            return this.post({ type: 'save', file_name: file_name });
        }

        /**
         * Request a server to load value from the file to the parameter tree.
         * @param {string} file_name A file name from which to load values to the parameter tree.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when load operation is complete,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let reply = req.load('controls.xml');
         * reply.catch( function(load) {
         *      console.log('Failed to load parameters:' + motorcortex.statusToStr(load.status));
         * });
         */

    }, {
        key: 'load',
        value: function load(file_name) {
            return this.post({ type: 'load', file_name: file_name });
        }
    }]);

    return RequestAsync;
}();

exports.RequestAsync = RequestAsync;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionManager = exports.SessionState = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionState = exports.SessionState = {
    CONNECTING: 0,
    CONNECTION_OK: 1,
    CONNECTION_LOST: 2,
    CONNECTION_FAILED: 3,

    DISCONNECTING: 4,
    DISCONNECTED: 5,

    getInfo: function getInfo(state) {
        var state_info = '';
        switch (state) {
            case SessionState.CONNECTING:
                state_info = 'connecting';
                break;

            case SessionState.CONNECTION_OK:
                state_info = 'connected';
                break;

            case SessionState.CONNECTION_LOST:
                state_info = 'connection lost';
                break;

            case SessionState.CONNECTION_FAILED:
                state_info = 'failed to connect';
                break;

            case SessionState.DISCONNECTING:
                state_info = 'disconnecting';
                break;

            case SessionState.DISCONNECTED:
                state_info = 'disconnected';
                break;

            default:
                state_info = 'unknown state';
                break;
        }

        return state_info;
    }
};

var ConnectionData = function () {
    function ConnectionData(host, req_port, sub_port, request_timeout_ms, tree_timeout_ms, queue_length) {
        _classCallCheck(this, ConnectionData);

        this.host = host;
        this.uri = 'ws://' + host;
        this.req_port = req_port;
        this.sub_port = sub_port;
        this.request_timeout_ms = request_timeout_ms ? request_timeout_ms : 1000;
        this.tree_timeout_ms = tree_timeout_ms ? tree_timeout_ms : 15000;
        this.max_request_queue_length = queue_length;
    }

    _createClass(ConnectionData, [{
        key: 'getRequestUri',
        value: function getRequestUri() {
            return 'ws://' + this.host + ':' + this.req_port;
        }
    }, {
        key: 'getSubscribeUri',
        value: function getSubscribeUri() {
            return 'ws://' + this.host + ':' + this.sub_port;
        }
    }, {
        key: 'getRequestTimeoutMs',
        value: function getRequestTimeoutMs() {
            return this.request_timeout_ms;
        }
    }, {
        key: 'getTreeTimeoutMs',
        value: function getTreeTimeoutMs() {
            return this.tree_timeout_ms;
        }
    }, {
        key: 'getQueueLength',
        value: function getQueueLength() {
            return this.max_request_queue_length;
        }
    }]);

    return ConnectionData;
}();

var SessionManager = exports.SessionManager = function () {
    function SessionManager(request, subscribe) {
        _classCallCheck(this, SessionManager);

        this.request = request;
        this.subscribe = subscribe;
        this.connection_data = null;
        this.token = null;
        this.state = SessionState.DISCONNECTED;
        this.observers = [];
        this.check_connection_interval_ms = 1000;
        this.check_token_interval_ms = 60000;
        this.check_connection_timer = null;
        this.update_token_timer = null;
    }

    _createClass(SessionManager, [{
        key: 'close',
        value: function close() {
            this.clearTimers();
            return this.closing(false);
        }
    }, {
        key: 'closing',
        value: function closing(reconnection) {
            var _this2 = this;

            var req_closed = new _utils.Deferred();
            var sub_closed = new _utils.Deferred();
            var req = this.request;
            var sub = this.subscribe;

            if (req.connectionState() === _utils.ConnectionState.CLOSED) {
                req_closed.resolve();
            } else if (req.connectionState() !== _utils.ConnectionState.CLOSING) {
                this.request.close();
                if (!reconnection) {
                    this.stateChange(SessionState.DISCONNECTING);
                }
            }

            if (sub.connectionState() === _utils.ConnectionState.CLOSED) {
                sub_closed.resolve();
            } else if (sub.connectionState() !== _utils.ConnectionState.CLOSING) {
                this.subscribe.close();
                if (!reconnection) {
                    this.stateChange(SessionState.DISCONNECTING);
                }
            }

            var connection_closed = new _utils.Deferred();
            Promise.all([req_closed, sub_closed]).then(function (msg) {
                if (!reconnection) {
                    _this2.stateChange(SessionState.DISCONNECTED);
                }
                connection_closed.resolve(msg[0]);
            }).catch(function (e) {
                connection_closed.reject(e);
            });
            return connection_closed.promise;
        }
    }, {
        key: 'updateToken',
        value: function updateToken() {
            var _this3 = this;

            this.request.getSessionTokenMsg().then(function (msg) {
                if (_this3.getState() == SessionState.CONNECTION_OK) {
                    _this3.token = msg.token;
                }
            }).catch(function (e) {
                if (_this3.getState() == SessionState.CONNECTION_OK) {
                    console.warn('Server does not support session token.');
                    _this3.token = null;
                }
            });
        }
    }, {
        key: 'clearTimers',
        value: function clearTimers() {
            clearInterval(this.check_connection_timer);
            clearInterval(this.update_token_timer);
        }
    }, {
        key: 'initTimers',
        value: function initTimers() {
            this.clearTimers();
            this.check_connection_timer = setInterval(this.checkSessionState.bind(this), this.check_connection_interval_ms);

            this.update_token_timer = setInterval(function () {
                var _this4 = this;

                this.request.getSessionTokenMsg().then(function (msg) {
                    _this4.token = msg.token;
                }).catch(function (e) {
                    // do nothing
                });
            }, this.check_token_interval_ms);
        }

        // restores active session

    }, {
        key: 'restore',
        value: function restore() {
            var _this5 = this;

            var session_ready = new _utils.Deferred();
            var _this = this;

            if (this.token) {
                this.closing(true).then(function (msg) {
                    _this5.stateChange(SessionState.CONNECTING);
                    var req_ready = new _utils.Deferred();
                    var req_handle = _this5.request.connect(_this5.connection_data.getRequestUri(), _this5.connection_data.getRequestTimeoutMs(), _this5.connection_data.getQueueLength());
                    var sub_handle = _this5.subscribe.connect(_this5.connection_data.getSubscribeUri());

                    // establishing request connection, opening new session, loading parameter tree;
                    req_handle.then(function (msg) {
                        return _this.request.restoreSessionMsg(_this5.token);
                    }).then(function (msg) {
                        return _this5.request.getParameterTree(_this.connection_data.getTreeTimeoutMs());
                    }).then(function (msg) {
                        // _this.token = msg.token;
                        req_ready.resolve(msg);
                    }).catch(function (e) {
                        req_ready.reject(e);
                    });

                    Promise.all([req_ready.promise, sub_handle]).then(function (msg) {
                        _this.updateToken();
                        _this.initTimers();
                        _this.stateChange(SessionState.CONNECTION_OK);
                        session_ready.resolve(msg);
                    }).catch(function (e) {
                        _this.stateChange(SessionState.CONNECTION_LOST);
                        _this.request.close();
                        _this.subscribe.close();
                        session_ready.reject(e);
                    });
                });
            } else {
                this.stateChange(SessionState.CONNECTION_FAILED);
                session_ready.reject('Token is empty');
            }

            return session_ready.promise;
        }
    }, {
        key: 'checkSessionState',
        value: function checkSessionState() {
            var _this6 = this;

            switch (this.state) {
                case SessionState.CONNECTION_FAILED:
                    // if connection failed, stop trying to reconnect
                    this.clearTimers();
                    break;
                case SessionState.CONNECTION_LOST:
                    // if connection is lost try to reconnect
                    this.restore().then(function (msg) {}).catch(function (e) {});
                    break;
                case SessionState.CONNECTION_OK:
                    this.request.getParameterTreeHash().then(function (msg) {
                        // if connection was lost but the client was able to reconnect
                        if (_this6.getState() == SessionState.CONNECTION_LOST) {
                            _this6.stateChange(SessionState.CONNECTION_OK);
                        }
                    }).catch(function (e) {
                        // if there are no errors, switch to connection lost, otherwise keep the error
                        if (!_this6.hasError() && _this6.isConnecting()) {
                            _this6.stateChange(SessionState.CONNECTION_LOST);
                        }
                    });
                default:
                    break;
            }
        }

        // opens new session

    }, {
        key: 'open',
        value: function open(connection_data, login_data, options) {
            var _this7 = this;

            this.stateChange(SessionState.CONNECTING);
            if (connection_data !== null && (typeof connection_data === 'undefined' ? 'undefined' : _typeof(connection_data)) === 'object') {
                this.connection_data = new ConnectionData(connection_data.host, connection_data.request_port, connection_data.subscribe_port, connection_data.request_timeout_ms, connection_data.tree_timeout_ms, connection_data.queue_length);
            }

            var req_ready = new _utils.Deferred();
            var req_handle = this.request.connect(this.connection_data.getRequestUri(), this.connection_data.getRequestTimeoutMs(), this.connection_data.getQueueLength());
            var sub_handle = this.subscribe.connect(this.connection_data.getSubscribeUri());

            // establishing request connection, opening new session, loading parameter tree;
            var _this = this;
            req_handle.then(function (msg) {
                return _this.request.login(login_data.login, login_data.password);
            }).then(function (msg) {
                return _this7.request.getParameterTree(_this.connection_data.getTreeTimeoutMs());
            }).then(function (msg) {
                req_ready.resolve(msg);
            }).catch(function (e) {
                req_ready.reject(e);
            });

            var session_ready = new _utils.Deferred();
            Promise.all([req_ready.promise, sub_handle]).then(function (msg) {
                _this.updateToken();
                _this.initTimers();
                _this.stateChange(SessionState.CONNECTION_OK);
                session_ready.resolve(msg[0]);
            }).catch(function (e) {
                _this.stateChange(SessionState.CONNECTION_FAILED);
                _this.request.close();
                _this.subscribe.close();
                session_ready.reject(e);
            });

            return session_ready.promise;
        }
    }, {
        key: 'stateChange',
        value: function stateChange(state) {
            if (state !== this.state) {
                this.state = state;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var observer = _step.value;

                        observer({ state: state });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: 'ready',
        value: function ready() {
            return this.state == SessionState.CONNECTION_OK;
        }
    }, {
        key: 'hasError',
        value: function hasError() {
            return this.state == SessionState.CONNECTION_LOST || this.state == SessionState.CONNECTION_FAILED;
        }
    }, {
        key: 'isConnecting',
        value: function isConnecting() {
            return this.state == SessionState.CONNECTION_OK || this.state == SessionState.CONNECTING;
        }
    }, {
        key: 'notify',
        value: function notify(observer) {
            this.observers = [].concat(observer);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }]);

    return SessionManager;
}();

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubscribeAsync = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _subscribe = __webpack_require__(12);

var _utils = __webpack_require__(3);

var _webworkifyWebpack = __webpack_require__(32);

var _webworkifyWebpack2 = _interopRequireDefault(_webworkifyWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscribeAsync = exports.SubscribeAsync = function () {
    /**
     * Creates subscribe
     * @constructor
     * @param {Request} request A reference to the request object.
     */
    function SubscribeAsync(request) {
        _classCallCheck(this, SubscribeAsync);

        this.worker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(46));
        this.worker_queue = {};
        this.worker_task_id = 0;
        this.request = request;
        this.connection_state = _utils.ConnectionState.CLOSED;
        this.subscriptions = {};

        var _this = this;
        this.worker.addEventListener('message', function (e) {
            var data = e.data;
            var id = data.id;
            var reply = data.reply;

            // if id >= this is a reply to the request
            if (id == -2) {
                var sub = _this.subscriptions[reply.id];
                if (sub) {
                    var observer = sub._getObserver();
                    if (observer) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = reply.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var item = _step.value;

                                observer(item);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
            } else if (id == -1) {
                // connection closed
                if (reply.type == 'connection_closed') {
                    _this.connection_state = _utils.ConnectionState.CLOSED;
                    _this.connectionClosed();
                }
            } else {
                if (reply.type == 'success') {
                    _this.worker_queue[id].resolve(reply.result);
                } else {
                    _this.worker_queue[id].reject(reply.result);
                }
                delete _this.worker_queue[id];
            }
        }, false);

        var channel = new MessageChannel();
        this.post({ type: 'registerRequest' }, [channel.port1]);
        this.request.registerSubscriber(channel.port2).catch(function (e) {
            console.error('Failed to register subscriber');
        });
    }

    _createClass(SubscribeAsync, [{
        key: 'post',
        value: function post(arg) {
            var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var clb = new _utils.Deferred();
            this.worker_queue[this.worker_task_id] = clb;
            this.worker.postMessage({ id: this.worker_task_id++, request: arg }, port);
            return clb.promise;
        }

        /**
         * Actual Publish/Subscribe connection state.
         * @return {number} Returns a connection state.
         * @example
         * CONNECTING   0    The connection is not yet open
         * OPEN         1    The connection is open and ready to communicate
         * CLOSING      2    The connection is in the process of closing
         * CLOSED       3    The connection is closed or could not be opened
         */

    }, {
        key: 'connectionState',
        value: function connectionState() {
            return this.connection_state;
        }
    }, {
        key: 'loadProto',
        value: function loadProto(protobuf_files) {
            var index = document.URL.lastIndexOf('/');
            var url = document.URL.substring(0, index + 1);

            var full_address = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = protobuf_files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var proto_pair = _step2.value;

                    full_address.push({
                        proto: url + proto_pair.proto,
                        hash: url + proto_pair.hash
                    });
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this.post({ type: 'loadProto', files: full_address });
        }

        /**
         * Opens a subscribe connection.
         * @param {string} url Motorcortex server URL.
         * @return {Promise<string>} A promise, which completes when connection is ready.
         * If connection is failed, short error description is passed to the cathe method.
         * @example
         * let sub = new motorcortex.Subscribe(req);
         * let sub_conn_done = sub.connect(`ws://${server}:5557`);
         * sub_conn_done.then(function () {
         *      console.log('Subscribe connection is established');
         * })
         * .catch(function (reason) {
         *      console.error('Failed to establish connection: ' + reason);
         * });
         */

    }, {
        key: 'connect',
        value: function connect(url) {
            this.connection_state = _utils.ConnectionState.CONNECTING;
            var loaded_files = this.request.loadedFiles();
            if (!loaded_files) {
                throw "No files are loaded, call load first.";
            }
            var types_loaded = this.loadProto(loaded_files);
            var connected = this.post({
                type: 'connect',
                url: url
            });
            var ret = new _utils.Deferred();
            var _this = this;
            Promise.all([types_loaded, connected]).then(function (e) {
                _this.connection_state = _utils.ConnectionState.OPEN;
                ret.resolve(e);
            }).catch(function (e) {
                _this.connection_state = _utils.ConnectionState.CLOSED;
                ret.reject(e);
            });

            return ret.promise;
        }
    }, {
        key: 'connectionClosed',
        value: function connectionClosed() {}

        /**
         * Closes connection to the server
         */

    }, {
        key: 'close',
        value: function close() {
            if (this.connectionState() !== _utils.ConnectionState.CLOSING && this.connectionState() !== _utils.ConnectionState.CLOSED) {
                this.connection_state = _utils.ConnectionState.CLOSING;
                this.post({ type: 'close' });
            }
        }

        /**
         * Create a subscription group for a list of the parameters.
         * @param {Array<string>} path_list List of the parameters to subscribe to.
         * @param {string} group_alias Name of the group.
         * @param {number=} frq_divider Frequency divider is a downscaling factor of the group publish rate.
         * Default value is 1, every cycle of the publisher.
         * @return {Subscription<GroupStatusMsg>} Returns a subscription handle, which acts as a JavaScript Promise,
         * it is resolved when subscription is ready or failed. After the subscription
         * is ready the handle is used to retrieve latest data.
         * @see Subscription, motorcortex.proto, GroupStatusMsg, StatusCode
         * @example
         * let data_sub = sub.subscribe(["root/Control/jointReferenceGenerator/enable",
         *      "root/Control/jointReferenceGenerator/signalGenerator01/amplitude",
         *      "root/Control/jointReferenceGenerator/signalGenerator02/amplitude"], "group1");
         *
         * data_sub.then(function (subscription) {
         *      console.log('Subscription is ready');
         *      // when subscription is ready, setting an update callback
         *      data_sub.notify(function (parameters) {
         *          console.log('Received group update');
         *          let layout = data_sub.layout();
         *          for(let i = 0; i < layout.length; i++) {
         *              console.log("Parameter: " + layout[i] + " value: " + parameters[i].toString());
         *          }
         *      }
         * }).catch(function (subscription) {
         *      console.log('Failed to subscribe: ' + motorcortex.statusToStr(group.status));
         * });
         */

    }, {
        key: 'subscribe',
        value: function subscribe(path_list, group_alias, frq_divider) {
            var subscription = new _subscribe.Subscription(group_alias, this.request.getMessageTypes());
            var _this = this;
            this.post({
                type: 'subscribe', path_list: path_list,
                group_alias: group_alias, frq_divider: frq_divider
            }).then(function (msg) {
                // add subscription to the active sub. list and call subscription complete routine
                _this.subscriptions[group_alias] = subscription;
                subscription._complete(msg, path_list);
            }).catch(function (e) {
                // if subscription failed, call failed routine
                subscription._failed(e);
            });

            return subscription;
        }

        /**
         * Unsubscribes from the group.
         * @param {string} group_alias Name of the group to unsubscribe from.
         * @return {Promise<StatusMsg>} Returns a Promise, which resolves when the unsubscribe operation is complete,
         * fails otherwise.
         * @see motorcortex.proto, StatusMsg, StatusCode
         * @example
         * let unsub_handle = req.unsubscribe('myGroup1');
         * unsub_handle.catch( function(unsubscribe) {
         *      console.log('Failed to remove group: ' + motorcortex.statusToStr(unsubscribe.status));
         * });
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(group_alias) {
            if (this.subscriptions[group_alias]) {
                delete this.subscriptions[group_alias];
            }
            return this.post({ type: 'unsubscribe', group_alias: group_alias });
        }
    }]);

    return SubscribeAsync;
}();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function () {

    function processRequest(e) {
        var data = e.data;
        var id = data.id;
        var request = data.request;
        var reply = null;

        switch (request.type) {
            case 'registerSubscribe':
                request_channel = e.ports[0];
                request_channel.onmessage = onSubscribeMessage;
                reply = new Promise(function (resolve, reject) {
                    resolve();
                });
                break;
            case 'loadProto':
                if (!motorcortex_types.loadedFiles()) {
                    reply = motorcortex_types.load(request.files);
                } else {
                    reply = new Promise(function (resolve, reject) {
                        resolve();
                    });
                }
                break;
            case 'connect':
                reply = req.connect(request.url, request.timeout_ms, request.max_request_queue_size);
                break;
            case 'close':
                reply = new Promise(function (resolve, reject) {
                    reply = req.close();
                    resolve();
                });
                break;
            case 'getSessionTokenMsg':
                reply = req.getSessionTokenMsg();
                break;
            case 'restoreSessionMsg':
                reply = req.restoreSessionMsg(request.token);
                break;
            case 'login':
                reply = req.login(request.login, request.password);
                break;
            case 'logout':
                reply = req.logout();
                break;
            case 'getParameterTree':
                reply = new Promise(function (resolve, reject) {
                    req.getParameterTree(request.timeout_msec).then(function (e) {
                        resolve(e.getTree());
                    }).catch(function (e) {
                        reject(e);
                    });
                });
                break;
            case 'getParameterTreeHash':
                reply = req.getParameterTreeHash();
                break;
            case 'getParameterList':
                reply = req.getParameterList(request.path_list, request.timeout_ms);
                break;
            case 'getParameter':
                reply = req.getParameter(request.path);
                break;
            case 'setParameter':
                reply = req.setParameter(request.path, request.value, request.options);
                break;
            case 'overwriteParameter':
                reply = req.overwriteParameter(request.path, request.value, request.force_activate, request.options);
                break;
            case 'releaseParameter':
                reply = req.releaseParameter(request.path);
                break;
            case 'setParameterList':
                reply = req.setParameterList(request.param_list);
                break;
            case 'getParameterList':
                reply = req.getParameterList(request.path_list, request.timeout_ms);
                break;
            case 'createGroup':
                reply = req.createGroup(request.path_list, request.group_alias, request.frq_divider);
                break;
            case 'removeGroup':
                reply = req.removeGroup(request.group_alias);
                break;
            case 'save':
                reply = req.save(request.file_name);
                break;
            case 'load':
                reply = req.load(request.file_name);
                break;
            default:
                reply = new Promise(function (resolve, reject) {
                    reject('Unknown request type:' + request.type);
                });
        }
        return [reply, id];
    }

    function onMessage(e) {
        var _processRequest = processRequest(e),
            _processRequest2 = _slicedToArray(_processRequest, 2),
            reply = _processRequest2[0],
            id = _processRequest2[1];

        reply.then(function (e) {
            postMessage({ id: id, reply: { type: 'success', result: e } });
        }).catch(function (e) {
            postMessage({ id: id, reply: { type: 'error', result: e } });
        });
    }

    function onSubscribeMessage(e) {
        var _processRequest3 = processRequest(e),
            _processRequest4 = _slicedToArray(_processRequest3, 2),
            reply = _processRequest4[0],
            id = _processRequest4[1];

        reply.then(function (e) {
            request_channel.postMessage({ id: id, reply: { type: 'success', result: e } });
        }).catch(function (e) {
            request_channel.postMessage({ id: id, reply: { type: 'error', result: e } });
        });
    }

    // Respond to message from parent thread
    addEventListener('message', onMessage);
};

var _message_types = __webpack_require__(8);

var _request = __webpack_require__(10);

var _utils = __webpack_require__(3);

var motorcortex_types = new _message_types.MessageTypes();
var req = new _request.Request(motorcortex_types);

req.connectionClosed = function () {
    postMessage({ id: -1, reply: { type: 'connection_closed' } });
};

var request_channel = null;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Developer : Alexey Zakharov (alexey.zakharov@vectioneer.com)
 * All rights reserved. Copyright (c) 2015 - 2018 VECTIONEER.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {

    function processMessage(e) {
        var data = e.data;
        var id = data.id;
        var request = data.request;

        var reply = null;
        switch (request.type) {
            case 'registerRequest':
                rpc_request.setPort(e.ports[0]);
                reply = new Promise(function (resolve, reject) {
                    resolve();
                });
                break;
            case 'loadProto':
                if (!motorcortex_types.loadedFiles()) {
                    reply = motorcortex_types.load(request.files);
                } else {
                    reply = new Promise(function (resolve, reject) {
                        resolve();
                    });
                }
                break;
            case 'connect':
                reply = sub.connect(request.url);
                break;
            case 'close':
                reply = new Promise(function (resolve, reject) {
                    reply = sub.close();
                    resolve();
                });
                break;
            case 'subscribe':
                var d = new _utils.Deferred();
                reply = d.promise;
                var subscription = sub.subscribe(request.path_list, request.group_alias, request.frq_divider);
                subscription.then(function (e) {
                    d.resolve(e);
                    subsriptions[request.group_alias] = [];
                    var input_buffer = subsriptions[request.group_alias];
                    subscription.notify(function (data) {
                        input_buffer.push(data);
                    });
                }).catch(function (e) {
                    d.reject(e);
                });
                break;
            case 'unsubscribe':
                if (subsriptions[request.group_alias]) {
                    delete subsriptions[request.group_alias];
                }
                reply = sub.unsubscribe(request.group_alias);
                break;
            default:
                reply = new Promise(function (resolve, reject) {
                    reject('Unknown request type:' + request.type);
                });
        }

        return [id, reply];
    }

    function onMessage(e) {
        var _processMessage = processMessage(e),
            _processMessage2 = _slicedToArray(_processMessage, 2),
            id = _processMessage2[0],
            reply = _processMessage2[1];

        reply.then(function (e) {
            post(id, { type: 'success', result: e });
        }).catch(function (e) {
            post(id, { type: 'error', result: e });
        });
    }

    // Respond to message from parent thread
    addEventListener('message', onMessage);
};

var _message_types = __webpack_require__(8);

var _subscribe = __webpack_require__(12);

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RPCRequest = function () {
    function RPCRequest(protobuf_types) {
        _classCallCheck(this, RPCRequest);

        this.protobuf_types = protobuf_types;
        this.request_channel = null;
        this.request_id = 0;
        this.request_queue = {};
    }

    _createClass(RPCRequest, [{
        key: 'post',
        value: function post(request) {
            var reply = new _utils.Deferred();
            if (this.request_channel) {
                this.request_queue[this.request_id] = reply;
                this.request_channel.postMessage({
                    id: this.request_id++,
                    request: request
                });
            } else {
                reply.reject('SubscribeAsync request channel is not ready');
            }

            return reply.promise;
        }
    }, {
        key: 'getMessageTypes',
        value: function getMessageTypes() {
            return this.protobuf_types;
        }
    }, {
        key: 'setPort',
        value: function setPort(port) {
            this.request_channel = port;
            this.request_channel.onmessage = this.onRequestMessage.bind(this);
        }
    }, {
        key: 'onRequestMessage',
        value: function onRequestMessage(e) {
            var data = e.data;
            var id = data.id;
            var reply = data.reply;

            if (id >= 0) {
                if (reply.type == 'success') {
                    this.request_queue[id].resolve(reply.result);
                } else {
                    this.request_queue[id].reject(reply.result);
                }

                delete this.request_queue[id];
            }
        }
    }, {
        key: 'createGroup',
        value: function createGroup(path_list, group_alias, frq_divider) {
            return this.post({
                type: 'createGroup',
                path_list: path_list,
                group_alias: group_alias,
                frq_divider: frq_divider
            });
        }
    }, {
        key: 'removeGroup',
        value: function removeGroup(group_alias) {
            return this.post({
                type: 'removeGroup',
                group_alias: group_alias
            });
        }
    }]);

    return RPCRequest;
}();

var motorcortex_types = new _message_types.MessageTypes();
var rpc_request = new RPCRequest(motorcortex_types);
var sub = new _subscribe.Subscribe(rpc_request);
var subsriptions = {};

function post(id, arg) {
    postMessage({ id: id, reply: arg });
}

sub.connectionClosed = function () {
    postMessage({ id: -1, reply: { type: 'connection_closed' } });
};

function notify() {
    for (var key in subsriptions) {
        var sb = subsriptions[key];
        if (sb.length > 0) {
            post(-2, { id: key, data: sb });
            sb.length = 0;
        }
    }
}
var notify_timer = setInterval(notify, 1000 / 60.0);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// full library entry point.


module.exports = __webpack_require__(51);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = common;

var commonRe = /\/|\./;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {INamespace} google/protobuf/any.proto Any
 * @property {INamespace} google/protobuf/duration.proto Duration
 * @property {INamespace} google/protobuf/empty.proto Empty
 * @property {INamespace} google/protobuf/field_mask.proto FieldMask
 * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {INamespace} google/protobuf/timestamp.proto Timestamp
 * @property {INamespace} google/protobuf/wrappers.proto Wrappers
 * @example
 * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
 * protobuf.common("descriptor", descriptorJson);
 *
 * // manually provides a custom definition (uses my.foo namespace)
 * protobuf.common("my/foo/bar.proto", myFooBarJson);
 */
function common(name, json) {
    if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.

common("any", {

    /**
     * Properties of a google.protobuf.Any message.
     * @interface IAny
     * @type {Object}
     * @property {string} [typeUrl]
     * @property {Uint8Array} [bytes]
     * @memberof common
     */
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {

    /**
     * Properties of a google.protobuf.Duration message.
     * @interface IDuration
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {

    /**
     * Properties of a google.protobuf.Timestamp message.
     * @interface ITimestamp
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Timestamp: timeType
});

common("empty", {

    /**
     * Properties of a google.protobuf.Empty message.
     * @interface IEmpty
     * @memberof common
     */
    Empty: {
        fields: {}
    }
});

common("struct", {

    /**
     * Properties of a google.protobuf.Struct message.
     * @interface IStruct
     * @type {Object}
     * @property {Object.<string,IValue>} [fields]
     * @memberof common
     */
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Value message.
     * @interface IValue
     * @type {Object}
     * @property {string} [kind]
     * @property {0} [nullValue]
     * @property {number} [numberValue]
     * @property {string} [stringValue]
     * @property {boolean} [boolValue]
     * @property {IStruct} [structValue]
     * @property {IListValue} [listValue]
     * @memberof common
     */
    Value: {
        oneofs: {
            kind: {
                oneof: [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },

    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },

    /**
     * Properties of a google.protobuf.ListValue message.
     * @interface IListValue
     * @type {Object}
     * @property {Array.<IValue>} [values]
     * @memberof common
     */
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});

common("wrappers", {

    /**
     * Properties of a google.protobuf.DoubleValue message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    DoubleValue: {
        fields: {
            value: {
                type: "double",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.FloatValue message.
     * @interface IFloatValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FloatValue: {
        fields: {
            value: {
                type: "float",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int64Value message.
     * @interface IInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    Int64Value: {
        fields: {
            value: {
                type: "int64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt64Value message.
     * @interface IUInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    UInt64Value: {
        fields: {
            value: {
                type: "uint64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int32Value message.
     * @interface IInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    Int32Value: {
        fields: {
            value: {
                type: "int32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt32Value message.
     * @interface IUInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    UInt32Value: {
        fields: {
            value: {
                type: "uint32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BoolValue message.
     * @interface IBoolValue
     * @type {Object}
     * @property {boolean} [value]
     * @memberof common
     */
    BoolValue: {
        fields: {
            value: {
                type: "bool",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.StringValue message.
     * @interface IStringValue
     * @type {Object}
     * @property {string} [value]
     * @memberof common
     */
    StringValue: {
        fields: {
            value: {
                type: "string",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BytesValue message.
     * @interface IBytesValue
     * @type {Object}
     * @property {Uint8Array} [value]
     * @memberof common
     */
    BytesValue: {
        fields: {
            value: {
                type: "bytes",
                id: 1
            }
        }
    }
});

common("field_mask", {

    /**
     * Properties of a google.protobuf.FieldMask message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FieldMask: {
        fields: {
            paths: {
                rule: "repeated",
                type: "string",
                id: 1
            }
        }
    }
});

/**
 * Gets the root definition of the specified common proto file.
 *
 * Bundled definitions are:
 * - google/protobuf/any.proto
 * - google/protobuf/duration.proto
 * - google/protobuf/empty.proto
 * - google/protobuf/field_mask.proto
 * - google/protobuf/struct.proto
 * - google/protobuf/timestamp.proto
 * - google/protobuf/wrappers.proto
 *
 * @param {string} file Proto file name
 * @returns {INamespace|null} Root definition or `null` if not defined
 */
common.get = function get(file) {
    return common[file] || null;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(50);

protobuf.build = "light";

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */
function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

// Serialization
protobuf.encoder          = __webpack_require__(26);
protobuf.decoder          = __webpack_require__(25);
protobuf.verifier         = __webpack_require__(30);
protobuf.converter        = __webpack_require__(24);

// Reflection
protobuf.ReflectionObject = __webpack_require__(5);
protobuf.Namespace        = __webpack_require__(7);
protobuf.Root             = __webpack_require__(17);
protobuf.Enum             = __webpack_require__(1);
protobuf.Type             = __webpack_require__(19);
protobuf.Field            = __webpack_require__(4);
protobuf.OneOf            = __webpack_require__(11);
protobuf.MapField         = __webpack_require__(13);
protobuf.Service          = __webpack_require__(18);
protobuf.Method           = __webpack_require__(15);

// Runtime
protobuf.Message          = __webpack_require__(14);
protobuf.wrappers         = __webpack_require__(31);

// Utility
protobuf.types            = __webpack_require__(6);
protobuf.util             = __webpack_require__(0);

// Configure reflection
protobuf.ReflectionObject._configure(protobuf.Root);
protobuf.Namespace._configure(protobuf.Type, protobuf.Service);
protobuf.Root._configure(protobuf.Type);
protobuf.Field._configure(protobuf.Type);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(20);
protobuf.BufferWriter = __webpack_require__(56);
protobuf.Reader       = __webpack_require__(16);
protobuf.BufferReader = __webpack_require__(53);

// Utility
protobuf.util         = __webpack_require__(2);
protobuf.rpc          = __webpack_require__(28);
protobuf.roots        = __webpack_require__(27);
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Configure serialization
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = module.exports = __webpack_require__(49);

protobuf.build = "full";

// Parser
protobuf.tokenize         = __webpack_require__(29);
protobuf.parse            = __webpack_require__(52);
protobuf.common           = __webpack_require__(48);

// Configure parser
protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize  = __webpack_require__(29),
    Root      = __webpack_require__(17),
    Type      = __webpack_require__(19),
    Field     = __webpack_require__(4),
    MapField  = __webpack_require__(13),
    OneOf     = __webpack_require__(11),
    Enum      = __webpack_require__(1),
    Service   = __webpack_require__(18),
    Method    = __webpack_require__(15),
    types     = __webpack_require__(6),
    util      = __webpack_require__(0);

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
 */

/**
 * Options modifying the behavior of JSON serialization.
 * @interface IToJSONOptions
 * @property {boolean} [keepComments=false] Serializes comments.
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var tn = tokenize(source, options.alternateCommentMode || false),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    /* istanbul ignore next */
    function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
            parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);

            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true": case "TRUE":
                return true;
            case "false": case "FALSE":
                return false;
        }
        try {
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {

            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal(token, "value");
        }
    }

    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
                target.push(readString());
            else
                target.push([ start = parseId(next()), skip("to", true) ? parseId(next()) : start ]);
        } while (skip(",", true));
        skip(";");
    }

    function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch (token) {
            case "inf": case "INF": case "Inf":
                return sign * Infinity;
            case "nan": case "NAN": case "Nan": case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token))
            return sign * parseInt(token, 10);
        if (base16Re.test(token))
            return sign * parseInt(token, 16);
        if (base8Re.test(token))
            return sign * parseInt(token, 8);

        /* istanbul ignore else */
        if (numberRe.test(token))
            return sign * parseFloat(token);

        /* istanbul ignore next */
        throw illegal(token, "number", insideTryCatch);
    }

    function parseId(token, acceptNegative) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return 536870911;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal(token, "id");

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal(token, "id");
    }

    function parsePackage() {

        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal("package");

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");

        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";

        /* istanbul ignore if */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");

        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            obj.comment = cmnt(); // try block-type comment
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string")
                obj.comment = cmnt(trailingLine); // try line-type comment if no block
        }
    }

    function parseType(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "type name");

        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token))
                return;

            switch (token) {

                case "map":
                    parseMapField(type, token);
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                case "oneof":
                    parseOneOf(type, token);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);

                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }

        /* istanbul ignore if */
        if (!typeRefRe.test(type))
            throw illegal(type, "type");

        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);

        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
            field.setOption("packed", false, /* ifNotSet */ true);
    }

    function parseGroup(parent, rule) {
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
          switch(token) {
            case "option":
              parseOption(enm, token);
              skip(";");
              break;

            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;

            default:
              parseEnumValue(enm, token);
          }
        });
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal(token, "name");

        skip("=");
        var value = parseId(next(), true),
            dummy = {};
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else
                throw illegal(token);

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment);
    }

    function parseOption(parent, token) {
        var isCustom = skip("(", true);

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "name");

        var name = token;
        if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) { // { a: "foo" b { c: "bar" } }
            do {
                /* istanbul ignore if */
                if (!nameRe.test(token = next()))
                    throw illegal(token, "name");

                if (peek() === "{")
                    parseOptionValue(parent, name + "." + token);
                else {
                    skip(":");
                    if (peek() === "{")
                        parseOptionValue(parent, name + "." + token);
                    else
                        setOption(parent, name + "." + token, readValue(true));
                }
            } while (!skip("}", true));
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "service name");

        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token))
                return;

            /* istanbul ignore else */
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal(token);
        });
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else
                throw illegal(token);

        });
        parent.add(method);
    }

    function parseExtension(parent, token) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "reference");

        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                case "optional":
                    parseField(parent, token, reference);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        switch (token) {

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parsePackage();
                break;

            case "import":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseSyntax();
                break;

            case "option":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseOption(ptr, token);
                skip(";");
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }

                /* istanbul ignore next */
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(16);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(2);

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(2);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(2);

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(20);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(2);

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


/***/ }),
/* 57 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {"name":"motorcortex-js","version":"0.12.1","description":"Motorcortex Bindings for JavaScript","author":"Alexey Zakharov <alexey@vectioneer.com>","license":"Copyright (C) Vectioneer - All Rights Reserved","private":true,"main":"dist/motorcortex.js","scripts":{"build":"webpack --config config/webpack.config.js --progress --profile --colors --verbose","dev":"webpack-dev-server --config config/webpack.config.js --progress --colors --port 2992 --inline","docs":"./node_modules/.bin/jsdoc --configure jsdoc.json --verbose readme.md","docsMD":"./node_modules/.bin/jsdoc2md src/*.js > ./doc/motorcortex_api.md","test":"karma start --single-run --browsers ChromeHeadless karma.conf.js"},"dependencies":{"protobufjs":"^6.8.4"},"devDependencies":{"webworkify-webpack":"^2.1.2","babel-core":"^6.26.0","babel-loader":"^7.0.0","babel-preset-env":"^1.6.1","babel-preset-es2015":"^6.24.1","babel-register":"^6.26.0","babelify":"^8.0.0","browserify":"^16.1.0","chai":"^4.1.2","jsdoc":"^3.5.5","jsdoc-to-markdown":"^4.0.1","karma":"^2.0.0","karma-babel-preprocessor":"^7.0.0","karma-browserify":"^5.2.0","karma-chai":"^0.1.0","karma-chrome-launcher":"^2.2.0","karma-mocha":"^1.3.0","long":"^3.2.0","minami":"^1.2.3","mocha":"^5.0.1","uglify-js":"^2.8.0","uglifyjs-webpack-plugin":"^0.4.3","watchify":"^3.10.0","webpack":"^2.6.1","webpack-dev-server":"^2.11.1","copy-webpack-plugin":"^4.5.1"},"engines":{"node":">= 7.0.0","npm":">= 5.0.0"},"babel":{"presets":["env"]}}

/***/ })
/******/ ]);
});
//# sourceMappingURL=motorcortex.js.map