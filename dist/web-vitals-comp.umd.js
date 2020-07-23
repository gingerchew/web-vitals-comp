!(function (e) {
	'function' == typeof define && define.amd ? define(e) : e();
})(function () {
	function e(t) {
		return (e = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (e) {
					return e.__proto__ || Object.getPrototypeOf(e);
			  })(t);
	}
	function t(e, n) {
		return (t =
			Object.setPrototypeOf ||
			function (e, t) {
				return (e.__proto__ = t), e;
			})(e, n);
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
		} catch (e) {
			return !1;
		}
	}
	function o(e, i, r) {
		return (o = n()
			? Reflect.construct
			: function (e, n, o) {
					var i = [null];
					i.push.apply(i, n);
					var r = new (Function.bind.apply(e, i))();
					return o && t(r, o.prototype), r;
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
				return o(n, arguments, e(this).constructor);
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
				t(i, n)
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
		u = function (e) {
			var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: -1;
			return {
				name: e,
				value: t,
				delta: 0,
				entries: [],
				id: a(),
				isFinal: !1,
			};
		},
		l = function (e, t) {
			try {
				if (PerformanceObserver.supportedEntryTypes.includes(e)) {
					var n = new PerformanceObserver(function (e) {
						return e.getEntries().map(t);
					});
					return n.observe({ type: e, buffered: !0 }), n;
				}
			} catch (e) {}
		},
		s = !1,
		p = !1,
		f = function (e) {
			s = !e.persisted;
		},
		d = function () {
			addEventListener('pagehide', f),
				addEventListener('unload', function () {});
		},
		m = function (e) {
			var t =
				arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
			p || (d(), (p = !0)),
				addEventListener(
					'visibilitychange',
					function (t) {
						'hidden' === document.visibilityState &&
							e({ timeStamp: t.timeStamp, isUnloading: s });
					},
					{ capture: !0, once: t }
				);
		},
		g = function (e, t, n, o) {
			var i;
			return function () {
				n && t.isFinal && n.disconnect(),
					t.value >= 0 &&
						(o ||
							t.isFinal ||
							'hidden' === document.visibilityState) &&
						((t.delta = t.value - (i || 0)),
						(t.delta || t.isFinal || void 0 === i) &&
							(e(t), (i = t.value)));
			};
		},
		v = function () {
			return (
				void 0 === r &&
					((r = 'hidden' === document.visibilityState ? 0 : 1 / 0),
					m(function (e) {
						return (r = e.timeStamp);
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
					(c = new Promise(function (e) {
						return ['scroll', 'keydown', 'pointerdown'].map(
							function (t) {
								addEventListener(t, e, {
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
		(function (e) {
			var t, n;
			function o() {
				var t;
				return (t = e.call(this) || this).hasAttribute('dev')
					? (t.logFunction(), t)
					: (function (e) {
							if (void 0 === e)
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							return e;
					  })(t);
			}
			return (
				(n = e),
				((t = o).prototype = Object.create(n.prototype)),
				(t.prototype.constructor = t),
				(t.__proto__ = n),
				(o.prototype.logFunction = function () {
					function e() {
						r(
							'What is this? Check link -> https://web.dev/vitals/'
						),
							(function (e) {
								var t,
									n =
										arguments.length > 1 &&
										void 0 !== arguments[1] &&
										arguments[1],
									o = u('LCP'),
									i = v(),
									r = function (e) {
										var n = e.startTime;
										n < i.timeStamp
											? ((o.value = n), o.entries.push(e))
											: (o.isFinal = !0),
											t();
									},
									c = l('largest-contentful-paint', r);
								if (c) {
									t = g(e, o, c, n);
									var a = function () {
										o.isFinal ||
											(c.takeRecords().map(r),
											(o.isFinal = !0),
											t());
									};
									h().then(a), m(a, !0);
								}
							})(t),
							(function (e) {
								var t,
									n =
										arguments.length > 1 &&
										void 0 !== arguments[1] &&
										arguments[1],
									o = u('CLS', 0),
									i = function (e) {
										e.hadRecentInput ||
											((o.value += e.value),
											o.entries.push(e),
											t());
									},
									r = l('layout-shift', i);
								r &&
									((t = g(e, o, r, n)),
									m(function (e) {
										var n = e.isUnloading;
										r.takeRecords().map(i),
											n && (o.isFinal = !0),
											t();
									}));
							})(t, !0),
							(function (e) {
								var t = u('FID'),
									n = v(),
									o = function (e) {
										e.startTime < n.timeStamp &&
											((t.value =
												e.processingStart -
												e.startTime),
											t.entries.push(e),
											(t.isFinal = !0),
											r());
									},
									i = l('first-input', o),
									r = g(e, t, i);
								i
									? m(function () {
											i.takeRecords().map(o),
												i.disconnect();
									  }, !0)
									: window.perfMetrics &&
									  window.perfMetrics.onFirstInputDelay &&
									  window.perfMetrics.onFirstInputDelay(
											function (e, o) {
												o.timeStamp < n.timeStamp &&
													((t.value = e),
													(t.isFinal = !0),
													(t.entries = [
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
																o.timeStamp + e,
														},
													]),
													r());
											}
									  );
							})(t);
					}
					function t(e) {
						var t = e.name;
						e.isFinal && (t = e.name + ' (Final)'),
							console.groupCollapsed(
								'%cWeb Vitals Category: ' + t,
								y
							),
							(function (e) {
								var t = e.value,
									c = e.delta,
									a = e.name,
									u = 0;
								'LCP' === a
									? ((u = t / 1e3) > 2.5
											? n(
													'Paint is happening too late (Threshold < 2.5s)'
											  )
											: i('Passing'),
									  o('Timestamp (in Seconds): ', u),
									  c !== t && console.log('Change: ', c))
									: 'FID' === a
									? ((u = t) > 100 &&
											n(
												'Input delay is too high (Threshold < 100ms)'
											),
									  o('Timestamp (in Milliseconds): ', u),
									  c !== t && console.log('Change: ', c))
									: 'CLS' === a &&
									  (t > 0.1
											? n(
													'Cumulative shift is past threshold (Threshold < 0.1)'
											  )
											: i('Passing'),
									  o('Layout Shift: ', t),
									  c !== t && r('Change: ', c));
							})(e),
							(function (e) {
								var t = e.entries[e.entries.length - 1];
								t.element &&
									console.log('Element: ', t.element),
									console.log('Most recent entry: ', t);
							})(e),
							console.log('Full ' + e.name + ' Metric: ', e),
							console.groupEnd();
					}
					function n(e) {
						console.log('%c%s', S, e);
					}
					function o(e) {
						var t,
							n = [].slice.call(arguments, 1);
						n
							? (t = console).log.apply(
									t,
									['%c%s', F, e].concat(n)
							  )
							: console.log('%c%s', F, e);
					}
					function i(e) {
						console.log('%c%s', w, e);
					}
					function r(e) {
						var t,
							n = Array.from(arguments).slice(1, -1);
						(t = console).log.apply(t, ['%c' + e, y].concat(n));
					}
					'loading' === document.readyState
						? document.addEventListener('DOMContentLoaded', e)
						: e();
				}),
				o
			);
		})(i(HTMLElement))
	);
});
