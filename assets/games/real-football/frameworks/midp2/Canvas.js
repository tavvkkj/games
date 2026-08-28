"use strict";
var _p = window;
var javax = (_p.javax = _p.javax || {});
var microedition = (_p.javax.microedition = _p.javax.microedition || {});
var lcdui = (_p.javax.microedition.lcdui = _p.javax.microedition.lcdui || {});
var MIDPCanvas = (_p.javax.microedition.lcdui.Canvas = Displayable.extend({
    _className: "MIDPCanvas",
    _htmlCanvasElement: null,
    _supportsFullScreen: false,
    _preOnFullScreenChange: null,
    _touchEvent: "",
    _fn: null,
    _isPointerDown: false,
    _fnMap: [
        ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement"],
        ["requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement"],
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement"],
        ["msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement"],
    ],
    ctor: function () {
        this._htmlCanvasElement = gloft.runtime.canvas;
        Displayable.prototype.ctor.call(this, this._htmlCanvasElement);
        this._fn = {};
        var d,
            a,
            f,
            e = this._fnMap,
            c;
        for (d = 0, a = e.length; d < a; d++) {
            f = e[d];
            if (f && f[1] in document) {
                for (d = 0, c = f.length; d < c; d++) {
                    this._fn[e[0][d]] = f[d];
                }
                break;
            }
        }
        this._supportsFullScreen = typeof this._fn.requestFullscreen !== "undefined";
        this._touchEvent = "ontouchstart" in window ? "touchstart" : "mousedown";
        this._htmlCanvasElement.keyPressedListener = this.keyPressed;
        this._htmlCanvasElement.keyReleasedListener = this.keyReleased;
        var b = this;
        gloft.runtime.onHidden = function () {
            b.hideNotify();
        };
        gloft.runtime.onShow = function () {
            b.showNotify();
        };
        this.registerInput();
    },
    keyPressed: function (a) {},
    keyReleased: function (a) {},
    hideNotify: function () {
        gloft.log("Canvas.hideNotify");
    },
    showNotify: function () {
        gloft.log("Canvas.showNotify");
    },
    serviceRepaints: function () {},
    repaint: function () {
        this.m_Graphics.setClip(0, 0, -1, -1);
        this.paint(this.m_Graphics);
    },
    paint: function (a) {},
    setFullScreenMode: function (a) {
        if (a) {
            //this.requestFullScreen();
        } else {
            this.exitFullScreen();
        }
    },
    fullScreen: function () {
        if (!this._supportsFullScreen) {
            return false;
        } else {
            if (document[this._fn.fullscreenElement] === undefined || document[this._fn.fullscreenElement] === null) {
                return false;
            } else {
                return true;
            }
        }
    },
    requestFullScreen: function (c, a) {
        if (!this._supportsFullScreen) {
            return;
        }
        c = c || document.documentElement;
        if (a) {
            var b = this._fn.fullscreenchange;
            if (this._preOnFullScreenChange) {
                document.removeEventListener(b, this._preOnFullScreenChange);
            }
            this._preOnFullScreenChange = a;
            document.addEventListener(b, a, false);
        }
        return c[this._fn.requestFullscreen]();
    },
    exitFullScreen: function () {
        return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : true;
    },
    autoFullScreen: function (c, a) {
        c = c || document.body;
        var e = gloft.runtime.canvas || c;
        var b = this;
        function d() {
            e.removeEventListener(b._touchEvent, d);
            b.requestFullScreen(c, a);
        }
        this.requestFullScreen(c, a);
        e.addEventListener(this._touchEvent, d);
    },
    registerInput: function () {
        var k = this;
        var h = gloft.runtime.canvas || document.body;
        var g = "ontouchstart" in window ? "touchstart" : "mousedown";
        var c = "ontouchstart" in window ? "touchend" : "mouseup";
        var j = "ontouchstart" in window ? "touchmove" : "mousemove";
        var i = "ontouchstart" in window ? "touchcancel" : "mouseleave";
        function b(m, z) {
            var u = -1,
                s = -1,
                t = 0;
            var q = m.changedTouches;
            if (q) {
                var o;
                var z = z;
                if (typeof z == "undefined") {
                    o = q[0];
                } else {
                    for (var p = 0, r = q.length; p < r; p++) {
                        if (q[p].identifier == z) {
                            o = q[p];
                            break;
                        }
                    }
                }
                if (o) {
                    u = o.pageX;
                    s = o.pageY;
                    t = o.identifier;
                }
            } else {
                u = m.pageX;
                s = m.pageY;
            }
            var l = m.currentTarget.getBoundingClientRect();
            var n = l.height / GLLib.s_screenHeight;
            var w = (u - (l.x ? l.x : l.left)) / n;
            var v = (s - (l.y ? (l.y < 0 ? 0 : l.y) : l.top < 0 ? 0 : l.top)) / n;
            return { x: w, y: v };
        }
        function a(m) {
            if (m && m.preventDefault) {
                try {
                    m.preventDefault();
                } catch (n) {}
            }
            k._isPointerDown = true;
            var l = b(m);
            k.pointerPressed(l.x, l.y);
        }
        function e(m) {
            if (m && m.preventDefault) {
                try {
                    m.preventDefault();
                } catch (n) {}
            }
            k._isPointerDown = false;
            var l = b(m);
            k.pointerReleased(l.x, l.y);
        }
        function f(m) {
            if (m && m.preventDefault) {
                try {
                    m.preventDefault();
                } catch (n) {}
            }
            if (k._isPointerDown == true) {
                var l = b(m);
                k.pointerDragged(l.x, l.y);
            }
        }
        function d(l) {
            k._isPointerDown = false;
        }
        h.addEventListener(g, a);
        h.addEventListener(c, e);
        h.addEventListener(j, f);
        h.addEventListener(i, d);
    },
}));
MIDPCanvas.UP = 1;
MIDPCanvas.DOWN = 6;
MIDPCanvas.LEFT = 2;
MIDPCanvas.RIGHT = 5;
MIDPCanvas.FIRE = 8;
MIDPCanvas.GAME_A = 9;
MIDPCanvas.GAME_B = 10;
MIDPCanvas.GAME_C = 11;
MIDPCanvas.GAME_D = 12;
MIDPCanvas.KEY_NUM0 = 48;
MIDPCanvas.KEY_NUM1 = 49;
MIDPCanvas.KEY_NUM2 = 50;
MIDPCanvas.KEY_NUM3 = 51;
MIDPCanvas.KEY_NUM4 = 52;
MIDPCanvas.KEY_NUM5 = 53;
MIDPCanvas.KEY_NUM6 = 54;
MIDPCanvas.KEY_NUM7 = 55;
MIDPCanvas.KEY_NUM8 = 56;
MIDPCanvas.KEY_NUM9 = 57;
MIDPCanvas.KEY_STAR = 42;
MIDPCanvas.KEY_POUND = 35;
