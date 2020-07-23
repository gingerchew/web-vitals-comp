var e,
	n,
	t = function () {
		return ''
			.concat(Date.now(), '-')
			.concat(Math.floor(8999999999999 * Math.random()) + 1e12);
	},
	i = function (e) {
		var n =
			arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
		return {
			name: e,
			value: n,
			delta: 0,
			entries: [],
			id: t(),
			isFinal: !1,
		};
	},
	o = function (e, n) {
		try {
			if (PerformanceObserver.supportedEntryTypes.includes(e)) {
				var t = new PerformanceObserver(function (e) {
					return e.getEntries().map(n);
				});
				return t.observe({ type: e, buffered: !0 }), t;
			}
		} catch (e) {}
	},
	a = !1,
	c = !1,
	r = function (e) {
		a = !e.persisted;
	},
	s = function () {
		addEventListener('pagehide', r),
			addEventListener('unload', function () {});
	},
	l = function (e) {
		var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
		c || (s(), (c = !0)),
			addEventListener(
				'visibilitychange',
				function (n) {
					'hidden' === document.visibilityState &&
						e({ timeStamp: n.timeStamp, isUnloading: a });
				},
				{ capture: !0, once: n }
			);
	},
	u = function (e, n, t, i) {
		var o;
		return function () {
			t && n.isFinal && t.disconnect(),
				n.value >= 0 &&
					(i || n.isFinal || 'hidden' === document.visibilityState) &&
					((n.delta = n.value - (o || 0)),
					(n.delta || n.isFinal || void 0 === o) &&
						(e(n), (o = n.value)));
		};
	},
	d = function () {
		return (
			void 0 === e &&
				((e = 'hidden' === document.visibilityState ? 0 : 1 / 0),
				l(function (n) {
					return (e = n.timeStamp);
				}, !0)),
			{
				get timeStamp() {
					return e;
				},
			}
		);
	},
	m = function () {
		return (
			n ||
				(n = new Promise(function (e) {
					return ['scroll', 'keydown', 'pointerdown'].map(function (
						n
					) {
						addEventListener(n, e, {
							once: !0,
							passive: !0,
							capture: !0,
						});
					});
				})),
			n
		);
	};
const p =
		'font-size: 13px; padding: 2.5px 0.5em 2.5px 2.5px; margin-bottom: 3px;',
	g = p.concat(
		'padding-right: 1.5em; background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); background-position: right center; background-repeat: no-repeat;'
	),
	v = g.concat(
		"color: #0a0; background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");"
	),
	f = g.concat(
		"color: #e65722; text-decoration: underline; background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e65722' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e65722' stroke='none'/%3e%3c/svg%3e\");"
	),
	h = p.concat('color: 3477db;');
customElements.define(
	'web-vitals',
	class extends HTMLElement {
		constructor() {
			super(), this.hasAttribute('dev') && this.logFunction();
		}
		logFunction() {
			function e() {
				r('What is this? Check link -> https://web.dev/vitals/'),
					(function (e) {
						var n,
							t =
								arguments.length > 1 &&
								void 0 !== arguments[1] &&
								arguments[1],
							a = i('LCP'),
							c = d(),
							r = function (e) {
								var t = e.startTime;
								t < c.timeStamp
									? ((a.value = t), a.entries.push(e))
									: (a.isFinal = !0),
									n();
							},
							s = o('largest-contentful-paint', r);
						if (s) {
							n = u(e, a, s, t);
							var p = function () {
								a.isFinal ||
									(s.takeRecords().map(r),
									(a.isFinal = !0),
									n());
							};
							m().then(p), l(p, !0);
						}
					})(n),
					(function (e) {
						var n,
							t =
								arguments.length > 1 &&
								void 0 !== arguments[1] &&
								arguments[1],
							a = i('CLS', 0),
							c = function (e) {
								e.hadRecentInput ||
									((a.value += e.value),
									a.entries.push(e),
									n());
							},
							r = o('layout-shift', c);
						r &&
							((n = u(e, a, r, t)),
							l(function (e) {
								var t = e.isUnloading;
								r.takeRecords().map(c),
									t && (a.isFinal = !0),
									n();
							}));
					})(n, !0),
					(function (e) {
						var n = i('FID'),
							t = d(),
							a = function (e) {
								e.startTime < t.timeStamp &&
									((n.value =
										e.processingStart - e.startTime),
									n.entries.push(e),
									(n.isFinal = !0),
									r());
							},
							c = o('first-input', a),
							r = u(e, n, c);
						c
							? l(function () {
									c.takeRecords().map(a), c.disconnect();
							  }, !0)
							: window.perfMetrics &&
							  window.perfMetrics.onFirstInputDelay &&
							  window.perfMetrics.onFirstInputDelay(function (
									e,
									i
							  ) {
									i.timeStamp < t.timeStamp &&
										((n.value = e),
										(n.isFinal = !0),
										(n.entries = [
											{
												entryType: 'first-input',
												name: i.type,
												target: i.target,
												cancelable: i.cancelable,
												startTime: i.timeStamp,
												processingStart:
													i.timeStamp + e,
											},
										]),
										r());
							  });
					})(n);
			}
			function n(e) {
				var n = e.name;
				e.isFinal && (n = e.name + ' (Final)'),
					console.groupCollapsed('%cWeb Vitals Category: ' + n, p),
					(function (e) {
						var n = e.value,
							i = e.delta,
							o = e.name,
							s = 0;
						'LCP' === o
							? ((s = n / 1e3) > 2.5
									? t(
											'Paint is happening too late (Threshold < 2.5s)'
									  )
									: c('Passing'),
							  a('Timestamp (in Seconds): ', s),
							  i !== n && console.log('Change: ', i))
							: 'FID' === o
							? ((s = n) > 100 &&
									t(
										'Input delay is too high (Threshold < 100ms)'
									),
							  a('Timestamp (in Milliseconds): ', s),
							  i !== n && console.log('Change: ', i))
							: 'CLS' === o &&
							  (n > 0.1
									? t(
											'Cumulative shift is past threshold (Threshold < 0.1)'
									  )
									: c('Passing'),
							  a('Layout Shift: ', n),
							  i !== n && r('Change: ', i));
					})(e),
					(function (e) {
						var n = e.entries[e.entries.length - 1];
						n.element && console.log('Element: ', n.element),
							console.log('Most recent entry: ', n);
					})(e),
					console.log('Full ' + e.name + ' Metric: ', e),
					console.groupEnd();
			}
			function t(e) {
				console.log('%c%s', f, e);
			}
			function a(e, ...n) {
				n ? console.log('%c%s', h, e, ...n) : console.log('%c%s', h, e);
			}
			function c(e) {
				console.log('%c%s', v, e);
			}
			function r(e) {
				const n = Array.from(arguments).slice(1, -1);
				console.log('%c' + e, p, ...n);
			}
			'loading' === document.readyState
				? document.addEventListener('DOMContentLoaded', e)
				: e();
		}
	}
);
