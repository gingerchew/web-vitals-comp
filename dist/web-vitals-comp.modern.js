var e,
	t,
	n = function () {
		return ''
			.concat(Date.now(), '-')
			.concat(Math.floor(8999999999999 * Math.random()) + 1e12);
	},
	i = function (e) {
		var t =
			arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
		return {
			name: e,
			value: t,
			delta: 0,
			entries: [],
			id: n(),
			isFinal: !1,
		};
	},
	o = function (e, t) {
		try {
			if (PerformanceObserver.supportedEntryTypes.includes(e)) {
				var n = new PerformanceObserver(function (e) {
					return e.getEntries().map(t);
				});
				return n.observe({ type: e, buffered: !0 }), n;
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
		var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
		c || (s(), (c = !0)),
			addEventListener(
				'visibilitychange',
				function (t) {
					'hidden' === document.visibilityState &&
						e({ timeStamp: t.timeStamp, isUnloading: a });
				},
				{ capture: !0, once: t }
			);
	},
	u = function (e, t, n, i) {
		var o;
		return function () {
			n && t.isFinal && n.disconnect(),
				t.value >= 0 &&
					(i || t.isFinal || 'hidden' === document.visibilityState) &&
					((t.delta = t.value - (o || 0)),
					(t.delta || t.isFinal || void 0 === o) &&
						(e(t), (o = t.value)));
		};
	},
	d = function () {
		return (
			void 0 === e &&
				((e = 'hidden' === document.visibilityState ? 0 : 1 / 0),
				l(function (t) {
					return (e = t.timeStamp);
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
			t ||
				(t = new Promise(function (e) {
					return ['scroll', 'keydown', 'pointerdown'].map(function (
						t
					) {
						addEventListener(t, e, {
							once: !0,
							passive: !0,
							capture: !0,
						});
					});
				})),
			t
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
	h = g.concat(
		"color: #e65722; text-decoration: underline; background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e65722' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e65722' stroke='none'/%3e%3c/svg%3e\");"
	),
	f = p.concat('color: 3477db;');
customElements.define(
	'web-vitals',
	class extends HTMLElement {
		constructor() {
			super(),
				(this.dev = this.hasAttribute('dev')),
				(this.template = this.logFunction());
			var e = document.createElement('script');
			e.innerHTML = this.template;
			var t = this.attachShadow({ mode: 'open' });
			this.dev && t.appendChild(e);
		}
		logFunction() {
			function e() {
				r('What is this? Check link -> https://web.dev/vitals/'),
					(function (e) {
						var t,
							n =
								arguments.length > 1 &&
								void 0 !== arguments[1] &&
								arguments[1],
							a = i('LCP'),
							c = d(),
							r = function (e) {
								var n = e.startTime;
								n < c.timeStamp
									? ((a.value = n), a.entries.push(e))
									: (a.isFinal = !0),
									t();
							},
							s = o('largest-contentful-paint', r);
						if (s) {
							t = u(e, a, s, n);
							var p = function () {
								a.isFinal ||
									(s.takeRecords().map(r),
									(a.isFinal = !0),
									t());
							};
							m().then(p), l(p, !0);
						}
					})(t),
					(function (e) {
						var t,
							n =
								arguments.length > 1 &&
								void 0 !== arguments[1] &&
								arguments[1],
							a = i('CLS', 0),
							c = function (e) {
								e.hadRecentInput ||
									((a.value += e.value),
									a.entries.push(e),
									t());
							},
							r = o('layout-shift', c);
						r &&
							((t = u(e, a, r, n)),
							l(function (e) {
								var n = e.isUnloading;
								r.takeRecords().map(c),
									n && (a.isFinal = !0),
									t();
							}));
					})(t, !0),
					(function (e) {
						var t = i('FID'),
							n = d(),
							a = function (e) {
								e.startTime < n.timeStamp &&
									((t.value =
										e.processingStart - e.startTime),
									t.entries.push(e),
									(t.isFinal = !0),
									r());
							},
							c = o('first-input', a),
							r = u(e, t, c);
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
									i.timeStamp < n.timeStamp &&
										((t.value = e),
										(t.isFinal = !0),
										(t.entries = [
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
					})(t);
			}
			function t(e) {
				var t = e.name;
				e.isFinal && (t = e.name + ' (Final)'),
					console.groupCollapsed('%cWeb Vitals Category: ' + t, p),
					(function (e) {
						var t = e.value,
							i = e.delta,
							o = e.name,
							s = 0;
						'LCP' === o
							? ((s = t / 1e3) > 2.5
									? n(
											'Paint is happening too late (Threshold < 2.5s)'
									  )
									: c('Passing'),
							  a('Timestamp (in Seconds): ', s),
							  i !== t && console.log('Change: ', i))
							: 'FID' === o
							? ((s = t) > 100 &&
									n(
										'Input delay is too high (Threshold < 100ms)'
									),
							  a('Timestamp (in Milliseconds): ', s),
							  i !== t && console.log('Change: ', i))
							: 'CLS' === o &&
							  (t > 0.1
									? n(
											'Cumulative shift is past threshold (Threshold < 0.1)'
									  )
									: c('Passing'),
							  a('Layout Shift: ', t),
							  i !== t && r('Change: ', i));
					})(e),
					(function (e) {
						var t = e.entries[e.entries.length - 1];
						t.element && console.log('Element: ', t.element),
							console.log('Most recent entry: ', t);
					})(e),
					console.log('Full ' + e.name + ' Metric: ', e),
					console.groupEnd();
			}
			function n(e) {
				console.log('%c%s', h, e);
			}
			function a(e, ...t) {
				t ? console.log('%c%s', f, e, ...t) : console.log('%c%s', f, e);
			}
			function c(e) {
				console.log('%c%s', v, e);
			}
			function r(e) {
				const t = Array.from(arguments).slice(1, -1);
				console.log('%c' + e, p, ...t);
			}
			'loading' === document.readyState
				? document.addEventListener('DOMContentLoaded', e)
				: e();
		}
	}
);
