!(function (t) {
	'function' == typeof define && define.amd ? define(t) : t();
})(function () {
	function t(e) {
		return (t = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(e);
	}
	function e(t, n) {
		return (e =
			Object.setPrototypeOf ||
			function (t, e) {
				return (t.__proto__ = e), t;
			})(t, n);
	}
	function n() {
		if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
		if (Reflect.construct.sham) return !1;
		if ('function' == typeof Proxy) return !0;
		try {
			return (
				Date.prototype.toString.call(
					Reflect.construct(Date, [], function () {})
				),
				!0
			);
		} catch (t) {
			return !1;
		}
	}
	function o(t, i, r) {
		return (o = n()
			? Reflect.construct
			: function (t, n, o) {
					var i = [null];
					i.push.apply(i, n);
					var r = new (Function.bind.apply(t, i))();
					return o && e(r, o.prototype), r;
			  }).apply(null, arguments);
	}
	function i(n) {
		var r = 'function' == typeof Map ? new Map() : void 0;
		return (i = function (n) {
			if (
				null === n ||
				-1 === Function.toString.call(n).indexOf('[native code]')
			)
				return n;
			if ('function' != typeof n)
				throw new TypeError(
					'Super expression must either be null or a function'
				);
			if (void 0 !== r) {
				if (r.has(n)) return r.get(n);
				r.set(n, i);
			}
			function i() {
				return o(n, arguments, t(this).constructor);
			}
			return (
				(i.prototype = Object.create(n.prototype, {
					constructor: {
						value: i,
						enumerable: !1,
						writable: !0,
						configurable: !0,
					},
				})),
				e(i, n)
			);
		})(n);
	}
	var r,
		c,
		a = function () {
			return ''
				.concat(Date.now(), '-')
				.concat(Math.floor(8999999999999 * Math.random()) + 1e12);
		},
		l = function (t) {
			var e =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: -1;
			return {
				name: t,
				value: e,
				delta: 0,
				entries: [],
				id: a(),
				isFinal: !1,
			};
		},
		u = function (t, e) {
			try {
				if (PerformanceObserver.supportedEntryTypes.includes(t)) {
					var n = new PerformanceObserver(function (t) {
						return t.getEntries().map(e);
					});
					return n.observe({ type: t, buffered: !0 }), n;
				}
			} catch (t) {}
		},
		s = !1,
		p = !1,
		d = function (t) {
			s = !t.persisted;
		},
		f = function () {
			addEventListener('pagehide', d),
				addEventListener('unload', function () {});
		},
		m = function (t) {
			var e =
				arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
			p || (f(), (p = !0)),
				addEventListener(
					'visibilitychange',
					function (e) {
						'hidden' === document.visibilityState &&
							t({ timeStamp: e.timeStamp, isUnloading: s });
					},
					{ capture: !0, once: e }
				);
		},
		v = function (t, e, n, o) {
			var i;
			return function () {
				n && e.isFinal && n.disconnect(),
					e.value >= 0 &&
						(o ||
							e.isFinal ||
							'hidden' === document.visibilityState) &&
						((e.delta = e.value - (i || 0)),
						(e.delta || e.isFinal || void 0 === i) &&
							(t(e), (i = e.value)));
			};
		},
		g = function () {
			return (
				void 0 === r &&
					((r = 'hidden' === document.visibilityState ? 0 : 1 / 0),
					m(function (t) {
						return (r = t.timeStamp);
					}, !0)),
				{
					get timeStamp() {
						return r;
					},
				}
			);
		},
		h = function () {
			return (
				c ||
					(c = new Promise(function (t) {
						return ['scroll', 'keydown', 'pointerdown'].map(
							function (e) {
								addEventListener(e, t, {
									once: !0,
									passive: !0,
									capture: !0,
								});
							}
						);
					})),
				c
			);
		},
		y =
			'font-size: 13px; padding: 2.5px 0.5em 2.5px 2.5px; margin-bottom: 3px;',
		b = y.concat(
			'padding-right: 1.5em; background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); background-position: right center; background-repeat: no-repeat;'
		),
		w = b.concat(
			"color: #0a0; background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");"
		),
		S = b.concat(
			"color: #e65722; text-decoration: underline; background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e65722' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e65722' stroke='none'/%3e%3c/svg%3e\");"
		),
		F = y.concat('color: 3477db;');
	customElements.define(
		'web-vitals',
		(function (t) {
			var e, n;
			function o() {
				var e;
				((e = t.call(this) || this).dev = e.hasAttribute('dev')),
					(e.template = e.logFunction.toString());
				var n = document.createElement('script');
				n.innerHTML = e.template;
				var o = e.attachShadow({ mode: 'open' });
				return e.dev && o.appendChild(n), e;
			}
			return (
				(n = t),
				((e = o).prototype = Object.create(n.prototype)),
				(e.prototype.constructor = e),
				(e.__proto__ = n),
				(o.prototype.logFunction = function () {
					function t() {
						r(
							'What is this? Check link -> https://web.dev/vitals/'
						),
							(function (t) {
								var e,
									n =
										arguments.length > 1 &&
										void 0 !== arguments[1] &&
										arguments[1],
									o = l('LCP'),
									i = g(),
									r = function (t) {
										var n = t.startTime;
										n < i.timeStamp
											? ((o.value = n), o.entries.push(t))
											: (o.isFinal = !0),
											e();
									},
									c = u('largest-contentful-paint', r);
								if (c) {
									e = v(t, o, c, n);
									var a = function () {
										o.isFinal ||
											(c.takeRecords().map(r),
											(o.isFinal = !0),
											e());
									};
									h().then(a), m(a, !0);
								}
							})(e),
							(function (t) {
								var e,
									n =
										arguments.length > 1 &&
										void 0 !== arguments[1] &&
										arguments[1],
									o = l('CLS', 0),
									i = function (t) {
										t.hadRecentInput ||
											((o.value += t.value),
											o.entries.push(t),
											e());
									},
									r = u('layout-shift', i);
								r &&
									((e = v(t, o, r, n)),
									m(function (t) {
										var n = t.isUnloading;
										r.takeRecords().map(i),
											n && (o.isFinal = !0),
											e();
									}));
							})(e, !0),
							(function (t) {
								var e = l('FID'),
									n = g(),
									o = function (t) {
										t.startTime < n.timeStamp &&
											((e.value =
												t.processingStart -
												t.startTime),
											e.entries.push(t),
											(e.isFinal = !0),
											r());
									},
									i = u('first-input', o),
									r = v(t, e, i);
								i
									? m(function () {
											i.takeRecords().map(o),
												i.disconnect();
									  }, !0)
									: window.perfMetrics &&
									  window.perfMetrics.onFirstInputDelay &&
									  window.perfMetrics.onFirstInputDelay(
											function (t, o) {
												o.timeStamp < n.timeStamp &&
													((e.value = t),
													(e.isFinal = !0),
													(e.entries = [
														{
															entryType:
																'first-input',
															name: o.type,
															target: o.target,
															cancelable:
																o.cancelable,
															startTime:
																o.timeStamp,
															processingStart:
																o.timeStamp + t,
														},
													]),
													r());
											}
									  );
							})(e);
					}
					function e(t) {
						var e = t.name;
						t.isFinal && (e = t.name + ' (Final)'),
							console.groupCollapsed(
								'%cWeb Vitals Category: ' + e,
								y
							),
							(function (t) {
								var e = t.value,
									c = t.delta,
									a = t.name,
									l = 0;
								'LCP' === a
									? ((l = e / 1e3) > 2.5
											? n(
													'Paint is happening too late (Threshold < 2.5s)'
											  )
											: i('Passing'),
									  o('Timestamp (in Seconds): ', l),
									  c !== e && console.log('Change: ', c))
									: 'FID' === a
									? ((l = e) > 100 &&
											n(
												'Input delay is too high (Threshold < 100ms)'
											),
									  o('Timestamp (in Milliseconds): ', l),
									  c !== e && console.log('Change: ', c))
									: 'CLS' === a &&
									  (e > 0.1
											? n(
													'Cumulative shift is past threshold (Threshold < 0.1)'
											  )
											: i('Passing'),
									  o('Layout Shift: ', e),
									  c !== e && r('Change: ', c));
							})(t),
							(function (t) {
								var e = t.entries[t.entries.length - 1];
								e.element &&
									console.log('Element: ', e.element),
									console.log('Most recent entry: ', e);
							})(t),
							console.log('Full ' + t.name + ' Metric: ', t),
							console.groupEnd();
					}
					function n(t) {
						console.log('%c%s', S, t);
					}
					function o(t) {
						var e,
							n = [].slice.call(arguments, 1);
						n
							? (e = console).log.apply(
									e,
									['%c%s', F, t].concat(n)
							  )
							: console.log('%c%s', F, t);
					}
					function i(t) {
						console.log('%c%s', w, t);
					}
					function r(t) {
						var e,
							n = Array.from(arguments).slice(1, -1);
						(e = console).log.apply(e, ['%c' + t, y].concat(n));
					}
					'loading' === document.readyState
						? document.addEventListener('DOMContentLoaded', t)
						: t();
				}),
				o
			);
		})(i(HTMLElement))
	);
});
