import { getCLS, getLCP, getFID } from 'web-vitals';

customElements.define(
	'web-vitals',
	class extends HTMLElement {
		constructor() {
			super();
			this.dev = this.hasAttribute('dev');
			this.template = this.logFunction().toString();
			var el = document.createElement('script');
			el.innerHTML = this.template;
			var s = this.attachShadow({ mode: 'open' });
			this.dev && s.appendChild(el);
		}
		logFunction() {
			document.readyState === 'loading'
				? document.addEventListener('DOMContentLoaded', webv)
				: webv();
			function webv() {
				// prettier-ignore
				console.info('What is this? Check link -> https://web.dev/vitals/');
				getLCP(log);
				getCLS(log, true);
				getFID(log, true);
			}

			function log(data) {
				var title = data.name;
				if (data.isFinal) title = data.name + ' (Final)';
				console.groupCollapsed('Web Vitals Category: ' + title);

				logValue(data);
				logLastEntry(data);

				console.log('Full ' + data.name + ' Metric: ', data); // log whole object anyways
				console.groupEnd();
			}

			function logLastEntry({ entries }) {
				// log most recent entry instead of the entry array, this prevents eager evaluation
				var lastEntryIndex = entries.length - 1;
				var entry = entries[lastEntryIndex];
				if (entry.element) console.log('Element: ', entry.element);
				console.log('Most recent entry: ', entry);
			}

			function logValue({ value, delta, name }) {
				// calculates acceptable values
				var ts = 0; // timestamp
				var state = false;
				if (name === 'LCP') {
					ts = value / 1000;
					if (ts > 2.5) {
						// prettier-ignore
						consoleWarn('Paint is happening too late (Threshold < 2.5s)');
					}
					console.info('Timestamp (in Seconds): ', ts);
					delta !== value && console.log('Change: ', delta);
					return;
				}
				if (name === 'FID') {
					ts = value;
					if (ts > 100) {
						// prettier-ignore
						consoleWarn('Input delay is too high (Threshold < 100ms)');
					}
					console.info('Timestamp (in Milliseconds): ', ts);
					delta !== value && console.log('Change: ', delta);
					return;
				}
				if (name === 'CLS') {
					if (value > 0.1) {
						// prettier-ignore
						consoleWarn('Cumulative shift is past threshold (Threshold < 0.1)');
					}
					console.info('Layout Shift: ', value);
					delta !== value && console.log('Change: ', delta);
					return;
				}
				return {};
			}

			function consoleWarn(message) {
				var style = [
					'background-color: rgba(255, 193, 7, 0.3)',
					'color: #ffc107',
				].join(';');

				console.warn('%c' + message, style);
			}
		}
	}
);
