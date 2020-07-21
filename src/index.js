customElements.define(
  "web-vitals",
  class extends HTMLElement {
    constructor() {
      super();
      this.dev = this.hasAttribute("dev");
      this.template = `
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).webVitals = {})
}(this, (function(t) {
    "use strict";
    var e, n, i = function() {
        return "".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
    }, a = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
        return {
            name: t,
            value: e,
            delta: 0,
            entries: [],
            id: i(),
            isFinal: !1
        }
    }, r = function(t, e) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(t)) {
                var n = new PerformanceObserver((function(t) {
                    return t.getEntries().map(e)
                }
                ));
                return n.observe({
                    type: t,
                    buffered: !0
                }),
                n
            }
        } catch (t) {}
    }, o = !1, s = !1, u = function(t) {
        o = !t.persisted
    }, c = function() {
        addEventListener("pagehide", u),
        addEventListener("unload", (function() {}
        ))
    }, d = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        s || (c(),
        s = !0),
        addEventListener("visibilitychange", (function(e) {
            var n = e.timeStamp;
            "hidden" === document.visibilityState && t({
                timeStamp: n,
                isUnloading: o
            })
        }
        ), {
            capture: !0,
            once: e
        })
    }, f = function(t, e, n, i) {
        var a;
        return function() {
            n && e.isFinal && n.disconnect(),
            e.value >= 0 && (i || e.isFinal || "hidden" === document.visibilityState) && (e.delta = e.value - (a || 0),
            (e.delta || e.isFinal || void 0 === a) && (t(e),
            a = e.value))
        }
    }, p = function() {
        return void 0 === e && (e = "hidden" === document.visibilityState ? 0 : 1 / 0,
        d((function(t) {
            var n = t.timeStamp;
            return e = n
        }
        ), !0)),
        {
            get timeStamp() {
                return e
            }
        }
    }, l = function() {
        return n || (n = new Promise((function(t) {
            return ["scroll", "keydown", "pointerdown"].map((function(e) {
                addEventListener(e, t, {
                    once: !0,
                    passive: !0,
                    capture: !0
                })
            }
            ))
        }
        ))),
        n
    };
    t.getCLS = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          , n = a("CLS", 0)
          , i = function(t) {
            t.hadRecentInput || (n.value += t.value,
            n.entries.push(t),
            s())
        }
          , o = r("layout-shift", i)
          , s = f(t, n, o, e);
        d((function(t) {
            var e = t.isUnloading;
            o && o.takeRecords().map(i),
            e && (n.isFinal = !0),
            s()
        }
        ))
    }
    ,
    t.getFCP = function(t) {
        var e = a("FCP")
          , n = p()
          , i = r("paint", (function(t) {
            "first-contentful-paint" === t.name && t.startTime < n.timeStamp && (e.value = t.startTime,
            e.isFinal = !0,
            e.entries.push(t),
            o())
        }
        ))
          , o = f(t, e, i)
    }
    ,
    t.getFID = function(t) {
        var e = a("FID")
          , n = p()
          , i = function(t) {
            t.startTime < n.timeStamp && (e.value = t.processingStart - t.startTime,
            e.entries.push(t),
            e.isFinal = !0,
            s())
        }
          , o = r("first-input", i)
          , s = f(t, e, o);
        d((function() {
            o && (o.takeRecords().map(i),
            o.disconnect())
        }
        ), !0),
        o || window.perfMetrics && window.perfMetrics.onFirstInputDelay && window.perfMetrics.onFirstInputDelay((function(t, i) {
            i.timeStamp < n.timeStamp && (e.value = t,
            e.isFinal = !0,
            e.entries = [{
                entryType: "first-input",
                name: i.type,
                target: i.target,
                cancelable: i.cancelable,
                startTime: i.timeStamp,
                processingStart: i.timeStamp + t
            }],
            s())
        }
        ))
    }
    ,
    t.getLCP = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          , n = a("LCP")
          , i = p()
          , o = function(t) {
            var e = t.startTime;
            e < i.timeStamp ? (n.value = e,
            n.entries.push(t)) : n.isFinal = !0,
            u()
        }
          , s = r("largest-contentful-paint", o)
          , u = f(t, n, s, e)
          , c = function() {
            n.isFinal || (s && s.takeRecords().map(o),
            n.isFinal = !0,
            u())
        };
        l().then(c),
        d(c, !0)
    }
    ,
    t.getTTFB = function(t) {
        var e, n = a("TTFB");
        e = function() {
            try {
                var e = performance.getEntriesByType("navigation")[0] || function() {
                    var t = performance.timing
                      , e = {
                        entryType: "navigation",
                        startTime: 0
                    };
                    for (var n in t)
                        "navigationStart" !== n && "toJSON" !== n && (e[n] = Math.max(t[n] - t.navigationStart, 0));
                    return e
                }();
                n.value = n.delta = e.responseStart,
                n.entries = [e],
                n.isFinal = !0,
                t(n)
            } catch (t) {}
        }
        ,
        "complete" === document.readyState ? setTimeout(e, 0) : addEventListener("pageshow", e)
    }
    ,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}
));
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', webv) : webv();
function webv() {
    console.info('What is this? Check link -> https://web.dev/vitals/');
    webVitals.getLCP(log)
    webVitals.getCLS(log, true);
}

function log(data) {
    var title = data.name;
    if (data.isFinal) title = data.name + ' (Final)'
    console.groupCollapsed('Web Vitals Category: ' + title);
    
    logValue(data);
    logLastEntry(data.entries);
    
    console.log('Full ' + data.name + ' Metric: ', data); // log whole object anyways
    console.groupEnd();
}

function logLastEntry(entries) { // log most recent entry instead of the entry array, this prevents eager evaluation
    var lastEntryIndex = entries.length - 1;
    var entry = entries[lastEntryIndex];
    if (entry.element) console.log('Element: ', entry.element);
    console.log('Most recent entry: ', entry);
}

function logValue({ value, delta, name }) { // calculates acceptable values
    var ts = 0; // timestamp
    var state = false;
    if (name === 'LCP') {
        ts = value / 1000;
        if (ts > 2.5) console.warn('Paint is happening too late (Threshold < 2.5s)');
        console.info('Timestamp (in Seconds): ', ts);
        delta !== value && console.log('Change: ', delta);
        return;
    }
    if (name === 'FID') {
        ts = value;
        if (ts > 100) console.warn('Input delay is too high (Threshold < 100ms)');
        console.info('Timestamp (in Milliseconds): ', ts);
        delta !== value && console.log('Change: ', delta);
        return;
    }
    if (name === 'CLS') {
        if (value > 0.1) console.warn('Cumulative shift is past threshold (Threshold < 0.1)');
        console.info('Layout Shift: ', value);
        delta !== value && console.log('Change: ', delta);
        return;
    }
    return {};
}
`;

      var el = document.createElement("script");
      el.innerHTML = this.template;
      var s = this.attachShadow({ mode: "open" });
      this.dev && s.appendChild(el);
    }
  }
);
