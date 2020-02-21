!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):(e=e||self).Util=t(e.jQuery)}(this,function(o){"use strict";o=o&&o.hasOwnProperty("default")?o.default:o;var t="transitionend";function e(e){var t=this,n=!1;return o(this).one(l.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||l.triggerTransitionEnd(t)},e),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(e){for(;e+=~~(1e6*Math.random()),document.getElementById(e););return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target");if(!t||"#"===t){var n=e.getAttribute("href");t=n&&"#"!==n?n.trim():""}try{return document.querySelector(t)?t:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var t=o(e).css("transition-duration"),n=o(e).css("transition-delay"),i=parseFloat(t),r=parseFloat(n);return i||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(t)+parseFloat(n))):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){o(e).trigger(t)},supportsTransitionEnd:function(){return Boolean(t)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=t[i],s=o&&l.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(r).test(s))throw new Error(e.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'".')}var a},findShadowRoot:function(e){if(!document.documentElement.attachShadow)return null;if("function"!=typeof e.getRootNode)return e instanceof ShadowRoot?e:e.parentNode?l.findShadowRoot(e.parentNode):null;var t=e.getRootNode();return t instanceof ShadowRoot?t:null}};return o.fn.emulateTransitionEnd=e,o.event.special[l.TRANSITION_END]={bindType:t,delegateType:t,handle:function(e){if(o(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}},l}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","./util.js"],t):(e=e||self).Carousel=t(e.jQuery,e.Util)}(this,function(_,m){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function s(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},t=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),t.forEach(function(e){var t,n,i;t=r,i=o[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return r}_=_&&_.hasOwnProperty("default")?_.default:_,m=m&&m.hasOwnProperty("default")?m.default:m;var a="carousel",l="bs.carousel",c="."+l,e=".data-api",t=_.fn[a],u={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},h={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},g="next",d="prev",p="left",v="right",y={SLIDE:"slide"+c,SLID:"slid"+c,KEYDOWN:"keydown"+c,MOUSEENTER:"mouseenter"+c,MOUSELEAVE:"mouseleave"+c,TOUCHSTART:"touchstart"+c,TOUCHMOVE:"touchmove"+c,TOUCHEND:"touchend"+c,POINTERDOWN:"pointerdown"+c,POINTERUP:"pointerup"+c,DRAG_START:"dragstart"+c,LOAD_DATA_API:"load"+c+e,CLICK_DATA_API:"click"+c+e},f="carousel",b="active",E="slide",S="carousel-item-right",w="carousel-item-left",I="carousel-item-next",D="carousel-item-prev",C="pointer-event",O=".active",T=".active.carousel-item",A=".carousel-item",N=".carousel-item img",k=".carousel-item-next, .carousel-item-prev",P=".carousel-indicators",n="[data-slide], [data-slide-to]",o='[data-ride="carousel"]',j={TOUCH:"touch",PEN:"pen"},R=function(){function o(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(P),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e,t,n,i=o.prototype;return i.next=function(){this._isSliding||this._slide(g)},i.nextWhenVisible=function(){!document.hidden&&_(this._element).is(":visible")&&"hidden"!==_(this._element).css("visibility")&&this.next()},i.prev=function(){this._isSliding||this._slide(d)},i.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(k)&&(m.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},i.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},i.to=function(e){var t=this;this._activeElement=this._element.querySelector(T);var n=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)_(this._element).one(y.SLID,function(){return t.to(e)});else{if(n===e)return this.pause(),void this.cycle();var i=n<e?g:d;this._slide(i,this._items[e])}},i.dispose=function(){_(this._element).off(c),_.removeData(this._element,l),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},i._getConfig=function(e){return e=s({},u,e),m.typeCheckConfig(a,e,h),e},i._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);if(!(e<=40)){var t=e/this.touchDeltaX;0<t&&this.prev(),t<0&&this.next()}},i._addEventListeners=function(){var t=this;this._config.keyboard&&_(this._element).on(y.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&_(this._element).on(y.MOUSEENTER,function(e){return t.pause(e)}).on(y.MOUSELEAVE,function(e){return t.cycle(e)}),this._config.touch&&this._addTouchEventListeners()},i._addTouchEventListeners=function(){var n=this;if(this._touchSupported){var t=function(e){n._pointerEvent&&j[e.originalEvent.pointerType.toUpperCase()]?n.touchStartX=e.originalEvent.clientX:n._pointerEvent||(n.touchStartX=e.originalEvent.touches[0].clientX)},i=function(e){n._pointerEvent&&j[e.originalEvent.pointerType.toUpperCase()]&&(n.touchDeltaX=e.originalEvent.clientX-n.touchStartX),n._handleSwipe(),"hover"===n._config.pause&&(n.pause(),n.touchTimeout&&clearTimeout(n.touchTimeout),n.touchTimeout=setTimeout(function(e){return n.cycle(e)},500+n._config.interval))};_(this._element.querySelectorAll(N)).on(y.DRAG_START,function(e){return e.preventDefault()}),this._pointerEvent?(_(this._element).on(y.POINTERDOWN,function(e){return t(e)}),_(this._element).on(y.POINTERUP,function(e){return i(e)}),this._element.classList.add(C)):(_(this._element).on(y.TOUCHSTART,function(e){return t(e)}),_(this._element).on(y.TOUCHMOVE,function(e){var t;(t=e).originalEvent.touches&&1<t.originalEvent.touches.length?n.touchDeltaX=0:n.touchDeltaX=t.originalEvent.touches[0].clientX-n.touchStartX}),_(this._element).on(y.TOUCHEND,function(e){return i(e)}))}},i._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},i._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(A)):[],this._items.indexOf(e)},i._getItemByDirection=function(e,t){var n=e===g,i=e===d,r=this._getItemIndex(t),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return t;var s=(r+(e===d?-1:1))%this._items.length;return-1==s?this._items[this._items.length-1]:this._items[s]},i._triggerSlideEvent=function(e,t){var n=this._getItemIndex(e),i=this._getItemIndex(this._element.querySelector(T)),r=_.Event(y.SLIDE,{relatedTarget:e,direction:t,from:i,to:n});return _(this._element).trigger(r),r},i._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var t=[].slice.call(this._indicatorsElement.querySelectorAll(O));_(t).removeClass(b);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&_(n).addClass(b)}},i._slide=function(e,t){var n,i,r,o=this,s=this._element.querySelector(T),a=this._getItemIndex(s),l=t||s&&this._getItemByDirection(e,s),c=this._getItemIndex(l),u=Boolean(this._interval);if(r=e===g?(n=w,i=I,p):(n=S,i=D,v),l&&_(l).hasClass(b))this._isSliding=!1;else if(!this._triggerSlideEvent(l,r).isDefaultPrevented()&&s&&l){this._isSliding=!0,u&&this.pause(),this._setActiveIndicatorElement(l);var h=_.Event(y.SLID,{relatedTarget:l,direction:r,from:a,to:c});if(_(this._element).hasClass(E)){_(l).addClass(i),m.reflow(l),_(s).addClass(n),_(l).addClass(n);var d=parseInt(l.getAttribute("data-interval"),10);d?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=d):this._config.interval=this._config.defaultInterval||this._config.interval;var f=m.getTransitionDurationFromElement(s);_(s).one(m.TRANSITION_END,function(){_(l).removeClass(n+" "+i).addClass(b),_(s).removeClass(b+" "+i+" "+n),o._isSliding=!1,setTimeout(function(){return _(o._element).trigger(h)},0)}).emulateTransitionEnd(f)}else _(s).removeClass(b),_(l).addClass(b),this._isSliding=!1,_(this._element).trigger(h);u&&this.cycle()}},o._jQueryInterface=function(i){return this.each(function(){var e=_(this).data(l),t=s({},u,_(this).data());"object"==typeof i&&(t=s({},t,i));var n="string"==typeof i?i:t.slide;if(e||(e=new o(this,t),_(this).data(l,e)),"number"==typeof i)e.to(i);else if("string"==typeof n){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n]()}else t.interval&&t.ride&&(e.pause(),e.cycle())})},o._dataApiClickHandler=function(e){var t=m.getSelectorFromElement(this);if(t){var n=_(t)[0];if(n&&_(n).hasClass(f)){var i=s({},_(n).data(),_(this).data()),r=this.getAttribute("data-slide-to");r&&(i.interval=!1),o._jQueryInterface.call(_(n),i),r&&_(n).data(l).to(r),e.preventDefault()}}},e=o,n=[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return u}}],(t=null)&&r(e.prototype,t),n&&r(e,n),o}();return _(document).on(y.CLICK_DATA_API,n,R._dataApiClickHandler),_(window).on(y.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(o)),t=0,n=e.length;t<n;t++){var i=_(e[t]);R._jQueryInterface.call(i,i.data())}}),_.fn[a]=R._jQueryInterface,_.fn[a].Constructor=R,_.fn[a].noConflict=function(){return _.fn[a]=t,R._jQueryInterface},R}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("popper.js"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","popper.js","./util.js"],t):(e=e||self).Dropdown=t(e.jQuery,e.Popper,e.Util)}(this,function(u,o,s){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},t=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),t.forEach(function(e){var t,n,i;t=r,i=o[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return r}u=u&&u.hasOwnProperty("default")?u.default:u,o=o&&o.hasOwnProperty("default")?o.default:o,s=s&&s.hasOwnProperty("default")?s.default:s;var l="dropdown",h="bs.dropdown",d="."+h,e=".data-api",t=u.fn[l],f=new RegExp("38|40|27"),_={HIDE:"hide"+d,HIDDEN:"hidden"+d,SHOW:"show"+d,SHOWN:"shown"+d,CLICK:"click"+d,CLICK_DATA_API:"click"+d+e,KEYDOWN_DATA_API:"keydown"+d+e,KEYUP_DATA_API:"keyup"+d+e},m="disabled",g="show",p="dropup",v="dropright",y="dropleft",b="dropdown-menu-right",E="position-static",S='[data-toggle="dropdown"]',n=".dropdown form",w=".dropdown-menu",I=".navbar-nav",D=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",C="top-start",O="top-end",T="bottom-start",A="bottom-end",N="right-start",k="left-start",P={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},j={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},i=function(){function c(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e,t,n,i=c.prototype;return i.toggle=function(){if(!this._element.disabled&&!u(this._element).hasClass(m)){var e=c._getParentFromElement(this._element),t=u(this._menu).hasClass(g);if(c._clearMenus(),!t){var n={relatedTarget:this._element},i=u.Event(_.SHOW,n);if(u(e).trigger(i),!i.isDefaultPrevented()){if(!this._inNavbar){if(void 0===o)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var r=this._element;"parent"===this._config.reference?r=e:s.isElement(this._config.reference)&&(r=this._config.reference,void 0!==this._config.reference.jquery&&(r=this._config.reference[0])),"scrollParent"!==this._config.boundary&&u(e).addClass(E),this._popper=new o(r,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===u(e).closest(I).length&&u(document.body).children().on("mouseover",null,u.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),u(this._menu).toggleClass(g),u(e).toggleClass(g).trigger(u.Event(_.SHOWN,n))}}}},i.show=function(){if(!(this._element.disabled||u(this._element).hasClass(m)||u(this._menu).hasClass(g))){var e={relatedTarget:this._element},t=u.Event(_.SHOW,e),n=c._getParentFromElement(this._element);u(n).trigger(t),t.isDefaultPrevented()||(u(this._menu).toggleClass(g),u(n).toggleClass(g).trigger(u.Event(_.SHOWN,e)))}},i.hide=function(){if(!this._element.disabled&&!u(this._element).hasClass(m)&&u(this._menu).hasClass(g)){var e={relatedTarget:this._element},t=u.Event(_.HIDE,e),n=c._getParentFromElement(this._element);u(n).trigger(t),t.isDefaultPrevented()||(u(this._menu).toggleClass(g),u(n).toggleClass(g).trigger(u.Event(_.HIDDEN,e)))}},i.dispose=function(){u.removeData(this._element,h),u(this._element).off(d),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},i.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},i._addEventListeners=function(){var t=this;u(this._element).on(_.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},i._getConfig=function(e){return e=a({},this.constructor.Default,u(this._element).data(),e),s.typeCheckConfig(l,e,this.constructor.DefaultType),e},i._getMenuElement=function(){if(!this._menu){var e=c._getParentFromElement(this._element);e&&(this._menu=e.querySelector(w))}return this._menu},i._getPlacement=function(){var e=u(this._element.parentNode),t=T;return e.hasClass(p)?(t=C,u(this._menu).hasClass(b)&&(t=O)):e.hasClass(v)?t=N:e.hasClass(y)?t=k:u(this._menu).hasClass(b)&&(t=A),t},i._detectNavbar=function(){return 0<u(this._element).closest(".navbar").length},i._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},i._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(e.modifiers.applyStyle={enabled:!1}),e},c._jQueryInterface=function(t){return this.each(function(){var e=u(this).data(h);if(e||(e=new c(this,"object"==typeof t?t:null),u(this).data(h,e)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},c._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var t=[].slice.call(document.querySelectorAll(S)),n=0,i=t.length;n<i;n++){var r=c._getParentFromElement(t[n]),o=u(t[n]).data(h),s={relatedTarget:t[n]};if(e&&"click"===e.type&&(s.clickEvent=e),o){var a=o._menu;if(u(r).hasClass(g)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&u.contains(r,e.target))){var l=u.Event(_.HIDE,s);u(r).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&u(document.body).children().off("mouseover",null,u.noop),t[n].setAttribute("aria-expanded","false"),u(a).removeClass(g),u(r).removeClass(g).trigger(u.Event(_.HIDDEN,s)))}}}},c._getParentFromElement=function(e){var t,n=s.getSelectorFromElement(e);return n&&(t=document.querySelector(n)),t||e.parentNode},c._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||u(e.target).closest(w).length)):f.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!u(this).hasClass(m))){var t=c._getParentFromElement(this),n=u(t).hasClass(g);if(n&&(!n||27!==e.which&&32!==e.which)){var i=[].slice.call(t.querySelectorAll(D));if(0!==i.length){var r=i.indexOf(e.target);38===e.which&&0<r&&r--,40===e.which&&r<i.length-1&&r++,r<0&&(r=0),i[r].focus()}}else{if(27===e.which){var o=t.querySelector(S);u(o).trigger("focus")}u(this).trigger("click")}}},e=c,n=[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return P}},{key:"DefaultType",get:function(){return j}}],(t=null)&&r(e.prototype,t),n&&r(e,n),c}();return u(document).on(_.KEYDOWN_DATA_API,S,i._dataApiKeydownHandler).on(_.KEYDOWN_DATA_API,w,i._dataApiKeydownHandler).on(_.CLICK_DATA_API+" "+_.KEYUP_DATA_API,i._clearMenus).on(_.CLICK_DATA_API,S,function(e){e.preventDefault(),e.stopPropagation(),i._jQueryInterface.call(u(this),"toggle")}).on(_.CLICK_DATA_API,n,function(e){e.stopPropagation()}),u.fn[l]=i._jQueryInterface,u.fn[l].Constructor=i,u.fn[l].noConflict=function(){return u.fn[l]=t,i._jQueryInterface},i}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","./util.js"],t):(e=e||self).Modal=t(e.jQuery,e.Util)}(this,function(s,a){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},t=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),t.forEach(function(e){var t,n,i;t=r,i=o[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return r}s=s&&s.hasOwnProperty("default")?s.default:s,a=a&&a.hasOwnProperty("default")?a.default:a;var c="modal",u="bs.modal",h="."+u,e=s.fn[c],d={backdrop:!0,keyboard:!0,focus:!0,show:!0},f={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},_={HIDE:"hide"+h,HIDDEN:"hidden"+h,SHOW:"show"+h,SHOWN:"shown"+h,FOCUSIN:"focusin"+h,RESIZE:"resize"+h,CLICK_DISMISS:"click.dismiss"+h,KEYDOWN_DISMISS:"keydown.dismiss"+h,MOUSEUP_DISMISS:"mouseup.dismiss"+h,MOUSEDOWN_DISMISS:"mousedown.dismiss"+h,CLICK_DATA_API:"click"+h+".data-api"},m="modal-dialog-scrollable",g="modal-scrollbar-measure",p="modal-backdrop",v="modal-open",y="fade",b="show",E=".modal-dialog",S=".modal-body",t='[data-toggle="modal"]',w='[data-dismiss="modal"]',I=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",D=".sticky-top",C=function(){function r(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(E),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var e,t,n,i=r.prototype;return i.toggle=function(e){return this._isShown?this.hide():this.show(e)},i.show=function(e){var t=this;if(!this._isShown&&!this._isTransitioning){s(this._element).hasClass(y)&&(this._isTransitioning=!0);var n=s.Event(_.SHOW,{relatedTarget:e});s(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),s(this._element).on(_.CLICK_DISMISS,w,function(e){return t.hide(e)}),s(this._dialog).on(_.MOUSEDOWN_DISMISS,function(){s(t._element).one(_.MOUSEUP_DISMISS,function(e){s(e.target).is(t._element)&&(t._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return t._showElement(e)}))}},i.hide=function(e){var t=this;if(e&&e.preventDefault(),this._isShown&&!this._isTransitioning){var n=s.Event(_.HIDE);if(s(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=s(this._element).hasClass(y);if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),s(document).off(_.FOCUSIN),s(this._element).removeClass(b),s(this._element).off(_.CLICK_DISMISS),s(this._dialog).off(_.MOUSEDOWN_DISMISS),i){var r=a.getTransitionDurationFromElement(this._element);s(this._element).one(a.TRANSITION_END,function(e){return t._hideModal(e)}).emulateTransitionEnd(r)}else this._hideModal()}}},i.dispose=function(){[window,this._element,this._dialog].forEach(function(e){return s(e).off(h)}),s(document).off(_.FOCUSIN),s.removeData(this._element,u),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},i.handleUpdate=function(){this._adjustDialog()},i._getConfig=function(e){return e=l({},d,e),a.typeCheckConfig(c,e,f),e},i._showElement=function(e){var t=this,n=s(this._element).hasClass(y);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),s(this._dialog).hasClass(m)?this._dialog.querySelector(S).scrollTop=0:this._element.scrollTop=0,n&&a.reflow(this._element),s(this._element).addClass(b),this._config.focus&&this._enforceFocus();function i(){t._config.focus&&t._element.focus(),t._isTransitioning=!1,s(t._element).trigger(r)}var r=s.Event(_.SHOWN,{relatedTarget:e});if(n){var o=a.getTransitionDurationFromElement(this._dialog);s(this._dialog).one(a.TRANSITION_END,i).emulateTransitionEnd(o)}else i()},i._enforceFocus=function(){var t=this;s(document).off(_.FOCUSIN).on(_.FOCUSIN,function(e){document!==e.target&&t._element!==e.target&&0===s(t._element).has(e.target).length&&t._element.focus()})},i._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?s(this._element).on(_.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):this._isShown||s(this._element).off(_.KEYDOWN_DISMISS)},i._setResizeEvent=function(){var t=this;this._isShown?s(window).on(_.RESIZE,function(e){return t.handleUpdate(e)}):s(window).off(_.RESIZE)},i._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop(function(){s(document.body).removeClass(v),e._resetAdjustments(),e._resetScrollbar(),s(e._element).trigger(_.HIDDEN)})},i._removeBackdrop=function(){this._backdrop&&(s(this._backdrop).remove(),this._backdrop=null)},i._showBackdrop=function(e){var t=this,n=s(this._element).hasClass(y)?y:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=p,n&&this._backdrop.classList.add(n),s(this._backdrop).appendTo(document.body),s(this._element).on(_.CLICK_DISMISS,function(e){t._ignoreBackdropClick?t._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===t._config.backdrop?t._element.focus():t.hide())}),n&&a.reflow(this._backdrop),s(this._backdrop).addClass(b),!e)return;if(!n)return void e();var i=a.getTransitionDurationFromElement(this._backdrop);s(this._backdrop).one(a.TRANSITION_END,e).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){s(this._backdrop).removeClass(b);var r=function(){t._removeBackdrop(),e&&e()};if(s(this._element).hasClass(y)){var o=a.getTransitionDurationFromElement(this._backdrop);s(this._backdrop).one(a.TRANSITION_END,r).emulateTransitionEnd(o)}else r()}else e&&e()},i._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},i._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},i._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},i._setScrollbar=function(){var r=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(I)),t=[].slice.call(document.querySelectorAll(D));s(e).each(function(e,t){var n=t.style.paddingRight,i=s(t).css("padding-right");s(t).data("padding-right",n).css("padding-right",parseFloat(i)+r._scrollbarWidth+"px")}),s(t).each(function(e,t){var n=t.style.marginRight,i=s(t).css("margin-right");s(t).data("margin-right",n).css("margin-right",parseFloat(i)-r._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=s(document.body).css("padding-right");s(document.body).data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}s(document.body).addClass(v)},i._resetScrollbar=function(){var e=[].slice.call(document.querySelectorAll(I));s(e).each(function(e,t){var n=s(t).data("padding-right");s(t).removeData("padding-right"),t.style.paddingRight=n||""});var t=[].slice.call(document.querySelectorAll(""+D));s(t).each(function(e,t){var n=s(t).data("margin-right");void 0!==n&&s(t).css("margin-right",n).removeData("margin-right")});var n=s(document.body).data("padding-right");s(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},i._getScrollbarWidth=function(){var e=document.createElement("div");e.className=g,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},r._jQueryInterface=function(n,i){return this.each(function(){var e=s(this).data(u),t=l({},d,s(this).data(),"object"==typeof n&&n?n:{});if(e||(e=new r(this,t),s(this).data(u,e)),"string"==typeof n){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n](i)}else t.show&&e.show(i)})},e=r,n=[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return d}}],(t=null)&&o(e.prototype,t),n&&o(e,n),r}();return s(document).on(_.CLICK_DATA_API,t,function(e){var t,n=this,i=a.getSelectorFromElement(this);i&&(t=document.querySelector(i));var r=s(t).data(u)?"toggle":l({},s(t).data(),s(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var o=s(t).one(_.SHOW,function(e){e.isDefaultPrevented()||o.one(_.HIDDEN,function(){s(n).is(":visible")&&n.focus()})});C._jQueryInterface.call(s(t),r,this)}),s.fn[c]=C._jQueryInterface,s.fn[c].Constructor=C,s.fn[c].noConflict=function(){return s.fn[c]=e,C._jQueryInterface},C});