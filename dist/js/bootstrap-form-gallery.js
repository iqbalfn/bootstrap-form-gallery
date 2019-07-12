/*!
  * Bootstrap Form Gallery v0.0.1 (https://iqbalfn.github.io/bootstrap-form-gallery/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-gallery/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global['bootstrap-form-gallery'] = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'formgallery';
  var VERSION = '0.0.1';
  var DATA_KEY = 'bs.formgallery';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    imagePicker: function imagePicker(cb) {
      return cb(prompt('Image URL'));
    },
    imagePreviewer: true
  };
  var DefaultType = {
    imagePicker: '(function|string)',
    imagePreviewer: '(function|string|boolean)'
  };
  var Event = {
    ADD: "add" + EVENT_KEY,
    ADDED: "added" + EVENT_KEY,
    CHANGE: "change" + EVENT_KEY,
    CLEAR: "clear" + EVENT_KEY,
    CLEARED: "cleared" + EVENT_KEY,
    DELETE: "delete" + EVENT_KEY,
    DELETED: "deleted" + EVENT_KEY,
    CHANGE_DATA_API: "change" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY
  };
  var ClassName = {
    ACTION: 'formgallery-action',
    CONTAINER: 'formgallery',
    IMAGE: 'formgallery-image',
    LIST: 'formgallery-list',
    REMOVER: 'formgallery-remove'
  };
  var Selector = {
    ADDER: "." + ClassName.ACTION,
    CONTAINER: "." + ClassName.CONTAINER,
    IMAGE: "." + ClassName.IMAGE,
    LIST: "." + ClassName.LIST,
    REMOVER: "." + ClassName.REMOVER
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var FormGallery =
  /*#__PURE__*/
  function () {
    function FormGallery(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._list = $(element).children(Selector.LIST).get(0);
      this._model = document.querySelector(this._element.dataset.model);

      this._updateValue();

      if (typeof this._config.imagePicker === 'string') this._config.imagePicker = window[this._config.imagePicker];

      this._addModelListener();
    } // Getters


    var _proto = FormGallery.prototype;

    // Public
    _proto.addImage = function addImage(url) {
      $(this._element).trigger(Event.ADD, url);

      this._value.push(url);

      this._model.value = JSON.stringify(this._value);

      this._drawItem(url);

      $(this._element).trigger(Event.ADDED, url);
      $(this._element).trigger(Event.CHANGE);
    };

    _proto.clear = function clear() {
      $(this._element).trigger(Event.CLEAR);
      this._model.value = '[]';
      this._value = [];
      this._list.innerHTML = '';
      $(this._element).trigger(Event.CLEARED);
      $(this._element).trigger(Event.CHANGE);
    };

    _proto.preview = function preview(index) {
      if (typeof this._config.imagePreviewer === 'boolean') return;

      this._config.imagePreviewer(this._value, index);
    };

    _proto.pick = function pick() {
      var _this = this;

      if (!this._config.imagePicker) return;

      this._config.imagePicker(function (res) {
        if (res) _this.addImage(res);
      }, this);
    };

    _proto.remove = function remove(index) {
      var item = this._value[index];
      if (!item) return;
      $(this._element).trigger(Event.DELETE, item);

      this._value.splice(index, 1);

      this._model.value = JSON.stringify(this._value);
      var itemEl = $(this._list).children()[index];
      itemEl.classList.add(ClassName.HIDE);
      $(itemEl).remove();
      $(this._element).trigger(Event.DELETED, item);
      $(this._element).trigger(Event.CHANGE);
    } // Private
    ;

    _proto._addModelListener = function _addModelListener() {
      var _this2 = this;

      $(this._model).on(Event.CHANGE_DATA_API, function (e) {
        _this2._updateValue();

        _this2._drawItems();

        $(_this2._element).trigger(Event.CHANGE);
      });
    };

    _proto._drawItem = function _drawItem(item) {
      var tmpl = "\n            <div class=\"formgallery-item\">\n                <button type=\"button\" class=\"close formgallery-remove\" aria-label=\"Close\" title=\"Remove\">\n                    <span aria-hidden=\"true\">\xD7</span>\n                </button>\n                <a href=\"#\" class=\"formgallery-image\" style=\"background-image: url('" + item + "')\"></a>\n            </div>";
      $(tmpl).appendTo(this._list);
    };

    _proto._drawItems = function _drawItems() {
      var _this3 = this;

      this._list.innerHTML = '';

      this._value.forEach(function (e) {
        return _this3._drawItem(e);
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._updateValue = function _updateValue() {
      var val = this._model.value.trim();

      this._value = [];
      if (!val) return;

      try {
        this._value = JSON.parse(val);
      } catch (_unused) {
        console.error('The model value is not valid JSON', this._model);
      }

      if (!Array.isArray(this._value)) {
        console.error('The model value is not valid JSON Array', this._model);
        this._value = [];
      }
    } // Static
    ;

    FormGallery._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FormGallery(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        }
      });
    };

    _createClass(FormGallery, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return FormGallery;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.REMOVER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'remove', $(target).index());
  });
  $(document).on(Event.CLICK_DATA_API, Selector.IMAGE, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'preview', $(target).index());
  });
  $(document).on(Event.CLICK_DATA_API, Selector.ADDER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target), 'pick', target);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = FormGallery._jQueryInterface;
  $.fn[NAME].Constructor = FormGallery;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormGallery._jQueryInterface;
  };

  exports.FormGallery = FormGallery;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap-form-gallery.js.map
