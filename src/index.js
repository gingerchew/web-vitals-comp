import { getCLS, getLCP, getFID } from 'web-vitals';
import { base, warning, success, info } from './styles/index';
customElements.define(
	'web-vitals',
	class extends HTMLElement {
		constructor() {
			super();
			this.dev = this.hasAttribute('dev');
			this.template = 'function ' + this.logFunction.toString();
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
				consoleLog('What is this? Check link -> https://web.dev/vitals/');
				getLCP(log);
				getCLS(log, true);
				getFID(log, true);
			}

			function log(data) {
				var title = data.name;
				if (data.isFinal) title = data.name + ' (Final)';
				console.groupCollapsed('%cWeb Vitals Category: ' + title, base);

				logValue(data);
				logLastEntry(data);

				console.log('Full ' + data.name + ' Metric: ', data); // log whole object anyways
				console.groupEnd();
			}

			function logLastEntry(data) {
				// log most recent entry instead of the entry array, this prevents eager evaluation
				var lastEntryIndex = data.entries.length - 1;
				var entry = data.entries[lastEntryIndex];
				if (entry.element) console.log('Element: ', entry.element);
				console.log('Most recent entry: ', entry);
			}

			function logValue(data) {
				var value = data.value;
				var delta = data.delta;
				var name = data.name;
				// calculates acceptable values
				var ts = 0; // timestamp
				if (name === 'LCP') {
					ts = value / 1000;
					// prettier-ignore
					ts > 2.5 ?
						consoleWarn('Paint is happening too late (Threshold < 2.5s)') :
						consoleSuccess('Passing');
					consoleInfo('Timestamp (in Seconds): ', ts);
					delta !== value && console.log('Change: ', delta);
					return;
				}
				if (name === 'FID') {
					ts = value;
					if (ts > 100) {
						// prettier-ignore
						consoleWarn('Input delay is too high (Threshold < 100ms)');
					}
					consoleInfo('Timestamp (in Milliseconds): ', ts);
					delta !== value && console.log('Change: ', delta);
					return;
				}
				if (name === 'CLS') {
					// prettier-ignore
					(value > 0.1) ?
						consoleWarn('Cumulative shift is past threshold (Threshold < 0.1)') :
						consoleSuccess('Passing');
					consoleInfo('Layout Shift: ', value);
					delta !== value && consoleLog('Change: ', delta);
					return;
				}
				return {};
			}

			function consoleWarn(message) {
				console.log('%c%s', warning, message);
			}

			function consoleInfo(message, ...props) {
				props
					? console.log('%c%s', info, message, ...props)
					: console.log('%c%s', info, message);
			}

			function consoleSuccess(message) {
				console.log('%c%s', success, message);
			}

			function consoleLog(message) {
				const props = Array.from(arguments).slice(1, -1);

				console.log(`%c${message}`, base, ...props);
			}
		}
	}
);
