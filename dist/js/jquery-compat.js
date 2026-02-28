/* Compatibility shims for legacy Bootstrap/Bootbox/Bootstrap-select on jQuery 4 */
(function ($) {
  if (!$) return;

  if (typeof $.isFunction !== 'function') {
    $.isFunction = function (obj) {
      return typeof obj === 'function';
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
})(window.jQuery);
