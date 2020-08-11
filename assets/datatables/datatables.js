/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/b-1.6.3/b-flash-1.6.3/b-html5-1.6.3/b-print-1.6.3/r-2.2.5/rr-1.2.7/sc-2.0.2
 *
 * Included libraries:
 *   Buttons 1.6.3, Flash export 1.6.3, HTML5 export 1.6.3, Print view 1.6.3, Responsive 2.2.5, RowReorder 1.2.7, Scroller 2.0.2
 */

/*! Buttons for DataTables 1.6.3
 * ©2016-2020 SpryMedia Ltd - datatables.net/license
 */

/* To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.10.11,b-1.1.2,e-1.5.5,se-1.1.2
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	// Used for namespacing events added to the document by each instance, so they
	// can be removed on destroy
	var _instCounter = 0;

	// Button namespacing counter for namespacing events on individual buttons
	var _buttonCounter = 0;

	var _dtButtons = DataTable.ext.buttons;

	// Allow for jQuery slim
	function _fadeIn(el, duration, fn) {
		if ($.fn.animate) {
			el
				.stop()
				.fadeIn(duration, fn);
		} else {
			el.css('display', 'block');

			if (fn) {
				fn.call(el);
			}
		}
	}

	function _fadeOut(el, duration, fn) {
		if ($.fn.animate) {
			el
				.stop()
				.fadeOut(duration, fn);
		} else {
			el.css('display', 'none');

			if (fn) {
				fn.call(el);
			}
		}
	}

	/**
	 * [Buttons description]
	 * @param {[type]}
	 * @param {[type]}
	 */
	var Buttons = function (dt, config) {
		// If not created with a `new` keyword then we return a wrapper function that
		// will take the settings object for a DT. This allows easy use of new instances
		// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
		if (!(this instanceof Buttons)) {
			return function (settings) {
				return new Buttons(settings, dt).container();
			};
		}

		// If there is no config set it to an empty object
		if (typeof (config) === 'undefined') {
			config = {};
		}

		// Allow a boolean true for defaults
		if (config === true) {
			config = {};
		}

		// For easy configuration of buttons an array can be given
		if ($.isArray(config)) {
			config = {
				buttons: config
			};
		}

		this.c = $.extend(true, {}, Buttons.defaults, config);

		// Don't want a deep copy for the buttons
		if (config.buttons) {
			this.c.buttons = config.buttons;
		}

		this.s = {
			dt: new DataTable.Api(dt),
			buttons: [],
			listenKeys: '',
			namespace: 'dtb' + (_instCounter++)
		};

		this.dom = {
			container: $('<' + this.c.dom.container.tag + '/>')
				.addClass(this.c.dom.container.className)
		};

		this._constructor();
	};


	$.extend(Buttons.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Public methods
		 */

		/**
		 * Get the action of a button
		 * @param  {int|string} Button index
		 * @return {function}
		 */
		/**
		 * Set the action of a button
		 * @param  {node} node Button element
		 * @param  {function} action Function to set
		 * @return {Buttons} Self for chaining
		 */
		action: function (node, action) {
			var button = this._nodeToButton(node);

			if (action === undefined) {
				return button.conf.action;
			}

			button.conf.action = action;

			return this;
		},

		/**
		 * Add an active class to the button to make to look active or get current
		 * active state.
		 * @param  {node} node Button element
		 * @param  {boolean} [flag] Enable / disable flag
		 * @return {Buttons} Self for chaining or boolean for getter
		 */
		active: function (node, flag) {
			var button = this._nodeToButton(node);
			var klass = this.c.dom.button.active;
			var jqNode = $(button.node);

			if (flag === undefined) {
				return jqNode.hasClass(klass);
			}

			jqNode.toggleClass(klass, flag === undefined ? true : flag);

			return this;
		},

		/**
		 * Add a new button
		 * @param {object} config Button configuration object, base string name or function
		 * @param {int|string} [idx] Button index for where to insert the button
		 * @return {Buttons} Self for chaining
		 */
		add: function (config, idx) {
			var buttons = this.s.buttons;

			if (typeof idx === 'string') {
				var split = idx.split('-');
				var base = this.s;

				for (var i = 0, ien = split.length - 1; i < ien; i++) {
					base = base.buttons[split[i] * 1];
				}

				buttons = base.buttons;
				idx = split[split.length - 1] * 1;
			}

			this._expandButton(buttons, config, base !== undefined, idx);
			this._draw();

			return this;
		},

		/**
		 * Get the container node for the buttons
		 * @return {jQuery} Buttons node
		 */
		container: function () {
			return this.dom.container;
		},

		/**
		 * Disable a button
		 * @param  {node} node Button node
		 * @return {Buttons} Self for chaining
		 */
		disable: function (node) {
			var button = this._nodeToButton(node);

			$(button.node)
				.addClass(this.c.dom.button.disabled)
				.attr('disabled', true);

			return this;
		},

		/**
		 * Destroy the instance, cleaning up event handlers and removing DOM
		 * elements
		 * @return {Buttons} Self for chaining
		 */
		destroy: function () {
			// Key event listener
			$('body').off('keyup.' + this.s.namespace);

			// Individual button destroy (so they can remove their own events if
			// needed). Take a copy as the array is modified by `remove`
			var buttons = this.s.buttons.slice();
			var i, ien;

			for (i = 0, ien = buttons.length; i < ien; i++) {
				this.remove(buttons[i].node);
			}

			// Container
			this.dom.container.remove();

			// Remove from the settings object collection
			var buttonInsts = this.s.dt.settings()[0];

			for (i = 0, ien = buttonInsts.length; i < ien; i++) {
				if (buttonInsts.inst === this) {
					buttonInsts.splice(i, 1);
					break;
				}
			}

			return this;
		},

		/**
		 * Enable / disable a button
		 * @param  {node} node Button node
		 * @param  {boolean} [flag=true] Enable / disable flag
		 * @return {Buttons} Self for chaining
		 */
		enable: function (node, flag) {
			if (flag === false) {
				return this.disable(node);
			}

			var button = this._nodeToButton(node);
			$(button.node)
				.removeClass(this.c.dom.button.disabled)
				.removeAttr('disabled');

			return this;
		},

		/**
		 * Get the instance name for the button set selector
		 * @return {string} Instance name
		 */
		name: function () {
			return this.c.name;
		},

		/**
		 * Get a button's node of the buttons container if no button is given
		 * @param  {node} [node] Button node
		 * @return {jQuery} Button element, or container
		 */
		node: function (node) {
			if (!node) {
				return this.dom.container;
			}

			var button = this._nodeToButton(node);
			return $(button.node);
		},

		/**
		 * Set / get a processing class on the selected button
		 * @param {element} node Triggering button node
		 * @param  {boolean} flag true to add, false to remove, undefined to get
		 * @return {boolean|Buttons} Getter value or this if a setter.
		 */
		processing: function (node, flag) {
			var dt = this.s.dt;
			var button = this._nodeToButton(node);

			if (flag === undefined) {
				return $(button.node).hasClass('processing');
			}

			$(button.node).toggleClass('processing', flag);

			$(dt.table().node()).triggerHandler('buttons-processing.dt', [
				flag, dt.button(node), dt, $(node), button.conf
			]);

			return this;
		},

		/**
		 * Remove a button.
		 * @param  {node} node Button node
		 * @return {Buttons} Self for chaining
		 */
		remove: function (node) {
			var button = this._nodeToButton(node);
			var host = this._nodeToHost(node);
			var dt = this.s.dt;

			// Remove any child buttons first
			if (button.buttons.length) {
				for (var i = button.buttons.length - 1; i >= 0; i--) {
					this.remove(button.buttons[i].node);
				}
			}

			// Allow the button to remove event handlers, etc
			if (button.conf.destroy) {
				button.conf.destroy.call(dt.button(node), dt, $(node), button.conf);
			}

			this._removeKey(button.conf);

			$(button.node).remove();

			var idx = $.inArray(button, host);
			host.splice(idx, 1);

			return this;
		},

		/**
		 * Get the text for a button
		 * @param  {int|string} node Button index
		 * @return {string} Button text
		 */
		/**
		 * Set the text for a button
		 * @param  {int|string|function} node Button index
		 * @param  {string} label Text
		 * @return {Buttons} Self for chaining
		 */
		text: function (node, label) {
			var button = this._nodeToButton(node);
			var buttonLiner = this.c.dom.collection.buttonLiner;
			var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
				buttonLiner.tag :
				this.c.dom.buttonLiner.tag;
			var dt = this.s.dt;
			var jqNode = $(button.node);
			var text = function (opt) {
				return typeof opt === 'function' ?
					opt(dt, jqNode, button.conf) :
					opt;
			};

			if (label === undefined) {
				return text(button.conf.text);
			}

			button.conf.text = label;

			if (linerTag) {
				jqNode.children(linerTag).html(text(label));
			} else {
				jqNode.html(text(label));
			}

			return this;
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Buttons constructor
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var dt = this.s.dt;
			var dtSettings = dt.settings()[0];
			var buttons = this.c.buttons;

			if (!dtSettings._buttons) {
				dtSettings._buttons = [];
			}

			dtSettings._buttons.push({
				inst: this,
				name: this.c.name
			});

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				this.add(buttons[i]);
			}

			dt.on('destroy', function (e, settings) {
				if (settings === dtSettings) {
					that.destroy();
				}
			});

			// Global key event binding to listen for button keys
			$('body').on('keyup.' + this.s.namespace, function (e) {
				if (!document.activeElement || document.activeElement === document.body) {
					// SUse a string of characters for fast lookup of if we need to
					// handle this
					var character = String.fromCharCode(e.keyCode).toLowerCase();

					if (that.s.listenKeys.toLowerCase().indexOf(character) !== -1) {
						that._keypress(character, e);
					}
				}
			});
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Add a new button to the key press listener
		 * @param {object} conf Resolved button configuration object
		 * @private
		 */
		_addKey: function (conf) {
			if (conf.key) {
				this.s.listenKeys += $.isPlainObject(conf.key) ?
					conf.key.key :
					conf.key;
			}
		},

		/**
		 * Insert the buttons into the container. Call without parameters!
		 * @param  {node} [container] Recursive only - Insert point
		 * @param  {array} [buttons] Recursive only - Buttons array
		 * @private
		 */
		_draw: function (container, buttons) {
			if (!container) {
				container = this.dom.container;
				buttons = this.s.buttons;
			}

			container.children().detach();

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				container.append(buttons[i].inserter);
				container.append(' ');

				if (buttons[i].buttons && buttons[i].buttons.length) {
					this._draw(buttons[i].collection, buttons[i].buttons);
				}
			}
		},

		/**
		 * Create buttons from an array of buttons
		 * @param  {array} attachTo Buttons array to attach to
		 * @param  {object} button Button definition
		 * @param  {boolean} inCollection true if the button is in a collection
		 * @private
		 */
		_expandButton: function (attachTo, button, inCollection, attachPoint) {
			var dt = this.s.dt;
			var buttonCounter = 0;
			var buttons = !$.isArray(button) ? [button] :
				button;

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				var conf = this._resolveExtends(buttons[i]);

				if (!conf) {
					continue;
				}

				// If the configuration is an array, then expand the buttons at this
				// point
				if ($.isArray(conf)) {
					this._expandButton(attachTo, conf, inCollection, attachPoint);
					continue;
				}

				var built = this._buildButton(conf, inCollection);
				if (!built) {
					continue;
				}

				if (attachPoint !== undefined && attachPoint !== null) {
					attachTo.splice(attachPoint, 0, built);
					attachPoint++;
				} else {
					attachTo.push(built);
				}

				if (built.conf.buttons) {
					built.collection = $('<' + this.c.dom.collection.tag + '/>');

					built.conf._collection = built.collection;

					this._expandButton(built.buttons, built.conf.buttons, true, attachPoint);
				}

				// init call is made here, rather than buildButton as it needs to
				// be selectable, and for that it needs to be in the buttons array
				if (conf.init) {
					conf.init.call(dt.button(built.node), dt, $(built.node), conf);
				}

				buttonCounter++;
			}
		},

		/**
		 * Create an individual button
		 * @param  {object} config            Resolved button configuration
		 * @param  {boolean} inCollection `true` if a collection button
		 * @return {jQuery} Created button node (jQuery)
		 * @private
		 */
		_buildButton: function (config, inCollection) {
			var buttonDom = this.c.dom.button;
			var linerDom = this.c.dom.buttonLiner;
			var collectionDom = this.c.dom.collection;
			var dt = this.s.dt;
			var text = function (opt) {
				return typeof opt === 'function' ?
					opt(dt, button, config) :
					opt;
			};

			if (inCollection && collectionDom.button) {
				buttonDom = collectionDom.button;
			}

			if (inCollection && collectionDom.buttonLiner) {
				linerDom = collectionDom.buttonLiner;
			}

			// Make sure that the button is available based on whatever requirements
			// it has. For example, Flash buttons require Flash
			if (config.available && !config.available(dt, config)) {
				return false;
			}

			var action = function (e, dt, button, config) {
				config.action.call(dt.button(button), e, dt, button, config);

				$(dt.table().node()).triggerHandler('buttons-action.dt', [
					dt.button(button), dt, button, config
				]);
			};

			var tag = config.tag || buttonDom.tag;
			var clickBlurs = config.clickBlurs === undefined ? true : config.clickBlurs
			var button = $('<' + tag + '/>')
				.addClass(buttonDom.className)
				.attr('tabindex', this.s.dt.settings()[0].iTabIndex)
				.attr('aria-controls', this.s.dt.table().node().id)
				.on('click.dtb', function (e) {
					e.preventDefault();

					if (!button.hasClass(buttonDom.disabled) && config.action) {
						action(e, dt, button, config);
					}
					if (clickBlurs) {
						button.trigger('blur');
					}
				})
				.on('keyup.dtb', function (e) {
					if (e.keyCode === 13) {
						if (!button.hasClass(buttonDom.disabled) && config.action) {
							action(e, dt, button, config);
						}
					}
				});

			// Make `a` tags act like a link
			if (tag.toLowerCase() === 'a') {
				button.attr('href', '#');
			}

			// Button tags should have `type=button` so they don't have any default behaviour
			if (tag.toLowerCase() === 'button') {
				button.attr('type', 'button');
			}

			if (linerDom.tag) {
				var liner = $('<' + linerDom.tag + '/>')
					.html(text(config.text))
					.addClass(linerDom.className);

				if (linerDom.tag.toLowerCase() === 'a') {
					liner.attr('href', '#');
				}

				button.append(liner);
			} else {
				button.html(text(config.text));
			}

			if (config.enabled === false) {
				button.addClass(buttonDom.disabled);
			}

			if (config.className) {
				button.addClass(config.className);
			}

			if (config.titleAttr) {
				button.attr('title', text(config.titleAttr));
			}

			if (config.attr) {
				button.attr(config.attr);
			}

			if (!config.namespace) {
				config.namespace = '.dt-button-' + (_buttonCounter++);
			}

			var buttonContainer = this.c.dom.buttonContainer;
			var inserter;
			if (buttonContainer && buttonContainer.tag) {
				inserter = $('<' + buttonContainer.tag + '/>')
					.addClass(buttonContainer.className)
					.append(button);
			} else {
				inserter = button;
			}

			this._addKey(config);

			// Style integration callback for DOM manipulation
			// Note that this is _not_ documented. It is currently
			// for style integration only
			if (this.c.buttonCreated) {
				inserter = this.c.buttonCreated(config, inserter);
			}

			return {
				conf: config,
				node: button.get(0),
				inserter: inserter,
				buttons: [],
				inCollection: inCollection,
				collection: null
			};
		},

		/**
		 * Get the button object from a node (recursive)
		 * @param  {node} node Button node
		 * @param  {array} [buttons] Button array, uses base if not defined
		 * @return {object} Button object
		 * @private
		 */
		_nodeToButton: function (node, buttons) {
			if (!buttons) {
				buttons = this.s.buttons;
			}

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				if (buttons[i].node === node) {
					return buttons[i];
				}

				if (buttons[i].buttons.length) {
					var ret = this._nodeToButton(node, buttons[i].buttons);

					if (ret) {
						return ret;
					}
				}
			}
		},

		/**
		 * Get container array for a button from a button node (recursive)
		 * @param  {node} node Button node
		 * @param  {array} [buttons] Button array, uses base if not defined
		 * @return {array} Button's host array
		 * @private
		 */
		_nodeToHost: function (node, buttons) {
			if (!buttons) {
				buttons = this.s.buttons;
			}

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				if (buttons[i].node === node) {
					return buttons;
				}

				if (buttons[i].buttons.length) {
					var ret = this._nodeToHost(node, buttons[i].buttons);

					if (ret) {
						return ret;
					}
				}
			}
		},

		/**
		 * Handle a key press - determine if any button's key configured matches
		 * what was typed and trigger the action if so.
		 * @param  {string} character The character pressed
		 * @param  {object} e Key event that triggered this call
		 * @private
		 */
		_keypress: function (character, e) {
			// Check if this button press already activated on another instance of Buttons
			if (e._buttonsHandled) {
				return;
			}

			var run = function (conf, node) {
				if (!conf.key) {
					return;
				}

				if (conf.key === character) {
					e._buttonsHandled = true;
					$(node).click();
				} else if ($.isPlainObject(conf.key)) {
					if (conf.key.key !== character) {
						return;
					}

					if (conf.key.shiftKey && !e.shiftKey) {
						return;
					}

					if (conf.key.altKey && !e.altKey) {
						return;
					}

					if (conf.key.ctrlKey && !e.ctrlKey) {
						return;
					}

					if (conf.key.metaKey && !e.metaKey) {
						return;
					}

					// Made it this far - it is good
					e._buttonsHandled = true;
					$(node).click();
				}
			};

			var recurse = function (a) {
				for (var i = 0, ien = a.length; i < ien; i++) {
					run(a[i].conf, a[i].node);

					if (a[i].buttons.length) {
						recurse(a[i].buttons);
					}
				}
			};

			recurse(this.s.buttons);
		},

		/**
		 * Remove a key from the key listener for this instance (to be used when a
		 * button is removed)
		 * @param  {object} conf Button configuration
		 * @private
		 */
		_removeKey: function (conf) {
			if (conf.key) {
				var character = $.isPlainObject(conf.key) ?
					conf.key.key :
					conf.key;

				// Remove only one character, as multiple buttons could have the
				// same listening key
				var a = this.s.listenKeys.split('');
				var idx = $.inArray(character, a);
				a.splice(idx, 1);
				this.s.listenKeys = a.join('');
			}
		},

		/**
		 * Resolve a button configuration
		 * @param  {string|function|object} conf Button config to resolve
		 * @return {object} Button configuration
		 * @private
		 */
		_resolveExtends: function (conf) {
			var dt = this.s.dt;
			var i, ien;
			var toConfObject = function (base) {
				var loop = 0;

				// Loop until we have resolved to a button configuration, or an
				// array of button configurations (which will be iterated
				// separately)
				while (!$.isPlainObject(base) && !$.isArray(base)) {
					if (base === undefined) {
						return;
					}

					if (typeof base === 'function') {
						base = base(dt, conf);

						if (!base) {
							return false;
						}
					} else if (typeof base === 'string') {
						if (!_dtButtons[base]) {
							throw 'Unknown button type: ' + base;
						}

						base = _dtButtons[base];
					}

					loop++;
					if (loop > 30) {
						// Protect against misconfiguration killing the browser
						throw 'Buttons: Too many iterations';
					}
				}

				return $.isArray(base) ?
					base :
					$.extend({}, base);
			};

			conf = toConfObject(conf);

			while (conf && conf.extend) {
				// Use `toConfObject` in case the button definition being extended
				// is itself a string or a function
				if (!_dtButtons[conf.extend]) {
					throw 'Cannot extend unknown button type: ' + conf.extend;
				}

				var objArray = toConfObject(_dtButtons[conf.extend]);
				if ($.isArray(objArray)) {
					return objArray;
				} else if (!objArray) {
					// This is a little brutal as it might be possible to have a
					// valid button without the extend, but if there is no extend
					// then the host button would be acting in an undefined state
					return false;
				}

				// Stash the current class name
				var originalClassName = objArray.className;

				conf = $.extend({}, objArray, conf);

				// The extend will have overwritten the original class name if the
				// `conf` object also assigned a class, but we want to concatenate
				// them so they are list that is combined from all extended buttons
				if (originalClassName && conf.className !== originalClassName) {
					conf.className = originalClassName + ' ' + conf.className;
				}

				// Buttons to be added to a collection  -gives the ability to define
				// if buttons should be added to the start or end of a collection
				var postfixButtons = conf.postfixButtons;
				if (postfixButtons) {
					if (!conf.buttons) {
						conf.buttons = [];
					}

					for (i = 0, ien = postfixButtons.length; i < ien; i++) {
						conf.buttons.push(postfixButtons[i]);
					}

					conf.postfixButtons = null;
				}

				var prefixButtons = conf.prefixButtons;
				if (prefixButtons) {
					if (!conf.buttons) {
						conf.buttons = [];
					}

					for (i = 0, ien = prefixButtons.length; i < ien; i++) {
						conf.buttons.splice(i, 0, prefixButtons[i]);
					}

					conf.prefixButtons = null;
				}

				// Although we want the `conf` object to overwrite almost all of
				// the properties of the object being extended, the `extend`
				// property should come from the object being extended
				conf.extend = objArray.extend;
			}

			return conf;
		},

		/**
		 * Display (and replace if there is an existing one) a popover attached to a button
		 * @param {string|node} content Content to show
		 * @param {DataTable.Api} hostButton DT API instance of the button
		 * @param {object} inOpts Options (see object below for all options)
		 */
		_popover: function (content, hostButton, inOpts) {
			var dt = hostButton;
			var buttonsSettings = this.c;
			var options = $.extend({
				align: 'button-left', // button-right, dt-container
				autoClose: false,
				background: true,
				backgroundClassName: 'dt-button-background',
				contentClassName: buttonsSettings.dom.collection.className,
				collectionLayout: '',
				collectionTitle: '',
				dropup: false,
				fade: 400,
				rightAlignClassName: 'dt-button-right',
				tag: buttonsSettings.dom.collection.tag
			}, inOpts);
			var hostNode = hostButton.node();

			var close = function () {
				_fadeOut(
					$('.dt-button-collection'),
					options.fade,
					function () {
						$(this).detach();
					}
				);

				$(dt.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes())
					.attr('aria-expanded', 'false');

				$('div.dt-button-background').off('click.dtb-collection');
				Buttons.background(false, options.backgroundClassName, options.fade, hostNode);

				$('body').off('.dtb-collection');
				dt.off('buttons-action.b-internal');
			};

			if (content === false) {
				close();
			}

			var existingExpanded = $(dt.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());
			if (existingExpanded.length) {
				hostNode = existingExpanded.eq(0);

				close();
			}

			var display = $('<div/>')
				.addClass('dt-button-collection')
				.addClass(options.collectionLayout)
				.css('display', 'none');

			content = $(content)
				.addClass(options.contentClassName)
				.attr('role', 'menu')
				.appendTo(display);

			hostNode.attr('aria-expanded', 'true');

			if (hostNode.parents('body')[0] !== document.body) {
				hostNode = document.body.lastChild;
			}

			if (options.collectionTitle) {
				display.prepend('<div class="dt-button-collection-title">' + options.collectionTitle + '</div>');
			}

			_fadeIn(display.insertAfter(hostNode));

			var tableContainer = $(hostButton.table().container());
			var position = display.css('position');

			if (options.align === 'dt-container') {
				hostNode = hostNode.parent();
				display.css('width', tableContainer.width());
			}

			// Align the popover relative to the DataTables container
			// Useful for wide popovers such as SearchPanes
			if (
				position === 'absolute' &&
				(
					display.hasClass(options.rightAlignClassName) ||
					display.hasClass(options.leftAlignClassName) ||
					options.align === 'dt-container'
				)
			) {

				var hostPosition = hostNode.position();

				display.css({
					top: hostPosition.top + hostNode.outerHeight(),
					left: hostPosition.left
				});

				// calculate overflow when positioned beneath
				var collectionHeight = display.outerHeight();
				var tableBottom = tableContainer.offset().top + tableContainer.height();
				var listBottom = hostPosition.top + hostNode.outerHeight() + collectionHeight;
				var bottomOverflow = listBottom - tableBottom;

				// calculate overflow when positioned above
				var listTop = hostPosition.top - collectionHeight;
				var tableTop = tableContainer.offset().top;
				var topOverflow = tableTop - listTop;

				// if bottom overflow is larger, move to the top because it fits better, or if dropup is requested
				var moveTop = hostPosition.top - collectionHeight - 5;
				if ((bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop) {
					display.css('top', moveTop);
				}

				// Get the size of the container (left and width - and thus also right)
				var tableLeft = tableContainer.offset().left;
				var tableWidth = tableContainer.width();
				var tableRight = tableLeft + tableWidth;

				// Get the size of the popover (left and width - and ...)
				var popoverLeft = display.offset().left;
				var popoverWidth = display.width();
				var popoverRight = popoverLeft + popoverWidth;

				// Get the size of the host buttons (left and width - and ...)
				var buttonsLeft = hostNode.offset().left;
				var buttonsWidth = hostNode.outerWidth()
				var buttonsRight = buttonsLeft + buttonsWidth;

				// You've then got all the numbers you need to do some calculations and if statements,
				//  so we can do some quick JS maths and apply it only once
				// If it has the right align class OR the buttons are right aligned OR the button container is floated right,
				//  then calculate left position for the popover to align the popover to the right hand
				//  side of the button - check to see if the left of the popover is inside the table container.
				// If not, move the popover so it is, but not more than it means that the popover is to the right of the table container
				var popoverShuffle = 0;
				if (display.hasClass(options.rightAlignClassName)) {
					popoverShuffle = buttonsRight - popoverRight;
					if (tableLeft > (popoverLeft + popoverShuffle)) {
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);

						if (leftGap > rightGap) {
							popoverShuffle += rightGap;
						} else {
							popoverShuffle += leftGap;
						}
					}
				}
				// else attempt to left align the popover to the button. Similar to above, if the popover's right goes past the table container's right,
				//  then move it back, but not so much that it goes past the left of the table container
				else {
					popoverShuffle = tableLeft - popoverLeft;

					if (tableRight < (popoverRight + popoverShuffle)) {
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);

						if (leftGap > rightGap) {
							popoverShuffle += rightGap;
						} else {
							popoverShuffle += leftGap;
						}

					}
				}

				display.css('left', display.position().left + popoverShuffle);

			} else if (position === 'absolute') {
				// Align relative to the host button
				var hostPosition = hostNode.position();

				display.css({
					top: hostPosition.top + hostNode.outerHeight(),
					left: hostPosition.left
				});

				// calculate overflow when positioned beneath
				var collectionHeight = display.outerHeight();
				var top = hostNode.offset().top
				var popoverShuffle = 0;

				// Get the size of the host buttons (left and width - and ...)
				var buttonsLeft = hostNode.offset().left;
				var buttonsWidth = hostNode.outerWidth()
				var buttonsRight = buttonsLeft + buttonsWidth;

				// Get the size of the popover (left and width - and ...)
				var popoverLeft = display.offset().left;
				var popoverWidth = content.width();
				var popoverRight = popoverLeft + popoverWidth;

				var moveTop = hostPosition.top - collectionHeight - 5;
				var tableBottom = tableContainer.offset().top + tableContainer.height();
				var listBottom = hostPosition.top + hostNode.outerHeight() + collectionHeight;
				var bottomOverflow = listBottom - tableBottom;

				// calculate overflow when positioned above
				var listTop = hostPosition.top - collectionHeight;
				var tableTop = tableContainer.offset().top;
				var topOverflow = tableTop - listTop;

				if ((bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop) {
					display.css('top', moveTop);
				}

				popoverShuffle = options.align === 'button-right' ?
					buttonsRight - popoverRight :
					buttonsLeft - popoverLeft;

				display.css('left', display.position().left + popoverShuffle);
			} else {
				// Fix position - centre on screen
				var top = display.height() / 2;
				if (top > $(window).height() / 2) {
					top = $(window).height() / 2;
				}

				display.css('marginTop', top * -1);
			}

			if (options.background) {
				Buttons.background(true, options.backgroundClassName, options.fade, hostNode);
			}

			// This is bonkers, but if we don't have a click listener on the
			// background element, iOS Safari will ignore the body click
			// listener below. An empty function here is all that is
			// required to make it work...
			$('div.dt-button-background').on('click.dtb-collection', function () {});

			$('body')
				.on('click.dtb-collection', function (e) {
					// andSelf is deprecated in jQ1.8, but we want 1.7 compat
					var back = $.fn.addBack ? 'addBack' : 'andSelf';
					var parent = $(e.target).parent()[0];

					if ((!$(e.target).parents()[back]().filter(content).length && !$(parent).hasClass('dt-buttons')) || $(e.target).hasClass('dt-button-background')) {
						close();
					}
				})
				.on('keyup.dtb-collection', function (e) {
					if (e.keyCode === 27) {
						close();
					}
				});

			if (options.autoClose) {
				setTimeout(function () {
					dt.on('buttons-action.b-internal', function (e, btn, dt, node) {
						if (node[0] === hostNode[0]) {
							return;
						}
						close();
					});
				}, 0);
			}

			$(display).trigger('buttons-popover.dt');
		}
	});



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Statics
	 */

	/**
	 * Show / hide a background layer behind a collection
	 * @param  {boolean} Flag to indicate if the background should be shown or
	 *   hidden 
	 * @param  {string} Class to assign to the background
	 * @static
	 */
	Buttons.background = function (show, className, fade, insertPoint) {
		if (fade === undefined) {
			fade = 400;
		}
		if (!insertPoint) {
			insertPoint = document.body;
		}

		if (show) {
			_fadeIn(
				$('<div/>')
				.addClass(className)
				.css('display', 'none')
				.insertAfter(insertPoint),
				fade
			);
		} else {
			_fadeOut(
				$('div.' + className),
				fade,
				function () {
					$(this)
						.removeClass(className)
						.remove();
				}
			);
		}
	};

	/**
	 * Instance selector - select Buttons instances based on an instance selector
	 * value from the buttons assigned to a DataTable. This is only useful if
	 * multiple instances are attached to a DataTable.
	 * @param  {string|int|array} Instance selector - see `instance-selector`
	 *   documentation on the DataTables site
	 * @param  {array} Button instance array that was attached to the DataTables
	 *   settings object
	 * @return {array} Buttons instances
	 * @static
	 */
	Buttons.instanceSelector = function (group, buttons) {
		if (group === undefined || group === null) {
			return $.map(buttons, function (v) {
				return v.inst;
			});
		}

		var ret = [];
		var names = $.map(buttons, function (v) {
			return v.name;
		});

		// Flatten the group selector into an array of single options
		var process = function (input) {
			if ($.isArray(input)) {
				for (var i = 0, ien = input.length; i < ien; i++) {
					process(input[i]);
				}
				return;
			}

			if (typeof input === 'string') {
				if (input.indexOf(',') !== -1) {
					// String selector, list of names
					process(input.split(','));
				} else {
					// String selector individual name
					var idx = $.inArray($.trim(input), names);

					if (idx !== -1) {
						ret.push(buttons[idx].inst);
					}
				}
			} else if (typeof input === 'number') {
				// Index selector
				ret.push(buttons[input].inst);
			}
		};

		process(group);

		return ret;
	};

	/**
	 * Button selector - select one or more buttons from a selector input so some
	 * operation can be performed on them.
	 * @param  {array} Button instances array that the selector should operate on
	 * @param  {string|int|node|jQuery|array} Button selector - see
	 *   `button-selector` documentation on the DataTables site
	 * @return {array} Array of objects containing `inst` and `idx` properties of
	 *   the selected buttons so you know which instance each button belongs to.
	 * @static
	 */
	Buttons.buttonSelector = function (insts, selector) {
		var ret = [];
		var nodeBuilder = function (a, buttons, baseIdx) {
			var button;
			var idx;

			for (var i = 0, ien = buttons.length; i < ien; i++) {
				button = buttons[i];

				if (button) {
					idx = baseIdx !== undefined ?
						baseIdx + i :
						i + '';

					a.push({
						node: button.node,
						name: button.conf.name,
						idx: idx
					});

					if (button.buttons) {
						nodeBuilder(a, button.buttons, idx + '-');
					}
				}
			}
		};

		var run = function (selector, inst) {
			var i, ien;
			var buttons = [];
			nodeBuilder(buttons, inst.s.buttons);

			var nodes = $.map(buttons, function (v) {
				return v.node;
			});

			if ($.isArray(selector) || selector instanceof $) {
				for (i = 0, ien = selector.length; i < ien; i++) {
					run(selector[i], inst);
				}
				return;
			}

			if (selector === null || selector === undefined || selector === '*') {
				// Select all
				for (i = 0, ien = buttons.length; i < ien; i++) {
					ret.push({
						inst: inst,
						node: buttons[i].node
					});
				}
			} else if (typeof selector === 'number') {
				// Main button index selector
				ret.push({
					inst: inst,
					node: inst.s.buttons[selector].node
				});
			} else if (typeof selector === 'string') {
				if (selector.indexOf(',') !== -1) {
					// Split
					var a = selector.split(',');

					for (i = 0, ien = a.length; i < ien; i++) {
						run($.trim(a[i]), inst);
					}
				} else if (selector.match(/^\d+(\-\d+)*$/)) {
					// Sub-button index selector
					var indexes = $.map(buttons, function (v) {
						return v.idx;
					});

					ret.push({
						inst: inst,
						node: buttons[$.inArray(selector, indexes)].node
					});
				} else if (selector.indexOf(':name') !== -1) {
					// Button name selector
					var name = selector.replace(':name', '');

					for (i = 0, ien = buttons.length; i < ien; i++) {
						if (buttons[i].name === name) {
							ret.push({
								inst: inst,
								node: buttons[i].node
							});
						}
					}
				} else {
					// jQuery selector on the nodes
					$(nodes).filter(selector).each(function () {
						ret.push({
							inst: inst,
							node: this
						});
					});
				}
			} else if (typeof selector === 'object' && selector.nodeName) {
				// Node selector
				var idx = $.inArray(selector, nodes);

				if (idx !== -1) {
					ret.push({
						inst: inst,
						node: nodes[idx]
					});
				}
			}
		};


		for (var i = 0, ien = insts.length; i < ien; i++) {
			var inst = insts[i];

			run(selector, inst);
		}

		return ret;
	};


	/**
	 * Buttons defaults. For full documentation, please refer to the docs/option
	 * directory or the DataTables site.
	 * @type {Object}
	 * @static
	 */
	Buttons.defaults = {
		buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
		name: 'main',
		tabIndex: 0,
		dom: {
			container: {
				tag: 'div',
				className: 'dt-buttons'
			},
			collection: {
				tag: 'div',
				className: ''
			},
			button: {
				// Flash buttons will not work with `<button>` in IE - it has to be `<a>`
				tag: 'ActiveXObject' in window ?
					'a' : 'button',
				className: 'dt-button',
				active: 'active',
				disabled: 'disabled'
			},
			buttonLiner: {
				tag: 'span',
				className: ''
			}
		}
	};

	/**
	 * Version information
	 * @type {string}
	 * @static
	 */
	Buttons.version = '1.6.3';


	$.extend(_dtButtons, {
		collection: {
			text: function (dt) {
				return dt.i18n('buttons.collection', 'Collection');
			},
			className: 'buttons-collection',
			init: function (dt, button, config) {
				button.attr('aria-expanded', false);
			},
			action: function (e, dt, button, config) {
				e.stopPropagation();

				if (config._collection.parents('body').length) {
					this.popover(false, config);
				} else {
					this.popover(config._collection, config);
				}
			},
			attr: {
				'aria-haspopup': true
			}
			// Also the popover options, defined in Buttons.popover
		},
		copy: function (dt, conf) {
			if (_dtButtons.copyHtml5) {
				return 'copyHtml5';
			}
			if (_dtButtons.copyFlash && _dtButtons.copyFlash.available(dt, conf)) {
				return 'copyFlash';
			}
		},
		csv: function (dt, conf) {
			// Common option that will use the HTML5 or Flash export buttons
			if (_dtButtons.csvHtml5 && _dtButtons.csvHtml5.available(dt, conf)) {
				return 'csvHtml5';
			}
			if (_dtButtons.csvFlash && _dtButtons.csvFlash.available(dt, conf)) {
				return 'csvFlash';
			}
		},
		excel: function (dt, conf) {
			// Common option that will use the HTML5 or Flash export buttons
			if (_dtButtons.excelHtml5 && _dtButtons.excelHtml5.available(dt, conf)) {
				return 'excelHtml5';
			}
			if (_dtButtons.excelFlash && _dtButtons.excelFlash.available(dt, conf)) {
				return 'excelFlash';
			}
		},
		pdf: function (dt, conf) {
			// Common option that will use the HTML5 or Flash export buttons
			if (_dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available(dt, conf)) {
				return 'pdfHtml5';
			}
			if (_dtButtons.pdfFlash && _dtButtons.pdfFlash.available(dt, conf)) {
				return 'pdfFlash';
			}
		},
		pageLength: function (dt) {
			var lengthMenu = dt.settings()[0].aLengthMenu;
			var vals = $.isArray(lengthMenu[0]) ? lengthMenu[0] : lengthMenu;
			var lang = $.isArray(lengthMenu[0]) ? lengthMenu[1] : lengthMenu;
			var text = function (dt) {
				return dt.i18n('buttons.pageLength', {
					"-1": 'Show all rows',
					_: 'Show %d rows'
				}, dt.page.len());
			};

			return {
				extend: 'collection',
				text: text,
				className: 'buttons-page-length',
				autoClose: true,
				buttons: $.map(vals, function (val, i) {
					return {
						text: lang[i],
						className: 'button-page-length',
						action: function (e, dt) {
							dt.page.len(val).draw();
						},
						init: function (dt, node, conf) {
							var that = this;
							var fn = function () {
								that.active(dt.page.len() === val);
							};

							dt.on('length.dt' + conf.namespace, fn);
							fn();
						},
						destroy: function (dt, node, conf) {
							dt.off('length.dt' + conf.namespace);
						}
					};
				}),
				init: function (dt, node, conf) {
					var that = this;
					dt.on('length.dt' + conf.namespace, function () {
						that.text(conf.text);
					});
				},
				destroy: function (dt, node, conf) {
					dt.off('length.dt' + conf.namespace);
				}
			};
		}
	});


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * DataTables API
	 *
	 * For complete documentation, please refer to the docs/api directory or the
	 * DataTables site
	 */

	// Buttons group and individual button selector
	DataTable.Api.register('buttons()', function (group, selector) {
		// Argument shifting
		if (selector === undefined) {
			selector = group;
			group = undefined;
		}

		this.selector.buttonGroup = group;

		var res = this.iterator(true, 'table', function (ctx) {
			if (ctx._buttons) {
				return Buttons.buttonSelector(
					Buttons.instanceSelector(group, ctx._buttons),
					selector
				);
			}
		}, true);

		res._groupSelector = group;
		return res;
	});

	// Individual button selector
	DataTable.Api.register('button()', function (group, selector) {
		// just run buttons() and truncate
		var buttons = this.buttons(group, selector);

		if (buttons.length > 1) {
			buttons.splice(1, buttons.length);
		}

		return buttons;
	});

	// Active buttons
	DataTable.Api.registerPlural('buttons().active()', 'button().active()', function (flag) {
		if (flag === undefined) {
			return this.map(function (set) {
				return set.inst.active(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.active(set.node, flag);
		});
	});

	// Get / set button action
	DataTable.Api.registerPlural('buttons().action()', 'button().action()', function (action) {
		if (action === undefined) {
			return this.map(function (set) {
				return set.inst.action(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.action(set.node, action);
		});
	});

	// Enable / disable buttons
	DataTable.Api.register(['buttons().enable()', 'button().enable()'], function (flag) {
		return this.each(function (set) {
			set.inst.enable(set.node, flag);
		});
	});

	// Disable buttons
	DataTable.Api.register(['buttons().disable()', 'button().disable()'], function () {
		return this.each(function (set) {
			set.inst.disable(set.node);
		});
	});

	// Get button nodes
	DataTable.Api.registerPlural('buttons().nodes()', 'button().node()', function () {
		var jq = $();

		// jQuery will automatically reduce duplicates to a single entry
		$(this.each(function (set) {
			jq = jq.add(set.inst.node(set.node));
		}));

		return jq;
	});

	// Get / set button processing state
	DataTable.Api.registerPlural('buttons().processing()', 'button().processing()', function (flag) {
		if (flag === undefined) {
			return this.map(function (set) {
				return set.inst.processing(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.processing(set.node, flag);
		});
	});

	// Get / set button text (i.e. the button labels)
	DataTable.Api.registerPlural('buttons().text()', 'button().text()', function (label) {
		if (label === undefined) {
			return this.map(function (set) {
				return set.inst.text(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.text(set.node, label);
		});
	});

	// Trigger a button's action
	DataTable.Api.registerPlural('buttons().trigger()', 'button().trigger()', function () {
		return this.each(function (set) {
			set.inst.node(set.node).trigger('click');
		});
	});

	// Button resolver to the popover
	DataTable.Api.register('button().popover()', function (content, options) {
		return this.map(function (set) {
			return set.inst._popover(content, this.button(this[0].node), options);
		});
	});

	// Get the container elements
	DataTable.Api.register('buttons().containers()', function () {
		var jq = $();
		var groupSelector = this._groupSelector;

		// We need to use the group selector directly, since if there are no buttons
		// the result set will be empty
		this.iterator(true, 'table', function (ctx) {
			if (ctx._buttons) {
				var insts = Buttons.instanceSelector(groupSelector, ctx._buttons);

				for (var i = 0, ien = insts.length; i < ien; i++) {
					jq = jq.add(insts[i].container());
				}
			}
		});

		return jq;
	});

	DataTable.Api.register('buttons().container()', function () {
		// API level of nesting is `buttons()` so we can zip into the containers method
		return this.containers().eq(0);
	});

	// Add a new button
	DataTable.Api.register('button().add()', function (idx, conf) {
		var ctx = this.context;

		// Don't use `this` as it could be empty - select the instances directly
		if (ctx.length) {
			var inst = Buttons.instanceSelector(this._groupSelector, ctx[0]._buttons);

			if (inst.length) {
				inst[0].add(conf, idx);
			}
		}

		return this.button(this._groupSelector, idx);
	});

	// Destroy the button sets selected
	DataTable.Api.register('buttons().destroy()', function () {
		this.pluck('inst').unique().each(function (inst) {
			inst.destroy();
		});

		return this;
	});

	// Remove a button
	DataTable.Api.registerPlural('buttons().remove()', 'buttons().remove()', function () {
		this.each(function (set) {
			set.inst.remove(set.node);
		});

		return this;
	});

	// Information box that can be used by buttons
	var _infoTimer;
	DataTable.Api.register('buttons.info()', function (title, message, time) {
		var that = this;

		if (title === false) {
			this.off('destroy.btn-info');
			_fadeOut(
				$('#datatables_buttons_info'),
				400,
				function () {
					$(this).remove();
				}
			);
			clearTimeout(_infoTimer);
			_infoTimer = null;

			return this;
		}

		if (_infoTimer) {
			clearTimeout(_infoTimer);
		}

		if ($('#datatables_buttons_info').length) {
			$('#datatables_buttons_info').remove();
		}

		title = title ? '<h2>' + title + '</h2>' : '';

		_fadeIn(
			$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html(title)
			.append($('<div/>')[typeof message === 'string' ? 'html' : 'append'](message))
			.css('display', 'none')
			.appendTo('body')
		);

		if (time !== undefined && time !== 0) {
			_infoTimer = setTimeout(function () {
				that.buttons.info(false);
			}, time);
		}

		this.on('destroy.btn-info', function () {
			that.buttons.info(false);
		});

		return this;
	});

	// Get data from the table for export - this is common to a number of plug-in
	// buttons so it is included in the Buttons core library
	DataTable.Api.register('buttons.exportData()', function (options) {
		if (this.context.length) {
			return _exportData(new DataTable.Api(this.context[0]), options);
		}
	});

	// Get information about the export that is common to many of the export data
	// types (DRY)
	DataTable.Api.register('buttons.exportInfo()', function (conf) {
		if (!conf) {
			conf = {};
		}

		return {
			filename: _filename(conf),
			title: _title(conf),
			messageTop: _message(this, conf.message || conf.messageTop, 'top'),
			messageBottom: _message(this, conf.messageBottom, 'bottom')
		};
	});



	/**
	 * Get the file name for an exported file.
	 *
	 * @param {object}	config Button configuration
	 * @param {boolean} incExtension Include the file name extension
	 */
	var _filename = function (config) {
		// Backwards compatibility
		var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
			config.title :
			config.filename;

		if (typeof filename === 'function') {
			filename = filename();
		}

		if (filename === undefined || filename === null) {
			return null;
		}

		if (filename.indexOf('*') !== -1) {
			filename = $.trim(filename.replace('*', $('head > title').text()));
		}

		// Strip characters which the OS will object to
		filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

		var extension = _stringOrFunction(config.extension);
		if (!extension) {
			extension = '';
		}

		return filename + extension;
	};

	/**
	 * Simply utility method to allow parameters to be given as a function
	 *
	 * @param {undefined|string|function} option Option
	 * @return {null|string} Resolved value
	 */
	var _stringOrFunction = function (option) {
		if (option === null || option === undefined) {
			return null;
		} else if (typeof option === 'function') {
			return option();
		}
		return option;
	};

	/**
	 * Get the title for an exported file.
	 *
	 * @param {object} config	Button configuration
	 */
	var _title = function (config) {
		var title = _stringOrFunction(config.title);

		return title === null ?
			null : title.indexOf('*') !== -1 ?
			title.replace('*', $('head > title').text() || 'Exported data') :
			title;
	};

	var _message = function (dt, option, position) {
		var message = _stringOrFunction(option);
		if (message === null) {
			return null;
		}

		var caption = $('caption', dt.table().container()).eq(0);
		if (message === '*') {
			var side = caption.css('caption-side');
			if (side !== position) {
				return null;
			}

			return caption.length ?
				caption.text() :
				'';
		}

		return message;
	};







	var _exportTextarea = $('<textarea/>')[0];
	var _exportData = function (dt, inOpts) {
		var config = $.extend(true, {}, {
			rows: null,
			columns: '',
			modifier: {
				search: 'applied',
				order: 'applied'
			},
			orthogonal: 'display',
			stripHtml: true,
			stripNewlines: true,
			decodeEntities: true,
			trim: true,
			format: {
				header: function (d) {
					return strip(d);
				},
				footer: function (d) {
					return strip(d);
				},
				body: function (d) {
					return strip(d);
				}
			},
			customizeData: null
		}, inOpts);

		var strip = function (str) {
			if (typeof str !== 'string') {
				return str;
			}

			// Always remove script tags
			str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

			// Always remove comments
			str = str.replace(/<!\-\-.*?\-\->/g, '');

			if (config.stripHtml) {
				str = str.replace(/<[^>]*>/g, '');
			}

			if (config.trim) {
				str = str.replace(/^\s+|\s+$/g, '');
			}

			if (config.stripNewlines) {
				str = str.replace(/\n/g, ' ');
			}

			if (config.decodeEntities) {
				_exportTextarea.innerHTML = str;
				str = _exportTextarea.value;
			}

			return str;
		};


		var header = dt.columns(config.columns).indexes().map(function (idx) {
			var el = dt.column(idx).header();
			return config.format.header(el.innerHTML, idx, el);
		}).toArray();

		var footer = dt.table().footer() ?
			dt.columns(config.columns).indexes().map(function (idx) {
				var el = dt.column(idx).footer();
				return config.format.footer(el ? el.innerHTML : '', idx, el);
			}).toArray() :
			null;

		// If Select is available on this table, and any rows are selected, limit the export
		// to the selected rows. If no rows are selected, all rows will be exported. Specify
		// a `selected` modifier to control directly.
		var modifier = $.extend({}, config.modifier);
		if (dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined) {
			if (dt.rows(config.rows, $.extend({
					selected: true
				}, modifier)).any()) {
				$.extend(modifier, {
					selected: true
				})
			}
		}

		var rowIndexes = dt.rows(config.rows, modifier).indexes().toArray();
		var selectedCells = dt.cells(rowIndexes, config.columns);
		var cells = selectedCells
			.render(config.orthogonal)
			.toArray();
		var cellNodes = selectedCells
			.nodes()
			.toArray();

		var columns = header.length;
		var rows = columns > 0 ? cells.length / columns : 0;
		var body = [];
		var cellCounter = 0;

		for (var i = 0, ien = rows; i < ien; i++) {
			var row = [columns];

			for (var j = 0; j < columns; j++) {
				row[j] = config.format.body(cells[cellCounter], i, j, cellNodes[cellCounter]);
				cellCounter++;
			}

			body[i] = row;
		}

		var data = {
			header: header,
			footer: footer,
			body: body
		};

		if (config.customizeData) {
			config.customizeData(data);
		}

		return data;
	};


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * DataTables interface
	 */

	// Attach to DataTables objects for global access
	$.fn.dataTable.Buttons = Buttons;
	$.fn.DataTable.Buttons = Buttons;



	// DataTables creation - check if the buttons have been defined for this table,
	// they will have been if the `B` option was used in `dom`, otherwise we should
	// create the buttons instance here so they can be inserted into the document
	// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
	// be removed in future.
	$(document).on('init.dt plugin-init.dt', function (e, settings) {
		if (e.namespace !== 'dt') {
			return;
		}

		var opts = settings.oInit.buttons || DataTable.defaults.buttons;

		if (opts && !settings._buttons) {
			new Buttons(settings, opts).container();
		}
	});

	function _init(settings, options) {
		var api = new DataTable.Api(settings);
		var opts = options ?
			options :
			api.init().buttons || DataTable.defaults.buttons;

		return new Buttons(api, opts).container();
	}

	// DataTables `dom` feature option
	DataTable.ext.feature.push({
		fnInit: _init,
		cFeature: "B"
	});

	// DataTables 2 layout feature
	if (DataTable.ext.features) {
		DataTable.ext.features.register('buttons', _init);
	}


	return Buttons;
}));


/*!
 * Flash export buttons for Buttons and DataTables.
 * 2015-2017 SpryMedia Ltd - datatables.net/license
 *
 * ZeroClipbaord - MIT license
 * Copyright (c) 2012 Joseph Huckaby
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net', 'datatables.net-buttons'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			if (!$.fn.dataTable.Buttons) {
				require('datatables.net-buttons')(root, $);
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * ZeroClipboard dependency
	 */

	/*
	 * ZeroClipboard 1.0.4 with modifications
	 * Author: Joseph Huckaby
	 * License: MIT
	 *
	 * Copyright (c) 2012 Joseph Huckaby
	 */
	var ZeroClipboard_TableTools = {
		version: "1.0.4-TableTools2",
		clients: {}, // registered upload clients on page, indexed by id
		moviePath: '', // URL to movie
		nextId: 1, // ID of next movie

		$: function (thingy) {
			// simple DOM lookup utility function
			if (typeof (thingy) == 'string') {
				thingy = document.getElementById(thingy);
			}
			if (!thingy.addClass) {
				// extend element with a few useful methods
				thingy.hide = function () {
					this.style.display = 'none';
				};
				thingy.show = function () {
					this.style.display = '';
				};
				thingy.addClass = function (name) {
					this.removeClass(name);
					this.className += ' ' + name;
				};
				thingy.removeClass = function (name) {
					this.className = this.className.replace(new RegExp("\\s*" + name + "\\s*"), " ").replace(/^\s+/, '').replace(/\s+$/, '');
				};
				thingy.hasClass = function (name) {
					return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
				};
			}
			return thingy;
		},

		setMoviePath: function (path) {
			// set path to ZeroClipboard.swf
			this.moviePath = path;
		},

		dispatch: function (id, eventName, args) {
			// receive event from flash movie, send to client
			var client = this.clients[id];
			if (client) {
				client.receiveEvent(eventName, args);
			}
		},

		log: function (str) {
			console.log('Flash: ' + str);
		},

		register: function (id, client) {
			// register new client to receive events
			this.clients[id] = client;
		},

		getDOMObjectPosition: function (obj) {
			// get absolute coordinates for dom element
			var info = {
				left: 0,
				top: 0,
				width: obj.width ? obj.width : obj.offsetWidth,
				height: obj.height ? obj.height : obj.offsetHeight
			};

			if (obj.style.width !== "") {
				info.width = obj.style.width.replace("px", "");
			}

			if (obj.style.height !== "") {
				info.height = obj.style.height.replace("px", "");
			}

			while (obj) {
				info.left += obj.offsetLeft;
				info.top += obj.offsetTop;
				obj = obj.offsetParent;
			}

			return info;
		},

		Client: function (elem) {
			// constructor for new simple upload client
			this.handlers = {};

			// unique ID
			this.id = ZeroClipboard_TableTools.nextId++;
			this.movieId = 'ZeroClipboard_TableToolsMovie_' + this.id;

			// register client with singleton to receive flash events
			ZeroClipboard_TableTools.register(this.id, this);

			// create movie
			if (elem) {
				this.glue(elem);
			}
		}
	};

	ZeroClipboard_TableTools.Client.prototype = {

		id: 0, // unique ID for us
		ready: false, // whether movie is ready to receive events or not
		movie: null, // reference to movie object
		clipText: '', // text to copy to clipboard
		fileName: '', // default file save name
		action: 'copy', // action to perform
		handCursorEnabled: true, // whether to show hand cursor, or default pointer cursor
		cssEffects: true, // enable CSS mouse effects on dom container
		handlers: null, // user event handlers
		sized: false,
		sheetName: '', // default sheet name for excel export

		glue: function (elem, title) {
			// glue to DOM element
			// elem can be ID or actual DOM element object
			this.domElement = ZeroClipboard_TableTools.$(elem);

			// float just above object, or zIndex 99 if dom element isn't set
			var zIndex = 99;
			if (this.domElement.style.zIndex) {
				zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
			}

			// find X/Y position of domElement
			var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);

			// create floating DIV above element
			this.div = document.createElement('div');
			var style = this.div.style;
			style.position = 'absolute';
			style.left = '0px';
			style.top = '0px';
			style.width = (box.width) + 'px';
			style.height = box.height + 'px';
			style.zIndex = zIndex;

			if (typeof title != "undefined" && title !== "") {
				this.div.title = title;
			}
			if (box.width !== 0 && box.height !== 0) {
				this.sized = true;
			}

			// style.backgroundColor = '#f00'; // debug
			if (this.domElement) {
				this.domElement.appendChild(this.div);
				this.div.innerHTML = this.getHTML(box.width, box.height).replace(/&/g, '&amp;');
			}
		},

		positionElement: function () {
			var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);
			var style = this.div.style;

			style.position = 'absolute';
			//style.left = (this.domElement.offsetLeft)+'px';
			//style.top = this.domElement.offsetTop+'px';
			style.width = box.width + 'px';
			style.height = box.height + 'px';

			if (box.width !== 0 && box.height !== 0) {
				this.sized = true;
			} else {
				return;
			}

			var flash = this.div.childNodes[0];
			flash.width = box.width;
			flash.height = box.height;
		},

		getHTML: function (width, height) {
			// return HTML for movie
			var html = '';
			var flashvars = 'id=' + this.id +
				'&width=' + width +
				'&height=' + height;

			if (navigator.userAgent.match(/MSIE/)) {
				// IE gets an OBJECT tag
				var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
				html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard_TableTools.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
			} else {
				// all other browsers get an EMBED tag
				html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard_TableTools.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
			}
			return html;
		},

		hide: function () {
			// temporarily hide floater offscreen
			if (this.div) {
				this.div.style.left = '-2000px';
			}
		},

		show: function () {
			// show ourselves after a call to hide()
			this.reposition();
		},

		destroy: function () {
			// destroy control and floater
			var that = this;

			if (this.domElement && this.div) {
				$(this.div).remove();

				this.domElement = null;
				this.div = null;

				$.each(ZeroClipboard_TableTools.clients, function (id, client) {
					if (client === that) {
						delete ZeroClipboard_TableTools.clients[id];
					}
				});
			}
		},

		reposition: function (elem) {
			// reposition our floating div, optionally to new container
			// warning: container CANNOT change size, only position
			if (elem) {
				this.domElement = ZeroClipboard_TableTools.$(elem);
				if (!this.domElement) {
					this.hide();
				}
			}

			if (this.domElement && this.div) {
				var box = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);
				var style = this.div.style;
				style.left = '' + box.left + 'px';
				style.top = '' + box.top + 'px';
			}
		},

		clearText: function () {
			// clear the text to be copy / saved
			this.clipText = '';
			if (this.ready) {
				this.movie.clearText();
			}
		},

		appendText: function (newText) {
			// append text to that which is to be copied / saved
			this.clipText += newText;
			if (this.ready) {
				this.movie.appendText(newText);
			}
		},

		setText: function (newText) {
			// set text to be copied to be copied / saved
			this.clipText = newText;
			if (this.ready) {
				this.movie.setText(newText);
			}
		},

		setFileName: function (newText) {
			// set the file name
			this.fileName = newText;
			if (this.ready) {
				this.movie.setFileName(newText);
			}
		},

		setSheetData: function (data) {
			// set the xlsx sheet data
			if (this.ready) {
				this.movie.setSheetData(JSON.stringify(data));
			}
		},

		setAction: function (newText) {
			// set action (save or copy)
			this.action = newText;
			if (this.ready) {
				this.movie.setAction(newText);
			}
		},

		addEventListener: function (eventName, func) {
			// add user event listener for event
			// event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
			eventName = eventName.toString().toLowerCase().replace(/^on/, '');
			if (!this.handlers[eventName]) {
				this.handlers[eventName] = [];
			}
			this.handlers[eventName].push(func);
		},

		setHandCursor: function (enabled) {
			// enable hand cursor (true), or default arrow cursor (false)
			this.handCursorEnabled = enabled;
			if (this.ready) {
				this.movie.setHandCursor(enabled);
			}
		},

		setCSSEffects: function (enabled) {
			// enable or disable CSS effects on DOM container
			this.cssEffects = !!enabled;
		},

		receiveEvent: function (eventName, args) {
			var self;

			// receive event from flash
			eventName = eventName.toString().toLowerCase().replace(/^on/, '');

			// special behavior for certain events
			switch (eventName) {
				case 'load':
					// movie claims it is ready, but in IE this isn't always the case...
					// bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
					this.movie = document.getElementById(this.movieId);
					if (!this.movie) {
						self = this;
						setTimeout(function () {
							self.receiveEvent('load', null);
						}, 1);
						return;
					}

					// firefox on pc needs a "kick" in order to set these in certain cases
					if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
						self = this;
						setTimeout(function () {
							self.receiveEvent('load', null);
						}, 100);
						this.ready = true;
						return;
					}

					this.ready = true;
					this.movie.clearText();
					this.movie.appendText(this.clipText);
					this.movie.setFileName(this.fileName);
					this.movie.setAction(this.action);
					this.movie.setHandCursor(this.handCursorEnabled);
					break;

				case 'mouseover':
					if (this.domElement && this.cssEffects) {
						//this.domElement.addClass('hover');
						if (this.recoverActive) {
							this.domElement.addClass('active');
						}
					}
					break;

				case 'mouseout':
					if (this.domElement && this.cssEffects) {
						this.recoverActive = false;
						if (this.domElement.hasClass('active')) {
							this.domElement.removeClass('active');
							this.recoverActive = true;
						}
						//this.domElement.removeClass('hover');
					}
					break;

				case 'mousedown':
					if (this.domElement && this.cssEffects) {
						this.domElement.addClass('active');
					}
					break;

				case 'mouseup':
					if (this.domElement && this.cssEffects) {
						this.domElement.removeClass('active');
						this.recoverActive = false;
					}
					break;
			} // switch eventName

			if (this.handlers[eventName]) {
				for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
					var func = this.handlers[eventName][idx];

					if (typeof (func) == 'function') {
						// actual function reference
						func(this, args);
					} else if ((typeof (func) == 'object') && (func.length == 2)) {
						// PHP style object + method, i.e. [myObject, 'myMethod']
						func[0][func[1]](this, args);
					} else if (typeof (func) == 'string') {
						// name of function
						window[func](this, args);
					}
				} // foreach event handler defined
			} // user defined handler for event
		}
	};

	ZeroClipboard_TableTools.hasFlash = function () {
		try {
			var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (fo) {
				return true;
			}
		} catch (e) {
			if (
				navigator.mimeTypes &&
				navigator.mimeTypes['application/x-shockwave-flash'] !== undefined &&
				navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
			) {
				return true;
			}
		}

		return false;
	};

	// For the Flash binding to work, ZeroClipboard_TableTools must be on the global
	// object list
	window.ZeroClipboard_TableTools = ZeroClipboard_TableTools;



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Local (private) functions
	 */

	/**
	 * If a Buttons instance is initlaised before it is placed into the DOM, Flash
	 * won't be able to bind to it, so we need to wait until it is available, this
	 * method abstracts that out.
	 *
	 * @param {ZeroClipboard} flash ZeroClipboard instance
	 * @param {jQuery} node  Button
	 */
	var _glue = function (flash, node) {
		var id = node.attr('id');

		if (node.parents('html').length) {
			flash.glue(node[0], '');
		} else {
			setTimeout(function () {
				_glue(flash, node);
			}, 500);
		}
	};

	/**
	 * Get the sheet name for Excel exports.
	 *
	 * @param {object}  config       Button configuration
	 */
	var _sheetname = function (config) {
		var sheetName = 'Sheet1';

		if (config.sheetName) {
			sheetName = config.sheetName.replace(/[\[\]\*\/\\\?\:]/g, '');
		}

		return sheetName;
	};

	/**
	 * Set the flash text. This has to be broken up into chunks as the Javascript /
	 * Flash bridge has a size limit. There is no indication in the Flash
	 * documentation what this is, and it probably depends upon the browser.
	 * Experimentation shows that the point is around 50k when data starts to get
	 * lost, so an 8K limit used here is safe.
	 *
	 * @param {ZeroClipboard} flash ZeroClipboard instance
	 * @param {string}        data  Data to send to Flash
	 */
	var _setText = function (flash, data) {
		var parts = data.match(/[\s\S]{1,8192}/g) || [];

		flash.clearText();
		for (var i = 0, len = parts.length; i < len; i++) {
			flash.appendText(parts[i]);
		}
	};

	/**
	 * Get the newline character(s)
	 *
	 * @param {object}  config Button configuration
	 * @return {string}        Newline character
	 */
	var _newLine = function (config) {
		return config.newline ?
			config.newline :
			navigator.userAgent.match(/Windows/) ?
			'\r\n' :
			'\n';
	};

	/**
	 * Combine the data from the `buttons.exportData` method into a string that
	 * will be used in the export file.
	 *
	 * @param  {DataTable.Api} dt     DataTables API instance
	 * @param  {object}        config Button configuration
	 * @return {object}               The data to export
	 */
	var _exportData = function (dt, config) {
		var newLine = _newLine(config);
		var data = dt.buttons.exportData(config.exportOptions);
		var boundary = config.fieldBoundary;
		var separator = config.fieldSeparator;
		var reBoundary = new RegExp(boundary, 'g');
		var escapeChar = config.escapeChar !== undefined ?
			config.escapeChar :
			'\\';
		var join = function (a) {
			var s = '';

			// If there is a field boundary, then we might need to escape it in
			// the source data
			for (var i = 0, ien = a.length; i < ien; i++) {
				if (i > 0) {
					s += separator;
				}

				s += boundary ?
					boundary + ('' + a[i]).replace(reBoundary, escapeChar + boundary) + boundary :
					a[i];
			}

			return s;
		};

		var header = config.header ? join(data.header) + newLine : '';
		var footer = config.footer && data.footer ? newLine + join(data.footer) : '';
		var body = [];

		for (var i = 0, ien = data.body.length; i < ien; i++) {
			body.push(join(data.body[i]));
		}

		return {
			str: header + body.join(newLine) + footer,
			rows: body.length
		};
	};


	// Basic initialisation for the buttons is common between them
	var flashButton = {
		available: function () {
			return ZeroClipboard_TableTools.hasFlash();
		},

		init: function (dt, button, config) {
			// Insert the Flash movie
			ZeroClipboard_TableTools.moviePath = DataTable.Buttons.swfPath;
			var flash = new ZeroClipboard_TableTools.Client();

			flash.setHandCursor(true);
			flash.addEventListener('mouseDown', function (client) {
				config._fromFlash = true;
				dt.button(button[0]).trigger();
				config._fromFlash = false;
			});

			_glue(flash, button);

			config._flash = flash;
		},

		destroy: function (dt, button, config) {
			config._flash.destroy();
		},

		fieldSeparator: ',',

		fieldBoundary: '"',

		exportOptions: {},

		title: '*',

		messageTop: '*',

		messageBottom: '*',

		filename: '*',

		extension: '.csv',

		header: true,

		footer: false
	};


	/**
	 * Convert from numeric position to letter for column names in Excel
	 * @param  {int} n Column number
	 * @return {string} Column letter(s) name
	 */
	function createCellPos(n) {
		var ordA = 'A'.charCodeAt(0);
		var ordZ = 'Z'.charCodeAt(0);
		var len = ordZ - ordA + 1;
		var s = "";

		while (n >= 0) {
			s = String.fromCharCode(n % len + ordA) + s;
			n = Math.floor(n / len) - 1;
		}

		return s;
	}

	/**
	 * Create an XML node and add any children, attributes, etc without needing to
	 * be verbose in the DOM.
	 *
	 * @param  {object} doc      XML document
	 * @param  {string} nodeName Node name
	 * @param  {object} opts     Options - can be `attr` (attributes), `children`
	 *   (child nodes) and `text` (text content)
	 * @return {node}            Created node
	 */
	function _createNode(doc, nodeName, opts) {
		var tempNode = doc.createElement(nodeName);

		if (opts) {
			if (opts.attr) {
				$(tempNode).attr(opts.attr);
			}

			if (opts.children) {
				$.each(opts.children, function (key, value) {
					tempNode.appendChild(value);
				});
			}

			if (opts.text !== null && opts.text !== undefined) {
				tempNode.appendChild(doc.createTextNode(opts.text));
			}
		}

		return tempNode;
	}

	/**
	 * Get the width for an Excel column based on the contents of that column
	 * @param  {object} data Data for export
	 * @param  {int}    col  Column index
	 * @return {int}         Column width
	 */
	function _excelColWidth(data, col) {
		var max = data.header[col].length;
		var len, lineSplit, str;

		if (data.footer && data.footer[col].length > max) {
			max = data.footer[col].length;
		}

		for (var i = 0, ien = data.body.length; i < ien; i++) {
			var point = data.body[i][col];
			str = point !== null && point !== undefined ?
				point.toString() :
				'';

			// If there is a newline character, workout the width of the column
			// based on the longest line in the string
			if (str.indexOf('\n') !== -1) {
				lineSplit = str.split('\n');
				lineSplit.sort(function (a, b) {
					return b.length - a.length;
				});

				len = lineSplit[0].length;
			} else {
				len = str.length;
			}

			if (len > max) {
				max = len;
			}

			// Max width rather than having potentially massive column widths
			if (max > 40) {
				return 52; // 40 * 1.3
			}
		}

		max *= 1.3;

		// And a min width
		return max > 6 ? max : 6;
	}

	var _serialiser = "";
	if (typeof window.XMLSerializer === 'undefined') {
		_serialiser = new function () {
			this.serializeToString = function (input) {
				return input.xml
			}
		};
	} else {
		_serialiser = new XMLSerializer();
	}

	var _ieExcel;


	/**
	 * Convert XML documents in an object to strings
	 * @param  {object} obj XLSX document object
	 */
	function _xlsxToStrings(obj) {
		if (_ieExcel === undefined) {
			// Detect if we are dealing with IE's _awful_ serialiser by seeing if it
			// drop attributes
			_ieExcel = _serialiser
				.serializeToString(
					$.parseXML(excelStrings['xl/worksheets/sheet1.xml'])
				)
				.indexOf('xmlns:r') === -1;
		}

		$.each(obj, function (name, val) {
			if ($.isPlainObject(val)) {
				_xlsxToStrings(val);
			} else {
				if (_ieExcel) {
					// IE's XML serialiser will drop some name space attributes from
					// from the root node, so we need to save them. Do this by
					// replacing the namespace nodes with a regular attribute that
					// we convert back when serialised. Edge does not have this
					// issue
					var worksheet = val.childNodes[0];
					var i, ien;
					var attrs = [];

					for (i = worksheet.attributes.length - 1; i >= 0; i--) {
						var attrName = worksheet.attributes[i].nodeName;
						var attrValue = worksheet.attributes[i].nodeValue;

						if (attrName.indexOf(':') !== -1) {
							attrs.push({
								name: attrName,
								value: attrValue
							});

							worksheet.removeAttribute(attrName);
						}
					}

					for (i = 0, ien = attrs.length; i < ien; i++) {
						var attr = val.createAttribute(attrs[i].name.replace(':', '_dt_b_namespace_token_'));
						attr.value = attrs[i].value;
						worksheet.setAttributeNode(attr);
					}
				}

				var str = _serialiser.serializeToString(val);

				// Fix IE's XML
				if (_ieExcel) {
					// IE doesn't include the XML declaration
					if (str.indexOf('<?xml') === -1) {
						str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + str;
					}

					// Return namespace attributes to being as such
					str = str.replace(/_dt_b_namespace_token_/g, ':');
				}

				// Safari, IE and Edge will put empty name space attributes onto
				// various elements making them useless. This strips them out
				str = str.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g, '<$1 $2>');

				obj[name] = str;
			}
		});
	}

	// Excel - Pre-defined strings to build a basic XLSX file
	var excelStrings = {
		"_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
			'</Relationships>',

		"xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
			'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
			'</Relationships>',

		"[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
			'<Default Extension="xml" ContentType="application/xml" />' +
			'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
			'<Default Extension="jpeg" ContentType="image/jpeg" />' +
			'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
			'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
			'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />' +
			'</Types>',

		"xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
			'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>' +
			'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>' +
			'<bookViews>' +
			'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>' +
			'</bookViews>' +
			'<sheets>' +
			'<sheet name="" sheetId="1" r:id="rId1"/>' +
			'</sheets>' +
			'</workbook>',

		"xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
			'<sheetData/>' +
			'<mergeCells count="0"/>' +
			'</worksheet>',

		"xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?>' +
			'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
			'<numFmts count="6">' +
			'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>' +
			'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>' +
			'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>' +
			'<numFmt numFmtId="167" formatCode="0.0%"/>' +
			'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>' +
			'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>' +
			'</numFmts>' +
			'<fonts count="5" x14ac:knownFonts="1">' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<color rgb="FFFFFFFF" />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<b />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<i />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<u />' +
			'</font>' +
			'</fonts>' +
			'<fills count="6">' +
			'<fill>' +
			'<patternFill patternType="none" />' +
			'</fill>' +
			'<fill>' + // Excel appears to use this as a dotted background regardless of values but
			'<patternFill patternType="none" />' + // to be valid to the schema, use a patternFill
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="FFD9D9D9" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="FFD99795" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="ffc6efce" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="ffc6cfef" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'</fills>' +
			'<borders count="2">' +
			'<border>' +
			'<left />' +
			'<right />' +
			'<top />' +
			'<bottom />' +
			'<diagonal />' +
			'</border>' +
			'<border diagonalUp="false" diagonalDown="false">' +
			'<left style="thin">' +
			'<color auto="1" />' +
			'</left>' +
			'<right style="thin">' +
			'<color auto="1" />' +
			'</right>' +
			'<top style="thin">' +
			'<color auto="1" />' +
			'</top>' +
			'<bottom style="thin">' +
			'<color auto="1" />' +
			'</bottom>' +
			'<diagonal />' +
			'</border>' +
			'</borders>' +
			'<cellStyleXfs count="1">' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />' +
			'</cellStyleXfs>' +
			'<cellXfs count="61">' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="left"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="center"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="right"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="fill"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment textRotation="90"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment wrapText="1"/>' +
			'</xf>' +
			'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'</cellXfs>' +
			'<cellStyles count="1">' +
			'<cellStyle name="Normal" xfId="0" builtinId="0" />' +
			'</cellStyles>' +
			'<dxfs count="0" />' +
			'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />' +
			'</styleSheet>'
	};
	// Note we could use 3 `for` loops for the styles, but when gzipped there is
	// virtually no difference in size, since the above can be easily compressed

	// Pattern matching for special number formats. Perhaps this should be exposed
	// via an API in future?
	var _excelSpecials = [{
			match: /^\-?\d+\.\d%$/,
			style: 60,
			fmt: function (d) {
				return d / 100;
			}
		}, // Precent with d.p.
		{
			match: /^\-?\d+\.?\d*%$/,
			style: 56,
			fmt: function (d) {
				return d / 100;
			}
		}, // Percent
		{
			match: /^\-?\$[\d,]+.?\d*$/,
			style: 57
		}, // Dollars
		{
			match: /^\-?£[\d,]+.?\d*$/,
			style: 58
		}, // Pounds
		{
			match: /^\-?€[\d,]+.?\d*$/,
			style: 59
		}, // Euros
		{
			match: /^\([\d,]+\)$/,
			style: 61,
			fmt: function (d) {
				return -1 * d.replace(/[\(\)]/g, '');
			}
		}, // Negative numbers indicated by brackets
		{
			match: /^\([\d,]+\.\d{2}\)$/,
			style: 62,
			fmt: function (d) {
				return -1 * d.replace(/[\(\)]/g, '');
			}
		}, // Negative numbers indicated by brackets - 2d.p.
		{
			match: /^[\d,]+$/,
			style: 63
		}, // Numbers with thousand separators
		{
			match: /^[\d,]+\.\d{2}$/,
			style: 64
		} // Numbers with 2d.p. and thousands separators
	];



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * DataTables options and methods
	 */

	// Set the default SWF path
	DataTable.Buttons.swfPath = '//cdn.datatables.net/buttons/' + DataTable.Buttons.version + '/swf/flashExport.swf';

	// Method to allow Flash buttons to be resized when made visible - as they are
	// of zero height and width if initialised hidden
	DataTable.Api.register('buttons.resize()', function () {
		$.each(ZeroClipboard_TableTools.clients, function (i, client) {
			if (client.domElement !== undefined && client.domElement.parentNode) {
				client.positionElement();
			}
		});
	});


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Button definitions
	 */

	// Copy to clipboard
	DataTable.ext.buttons.copyFlash = $.extend({}, flashButton, {
		className: 'buttons-copy buttons-flash',

		text: function (dt) {
			return dt.i18n('buttons.copy', 'Copy');
		},

		action: function (e, dt, button, config) {
			// Check that the trigger did actually occur due to a Flash activation
			if (!config._fromFlash) {
				return;
			}

			this.processing(true);

			var flash = config._flash;
			var exportData = _exportData(dt, config);
			var info = dt.buttons.exportInfo(config);
			var newline = _newLine(config);
			var output = exportData.str;

			if (info.title) {
				output = info.title + newline + newline + output;
			}

			if (info.messageTop) {
				output = info.messageTop + newline + newline + output;
			}

			if (info.messageBottom) {
				output = output + newline + newline + info.messageBottom;
			}

			if (config.customize) {
				output = config.customize(output, config, dt);
			}

			flash.setAction('copy');
			_setText(flash, output);

			this.processing(false);

			dt.buttons.info(
				dt.i18n('buttons.copyTitle', 'Copy to clipboard'),
				dt.i18n('buttons.copySuccess', {
					_: 'Copied %d rows to clipboard',
					1: 'Copied 1 row to clipboard'
				}, data.rows),
				3000
			);
		},

		fieldSeparator: '\t',

		fieldBoundary: ''
	});

	// CSV save file
	DataTable.ext.buttons.csvFlash = $.extend({}, flashButton, {
		className: 'buttons-csv buttons-flash',

		text: function (dt) {
			return dt.i18n('buttons.csv', 'CSV');
		},

		action: function (e, dt, button, config) {
			// Set the text
			var flash = config._flash;
			var data = _exportData(dt, config);
			var info = dt.buttons.exportInfo(config);
			var output = config.customize ?
				config.customize(data.str, config, dt) :
				data.str;

			flash.setAction('csv');
			flash.setFileName(info.filename);
			_setText(flash, output);
		},

		escapeChar: '"'
	});

	// Excel save file - this is really a CSV file using UTF-8 that Excel can read
	DataTable.ext.buttons.excelFlash = $.extend({}, flashButton, {
		className: 'buttons-excel buttons-flash',

		text: function (dt) {
			return dt.i18n('buttons.excel', 'Excel');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			var flash = config._flash;
			var rowPos = 0;
			var rels = $.parseXML(excelStrings['xl/worksheets/sheet1.xml']); //Parses xml
			var relsGet = rels.getElementsByTagName("sheetData")[0];

			var xlsx = {
				_rels: {
					".rels": $.parseXML(excelStrings['_rels/.rels'])
				},
				xl: {
					_rels: {
						"workbook.xml.rels": $.parseXML(excelStrings['xl/_rels/workbook.xml.rels'])
					},
					"workbook.xml": $.parseXML(excelStrings['xl/workbook.xml']),
					"styles.xml": $.parseXML(excelStrings['xl/styles.xml']),
					"worksheets": {
						"sheet1.xml": rels
					}

				},
				"[Content_Types].xml": $.parseXML(excelStrings['[Content_Types].xml'])
			};

			var data = dt.buttons.exportData(config.exportOptions);
			var currentRow, rowNode;
			var addRow = function (row) {
				currentRow = rowPos + 1;
				rowNode = _createNode(rels, "row", {
					attr: {
						r: currentRow
					}
				});

				for (var i = 0, ien = row.length; i < ien; i++) {
					// Concat both the Cell Columns as a letter and the Row of the cell.
					var cellId = createCellPos(i) + '' + currentRow;
					var cell = null;

					// For null, undefined of blank cell, continue so it doesn't create the _createNode
					if (row[i] === null || row[i] === undefined || row[i] === '') {
						if (config.createEmptyCells === true) {
							row[i] = '';
						} else {
							continue;
						}
					}

					row[i] = $.trim(row[i]);

					// Special number formatting options
					for (var j = 0, jen = _excelSpecials.length; j < jen; j++) {
						var special = _excelSpecials[j];

						// TODO Need to provide the ability for the specials to say
						// if they are returning a string, since at the moment it is
						// assumed to be a number
						if (row[i].match && !row[i].match(/^0\d+/) && row[i].match(special.match)) {
							var val = row[i].replace(/[^\d\.\-]/g, '');

							if (special.fmt) {
								val = special.fmt(val);
							}

							cell = _createNode(rels, 'c', {
								attr: {
									r: cellId,
									s: special.style
								},
								children: [
									_createNode(rels, 'v', {
										text: val
									})
								]
							});

							break;
						}
					}

					if (!cell) {
						if (typeof row[i] === 'number' || (
								row[i].match &&
								row[i].match(/^-?\d+(\.\d+)?$/) &&
								!row[i].match(/^0\d+/))) {
							// Detect numbers - don't match numbers with leading zeros
							// or a negative anywhere but the start
							cell = _createNode(rels, 'c', {
								attr: {
									t: 'n',
									r: cellId
								},
								children: [
									_createNode(rels, 'v', {
										text: row[i]
									})
								]
							});
						} else {
							// String output - replace non standard characters for text output
							var text = !row[i].replace ?
								row[i] :
								row[i].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

							cell = _createNode(rels, 'c', {
								attr: {
									t: 'inlineStr',
									r: cellId
								},
								children: {
									row: _createNode(rels, 'is', {
										children: {
											row: _createNode(rels, 't', {
												text: text
											})
										}
									})
								}
							});
						}
					}

					rowNode.appendChild(cell);
				}

				relsGet.appendChild(rowNode);
				rowPos++;
			};

			$('sheets sheet', xlsx.xl['workbook.xml']).attr('name', _sheetname(config));

			if (config.customizeData) {
				config.customizeData(data);
			}

			var mergeCells = function (row, colspan) {
				var mergeCells = $('mergeCells', rels);

				mergeCells[0].appendChild(_createNode(rels, 'mergeCell', {
					attr: {
						ref: 'A' + row + ':' + createCellPos(colspan) + row
					}
				}));
				mergeCells.attr('count', mergeCells.attr('count') + 1);
				$('row:eq(' + (row - 1) + ') c', rels).attr('s', '51'); // centre
			};

			// Title and top messages
			var exportInfo = dt.buttons.exportInfo(config);
			if (exportInfo.title) {
				addRow([exportInfo.title], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}

			if (exportInfo.messageTop) {
				addRow([exportInfo.messageTop], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}

			// Table itself
			if (config.header) {
				addRow(data.header, rowPos);
				$('row:last c', rels).attr('s', '2'); // bold
			}

			for (var n = 0, ie = data.body.length; n < ie; n++) {
				addRow(data.body[n], rowPos);
			}

			if (config.footer && data.footer) {
				addRow(data.footer, rowPos);
				$('row:last c', rels).attr('s', '2'); // bold
			}

			// Below the table
			if (exportInfo.messageBottom) {
				addRow([exportInfo.messageBottom], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}

			// Set column widths
			var cols = _createNode(rels, 'cols');
			$('worksheet', rels).prepend(cols);

			for (var i = 0, ien = data.header.length; i < ien; i++) {
				cols.appendChild(_createNode(rels, 'col', {
					attr: {
						min: i + 1,
						max: i + 1,
						width: _excelColWidth(data, i),
						customWidth: 1
					}
				}));
			}

			// Let the developer customise the document if they want to
			if (config.customize) {
				config.customize(xlsx, config, dt);
			}

			_xlsxToStrings(xlsx);

			flash.setAction('excel');
			flash.setFileName(exportInfo.filename);
			flash.setSheetData(xlsx);
			_setText(flash, '');

			this.processing(false);
		},

		extension: '.xlsx',

		createEmptyCells: false
	});



	// PDF export
	DataTable.ext.buttons.pdfFlash = $.extend({}, flashButton, {
		className: 'buttons-pdf buttons-flash',

		text: function (dt) {
			return dt.i18n('buttons.pdf', 'PDF');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			// Set the text
			var flash = config._flash;
			var data = dt.buttons.exportData(config.exportOptions);
			var info = dt.buttons.exportInfo(config);
			var totalWidth = dt.table().node().offsetWidth;

			// Calculate the column width ratios for layout of the table in the PDF
			var ratios = dt.columns(config.columns).indexes().map(function (idx) {
				return dt.column(idx).header().offsetWidth / totalWidth;
			});

			flash.setAction('pdf');
			flash.setFileName(info.filename);

			_setText(flash, JSON.stringify({
				title: info.title || '',
				messageTop: info.messageTop || '',
				messageBottom: info.messageBottom || '',
				colWidth: ratios.toArray(),
				orientation: config.orientation,
				size: config.pageSize,
				header: config.header ? data.header : null,
				footer: config.footer ? data.footer : null,
				body: data.body
			}));

			this.processing(false);
		},

		extension: '.pdf',

		orientation: 'portrait',

		pageSize: 'A4',

		newline: '\n'
	});


	return DataTable.Buttons;
}));


/*!
 * HTML5 export buttons for Buttons and DataTables.
 * 2016 SpryMedia Ltd - datatables.net/license
 *
 * FileSaver.js (1.3.3) - MIT license
 * Copyright © 2016 Eli Grey - http://eligrey.com
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net', 'datatables.net-buttons'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $, jszip, pdfmake) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			if (!$.fn.dataTable.Buttons) {
				require('datatables.net-buttons')(root, $);
			}

			return factory($, root, root.document, jszip, pdfmake);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, jszip, pdfmake, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;

	// Allow the constructor to pass in JSZip and PDFMake from external requires.
	// Otherwise, use globally defined variables, if they are available.
	function _jsZip() {
		return jszip || window.JSZip;
	}

	function _pdfMake() {
		return pdfmake || window.pdfMake;
	}

	DataTable.Buttons.pdfMake = function (_) {
		if (!_) {
			return _pdfMake();
		}
		pdfmake = _;
	}

	DataTable.Buttons.jszip = function (_) {
		if (!_) {
			return _jsZip();
		}
		jszip = _;
	}


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * FileSaver.js dependency
	 */

	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

	var _saveAs = (function (view) {
		"use strict";
		// IE <10 is explicitly unsupported
		if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var
			doc = view.document
			// only get URL when necessary in case Blob.js hasn't overridden it yet
			,
			get_URL = function () {
				return view.URL || view.webkitURL || view;
			},
			save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
			can_use_save_link = "download" in save_link,
			click = function (node) {
				var event = new MouseEvent("click");
				node.dispatchEvent(event);
			},
			is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
			is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
			throw_outside = function (ex) {
				(view.setImmediate || view.setTimeout)(function () {
					throw ex;
				}, 0);
			},
			force_saveable_type = "application/octet-stream"
			// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
			,
			arbitrary_revoke_timeout = 1000 * 40 // in ms
			,
			revoke = function (file) {
				var revoker = function () {
					if (typeof file === "string") { // file is an object URL
						get_URL().revokeObjectURL(file);
					} else { // file is a File
						file.remove();
					}
				};
				setTimeout(revoker, arbitrary_revoke_timeout);
			},
			dispatch = function (filesaver, event_types, event) {
				event_types = [].concat(event_types);
				var i = event_types.length;
				while (i--) {
					var listener = filesaver["on" + event_types[i]];
					if (typeof listener === "function") {
						try {
							listener.call(filesaver, event || filesaver);
						} catch (ex) {
							throw_outside(ex);
						}
					}
				}
			},
			auto_bom = function (blob) {
				// prepend BOM for UTF-8 XML and text/* types (including HTML)
				// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
				if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
					return new Blob([String.fromCharCode(0xFEFF), blob], {
						type: blob.type
					});
				}
				return blob;
			},
			FileSaver = function (blob, name, no_auto_bom) {
				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				// First try a.download, then web filesystem, then object URLs
				var
					filesaver = this,
					type = blob.type,
					force = type === force_saveable_type,
					object_url, dispatch_all = function () {
						dispatch(filesaver, "writestart progress write writeend".split(" "));
					}
					// on any filesys errors revert to saving with object URLs
					,
					fs_error = function () {
						if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
							// Safari doesn't allow downloading of blob urls
							var reader = new FileReader();
							reader.onloadend = function () {
								var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
								var popup = view.open(url, '_blank');
								if (!popup) view.location.href = url;
								url = undefined; // release reference before dispatching
								filesaver.readyState = filesaver.DONE;
								dispatch_all();
							};
							reader.readAsDataURL(blob);
							filesaver.readyState = filesaver.INIT;
							return;
						}
						// don't create more object URLs than needed
						if (!object_url) {
							object_url = get_URL().createObjectURL(blob);
						}
						if (force) {
							view.location.href = object_url;
						} else {
							var opened = view.open(object_url, "_blank");
							if (!opened) {
								// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
								view.location.href = object_url;
							}
						}
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
						revoke(object_url);
					};
				filesaver.readyState = filesaver.INIT;

				if (can_use_save_link) {
					object_url = get_URL().createObjectURL(blob);
					setTimeout(function () {
						save_link.href = object_url;
						save_link.download = name;
						click(save_link);
						dispatch_all();
						revoke(object_url);
						filesaver.readyState = filesaver.DONE;
					});
					return;
				}

				fs_error();
			},
			FS_proto = FileSaver.prototype,
			saveAs = function (blob, name, no_auto_bom) {
				return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
			};
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function (blob, name, no_auto_bom) {
				name = name || blob.name || "download";

				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name);
			};
		}

		FS_proto.abort = function () {};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error =
			FS_proto.onwritestart =
			FS_proto.onprogress =
			FS_proto.onwrite =
			FS_proto.onabort =
			FS_proto.onerror =
			FS_proto.onwriteend =
			null;

		return saveAs;
	}(
		typeof self !== "undefined" && self ||
		typeof window !== "undefined" && window ||
		this.content
	));


	// Expose file saver on the DataTables API. Can't attach to `DataTables.Buttons`
	// since this file can be loaded before Button's core!
	DataTable.fileSave = _saveAs;


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Local (private) functions
	 */

	/**
	 * Get the sheet name for Excel exports.
	 *
	 * @param {object}	config Button configuration
	 */
	var _sheetname = function (config) {
		var sheetName = 'Sheet1';

		if (config.sheetName) {
			sheetName = config.sheetName.replace(/[\[\]\*\/\\\?\:]/g, '');
		}

		return sheetName;
	};

	/**
	 * Get the newline character(s)
	 *
	 * @param {object}	config Button configuration
	 * @return {string}				Newline character
	 */
	var _newLine = function (config) {
		return config.newline ?
			config.newline :
			navigator.userAgent.match(/Windows/) ?
			'\r\n' :
			'\n';
	};

	/**
	 * Combine the data from the `buttons.exportData` method into a string that
	 * will be used in the export file.
	 *
	 * @param	{DataTable.Api} dt		 DataTables API instance
	 * @param	{object}				config Button configuration
	 * @return {object}							 The data to export
	 */
	var _exportData = function (dt, config) {
		var newLine = _newLine(config);
		var data = dt.buttons.exportData(config.exportOptions);
		var boundary = config.fieldBoundary;
		var separator = config.fieldSeparator;
		var reBoundary = new RegExp(boundary, 'g');
		var escapeChar = config.escapeChar !== undefined ?
			config.escapeChar :
			'\\';
		var join = function (a) {
			var s = '';

			// If there is a field boundary, then we might need to escape it in
			// the source data
			for (var i = 0, ien = a.length; i < ien; i++) {
				if (i > 0) {
					s += separator;
				}

				s += boundary ?
					boundary + ('' + a[i]).replace(reBoundary, escapeChar + boundary) + boundary :
					a[i];
			}

			return s;
		};

		var header = config.header ? join(data.header) + newLine : '';
		var footer = config.footer && data.footer ? newLine + join(data.footer) : '';
		var body = [];

		for (var i = 0, ien = data.body.length; i < ien; i++) {
			body.push(join(data.body[i]));
		}

		return {
			str: header + body.join(newLine) + footer,
			rows: body.length
		};
	};

	/**
	 * Older versions of Safari (prior to tech preview 18) don't support the
	 * download option required.
	 *
	 * @return {Boolean} `true` if old Safari
	 */
	var _isDuffSafari = function () {
		var safari = navigator.userAgent.indexOf('Safari') !== -1 &&
			navigator.userAgent.indexOf('Chrome') === -1 &&
			navigator.userAgent.indexOf('Opera') === -1;

		if (!safari) {
			return false;
		}

		var version = navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);
		if (version && version.length > 1 && version[1] * 1 < 603.1) {
			return true;
		}

		return false;
	};

	/**
	 * Convert from numeric position to letter for column names in Excel
	 * @param  {int} n Column number
	 * @return {string} Column letter(s) name
	 */
	function createCellPos(n) {
		var ordA = 'A'.charCodeAt(0);
		var ordZ = 'Z'.charCodeAt(0);
		var len = ordZ - ordA + 1;
		var s = "";

		while (n >= 0) {
			s = String.fromCharCode(n % len + ordA) + s;
			n = Math.floor(n / len) - 1;
		}

		return s;
	}

	try {
		var _serialiser = new XMLSerializer();
		var _ieExcel;
	} catch (t) {}

	/**
	 * Recursively add XML files from an object's structure to a ZIP file. This
	 * allows the XSLX file to be easily defined with an object's structure matching
	 * the files structure.
	 *
	 * @param {JSZip} zip ZIP package
	 * @param {object} obj Object to add (recursive)
	 */
	function _addToZip(zip, obj) {
		if (_ieExcel === undefined) {
			// Detect if we are dealing with IE's _awful_ serialiser by seeing if it
			// drop attributes
			_ieExcel = _serialiser
				.serializeToString(
					(new window.DOMParser()).parseFromString(excelStrings['xl/worksheets/sheet1.xml'], 'text/xml')
				)
				.indexOf('xmlns:r') === -1;
		}

		$.each(obj, function (name, val) {
			if ($.isPlainObject(val)) {
				var newDir = zip.folder(name);
				_addToZip(newDir, val);
			} else {
				if (_ieExcel) {
					// IE's XML serialiser will drop some name space attributes from
					// from the root node, so we need to save them. Do this by
					// replacing the namespace nodes with a regular attribute that
					// we convert back when serialised. Edge does not have this
					// issue
					var worksheet = val.childNodes[0];
					var i, ien;
					var attrs = [];

					for (i = worksheet.attributes.length - 1; i >= 0; i--) {
						var attrName = worksheet.attributes[i].nodeName;
						var attrValue = worksheet.attributes[i].nodeValue;

						if (attrName.indexOf(':') !== -1) {
							attrs.push({
								name: attrName,
								value: attrValue
							});

							worksheet.removeAttribute(attrName);
						}
					}

					for (i = 0, ien = attrs.length; i < ien; i++) {
						var attr = val.createAttribute(attrs[i].name.replace(':', '_dt_b_namespace_token_'));
						attr.value = attrs[i].value;
						worksheet.setAttributeNode(attr);
					}
				}

				var str = _serialiser.serializeToString(val);

				// Fix IE's XML
				if (_ieExcel) {
					// IE doesn't include the XML declaration
					if (str.indexOf('<?xml') === -1) {
						str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + str;
					}

					// Return namespace attributes to being as such
					str = str.replace(/_dt_b_namespace_token_/g, ':');

					// Remove testing name space that IE puts into the space preserve attr
					str = str.replace(/xmlns:NS[\d]+="" NS[\d]+:/g, '');
				}

				// Safari, IE and Edge will put empty name space attributes onto
				// various elements making them useless. This strips them out
				str = str.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g, '<$1 $2>');

				zip.file(name, str);
			}
		});
	}

	/**
	 * Create an XML node and add any children, attributes, etc without needing to
	 * be verbose in the DOM.
	 *
	 * @param  {object} doc      XML document
	 * @param  {string} nodeName Node name
	 * @param  {object} opts     Options - can be `attr` (attributes), `children`
	 *   (child nodes) and `text` (text content)
	 * @return {node}            Created node
	 */
	function _createNode(doc, nodeName, opts) {
		var tempNode = doc.createElement(nodeName);

		if (opts) {
			if (opts.attr) {
				$(tempNode).attr(opts.attr);
			}

			if (opts.children) {
				$.each(opts.children, function (key, value) {
					tempNode.appendChild(value);
				});
			}

			if (opts.text !== null && opts.text !== undefined) {
				tempNode.appendChild(doc.createTextNode(opts.text));
			}
		}

		return tempNode;
	}

	/**
	 * Get the width for an Excel column based on the contents of that column
	 * @param  {object} data Data for export
	 * @param  {int}    col  Column index
	 * @return {int}         Column width
	 */
	function _excelColWidth(data, col) {
		var max = data.header[col].length;
		var len, lineSplit, str;

		if (data.footer && data.footer[col].length > max) {
			max = data.footer[col].length;
		}

		for (var i = 0, ien = data.body.length; i < ien; i++) {
			var point = data.body[i][col];
			str = point !== null && point !== undefined ?
				point.toString() :
				'';

			// If there is a newline character, workout the width of the column
			// based on the longest line in the string
			if (str.indexOf('\n') !== -1) {
				lineSplit = str.split('\n');
				lineSplit.sort(function (a, b) {
					return b.length - a.length;
				});

				len = lineSplit[0].length;
			} else {
				len = str.length;
			}

			if (len > max) {
				max = len;
			}

			// Max width rather than having potentially massive column widths
			if (max > 40) {
				return 54; // 40 * 1.35
			}
		}

		max *= 1.35;

		// And a min width
		return max > 6 ? max : 6;
	}

	// Excel - Pre-defined strings to build a basic XLSX file
	var excelStrings = {
		"_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
			'</Relationships>',

		"xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
			'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
			'</Relationships>',

		"[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
			'<Default Extension="xml" ContentType="application/xml" />' +
			'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
			'<Default Extension="jpeg" ContentType="image/jpeg" />' +
			'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
			'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
			'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />' +
			'</Types>',

		"xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
			'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>' +
			'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>' +
			'<bookViews>' +
			'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>' +
			'</bookViews>' +
			'<sheets>' +
			'<sheet name="Sheet1" sheetId="1" r:id="rId1"/>' +
			'</sheets>' +
			'<definedNames/>' +
			'</workbook>',

		"xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
			'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
			'<sheetData/>' +
			'<mergeCells count="0"/>' +
			'</worksheet>',

		"xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?>' +
			'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
			'<numFmts count="6">' +
			'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>' +
			'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>' +
			'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>' +
			'<numFmt numFmtId="167" formatCode="0.0%"/>' +
			'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>' +
			'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>' +
			'</numFmts>' +
			'<fonts count="5" x14ac:knownFonts="1">' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<color rgb="FFFFFFFF" />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<b />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<i />' +
			'</font>' +
			'<font>' +
			'<sz val="11" />' +
			'<name val="Calibri" />' +
			'<u />' +
			'</font>' +
			'</fonts>' +
			'<fills count="6">' +
			'<fill>' +
			'<patternFill patternType="none" />' +
			'</fill>' +
			'<fill>' + // Excel appears to use this as a dotted background regardless of values but
			'<patternFill patternType="none" />' + // to be valid to the schema, use a patternFill
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="FFD9D9D9" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="FFD99795" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="ffc6efce" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'<fill>' +
			'<patternFill patternType="solid">' +
			'<fgColor rgb="ffc6cfef" />' +
			'<bgColor indexed="64" />' +
			'</patternFill>' +
			'</fill>' +
			'</fills>' +
			'<borders count="2">' +
			'<border>' +
			'<left />' +
			'<right />' +
			'<top />' +
			'<bottom />' +
			'<diagonal />' +
			'</border>' +
			'<border diagonalUp="false" diagonalDown="false">' +
			'<left style="thin">' +
			'<color auto="1" />' +
			'</left>' +
			'<right style="thin">' +
			'<color auto="1" />' +
			'</right>' +
			'<top style="thin">' +
			'<color auto="1" />' +
			'</top>' +
			'<bottom style="thin">' +
			'<color auto="1" />' +
			'</bottom>' +
			'<diagonal />' +
			'</border>' +
			'</borders>' +
			'<cellStyleXfs count="1">' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />' +
			'</cellStyleXfs>' +
			'<cellXfs count="68">' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="left"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="center"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="right"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment horizontal="fill"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment textRotation="90"/>' +
			'</xf>' +
			'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
			'<alignment wrapText="1"/>' +
			'</xf>' +
			'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'<xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
			'</cellXfs>' +
			'<cellStyles count="1">' +
			'<cellStyle name="Normal" xfId="0" builtinId="0" />' +
			'</cellStyles>' +
			'<dxfs count="0" />' +
			'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />' +
			'</styleSheet>'
	};
	// Note we could use 3 `for` loops for the styles, but when gzipped there is
	// virtually no difference in size, since the above can be easily compressed

	// Pattern matching for special number formats. Perhaps this should be exposed
	// via an API in future?
	// Ref: section 3.8.30 - built in formatters in open spreadsheet
	//   https://www.ecma-international.org/news/TC45_current_work/Office%20Open%20XML%20Part%204%20-%20Markup%20Language%20Reference.pdf
	var _excelSpecials = [{
			match: /^\-?\d+\.\d%$/,
			style: 60,
			fmt: function (d) {
				return d / 100;
			}
		}, // Precent with d.p.
		{
			match: /^\-?\d+\.?\d*%$/,
			style: 56,
			fmt: function (d) {
				return d / 100;
			}
		}, // Percent
		{
			match: /^\-?\$[\d,]+.?\d*$/,
			style: 57
		}, // Dollars
		{
			match: /^\-?£[\d,]+.?\d*$/,
			style: 58
		}, // Pounds
		{
			match: /^\-?€[\d,]+.?\d*$/,
			style: 59
		}, // Euros
		{
			match: /^\-?\d+$/,
			style: 65
		}, // Numbers without thousand separators
		{
			match: /^\-?\d+\.\d{2}$/,
			style: 66
		}, // Numbers 2 d.p. without thousands separators
		{
			match: /^\([\d,]+\)$/,
			style: 61,
			fmt: function (d) {
				return -1 * d.replace(/[\(\)]/g, '');
			}
		}, // Negative numbers indicated by brackets
		{
			match: /^\([\d,]+\.\d{2}\)$/,
			style: 62,
			fmt: function (d) {
				return -1 * d.replace(/[\(\)]/g, '');
			}
		}, // Negative numbers indicated by brackets - 2d.p.
		{
			match: /^\-?[\d,]+$/,
			style: 63
		}, // Numbers with thousand separators
		{
			match: /^\-?[\d,]+\.\d{2}$/,
			style: 64
		},
		{
			match: /^[\d]{4}\-[\d]{2}\-[\d]{2}$/,
			style: 67,
			fmt: function (d) {
				return Math.round(25569 + (Date.parse(d) / (86400 * 1000)));
			}
		} //Date yyyy-mm-dd
	];



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Buttons
	 */

	//
	// Copy to clipboard
	//
	DataTable.ext.buttons.copyHtml5 = {
		className: 'buttons-copy buttons-html5',

		text: function (dt) {
			return dt.i18n('buttons.copy', 'Copy');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			var that = this;
			var exportData = _exportData(dt, config);
			var info = dt.buttons.exportInfo(config);
			var newline = _newLine(config);
			var output = exportData.str;
			var hiddenDiv = $('<div/>')
				.css({
					height: 1,
					width: 1,
					overflow: 'hidden',
					position: 'fixed',
					top: 0,
					left: 0
				});

			if (info.title) {
				output = info.title + newline + newline + output;
			}

			if (info.messageTop) {
				output = info.messageTop + newline + newline + output;
			}

			if (info.messageBottom) {
				output = output + newline + newline + info.messageBottom;
			}

			if (config.customize) {
				output = config.customize(output, config, dt);
			}

			var textarea = $('<textarea readonly/>')
				.val(output)
				.appendTo(hiddenDiv);

			// For browsers that support the copy execCommand, try to use it
			if (document.queryCommandSupported('copy')) {
				hiddenDiv.appendTo(dt.table().container());
				textarea[0].focus();
				textarea[0].select();

				try {
					var successful = document.execCommand('copy');
					hiddenDiv.remove();

					if (successful) {
						dt.buttons.info(
							dt.i18n('buttons.copyTitle', 'Copy to clipboard'),
							dt.i18n('buttons.copySuccess', {
								1: 'Copied one row to clipboard',
								_: 'Copied %d rows to clipboard'
							}, exportData.rows),
							2000
						);

						this.processing(false);
						return;
					}
				} catch (t) {}
			}

			// Otherwise we show the text box and instruct the user to use it
			var message = $('<span>' + dt.i18n('buttons.copyKeys',
					'Press <i>ctrl</i> or <i>\u2318</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>' +
					'To cancel, click this message or press escape.') + '</span>')
				.append(hiddenDiv);

			dt.buttons.info(dt.i18n('buttons.copyTitle', 'Copy to clipboard'), message, 0);

			// Select the text so when the user activates their system clipboard
			// it will copy that text
			textarea[0].focus();
			textarea[0].select();

			// Event to hide the message when the user is done
			var container = $(message).closest('.dt-button-info');
			var close = function () {
				container.off('click.buttons-copy');
				$(document).off('.buttons-copy');
				dt.buttons.info(false);
			};

			container.on('click.buttons-copy', close);
			$(document)
				.on('keydown.buttons-copy', function (e) {
					if (e.keyCode === 27) { // esc
						close();
						that.processing(false);
					}
				})
				.on('copy.buttons-copy cut.buttons-copy', function () {
					close();
					that.processing(false);
				});
		},

		exportOptions: {},

		fieldSeparator: '\t',

		fieldBoundary: '',

		header: true,

		footer: false,

		title: '*',

		messageTop: '*',

		messageBottom: '*'
	};

	//
	// CSV export
	//
	DataTable.ext.buttons.csvHtml5 = {
		bom: false,

		className: 'buttons-csv buttons-html5',

		available: function () {
			return window.FileReader !== undefined && window.Blob;
		},

		text: function (dt) {
			return dt.i18n('buttons.csv', 'CSV');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			// Set the text
			var output = _exportData(dt, config).str;
			var info = dt.buttons.exportInfo(config);
			var charset = config.charset;

			if (config.customize) {
				output = config.customize(output, config, dt);
			}

			if (charset !== false) {
				if (!charset) {
					charset = document.characterSet || document.charset;
				}

				if (charset) {
					charset = ';charset=' + charset;
				}
			} else {
				charset = '';
			}

			if (config.bom) {
				output = '\ufeff' + output;
			}

			_saveAs(
				new Blob([output], {
					type: 'text/csv' + charset
				}),
				info.filename,
				true
			);

			this.processing(false);
		},

		filename: '*',

		extension: '.csv',

		exportOptions: {},

		fieldSeparator: ',',

		fieldBoundary: '"',

		escapeChar: '"',

		charset: null,

		header: true,

		footer: false
	};

	//
	// Excel (xlsx) export
	//
	DataTable.ext.buttons.excelHtml5 = {
		className: 'buttons-excel buttons-html5',

		available: function () {
			return window.FileReader !== undefined && _jsZip() !== undefined && !_isDuffSafari() && _serialiser;
		},

		text: function (dt) {
			return dt.i18n('buttons.excel', 'Excel');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			var that = this;
			var rowPos = 0;
			var dataStartRow, dataEndRow;
			var getXml = function (type) {
				var str = excelStrings[type];

				//str = str.replace( /xmlns:/g, 'xmlns_' ).replace( /mc:/g, 'mc_' );

				return $.parseXML(str);
			};
			var rels = getXml('xl/worksheets/sheet1.xml');
			var relsGet = rels.getElementsByTagName("sheetData")[0];

			var xlsx = {
				_rels: {
					".rels": getXml('_rels/.rels')
				},
				xl: {
					_rels: {
						"workbook.xml.rels": getXml('xl/_rels/workbook.xml.rels')
					},
					"workbook.xml": getXml('xl/workbook.xml'),
					"styles.xml": getXml('xl/styles.xml'),
					"worksheets": {
						"sheet1.xml": rels
					}

				},
				"[Content_Types].xml": getXml('[Content_Types].xml')
			};

			var data = dt.buttons.exportData(config.exportOptions);
			var currentRow, rowNode;
			var addRow = function (row) {
				currentRow = rowPos + 1;
				rowNode = _createNode(rels, "row", {
					attr: {
						r: currentRow
					}
				});

				for (var i = 0, ien = row.length; i < ien; i++) {
					// Concat both the Cell Columns as a letter and the Row of the cell.
					var cellId = createCellPos(i) + '' + currentRow;
					var cell = null;

					// For null, undefined of blank cell, continue so it doesn't create the _createNode
					if (row[i] === null || row[i] === undefined || row[i] === '') {
						if (config.createEmptyCells === true) {
							row[i] = '';
						} else {
							continue;
						}
					}

					var originalContent = row[i];
					row[i] = $.trim(row[i]);

					// Special number formatting options
					for (var j = 0, jen = _excelSpecials.length; j < jen; j++) {
						var special = _excelSpecials[j];

						// TODO Need to provide the ability for the specials to say
						// if they are returning a string, since at the moment it is
						// assumed to be a number
						if (row[i].match && !row[i].match(/^0\d+/) && row[i].match(special.match)) {
							var val = row[i].replace(/[^\d\.\-]/g, '');

							if (special.fmt) {
								val = special.fmt(val);
							}

							cell = _createNode(rels, 'c', {
								attr: {
									r: cellId,
									s: special.style
								},
								children: [
									_createNode(rels, 'v', {
										text: val
									})
								]
							});

							break;
						}
					}

					if (!cell) {
						if (typeof row[i] === 'number' || (
								row[i].match &&
								row[i].match(/^-?\d+(\.\d+)?$/) &&
								!row[i].match(/^0\d+/))) {
							// Detect numbers - don't match numbers with leading zeros
							// or a negative anywhere but the start
							cell = _createNode(rels, 'c', {
								attr: {
									t: 'n',
									r: cellId
								},
								children: [
									_createNode(rels, 'v', {
										text: row[i]
									})
								]
							});
						} else {
							// String output - replace non standard characters for text output
							var text = !originalContent.replace ?
								originalContent :
								originalContent.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

							cell = _createNode(rels, 'c', {
								attr: {
									t: 'inlineStr',
									r: cellId
								},
								children: {
									row: _createNode(rels, 'is', {
										children: {
											row: _createNode(rels, 't', {
												text: text,
												attr: {
													'xml:space': 'preserve'
												}
											})
										}
									})
								}
							});
						}
					}

					rowNode.appendChild(cell);
				}

				relsGet.appendChild(rowNode);
				rowPos++;
			};

			if (config.customizeData) {
				config.customizeData(data);
			}

			var mergeCells = function (row, colspan) {
				var mergeCells = $('mergeCells', rels);

				mergeCells[0].appendChild(_createNode(rels, 'mergeCell', {
					attr: {
						ref: 'A' + row + ':' + createCellPos(colspan) + row
					}
				}));
				mergeCells.attr('count', parseFloat(mergeCells.attr('count')) + 1);
				$('row:eq(' + (row - 1) + ') c', rels).attr('s', '51'); // centre
			};

			// Title and top messages
			var exportInfo = dt.buttons.exportInfo(config);
			if (exportInfo.title) {
				addRow([exportInfo.title], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}

			if (exportInfo.messageTop) {
				addRow([exportInfo.messageTop], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}


			// Table itself
			if (config.header) {
				addRow(data.header, rowPos);
				$('row:last c', rels).attr('s', '2'); // bold
			}

			dataStartRow = rowPos;

			for (var n = 0, ie = data.body.length; n < ie; n++) {
				addRow(data.body[n], rowPos);
			}

			dataEndRow = rowPos;

			if (config.footer && data.footer) {
				addRow(data.footer, rowPos);
				$('row:last c', rels).attr('s', '2'); // bold
			}

			// Below the table
			if (exportInfo.messageBottom) {
				addRow([exportInfo.messageBottom], rowPos);
				mergeCells(rowPos, data.header.length - 1);
			}

			// Set column widths
			var cols = _createNode(rels, 'cols');
			$('worksheet', rels).prepend(cols);

			for (var i = 0, ien = data.header.length; i < ien; i++) {
				cols.appendChild(_createNode(rels, 'col', {
					attr: {
						min: i + 1,
						max: i + 1,
						width: _excelColWidth(data, i),
						customWidth: 1
					}
				}));
			}

			// Workbook modifications
			var workbook = xlsx.xl['workbook.xml'];

			$('sheets sheet', workbook).attr('name', _sheetname(config));

			// Auto filter for columns
			if (config.autoFilter) {
				$('mergeCells', rels).before(_createNode(rels, 'autoFilter', {
					attr: {
						ref: 'A' + dataStartRow + ':' + createCellPos(data.header.length - 1) + dataEndRow
					}
				}));

				$('definedNames', workbook).append(_createNode(workbook, 'definedName', {
					attr: {
						name: '_xlnm._FilterDatabase',
						localSheetId: '0',
						hidden: 1
					},
					text: _sheetname(config) + '!$A$' + dataStartRow + ':' + createCellPos(data.header.length - 1) + dataEndRow
				}));
			}

			// Let the developer customise the document if they want to
			if (config.customize) {
				config.customize(xlsx, config, dt);
			}

			// Excel doesn't like an empty mergeCells tag
			if ($('mergeCells', rels).children().length === 0) {
				$('mergeCells', rels).remove();
			}

			var jszip = _jsZip();
			var zip = new jszip();
			var zipConfig = {
				type: 'blob',
				mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			};

			_addToZip(zip, xlsx);

			if (zip.generateAsync) {
				// JSZip 3+
				zip
					.generateAsync(zipConfig)
					.then(function (blob) {
						_saveAs(blob, exportInfo.filename);
						that.processing(false);
					});
			} else {
				// JSZip 2.5
				_saveAs(
					zip.generate(zipConfig),
					exportInfo.filename
				);
				this.processing(false);
			}
		},

		filename: '*',

		extension: '.xlsx',

		exportOptions: {},

		header: true,

		footer: false,

		title: '*',

		messageTop: '*',

		messageBottom: '*',

		createEmptyCells: false,

		autoFilter: false,

		sheetName: ''
	};

	//
	// PDF export - using pdfMake - http://pdfmake.org
	//
	DataTable.ext.buttons.pdfHtml5 = {
		className: 'buttons-pdf buttons-html5',

		available: function () {
			return window.FileReader !== undefined && _pdfMake();
		},

		text: function (dt) {
			return dt.i18n('buttons.pdf', 'PDF');
		},

		action: function (e, dt, button, config) {
			this.processing(true);

			var that = this;
			var data = dt.buttons.exportData(config.exportOptions);
			var info = dt.buttons.exportInfo(config);
			var rows = [];

			if (config.header) {
				rows.push($.map(data.header, function (d) {
					return {
						text: typeof d === 'string' ? d : d + '',
						style: 'tableHeader'
					};
				}));
			}

			for (var i = 0, ien = data.body.length; i < ien; i++) {
				rows.push($.map(data.body[i], function (d) {
					if (d === null || d === undefined) {
						d = '';
					}
					return {
						text: typeof d === 'string' ? d : d + '',
						style: i % 2 ? 'tableBodyEven' : 'tableBodyOdd'
					};
				}));
			}

			if (config.footer && data.footer) {
				rows.push($.map(data.footer, function (d) {
					return {
						text: typeof d === 'string' ? d : d + '',
						style: 'tableFooter'
					};
				}));
			}

			var doc = {
				pageSize: config.pageSize,
				pageOrientation: config.orientation,
				content: [{
					table: {
						headerRows: 1,
						body: rows
					},
					layout: 'noBorders'
				}],
				styles: {
					tableHeader: {
						bold: true,
						fontSize: 11,
						color: 'white',
						fillColor: '#2d4154',
						alignment: 'center'
					},
					tableBodyEven: {},
					tableBodyOdd: {
						fillColor: '#f3f3f3'
					},
					tableFooter: {
						bold: true,
						fontSize: 11,
						color: 'white',
						fillColor: '#2d4154'
					},
					title: {
						alignment: 'center',
						fontSize: 15
					},
					message: {}
				},
				defaultStyle: {
					fontSize: 10
				}
			};

			if (info.messageTop) {
				doc.content.unshift({
					text: info.messageTop,
					style: 'message',
					margin: [0, 0, 0, 12]
				});
			}

			if (info.messageBottom) {
				doc.content.push({
					text: info.messageBottom,
					style: 'message',
					margin: [0, 0, 0, 12]
				});
			}

			if (info.title) {
				doc.content.unshift({
					text: info.title,
					style: 'title',
					margin: [0, 0, 0, 12]
				});
			}

			if (config.customize) {
				config.customize(doc, config, dt);
			}

			var pdf = _pdfMake().createPdf(doc);

			if (config.download === 'open' && !_isDuffSafari()) {
				pdf.open();
			} else {
				pdf.download(info.filename);
			}

			this.processing(false);
		},

		title: '*',

		filename: '*',

		extension: '.pdf',

		exportOptions: {},

		orientation: 'portrait',

		pageSize: 'A4',

		header: true,

		footer: false,

		messageTop: '*',

		messageBottom: '*',

		customize: null,

		download: 'download'
	};


	return DataTable.Buttons;
}));


/*!
 * Print button for Buttons and DataTables.
 * 2016 SpryMedia Ltd - datatables.net/license
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net', 'datatables.net-buttons'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			if (!$.fn.dataTable.Buttons) {
				require('datatables.net-buttons')(root, $);
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	var _link = document.createElement('a');

	/**
	 * Clone link and style tags, taking into account the need to change the source
	 * path.
	 *
	 * @param  {node}     el Element to convert
	 */
	var _styleToAbs = function (el) {
		var url;
		var clone = $(el).clone()[0];
		var linkHost;

		if (clone.nodeName.toLowerCase() === 'link') {
			clone.href = _relToAbs(clone.href);
		}

		return clone.outerHTML;
	};

	/**
	 * Convert a URL from a relative to an absolute address so it will work
	 * correctly in the popup window which has no base URL.
	 *
	 * @param  {string} href URL
	 */
	var _relToAbs = function (href) {
		// Assign to a link on the original page so the browser will do all the
		// hard work of figuring out where the file actually is
		_link.href = href;
		var linkHost = _link.host;

		// IE doesn't have a trailing slash on the host
		// Chrome has it on the pathname
		if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
			linkHost += '/';
		}

		return _link.protocol + "//" + linkHost + _link.pathname + _link.search;
	};


	DataTable.ext.buttons.print = {
		className: 'buttons-print',

		text: function (dt) {
			return dt.i18n('buttons.print', 'Print');
		},

		action: function (e, dt, button, config) {
			var data = dt.buttons.exportData(
				$.extend({
					decodeEntities: false
				}, config.exportOptions) // XSS protection
			);
			var exportInfo = dt.buttons.exportInfo(config);
			var columnClasses = dt
				.columns(config.exportOptions.columns)
				.flatten()
				.map(function (idx) {
					return dt.settings()[0].aoColumns[dt.column(idx).index()].sClass;
				})
				.toArray();

			var addRow = function (d, tag) {
				var str = '<tr>';

				for (var i = 0, ien = d.length; i < ien; i++) {
					// null and undefined aren't useful in the print output
					var dataOut = d[i] === null || d[i] === undefined ?
						'' :
						d[i];
					var classAttr = columnClasses[i] ?
						'class="' + columnClasses[i] + '"' :
						'';

					str += '<' + tag + ' ' + classAttr + '>' + dataOut + '</' + tag + '>';
				}

				return str + '</tr>';
			};

			// Construct a table for printing
			var html = '<table class="' + dt.table().node().className + '">';

			if (config.header) {
				html += '<thead>' + addRow(data.header, 'th') + '</thead>';
			}

			html += '<tbody>';
			for (var i = 0, ien = data.body.length; i < ien; i++) {
				html += addRow(data.body[i], 'td');
			}
			html += '</tbody>';

			if (config.footer && data.footer) {
				html += '<tfoot>' + addRow(data.footer, 'th') + '</tfoot>';
			}
			html += '</table>';

			// Open a new window for the printable table
			var win = window.open('', '');
			win.document.close();

			// Inject the title and also a copy of the style and link tags from this
			// document so the table can retain its base styling. Note that we have
			// to use string manipulation as IE won't allow elements to be created
			// in the host document and then appended to the new window.
			var head = '<title>' + exportInfo.title + '</title>';
			$('style, link').each(function () {
				head += _styleToAbs(this);
			});

			try {
				win.document.head.innerHTML = head; // Work around for Edge
			} catch (e) {
				$(win.document.head).html(head); // Old IE
			}

			// Inject the table and other surrounding information
			win.document.body.innerHTML =
				'<h1>' + exportInfo.title + '</h1>' +
				'<div>' + (exportInfo.messageTop || '') + '</div>' +
				html +
				'<div>' + (exportInfo.messageBottom || '') + '</div>';

			$(win.document.body).addClass('dt-print-view');

			$('img', win.document.body).each(function (i, img) {
				img.setAttribute('src', _relToAbs(img.getAttribute('src')));
			});

			if (config.customize) {
				config.customize(win, config, dt);
			}

			// Allow stylesheets time to load
			var autoPrint = function () {
				if (config.autoPrint) {
					win.print(); // blocking - so close will not
					win.close(); // execute until this is done
				}
			};

			if (navigator.userAgent.match(/Trident\/\d.\d/)) { // IE needs to call this without a setTimeout
				autoPrint();
			} else {
				win.setTimeout(autoPrint, 1000);
			}
		},

		title: '*',

		messageTop: '*',

		messageBottom: '*',

		exportOptions: {},

		header: true,

		footer: false,

		autoPrint: true,

		customize: null
	};


	return DataTable.Buttons;
}));


/*! Responsive 2.2.5
 * 2014-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     2.2.5
 * @file        dataTables.responsive.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/**
	 * Responsive is a plug-in for the DataTables library that makes use of
	 * DataTables' ability to change the visibility of columns, changing the
	 * visibility of columns so the displayed columns fit into the table container.
	 * The end result is that complex tables will be dynamically adjusted to fit
	 * into the viewport, be it on a desktop, tablet or mobile browser.
	 *
	 * Responsive for DataTables has two modes of operation, which can used
	 * individually or combined:
	 *
	 * * Class name based control - columns assigned class names that match the
	 *   breakpoint logic can be shown / hidden as required for each breakpoint.
	 * * Automatic control - columns are automatically hidden when there is no
	 *   room left to display them. Columns removed from the right.
	 *
	 * In additional to column visibility control, Responsive also has built into
	 * options to use DataTables' child row display to show / hide the information
	 * from the table that has been hidden. There are also two modes of operation
	 * for this child row display:
	 *
	 * * Inline - when the control element that the user can use to show / hide
	 *   child rows is displayed inside the first column of the table.
	 * * Column - where a whole column is dedicated to be the show / hide control.
	 *
	 * Initialisation of Responsive is performed by:
	 *
	 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
	 *   Responsive will automatically be initialised with the default configuration
	 *   options when the DataTable is created.
	 * * Using the `responsive` option in the DataTables configuration options. This
	 *   can also be used to specify the configuration options, or simply set to
	 *   `true` to use the defaults.
	 *
	 *  @class
	 *  @param {object} settings DataTables settings object for the host table
	 *  @param {object} [opts] Configuration options
	 *  @requires jQuery 1.7+
	 *  @requires DataTables 1.10.3+
	 *
	 *  @example
	 *      $('#example').DataTable( {
	 *        responsive: true
	 *      } );
	 *    } );
	 */
	var Responsive = function (settings, opts) {
		// Sanity check that we are using DataTables 1.10 or newer
		if (!DataTable.versionCheck || !DataTable.versionCheck('1.10.10')) {
			throw 'DataTables Responsive requires DataTables 1.10.10 or newer';
		}

		this.s = {
			dt: new DataTable.Api(settings),
			columns: [],
			current: []
		};

		// Check if responsive has already been initialised on this table
		if (this.s.dt.settings()[0].responsive) {
			return;
		}

		// details is an object, but for simplicity the user can give it as a string
		// or a boolean
		if (opts && typeof opts.details === 'string') {
			opts.details = {
				type: opts.details
			};
		} else if (opts && opts.details === false) {
			opts.details = {
				type: false
			};
		} else if (opts && opts.details === true) {
			opts.details = {
				type: 'inline'
			};
		}

		this.c = $.extend(true, {}, Responsive.defaults, DataTable.defaults.responsive, opts);
		settings.responsive = this;
		this._constructor();
	};

	$.extend(Responsive.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Initialise the Responsive instance
		 *
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var dt = this.s.dt;
			var dtPrivateSettings = dt.settings()[0];
			var oldWindowWidth = $(window).innerWidth();

			dt.settings()[0]._responsive = this;

			// Use DataTables' throttle function to avoid processor thrashing on
			// resize
			$(window).on('resize.dtr orientationchange.dtr', DataTable.util.throttle(function () {
				// iOS has a bug whereby resize can fire when only scrolling
				// See: http://stackoverflow.com/questions/8898412
				var width = $(window).innerWidth();

				if (width !== oldWindowWidth) {
					that._resize();
					oldWindowWidth = width;
				}
			}));

			// DataTables doesn't currently trigger an event when a row is added, so
			// we need to hook into its private API to enforce the hidden rows when
			// new data is added
			dtPrivateSettings.oApi._fnCallbackReg(dtPrivateSettings, 'aoRowCreatedCallback', function (tr, data, idx) {
				if ($.inArray(false, that.s.current) !== -1) {
					$('>td, >th', tr).each(function (i) {
						var idx = dt.column.index('toData', i);

						if (that.s.current[idx] === false) {
							$(this).css('display', 'none');
						}
					});
				}
			});

			// Destroy event handler
			dt.on('destroy.dtr', function () {
				dt.off('.dtr');
				$(dt.table().body()).off('.dtr');
				$(window).off('resize.dtr orientationchange.dtr');
				dt.cells('.dtr-control').nodes().to$().removeClass('dtr-control');

				// Restore the columns that we've hidden
				$.each(that.s.current, function (i, val) {
					if (val === false) {
						that._setColumnVis(i, true);
					}
				});
			});

			// Reorder the breakpoints array here in case they have been added out
			// of order
			this.c.breakpoints.sort(function (a, b) {
				return a.width < b.width ? 1 :
					a.width > b.width ? -1 : 0;
			});

			this._classLogic();
			this._resizeAuto();

			// Details handler
			var details = this.c.details;

			if (details.type !== false) {
				that._detailsInit();

				// DataTables will trigger this event on every column it shows and
				// hides individually
				dt.on('column-visibility.dtr', function () {
					// Use a small debounce to allow multiple columns to be set together
					if (that._timer) {
						clearTimeout(that._timer);
					}

					that._timer = setTimeout(function () {
						that._timer = null;

						that._classLogic();
						that._resizeAuto();
						that._resize();

						that._redrawChildren();
					}, 100);
				});

				// Redraw the details box on each draw which will happen if the data
				// has changed. This is used until DataTables implements a native
				// `updated` event for rows
				dt.on('draw.dtr', function () {
					that._redrawChildren();
				});

				$(dt.table().node()).addClass('dtr-' + details.type);
			}

			dt.on('column-reorder.dtr', function (e, settings, details) {
				that._classLogic();
				that._resizeAuto();
				that._resize(true);
			});

			// Change in column sizes means we need to calc
			dt.on('column-sizing.dtr', function () {
				that._resizeAuto();
				that._resize();
			});

			// On Ajax reload we want to reopen any child rows which are displayed
			// by responsive
			dt.on('preXhr.dtr', function () {
				var rowIds = [];
				dt.rows().every(function () {
					if (this.child.isShown()) {
						rowIds.push(this.id(true));
					}
				});

				dt.one('draw.dtr', function () {
					that._resizeAuto();
					that._resize();

					dt.rows(rowIds).every(function () {
						that._detailsDisplay(this, false);
					});
				});
			});

			dt
				.on('draw.dtr', function () {
					that._controlClass();
				})
				.on('init.dtr', function (e, settings, details) {
					if (e.namespace !== 'dt') {
						return;
					}

					that._resizeAuto();
					that._resize();

					// If columns were hidden, then DataTables needs to adjust the
					// column sizing
					if ($.inArray(false, that.s.current)) {
						dt.columns.adjust();
					}
				});

			// First pass - draw the table for the current viewport size
			this._resize();
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Calculate the visibility for the columns in a table for a given
		 * breakpoint. The result is pre-determined based on the class logic if
		 * class names are used to control all columns, but the width of the table
		 * is also used if there are columns which are to be automatically shown
		 * and hidden.
		 *
		 * @param  {string} breakpoint Breakpoint name to use for the calculation
		 * @return {array} Array of boolean values initiating the visibility of each
		 *   column.
		 *  @private
		 */
		_columnsVisiblity: function (breakpoint) {
			var dt = this.s.dt;
			var columns = this.s.columns;
			var i, ien;

			// Create an array that defines the column ordering based first on the
			// column's priority, and secondly the column index. This allows the
			// columns to be removed from the right if the priority matches
			var order = columns
				.map(function (col, idx) {
					return {
						columnIdx: idx,
						priority: col.priority
					};
				})
				.sort(function (a, b) {
					if (a.priority !== b.priority) {
						return a.priority - b.priority;
					}
					return a.columnIdx - b.columnIdx;
				});

			// Class logic - determine which columns are in this breakpoint based
			// on the classes. If no class control (i.e. `auto`) then `-` is used
			// to indicate this to the rest of the function
			var display = $.map(columns, function (col, i) {
				if (dt.column(i).visible() === false) {
					return 'not-visible';
				}
				return col.auto && col.minWidth === null ?
					false :
					col.auto === true ?
					'-' :
					$.inArray(breakpoint, col.includeIn) !== -1;
			});

			// Auto column control - first pass: how much width is taken by the
			// ones that must be included from the non-auto columns
			var requiredWidth = 0;
			for (i = 0, ien = display.length; i < ien; i++) {
				if (display[i] === true) {
					requiredWidth += columns[i].minWidth;
				}
			}

			// Second pass, use up any remaining width for other columns. For
			// scrolling tables we need to subtract the width of the scrollbar. It
			// may not be requires which makes this sub-optimal, but it would
			// require another full redraw to make complete use of those extra few
			// pixels
			var scrolling = dt.settings()[0].oScroll;
			var bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0;
			var widthAvailable = dt.table().container().offsetWidth - bar;
			var usedWidth = widthAvailable - requiredWidth;

			// Control column needs to always be included. This makes it sub-
			// optimal in terms of using the available with, but to stop layout
			// thrashing or overflow. Also we need to account for the control column
			// width first so we know how much width is available for the other
			// columns, since the control column might not be the first one shown
			for (i = 0, ien = display.length; i < ien; i++) {
				if (columns[i].control) {
					usedWidth -= columns[i].minWidth;
				}
			}

			// Allow columns to be shown (counting by priority and then right to
			// left) until we run out of room
			var empty = false;
			for (i = 0, ien = order.length; i < ien; i++) {
				var colIdx = order[i].columnIdx;

				if (display[colIdx] === '-' && !columns[colIdx].control && columns[colIdx].minWidth) {
					// Once we've found a column that won't fit we don't let any
					// others display either, or columns might disappear in the
					// middle of the table
					if (empty || usedWidth - columns[colIdx].minWidth < 0) {
						empty = true;
						display[colIdx] = false;
					} else {
						display[colIdx] = true;
					}

					usedWidth -= columns[colIdx].minWidth;
				}
			}

			// Determine if the 'control' column should be shown (if there is one).
			// This is the case when there is a hidden column (that is not the
			// control column). The two loops look inefficient here, but they are
			// trivial and will fly through. We need to know the outcome from the
			// first , before the action in the second can be taken
			var showControl = false;

			for (i = 0, ien = columns.length; i < ien; i++) {
				if (!columns[i].control && !columns[i].never && display[i] === false) {
					showControl = true;
					break;
				}
			}

			for (i = 0, ien = columns.length; i < ien; i++) {
				if (columns[i].control) {
					display[i] = showControl;
				}

				// Replace not visible string with false from the control column detection above
				if (display[i] === 'not-visible') {
					display[i] = false;
				}
			}

			// Finally we need to make sure that there is at least one column that
			// is visible
			if ($.inArray(true, display) === -1) {
				display[0] = true;
			}

			return display;
		},


		/**
		 * Create the internal `columns` array with information about the columns
		 * for the table. This includes determining which breakpoints the column
		 * will appear in, based upon class names in the column, which makes up the
		 * vast majority of this method.
		 *
		 * @private
		 */
		_classLogic: function () {
			var that = this;
			var calc = {};
			var breakpoints = this.c.breakpoints;
			var dt = this.s.dt;
			var columns = dt.columns().eq(0).map(function (i) {
				var column = this.column(i);
				var className = column.header().className;
				var priority = dt.settings()[0].aoColumns[i].responsivePriority;
				var dataPriority = column.header().getAttribute('data-priority');

				if (priority === undefined) {
					priority = dataPriority === undefined || dataPriority === null ?
						10000 :
						dataPriority * 1;
				}

				return {
					className: className,
					includeIn: [],
					auto: false,
					control: false,
					never: className.match(/\bnever\b/) ? true : false,
					priority: priority
				};
			});

			// Simply add a breakpoint to `includeIn` array, ensuring that there are
			// no duplicates
			var add = function (colIdx, name) {
				var includeIn = columns[colIdx].includeIn;

				if ($.inArray(name, includeIn) === -1) {
					includeIn.push(name);
				}
			};

			var column = function (colIdx, name, operator, matched) {
				var size, i, ien;

				if (!operator) {
					columns[colIdx].includeIn.push(name);
				} else if (operator === 'max-') {
					// Add this breakpoint and all smaller
					size = that._find(name).width;

					for (i = 0, ien = breakpoints.length; i < ien; i++) {
						if (breakpoints[i].width <= size) {
							add(colIdx, breakpoints[i].name);
						}
					}
				} else if (operator === 'min-') {
					// Add this breakpoint and all larger
					size = that._find(name).width;

					for (i = 0, ien = breakpoints.length; i < ien; i++) {
						if (breakpoints[i].width >= size) {
							add(colIdx, breakpoints[i].name);
						}
					}
				} else if (operator === 'not-') {
					// Add all but this breakpoint
					for (i = 0, ien = breakpoints.length; i < ien; i++) {
						if (breakpoints[i].name.indexOf(matched) === -1) {
							add(colIdx, breakpoints[i].name);
						}
					}
				}
			};

			// Loop over each column and determine if it has a responsive control
			// class
			columns.each(function (col, i) {
				var classNames = col.className.split(' ');
				var hasClass = false;

				// Split the class name up so multiple rules can be applied if needed
				for (var k = 0, ken = classNames.length; k < ken; k++) {
					var className = $.trim(classNames[k]);

					if (className === 'all') {
						// Include in all
						hasClass = true;
						col.includeIn = $.map(breakpoints, function (a) {
							return a.name;
						});
						return;
					} else if (className === 'none' || col.never) {
						// Include in none (default) and no auto
						hasClass = true;
						return;
					} else if (className === 'control') {
						// Special column that is only visible, when one of the other
						// columns is hidden. This is used for the details control
						hasClass = true;
						col.control = true;
						return;
					}

					$.each(breakpoints, function (j, breakpoint) {
						// Does this column have a class that matches this breakpoint?
						var brokenPoint = breakpoint.name.split('-');
						var re = new RegExp('(min\\-|max\\-|not\\-)?(' + brokenPoint[0] + ')(\\-[_a-zA-Z0-9])?');
						var match = className.match(re);

						if (match) {
							hasClass = true;

							if (match[2] === brokenPoint[0] && match[3] === '-' + brokenPoint[1]) {
								// Class name matches breakpoint name fully
								column(i, breakpoint.name, match[1], match[2] + match[3]);
							} else if (match[2] === brokenPoint[0] && !match[3]) {
								// Class name matched primary breakpoint name with no qualifier
								column(i, breakpoint.name, match[1], match[2]);
							}
						}
					});
				}

				// If there was no control class, then automatic sizing is used
				if (!hasClass) {
					col.auto = true;
				}
			});

			this.s.columns = columns;
		},

		/**
		 * Update the cells to show the correct control class / button
		 * @private
		 */
		_controlClass: function () {
			if (this.c.details.type === 'inline') {
				var dt = this.s.dt;
				var columnsVis = this.s.current;
				var firstVisible = $.inArray(true, columnsVis);

				// Remove from any cells which shouldn't have it
				dt.cells(
						null,
						function (idx) {
							return idx !== firstVisible;
						}, {
							page: 'current'
						}
					)
					.nodes()
					.to$()
					.filter('.dtr-control')
					.removeClass('dtr-control');

				dt.cells(null, firstVisible, {
						page: 'current'
					})
					.nodes()
					.to$()
					.addClass('dtr-control');
			}
		},

		/**
		 * Show the details for the child row
		 *
		 * @param  {DataTables.Api} row    API instance for the row
		 * @param  {boolean}        update Update flag
		 * @private
		 */
		_detailsDisplay: function (row, update) {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			if (details && details.type !== false) {
				var res = details.display(row, update, function () {
					return details.renderer(
						dt, row[0], that._detailsObj(row[0])
					);
				});

				if (res === true || res === false) {
					$(dt.table().node()).triggerHandler('responsive-display.dt', [dt, row, res, update]);
				}
			}
		},


		/**
		 * Initialisation for the details handler
		 *
		 * @private
		 */
		_detailsInit: function () {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			// The inline type always uses the first child as the target
			if (details.type === 'inline') {
				details.target = 'td.dtr-control, th.dtr-control';
			}

			// Keyboard accessibility
			dt.on('draw.dtr', function () {
				that._tabIndexes();
			});
			that._tabIndexes(); // Initial draw has already happened

			$(dt.table().body()).on('keyup.dtr', 'td, th', function (e) {
				if (e.keyCode === 13 && $(this).data('dtr-keyboard')) {
					$(this).click();
				}
			});

			// type.target can be a string jQuery selector or a column index
			var target = details.target;
			var selector = typeof target === 'string' ? target : 'td, th';

			if (target !== undefined || target !== null) {
				// Click handler to show / hide the details rows when they are available
				$(dt.table().body())
					.on('click.dtr mousedown.dtr mouseup.dtr', selector, function (e) {
						// If the table is not collapsed (i.e. there is no hidden columns)
						// then take no action
						if (!$(dt.table().node()).hasClass('collapsed')) {
							return;
						}

						// Check that the row is actually a DataTable's controlled node
						if ($.inArray($(this).closest('tr').get(0), dt.rows().nodes().toArray()) === -1) {
							return;
						}

						// For column index, we determine if we should act or not in the
						// handler - otherwise it is already okay
						if (typeof target === 'number') {
							var targetIdx = target < 0 ?
								dt.columns().eq(0).length + target :
								target;

							if (dt.cell(this).index().column !== targetIdx) {
								return;
							}
						}

						// $().closest() includes itself in its check
						var row = dt.row($(this).closest('tr'));

						// Check event type to do an action
						if (e.type === 'click') {
							// The renderer is given as a function so the caller can execute it
							// only when they need (i.e. if hiding there is no point is running
							// the renderer)
							that._detailsDisplay(row, false);
						} else if (e.type === 'mousedown') {
							// For mouse users, prevent the focus ring from showing
							$(this).css('outline', 'none');
						} else if (e.type === 'mouseup') {
							// And then re-allow at the end of the click
							$(this).trigger('blur').css('outline', '');
						}
					});
			}
		},


		/**
		 * Get the details to pass to a renderer for a row
		 * @param  {int} rowIdx Row index
		 * @private
		 */
		_detailsObj: function (rowIdx) {
			var that = this;
			var dt = this.s.dt;

			return $.map(this.s.columns, function (col, i) {
				// Never and control columns should not be passed to the renderer
				if (col.never || col.control) {
					return;
				}

				var dtCol = dt.settings()[0].aoColumns[i];

				return {
					className: dtCol.sClass,
					columnIndex: i,
					data: dt.cell(rowIdx, i).render(that.c.orthogonal),
					hidden: dt.column(i).visible() && !that.s.current[i],
					rowIndex: rowIdx,
					title: dtCol.sTitle !== null ?
						dtCol.sTitle : $(dt.column(i).header()).text()
				};
			});
		},


		/**
		 * Find a breakpoint object from a name
		 *
		 * @param  {string} name Breakpoint name to find
		 * @return {object}      Breakpoint description object
		 * @private
		 */
		_find: function (name) {
			var breakpoints = this.c.breakpoints;

			for (var i = 0, ien = breakpoints.length; i < ien; i++) {
				if (breakpoints[i].name === name) {
					return breakpoints[i];
				}
			}
		},


		/**
		 * Re-create the contents of the child rows as the display has changed in
		 * some way.
		 *
		 * @private
		 */
		_redrawChildren: function () {
			var that = this;
			var dt = this.s.dt;

			dt.rows({
				page: 'current'
			}).iterator('row', function (settings, idx) {
				var row = dt.row(idx);

				that._detailsDisplay(dt.row(idx), true);
			});
		},


		/**
		 * Alter the table display for a resized viewport. This involves first
		 * determining what breakpoint the window currently is in, getting the
		 * column visibilities to apply and then setting them.
		 *
		 * @param  {boolean} forceRedraw Force a redraw
		 * @private
		 */
		_resize: function (forceRedraw) {
			var that = this;
			var dt = this.s.dt;
			var width = $(window).innerWidth();
			var breakpoints = this.c.breakpoints;
			var breakpoint = breakpoints[0].name;
			var columns = this.s.columns;
			var i, ien;
			var oldVis = this.s.current.slice();

			// Determine what breakpoint we are currently at
			for (i = breakpoints.length - 1; i >= 0; i--) {
				if (width <= breakpoints[i].width) {
					breakpoint = breakpoints[i].name;
					break;
				}
			}

			// Show the columns for that break point
			var columnsVis = this._columnsVisiblity(breakpoint);
			this.s.current = columnsVis;

			// Set the class before the column visibility is changed so event
			// listeners know what the state is. Need to determine if there are
			// any columns that are not visible but can be shown
			var collapsedClass = false;

			for (i = 0, ien = columns.length; i < ien; i++) {
				if (columnsVis[i] === false && !columns[i].never && !columns[i].control && !dt.column(i).visible() === false) {
					collapsedClass = true;
					break;
				}
			}

			$(dt.table().node()).toggleClass('collapsed', collapsedClass);

			var changed = false;
			var visible = 0;

			dt.columns().eq(0).each(function (colIdx, i) {
				if (columnsVis[i] === true) {
					visible++;
				}

				if (forceRedraw || columnsVis[i] !== oldVis[i]) {
					changed = true;
					that._setColumnVis(colIdx, columnsVis[i]);
				}
			});

			if (changed) {
				this._redrawChildren();

				// Inform listeners of the change
				$(dt.table().node()).trigger('responsive-resize.dt', [dt, this.s.current]);

				// If no records, update the "No records" display element
				if (dt.page.info().recordsDisplay === 0) {
					$('td', dt.table().body()).eq(0).attr('colspan', visible);
				}
			}
		},


		/**
		 * Determine the width of each column in the table so the auto column hiding
		 * has that information to work with. This method is never going to be 100%
		 * perfect since column widths can change slightly per page, but without
		 * seriously compromising performance this is quite effective.
		 *
		 * @private
		 */
		_resizeAuto: function () {
			var dt = this.s.dt;
			var columns = this.s.columns;

			// Are we allowed to do auto sizing?
			if (!this.c.auto) {
				return;
			}

			// Are there any columns that actually need auto-sizing, or do they all
			// have classes defined
			if ($.inArray(true, $.map(columns, function (c) {
					return c.auto;
				})) === -1) {
				return;
			}

			// Need to restore all children. They will be reinstated by a re-render
			if (!$.isEmptyObject(_childNodeStore)) {
				$.each(_childNodeStore, function (key) {
					var idx = key.split('-');

					_childNodesRestore(dt, idx[0] * 1, idx[1] * 1);
				});
			}

			// Clone the table with the current data in it
			var tableWidth = dt.table().node().offsetWidth;
			var columnWidths = dt.columns;
			var clonedTable = dt.table().node().cloneNode(false);
			var clonedHeader = $(dt.table().header().cloneNode(false)).appendTo(clonedTable);
			var clonedBody = $(dt.table().body()).clone(false, false).empty().appendTo(clonedTable); // use jQuery because of IE8

			clonedTable.style.width = 'auto';

			// Header
			var headerCells = dt.columns()
				.header()
				.filter(function (idx) {
					return dt.column(idx).visible();
				})
				.to$()
				.clone(false)
				.css('display', 'table-cell')
				.css('width', 'auto')
				.css('min-width', 0);

			// Body rows - we don't need to take account of DataTables' column
			// visibility since we implement our own here (hence the `display` set)
			$(clonedBody)
				.append($(dt.rows({
					page: 'current'
				}).nodes()).clone(false))
				.find('th, td').css('display', '');

			// Footer
			var footer = dt.table().footer();
			if (footer) {
				var clonedFooter = $(footer.cloneNode(false)).appendTo(clonedTable);
				var footerCells = dt.columns()
					.footer()
					.filter(function (idx) {
						return dt.column(idx).visible();
					})
					.to$()
					.clone(false)
					.css('display', 'table-cell');

				$('<tr/>')
					.append(footerCells)
					.appendTo(clonedFooter);
			}

			$('<tr/>')
				.append(headerCells)
				.appendTo(clonedHeader);

			// In the inline case extra padding is applied to the first column to
			// give space for the show / hide icon. We need to use this in the
			// calculation
			if (this.c.details.type === 'inline') {
				$(clonedTable).addClass('dtr-inline collapsed');
			}

			// It is unsafe to insert elements with the same name into the DOM
			// multiple times. For example, cloning and inserting a checked radio
			// clears the chcecked state of the original radio.
			$(clonedTable).find('[name]').removeAttr('name');

			// A position absolute table would take the table out of the flow of
			// our container element, bypassing the height and width (Scroller)
			$(clonedTable).css('position', 'relative')

			var inserted = $('<div/>')
				.css({
					width: 1,
					height: 1,
					overflow: 'hidden',
					clear: 'both'
				})
				.append(clonedTable);

			inserted.insertBefore(dt.table().node());

			// The cloned header now contains the smallest that each column can be
			headerCells.each(function (i) {
				var idx = dt.column.index('fromVisible', i);
				columns[idx].minWidth = this.offsetWidth || 0;
			});

			inserted.remove();
		},

		/**
		 * Get the state of the current hidden columns - controlled by Responsive only
		 */
		_responsiveOnlyHidden: function () {
			var dt = this.s.dt;

			return $.map(this.s.current, function (v, i) {
				// If the column is hidden by DataTables then it can't be hidden by
				// Responsive!
				if (dt.column(i).visible() === false) {
					return true;
				}
				return v;
			});
		},

		/**
		 * Set a column's visibility.
		 *
		 * We don't use DataTables' column visibility controls in order to ensure
		 * that column visibility can Responsive can no-exist. Since only IE8+ is
		 * supported (and all evergreen browsers of course) the control of the
		 * display attribute works well.
		 *
		 * @param {integer} col      Column index
		 * @param {boolean} showHide Show or hide (true or false)
		 * @private
		 */
		_setColumnVis: function (col, showHide) {
			var dt = this.s.dt;
			var display = showHide ? '' : 'none'; // empty string will remove the attr

			$(dt.column(col).header()).css('display', display);
			$(dt.column(col).footer()).css('display', display);
			dt.column(col).nodes().to$().css('display', display);

			// If the are child nodes stored, we might need to reinsert them
			if (!$.isEmptyObject(_childNodeStore)) {
				dt.cells(null, col).indexes().each(function (idx) {
					_childNodesRestore(dt, idx.row, idx.column);
				});
			}
		},


		/**
		 * Update the cell tab indexes for keyboard accessibility. This is called on
		 * every table draw - that is potentially inefficient, but also the least
		 * complex option given that column visibility can change on the fly. Its a
		 * shame user-focus was removed from CSS 3 UI, as it would have solved this
		 * issue with a single CSS statement.
		 *
		 * @private
		 */
		_tabIndexes: function () {
			var dt = this.s.dt;
			var cells = dt.cells({
				page: 'current'
			}).nodes().to$();
			var ctx = dt.settings()[0];
			var target = this.c.details.target;

			cells.filter('[data-dtr-keyboard]').removeData('[data-dtr-keyboard]');

			if (typeof target === 'number') {
				dt.cells(null, target, {
						page: 'current'
					}).nodes().to$()
					.attr('tabIndex', ctx.iTabIndex)
					.data('dtr-keyboard', 1);
			} else {
				// This is a bit of a hack - we need to limit the selected nodes to just
				// those of this table
				if (target === 'td:first-child, th:first-child') {
					target = '>td:first-child, >th:first-child';
				}

				$(target, dt.rows({
						page: 'current'
					}).nodes())
					.attr('tabIndex', ctx.iTabIndex)
					.data('dtr-keyboard', 1);
			}
		}
	});


	/**
	 * List of default breakpoints. Each item in the array is an object with two
	 * properties:
	 *
	 * * `name` - the breakpoint name.
	 * * `width` - the breakpoint width
	 *
	 * @name Responsive.breakpoints
	 * @static
	 */
	Responsive.breakpoints = [{
			name: 'desktop',
			width: Infinity
		},
		{
			name: 'tablet-l',
			width: 1024
		},
		{
			name: 'tablet-p',
			width: 768
		},
		{
			name: 'mobile-l',
			width: 480
		},
		{
			name: 'mobile-p',
			width: 320
		}
	];


	/**
	 * Display methods - functions which define how the hidden data should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Responsive.defaults
	 * @static
	 */
	Responsive.display = {
		childRow: function (row, update, render) {
			if (update) {
				if ($(row.node()).hasClass('parent')) {
					row.child(render(), 'child').show();

					return true;
				}
			} else {
				if (!row.child.isShown()) {
					row.child(render(), 'child').show();
					$(row.node()).addClass('parent');

					return true;
				} else {
					row.child(false);
					$(row.node()).removeClass('parent');

					return false;
				}
			}
		},

		childRowImmediate: function (row, update, render) {
			if ((!update && row.child.isShown()) || !row.responsive.hasHidden()) {
				// User interaction and the row is show, or nothing to show
				row.child(false);
				$(row.node()).removeClass('parent');

				return false;
			} else {
				// Display
				row.child(render(), 'child').show();
				$(row.node()).addClass('parent');

				return true;
			}
		},

		// This is a wrapper so the modal options for Bootstrap and jQuery UI can
		// have options passed into them. This specific one doesn't need to be a
		// function but it is for consistency in the `modal` name
		modal: function (options) {
			return function (row, update, render) {
				if (!update) {
					// Show a modal
					var close = function () {
						modal.remove(); // will tidy events for us
						$(document).off('keypress.dtr');
					};

					var modal = $('<div class="dtr-modal"/>')
						.append($('<div class="dtr-modal-display"/>')
							.append($('<div class="dtr-modal-content"/>')
								.append(render())
							)
							.append($('<div class="dtr-modal-close">&times;</div>')
								.click(function () {
									close();
								})
							)
						)
						.append($('<div class="dtr-modal-background"/>')
							.click(function () {
								close();
							})
						)
						.appendTo('body');

					$(document).on('keyup.dtr', function (e) {
						if (e.keyCode === 27) {
							e.stopPropagation();

							close();
						}
					});
				} else {
					$('div.dtr-modal-content')
						.empty()
						.append(render());
				}

				if (options && options.header) {
					$('div.dtr-modal-content').prepend(
						'<h2>' + options.header(row) + '</h2>'
					);
				}
			};
		}
	};


	var _childNodeStore = {};

	function _childNodes(dt, row, col) {
		var name = row + '-' + col;

		if (_childNodeStore[name]) {
			return _childNodeStore[name];
		}

		// https://jsperf.com/childnodes-array-slice-vs-loop
		var nodes = [];
		var children = dt.cell(row, col).node().childNodes;
		for (var i = 0, ien = children.length; i < ien; i++) {
			nodes.push(children[i]);
		}

		_childNodeStore[name] = nodes;

		return nodes;
	}

	function _childNodesRestore(dt, row, col) {
		var name = row + '-' + col;

		if (!_childNodeStore[name]) {
			return;
		}

		var node = dt.cell(row, col).node();
		var store = _childNodeStore[name];
		var parent = store[0].parentNode;
		var parentChildren = parent.childNodes;
		var a = [];

		for (var i = 0, ien = parentChildren.length; i < ien; i++) {
			a.push(parentChildren[i]);
		}

		for (var j = 0, jen = a.length; j < jen; j++) {
			node.appendChild(a[j]);
		}

		_childNodeStore[name] = undefined;
	}


	/**
	 * Display methods - functions which define how the hidden data should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Responsive.defaults
	 * @static
	 */
	Responsive.renderer = {
		listHiddenNodes: function () {
			return function (api, rowIdx, columns) {
				var ul = $('<ul data-dtr-index="' + rowIdx + '" class="dtr-details"/>');
				var found = false;

				var data = $.each(columns, function (i, col) {
					if (col.hidden) {
						var klass = col.className ?
							'class="' + col.className + '"' :
							'';

						$(
								'<li ' + klass + ' data-dtr-index="' + col.columnIndex + '" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
								'<span class="dtr-title">' +
								col.title +
								'</span> ' +
								'</li>'
							)
							.append($('<span class="dtr-data"/>').append(_childNodes(api, col.rowIndex, col.columnIndex))) // api.cell( col.rowIndex, col.columnIndex ).node().childNodes ) )
							.appendTo(ul);

						found = true;
					}
				});

				return found ?
					ul :
					false;
			};
		},

		listHidden: function () {
			return function (api, rowIdx, columns) {
				var data = $.map(columns, function (col) {
					var klass = col.className ?
						'class="' + col.className + '"' :
						'';

					return col.hidden ?
						'<li ' + klass + ' data-dtr-index="' + col.columnIndex + '" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
						'<span class="dtr-title">' +
						col.title +
						'</span> ' +
						'<span class="dtr-data">' +
						col.data +
						'</span>' +
						'</li>' :
						'';
				}).join('');

				return data ?
					$('<ul data-dtr-index="' + rowIdx + '" class="dtr-details"/>').append(data) :
					false;
			}
		},

		tableAll: function (options) {
			options = $.extend({
				tableClass: ''
			}, options);

			return function (api, rowIdx, columns) {
				var data = $.map(columns, function (col) {
					var klass = col.className ?
						'class="' + col.className + '"' :
						'';

					return '<tr ' + klass + ' data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
						'<td>' + col.title + ':' + '</td> ' +
						'<td>' + col.data + '</td>' +
						'</tr>';
				}).join('');

				return $('<table class="' + options.tableClass + ' dtr-details" width="100%"/>').append(data);
			}
		}
	};

	/**
	 * Responsive default settings for initialisation
	 *
	 * @namespace
	 * @name Responsive.defaults
	 * @static
	 */
	Responsive.defaults = {
		/**
		 * List of breakpoints for the instance. Note that this means that each
		 * instance can have its own breakpoints. Additionally, the breakpoints
		 * cannot be changed once an instance has been creased.
		 *
		 * @type {Array}
		 * @default Takes the value of `Responsive.breakpoints`
		 */
		breakpoints: Responsive.breakpoints,

		/**
		 * Enable / disable auto hiding calculations. It can help to increase
		 * performance slightly if you disable this option, but all columns would
		 * need to have breakpoint classes assigned to them
		 *
		 * @type {Boolean}
		 * @default  `true`
		 */
		auto: true,

		/**
		 * Details control. If given as a string value, the `type` property of the
		 * default object is set to that value, and the defaults used for the rest
		 * of the object - this is for ease of implementation.
		 *
		 * The object consists of the following properties:
		 *
		 * * `display` - A function that is used to show and hide the hidden details
		 * * `renderer` - function that is called for display of the child row data.
		 *   The default function will show the data from the hidden columns
		 * * `target` - Used as the selector for what objects to attach the child
		 *   open / close to
		 * * `type` - `false` to disable the details display, `inline` or `column`
		 *   for the two control types
		 *
		 * @type {Object|string}
		 */
		details: {
			display: Responsive.display.childRow,

			renderer: Responsive.renderer.listHidden(),

			target: 0,

			type: 'inline'
		},

		/**
		 * Orthogonal data request option. This is used to define the data type
		 * requested when Responsive gets the data to show in the child row.
		 *
		 * @type {String}
		 */
		orthogonal: 'display'
	};


	/*
	 * API
	 */
	var Api = $.fn.dataTable.Api;

	// Doesn't do anything - work around for a bug in DT... Not documented
	Api.register('responsive()', function () {
		return this;
	});

	Api.register('responsive.index()', function (li) {
		li = $(li);

		return {
			column: li.data('dtr-index'),
			row: li.parent().data('dtr-index')
		};
	});

	Api.register('responsive.rebuild()', function () {
		return this.iterator('table', function (ctx) {
			if (ctx._responsive) {
				ctx._responsive._classLogic();
			}
		});
	});

	Api.register('responsive.recalc()', function () {
		return this.iterator('table', function (ctx) {
			if (ctx._responsive) {
				ctx._responsive._resizeAuto();
				ctx._responsive._resize();
			}
		});
	});

	Api.register('responsive.hasHidden()', function () {
		var ctx = this.context[0];

		return ctx._responsive ?
			$.inArray(false, ctx._responsive._responsiveOnlyHidden()) !== -1 :
			false;
	});

	Api.registerPlural('columns().responsiveHidden()', 'column().responsiveHidden()', function () {
		return this.iterator('column', function (settings, column) {
			return settings._responsive ?
				settings._responsive._responsiveOnlyHidden()[column] :
				false;
		}, 1);
	});


	/**
	 * Version information
	 *
	 * @name Responsive.version
	 * @static
	 */
	Responsive.version = '2.2.5';


	$.fn.dataTable.Responsive = Responsive;
	$.fn.DataTable.Responsive = Responsive;

	// Attach a listener to the document which listens for DataTables initialisation
	// events so we can automatically initialise
	$(document).on('preInit.dt.dtr', function (e, settings, json) {
		if (e.namespace !== 'dt') {
			return;
		}

		if ($(settings.nTable).hasClass('responsive') ||
			$(settings.nTable).hasClass('dt-responsive') ||
			settings.oInit.responsive ||
			DataTable.defaults.responsive
		) {
			var init = settings.oInit.responsive;

			if (init !== false) {
				new Responsive(settings, $.isPlainObject(init) ? init : {});
			}
		}
	});


	return Responsive;
}));


/*! RowReorder 1.2.7
 * 2015-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     RowReorder
 * @description Row reordering extension for DataTables
 * @version     1.2.7
 * @file        dataTables.rowReorder.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2015-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/**
	 * RowReorder provides the ability in DataTables to click and drag rows to
	 * reorder them. When a row is dropped the data for the rows effected will be
	 * updated to reflect the change. Normally this data point should also be the
	 * column being sorted upon in the DataTable but this does not need to be the
	 * case. RowReorder implements a "data swap" method - so the rows being
	 * reordered take the value of the data point from the row that used to occupy
	 * the row's new position.
	 *
	 * Initialisation is done by either:
	 *
	 * * `rowReorder` parameter in the DataTable initialisation object
	 * * `new $.fn.dataTable.RowReorder( table, opts )` after DataTables
	 *   initialisation.
	 * 
	 *  @class
	 *  @param {object} settings DataTables settings object for the host table
	 *  @param {object} [opts] Configuration options
	 *  @requires jQuery 1.7+
	 *  @requires DataTables 1.10.7+
	 */
	var RowReorder = function (dt, opts) {
		// Sanity check that we are using DataTables 1.10 or newer
		if (!DataTable.versionCheck || !DataTable.versionCheck('1.10.8')) {
			throw 'DataTables RowReorder requires DataTables 1.10.8 or newer';
		}

		// User and defaults configuration object
		this.c = $.extend(true, {},
			DataTable.defaults.rowReorder,
			RowReorder.defaults,
			opts
		);

		// Internal settings
		this.s = {
			/** @type {integer} Scroll body top cache */
			bodyTop: null,

			/** @type {DataTable.Api} DataTables' API instance */
			dt: new DataTable.Api(dt),

			/** @type {function} Data fetch function */
			getDataFn: DataTable.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),

			/** @type {array} Pixel positions for row insertion calculation */
			middles: null,

			/** @type {Object} Cached dimension information for use in the mouse move event handler */
			scroll: {},

			/** @type {integer} Interval object used for smooth scrolling */
			scrollInterval: null,

			/** @type {function} Data set function */
			setDataFn: DataTable.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),

			/** @type {Object} Mouse down information */
			start: {
				top: 0,
				left: 0,
				offsetTop: 0,
				offsetLeft: 0,
				nodes: []
			},

			/** @type {integer} Window height cached value */
			windowHeight: 0,

			/** @type {integer} Document outer height cached value */
			documentOuterHeight: 0,

			/** @type {integer} DOM clone outer height cached value */
			domCloneOuterHeight: 0
		};

		// DOM items
		this.dom = {
			/** @type {jQuery} Cloned row being moved around */
			clone: null,

			/** @type {jQuery} DataTables scrolling container */
			dtScroll: $('div.dataTables_scrollBody', this.s.dt.table().container())
		};

		// Check if row reorder has already been initialised on this table
		var settings = this.s.dt.settings()[0];
		var exisiting = settings.rowreorder;

		if (exisiting) {
			return exisiting;
		}

		if (!this.dom.dtScroll.length) {
			this.dom.dtScroll = $(this.s.dt.table().container(), 'tbody')
		}

		settings.rowreorder = this;
		this._constructor();
	};


	$.extend(RowReorder.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Initialise the RowReorder instance
		 *
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var dt = this.s.dt;
			var table = $(dt.table().node());

			// Need to be able to calculate the row positions relative to the table
			if (table.css('position') === 'static') {
				table.css('position', 'relative');
			}

			// listen for mouse down on the target column - we have to implement
			// this rather than using HTML5 drag and drop as drag and drop doesn't
			// appear to work on table rows at this time. Also mobile browsers are
			// not supported.
			// Use `table().container()` rather than just the table node for IE8 -
			// otherwise it only works once...
			$(dt.table().container()).on('mousedown.rowReorder touchstart.rowReorder', this.c.selector, function (e) {
				if (!that.c.enable) {
					return;
				}

				// Ignore excluded children of the selector
				if ($(e.target).is(that.c.excludedChildren)) {
					return true;
				}

				var tr = $(this).closest('tr');
				var row = dt.row(tr);

				// Double check that it is a DataTable row
				if (row.any()) {
					that._emitEvent('pre-row-reorder', {
						node: row.node(),
						index: row.index()
					});

					that._mouseDown(e, tr);
					return false;
				}
			});

			dt.on('destroy.rowReorder', function () {
				$(dt.table().container()).off('.rowReorder');
				dt.off('.rowReorder');
			});
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Cache the measurements that RowReorder needs in the mouse move handler
		 * to attempt to speed things up, rather than reading from the DOM.
		 *
		 * @private
		 */
		_cachePositions: function () {
			var dt = this.s.dt;

			// Frustratingly, if we add `position:relative` to the tbody, the
			// position is still relatively to the parent. So we need to adjust
			// for that
			var headerHeight = $(dt.table().node()).find('thead').outerHeight();

			// Need to pass the nodes through jQuery to get them in document order,
			// not what DataTables thinks it is, since we have been altering the
			// order
			var nodes = $.unique(dt.rows({
				page: 'current'
			}).nodes().toArray());
			var middles = $.map(nodes, function (node, i) {
				var top = $(node).position().top - headerHeight;

				return (top + top + $(node).outerHeight()) / 2;
			});

			this.s.middles = middles;
			this.s.bodyTop = $(dt.table().body()).offset().top;
			this.s.windowHeight = $(window).height();
			this.s.documentOuterHeight = $(document).outerHeight();
		},


		/**
		 * Clone a row so it can be floated around the screen
		 *
		 * @param  {jQuery} target Node to be cloned
		 * @private
		 */
		_clone: function (target) {
			var dt = this.s.dt;
			var clone = $(dt.table().node().cloneNode(false))
				.addClass('dt-rowReorder-float')
				.append('<tbody/>')
				.append(target.clone(false));

			// Match the table and column widths - read all sizes before setting
			// to reduce reflows
			var tableWidth = target.outerWidth();
			var tableHeight = target.outerHeight();
			var sizes = target.children().map(function () {
				return $(this).width();
			});

			clone
				.width(tableWidth)
				.height(tableHeight)
				.find('tr').children().each(function (i) {
					this.style.width = sizes[i] + 'px';
				});

			// Insert into the document to have it floating around
			clone.appendTo('body');

			this.dom.clone = clone;
			this.s.domCloneOuterHeight = clone.outerHeight();
		},


		/**
		 * Update the cloned item's position in the document
		 *
		 * @param  {object} e Event giving the mouse's position
		 * @private
		 */
		_clonePosition: function (e) {
			var start = this.s.start;
			var topDiff = this._eventToPage(e, 'Y') - start.top;
			var leftDiff = this._eventToPage(e, 'X') - start.left;
			var snap = this.c.snapX;
			var left;
			var top = topDiff + start.offsetTop;

			if (snap === true) {
				left = start.offsetLeft;
			} else if (typeof snap === 'number') {
				left = start.offsetLeft + snap;
			} else {
				left = leftDiff + start.offsetLeft;
			}

			if (top < 0) {
				top = 0
			} else if (top + this.s.domCloneOuterHeight > this.s.documentOuterHeight) {
				top = this.s.documentOuterHeight - this.s.domCloneOuterHeight;
			}

			this.dom.clone.css({
				top: top,
				left: left
			});
		},


		/**
		 * Emit an event on the DataTable for listeners
		 *
		 * @param  {string} name Event name
		 * @param  {array} args Event arguments
		 * @private
		 */
		_emitEvent: function (name, args) {
			this.s.dt.iterator('table', function (ctx, i) {
				$(ctx.nTable).triggerHandler(name + '.dt', args);
			});
		},


		/**
		 * Get pageX/Y position from an event, regardless of if it is a mouse or
		 * touch event.
		 *
		 * @param  {object} e Event
		 * @param  {string} pos X or Y (must be a capital)
		 * @private
		 */
		_eventToPage: function (e, pos) {
			if (e.type.indexOf('touch') !== -1) {
				return e.originalEvent.touches[0]['page' + pos];
			}

			return e['page' + pos];
		},


		/**
		 * Mouse down event handler. Read initial positions and add event handlers
		 * for the move.
		 *
		 * @param  {object} e      Mouse event
		 * @param  {jQuery} target TR element that is to be moved
		 * @private
		 */
		_mouseDown: function (e, target) {
			var that = this;
			var dt = this.s.dt;
			var start = this.s.start;

			var offset = target.offset();
			start.top = this._eventToPage(e, 'Y');
			start.left = this._eventToPage(e, 'X');
			start.offsetTop = offset.top;
			start.offsetLeft = offset.left;
			start.nodes = $.unique(dt.rows({
				page: 'current'
			}).nodes().toArray());

			this._cachePositions();
			this._clone(target);
			this._clonePosition(e);

			this.dom.target = target;
			target.addClass('dt-rowReorder-moving');

			$(document)
				.on('mouseup.rowReorder touchend.rowReorder', function (e) {
					that._mouseUp(e);
				})
				.on('mousemove.rowReorder touchmove.rowReorder', function (e) {
					that._mouseMove(e);
				});

			// Check if window is x-scrolling - if not, disable it for the duration
			// of the drag
			if ($(window).width() === $(document).width()) {
				$(document.body).addClass('dt-rowReorder-noOverflow');
			}

			// Cache scrolling information so mouse move doesn't need to read.
			// This assumes that the window and DT scroller will not change size
			// during an row drag, which I think is a fair assumption
			var scrollWrapper = this.dom.dtScroll;
			this.s.scroll = {
				windowHeight: $(window).height(),
				windowWidth: $(window).width(),
				dtTop: scrollWrapper.length ? scrollWrapper.offset().top : null,
				dtLeft: scrollWrapper.length ? scrollWrapper.offset().left : null,
				dtHeight: scrollWrapper.length ? scrollWrapper.outerHeight() : null,
				dtWidth: scrollWrapper.length ? scrollWrapper.outerWidth() : null
			};
		},


		/**
		 * Mouse move event handler - move the cloned row and shuffle the table's
		 * rows if required.
		 *
		 * @param  {object} e Mouse event
		 * @private
		 */
		_mouseMove: function (e) {
			this._clonePosition(e);

			// Transform the mouse position into a position in the table's body
			var bodyY = this._eventToPage(e, 'Y') - this.s.bodyTop;
			var middles = this.s.middles;
			var insertPoint = null;
			var dt = this.s.dt;

			// Determine where the row should be inserted based on the mouse
			// position
			for (var i = 0, ien = middles.length; i < ien; i++) {
				if (bodyY < middles[i]) {
					insertPoint = i;
					break;
				}
			}

			if (insertPoint === null) {
				insertPoint = middles.length;
			}

			// Perform the DOM shuffle if it has changed from last time
			if (this.s.lastInsert === null || this.s.lastInsert !== insertPoint) {
				var nodes = $.unique(dt.rows({
					page: 'current'
				}).nodes().toArray());

				if (insertPoint > this.s.lastInsert) {
					this.dom.target.insertAfter(nodes[insertPoint - 1]);
				} else {
					this.dom.target.insertBefore(nodes[insertPoint]);
				}

				this._cachePositions();

				this.s.lastInsert = insertPoint;
			}

			this._shiftScroll(e);
		},


		/**
		 * Mouse up event handler - release the event handlers and perform the
		 * table updates
		 *
		 * @param  {object} e Mouse event
		 * @private
		 */
		_mouseUp: function (e) {
			var that = this;
			var dt = this.s.dt;
			var i, ien;
			var dataSrc = this.c.dataSrc;

			this.dom.clone.remove();
			this.dom.clone = null;

			this.dom.target.removeClass('dt-rowReorder-moving');
			//this.dom.target = null;

			$(document).off('.rowReorder');
			$(document.body).removeClass('dt-rowReorder-noOverflow');

			clearInterval(this.s.scrollInterval);
			this.s.scrollInterval = null;

			// Calculate the difference
			var startNodes = this.s.start.nodes;
			var endNodes = $.unique(dt.rows({
				page: 'current'
			}).nodes().toArray());
			var idDiff = {};
			var fullDiff = [];
			var diffNodes = [];
			var getDataFn = this.s.getDataFn;
			var setDataFn = this.s.setDataFn;

			for (i = 0, ien = startNodes.length; i < ien; i++) {
				if (startNodes[i] !== endNodes[i]) {
					var id = dt.row(endNodes[i]).id();
					var endRowData = dt.row(endNodes[i]).data();
					var startRowData = dt.row(startNodes[i]).data();

					if (id) {
						idDiff[id] = getDataFn(startRowData);
					}

					fullDiff.push({
						node: endNodes[i],
						oldData: getDataFn(endRowData),
						newData: getDataFn(startRowData),
						newPosition: i,
						oldPosition: $.inArray(endNodes[i], startNodes)
					});

					diffNodes.push(endNodes[i]);
				}
			}

			// Create event args
			var eventArgs = [fullDiff, {
				dataSrc: dataSrc,
				nodes: diffNodes,
				values: idDiff,
				triggerRow: dt.row(this.dom.target),
				originalEvent: e
			}];

			// Emit event
			this._emitEvent('row-reorder', eventArgs);

			var update = function () {
				if (that.c.update) {
					for (i = 0, ien = fullDiff.length; i < ien; i++) {
						var row = dt.row(fullDiff[i].node);
						var rowData = row.data();

						setDataFn(rowData, fullDiff[i].newData);

						// Invalidate the cell that has the same data source as the dataSrc
						dt.columns().every(function () {
							if (this.dataSrc() === dataSrc) {
								dt.cell(fullDiff[i].node, this.index()).invalidate('data');
							}
						});
					}

					// Trigger row reordered event
					that._emitEvent('row-reordered', eventArgs);

					dt.draw(false);
				}
			};

			// Editor interface
			if (this.c.editor) {
				// Disable user interaction while Editor is submitting
				this.c.enable = false;

				this.c.editor
					.edit(
						diffNodes,
						false,
						$.extend({
							submit: 'changed'
						}, this.c.formOptions)
					)
					.multiSet(dataSrc, idDiff)
					.one('preSubmitCancelled.rowReorder', function () {
						that.c.enable = true;
						that.c.editor.off('.rowReorder');
						dt.draw(false);
					})
					.one('submitUnsuccessful.rowReorder', function () {
						dt.draw(false);
					})
					.one('submitSuccess.rowReorder', function () {
						update();
					})
					.one('submitComplete', function () {
						that.c.enable = true;
						that.c.editor.off('.rowReorder');
					})
					.submit();
			} else {
				update();
			}
		},


		/**
		 * Move the window and DataTables scrolling during a drag to scroll new
		 * content into view.
		 *
		 * This matches the `_shiftScroll` method used in AutoFill, but only
		 * horizontal scrolling is considered here.
		 *
		 * @param  {object} e Mouse move event object
		 * @private
		 */
		_shiftScroll: function (e) {
			var that = this;
			var dt = this.s.dt;
			var scroll = this.s.scroll;
			var runInterval = false;
			var scrollSpeed = 5;
			var buffer = 65;
			var
				windowY = e.pageY - document.body.scrollTop,
				windowVert,
				dtVert;

			// Window calculations - based on the mouse position in the window,
			// regardless of scrolling
			if (windowY < $(window).scrollTop() + buffer) {
				windowVert = scrollSpeed * -1;
			} else if (windowY > scroll.windowHeight + $(window).scrollTop() - buffer) {
				windowVert = scrollSpeed;
			}

			// DataTables scrolling calculations - based on the table's position in
			// the document and the mouse position on the page
			if (scroll.dtTop !== null && e.pageY < scroll.dtTop + buffer) {
				dtVert = scrollSpeed * -1;
			} else if (scroll.dtTop !== null && e.pageY > scroll.dtTop + scroll.dtHeight - buffer) {
				dtVert = scrollSpeed;
			}

			// This is where it gets interesting. We want to continue scrolling
			// without requiring a mouse move, so we need an interval to be
			// triggered. The interval should continue until it is no longer needed,
			// but it must also use the latest scroll commands (for example consider
			// that the mouse might move from scrolling up to scrolling left, all
			// with the same interval running. We use the `scroll` object to "pass"
			// this information to the interval. Can't use local variables as they
			// wouldn't be the ones that are used by an already existing interval!
			if (windowVert || dtVert) {
				scroll.windowVert = windowVert;
				scroll.dtVert = dtVert;
				runInterval = true;
			} else if (this.s.scrollInterval) {
				// Don't need to scroll - remove any existing timer
				clearInterval(this.s.scrollInterval);
				this.s.scrollInterval = null;
			}

			// If we need to run the interval to scroll and there is no existing
			// interval (if there is an existing one, it will continue to run)
			if (!this.s.scrollInterval && runInterval) {
				this.s.scrollInterval = setInterval(function () {
					// Don't need to worry about setting scroll <0 or beyond the
					// scroll bound as the browser will just reject that.
					if (scroll.windowVert) {
						var top = $(document).scrollTop();
						$(document).scrollTop(top + scroll.windowVert);

						if (top !== $(document).scrollTop()) {
							var move = parseFloat(that.dom.clone.css("top"));
							that.dom.clone.css("top", move + scroll.windowVert);
						}
					}

					// DataTables scrolling
					if (scroll.dtVert) {
						var scroller = that.dom.dtScroll[0];

						if (scroll.dtVert) {
							scroller.scrollTop += scroll.dtVert;
						}
					}
				}, 20);
			}
		}
	});



	/**
	 * RowReorder default settings for initialisation
	 *
	 * @namespace
	 * @name RowReorder.defaults
	 * @static
	 */
	RowReorder.defaults = {
		/**
		 * Data point in the host row's data source object for where to get and set
		 * the data to reorder. This will normally also be the sorting column.
		 *
		 * @type {Number}
		 */
		dataSrc: 0,

		/**
		 * Editor instance that will be used to perform the update
		 *
		 * @type {DataTable.Editor}
		 */
		editor: null,

		/**
		 * Enable / disable RowReorder's user interaction
		 * @type {Boolean}
		 */
		enable: true,

		/**
		 * Form options to pass to Editor when submitting a change in the row order.
		 * See the Editor `from-options` object for details of the options
		 * available.
		 * @type {Object}
		 */
		formOptions: {},

		/**
		 * Drag handle selector. This defines the element that when dragged will
		 * reorder a row.
		 *
		 * @type {String}
		 */
		selector: 'td:first-child',

		/**
		 * Optionally lock the dragged row's x-position. This can be `true` to
		 * fix the position match the host table's, `false` to allow free movement
		 * of the row, or a number to define an offset from the host table.
		 *
		 * @type {Boolean|number}
		 */
		snapX: false,

		/**
		 * Update the table's data on drop
		 *
		 * @type {Boolean}
		 */
		update: true,

		/**
		 * Selector for children of the drag handle selector that mouseDown events
		 * will be passed through to and drag will not activate
		 *
		 * @type {String}
		 */
		excludedChildren: 'a'
	};


	/*
	 * API
	 */
	var Api = $.fn.dataTable.Api;

	// Doesn't do anything - work around for a bug in DT... Not documented
	Api.register('rowReorder()', function () {
		return this;
	});

	Api.register('rowReorder.enable()', function (toggle) {
		if (toggle === undefined) {
			toggle = true;
		}

		return this.iterator('table', function (ctx) {
			if (ctx.rowreorder) {
				ctx.rowreorder.c.enable = toggle;
			}
		});
	});

	Api.register('rowReorder.disable()', function () {
		return this.iterator('table', function (ctx) {
			if (ctx.rowreorder) {
				ctx.rowreorder.c.enable = false;
			}
		});
	});


	/**
	 * Version information
	 *
	 * @name RowReorder.version
	 * @static
	 */
	RowReorder.version = '1.2.6';


	$.fn.dataTable.RowReorder = RowReorder;
	$.fn.DataTable.RowReorder = RowReorder;

	// Attach a listener to the document which listens for DataTables initialisation
	// events so we can automatically initialise
	$(document).on('init.dt.dtr', function (e, settings, json) {
		if (e.namespace !== 'dt') {
			return;
		}

		var init = settings.oInit.rowReorder;
		var defaults = DataTable.defaults.rowReorder;

		if (init || defaults) {
			var opts = $.extend({}, init, defaults);

			if (init !== false) {
				new RowReorder(settings, opts);
			}
		}
	});


	return RowReorder;
}));


/*! Scroller 2.0.2
 * ©2011-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Scroller
 * @description Virtual rendering for DataTables
 * @version     2.0.2
 * @file        dataTables.scroller.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2011-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/**
	 * Scroller is a virtual rendering plug-in for DataTables which allows large
	 * datasets to be drawn on screen every quickly. What the virtual rendering means
	 * is that only the visible portion of the table (and a bit to either side to make
	 * the scrolling smooth) is drawn, while the scrolling container gives the
	 * visual impression that the whole table is visible. This is done by making use
	 * of the pagination abilities of DataTables and moving the table around in the
	 * scrolling container DataTables adds to the page. The scrolling container is
	 * forced to the height it would be for the full table display using an extra
	 * element.
	 *
	 * Note that rows in the table MUST all be the same height. Information in a cell
	 * which expands on to multiple lines will cause some odd behaviour in the scrolling.
	 *
	 * Scroller is initialised by simply including the letter 'S' in the sDom for the
	 * table you want to have this feature enabled on. Note that the 'S' must come
	 * AFTER the 't' parameter in `dom`.
	 *
	 * Key features include:
	 *   <ul class="limit_length">
	 *     <li>Speed! The aim of Scroller for DataTables is to make rendering large data sets fast</li>
	 *     <li>Full compatibility with deferred rendering in DataTables for maximum speed</li>
	 *     <li>Display millions of rows</li>
	 *     <li>Integration with state saving in DataTables (scrolling position is saved)</li>
	 *     <li>Easy to use</li>
	 *   </ul>
	 *
	 *  @class
	 *  @constructor
	 *  @global
	 *  @param {object} dt DataTables settings object or API instance
	 *  @param {object} [opts={}] Configuration object for FixedColumns. Options 
	 *    are defined by {@link Scroller.defaults}
	 *
	 *  @requires jQuery 1.7+
	 *  @requires DataTables 1.10.0+
	 *
	 *  @example
	 *    $(document).ready(function() {
	 *        $('#example').DataTable( {
	 *            "scrollY": "200px",
	 *            "ajax": "media/dataset/large.txt",
	 *            "scroller": true,
	 *            "deferRender": true
	 *        } );
	 *    } );
	 */
	var Scroller = function (dt, opts) {
		/* Sanity check - you just know it will happen */
		if (!(this instanceof Scroller)) {
			alert("Scroller warning: Scroller must be initialised with the 'new' keyword.");
			return;
		}

		if (opts === undefined) {
			opts = {};
		}

		var dtApi = $.fn.dataTable.Api(dt);

		/**
		 * Settings object which contains customisable information for the Scroller instance
		 * @namespace
		 * @private
		 * @extends Scroller.defaults
		 */
		this.s = {
			/**
			 * DataTables settings object
			 *  @type     object
			 *  @default  Passed in as first parameter to constructor
			 */
			dt: dtApi.settings()[0],

			/**
			 * DataTables API instance
			 *  @type     DataTable.Api
			 */
			dtApi: dtApi,

			/**
			 * Pixel location of the top of the drawn table in the viewport
			 *  @type     int
			 *  @default  0
			 */
			tableTop: 0,

			/**
			 * Pixel location of the bottom of the drawn table in the viewport
			 *  @type     int
			 *  @default  0
			 */
			tableBottom: 0,

			/**
			 * Pixel location of the boundary for when the next data set should be loaded and drawn
			 * when scrolling up the way.
			 *  @type     int
			 *  @default  0
			 *  @private
			 */
			redrawTop: 0,

			/**
			 * Pixel location of the boundary for when the next data set should be loaded and drawn
			 * when scrolling down the way. Note that this is actually calculated as the offset from
			 * the top.
			 *  @type     int
			 *  @default  0
			 *  @private
			 */
			redrawBottom: 0,

			/**
			 * Auto row height or not indicator
			 *  @type     bool
			 *  @default  0
			 */
			autoHeight: true,

			/**
			 * Number of rows calculated as visible in the visible viewport
			 *  @type     int
			 *  @default  0
			 */
			viewportRows: 0,

			/**
			 * setTimeout reference for state saving, used when state saving is enabled in the DataTable
			 * and when the user scrolls the viewport in order to stop the cookie set taking too much
			 * CPU!
			 *  @type     int
			 *  @default  0
			 */
			stateTO: null,

			stateSaveThrottle: function () {},

			/**
			 * setTimeout reference for the redraw, used when server-side processing is enabled in the
			 * DataTables in order to prevent DoSing the server
			 *  @type     int
			 *  @default  null
			 */
			drawTO: null,

			heights: {
				jump: null,
				page: null,
				virtual: null,
				scroll: null,

				/**
				 * Height of rows in the table
				 *  @type     int
				 *  @default  0
				 */
				row: null,

				/**
				 * Pixel height of the viewport
				 *  @type     int
				 *  @default  0
				 */
				viewport: null,
				labelFactor: 1
			},

			topRowFloat: 0,
			scrollDrawDiff: null,
			loaderVisible: false,
			forceReposition: false,
			baseRowTop: 0,
			baseScrollTop: 0,
			mousedown: false,
			lastScrollTop: 0
		};

		// @todo The defaults should extend a `c` property and the internal settings
		// only held in the `s` property. At the moment they are mixed
		this.s = $.extend(this.s, Scroller.oDefaults, opts);

		// Workaround for row height being read from height object (see above comment)
		this.s.heights.row = this.s.rowHeight;

		/**
		 * DOM elements used by the class instance
		 * @private
		 * @namespace
		 *
		 */
		this.dom = {
			"force": document.createElement('div'),
			"label": $('<div class="dts_label">0</div>'),
			"scroller": null,
			"table": null,
			"loader": null
		};

		// Attach the instance to the DataTables instance so it can be accessed in
		// future. Don't initialise Scroller twice on the same table
		if (this.s.dt.oScroller) {
			return;
		}

		this.s.dt.oScroller = this;

		/* Let's do it */
		this.construct();
	};



	$.extend(Scroller.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Public methods - to be exposed via the DataTables API
		 */

		/**
		 * Calculate and store information about how many rows are to be displayed
		 * in the scrolling viewport, based on current dimensions in the browser's
		 * rendering. This can be particularly useful if the table is initially
		 * drawn in a hidden element - for example in a tab.
		 *  @param {bool} [redraw=true] Redraw the table automatically after the recalculation, with
		 *    the new dimensions forming the basis for the draw.
		 *  @returns {void}
		 */
		measure: function (redraw) {
			if (this.s.autoHeight) {
				this._calcRowHeight();
			}

			var heights = this.s.heights;

			if (heights.row) {
				heights.viewport = this._parseHeight($(this.dom.scroller).css('max-height'));

				this.s.viewportRows = parseInt(heights.viewport / heights.row, 10) + 1;
				this.s.dt._iDisplayLength = this.s.viewportRows * this.s.displayBuffer;
			}

			var label = this.dom.label.outerHeight();
			heights.labelFactor = (heights.viewport - label) / heights.scroll;

			if (redraw === undefined || redraw) {
				this.s.dt.oInstance.fnDraw(false);
			}
		},

		/**
		 * Get information about current displayed record range. This corresponds to
		 * the information usually displayed in the "Info" block of the table.
		 *
		 * @returns {object} info as an object:
		 *  {
		 *      start: {int}, // the 0-indexed record at the top of the viewport
		 *      end:   {int}, // the 0-indexed record at the bottom of the viewport
		 *  }
		 */
		pageInfo: function () {
			var
				dt = this.s.dt,
				iScrollTop = this.dom.scroller.scrollTop,
				iTotal = dt.fnRecordsDisplay(),
				iPossibleEnd = Math.ceil(this.pixelsToRow(iScrollTop + this.s.heights.viewport, false, this.s.ani));

			return {
				start: Math.floor(this.pixelsToRow(iScrollTop, false, this.s.ani)),
				end: iTotal < iPossibleEnd ? iTotal - 1 : iPossibleEnd - 1
			};
		},

		/**
		 * Calculate the row number that will be found at the given pixel position
		 * (y-scroll).
		 *
		 * Please note that when the height of the full table exceeds 1 million
		 * pixels, Scroller switches into a non-linear mode for the scrollbar to fit
		 * all of the records into a finite area, but this function returns a linear
		 * value (relative to the last non-linear positioning).
		 *  @param {int} pixels Offset from top to calculate the row number of
		 *  @param {int} [intParse=true] If an integer value should be returned
		 *  @param {int} [virtual=false] Perform the calculations in the virtual domain
		 *  @returns {int} Row index
		 */
		pixelsToRow: function (pixels, intParse, virtual) {
			var diff = pixels - this.s.baseScrollTop;
			var row = virtual ?
				(this._domain('physicalToVirtual', this.s.baseScrollTop) + diff) / this.s.heights.row :
				(diff / this.s.heights.row) + this.s.baseRowTop;

			return intParse || intParse === undefined ?
				parseInt(row, 10) :
				row;
		},

		/**
		 * Calculate the pixel position from the top of the scrolling container for
		 * a given row
		 *  @param {int} iRow Row number to calculate the position of
		 *  @returns {int} Pixels
		 */
		rowToPixels: function (rowIdx, intParse, virtual) {
			var pixels;
			var diff = rowIdx - this.s.baseRowTop;

			if (virtual) {
				pixels = this._domain('virtualToPhysical', this.s.baseScrollTop);
				pixels += diff * this.s.heights.row;
			} else {
				pixels = this.s.baseScrollTop;
				pixels += diff * this.s.heights.row;
			}

			return intParse || intParse === undefined ?
				parseInt(pixels, 10) :
				pixels;
		},


		/**
		 * Calculate the row number that will be found at the given pixel position (y-scroll)
		 *  @param {int} row Row index to scroll to
		 *  @param {bool} [animate=true] Animate the transition or not
		 *  @returns {void}
		 */
		scrollToRow: function (row, animate) {
			var that = this;
			var ani = false;
			var px = this.rowToPixels(row);

			// We need to know if the table will redraw or not before doing the
			// scroll. If it will not redraw, then we need to use the currently
			// displayed table, and scroll with the physical pixels. Otherwise, we
			// need to calculate the table's new position from the virtual
			// transform.
			var preRows = ((this.s.displayBuffer - 1) / 2) * this.s.viewportRows;
			var drawRow = row - preRows;
			if (drawRow < 0) {
				drawRow = 0;
			}

			if ((px > this.s.redrawBottom || px < this.s.redrawTop) && this.s.dt._iDisplayStart !== drawRow) {
				ani = true;
				px = this._domain('virtualToPhysical', row * this.s.heights.row);

				// If we need records outside the current draw region, but the new
				// scrolling position is inside that (due to the non-linear nature
				// for larger numbers of records), we need to force position update.
				if (this.s.redrawTop < px && px < this.s.redrawBottom) {
					this.s.forceReposition = true;
					animate = false;
				}
			}

			if (animate === undefined || animate) {
				this.s.ani = ani;
				$(this.dom.scroller).animate({
					"scrollTop": px
				}, function () {
					// This needs to happen after the animation has completed and
					// the final scroll event fired
					setTimeout(function () {
						that.s.ani = false;
					}, 250);
				});
			} else {
				$(this.dom.scroller).scrollTop(px);
			}
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Initialisation for Scroller
		 *  @returns {void}
		 *  @private
		 */
		construct: function () {
			var that = this;
			var dt = this.s.dtApi;

			/* Sanity check */
			if (!this.s.dt.oFeatures.bPaginate) {
				this.s.dt.oApi._fnLog(this.s.dt, 0, 'Pagination must be enabled for Scroller');
				return;
			}

			/* Insert a div element that we can use to force the DT scrolling container to
			 * the height that would be required if the whole table was being displayed
			 */
			this.dom.force.style.position = "relative";
			this.dom.force.style.top = "0px";
			this.dom.force.style.left = "0px";
			this.dom.force.style.width = "1px";

			this.dom.scroller = $('div.' + this.s.dt.oClasses.sScrollBody, this.s.dt.nTableWrapper)[0];
			this.dom.scroller.appendChild(this.dom.force);
			this.dom.scroller.style.position = "relative";

			this.dom.table = $('>table', this.dom.scroller)[0];
			this.dom.table.style.position = "absolute";
			this.dom.table.style.top = "0px";
			this.dom.table.style.left = "0px";

			// Add class to 'announce' that we are a Scroller table
			$(dt.table().container()).addClass('dts DTS');

			// Add a 'loading' indicator
			if (this.s.loadingIndicator) {
				this.dom.loader = $('<div class="dataTables_processing dts_loading">' + this.s.dt.oLanguage.sLoadingRecords + '</div>')
					.css('display', 'none');

				$(this.dom.scroller.parentNode)
					.css('position', 'relative')
					.append(this.dom.loader);
			}

			this.dom.label.appendTo(this.dom.scroller);

			/* Initial size calculations */
			if (this.s.heights.row && this.s.heights.row != 'auto') {
				this.s.autoHeight = false;
			}

			// Scrolling callback to see if a page change is needed
			this.s.ingnoreScroll = true;
			$(this.dom.scroller).on('scroll.dt-scroller', function (e) {
				that._scroll.call(that);
			});

			// In iOS we catch the touchstart event in case the user tries to scroll
			// while the display is already scrolling
			$(this.dom.scroller).on('touchstart.dt-scroller', function () {
				that._scroll.call(that);
			});

			$(this.dom.scroller)
				.on('mousedown.dt-scroller', function () {
					that.s.mousedown = true;
				})
				.on('mouseup.dt-scroller', function () {
					that.s.labelVisible = false;
					that.s.mousedown = false;
					that.dom.label.css('display', 'none');
				});

			// On resize, update the information element, since the number of rows shown might change
			$(window).on('resize.dt-scroller', function () {
				that.measure(false);
				that._info();
			});

			// Add a state saving parameter to the DT state saving so we can restore the exact
			// position of the scrolling.
			var initialStateSave = true;
			var loadedState = dt.state.loaded();

			dt.on('stateSaveParams.scroller', function (e, settings, data) {
				if (initialStateSave) {
					data.scroller = loadedState.scroller;
					initialStateSave = false;
				} else {
					// Need to used the saved position on init
					data.scroller = {
						topRow: that.s.topRowFloat,
						baseScrollTop: that.s.baseScrollTop,
						baseRowTop: that.s.baseRowTop,
						scrollTop: that.s.lastScrollTop
					};
				}
			});

			if (loadedState && loadedState.scroller) {
				this.s.topRowFloat = loadedState.scroller.topRow;
				this.s.baseScrollTop = loadedState.scroller.baseScrollTop;
				this.s.baseRowTop = loadedState.scroller.baseRowTop;
			}

			this.measure(false);

			that.s.stateSaveThrottle = that.s.dt.oApi._fnThrottle(function () {
				that.s.dtApi.state.save();
			}, 500);

			dt.on('init.scroller', function () {
				that.measure(false);

				// Setting to `jump` will instruct _draw to calculate the scroll top
				// position
				that.s.scrollType = 'jump';
				that._draw();

				// Update the scroller when the DataTable is redrawn
				dt.on('draw.scroller', function () {
					that._draw();
				});
			});

			// Set height before the draw happens, allowing everything else to update
			// on draw complete without worry for roder.
			dt.on('preDraw.dt.scroller', function () {
				that._scrollForce();
			});

			// Destructor
			dt.on('destroy.scroller', function () {
				$(window).off('resize.dt-scroller');
				$(that.dom.scroller).off('.dt-scroller');
				$(that.s.dt.nTable).off('.scroller');

				$(that.s.dt.nTableWrapper).removeClass('DTS');
				$('div.DTS_Loading', that.dom.scroller.parentNode).remove();

				that.dom.table.style.position = "";
				that.dom.table.style.top = "";
				that.dom.table.style.left = "";
			});
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Automatic calculation of table row height. This is just a little tricky here as using
		 * initialisation DataTables has tale the table out of the document, so we need to create
		 * a new table and insert it into the document, calculate the row height and then whip the
		 * table out.
		 *  @returns {void}
		 *  @private
		 */
		_calcRowHeight: function () {
			var dt = this.s.dt;
			var origTable = dt.nTable;
			var nTable = origTable.cloneNode(false);
			var tbody = $('<tbody/>').appendTo(nTable);
			var container = $(
				'<div class="' + dt.oClasses.sWrapper + ' DTS">' +
				'<div class="' + dt.oClasses.sScrollWrapper + '">' +
				'<div class="' + dt.oClasses.sScrollBody + '"></div>' +
				'</div>' +
				'</div>'
			);

			// Want 3 rows in the sizing table so :first-child and :last-child
			// CSS styles don't come into play - take the size of the middle row
			$('tbody tr:lt(4)', origTable).clone().appendTo(tbody);
			var rowsCount = $('tr', tbody).length;

			if (rowsCount === 1) {
				tbody.prepend('<tr><td>&#160;</td></tr>');
				tbody.append('<tr><td>&#160;</td></tr>');
			} else {
				for (; rowsCount < 3; rowsCount++) {
					tbody.append('<tr><td>&#160;</td></tr>');
				}
			}

			$('div.' + dt.oClasses.sScrollBody, container).append(nTable);

			// If initialised using `dom`, use the holding element as the insert point
			var insertEl = this.s.dt.nHolding || origTable.parentNode;

			if (!$(insertEl).is(':visible')) {
				insertEl = 'body';
			}

			// Remove form element links as they might select over others (particularly radio and checkboxes)
			container.find("input").removeAttr("name");

			container.appendTo(insertEl);
			this.s.heights.row = $('tr', tbody).eq(1).outerHeight();

			container.remove();
		},

		/**
		 * Draw callback function which is fired when the DataTable is redrawn. The main function of
		 * this method is to position the drawn table correctly the scrolling container for the rows
		 * that is displays as a result of the scrolling position.
		 *  @returns {void}
		 *  @private
		 */
		_draw: function () {
			var
				that = this,
				heights = this.s.heights,
				iScrollTop = this.dom.scroller.scrollTop,
				iTableHeight = $(this.s.dt.nTable).height(),
				displayStart = this.s.dt._iDisplayStart,
				displayLen = this.s.dt._iDisplayLength,
				displayEnd = this.s.dt.fnRecordsDisplay();

			// Disable the scroll event listener while we are updating the DOM
			this.s.skip = true;

			// If paging is reset
			if ((this.s.dt.bSorted || this.s.dt.bFiltered) && displayStart === 0 && !this.s.dt._drawHold) {
				this.s.topRowFloat = 0;
			}

			iScrollTop = this.s.scrollType === 'jump' ?
				this._domain('virtualToPhysical', this.s.topRowFloat * heights.row) :
				iScrollTop;

			// Store positional information so positional calculations can be based
			// upon the current table draw position
			this.s.baseScrollTop = iScrollTop;
			this.s.baseRowTop = this.s.topRowFloat;

			// Position the table in the virtual scroller
			var tableTop = iScrollTop - ((this.s.topRowFloat - displayStart) * heights.row);
			if (displayStart === 0) {
				tableTop = 0;
			} else if (displayStart + displayLen >= displayEnd) {
				tableTop = heights.scroll - iTableHeight;
			}

			this.dom.table.style.top = tableTop + 'px';

			/* Cache some information for the scroller */
			this.s.tableTop = tableTop;
			this.s.tableBottom = iTableHeight + this.s.tableTop;

			// Calculate the boundaries for where a redraw will be triggered by the
			// scroll event listener
			var boundaryPx = (iScrollTop - this.s.tableTop) * this.s.boundaryScale;
			this.s.redrawTop = iScrollTop - boundaryPx;
			this.s.redrawBottom = iScrollTop + boundaryPx > heights.scroll - heights.viewport - heights.row ?
				heights.scroll - heights.viewport - heights.row :
				iScrollTop + boundaryPx;

			this.s.skip = false;

			// Restore the scrolling position that was saved by DataTable's state
			// saving Note that this is done on the second draw when data is Ajax
			// sourced, and the first draw when DOM soured
			if (this.s.dt.oFeatures.bStateSave && this.s.dt.oLoadedState !== null &&
				typeof this.s.dt.oLoadedState.scroller != 'undefined') {
				// A quirk of DataTables is that the draw callback will occur on an
				// empty set if Ajax sourced, but not if server-side processing.
				var ajaxSourced = (this.s.dt.sAjaxSource || that.s.dt.ajax) && !this.s.dt.oFeatures.bServerSide ?
					true :
					false;

				if ((ajaxSourced && this.s.dt.iDraw == 2) ||
					(!ajaxSourced && this.s.dt.iDraw == 1)) {
					setTimeout(function () {
						$(that.dom.scroller).scrollTop(that.s.dt.oLoadedState.scroller.scrollTop);

						// In order to prevent layout thrashing we need another
						// small delay
						setTimeout(function () {
							that.s.ingnoreScroll = false;
						}, 0);
					}, 0);
				}
			} else {
				that.s.ingnoreScroll = false;
			}

			// Because of the order of the DT callbacks, the info update will
			// take precedence over the one we want here. So a 'thread' break is
			// needed.  Only add the thread break if bInfo is set
			if (this.s.dt.oFeatures.bInfo) {
				setTimeout(function () {
					that._info.call(that);
				}, 0);
			}

			// Hide the loading indicator
			if (this.dom.loader && this.s.loaderVisible) {
				this.dom.loader.css('display', 'none');
				this.s.loaderVisible = false;
			}
		},

		/**
		 * Convert from one domain to another. The physical domain is the actual
		 * pixel count on the screen, while the virtual is if we had browsers which
		 * had scrolling containers of infinite height (i.e. the absolute value)
		 *
		 *  @param {string} dir Domain transform direction, `virtualToPhysical` or
		 *    `physicalToVirtual` 
		 *  @returns {number} Calculated transform
		 *  @private
		 */
		_domain: function (dir, val) {
			var heights = this.s.heights;
			var diff;
			var magic = 10000; // the point at which the non-linear calculations start to happen

			// If the virtual and physical height match, then we use a linear
			// transform between the two, allowing the scrollbar to be linear
			if (heights.virtual === heights.scroll) {
				return val;
			}

			// In the first 10k pixels and the last 10k pixels, we want the scrolling
			// to be linear. After that it can be non-linear. It would be unusual for
			// anyone to mouse wheel through that much.
			if (val < magic) {
				return val;
			} else if (dir === 'virtualToPhysical' && val >= heights.virtual - magic) {
				diff = heights.virtual - val;
				return heights.scroll - diff;
			} else if (dir === 'physicalToVirtual' && val >= heights.scroll - magic) {
				diff = heights.scroll - val;
				return heights.virtual - diff;
			}

			// Otherwise, we want a non-linear scrollbar to take account of the
			// redrawing regions at the start and end of the table, otherwise these
			// can stutter badly - on large tables 30px (for example) scroll might
			// be hundreds of rows, so the table would be redrawing every few px at
			// the start and end. Use a simple linear eq. to stop this, effectively
			// causing a kink in the scrolling ratio. It does mean the scrollbar is
			// non-linear, but with such massive data sets, the scrollbar is going
			// to be a best guess anyway
			var m = (heights.virtual - magic - magic) / (heights.scroll - magic - magic);
			var c = magic - (m * magic);

			return dir === 'virtualToPhysical' ?
				(val - c) / m :
				(m * val) + c;
		},

		/**
		 * Update any information elements that are controlled by the DataTable based on the scrolling
		 * viewport and what rows are visible in it. This function basically acts in the same way as
		 * _fnUpdateInfo in DataTables, and effectively replaces that function.
		 *  @returns {void}
		 *  @private
		 */
		_info: function () {
			if (!this.s.dt.oFeatures.bInfo) {
				return;
			}

			var
				dt = this.s.dt,
				language = dt.oLanguage,
				iScrollTop = this.dom.scroller.scrollTop,
				iStart = Math.floor(this.pixelsToRow(iScrollTop, false, this.s.ani) + 1),
				iMax = dt.fnRecordsTotal(),
				iTotal = dt.fnRecordsDisplay(),
				iPossibleEnd = Math.ceil(this.pixelsToRow(iScrollTop + this.s.heights.viewport, false, this.s.ani)),
				iEnd = iTotal < iPossibleEnd ? iTotal : iPossibleEnd,
				sStart = dt.fnFormatNumber(iStart),
				sEnd = dt.fnFormatNumber(iEnd),
				sMax = dt.fnFormatNumber(iMax),
				sTotal = dt.fnFormatNumber(iTotal),
				sOut;

			if (dt.fnRecordsDisplay() === 0 &&
				dt.fnRecordsDisplay() == dt.fnRecordsTotal()) {
				/* Empty record set */
				sOut = language.sInfoEmpty + language.sInfoPostFix;
			} else if (dt.fnRecordsDisplay() === 0) {
				/* Empty record set after filtering */
				sOut = language.sInfoEmpty + ' ' +
					language.sInfoFiltered.replace('_MAX_', sMax) +
					language.sInfoPostFix;
			} else if (dt.fnRecordsDisplay() == dt.fnRecordsTotal()) {
				/* Normal record set */
				sOut = language.sInfo.
				replace('_START_', sStart).
				replace('_END_', sEnd).
				replace('_MAX_', sMax).
				replace('_TOTAL_', sTotal) +
					language.sInfoPostFix;
			} else {
				/* Record set after filtering */
				sOut = language.sInfo.
				replace('_START_', sStart).
				replace('_END_', sEnd).
				replace('_MAX_', sMax).
				replace('_TOTAL_', sTotal) + ' ' +
					language.sInfoFiltered.replace(
						'_MAX_',
						dt.fnFormatNumber(dt.fnRecordsTotal())
					) +
					language.sInfoPostFix;
			}

			var callback = language.fnInfoCallback;
			if (callback) {
				sOut = callback.call(dt.oInstance,
					dt, iStart, iEnd, iMax, iTotal, sOut
				);
			}

			var n = dt.aanFeatures.i;
			if (typeof n != 'undefined') {
				for (var i = 0, iLen = n.length; i < iLen; i++) {
					$(n[i]).html(sOut);
				}
			}

			// DT doesn't actually (yet) trigger this event, but it will in future
			$(dt.nTable).triggerHandler('info.dt');
		},

		/**
		 * Parse CSS height property string as number
		 *
		 * An attempt is made to parse the string as a number. Currently supported units are 'px',
		 * 'vh', and 'rem'. 'em' is partially supported; it works as long as the parent element's
		 * font size matches the body element. Zero is returned for unrecognized strings.
		 *  @param {string} cssHeight CSS height property string
		 *  @returns {number} height
		 *  @private
		 */
		_parseHeight: function (cssHeight) {
			var height;
			var matches = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|em|rem|vh)$/.exec(cssHeight);

			if (matches === null) {
				return 0;
			}

			var value = parseFloat(matches[1]);
			var unit = matches[2];

			if (unit === 'px') {
				height = value;
			} else if (unit === 'vh') {
				height = (value / 100) * $(window).height();
			} else if (unit === 'rem') {
				height = value * parseFloat($(':root').css('font-size'));
			} else if (unit === 'em') {
				height = value * parseFloat($('body').css('font-size'));
			}

			return height ?
				height :
				0;
		},

		/**
		 * Scrolling function - fired whenever the scrolling position is changed.
		 * This method needs to use the stored values to see if the table should be
		 * redrawn as we are moving towards the end of the information that is
		 * currently drawn or not. If needed, then it will redraw the table based on
		 * the new position.
		 *  @returns {void}
		 *  @private
		 */
		_scroll: function () {
			var
				that = this,
				heights = this.s.heights,
				iScrollTop = this.dom.scroller.scrollTop,
				iTopRow;

			if (this.s.skip) {
				return;
			}

			if (this.s.ingnoreScroll) {
				return;
			}

			if (iScrollTop === this.s.lastScrollTop) {
				return;
			}

			/* If the table has been sorted or filtered, then we use the redraw that
			 * DataTables as done, rather than performing our own
			 */
			if (this.s.dt.bFiltered || this.s.dt.bSorted) {
				this.s.lastScrollTop = 0;
				return;
			}

			/* Update the table's information display for what is now in the viewport */
			this._info();

			/* We don't want to state save on every scroll event - that's heavy
			 * handed, so use a timeout to update the state saving only when the
			 * scrolling has finished
			 */
			clearTimeout(this.s.stateTO);
			this.s.stateTO = setTimeout(function () {
				that.s.dtApi.state.save();
			}, 250);

			this.s.scrollType = Math.abs(iScrollTop - this.s.lastScrollTop) > heights.viewport ?
				'jump' :
				'cont';

			this.s.topRowFloat = this.s.scrollType === 'cont' ?
				this.pixelsToRow(iScrollTop, false, false) :
				this._domain('physicalToVirtual', iScrollTop) / heights.row;

			if (this.s.topRowFloat < 0) {
				this.s.topRowFloat = 0;
			}

			/* Check if the scroll point is outside the trigger boundary which would required
			 * a DataTables redraw
			 */
			if (this.s.forceReposition || iScrollTop < this.s.redrawTop || iScrollTop > this.s.redrawBottom) {
				var preRows = Math.ceil(((this.s.displayBuffer - 1) / 2) * this.s.viewportRows);

				iTopRow = parseInt(this.s.topRowFloat, 10) - preRows;
				this.s.forceReposition = false;

				if (iTopRow <= 0) {
					/* At the start of the table */
					iTopRow = 0;
				} else if (iTopRow + this.s.dt._iDisplayLength > this.s.dt.fnRecordsDisplay()) {
					/* At the end of the table */
					iTopRow = this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength;
					if (iTopRow < 0) {
						iTopRow = 0;
					}
				} else if (iTopRow % 2 !== 0) {
					// For the row-striping classes (odd/even) we want only to start
					// on evens otherwise the stripes will change between draws and
					// look rubbish
					iTopRow++;
				}

				// Store calcuated value, in case the following condition is not met, but so
				// that the draw function will still use it.
				this.s.targetTop = iTopRow;

				if (iTopRow != this.s.dt._iDisplayStart) {
					/* Cache the new table position for quick lookups */
					this.s.tableTop = $(this.s.dt.nTable).offset().top;
					this.s.tableBottom = $(this.s.dt.nTable).height() + this.s.tableTop;

					var draw = function () {
						that.s.dt._iDisplayStart = that.s.targetTop;
						that.s.dt.oApi._fnDraw(that.s.dt);
					};

					/* Do the DataTables redraw based on the calculated start point - note that when
					 * using server-side processing we introduce a small delay to not DoS the server...
					 */
					if (this.s.dt.oFeatures.bServerSide) {
						this.s.forceReposition = true;

						clearTimeout(this.s.drawTO);
						this.s.drawTO = setTimeout(draw, this.s.serverWait);
					} else {
						draw();
					}

					if (this.dom.loader && !this.s.loaderVisible) {
						this.dom.loader.css('display', 'block');
						this.s.loaderVisible = true;
					}
				}
			} else {
				this.s.topRowFloat = this.pixelsToRow(iScrollTop, false, true);
			}

			this.s.lastScrollTop = iScrollTop;
			this.s.stateSaveThrottle();

			if (this.s.scrollType === 'jump' && this.s.mousedown) {
				this.s.labelVisible = true;
			}
			if (this.s.labelVisible) {
				this.dom.label
					.html(this.s.dt.fnFormatNumber(parseInt(this.s.topRowFloat, 10) + 1))
					.css('top', iScrollTop + (iScrollTop * heights.labelFactor))
					.css('display', 'block');
			}
		},

		/**
		 * Force the scrolling container to have height beyond that of just the
		 * table that has been drawn so the user can scroll the whole data set.
		 *
		 * Note that if the calculated required scrolling height exceeds a maximum
		 * value (1 million pixels - hard-coded) the forcing element will be set
		 * only to that maximum value and virtual / physical domain transforms will
		 * be used to allow Scroller to display tables of any number of records.
		 *  @returns {void}
		 *  @private
		 */
		_scrollForce: function () {
			var heights = this.s.heights;
			var max = 1000000;

			heights.virtual = heights.row * this.s.dt.fnRecordsDisplay();
			heights.scroll = heights.virtual;

			if (heights.scroll > max) {
				heights.scroll = max;
			}

			// Minimum height so there is always a row visible (the 'no rows found'
			// if reduced to zero filtering)
			this.dom.force.style.height = heights.scroll > this.s.heights.row ?
				heights.scroll + 'px' :
				this.s.heights.row + 'px';
		}
	});



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Statics
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	/**
	 * Scroller default settings for initialisation
	 *  @namespace
	 *  @name Scroller.defaults
	 *  @static
	 */
	Scroller.defaults = {
		/**
		 * Scroller uses the boundary scaling factor to decide when to redraw the table - which it
		 * typically does before you reach the end of the currently loaded data set (in order to
		 * allow the data to look continuous to a user scrolling through the data). If given as 0
		 * then the table will be redrawn whenever the viewport is scrolled, while 1 would not
		 * redraw the table until the currently loaded data has all been shown. You will want
		 * something in the middle - the default factor of 0.5 is usually suitable.
		 *  @type     float
		 *  @default  0.5
		 *  @static
		 */
		boundaryScale: 0.5,

		/**
		 * The display buffer is what Scroller uses to calculate how many rows it should pre-fetch
		 * for scrolling. Scroller automatically adjusts DataTables' display length to pre-fetch
		 * rows that will be shown in "near scrolling" (i.e. just beyond the current display area).
		 * The value is based upon the number of rows that can be displayed in the viewport (i.e.
		 * a value of 1), and will apply the display range to records before before and after the
		 * current viewport - i.e. a factor of 3 will allow Scroller to pre-fetch 1 viewport's worth
		 * of rows before the current viewport, the current viewport's rows and 1 viewport's worth
		 * of rows after the current viewport. Adjusting this value can be useful for ensuring
		 * smooth scrolling based on your data set.
		 *  @type     int
		 *  @default  7
		 *  @static
		 */
		displayBuffer: 9,

		/**
		 * Show (or not) the loading element in the background of the table. Note that you should
		 * include the dataTables.scroller.css file for this to be displayed correctly.
		 *  @type     boolean
		 *  @default  false
		 *  @static
		 */
		loadingIndicator: false,

		/**
		 * Scroller will attempt to automatically calculate the height of rows for it's internal
		 * calculations. However the height that is used can be overridden using this parameter.
		 *  @type     int|string
		 *  @default  auto
		 *  @static
		 */
		rowHeight: "auto",

		/**
		 * When using server-side processing, Scroller will wait a small amount of time to allow
		 * the scrolling to finish before requesting more data from the server. This prevents
		 * you from DoSing your own server! The wait time can be configured by this parameter.
		 *  @type     int
		 *  @default  200
		 *  @static
		 */
		serverWait: 200
	};

	Scroller.oDefaults = Scroller.defaults;



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constants
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 * Scroller version
	 *  @type      String
	 *  @default   See code
	 *  @name      Scroller.version
	 *  @static
	 */
	Scroller.version = "2.0.2";



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Initialisation
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	// Attach a listener to the document which listens for DataTables initialisation
	// events so we can automatically initialise
	$(document).on('preInit.dt.dtscroller', function (e, settings) {
		if (e.namespace !== 'dt') {
			return;
		}

		var init = settings.oInit.scroller;
		var defaults = DataTable.defaults.scroller;

		if (init || defaults) {
			var opts = $.extend({}, init, defaults);

			if (init !== false) {
				new Scroller(settings, opts);
			}
		}
	});


	// Attach Scroller to DataTables so it can be accessed as an 'extra'
	$.fn.dataTable.Scroller = Scroller;
	$.fn.DataTable.Scroller = Scroller;


	// DataTables 1.10 API method aliases
	var Api = $.fn.dataTable.Api;

	Api.register('scroller()', function () {
		return this;
	});

	// Undocumented and deprecated - is it actually useful at all?
	Api.register('scroller().rowToPixels()', function (rowIdx, intParse, virtual) {
		var ctx = this.context;

		if (ctx.length && ctx[0].oScroller) {
			return ctx[0].oScroller.rowToPixels(rowIdx, intParse, virtual);
		}
		// undefined
	});

	// Undocumented and deprecated - is it actually useful at all?
	Api.register('scroller().pixelsToRow()', function (pixels, intParse, virtual) {
		var ctx = this.context;

		if (ctx.length && ctx[0].oScroller) {
			return ctx[0].oScroller.pixelsToRow(pixels, intParse, virtual);
		}
		// undefined
	});

	// `scroller().scrollToRow()` is undocumented and deprecated. Use `scroller.toPosition()
	Api.register(['scroller().scrollToRow()', 'scroller.toPosition()'], function (idx, ani) {
		this.iterator('table', function (ctx) {
			if (ctx.oScroller) {
				ctx.oScroller.scrollToRow(idx, ani);
			}
		});

		return this;
	});

	Api.register('row().scrollTo()', function (ani) {
		var that = this;

		this.iterator('row', function (ctx, rowIdx) {
			if (ctx.oScroller) {
				var displayIdx = that
					.rows({
						order: 'applied',
						search: 'applied'
					})
					.indexes()
					.indexOf(rowIdx);

				ctx.oScroller.scrollToRow(displayIdx, ani);
			}
		});

		return this;
	});

	Api.register('scroller.measure()', function (redraw) {
		this.iterator('table', function (ctx) {
			if (ctx.oScroller) {
				ctx.oScroller.measure(redraw);
			}
		});

		return this;
	});

	Api.register('scroller.page()', function () {
		var ctx = this.context;

		if (ctx.length && ctx[0].oScroller) {
			return ctx[0].oScroller.pageInfo();
		}
		// undefined
	});

	return Scroller;
}));