(function () {
    Math.floor(Math.random() * 2147483648).toString(36);
    var sbox$toSet;
    var sbox$wrapResponseApi;
    var sbox$isCjkLanguage;
    var sbox$now;
    var sbox$parseSubtypes;
    var sbox$encodeSubtypes;
    var sbox$getSuggestionKey;
    var sbox$noop;
    var sbox$indexOf;
    var sbox$getElement;
    var sbox$buildQueryString;
    var sbox$normalizeWhitespace;
    var sbox$nextId;
    var sbox$appendParam;
    var sbox$Range;
    var sbox$isNonBlank;
    var sbox$htmlEscape;
    var sbox$htmlUnescape;
    var sbox$stripBoldTags;
    var sbox$stripTags;
    var sbox$escapeSpaces;
    var sbox$startsWith;
    var sbox$clearTimeout;
    var sbox$getHead;
    var sbox$isPersonalType;
    var sbox$IE_LE7;
    var sbox$IE_LE8;
    var sbox$createElement;
    var sbox$OPERA;
    var sbox$IE;
    var sbox$setCursorPosition;
    var sbox$getSelectionRange;
    var sbox$getOffset;
    var sbox$isUpDownKey;
    var sbox$createTable;
    var sbox$createDiv;
    var sbox$createOverlayDiv;
    var sbox$setInnerHtml;
    var sbox$appendSpan;
    var sbox$addHiddenInput;
    var sbox$findInput;
    var sbox$dispatchEscapeKey;
    var sbox$preventDefault;
    var sbox$stopEvent;
    var sbox$insertAfter;
    var sbox$appendFeelingLuckyLink;
    var sbox$getComputedStyle;
    var sbox$getViewportSize;
    var sbox$resetInputStyle;
    var sbox$indexByKey;
    var sbox$GECKO;
    var sbox$WEBKIT;
    var sbox$SAFARI;
    var sbox$ANDROID;
    var sbox$detectBrowserFlags_;
    var sbox$CHROME;
    var sbox$IS_MAC;
    var sbox$PERSONAL_TYPE_RE_ = /^[6-9]$/;
    var sbox$State = {
        EMPTY: 0,
        INLINE: 1,
        LIST: 2
    };
    var sbox$ComponentType = {
        NONE: 0,
        TYPE_114: 114,
        PANEL_MANAGER: 115,
        POPUP: 116,
        EVENTS: 117,
        CONTROLLER: 118,
        INPUT: 119,
        STATS: 120,
        SEARCHER: 121,
        POST_PROCESSOR: 122,
        REQUESTER: 123,
        PARSER: 124,
        RESPONSE_HANDLER: 125,
        RESPONSE_FILTER: 230,
        RESPONSE_STATE: 126,
        SERVER_CONFIG: 127,
        DROPDOWN: 128,
        LIST_RENDERER: 129,
        TYPE_231: 231,
        CHIPS: 130,
        TYPE_131: 131,
        TYPE_237: 237,
        TYPE_132: 132,
        HISTORY_SERVICE: 134,
        HISTORY_AUTH: 189,
        CACHE: 133,
        INLINE_COMPLETER: 184,
        ICON_BAR: 173,
        TYPE_135: 135,
        TYPE_136: 136,
        TYPE_137: 137,
        TYPE_138: 138,
        TYPE_139: 139,
        TYPE_140: 140,
        TYPE_141: 141,
        TYPE_142: 142,
        TYPE_143: 143,
        TYPE_144: 144,
        BIDI: 145,
        KANA_NORMALIZER: 146,
        TEXT_MEASURER: 147,
        TYPE_148: 148,
        BOLDER: 150,
        CRYPTO: 191,
        TYPE_245: 245,
        SECONDARY_CACHE: 151,
        RENDERER: 152,
        MESSAGE_PROVIDER: 153,
        PANEL: 154,
        TYPE_155: 155,
        REQUEST_FILTER: 156,
        LIST_DECORATOR: 157,
        METADATA_PARSER: 158,
        FOCUS_STYLER: 159,
        ICON_PROVIDER: 160,
        TRANSPORT: 149,
        TYPE_256: 256
    };
    var sbox$ComponentListMarker = {
        DISABLED: 161,
        INCLUDE_DEFAULTS: 162
    };
    (function () {
        function wrapSuggestionApis(suggestions) {
            var apis = [];
            for (var i = 0, suggestion; (suggestion = suggestions[i++]);) {
                apis.push(wrapSuggestionApi(suggestion));
            }
            return apis;
        }
        function encodeSubtypes(codes) {
            var letters = "";
            if (codes) {
                for (var i = 0, code; (code = codes[i++]);) {
                    if ((code = subtypeLetters[code])) {
                        letters += code;
                    }
                }
            }
            return letters;
        }
        function getSuggestionKey(suggestion) {
            return suggestion.getIndex() + encodeSubtypes(suggestion.getSubtypes());
        }
        function wrapSuggestionApi(suggestion) {
            return (
                suggestion.api || {
                    a: suggestion.getHtml,
                    b: suggestion.getText,
                    c: suggestion.getIndex,
                    d: suggestion.getType,
                    e: suggestion.getSubtypes,
                    f: suggestion.hasSubtype,
                    g: suggestion.hasAnySubtype,
                    h: function () {
                        return getSuggestionKey(suggestion);
                    },
                    i: suggestion.getAnnotations,
                    j: suggestion.isQueryType
                }
            );
        }
        var SUBTYPE_SUFFIX_RE = /\D+$/;
        var subtypeLetters = {};
        var subtypeCodes = {};
        (function () {
            subtypeCodes.a = 16;
            subtypeCodes.b = 8;
            subtypeCodes.c = 7;
            subtypeCodes.d = 42;
            subtypeCodes.e = 9;
            subtypeCodes.g = 12;
            subtypeCodes.i = 14;
            subtypeCodes.j = 18;
            subtypeCodes.l = 13;
            subtypeCodes.m = 5;
            subtypeCodes.n = 38;
            subtypeCodes.p = 39;
            subtypeCodes.q = 22;
            subtypeCodes.r = 4;
            subtypeCodes.s = 10;
            subtypeCodes.t = 2;
            subtypeCodes.u = 17;
            subtypeCodes.v = 15;
            subtypeCodes.w = 21;
            subtypeCodes.x = 11;
            subtypeCodes.y = 25;
            subtypeCodes.z = 3;
            subtypeCodes.A = 29;
            subtypeCodes.C = 33;
            subtypeCodes.D = 40;
            subtypeCodes.E = 36;
            subtypeCodes.F = 35;
            subtypeCodes.G = 26;
            subtypeCodes.I = 1;
            subtypeCodes.J = 37;
            subtypeCodes.K = 30;
            subtypeCodes.L = 19;
            subtypeCodes.N = 32;
            subtypeCodes.P = 20;
            subtypeCodes.Q = 27;
            subtypeCodes.R = 28;
            subtypeCodes.S = 24;
            subtypeCodes.T = 23;
            subtypeCodes.U = 41;
            subtypeCodes.V = 31;
            for (var letter in subtypeCodes) {
                subtypeLetters[subtypeCodes[letter]] = letter;
            }
        })();
        sbox$toSet = function (values) {
            var set = {};
            if (values) {
                for (var i = 0; i < values.length; ++i) {
                    set[values[i]] = true;
                }
            }
            return set;
        };
        sbox$wrapResponseApi = function (response) {
            var suggestionApis = wrapSuggestionApis(response.getSuggestions());
            return (
                response.api || {
                    a: response.getQuery,
                    b: function () {
                        return suggestionApis;
                    }
                }
            );
        };
        sbox$isCjkLanguage = function (language) {
            if (language) {
                language = language.toLowerCase();
                return language == "zh-tw" || language == "zh-cn" || language == "ja" || language == "ko";
            } else {
                return false;
            }
        };
        sbox$now = function () {
            return new Date().getTime();
        };
        sbox$parseSubtypes = function (subtypes) {
            var codes = [];
            if (subtypes) {
                if (typeof subtypes == "string") {
                    if ((subtypes = subtypes.match(SUBTYPE_SUFFIX_RE))) {
                        for (var subtypes = subtypes[0], i = 0, letter; i < subtypes.length; i++) {
                            letter = subtypes.charAt(i);
                            codes.push(subtypeCodes[letter]);
                        }
                    }
                } else {
                    return subtypes;
                }
            }
            return codes;
        };
        sbox$encodeSubtypes = encodeSubtypes;
        sbox$getSuggestionKey = getSuggestionKey;
    })();
    function sbox$createConfigHelper() {
        return {
            getInstance: function () {
                return {
                    client: "hp",
                    domain: "google.com",
                    country: "",
                    language: "en",
                    dataSource: "",
                    previousQuery: "",
                    historyToken: "",
                    authuser: 0,
                    experiment: "",
                    keepPendingRequests: false,
                    suggestHost: "",
                    requestPath: "",
                    transportType: 0,
                    unusedOptionBd: null,
                    useAcCallback: false,
                    forceHttps: false,
                    unusedOptionBk: false,
                    requestsDisabled: false,
                    allowedTypes: sbox$toSet([19, 5, 0]),
                    unusedOptionN: false,
                    unusedOptionAy: false,
                    useCache: true,
                    maxSuggestions: 10,
                    unusedOptionS: true,
                    cacheEmptyResults: false,
                    bypassCache: false,
                    logTimings: false,
                    hideOnBlur: true,
                    showOnMouseDown: false,
                    hideDelay: 500,
                    unusedOptionW: true,
                    enableTia: false,
                    tiaLanguage: "",
                    tiaBaseUrl: "//www.google.com/textinputassistant",
                    tiaVersion: 3,
                    unusedOptionBo: false,
                    showSearchButtons: false,
                    showLuckyButton: true,
                    showExtraButton: false,
                    showFooter: false,
                    reserveIconSpace: false,
                    searchOnEscape: false,
                    searchOnDeleteAtEnd: false,
                    tabCompletionMode: 1,
                    completeOnRightArrow: true,
                    searchOnRightArrow: true,
                    showLuckyLinks: false,
                    pollInput: false,
                    pollInterval: 10,
                    boldSuggestions: false,
                    unusedOptionBu: 0,
                    unusedOptionBv: false,
                    refocusAfterWrap: true,
                    reenableDropdownOnEmpty: false,
                    dropdownParent: document.body,
                    injectStyles: true,
                    styleParent: null,
                    unusedOptionCg: {},
                    components: {},
                    unusedOptionDh: {},
                    unusedOptionCk: 0,
                    forceWrap: false,
                    skipCacheWriteOnBypass: true,
                    listenKeypress: false,
                    unusedOptionAg: 1,
                    unusedOptionAh: true,
                    unusedOptionAi: true,
                    unusedOptionAj: 1,
                    forceInputMode3: false,
                    spellcheck: false,
                    showOutline: false,
                    searchButtonLabel: "Search",
                    luckyButtonLabel: "I'm  Feeling Lucky",
                    extraButtonLabel: "",
                    helpLinkLabel: "Learn more",
                    removeLinkLabel: "Remove",
                    removedMessage: "This search was removed from your Web History",
                    unusedOptionCw: "",
                    overlayClassName: "",
                    rowClassName: "",
                    unusedOptionAt: false,
                    dropdownPosition: "absolute",
                    useStyledButtons: false,
                    useIframeShim: false,
                    anchorElementId: null,
                    unusedOptionAx: 0,
                    dropdownOffsets: [0, 0, 0, 0, 0, 0],
                    shimPadding: [0],
                    dropdownWidth: 0,
                    highlightPersonal: false,
                    removeLinkMode: 1,
                    wrapperClassName: "",
                    dropdownClassName: "",
                    highlightClassName: "",
                    focusTargetId: null,
                    normalClassName: "",
                    focusedClassName: "",
                    componentConfigs: {},
                    useRegisteredComponents: true
                };
            },
            normalize: function (config) {
                if (!config) {
                    return null;
                } else {
                    return {
                        a: config.client,
                        b: config.domain,
                        c: config.country,
                        d: config.language,
                        e: config.dataSource,
                        f: config.previousQuery,
                        g: config.historyToken,
                        h: config.experiment,
                        i: config.transportType,
                        j: config.useAcCallback,
                        k: config.forceHttps,
                        l: config.allowedTypes,
                        n: config.unusedOptionN,
                        q: config.maxSuggestions,
                        r: config.useCache,
                        s: config.unusedOptionS,
                        t: config.cacheEmptyResults,
                        u: config.logTimings,
                        v: config.hideOnBlur,
                        w: config.unusedOptionW,
                        x: config.enableTia,
                        y: config.showSearchButtons,
                        z: config.showFooter,
                        aa: config.searchOnEscape,
                        ab: config.searchOnDeleteAtEnd,
                        ac: config.tabCompletionMode,
                        ae: config.pollInput,
                        af: config.pollInterval,
                        ag: config.unusedOptionAg,
                        ah: config.unusedOptionAh,
                        ai: config.unusedOptionAi,
                        aj: config.unusedOptionAj,
                        ak: config.spellcheck,
                        al: config.showOutline,
                        am: config.searchButtonLabel,
                        an: config.luckyButtonLabel,
                        ao: config.helpLinkLabel,
                        ap: config.removeLinkLabel,
                        aq: config.removedMessage,
                        ar: config.overlayClassName,
                        as: config.rowClassName,
                        at: config.unusedOptionAt,
                        av: config.useIframeShim,
                        aw: config.anchorElementId,
                        ax: config.unusedOptionAx,
                        ay: config.unusedOptionAy,
                        az: config.completeOnRightArrow,
                        ba: config.searchOnRightArrow,
                        bb: config.useStyledButtons,
                        bc: config.dropdownOffsets,
                        bd: config.unusedOptionBd,
                        bf: config.highlightPersonal,
                        bg: config.authuser,
                        bh: config.removeLinkMode,
                        bi: config.showLuckyLinks,
                        bj: config.bypassCache,
                        bk: config.unusedOptionBk,
                        bo: config.unusedOptionBo,
                        bq: config.boldSuggestions,
                        br: config.tiaLanguage,
                        bs: config.wrapperClassName,
                        bt: config.reserveIconSpace,
                        bu: config.unusedOptionBu,
                        bv: config.unusedOptionBv,
                        bx: config.refocusAfterWrap,
                        bz: config.dropdownWidth,
                        ca: config.dropdownParent,
                        cb: config.showLuckyButton,
                        cc: config.showExtraButton,
                        cd: config.extraButtonLabel,
                        ce: config.showOnMouseDown,
                        cf: config.hideDelay,
                        cg: config.unusedOptionCg,
                        ch: config.reenableDropdownOnEmpty,
                        ci: config.styleParent,
                        ck: config.unusedOptionCk,
                        cl: config.shimPadding,
                        cm: config.dropdownPosition,
                        cn: config.injectStyles,
                        cp: config.forceWrap,
                        cq: config.suggestHost,
                        cr: config.skipCacheWriteOnBypass,
                        cs: config.tiaBaseUrl,
                        ct: config.keepPendingRequests,
                        cu: config.requestsDisabled,
                        cv: config.listenKeypress,
                        cw: config.unusedOptionCw,
                        cz: config.tiaVersion,
                        da: config.dropdownClassName,
                        db: config.highlightClassName,
                        dc: config.forceInputMode3,
                        de: config.componentConfigs,
                        df: config.useRegisteredComponents,
                        dg: config.components,
                        dh: config.unusedOptionDh,
                        di: config.focusTargetId,
                        dj: config.normalClassName,
                        dk: config.focusedClassName,
                        dl: config.requestPath
                    };
                }
            },
            translate: function (external) {
                return {
                    client: external.a,
                    domain: external.b,
                    country: external.c,
                    language: external.d,
                    dataSource: external.e,
                    previousQuery: external.f,
                    historyToken: external.g,
                    experiment: external.h,
                    transportType: external.i,
                    useAcCallback: external.j,
                    forceHttps: external.k,
                    allowedTypes: external.l,
                    unusedOptionN: external.n,
                    maxSuggestions: external.q,
                    useCache: external.r,
                    unusedOptionS: external.s,
                    cacheEmptyResults: external.t,
                    logTimings: external.u,
                    hideOnBlur: external.v,
                    unusedOptionW: external.w,
                    enableTia: external.x,
                    showSearchButtons: external.y,
                    showFooter: external.z,
                    searchOnEscape: external.aa,
                    searchOnDeleteAtEnd: external.ab,
                    tabCompletionMode: external.ac,
                    pollInput: external.ae,
                    pollInterval: external.af,
                    unusedOptionAg: external.ag,
                    unusedOptionAh: external.ah,
                    unusedOptionAi: external.ai,
                    unusedOptionAj: external.aj,
                    spellcheck: external.ak,
                    showOutline: external.al,
                    searchButtonLabel: external.am,
                    luckyButtonLabel: external.an,
                    helpLinkLabel: external.ao,
                    removeLinkLabel: external.ap,
                    removedMessage: external.aq,
                    overlayClassName: external.ar,
                    rowClassName: external.as,
                    unusedOptionAt: external.at,
                    useIframeShim: external.av,
                    anchorElementId: external.aw,
                    unusedOptionAx: external.ax,
                    unusedOptionAy: external.ay,
                    completeOnRightArrow: external.az,
                    searchOnRightArrow: external.ba,
                    useStyledButtons: external.bb,
                    dropdownOffsets: external.bc,
                    unusedOptionBd: external.bd,
                    highlightPersonal: external.bf,
                    authuser: external.bg,
                    removeLinkMode: external.bh,
                    showLuckyLinks: external.bi,
                    bypassCache: external.bj,
                    unusedOptionBk: external.bk,
                    unusedOptionBo: external.bo,
                    boldSuggestions: external.bq,
                    tiaLanguage: external.br,
                    wrapperClassName: external.bs,
                    reserveIconSpace: external.bt,
                    unusedOptionBu: external.bu,
                    unusedOptionBv: external.bv,
                    refocusAfterWrap: external.bx,
                    dropdownWidth: external.bz,
                    dropdownParent: external.ca,
                    showLuckyButton: external.cb,
                    showExtraButton: external.cc,
                    extraButtonLabel: external.cd,
                    showOnMouseDown: external.ce,
                    hideDelay: external.cf,
                    unusedOptionCg: external.cg,
                    reenableDropdownOnEmpty: external.ch,
                    styleParent: external.ci,
                    unusedOptionCk: external.ck,
                    shimPadding: external.cl,
                    dropdownPosition: external.cm,
                    injectStyles: external.cn,
                    forceWrap: external.cp,
                    suggestHost: external.cq,
                    skipCacheWriteOnBypass: external.cr,
                    tiaBaseUrl: external.cs,
                    keepPendingRequests: external.ct,
                    requestsDisabled: external.cu,
                    listenKeypress: external.cv,
                    unusedOptionCw: external.cw,
                    tiaVersion: external.cz,
                    dropdownClassName: external.da,
                    highlightClassName: external.db,
                    forceInputMode3: external.dc,
                    componentConfigs: external.de,
                    useRegisteredComponents: external.df,
                    components: external.dg,
                    unusedOptionDh: external.dh,
                    focusTargetId: external.di,
                    normalClassName: external.dj,
                    focusedClassName: external.dk,
                    requestPath: external.dl
                };
            }
        };
    }
    var sbox$BOLD_TAG_RE_ = /<\/?(?:b|em)>/gi;
    var sbox$KeyCode = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    };
    var sbox$registry = (function () {
        var NOOP_FACTORY = sbox$noop;
        var instanceCounter = 0;
        var singletons = {};
        var singletonFactories = {};
        var factoriesById = {};
        var factoriesByType = {};
        var idsByType = {};
        return {
            nextInstanceId: function () {
                return instanceCounter++;
            },
            registerSingleton: function (type, id, factory) {
                singletonFactories[type] = factory;
                idsByType[type] = [id];
            },
            register: function (type, id, factory) {
                var existing = factoriesByType[type];
                if (existing) {
                    if (existing != NOOP_FACTORY) {
                        factoriesByType[type] = NOOP_FACTORY;
                    }
                } else {
                    factoriesByType[type] = factory;
                }
                if ((existing = idsByType[type])) {
                    existing.push(id);
                } else {
                    idsByType[type] = [id];
                }
                factoriesById[id] = factory;
            },
            getRegisteredTypes: function () {
                return idsByType;
            },
            getInstance: function (type, id) {
                var factory = singletons[type];
                if (factory) {
                    return factory;
                }
                if ((factory = singletonFactories[type])) {
                    return (singletons[type] = factory());
                }
                if (!id) {
                    factory = factoriesByType[type];
                    if (!factory || factory == NOOP_FACTORY) {
                        return null;
                    } else {
                        return factory();
                    }
                } else if ((factory = factoriesById[id])) {
                    return factory();
                } else {
                    return null;
                }
            }
        };
    })();
    function sbox$SearchBox(callbacks, componentConfig, input, form, options, instanceApi, config) {
        function deactivateAll() {
            if (active) {
                for (var i = 0, component; (component = components[i++]);) {
                    if (component.deactivate) {
                        component.deactivate();
                    }
                }
            }
        }
        function mergeRegisteredComponents() {
            var registered = registry.getRegisteredTypes();
            var registeredIds;
            var isMulti;
            var configured;
            var typeKey;
            for (typeKey in registered) {
                var type = typeKey;
                registeredIds = registered[type];
                isMulti = MULTI_INSTANCE_TYPES[type];
                if ((configured = componentConfig[type])) {
                    if (configured != listMarker.DISABLED && isMulti && configured.length) {
                        isMulti = componentConfig;
                        configured = configured.slice(0);
                        var merged = [];
                        var seen = {};
                        for (var set = 0, id = undefined, entry = undefined; (entry = configured[set++]);) {
                            if (entry instanceof Object) {
                                id = entry.getComponentId();
                                if (!seen[id]) {
                                    merged.push(entry);
                                    seen[id] = 1;
                                }
                                configured.splice(--set, 1);
                            }
                        }
                        set = sbox$toSet(configured);
                        if (set[listMarker.INCLUDE_DEFAULTS]) {
                            set = sbox$toSet(configured.concat(registeredIds));
                            delete set[listMarker.INCLUDE_DEFAULTS];
                        }
                        for (id in set) {
                            if (!seen[id]) {
                                merged.push(parseInt(id, 10));
                            }
                        }
                        isMulti[type] = merged;
                    }
                } else {
                    componentConfig[type] = isMulti ? registeredIds : registeredIds[0];
                }
            }
        }
        function instantiateAll(typeConfig) {
            for (var typeKey in typeConfig) {
                var type = typeKey;
                var ids = typeConfig[type];
                if (ids != listMarker.DISABLED) {
                    if (MULTI_INSTANCE_TYPES[type]) {
                        var instances = multiInstances[type] || [];
                        for (var i = 0, instance = undefined; i < ids.length; ++i) {
                            if ((instance = createComponent(type, ids[i]))) {
                                instances.push(instance);
                            }
                        }
                        multiInstances[type] = instances;
                    } else {
                        instantiateSingle(type, ids);
                    }
                }
            }
        }
        function instantiateSingle(type, id) {
            var instance = createComponent(type, id);
            if (instance) {
                singleInstances[type] = instance;
            }
        }
        function createComponent(type, idOrInstance) {
            var instance;
            if (idOrInstance && idOrInstance instanceof Object) {
                instance = idOrInstance;
            } else {
                instance = registry.getInstance(type, idOrInstance);
                if (!instance) {
                    return null;
                }
                if (instance.getProvidedComponents) {
                    var provided = instance.getProvidedComponents();
                    if (provided) {
                        for (
                            var idx = 0, providedComponent, providedType, isList;
                            (providedComponent = provided[idx++]);
                        ) {
                            isList = false;
                            providedType = providedComponent.getType();
                            if (MULTI_INSTANCE_TYPES[providedType]) {
                                if ((isList = providedComponents[providedType])) {
                                    isList.push(providedComponent);
                                    continue;
                                }
                                isList = true;
                            }
                            providedComponents[providedType] = isList ? [providedComponent] : providedComponent;
                        }
                    }
                }
            }
            registrations.push([instance, type]);
            components.push(instance);
            if (instance.init) {
                instance.init(env, options);
            }
            return instance;
        }
        function getRegisteredType(component) {
            var type = 0;
            for (var i = 0, registration; (registration = registrations[i++]);) {
                if (registration[0] == component) {
                    type = registration[1];
                }
            }
            return type;
        }
        function compareComponentOrder(first, second) {
            var firstIndex = sbox$indexOf(first.getType(), TYPE_ORDER);
            var secondIndex = sbox$indexOf(second.getType(), TYPE_ORDER);
            if (firstIndex < 0) {
                return 1;
            } else if (secondIndex < 0) {
                return -1;
            } else {
                return firstIndex - secondIndex;
            }
        }
        function getDirection() {
            if (input) {
                for (var node = input; (node = node.parentNode);) {
                    var dir = node.dir;
                    if (dir) {
                        return dir;
                    }
                }
            }
            return "ltr";
        }
        var listMarker = sbox$ComponentListMarker;
        var types = sbox$ComponentType;
        var MULTI_INSTANCE_TYPES = sbox$toSet([
            types.FOCUS_STYLER,
            types.TYPE_155,
            types.TRANSPORT,
            types.MESSAGE_PROVIDER,
            types.PANEL,
            types.RENDERER,
            types.REQUEST_FILTER,
            types.SECONDARY_CACHE,
            types.METADATA_PARSER,
            types.ICON_PROVIDER
        ]);
        var DEFAULT_TYPES = [
            types.BIDI,
            types.EVENTS,
            types.CONTROLLER,
            types.INPUT,
            types.RESPONSE_STATE,
            types.PANEL_MANAGER,
            types.POPUP,
            types.STATS,
            types.TEXT_MEASURER,
            types.SEARCHER,
            types.CACHE,
            types.POST_PROCESSOR,
            types.REQUESTER,
            types.PARSER,
            types.RESPONSE_HANDLER,
            types.SERVER_CONFIG,
            types.DROPDOWN,
            types.LIST_RENDERER
        ];
        var TYPE_ORDER = [
            types.SERVER_CONFIG,
            types.TRANSPORT,
            types.HISTORY_SERVICE,
            types.REQUESTER,
            types.SEARCHER,
            types.RESPONSE_STATE,
            types.CONTROLLER,
            types.PANEL_MANAGER,
            types.DROPDOWN,
            types.ICON_PROVIDER,
            types.ICON_BAR,
            types.INPUT,
            types.POPUP,
            types.RENDERER,
            types.MESSAGE_PROVIDER,
            types.LIST_RENDERER,
            types.STATS,
            types.PARSER,
            types.METADATA_PARSER,
            types.TYPE_155,
            types.TYPE_131,
            types.CHIPS,
            types.TEXT_MEASURER,
            types.TYPE_141,
            types.TYPE_142,
            types.TYPE_137,
            types.TYPE_143,
            types.TYPE_138,
            types.TYPE_144,
            types.TYPE_139,
            types.TYPE_140,
            types.TYPE_135,
            types.TYPE_136
        ];
        var singleInstances = {};
        var multiInstances = {};
        var providedComponents = {};
        var registrations = [];
        var components = [];
        var active = false;
        var registry = sbox$registry;
        var env;
        var container = {
            activate: function (cfg) {
                deactivateAll();
                for (var i = 0, component; (component = components[i++]);) {
                    if (component.activate) {
                        component.activate(cfg);
                    }
                }
                active = true;
            },
            deactivate: deactivateAll,
            isActive: function () {
                return active;
            },
            get: function (type, requester) {
                var instance = singleInstances[type];
                if (instance) {
                    if (instance.getApi) {
                        return instance.getApi(getRegisteredType(requester));
                    } else {
                        return {};
                    }
                }
            },
            getAllApis: function (type, requester) {
                var instances = multiInstances[type];
                if (instances) {
                    var apis = [];
                    var requesterType = getRegisteredType(requester);
                    for (var i = 0, instance; (instance = instances[i++]);) {
                        apis.push(instance.getApi ? instance.getApi(requesterType) : {});
                    }
                    return apis;
                }
                return [];
            },
            getCallbacks: function () {
                return callbacks;
            },
            getInstanceApi: function () {
                return instanceApi;
            },
            getApiByComponentId: function (componentId, requester) {
                var instances = multiInstances[types.FOCUS_STYLER];
                if (instances) {
                    for (var i = 0, instance; (instance = instances[i++]);) {
                        if (instance.getComponentId() == componentId) {
                            if (instance.getApi) {
                                return instance.getApi(getRegisteredType(requester));
                            } else {
                                return {};
                            }
                        }
                    }
                }
                return null;
            }
        };
        (function () {
            var direction = getDirection();
            var instanceId = instanceApi.getId();
            var hasExisting = !!sbox$getElement("gs_id" + instanceId);
            env = {
                hasExistingElements: function () {
                    return hasExisting;
                },
                get: function (idPrefix) {
                    return sbox$getElement(idPrefix + instanceId);
                },
                getForm: function () {
                    return form;
                },
                getDirection: function () {
                    return direction;
                },
                getInput: function () {
                    return input;
                }
            };
            if (config.useRegisteredComponents) {
                mergeRegisteredComponents();
            }
            instantiateAll(componentConfig);
            for (var idx = 0, type; (type = DEFAULT_TYPES[idx++]);) {
                if (!componentConfig[type]) {
                    instantiateSingle(type);
                }
            }
            instantiateAll(providedComponents);
            components.sort(compareComponentOrder);
            for (idx = 0; (type = components[idx++]);) {
                if (type.setup) {
                    type.setup(container);
                }
            }
            for (idx = 0; (type = components[idx++]);) {
                if (type.configure) {
                    type.configure(config);
                }
            }
            active = true;
        })();
        return container;
    }
    function sbox$Request(query, cursor, context) {
        function getQuery() {
            return query;
        }
        function getLowerCaseQuery() {
            return lowerCaseQuery;
        }
        function getNormalizedQuery() {
            return normalizedQuery;
        }
        function getCursor() {
            return cursor;
        }
        function getContext() {
            return context || "";
        }
        function getTimestamp() {
            return timestamp;
        }
        function setParameter(name, value) {
            setParameter_(name, value);
        }
        function setPersistentParameter(name, value) {
            setParameter_(name, value, true);
        }
        function disableCache() {
            if (!finalized) {
                modified = cacheDisabled = true;
            }
        }
        function setParameter_(name, value, persistent) {
            if (!finalized) {
                modified = true;
                parameters[name] = value;
                if (persistent) {
                    persistentParameters[name] = value;
                }
            }
        }
        var id = sbox$nextId();
        var lowerCaseQuery;
        var normalizedQuery;
        var parameters = {};
        var persistentParameters = {};
        var requestKey;
        var timestamp;
        var finalized = false;
        var modified = false;
        var cacheDisabled = false;
        var cacheWriteDisabled = false;
        var api = {
            getId: function () {
                return id;
            },
            getQuery: getQuery,
            getLowerCaseQuery: getLowerCaseQuery,
            getNormalizedQuery: getNormalizedQuery,
            getCursor: getCursor,
            getParameters: function () {
                return parameters;
            },
            getRequestKey: function () {
                return requestKey;
            },
            getContext: getContext,
            getTimestamp: getTimestamp,
            getSnapshot: function () {
                return {
                    getQuery: getQuery,
                    getLowerCaseQuery: getLowerCaseQuery,
                    getNormalizedQuery: getNormalizedQuery,
                    getCursor: getCursor,
                    getContext: getContext,
                    getTimestamp: getTimestamp,
                    setParameter: setParameter,
                    setPersistentParameter: setPersistentParameter,
                    disableCache: disableCache
                };
            },
            setParameter: setParameter,
            setPersistentParameter: setPersistentParameter,
            disableCache: disableCache,
            isCacheDisabled: function () {
                return cacheDisabled;
            },
            disableCacheWrite: function () {
                modified = cacheWriteDisabled = true;
            },
            isEquivalent: function (otherQuery, otherCursor, otherContext) {
                return !modified && query == otherQuery && cursor.equals(otherCursor) && context == otherContext;
            },
            isCacheWriteDisabled: function () {
                return cacheWriteDisabled;
            },
            finalize: function () {
                if (!finalized) {
                    timestamp = sbox$now();
                    if (!("cp" in persistentParameters)) {
                        setPersistentParameter("cp", cursor.getPosition());
                    }
                    setParameter_("gs_id", id);
                    requestKey = sbox$buildQueryString(persistentParameters) + ":" + normalizedQuery;
                    modified = finalized = true;
                }
            }
        };
        lowerCaseQuery = query.toLowerCase();
        normalizedQuery = sbox$normalizeWhitespace(lowerCaseQuery);
        return api;
    }
    function sbox$Response(
        request,
        query,
        suggestions,
        metadata,
        countsAsCacheHit,
        cacheable,
        fromCache,
        postProcessed
    ) {
        function getQuery() {
            return query;
        }
        function getSuggestions() {
            return suggestions;
        }
        function hasSuggestions() {
            return !!suggestions && !!suggestions[0];
        }
        var isQueryResult = true;
        var minimalApi;
        var api = {
            getRequest: function () {
                return request;
            },
            getQuery: getQuery,
            getFirstSuggestion: function () {
                if (hasSuggestions()) {
                    return suggestions[0];
                } else {
                    return null;
                }
            },
            getSuggestions: getSuggestions,
            hasSuggestions: hasSuggestions,
            hasMetadata: function (key) {
                return !!metadata[key];
            },
            getMetadataNumber: function (key) {
                if (key in metadata) {
                    return metadata[key];
                } else {
                    return 0;
                }
            },
            getMetadataString: function (key) {
                if (key in metadata) {
                    return metadata[key];
                } else {
                    return "";
                }
            },
            getMetadataValue: function (key) {
                if (key in metadata) {
                    return metadata[key];
                } else {
                    return null;
                }
            },
            getMetadataCopy: function () {
                var copy = {};
                var key;
                for (key in metadata) {
                    copy[key] = metadata[key];
                }
                return copy;
            },
            countsAsCacheHit: function () {
                return countsAsCacheHit;
            },
            isCacheable: function () {
                return cacheable;
            },
            isFromCache: function () {
                return fromCache;
            },
            isPostProcessed: function () {
                return postProcessed;
            },
            markFromCache: function () {
                fromCache = true;
            },
            getType: function () {
                return isQueryResult;
            },
            getMinimalApi: function () {
                if (!minimalApi) {
                    minimalApi = {
                        getQuery: getQuery,
                        getSuggestions: getSuggestions
                    };
                }
                return minimalApi;
            }
        };
        if (suggestions) {
            if (suggestions.length && suggestions[0].getType() == 33) {
                cacheable = isQueryResult = false;
            }
        } else {
            suggestions = [];
        }
        return api;
    }
    function sbox$Suggestion(html, text, index, type, subtypes, annotations) {
        function hasAnySubtype(wanted) {
            if (subtypes) {
                for (var i = 0, subtype; (subtype = wanted[i++]);) {
                    if (sbox$indexOf(subtype, subtypes) != -1) {
                        return true;
                    }
                }
            }
            return false;
        }
        var isQueryType = false;
        var api = {
            getHtml: function () {
                return html;
            },
            getText: function () {
                return text;
            },
            getIndex: function () {
                return index;
            },
            getType: function () {
                return type;
            },
            getSubtypes: function () {
                return subtypes || [];
            },
            hasSubtype: function (subtype) {
                return !!subtypes && hasAnySubtype([subtype]);
            },
            hasAnySubtype: hasAnySubtype,
            getAnnotations: function () {
                return annotations || [];
            },
            isQueryType: function () {
                return isQueryType;
            }
        };
        switch (type) {
            case 0:
            case 38:
            case 39:
            case 400:
            case 35:
            case 33:
            case 41:
            case 34:
            case 44:
            case 45:
            case 40:
                isQueryType = true;
        }
        return api;
    }
    (function () {
        var WHITESPACE_RE = /\s/g;
        var IDEOGRAPHIC_SPACE_RE = /\u3000/g;
        var LEADING_SPACE_RE = /^\s/;
        var HAS_WHITESPACE_RE = /\s+/;
        var WHITESPACE_RUN_RE = /\s+/g;
        var TRIM_RE = /^\s+|\s+$/g;
        var BLANK_RE = /^\s+$/;
        var TAG_RE = /<[^>]*>/g;
        var NBSP_ENTITY_RE = /&nbsp;/g;
        var IDEOGRAPHIC_SPACE_ENTITY_RE = /&#x3000;/g;
        var HTML_ESCAPES = [
            /&/g,
            /&amp;/g,
            /</g,
            /&lt;/g,
            />/g,
            /&gt;/g,
            /"/g,
            /&quot;/g,
            /'/g,
            /&#39;/g,
            /{/g,
            /&#123;/g
        ];
        var head = document.getElementsByTagName("head")[0];
        var idCounter = 0;
        sbox$Range = function (start, end) {
            if (end === undefined) {
                end = start;
            }
            var getEnd = function () {
                return end;
            };
            return {
                getPosition: getEnd,
                getStart: function () {
                    return start;
                },
                getEnd: getEnd,
                hasSelection: function () {
                    return start < end;
                },
                equals: function (other) {
                    return other && start == other.getStart() && end == other.getEnd();
                }
            };
        };
        sbox$appendParam = function (name, value, buffer, allowEmpty) {
            if (value == null || value === "") {
                if (!allowEmpty) {
                    return;
                }
                value = "";
            }
            buffer.push(name + "=" + encodeURIComponent("" + value));
        };
        sbox$buildQueryString = function (params) {
            var buffer = [];
            var name;
            for (name in params) {
                sbox$appendParam(name, params[name], buffer);
            }
            return buffer.join("&");
        };
        sbox$isNonBlank = function (str) {
            return !!str && !BLANK_RE.test(str);
        };
        sbox$htmlEscape = function (str) {
            for (var n = HTML_ESCAPES.length, i = 0; i < n; i += 2) {
                str = str.replace(HTML_ESCAPES[i], HTML_ESCAPES[i + 1].source);
            }
            return str;
        };
        sbox$htmlUnescape = function (str) {
            for (var n = HTML_ESCAPES.length, i = 0; i < n; i += 2) {
                str = str.replace(HTML_ESCAPES[i + 1], HTML_ESCAPES[i].source);
            }
            str = str.replace(NBSP_ENTITY_RE, " ");
            return str.replace(IDEOGRAPHIC_SPACE_ENTITY_RE, "\u3000");
        };
        sbox$stripBoldTags = function (str) {
            return str.replace(sbox$BOLD_TAG_RE_, "");
        };
        sbox$stripTags = function (str) {
            return str.replace(TAG_RE, "");
        };
        sbox$escapeSpaces = function (str) {
            if (str && (str.indexOf(" ") > -1 || HAS_WHITESPACE_RE.test(str))) {
                str = str.replace(IDEOGRAPHIC_SPACE_RE, "&#x3000;");
                return str.replace(WHITESPACE_RE, "&nbsp;");
            } else {
                return str;
            }
        };
        sbox$normalizeWhitespace = function (str, trimBoth) {
            if (str && (str.indexOf(" ") > -1 || HAS_WHITESPACE_RE.test(str))) {
                str = str.replace(WHITESPACE_RUN_RE, " ");
                return str.replace(trimBoth ? TRIM_RE : LEADING_SPACE_RE, "");
            } else {
                return str;
            }
        };
        sbox$startsWith = function (str, prefix, ignoreCase) {
            if (ignoreCase) {
                str = str.toLowerCase();
                prefix = prefix.toLowerCase();
            }
            return prefix.length <= str.length && str.substring(0, prefix.length) == prefix;
        };
        sbox$clearTimeout = function (timer) {
            window.clearTimeout(timer);
        };
        sbox$noop = function () {};
        sbox$getHead = function () {
            return head;
        };
        sbox$nextId = function () {
            return (idCounter++).toString(36);
        };
        sbox$isPersonalType = function (type) {
            return sbox$PERSONAL_TYPE_RE_.test(type);
        };
        sbox$indexOf = function (item, arr) {
            if (arr.indexOf) {
                return arr.indexOf(item);
            }
            for (var i = 0, n = arr.length; i < n; ++i) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return -1;
        };
    })();
    (function () {
        function createElement(tagName, className) {
            var element = document.createElement(tagName);
            if (className) {
                element.className = className;
            }
            return element;
        }
        function createDiv(className) {
            return createElement("div", className);
        }
        function findInput(form, name) {
            var inputs = form.getElementsByTagName("input");
            if (inputs) {
                for (var i = 0, candidate; (candidate = inputs[i++]);) {
                    if (candidate.name == name && candidate.type.toLowerCase() != "submit") {
                        return candidate;
                    }
                }
            }
            return null;
        }
        function preventDefault(event) {
            if (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                event.returnValue = false;
            }
            return false;
        }
        sbox$setCursorPosition = function (input, position) {
            if (input.setSelectionRange) {
                input.setSelectionRange(position, position);
            } else {
                var range = (input.ownerDocument || input.document).selection;
                if (range && range.createRange) {
                    range = range.createRange();
                    range.collapse(true);
                    range.moveEnd("character", position);
                    range.moveStart("character", position);
                    range.select();
                }
            }
        };
        sbox$getSelectionRange = function (input) {
            try {
                var start;
                var end;
                if ("selectionStart" in input) {
                    start = input.selectionStart;
                    end = input.selectionEnd;
                } else {
                    var inputRange = input.createTextRange();
                    var selectionRange = (input.ownerDocument || input.document).selection.createRange();
                    if (inputRange.inRange(selectionRange)) {
                        inputRange.setEndPoint("EndToStart", selectionRange);
                        start = inputRange.text.length;
                        inputRange.setEndPoint("EndToEnd", selectionRange);
                        end = inputRange.text.length;
                    }
                }
                if (start !== undefined) {
                    return sbox$Range(start, end);
                }
            } catch (n) {}
            return null;
        };
        sbox$getOffset = function (element, stopAt) {
            var top = 0;
            var left = 0;
            for (; element && (!stopAt || element != stopAt);) {
                top += element.offsetTop;
                left += element.offsetLeft;
                try {
                    element = element.offsetParent;
                } catch (j) {
                    element = null;
                }
            }
            return {
                topPx: top,
                leftPx: left
            };
        };
        sbox$isUpDownKey = function (keyCode) {
            return keyCode == 38 || keyCode == 40;
        };
        sbox$getElement = function (id) {
            return document.getElementById(id);
        };
        sbox$createElement = createElement;
        sbox$createTable = function () {
            var table = createElement("table");
            table.cellPadding = table.cellSpacing = 0;
            table.style.width = "100%";
            return table;
        };
        sbox$createDiv = createDiv;
        sbox$createOverlayDiv = function (className, zIndex) {
            var div = createDiv(className);
            var style = div.style;
            style.background = "transparent";
            style.color = "#000";
            style.padding = 0;
            style.position = "absolute";
            style.top = "1px";
            if (zIndex) {
                style.zIndex = zIndex;
            }
            style.whiteSpace = "pre";
            return div;
        };
        sbox$setInnerHtml = function (element, html) {
            if (element.innerHTML != html) {
                if (html) {
                    if (sbox$IE_LE7) {
                        html = sbox$escapeSpaces(html);
                    } else if (sbox$IE_LE8) {
                        html = ['<pre style="font:inherit;margin:0">', html, "</pre>"].join("");
                    }
                }
                element.innerHTML = html;
            }
        };
        sbox$appendSpan = function (html, parent) {
            var span = createElement("span");
            span.innerHTML = html;
            parent.appendChild(span);
            return span;
        };
        sbox$addHiddenInput = function (form, name, value) {
            if (findInput(form, name)) {
                return null;
            }
            var input = createElement("input");
            input.type = "hidden";
            input.name = name;
            if (value) {
                input.value = value;
            }
            return form.appendChild(input);
        };
        sbox$findInput = findInput;
        sbox$dispatchEscapeKey = function (target) {
            var event = document.createEvent("KeyboardEvent");
            event.initKeyEvent("keypress", true, true, null, false, false, true, false, 27, 0);
            target.dispatchEvent(event);
        };
        sbox$preventDefault = preventDefault;
        sbox$stopEvent = function (event) {
            if ((event = event || window.event)) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                event.cancelBubble = event.cancel = true;
            }
            return preventDefault(event);
        };
        sbox$insertAfter = function (element, reference) {
            reference.parentNode.insertBefore(element, reference.nextSibling);
        };
        sbox$appendFeelingLuckyLink = function (row) {
            var row = row.insertCell(-1);
            var link = sbox$createElement("a");
            link.href = "#ifl";
            link.className = "gssb_j gss_ifl";
            row.appendChild(link);
            return link;
        };
        sbox$getComputedStyle = function (element, property) {
            var style = window.getComputedStyle ? window.getComputedStyle(element, "") : element.currentStyle;
            if (style) {
                return style[property];
            } else {
                return null;
            }
        };
        sbox$getViewportSize = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            if (!width) {
                var docEl = document.documentElement;
                if (docEl) {
                    width = docEl.clientWidth;
                    height = docEl.clientHeight;
                }
                if (!width) {
                    width = document.body.clientWidth;
                    height = document.body.clientHeight;
                }
            }
            return {
                viewportWidth: width,
                viewportHeight: height
            };
        };
        sbox$resetInputStyle = function (input) {
            input = input.style;
            input.border = "none";
            input.padding = 0;
            input.margin = 0;
            input.height = "";
            if (sbox$OPERA || sbox$IE) {
                input.paddingLeft = "3px";
                input.paddingRight = "1px";
            } else {
                input.paddingLeft = "2px";
            }
        };
        sbox$indexByKey = function (renderers) {
            var byType = {};
            if (renderers) {
                for (var i = 0, renderer; (renderer = renderers[i++]);) {
                    byType[renderer.getSuggestionType()] = renderer;
                }
            }
            return byType;
        };
    })();
    sbox$registry.registerSingleton(150, 95, function () {
        function bold(query, text) {
            text = sbox$htmlEscape(sbox$stripBoldTags(text));
            query = sbox$htmlEscape(sbox$normalizeWhitespace(query, true));
            if (sbox$startsWith(text, query)) {
                return [query, "<b>", text.substr(query.length), "</b>"].join("");
            }
            var word = [];
            var words = [];
            var last = text.length - 1;
            for (var i = 0, start = -1, ch; (ch = text.charAt(i)); ++i) {
                if (ch == " " || ch == "\t") {
                    if (word.length) {
                        words.push({
                            word: word.join(""),
                            startIndex: start,
                            endIndex: i + 1
                        });
                        word = [];
                        start = -1;
                    }
                } else {
                    word.push(ch);
                    if (start == -1) {
                        start = i;
                    } else if (i == last) {
                        words.push({
                            word: word.join(""),
                            startIndex: start,
                            endIndex: i + 1
                        });
                    }
                }
            }
            word = query.split(/\s+/);
            i = {};
            for (last = 0; (start = word[last++]);) {
                i[start] = 1;
            }
            ch = -1;
            var word = [];
            var lastWord = words.length - 1;
            for (var last = 0; (start = words[last]); ++last) {
                if (i[start.word]) {
                    start = ch == -1;
                    if (last == lastWord) {
                        word.push({
                            startIndex: start ? last : ch,
                            endIndex: last
                        });
                    } else if (start) {
                        ch = last;
                    }
                } else if (ch > -1) {
                    word.push({
                        startIndex: ch,
                        endIndex: last - 1
                    });
                    ch = -1;
                }
            }
            if (!word.length) {
                return ["<b>", text, "</b>"].join("");
            }
            last = [];
            for (i = start = 0; (ch = word[i]); ++i) {
                if ((lastWord = words[ch.startIndex].startIndex)) {
                    last.push("<b>", text.substring(start, lastWord - 1), "</b> ");
                }
                start = words[ch.endIndex].endIndex;
                last.push(text.substring(lastWord, start));
            }
            if (start < text.length) {
                last.push("<b>", text.substring(start), "</b> ");
            }
            return last.join("");
        }
        return {
            getType: function () {
                return 150;
            },
            getComponentId: function () {
                return 95;
            },
            getApi: function () {
                return {
                    bold: bold
                };
            }
        };
    });
    sbox$registry.register(146, 12, function () {
        function normalizeKana(text) {
            text = replaceAll(text, FULLWIDTH_ASCII_RE, fullwidthToAscii);
            text = replaceAll(text, HALFWIDTH_KATAKANA_RE, halfwidthKatakanaToFullwidth);
            return replaceAll(text, COMBINING_MARKS_RE, combineVoicedMarks);
        }
        function replaceAll(text, pattern, replacer) {
            for (var match, parts, lastIndex = 0; (match = pattern.exec(text)) != null;) {
                if (!parts) {
                    parts = [];
                }
                if (lastIndex < match.index) {
                    parts.push(text.substring(lastIndex, match.index));
                }
                parts.push(replacer(match[0]));
                lastIndex = pattern.lastIndex;
            }
            if (!parts) {
                return text;
            }
            if (lastIndex < text.length) {
                parts.push(text.substring(lastIndex));
            }
            return parts.join("");
        }
        function fullwidthToAscii(ch) {
            return String.fromCharCode(ch.charCodeAt(0) - 65248);
        }
        function halfwidthKatakanaToFullwidth(ch) {
            var code = ch.charCodeAt(0);
            if (ch.length == 1) {
                return HALFWIDTH_MAP.charAt(code - 65377);
            } else if (ch.charCodeAt(1) == 65438) {
                return VOICED_MAP.charAt(code - 65395);
            } else {
                return SEMIVOICED_MAP.charAt(code - 65418);
            }
        }
        function combineVoicedMarks(ch) {
            var code = ch.charCodeAt(0);
            if (ch.charCodeAt(1) == 12443) {
                return COMBINED_VOICED_MAP.charAt(code - 12454);
            } else {
                return COMBINED_SEMIVOICED_MAP.charAt(code - 12495);
            }
        }
        function katakanaString(codes) {
            return eval('"\\u30' + codes.split(",").join("\\u30") + '"');
        }
        var HALFWIDTH_MAP = katakanaString(
            "02,0C,0D,01,FB,F2,A1,A3,A5,A7,A9,E3,E5,E7,C3,FC,A2,A4,A6,A8,AA,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CA,CB,CC,CD,CE,CF,D2,D5,D8,DB,DE,DF,E0,E1,E2,E4,E6,E8,E9,EA,EB,EC,ED,EF,F3,9B,9C"
        );
        var VOICED_MAP = katakanaString("F4__,AC,AE,B0,B2,B4,B6,B8,BA,BC,BE,C0,C2,C5,C7,C9_____,D0,D3,D6,D9,DC");
        var SEMIVOICED_MAP = katakanaString("D1,D4,D7,DA,DD");
        var COMBINED_VOICED_MAP = katakanaString(
            "F4____,AC_,AE_,B0_,B2_,B4_,B6_,B8_,BA_,BC_,BE_,C0_,C2__,C5_,C7_,C9______,D0__,D3__,D6__,D9__,DC"
        );
        var COMBINED_SEMIVOICED_MAP = katakanaString("D1__,D4__,D7__,DA__,DD");
        var FULLWIDTH_ASCII_RE = /[\uFF01-\uFF5E]/g;
        var HALFWIDTH_KATAKANA_RE = RegExp("([ｳｶ-ﾄﾊ-ﾎ]ﾞ)|([ﾊ-ﾎ]ﾟ)|([｡-ﾟ])", "g");
        var voicedPattern =
            "([" +
            katakanaString("A6,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CF,D2,D5,D8,DB") +
            "]゛)|([" +
            katakanaString("CF,D2,D5,D8,DB") +
            "]゜)";
        var COMBINING_MARKS_RE = RegExp(voicedPattern, "g");
        return {
            getType: function () {
                return 146;
            },
            getComponentId: function () {
                return 12;
            },
            getApi: function () {
                return {
                    normalizeKana: normalizeKana
                };
            }
        };
    });
    function sbox$StyleSheet(parent, enabled) {
        function addRule(selector, declarations) {
            if (enabled) {
                rules.push(selector, "{", declarations, "}");
            }
        }
        var vendorPrefix = sbox$GECKO ? "-moz-" : sbox$IE ? "-ms-" : sbox$OPERA ? "-o-" : sbox$WEBKIT ? "-webkit-" : "";
        var supportsFilter = document.body.style.filter != undefined;
        var rules = [];
        var api = {
            addRule: addRule,
            install: function () {
                if (enabled && rules.length) {
                    enabled = false;
                    var style = sbox$createElement("style");
                    style.setAttribute("type", "text/css");
                    (parent || sbox$getHead()).appendChild(style);
                    var css = rules.join("");
                    rules = null;
                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                }
            },
            getOpacityCss: function (opacity) {
                if (supportsFilter) {
                    return [
                        "filter:",
                        sbox$IE_LE7 ? "progid:DXImageTransform.Microsoft.Alpha(" : "alpha(",
                        "opacity=",
                        Math.floor(opacity * 100),
                        ");"
                    ].join("");
                } else {
                    return "opacity:" + opacity + ";";
                }
            },
            prefix: function (property, value) {
                var parts = [property, value || ""];
                if (vendorPrefix) {
                    parts = parts.concat(value ? [property, vendorPrefix, value] : [vendorPrefix, property]);
                }
                return parts.join("");
            }
        };
        addRule("table.gsc_a, table.gsc_a td", "border:0;padding:0");
        addRule(
            ".gsc_b",
            'background: url("//www.google.com/images/experiments/wavy-underline.png") repeat-x scroll 0 100% transparent;color:#fff;display:inline-block;line-height:1.05em;padding:0 0 3px'
        );
        return api;
    }
    sbox$registry.register(147, 10, function () {
        function measureWidth(text) {
            var width = 0;
            if (text) {
                if (!measurer) {
                    createMeasurer();
                }
                resetCacheIfFontChanged();
                if (text in widthCache) {
                    width = widthCache[text];
                } else {
                    sbox$setInnerHtml(measurer, sbox$htmlEscape(text));
                    widthCache[text] = width = measurer.offsetWidth;
                    sbox$setInnerHtml(measurer, "");
                }
            }
            return width;
        }
        function measureHeight() {
            if (!measurer) {
                createMeasurer();
            }
            resetCacheIfFontChanged();
            if (!lineHeight) {
                sbox$setInnerHtml(measurer, "|");
                lineHeight = measurer.offsetHeight;
            }
            return lineHeight;
        }
        function createMeasurer() {
            measurer = sbox$createOverlayDiv(config.overlayClassName);
            measurer.style.visibility = "hidden";
            container.appendChild(measurer);
        }
        function resetCacheIfFontChanged() {
            var currentFontSize = sbox$getComputedStyle(measurer, "fontSize");
            if (!fontSize || currentFontSize != fontSize) {
                widthCache = {};
                lineHeight = null;
                fontSize = currentFontSize;
            }
        }
        var config;
        var container;
        var measurer;
        var widthCache;
        var lineHeight;
        var fontSize;
        return {
            init: function (env) {
                container = env.getForm() || document.body;
            },
            configure: function (cfg) {
                config = cfg;
            },
            getType: function () {
                return 147;
            },
            getComponentId: function () {
                return 10;
            },
            getApi: function () {
                return {
                    getWidth: measureWidth,
                    getHeight: measureHeight
                };
            }
        };
    });
    function sbox$Callbacks(callbacks) {
        var hooks;
        (function () {
            var noop = function () {};
            if (!callbacks) {
                callbacks = {};
            }
            var getHook = function (letter) {
                return callbacks[letter] || noop;
            };
            hooks = {
                getBrowserFlags: getHook("a"),
                search: getHook("b"),
                hookC: getHook("c"),
                hookD: getHook("d"),
                hookE: getHook("e"),
                onQueryChanged: getHook("f"),
                onTextSet: getHook("g"),
                onQueryRestored: getHook("h"),
                onDeleteAtEnd: getHook("i"),
                onResponse: getHook("j"),
                onSuggestionSelected: getHook("k"),
                onRequestSent: getHook("l"),
                onBeforeRequest: getHook("m"),
                onCacheHitRatio: getHook("n"),
                onDropdownShown: getHook("o"),
                onDropdownHidden: getHook("p"),
                hookQ: getHook("q"),
                onStyleSheet: getHook("r"),
                hookS: getHook("s"),
                hookT: getHook("t"),
                onFocus: getHook("u"),
                hookV: getHook("v"),
                onHighlight: getHook("w"),
                onClear: getHook("x"),
                onCompositionStart: getHook("z"),
                onCompositionEnd: getHook("aa")
            };
        })();
        return {
            getBrowserFlags: function () {
                return hooks.getBrowserFlags();
            },
            search: function (query, searchType) {
                hooks.search(query, searchType);
            },
            hookC: function (arg) {
                hooks.hookC(arg);
            },
            hookD: function (arg) {
                hooks.hookD(arg);
            },
            hookE: function (arg) {
                return hooks.hookE(arg);
            },
            onQueryChanged: function (query) {
                hooks.onQueryChanged(query);
            },
            onTextSet: function (text) {
                hooks.onTextSet(text);
            },
            onQueryRestored: function (query) {
                hooks.onQueryRestored(query);
            },
            onDeleteAtEnd: function (text) {
                hooks.onDeleteAtEnd(text);
            },
            onResponse: function (response, relevant) {
                hooks.onResponse(response, relevant);
            },
            onSuggestionSelected: function (query, suggestion) {
                hooks.onSuggestionSelected(query, suggestion);
            },
            onRequestSent: function () {
                hooks.onRequestSent();
            },
            onBeforeRequest: function (imeKeyDown) {
                hooks.onBeforeRequest(imeKeyDown);
            },
            onCacheHitRatio: function (ratio) {
                hooks.onCacheHitRatio(ratio);
            },
            onDropdownShown: function () {
                hooks.onDropdownShown();
            },
            onDropdownHidden: function () {
                hooks.onDropdownHidden();
            },
            hookQ: function (arg) {
                hooks.hookQ(arg);
            },
            onStyleSheet: function (styleSheet) {
                hooks.onStyleSheet(styleSheet);
            },
            hookS: function (arg) {
                hooks.hookS(arg);
            },
            hookT: function () {
                hooks.hookT();
            },
            onFocus: function () {
                hooks.onFocus();
            },
            hookV: function () {
                hooks.hookV();
            },
            onHighlight: function (text) {
                hooks.onHighlight(text);
            },
            onClear: function () {
                hooks.onClear();
            },
            onCompositionStart: function () {
                hooks.onCompositionStart();
            },
            onCompositionEnd: function () {
                hooks.onCompositionEnd();
            }
        };
    }
    sbox$registry.register(149, 6, function () {
        function configure(cfg) {
            config = cfg;
            if (cfg.transportType == 0) {
                cfg = serverInfo.getServerInfo();
                protocol = cfg.protocol;
                host = cfg.host;
                path = cfg.requestPath;
                extraQuery = cfg.extraQuery;
                isHttps = document.location.protocol == "https:";
                setResponseCallback(dispatchResponse);
                new Image().src = protocol + host + "/generate_204";
            }
        }
        function sendRequest(request, extraParams, unused, unusedToo) {
            var requestId = request.getId();
            var query = request.getQuery();
            if (!config.keepPendingRequests) {
                cancelAll();
            }
            var extraParams = [
                protocol,
                host,
                path,
                "?",
                extraQuery ? extraQuery + "&" : "",
                extraParams ? extraParams + "&" : ""
            ].join("");
            var append = sbox$appendParam;
            var request = [];
            append("q", query, request, true);
            if (!config.useAcCallback) {
                append("callback", "google.sbox.p" + instanceId, request);
            }
            if (isHttps) {
                var query = [];
                for (var paddingLength = 4 + Math.floor(Math.random() * 32), i = 0, charCode; i < paddingLength; ++i) {
                    charCode =
                        Math.random() < 0.3
                            ? 48 + Math.floor(Math.random() * 10)
                            : (Math.random() > 0.5 ? 65 : 97) + Math.floor(Math.random() * 26);
                    query.push(String.fromCharCode(charCode));
                }
                append("gs_gbg", query.join(""), request);
            }
            append = sbox$createElement("script");
            append.src = extraParams + request.join("&");
            scripts[requestId] = append;
            responseHandler = config.keepPendingRequests ? unusedToo : unused;
            head.appendChild(append);
            return true;
        }
        function getTransportType() {
            return 0;
        }
        function getFailedCount() {
            return 0;
        }
        function removeScript(requestId) {
            var script = scripts[requestId];
            if (script) {
                head.removeChild(script);
                delete scripts[requestId];
            }
        }
        function cancelAll() {
            for (var requestId in scripts) {
                head.removeChild(scripts[requestId]);
            }
            scripts = {};
            responseHandler = null;
        }
        function dispatchResponse(response) {
            if (responseHandler) {
                responseHandler(response, false);
            }
        }
        function setResponseCallback(callback) {
            if (!callback) {
                callback = sbox$noop;
            }
            var google = window.google;
            if (config.useAcCallback) {
                google.ac.h = callback;
            } else {
                google.sbox["p" + instanceId] = callback;
            }
        }
        var head = sbox$getHead();
        var serverInfo;
        var instanceId;
        var protocol;
        var host;
        var path;
        var extraQuery;
        var isHttps;
        var config;
        var scripts = {};
        var responseHandler;
        var component = {
            setup: function (container) {
                serverInfo = container.get(127, component);
                instanceId = container.getInstanceApi().getId();
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 149;
            },
            getComponentId: function () {
                return 6;
            },
            getApi: function () {
                return {
                    sendRequest: sendRequest,
                    cancelRequest: removeScript,
                    clearCache: sbox$noop,
                    getTransportType: getTransportType,
                    getFailedCount: getFailedCount
                };
            },
            deactivate: function () {
                setResponseCallback(null);
                cancelAll();
            }
        };
        return component;
    });
    sbox$registry.register(145, 1, function () {
        function isMixedDirection(text) {
            if (!supported) {
                return true;
            }
            var hasRtl = false;
            var hasLtr = false;
            for (var i = 0, ch; i < text.length; ++i) {
                ch = text.charAt(i);
                if (
                    !NEUTRAL_RE.test(ch) &&
                    (LTR_START_RE.test(ch) ? (hasLtr = true) : (hasRtl = true), hasLtr && hasRtl)
                ) {
                    return true;
                }
            }
            return false;
        }
        function isDirectionCompatible(direction, prefix, suffix) {
            if (!supported) {
                return true;
            }
            var suffixStartsLtr = LTR_FIRST_RE.test(suffix);
            var prefixEndsLtr = LTR_LAST_RE.test(prefix);
            if (direction == "ltr") {
                return suffixStartsLtr || prefixEndsLtr || NEUTRAL_RE.test(suffix) || NEUTRAL_RE.test(prefix);
            } else {
                return !suffixStartsLtr || !prefixEndsLtr;
            }
        }
        function detectDirection(text) {
            var direction = defaultDirection;
            if (supported) {
                if (LTR_START_RE.test(text)) {
                    direction = "ltr";
                } else if (!NEUTRAL_RE.test(text)) {
                    direction = "rtl";
                }
            }
            return direction;
        }
        var NEUTRAL_RE = RegExp("^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$");
        var LTR_START_RE = RegExp(
            "^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*(?:\\d[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])"
        );
        var LTR_FIRST_RE = RegExp("^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*(?:\\d|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])");
        var LTR_LAST_RE = RegExp("(?:\\d|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$");
        var supported = LTR_START_RE.test("x");
        var defaultDirection;
        return {
            init: function (env) {
                defaultDirection = env.getDirection();
            },
            getType: function () {
                return 145;
            },
            getComponentId: function () {
                return 1;
            },
            getApi: function () {
                return {
                    isMixedDirection: isMixedDirection,
                    isDirectionCompatible: isDirectionCompatible,
                    detectDirection: detectDirection
                };
            }
        };
    });
    sbox$registry.register(117, 2, function () {
        function addHandler(target, eventType, handler, priority, isAsync) {
            var handlers = getHandlers(target);
            if (!handlers) {
                handlers = {};
                registrations.push({
                    element: target,
                    handlersByType: handlers
                });
            }
            var list = handlers[eventType];
            if (!list) {
                list = handlers[eventType] = [];
                handlers = createDispatcher(eventType, list);
                if (typeof eventType != "string") {
                    target[eventType] = handlers;
                } else if (target.addEventListener) {
                    target.addEventListener(eventType, handlers, false);
                } else {
                    target["on" + eventType] = handlers;
                }
            }
            target = {
                handler: handler,
                priority: priority || 0
            };
            if (isAsync) {
                target.isAsync = true;
            }
            list.push(target);
            list.sort(comparePriority);
            handler.boundEventType = eventType;
        }
        function removeHandler(target, handler) {
            var list = getHandlers(target);
            if (list && (list = list[handler.boundEventType])) {
                for (var i = 0, entry; (entry = list[i++]);) {
                    if (entry.handler == handler) {
                        entry.isRemoved = true;
                        break;
                    }
                }
            }
        }
        function subscribe(eventType, handler, priority, isAsync) {
            addHandler(bus, eventType, handler, priority, isAsync);
        }
        function unsubscribe(handler) {
            removeHandler(bus, handler);
        }
        function fire(eventType, data) {
            var event = data || {};
            var dispatcher = bus[eventType];
            if (dispatcher) {
                dispatcher(event, event.eventType);
            }
        }
        function addDomListener(target, eventType, listener) {
            if (target.addEventListener) {
                target.addEventListener(eventType, listener, false);
            } else {
                target.attachEvent("on" + eventType, listener);
            }
        }
        function removeDomListener(target, eventType, listener) {
            if (target.removeEventListener) {
                target.removeEventListener(eventType, listener, false);
            } else {
                target.detachEvent("on" + eventType, listener);
            }
        }
        function defer(fn) {
            if (usePostMessage) {
                if (!deferQueue) {
                    deferQueue = [];
                    addDomListener(window, "message", handleMessage);
                }
                deferQueue.push(fn);
                fn = window.location.href;
                window.postMessage("sbox.df", /HTTPS?:\/\//i.test(fn) ? fn : "*");
            } else {
                window.setTimeout(fn, 0);
            }
        }
        function handleMessage(event) {
            if (deferQueue && event && event.source == window && event.data == "sbox.df" && deferQueue.length) {
                deferQueue.shift()();
                if (deferQueue && deferQueue.length) {
                    window.postMessage("sbox.df", window.location.href);
                }
            }
        }
        function createDispatcher(eventType, list) {
            return function (event, dispatchedType) {
                if (list.length) {
                    var data;
                    if (!(data = event)) {
                        data = {};
                        var windowEvent = window.event;
                        if (windowEvent) {
                            if (windowEvent.keyCode) {
                                data.keyCode = windowEvent.keyCode;
                            }
                            data.isFromWindowEvent = true;
                        }
                    }
                    data.eventType = dispatchedType || eventType;
                    var windowEvent = data;
                    var result;
                    var hasRemoved;
                    for (var i = 0, entry; (entry = list[i++]);) {
                        if (entry.isRemoved) {
                            hasRemoved = true;
                        } else if (!result) {
                            if (entry.isAsync) {
                                runAsync(entry, windowEvent);
                            } else {
                                result = entry.handler(windowEvent);
                            }
                        }
                    }
                    if (hasRemoved) {
                        for (i = 0; (entry = list[i]);) {
                            if (entry.isRemoved) {
                                list.splice(i, 1);
                            } else {
                                ++i;
                            }
                        }
                    }
                    if (data.stopEvent) {
                        delete data.stopEvent;
                        if (data.isFromWindowEvent) {
                            data = window.event || data;
                        }
                        sbox$stopEvent(data);
                        return (data.returnValue = false);
                    }
                }
            };
        }
        function getHandlers(target) {
            for (var i = 0, registration; i < registrations.length; ++i) {
                registration = registrations[i];
                if (registration.element == target) {
                    return registration.handlersByType;
                }
            }
            return null;
        }
        function runAsync(entry, event) {
            defer(function () {
                entry.handler(event);
            });
        }
        function comparePriority(first, second) {
            return second.priority - first.priority;
        }
        var usePostMessage = window.postMessage && !sbox$IE && !sbox$SAFARI && !sbox$OPERA;
        var registrations = [];
        var bus = {};
        var deferQueue;
        return {
            getType: function () {
                return 117;
            },
            getComponentId: function () {
                return 2;
            },
            getApi: function () {
                return {
                    listen: addHandler,
                    unlisten: removeHandler,
                    subscribe: subscribe,
                    unsubscribe: unsubscribe,
                    fire: fire,
                    addDomListener: addDomListener,
                    removeDomListener: removeDomListener,
                    defer: defer
                };
            },
            deactivate: function () {
                deferQueue = null;
            }
        };
    });
    sbox$registry.register(118, 3, function () {
        function configure(cfg) {
            previousQueryCount = instanceApi.getInputMode();
            config = cfg;
            setTextSilently(input.getValue());
            composing = imeKeyDown = false;
        }
        function handleBlur() {
            var event = {};
            events.fire(14, event);
            if (!event.cancel && config.hideOnBlur) {
                dropdown.suspendAndHide();
            }
        }
        function handleFocus() {
            events.fire(13);
            callbacks.onFocus();
        }
        function handleLeftKey() {
            handleHorizontalKey("rtl");
        }
        function handleRightKey() {
            handleHorizontalKey("ltr");
        }
        function handleDownKey(cursor) {
            if (dropdown.hasSuggestions()) {
                dropdown.highlightNext();
            } else {
                dropdown.showOrRequest(cursor);
            }
        }
        function handleTabKey() {
            if (config.tabCompletionMode == 0) {
                return false;
            }
            var suggestion = getCompletableSuggestion();
            if (suggestion) {
                switch (config.tabCompletionMode) {
                    case 1:
                        return applySuggestion(suggestion, true);
                }
            }
            return false;
        }
        function handleEscapeKey() {
            if (config.searchOnEscape) {
                search(5);
            } else {
                if (dropdown.isVisible()) {
                    dropdown.suspendAndHide();
                } else {
                    blurInput();
                }
                restoreUserQuery();
            }
        }
        function handleDeleteKey(cursor) {
            if (currentText && cursor.getPosition() == currentText.length) {
                events.fire(9);
                if (config.searchOnDeleteAtEnd) {
                    search(2);
                }
                callbacks.onDeleteAtEnd(currentText);
            }
        }
        function handleBackspaceKey(cursor) {
            if (chips && cursor.getPosition() == 0) {
                chips.fg();
            }
        }
        function handleInput(text, cursor, eventType, forceRequest) {
            if (config.reenableDropdownOnEmpty && !text) {
                dropdown.setEnabled(true);
            }
            if (config.showOnMouseDown && eventType == "mousedown" && !dropdown.isVisible()) {
                dropdown.showOrRequest(cursor);
            }
            var request;
            if (lastRequest && lastRequest.isEquivalent(text, cursor, eventType)) {
                request = lastRequest;
            } else {
                lastRequest = request = sbox$Request(text, cursor, eventType);
            }
            var cursor = false;
            var snapshot = request.getSnapshot();
            var lastResponse = component126.getLastResponse();
            if (requestFilters) {
                for (var idx = 0, filter; (filter = requestFilters[idx++]);) {
                    if (filter.filterRequest(snapshot, lastResponse)) {
                        cursor = true;
                    }
                }
            }
            forceRequest = cursor || forceRequest;
            if (text != currentText || eventType == "onremovechip") {
                setTextSilently(text);
                events.fire(1, {
                    eventType: eventType,
                    inputDirection: direction
                });
                callbacks.onQueryChanged(text);
                cursor = sbox$now();
                if (!firstInputTime) {
                    firstInputTime = cursor;
                }
                lastInputTime = cursor;
                if (sbox$isNonBlank(text)) {
                    forceRequest = true;
                } else if (!forceRequest) {
                    dropdown.clear();
                    requester.suspend();
                }
            }
            if (forceRequest) {
                if (imeKeyDown) {
                    request.setParameter("gs_is", 1);
                }
                callbacks.onBeforeRequest(imeKeyDown);
                text = request;
                dropdown.hideAfterDelay();
                requester.request(text);
                input.focus();
                lastRequest = null;
            }
            events.fire(2, {
                eventType: eventType
            });
        }
        function setImeKeyDown(down) {
            imeKeyDown = down;
        }
        function setComposing(isComposing) {
            if (composing != isComposing) {
                if ((composing = isComposing)) {
                    callbacks.onCompositionStart();
                } else {
                    callbacks.onCompositionEnd();
                }
            }
        }
        function setInputText(text) {
            setText(text);
        }
        function focusInput() {
            input.focus();
        }
        function blurInput() {
            input.blur();
        }
        function isInputFocused() {
            return input.isFocused();
        }
        function setQuery(text, forceRequest) {
            if (sbox$startsWith(text, currentText, true)) {
                text = currentText + text.substr(currentText.length);
            }
            var cursor = sbox$Range(text.length);
            handleInput(text, cursor, "", forceRequest);
            setText(text, true);
        }
        function setQueryFromSuggestion(text) {
            setQuery(text, true);
            lastSuggestionInsertTime = sbox$now();
        }
        function handleChipRemoved() {
            handleInput(currentText, getCursor(), "onremovechip");
        }
        function showText(text) {
            setTextSilently(text);
            input.refresh();
            events.fire(4, {
                inputDirection: direction,
                input: text
            });
        }
        function selectInput() {
            input.select();
        }
        function restoreUserQuery() {
            if (currentText != userQuery) {
                setTextSilently(userQuery);
            }
            events.fire(5, {
                input: userQuery,
                eventSuggestions: dropdown.getSuggestions(),
                inputDirection: direction
            });
            input.refresh();
            callbacks.onQueryRestored(userQuery);
        }
        function saveUserQuery() {
            userQuery = currentText;
        }
        function getInputValue() {
            return input.getChipContainer();
        }
        function getUserQuery() {
            return userQuery;
        }
        function getCurrentText() {
            return currentText;
        }
        function getDirection() {
            return direction;
        }
        function getCursor() {
            return input.getCursor();
        }
        function getInputSelection() {
            return input.getOffset();
        }
        function getHeight() {
            return input.getHeight();
        }
        function getWidth() {
            return input.getWidth();
        }
        function getFirstInputTime() {
            return firstInputTime;
        }
        function getLastInputTime() {
            return lastInputTime;
        }
        function getLastSuggestionInsertTime() {
            return lastSuggestionInsertTime;
        }
        function hasPreviousQueries() {
            return previousQueryCount != 0;
        }
        function isAnyProviderEnabled() {
            for (var idx = 0, provider; (provider = providers[idx++]);) {
                if (provider.isEnabled()) {
                    return true;
                }
            }
            return false;
        }
        function isCompletion(text) {
            var prefixLength = currentText.length;
            var prefix = text.substr(0, prefixLength);
            var text = text.substr(prefixLength);
            return !!text && prefix == currentText && bidi.isDirectionCompatible(direction, currentText, text);
        }
        function inputPc() {
            input.preventNextDeactivate();
        }
        function search(searchType) {
            searcher.search(currentText, searchType);
        }
        function clear(notify) {
            if (currentText) {
                currentText = userQuery = "";
                input.clear();
                events.fire(1);
                dropdown.clear();
                callbacks.onQueryChanged(currentText);
                if (notify) {
                    callbacks.onClear();
                }
            }
        }
        function resetTimers() {
            lastSuggestionInsertTime = lastInputTime = firstInputTime = 0;
        }
        function inputYd(color) {
            input.setBackground(color);
        }
        function completeWithSuggestion() {
            var suggestion = getCompletableSuggestion();
            if (suggestion) {
                applySuggestion(suggestion);
            }
        }
        function compareFilters(first, second) {
            return first.getPriority() - second.getPriority();
        }
        function handleHorizontalKey(keyDirection) {
            var position = getCursor().getPosition();
            if (direction == keyDirection) {
                if (dropdown.hasSuggestions() && position == currentText.length) {
                    if (dropdown.hasHighlight()) {
                        if (config.searchOnRightArrow) {
                            keyDirection = dropdown.getSelected();
                            searcher.search(keyDirection.getText(), 6);
                        }
                    } else if (config.completeOnRightArrow) {
                        handleTabKey();
                    }
                }
            } else if (chips && position == 0) {
                chips.fg();
            }
        }
        function getCompletableSuggestion() {
            if (dropdown.hasSuggestions()) {
                var suggestion = dropdown.hasHighlight() ? dropdown.getSelected() : dropdown.getFirstSuggestion();
                if (suggestion.isQueryType()) {
                    return suggestion;
                }
            }
            return null;
        }
        function applySuggestion(suggestion, request) {
            var text = suggestion.getText();
            if (userQuery != text) {
                saveUserQuery();
                if (request) {
                    setQuery(text, true);
                } else {
                    showText(text);
                }
                return true;
            } else {
                return false;
            }
        }
        function setText(text, silent) {
            currentText = text || "";
            updateDirection();
            input.refresh();
            if (!silent) {
                events.fire(4, {
                    inputDirection: direction,
                    input: currentText
                });
                callbacks.onTextSet(currentText);
            }
        }
        function updateDirection() {
            var newDirection = bidi.detectDirection(currentText);
            if (newDirection != direction) {
                input.setDirection(newDirection);
                direction = newDirection;
            }
        }
        function setTextSilently(text) {
            currentText = userQuery = text || "";
            updateDirection();
        }
        var input;
        var dropdown;
        var chips;
        var events;
        var searcher;
        var component126;
        var bidi;
        var requestFilters;
        var instanceApi;
        var callbacks;
        var requester;
        var providers;
        var userQuery;
        var currentText;
        var direction;
        var previousQueryCount;
        var firstInputTime;
        var lastInputTime;
        var lastSuggestionInsertTime;
        var imeKeyDown;
        var composing;
        var lastRequest;
        var config;
        var component = {
            setup: function (container) {
                chips = container.get(130, component);
                bidi = container.get(145, component);
                events = container.get(117, component);
                requester = container.get(123, component);
                searcher = container.get(121, component);
                requestFilters = container.getAllApis(156, component);
                component126 = container.get(126, component);
                container.get(127, component);
                dropdown = container.get(128, component);
                input = container.get(119, component);
                providers = container.getAllApis(160, component);
                instanceApi = container.getInstanceApi();
                callbacks = container.getCallbacks();
            },
            configure: function (cfg) {
                requestFilters.sort(compareFilters);
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 118;
            },
            getComponentId: function () {
                return 3;
            },
            getApi: function () {
                return {
                    handleBlur: handleBlur,
                    handleFocus: handleFocus,
                    handleLeftKey: handleLeftKey,
                    handleRightKey: handleRightKey,
                    handleDownKey: handleDownKey,
                    handleTabKey: handleTabKey,
                    handleEscapeKey: handleEscapeKey,
                    handleDeleteKey: handleDeleteKey,
                    handleBackspaceKey: handleBackspaceKey,
                    handleInput: handleInput,
                    setImeKeyDown: setImeKeyDown,
                    setComposing: setComposing,
                    setInputText: setInputText,
                    focusInput: focusInput,
                    blurInput: blurInput,
                    isInputFocused: isInputFocused,
                    setQuery: setQuery,
                    setQueryFromSuggestion: setQueryFromSuggestion,
                    handleChipRemoved: handleChipRemoved,
                    showText: showText,
                    selectInput: selectInput,
                    restoreUserQuery: restoreUserQuery,
                    saveUserQuery: saveUserQuery,
                    getChipContainer: getInputValue,
                    getUserQuery: getUserQuery,
                    getCurrentText: getCurrentText,
                    detectDirection: getDirection,
                    getCursor: getCursor,
                    getOffset: getInputSelection,
                    getHeight: getHeight,
                    getWidth: getWidth,
                    getFirstInputTime: getFirstInputTime,
                    getLastInputTime: getLastInputTime,
                    getLastSuggestionInsertTime: getLastSuggestionInsertTime,
                    hasPreviousQueries: hasPreviousQueries,
                    isAnyProviderEnabled: isAnyProviderEnabled,
                    isCompletion: isCompletion,
                    preventNextDeactivate: inputPc,
                    search: search,
                    clear: clear,
                    resetTimers: resetTimers,
                    setBackground: inputYd,
                    completeWithSuggestion: completeWithSuggestion
                };
            }
        };
        return component;
    });
    sbox$registry.register(120, 9, function () {
        function configure(cfg) {
            config = cfg;
            reset();
        }
        function getParameters(searchType) {
            var query = controller.getUserQuery();
            var selection = "f";
            if (responseState.isThrottled()) {
                selection = "o";
            } else if (dropdown.hasHighlight()) {
                selection = sbox$getSuggestionKey(dropdown.getSelected());
            }
            var hasE = "";
            var lastResponse = responseState.getLastResponse();
            if (lastResponse) {
                hasE = lastResponse.getMetadataValue("e") ? "1" : "";
            }
            lastResponse = "";
            if (searchType != undefined) {
                lastResponse = searchType + "";
            }
            searchType = "";
            if (config.logTimings) {
                searchType = sbox$now() - startTime;
                searchType = [
                    sinceStart(controller.getFirstInputTime()),
                    sinceStart(controller.getLastInputTime()),
                    requestCount,
                    searchType,
                    requester.getRequestCount(),
                    requester.getQueuedCount(),
                    requester.getDirectHitCount(),
                    requester.getSecondaryHitCount(),
                    requester.getCacheHitCount(),
                    requester.getIgnoredResponseCount(),
                    requester.getMaxLatency(),
                    requester.getTotalLatency(),
                    requester.getLatencyHistogram(),
                    requester.getResponseCount(),
                    sinceStart(controller.getLastSuggestionInsertTime())
                ].join("l");
            }
            var typeCounts = "";
            var suggestions = dropdown.getSuggestions();
            if (suggestions) {
                var typeCounts = {
                    parts: [],
                    currentKey: null,
                    count: 0
                };
                for (var n = suggestions.length, i = 0, isLast; i < n; ++i) {
                    isLast = i == n - 1;
                    var suggestion = suggestions[i];
                    var acc = typeCounts;
                    var key = renderersByType[suggestion.getType()].getLogKey();
                    if ((suggestion = sbox$encodeSubtypes(suggestion.getSubtypes()))) {
                        key += "-" + suggestion;
                    }
                    if (key != acc.currentKey) {
                        if (acc.count) {
                            acc.parts.push(acc.currentKey, acc.count);
                        }
                        acc.count = 0;
                        acc.currentKey = key;
                    }
                    ++acc.count;
                    if (isLast && acc.count) {
                        acc.parts.push(acc.currentKey, acc.count);
                    }
                }
                typeCounts = typeCounts.parts.join("");
            }
            return {
                oq: query,
                aq: selection,
                aqi: typeCounts,
                aql: hasE,
                gs_sm: lastResponse,
                gs_upl: searchType
            };
        }
        function reset() {
            startTime = sbox$now();
            ++requestCount;
            controller.resetTimers();
            requester.resetTimers();
        }
        function sinceStart(time) {
            return Math.max(time - startTime, 0);
        }
        var controller;
        var dropdown;
        var responseState;
        var requester;
        var renderersByType;
        var config;
        var requestCount = -1;
        var startTime;
        var component = {
            setup: function (container) {
                controller = container.get(118, component);
                dropdown = container.get(128, component);
                responseState = container.get(126, component);
                requester = container.get(123, component);
                renderersByType = sbox$indexByKey(container.getAllApis(152, component));
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 120;
            },
            getComponentId: function () {
                return 9;
            },
            getApi: function () {
                return {
                    getParameters: getParameters,
                    reset: reset
                };
            }
        };
        return component;
    });
    sbox$registry.register(121, 11, function () {
        function search(query, searchType) {
            if (sbox$isNonBlank(query) || (chips && chips.hasChips())) {
                if (sbox$isPersonalType(searchType)) {
                    if (form && !luckyInput) {
                        luckyInput = sbox$addHiddenInput(form, "btnI", "1");
                    }
                } else if (luckyInput) {
                    form.removeChild(luckyInput);
                    luckyInput = null;
                }
                callbacks.search(query, searchType);
                resetAfterSearch();
                events.fire(15, {
                    query: query
                });
            }
        }
        function callbackYb(arg) {
            callbacks.hookC(arg);
            resetAfterSearch();
        }
        function callbackZb(arg) {
            callbacks.hookD(arg);
            resetAfterSearch();
        }
        function callbackWb(arg) {
            callbacks.hookQ(arg);
            resetAfterSearch();
        }
        function callbackXb(arg) {
            return callbacks.hookE(arg);
        }
        function resetAfterSearch() {
            requester.suspend();
            requester.clearPendingRequest();
            stats.reset();
            dropdown.clear();
            if (controller.getUserQuery() != controller.getCurrentText()) {
                controller.saveUserQuery();
            }
            if (component139) {
                component139.clear();
            }
        }
        var chips;
        var events;
        var requester;
        var controller;
        var stats;
        var dropdown;
        var component139;
        var callbacks;
        var luckyInput;
        var form;
        var component = {
            init: function (env) {
                form = env.getForm();
            },
            setup: function (container) {
                chips = container.get(130, component);
                events = container.get(117, component);
                requester = container.get(123, component);
                controller = container.get(118, component);
                stats = container.get(120, component);
                dropdown = container.get(128, component);
                component139 = container.get(139, component);
                callbacks = container.getCallbacks();
            },
            getType: function () {
                return 121;
            },
            getComponentId: function () {
                return 11;
            },
            getApi: function () {
                return {
                    search: search,
                    hookC: callbackYb,
                    hookD: callbackZb,
                    hookQ: callbackWb,
                    hookE: callbackXb
                };
            }
        };
        return component;
    });
    sbox$registry.register(124, 14, function () {
        var TYPE;
        var SUBTYPES;
        var TEXT;
        var ANNOTATIONS;
        var METADATA;
        var QUERY;
        var SUGGESTIONS;
        function configure(cfg) {
            allowedTypes = cfg.allowedTypes;
            boldSuggestions = cfg.boldSuggestions;
        }
        function getRequestIdFromResponse(json) {
            return (json[METADATA] || {}).j;
        }
        function parseResponse(json, request) {
            var query = json[QUERY];
            var rawSuggestions = json[SUGGESTIONS];
            var metadata = {};
            var rawMetadata = json[METADATA];
            if (rawMetadata) {
                for (var key in rawMetadata) {
                    var value = rawMetadata[key];
                    if (key in metadataParsers) {
                        value = metadataParsers[key].parse(value);
                    }
                    metadata[key] = value;
                }
            }
            var rawMetadata = sbox$Response;
            var hasOther = false;
            var hasType33 = false;
            key = false;
            for (var value = 0, raw; (raw = rawSuggestions[value++]);) {
                if ((raw[TYPE] || 0) == 33) {
                    hasType33 = true;
                } else {
                    hasOther = true;
                }
                if (hasType33 && hasOther) {
                    key = true;
                    break;
                }
            }
            hasOther = 0;
            hasType33 = [];
            for (value = 0; (raw = rawSuggestions[value++]);) {
                var type = raw[TYPE] || 0;
                if (type in allowedTypes && (!key || type != 33)) {
                    var html;
                    html = raw[TEXT];
                    if (boldSuggestions) {
                        html = bolder.bold(query.toLowerCase(), sbox$stripTags(sbox$htmlUnescape(html)));
                    }
                    hasType33.push(
                        sbox$Suggestion(
                            html,
                            sbox$stripTags(sbox$htmlUnescape(html)),
                            hasOther++,
                            type,
                            sbox$parseSubtypes(raw[SUBTYPES]),
                            raw[ANNOTATIONS]
                        )
                    );
                }
            }
            return rawMetadata(request, query, hasType33, metadata, false, true, false, false);
        }
        QUERY = 0;
        SUGGESTIONS = 1;
        METADATA = 2;
        TEXT = 0;
        TYPE = 1;
        SUBTYPES = 2;
        ANNOTATIONS = 3;
        var allowedTypes;
        var bolder;
        var boldSuggestions;
        var metadataParsers = {};
        var component = {
            setup: function (container) {
                bolder = container.get(150, component);
                if ((container = container.getAllApis(158, component))) {
                    for (var i = 0, metadataParser; (metadataParser = container[i++]);) {
                        metadataParsers[metadataParser.getMetadataKey()] = metadataParser;
                    }
                }
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 124;
            },
            getComponentId: function () {
                return 14;
            },
            getApi: function () {
                return {
                    getRequestIdFromResponse: getRequestIdFromResponse,
                    parseResponse: parseResponse
                };
            }
        };
        return component;
    });
    sbox$registry.register(125, 15, function () {
        function handleResponse(response) {
            var relevant = isRelevant(response);
            if (relevant) {
                if (postProcessor && !response.isPostProcessed()) {
                    response = postProcessor.postProcess(response);
                }
                responseState.setLastResponse(response);
                var current = response;
                var query = current.getRequest().getQuery();
                var suggestions = current.getSuggestions();
                if (dropdown.isEnabled()) {
                    if (suggestions.length) {
                        current = current.getType() == false;
                        dropdown.showSuggestions(query, suggestions, current);
                    } else {
                        dropdown.clear();
                    }
                }
                events.fire(3, {
                    input: query,
                    eventSuggestions: suggestions
                });
            }
            callbacks.onResponse(response, relevant);
            return relevant;
        }
        function isRelevant(response) {
            var currentText = controller.getCurrentText();
            var lastResponse = responseState.getLastResponse();
            var currentText = currentText.toLowerCase();
            var responseQuery = response.getQuery().toLowerCase();
            if (currentText == responseQuery) {
                lastResponse = true;
            } else {
                currentText = sbox$normalizeWhitespace(currentText);
                response = (responseQuery = response.getRequest())
                    ? responseQuery.getNormalizedQuery()
                    : sbox$normalizeWhitespace(response.getQuery().toLowerCase());
                lastResponse = lastResponse ? lastResponse.getRequest().getNormalizedQuery() : "";
                lastResponse =
                    currentText.indexOf(response) == 0
                        ? currentText.indexOf(lastResponse) == 0
                            ? response.length >= lastResponse.length
                            : true
                        : false;
            }
            return lastResponse;
        }
        var events;
        var controller;
        var postProcessor;
        var responseState;
        var dropdown;
        var callbacks;
        var component = {
            setup: function (container) {
                events = container.get(117, component);
                controller = container.get(118, component);
                postProcessor = container.get(122, component);
                responseState = container.get(126, component);
                dropdown = container.get(128, component);
                callbacks = container.getCallbacks();
            },
            getType: function () {
                return 125;
            },
            getComponentId: function () {
                return 15;
            },
            getApi: function () {
                return {
                    handleResponse: handleResponse,
                    isRelevant: isRelevant
                };
            }
        };
        return component;
    });
    sbox$registry.register(123, 13, function () {
        function configure(cfg) {
            transport = serverConfig.getTransport();
            config = cfg;
            inFlight = {};
            minDelay = 0;
            bypassCache = cfg.bypassCache;
            requestsDisabled = cfg.requestsDisabled;
            suspended = false;
            cacheEnabled = config.useCache && !!cache;
        }
        function request(req, sendNow) {
            if (!requestsDisabled && (!chips || !chips.blocksRequests())) {
                req.setPersistentParameter("ds", config.dataSource);
                req.finalize();
                var shouldSend = true;
                suspended = false;
                ++requestCount;
                var now = sbox$now();
                var id;
                for (id in inFlight) {
                    var timestamp = inFlight[id].getTimestamp();
                    if (now - timestamp > 2500) {
                        cancelRequest(id);
                    }
                }
                if (cacheEnabled && (now = cache.get(req))) {
                    if ((shouldSend = bypassCache || req.isCacheDisabled()) && config.skipCacheWriteOnBypass) {
                        req.disableCacheWrite();
                    }
                    responseHandler.handleResponse(now);
                    if (now.countsAsCacheHit()) {
                        ++cacheHitCount;
                    }
                    clearPendingRequest();
                }
                if (shouldSend) {
                    pendingRequest = req;
                    if (!sendTimer || sendNow) {
                        sendPendingRequest();
                    }
                } else {
                    ++queuedCount;
                }
            }
        }
        function isThrottled() {
            if (inFlightCount >= 10 || transport.getFailedCount() >= 3) {
                return true;
            } else {
                return false;
            }
        }
        function suspend() {
            suspended = true;
        }
        function isSuspended() {
            return suspended;
        }
        function clearPendingRequest() {
            pendingRequest = null;
        }
        function getRequestCount() {
            return requestCount;
        }
        function getQueuedCount() {
            return queuedCount;
        }
        function getDirectHitCount() {
            if (cacheEnabled) {
                return cache.getDirectHitCount();
            } else {
                return -1;
            }
        }
        function getSecondaryHitCount() {
            if (cacheEnabled) {
                return cache.getSecondaryHitCount();
            } else {
                return -1;
            }
        }
        function getCacheHitCount() {
            return cacheHitCount;
        }
        function getResponseCount() {
            return responseCount;
        }
        function getIgnoredResponseCount() {
            return ignoredCount;
        }
        function getMaxLatency() {
            return maxLatency;
        }
        function isRelevant(json) {
            json = parseWithCurrentText(json, null);
            return responseHandler.isRelevant(json);
        }
        function getTotalLatency() {
            return totalLatency;
        }
        function getLatencyHistogram() {
            var parts = [];
            var zeroRun = 0;
            var count;
            for (var bucket = 0; bucket <= OVERFLOW_BUCKET; ++bucket) {
                count = latencyHistogram[bucket];
                if (count == 0) {
                    zeroRun++;
                } else {
                    zeroRun = zeroRun == 1 ? "0." : zeroRun > 1 ? bucket + "-" : "";
                    parts.push(zeroRun + count);
                    zeroRun = 0;
                }
            }
            return parts.join(".");
        }
        function clearCache() {
            if (cacheEnabled) {
                cache.clearCache_();
            }
        }
        function configureCache(type) {
            if (cacheEnabled) {
                cache.removeType(type);
            }
        }
        function parseResponseText(json, req) {
            return parseWithCurrentText(json, req);
        }
        function resetStats() {
            if (cacheEnabled) {
                cache.resetTimers();
            }
            totalLatency =
                maxLatency =
                ignoredCount =
                responseCount =
                cacheHitCount =
                inFlightCount =
                queuedCount =
                requestCount =
                    0;
            latencyHistogram = [];
            for (var bucket = 0; bucket <= OVERFLOW_BUCKET; ++bucket) {
                latencyHistogram[bucket] = 0;
            }
        }
        function createResponseCallback(req) {
            return function (json, fromCache) {
                handleResponse(json, fromCache, req);
            };
        }
        function sendPendingRequest() {
            sbox$clearTimeout(sendTimer);
            sendTimer = null;
            if (!(transport.getFailedCount() > 2) && pendingRequest) {
                var buffer = [];
                var params = pendingRequest.getParameters();
                if (params) {
                    for (var name in params) {
                        sbox$appendParam(name, params[name], buffer);
                    }
                }
                callbacks.onRequestSent();
                buffer = transport.sendRequest(
                    pendingRequest,
                    buffer.join("&"),
                    createResponseCallback(pendingRequest),
                    handleResponse
                );
                params = pendingRequest.isCacheWriteDisabled();
                if (buffer && !params) {
                    buffer = pendingRequest;
                    inFlight[buffer.getId()] = buffer;
                    ++inFlightCount;
                    ++queuedCount;
                }
                clearPendingRequest();
                buffer = 100;
                params = (inFlightCount - 2) / 2;
                for (name = 1; name++ <= params;) {
                    buffer *= 2;
                }
                if (buffer < minDelay) {
                    buffer = minDelay;
                }
                sendTimer = window.setTimeout(sendPendingRequest, buffer);
            }
        }
        function cancelRequest(requestId) {
            transport.cancelRequest(requestId);
            delete inFlight[requestId];
            if (inFlightCount) {
                --inFlightCount;
            }
        }
        function handleResponse(json, fromCache, req) {
            ++responseCount;
            if (!req && ((req = parser.getRequestIdFromResponse(json)), (req = inFlight[req]), !req)) {
                return;
            }
            if (!req.isCacheWriteDisabled()) {
                json = parseWithCurrentText(json, req);
                if (responseFilter) {
                    var currentText = controller.getCurrentText();
                    var json = responseFilter.filterResponse(json, currentText);
                }
                if (fromCache) {
                    json.markFromCache();
                }
                if (cacheEnabled) {
                    cache.put(json);
                }
                if (!suspended) {
                    if (!responseHandler.handleResponse(json)) {
                        ++ignoredCount;
                    }
                    fromCache = req;
                    minDelay = json.getMetadataNumber("d");
                    if (fromCache) {
                        cancelRequest(fromCache.getId());
                        fromCache = fromCache.getTimestamp();
                        fromCache = sbox$now() - fromCache;
                        totalLatency += fromCache;
                        maxLatency = Math.max(fromCache, maxLatency);
                        ++latencyHistogram[
                            fromCache > MAX_BUCKET_LATENCY
                                ? OVERFLOW_BUCKET
                                : LATENCY_BUCKETS[Math.floor(fromCache / 100)]
                        ];
                    }
                }
            }
        }
        function parseWithCurrentText(json, req) {
            var currentText = controller.getCurrentText();
            return parser.parseResponse(json, req, currentText);
        }
        var LATENCY_BUCKETS = [0, 1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8];
        var OVERFLOW_BUCKET = LATENCY_BUCKETS[LATENCY_BUCKETS.length - 1] + 1;
        var MAX_BUCKET_LATENCY = LATENCY_BUCKETS.length * 100 - 1;
        var cache;
        var chips;
        var transport;
        var controller;
        var parser;
        var responseHandler;
        var responseFilter;
        var serverConfig;
        var callbacks;
        var pendingRequest;
        var inFlight;
        var requestCount;
        var queuedCount;
        var inFlightCount;
        var cacheHitCount;
        var responseCount;
        var ignoredCount;
        var maxLatency;
        var totalLatency;
        var latencyHistogram;
        var minDelay;
        var sendTimer;
        var bypassCache;
        var requestsDisabled;
        var suspended;
        var cacheEnabled;
        var config;
        var component = {
            setup: function (container) {
                cache = container.get(133, component);
                chips = container.get(130, component);
                container.get(117, component);
                controller = container.get(118, component);
                parser = container.get(124, component);
                responseHandler = container.get(125, component);
                responseFilter = container.get(230, component);
                container.get(126, component);
                serverConfig = container.get(127, component);
                container.get(128, component);
                callbacks = container.getCallbacks();
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 123;
            },
            getComponentId: function () {
                return 13;
            },
            getApi: function () {
                return {
                    request: request,
                    isThrottled: isThrottled,
                    suspend: suspend,
                    isSuspended: isSuspended,
                    clearPendingRequest: clearPendingRequest,
                    getRequestCount: getRequestCount,
                    getQueuedCount: getQueuedCount,
                    getDirectHitCount: getDirectHitCount,
                    getSecondaryHitCount: getSecondaryHitCount,
                    getCacheHitCount: getCacheHitCount,
                    getResponseCount: getResponseCount,
                    getIgnoredResponseCount: getIgnoredResponseCount,
                    getMaxLatency: getMaxLatency,
                    isRelevant: isRelevant,
                    getTotalLatency: getTotalLatency,
                    getLatencyHistogram: getLatencyHistogram,
                    clearCache: clearCache,
                    configureCache: configureCache,
                    parseResponseText: parseResponseText,
                    resetTimers: resetStats
                };
            },
            deactivate: function () {
                sbox$clearTimeout(sendTimer);
                sendTimer = null;
                clearPendingRequest();
                inFlight = null;
                suspended = true;
            }
        };
        return component;
    });
    sbox$registry.register(126, 5, function () {
        function reset() {
            cachedCount = responseCount = 0;
            clearLastResponse();
        }
        function isThrottled() {
            return requester.isThrottled();
        }
        function setLastResponse(response) {
            lastResponse = response;
            ++responseCount;
            if (response.isFromCache()) {
                ++cachedCount;
            }
            if (callbacks.onCacheHitRatio) {
                callbacks.onCacheHitRatio(cachedCount / responseCount);
            }
        }
        function getLastResponse() {
            return lastResponse;
        }
        function clearLastResponse() {
            lastResponse = null;
        }
        var requester;
        var callbacks;
        var lastResponse;
        var responseCount;
        var cachedCount;
        var component = {
            setup: function (container) {
                requester = container.get(123, component);
                callbacks = container.getCallbacks();
            },
            configure: reset,
            activate: reset,
            getType: function () {
                return 126;
            },
            getComponentId: function () {
                return 5;
            },
            getApi: function () {
                return {
                    isThrottled: isThrottled,
                    setLastResponse: setLastResponse,
                    getLastResponse: getLastResponse,
                    clearLastResponse: clearLastResponse
                };
            }
        };
        return component;
    });
    sbox$registry.register(127, 16, function () {
        function configure(cfg) {
            var useHttps = document.location.protocol == "https:" || cfg.forceHttps;
            var append = sbox$appendParam;
            var params = [];
            append("client", cfg.client, params);
            append("pq", cfg.previousQuery, params);
            append("hl", cfg.language, params);
            append("gl", cfg.country, params);
            append("sugexp", cfg.experiment, params);
            append("gs_nf", 1, params);
            if (cfg.authuser) {
                append("authuser", cfg.authuser, params);
            }
            serverInfo = {
                protocol: "http" + (useHttps ? "s" : "") + "://",
                host: cfg.suggestHost || "clients1." + cfg.domain,
                requestPath: cfg.requestPath || "/complete/search",
                extraQuery: params.length ? params.join("&") : ""
            };
            if (!transport || transport.getTransportType() != cfg.transportType) {
                transport = transports[cfg.transportType];
            }
        }
        function getTransport() {
            return transport;
        }
        function getServerInfo() {
            return serverInfo;
        }
        function resetTransport() {
            if (transport) {
                transport.clearCache();
            }
        }
        var transports = {};
        var transport;
        var serverInfo;
        var component = {
            setup: function (container) {
                for (
                    var container = container.getAllApis(149, component), idx = 0, candidate;
                    (candidate = container[idx++]);
                ) {
                    transports[candidate.getTransportType()] = candidate;
                }
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 127;
            },
            getComponentId: function () {
                return 16;
            },
            getApi: function (requesterType) {
                return {
                    getTransport: requesterType == 123 ? getTransport : sbox$noop,
                    getServerInfo: getServerInfo,
                    resetTransport: resetTransport
                };
            }
        };
        return component;
    });
    sbox$registry.register(128, 17, function () {
        function configure(cfg) {
            config = cfg;
            selectedIndex = highlightIndex = null;
            state = State.EMPTY;
            visible = false;
            enabled = true;
        }
        function showSuggestions(inlineCompletion, newSuggestions, isInline) {
            inlineCompletion = inlineCompleter && inlineCompleter.ei(newSuggestions);
            clear();
            if ((suggestions = newSuggestions) && newSuggestions.length) {
                var direction = newSuggestions[0].getText();
                var direction = bidi.detectDirection(direction);
                var rendered = false;
                if (isInline) {
                    state = State.INLINE;
                    rendered = renderer.renderInline(newSuggestions, direction);
                    newSuggestions = newSuggestions[0].getAnnotations()[0];
                    newSuggestions = sbox$htmlUnescape(newSuggestions);
                    panel.setOffset(textMeasurer.getWidth(newSuggestions));
                } else {
                    state = State.LIST;
                    rendered = renderer.render(buildItems(), direction);
                    panel.setOffset(0);
                }
                if (inlineCompletion) {
                    selectedIndex = inlineCompleter.$h();
                    setHighlightIndex(inlineCompleter.Zh());
                }
                panel.setDirection(direction);
                if (rendered) {
                    show();
                } else {
                    clear();
                }
            }
        }
        function setHighlightIndex(index) {
            cancelClearTimer();
            if (highlightIndex != index) {
                var previous = highlightIndex;
                highlightIndex = index;
                updateHighlight(previous);
            }
        }
        function highlightNext() {
            if (hasSuggestions()) {
                if (visible) {
                    var previous = highlightIndex;
                    if (highlightIndex == suggestions.length - 1) {
                        selectedIndex = highlightIndex = null;
                    } else if (highlightIndex == null) {
                        highlightIndex = 0;
                    } else {
                        ++highlightIndex;
                    }
                    selectedIndex = highlightIndex;
                    moveHighlight(previous, highlightNext);
                } else {
                    show();
                }
            }
        }
        function highlightPrevious() {
            if (hasSuggestions()) {
                if (visible) {
                    var previous = highlightIndex;
                    if (!suggestions || highlightIndex == 0) {
                        selectedIndex = highlightIndex = null;
                    } else if (highlightIndex == null) {
                        highlightIndex = suggestions.length - 1;
                    } else {
                        --highlightIndex;
                    }
                    selectedIndex = highlightIndex;
                    moveHighlight(previous, highlightPrevious);
                } else {
                    show();
                }
            }
        }
        function submitSelection(shiftKey) {
            var searchType = shiftKey ? 4 : 3;
            if (hasHighlight()) {
                shiftKey = getSelected();
                if (!renderer.submitSelection(shiftKey)) {
                    controller.search(searchType);
                }
                searchType = controller.getUserQuery();
                callbacks.onSuggestionSelected(searchType, shiftKey);
            } else {
                controller.search(searchType);
            }
        }
        function selectIndex(index) {
            selectedIndex = highlightIndex = index;
            var index = suggestions[index];
            var query = controller.getUserQuery();
            callbacks.onSuggestionSelected(query, index);
        }
        function isVisible() {
            return visible;
        }
        function isEnabled() {
            return enabled;
        }
        function setEnabled(enable) {
            if (enabled && !enable) {
                clear();
            }
            enabled = enable;
        }
        function getState() {
            return state;
        }
        function getSuggestions() {
            return suggestions;
        }
        function getFirstSuggestion() {
            if (hasSuggestions()) {
                return suggestions[0];
            } else {
                return null;
            }
        }
        function getHighlightIndex() {
            return highlightIndex;
        }
        function getSelected() {
            if (hasHighlight()) {
                return suggestions[selectedIndex];
            } else {
                return null;
            }
        }
        function getSelectedIndex() {
            return selectedIndex;
        }
        function hasSuggestions() {
            return !!suggestions && !!suggestions.length;
        }
        function hasHighlight() {
            return selectedIndex != null;
        }
        function hideAfterDelay() {
            if (visible && !hideTimer) {
                hideTimer = window.setTimeout(clear, config.hideDelay);
            }
        }
        function show() {
            if (!visible) {
                panel.setPanel(17);
                panel.show();
                visible = true;
                callbacks.onDropdownShown();
            }
        }
        function hidePanel() {
            if (visible) {
                if (hideTimer) {
                    sbox$clearTimeout(hideTimer);
                    hideTimer = null;
                }
                panel.hidePanel();
                visible = false;
                callbacks.onDropdownHidden();
            }
        }
        function clear() {
            hidePanel();
            suggestions = null;
            state = State.EMPTY;
            if (highlightIndex != null) {
                renderer.unhighlight(highlightIndex);
            }
            selectedIndex = highlightIndex = null;
            renderer.clear();
        }
        function suspendAndHide() {
            requester.suspend();
            hidePanel();
        }
        function clearHighlight() {
            if (highlightIndex != null) {
                renderer.unhighlight(highlightIndex);
            }
            selectedIndex = highlightIndex = null;
        }
        function clearHighlightSoon() {
            cancelClearTimer();
            clearTimer = window.setTimeout(clearHighlight, 0);
        }
        function cancelPendingClear() {
            cancelClearTimer();
        }
        function showOrRequest(cursor) {
            if (hasSuggestions()) {
                show();
            } else {
                var query = controller.getUserQuery();
                if (query) {
                    cursor = cursor || controller.getCursor();
                    requester.request(sbox$Request(query, cursor));
                }
            }
        }
        function rendererFa() {
            return renderer.getElement();
        }
        function rendererUc() {
            return renderer.getAnchorElement();
        }
        function rendererLb() {
            renderer.updateLayout();
        }
        function getPanelId() {
            return 17;
        }
        function buildItems() {
            if (hasSuggestions() && state == State.LIST) {
                var items = [];
                for (
                    var messages = [], remaining = 0, provider;
                    (provider = messageProviders[remaining++]) &&
                    !provider.getMessage(controller.getUserQuery(), suggestions, messages);
                );
                if ((remaining = messages ? messages.length : 0)) {
                    remaining -= appendMessages(messages, items, 0);
                }
                for (provider = 0; provider < suggestions.length; ++provider) {
                    items.push(suggestions[provider]);
                }
                if (remaining) {
                    remaining -= appendMessages(messages, items, 1);
                }
                if (config.showSearchButtons) {
                    items.push(1);
                }
                if (remaining) {
                    appendMessages(messages, items, 2);
                }
                if (config.showFooter) {
                    items.push(2);
                }
                if (listDecorator) {
                    listDecorator.Yh(items);
                }
                return items;
            }
            return null;
        }
        function appendMessages(messages, items, position) {
            var count = 0;
            for (var idx = 0, message; idx < messages.length; ++idx) {
                if ((message = messages[idx]) && message.position == position) {
                    items.push(message);
                    ++count;
                }
            }
            return count;
        }
        function moveHighlight(previous, retry) {
            if (highlightIndex != null && !renderer.isSelectable(highlightIndex)) {
                renderer.unhighlight(previous);
                retry();
            } else {
                updateHighlight(previous);
                if (highlightIndex == null) {
                    controller.restoreUserQuery();
                } else {
                    var text = renderer.getInputText(suggestions[highlightIndex]);
                    controller.setInputText(text);
                    callbacks.onHighlight(text);
                }
            }
        }
        function updateHighlight(previous) {
            cancelClearTimer();
            if (previous != null) {
                renderer.unhighlight(previous);
            }
            if (highlightIndex != null) {
                renderer.highlight(highlightIndex);
            }
        }
        function cancelClearTimer() {
            if (clearTimer) {
                sbox$clearTimeout(clearTimer);
                clearTimer = null;
            }
        }
        var State = sbox$State;
        var renderer;
        var bidi;
        var panel;
        var requester;
        var controller;
        var textMeasurer;
        var messageProviders;
        var inlineCompleter;
        var listDecorator;
        var callbacks;
        var suggestions;
        var highlightIndex;
        var selectedIndex;
        var state;
        var visible;
        var enabled;
        var hideTimer;
        var clearTimer;
        var config;
        var component = {
            setup: function (container) {
                renderer = container.get(129, component);
                bidi = container.get(145, component);
                panel = container.get(115, component);
                requester = container.get(123, component);
                controller = container.get(118, component);
                textMeasurer = container.get(147, component);
                messageProviders = container.getAllApis(153, component);
                inlineCompleter = container.get(184, component);
                listDecorator = container.get(157, component);
                callbacks = container.getCallbacks();
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 128;
            },
            getComponentId: function () {
                return 17;
            },
            getApi: function () {
                return {
                    showSuggestions: showSuggestions,
                    setHighlightIndex: setHighlightIndex,
                    highlightNext: highlightNext,
                    highlightPrevious: highlightPrevious,
                    submitSelection: submitSelection,
                    selectIndex: selectIndex,
                    isVisible: isVisible,
                    isEnabled: isEnabled,
                    setEnabled: setEnabled,
                    getState: getState,
                    getSuggestions: getSuggestions,
                    getFirstSuggestion: getFirstSuggestion,
                    getHighlightIndex: getHighlightIndex,
                    getSelected: getSelected,
                    getSelectedIndex: getSelectedIndex,
                    hasSuggestions: hasSuggestions,
                    hasHighlight: hasHighlight,
                    hideAfterDelay: hideAfterDelay,
                    show: show,
                    hidePanel: hidePanel,
                    clear: clear,
                    suspendAndHide: suspendAndHide,
                    clearHighlight: clearHighlight,
                    clearHighlightSoon: clearHighlightSoon,
                    cancelPendingClear: cancelPendingClear,
                    showOrRequest: showOrRequest
                };
            },
            getProvidedComponents: function () {
                var panelApi = {
                    getElement: rendererFa,
                    getAnchorElement: rendererUc,
                    updateLayout: rendererLb,
                    getPanelId: getPanelId
                };
                return [
                    {
                        init: sbox$noop,
                        setup: sbox$noop,
                        configure: sbox$noop,
                        activate: sbox$noop,
                        getType: function () {
                            return 154;
                        },
                        getComponentId: function () {
                            return 17;
                        },
                        getApi: function () {
                            return panelApi;
                        },
                        getProvidedComponents: sbox$noop,
                        deactivate: sbox$noop
                    }
                ];
            },
            deactivate: function () {
                if (hideTimer) {
                    sbox$clearTimeout(hideTimer);
                    hideTimer = null;
                }
                suggestions = null;
                hidePanel();
            }
        };
        return component;
    });
    sbox$registry.register(115, 7, function () {
        function reset() {
            visible = false;
        }
        function isVisible() {
            return visible;
        }
        function setPanel(panelId) {
            if (panelId in panelsById && panelId != currentPanel) {
                hide();
                panelContainer.setPanel(panelsById[panelId]);
                currentPanel = panelId;
            }
        }
        function getHeight() {
            if (visible) {
                return panelContainer.getHeight();
            } else {
                return 0;
            }
        }
        function setOffset(offset) {
            panelContainer.setOffset(offset);
        }
        function setDirection(direction) {
            panelContainer.setDirection(direction);
        }
        function show() {
            if (!visible) {
                panelContainer.show();
                visible = true;
            }
        }
        function hide() {
            if (visible) {
                panelContainer.hidePanel();
                visible = false;
            }
        }
        var panelContainer;
        var visible;
        var panelsById = {};
        var currentPanel;
        var component = {
            setup: function (container) {
                panelContainer = container.get(116, component);
                container.getCallbacks();
                if ((container = container.getAllApis(154, component))) {
                    for (var idx = 0, panelComponent; (panelComponent = container[idx++]);) {
                        panelsById[panelComponent.getPanelId()] = panelComponent;
                    }
                }
            },
            configure: reset,
            activate: reset,
            getType: function () {
                return 115;
            },
            getComponentId: function () {
                return 7;
            },
            getApi: function () {
                return {
                    isVisible: isVisible,
                    setPanel: setPanel,
                    getHeight: getHeight,
                    setOffset: setOffset,
                    setDirection: setDirection,
                    show: show,
                    hidePanel: hide
                };
            },
            deactivate: function () {
                hide();
            }
        };
        return component;
    });
    sbox$registry.register(119, 4, function () {
        function configure(cfg) {
            config = cfg;
            input.setAttribute("autocomplete", "off");
            input.setAttribute("spellcheck", cfg.spellcheck);
            input.style.outline = cfg.showOutline ? "" : "none";
            if (polling) {
                startPolling();
            }
        }
        function wrapInput(wrapper, inputParent) {
            if (!inputParent) {
                inputParent = wrapper;
            }
            input.parentNode.replaceChild(wrapper, input);
            inputParent.appendChild(input);
            if (focused && config.refocusAfterWrap) {
                input.focus();
                if (sbox$IE || sbox$GECKO) {
                    events.defer(function () {
                        sbox$setCursorPosition(input, cursor.getPosition());
                    });
                }
            }
        }
        function getChipContainer() {
            return chipCell;
        }
        function setDirection(direction) {
            var isRtl = direction == "rtl";
            var sameAsDefault = isRtl == (defaultDirection == "rtl");
            input.dir = direction;
            if (iconCell) {
                icons.setDirection(direction);
                var row = inputCell.parentNode;
                row.removeChild(iconCell);
                if (sameAsDefault) {
                    sbox$insertAfter(iconCell, inputCell);
                } else {
                    row.insertBefore(iconCell, inputCell);
                }
            }
            if (chipCell) {
                chipCell.dir = direction;
                direction = chipCell.parentNode;
                direction.removeChild(chipCell);
                if (sameAsDefault) {
                    direction.insertBefore(chipCell, inputCell);
                } else {
                    sbox$insertAfter(chipCell, inputCell);
                }
            }
            if (inputMode != 0) {
                sameAsDefault = input.style;
                if (isRtl) {
                    sameAsDefault.left = "";
                    sameAsDefault.right = "2px";
                } else {
                    sameAsDefault.left = "0";
                    sameAsDefault.right = "";
                }
            }
        }
        function getCursor() {
            return cursor;
        }
        function getOffset() {
            return sbox$getOffset(container);
        }
        function getHeight() {
            return container.offsetHeight;
        }
        function getWidth() {
            return container.offsetWidth;
        }
        function getInnerWidth() {
            var width = input.offsetWidth;
            if (config.reserveIconSpace) {
                width -= input.offsetHeight;
            }
            return width;
        }
        function getValue() {
            return input.value;
        }
        function setBackground(color) {
            input.style.background = color || "transparent";
        }
        function preventNextDeactivate() {
            ignoreDeactivate = true;
        }
        function select() {
            input.select();
            updateCursor();
        }
        function refresh() {
            if (sbox$ANDROID) {
                input.value = "";
            }
            input.value = controller.getCurrentText();
            if (sbox$ANDROID) {
                input.value = input.value;
            }
            moveCursorToEnd();
        }
        function focus() {
            if (!focused) {
                try {
                    input.focus();
                    focused = true;
                    moveCursorToEnd();
                } catch (a) {}
            }
        }
        function blur() {
            if (focused) {
                input.blur();
                focused = false;
            }
        }
        function isFocused() {
            return focused;
        }
        function clear() {
            input.value = "";
        }
        function buildWrapper() {
            var style = input.style;
            var existing = env.get("gs_id");
            if (existing) {
                chipCell = env.get("gs_ttc");
                inputCell = env.get("gs_tti");
                if (controller.isAnyProviderEnabled() && icons) {
                    iconElement = icons.getElement();
                    iconCell = iconElement.parentNode;
                }
                focusOnMouseUp(existing);
                container = existing;
            } else {
                var existing = sbox$createTable();
                var cellStyle = existing.style;
                existing.className = config.wrapperClassName || input.className;
                input.className = config.overlayClassName;
                cellStyle.width = style.width;
                cellStyle.height = style.height;
                var outerCell = existing.insertRow(-1).insertCell(-1);
                var cellStyle = outerCell.style;
                cellStyle.verticalAlign = "top";
                cellStyle.padding = style.padding;
                sbox$resetInputStyle(input);
                cellStyle = sbox$createTable();
                cellStyle.style.width = "100%";
                var row = cellStyle.insertRow(-1);
                if (hasChips) {
                    chipCell = row.insertCell(-1);
                    chipCell.style.minWidth = "1px";
                    chipCell.style.whiteSpace = "nowrap";
                }
                inputCell = row.insertCell(-1);
                inputCell.className = "gsib_a";
                outerCell.appendChild(cellStyle);
                wrapInput(existing, inputCell);
                if (controller.isAnyProviderEnabled() && icons) {
                    iconElement = icons.getElement();
                    iconCell = row.insertCell(-1);
                    iconCell.appendChild(iconElement);
                }
                style.width = "100%";
                focusOnMouseUp(outerCell);
                container = outerCell;
            }
        }
        function moveCursorToEnd() {
            if (focused) {
                var length = input.value.length;
                cursor = sbox$Range(length);
                sbox$setCursorPosition(input, length);
            }
        }
        function focusOnMouseUp(element) {
            events.listen(element, "mouseup", function () {
                input.focus();
            });
        }
        function attachListeners() {
            events.listen(input, "keydown", handleKeyDown);
            if (sbox$OPERA || config.listenKeypress) {
                events.listen(input, "keypress", handleKeyPress);
            }
            events.listen(input, "select", updateCursor, 10);
            var useCapture = false;
            var listenFor = function (eventType) {
                events.listen(input, eventType, dispatchInputEvent, 10, useCapture);
            };
            listenFor("mousedown");
            listenFor("keyup");
            listenFor("keypress");
            useCapture = true;
            listenFor("mouseup");
            listenFor("keydown");
            listenFor("focus");
            listenFor("blur");
            listenFor("cut");
            listenFor("paste");
            listenFor("input");
            events.listen(input, "compositionstart", handleComposition);
            events.listen(input, "compositionend", handleComposition);
        }
        function handleComposition(eventType) {
            eventType = eventType.type;
            if (eventType == "compositionstart") {
                controller.setComposing(true);
            } else if (eventType == "compositionend") {
                controller.setComposing(false);
            }
        }
        function handleKeyDown(event) {
            var keyCode = event.keyCode;
            lastKeyCode = keyCode;
            var isWebkitArrow = sbox$WEBKIT && sbox$isUpDownKey(keyCode) && dropdown.hasSuggestions();
            var isEnter = keyCode == KeyCode.ENTER;
            var isEscape = keyCode == KeyCode.ESC;
            tabHandled = false;
            if (keyCode == KeyCode.TAB) {
                tabHandled = controller.handleTabKey();
            }
            if (isEnter) {
                if ((keyCode = dropdown.getSelected()) && hasSubmitHandler(keyCode)) {
                    dropdown.submitSelection(event.shiftKey);
                } else {
                    events.defer(function () {
                        dropdown.submitSelection(event.shiftKey);
                    });
                }
            }
            if (isWebkitArrow || isEnter || isEscape || tabHandled) {
                event.stopEvent = true;
            }
        }
        function hasSubmitHandler(suggestion) {
            return (suggestion = renderersByType[suggestion.getType()].getSubmitHandler) && suggestion();
        }
        function handleKeyPress(event) {
            var keyCode = event.keyCode;
            var isEscape = keyCode == KeyCode.ESC;
            var isHandledTab = keyCode == KeyCode.TAB && tabHandled;
            if (keyCode == KeyCode.ENTER || isEscape || isHandledTab) {
                event.stopEvent = true;
            }
        }
        function dispatchInputEvent(event) {
            if (!pageHidden) {
                var eventType = event.eventType;
                if (!eventType.indexOf("key") && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
                    event = event.keyCode;
                    a: if (eventType != "keypress") {
                        var isArrow = sbox$isUpDownKey(event);
                        var isRepeat;
                        if (eventType == "keydown") {
                            controller.setImeKeyDown(event == 229);
                            if (isArrow) {
                                break a;
                            }
                        } else {
                            isRepeat = event != lastKeyCode;
                            lastKeyCode = -1;
                            if (!isArrow || isRepeat) {
                                break a;
                            }
                        }
                        switch (event) {
                            case KeyCode.ESC:
                                controller.handleEscapeKey();
                                break;
                            case KeyCode.LEFT:
                                controller.handleLeftKey();
                                break;
                            case KeyCode.RIGHT:
                                controller.handleRightKey();
                                break;
                            case KeyCode.UP:
                                dropdown.highlightPrevious();
                                break;
                            case KeyCode.DOWN:
                                controller.handleDownKey(cursor);
                                break;
                            case KeyCode.DELETE:
                                controller.handleDeleteKey(cursor);
                                break;
                            case KeyCode.BACKSPACE:
                                controller.handleBackspaceKey(cursor);
                        }
                    }
                }
                updateCursor();
                controller.handleInput(input.value, cursor, eventType);
            }
        }
        function attachFocusListeners() {
            events.listen(
                input,
                "focus",
                function () {
                    focused = true;
                    controller.handleFocus();
                },
                99
            );
            events.listen(
                input,
                "blur",
                function () {
                    focused = false;
                    controller.handleBlur();
                },
                99
            );
        }
        function startPolling() {
            if (!pollTimer) {
                pollTimer = window.setInterval(poll, config.pollInterval || 50);
            }
        }
        function stopPolling() {
            if (pollTimer) {
                sbox$clearTimeout(pollTimer);
                pollTimer = null;
            }
        }
        function poll() {
            dispatchInputEvent({
                eventType: "polling"
            });
        }
        function handleEscapeEvent() {
            if (sbox$GECKO) {
                sbox$dispatchEscapeKey(input);
            }
        }
        function updateCursor() {
            if (focused) {
                var range = sbox$getSelectionRange(input);
                if (range) {
                    cursor = range;
                }
            }
        }
        function handlePageCache() {
            var savedValue;
            events.addDomListener(window, "pagehide", function () {
                pageHidden = true;
                savedValue = input.value;
            });
            events.addDomListener(window, "pageshow", function (event) {
                pageHidden = false;
                if (event.persisted) {
                    controller.showText(savedValue);
                }
            });
        }
        var KeyCode = sbox$KeyCode;
        var controller;
        var dropdown;
        var events;
        var icons;
        var renderersByType;
        var input;
        var inputMode;
        var config;
        var focused;
        var polling;
        var pollTimer;
        var cursor = sbox$Range(0);
        var lastKeyCode = -1;
        var ignoreDeactivate = false;
        var inputCell;
        var container;
        var chipCell;
        var iconCell;
        var iconElement;
        var tabHandled;
        var pageHidden;
        var hasChips;
        var defaultDirection;
        var env;
        var component = {
            init: function (envApi, styleSheet) {
                env = envApi;
                input = envApi.getInput();
                defaultDirection = envApi.getDirection();
                if (!envApi.hasExistingElements()) {
                    styleSheet.addRule(".gsib_a", "width:100%;vertical-align:top;padding:3px 3px 0");
                }
            },
            setup: function (componentContainer) {
                controller = componentContainer.get(118, component);
                events = componentContainer.get(117, component);
                dropdown = componentContainer.get(128, component);
                icons = componentContainer.get(173, component);
                renderersByType = sbox$indexByKey(componentContainer.getAllApis(152, component));
                inputMode = componentContainer.getInstanceApi().getInputMode();
            },
            configure: function (cfg) {
                config = cfg;
                focused = document.activeElement == input;
                updateCursor();
                if (sbox$IE) {
                    events.listen(
                        input,
                        "beforedeactivate",
                        function (event) {
                            if (ignoreDeactivate) {
                                ignoreDeactivate = false;
                                event.stopEvent = true;
                            }
                        },
                        10
                    );
                }
                if (sbox$GECKO) {
                    handlePageCache();
                }
                container = input;
                hasChips = !!cfg.components[130];
                if (controller.hasPreviousQueries() || controller.isAnyProviderEnabled() || hasChips || cfg.forceWrap) {
                    buildWrapper();
                }
                input.nfd = true;
                if (cfg.pollInput) {
                    events.listen(input, "blur", stopPolling, 10);
                    events.listen(input, "focus", startPolling, 10);
                    polling = true;
                }
                events.subscribe(8, handleEscapeEvent);
                attachListeners();
                attachFocusListeners();
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 119;
            },
            getComponentId: function () {
                return 4;
            },
            getApi: function () {
                return {
                    wrapInput: wrapInput,
                    getChipContainer: getChipContainer,
                    setDirection: setDirection,
                    getCursor: getCursor,
                    getOffset: getOffset,
                    getHeight: getHeight,
                    getWidth: getWidth,
                    getInnerWidth: getInnerWidth,
                    getValue: getValue,
                    setBackground: setBackground,
                    preventNextDeactivate: preventNextDeactivate,
                    select: select,
                    refresh: refresh,
                    focus: focus,
                    blur: blur,
                    isFocused: isFocused,
                    clear: clear
                };
            },
            deactivate: function () {
                if (polling) {
                    stopPolling();
                }
                if (config.hideOnBlur) {
                    events.unlisten(input, controller.handleBlur);
                }
            }
        };
        return component;
    });
    sbox$registry.register(129, 18, function () {
        function configure(cfg) {
            config = cfg;
            var anchorId = cfg.anchorElementId;
            if (anchorId) {
                anchorElement = sbox$getElement(anchorId);
            }
            table.className = cfg.dropdownClassName || "gssb_m";
            highlightClass = cfg.highlightClassName || "gssb_i";
        }
        function renderInline(items, dir) {
            if (!table) {
                return false;
            }
            direction = dir;
            updateButtonsWidth();
            var rendered = false;
            for (var idx = 0, item; (item = items[idx++]);) {
                if (renderSuggestion(item)) {
                    rendered = true;
                }
            }
            return rendered;
        }
        function submitSelection(suggestion) {
            return renderersByType[suggestion.getType()].submitSuggestion(null, suggestion, searcher);
        }
        function getInputText(suggestion) {
            var renderer = renderersByType[suggestion.getType()];
            if (renderer && renderer.getInputText) {
                var userQuery = controller.getUserQuery();
                return renderer.getInputText(suggestion, userQuery);
            }
            return suggestion.getText();
        }
        function renderList(items, dir) {
            if (!table) {
                return false;
            }
            direction = dir;
            updateButtonsWidth();
            var rendered = false;
            for (var idx = 0, item; (item = items[idx++]);) {
                if (item == 1) {
                    if (buttonsRow) {
                        tbody.appendChild(buttonsRow);
                    } else {
                        item = allocateRowCell();
                        var style = item.style;
                        style.textAlign = "center";
                        style.whiteSpace = "nowrap";
                        item.dir = defaultDirection;
                        style = sbox$createDiv();
                        style.style.position = "relative";
                        buttonsContainer = sbox$createDiv();
                        buttonsContainer.className = "gssb_g";
                        if (config.showFooter) {
                            buttonsContainer.style.paddingBottom = "1px";
                        }
                        addButton(config.searchButtonLabel, buttonsContainer, 13);
                        if (config.showLuckyButton) {
                            addButton(config.luckyButtonLabel, buttonsContainer, 8);
                        } else if (config.showExtraButton) {
                            addButton(config.extraButtonLabel, buttonsContainer, 14);
                        }
                        style.appendChild(buttonsContainer);
                        item.appendChild(style);
                        buttonsRow = item.parentNode;
                    }
                } else if (item == 2) {
                    if (helpRow) {
                        tbody.appendChild(helpRow);
                    } else {
                        item = allocateRowCell();
                        style = item.style;
                        style.padding = "1px 4px 2px 0";
                        style.fontSize = "11px";
                        style.textAlign = "right";
                        style = sbox$createElement("a");
                        style.id = "gssb_b";
                        style.href =
                            "http://www.google.com/support/websearch/bin/answer.py?hl=" +
                            config.language +
                            "&answer=106230";
                        style.innerHTML = config.helpLinkLabel;
                        item.appendChild(style);
                        helpRow = item.parentNode;
                    }
                } else if (item == 3) {
                    if ((item = separatorPool.pop())) {
                        tbody.appendChild(item);
                    } else {
                        item = table.insertRow(-1);
                        item.isSeparator = true;
                        item = item.insertCell(-1);
                        style = sbox$createElement("div", "gssb_l");
                        item.appendChild(style);
                    }
                } else if (renderSuggestion(item)) {
                    rendered = true;
                }
            }
            return rendered;
        }
        function highlight(index) {
            setRowClass(index, highlightClass);
            index = {
                index: index,
                suggestion: dropdown.getSuggestions()[index],
                item: selectableItems[index]
            };
            events.fire(10, index);
        }
        function unhighlight(index) {
            setRowClass(index, "");
            events.fire(11);
        }
        function clear() {
            var element;
            var pool;
            for (var item; (item = renderedItems.pop());) {
                element = item.getType();
                if (!(pool = itemPool[element])) {
                    pool = itemPool[element] = [];
                }
                pool.push(item);
                element = item.getElement();
                element.parentNode.removeChild(element);
            }
            while ((element = tbody.firstChild)) {
                element = tbody.removeChild(element);
                if (element.isSeparator) {
                    separatorPool.push(element);
                } else if (element != buttonsRow && element != helpRow) {
                    rowPool.push(element);
                }
            }
            selectableItems = [];
        }
        function isSelectable(index) {
            if ((index = selectableItems[index])) {
                return index.isSelectable();
            } else {
                return false;
            }
        }
        function updateLayout() {
            updateButtonsWidth();
        }
        function getElement() {
            return table;
        }
        function getAnchorElement() {
            if (anchorElement) {
                var isOtherDirection = defaultDirection != direction;
                if (!direction || !isOtherDirection) {
                    return anchorElement;
                }
            }
            return null;
        }
        function renderSuggestion(suggestion) {
            var type = suggestion.getType();
            var renderer = renderersByType[type];
            if (!renderer) {
                return false;
            }
            var item = (type = itemPool[type]) && type.pop();
            if (!item) {
                item = renderer.createItem(searcher);
            }
            renderer.render(suggestion, item);
            renderedItems.push(item);
            var type = item.getElement();
            var cell = allocateRowCell();
            cell.className = "gssb_a " + config.rowClassName;
            cell.appendChild(type);
            if (suggestion.getIndex !== undefined) {
                selectableItems.push(item);
                var item = direction;
                var index = suggestion.getIndex();
                type.onmouseover = function () {
                    dropdown.setHighlightIndex(index);
                };
                type.onmouseout = function () {
                    dropdown.clearHighlightSoon();
                };
                type.onclick = function (event) {
                    controller.blurInput();
                    if (suggestion.isQueryType()) {
                        controller.setInputText(suggestion.getText());
                    }
                    dropdown.selectIndex(index);
                    event = event || window.event;
                    renderer.handleClick(event, suggestion, searcher);
                };
            } else {
                item = defaultDirection;
            }
            setRowDirection(cell, item);
            return true;
        }
        function addButton(label, parent, searchType) {
            var button = sbox$createElement("input");
            button.type = "button";
            button.value = sbox$htmlUnescape(label);
            button.onclick = function () {
                searcher.search(controller.getCurrentText(), searchType);
            };
            var wrapper;
            if (config.useStyledButtons) {
                label = "lsb";
                wrapper = sbox$createElement("span");
                var inner = sbox$createElement("span");
                wrapper.className = "ds";
                inner.className = "lsbb";
                wrapper.appendChild(inner);
                inner.appendChild(button);
            } else {
                label = "gssb_h";
                wrapper = button;
            }
            button.className = label;
            parent.appendChild(wrapper);
        }
        function allocateRowCell() {
            var row = rowPool.pop();
            if (row) {
                tbody.appendChild(row);
                return row.firstChild;
            }
            row = table.insertRow(-1);
            row = row.insertCell(-1);
            row.className = config.rowClassName;
            row.onmousedown = stopMouseDown;
            return row;
        }
        function setRowClass(index, className) {
            var item = selectableItems[index];
            if (item && item.isSelectable()) {
                item.getElement().parentNode.parentNode.className = className;
            }
        }
        function stopMouseDown(event) {
            event = event || window.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (!sbox$OPERA) {
                if (sbox$IE) {
                    controller.preventNextDeactivate();
                }
            }
            return false;
        }
        function updateButtonsWidth() {
            if (buttonsContainer) {
                var width = config.dropdownWidth ? config.dropdownWidth : controller.getWidth() - 3;
                if (width > 0) {
                    buttonsContainer.style.width = width + "px";
                }
            }
        }
        function setRowDirection(element, dir) {
            if (element.dir != dir) {
                element.dir = dir;
                element.style.textAlign = TEXT_ALIGN[dir];
            }
        }
        var TEXT_ALIGN = {
            rtl: "right",
            ltr: "left"
        };
        var dropdown;
        var events;
        var controller;
        var renderersByType;
        var searcher;
        var config;
        var itemPool = {};
        var renderedItems = [];
        var rowPool = [];
        var separatorPool = [];
        var selectableItems = [];
        var anchorElement;
        var direction;
        var defaultDirection;
        var table;
        var tbody;
        var buttonsRow;
        var buttonsContainer;
        var helpRow;
        var highlightClass;
        var component = {
            init: function (env, styleSheet) {
                defaultDirection = env.getDirection();
                styleSheet.addRule(".gssb_a", "padding:0 7px");
                styleSheet.addRule(".gssb_a,.gssb_a td", "white-space:nowrap;overflow:hidden;line-height:22px");
                styleSheet.addRule("#gssb_b", "font-size:11px;color:#36c;text-decoration:none");
                styleSheet.addRule("#gssb_b:hover", "font-size:11px;color:#36c;text-decoration:underline");
                styleSheet.addRule(".gssb_m", "color:#000;background:#fff");
                styleSheet.addRule(".gssb_g", "text-align:center;padding:8px 0 7px;position:relative");
                styleSheet.addRule(
                    ".gssb_h",
                    ["font-size:15px;height:28px;margin:0.2em", sbox$WEBKIT ? ";-webkit-appearance:button" : ""].join(
                        ""
                    )
                );
                styleSheet.addRule(".gssb_i", "background:#eee");
                styleSheet.addRule(".gss_ifl", "visibility:hidden;padding-left:5px");
                styleSheet.addRule(".gssb_i .gss_ifl", "visibility:visible");
                styleSheet.addRule("a.gssb_j", "font-size:13px;color:#36c;text-decoration:none;line-height:100%");
                styleSheet.addRule("a.gssb_j:hover", "text-decoration:underline");
                styleSheet.addRule(".gssb_l", "height:1px;background-color:#e5e5e5");
            },
            setup: function (container) {
                dropdown = container.get(128, component);
                events = container.get(117, component);
                controller = container.get(118, component);
                searcher = container.get(121, component);
                renderersByType = sbox$indexByKey(container.getAllApis(152, component));
            },
            configure: function (cfg) {
                config = cfg;
                table = sbox$createTable();
                var tbodyElement = sbox$createElement("tbody");
                table.appendChild(tbodyElement);
                tbody = table.getElementsByTagName("tbody")[0];
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 129;
            },
            getComponentId: function () {
                return 18;
            },
            getApi: function () {
                return {
                    renderInline: renderInline,
                    getInputText: getInputText,
                    submitSelection: submitSelection,
                    render: renderList,
                    highlight: highlight,
                    unhighlight: unhighlight,
                    clear: clear,
                    isSelectable: isSelectable,
                    updateLayout: updateLayout,
                    getElement: getElement,
                    getAnchorElement: getAnchorElement
                };
            }
        };
        return component;
    });
    sbox$registry.register(116, 8, function () {
        function configure(cfg) {
            config = cfg;
            table.style.position = cfg.dropdownPosition;
        }
        function setPanel(panel) {
            if (panel != currentPanel) {
                currentPanel = panel;
                panel = panel.getElement();
                if (currentPanelElement) {
                    if (panel != currentPanelElement) {
                        contentCell.replaceChild(panel, currentPanelElement);
                    }
                } else {
                    contentCell.appendChild(panel);
                }
                currentPanelElement = panel;
            }
        }
        function getHeight() {
            if (!cachedHeight) {
                cachedHeight = contentCell ? Math.max(contentCell.offsetHeight, 0) : 0;
            }
            return cachedHeight;
        }
        function setOffset(newOffset) {
            if (newOffset != offset) {
                var style = spacer.style;
                if (newOffset) {
                    style.width = newOffset + "px";
                    if (sbox$GECKO && newOffset > 0) {
                        style.paddingLeft = "1px";
                    }
                    spacerCell.appendChild(spacer);
                    contentCell.style.width = "";
                } else {
                    spacerCell.removeChild(spacer);
                    style.paddingLeft = "";
                    contentCell.style.width = "100%";
                }
                offset = newOffset;
            }
        }
        function setDirection(dir) {
            direction = dir;
            var element = table;
            if (element.dir != dir) {
                element.dir = dir;
                element.style.textAlign = TEXT_ALIGN[dir];
            }
        }
        function show() {
            updateLayout();
            setVisible(table, true);
            setVisible(iframeShim, true);
        }
        function hidePanel() {
            cachedHeight = 0;
            setVisible(table, false);
            setVisible(iframeShim, false);
            events.fire(12);
        }
        function updateLayout() {
            cachedHeight = 0;
            positionDropdown();
            if (iframeShim) {
                var padding = config.shimPadding[0];
                var style = iframeShim.style;
                if (config.dropdownPosition != "relative") {
                    style.top = table.style.top;
                    style.left = table.offsetLeft + spacerCell.offsetWidth + "px";
                }
                iframeShim.style.height = Math.max(table.offsetHeight + padding, 0) + "px";
                padding = contentCell.offsetWidth;
                if (padding > 0) {
                    iframeShim.style.width = padding + "px";
                }
            }
            if (currentPanel) {
                currentPanel.updateLayout();
            }
        }
        function positionDropdown() {
            var isRelative = config.dropdownPosition == "relative";
            var inputOffset = controller.getOffset();
            var offsets = config.dropdownOffsets;
            var top = offsets[0];
            var isOtherDirection = defaultDirection != direction;
            var left = offsets[isOtherDirection ? 4 : 1];
            if (direction == "rtl") {
                left += offsets[5];
            }
            var style = table.style;
            if (!isRelative) {
                style.top = inputOffset.topPx + controller.getHeight() + top + "px";
            }
            var width;
            var anchor;
            if (currentPanel) {
                anchor = currentPanel.getAnchorElement();
            }
            if (anchor) {
                inputOffset = sbox$getOffset(anchor);
                width = anchor.offsetWidth;
                if (sbox$OPERA) {
                    ++left;
                }
            }
            if (!width) {
                width = controller.getWidth();
            }
            if (!isRelative) {
                style.left = inputOffset.leftPx + left + "px";
            }
            width += offsets[isOtherDirection ? 3 : 2];
            if (offset) {
                style.width = "";
            } else if (width > 0) {
                table.style.width = width + "px";
            }
            if (sbox$IE_LE7) {
                style.zoom = "normal";
                style.zoom = 1;
            }
        }
        function setVisible(element, visible) {
            if (element) {
                element.style.display = visible ? "" : "none";
            }
        }
        var TEXT_ALIGN = {
            rtl: "right",
            ltr: "left"
        };
        var controller;
        var events;
        var config;
        var table;
        var direction;
        var spacerCell;
        var spacer;
        var offset;
        var contentCell;
        var cachedHeight;
        var iframeShim;
        var currentPanel;
        var currentPanelElement;
        var defaultDirection;
        var component = {
            init: function (env, styleSheet) {
                defaultDirection = env.getDirection();
                styleSheet.addRule(".gssb_c", "border:0;position:absolute;z-index:989");
                styleSheet.addRule(
                    ".gssb_e",
                    [
                        "border:1px solid #ccc;border-top-color:#d9d9d9;",
                        styleSheet.prefix("box-shadow:0 2px 4px rgba(0,0,0,0.2);")
                    ].join("")
                );
                styleSheet.addRule(".gssb_f", "visibility:hidden;white-space:nowrap");
                styleSheet.addRule(".gssb_k", "border:0;display:block;position:absolute;top:0;z-index:988");
            },
            setup: function (container) {
                container.get(115, component);
                controller = container.get(118, component);
                events = container.get(117, component);
            },
            configure: function (cfg) {
                config = cfg;
                offset = 0;
                table = sbox$createTable();
                table.className = "gssb_c";
                setVisible(table, false);
                var row = table.insertRow(-1);
                spacerCell = row.insertCell(-1);
                spacerCell.className = "gssb_f";
                spacer = sbox$createDiv();
                contentCell = row.insertCell(-1);
                contentCell.className = "gssb_e";
                contentCell.style.width = "100%";
                if (config.useIframeShim) {
                    iframeShim = sbox$createElement("iframe", "gssb_k");
                    setVisible(iframeShim, false);
                    (config.dropdownParent || document.body).appendChild(iframeShim);
                }
                positionDropdown();
                (cfg.dropdownParent || document.body).appendChild(table);
                events.subscribe(8, updateLayout);
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 116;
            },
            getComponentId: function () {
                return 8;
            },
            getApi: function () {
                return {
                    setPanel: setPanel,
                    getHeight: getHeight,
                    setOffset: setOffset,
                    setDirection: setDirection,
                    show: show,
                    hidePanel: hidePanel,
                    updateLayout: updateLayout
                };
            }
        };
        return component;
    });
    sbox$registry.register(133, 21, function () {
        function put(response) {
            store(response);
            if (secondaryCaches) {
                for (var idx = 0; idx < secondaryCaches.length; ++idx) {
                    secondaryCaches[idx].update(response);
                }
            }
        }
        function get(request) {
            var response = responses[request.getRequestKey()] || null;
            var fromCache = false;
            if (response) {
                ++directHits;
                fromCache = true;
            } else if (secondaryCaches) {
                for (var idx = 0; idx < secondaryCaches.length; ++idx) {
                    if ((response = secondaryCaches[idx].get(request))) {
                        store(response);
                        ++secondaryHits;
                        break;
                    }
                }
            }
            if (response) {
                idx = request.getQuery();
                if (idx != response.getQuery()) {
                    response = sbox$Response(
                        request,
                        idx,
                        response.getSuggestions(),
                        response.getMetadataCopy(),
                        response.countsAsCacheHit(),
                        response.isCacheable(),
                        fromCache,
                        response.isPostProcessed()
                    );
                } else if (fromCache) {
                    response.markFromCache();
                }
            }
            return response;
        }
        function getDirectHitCount() {
            return directHits;
        }
        function getSecondaryHitCount() {
            return secondaryHits;
        }
        function resetStats() {
            secondaryHits = directHits = 0;
        }
        function removeType(type) {
            var suggestions;
            var suggestion;
            var idx;
            var key;
            for (key in responses) {
                suggestions = responses[key];
                suggestions = suggestions.getSuggestions();
                for (idx = 0; (suggestion = suggestions[idx++]);) {
                    if (suggestion.getType() == type) {
                        delete responses[key];
                        break;
                    }
                }
            }
            resetSecondaryCaches();
        }
        function clear() {
            responses = {};
            resetSecondaryCaches();
        }
        function store(response) {
            if (response && response.isCacheable()) {
                responses[response.getRequest().getRequestKey()] = response;
            }
        }
        function resetSecondaryCaches() {
            if (secondaryCaches) {
                for (var idx = 0; idx < secondaryCaches.length; ++idx) {
                    secondaryCaches[idx].reset();
                }
            }
        }
        function comparePriority(first, second) {
            return second.getPriority() - first.getPriority();
        }
        var responses = {};
        var secondaryCaches;
        var directHits;
        var secondaryHits;
        var component = {
            setup: function (container) {
                secondaryCaches = container.getAllApis(151, component);
            },
            configure: function () {
                secondaryCaches.sort(comparePriority);
                resetStats();
            },
            activate: function () {
                resetStats();
            },
            getType: function () {
                return 133;
            },
            getComponentId: function () {
                return 21;
            },
            getApi: function () {
                return {
                    put: put,
                    get: get,
                    getDirectHitCount: getDirectHitCount,
                    getSecondaryHitCount: getSecondaryHitCount,
                    resetTimers: resetStats,
                    removeType: removeType,
                    clearCache_: clear
                };
            }
        };
        return component;
    });
    sbox$registry.register(159, 190, function () {
        function configure() {
            active = true;
            if (element && controller.isInputFocused()) {
                focusClass.addClass(element);
            }
        }
        function handleMouseOver() {
            if (active) {
                hoverClass.addClass(element);
            }
        }
        function handleMouseOut() {
            if (active) {
                hoverClass.removeClass(element);
            }
        }
        function handleFocus() {
            if (active) {
                focusClass.addClass(element);
            }
        }
        function handleBlur() {
            if (active) {
                focusClass.removeClass(element);
            }
        }
        var events;
        var controller;
        var element;
        var hoverClass;
        var focusClass;
        var active = false;
        var component = {
            init: function (env, styleSheet) {
                var boxShadow = function (value) {
                    return ["box-shadow:", value, "-moz-box-shadow:", value, "-webkit-box-shadow:", value].join("");
                };
                styleSheet.addRule(
                    ".gsfe_a",
                    [
                        "border:1px solid #b9b9b9;border-top-color:#a0a0a0;",
                        boxShadow("inset 0px 1px 2px rgba(0,0,0,0.1);")
                    ].join("")
                );
                styleSheet.addRule(
                    ".gsfe_b",
                    ["border:1px solid #4d90fe;outline:none;", boxShadow("inset 0px 1px 2px rgba(0,0,0,0.3);")].join("")
                );
            },
            setup: function (container) {
                events = container.get(117, component);
                controller = container.get(118, component);
            },
            configure: function (cfg) {
                if ((element = sbox$getElement(cfg.focusTargetId))) {
                    events.subscribe(13, handleFocus);
                    events.subscribe(14, handleBlur);
                    events.listen(element, "mouseover", handleMouseOver);
                    events.listen(element, "mouseout", handleMouseOut);
                    hoverClass = sbox$ClassMatcher(cfg.normalClassName || "gsfe_a");
                    focusClass = sbox$ClassMatcher(cfg.focusedClassName || "gsfe_b");
                }
                configure();
            },
            activate: configure,
            getType: function () {
                return 159;
            },
            getComponentId: function () {
                return 190;
            },
            deactivate: function () {
                active = false;
                if (element) {
                    hoverClass.removeClass(element);
                    focusClass.removeClass(element);
                }
            }
        };
        return component;
    });
    function sbox$ClassMatcher(className) {
        var pattern = RegExp("(?:^|\\s+)" + className + "(?:$|\\s+)");
        return {
            addClass: function (element) {
                if (element && !pattern.test(element.className)) {
                    element.className += " " + className;
                }
            },
            removeClass: function (element) {
                if (element) {
                    element.className = element.className.replace(pattern, " ");
                }
            }
        };
    }
    sbox$registry.registerSingleton(191, 192, function () {
        function base64Encode(input) {
            var input = toBytes(input);
            var output = "";
            if (input) {
                for (var remaining = input.length, bits = 0, acc = 0, pos = 0; remaining--;) {
                    acc <<= 8;
                    acc |= input[pos++];
                    for (bits += 8; bits >= 6;) {
                        var sextet = (acc >> (bits - 6)) & 63;
                        var output =
                            output + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(sextet);
                        var bits = bits - 6;
                    }
                }
                if (bits) {
                    output += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(
                        ((acc << 8) >> (bits + 8 - 6)) & 63
                    );
                }
            }
            return output;
        }
        function base64Decode(input) {
            var bytes = [];
            if (input) {
                var acc = 0;
                var bits = 0;
                for (var i = 0; i < input.length; ++i) {
                    var code = input.charCodeAt(i);
                    if (code < 32 || code > 127 || !BASE64_DECODE_TABLE[code - 32]) {
                        return [];
                    }
                    acc <<= 6;
                    acc |= BASE64_DECODE_TABLE[code - 32] - 1;
                    bits += 6;
                    if (bits >= 8) {
                        bytes.push((acc >> (bits - 8)) & 255);
                        bits -= 8;
                    }
                }
            }
            return bytes;
        }
        function hmacMd5(message, key) {
            var ctx = {};
            ctx.state = Array(4);
            ctx.buffer = Array(4);
            ctx.words = Array(4);
            ctx.padding = Array(64);
            ctx.padding[0] = 128;
            for (var innerPad = 1; innerPad < 64; ++innerPad) {
                ctx.padding[innerPad] = 0;
            }
            md5Init(ctx);
            var innerPad = Array(64);
            var keyBytes;
            if (key.length > 64) {
                md5Init(ctx);
                md5Update(ctx, key);
                keyBytes = md5Final(ctx);
            } else {
                keyBytes = key;
            }
            for (var i = 0; i < keyBytes.length; ++i) {
                innerPad[i] = keyBytes[i] ^ 92;
            }
            for (i = keyBytes.length; i < 64; ++i) {
                innerPad[i] = 92;
            }
            md5Init(ctx);
            for (i = 0; i < 64; ++i) {
                ctx.buffer[i] = innerPad[i] ^ 106;
            }
            md5Transform(ctx, ctx.buffer);
            ctx.total = 64;
            md5Update(ctx, message);
            keyBytes = md5Final(ctx);
            md5Init(ctx);
            md5Transform(ctx, innerPad);
            ctx.total = 64;
            md5Update(ctx, keyBytes);
            return md5Final(ctx);
        }
        function toBytes(input) {
            if (typeof input == "string") {
                var bytes = Array(input.length);
                for (var i = 0; i < input.length; ++i) {
                    bytes[i] = input.charCodeAt(i);
                }
                return bytes;
            }
            return input;
        }
        function md5Init(ctx) {
            ctx.state[0] = 1732584193;
            ctx.state[1] = 4023233417;
            ctx.state[2] = 2562383102;
            ctx.state[3] = 271733878;
            ctx.bufferLength = ctx.total = 0;
        }
        function md5Transform(ctx, block) {
            var words = ctx.words;
            for (var a0 = 0; a0 < 64; a0 += 4) {
                words[a0 / 4] = block[a0] | (block[a0 + 1] << 8) | (block[a0 + 2] << 16) | (block[a0 + 3] << 24);
            }
            var a0 = ctx.state[0];
            var b0 = ctx.state[1];
            var c0 = ctx.state[2];
            var d0 = ctx.state[3];
            var fn;
            var wordIndex;
            var temp;
            for (var i = 0; i < 64; ++i) {
                if (i < 16) {
                    fn = d0 ^ (b0 & (c0 ^ d0));
                    wordIndex = i;
                } else if (i < 32) {
                    fn = c0 ^ (d0 & (b0 ^ c0));
                    wordIndex = (i * 5 + 1) & 15;
                } else if (i < 48) {
                    fn = b0 ^ c0 ^ d0;
                    wordIndex = (i * 3 + 5) & 15;
                } else {
                    fn = c0 ^ (b0 | ~d0);
                    wordIndex = (i * 7) & 15;
                }
                temp = d0;
                d0 = c0;
                c0 = b0;
                b0 =
                    (b0 +
                        (((((a0 + fn + CONSTANTS[i] + words[wordIndex]) & -1) << SHIFTS[i]) |
                            (((a0 + fn + CONSTANTS[i] + words[wordIndex]) & -1) >>> (32 - SHIFTS[i]))) &
                            -1)) &
                    -1;
                a0 = temp;
            }
            ctx.state[0] = (ctx.state[0] + a0) & -1;
            ctx.state[1] = (ctx.state[1] + b0) & -1;
            ctx.state[2] = (ctx.state[2] + c0) & -1;
            ctx.state[3] = (ctx.state[3] + d0) & -1;
        }
        function md5Update(ctx, data, length) {
            data = toBytes(data);
            if (!length) {
                length = data.length;
            }
            ctx.total += length;
            for (var i = 0; i < length; ++i) {
                ctx.buffer[ctx.bufferLength++] = data[i];
                if (ctx.bufferLength == 64) {
                    md5Transform(ctx, ctx.buffer);
                    ctx.bufferLength = 0;
                }
            }
        }
        function md5Final(ctx) {
            var digest = Array(16);
            var bitLength = ctx.total * 8;
            var used = ctx.bufferLength;
            md5Update(ctx, ctx.padding, used < 56 ? 56 - used : 64 - (used - 56));
            for (var i = 56; i < 64; ++i) {
                ctx.buffer[i] = bitLength & 255;
                bitLength >>>= 8;
            }
            md5Transform(ctx, ctx.buffer);
            for (i = used = 0; i < 4; ++i) {
                for (bitLength = 0; bitLength < 32; bitLength += 8) {
                    digest[used++] = (ctx.state[i] >> bitLength) & 255;
                }
            }
            return digest;
        }
        var BASE64_DECODE_TABLE = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 0, 0, 0, 0, 0, 0,
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0,
            0, 64, 0, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 0, 0, 0, 0, 0
        ];
        var SHIFTS = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9,
            14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
            21, 6, 10, 15, 21
        ];
        var CONSTANTS = [
            3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416,
            2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664,
            643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335,
            1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740,
            2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809,
            3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690,
            4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259,
            3951481745
        ];
        return {
            getType: function () {
                return 191;
            },
            getComponentId: function () {
                return 192;
            },
            getApi: function () {
                return {
                    base64Encode: base64Encode,
                    base64Decode: base64Decode,
                    hmacMd5: hmacMd5
                };
            }
        };
    });
    function sbox$PersonalizedRow(
        serverConfig,
        historyAuth,
        requester,
        controller,
        dropdown,
        searcher,
        removeLinkMode,
        removedMessage
    ) {
        function handleRemoveClick(event) {
            removing = true;
            historyAuth.deleteItem(text, handleRemoved);
            return sbox$stopEvent(event);
        }
        function handleRemoved() {
            if (removing) {
                requester.configureCache(35);
                serverConfig.resetTransport();
                element.onmouseover = element.onmouseout = element.onclick = null;
                mainRow.style.display = "none";
                removedRow.style.display = "";
                if (dropdown.getSelectedIndex() == index) {
                    controller.restoreUserQuery();
                }
                if (dropdown.getHighlightIndex() == index) {
                    dropdown.clearHighlight();
                    controller.focusInput();
                }
                selectable = false;
            }
        }
        var element;
        var mainRow;
        var removedRow;
        var textSpan;
        var luckyLink;
        var removeLink;
        var removedCell;
        var text;
        var index;
        var selectable = true;
        var removing = false;
        (function () {
            element = sbox$createDiv();
            var table = sbox$createTable();
            element.appendChild(table);
            mainRow = table.insertRow(-1);
            var cell = mainRow.insertCell(-1);
            textSpan = sbox$createElement("span");
            cell.appendChild(textSpan);
            if (removeLinkMode != 0) {
                removeLink = sbox$createElement("a");
                removeLink.href = "#ps";
                removeLink.className = "gspqs_a gssb_j";
                var removeCell = mainRow.insertCell(-1);
                removeCell.appendChild(removeLink);
                (removeLinkMode == 2 ? removeCell : cell).style.width = "100%";
                removedRow = table.insertRow(-1);
                removedCell = removedRow.insertCell(-1);
                removedCell.className = "gspqs_b";
                removedCell.innerHTML = removedMessage;
                removedCell.colSpan = "2";
            }
        })();
        return {
            getElement: function () {
                return element;
            },
            getType: function () {
                return 35;
            },
            isSelectable: function () {
                return selectable;
            },
            render: function (html, suggestionText, suggestionIndex, removeLabel, highlight, luckyLabel) {
                removing = false;
                selectable = true;
                text = suggestionText;
                index = suggestionIndex;
                mainRow.style.display = "";
                textSpan.innerHTML = html;
                if (highlight) {
                    textSpan.style.color = "#52188c";
                }
                if (removeLinkMode != 0) {
                    removedRow.style.display = "none";
                    removeLink.innerHTML = removeLabel;
                    removeLink.onclick = handleRemoveClick;
                }
                if (luckyLabel && !luckyLink) {
                    luckyLink = sbox$appendFeelingLuckyLink(mainRow);
                    luckyLink.onclick = function (event) {
                        controller.blurInput();
                        controller.setInputText(text);
                        searcher.search(text, 9);
                        return sbox$stopEvent(event);
                    };
                }
                if (luckyLabel) {
                    luckyLink.innerHTML = luckyLabel + " &raquo;";
                    luckyLink.style.display = "";
                } else if (luckyLink) {
                    luckyLink.style.display = "none";
                }
            }
        };
    }
    sbox$registry.register(152, 33, function () {
        function configure(cfg) {
            removeLinkMode = cfg.removeLinkMode;
            removeLabel = cfg.removeLinkLabel;
            removedMessage = cfg.removedMessage;
            highlightPersonal = cfg.highlightPersonal;
            luckyLabel = cfg.showLuckyLinks ? cfg.luckyButtonLabel : "";
        }
        function createItem(searcher) {
            return sbox$PersonalizedRow(
                serverConfig,
                historyAuth,
                requester,
                controller,
                dropdown,
                searcher,
                removeLinkMode,
                removedMessage
            );
        }
        function render(suggestion, item) {
            item.render(
                suggestion.getHtml(),
                suggestion.getText(),
                suggestion.getIndex(),
                removeLabel,
                highlightPersonal,
                luckyLabel
            );
        }
        function handleClick(event, suggestion, searcher) {
            searcher.search(suggestion.getText(), 1);
        }
        function getLogKey() {
            return "p";
        }
        function getSuggestionType() {
            return 35;
        }
        var serverConfig;
        var historyAuth;
        var requester;
        var controller;
        var dropdown;
        var removeLinkMode;
        var removeLabel;
        var removedMessage;
        var highlightPersonal;
        var luckyLabel;
        var component = {
            init: function (env, styleSheet) {
                styleSheet.addRule("a.gspqs_a", "padding:0 3px 0 8px");
                styleSheet.addRule(".gspqs_b", "color:#666;line-height:22px");
            },
            setup: function (container) {
                requester = container.get(123, component);
                controller = container.get(118, component);
                historyAuth = container.get(189, component);
                serverConfig = container.get(127, component);
                dropdown = container.get(128, component);
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 152;
            },
            getComponentId: function () {
                return 33;
            },
            getApi: function () {
                return {
                    createItem: createItem,
                    render: render,
                    handleClick: handleClick,
                    submitSuggestion: sbox$noop,
                    getLogKey: getLogKey,
                    getSuggestionType: getSuggestionType
                };
            }
        };
        return component;
    });
    sbox$registry.register(189, 188, function () {
        function configure(cfg) {
            isHttps = document.location.protocol == "https:" || cfg.forceHttps;
            token = cfg.historyToken;
            cfg = !!cfg.allowedTypes[35];
            enabled = !!historyService && !!token && !!cfg;
            needsSigningKey = !isHttps;
            if (enabled && needsSigningKey) {
                historyService.fetchSigningKey();
            }
        }
        function getAuthParams(query) {
            var params = {};
            if (enabled) {
                if (isHttps) {
                    params.tok = token;
                } else if (crypto && signingKey) {
                    var encodedQuery = crypto.base64Encode(query);
                    var key = crypto.base64Decode(signingKey);
                    var query = crypto.hmacMd5(query, key);
                    var query = crypto.base64Encode(query);
                    params.qe = encodedQuery;
                    params.qesig = query;
                    params.pkc = pkc;
                    if (enabled && needsSigningKey && signingKeyTime && sbox$now() - signingKeyTime > 82800000) {
                        historyService.fetchSigningKey();
                    }
                }
            }
            return params;
        }
        function deleteItem(text, callback) {
            historyService.requestDelete(text, callback);
        }
        function setSigningKey(response) {
            signingKey = response.websafe_signing_key;
            pkc = response.pkc;
            signingKeyTime = sbox$now();
        }
        var historyService;
        var token;
        var isHttps;
        var enabled;
        var needsSigningKey;
        var signingKeyTime;
        var signingKey;
        var pkc;
        var crypto;
        var component = {
            setup: function (container) {
                historyService = container.get(134, component);
                crypto = container.get(191, component);
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 189;
            },
            getComponentId: function () {
                return 188;
            },
            getApi: function () {
                return {
                    getAuthParams: getAuthParams,
                    deleteItem: deleteItem,
                    setSigningKey: setSigningKey
                };
            }
        };
        return component;
    });
    sbox$registry.register(134, 186, function () {
        function configure(cfg) {
            token = cfg.historyToken;
            authuser = cfg.authuser;
            client = cfg.client;
        }
        function fetchSigningKey() {
            var params = [];
            sbox$appendParam("callback", "google.sbox.hi" + instanceId, params);
            sendJsonp("https://clients1.google.com/complete/init?", params);
        }
        function requestDelete(text, callback) {
            pendingDeletes[text] = callback;
            var params = [];
            sbox$appendParam("delq", text, params);
            sbox$appendParam("client", client, params);
            sbox$appendParam("callback", "google.sbox.d" + instanceId, params);
            sendJsonp("https://clients1.google.com/complete/deleteitems?", params);
        }
        function sendJsonp(url, params) {
            sbox$appendParam("tok", token, params);
            if (authuser) {
                sbox$appendParam("authuser", authuser, params);
            }
            script = sbox$createElement("script");
            script.src = url + params.join("&");
            head.appendChild(script);
        }
        function removeScript() {
            if (script) {
                head.removeChild(script);
                script = null;
            }
        }
        function handleInitResponse(response) {
            removeScript();
            historyAuth.setSigningKey(response);
        }
        function handleDeleteResponse(response) {
            removeScript();
            var response = response[0];
            var callback = pendingDeletes[response];
            if (callback) {
                delete pendingDeletes[response];
                callback();
            }
        }
        var head = sbox$getHead();
        var historyAuth;
        var instanceId;
        var token;
        var authuser;
        var client;
        var script;
        var pendingDeletes = {};
        var component = {
            setup: function (container) {
                historyAuth = container.get(189, component);
                instanceId = container.getInstanceApi().getId();
            },
            configure: function (cfg) {
                var sbox = window.google.sbox;
                sbox["hi" + instanceId] = handleInitResponse;
                sbox["d" + instanceId] = handleDeleteResponse;
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 134;
            },
            getComponentId: function () {
                return 186;
            },
            getApi: function () {
                return {
                    fetchSigningKey: fetchSigningKey,
                    requestDelete: requestDelete
                };
            },
            deactivate: function () {
                removeScript();
            }
        };
        return component;
    });
    sbox$registry.register(156, 187, function () {
        function signRequest(request) {
            var params = historyAuth.getAuthParams(request.getQuery());
            var name;
            for (name in params) {
                request.setParameter(name, params[name]);
            }
            return false;
        }
        function getPriority() {
            return 13;
        }
        var historyAuth;
        var component = {
            setup: function (container) {
                historyAuth = container.get(189, component);
            },
            getType: function () {
                return 156;
            },
            getComponentId: function () {
                return 187;
            },
            getApi: function () {
                return {
                    filterRequest: signRequest,
                    getPriority: getPriority
                };
            }
        };
        return component;
    });
    function sbox$CloseLinkRenderer(label) {
        function createItem() {
            return sbox$CloseLinkRow(dropdown, label);
        }
        function getSuggestionType() {
            return 501;
        }
        var dropdown;
        var component = {
            init: function (env, styleSheet) {
                styleSheet.addRule(".gscl_a", "font-size:10px;color:#03c;text-decoration:underline;white-space:nowrap");
            },
            setup: function (container) {
                dropdown = container.get(128, component);
            },
            getType: function () {
                return 152;
            },
            getComponentId: function () {
                return 92;
            },
            getApi: function () {
                return {
                    createItem: createItem,
                    render: sbox$noop,
                    handleClick: sbox$noop,
                    submitSuggestion: sbox$noop,
                    getLogKey: sbox$noop,
                    getSuggestionType: getSuggestionType
                };
            }
        };
        return component;
    }
    function sbox$CloseLinkRow(dropdown, label) {
        var element;
        var api = {
            getType: function () {
                return 501;
            },
            getElement: function () {
                return element;
            },
            render: sbox$noop
        };
        (function () {
            var table = sbox$createTable();
            var cell = table.insertRow(-1);
            cell.insertCell(-1).style.width = "100%";
            cell = cell.insertCell(-1);
            cell = sbox$appendSpan(label, cell);
            cell.className = "gscl_a";
            cell.onclick = function () {
                dropdown.setEnabled(false);
            };
            element = sbox$createDiv();
            element.appendChild(table);
        })();
        return api;
    }
    sbox$registry.register(153, 91, function () {
        function getPriority() {
            return 2;
        }
        function getMessage(query, suggestions, messages) {
            messages.push({
                getType: function () {
                    return 501;
                },
                position: 1
            });
        }
        return {
            getType: function () {
                return 153;
            },
            getComponentId: function () {
                return 91;
            },
            getApi: function () {
                return {
                    getPriority: getPriority,
                    getMessage: getMessage
                };
            }
        };
    });
    sbox$registry.register(151, 97, function () {
        function configure(cfg) {
            config = cfg;
            enabled = !(33 in cfg.allowedTypes);
        }
        function getPriority() {
            return 2;
        }
        function update(response) {
            if (enabled) {
                var suggestions = response.getSuggestions();
                if (!(suggestions.length >= config.maxSuggestions)) {
                    var query = response.getRequest().getNormalizedQuery();
                    if (suggestions.length) {
                        for (var idx = 0, suggestion; (suggestion = suggestions[idx]); ++idx) {
                            if (!cacheableTypes[suggestion.getType()]) {
                                return;
                            }
                            suggestion = suggestion.getText();
                            if (!sbox$startsWith(suggestion, query, true)) {
                                return;
                            }
                        }
                        store(response);
                    } else if (!config.cacheEmptyResults && !PUNCTUATION_RE.test(query)) {
                        store(response);
                    }
                }
            }
        }
        function get(request) {
            if (enabled) {
                var bucket;
                var query = request.getNormalizedQuery();
                var length = Math.min(query.length, maxLength);
                if (length >= minLength) {
                    var prefix;
                    for (; length > 0; --length) {
                        if ((bucket = byLength[length])) {
                            prefix = query.substring(0, length);
                            if ((bucket = bucket[prefix])) {
                                query = bucket;
                                length = query.getSuggestions();
                                if (length.length) {
                                    bucket = request.getQuery();
                                    prefix = bucket.toLowerCase();
                                    var normalized = request.getNormalizedQuery();
                                    var metadata = query.getMetadataCopy();
                                    var bold = config.boldSuggestions || !query.getMetadataNumber("k");
                                    var filtered = [];
                                    for (
                                        var html = undefined,
                                            text = undefined,
                                            index = 0,
                                            idx = 0,
                                            suggestion = undefined;
                                        (suggestion = length[idx++]);
                                    ) {
                                        text = suggestion.getText();
                                        if (sbox$startsWith(text, normalized, true)) {
                                            html = bold ? bolder.bold(prefix, text) : sbox$htmlEscape(text);
                                            filtered.push(
                                                sbox$Suggestion(
                                                    html,
                                                    text,
                                                    index++,
                                                    suggestion.getType(),
                                                    suggestion.getSubtypes(),
                                                    suggestion.getAnnotations()
                                                )
                                            );
                                        }
                                    }
                                    request = sbox$Response(
                                        request,
                                        bucket,
                                        filtered,
                                        metadata,
                                        true,
                                        query.isCacheable(),
                                        true,
                                        false
                                    );
                                } else {
                                    request = query;
                                }
                                return request;
                            }
                        }
                    }
                }
            }
            return null;
        }
        function reset() {
            byLength = {};
            minLength = Number.MAX_VALUE;
            maxLength = 0;
        }
        function store(response) {
            var query = response.getRequest().getNormalizedQuery();
            var length = query.length;
            if (length < minLength) {
                minLength = length;
            }
            if (length > maxLength) {
                maxLength = length;
            }
            var bucket = byLength[length];
            if (!bucket) {
                bucket = byLength[length] = {};
            }
            bucket[query] = response;
        }
        var PUNCTUATION_RE = /^[!"#$%'()*,\/:;<=>?[\\\]^`{|}~]+$/;
        var enabled = true;
        var cacheableTypes;
        var byLength;
        var minLength;
        var maxLength;
        var bolder;
        var config;
        var component = {
            setup: function (container) {
                bolder = container.get(150, component);
            },
            configure: function (cfg) {
                cacheableTypes = sbox$toSet([0]);
                reset();
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 151;
            },
            getComponentId: function () {
                return 97;
            },
            getApi: function () {
                return {
                    getPriority: getPriority,
                    update: update,
                    get: get,
                    reset: reset
                };
            },
            deactivate: function () {
                enabled = false;
            }
        };
        return component;
    });
    sbox$registry.register(151, 98, function () {
        function configure(cfg) {
            boldSuggestions = cfg.boldSuggestions;
        }
        function getPriority() {
            return 3;
        }
        function update(response) {
            var request = response.getRequest();
            var suggestions = response.getSuggestions();
            if (suggestions.length) {
                var prefix = request.getNormalizedQuery();
                var request = Number.MAX_VALUE;
                a: for (var suggestion, idx = 0; (suggestion = suggestions[idx++]);) {
                    if (!cacheableTypes[suggestion.getType()]) {
                        request = -1;
                        break a;
                    }
                    suggestion = suggestion.getText();
                    request = Math.min(suggestion.length, request);
                }
                if (request != -1) {
                    var candidate = suggestions[0].getText();
                    if (sbox$startsWith(candidate, prefix, true)) {
                        for (idx = prefix.length + 1; idx <= request;) {
                            prefix = null;
                            for (suggestion = 0; (candidate = suggestions[suggestion++]);) {
                                candidate = candidate.getText();
                                if (idx > candidate.length) {
                                    return;
                                }
                                candidate = candidate.substr(0, idx);
                                if (prefix) {
                                    if (prefix != candidate) {
                                        return;
                                    }
                                } else {
                                    prefix = candidate;
                                }
                            }
                            byPrefix[prefix] = response;
                            ++idx;
                        }
                    }
                }
            }
        }
        function get(request) {
            var cached = byPrefix[request.getNormalizedQuery()];
            if (cached) {
                var lowerQuery = request.getLowerCaseQuery();
                var normalized = request.getNormalizedQuery();
                cached.getRequest().getNormalizedQuery();
                var metadata = cached.getMetadataCopy();
                var bold = boldSuggestions || !cached.getMetadataNumber("k");
                var suggestions = [];
                var html;
                var text;
                for (var list = cached.getSuggestions(), idx = 0, suggestion; (suggestion = list[idx++]);) {
                    text = suggestion.getText();
                    html = bold ? bolder.bold(lowerQuery, text) : sbox$htmlEscape(text);
                    suggestions.push(
                        sbox$Suggestion(
                            html,
                            text,
                            suggestion.getIndex(),
                            suggestion.getType(),
                            suggestion.getSubtypes(),
                            suggestion.getAnnotations()
                        )
                    );
                }
                delete byPrefix[normalized];
                request = sbox$Response(
                    request,
                    request.getQuery(),
                    suggestions,
                    metadata,
                    true,
                    cached.isCacheable(),
                    true,
                    false
                );
            } else {
                request = null;
            }
            return request;
        }
        function reset() {
            byPrefix = {};
        }
        var cacheableTypes;
        var byPrefix = {};
        var bolder;
        var boldSuggestions;
        var component = {
            setup: function (container) {
                bolder = container.get(150, component);
            },
            configure: function (cfg) {
                cacheableTypes = sbox$toSet([0]);
                configure(cfg);
            },
            activate: configure,
            getType: function () {
                return 151;
            },
            getComponentId: function () {
                return 98;
            },
            getApi: function () {
                return {
                    getPriority: getPriority,
                    update: update,
                    get: get,
                    reset: reset
                };
            }
        };
        return component;
    });
    function sbox$QueryRow(controller, searcher) {
        var element;
        var row;
        var textSpan;
        var luckyLink;
        var text;
        (function () {
            element = sbox$createDiv();
            element.className = "gsq_a";
            var table = sbox$createTable();
            element.appendChild(table);
            row = table.insertRow(-1);
            table = row.insertCell(-1);
            table.style.width = "100%";
            textSpan = sbox$createElement("span");
            table.appendChild(textSpan);
        })();
        return {
            getElement: function () {
                return element;
            },
            getType: function () {
                return 0;
            },
            isSelectable: function () {
                return true;
            },
            render: function (html, suggestionText, luckyLabel) {
                textSpan.innerHTML = html;
                text = suggestionText;
                if (luckyLabel && !luckyLink) {
                    luckyLink = sbox$appendFeelingLuckyLink(row);
                    luckyLink.onclick = function (event) {
                        controller.blurInput();
                        controller.setInputText(text);
                        searcher.search(text, 9);
                        return sbox$stopEvent(event);
                    };
                }
                if (luckyLabel) {
                    luckyLink.innerHTML = luckyLabel + " &raquo;";
                    luckyLink.style.display = "";
                } else if (luckyLink) {
                    luckyLink.style.display = "none";
                }
            }
        };
    }
    sbox$registry.register(152, 20, function () {
        function configure(cfg) {
            luckyLabel = cfg.showLuckyLinks ? cfg.luckyButtonLabel : "";
        }
        function createItem(searcher) {
            return sbox$QueryRow(controller, searcher);
        }
        function render(suggestion, item) {
            item.render(suggestion.getHtml(), suggestion.getText(), luckyLabel);
        }
        function handleClick(event, suggestion, searcher) {
            searcher.search(suggestion.getText(), 1);
        }
        function getLogKey() {
            return "g";
        }
        function getSuggestionType() {
            return 0;
        }
        var controller;
        var luckyLabel;
        var component = {
            init: function (env, styleSheet) {
                styleSheet.addRule(".gsq_a", "padding:0");
            },
            setup: function (container) {
                controller = container.get(118, component);
            },
            configure: configure,
            activate: configure,
            getType: function () {
                return 152;
            },
            getComponentId: function () {
                return 20;
            },
            getApi: function () {
                return {
                    createItem: createItem,
                    render: render,
                    handleClick: handleClick,
                    submitSuggestion: sbox$noop,
                    getLogKey: getLogKey,
                    getSuggestionType: getSuggestionType
                };
            }
        };
        return component;
    });
    sbox$registry.register(160, 78, function () {
        function isEnabled() {
            return enabled;
        }
        function getPriority() {
            return 1;
        }
        function getElement() {
            return container;
        }
        function loadTia() {
            var script = document.createElement("script");
            script.src = ["//www.google.com/textinputassistant/", version, "/", language, "_tia.js"].join("");
            document.body.appendChild(script);
            container.onclick = handleClick;
        }
        function handleClick(event) {
            if (icon.onclick) {
                icon.onclick(event);
            }
        }
        var enabled;
        var icon;
        var baseUrl;
        var language;
        var version;
        var container;
        var env;
        return {
            init: function (envApi, styleSheet) {
                env = envApi;
                if (!envApi.hasExistingElements()) {
                    styleSheet.addRule(
                        ".gsok_a",
                        "background:url(data:image/gif;base64,R0lGODlhEwALAKECAAAAABISEv///////yH5BAEKAAIALAAAAAATAAsAAAIdDI6pZ+suQJyy0ocV3bbm33EcCArmiUYk1qxAUAAAOw==) no-repeat center;cursor:pointer;display:inline-block;height:11px;line-height:0;margin:0 3px;width:19px"
                    );
                }
            },
            configure: function (cfg) {
                enabled = !!cfg.enableTia;
                baseUrl = cfg.tiaBaseUrl;
                language = cfg.tiaLanguage;
                version = cfg.tiaVersion;
                if ((container = env.get("gs_ok"))) {
                    icon = container.firstChild;
                } else {
                    icon = sbox$createElement("img");
                    icon.style.visibility = "hidden";
                    icon.setAttribute("tia_field_name", env.getInput().name);
                    icon.setAttribute("tia_disable_swap", true);
                    icon.src = baseUrl + "/tia.png";
                    container = sbox$createDiv("gsok_a gsst_e");
                    container.appendChild(icon);
                }
                container.onclick = loadTia;
            },
            getType: function () {
                return 160;
            },
            getComponentId: function () {
                return 78;
            },
            getApi: function () {
                return {
                    isEnabled: isEnabled,
                    getPriority: getPriority,
                    getElement: getElement
                };
            }
        };
    });
    sbox$registry.register(173, 174, function () {
        function setDirection(dir) {
            table.dir = dir;
        }
        function getElement() {
            return table;
        }
        function comparePriority(first, second) {
            return second.getPriority() - first.getPriority();
        }
        function addSpacer(row, className) {
            var spacer = sbox$createDiv(className);
            row.insertCell(-1).appendChild(spacer);
        }
        var events;
        var controller;
        var icons;
        var table;
        var env;
        var component = {
            init: function (envApi, styleSheet) {
                env = envApi;
                if (!envApi.hasExistingElements()) {
                    styleSheet.addRule(".gsst_a", "display:block;padding-top:2px");
                    styleSheet.addRule(".gsst_a:hover", "text-decoration:none!important");
                    styleSheet.addRule(".gsst_b", "width:3px");
                    styleSheet.addRule(".gsst_c", "width:1px");
                    styleSheet.addRule(".gsst_d", "width:7px");
                    styleSheet.addRule(".gsst_e", "filter:alpha(opacity=55);opacity:0.55");
                    styleSheet.addRule(".gsst_a:hover .gsst_e", "filter:alpha(opacity=72);opacity:0.72");
                    styleSheet.addRule(".gsst_a:active .gsst_e", "filter:alpha(opacity=100);opacity:1");
                }
            },
            setup: function (container) {
                events = container.get(117, component);
                controller = container.get(118, component);
                icons = container.getAllApis(160, component);
            },
            configure: function () {
                table = env.get("gs_st");
                if (!table) {
                    icons.sort(comparePriority);
                    table = sbox$createTable();
                    var row = table.insertRow(-1);
                    addSpacer(row, "gsst_b");
                    for (var idx = 0, icon, count = 0; (icon = icons[idx++]);) {
                        if (icon.isEnabled()) {
                            if (count++) {
                                addSpacer(row, "gsst_c");
                            }
                            var link = sbox$createElement("a", "gsst_a");
                            link.appendChild(icon.getElement());
                            row.insertCell(-1).appendChild(link);
                        }
                    }
                    addSpacer(row, "gsst_d");
                    events.defer(function () {
                        table.style.height = controller.getHeight() + "px";
                    });
                }
            },
            getType: function () {
                return 173;
            },
            getComponentId: function () {
                return 174;
            },
            getApi: function () {
                return {
                    setDirection: setDirection,
                    getElement: getElement
                };
            }
        };
        return component;
    });
    sbox$detectBrowserFlags_ = function () {
        var userAgent = window.navigator.userAgent;
        var contains = function (token) {
            return userAgent.indexOf(token) >= 0;
        };
        var flags = {};
        if (window.opera) {
            flags[2] = true;
        } else if (contains("MSIE")) {
            flags[0] = true;
        } else if (contains("WebKit")) {
            flags[5] = true;
            if (contains("Chrome")) {
                flags[3] = true;
            } else if (contains("Android")) {
                flags[7] = true;
            } else if (contains("Safari")) {
                flags[4] = true;
            }
            if (contains("iPad")) {
                flags[6] = true;
            }
        } else if (contains("Gecko")) {
            flags[1] = true;
        }
        return flags;
    };
    function sbox$wrapSearchBoxApi() {
        function wrap(api) {
            return {
                api: api,
                initialize: api.a,
                activate: api.b,
                deactivate: api.c,
                getFormElement: api.d,
                addHiddenInput: api.e,
                getUserQuery: api.f,
                getCurrentText: api.g,
                hasSuggestions: api.h,
                hasHighlight: api.i,
                getStatsParameters: api.j,
                getStatsQueryString: api.k,
                isDropdownVisible: api.l,
                getDropdownState: api.m,
                bindSearchButton: api.n,
                clearCache: api.o,
                suspendDropdown: api.p,
                setQuery: api.q,
                getPanelHeight: api.r,
                clearInput: api.s,
                isRelevant: api.t,
                selectInput: api.u,
                focus: api.v,
                blur: api.w,
                isSuspended: api.x,
                getLastResponse: api.y,
                showText: api.z,
                parseResponseText: api.aa,
                resetTimers: api.ab,
                search: api.ad,
                refreshChips: api.ae,
                setDropdownEnabled: api.af,
                showOrRequest: api.ag,
                getSelected: api.ah,
                notifyResize: api.ai,
                completeWithSuggestion: api.al,
                isActive: api.am,
                setChips: api.an,
                hasChips: api.ao,
                getChipsText: api.ap,
                findInput: api.aq,
                getInputMode: api.ar,
                getId: api.as,
                clearChips: api.at,
                showSuggestions: api.au,
                fireQueryEvent: api.av
            };
        }
        return {
            getInstance: function (input, form, callbacks) {
                try {
                    var api = window.google.sbox(input, form, callbacks);
                    return wrap(api);
                } catch (d) {
                    return null;
                }
            },
            translate: function (apiOrWrapper) {
                return wrap(apiOrWrapper.api || apiOrWrapper);
            }
        };
    }
    if (!window.google) {
        window.google = {};
    }
    window.google.sbox = function (input, form, callbacksObject) {
        function deactivate() {
            searchBox.deactivate();
        }
        function showText(text) {
            controller.showText(text || "");
        }
        function getInputMode() {
            return inputMode;
        }
        function getInstanceId() {
            return instanceId;
        }
        function getCurrentText() {
            return controller.getCurrentText();
        }
        function notifyResize() {
            events.fire(8);
        }
        function hasChips() {
            return !!chips && chips.hasChips();
        }
        function translateConfig(external) {
            external = configHelper.translate(external);
            if (!external.allowedTypes[35]) {
                external.historyToken = "";
            }
            var tiaLang = external.tiaLanguage;
            if (tiaLang) {
                external.tiaLanguage = tiaLang.toLowerCase();
            } else {
                external.enableTia = false;
            }
            if (!sbox$CHROME) {
                external.reserveIconSpace = false;
            }
            return external;
        }
        function watchResize() {
            var lastSize = sbox$getViewportSize();
            events.addDomListener(window, "resize", function () {
                var size = sbox$getViewportSize();
                if (size.viewportWidth != lastSize.viewportWidth || size.viewportHeight != lastSize.viewportHeight) {
                    lastSize = size;
                    notifyResize();
                }
            });
        }
        function computeInputMode(cfg) {
            var componentsConfig = cfg.components;
            var flag135 = componentsConfig[135];
            var flag137 = componentsConfig[137];
            var flag138 = componentsConfig[138];
            if (componentsConfig[139] || flag135 || flag137 || flag138) {
                cfg.components[136] = true;
                cfg.components[141] = true;
                if (flag137 || flag138) {
                    flag135 = sbox$isCjkLanguage(cfg.language);
                    if (cfg.forceInputMode3 || (sbox$GECKO && (sbox$IS_MAC || flag135)) || (sbox$IE && flag135)) {
                        inputMode = 3;
                        componentsConfig[137] = false;
                        componentsConfig[142] = false;
                    } else {
                        inputMode = 2;
                    }
                } else {
                    inputMode = 1;
                }
            } else {
                inputMode = 0;
            }
        }
        var callbacks;
        var searchBox;
        var configHelper;
        var chips;
        var panelManager;
        var events;
        var requester;
        var controller;
        var inputComponent;
        var stats;
        var responseState;
        var dropdown;
        var component139;
        var searcher;
        var instanceId;
        var inputMode;
        var initialized = false;
        var api = {
            a: function (external) {
                if (!initialized) {
                    var external = translateConfig(external);
                    var styleSheet = sbox$StyleSheet(external.styleParent, external.injectStyles);
                    computeInputMode(external);
                    searchBox = sbox$SearchBox(
                        callbacks,
                        external.componentConfigs || {},
                        input,
                        form,
                        styleSheet,
                        api,
                        external
                    );
                    callbacks.onStyleSheet(styleSheet);
                    styleSheet.install();
                    chips = searchBox.get(130, api);
                    panelManager = searchBox.get(115, api);
                    events = searchBox.get(117, api);
                    requester = searchBox.get(123, api);
                    controller = searchBox.get(118, api);
                    inputComponent = searchBox.get(119, api);
                    stats = searchBox.get(120, api);
                    responseState = searchBox.get(126, api);
                    dropdown = searchBox.get(128, api);
                    component139 = searchBox.get(139, api);
                    searcher = searchBox.get(121, api);
                    watchResize();
                    initialized = true;
                }
            },
            b: function (external) {
                deactivate();
                external = translateConfig(external);
                computeInputMode(external);
                searchBox.activate(external);
            },
            c: deactivate,
            d: function () {
                return form;
            },
            e: function (targetForm, name) {
                return sbox$addHiddenInput(targetForm, name);
            },
            f: function () {
                return controller.getUserQuery();
            },
            g: getCurrentText,
            h: function () {
                return dropdown.hasSuggestions();
            },
            i: function () {
                return dropdown.hasHighlight();
            },
            j: function (searchType) {
                return stats.getParameters(searchType);
            },
            k: function (params, searchType) {
                if (!params) {
                    params = stats.getParameters(searchType);
                }
                return sbox$buildQueryString(params);
            },
            l: function () {
                return dropdown.isVisible();
            },
            m: function () {
                return dropdown.getState();
            },
            n: function (button, searchType) {
                events.addDomListener(button, "click", function (event) {
                    searcher.search(getCurrentText(), searchType);
                    return sbox$preventDefault(event);
                });
            },
            o: function () {
                requester.clearCache();
            },
            p: function () {
                dropdown.suspendAndHide();
            },
            q: function (query) {
                controller.setQuery(query || "");
            },
            r: function () {
                return panelManager.getHeight();
            },
            s: function () {
                controller.clear();
            },
            t: function (json) {
                return requester.isRelevant(json);
            },
            u: function () {
                controller.selectInput();
            },
            v: function () {
                inputComponent.focus();
            },
            w: function () {
                inputComponent.blur();
            },
            x: function () {
                return requester.isSuspended();
            },
            y: function () {
                var response = responseState.getLastResponse();
                if (response) {
                    return sbox$wrapResponseApi(response.getMinimalApi());
                } else {
                    return null;
                }
            },
            z: showText,
            aa: function (json) {
                json = requester.parseResponseText(json, null);
                return sbox$wrapResponseApi(json.getMinimalApi());
            },
            ab: function () {
                stats.reset();
            },
            ad: function (query, searchType) {
                searcher.search(query, searchType);
            },
            ae: function () {
                if (component139) {
                    component139.refresh();
                }
            },
            af: function (enabled) {
                dropdown.setEnabled(enabled);
            },
            ag: function () {
                dropdown.showOrRequest();
            },
            ah: function () {
                return dropdown.getSelected();
            },
            ai: notifyResize,
            al: function () {
                controller.completeWithSuggestion();
            },
            am: function () {
                return searchBox && searchBox.isActive();
            },
            an: function (chipsData) {
                if (chips) {
                    chips.setChips(chipsData);
                }
            },
            ao: hasChips,
            ap: function () {
                if (hasChips()) {
                    return chips.getChipsText();
                } else {
                    return "";
                }
            },
            aq: function (targetForm, name) {
                return sbox$findInput(targetForm, name);
            },
            ar: getInputMode,
            as: getInstanceId,
            at: function () {
                if (component139) {
                    component139.clear();
                }
            },
            au: function (text, suggestions) {
                showText(text);
                if (dropdown.isEnabled()) {
                    dropdown.showSuggestions(text, suggestions, false);
                }
            },
            av: function (query) {
                events.fire(16, {
                    query: query
                });
            },
            getId: getInstanceId,
            getInputMode: getInputMode
        };
        instanceId = sbox$registry.nextInstanceId();
        configHelper = sbox$createConfigHelper();
        callbacks = sbox$Callbacks(callbacksObject);
        (function () {
            var userAgent = window.navigator.userAgent;
            var flags = callbacks.getBrowserFlags();
            var version;
            version = (version = /Version\/(\d+)/.exec(userAgent)) && version[1];
            if (!version) {
                version = (version = /(?:Android|Chrome|Firefox|Opera|MSIE)[\s\/](\d+)/.exec(userAgent)) && version[1];
            }
            version = parseInt(version, 10) || 0;
            userAgent =
                ((userAgent = /(?:AppleWebKit|Gecko|Presto|Trident)\/(\d+)/.exec(userAgent)) &&
                    parseInt(userAgent[1], 10)) ||
                0;
            sbox$IE_LE7 =
                (sbox$IE_LE8 = (sbox$IE = flags[0]) && version <= 8 && userAgent <= 4) &&
                version <= 7 &&
                userAgent <= 3;
            sbox$GECKO = flags[1];
            sbox$OPERA = flags[2];
            sbox$WEBKIT = flags[5];
            sbox$SAFARI = flags[4];
            sbox$CHROME = flags[3];
            sbox$ANDROID = flags[7];
        })();
        sbox$IS_MAC = /Mac/.test((navigator && (navigator.platform || navigator.appVersion)) || "");
        return api;
    };
    var sbox$installYouTube_;
    (function () {
        var MSIE_VERSION_RE = /MSIE\s+(\S+)/;
        var OPERA_VERSION_RE = /Version\/(\S+)/;
        var MOVIES_PATH_RE = /\/(movie|show)s?($|[?#/])/i;
        var MOVIES_SEARCH_RE = /\/results\?(.*&)?search_type=(movies|shows)($|[&#])/i;
        var EXPERIMENTS = {
            1: "cytdh",
            2: "eytdh",
            5: "eytpf",
            6: "cytpf"
        };
        var searchBoxApi;
        var form;
        var browserFlags;
        var isWindows;
        var isMac;
        var isLinux;
        var browserVersion;
        var tiaEnabled;
        var callbacks = {
            a: function () {
                return browserFlags;
            },
            b: function (query, searchType) {
                // backtube: tracking fields (oq, aq, aqi, aql, gs_sm, gs_upl) are no longer filled in.
                form.submit();
            },
            r: function (styleSheet) {
                styleSheet.addRule(".gsfi", "font-size:12px");
                styleSheet.addRule(".gsfs", "font-size:13px");
                styleSheet.addRule(".gssb_a,.gssb_a td", "line-height:17px");
                var isGecko = browserFlags[1];
                var isChrome = browserFlags[3];
                var isSafari = browserFlags[4];
                var isOpera = browserFlags[2];
                var isRtl = document.body.dir == "rtl";
                var rightPadding = 7;
                var leftPadding = 7;
                if (isMac) {
                    if (isChrome) {
                        rightPadding = 6;
                        leftPadding = isRtl ? 8 : 7;
                    } else if (isSafari) {
                        rightPadding = 6;
                    } else if (isGecko) {
                        rightPadding = isRtl ? 6 : 7;
                        leftPadding = 6;
                    } else if (isOpera) {
                        rightPadding = isRtl ? 6 : 7;
                        leftPadding = isRtl ? 7 : 6;
                    }
                } else if (isWindows) {
                    if (browserFlags[0]) {
                        if (browserVersion == 7) {
                            leftPadding = 4;
                            rightPadding = isRtl ? 4 : 3;
                        } else if (browserVersion == 8) {
                            leftPadding = isRtl ? 7 : 6;
                            rightPadding = 4;
                        } else if (browserVersion == 9) {
                            leftPadding = 5;
                            rightPadding = isRtl ? 5 : 7;
                        }
                    } else if (isChrome) {
                        rightPadding = 6;
                        leftPadding = isRtl ? 8 : 7;
                    } else if (isSafari || isGecko) {
                        rightPadding = 6;
                    } else if (isOpera) {
                        rightPadding = leftPadding = 6;
                    }
                } else if (isLinux) {
                    if (isGecko) {
                        rightPadding = isRtl ? 6 : 7;
                    } else if (isChrome) {
                        rightPadding = 5;
                        leftPadding = isRtl ? 8 : 7;
                    } else if (isOpera) {
                        rightPadding = leftPadding = 6;
                    }
                }
                styleSheet.addRule(".gssb_a", "padding:" + ["0 ", rightPadding, "px 0 ", leftPadding, "px"].join(""));
                styleSheet.addRule(".gssb_c", "z-index:3000001");
                styleSheet.addRule(".gssb_i td", "background:#eee");
                styleSheet.addRule(".gssb_k", "z-index:3000000");
                if (tiaEnabled) {
                    styleSheet.addRule(".gsib_a", "padding:0 4px");
                    styleSheet.addRule(".gsok_a", "padding:0");
                    styleSheet.addRule(".gsok_a img", "display:block");
                }
                styleSheet.addRule(
                    ".gsfe_b",
                    "border:1px solid #1c62b9;outline:none;box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3);-moz-box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3);-webkit-box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3)"
                );
                if (browserFlags[0] && browserVersion == 7) {
                    styleSheet.addRule(".gsib_a", "padding:2px 10px 5px 2px");
                    styleSheet.addRule("body.rtl .gsib_a", "padding:2px 6px 5px");
                }
            }
        };
        (function () {
            var userAgent = window.navigator.userAgent;
            var matchVersion = function (re) {
                if ((re = userAgent.match(re))) {
                    return parseInt(re[1], 10);
                } else {
                    return NaN;
                }
            };
            browserFlags = sbox$detectBrowserFlags_();
            if (browserFlags[2]) {
                browserVersion = matchVersion(OPERA_VERSION_RE);
            } else if (browserFlags[0]) {
                browserVersion = matchVersion(MSIE_VERSION_RE);
            }
            isWindows = userAgent.indexOf("Windows") >= 0;
            isMac = userAgent.indexOf("Macintosh") >= 0;
            isLinux = userAgent.indexOf("Linux") >= 0;
        })();
        sbox$installYouTube_ = function (
            formElement,
            input,
            language,
            country,
            closeLinkLabel,
            enableTia,
            wrapper,
            configHelper,
            historyToken,
            removedMessage,
            removeLinkLabel,
            suggestMode
        ) {
            form = formElement;
            var wrapper = sbox$wrapSearchBoxApi();
            var configHelper = sbox$createConfigHelper();
            var config = configHelper.getInstance();
            config.client = "youtube";
            config.dataSource = "yt";
            config.language = language;
            config.country = country;
            config.unusedOptionW = false;
            config.unusedOptionAg = 0;
            config.unusedOptionAh = false;
            config.unusedOptionAi = false;
            config.tabCompletionMode = 0;
            config.completeOnRightArrow = false;
            config.searchOnRightArrow = false;
            config.showOutline = false;
            config.boldSuggestions = true;
            config.overlayClassName = "gsfi";
            config.rowClassName = "gsfs";
            config.logTimings = true;
            var country = config;
            var isMoviesPage;
            isMoviesPage = window.location.href;
            isMoviesPage = MOVIES_PATH_RE.test(isMoviesPage) || MOVIES_SEARCH_RE.test(isMoviesPage);
            country.requestsDisabled = isMoviesPage;
            config.enableTia = tiaEnabled = enableTia;
            config.tiaLanguage = language;
            config.tiaBaseUrl = "//www.gstatic.com/inputtools/images";
            config.tiaVersion = 2;
            config.allowedTypes = sbox$toSet([0]);
            config.focusTargetId = "masthead-search-terms";
            enableTia = {};
            config.componentConfigs = enableTia;
            if (suggestMode == 1) {
                config.client = "youtube-psuggest";
                config.highlightPersonal = true;
                config.historyToken = historyToken;
                config.removedMessage = removedMessage;
                config.removeLinkLabel = removeLinkLabel;
                config.allowedTypes[35] = true;
            }
            if (suggestMode == 3 || suggestMode == 4) {
                config.dataSource = "yt_mv";
                config.requestsDisabled = false;
            }
            if (suggestMode in EXPERIMENTS) {
                config.experiment = EXPERIMENTS[suggestMode];
            }
            if (!browserFlags[2]) {
                config.useIframeShim = true;
            }
            historyToken = browserFlags[1];
            removedMessage = browserFlags[3];
            if (
                window.location.href.indexOf("/watch?") != -1 &&
                (browserFlags[2] ||
                    (isWindows && (historyToken || browserFlags[5])) ||
                    (isMac && (historyToken || removedMessage)) ||
                    (isLinux && removedMessage))
            ) {
                config.client = "youtube-reduced";
                config.maxSuggestions = 4;
            } else {
                enableTia[152] = [sbox$CloseLinkRenderer(closeLinkLabel), 162];
                config.reenableDropdownOnEmpty = true;
                config.allowedTypes[501] = true;
            }
            if (browserFlags[0] && browserVersion == 7) {
                config.forceWrap = true;
            } else {
                config.anchorElementId = "masthead-search-terms";
            }
            closeLinkLabel = 1;
            removedMessage = historyToken = 0;
            removeLinkLabel = 2;
            if (isWindows) {
                if (browserFlags[0]) {
                    if (browserVersion == 7) {
                        removedMessage = closeLinkLabel = 2;
                        historyToken = 0;
                    } else if (browserVersion == 8) {
                        closeLinkLabel = 5;
                        if (config.enableTia) {
                            historyToken = closeLinkLabel = -1;
                        }
                    } else if (browserVersion == 9) {
                        closeLinkLabel = -1;
                    }
                } else if (browserFlags[1]) {
                    closeLinkLabel = 2;
                    historyToken = 1;
                    removedMessage = -1;
                    removeLinkLabel = 1;
                }
            }
            if (browserFlags[2]) {
                historyToken = -1;
            }
            config.dropdownOffsets = [closeLinkLabel, historyToken, removedMessage, removeLinkLabel, historyToken, 0];
            closeLinkLabel = [0];
            if (browserFlags[0] && browserVersion == 8) {
                closeLinkLabel[0] = -1;
            }
            config.shimPadding = closeLinkLabel;
            if (sbox$isCjkLanguage(language)) {
                config.pollInput = true;
            }
            config = configHelper.normalize(config);
            searchBoxApi = wrapper.getInstance(input, formElement, callbacks);
            searchBoxApi.initialize(config);
            if ((formElement = document.getElementById("search-btn"))) {
                searchBoxApi.bindSearchButton(formElement, 12);
                formElement.onclick = null;
            }
            // backtube: the hidden tracking fields (oq, aq, aqi, aql, gs_sm, gs_upl) are no longer added
            // to the search form, so a search submits only search_query.
        };
        return callbacks;
    })();
    var searchbox$yt$install = sbox$installYouTube_;
    var searchbox$exportPath_ = ["searchbox", "yt", "install"];
    var searchbox$exportTarget_ = this;
    if (!(searchbox$exportPath_[0] in searchbox$exportTarget_) && searchbox$exportTarget_.execScript) {
        searchbox$exportTarget_.execScript("var " + searchbox$exportPath_[0]);
    }
    for (
        var searchbox$exportPart_;
        searchbox$exportPath_.length && (searchbox$exportPart_ = searchbox$exportPath_.shift());
    ) {
        if (!searchbox$exportPath_.length && searchbox$yt$install !== undefined) {
            searchbox$exportTarget_[searchbox$exportPart_] = searchbox$yt$install;
        } else {
            searchbox$exportTarget_ = searchbox$exportTarget_[searchbox$exportPart_]
                ? searchbox$exportTarget_[searchbox$exportPart_]
                : (searchbox$exportTarget_[searchbox$exportPart_] = {});
        }
    }
})();
