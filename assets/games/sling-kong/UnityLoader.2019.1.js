var UnityLoader = UnityLoader || {
    Compression: {
        identity: {
            require: function() {
                return {}
            },
            decompress: function(e) {
                return e
            }
        },
        gzip: {
            require: function(e) {
                var t = {
                    "inflate.js": function(e, t, r) {
                        "use strict";

                        function n(e) {
                            if (!(this instanceof n)) return new n(e);
                            this.options = s.assign({
                                chunkSize: 16384,
                                windowBits: 0,
                                to: ""
                            }, e || {});
                            var t = this.options;
                            t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c, this.strm.avail_out = 0;
                            var r = a.inflateInit2(this.strm, t.windowBits);
                            if (r !== l.Z_OK) throw new Error(u[r]);
                            this.header = new f, a.inflateGetHeader(this.strm, this.header)
                        }

                        function o(e, t) {
                            var r = new n(t);
                            if (r.push(e, !0), r.err) throw r.msg || u[r.err];
                            return r.result
                        }

                        function i(e, t) {
                            return t = t || {}, t.raw = !0, o(e, t)
                        }
                        var a = e("./zlib/inflate"),
                            s = e("./utils/common"),
                            d = e("./utils/strings"),
                            l = e("./zlib/constants"),
                            u = e("./zlib/messages"),
                            c = e("./zlib/zstream"),
                            f = e("./zlib/gzheader"),
                            h = Object.prototype.toString;
                        n.prototype.push = function(e, t) {
                            var r, n, o, i, u, c, f = this.strm,
                                p = this.options.chunkSize,
                                m = this.options.dictionary,
                                w = !1;
                            if (this.ended) return !1;
                            n = t === ~~t ? t : !0 === t ? l.Z_FINISH : l.Z_NO_FLUSH, "string" == typeof e ? f.input = d.binstring2buf(e) : "[object ArrayBuffer]" === h.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
                            do {
                                if (0 === f.avail_out && (f.output = new s.Buf8(p), f.next_out = 0, f.avail_out = p), r = a.inflate(f, l.Z_NO_FLUSH), r === l.Z_NEED_DICT && m && (c = "string" == typeof m ? d.string2buf(m) : "[object ArrayBuffer]" === h.call(m) ? new Uint8Array(m) : m, r = a.inflateSetDictionary(this.strm, c)), r === l.Z_BUF_ERROR && !0 === w && (r = l.Z_OK, w = !1), r !== l.Z_STREAM_END && r !== l.Z_OK) return this.onEnd(r), this.ended = !0, !1;
                                f.next_out && (0 !== f.avail_out && r !== l.Z_STREAM_END && (0 !== f.avail_in || n !== l.Z_FINISH && n !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (o = d.utf8border(f.output, f.next_out), i = f.next_out - o, u = d.buf2string(f.output, o), f.next_out = i, f.avail_out = p - i, i && s.arraySet(f.output, f.output, o, i, 0), this.onData(u)) : this.onData(s.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (w = !0)
                            } while ((f.avail_in > 0 || 0 === f.avail_out) && r !== l.Z_STREAM_END);
                            return r === l.Z_STREAM_END && (n = l.Z_FINISH), n === l.Z_FINISH ? (r = a.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l.Z_OK) : n !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), f.avail_out = 0, !0)
                        }, n.prototype.onData = function(e) {
                            this.chunks.push(e)
                        }, n.prototype.onEnd = function(e) {
                            e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                        }, r.Inflate = n, r.inflate = o, r.inflateRaw = i, r.ungzip = o
                    },
                    "utils/common.js": function(e, t, r) {
                        "use strict";
                        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                        r.assign = function(e) {
                            for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                                var r = t.shift();
                                if (r) {
                                    if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                                    for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                                }
                            }
                            return e
                        }, r.shrinkBuf = function(e, t) {
                            return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                        };
                        var o = {
                                arraySet: function(e, t, r, n, o) {
                                    if (t.subarray && e.subarray) return void e.set(t.subarray(r, r + n), o);
                                    for (var i = 0; i < n; i++) e[o + i] = t[r + i]
                                },
                                flattenChunks: function(e) {
                                    var t, r, n, o, i, a;
                                    for (n = 0, t = 0, r = e.length; t < r; t++) n += e[t].length;
                                    for (a = new Uint8Array(n), o = 0, t = 0, r = e.length; t < r; t++) i = e[t], a.set(i, o), o += i.length;
                                    return a
                                }
                            },
                            i = {
                                arraySet: function(e, t, r, n, o) {
                                    for (var i = 0; i < n; i++) e[o + i] = t[r + i]
                                },
                                flattenChunks: function(e) {
                                    return [].concat.apply([], e)
                                }
                            };
                        r.setTyped = function(e) {
                            e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, o)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, i))
                        }, r.setTyped(n)
                    },
                    "utils/strings.js": function(e, t, r) {
                        "use strict";

                        function n(e, t) {
                            if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, o.shrinkBuf(e, t));
                            for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
                            return r
                        }
                        var o = e("./common"),
                            i = !0,
                            a = !0;
                        try {
                            String.fromCharCode.apply(null, [0])
                        } catch (e) {
                            i = !1
                        }
                        try {
                            String.fromCharCode.apply(null, new Uint8Array(1))
                        } catch (e) {
                            a = !1
                        }
                        for (var s = new o.Buf8(256), d = 0; d < 256; d++) s[d] = d >= 252 ? 6 : d >= 248 ? 5 : d >= 240 ? 4 : d >= 224 ? 3 : d >= 192 ? 2 : 1;
                        s[254] = s[254] = 1, r.string2buf = function(e) {
                            var t, r, n, i, a, s = e.length,
                                d = 0;
                            for (i = 0; i < s; i++) r = e.charCodeAt(i), 55296 == (64512 & r) && i + 1 < s && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), d += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                            for (t = new o.Buf8(d), a = 0, i = 0; a < d; i++) r = e.charCodeAt(i), 55296 == (64512 & r) && i + 1 < s && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | 63 & r) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r);
                            return t
                        }, r.buf2binstring = function(e) {
                            return n(e, e.length)
                        }, r.binstring2buf = function(e) {
                            for (var t = new o.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
                            return t
                        }, r.buf2string = function(e, t) {
                            var r, o, i, a, d = t || e.length,
                                l = new Array(2 * d);
                            for (o = 0, r = 0; r < d;)
                                if ((i = e[r++]) < 128) l[o++] = i;
                                else if ((a = s[i]) > 4) l[o++] = 65533, r += a - 1;
                            else {
                                for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < d;) i = i << 6 | 63 & e[r++], a--;
                                a > 1 ? l[o++] = 65533 : i < 65536 ? l[o++] = i : (i -= 65536, l[o++] = 55296 | i >> 10 & 1023, l[o++] = 56320 | 1023 & i)
                            }
                            return n(l, o)
                        }, r.utf8border = function(e, t) {
                            var r;
                            for (t = t || e.length, t > e.length && (t = e.length), r = t - 1; r >= 0 && 128 == (192 & e[r]);) r--;
                            return r < 0 ? t : 0 === r ? t : r + s[e[r]] > t ? r : t
                        }
                    },
                    "zlib/inflate.js": function(e, t, r) {
                        "use strict";

                        function n(e) {
                            return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                        }

                        function o() {
                            this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new y.Buf16(320), this.work = new y.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                        }

                        function i(e) {
                            var t;
                            return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new y.Buf32(me), t.distcode = t.distdyn = new y.Buf32(we), t.sane = 1, t.back = -1, M) : R
                        }

                        function a(e) {
                            var t;
                            return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, i(e)) : R
                        }

                        function s(e, t) {
                            var r, n;
                            return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? R : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, a(e))) : R
                        }

                        function d(e, t) {
                            var r, n;
                            return e ? (n = new o, e.state = n, n.window = null, r = s(e, t), r !== M && (e.state = null), r) : R
                        }

                        function l(e) {
                            return d(e, ye)
                        }

                        function u(e) {
                            if (ge) {
                                var t;
                                for (w = new y.Buf32(512), b = new y.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                                for (; t < 256;) e.lens[t++] = 9;
                                for (; t < 280;) e.lens[t++] = 7;
                                for (; t < 288;) e.lens[t++] = 8;
                                for (U(E, e.lens, 0, 288, w, 0, e.work, {
                                        bits: 9
                                    }), t = 0; t < 32;) e.lens[t++] = 5;
                                U(k, e.lens, 0, 32, b, 0, e.work, {
                                    bits: 5
                                }), ge = !1
                            }
                            e.lencode = w, e.lenbits = 9, e.distcode = b, e.distbits = 5
                        }

                        function c(e, t, r, n) {
                            var o, i = e.state;
                            return null === i.window && (i.wsize = 1 << i.wbits, i.wnext = 0, i.whave = 0, i.window = new y.Buf8(i.wsize)), n >= i.wsize ? (y.arraySet(i.window, t, r - i.wsize, i.wsize, 0), i.wnext = 0, i.whave = i.wsize) : (o = i.wsize - i.wnext, o > n && (o = n), y.arraySet(i.window, t, r - n, o, i.wnext), n -= o, n ? (y.arraySet(i.window, t, r - n, n, 0), i.wnext = n, i.whave = i.wsize) : (i.wnext += o, i.wnext === i.wsize && (i.wnext = 0), i.whave < i.wsize && (i.whave += o))), 0
                        }

                        function f(e, t) {
                            var r, o, i, a, s, d, l, f, h, p, m, w, b, me, we, be, ye, ge, ve, Ae, Ue, xe, Ee, ke, Be = 0,
                                Le = new y.Buf8(4),
                                We = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                            if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return R;
                            r = e.state, r.mode === j && (r.mode = X), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, p = d, m = l, xe = M;
                            e: for (;;) switch (r.mode) {
                                case P:
                                    if (0 === r.wrap) {
                                        r.mode = X;
                                        break
                                    }
                                    for (; h < 16;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if (2 & r.wrap && 35615 === f) {
                                        r.check = 0, Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0), f = 0, h = 0, r.mode = T;
                                        break
                                    }
                                    if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                                        e.msg = "incorrect header check", r.mode = fe;
                                        break
                                    }
                                    if ((15 & f) !== S) {
                                        e.msg = "unknown compression method", r.mode = fe;
                                        break
                                    }
                                    if (f >>>= 4, h -= 4, Ue = 8 + (15 & f), 0 === r.wbits) r.wbits = Ue;
                                    else if (Ue > r.wbits) {
                                        e.msg = "invalid window size", r.mode = fe;
                                        break
                                    }
                                    r.dmax = 1 << Ue, e.adler = r.check = 1, r.mode = 512 & f ? G : j, f = 0, h = 0;
                                    break;
                                case T:
                                    for (; h < 16;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if (r.flags = f, (255 & r.flags) !== S) {
                                        e.msg = "unknown compression method", r.mode = fe;
                                        break
                                    }
                                    if (57344 & r.flags) {
                                        e.msg = "unknown header flags set", r.mode = fe;
                                        break
                                    }
                                    r.head && (r.head.text = f >> 8 & 1), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = D;
                                case D:
                                    for (; h < 32;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    r.head && (r.head.time = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, Le[2] = f >>> 16 & 255, Le[3] = f >>> 24 & 255, r.check = v(r.check, Le, 4, 0)), f = 0, h = 0, r.mode = F;
                                case F:
                                    for (; h < 16;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    r.head && (r.head.xflags = 255 & f, r.head.os = f >> 8), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = z;
                                case z:
                                    if (1024 & r.flags) {
                                        for (; h < 16;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        r.length = f, r.head && (r.head.extra_len = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0
                                    } else r.head && (r.head.extra = null);
                                    r.mode = V;
                                case V:
                                    if (1024 & r.flags && (w = r.length, w > d && (w = d), w && (r.head && (Ue = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), y.arraySet(r.head.extra, o, a, w, Ue)), 512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, r.length -= w), r.length)) break e;
                                    r.length = 0, r.mode = q;
                                case q:
                                    if (2048 & r.flags) {
                                        if (0 === d) break e;
                                        w = 0;
                                        do {
                                            Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.name += String.fromCharCode(Ue))
                                        } while (Ue && w < d);
                                        if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                                    } else r.head && (r.head.name = null);
                                    r.length = 0, r.mode = Z;
                                case Z:
                                    if (4096 & r.flags) {
                                        if (0 === d) break e;
                                        w = 0;
                                        do {
                                            Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.comment += String.fromCharCode(Ue))
                                        } while (Ue && w < d);
                                        if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                                    } else r.head && (r.head.comment = null);
                                    r.mode = Y;
                                case Y:
                                    if (512 & r.flags) {
                                        for (; h < 16;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        if (f !== (65535 & r.check)) {
                                            e.msg = "header crc mismatch", r.mode = fe;
                                            break
                                        }
                                        f = 0, h = 0
                                    }
                                    r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = j;
                                    break;
                                case G:
                                    for (; h < 32;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    e.adler = r.check = n(f), f = 0, h = 0, r.mode = J;
                                case J:
                                    if (0 === r.havedict) return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, N;
                                    e.adler = r.check = 1, r.mode = j;
                                case j:
                                    if (t === L || t === W) break e;
                                case X:
                                    if (r.last) {
                                        f >>>= 7 & h, h -= 7 & h, r.mode = le;
                                        break
                                    }
                                    for (; h < 3;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    switch (r.last = 1 & f, f >>>= 1, h -= 1, 3 & f) {
                                        case 0:
                                            r.mode = K;
                                            break;
                                        case 1:
                                            if (u(r), r.mode = re, t === W) {
                                                f >>>= 2, h -= 2;
                                                break e
                                            }
                                            break;
                                        case 2:
                                            r.mode = $;
                                            break;
                                        case 3:
                                            e.msg = "invalid block type", r.mode = fe
                                    }
                                    f >>>= 2, h -= 2;
                                    break;
                                case K:
                                    for (f >>>= 7 & h, h -= 7 & h; h < 32;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if ((65535 & f) != (f >>> 16 ^ 65535)) {
                                        e.msg = "invalid stored block lengths", r.mode = fe;
                                        break
                                    }
                                    if (r.length = 65535 & f, f = 0, h = 0, r.mode = Q, t === W) break e;
                                case Q:
                                    r.mode = _;
                                case _:
                                    if (w = r.length) {
                                        if (w > d && (w = d), w > l && (w = l), 0 === w) break e;
                                        y.arraySet(i, o, a, w, s), d -= w, a += w, l -= w, s += w, r.length -= w;
                                        break
                                    }
                                    r.mode = j;
                                    break;
                                case $:
                                    for (; h < 14;) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if (r.nlen = 257 + (31 & f), f >>>= 5, h -= 5, r.ndist = 1 + (31 & f), f >>>= 5, h -= 5, r.ncode = 4 + (15 & f), f >>>= 4, h -= 4, r.nlen > 286 || r.ndist > 30) {
                                        e.msg = "too many length or distance symbols", r.mode = fe;
                                        break
                                    }
                                    r.have = 0, r.mode = ee;
                                case ee:
                                    for (; r.have < r.ncode;) {
                                        for (; h < 3;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        r.lens[We[r.have++]] = 7 & f, f >>>= 3, h -= 3
                                    }
                                    for (; r.have < 19;) r.lens[We[r.have++]] = 0;
                                    if (r.lencode = r.lendyn, r.lenbits = 7, Ee = {
                                            bits: r.lenbits
                                        }, xe = U(x, r.lens, 0, 19, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                                        e.msg = "invalid code lengths set", r.mode = fe;
                                        break
                                    }
                                    r.have = 0, r.mode = te;
                                case te:
                                    for (; r.have < r.nlen + r.ndist;) {
                                        for (; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        if (ye < 16) f >>>= we, h -= we, r.lens[r.have++] = ye;
                                        else {
                                            if (16 === ye) {
                                                for (ke = we + 2; h < ke;) {
                                                    if (0 === d) break e;
                                                    d--, f += o[a++] << h, h += 8
                                                }
                                                if (f >>>= we, h -= we, 0 === r.have) {
                                                    e.msg = "invalid bit length repeat", r.mode = fe;
                                                    break
                                                }
                                                Ue = r.lens[r.have - 1], w = 3 + (3 & f), f >>>= 2, h -= 2
                                            } else if (17 === ye) {
                                                for (ke = we + 3; h < ke;) {
                                                    if (0 === d) break e;
                                                    d--, f += o[a++] << h, h += 8
                                                }
                                                f >>>= we, h -= we, Ue = 0, w = 3 + (7 & f), f >>>= 3, h -= 3
                                            } else {
                                                for (ke = we + 7; h < ke;) {
                                                    if (0 === d) break e;
                                                    d--, f += o[a++] << h, h += 8
                                                }
                                                f >>>= we, h -= we, Ue = 0, w = 11 + (127 & f), f >>>= 7, h -= 7
                                            }
                                            if (r.have + w > r.nlen + r.ndist) {
                                                e.msg = "invalid bit length repeat", r.mode = fe;
                                                break
                                            }
                                            for (; w--;) r.lens[r.have++] = Ue
                                        }
                                    }
                                    if (r.mode === fe) break;
                                    if (0 === r.lens[256]) {
                                        e.msg = "invalid code -- missing end-of-block", r.mode = fe;
                                        break
                                    }
                                    if (r.lenbits = 9, Ee = {
                                            bits: r.lenbits
                                        }, xe = U(E, r.lens, 0, r.nlen, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                                        e.msg = "invalid literal/lengths set", r.mode = fe;
                                        break
                                    }
                                    if (r.distbits = 6, r.distcode = r.distdyn, Ee = {
                                            bits: r.distbits
                                        }, xe = U(k, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Ee), r.distbits = Ee.bits, xe) {
                                        e.msg = "invalid distances set", r.mode = fe;
                                        break
                                    }
                                    if (r.mode = re, t === W) break e;
                                case re:
                                    r.mode = ne;
                                case ne:
                                    if (d >= 6 && l >= 258) {
                                        e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, A(e, m), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, r.mode === j && (r.back = -1);
                                        break
                                    }
                                    for (r.back = 0; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if (be && 0 == (240 & be)) {
                                        for (ge = we, ve = be, Ae = ye; Be = r.lencode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        f >>>= ge, h -= ge, r.back += ge
                                    }
                                    if (f >>>= we, h -= we, r.back += we, r.length = ye, 0 === be) {
                                        r.mode = de;
                                        break
                                    }
                                    if (32 & be) {
                                        r.back = -1, r.mode = j;
                                        break
                                    }
                                    if (64 & be) {
                                        e.msg = "invalid literal/length code", r.mode = fe;
                                        break
                                    }
                                    r.extra = 15 & be, r.mode = oe;
                                case oe:
                                    if (r.extra) {
                                        for (ke = r.extra; h < ke;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        r.length += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                                    }
                                    r.was = r.length, r.mode = ie;
                                case ie:
                                    for (; Be = r.distcode[f & (1 << r.distbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                                        if (0 === d) break e;
                                        d--, f += o[a++] << h, h += 8
                                    }
                                    if (0 == (240 & be)) {
                                        for (ge = we, ve = be, Ae = ye; Be = r.distcode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        f >>>= ge, h -= ge, r.back += ge
                                    }
                                    if (f >>>= we, h -= we, r.back += we, 64 & be) {
                                        e.msg = "invalid distance code", r.mode = fe;
                                        break
                                    }
                                    r.offset = ye, r.extra = 15 & be, r.mode = ae;
                                case ae:
                                    if (r.extra) {
                                        for (ke = r.extra; h < ke;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        r.offset += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                                    }
                                    if (r.offset > r.dmax) {
                                        e.msg = "invalid distance too far back", r.mode = fe;
                                        break
                                    }
                                    r.mode = se;
                                case se:
                                    if (0 === l) break e;
                                    if (w = m - l, r.offset > w) {
                                        if ((w = r.offset - w) > r.whave && r.sane) {
                                            e.msg = "invalid distance too far back", r.mode = fe;
                                            break
                                        }
                                        w > r.wnext ? (w -= r.wnext, b = r.wsize - w) : b = r.wnext - w, w > r.length && (w = r.length), me = r.window
                                    } else me = i, b = s - r.offset, w = r.length;
                                    w > l && (w = l), l -= w, r.length -= w;
                                    do {
                                        i[s++] = me[b++]
                                    } while (--w);
                                    0 === r.length && (r.mode = ne);
                                    break;
                                case de:
                                    if (0 === l) break e;
                                    i[s++] = r.length, l--, r.mode = ne;
                                    break;
                                case le:
                                    if (r.wrap) {
                                        for (; h < 32;) {
                                            if (0 === d) break e;
                                            d--, f |= o[a++] << h, h += 8
                                        }
                                        if (m -= l, e.total_out += m, r.total += m, m && (e.adler = r.check = r.flags ? v(r.check, i, m, s - m) : g(r.check, i, m, s - m)), m = l, (r.flags ? f : n(f)) !== r.check) {
                                            e.msg = "incorrect data check", r.mode = fe;
                                            break
                                        }
                                        f = 0, h = 0
                                    }
                                    r.mode = ue;
                                case ue:
                                    if (r.wrap && r.flags) {
                                        for (; h < 32;) {
                                            if (0 === d) break e;
                                            d--, f += o[a++] << h, h += 8
                                        }
                                        if (f !== (4294967295 & r.total)) {
                                            e.msg = "incorrect length check", r.mode = fe;
                                            break
                                        }
                                        f = 0, h = 0
                                    }
                                    r.mode = ce;
                                case ce:
                                    xe = O;
                                    break e;
                                case fe:
                                    xe = C;
                                    break e;
                                case he:
                                    return I;
                                case pe:
                                default:
                                    return R
                            }
                            return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, (r.wsize || m !== e.avail_out && r.mode < fe && (r.mode < le || t !== B)) && c(e, e.output, e.next_out, m - e.avail_out) ? (r.mode = he, I) : (p -= e.avail_in, m -= e.avail_out, e.total_in += p, e.total_out += m, r.total += m, r.wrap && m && (e.adler = r.check = r.flags ? v(r.check, i, m, e.next_out - m) : g(r.check, i, m, e.next_out - m)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === j ? 128 : 0) + (r.mode === re || r.mode === Q ? 256 : 0), (0 === p && 0 === m || t === B) && xe === M && (xe = H), xe)
                        }

                        function h(e) {
                            if (!e || !e.state) return R;
                            var t = e.state;
                            return t.window && (t.window = null), e.state = null, M
                        }

                        function p(e, t) {
                            var r;
                            return e && e.state ? (r = e.state, 0 == (2 & r.wrap) ? R : (r.head = t, t.done = !1, M)) : R
                        }

                        function m(e, t) {
                            var r, n, i = t.length;
                            return e && e.state ? (r = e.state, 0 !== r.wrap && r.mode !== J ? R : r.mode === J && (n = 1, (n = g(n, t, i, 0)) !== r.check) ? C : c(e, t, i, i) ? (r.mode = he, I) : (r.havedict = 1, M)) : R
                        }
                        var w, b, y = e("../utils/common"),
                            g = e("./adler32"),
                            v = e("./crc32"),
                            A = e("./inffast"),
                            U = e("./inftrees"),
                            x = 0,
                            E = 1,
                            k = 2,
                            B = 4,
                            L = 5,
                            W = 6,
                            M = 0,
                            O = 1,
                            N = 2,
                            R = -2,
                            C = -3,
                            I = -4,
                            H = -5,
                            S = 8,
                            P = 1,
                            T = 2,
                            D = 3,
                            F = 4,
                            z = 5,
                            V = 6,
                            q = 7,
                            Z = 8,
                            Y = 9,
                            G = 10,
                            J = 11,
                            j = 12,
                            X = 13,
                            K = 14,
                            Q = 15,
                            _ = 16,
                            $ = 17,
                            ee = 18,
                            te = 19,
                            re = 20,
                            ne = 21,
                            oe = 22,
                            ie = 23,
                            ae = 24,
                            se = 25,
                            de = 26,
                            le = 27,
                            ue = 28,
                            ce = 29,
                            fe = 30,
                            he = 31,
                            pe = 32,
                            me = 852,
                            we = 592,
                            ye = 15,
                            ge = !0;
                        r.inflateReset = a, r.inflateReset2 = s, r.inflateResetKeep = i, r.inflateInit = l, r.inflateInit2 = d, r.inflate = f, r.inflateEnd = h, r.inflateGetHeader = p, r.inflateSetDictionary = m, r.inflateInfo = "pako inflate (from Nodeca project)"
                    },
                    "zlib/constants.js": function(e, t, r) {
                        "use strict";
                        t.exports = {
                            Z_NO_FLUSH: 0,
                            Z_PARTIAL_FLUSH: 1,
                            Z_SYNC_FLUSH: 2,
                            Z_FULL_FLUSH: 3,
                            Z_FINISH: 4,
                            Z_BLOCK: 5,
                            Z_TREES: 6,
                            Z_OK: 0,
                            Z_STREAM_END: 1,
                            Z_NEED_DICT: 2,
                            Z_ERRNO: -1,
                            Z_STREAM_ERROR: -2,
                            Z_DATA_ERROR: -3,
                            Z_BUF_ERROR: -5,
                            Z_NO_COMPRESSION: 0,
                            Z_BEST_SPEED: 1,
                            Z_BEST_COMPRESSION: 9,
                            Z_DEFAULT_COMPRESSION: -1,
                            Z_FILTERED: 1,
                            Z_HUFFMAN_ONLY: 2,
                            Z_RLE: 3,
                            Z_FIXED: 4,
                            Z_DEFAULT_STRATEGY: 0,
                            Z_BINARY: 0,
                            Z_TEXT: 1,
                            Z_UNKNOWN: 2,
                            Z_DEFLATED: 8
                        }
                    },
                    "zlib/messages.js": function(e, t, r) {
                        "use strict";
                        t.exports = {
                            2: "need dictionary",
                            1: "stream end",
                            0: "",
                            "-1": "file error",
                            "-2": "stream error",
                            "-3": "data error",
                            "-4": "insufficient memory",
                            "-5": "buffer error",
                            "-6": "incompatible version"
                        }
                    },
                    "zlib/zstream.js": function(e, t, r) {
                        "use strict";

                        function n() {
                            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                        }
                        t.exports = n
                    },
                    "zlib/gzheader.js": function(e, t, r) {
                        "use strict";

                        function n() {
                            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                        }
                        t.exports = n
                    },
                    "zlib/adler32.js": function(e, t, r) {
                        "use strict";

                        function n(e, t, r, n) {
                            for (var o = 65535 & e | 0, i = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                                a = r > 2e3 ? 2e3 : r, r -= a;
                                do {
                                    o = o + t[n++] | 0, i = i + o | 0
                                } while (--a);
                                o %= 65521, i %= 65521
                            }
                            return o | i << 16 | 0
                        }
                        t.exports = n
                    },
                    "zlib/crc32.js": function(e, t, r) {
                        "use strict";

                        function o(e, t, r, n) {
                            var o = i,
                                a = n + r;
                            e ^= -1;
                            for (var s = n; s < a; s++) e = e >>> 8 ^ o[255 & (e ^ t[s])];
                            return -1 ^ e
                        }
                        var i = function() {
                            for (var e, t = [], r = 0; r < 256; r++) {
                                e = r;
                                for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                                t[r] = e
                            }
                            return t
                        }();
                        t.exports = o
                    },
                    "zlib/inffast.js": function(e, t, r) {
                        "use strict";
                        t.exports = function(e, t) {
                            var r, i, a, s, d, l, u, c, f, h, p, m, w, b, y, g, v, A, U, x, E, k, B, L, W;
                            r = e.state, i = e.next_in, L = e.input, a = i + (e.avail_in - 5), s = e.next_out, W = e.output, d = s - (t - e.avail_out), l = s + (e.avail_out - 257), u = r.dmax, c = r.wsize, f = r.whave, h = r.wnext, p = r.window, m = r.hold, w = r.bits, b = r.lencode, y = r.distcode, g = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
                            e: do {
                                w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = b[m & g];
                                t: for (;;) {
                                    if (U = A >>> 24, m >>>= U, w -= U, 0 === (U = A >>> 16 & 255)) W[s++] = 65535 & A;
                                    else {
                                        if (!(16 & U)) {
                                            if (0 == (64 & U)) {
                                                A = b[(65535 & A) + (m & (1 << U) - 1)];
                                                continue t
                                            }
                                            if (32 & U) {
                                                r.mode = 12;
                                                break e
                                            }
                                            e.msg = "invalid literal/length code", r.mode = 30;
                                            break e
                                        }
                                        x = 65535 & A, U &= 15, U && (w < U && (m += L[i++] << w, w += 8), x += m & (1 << U) - 1, m >>>= U, w -= U), w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = y[m & v];
                                        r: for (;;) {
                                            if (U = A >>> 24, m >>>= U, w -= U, !(16 & (U = A >>> 16 & 255))) {
                                                if (0 == (64 & U)) {
                                                    A = y[(65535 & A) + (m & (1 << U) - 1)];
                                                    continue r
                                                }
                                                e.msg = "invalid distance code", r.mode = 30;
                                                break e
                                            }
                                            if (E = 65535 & A, U &= 15, w < U && (m += L[i++] << w, (w += 8) < U && (m += L[i++] << w, w += 8)), (E += m & (1 << U) - 1) > u) {
                                                e.msg = "invalid distance too far back", r.mode = 30;
                                                break e
                                            }
                                            if (m >>>= U, w -= U, U = s - d, E > U) {
                                                if ((U = E - U) > f && r.sane) {
                                                    e.msg = "invalid distance too far back", r.mode = 30;
                                                    break e
                                                }
                                                if (k = 0, B = p, 0 === h) {
                                                    if (k += c - U, U < x) {
                                                        x -= U;
                                                        do {
                                                            W[s++] = p[k++]
                                                        } while (--U);
                                                        k = s - E, B = W
                                                    }
                                                } else if (h < U) {
                                                    if (k += c + h - U, (U -= h) < x) {
                                                        x -= U;
                                                        do {
                                                            W[s++] = p[k++]
                                                        } while (--U);
                                                        if (k = 0, h < x) {
                                                            U = h, x -= U;
                                                            do {
                                                                W[s++] = p[k++]
                                                            } while (--U);
                                                            k = s - E, B = W
                                                        }
                                                    }
                                                } else if (k += h - U, U < x) {
                                                    x -= U;
                                                    do {
                                                        W[s++] = p[k++]
                                                    } while (--U);
                                                    k = s - E, B = W
                                                }
                                                for (; x > 2;) W[s++] = B[k++], W[s++] = B[k++], W[s++] = B[k++], x -= 3;
                                                x && (W[s++] = B[k++], x > 1 && (W[s++] = B[k++]))
                                            } else {
                                                k = s - E;
                                                do {
                                                    W[s++] = W[k++], W[s++] = W[k++], W[s++] = W[k++], x -= 3
                                                } while (x > 2);
                                                x && (W[s++] = W[k++], x > 1 && (W[s++] = W[k++]))
                                            }
                                            break
                                        }
                                    }
                                    break
                                }
                            } while (i < a && s < l);
                            x = w >> 3, i -= x, w -= x << 3, m &= (1 << w) - 1, e.next_in = i, e.next_out = s, e.avail_in = i < a ? a - i + 5 : 5 - (i - a), e.avail_out = s < l ? l - s + 257 : 257 - (s - l), r.hold = m, r.bits = w
                        }
                    },
                    "zlib/inftrees.js": function(e, t, r) {
                        "use strict";
                        var n = e("../utils/common"),
                            o = 15,
                            u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                            c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                            f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                            h = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                        t.exports = function(e, t, r, p, m, w, b, y) {
                            var g, v, A, U, x, E, k, B, L, W = y.bits,
                                M = 0,
                                O = 0,
                                N = 0,
                                R = 0,
                                C = 0,
                                I = 0,
                                H = 0,
                                S = 0,
                                P = 0,
                                T = 0,
                                D = null,
                                F = 0,
                                z = new n.Buf16(16),
                                V = new n.Buf16(16),
                                q = null,
                                Z = 0;
                            for (M = 0; M <= o; M++) z[M] = 0;
                            for (O = 0; O < p; O++) z[t[r + O]]++;
                            for (C = W, R = o; R >= 1 && 0 === z[R]; R--);
                            if (C > R && (C = R), 0 === R) return m[w++] = 20971520, m[w++] = 20971520, y.bits = 1, 0;
                            for (N = 1; N < R && 0 === z[N]; N++);
                            for (C < N && (C = N), S = 1, M = 1; M <= o; M++)
                                if (S <<= 1, (S -= z[M]) < 0) return -1;
                            if (S > 0 && (0 === e || 1 !== R)) return -1;
                            for (V[1] = 0, M = 1; M < o; M++) V[M + 1] = V[M] + z[M];
                            for (O = 0; O < p; O++) 0 !== t[r + O] && (b[V[t[r + O]]++] = O);
                            if (0 === e ? (D = q = b, E = 19) : 1 === e ? (D = u, F -= 257, q = c, Z -= 257, E = 256) : (D = f, q = h, E = -1), T = 0, O = 0, M = N, x = w, I = C, H = 0, A = -1, P = 1 << C, U = P - 1, 1 === e && P > 852 || 2 === e && P > 592) return 1;
                            for (;;) {
                                k = M - H, b[O] < E ? (B = 0, L = b[O]) : b[O] > E ? (B = q[Z + b[O]], L = D[F + b[O]]) : (B = 96, L = 0), g = 1 << M - H, v = 1 << I, N = v;
                                do {
                                    v -= g, m[x + (T >> H) + v] = k << 24 | B << 16 | L | 0
                                } while (0 !== v);
                                for (g = 1 << M - 1; T & g;) g >>= 1;
                                if (0 !== g ? (T &= g - 1, T += g) : T = 0, O++, 0 == --z[M]) {
                                    if (M === R) break;
                                    M = t[r + b[O]]
                                }
                                if (M > C && (T & U) !== A) {
                                    for (0 === H && (H = C), x += N, I = M - H, S = 1 << I; I + H < R && !((S -= z[I + H]) <= 0);) I++, S <<= 1;
                                    if (P += 1 << I, 1 === e && P > 852 || 2 === e && P > 592) return 1;
                                    A = T & U, m[A] = C << 24 | I << 16 | x - w | 0
                                }
                            }
                            return 0 !== T && (m[x + T] = M - H << 24 | 64 << 16 | 0), y.bits = C, 0
                        }
                    }
                };
                for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
                var n = function(e) {
                        var r = [];
                        return e = e.split("/").every(function(e) {
                            return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
                        }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
                    },
                    o = function(e, t) {
                        return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
                    },
                    i = function(e, t) {
                        var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
                        if (!r) throw "module not found: " + t;
                        return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
                    };
                return i(null, e)
            },
            decompress: function(e) {
                this.exports || (this.exports = this.require("inflate.js"));
                try {
                    return this.exports.inflate(e)
                } catch (e) {}
            },
            hasUnityMarker: function(e) {
                var t = 10,
                    r = "UnityWeb Compressed Content (gzip)";
                if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
                var n = e[3];
                if (4 & n) {
                    if (t + 2 > e.length) return !1;
                    if ((t += 2 + e[t] + (e[t + 1] << 8)) > e.length) return !1
                }
                if (8 & n) {
                    for (; t < e.length && e[t];) t++;
                    if (t + 1 > e.length) return !1;
                    t++
                }
                return 16 & n && String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) == r + "\0"
            }
        },
        brotli: {
            require: function(e) {
                var t = {
                    "decompress.js": function(e, t, r) {
                        t.exports = e("./dec/decode").BrotliDecompressBuffer
                    },
                    "dec/bit_reader.js": function(e, t, r) {
                        function n(e) {
                            this.buf_ = new Uint8Array(i), this.input_ = e, this.reset()
                        }
                        const o = 4096,
                            i = 8224,
                            s = new Uint32Array([]);
                        n.READ_SIZE = o, n.IBUF_MASK = 8191, n.prototype.reset = function() {
                            this.buf_ptr_ = 0, this.val_ = 0, this.pos_ = 0, this.bit_pos_ = 0, this.bit_end_pos_ = 0, this.eos_ = 0, this.readMoreInput();
                            for (var e = 0; e < 4; e++) this.val_ |= this.buf_[this.pos_] << 8 * e, ++this.pos_;
                            return this.bit_end_pos_ > 0
                        }, n.prototype.readMoreInput = function() {
                            if (!(this.bit_end_pos_ > 256))
                                if (this.eos_) {
                                    if (this.bit_pos_ > this.bit_end_pos_) throw new Error("Unexpected end of input " + this.bit_pos_ + " " + this.bit_end_pos_)
                                } else {
                                    var e = this.buf_ptr_,
                                        t = this.input_.read(this.buf_, e, o);
                                    if (t < 0) throw new Error("Unexpected end of input");
                                    if (t < o) {
                                        this.eos_ = 1;
                                        for (var r = 0; r < 32; r++) this.buf_[e + t + r] = 0
                                    }
                                    if (0 === e) {
                                        for (var r = 0; r < 32; r++) this.buf_[8192 + r] = this.buf_[r];
                                        this.buf_ptr_ = o
                                    } else this.buf_ptr_ = 0;
                                    this.bit_end_pos_ += t << 3
                                }
                        }, n.prototype.fillBitWindow = function() {
                            for (; this.bit_pos_ >= 8;) this.val_ >>>= 8, this.val_ |= this.buf_[8191 & this.pos_] << 24, ++this.pos_, this.bit_pos_ = this.bit_pos_ - 8 >>> 0, this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0
                        }, n.prototype.readBits = function(e) {
                            32 - this.bit_pos_ < e && this.fillBitWindow();
                            var t = this.val_ >>> this.bit_pos_ & s[e];
                            return this.bit_pos_ += e, t
                        }, t.exports = n
                    },
                    "dec/context.js": function(e, t, r) {
                        r.lookup = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), r.lookupOffsets = new Uint16Array([1024, 1536, 1280, 1536, 0, 256, 768, 512])
                    },
                    "dec/decode.js": function(e, t, r) {
                        function n(e) {
                            var t;
                            return 0 === e.readBits(1) ? 16 : (t = e.readBits(3), t > 0 ? 17 + t : (t = e.readBits(3), t > 0 ? 8 + t : 17))
                        }

                        function o(e) {
                            if (e.readBits(1)) {
                                var t = e.readBits(3);
                                return 0 === t ? 1 : e.readBits(t) + (1 << t)
                            }
                            return 0
                        }

                        function i() {
                            this.meta_block_length = 0, this.input_end = 0, this.is_uncompressed = 0, this.is_metadata = !1
                        }

                        function a(e) {
                            var t, r, n, o = new i;
                            if (o.input_end = e.readBits(1), o.input_end && e.readBits(1)) return o;
                            if (7 === (t = e.readBits(2) + 4)) {
                                if (o.is_metadata = !0, 0 !== e.readBits(1)) throw new Error("Invalid reserved bit");
                                if (0 === (r = e.readBits(2))) return o;
                                for (n = 0; n < r; n++) {
                                    var a = e.readBits(8);
                                    if (n + 1 === r && r > 1 && 0 === a) throw new Error("Invalid size byte");
                                    o.meta_block_length |= a << 8 * n
                                }
                            } else
                                for (n = 0; n < t; ++n) {
                                    var s = e.readBits(4);
                                    if (n + 1 === t && t > 4 && 0 === s) throw new Error("Invalid size nibble");
                                    o.meta_block_length |= s << 4 * n
                                }
                            return ++o.meta_block_length, o.input_end || o.is_metadata || (o.is_uncompressed = e.readBits(1)), o
                        }

                        function s(e, t, r) {
                            var n;
                            return r.fillBitWindow(), t += r.val_ >>> r.bit_pos_ & D, n = e[t].bits - T, n > 0 && (r.bit_pos_ += T, t += e[t].value, t += r.val_ >>> r.bit_pos_ & (1 << n) - 1), r.bit_pos_ += e[t].bits, e[t].value
                        }

                        function d(e, t, r, n) {
                            for (var o = 0, i = N, a = 0, s = 0, d = 32768, l = [], u = 0; u < 32; u++) l.push(new B(0, 0));
                            for (L(l, 0, 5, e, z); o < t && d > 0;) {
                                var c, f = 0;
                                if (n.readMoreInput(), n.fillBitWindow(), f += n.val_ >>> n.bit_pos_ & 31, n.bit_pos_ += l[f].bits, (c = 255 & l[f].value) < R) a = 0, r[o++] = c, 0 !== c && (i = c, d -= 32768 >> c);
                                else {
                                    var h, p, m = c - 14,
                                        w = 0;
                                    if (c === R && (w = i), s !== w && (a = 0, s = w), h = a, a > 0 && (a -= 2, a <<= m), a += n.readBits(m) + 3, p = a - h, o + p > t) throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");
                                    for (var b = 0; b < p; b++) r[o + b] = s;
                                    o += p, 0 !== s && (d -= p << 15 - s)
                                }
                            }
                            if (0 !== d) throw new Error("[ReadHuffmanCodeLengths] space = " + d);
                            for (; o < t; o++) r[o] = 0
                        }

                        function l(e, t, r, n) {
                            var o, i = 0,
                                a = new Uint8Array(e);
                            if (n.readMoreInput(), 1 === (o = n.readBits(2))) {
                                for (var s, l = e - 1, u = 0, c = new Int32Array(4), f = n.readBits(2) + 1; l;) l >>= 1, ++u;
                                for (s = 0; s < f; ++s) c[s] = n.readBits(u) % e, a[c[s]] = 2;
                                switch (a[c[0]] = 1, f) {
                                    case 1:
                                        break;
                                    case 3:
                                        if (c[0] === c[1] || c[0] === c[2] || c[1] === c[2]) throw new Error("[ReadHuffmanCode] invalid symbols");
                                        break;
                                    case 2:
                                        if (c[0] === c[1]) throw new Error("[ReadHuffmanCode] invalid symbols");
                                        a[c[1]] = 1;
                                        break;
                                    case 4:
                                        if (c[0] === c[1] || c[0] === c[2] || c[0] === c[3] || c[1] === c[2] || c[1] === c[3] || c[2] === c[3]) throw new Error("[ReadHuffmanCode] invalid symbols");
                                        n.readBits(1) ? (a[c[2]] = 3, a[c[3]] = 3) : a[c[0]] = 2
                                }
                            } else {
                                var s, h = new Uint8Array(z),
                                    p = 32,
                                    m = 0,
                                    w = [new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 1), new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 5)];
                                for (s = o; s < z && p > 0; ++s) {
                                    var b, y = V[s],
                                        g = 0;
                                    n.fillBitWindow(), g += n.val_ >>> n.bit_pos_ & 15, n.bit_pos_ += w[g].bits, b = w[g].value, h[y] = b,
                                        0 !== b && (p -= 32 >> b, ++m)
                                }
                                if (1 !== m && 0 !== p) throw new Error("[ReadHuffmanCode] invalid num_codes or space");
                                d(h, e, a, n)
                            }
                            if (0 === (i = L(t, r, T, a, e))) throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
                            return i
                        }

                        function u(e, t, r) {
                            var n, o;
                            return n = s(e, t, r), o = M.kBlockLengthPrefixCode[n].nbits, M.kBlockLengthPrefixCode[n].offset + r.readBits(o)
                        }

                        function c(e, t, r) {
                            var n;
                            return e < q ? (r += Z[e], r &= 3, n = t[r] + Y[e]) : n = e - q + 1, n
                        }

                        function f(e, t) {
                            for (var r = e[t], n = t; n; --n) e[n] = e[n - 1];
                            e[0] = r
                        }

                        function h(e, t) {
                            var r, n = new Uint8Array(256);
                            for (r = 0; r < 256; ++r) n[r] = r;
                            for (r = 0; r < t; ++r) {
                                var o = e[r];
                                e[r] = n[o], o && f(n, o)
                            }
                        }

                        function p(e, t) {
                            this.alphabet_size = e, this.num_htrees = t, this.codes = new Array(t + t * G[e + 31 >>> 5]), this.htrees = new Uint32Array(t)
                        }

                        function m(e, t) {
                            var r, n, i, a = {
                                    num_htrees: null,
                                    context_map: null
                                },
                                d = 0;
                            t.readMoreInput();
                            var u = a.num_htrees = o(t) + 1,
                                c = a.context_map = new Uint8Array(e);
                            if (u <= 1) return a;
                            for (r = t.readBits(1), r && (d = t.readBits(4) + 1), n = [], i = 0; i < F; i++) n[i] = new B(0, 0);
                            for (l(u + d, n, 0, t), i = 0; i < e;) {
                                var f;
                                if (t.readMoreInput(), 0 === (f = s(n, 0, t))) c[i] = 0, ++i;
                                else if (f <= d)
                                    for (var p = 1 + (1 << f) + t.readBits(f); --p;) {
                                        if (i >= e) throw new Error("[DecodeContextMap] i >= context_map_size");
                                        c[i] = 0, ++i
                                    } else c[i] = f - d, ++i
                            }
                            return t.readBits(1) && h(c, e), a
                        }

                        function w(e, t, r, n, o, i, a) {
                            var d, l = 2 * r,
                                u = r,
                                c = s(t, r * F, a);
                            d = 0 === c ? o[l + (1 & i[u])] : 1 === c ? o[l + (i[u] - 1 & 1)] + 1 : c - 2, d >= e && (d -= e), n[r] = d, o[l + (1 & i[u])] = d, ++i[u]
                        }

                        function b(e, t, r, n, o, i) {
                            var a, s = o + 1,
                                d = r & o,
                                l = i.pos_ & E.IBUF_MASK;
                            if (t < 8 || i.bit_pos_ + (t << 3) < i.bit_end_pos_)
                                for (; t-- > 0;) i.readMoreInput(), n[d++] = i.readBits(8), d === s && (e.write(n, s), d = 0);
                            else {
                                if (i.bit_end_pos_ < 32) throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");
                                for (; i.bit_pos_ < 32;) n[d] = i.val_ >>> i.bit_pos_, i.bit_pos_ += 8, ++d, --t;
                                if (a = i.bit_end_pos_ - i.bit_pos_ >> 3, l + a > E.IBUF_MASK) {
                                    for (var u = E.IBUF_MASK + 1 - l, c = 0; c < u; c++) n[d + c] = i.buf_[l + c];
                                    a -= u, d += u, t -= u, l = 0
                                }
                                for (var c = 0; c < a; c++) n[d + c] = i.buf_[l + c];
                                if (d += a, t -= a, d >= s) {
                                    e.write(n, s), d -= s;
                                    for (var c = 0; c < d; c++) n[c] = n[s + c]
                                }
                                for (; d + t >= s;) {
                                    if (a = s - d, i.input_.read(n, d, a) < a) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                                    e.write(n, s), t -= a, d = 0
                                }
                                if (i.input_.read(n, d, t) < t) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                                i.reset()
                            }
                        }

                        function y(e) {
                            var t = e.bit_pos_ + 7 & -8;
                            return 0 == e.readBits(t - e.bit_pos_)
                        }

                        function g(e) {
                            var t = new U(e),
                                r = new E(t);
                            return n(r), a(r).meta_block_length
                        }

                        function v(e, t) {
                            var r = new U(e);
                            null == t && (t = g(e));
                            var n = new Uint8Array(t),
                                o = new x(n);
                            return A(r, o), o.pos < o.buffer.length && (o.buffer = o.buffer.subarray(0, o.pos)), o.buffer
                        }

                        function A(e, t) {
                            var r, i, d, f, h, g, v, A, U, x = 0,
                                L = 0,
                                N = 0,
                                R = 0,
                                T = [16, 15, 11, 4],
                                D = 0,
                                z = 0,
                                V = 0,
                                Z = [new p(0, 0), new p(0, 0), new p(0, 0)];
                            const Y = 128 + E.READ_SIZE;
                            U = new E(e), N = n(U), i = (1 << N) - 16, d = 1 << N, f = d - 1, h = new Uint8Array(d + Y + k.maxDictionaryWordLength), g = d, v = [], A = [];
                            for (var G = 0; G < 3240; G++) v[G] = new B(0, 0), A[G] = new B(0, 0);
                            for (; !L;) {
                                var J, j, X, K, Q, _, $, ee, te, re = 0,
                                    ne = [1 << 28, 1 << 28, 1 << 28],
                                    oe = [0],
                                    ie = [1, 1, 1],
                                    ae = [0, 1, 0, 1, 0, 1],
                                    se = [0],
                                    de = null,
                                    le = null,
                                    ue = null,
                                    ce = 0,
                                    fe = null,
                                    he = 0,
                                    pe = 0,
                                    me = null,
                                    we = 0,
                                    be = 0,
                                    ye = 0;
                                for (r = 0; r < 3; ++r) Z[r].codes = null, Z[r].htrees = null;
                                U.readMoreInput();
                                var ge = a(U);
                                if (re = ge.meta_block_length, x + re > t.buffer.length) {
                                    var ve = new Uint8Array(x + re);
                                    ve.set(t.buffer), t.buffer = ve
                                }
                                if (L = ge.input_end, J = ge.is_uncompressed, ge.is_metadata)
                                    for (y(U); re > 0; --re) U.readMoreInput(), U.readBits(8);
                                else if (0 !== re)
                                    if (J) U.bit_pos_ = U.bit_pos_ + 7 & -8, b(t, re, x, h, f, U), x += re;
                                    else {
                                        for (r = 0; r < 3; ++r) ie[r] = o(U) + 1, ie[r] >= 2 && (l(ie[r] + 2, v, r * F, U), l(H, A, r * F, U), ne[r] = u(A, r * F, U), se[r] = 1);
                                        for (U.readMoreInput(), j = U.readBits(2), X = q + (U.readBits(4) << j), K = (1 << j) - 1, Q = X + (48 << j), le = new Uint8Array(ie[0]), r = 0; r < ie[0]; ++r) U.readMoreInput(), le[r] = U.readBits(2) << 1;
                                        var Ae = m(ie[0] << S, U);
                                        _ = Ae.num_htrees, de = Ae.context_map;
                                        var Ue = m(ie[2] << P, U);
                                        for ($ = Ue.num_htrees, ue = Ue.context_map, Z[0] = new p(C, _), Z[1] = new p(I, ie[1]), Z[2] = new p(Q, $), r = 0; r < 3; ++r) Z[r].decode(U);
                                        for (fe = 0, me = 0, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1], te = Z[1].htrees[0]; re > 0;) {
                                            var xe, Ee, ke, Be, Le, We, Me, Oe, Ne, Re, Ce;
                                            for (U.readMoreInput(), 0 === ne[1] && (w(ie[1], v, 1, oe, ae, se, U), ne[1] = u(A, F, U), te = Z[1].htrees[oe[1]]), --ne[1], xe = s(Z[1].codes, te, U), Ee = xe >> 6, Ee >= 2 ? (Ee -= 2, Me = -1) : Me = 0, ke = M.kInsertRangeLut[Ee] + (xe >> 3 & 7), Be = M.kCopyRangeLut[Ee] + (7 & xe), Le = M.kInsertLengthPrefixCode[ke].offset + U.readBits(M.kInsertLengthPrefixCode[ke].nbits), We = M.kCopyLengthPrefixCode[Be].offset + U.readBits(M.kCopyLengthPrefixCode[Be].nbits), z = h[x - 1 & f], V = h[x - 2 & f], Re = 0; Re < Le; ++Re) U.readMoreInput(), 0 === ne[0] && (w(ie[0], v, 0, oe, ae, se, U), ne[0] = u(A, 0, U), ce = oe[0] << S, fe = ce, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1]), Ne = W.lookup[be + z] | W.lookup[ye + V], he = de[fe + Ne], --ne[0], V = z, z = s(Z[0].codes, Z[0].htrees[he], U), h[x & f] = z, (x & f) === f && t.write(h, d), ++x;
                                            if ((re -= Le) <= 0) break;
                                            if (Me < 0) {
                                                var Ne;
                                                if (U.readMoreInput(), 0 === ne[2] && (w(ie[2], v, 2, oe, ae, se, U), ne[2] = u(A, 2160, U), pe = oe[2] << P, me = pe), --ne[2], Ne = 255 & (We > 4 ? 3 : We - 2), we = ue[me + Ne], (Me = s(Z[2].codes, Z[2].htrees[we], U)) >= X) {
                                                    var Ie, He, Se;
                                                    Me -= X, He = Me & K, Me >>= j, Ie = 1 + (Me >> 1), Se = (2 + (1 & Me) << Ie) - 4, Me = X + (Se + U.readBits(Ie) << j) + He
                                                }
                                            }
                                            if ((Oe = c(Me, T, D)) < 0) throw new Error("[BrotliDecompress] invalid distance");
                                            if (R = x < i && R !== i ? x : i, Ce = x & f, Oe > R) {
                                                if (!(We >= k.minDictionaryWordLength && We <= k.maxDictionaryWordLength)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                                                var Se = k.offsetsByLength[We],
                                                    Pe = Oe - R - 1,
                                                    Te = k.sizeBitsByLength[We],
                                                    De = (1 << Te) - 1,
                                                    Fe = Pe & De,
                                                    ze = Pe >> Te;
                                                if (Se += Fe * We, !(ze < O.kNumTransforms)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                                                var Ve = O.transformDictionaryWord(h, Ce, Se, We, ze);
                                                if (Ce += Ve, x += Ve, re -= Ve, Ce >= g) {
                                                    t.write(h, d);
                                                    for (var qe = 0; qe < Ce - g; qe++) h[qe] = h[g + qe]
                                                }
                                            } else {
                                                if (Me > 0 && (T[3 & D] = Oe, ++D), We > re) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                                                for (Re = 0; Re < We; ++Re) h[x & f] = h[x - Oe & f], (x & f) === f && t.write(h, d), ++x, --re
                                            }
                                            z = h[x - 1 & f], V = h[x - 2 & f]
                                        }
                                        x &= 1073741823
                                    }
                            }
                            t.write(h, x & f)
                        }
                        var U = e("./streams").BrotliInput,
                            x = e("./streams").BrotliOutput,
                            E = e("./bit_reader"),
                            k = e("./dictionary"),
                            B = e("./huffman").HuffmanCode,
                            L = e("./huffman").BrotliBuildHuffmanTable,
                            W = e("./context"),
                            M = e("./prefix"),
                            O = e("./transform");
                        const N = 8,
                            R = 16,
                            C = 256,
                            I = 704,
                            H = 26,
                            S = 6,
                            P = 2,
                            T = 8,
                            D = 255,
                            F = 1080,
                            z = 18,
                            V = new Uint8Array([1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
                            q = 16,
                            Z = new Uint8Array([3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2]),
                            Y = new Int8Array([0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3]),
                            G = new Uint16Array([256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080]);
                        p.prototype.decode = function(e) {
                            var t, r, n = 0;
                            for (t = 0; t < this.num_htrees; ++t) this.htrees[t] = n, r = l(this.alphabet_size, this.codes, n, e), n += r
                        }, r.BrotliDecompressedSize = g, r.BrotliDecompressBuffer = v, r.BrotliDecompress = A, k.init()
                    },
                    "dec/dictionary.js": function(e, t, r) {
                        var n = e("./dictionary-browser");
                        r.init = function() {
                            r.dictionary = n.init()
                        }, r.offsetsByLength = new Uint32Array([]), r.sizeBitsByLength = new Uint8Array([0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5]), r.minDictionaryWordLength = 4, r.maxDictionaryWordLength = 24
                    },
                    "dec/dictionary.bin.js": function(e, t, r) {
                        t.exports = ""
                    },
                    "dec/dictionary-browser.js": function(e, t, r) {
                        var n = e("base64-js");
                        r.init = function() {
                            return (0, e("./decode").BrotliDecompressBuffer)(n.toByteArray(e("./dictionary.bin.js")))
                        }
                    },
                    "dec/huffman.js": function(e, t, r) {
                        function n(e, t) {
                            this.bits = e, this.value = t
                        }

                        function o(e, t) {
                            for (var r = 1 << t - 1; e & r;) r >>= 1;
                            return (e & r - 1) + r
                        }

                        function i(e, t, r, o, i) {
                            do {
                                o -= r, e[t + o] = new n(i.bits, i.value)
                            } while (o > 0)
                        }

                        function a(e, t, r) {
                            for (var n = 1 << t - r; t < s && !((n -= e[t]) <= 0);) ++t, n <<= 1;
                            return t - r
                        }
                        r.HuffmanCode = n;
                        const s = 15;
                        r.BrotliBuildHuffmanTable = function(e, t, r, d, l) {
                            var u, c, f, h, p, m, w, b, y, g, v, A = t,
                                U = new Int32Array(16),
                                x = new Int32Array(16);
                            for (v = new Int32Array(l), f = 0; f < l; f++) U[d[f]]++;
                            for (x[1] = 0, c = 1; c < s; c++) x[c + 1] = x[c] + U[c];
                            for (f = 0; f < l; f++) 0 !== d[f] && (v[x[d[f]]++] = f);
                            if (b = r, y = 1 << b, g = y, 1 === x[s]) {
                                for (h = 0; h < g; ++h) e[t + h] = new n(0, 65535 & v[0]);
                                return g
                            }
                            for (h = 0, f = 0, c = 1, p = 2; c <= r; ++c, p <<= 1)
                                for (; U[c] > 0; --U[c]) u = new n(255 & c, 65535 & v[f++]), i(e, t + h, p, y, u), h = o(h, c);
                            for (w = g - 1, m = -1, c = r + 1, p = 2; c <= s; ++c, p <<= 1)
                                for (; U[c] > 0; --U[c])(h & w) !== m && (t += y, b = a(U, c, r), y = 1 << b, g += y, m = h & w, e[A + m] = new n(b + r & 255, t - A - m & 65535)), u = new n(c - r & 255, 65535 & v[f++]), i(e, t + (h >> r), p, y, u), h = o(h, c);
                            return g
                        }
                    },
                    "dec/prefix.js": function(e, t, r) {
                        function n(e, t) {
                            this.offset = e, this.nbits = t
                        }
                        r.kBlockLengthPrefixCode = [new n(1, 2), new n(5, 2), new n(9, 2), new n(13, 2), new n(17, 3), new n(25, 3), new n(33, 3), new n(41, 3), new n(49, 4), new n(65, 4), new n(81, 4), new n(97, 4), new n(113, 5), new n(145, 5), new n(177, 5), new n(209, 5), new n(241, 6), new n(305, 6), new n(369, 7), new n(497, 8), new n(753, 9), new n(1265, 10), new n(2289, 11), new n(4337, 12), new n(8433, 13), new n(16625, 24)], r.kInsertLengthPrefixCode = [new n(0, 0), new n(1, 0), new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 1), new n(8, 1), new n(10, 2), new n(14, 2), new n(18, 3), new n(26, 3), new n(34, 4), new n(50, 4), new n(66, 5), new n(98, 5), new n(130, 6), new n(194, 7), new n(322, 8), new n(578, 9), new n(1090, 10), new n(2114, 12), new n(6210, 14), new n(22594, 24)], r.kCopyLengthPrefixCode = [new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 0), new n(7, 0), new n(8, 0), new n(9, 0), new n(10, 1), new n(12, 1), new n(14, 2), new n(18, 2), new n(22, 3), new n(30, 3), new n(38, 4), new n(54, 4), new n(70, 5), new n(102, 5), new n(134, 6), new n(198, 7), new n(326, 8), new n(582, 9), new n(1094, 10), new n(2118, 24)], r.kInsertRangeLut = [0, 0, 8, 8, 0, 16, 8, 16, 16], r.kCopyRangeLut = [0, 8, 0, 8, 16, 0, 16, 8, 16]
                    },
                    "dec/streams.js": function(e, t, r) {
                        function n(e) {
                            this.buffer = e, this.pos = 0
                        }

                        function o(e) {
                            this.buffer = e, this.pos = 0
                        }
                        n.prototype.read = function(e, t, r) {
                            this.pos + r > this.buffer.length && (r = this.buffer.length - this.pos);
                            for (var n = 0; n < r; n++) e[t + n] = this.buffer[this.pos + n];
                            return this.pos += r, r
                        }, r.BrotliInput = n, o.prototype.write = function(e, t) {
                            if (this.pos + t > this.buffer.length) throw new Error("Output buffer is not large enough");
                            return this.buffer.set(e.subarray(0, t), this.pos), this.pos += t, t
                        }, r.BrotliOutput = o
                    },
                    "dec/transform.js": function(e, t, r) {
                        function n(e, t, r) {
                            this.prefix = new Uint8Array(e.length), this.transform = t, this.suffix = new Uint8Array(r.length);
                            for (var n = 0; n < e.length; n++) this.prefix[n] = e.charCodeAt(n);
                            for (var n = 0; n < r.length; n++) this.suffix[n] = r.charCodeAt(n)
                        }

                        function o(e, t) {
                            return e[t] < 192 ? (e[t] >= 97 && e[t] <= 122 && (e[t] ^= 32), 1) : e[t] < 224 ? (e[t + 1] ^= 32, 2) : (e[t + 2] ^= 5, 3)
                        }
                        var i = e("./dictionary");
                        const w = 10,
                            b = 11;
                        var B = [new n("", 0, ""), new n("", 0, " "), new n(" ", 0, " "), new n("", 12, ""), new n("", w, " "), new n("", 0, " the "), new n(" ", 0, ""), new n("s ", 0, " "), new n("", 0, " of "), new n("", w, ""), new n("", 0, " and "), new n("", 13, ""), new n("", 1, ""), new n(", ", 0, " "), new n("", 0, ", "), new n(" ", w, " "), new n("", 0, " in "), new n("", 0, " to "), new n("e ", 0, " "), new n("", 0, '"'), new n("", 0, "."), new n("", 0, '">'), new n("", 0, "\n"), new n("", 3, ""), new n("", 0, "]"), new n("", 0, " for "), new n("", 14, ""), new n("", 2, ""), new n("", 0, " a "), new n("", 0, " that "), new n(" ", w, ""), new n("", 0, ". "), new n(".", 0, ""), new n(" ", 0, ", "), new n("", 15, ""), new n("", 0, " with "), new n("", 0, "'"), new n("", 0, " from "), new n("", 0, " by "), new n("", 16, ""), new n("", 17, ""), new n(" the ", 0, ""), new n("", 4, ""), new n("", 0, ". The "), new n("", b, ""), new n("", 0, " on "), new n("", 0, " as "), new n("", 0, " is "), new n("", 7, ""), new n("", 1, "ing "), new n("", 0, "\n\t"), new n("", 0, ":"), new n(" ", 0, ". "), new n("", 0, "ed "), new n("", 20, ""), new n("", 18, ""), new n("", 6, ""), new n("", 0, "("), new n("", w, ", "), new n("", 8, ""), new n("", 0, " at "), new n("", 0, "ly "), new n(" the ", 0, " of "), new n("", 5, ""), new n("", 9, ""), new n(" ", w, ", "), new n("", w, '"'), new n(".", 0, "("), new n("", b, " "), new n("", w, '">'), new n("", 0, '="'), new n(" ", 0, "."), new n(".com/", 0, ""), new n(" the ", 0, " of the "), new n("", w, "'"), new n("", 0, ". This "), new n("", 0, ","), new n(".", 0, " "), new n("", w, "("), new n("", w, "."), new n("", 0, " not "), new n(" ", 0, '="'), new n("", 0, "er "), new n(" ", b, " "), new n("", 0, "al "), new n(" ", b, ""), new n("", 0, "='"), new n("", b, '"'), new n("", w, ". "), new n(" ", 0, "("), new n("", 0, "ful "), new n(" ", w, ". "), new n("", 0, "ive "), new n("", 0, "less "), new n("", b, "'"), new n("", 0, "est "), new n(" ", w, "."), new n("", b, '">'), new n(" ", 0, "='"), new n("", w, ","), new n("", 0, "ize "), new n("", b, "."), new n("Â ", 0, ""), new n(" ", 0, ","), new n("", w, '="'), new n("", b, '="'), new n("", 0, "ous "), new n("", b, ", "), new n("", w, "='"), new n(" ", w, ","), new n(" ", b, '="'), new n(" ", b, ", "), new n("", b, ","), new n("", b, "("), new n("", b, ". "), new n(" ", b, "."), new n("", b, "='"), new n(" ", b, ". "), new n(" ", w, '="'), new n(" ", b, "='"), new n(" ", w, "='")];
                        r.kTransforms = B, r.kNumTransforms = B.length, r.transformDictionaryWord = function(e, t, r, n, a) {
                            var s, d = B[a].prefix,
                                l = B[a].suffix,
                                u = B[a].transform,
                                c = u < 12 ? 0 : u - 11,
                                f = 0,
                                h = t;
                            c > n && (c = n);
                            for (var p = 0; p < d.length;) e[t++] = d[p++];
                            for (r += c, n -= c, u <= 9 && (n -= u), f = 0; f < n; f++) e[t++] = i.dictionary[r + f];
                            if (s = t - n, u === w) o(e, s);
                            else if (u === b)
                                for (; n > 0;) {
                                    var g = o(e, s);
                                    s += g, n -= g
                                }
                            for (var v = 0; v < l.length;) e[t++] = l[v++];
                            return t - h
                        }
                    },
                    "node_modules/base64-js/index.js": function(e, t, r) {
                        "use strict";

                        function n(e) {
                            var t = e.length;
                            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                            return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
                        }

                        function o(e) {
                            return 3 * e.length / 4 - n(e)
                        }

                        function i(e) {
                            var t, r, o, i, a, s, d = e.length;
                            a = n(e), s = new c(3 * d / 4 - a), o = a > 0 ? d - 4 : d;
                            var l = 0;
                            for (t = 0, r = 0; t < o; t += 4, r += 3) i = u[e.charCodeAt(t)] << 18 | u[e.charCodeAt(t + 1)] << 12 | u[e.charCodeAt(t + 2)] << 6 | u[e.charCodeAt(t + 3)], s[l++] = i >> 16 & 255, s[l++] = i >> 8 & 255, s[l++] = 255 & i;
                            return 2 === a ? (i = u[e.charCodeAt(t)] << 2 | u[e.charCodeAt(t + 1)] >> 4, s[l++] = 255 & i) : 1 === a && (i = u[e.charCodeAt(t)] << 10 | u[e.charCodeAt(t + 1)] << 4 | u[e.charCodeAt(t + 2)] >> 2, s[l++] = i >> 8 & 255, s[l++] = 255 & i), s
                        }

                        function a(e) {
                            return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
                        }

                        function s(e, t, r) {
                            for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(a(n));
                            return o.join("")
                        }

                        function d(e) {
                            for (var t, r = e.length, n = r % 3, o = "", i = [], a = 16383, d = 0, u = r - n; d < u; d += a) i.push(s(e, d, d + a > u ? u : d + a));
                            return 1 === n ? (t = e[r - 1], o += l[t >> 2], o += l[t << 4 & 63], o += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o += l[t >> 10], o += l[t >> 4 & 63], o += l[t << 2 & 63], o += "="), i.push(o), i.join("")
                        }
                        r.byteLength = o, r.toByteArray = i, r.fromByteArray = d;
                        for (var l = [], u = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = f.length; h < p; ++h) l[h] = f[h], u[f.charCodeAt(h)] = h;
                        u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
                    }
                };
                for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
                var n = function(e) {
                        var r = [];
                        return e = e.split("/").every(function(e) {
                            return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
                        }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
                    },
                    o = function(e, t) {
                        return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
                    },
                    i = function(e, t) {
                        var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
                        if (!r) throw "module not found: " + t;
                        return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
                    };
                return i(null, e)
            },
            decompress: function(e) {
                this.exports || (this.exports = this.require("decompress.js"));
                try {
                    return this.exports(e)
                } catch (e) {}
            },
            hasUnityMarker: function(e) {
                var t = "UnityWeb Compressed Content (brotli)";
                if (!e.length) return !1;
                var r = 1 & e[0] ? 14 & e[0] ? 4 : 7 : 1,
                    n = e[0] & (1 << r) - 1,
                    o = 1 + (Math.log(t.length - 1) / Math.log(2) >> 3);
                if (commentOffset = r + 1 + 2 + 1 + 2 + (o << 3) + 7 >> 3, 17 == n || commentOffset > e.length) return !1;
                for (var i = n + (6 + (o << 4) + (t.length - 1 << 6) << r), a = 0; a < commentOffset; a++, i >>>= 8)
                    if (e[a] != (255 & i)) return !1;
                return String.fromCharCode.apply(null, e.subarray(commentOffset, commentOffset + t.length)) == t
            }
        },
        decompress: function(e, t) {
            var r = this.gzip.hasUnityMarker(e) ? this.gzip : this.brotli.hasUnityMarker(e) ? this.brotli : this.identity;
            if (this.serverSetupWarningEnabled && r != this.identity && (console.log("You can reduce your startup time if you configure your web server to host .unityweb files using " + (r == this.gzip ? "gzip" : "brotli") + " compression."), this.serverSetupWarningEnabled = !1), "function" != typeof t) return r.decompress(e);
            if (!r.worker) {
                var n = URL.createObjectURL(new Blob(["this.require = ", r.require.toString(), "; this.decompress = ", r.decompress.toString(), "; this.onmessage = ", function(e) {
                    var t = {
                        id: e.data.id,
                        decompressed: this.decompress(e.data.compressed)
                    };
                    postMessage(t, t.decompressed ? [t.decompressed.buffer] : [])
                }.toString(), "; postMessage({ ready: true });"], {
                    type: "text/javascript"
                }));
                r.worker = new Worker(n), r.worker.onmessage = function(e) {
                    return e.data.ready ? void URL.revokeObjectURL(n) : (this.callbacks[e.data.id](e.data.decompressed), void delete this.callbacks[e.data.id])
                }, r.worker.callbacks = {}, r.worker.nextCallbackId = 0
            }
            var o = r.worker.nextCallbackId++;
            r.worker.callbacks[o] = t, r.worker.postMessage({
                id: o,
                compressed: e
            }, [e.buffer])
        },
        serverSetupWarningEnabled: !0
    },
    Cryptography: {
        crc32: function(e) {
            var t = UnityLoader.Cryptography.crc32.module;
            if (!t) {
                var r = new ArrayBuffer(16777216),
                    n = function(e, t, r) {
                        "use asm";
                        var n = new e.Uint8Array(r);
                        var o = new e.Uint32Array(r);

                        function i(e, t) {
                            e = e | 0;
                            t = t | 0;
                            var r = 0;
                            for (r = o[1024 >> 2] | 0; t; e = e + 1 | 0, t = t - 1 | 0) r = o[(r & 255 ^ n[e]) << 2 >> 2] ^ r >>> 8 ^ 4278190080;
                            o[1024 >> 2] = r
                        }
                        return {
                            process: i
                        }
                    }({
                        Uint8Array: Uint8Array,
                        Uint32Array: Uint32Array
                    }, null, r);
                t = UnityLoader.Cryptography.crc32.module = {
                    buffer: r,
                    HEAPU8: new Uint8Array(r),
                    HEAPU32: new Uint32Array(r),
                    process: n.process,
                    crc32: 1024,
                    data: 1028
                };
                for (var o = 0; o < 256; o++) {
                    for (var i = 255 ^ o, a = 0; a < 8; a++) i = i >>> 1 ^ (1 & i ? 3988292384 : 0);
                    t.HEAPU32[o] = i
                }
            }
            t.HEAPU32[t.crc32 >> 2] = 0;
            for (var s = 0; s < e.length;) {
                var d = Math.min(t.HEAPU8.length - t.data, e.length - s);
                t.HEAPU8.set(e.subarray(s, s + d), t.data), crc = t.process(t.data, d), s += d
            }
            var l = t.HEAPU32[t.crc32 >> 2];
            return new Uint8Array([l >> 24, l >> 16, l >> 8, l])
        },
        md5: function(e) {
            var t = UnityLoader.Cryptography.md5.module;
            if (!t) {
                var r = new ArrayBuffer(16777216),
                    n = function(e, t, r) {
                        "use asm";
                        var n = new e.Uint32Array(r);

                        function o(e, t) {
                            e = e | 0;
                            t = t | 0;
                            var r = 0,
                                o = 0,
                                i = 0,
                                a = 0,
                                s = 0,
                                d = 0,
                                l = 0,
                                u = 0,
                                c = 0,
                                f = 0,
                                h = 0,
                                p = 0;
                            r = n[128] | 0, o = n[129] | 0, i = n[130] | 0, a = n[131] | 0;
                            for (; t; e = e + 64 | 0, t = t - 1 | 0) {
                                s = r;
                                d = o;
                                l = i;
                                u = a;
                                for (f = 0;
                                    (f | 0) < 512; f = f + 8 | 0) {
                                    p = n[f >> 2] | 0;
                                    r = r + (n[f + 4 >> 2] | 0) + (n[e + (p >>> 14) >> 2] | 0) + ((f | 0) < 128 ? a ^ o & (i ^ a) : (f | 0) < 256 ? i ^ a & (o ^ i) : (f | 0) < 384 ? o ^ i ^ a : i ^ (o | ~a)) | 0;
                                    h = (r << (p & 31) | r >>> 32 - (p & 31)) + o | 0;
                                    r = a;
                                    a = i;
                                    i = o;
                                    o = h
                                }
                                r = r + s | 0;
                                o = o + d | 0;
                                i = i + l | 0;
                                a = a + u | 0
                            }
                            n[128] = r;
                            n[129] = o;
                            n[130] = i;
                            n[131] = a
                        }
                        return {
                            process: o
                        }
                    }({
                        Uint32Array: Uint32Array
                    }, null, r);
                t = UnityLoader.Cryptography.md5.module = {
                    buffer: r,
                    HEAPU8: new Uint8Array(r),
                    HEAPU32: new Uint32Array(r),
                    process: n.process,
                    md5: 512,
                    data: 576
                }, t.HEAPU32.set(new Uint32Array([]))
            }
            t.HEAPU32.set(new Uint32Array([]), t.md5 >> 2);
            for (var o = 0; o < e.length;) {
                var i = -64 & Math.min(t.HEAPU8.length - t.data, e.length - o);
                if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
                    if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
                        for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
                        t.process(t.data, 1), i = 0
                    }
                    for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
                    for (var s = e.length, d = 0, a = 56; a < 64; a++, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
                    t.process(t.data, 1)
                }
            }
            return new Uint8Array(t.HEAPU8.subarray(t.md5, t.md5 + 16))
        },
        sha1: function(e) {
            var t = UnityLoader.Cryptography.sha1.module;
            if (!t) {
                var r = new ArrayBuffer(16777216),
                    n = function(e, t, r) {
                        "use asm";
                        var n = new e.Uint32Array(r);

                        function o(e, t) {
                            e = e | 0;
                            t = t | 0;
                            var r = 0,
                                o = 0,
                                i = 0,
                                a = 0,
                                s = 0,
                                d = 0,
                                l = 0,
                                u = 0,
                                c = 0,
                                f = 0,
                                h = 0,
                                p = 0;
                            r = n[80] | 0, o = n[81] | 0, i = n[82] | 0, a = n[83] | 0, s = n[84] | 0;
                            for (; t; e = e + 64 | 0, t = t - 1 | 0) {
                                d = r;
                                l = o;
                                u = i;
                                c = a;
                                f = s;
                                for (p = 0;
                                    (p | 0) < 320; p = p + 4 | 0, s = a, a = i, i = o << 30 | o >>> 2, o = r, r = h) {
                                    if ((p | 0) < 64) {
                                        h = n[e + p >> 2] | 0;
                                        h = h << 24 & 4278190080 | h << 8 & 16711680 | h >>> 8 & 65280 | h >>> 24 & 255
                                    } else {
                                        h = n[p - 12 >> 2] ^ n[p - 32 >> 2] ^ n[p - 56 >> 2] ^ n[p - 64 >> 2];
                                        h = h << 1 | h >>> 31
                                    }
                                    n[p >> 2] = h;
                                    h = h + ((r << 5 | r >>> 27) + s) + ((p | 0) < 80 ? (o & i | ~o & a | 0) + 1518500249 | 0 : (p | 0) < 160 ? (o ^ i ^ a) + 1859775393 | 0 : (p | 0) < 240 ? (o & i | o & a | i & a) + 2400959708 | 0 : (o ^ i ^ a) + 3395469782 | 0) | 0
                                }
                                r = r + d | 0;
                                o = o + l | 0;
                                i = i + u | 0;
                                a = a + c | 0;
                                s = s + f | 0
                            }
                            n[80] = r;
                            n[81] = o;
                            n[82] = i;
                            n[83] = a;
                            n[84] = s
                        }
                        return {
                            process: o
                        }
                    }({
                        Uint32Array: Uint32Array
                    }, null, r);
                t = UnityLoader.Cryptography.sha1.module = {
                    buffer: r,
                    HEAPU8: new Uint8Array(r),
                    HEAPU32: new Uint32Array(r),
                    process: n.process,
                    sha1: 320,
                    data: 384
                }
            }
            t.HEAPU32.set(new Uint32Array([]), t.sha1 >> 2);
            for (var o = 0; o < e.length;) {
                var i = -64 & Math.min(t.HEAPU8.length - t.data, e.length - o);
                if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
                    if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
                        for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
                        t.process(t.data, 1), i = 0
                    }
                    for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
                    for (var s = e.length, d = 0, a = 63; a >= 56; a--, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
                    t.process(t.data, 1)
                }
            }
            for (var l = new Uint8Array(20), a = 0; a < l.length; a++) l[a] = t.HEAPU8[t.sha1 + (-4 & a) + 3 - (3 & a)];
            return l
        }
    },
    Error: {
        init: function() {
            return Error.stackTraceLimit = 50, window.addEventListener("error", function(e) {
                var t = UnityLoader.Error.getModule(e);
                if (!t) return UnityLoader.Error.handler(e);
                var r = t.useWasm ? t.wasmSymbolsUrl : t.asmSymbolsUrl;
                if (!r) return UnityLoader.Error.handler(e, t);
                var n = new XMLHttpRequest;
                n.open("GET", t.resolveBuildUrl(r)), n.responseType = "arraybuffer", n.onload = function() {
                    UnityLoader.loadCode(t, UnityLoader.Compression.decompress(new Uint8Array(n.response)), function(r) {
                        t.demangleSymbol = UnityLoader[r](), UnityLoader.Error.handler(e, t)
                    }, {
                        isModularized: !1
                    })
                }, n.send()
            }), !0
        }(),
        stackTraceFormat: -1 != navigator.userAgent.indexOf("Chrome") ? "(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)" : "(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)",
        stackTraceFormatWasm: -1 != navigator.userAgent.indexOf("Chrome") ? "((\\s+at\\s*)\\s\\(<WASM>\\[(\\d+)\\]\\+\\d+\\))()" : "((\\s*)wasm-function\\[(\\d+)\\])@(blob:.*)",
        blobParseRegExp: new RegExp("^(blob:.*)(:\\d+:\\d+)$"),
        getModule: function(e) {
            var t = e.message.match(new RegExp(this.stackTraceFormat, "g"));
            for (var r in t) {
                var n = t[r].match(new RegExp("^" + this.stackTraceFormat + "$")),
                    o = n[7].match(this.blobParseRegExp);
                if (o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].Module) return UnityLoader.Blobs[o[1]].Module
            }
        },
        demangle: function(e, t) {
            var r = e.message;
            return t ? (r = r.replace(new RegExp(this.stackTraceFormat, "g"), function(e) {
                var r = e.match(new RegExp("^" + this.stackTraceFormat + "$")),
                    n = r[7].match(this.blobParseRegExp),
                    o = t.demangleSymbol ? t.demangleSymbol(r[4]) : r[4],
                    i = n && UnityLoader.Blobs[n[1]] && UnityLoader.Blobs[n[1]].url ? UnityLoader.Blobs[n[1]].url : "blob";
                return r[1] + o + (r[2] != o ? " [" + r[2] + "]" : "") + " (" + (n ? i.substr(i.lastIndexOf("/") + 1) + n[2] : r[7]) + ")"
            }.bind(this)), t.useWasm && (r = r.replace(new RegExp(this.stackTraceFormatWasm, "g"), function(e) {
                var r = e.match(new RegExp("^" + this.stackTraceFormatWasm + "$")),
                    n = t.demangleSymbol ? t.demangleSymbol(r[3]) : r[3],
                    o = r[4].match(this.blobParseRegExp),
                    i = o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].url ? UnityLoader.Blobs[o[1]].url : "blob";
                return (n == r[3] ? r[1] : r[2] + n + " [wasm:" + r[3] + "]") + (r[4] ? " (" + (o ? i.substr(i.lastIndexOf("/") + 1) + o[2] : r[4]) + ")" : "")
            }.bind(this))), r) : r
        },
        handler: function(e, t) {
            var r = t ? this.demangle(e, t) : e.message;
            if (!(t && t.errorhandler && t.errorhandler(r, e.filename, e.lineno) || (console.log("Invoking error handler due to\n" + r), "function" == typeof dump && dump("Invoking error handler due to\n" + r), -1 != r.indexOf("UnknownError") || -1 != r.indexOf("Program terminated with exit(0)") || this.didShowErrorMessage))) {
                var r = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + r; - 1 != r.indexOf("DISABLE_EXCEPTION_CATCHING") ? r = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : -1 != r.indexOf("Cannot enlarge memory arrays") ? r = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : -1 == r.indexOf("Invalid array buffer length") && -1 == r.indexOf("Invalid typed array length") && -1 == r.indexOf("out of memory") && -1 == r.indexOf("could not allocate memory") || (r = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(r), this.didShowErrorMessage = !0
            }
        },
        popup: function(e, t, r) {
            r = r || [{
                text: "OK"
            }];
            var n = document.createElement("div");
            n.style.cssText = "position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center; border: 1px solid black; padding: 5px; background: #E8E8E8";
            var o = document.createElement("span");
            o.textContent = t, n.appendChild(o), n.appendChild(document.createElement("br"));
            for (var i = 0; i < r.length; i++) {
                var a = document.createElement("button");
                r[i].text && (a.textContent = r[i].text), r[i].callback && (a.onclick = r[i].callback), a.style.margin = "5px", a.addEventListener("click", function() {
                    e.container.removeChild(n)
                }), n.appendChild(a)
            }
            e.container.appendChild(n)
        }
    },
    Job: {
        schedule: function(e, t, r, n, o) {
            o = o || {};
            var i = e.Jobs[t];
            if (i || (i = e.Jobs[t] = {
                    dependencies: {},
                    dependants: {}
                }), i.callback) throw "[UnityLoader.Job.schedule] job '" + t + "' has been already scheduled";
            if ("function" != typeof n) throw "[UnityLoader.Job.schedule] job '" + t + "' has invalid callback";
            if ("object" != typeof o) throw "[UnityLoader.Job.schedule] job '" + t + "' has invalid parameters";
            i.callback = function(e, t) {
                i.starttime = performance.now(), n(e, t)
            }, i.parameters = o, i.complete = function(r) {
                i.endtime = performance.now(), i.result = {
                    value: r
                };
                for (var n in i.dependants) {
                    var o = e.Jobs[n];
                    o.dependencies[t] = i.dependants[n] = !1;
                    var a = "function" != typeof o.callback;
                    for (var s in o.dependencies) a = a || o.dependencies[s];
                    if (!a) {
                        if (o.executed) throw "[UnityLoader.Job.schedule] job '" + t + "' has already been executed";
                        o.executed = !0, setTimeout(o.callback.bind(null, e, o), 0)
                    }
                }
            };
            var a = !1;
            r.forEach(function(r) {
                var n = e.Jobs[r];
                n || (n = e.Jobs[r] = {
                    dependencies: {},
                    dependants: {}
                }), (i.dependencies[r] = n.dependants[t] = !n.result) && (a = !0)
            }), a || (i.executed = !0, setTimeout(i.callback.bind(null, e, i), 0))
        },
        result: function(e, t) {
            var r = e.Jobs[t];
            if (!r) throw "[UnityLoader.Job.result] job '" + t + "' does not exist";
            if ("object" != typeof r.result) throw "[UnityLoader.Job.result] job '" + t + "' has invalid result";
            return r.result.value
        }
    },
    Progress: {
        Styles: {
            Dark: {
                progressLogoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAACCCAYAAAC+etHhAAAACXBIWXMAAAsSAAALEgHS3X78AAAI2UlEQVR42u2d7VXjSgyGpZwtwHRgOjAVYCrAVLDZCjZUsKGCsBWEDhIqiKkg6SB0QDqY+yOTe3J9iePRfMkz0jkcfkDsGfuJpHk1H6iUAjEx3zaRRyAWxJRS//6IjeJ9VUqpmVJqpY42s33vIX7wHDBElDfJD6wSAGoAuNe/y86/tIj4QAEtpAlo/MAqOmBVV18i4cWFBu2HvFoe4RAAmjO4TD9fI2LLuY8CWrxweA5WYXnJRwAQ0AQsVXTAKh3foub+DCRH8wdXrT3NoDzLgd0g4kFytDzyrHO4QlsDAG8SOtOVHR4d5Vm2di+gpSc7NB7yrKTzNMnRrudZJ69VjaDJt4j4KTnaePKsk9camzUA8CoejW+e5Ut2CG1rRHzi6NGyBU0ptRqp1+qzAyLecAQty2lCSqkmQcgAAAod/tnZJEPICgBYJNzFRkDjYbMEcrE+u5fBAI/kfwvxxVXfdrUcJTmaX/vDBLKD5+vXEjrjebMaAKYRwVoDwDMA3OnfWYXPnATbP4HBagHgA45TrXedwcgmN4+WBWhKqWmAh38Ca30O1oXBiO/wXSmlyqHlKBkMuIGs0AOA0hNY7dBp1Howsg/U9V+I+MZlMJCDR3MlZxiD9Y2F1O9YTRtK2qNZyhk7Dde7i4UfejCyCdj93nKUeDS3tjCAbNfxWgcPbaHYGo5TlEy9cqGUqq7kiwLaWRL/0+ThwvB5Y77B6vaDWoN81iPmKXH0uePyMlluiaCUmiq3tldKLZRSjR4gBBuMKKW+iG2e62s0xM+vhrz3ED8sQXMI2Ze+VhmxLwuLL0ZxBivJBLQwnqyK3JfSou3TzrW2xOvUHECbcAuXALB0qCPFzk+ofWm/0cDeideqJUfz58mmDJ5rbdH+2uH1thI6E4VM92lPbP+y55rUQUWRPWiJQjazGLwUPdddEa/bZJ2jecjJ3hhAVgB9psjfK3oeNU97zDZHS9GT2coZHkex+yxDZ8KQ2cgZzcB7UHO/MqvQmWK4dCRnrAf+75p4jzr2tzCYR0vVkzmQM0qD+zgpRyUbOlOGzDKkLQj3Io1okwfNMWRLhpB5kTN67rexLckll6M5zsneEPEXM8hs5IwX4vQkqszRxHxQ3jxa6p5M93HpsjQ08J4V8Z6b5EJnJpBVFn2qLe9NygmTCp2ph8szI0/PdrAOoSW+myjhcyKQkfvZELWpA7hZqf5B/Nx9rAfmLHTmEC4dyBlzV4MQm9xwtDlaZpDNbadnO2oHddZtMcocLaOc7CRn/A4sZzjN02LIHBOBjDQAoHil1kNdlqqnlaPK0RyHyy1zwGzljMpTmyizbsvRhE7HnmwHAA/A36hyxpvHhTKm4fMlyi5DFI/m2pOFXNBrI2eErGcatGtGGYywH3VmClkRW87oaZvJZMvpdw6GHWg5QmYrZzDS9DaXIhkr0DKGrLRY5lYHauPCdDASGrQfQ8Olw8T/ZCvFbGOZHimAKme0gdr4AccNBy/Za+xV+1c34vMEWQ52G2p0p6PD14U/H3RbDl2PxkawFcjI9hpSQtAQtT1yxiH2A5kIZM7tAAAvEe773WyOHSKyOL9zIpA5t+dIHuS7ZXjPXB7K/3I0gczKdoh4F3GE/HU2cOmtG0fN0fT6QoGMbn8j3/88T3vn9GAmnaTyEwB+CS9k+x35/iWjtvTnaHoqi8BGsyrW4mYdjc5F2ZrTQuvJheGywEa3RaSqR82oLcNAE9isrIB+ld6XPV5oyx8OD0UqA/7sNqRo2xlxdu2uW4IKPeocdBaUB9h24P8UXpcJdkkZASLiQyDIKjieeTW4LcHrzDJ743qSHWs1ukEb5yZz0brvXeaj8YFtwXw+2pDdhf4z0ze3GbarkYBmc57TLEDbjGf7jmIBcU6LhR302feaAdO1DOVoQMsYNurK8IXHNplum7UZFWg5wma5T62vdZ2URTPNqLZEcCzqTrnDpqdmU3fFXniAjCq9VDG+pdabvGS2wYv3swQM2kLdO7eW3YQS303IcTsoZ0N9jS5HyxU2LguKbSSl0e9hmxFsUeUOi4HJLAnQMoNtE6tPFtWKMhnQcoEtptxB1PT2o6oMRIJtzhS2JbE/mwgj32WSoHmAbZpYHXQa+Jk2yYKWCWxBN0+28KJF0qBlAlswuYPoQbeXhHqV2gnEKu3zOm12hCwN7lO5AFqlfAKx49rokhNs+gThlvBR0wUk1DJWG/ubKGequ+uX90PIiNrdV997Ty50ZgIbVUjdDLg29VieVbagpQqbT7nDIg+cZQ1awrB5OfratuyUNWgJw+Zc7iBec38tN88GNA+w1QxAs6mDlj7KTtnIGwGlj5WvOfoG/WktJIWFQ1mDxz5pXDyaB8/2FRs25XCVO3E2rbqU82UbOj3C1kTuC7UOunVddhLQ/OdsSgud89D5mwu5wyLfm3MBbdBuQjFhA4CfxI8X0L+srIXjluneTzhR9N2YDgBwq0tUlK0VHi71TXHctmqsptX2oR7MK3g6jFFyxlfdB9PPHhDxps+jCWgOJQYAoM5kdQqeZVsotkbEJy6gsc3RHPZvySXHc9gWUtlJcjTPEgMA+NinzNjj6bZsgXZanqn1bm0qHo2XxODc4wVqy97kvYtHcygxaK8WcofJbz2ebssWaJuzDLXe43lkMMBTYnAOnobMZ1ue9IxfAS0SbFSJYWx2c+2EPcXpYNgE7TmDPu44HASbNWiWMyrGYu8cG5WbRwNI/9ihVkDj4dU+4VjWSdEOvuu2ApqZvcB4jggavTfLFjREPBWc7zR0qeRtH2yfeU7yxjXTkyTvgTZbgoMNPlFPdDQ+0BVwnKd/Aq9k3uRPRLw16J+AxhS8sgMetwPTrpadBLRxgldr4E7gxbarZScBLY0wW0fO725MKgICWjphtg6Y3+0Q8c6wjQJaguBVHfBc53cviDgX0MR853cPphUBAU3yO6ernQQ0MVf5Xe9qJy6gZbFmYOz5nd5vbXVhxfvM9r3LmgGxvvzuUYfZwWUnNqFTTMyXTeQRiAloYsnYP6b+7B7jJdwAAAAAAElFTkSuQmCC",
                progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAATUlEQVRo3u3aIQ4AIAwEQUr4/5cPiyMVBDOj0M2mCKgkGdAwjYCudZzLOLiITYPrCdEgGkSDaEA0iAbRIBpEA6JBNHx1vnL7V4NNwxsbCNMGI3YImu0AAAAASUVORK5CYII=",
                progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAO0lEQVRo3u3SQREAAAjDMMC/56EB3omEXjtJCg5GAkyDaTANpsE0YBpMg2kwDaYB02AaTINpMA2Yhr8FO18EIBpZMeQAAAAASUVORK5CYII="
            },
            Light: {
                progressLogoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAACCCAYAAAC+etHhAAAACXBIWXMAAAsSAAALEgHS3X78AAAIhUlEQVR42u2dzW3bSBTH/yFcgNIBg5wDMKccPa5ATAVxKkhUga0KbFdgdmCpglDHnFZAzsGyBHWgPYjcMIQlkm++3sy8P7AInI3tGfKnN+9rZt4cj0eIRLaVySMQudBV/4v3Hz7JE+GvAoACcA2gBLAC8Dj3h/z+9dMfaCKWyntgqfbrvpYU0LxaNBELLQZgFSP/XgW3dIq8LodlD665UgBqAU302nLYB2uh+fOWApqoWw7LC36WrtgvnwKaPanW0kzxs0wsvQsABwEtnbTD0pOFKQFUAlq8aYelIT9LV9cCWnxph9KCnxW1nyagjb+8zmoVzMeat/81Alo4flZntUJTCaZVgtRBy3G5vBOargU0fnoJ1GoF6ael2iZURghZF7AUAhqfl/EQ+YdIQGOg7xH4YmN+moDGwPn/FvkcFfwnj5MH7Y7JSzg4gE1A8/hJv/UI1gantuuP7Z9JLZ8ppTfuHINVA9i1f+4HwciP1CxaKqDdOnj4HVibAVivBSO2l+8CzMpRKYC2sGTN+harnhGMuLKsCoy6OVIAzVQ6gwLWUC7zd9cCmjvloKcz9i1QW5jpx1dwm0wtAXwV0NzoYYY/tB9YrYOFsVC06flcc12GYsRfFNB6TvwXwsPlANZwHtQa5Kr1626JVlRAm/Byng3+vKa1Di7AGsJPtWbrdtxbImhs2oauIofs0FqE2mOoT61GND1IqD4imwJ7FjFkAHDTRl6+IMvbqJdqzQ69Dwx1CVQCml3IvjLwT6hzqV9JTWwFNJ6QVZ7nozRe8voMfBQtBbR4IdOxZtUZqKgBTAEGHSuZQGZF1GpEF7xcWlKDXD4zgcxKOoNaz3wasVpUP22ZMmgxQgbopTPuJwQJYtEEMq10xmoijA1xXHlqoMUKmU4AUONUtZiiDfF3qJRAixkypfEy53RZ7EL00zKBzLs1e5y5HIpFcwRZxRAynXTGmrjUUqLhImbQTEP2lRlkOumMfj1zjqhpjjJW0GKHDJjXXNnXHvQWnpr4fdcxgpYCZAXoe0V19nbuQUtzqNhASwGyzppRtIH+PgTq95exgJYKZCXRQozVM6eKmua4jgG0VCDTsWZPMNOIGVSaIxPISLoHLZ3RwFwPP7Xr1kvbUCaQzdYC9L2i1HRG8H5aJpCRlswFEYrK8Fio+bQ8NNBMQrYPADJf6YxL8B6IH+hgQDMN2Q34ixoAVLC3UWbu8rmGh11hGSPIDswh853OOKc5aQ6TwYh10FKETGe3+ZPl+c1Jc6x9PetMIJskandGg/H2bF01E5dCG8GIFdBShSzXSGe4Cm6mWLWVz4d45QGyTi8IQ7lGOqN2NMYdLu9VeITnXftXniArEL9cpmrqkWBk7fthZB4gS0Fz27N1dbgAm7cAYCpoAhn9pfuwILszvjCL89Eygcy4Vp4syIZbADAGmkCmF01XHn93H/DKYTAyG7RcINPSk+ff3wdry+nBDEFrwL+wzVm+b87LGY1ldOmsBDaydLo7TEDWTxspj2OZHAwIbHRR+9V0pRiNZTJoAhtdC9BPFNLR8sxY7riDJrDRdQf3XazqzN9/B4NKzJQSVBeum4xGh6E4Z+VEaJ7hrplzbMPJAzw3lk4tqtuA7TPC6d74l2hhFNzkssoJY7lFIG1CJpfRAqdbeBcBgNaAXsZxlZOcsinYa2Awt/HRNGyhJIephencQWCwwLQWc19BCgk007CVgcCm0/dPPTxZNwjgEqSQQTMN220gsFWgNQ/aTjHMPTL0OSTQUoWNatVsphgU4d8Ht1M9Ndhq0A9XsXGfek5cCovQQEsRNqpVs2FJSo0PTHCgpQZbA3oHrWmrRjnr7BAyaKnBRt0TkMPsPk+KRat9PDDTB/GlApvOvoBvMJPuUMTv28UAWkqwVaCf929iCaXehLKJBbSUYFtrzEk38qNYtAae7pfPLH/iTcJ2zxC0GvRCtY5Vy4mg1r4elO0LLUzCdgdGrck9UbfXKY35UP2zbaygmYbtmSFsB9B3P1HroNQj3OuYQUsBtnvQ0x2UjgpKWsNrs6nLaxRjh41aMfiGeWUk6vHtXvd5ur4YNmbYqNfuzO3uCKbs5BO02GGjWrXbGQ5+MGUn36DFDJvO6T1TrNoCtIiz9v1gMo+/O1bYqG3fasIcFHFMu5RBixU2nTro2AYSalpjkzposcJG7e4Y20BCCQQaeCo7cQPNBmyKwZyo8zm3gSQHrZu25vCCuYBmGrYX+D8GoNZ4yQ+GrBnA5Jw0TqCZhG2B0wZl37BR5/LadUDBlZ04g2YDttLjXBqYa/umuANszjjhCJpp2F4AHFvo7j34b4/El90/1E8hwLJTX1fgq6r984sGZMMTEBX+JEZrnPJLOr7U1HTHCrTmzYc2NUHtpq25vMw3x+Px/y/ef/iEyPRjhgWzDd4/RJ/xsZ1DQQD87bn/+fvXTwHNoFQLG9UamARPZywUbXA6GowFaBniVg16q3W3zP4w5OPpjIWiHacXEbtFA+gH6dmweHm7hLo4p+wdLlQExKLxSjGYtngN3Fx60YBB2Sk10HRSDDbAc3HzXc3tBaQCms5BeqbBK2D/9rsttxeQgo9mIsUQmt6OWXDx0exqlcAcWR6tnxpocyLEULXlOKjUQAPivwmmFtB4qAGT658tBT0CGiOxuNA+FWuWMmhdwfljC10sftuO68CukLb2+PvugBKnTlaFMNMgGwEtnBfVvazFALw8AN+zEdDCXF4r/Om4yAfgcbswjfXynwlPs6PVz61/d8PMv9tyfnhi0fQsSN1bZpVn/64W0NJYZvv+XT4Az7Z/x/5GZwHN3jLb9++KAXim/bst9wcioLlRl0bpKhJqAF7Uy6aAFod/dxDQRC78uzqESQpo4ft3OwFNZNO/W7YQbkKYxF+t3CKRLUllQCSgieLRf80sS5fCDVbiAAAAAElFTkSuQmCC",
                progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUUlEQVRo3u3aMQ4AEAxAUcRJzGb3v1mt3cQglvcmc/NTA3XMFQUuNCPgVk/nahwchE2D6wnRIBpEg2hANIgG0SAaRAOiQTR8lV+5/avBpuGNDcz6A6oq1CgNAAAAAElFTkSuQmCC",
                progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAQElEQVRo3u3SMREAMAgAsVIpnTvj3xlogDmR8PfxftaBgSsBpsE0mAbTYBowDabBNJgG04BpMA2mwTSYBkzDXgP/hgGnr4PpeAAAAABJRU5ErkJggg=="
            }
        },
        handler: function(e, t) {
            if (e.Module) {
                var r = UnityLoader.Progress.Styles[e.Module.splashScreenStyle],
                    n = e.Module.progressLogoUrl ? e.Module.resolveBuildUrl(e.Module.progressLogoUrl) : r.progressLogoUrl,
                    o = e.Module.progressEmptyUrl ? e.Module.resolveBuildUrl(e.Module.progressEmptyUrl) : r.progressEmptyUrl,
                    i = e.Module.progressFullUrl ? e.Module.resolveBuildUrl(e.Module.progressFullUrl) : r.progressFullUrl,
                    a = "position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);";
                e.logo || (e.logo = document.createElement("div"), e.logo.style.cssText = a + "background: url('" + n + "') no-repeat center / contain; width: 154px; height: 130px;", e.container.appendChild(e.logo)), e.progress || (e.progress = document.createElement("div"), e.progress.style.cssText = a + " height: 18px; width: 141px; margin-top: 90px;", e.progress.empty = document.createElement("div"), e.progress.empty.style.cssText = "background: url('" + o + "') no-repeat right / cover; float: right; width: 100%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.empty), e.progress.full = document.createElement("div"), e.progress.full.style.cssText = "background: url('" + i + "') no-repeat left / cover; float: left; width: 0%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.full), e.container.appendChild(e.progress)), e.progress.full.style.width = 100 * t + "%", e.progress.empty.style.width = 100 * (1 - t) + "%", 1 == t && (e.logo.style.display = e.progress.style.display = "none")
            }
        },
        update: function(e, t, r) {
            if (r && !r.lengthComputable) {
                var n = r.target.responseURL,
                    o = n.split("/Build/")[1];
                o = o.split("?")[0];
                var a = window.config.cachedDecompressedFileSizes ? window.config.cachedDecompressedFileSizes[o] : 0;
                if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                    a *= .52
                }
            }
            var i = e.buildDownloadProgress[t];
            i || (i = e.buildDownloadProgress[t] = {
                started: !1,
                finished: !1,
                lengthComputable: !1,
                total: 0,
                loaded: 0
            }), "object" != typeof r || "progress" != r.type && "load" != r.type || (i.started || (i.started = !0, i.lengthComputable = r.lengthComputable, i.total = 0 == r.total ? a || 0 : r.total), i.loaded = r.loaded, "load" == r.type && (i.finished = !0));
            var s = 0,
                d = 0,
                l = 0,
                u = 0;
            for (var t in e.buildDownloadProgress) {
                if (i = e.buildDownloadProgress[t], !i.started) return 0;
                l++, s += i.loaded, d += i.total, u++
            }
            var f = l ? (l - 0 - (d ? u * (d - s) / d : 0)) / l : 0;
            f = Math.min(1, f), i.finished && 0 == i.loaded && (f = 1), e.unityInstance.onProgress(e.unityInstance, f)
        }
    },
    SystemInfo: function() {
        var e, t, r, o = navigator.appVersion,
            i = navigator.userAgent,
            a = navigator.appName,
            s = navigator.appVersion,
            d = parseInt(navigator.appVersion, 10); - 1 != (t = i.indexOf("Opera")) ? (a = "Opera", s = i.substring(t + 6), -1 != (t = i.indexOf("Version")) && (s = i.substring(t + 8))) : -1 != (t = i.indexOf("MSIE")) ? (a = "Microsoft Internet Explorer", s = i.substring(t + 5)) : -1 != (t = i.indexOf("Edge")) ? (a = "Edge", s = i.substring(t + 5)) : -1 != (t = i.indexOf("Chrome")) ? (a = "Chrome", s = i.substring(t + 7)) : -1 != (t = i.indexOf("Safari")) ? (a = "Safari", s = i.substring(t + 7), -1 != (t = i.indexOf("Version")) && (s = i.substring(t + 8))) : -1 != (t = i.indexOf("Firefox")) ? (a = "Firefox", s = i.substring(t + 8)) : -1 != i.indexOf("Trident/") ? (a = "Microsoft Internet Explorer", s = i.substring(i.indexOf("rv:") + 3)) : (e = i.lastIndexOf(" ") + 1) < (t = i.lastIndexOf("/")) && (a = i.substring(e, t), s = i.substring(t + 1), a.toLowerCase() == a.toUpperCase() && (a = navigator.appName)), -1 != (r = s.indexOf(";")) && (s = s.substring(0, r)), -1 != (r = s.indexOf(" ")) && (s = s.substring(0, r)), -1 != (r = s.indexOf(")")) && (s = s.substring(0, r)), d = parseInt("" + s, 10), isNaN(d) ? (s = "" + parseFloat(navigator.appVersion), d = parseInt(navigator.appVersion, 10)) : s = "" + parseFloat(s);
        var l = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(o),
            u = "-",
            c = [{
                s: "Windows 3.11",
                r: /Win16/
            }, {
                s: "Windows 95",
                r: /(Windows 95|Win95|Windows_95)/
            }, {
                s: "Windows ME",
                r: /(Win 9x 4.90|Windows ME)/
            }, {
                s: "Windows 98",
                r: /(Windows 98|Win98)/
            }, {
                s: "Windows CE",
                r: /Windows CE/
            }, {
                s: "Windows 2000",
                r: /(Windows NT 5.0|Windows 2000)/
            }, {
                s: "Windows XP",
                r: /(Windows NT 5.1|Windows XP)/
            }, {
                s: "Windows Server 2003",
                r: /Windows NT 5.2/
            }, {
                s: "Windows Vista",
                r: /Windows NT 6.0/
            }, {
                s: "Windows 7",
                r: /(Windows 7|Windows NT 6.1)/
            }, {
                s: "Windows 8.1",
                r: /(Windows 8.1|Windows NT 6.3)/
            }, {
                s: "Windows 8",
                r: /(Windows 8|Windows NT 6.2)/
            }, {
                s: "Windows 10",
                r: /(Windows 10|Windows NT 10.0)/
            }, {
                s: "Windows NT 4.0",
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
            }, {
                s: "Windows ME",
                r: /Windows ME/
            }, {
                s: "Android",
                r: /Android/
            }, {
                s: "Open BSD",
                r: /OpenBSD/
            }, {
                s: "Sun OS",
                r: /SunOS/
            }, {
                s: "Linux",
                r: /(Linux|X11)/
            }, {
                s: "iOS",
                r: /(iPhone|iPad|iPod)/
            }, {
                s: "Mac OS X",
                r: /Mac OS X/
            }, {
                s: "Mac OS",
                r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
            }, {
                s: "QNX",
                r: /QNX/
            }, {
                s: "UNIX",
                r: /UNIX/
            }, {
                s: "BeOS",
                r: /BeOS/
            }, {
                s: "OS/2",
                r: /OS\/2/
            }, {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }];
        for (var f in c) {
            var h = c[f];
            if (h.r.test(i)) {
                u = h.s;
                break
            }
        }
        var p = "-";
        switch (/Windows/.test(u) && (p = /Windows (.*)/.exec(u)[1], u = "Windows"), u) {
            case "Mac OS X":
                p = /Mac OS X (1[\.\_\d][\.\_\d]+)/.exec(i)[1];
                break;
            case "Android":
                p = /Android ([\.\_\d]+)/.exec(i)[1];
                break;
            case "iOS":
                p = /OS (\d+)_(\d+)_?(\d+)?/.exec(o), p = p[1] + "." + p[2] + "." + (0 | p[3])
        }
        return {
            width: screen.width ? screen.width : 0,
            height: screen.height ? screen.height : 0,
            browser: a,
            browserVersion: s,
            mobile: l,
            os: u,
            osVersion: p,
            gpu: function() {
                var e = document.createElement("canvas"),
                    t = e.getContext("experimental-webgl");
                if (t) {
                    var r = t.getExtension("WEBGL_debug_renderer_info");
                    if (r) return t.getParameter(r.UNMASKED_RENDERER_WEBGL)
                }
                return "-"
            }(),
            language: window.navigator.userLanguage || window.navigator.language,
            hasWebGL: function() {
                if (!window.WebGLRenderingContext) return 0;
                var e = document.createElement("canvas"),
                    t = e.getContext("webgl2");
                return t ? 2 : (t = e.getContext("experimental-webgl2"), t ? 2 : (t = e.getContext("webgl"), t || (t = e.getContext("experimental-webgl")) ? 1 : 0))
            }(),
            hasCursorLock: function() {
                var e = document.createElement("canvas");
                return e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock || e.msRequestPointerLock ? 1 : 0
            }(),
            hasFullscreen: function() {
                var e = document.createElement("canvas");
                return (e.requestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen || e.webkitRequestFullScreen) && (-1 == a.indexOf("Safari") || s >= 10.1) ? 1 : 0
            }(),
            hasThreads: "undefined" != typeof SharedArrayBuffer,
            hasWasm: "object" == typeof WebAssembly && "function" == typeof WebAssembly.validate && "function" == typeof WebAssembly.compile,
            hasWasmThreads: function() {
                if ("object" != typeof WebAssembly) return !1;
                if ("undefined" == typeof SharedArrayBuffer) return !1;
                var e = new WebAssembly.Memory({
                        initial: 1,
                        maximum: 1,
                        shared: !0
                    }),
                    t = e.buffer instanceof SharedArrayBuffer;
                return delete e, t
            }()
        }
    }(),
    compatibilityCheck: function(e, t, r) {
        UnityLoader.SystemInfo.hasWebGL ? UnityLoader.SystemInfo.mobile ? e.popup("Please note that Unity WebGL is not currently supported on mobiles. Press OK if you wish to continue anyway.", [{
            text: "OK",
            callback: t
        }]) : -1 == ["Edge", "Firefox", "Chrome", "Safari"].indexOf(UnityLoader.SystemInfo.browser) ? e.popup("Please note that your browser is not currently supported for this Unity WebGL content. Press OK if you wish to continue anyway.", [{
            text: "OK",
            callback: t
        }]) : t() : e.popup("Your browser does not support WebGL", [{
            text: "OK",
            callback: r
        }])
    },
    buildCompatibilityCheck: function(e, t, r) {
        ! function() {
            if (void 0 === e.graphicsAPI) return !0;
            for (var t = 0; t < e.graphicsAPI.length; t++) {
                var r = e.graphicsAPI[t];
                if ("WebGL 2.0" == r && 2 == UnityLoader.SystemInfo.hasWebGL) return !0;
                if ("WebGL 1.0" == r && UnityLoader.SystemInfo.hasWebGL >= 1) return !0;
                e.print("Warning: Unsupported graphics API " + r)
            }
            return !1
        }() ? r("Your browser does not support any of the required graphics API for this content."): !UnityLoader.SystemInfo.hasThreads && e.multithreading ? r("Your browser does not support multithreading.") : t()
    },
    Blobs: {},
    loadCode: function(e, t, r, n) {
        var o = [].slice.call(UnityLoader.Cryptography.md5(t)).map(function(e) {
                return ("0" + e.toString(16)).substr(-2)
            }).join(""),
            i = document.createElement("script"),
            a = (n.isModularized ? function(e) {
                return new Blob([e], {
                    type: "application/javascript"
                })
            } : function(e, t) {
                return new Blob(['UnityLoader["' + t + '"]=', e], {
                    type: "text/javascript"
                })
            })(t, o),
            s = URL.createObjectURL(a);
        UnityLoader.Blobs[s] = n, e.deinitializers.push(function() {
            delete UnityLoader.Blobs[s], delete UnityLoader[o], document.body.removeChild(document.getElementById(o))
        }), i.src = s, i.id = o, i.onload = function() {
            e.developmentBuild || URL.revokeObjectURL(s), r(o, a), delete i.onload
        }, document.body.appendChild(i)
    },
    setupIndexedDBJob: function(e, t) {
        function r(n) {
            r.called || (r.called = !0, e.indexedDB = n, t.complete())
        }
        try {
            var n = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
                o = n.open("/idbfs-test");
            o.onerror = function(e) {
                e.preventDefault(), r()
            }, o.onsuccess = function() {
                o.result.close(), r(n)
            }, setTimeout(r, 1e3)
        } catch (e) {
            r()
        }
    },
    processWasmCodeJob: function(e, t) {
        e.wasmBinary = UnityLoader.Job.result(e, "downloadWasmCode"), t.complete()
    },
    processWasmFrameworkJob: function(e, t) {
        var r = UnityLoader.Job.result(e, "downloadWasmFramework");
        UnityLoader.loadCode(e, r, function(r, n) {
            e.mainScriptUrlOrBlob = n, e.isModularized && (UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
        }, {
            Module: e,
            url: e.wasmFrameworkUrl,
            isModularized: e.isModularized
        })
    },
    processAsmCodeJob: function(e, t) {
        var r = UnityLoader.Job.result(e, "downloadAsmCode");
        UnityLoader.loadCode(e, Math.fround ? r : UnityLoader.Utils.optimizeMathFround(r), function(r, n) {
            e.isModularized ? e.asmJsUrlOrBlob = n : e.asm = UnityLoader[r], t.complete()
        }, {
            Module: e,
            url: e.asmCodeUrl,
            isModularized: e.isModularized
        })
    },
    processAsmFrameworkJob: function(e, t) {
        var r = UnityLoader.Job.result(e, "downloadAsmFramework");
        UnityLoader.loadCode(e, r, function(r, n) {
            e.isModularized && (e.mainScriptUrlOrBlob = n, UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
        }, {
            Module: e,
            url: e.asmFrameworkUrl,
            isModularized: e.isModularized
        })
    },
    processMemoryInitializerJob: function(e, t) {
        e.memoryInitializerRequest.status = 200, e.memoryInitializerRequest.response = UnityLoader.Job.result(e, "downloadMemoryInitializer"), e.memoryInitializerRequest.callback && e.memoryInitializerRequest.callback(), t.complete()
    },
    processDataJob: function(e, t) {
        var r = UnityLoader.Job.result(e, "downloadData"),
            n = new DataView(r.buffer, r.byteOffset, r.byteLength),
            o = 0,
            i = "UnityWebData1.0\0";
        if (!String.fromCharCode.apply(null, r.subarray(o, o + i.length)) == i) throw "unknown data format";
        o += i.length;
        var a = n.getUint32(o, !0);
        for (o += 4; o < a;) {
            var s = n.getUint32(o, !0);
            o += 4;
            var d = n.getUint32(o, !0);
            o += 4;
            var l = n.getUint32(o, !0);
            o += 4;
            var u = String.fromCharCode.apply(null, r.subarray(o, o + l));
            o += l;
            for (var c = 0, f = u.indexOf("/", c) + 1; f > 0; c = f, f = u.indexOf("/", c) + 1) e.FS_createPath(u.substring(0, c), u.substring(c, f - 1), !0, !0);
            e.FS_createDataFile(u, null, r.subarray(s, s + d), !0, !0, !0)
        }
        e.removeRunDependency("processDataJob"), t.complete()
    },
    downloadJob: function(e, t) {
        var r = t.parameters.objParameters ? new UnityLoader.UnityCache.XMLHttpRequest(t.parameters.objParameters) : new XMLHttpRequest;
        r.open("GET", t.parameters.url), r.responseType = "arraybuffer", r.onload = function() {
            UnityLoader.Compression.decompress(new Uint8Array(r.response), function(e) {
                t.complete(e)
            })
        }, t.parameters.onprogress && r.addEventListener("progress", t.parameters.onprogress), t.parameters.onload && r.addEventListener("load", t.parameters.onload), r.send()
    },
    scheduleBuildDownloadJob: function(e, t, r) {
        UnityLoader.Progress.update(e, t), UnityLoader.Job.schedule(e, t, [], UnityLoader.downloadJob, {
            url: e.resolveBuildUrl(e[r]),
            onprogress: function(r) {
                UnityLoader.Progress.update(e, t, r)
            },
            onload: function(r) {
                UnityLoader.Progress.update(e, t, r)
            },
            objParameters: e.companyName && e.productName && e.cacheControl && (e.cacheControl[r] || e.cacheControl.default) ? {
                companyName: e.companyName,
                productName: e.productName,
                cacheControl: e.cacheControl[r] || e.cacheControl.default
            } : null
        })
    },
    loadModule: function(e, t) {
        if (e.useWasm = e.wasmCodeUrl && UnityLoader.SystemInfo.hasWasm, e.useWasm) {
            if (e.multithreading && !UnityLoader.SystemInfo.hasWasmThreads) return void t("Your browser does not support WebAssembly Threads.");
            var r = ["downloadWasmFramework", "setupIndexedDB"];
            e.wasmCodeUrl.endsWith(".unityweb") && (UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmCode", "wasmCodeUrl"), UnityLoader.Job.schedule(e, "processWasmCode", ["downloadWasmCode"], UnityLoader.processWasmCodeJob), r.push("processWasmCode")), e.wasmMemoryUrl && (UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "wasmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
                addEventListener: function(t, r) {
                    e.memoryInitializerRequest.callback = r
                }
            }), UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmFramework", "wasmFrameworkUrl"), UnityLoader.Job.schedule(e, "processWasmFramework", r, UnityLoader.processWasmFrameworkJob)
        } else {
            if (!e.asmCodeUrl) return void t("Your browser does not support WebAssembly.");
            UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmCode", "asmCodeUrl"), UnityLoader.Job.schedule(e, "processAsmCode", ["downloadAsmCode"], UnityLoader.processAsmCodeJob), UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "asmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
                addEventListener: function(t, r) {
                    e.memoryInitializerRequest.callback = r
                }
            }, e.asmLibraryUrl && (e.dynamicLibraries = [e.asmLibraryUrl].map(e.resolveBuildUrl)), UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmFramework", "asmFrameworkUrl"), UnityLoader.Job.schedule(e, "processAsmFramework", ["downloadAsmFramework", "processAsmCode", "setupIndexedDB"], UnityLoader.processAsmFrameworkJob)
        }
        UnityLoader.scheduleBuildDownloadJob(e, "downloadData", "dataUrl"), UnityLoader.Job.schedule(e, "setupIndexedDB", [], UnityLoader.setupIndexedDBJob), e.preRun.push(function() {
            e.addRunDependency("processDataJob"), UnityLoader.Job.schedule(e, "processData", ["downloadData"], UnityLoader.processDataJob)
        })
    },
    instantiate: function(e, t, r) {
        function n(e, n) {
            if ("string" == typeof e && !(e = document.getElementById(e))) return !1;
            e.innerHTML = "", e.style.border = e.style.margin = e.style.padding = 0, "static" == getComputedStyle(e).getPropertyValue("position") && (e.style.position = "relative"), e.style.width = n.width || e.style.width, e.style.height = n.height || e.style.height, n.container = e;
            var o = n.Module;
            o.canvas = document.createElement("canvas"), o.canvas.style.width = "100%", o.canvas.style.height = "100%", o.canvas.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            }), o.canvas.id = "#canvas", e.appendChild(o.canvas), o.deinitializers.push(function() {
                e.removeChild(o.canvas)
            });
            var i = !0;
            return n.compatibilityCheck(n, function() {
                var t = new XMLHttpRequest;
                t.open("GET", n.url, !0), t.responseType = "text", t.onerror = function() {
                    o.print("Could not download " + n.url), 0 == document.URL.indexOf("file:") && alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser.")
                }, t.onload = function() {
                    var a = JSON.parse(t.responseText);
                    for (var s in a) void 0 === o[s] && (o[s] = a[s]);
                    if (o.unityVersion) {
                        var d = o.unityVersion.match(/(\d+)\.(\d+)\.(\d+)(.+)/);
                        d && (o.unityVersion = {
                            string: o.unityVersion,
                            version: parseInt(d[0]),
                            major: parseInt(d[1]),
                            minor: parseInt(d[2]),
                            suffix: d[3]
                        })
                    }
                    o.isModularized = o.unityVersion && o.unityVersion.version >= 2019, UnityLoader.buildCompatibilityCheck(o, function() {
                        e.style.background = o.backgroundUrl ? "center/cover url('" + o.resolveBuildUrl(o.backgroundUrl) + "')" : o.backgroundColor ? " " + o.backgroundColor : "", n.onProgress(n, 0), i = UnityLoader.loadModule(o, r.onerror)
                    }, r.onerror)
                }, t.send()
            }, function() {
                var e = "Instantiation of '" + t + "' terminated due to the failed compatibility check.";
                "object" == typeof r && "function" == typeof r.onerror ? r.onerror(e) : o.printErr(e)
            }), i
        }

        function o(e) {
            //return o.link = o.link || document.createElement("a"), o.link.href = e, o.link.href
        }
        void 0 === r && (r = {}), void 0 === r.onerror && (r.onerror = function(e) {
            i.popup(e, [{
                text: "OK"
            }])
        });
        var i = {
            url: t,
            onProgress: UnityLoader.Progress.handler,
            compatibilityCheck: UnityLoader.compatibilityCheck,
            Module: {
                deinitializers: [],
                intervals: {},
                setInterval: function(e, t) {
                    var r = window.setInterval(e, t);
                    return this.intervals[r] = !0, r
                },
                clearInterval: function(e) {
                    delete this.intervals[e], window.clearInterval(e)
                },
                onAbort: function(e) {
                    throw void 0 !== e ? (this.print(e), this.printErr(e), e = JSON.stringify(e)) : e = "", "abort(" + e + ") at " + this.stackTrace()
                },
                preRun: [],
                postRun: [],
                print: function(e) {
                    console.log(e)
                },
                printErr: function(e) {
                    console.error(e)
                },
                Jobs: {},
                buildDownloadProgress: {},
                resolveBuildUrl: function(e) {
                    var url = e.match(/(http|https|ftp|file):\/\//) ? e : t.substring(0, t.lastIndexOf("/") + 1) + e;
                    return window.config && void 0 != window.config.cacheVersion && void 0 != window.config.gameSlug, url
                },
                streamingAssetsUrl: function() {
                    return o(this.resolveBuildUrl("../StreamingAssets"))
                },
                locateFile: function(e) {
                    return "Build/".concat("build.wasm" == e ? this.wasmCodeUrl : e)
                }
            },
            SetFullscreen: function() {
                if (i.Module.SetFullscreen) return i.Module.SetFullscreen.apply(i.Module, arguments)
            },
            SendMessage: function() {
                if (i.Module.SendMessage) return i.Module.SendMessage.apply(i.Module, arguments)
            },
            Quit: function(e) {
                "function" == typeof e && (i.Module.onQuit = e), i.Module.shouldQuit = !0
            }
        };
        i.Module.unityInstance = i, i.popup = function(e, t) {
            return UnityLoader.Error.popup(i, e, t)
        }, i.Module.postRun.push(function() {
            i.onProgress(i, 1), "object" == typeof r && "function" == typeof r.onsuccess && r.onsuccess(i.Module)
        });
        for (var a in r)
            if ("Module" == a)
                for (var s in r[a]) i.Module[s] = r[a][s];
            else i[a] = r[a];
        return n(e, i) || document.addEventListener("DOMContentLoaded", function() {
            n(e, i)
        }), i
    },
    Utils: {
        assert: function(e, t) {
            e || abort("Assertion failed: " + t)
        },
        optimizeMathFround: function(e, t) {
            console.log("optimizing out Math.fround calls");
            for (var r = {
                    LOOKING_FOR_MODULE: 0,
                    SCANNING_MODULE_VARIABLES: 1,
                    SCANNING_MODULE_FUNCTIONS: 2
                }, n = ["EMSCRIPTEN_START_ASM", "EMSCRIPTEN_START_FUNCS", "EMSCRIPTEN_END_FUNCS"], i = "global.Math.fround;", a = 0, s = t ? r.LOOKING_FOR_MODULE : r.SCANNING_MODULE_VARIABLES, d = 0, l = 0; s <= r.SCANNING_MODULE_FUNCTIONS && a < e.length; a++)
                if (47 == e[a] && 47 == e[a + 1] && 32 == e[a + 2] && String.fromCharCode.apply(null, e.subarray(a + 3, a + 3 + n[s].length)) === n[s]) s++;
                else if (s != r.SCANNING_MODULE_VARIABLES || l || 61 != e[a] || String.fromCharCode.apply(null, e.subarray(a + 1, a + 1 + i.length)) !== i) {
                if (l && 40 == e[a]) {
                    for (var u = 0; u < l && e[a - 1 - u] == e[d - u];) u++;
                    if (u == l) {
                        var c = e[a - 1 - u];
                        if (c < 36 || 36 < c && c < 48 || 57 < c && c < 65 || 90 < c && c < 95 || 95 < c && c < 97 || 122 < c)
                            for (; u; u--) e[a - u] = 32
                    }
                }
            } else {
                for (d = a - 1; 32 != e[d - l];) l++;
                l && "var" === String.fromCharCode.apply(null, e.subarray(d - l - "var".length, d - l)) || (d = l = 0)
            }
            return e
        }
    },
    UnityCache: function() {
        function e(e) {
            console.log("[UnityCache] " + e)
        }

        function t(e) {
            return t.link = t.link || document.createElement("a"), t.link.href = e, t.link.href
        }

        function r(e) {
            var t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
            //return !t || e.lastIndexOf(t[0], 0)
        }

        function n() {
            function t(t) {
                if (void 0 === n.database)
                    for (n.database = t, n.database || e("indexedDB database could not be opened"); n.queue.length;) {
                        var r = n.queue.shift();
                        n.database ? n.execute.apply(n, r) : "function" == typeof r.onerror && r.onerror(new Error("operation cancelled"))
                    }
            }

            function r() {
                var e = o.open(a.name, a.version);
                e.onupgradeneeded = function(e) {
                    var t = e.target.result;
                    t.objectStoreNames.contains(d.name) || t.createObjectStore(d.name)
                }, e.onsuccess = function(e) {
                    t(e.target.result)
                }, e.onerror = function() {
                    t(null)
                }
            }
            var n = this;
            n.queue = [];
            try {
                var o = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
                    i = o.open(a.name);
                i.onupgradeneeded = function(e) {
                    var t = e.target.result.createObjectStore(s.name, {
                        keyPath: "url"
                    });
                    ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function(e) {
                        t.createIndex(e, e)
                    })
                }, i.onsuccess = function(e) {
                    var n = e.target.result;
                    n.version < a.version ? (n.close(), r()) : t(n)
                }, i.onerror = function() {
                    t(null)
                }, setTimeout(i.onerror, 1e3)
            } catch (e) {
                t(null)
            }
        }

        function o(e, t, r, n, o) {
            var i = {
                url: e,
                version: s.version,
                company: t,
                product: r,
                updated: n,
                revalidated: n,
                accessed: n,
                responseHeaders: {},
                xhr: {}
            };
            return o && (["Last-Modified", "ETag"].forEach(function(e) {
                i.responseHeaders[e] = o.getResponseHeader(e)
            }), ["responseURL", "status", "statusText", "response"].forEach(function(e) {
                i.xhr[e] = o[e]
            })), i
        }

        function i(t) {
            this.cache = {
                enabled: !1
            }, t && (this.cache.control = t.cacheControl, this.cache.company = t.companyName, this.cache.product = t.productName), this.xhr = new XMLHttpRequest(t), this.xhr.addEventListener("load", function() {
                var t = this.xhr,
                    r = this.cache;
                r.enabled && !r.revalidated && (304 == t.status ? (r.result.revalidated = r.result.accessed, r.revalidated = !0, l.execute(s.name, "put", [r.result]), e("'" + r.result.url + "' successfully revalidated and served from the indexedDB cache")) : 200 == t.status ? (r.result = o(r.result.url, r.company, r.product, r.result.accessed, t), r.revalidated = !0, l.execute(s.name, "put", [r.result], function(t) {
                    e("'" + r.result.url + "' successfully downloaded and stored in the indexedDB cache")
                }, function(t) {
                    e("'" + r.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + t)
                })) : e("'" + r.result.url + "' request failed with status: " + t.status + " " + t.statusText))
            }.bind(this))
        }
        var a = {
                name: "UnityCache",
                version: 2
            },
            s = {
                name: "XMLHttpRequest",
                version: 1
            },
            d = {
                name: "WebAssembly",
                version: 1
            };
        n.prototype.execute = function(e, t, r, n, o) {
            if (this.database) try {
                var i = this.database.transaction([e], -1 != ["put", "delete", "clear"].indexOf(t) ? "readwrite" : "readonly").objectStore(e);
                "openKeyCursor" == t && (i = i.index(r[0]), r = r.slice(1));
                var a = i[t].apply(i, r);
                "function" == typeof n && (a.onsuccess = function(e) {
                    n(e.target.result)
                }), a.onerror = o
            } catch (e) {
                "function" == typeof o && o(e)
            } else void 0 === this.database ? this.queue.push(arguments) : "function" == typeof o && o(new Error("indexedDB access denied"))
        };
        var l = new n;
        i.prototype.send = function(t) {
            var n = this.xhr,
                o = this.cache,
                i = arguments;
            return o.enabled = o.enabled && "arraybuffer" == n.responseType && !t, o.enabled ? void l.execute(s.name, "get", [o.result.url], function(t) {
                if (!t || t.version != s.version) return void n.send.apply(n, i);
                if (o.result = t, o.result.accessed = Date.now(), "immutable" == o.control) o.revalidated = !0, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' served from the indexedDB cache without revalidation");
                else if (r(o.result.url) && (o.result.responseHeaders["Last-Modified"] || o.result.responseHeaders.ETag)) {
                    var a = new XMLHttpRequest;
                    a.open("HEAD", o.result.url), a.onload = function() {
                        o.revalidated = ["Last-Modified", "ETag"].every(function(e) {
                            return !o.result.responseHeaders[e] || o.result.responseHeaders[e] == a.getResponseHeader(e)
                        }), o.revalidated ? (o.result.revalidated = o.result.accessed, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' successfully revalidated and served from the indexedDB cache")) : n.send.apply(n, i)
                    }, a.send()
                } else o.result.responseHeaders["Last-Modified"] ? (n.setRequestHeader("If-Modified-Since", o.result.responseHeaders["Last-Modified"]), n.setRequestHeader("Cache-Control", "no-cache")) : o.result.responseHeaders.ETag && (n.setRequestHeader("If-None-Match", o.result.responseHeaders.ETag), n.setRequestHeader("Cache-Control", "no-cache")), n.send.apply(n, i)
            }, function(e) {
                n.send.apply(n, i)
            }) : n.send.apply(n, i)
        }, i.prototype.open = function(e, r, n, i, a) {
            return this.cache.result = o(t(r), this.cache.company, this.cache.product, Date.now()), this.cache.enabled = -1 != ["must-revalidate", "immutable"].indexOf(this.cache.control) && "GET" == e && this.cache.result.url.match("^https?://") && (void 0 === n || n) && void 0 === i && void 0 === a, this.cache.revalidated = !1, this.xhr.open.apply(this.xhr, arguments)
        }, i.prototype.setRequestHeader = function(e, t) {
            return this.cache.enabled = !1, this.xhr.setRequestHeader.apply(this.xhr, arguments)
        };
        var u = new XMLHttpRequest;
        for (var c in u) i.prototype.hasOwnProperty(c) || function(e) {
            Object.defineProperty(i.prototype, e, "function" == typeof u[e] ? {
                value: function() {
                    return this.xhr[e].apply(this.xhr, arguments)
                }
            } : {
                get: function() {
                    return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(e) ? this.cache.result.xhr[e] : this.xhr[e]
                },
                set: function(t) {
                    this.xhr[e] = t
                }
            })
        }(c);
        return {
            XMLHttpRequest: i,
            WebAssembly: {
                get: function(e, r) {
                    var n = {
                        url: t(e),
                        version: d.version,
                        module: null,
                        md5: null
                    };
                    l.execute(d.name, "get", [n.url], function(e) {
                        r(e && e.version == d.version ? e : n)
                    }, function() {
                        r(n)
                    })
                },
                put: function(e, t, r) {
                    l.execute(d.name, "put", [e, e.url], t, r)
                }
            }
        }
    }()
};