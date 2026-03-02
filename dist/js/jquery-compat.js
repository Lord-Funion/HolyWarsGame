/* Compatibility shims for legacy Bootstrap/Bootbox/Bootstrap-select on jQuery 4 */
(function ($) {
  if (!$) return;

  if (typeof $.isFunction !== 'function') {
    $.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }

  if (typeof $.isArray !== 'function') {
    $.isArray = function (obj) {
      return Array.isArray(obj);
    };
  }

  if (typeof $.type !== 'function') {
    var class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function (name) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });

    $.type = function (obj) {
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === 'object' || typeof obj === 'function'
        ? (class2type[Object.prototype.toString.call(obj)] || 'object')
        : typeof obj;
    };
  }

  if (typeof $.camelCase !== 'function') {
    var rdashAlpha = /-([a-z])/g;
    var fcamelCase = function (_all, letter) {
      return letter.toUpperCase();
    };

    $.camelCase = function (string) {
      return String(string).replace(rdashAlpha, fcamelCase);
    };
  }

  // bootstrap-select can still throw on newer jQuery in some code paths.
  // Make selector usage resilient by falling back to native <select> value behavior.
  if ($.fn && typeof $.fn.selectpicker === 'function') {
    var originalSelectpicker = $.fn.selectpicker;
    $.fn.selectpicker = function () {
      try {
        return originalSelectpicker.apply(this, arguments);
      } catch (_err) {
        var action = arguments[0];
        var value = arguments[1];
        if (action === 'val') {
          if (arguments.length > 1) {
            this.val(value);
            return this;
          }
          return this.val();
        }
        return this;
      }
    };
  }
})(window.jQuery);
