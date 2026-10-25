(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=t(r);fetch(r.href,l)}})();function MA(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var Hm={exports:{}},$u={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yy;function EA(){if(yy)return $u;yy=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function t(i,r,l){var c=null;if(l!==void 0&&(c=""+l),r.key!==void 0&&(c=""+r.key),"key"in r){l={};for(var f in r)f!=="key"&&(l[f]=r[f])}else l=r;return r=l.ref,{$$typeof:o,type:i,key:c,ref:r!==void 0?r:null,props:l}}return $u.Fragment=e,$u.jsx=t,$u.jsxs=t,$u}var My;function TA(){return My||(My=1,Hm.exports=EA()),Hm.exports}var X=TA(),Gm={exports:{}},vt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ey;function bA(){if(Ey)return vt;Ey=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),l=Symbol.for("react.consumer"),c=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function x(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,S={};function y(P,ne,_e){this.props=P,this.context=ne,this.refs=S,this.updater=_e||M}y.prototype.isReactComponent={},y.prototype.setState=function(P,ne){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,ne,"setState")},y.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function C(){}C.prototype=y.prototype;function F(P,ne,_e){this.props=P,this.context=ne,this.refs=S,this.updater=_e||M}var R=F.prototype=new C;R.constructor=F,E(R,y.prototype),R.isPureReactComponent=!0;var D=Array.isArray;function N(){}var w={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function L(P,ne,_e){var Ae=_e.ref;return{$$typeof:o,type:P,key:ne,ref:Ae!==void 0?Ae:null,props:_e}}function I(P,ne){return L(P.type,ne,P.props)}function V(P){return typeof P=="object"&&P!==null&&P.$$typeof===o}function k(P){var ne={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(_e){return ne[_e]})}var J=/\/+/g;function Y(P,ne){return typeof P=="object"&&P!==null&&P.key!=null?k(""+P.key):ne.toString(36)}function Q(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(N,N):(P.status="pending",P.then(function(ne){P.status==="pending"&&(P.status="fulfilled",P.value=ne)},function(ne){P.status==="pending"&&(P.status="rejected",P.reason=ne)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function H(P,ne,_e,Ae,Ne){var Be=typeof P;(Be==="undefined"||Be==="boolean")&&(P=null);var ie=!1;if(P===null)ie=!0;else switch(Be){case"bigint":case"string":case"number":ie=!0;break;case"object":switch(P.$$typeof){case o:case e:ie=!0;break;case _:return ie=P._init,H(ie(P._payload),ne,_e,Ae,Ne)}}if(ie)return Ne=Ne(P),ie=Ae===""?"."+Y(P,0):Ae,D(Ne)?(_e="",ie!=null&&(_e=ie.replace(J,"$&/")+"/"),H(Ne,ne,_e,"",function(at){return at})):Ne!=null&&(V(Ne)&&(Ne=I(Ne,_e+(Ne.key==null||P&&P.key===Ne.key?"":(""+Ne.key).replace(J,"$&/")+"/")+ie)),ne.push(Ne)),1;ie=0;var pe=Ae===""?".":Ae+":";if(D(P))for(var Ce=0;Ce<P.length;Ce++)Ae=P[Ce],Be=pe+Y(Ae,Ce),ie+=H(Ae,ne,_e,Be,Ne);else if(Ce=x(P),typeof Ce=="function")for(P=Ce.call(P),Ce=0;!(Ae=P.next()).done;)Ae=Ae.value,Be=pe+Y(Ae,Ce++),ie+=H(Ae,ne,_e,Be,Ne);else if(Be==="object"){if(typeof P.then=="function")return H(Q(P),ne,_e,Ae,Ne);throw ne=String(P),Error("Objects are not valid as a React child (found: "+(ne==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":ne)+"). If you meant to render a collection of children, use an array instead.")}return ie}function G(P,ne,_e){if(P==null)return P;var Ae=[],Ne=0;return H(P,Ae,"","",function(Be){return ne.call(_e,Be,Ne++)}),Ae}function te(P){if(P._status===-1){var ne=P._result;ne=ne(),ne.then(function(_e){(P._status===0||P._status===-1)&&(P._status=1,P._result=_e)},function(_e){(P._status===0||P._status===-1)&&(P._status=2,P._result=_e)}),P._status===-1&&(P._status=0,P._result=ne)}if(P._status===1)return P._result.default;throw P._result}var ee=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var ne=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(ne))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},z={map:G,forEach:function(P,ne,_e){G(P,function(){ne.apply(this,arguments)},_e)},count:function(P){var ne=0;return G(P,function(){ne++}),ne},toArray:function(P){return G(P,function(ne){return ne})||[]},only:function(P){if(!V(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return vt.Activity=v,vt.Children=z,vt.Component=y,vt.Fragment=t,vt.Profiler=r,vt.PureComponent=F,vt.StrictMode=i,vt.Suspense=p,vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,vt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return w.H.useMemoCache(P)}},vt.cache=function(P){return function(){return P.apply(null,arguments)}},vt.cacheSignal=function(){return null},vt.cloneElement=function(P,ne,_e){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ae=E({},P.props),Ne=P.key;if(ne!=null)for(Be in ne.key!==void 0&&(Ne=""+ne.key),ne)!b.call(ne,Be)||Be==="key"||Be==="__self"||Be==="__source"||Be==="ref"&&ne.ref===void 0||(Ae[Be]=ne[Be]);var Be=arguments.length-2;if(Be===1)Ae.children=_e;else if(1<Be){for(var ie=Array(Be),pe=0;pe<Be;pe++)ie[pe]=arguments[pe+2];Ae.children=ie}return L(P.type,Ne,Ae)},vt.createContext=function(P){return P={$$typeof:c,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:l,_context:P},P},vt.createElement=function(P,ne,_e){var Ae,Ne={},Be=null;if(ne!=null)for(Ae in ne.key!==void 0&&(Be=""+ne.key),ne)b.call(ne,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Ne[Ae]=ne[Ae]);var ie=arguments.length-2;if(ie===1)Ne.children=_e;else if(1<ie){for(var pe=Array(ie),Ce=0;Ce<ie;Ce++)pe[Ce]=arguments[Ce+2];Ne.children=pe}if(P&&P.defaultProps)for(Ae in ie=P.defaultProps,ie)Ne[Ae]===void 0&&(Ne[Ae]=ie[Ae]);return L(P,Be,Ne)},vt.createRef=function(){return{current:null}},vt.forwardRef=function(P){return{$$typeof:f,render:P}},vt.isValidElement=V,vt.lazy=function(P){return{$$typeof:_,_payload:{_status:-1,_result:P},_init:te}},vt.memo=function(P,ne){return{$$typeof:d,type:P,compare:ne===void 0?null:ne}},vt.startTransition=function(P){var ne=w.T,_e={};w.T=_e;try{var Ae=P(),Ne=w.S;Ne!==null&&Ne(_e,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(N,ee)}catch(Be){ee(Be)}finally{ne!==null&&_e.types!==null&&(ne.types=_e.types),w.T=ne}},vt.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},vt.use=function(P){return w.H.use(P)},vt.useActionState=function(P,ne,_e){return w.H.useActionState(P,ne,_e)},vt.useCallback=function(P,ne){return w.H.useCallback(P,ne)},vt.useContext=function(P){return w.H.useContext(P)},vt.useDebugValue=function(){},vt.useDeferredValue=function(P,ne){return w.H.useDeferredValue(P,ne)},vt.useEffect=function(P,ne){return w.H.useEffect(P,ne)},vt.useEffectEvent=function(P){return w.H.useEffectEvent(P)},vt.useId=function(){return w.H.useId()},vt.useImperativeHandle=function(P,ne,_e){return w.H.useImperativeHandle(P,ne,_e)},vt.useInsertionEffect=function(P,ne){return w.H.useInsertionEffect(P,ne)},vt.useLayoutEffect=function(P,ne){return w.H.useLayoutEffect(P,ne)},vt.useMemo=function(P,ne){return w.H.useMemo(P,ne)},vt.useOptimistic=function(P,ne){return w.H.useOptimistic(P,ne)},vt.useReducer=function(P,ne,_e){return w.H.useReducer(P,ne,_e)},vt.useRef=function(P){return w.H.useRef(P)},vt.useState=function(P){return w.H.useState(P)},vt.useSyncExternalStore=function(P,ne,_e){return w.H.useSyncExternalStore(P,ne,_e)},vt.useTransition=function(){return w.H.useTransition()},vt.version="19.2.0",vt}var Ty;function $g(){return Ty||(Ty=1,Gm.exports=bA()),Gm.exports}var mt=$g();const AA=MA(mt);var Vm={exports:{}},ec={},km={exports:{}},Xm={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var by;function RA(){return by||(by=1,(function(o){function e(H,G){var te=H.length;H.push(G);e:for(;0<te;){var ee=te-1>>>1,z=H[ee];if(0<r(z,G))H[ee]=G,H[te]=z,te=ee;else break e}}function t(H){return H.length===0?null:H[0]}function i(H){if(H.length===0)return null;var G=H[0],te=H.pop();if(te!==G){H[0]=te;e:for(var ee=0,z=H.length,P=z>>>1;ee<P;){var ne=2*(ee+1)-1,_e=H[ne],Ae=ne+1,Ne=H[Ae];if(0>r(_e,te))Ae<z&&0>r(Ne,_e)?(H[ee]=Ne,H[Ae]=te,ee=Ae):(H[ee]=_e,H[ne]=te,ee=ne);else if(Ae<z&&0>r(Ne,te))H[ee]=Ne,H[Ae]=te,ee=Ae;else break e}}return G}function r(H,G){var te=H.sortIndex-G.sortIndex;return te!==0?te:H.id-G.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var l=performance;o.unstable_now=function(){return l.now()}}else{var c=Date,f=c.now();o.unstable_now=function(){return c.now()-f}}var p=[],d=[],_=1,v=null,g=3,x=!1,M=!1,E=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;function R(H){for(var G=t(d);G!==null;){if(G.callback===null)i(d);else if(G.startTime<=H)i(d),G.sortIndex=G.expirationTime,e(p,G);else break;G=t(d)}}function D(H){if(E=!1,R(H),!M)if(t(p)!==null)M=!0,N||(N=!0,k());else{var G=t(d);G!==null&&Q(D,G.startTime-H)}}var N=!1,w=-1,b=5,L=-1;function I(){return S?!0:!(o.unstable_now()-L<b)}function V(){if(S=!1,N){var H=o.unstable_now();L=H;var G=!0;try{e:{M=!1,E&&(E=!1,C(w),w=-1),x=!0;var te=g;try{t:{for(R(H),v=t(p);v!==null&&!(v.expirationTime>H&&I());){var ee=v.callback;if(typeof ee=="function"){v.callback=null,g=v.priorityLevel;var z=ee(v.expirationTime<=H);if(H=o.unstable_now(),typeof z=="function"){v.callback=z,R(H),G=!0;break t}v===t(p)&&i(p),R(H)}else i(p);v=t(p)}if(v!==null)G=!0;else{var P=t(d);P!==null&&Q(D,P.startTime-H),G=!1}}break e}finally{v=null,g=te,x=!1}G=void 0}}finally{G?k():N=!1}}}var k;if(typeof F=="function")k=function(){F(V)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,Y=J.port2;J.port1.onmessage=V,k=function(){Y.postMessage(null)}}else k=function(){y(V,0)};function Q(H,G){w=y(function(){H(o.unstable_now())},G)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(H){H.callback=null},o.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<H?Math.floor(1e3/H):5},o.unstable_getCurrentPriorityLevel=function(){return g},o.unstable_next=function(H){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var te=g;g=G;try{return H()}finally{g=te}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(H,G){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var te=g;g=H;try{return G()}finally{g=te}},o.unstable_scheduleCallback=function(H,G,te){var ee=o.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?ee+te:ee):te=ee,H){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=te+z,H={id:_++,callback:G,priorityLevel:H,startTime:te,expirationTime:z,sortIndex:-1},te>ee?(H.sortIndex=te,e(d,H),t(p)===null&&H===t(d)&&(E?(C(w),w=-1):E=!0,Q(D,te-ee))):(H.sortIndex=z,e(p,H),M||x||(M=!0,N||(N=!0,k()))),H},o.unstable_shouldYield=I,o.unstable_wrapCallback=function(H){var G=g;return function(){var te=g;g=G;try{return H.apply(this,arguments)}finally{g=te}}}})(Xm)),Xm}var Ay;function CA(){return Ay||(Ay=1,km.exports=RA()),km.exports}var Wm={exports:{}},xi={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ry;function wA(){if(Ry)return xi;Ry=1;var o=$g();function e(p){var d="https://react.dev/errors/"+p;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)d+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+p+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(){}var i={d:{f:t,r:function(){throw Error(e(522))},D:t,C:t,L:t,m:t,X:t,S:t,M:t},p:0,findDOMNode:null},r=Symbol.for("react.portal");function l(p,d,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:r,key:v==null?null:""+v,children:p,containerInfo:d,implementation:_}}var c=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function f(p,d){if(p==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return xi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,xi.createPortal=function(p,d){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return l(p,d,null,_)},xi.flushSync=function(p){var d=c.T,_=i.p;try{if(c.T=null,i.p=2,p)return p()}finally{c.T=d,i.p=_,i.d.f()}},xi.preconnect=function(p,d){typeof p=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,i.d.C(p,d))},xi.prefetchDNS=function(p){typeof p=="string"&&i.d.D(p)},xi.preinit=function(p,d){if(typeof p=="string"&&d&&typeof d.as=="string"){var _=d.as,v=f(_,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;_==="style"?i.d.S(p,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:x}):_==="script"&&i.d.X(p,{crossOrigin:v,integrity:g,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},xi.preinitModule=function(p,d){if(typeof p=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var _=f(d.as,d.crossOrigin);i.d.M(p,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&i.d.M(p)},xi.preload=function(p,d){if(typeof p=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var _=d.as,v=f(_,d.crossOrigin);i.d.L(p,_,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},xi.preloadModule=function(p,d){if(typeof p=="string")if(d){var _=f(d.as,d.crossOrigin);i.d.m(p,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else i.d.m(p)},xi.requestFormReset=function(p){i.d.r(p)},xi.unstable_batchedUpdates=function(p,d){return p(d)},xi.useFormState=function(p,d,_){return c.H.useFormState(p,d,_)},xi.useFormStatus=function(){return c.H.useHostTransitionStatus()},xi.version="19.2.0",xi}var Cy;function DA(){if(Cy)return Wm.exports;Cy=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),Wm.exports=wA(),Wm.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wy;function LA(){if(wy)return ec;wy=1;var o=CA(),e=$g(),t=DA();function i(n){var a="https://react.dev/errors/"+n;if(1<arguments.length){a+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)a+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+n+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function l(n){var a=n,s=n;if(n.alternate)for(;a.return;)a=a.return;else{n=a;do a=n,(a.flags&4098)!==0&&(s=a.return),n=a.return;while(n)}return a.tag===3?s:null}function c(n){if(n.tag===13){var a=n.memoizedState;if(a===null&&(n=n.alternate,n!==null&&(a=n.memoizedState)),a!==null)return a.dehydrated}return null}function f(n){if(n.tag===31){var a=n.memoizedState;if(a===null&&(n=n.alternate,n!==null&&(a=n.memoizedState)),a!==null)return a.dehydrated}return null}function p(n){if(l(n)!==n)throw Error(i(188))}function d(n){var a=n.alternate;if(!a){if(a=l(n),a===null)throw Error(i(188));return a!==n?null:n}for(var s=n,u=a;;){var h=s.return;if(h===null)break;var m=h.alternate;if(m===null){if(u=h.return,u!==null){s=u;continue}break}if(h.child===m.child){for(m=h.child;m;){if(m===s)return p(h),n;if(m===u)return p(h),a;m=m.sibling}throw Error(i(188))}if(s.return!==u.return)s=h,u=m;else{for(var T=!1,O=h.child;O;){if(O===s){T=!0,s=h,u=m;break}if(O===u){T=!0,u=h,s=m;break}O=O.sibling}if(!T){for(O=m.child;O;){if(O===s){T=!0,s=m,u=h;break}if(O===u){T=!0,u=m,s=h;break}O=O.sibling}if(!T)throw Error(i(189))}}if(s.alternate!==u)throw Error(i(190))}if(s.tag!==3)throw Error(i(188));return s.stateNode.current===s?n:a}function _(n){var a=n.tag;if(a===5||a===26||a===27||a===6)return n;for(n=n.child;n!==null;){if(a=_(n),a!==null)return a;n=n.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),E=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),F=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),w=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),I=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function k(n){return n===null||typeof n!="object"?null:(n=V&&n[V]||n["@@iterator"],typeof n=="function"?n:null)}var J=Symbol.for("react.client.reference");function Y(n){if(n==null)return null;if(typeof n=="function")return n.$$typeof===J?null:n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case E:return"Fragment";case y:return"Profiler";case S:return"StrictMode";case D:return"Suspense";case N:return"SuspenseList";case L:return"Activity"}if(typeof n=="object")switch(n.$$typeof){case M:return"Portal";case F:return n.displayName||"Context";case C:return(n._context.displayName||"Context")+".Consumer";case R:var a=n.render;return n=n.displayName,n||(n=a.displayName||a.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case w:return a=n.displayName||null,a!==null?a:Y(n.type)||"Memo";case b:a=n._payload,n=n._init;try{return Y(n(a))}catch{}}return null}var Q=Array.isArray,H=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},ee=[],z=-1;function P(n){return{current:n}}function ne(n){0>z||(n.current=ee[z],ee[z]=null,z--)}function _e(n,a){z++,ee[z]=n.current,n.current=a}var Ae=P(null),Ne=P(null),Be=P(null),ie=P(null);function pe(n,a){switch(_e(Be,a),_e(Ne,n),_e(Ae,null),a.nodeType){case 9:case 11:n=(n=a.documentElement)&&(n=n.namespaceURI)?XS(n):0;break;default:if(n=a.tagName,a=a.namespaceURI)a=XS(a),n=WS(a,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}ne(Ae),_e(Ae,n)}function Ce(){ne(Ae),ne(Ne),ne(Be)}function at(n){n.memoizedState!==null&&_e(ie,n);var a=Ae.current,s=WS(a,n.type);a!==s&&(_e(Ne,n),_e(Ae,s))}function Ie(n){Ne.current===n&&(ne(Ae),ne(Ne)),ie.current===n&&(ne(ie),Ku._currentValue=te)}var st,lt;function je(n){if(st===void 0)try{throw Error()}catch(s){var a=s.stack.trim().match(/\n( *(at )?)/);st=a&&a[1]||"",lt=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+st+n+lt}var ct=!1;function gt(n,a){if(!n||ct)return"";ct=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var u={DetermineComponentFrameRoot:function(){try{if(a){var Te=function(){throw Error()};if(Object.defineProperty(Te.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Te,[])}catch(ve){var he=ve}Reflect.construct(n,[],Te)}else{try{Te.call()}catch(ve){he=ve}n.call(Te.prototype)}}else{try{throw Error()}catch(ve){he=ve}(Te=n())&&typeof Te.catch=="function"&&Te.catch(function(){})}}catch(ve){if(ve&&he&&typeof ve.stack=="string")return[ve.stack,he.stack]}return[null,null]}};u.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var h=Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot,"name");h&&h.configurable&&Object.defineProperty(u.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var m=u.DetermineComponentFrameRoot(),T=m[0],O=m[1];if(T&&O){var W=T.split(`
`),fe=O.split(`
`);for(h=u=0;u<W.length&&!W[u].includes("DetermineComponentFrameRoot");)u++;for(;h<fe.length&&!fe[h].includes("DetermineComponentFrameRoot");)h++;if(u===W.length||h===fe.length)for(u=W.length-1,h=fe.length-1;1<=u&&0<=h&&W[u]!==fe[h];)h--;for(;1<=u&&0<=h;u--,h--)if(W[u]!==fe[h]){if(u!==1||h!==1)do if(u--,h--,0>h||W[u]!==fe[h]){var ye=`
`+W[u].replace(" at new "," at ");return n.displayName&&ye.includes("<anonymous>")&&(ye=ye.replace("<anonymous>",n.displayName)),ye}while(1<=u&&0<=h);break}}}finally{ct=!1,Error.prepareStackTrace=s}return(s=n?n.displayName||n.name:"")?je(s):""}function re(n,a){switch(n.tag){case 26:case 27:case 5:return je(n.type);case 16:return je("Lazy");case 13:return n.child!==a&&a!==null?je("Suspense Fallback"):je("Suspense");case 19:return je("SuspenseList");case 0:case 15:return gt(n.type,!1);case 11:return gt(n.type.render,!1);case 1:return gt(n.type,!0);case 31:return je("Activity");default:return""}}function bt(n){try{var a="",s=null;do a+=re(n,s),s=n,n=n.return;while(n);return a}catch(u){return`
Error generating stack: `+u.message+`
`+u.stack}}var qt=Object.prototype.hasOwnProperty,pn=o.unstable_scheduleCallback,ht=o.unstable_cancelCallback,Zt=o.unstable_shouldYield,j=o.unstable_requestPaint,Ot=o.unstable_now,dt=o.unstable_getCurrentPriorityLevel,B=o.unstable_ImmediatePriority,A=o.unstable_UserBlockingPriority,$=o.unstable_NormalPriority,le=o.unstable_LowPriority,me=o.unstable_IdlePriority,Oe=o.log,De=o.unstable_setDisableYieldValue,xe=null,ge=null;function Pe(n){if(typeof Oe=="function"&&De(n),ge&&typeof ge.setStrictMode=="function")try{ge.setStrictMode(xe,n)}catch{}}var Xe=Math.clz32?Math.clz32:Le,He=Math.log,ze=Math.LN2;function Le(n){return n>>>=0,n===0?32:31-(He(n)/ze|0)|0}var tt=256,rt=262144,Z=4194304;function Ue(n){var a=n&42;if(a!==0)return a;switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return n&261888;case 262144:case 524288:case 1048576:case 2097152:return n&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return n&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return n}}function Se(n,a,s){var u=n.pendingLanes;if(u===0)return 0;var h=0,m=n.suspendedLanes,T=n.pingedLanes;n=n.warmLanes;var O=u&134217727;return O!==0?(u=O&~m,u!==0?h=Ue(u):(T&=O,T!==0?h=Ue(T):s||(s=O&~n,s!==0&&(h=Ue(s))))):(O=u&~m,O!==0?h=Ue(O):T!==0?h=Ue(T):s||(s=u&~n,s!==0&&(h=Ue(s)))),h===0?0:a!==0&&a!==h&&(a&m)===0&&(m=h&-h,s=a&-a,m>=s||m===32&&(s&4194048)!==0)?a:h}function Fe(n,a){return(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&a)===0}function Ve(n,a){switch(n){case 1:case 2:case 4:case 8:case 64:return a+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function be(){var n=Z;return Z<<=1,(Z&62914560)===0&&(Z=4194304),n}function we(n){for(var a=[],s=0;31>s;s++)a.push(n);return a}function Ee(n,a){n.pendingLanes|=a,a!==268435456&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function it(n,a,s,u,h,m){var T=n.pendingLanes;n.pendingLanes=s,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=s,n.entangledLanes&=s,n.errorRecoveryDisabledLanes&=s,n.shellSuspendCounter=0;var O=n.entanglements,W=n.expirationTimes,fe=n.hiddenUpdates;for(s=T&~s;0<s;){var ye=31-Xe(s),Te=1<<ye;O[ye]=0,W[ye]=-1;var he=fe[ye];if(he!==null)for(fe[ye]=null,ye=0;ye<he.length;ye++){var ve=he[ye];ve!==null&&(ve.lane&=-536870913)}s&=~Te}u!==0&&Re(n,u,0),m!==0&&h===0&&n.tag!==0&&(n.suspendedLanes|=m&~(T&~a))}function Re(n,a,s){n.pendingLanes|=a,n.suspendedLanes&=~a;var u=31-Xe(a);n.entangledLanes|=a,n.entanglements[u]=n.entanglements[u]|1073741824|s&261930}function ot(n,a){var s=n.entangledLanes|=a;for(n=n.entanglements;s;){var u=31-Xe(s),h=1<<u;h&a|n[u]&a&&(n[u]|=a),s&=~h}}function Qe(n,a){var s=a&-a;return s=(s&42)!==0?1:pt(s),(s&(n.suspendedLanes|a))!==0?0:s}function pt(n){switch(n){case 2:n=1;break;case 8:n=4;break;case 32:n=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:n=128;break;case 268435456:n=134217728;break;default:n=0}return n}function Rn(n){return n&=-n,2<n?8<n?(n&134217727)!==0?32:268435456:8:2}function At(){var n=G.p;return n!==0?n:(n=window.event,n===void 0?32:py(n.type))}function ln(n,a){var s=G.p;try{return G.p=n,a()}finally{G.p=s}}var mn=Math.random().toString(36).slice(2),St="__reactFiber$"+mn,Mt="__reactProps$"+mn,Et="__reactContainer$"+mn,Qn="__reactEvents$"+mn,un="__reactListeners$"+mn,ai="__reactHandles$"+mn,ri="__reactResources$"+mn,Sn="__reactMarker$"+mn;function yn(n){delete n[St],delete n[Mt],delete n[Qn],delete n[un],delete n[ai]}function Mn(n){var a=n[St];if(a)return a;for(var s=n.parentNode;s;){if(a=s[Et]||s[St]){if(s=a.alternate,a.child!==null||s!==null&&s.child!==null)for(n=JS(n);n!==null;){if(s=n[St])return s;n=JS(n)}return a}n=s,s=n.parentNode}return null}function fi(n){if(n=n[St]||n[Et]){var a=n.tag;if(a===5||a===6||a===13||a===31||a===26||a===27||a===3)return n}return null}function Ea(n){var a=n.tag;if(a===5||a===26||a===27||a===6)return n.stateNode;throw Error(i(33))}function En(n){var a=n[ri];return a||(a=n[ri]={hoistableStyles:new Map,hoistableScripts:new Map}),a}function Ct(n){n[Sn]=!0}var Ci=new Set,Er={};function U(n,a){q(n,a),q(n+"Capture",a)}function q(n,a){for(Er[n]=a,n=0;n<a.length;n++)Ci.add(a[n])}var ce=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),se={},oe={};function Ge(n){return qt.call(oe,n)?!0:qt.call(se,n)?!1:ce.test(n)?oe[n]=!0:(se[n]=!0,!1)}function Ze(n,a,s){if(Ge(a))if(s===null)n.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":n.removeAttribute(a);return;case"boolean":var u=a.toLowerCase().slice(0,5);if(u!=="data-"&&u!=="aria-"){n.removeAttribute(a);return}}n.setAttribute(a,""+s)}}function ke(n,a,s){if(s===null)n.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(a);return}n.setAttribute(a,""+s)}}function Ye(n,a,s,u){if(u===null)n.removeAttribute(s);else{switch(typeof u){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(s);return}n.setAttributeNS(a,s,""+u)}}function qe(n){switch(typeof n){case"bigint":case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function yt(n){var a=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function Ut(n,a,s){var u=Object.getOwnPropertyDescriptor(n.constructor.prototype,a);if(!n.hasOwnProperty(a)&&typeof u<"u"&&typeof u.get=="function"&&typeof u.set=="function"){var h=u.get,m=u.set;return Object.defineProperty(n,a,{configurable:!0,get:function(){return h.call(this)},set:function(T){s=""+T,m.call(this,T)}}),Object.defineProperty(n,a,{enumerable:u.enumerable}),{getValue:function(){return s},setValue:function(T){s=""+T},stopTracking:function(){n._valueTracker=null,delete n[a]}}}}function Je(n){if(!n._valueTracker){var a=yt(n)?"checked":"value";n._valueTracker=Ut(n,a,""+n[a])}}function Yt(n){if(!n)return!1;var a=n._valueTracker;if(!a)return!0;var s=a.getValue(),u="";return n&&(u=yt(n)?n.checked?"true":"false":n.value),n=u,n!==s?(a.setValue(n),!0):!1}function Tn(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}var _n=/[\n"\\]/g;function wt(n){return n.replace(_n,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}function Vn(n,a,s,u,h,m,T,O){n.name="",T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"?n.type=T:n.removeAttribute("type"),a!=null?T==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+qe(a)):n.value!==""+qe(a)&&(n.value=""+qe(a)):T!=="submit"&&T!=="reset"||n.removeAttribute("value"),a!=null?Jn(n,T,qe(a)):s!=null?Jn(n,T,qe(s)):u!=null&&n.removeAttribute("value"),h==null&&m!=null&&(n.defaultChecked=!!m),h!=null&&(n.checked=h&&typeof h!="function"&&typeof h!="symbol"),O!=null&&typeof O!="function"&&typeof O!="symbol"&&typeof O!="boolean"?n.name=""+qe(O):n.removeAttribute("name")}function Ke(n,a,s,u,h,m,T,O){if(m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(n.type=m),a!=null||s!=null){if(!(m!=="submit"&&m!=="reset"||a!=null)){Je(n);return}s=s!=null?""+qe(s):"",a=a!=null?""+qe(a):s,O||a===n.value||(n.value=a),n.defaultValue=a}u=u??h,u=typeof u!="function"&&typeof u!="symbol"&&!!u,n.checked=O?n.checked:!!u,n.defaultChecked=!!u,T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"&&(n.name=T),Je(n)}function Jn(n,a,s){a==="number"&&Tn(n.ownerDocument)===n||n.defaultValue===""+s||(n.defaultValue=""+s)}function Dt(n,a,s,u){if(n=n.options,a){a={};for(var h=0;h<s.length;h++)a["$"+s[h]]=!0;for(s=0;s<n.length;s++)h=a.hasOwnProperty("$"+n[s].value),n[s].selected!==h&&(n[s].selected=h),h&&u&&(n[s].defaultSelected=!0)}else{for(s=""+qe(s),a=null,h=0;h<n.length;h++){if(n[h].value===s){n[h].selected=!0,u&&(n[h].defaultSelected=!0);return}a!==null||n[h].disabled||(a=n[h])}a!==null&&(a.selected=!0)}}function wi(n,a,s){if(a!=null&&(a=""+qe(a),a!==n.value&&(n.value=a),s==null)){n.defaultValue!==a&&(n.defaultValue=a);return}n.defaultValue=s!=null?""+qe(s):""}function ta(n,a,s,u){if(a==null){if(u!=null){if(s!=null)throw Error(i(92));if(Q(u)){if(1<u.length)throw Error(i(93));u=u[0]}s=u}s==null&&(s=""),a=s}s=qe(a),n.defaultValue=s,u=n.textContent,u===s&&u!==""&&u!==null&&(n.value=u),Je(n)}function Di(n,a){if(a){var s=n.firstChild;if(s&&s===n.lastChild&&s.nodeType===3){s.nodeValue=a;return}}n.textContent=a}var ss=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Jt(n,a,s){var u=a.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?u?n.setProperty(a,""):a==="float"?n.cssFloat="":n[a]="":u?n.setProperty(a,s):typeof s!="number"||s===0||ss.has(a)?a==="float"?n.cssFloat=s:n[a]=(""+s).trim():n[a]=s+"px"}function Cn(n,a,s){if(a!=null&&typeof a!="object")throw Error(i(62));if(n=n.style,s!=null){for(var u in s)!s.hasOwnProperty(u)||a!=null&&a.hasOwnProperty(u)||(u.indexOf("--")===0?n.setProperty(u,""):u==="float"?n.cssFloat="":n[u]="");for(var h in a)u=a[h],a.hasOwnProperty(h)&&s[h]!==u&&Jt(n,h,u)}else for(var m in a)a.hasOwnProperty(m)&&Jt(n,m,a[m])}function Ta(n){if(n.indexOf("-")===-1)return!1;switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),nr=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ka(n){return nr.test(""+n)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":n}function ba(){}var Id=null;function zd(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Wo=null,Yo=null;function k0(n){var a=fi(n);if(a&&(n=a.stateNode)){var s=n[Mt]||null;e:switch(n=a.stateNode,a.type){case"input":if(Vn(n,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),a=s.name,s.type==="radio"&&a!=null){for(s=n;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+wt(""+a)+'"][type="radio"]'),a=0;a<s.length;a++){var u=s[a];if(u!==n&&u.form===n.form){var h=u[Mt]||null;if(!h)throw Error(i(90));Vn(u,h.value,h.defaultValue,h.defaultValue,h.checked,h.defaultChecked,h.type,h.name)}}for(a=0;a<s.length;a++)u=s[a],u.form===n.form&&Yt(u)}break e;case"textarea":wi(n,s.value,s.defaultValue);break e;case"select":a=s.value,a!=null&&Dt(n,!!s.multiple,a,!1)}}}var Bd=!1;function X0(n,a,s){if(Bd)return n(a,s);Bd=!0;try{var u=n(a);return u}finally{if(Bd=!1,(Wo!==null||Yo!==null)&&(Vf(),Wo&&(a=Wo,n=Yo,Yo=Wo=null,k0(a),n)))for(a=0;a<n.length;a++)k0(n[a])}}function hu(n,a){var s=n.stateNode;if(s===null)return null;var u=s[Mt]||null;if(u===null)return null;s=u[a];e:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(s&&typeof s!="function")throw Error(i(231,a,typeof s));return s}var Tr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hd=!1;if(Tr)try{var du={};Object.defineProperty(du,"passive",{get:function(){Hd=!0}}),window.addEventListener("test",du,du),window.removeEventListener("test",du,du)}catch{Hd=!1}var os=null,Gd=null,tf=null;function W0(){if(tf)return tf;var n,a=Gd,s=a.length,u,h="value"in os?os.value:os.textContent,m=h.length;for(n=0;n<s&&a[n]===h[n];n++);var T=s-n;for(u=1;u<=T&&a[s-u]===h[m-u];u++);return tf=h.slice(n,1<u?1-u:void 0)}function nf(n){var a=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&a===13&&(n=13)):n=a,n===10&&(n=13),32<=n||n===13?n:0}function af(){return!0}function Y0(){return!1}function Hi(n){function a(s,u,h,m,T){this._reactName=s,this._targetInst=h,this.type=u,this.nativeEvent=m,this.target=T,this.currentTarget=null;for(var O in n)n.hasOwnProperty(O)&&(s=n[O],this[O]=s?s(m):m[O]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?af:Y0,this.isPropagationStopped=Y0,this}return v(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=af)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=af)},persist:function(){},isPersistent:af}),a}var Qs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rf=Hi(Qs),pu=v({},Qs,{view:0,detail:0}),ST=Hi(pu),Vd,kd,mu,sf=v({},pu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wd,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==mu&&(mu&&n.type==="mousemove"?(Vd=n.screenX-mu.screenX,kd=n.screenY-mu.screenY):kd=Vd=0,mu=n),Vd)},movementY:function(n){return"movementY"in n?n.movementY:kd}}),q0=Hi(sf),yT=v({},sf,{dataTransfer:0}),MT=Hi(yT),ET=v({},pu,{relatedTarget:0}),Xd=Hi(ET),TT=v({},Qs,{animationName:0,elapsedTime:0,pseudoElement:0}),bT=Hi(TT),AT=v({},Qs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),RT=Hi(AT),CT=v({},Qs,{data:0}),Z0=Hi(CT),wT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},DT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},LT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function UT(n){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(n):(n=LT[n])?!!a[n]:!1}function Wd(){return UT}var NT=v({},pu,{key:function(n){if(n.key){var a=wT[n.key]||n.key;if(a!=="Unidentified")return a}return n.type==="keypress"?(n=nf(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?DT[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wd,charCode:function(n){return n.type==="keypress"?nf(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?nf(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),OT=Hi(NT),PT=v({},sf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),K0=Hi(PT),FT=v({},pu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wd}),IT=Hi(FT),zT=v({},Qs,{propertyName:0,elapsedTime:0,pseudoElement:0}),BT=Hi(zT),HT=v({},sf,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),GT=Hi(HT),VT=v({},Qs,{newState:0,oldState:0}),kT=Hi(VT),XT=[9,13,27,32],Yd=Tr&&"CompositionEvent"in window,_u=null;Tr&&"documentMode"in document&&(_u=document.documentMode);var WT=Tr&&"TextEvent"in window&&!_u,j0=Tr&&(!Yd||_u&&8<_u&&11>=_u),Q0=" ",J0=!1;function $0(n,a){switch(n){case"keyup":return XT.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ev(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var qo=!1;function YT(n,a){switch(n){case"compositionend":return ev(a);case"keypress":return a.which!==32?null:(J0=!0,Q0);case"textInput":return n=a.data,n===Q0&&J0?null:n;default:return null}}function qT(n,a){if(qo)return n==="compositionend"||!Yd&&$0(n,a)?(n=W0(),tf=Gd=os=null,qo=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return j0&&a.locale!=="ko"?null:a.data;default:return null}}var ZT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tv(n){var a=n&&n.nodeName&&n.nodeName.toLowerCase();return a==="input"?!!ZT[n.type]:a==="textarea"}function nv(n,a,s,u){Wo?Yo?Yo.push(u):Yo=[u]:Wo=u,a=Kf(a,"onChange"),0<a.length&&(s=new rf("onChange","change",null,s,u),n.push({event:s,listeners:a}))}var gu=null,vu=null;function KT(n){zS(n,0)}function of(n){var a=Ea(n);if(Yt(a))return n}function iv(n,a){if(n==="change")return a}var av=!1;if(Tr){var qd;if(Tr){var Zd="oninput"in document;if(!Zd){var rv=document.createElement("div");rv.setAttribute("oninput","return;"),Zd=typeof rv.oninput=="function"}qd=Zd}else qd=!1;av=qd&&(!document.documentMode||9<document.documentMode)}function sv(){gu&&(gu.detachEvent("onpropertychange",ov),vu=gu=null)}function ov(n){if(n.propertyName==="value"&&of(vu)){var a=[];nv(a,vu,n,zd(n)),X0(KT,a)}}function jT(n,a,s){n==="focusin"?(sv(),gu=a,vu=s,gu.attachEvent("onpropertychange",ov)):n==="focusout"&&sv()}function QT(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return of(vu)}function JT(n,a){if(n==="click")return of(a)}function $T(n,a){if(n==="input"||n==="change")return of(a)}function eb(n,a){return n===a&&(n!==0||1/n===1/a)||n!==n&&a!==a}var na=typeof Object.is=="function"?Object.is:eb;function xu(n,a){if(na(n,a))return!0;if(typeof n!="object"||n===null||typeof a!="object"||a===null)return!1;var s=Object.keys(n),u=Object.keys(a);if(s.length!==u.length)return!1;for(u=0;u<s.length;u++){var h=s[u];if(!qt.call(a,h)||!na(n[h],a[h]))return!1}return!0}function lv(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function uv(n,a){var s=lv(n);n=0;for(var u;s;){if(s.nodeType===3){if(u=n+s.textContent.length,n<=a&&u>=a)return{node:s,offset:a-n};n=u}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=lv(s)}}function cv(n,a){return n&&a?n===a?!0:n&&n.nodeType===3?!1:a&&a.nodeType===3?cv(n,a.parentNode):"contains"in n?n.contains(a):n.compareDocumentPosition?!!(n.compareDocumentPosition(a)&16):!1:!1}function fv(n){n=n!=null&&n.ownerDocument!=null&&n.ownerDocument.defaultView!=null?n.ownerDocument.defaultView:window;for(var a=Tn(n.document);a instanceof n.HTMLIFrameElement;){try{var s=typeof a.contentWindow.location.href=="string"}catch{s=!1}if(s)n=a.contentWindow;else break;a=Tn(n.document)}return a}function Kd(n){var a=n&&n.nodeName&&n.nodeName.toLowerCase();return a&&(a==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||a==="textarea"||n.contentEditable==="true")}var tb=Tr&&"documentMode"in document&&11>=document.documentMode,Zo=null,jd=null,Su=null,Qd=!1;function hv(n,a,s){var u=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Qd||Zo==null||Zo!==Tn(u)||(u=Zo,"selectionStart"in u&&Kd(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),Su&&xu(Su,u)||(Su=u,u=Kf(jd,"onSelect"),0<u.length&&(a=new rf("onSelect","select",null,a,s),n.push({event:a,listeners:u}),a.target=Zo)))}function Js(n,a){var s={};return s[n.toLowerCase()]=a.toLowerCase(),s["Webkit"+n]="webkit"+a,s["Moz"+n]="moz"+a,s}var Ko={animationend:Js("Animation","AnimationEnd"),animationiteration:Js("Animation","AnimationIteration"),animationstart:Js("Animation","AnimationStart"),transitionrun:Js("Transition","TransitionRun"),transitionstart:Js("Transition","TransitionStart"),transitioncancel:Js("Transition","TransitionCancel"),transitionend:Js("Transition","TransitionEnd")},Jd={},dv={};Tr&&(dv=document.createElement("div").style,"AnimationEvent"in window||(delete Ko.animationend.animation,delete Ko.animationiteration.animation,delete Ko.animationstart.animation),"TransitionEvent"in window||delete Ko.transitionend.transition);function $s(n){if(Jd[n])return Jd[n];if(!Ko[n])return n;var a=Ko[n],s;for(s in a)if(a.hasOwnProperty(s)&&s in dv)return Jd[n]=a[s];return n}var pv=$s("animationend"),mv=$s("animationiteration"),_v=$s("animationstart"),nb=$s("transitionrun"),ib=$s("transitionstart"),ab=$s("transitioncancel"),gv=$s("transitionend"),vv=new Map,$d="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");$d.push("scrollEnd");function Xa(n,a){vv.set(n,a),U(a,[n])}var lf=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var a=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(a))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)},Aa=[],jo=0,ep=0;function uf(){for(var n=jo,a=ep=jo=0;a<n;){var s=Aa[a];Aa[a++]=null;var u=Aa[a];Aa[a++]=null;var h=Aa[a];Aa[a++]=null;var m=Aa[a];if(Aa[a++]=null,u!==null&&h!==null){var T=u.pending;T===null?h.next=h:(h.next=T.next,T.next=h),u.pending=h}m!==0&&xv(s,h,m)}}function cf(n,a,s,u){Aa[jo++]=n,Aa[jo++]=a,Aa[jo++]=s,Aa[jo++]=u,ep|=u,n.lanes|=u,n=n.alternate,n!==null&&(n.lanes|=u)}function tp(n,a,s,u){return cf(n,a,s,u),ff(n)}function eo(n,a){return cf(n,null,null,a),ff(n)}function xv(n,a,s){n.lanes|=s;var u=n.alternate;u!==null&&(u.lanes|=s);for(var h=!1,m=n.return;m!==null;)m.childLanes|=s,u=m.alternate,u!==null&&(u.childLanes|=s),m.tag===22&&(n=m.stateNode,n===null||n._visibility&1||(h=!0)),n=m,m=m.return;return n.tag===3?(m=n.stateNode,h&&a!==null&&(h=31-Xe(s),n=m.hiddenUpdates,u=n[h],u===null?n[h]=[a]:u.push(a),a.lane=s|536870912),m):null}function ff(n){if(50<Vu)throw Vu=0,cm=null,Error(i(185));for(var a=n.return;a!==null;)n=a,a=n.return;return n.tag===3?n.stateNode:null}var Qo={};function rb(n,a,s,u){this.tag=n,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ia(n,a,s,u){return new rb(n,a,s,u)}function np(n){return n=n.prototype,!(!n||!n.isReactComponent)}function br(n,a){var s=n.alternate;return s===null?(s=ia(n.tag,a,n.key,n.mode),s.elementType=n.elementType,s.type=n.type,s.stateNode=n.stateNode,s.alternate=n,n.alternate=s):(s.pendingProps=a,s.type=n.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=n.flags&65011712,s.childLanes=n.childLanes,s.lanes=n.lanes,s.child=n.child,s.memoizedProps=n.memoizedProps,s.memoizedState=n.memoizedState,s.updateQueue=n.updateQueue,a=n.dependencies,s.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},s.sibling=n.sibling,s.index=n.index,s.ref=n.ref,s.refCleanup=n.refCleanup,s}function Sv(n,a){n.flags&=65011714;var s=n.alternate;return s===null?(n.childLanes=0,n.lanes=a,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=s.childLanes,n.lanes=s.lanes,n.child=s.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=s.memoizedProps,n.memoizedState=s.memoizedState,n.updateQueue=s.updateQueue,n.type=s.type,a=s.dependencies,n.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext}),n}function hf(n,a,s,u,h,m){var T=0;if(u=n,typeof n=="function")np(n)&&(T=1);else if(typeof n=="string")T=cA(n,s,Ae.current)?26:n==="html"||n==="head"||n==="body"?27:5;else e:switch(n){case L:return n=ia(31,s,a,h),n.elementType=L,n.lanes=m,n;case E:return to(s.children,h,m,a);case S:T=8,h|=24;break;case y:return n=ia(12,s,a,h|2),n.elementType=y,n.lanes=m,n;case D:return n=ia(13,s,a,h),n.elementType=D,n.lanes=m,n;case N:return n=ia(19,s,a,h),n.elementType=N,n.lanes=m,n;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case F:T=10;break e;case C:T=9;break e;case R:T=11;break e;case w:T=14;break e;case b:T=16,u=null;break e}T=29,s=Error(i(130,n===null?"null":typeof n,"")),u=null}return a=ia(T,s,a,h),a.elementType=n,a.type=u,a.lanes=m,a}function to(n,a,s,u){return n=ia(7,n,u,a),n.lanes=s,n}function ip(n,a,s){return n=ia(6,n,null,a),n.lanes=s,n}function yv(n){var a=ia(18,null,null,0);return a.stateNode=n,a}function ap(n,a,s){return a=ia(4,n.children!==null?n.children:[],n.key,a),a.lanes=s,a.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},a}var Mv=new WeakMap;function Ra(n,a){if(typeof n=="object"&&n!==null){var s=Mv.get(n);return s!==void 0?s:(a={value:n,source:a,stack:bt(a)},Mv.set(n,a),a)}return{value:n,source:a,stack:bt(a)}}var Jo=[],$o=0,df=null,yu=0,Ca=[],wa=0,ls=null,ir=1,ar="";function Ar(n,a){Jo[$o++]=yu,Jo[$o++]=df,df=n,yu=a}function Ev(n,a,s){Ca[wa++]=ir,Ca[wa++]=ar,Ca[wa++]=ls,ls=n;var u=ir;n=ar;var h=32-Xe(u)-1;u&=~(1<<h),s+=1;var m=32-Xe(a)+h;if(30<m){var T=h-h%5;m=(u&(1<<T)-1).toString(32),u>>=T,h-=T,ir=1<<32-Xe(a)+h|s<<h|u,ar=m+n}else ir=1<<m|s<<h|u,ar=n}function rp(n){n.return!==null&&(Ar(n,1),Ev(n,1,0))}function sp(n){for(;n===df;)df=Jo[--$o],Jo[$o]=null,yu=Jo[--$o],Jo[$o]=null;for(;n===ls;)ls=Ca[--wa],Ca[wa]=null,ar=Ca[--wa],Ca[wa]=null,ir=Ca[--wa],Ca[wa]=null}function Tv(n,a){Ca[wa++]=ir,Ca[wa++]=ar,Ca[wa++]=ls,ir=a.id,ar=a.overflow,ls=n}var hi=null,bn=null,Vt=!1,us=null,Da=!1,op=Error(i(519));function cs(n){var a=Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mu(Ra(a,n)),op}function bv(n){var a=n.stateNode,s=n.type,u=n.memoizedProps;switch(a[St]=n,a[Mt]=u,s){case"dialog":zt("cancel",a),zt("close",a);break;case"iframe":case"object":case"embed":zt("load",a);break;case"video":case"audio":for(s=0;s<Xu.length;s++)zt(Xu[s],a);break;case"source":zt("error",a);break;case"img":case"image":case"link":zt("error",a),zt("load",a);break;case"details":zt("toggle",a);break;case"input":zt("invalid",a),Ke(a,u.value,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name,!0);break;case"select":zt("invalid",a);break;case"textarea":zt("invalid",a),ta(a,u.value,u.defaultValue,u.children)}s=u.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||a.textContent===""+s||u.suppressHydrationWarning===!0||VS(a.textContent,s)?(u.popover!=null&&(zt("beforetoggle",a),zt("toggle",a)),u.onScroll!=null&&zt("scroll",a),u.onScrollEnd!=null&&zt("scrollend",a),u.onClick!=null&&(a.onclick=ba),a=!0):a=!1,a||cs(n,!0)}function Av(n){for(hi=n.return;hi;)switch(hi.tag){case 5:case 31:case 13:Da=!1;return;case 27:case 3:Da=!0;return;default:hi=hi.return}}function el(n){if(n!==hi)return!1;if(!Vt)return Av(n),Vt=!0,!1;var a=n.tag,s;if((s=a!==3&&a!==27)&&((s=a===5)&&(s=n.type,s=!(s!=="form"&&s!=="button")||bm(n.type,n.memoizedProps)),s=!s),s&&bn&&cs(n),Av(n),a===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(i(317));bn=QS(n)}else if(a===31){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(i(317));bn=QS(n)}else a===27?(a=bn,Ts(n.type)?(n=Dm,Dm=null,bn=n):bn=a):bn=hi?Ua(n.stateNode.nextSibling):null;return!0}function no(){bn=hi=null,Vt=!1}function lp(){var n=us;return n!==null&&(Xi===null?Xi=n:Xi.push.apply(Xi,n),us=null),n}function Mu(n){us===null?us=[n]:us.push(n)}var up=P(null),io=null,Rr=null;function fs(n,a,s){_e(up,a._currentValue),a._currentValue=s}function Cr(n){n._currentValue=up.current,ne(up)}function cp(n,a,s){for(;n!==null;){var u=n.alternate;if((n.childLanes&a)!==a?(n.childLanes|=a,u!==null&&(u.childLanes|=a)):u!==null&&(u.childLanes&a)!==a&&(u.childLanes|=a),n===s)break;n=n.return}}function fp(n,a,s,u){var h=n.child;for(h!==null&&(h.return=n);h!==null;){var m=h.dependencies;if(m!==null){var T=h.child;m=m.firstContext;e:for(;m!==null;){var O=m;m=h;for(var W=0;W<a.length;W++)if(O.context===a[W]){m.lanes|=s,O=m.alternate,O!==null&&(O.lanes|=s),cp(m.return,s,n),u||(T=null);break e}m=O.next}}else if(h.tag===18){if(T=h.return,T===null)throw Error(i(341));T.lanes|=s,m=T.alternate,m!==null&&(m.lanes|=s),cp(T,s,n),T=null}else T=h.child;if(T!==null)T.return=h;else for(T=h;T!==null;){if(T===n){T=null;break}if(h=T.sibling,h!==null){h.return=T.return,T=h;break}T=T.return}h=T}}function tl(n,a,s,u){n=null;for(var h=a,m=!1;h!==null;){if(!m){if((h.flags&524288)!==0)m=!0;else if((h.flags&262144)!==0)break}if(h.tag===10){var T=h.alternate;if(T===null)throw Error(i(387));if(T=T.memoizedProps,T!==null){var O=h.type;na(h.pendingProps.value,T.value)||(n!==null?n.push(O):n=[O])}}else if(h===ie.current){if(T=h.alternate,T===null)throw Error(i(387));T.memoizedState.memoizedState!==h.memoizedState.memoizedState&&(n!==null?n.push(Ku):n=[Ku])}h=h.return}n!==null&&fp(a,n,s,u),a.flags|=262144}function pf(n){for(n=n.firstContext;n!==null;){if(!na(n.context._currentValue,n.memoizedValue))return!0;n=n.next}return!1}function ao(n){io=n,Rr=null,n=n.dependencies,n!==null&&(n.firstContext=null)}function di(n){return Rv(io,n)}function mf(n,a){return io===null&&ao(n),Rv(n,a)}function Rv(n,a){var s=a._currentValue;if(a={context:a,memoizedValue:s,next:null},Rr===null){if(n===null)throw Error(i(308));Rr=a,n.dependencies={lanes:0,firstContext:a},n.flags|=524288}else Rr=Rr.next=a;return s}var sb=typeof AbortController<"u"?AbortController:function(){var n=[],a=this.signal={aborted:!1,addEventListener:function(s,u){n.push(u)}};this.abort=function(){a.aborted=!0,n.forEach(function(s){return s()})}},ob=o.unstable_scheduleCallback,lb=o.unstable_NormalPriority,kn={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function hp(){return{controller:new sb,data:new Map,refCount:0}}function Eu(n){n.refCount--,n.refCount===0&&ob(lb,function(){n.controller.abort()})}var Tu=null,dp=0,nl=0,il=null;function ub(n,a){if(Tu===null){var s=Tu=[];dp=0,nl=_m(),il={status:"pending",value:void 0,then:function(u){s.push(u)}}}return dp++,a.then(Cv,Cv),a}function Cv(){if(--dp===0&&Tu!==null){il!==null&&(il.status="fulfilled");var n=Tu;Tu=null,nl=0,il=null;for(var a=0;a<n.length;a++)(0,n[a])()}}function cb(n,a){var s=[],u={status:"pending",value:null,reason:null,then:function(h){s.push(h)}};return n.then(function(){u.status="fulfilled",u.value=a;for(var h=0;h<s.length;h++)(0,s[h])(a)},function(h){for(u.status="rejected",u.reason=h,h=0;h<s.length;h++)(0,s[h])(void 0)}),u}var wv=H.S;H.S=function(n,a){hS=Ot(),typeof a=="object"&&a!==null&&typeof a.then=="function"&&ub(n,a),wv!==null&&wv(n,a)};var ro=P(null);function pp(){var n=ro.current;return n!==null?n:gn.pooledCache}function _f(n,a){a===null?_e(ro,ro.current):_e(ro,a.pool)}function Dv(){var n=pp();return n===null?null:{parent:kn._currentValue,pool:n}}var al=Error(i(460)),mp=Error(i(474)),gf=Error(i(542)),vf={then:function(){}};function Lv(n){return n=n.status,n==="fulfilled"||n==="rejected"}function Uv(n,a,s){switch(s=n[s],s===void 0?n.push(a):s!==a&&(a.then(ba,ba),a=s),a.status){case"fulfilled":return a.value;case"rejected":throw n=a.reason,Ov(n),n;default:if(typeof a.status=="string")a.then(ba,ba);else{if(n=gn,n!==null&&100<n.shellSuspendCounter)throw Error(i(482));n=a,n.status="pending",n.then(function(u){if(a.status==="pending"){var h=a;h.status="fulfilled",h.value=u}},function(u){if(a.status==="pending"){var h=a;h.status="rejected",h.reason=u}})}switch(a.status){case"fulfilled":return a.value;case"rejected":throw n=a.reason,Ov(n),n}throw oo=a,al}}function so(n){try{var a=n._init;return a(n._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(oo=s,al):s}}var oo=null;function Nv(){if(oo===null)throw Error(i(459));var n=oo;return oo=null,n}function Ov(n){if(n===al||n===gf)throw Error(i(483))}var rl=null,bu=0;function xf(n){var a=bu;return bu+=1,rl===null&&(rl=[]),Uv(rl,n,a)}function Au(n,a){a=a.props.ref,n.ref=a!==void 0?a:null}function Sf(n,a){throw a.$$typeof===g?Error(i(525)):(n=Object.prototype.toString.call(a),Error(i(31,n==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":n)))}function Pv(n){function a(ae,K){if(n){var ue=ae.deletions;ue===null?(ae.deletions=[K],ae.flags|=16):ue.push(K)}}function s(ae,K){if(!n)return null;for(;K!==null;)a(ae,K),K=K.sibling;return null}function u(ae){for(var K=new Map;ae!==null;)ae.key!==null?K.set(ae.key,ae):K.set(ae.index,ae),ae=ae.sibling;return K}function h(ae,K){return ae=br(ae,K),ae.index=0,ae.sibling=null,ae}function m(ae,K,ue){return ae.index=ue,n?(ue=ae.alternate,ue!==null?(ue=ue.index,ue<K?(ae.flags|=67108866,K):ue):(ae.flags|=67108866,K)):(ae.flags|=1048576,K)}function T(ae){return n&&ae.alternate===null&&(ae.flags|=67108866),ae}function O(ae,K,ue,Me){return K===null||K.tag!==6?(K=ip(ue,ae.mode,Me),K.return=ae,K):(K=h(K,ue),K.return=ae,K)}function W(ae,K,ue,Me){var ut=ue.type;return ut===E?ye(ae,K,ue.props.children,Me,ue.key):K!==null&&(K.elementType===ut||typeof ut=="object"&&ut!==null&&ut.$$typeof===b&&so(ut)===K.type)?(K=h(K,ue.props),Au(K,ue),K.return=ae,K):(K=hf(ue.type,ue.key,ue.props,null,ae.mode,Me),Au(K,ue),K.return=ae,K)}function fe(ae,K,ue,Me){return K===null||K.tag!==4||K.stateNode.containerInfo!==ue.containerInfo||K.stateNode.implementation!==ue.implementation?(K=ap(ue,ae.mode,Me),K.return=ae,K):(K=h(K,ue.children||[]),K.return=ae,K)}function ye(ae,K,ue,Me,ut){return K===null||K.tag!==7?(K=to(ue,ae.mode,Me,ut),K.return=ae,K):(K=h(K,ue),K.return=ae,K)}function Te(ae,K,ue){if(typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint")return K=ip(""+K,ae.mode,ue),K.return=ae,K;if(typeof K=="object"&&K!==null){switch(K.$$typeof){case x:return ue=hf(K.type,K.key,K.props,null,ae.mode,ue),Au(ue,K),ue.return=ae,ue;case M:return K=ap(K,ae.mode,ue),K.return=ae,K;case b:return K=so(K),Te(ae,K,ue)}if(Q(K)||k(K))return K=to(K,ae.mode,ue,null),K.return=ae,K;if(typeof K.then=="function")return Te(ae,xf(K),ue);if(K.$$typeof===F)return Te(ae,mf(ae,K),ue);Sf(ae,K)}return null}function he(ae,K,ue,Me){var ut=K!==null?K.key:null;if(typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint")return ut!==null?null:O(ae,K,""+ue,Me);if(typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case x:return ue.key===ut?W(ae,K,ue,Me):null;case M:return ue.key===ut?fe(ae,K,ue,Me):null;case b:return ue=so(ue),he(ae,K,ue,Me)}if(Q(ue)||k(ue))return ut!==null?null:ye(ae,K,ue,Me,null);if(typeof ue.then=="function")return he(ae,K,xf(ue),Me);if(ue.$$typeof===F)return he(ae,K,mf(ae,ue),Me);Sf(ae,ue)}return null}function ve(ae,K,ue,Me,ut){if(typeof Me=="string"&&Me!==""||typeof Me=="number"||typeof Me=="bigint")return ae=ae.get(ue)||null,O(K,ae,""+Me,ut);if(typeof Me=="object"&&Me!==null){switch(Me.$$typeof){case x:return ae=ae.get(Me.key===null?ue:Me.key)||null,W(K,ae,Me,ut);case M:return ae=ae.get(Me.key===null?ue:Me.key)||null,fe(K,ae,Me,ut);case b:return Me=so(Me),ve(ae,K,ue,Me,ut)}if(Q(Me)||k(Me))return ae=ae.get(ue)||null,ye(K,ae,Me,ut,null);if(typeof Me.then=="function")return ve(ae,K,ue,xf(Me),ut);if(Me.$$typeof===F)return ve(ae,K,ue,mf(K,Me),ut);Sf(K,Me)}return null}function $e(ae,K,ue,Me){for(var ut=null,Kt=null,nt=K,Rt=K=0,Gt=null;nt!==null&&Rt<ue.length;Rt++){nt.index>Rt?(Gt=nt,nt=null):Gt=nt.sibling;var jt=he(ae,nt,ue[Rt],Me);if(jt===null){nt===null&&(nt=Gt);break}n&&nt&&jt.alternate===null&&a(ae,nt),K=m(jt,K,Rt),Kt===null?ut=jt:Kt.sibling=jt,Kt=jt,nt=Gt}if(Rt===ue.length)return s(ae,nt),Vt&&Ar(ae,Rt),ut;if(nt===null){for(;Rt<ue.length;Rt++)nt=Te(ae,ue[Rt],Me),nt!==null&&(K=m(nt,K,Rt),Kt===null?ut=nt:Kt.sibling=nt,Kt=nt);return Vt&&Ar(ae,Rt),ut}for(nt=u(nt);Rt<ue.length;Rt++)Gt=ve(nt,ae,Rt,ue[Rt],Me),Gt!==null&&(n&&Gt.alternate!==null&&nt.delete(Gt.key===null?Rt:Gt.key),K=m(Gt,K,Rt),Kt===null?ut=Gt:Kt.sibling=Gt,Kt=Gt);return n&&nt.forEach(function(ws){return a(ae,ws)}),Vt&&Ar(ae,Rt),ut}function ft(ae,K,ue,Me){if(ue==null)throw Error(i(151));for(var ut=null,Kt=null,nt=K,Rt=K=0,Gt=null,jt=ue.next();nt!==null&&!jt.done;Rt++,jt=ue.next()){nt.index>Rt?(Gt=nt,nt=null):Gt=nt.sibling;var ws=he(ae,nt,jt.value,Me);if(ws===null){nt===null&&(nt=Gt);break}n&&nt&&ws.alternate===null&&a(ae,nt),K=m(ws,K,Rt),Kt===null?ut=ws:Kt.sibling=ws,Kt=ws,nt=Gt}if(jt.done)return s(ae,nt),Vt&&Ar(ae,Rt),ut;if(nt===null){for(;!jt.done;Rt++,jt=ue.next())jt=Te(ae,jt.value,Me),jt!==null&&(K=m(jt,K,Rt),Kt===null?ut=jt:Kt.sibling=jt,Kt=jt);return Vt&&Ar(ae,Rt),ut}for(nt=u(nt);!jt.done;Rt++,jt=ue.next())jt=ve(nt,ae,Rt,jt.value,Me),jt!==null&&(n&&jt.alternate!==null&&nt.delete(jt.key===null?Rt:jt.key),K=m(jt,K,Rt),Kt===null?ut=jt:Kt.sibling=jt,Kt=jt);return n&&nt.forEach(function(yA){return a(ae,yA)}),Vt&&Ar(ae,Rt),ut}function dn(ae,K,ue,Me){if(typeof ue=="object"&&ue!==null&&ue.type===E&&ue.key===null&&(ue=ue.props.children),typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case x:e:{for(var ut=ue.key;K!==null;){if(K.key===ut){if(ut=ue.type,ut===E){if(K.tag===7){s(ae,K.sibling),Me=h(K,ue.props.children),Me.return=ae,ae=Me;break e}}else if(K.elementType===ut||typeof ut=="object"&&ut!==null&&ut.$$typeof===b&&so(ut)===K.type){s(ae,K.sibling),Me=h(K,ue.props),Au(Me,ue),Me.return=ae,ae=Me;break e}s(ae,K);break}else a(ae,K);K=K.sibling}ue.type===E?(Me=to(ue.props.children,ae.mode,Me,ue.key),Me.return=ae,ae=Me):(Me=hf(ue.type,ue.key,ue.props,null,ae.mode,Me),Au(Me,ue),Me.return=ae,ae=Me)}return T(ae);case M:e:{for(ut=ue.key;K!==null;){if(K.key===ut)if(K.tag===4&&K.stateNode.containerInfo===ue.containerInfo&&K.stateNode.implementation===ue.implementation){s(ae,K.sibling),Me=h(K,ue.children||[]),Me.return=ae,ae=Me;break e}else{s(ae,K);break}else a(ae,K);K=K.sibling}Me=ap(ue,ae.mode,Me),Me.return=ae,ae=Me}return T(ae);case b:return ue=so(ue),dn(ae,K,ue,Me)}if(Q(ue))return $e(ae,K,ue,Me);if(k(ue)){if(ut=k(ue),typeof ut!="function")throw Error(i(150));return ue=ut.call(ue),ft(ae,K,ue,Me)}if(typeof ue.then=="function")return dn(ae,K,xf(ue),Me);if(ue.$$typeof===F)return dn(ae,K,mf(ae,ue),Me);Sf(ae,ue)}return typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint"?(ue=""+ue,K!==null&&K.tag===6?(s(ae,K.sibling),Me=h(K,ue),Me.return=ae,ae=Me):(s(ae,K),Me=ip(ue,ae.mode,Me),Me.return=ae,ae=Me),T(ae)):s(ae,K)}return function(ae,K,ue,Me){try{bu=0;var ut=dn(ae,K,ue,Me);return rl=null,ut}catch(nt){if(nt===al||nt===gf)throw nt;var Kt=ia(29,nt,null,ae.mode);return Kt.lanes=Me,Kt.return=ae,Kt}finally{}}}var lo=Pv(!0),Fv=Pv(!1),hs=!1;function _p(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gp(n,a){n=n.updateQueue,a.updateQueue===n&&(a.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function ds(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function ps(n,a,s){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,($t&2)!==0){var h=u.pending;return h===null?a.next=a:(a.next=h.next,h.next=a),u.pending=a,a=ff(n),xv(n,null,s),a}return cf(n,u,a,s),ff(n)}function Ru(n,a,s){if(a=a.updateQueue,a!==null&&(a=a.shared,(s&4194048)!==0)){var u=a.lanes;u&=n.pendingLanes,s|=u,a.lanes=s,ot(n,s)}}function vp(n,a){var s=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,s===u)){var h=null,m=null;if(s=s.firstBaseUpdate,s!==null){do{var T={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};m===null?h=m=T:m=m.next=T,s=s.next}while(s!==null);m===null?h=m=a:m=m.next=a}else h=m=a;s={baseState:u.baseState,firstBaseUpdate:h,lastBaseUpdate:m,shared:u.shared,callbacks:u.callbacks},n.updateQueue=s;return}n=s.lastBaseUpdate,n===null?s.firstBaseUpdate=a:n.next=a,s.lastBaseUpdate=a}var xp=!1;function Cu(){if(xp){var n=il;if(n!==null)throw n}}function wu(n,a,s,u){xp=!1;var h=n.updateQueue;hs=!1;var m=h.firstBaseUpdate,T=h.lastBaseUpdate,O=h.shared.pending;if(O!==null){h.shared.pending=null;var W=O,fe=W.next;W.next=null,T===null?m=fe:T.next=fe,T=W;var ye=n.alternate;ye!==null&&(ye=ye.updateQueue,O=ye.lastBaseUpdate,O!==T&&(O===null?ye.firstBaseUpdate=fe:O.next=fe,ye.lastBaseUpdate=W))}if(m!==null){var Te=h.baseState;T=0,ye=fe=W=null,O=m;do{var he=O.lane&-536870913,ve=he!==O.lane;if(ve?(Ht&he)===he:(u&he)===he){he!==0&&he===nl&&(xp=!0),ye!==null&&(ye=ye.next={lane:0,tag:O.tag,payload:O.payload,callback:null,next:null});e:{var $e=n,ft=O;he=a;var dn=s;switch(ft.tag){case 1:if($e=ft.payload,typeof $e=="function"){Te=$e.call(dn,Te,he);break e}Te=$e;break e;case 3:$e.flags=$e.flags&-65537|128;case 0:if($e=ft.payload,he=typeof $e=="function"?$e.call(dn,Te,he):$e,he==null)break e;Te=v({},Te,he);break e;case 2:hs=!0}}he=O.callback,he!==null&&(n.flags|=64,ve&&(n.flags|=8192),ve=h.callbacks,ve===null?h.callbacks=[he]:ve.push(he))}else ve={lane:he,tag:O.tag,payload:O.payload,callback:O.callback,next:null},ye===null?(fe=ye=ve,W=Te):ye=ye.next=ve,T|=he;if(O=O.next,O===null){if(O=h.shared.pending,O===null)break;ve=O,O=ve.next,ve.next=null,h.lastBaseUpdate=ve,h.shared.pending=null}}while(!0);ye===null&&(W=Te),h.baseState=W,h.firstBaseUpdate=fe,h.lastBaseUpdate=ye,m===null&&(h.shared.lanes=0),xs|=T,n.lanes=T,n.memoizedState=Te}}function Iv(n,a){if(typeof n!="function")throw Error(i(191,n));n.call(a)}function zv(n,a){var s=n.callbacks;if(s!==null)for(n.callbacks=null,n=0;n<s.length;n++)Iv(s[n],a)}var sl=P(null),yf=P(0);function Bv(n,a){n=Ir,_e(yf,n),_e(sl,a),Ir=n|a.baseLanes}function Sp(){_e(yf,Ir),_e(sl,sl.current)}function yp(){Ir=yf.current,ne(sl),ne(yf)}var aa=P(null),La=null;function ms(n){var a=n.alternate;_e(zn,zn.current&1),_e(aa,n),La===null&&(a===null||sl.current!==null||a.memoizedState!==null)&&(La=n)}function Mp(n){_e(zn,zn.current),_e(aa,n),La===null&&(La=n)}function Hv(n){n.tag===22?(_e(zn,zn.current),_e(aa,n),La===null&&(La=n)):_s()}function _s(){_e(zn,zn.current),_e(aa,aa.current)}function ra(n){ne(aa),La===n&&(La=null),ne(zn)}var zn=P(0);function Mf(n){for(var a=n;a!==null;){if(a.tag===13){var s=a.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Cm(s)||wm(s)))return a}else if(a.tag===19&&(a.memoizedProps.revealOrder==="forwards"||a.memoizedProps.revealOrder==="backwards"||a.memoizedProps.revealOrder==="unstable_legacy-backwards"||a.memoizedProps.revealOrder==="together")){if((a.flags&128)!==0)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break;for(;a.sibling===null;){if(a.return===null||a.return===n)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}var wr=0,Tt=null,fn=null,Xn=null,Ef=!1,ol=!1,uo=!1,Tf=0,Du=0,ll=null,fb=0;function On(){throw Error(i(321))}function Ep(n,a){if(a===null)return!1;for(var s=0;s<a.length&&s<n.length;s++)if(!na(n[s],a[s]))return!1;return!0}function Tp(n,a,s,u,h,m){return wr=m,Tt=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,H.H=n===null||n.memoizedState===null?Ex:Bp,uo=!1,m=s(u,h),uo=!1,ol&&(m=Vv(a,s,u,h)),Gv(n),m}function Gv(n){H.H=Nu;var a=fn!==null&&fn.next!==null;if(wr=0,Xn=fn=Tt=null,Ef=!1,Du=0,ll=null,a)throw Error(i(300));n===null||Wn||(n=n.dependencies,n!==null&&pf(n)&&(Wn=!0))}function Vv(n,a,s,u){Tt=n;var h=0;do{if(ol&&(ll=null),Du=0,ol=!1,25<=h)throw Error(i(301));if(h+=1,Xn=fn=null,n.updateQueue!=null){var m=n.updateQueue;m.lastEffect=null,m.events=null,m.stores=null,m.memoCache!=null&&(m.memoCache.index=0)}H.H=Tx,m=a(s,u)}while(ol);return m}function hb(){var n=H.H,a=n.useState()[0];return a=typeof a.then=="function"?Lu(a):a,n=n.useState()[0],(fn!==null?fn.memoizedState:null)!==n&&(Tt.flags|=1024),a}function bp(){var n=Tf!==0;return Tf=0,n}function Ap(n,a,s){a.updateQueue=n.updateQueue,a.flags&=-2053,n.lanes&=~s}function Rp(n){if(Ef){for(n=n.memoizedState;n!==null;){var a=n.queue;a!==null&&(a.pending=null),n=n.next}Ef=!1}wr=0,Xn=fn=Tt=null,ol=!1,Du=Tf=0,ll=null}function Li(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xn===null?Tt.memoizedState=Xn=n:Xn=Xn.next=n,Xn}function Bn(){if(fn===null){var n=Tt.alternate;n=n!==null?n.memoizedState:null}else n=fn.next;var a=Xn===null?Tt.memoizedState:Xn.next;if(a!==null)Xn=a,fn=n;else{if(n===null)throw Tt.alternate===null?Error(i(467)):Error(i(310));fn=n,n={memoizedState:fn.memoizedState,baseState:fn.baseState,baseQueue:fn.baseQueue,queue:fn.queue,next:null},Xn===null?Tt.memoizedState=Xn=n:Xn=Xn.next=n}return Xn}function bf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lu(n){var a=Du;return Du+=1,ll===null&&(ll=[]),n=Uv(ll,n,a),a=Tt,(Xn===null?a.memoizedState:Xn.next)===null&&(a=a.alternate,H.H=a===null||a.memoizedState===null?Ex:Bp),n}function Af(n){if(n!==null&&typeof n=="object"){if(typeof n.then=="function")return Lu(n);if(n.$$typeof===F)return di(n)}throw Error(i(438,String(n)))}function Cp(n){var a=null,s=Tt.updateQueue;if(s!==null&&(a=s.memoCache),a==null){var u=Tt.alternate;u!==null&&(u=u.updateQueue,u!==null&&(u=u.memoCache,u!=null&&(a={data:u.data.map(function(h){return h.slice()}),index:0})))}if(a==null&&(a={data:[],index:0}),s===null&&(s=bf(),Tt.updateQueue=s),s.memoCache=a,s=a.data[a.index],s===void 0)for(s=a.data[a.index]=Array(n),u=0;u<n;u++)s[u]=I;return a.index++,s}function Dr(n,a){return typeof a=="function"?a(n):a}function Rf(n){var a=Bn();return wp(a,fn,n)}function wp(n,a,s){var u=n.queue;if(u===null)throw Error(i(311));u.lastRenderedReducer=s;var h=n.baseQueue,m=u.pending;if(m!==null){if(h!==null){var T=h.next;h.next=m.next,m.next=T}a.baseQueue=h=m,u.pending=null}if(m=n.baseState,h===null)n.memoizedState=m;else{a=h.next;var O=T=null,W=null,fe=a,ye=!1;do{var Te=fe.lane&-536870913;if(Te!==fe.lane?(Ht&Te)===Te:(wr&Te)===Te){var he=fe.revertLane;if(he===0)W!==null&&(W=W.next={lane:0,revertLane:0,gesture:null,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null}),Te===nl&&(ye=!0);else if((wr&he)===he){fe=fe.next,he===nl&&(ye=!0);continue}else Te={lane:0,revertLane:fe.revertLane,gesture:null,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null},W===null?(O=W=Te,T=m):W=W.next=Te,Tt.lanes|=he,xs|=he;Te=fe.action,uo&&s(m,Te),m=fe.hasEagerState?fe.eagerState:s(m,Te)}else he={lane:Te,revertLane:fe.revertLane,gesture:fe.gesture,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null},W===null?(O=W=he,T=m):W=W.next=he,Tt.lanes|=Te,xs|=Te;fe=fe.next}while(fe!==null&&fe!==a);if(W===null?T=m:W.next=O,!na(m,n.memoizedState)&&(Wn=!0,ye&&(s=il,s!==null)))throw s;n.memoizedState=m,n.baseState=T,n.baseQueue=W,u.lastRenderedState=m}return h===null&&(u.lanes=0),[n.memoizedState,u.dispatch]}function Dp(n){var a=Bn(),s=a.queue;if(s===null)throw Error(i(311));s.lastRenderedReducer=n;var u=s.dispatch,h=s.pending,m=a.memoizedState;if(h!==null){s.pending=null;var T=h=h.next;do m=n(m,T.action),T=T.next;while(T!==h);na(m,a.memoizedState)||(Wn=!0),a.memoizedState=m,a.baseQueue===null&&(a.baseState=m),s.lastRenderedState=m}return[m,u]}function kv(n,a,s){var u=Tt,h=Bn(),m=Vt;if(m){if(s===void 0)throw Error(i(407));s=s()}else s=a();var T=!na((fn||h).memoizedState,s);if(T&&(h.memoizedState=s,Wn=!0),h=h.queue,Np(Yv.bind(null,u,h,n),[n]),h.getSnapshot!==a||T||Xn!==null&&Xn.memoizedState.tag&1){if(u.flags|=2048,ul(9,{destroy:void 0},Wv.bind(null,u,h,s,a),null),gn===null)throw Error(i(349));m||(wr&127)!==0||Xv(u,a,s)}return s}function Xv(n,a,s){n.flags|=16384,n={getSnapshot:a,value:s},a=Tt.updateQueue,a===null?(a=bf(),Tt.updateQueue=a,a.stores=[n]):(s=a.stores,s===null?a.stores=[n]:s.push(n))}function Wv(n,a,s,u){a.value=s,a.getSnapshot=u,qv(a)&&Zv(n)}function Yv(n,a,s){return s(function(){qv(a)&&Zv(n)})}function qv(n){var a=n.getSnapshot;n=n.value;try{var s=a();return!na(n,s)}catch{return!0}}function Zv(n){var a=eo(n,2);a!==null&&Wi(a,n,2)}function Lp(n){var a=Li();if(typeof n=="function"){var s=n;if(n=s(),uo){Pe(!0);try{s()}finally{Pe(!1)}}}return a.memoizedState=a.baseState=n,a.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dr,lastRenderedState:n},a}function Kv(n,a,s,u){return n.baseState=s,wp(n,fn,typeof u=="function"?u:Dr)}function db(n,a,s,u,h){if(Df(n))throw Error(i(485));if(n=a.action,n!==null){var m={payload:h,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(T){m.listeners.push(T)}};H.T!==null?s(!0):m.isTransition=!1,u(m),s=a.pending,s===null?(m.next=a.pending=m,jv(a,m)):(m.next=s.next,a.pending=s.next=m)}}function jv(n,a){var s=a.action,u=a.payload,h=n.state;if(a.isTransition){var m=H.T,T={};H.T=T;try{var O=s(h,u),W=H.S;W!==null&&W(T,O),Qv(n,a,O)}catch(fe){Up(n,a,fe)}finally{m!==null&&T.types!==null&&(m.types=T.types),H.T=m}}else try{m=s(h,u),Qv(n,a,m)}catch(fe){Up(n,a,fe)}}function Qv(n,a,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(u){Jv(n,a,u)},function(u){return Up(n,a,u)}):Jv(n,a,s)}function Jv(n,a,s){a.status="fulfilled",a.value=s,$v(a),n.state=s,a=n.pending,a!==null&&(s=a.next,s===a?n.pending=null:(s=s.next,a.next=s,jv(n,s)))}function Up(n,a,s){var u=n.pending;if(n.pending=null,u!==null){u=u.next;do a.status="rejected",a.reason=s,$v(a),a=a.next;while(a!==u)}n.action=null}function $v(n){n=n.listeners;for(var a=0;a<n.length;a++)(0,n[a])()}function ex(n,a){return a}function tx(n,a){if(Vt){var s=gn.formState;if(s!==null){e:{var u=Tt;if(Vt){if(bn){t:{for(var h=bn,m=Da;h.nodeType!==8;){if(!m){h=null;break t}if(h=Ua(h.nextSibling),h===null){h=null;break t}}m=h.data,h=m==="F!"||m==="F"?h:null}if(h){bn=Ua(h.nextSibling),u=h.data==="F!";break e}}cs(u)}u=!1}u&&(a=s[0])}}return s=Li(),s.memoizedState=s.baseState=a,u={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ex,lastRenderedState:a},s.queue=u,s=Sx.bind(null,Tt,u),u.dispatch=s,u=Lp(!1),m=zp.bind(null,Tt,!1,u.queue),u=Li(),h={state:a,dispatch:null,action:n,pending:null},u.queue=h,s=db.bind(null,Tt,h,m,s),h.dispatch=s,u.memoizedState=n,[a,s,!1]}function nx(n){var a=Bn();return ix(a,fn,n)}function ix(n,a,s){if(a=wp(n,a,ex)[0],n=Rf(Dr)[0],typeof a=="object"&&a!==null&&typeof a.then=="function")try{var u=Lu(a)}catch(T){throw T===al?gf:T}else u=a;a=Bn();var h=a.queue,m=h.dispatch;return s!==a.memoizedState&&(Tt.flags|=2048,ul(9,{destroy:void 0},pb.bind(null,h,s),null)),[u,m,n]}function pb(n,a){n.action=a}function ax(n){var a=Bn(),s=fn;if(s!==null)return ix(a,s,n);Bn(),a=a.memoizedState,s=Bn();var u=s.queue.dispatch;return s.memoizedState=n,[a,u,!1]}function ul(n,a,s,u){return n={tag:n,create:s,deps:u,inst:a,next:null},a=Tt.updateQueue,a===null&&(a=bf(),Tt.updateQueue=a),s=a.lastEffect,s===null?a.lastEffect=n.next=n:(u=s.next,s.next=n,n.next=u,a.lastEffect=n),n}function rx(){return Bn().memoizedState}function Cf(n,a,s,u){var h=Li();Tt.flags|=n,h.memoizedState=ul(1|a,{destroy:void 0},s,u===void 0?null:u)}function wf(n,a,s,u){var h=Bn();u=u===void 0?null:u;var m=h.memoizedState.inst;fn!==null&&u!==null&&Ep(u,fn.memoizedState.deps)?h.memoizedState=ul(a,m,s,u):(Tt.flags|=n,h.memoizedState=ul(1|a,m,s,u))}function sx(n,a){Cf(8390656,8,n,a)}function Np(n,a){wf(2048,8,n,a)}function mb(n){Tt.flags|=4;var a=Tt.updateQueue;if(a===null)a=bf(),Tt.updateQueue=a,a.events=[n];else{var s=a.events;s===null?a.events=[n]:s.push(n)}}function ox(n){var a=Bn().memoizedState;return mb({ref:a,nextImpl:n}),function(){if(($t&2)!==0)throw Error(i(440));return a.impl.apply(void 0,arguments)}}function lx(n,a){return wf(4,2,n,a)}function ux(n,a){return wf(4,4,n,a)}function cx(n,a){if(typeof a=="function"){n=n();var s=a(n);return function(){typeof s=="function"?s():a(null)}}if(a!=null)return n=n(),a.current=n,function(){a.current=null}}function fx(n,a,s){s=s!=null?s.concat([n]):null,wf(4,4,cx.bind(null,a,n),s)}function Op(){}function hx(n,a){var s=Bn();a=a===void 0?null:a;var u=s.memoizedState;return a!==null&&Ep(a,u[1])?u[0]:(s.memoizedState=[n,a],n)}function dx(n,a){var s=Bn();a=a===void 0?null:a;var u=s.memoizedState;if(a!==null&&Ep(a,u[1]))return u[0];if(u=n(),uo){Pe(!0);try{n()}finally{Pe(!1)}}return s.memoizedState=[u,a],u}function Pp(n,a,s){return s===void 0||(wr&1073741824)!==0&&(Ht&261930)===0?n.memoizedState=a:(n.memoizedState=s,n=pS(),Tt.lanes|=n,xs|=n,s)}function px(n,a,s,u){return na(s,a)?s:sl.current!==null?(n=Pp(n,s,u),na(n,a)||(Wn=!0),n):(wr&42)===0||(wr&1073741824)!==0&&(Ht&261930)===0?(Wn=!0,n.memoizedState=s):(n=pS(),Tt.lanes|=n,xs|=n,a)}function mx(n,a,s,u,h){var m=G.p;G.p=m!==0&&8>m?m:8;var T=H.T,O={};H.T=O,zp(n,!1,a,s);try{var W=h(),fe=H.S;if(fe!==null&&fe(O,W),W!==null&&typeof W=="object"&&typeof W.then=="function"){var ye=cb(W,u);Uu(n,a,ye,la(n))}else Uu(n,a,u,la(n))}catch(Te){Uu(n,a,{then:function(){},status:"rejected",reason:Te},la())}finally{G.p=m,T!==null&&O.types!==null&&(T.types=O.types),H.T=T}}function _b(){}function Fp(n,a,s,u){if(n.tag!==5)throw Error(i(476));var h=_x(n).queue;mx(n,h,a,te,s===null?_b:function(){return gx(n),s(u)})}function _x(n){var a=n.memoizedState;if(a!==null)return a;a={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dr,lastRenderedState:te},next:null};var s={};return a.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dr,lastRenderedState:s},next:null},n.memoizedState=a,n=n.alternate,n!==null&&(n.memoizedState=a),a}function gx(n){var a=_x(n);a.next===null&&(a=n.alternate.memoizedState),Uu(n,a.next.queue,{},la())}function Ip(){return di(Ku)}function vx(){return Bn().memoizedState}function xx(){return Bn().memoizedState}function gb(n){for(var a=n.return;a!==null;){switch(a.tag){case 24:case 3:var s=la();n=ds(s);var u=ps(a,n,s);u!==null&&(Wi(u,a,s),Ru(u,a,s)),a={cache:hp()},n.payload=a;return}a=a.return}}function vb(n,a,s){var u=la();s={lane:u,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Df(n)?yx(a,s):(s=tp(n,a,s,u),s!==null&&(Wi(s,n,u),Mx(s,a,u)))}function Sx(n,a,s){var u=la();Uu(n,a,s,u)}function Uu(n,a,s,u){var h={lane:u,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Df(n))yx(a,h);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=a.lastRenderedReducer,m!==null))try{var T=a.lastRenderedState,O=m(T,s);if(h.hasEagerState=!0,h.eagerState=O,na(O,T))return cf(n,a,h,0),gn===null&&uf(),!1}catch{}finally{}if(s=tp(n,a,h,u),s!==null)return Wi(s,n,u),Mx(s,a,u),!0}return!1}function zp(n,a,s,u){if(u={lane:2,revertLane:_m(),gesture:null,action:u,hasEagerState:!1,eagerState:null,next:null},Df(n)){if(a)throw Error(i(479))}else a=tp(n,s,u,2),a!==null&&Wi(a,n,2)}function Df(n){var a=n.alternate;return n===Tt||a!==null&&a===Tt}function yx(n,a){ol=Ef=!0;var s=n.pending;s===null?a.next=a:(a.next=s.next,s.next=a),n.pending=a}function Mx(n,a,s){if((s&4194048)!==0){var u=a.lanes;u&=n.pendingLanes,s|=u,a.lanes=s,ot(n,s)}}var Nu={readContext:di,use:Af,useCallback:On,useContext:On,useEffect:On,useImperativeHandle:On,useLayoutEffect:On,useInsertionEffect:On,useMemo:On,useReducer:On,useRef:On,useState:On,useDebugValue:On,useDeferredValue:On,useTransition:On,useSyncExternalStore:On,useId:On,useHostTransitionStatus:On,useFormState:On,useActionState:On,useOptimistic:On,useMemoCache:On,useCacheRefresh:On};Nu.useEffectEvent=On;var Ex={readContext:di,use:Af,useCallback:function(n,a){return Li().memoizedState=[n,a===void 0?null:a],n},useContext:di,useEffect:sx,useImperativeHandle:function(n,a,s){s=s!=null?s.concat([n]):null,Cf(4194308,4,cx.bind(null,a,n),s)},useLayoutEffect:function(n,a){return Cf(4194308,4,n,a)},useInsertionEffect:function(n,a){Cf(4,2,n,a)},useMemo:function(n,a){var s=Li();a=a===void 0?null:a;var u=n();if(uo){Pe(!0);try{n()}finally{Pe(!1)}}return s.memoizedState=[u,a],u},useReducer:function(n,a,s){var u=Li();if(s!==void 0){var h=s(a);if(uo){Pe(!0);try{s(a)}finally{Pe(!1)}}}else h=a;return u.memoizedState=u.baseState=h,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:h},u.queue=n,n=n.dispatch=vb.bind(null,Tt,n),[u.memoizedState,n]},useRef:function(n){var a=Li();return n={current:n},a.memoizedState=n},useState:function(n){n=Lp(n);var a=n.queue,s=Sx.bind(null,Tt,a);return a.dispatch=s,[n.memoizedState,s]},useDebugValue:Op,useDeferredValue:function(n,a){var s=Li();return Pp(s,n,a)},useTransition:function(){var n=Lp(!1);return n=mx.bind(null,Tt,n.queue,!0,!1),Li().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,a,s){var u=Tt,h=Li();if(Vt){if(s===void 0)throw Error(i(407));s=s()}else{if(s=a(),gn===null)throw Error(i(349));(Ht&127)!==0||Xv(u,a,s)}h.memoizedState=s;var m={value:s,getSnapshot:a};return h.queue=m,sx(Yv.bind(null,u,m,n),[n]),u.flags|=2048,ul(9,{destroy:void 0},Wv.bind(null,u,m,s,a),null),s},useId:function(){var n=Li(),a=gn.identifierPrefix;if(Vt){var s=ar,u=ir;s=(u&~(1<<32-Xe(u)-1)).toString(32)+s,a="_"+a+"R_"+s,s=Tf++,0<s&&(a+="H"+s.toString(32)),a+="_"}else s=fb++,a="_"+a+"r_"+s.toString(32)+"_";return n.memoizedState=a},useHostTransitionStatus:Ip,useFormState:tx,useActionState:tx,useOptimistic:function(n){var a=Li();a.memoizedState=a.baseState=n;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return a.queue=s,a=zp.bind(null,Tt,!0,s),s.dispatch=a,[n,a]},useMemoCache:Cp,useCacheRefresh:function(){return Li().memoizedState=gb.bind(null,Tt)},useEffectEvent:function(n){var a=Li(),s={impl:n};return a.memoizedState=s,function(){if(($t&2)!==0)throw Error(i(440));return s.impl.apply(void 0,arguments)}}},Bp={readContext:di,use:Af,useCallback:hx,useContext:di,useEffect:Np,useImperativeHandle:fx,useInsertionEffect:lx,useLayoutEffect:ux,useMemo:dx,useReducer:Rf,useRef:rx,useState:function(){return Rf(Dr)},useDebugValue:Op,useDeferredValue:function(n,a){var s=Bn();return px(s,fn.memoizedState,n,a)},useTransition:function(){var n=Rf(Dr)[0],a=Bn().memoizedState;return[typeof n=="boolean"?n:Lu(n),a]},useSyncExternalStore:kv,useId:vx,useHostTransitionStatus:Ip,useFormState:nx,useActionState:nx,useOptimistic:function(n,a){var s=Bn();return Kv(s,fn,n,a)},useMemoCache:Cp,useCacheRefresh:xx};Bp.useEffectEvent=ox;var Tx={readContext:di,use:Af,useCallback:hx,useContext:di,useEffect:Np,useImperativeHandle:fx,useInsertionEffect:lx,useLayoutEffect:ux,useMemo:dx,useReducer:Dp,useRef:rx,useState:function(){return Dp(Dr)},useDebugValue:Op,useDeferredValue:function(n,a){var s=Bn();return fn===null?Pp(s,n,a):px(s,fn.memoizedState,n,a)},useTransition:function(){var n=Dp(Dr)[0],a=Bn().memoizedState;return[typeof n=="boolean"?n:Lu(n),a]},useSyncExternalStore:kv,useId:vx,useHostTransitionStatus:Ip,useFormState:ax,useActionState:ax,useOptimistic:function(n,a){var s=Bn();return fn!==null?Kv(s,fn,n,a):(s.baseState=n,[n,s.queue.dispatch])},useMemoCache:Cp,useCacheRefresh:xx};Tx.useEffectEvent=ox;function Hp(n,a,s,u){a=n.memoizedState,s=s(u,a),s=s==null?a:v({},a,s),n.memoizedState=s,n.lanes===0&&(n.updateQueue.baseState=s)}var Gp={enqueueSetState:function(n,a,s){n=n._reactInternals;var u=la(),h=ds(u);h.payload=a,s!=null&&(h.callback=s),a=ps(n,h,u),a!==null&&(Wi(a,n,u),Ru(a,n,u))},enqueueReplaceState:function(n,a,s){n=n._reactInternals;var u=la(),h=ds(u);h.tag=1,h.payload=a,s!=null&&(h.callback=s),a=ps(n,h,u),a!==null&&(Wi(a,n,u),Ru(a,n,u))},enqueueForceUpdate:function(n,a){n=n._reactInternals;var s=la(),u=ds(s);u.tag=2,a!=null&&(u.callback=a),a=ps(n,u,s),a!==null&&(Wi(a,n,s),Ru(a,n,s))}};function bx(n,a,s,u,h,m,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,m,T):a.prototype&&a.prototype.isPureReactComponent?!xu(s,u)||!xu(h,m):!0}function Ax(n,a,s,u){n=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(s,u),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(s,u),a.state!==n&&Gp.enqueueReplaceState(a,a.state,null)}function co(n,a){var s=a;if("ref"in a){s={};for(var u in a)u!=="ref"&&(s[u]=a[u])}if(n=n.defaultProps){s===a&&(s=v({},s));for(var h in n)s[h]===void 0&&(s[h]=n[h])}return s}function Rx(n){lf(n)}function Cx(n){console.error(n)}function wx(n){lf(n)}function Lf(n,a){try{var s=n.onUncaughtError;s(a.value,{componentStack:a.stack})}catch(u){setTimeout(function(){throw u})}}function Dx(n,a,s){try{var u=n.onCaughtError;u(s.value,{componentStack:s.stack,errorBoundary:a.tag===1?a.stateNode:null})}catch(h){setTimeout(function(){throw h})}}function Vp(n,a,s){return s=ds(s),s.tag=3,s.payload={element:null},s.callback=function(){Lf(n,a)},s}function Lx(n){return n=ds(n),n.tag=3,n}function Ux(n,a,s,u){var h=s.type.getDerivedStateFromError;if(typeof h=="function"){var m=u.value;n.payload=function(){return h(m)},n.callback=function(){Dx(a,s,u)}}var T=s.stateNode;T!==null&&typeof T.componentDidCatch=="function"&&(n.callback=function(){Dx(a,s,u),typeof h!="function"&&(Ss===null?Ss=new Set([this]):Ss.add(this));var O=u.stack;this.componentDidCatch(u.value,{componentStack:O!==null?O:""})})}function xb(n,a,s,u,h){if(s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){if(a=s.alternate,a!==null&&tl(a,s,h,!0),s=aa.current,s!==null){switch(s.tag){case 31:case 13:return La===null?kf():s.alternate===null&&Pn===0&&(Pn=3),s.flags&=-257,s.flags|=65536,s.lanes=h,u===vf?s.flags|=16384:(a=s.updateQueue,a===null?s.updateQueue=new Set([u]):a.add(u),dm(n,u,h)),!1;case 22:return s.flags|=65536,u===vf?s.flags|=16384:(a=s.updateQueue,a===null?(a={transitions:null,markerInstances:null,retryQueue:new Set([u])},s.updateQueue=a):(s=a.retryQueue,s===null?a.retryQueue=new Set([u]):s.add(u)),dm(n,u,h)),!1}throw Error(i(435,s.tag))}return dm(n,u,h),kf(),!1}if(Vt)return a=aa.current,a!==null?((a.flags&65536)===0&&(a.flags|=256),a.flags|=65536,a.lanes=h,u!==op&&(n=Error(i(422),{cause:u}),Mu(Ra(n,s)))):(u!==op&&(a=Error(i(423),{cause:u}),Mu(Ra(a,s))),n=n.current.alternate,n.flags|=65536,h&=-h,n.lanes|=h,u=Ra(u,s),h=Vp(n.stateNode,u,h),vp(n,h),Pn!==4&&(Pn=2)),!1;var m=Error(i(520),{cause:u});if(m=Ra(m,s),Gu===null?Gu=[m]:Gu.push(m),Pn!==4&&(Pn=2),a===null)return!0;u=Ra(u,s),s=a;do{switch(s.tag){case 3:return s.flags|=65536,n=h&-h,s.lanes|=n,n=Vp(s.stateNode,u,n),vp(s,n),!1;case 1:if(a=s.type,m=s.stateNode,(s.flags&128)===0&&(typeof a.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Ss===null||!Ss.has(m))))return s.flags|=65536,h&=-h,s.lanes|=h,h=Lx(h),Ux(h,n,s,u),vp(s,h),!1}s=s.return}while(s!==null);return!1}var kp=Error(i(461)),Wn=!1;function pi(n,a,s,u){a.child=n===null?Fv(a,null,s,u):lo(a,n.child,s,u)}function Nx(n,a,s,u,h){s=s.render;var m=a.ref;if("ref"in u){var T={};for(var O in u)O!=="ref"&&(T[O]=u[O])}else T=u;return ao(a),u=Tp(n,a,s,T,m,h),O=bp(),n!==null&&!Wn?(Ap(n,a,h),Lr(n,a,h)):(Vt&&O&&rp(a),a.flags|=1,pi(n,a,u,h),a.child)}function Ox(n,a,s,u,h){if(n===null){var m=s.type;return typeof m=="function"&&!np(m)&&m.defaultProps===void 0&&s.compare===null?(a.tag=15,a.type=m,Px(n,a,m,u,h)):(n=hf(s.type,null,u,a,a.mode,h),n.ref=a.ref,n.return=a,a.child=n)}if(m=n.child,!Qp(n,h)){var T=m.memoizedProps;if(s=s.compare,s=s!==null?s:xu,s(T,u)&&n.ref===a.ref)return Lr(n,a,h)}return a.flags|=1,n=br(m,u),n.ref=a.ref,n.return=a,a.child=n}function Px(n,a,s,u,h){if(n!==null){var m=n.memoizedProps;if(xu(m,u)&&n.ref===a.ref)if(Wn=!1,a.pendingProps=u=m,Qp(n,h))(n.flags&131072)!==0&&(Wn=!0);else return a.lanes=n.lanes,Lr(n,a,h)}return Xp(n,a,s,u,h)}function Fx(n,a,s,u){var h=u.children,m=n!==null?n.memoizedState:null;if(n===null&&a.stateNode===null&&(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),u.mode==="hidden"){if((a.flags&128)!==0){if(m=m!==null?m.baseLanes|s:s,n!==null){for(u=a.child=n.child,h=0;u!==null;)h=h|u.lanes|u.childLanes,u=u.sibling;u=h&~m}else u=0,a.child=null;return Ix(n,a,m,s,u)}if((s&536870912)!==0)a.memoizedState={baseLanes:0,cachePool:null},n!==null&&_f(a,m!==null?m.cachePool:null),m!==null?Bv(a,m):Sp(),Hv(a);else return u=a.lanes=536870912,Ix(n,a,m!==null?m.baseLanes|s:s,s,u)}else m!==null?(_f(a,m.cachePool),Bv(a,m),_s(),a.memoizedState=null):(n!==null&&_f(a,null),Sp(),_s());return pi(n,a,h,s),a.child}function Ou(n,a){return n!==null&&n.tag===22||a.stateNode!==null||(a.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.sibling}function Ix(n,a,s,u,h){var m=pp();return m=m===null?null:{parent:kn._currentValue,pool:m},a.memoizedState={baseLanes:s,cachePool:m},n!==null&&_f(a,null),Sp(),Hv(a),n!==null&&tl(n,a,u,!0),a.childLanes=h,null}function Uf(n,a){return a=Of({mode:a.mode,children:a.children},n.mode),a.ref=n.ref,n.child=a,a.return=n,a}function zx(n,a,s){return lo(a,n.child,null,s),n=Uf(a,a.pendingProps),n.flags|=2,ra(a),a.memoizedState=null,n}function Sb(n,a,s){var u=a.pendingProps,h=(a.flags&128)!==0;if(a.flags&=-129,n===null){if(Vt){if(u.mode==="hidden")return n=Uf(a,u),a.lanes=536870912,Ou(null,n);if(Mp(a),(n=bn)?(n=jS(n,Da),n=n!==null&&n.data==="&"?n:null,n!==null&&(a.memoizedState={dehydrated:n,treeContext:ls!==null?{id:ir,overflow:ar}:null,retryLane:536870912,hydrationErrors:null},s=yv(n),s.return=a,a.child=s,hi=a,bn=null)):n=null,n===null)throw cs(a);return a.lanes=536870912,null}return Uf(a,u)}var m=n.memoizedState;if(m!==null){var T=m.dehydrated;if(Mp(a),h)if(a.flags&256)a.flags&=-257,a=zx(n,a,s);else if(a.memoizedState!==null)a.child=n.child,a.flags|=128,a=null;else throw Error(i(558));else if(Wn||tl(n,a,s,!1),h=(s&n.childLanes)!==0,Wn||h){if(u=gn,u!==null&&(T=Qe(u,s),T!==0&&T!==m.retryLane))throw m.retryLane=T,eo(n,T),Wi(u,n,T),kp;kf(),a=zx(n,a,s)}else n=m.treeContext,bn=Ua(T.nextSibling),hi=a,Vt=!0,us=null,Da=!1,n!==null&&Tv(a,n),a=Uf(a,u),a.flags|=4096;return a}return n=br(n.child,{mode:u.mode,children:u.children}),n.ref=a.ref,a.child=n,n.return=a,n}function Nf(n,a){var s=a.ref;if(s===null)n!==null&&n.ref!==null&&(a.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(i(284));(n===null||n.ref!==s)&&(a.flags|=4194816)}}function Xp(n,a,s,u,h){return ao(a),s=Tp(n,a,s,u,void 0,h),u=bp(),n!==null&&!Wn?(Ap(n,a,h),Lr(n,a,h)):(Vt&&u&&rp(a),a.flags|=1,pi(n,a,s,h),a.child)}function Bx(n,a,s,u,h,m){return ao(a),a.updateQueue=null,s=Vv(a,u,s,h),Gv(n),u=bp(),n!==null&&!Wn?(Ap(n,a,m),Lr(n,a,m)):(Vt&&u&&rp(a),a.flags|=1,pi(n,a,s,m),a.child)}function Hx(n,a,s,u,h){if(ao(a),a.stateNode===null){var m=Qo,T=s.contextType;typeof T=="object"&&T!==null&&(m=di(T)),m=new s(u,m),a.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,m.updater=Gp,a.stateNode=m,m._reactInternals=a,m=a.stateNode,m.props=u,m.state=a.memoizedState,m.refs={},_p(a),T=s.contextType,m.context=typeof T=="object"&&T!==null?di(T):Qo,m.state=a.memoizedState,T=s.getDerivedStateFromProps,typeof T=="function"&&(Hp(a,s,T,u),m.state=a.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof m.getSnapshotBeforeUpdate=="function"||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(T=m.state,typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount(),T!==m.state&&Gp.enqueueReplaceState(m,m.state,null),wu(a,u,m,h),Cu(),m.state=a.memoizedState),typeof m.componentDidMount=="function"&&(a.flags|=4194308),u=!0}else if(n===null){m=a.stateNode;var O=a.memoizedProps,W=co(s,O);m.props=W;var fe=m.context,ye=s.contextType;T=Qo,typeof ye=="object"&&ye!==null&&(T=di(ye));var Te=s.getDerivedStateFromProps;ye=typeof Te=="function"||typeof m.getSnapshotBeforeUpdate=="function",O=a.pendingProps!==O,ye||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(O||fe!==T)&&Ax(a,m,u,T),hs=!1;var he=a.memoizedState;m.state=he,wu(a,u,m,h),Cu(),fe=a.memoizedState,O||he!==fe||hs?(typeof Te=="function"&&(Hp(a,s,Te,u),fe=a.memoizedState),(W=hs||bx(a,s,W,u,he,fe,T))?(ye||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(a.flags|=4194308)):(typeof m.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=u,a.memoizedState=fe),m.props=u,m.state=fe,m.context=T,u=W):(typeof m.componentDidMount=="function"&&(a.flags|=4194308),u=!1)}else{m=a.stateNode,gp(n,a),T=a.memoizedProps,ye=co(s,T),m.props=ye,Te=a.pendingProps,he=m.context,fe=s.contextType,W=Qo,typeof fe=="object"&&fe!==null&&(W=di(fe)),O=s.getDerivedStateFromProps,(fe=typeof O=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(T!==Te||he!==W)&&Ax(a,m,u,W),hs=!1,he=a.memoizedState,m.state=he,wu(a,u,m,h),Cu();var ve=a.memoizedState;T!==Te||he!==ve||hs||n!==null&&n.dependencies!==null&&pf(n.dependencies)?(typeof O=="function"&&(Hp(a,s,O,u),ve=a.memoizedState),(ye=hs||bx(a,s,ye,u,he,ve,W)||n!==null&&n.dependencies!==null&&pf(n.dependencies))?(fe||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(u,ve,W),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(u,ve,W)),typeof m.componentDidUpdate=="function"&&(a.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof m.componentDidUpdate!="function"||T===n.memoizedProps&&he===n.memoizedState||(a.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||T===n.memoizedProps&&he===n.memoizedState||(a.flags|=1024),a.memoizedProps=u,a.memoizedState=ve),m.props=u,m.state=ve,m.context=W,u=ye):(typeof m.componentDidUpdate!="function"||T===n.memoizedProps&&he===n.memoizedState||(a.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||T===n.memoizedProps&&he===n.memoizedState||(a.flags|=1024),u=!1)}return m=u,Nf(n,a),u=(a.flags&128)!==0,m||u?(m=a.stateNode,s=u&&typeof s.getDerivedStateFromError!="function"?null:m.render(),a.flags|=1,n!==null&&u?(a.child=lo(a,n.child,null,h),a.child=lo(a,null,s,h)):pi(n,a,s,h),a.memoizedState=m.state,n=a.child):n=Lr(n,a,h),n}function Gx(n,a,s,u){return no(),a.flags|=256,pi(n,a,s,u),a.child}var Wp={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yp(n){return{baseLanes:n,cachePool:Dv()}}function qp(n,a,s){return n=n!==null?n.childLanes&~s:0,a&&(n|=oa),n}function Vx(n,a,s){var u=a.pendingProps,h=!1,m=(a.flags&128)!==0,T;if((T=m)||(T=n!==null&&n.memoizedState===null?!1:(zn.current&2)!==0),T&&(h=!0,a.flags&=-129),T=(a.flags&32)!==0,a.flags&=-33,n===null){if(Vt){if(h?ms(a):_s(),(n=bn)?(n=jS(n,Da),n=n!==null&&n.data!=="&"?n:null,n!==null&&(a.memoizedState={dehydrated:n,treeContext:ls!==null?{id:ir,overflow:ar}:null,retryLane:536870912,hydrationErrors:null},s=yv(n),s.return=a,a.child=s,hi=a,bn=null)):n=null,n===null)throw cs(a);return wm(n)?a.lanes=32:a.lanes=536870912,null}var O=u.children;return u=u.fallback,h?(_s(),h=a.mode,O=Of({mode:"hidden",children:O},h),u=to(u,h,s,null),O.return=a,u.return=a,O.sibling=u,a.child=O,u=a.child,u.memoizedState=Yp(s),u.childLanes=qp(n,T,s),a.memoizedState=Wp,Ou(null,u)):(ms(a),Zp(a,O))}var W=n.memoizedState;if(W!==null&&(O=W.dehydrated,O!==null)){if(m)a.flags&256?(ms(a),a.flags&=-257,a=Kp(n,a,s)):a.memoizedState!==null?(_s(),a.child=n.child,a.flags|=128,a=null):(_s(),O=u.fallback,h=a.mode,u=Of({mode:"visible",children:u.children},h),O=to(O,h,s,null),O.flags|=2,u.return=a,O.return=a,u.sibling=O,a.child=u,lo(a,n.child,null,s),u=a.child,u.memoizedState=Yp(s),u.childLanes=qp(n,T,s),a.memoizedState=Wp,a=Ou(null,u));else if(ms(a),wm(O)){if(T=O.nextSibling&&O.nextSibling.dataset,T)var fe=T.dgst;T=fe,u=Error(i(419)),u.stack="",u.digest=T,Mu({value:u,source:null,stack:null}),a=Kp(n,a,s)}else if(Wn||tl(n,a,s,!1),T=(s&n.childLanes)!==0,Wn||T){if(T=gn,T!==null&&(u=Qe(T,s),u!==0&&u!==W.retryLane))throw W.retryLane=u,eo(n,u),Wi(T,n,u),kp;Cm(O)||kf(),a=Kp(n,a,s)}else Cm(O)?(a.flags|=192,a.child=n.child,a=null):(n=W.treeContext,bn=Ua(O.nextSibling),hi=a,Vt=!0,us=null,Da=!1,n!==null&&Tv(a,n),a=Zp(a,u.children),a.flags|=4096);return a}return h?(_s(),O=u.fallback,h=a.mode,W=n.child,fe=W.sibling,u=br(W,{mode:"hidden",children:u.children}),u.subtreeFlags=W.subtreeFlags&65011712,fe!==null?O=br(fe,O):(O=to(O,h,s,null),O.flags|=2),O.return=a,u.return=a,u.sibling=O,a.child=u,Ou(null,u),u=a.child,O=n.child.memoizedState,O===null?O=Yp(s):(h=O.cachePool,h!==null?(W=kn._currentValue,h=h.parent!==W?{parent:W,pool:W}:h):h=Dv(),O={baseLanes:O.baseLanes|s,cachePool:h}),u.memoizedState=O,u.childLanes=qp(n,T,s),a.memoizedState=Wp,Ou(n.child,u)):(ms(a),s=n.child,n=s.sibling,s=br(s,{mode:"visible",children:u.children}),s.return=a,s.sibling=null,n!==null&&(T=a.deletions,T===null?(a.deletions=[n],a.flags|=16):T.push(n)),a.child=s,a.memoizedState=null,s)}function Zp(n,a){return a=Of({mode:"visible",children:a},n.mode),a.return=n,n.child=a}function Of(n,a){return n=ia(22,n,null,a),n.lanes=0,n}function Kp(n,a,s){return lo(a,n.child,null,s),n=Zp(a,a.pendingProps.children),n.flags|=2,a.memoizedState=null,n}function kx(n,a,s){n.lanes|=a;var u=n.alternate;u!==null&&(u.lanes|=a),cp(n.return,a,s)}function jp(n,a,s,u,h,m){var T=n.memoizedState;T===null?n.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:u,tail:s,tailMode:h,treeForkCount:m}:(T.isBackwards=a,T.rendering=null,T.renderingStartTime=0,T.last=u,T.tail=s,T.tailMode=h,T.treeForkCount=m)}function Xx(n,a,s){var u=a.pendingProps,h=u.revealOrder,m=u.tail;u=u.children;var T=zn.current,O=(T&2)!==0;if(O?(T=T&1|2,a.flags|=128):T&=1,_e(zn,T),pi(n,a,u,s),u=Vt?yu:0,!O&&n!==null&&(n.flags&128)!==0)e:for(n=a.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&kx(n,s,a);else if(n.tag===19)kx(n,s,a);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===a)break e;for(;n.sibling===null;){if(n.return===null||n.return===a)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}switch(h){case"forwards":for(s=a.child,h=null;s!==null;)n=s.alternate,n!==null&&Mf(n)===null&&(h=s),s=s.sibling;s=h,s===null?(h=a.child,a.child=null):(h=s.sibling,s.sibling=null),jp(a,!1,h,s,m,u);break;case"backwards":case"unstable_legacy-backwards":for(s=null,h=a.child,a.child=null;h!==null;){if(n=h.alternate,n!==null&&Mf(n)===null){a.child=h;break}n=h.sibling,h.sibling=s,s=h,h=n}jp(a,!0,s,null,m,u);break;case"together":jp(a,!1,null,null,void 0,u);break;default:a.memoizedState=null}return a.child}function Lr(n,a,s){if(n!==null&&(a.dependencies=n.dependencies),xs|=a.lanes,(s&a.childLanes)===0)if(n!==null){if(tl(n,a,s,!1),(s&a.childLanes)===0)return null}else return null;if(n!==null&&a.child!==n.child)throw Error(i(153));if(a.child!==null){for(n=a.child,s=br(n,n.pendingProps),a.child=s,s.return=a;n.sibling!==null;)n=n.sibling,s=s.sibling=br(n,n.pendingProps),s.return=a;s.sibling=null}return a.child}function Qp(n,a){return(n.lanes&a)!==0?!0:(n=n.dependencies,!!(n!==null&&pf(n)))}function yb(n,a,s){switch(a.tag){case 3:pe(a,a.stateNode.containerInfo),fs(a,kn,n.memoizedState.cache),no();break;case 27:case 5:at(a);break;case 4:pe(a,a.stateNode.containerInfo);break;case 10:fs(a,a.type,a.memoizedProps.value);break;case 31:if(a.memoizedState!==null)return a.flags|=128,Mp(a),null;break;case 13:var u=a.memoizedState;if(u!==null)return u.dehydrated!==null?(ms(a),a.flags|=128,null):(s&a.child.childLanes)!==0?Vx(n,a,s):(ms(a),n=Lr(n,a,s),n!==null?n.sibling:null);ms(a);break;case 19:var h=(n.flags&128)!==0;if(u=(s&a.childLanes)!==0,u||(tl(n,a,s,!1),u=(s&a.childLanes)!==0),h){if(u)return Xx(n,a,s);a.flags|=128}if(h=a.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),_e(zn,zn.current),u)break;return null;case 22:return a.lanes=0,Fx(n,a,s,a.pendingProps);case 24:fs(a,kn,n.memoizedState.cache)}return Lr(n,a,s)}function Wx(n,a,s){if(n!==null)if(n.memoizedProps!==a.pendingProps)Wn=!0;else{if(!Qp(n,s)&&(a.flags&128)===0)return Wn=!1,yb(n,a,s);Wn=(n.flags&131072)!==0}else Wn=!1,Vt&&(a.flags&1048576)!==0&&Ev(a,yu,a.index);switch(a.lanes=0,a.tag){case 16:e:{var u=a.pendingProps;if(n=so(a.elementType),a.type=n,typeof n=="function")np(n)?(u=co(n,u),a.tag=1,a=Hx(null,a,n,u,s)):(a.tag=0,a=Xp(null,a,n,u,s));else{if(n!=null){var h=n.$$typeof;if(h===R){a.tag=11,a=Nx(null,a,n,u,s);break e}else if(h===w){a.tag=14,a=Ox(null,a,n,u,s);break e}}throw a=Y(n)||n,Error(i(306,a,""))}}return a;case 0:return Xp(n,a,a.type,a.pendingProps,s);case 1:return u=a.type,h=co(u,a.pendingProps),Hx(n,a,u,h,s);case 3:e:{if(pe(a,a.stateNode.containerInfo),n===null)throw Error(i(387));u=a.pendingProps;var m=a.memoizedState;h=m.element,gp(n,a),wu(a,u,null,s);var T=a.memoizedState;if(u=T.cache,fs(a,kn,u),u!==m.cache&&fp(a,[kn],s,!0),Cu(),u=T.element,m.isDehydrated)if(m={element:u,isDehydrated:!1,cache:T.cache},a.updateQueue.baseState=m,a.memoizedState=m,a.flags&256){a=Gx(n,a,u,s);break e}else if(u!==h){h=Ra(Error(i(424)),a),Mu(h),a=Gx(n,a,u,s);break e}else{switch(n=a.stateNode.containerInfo,n.nodeType){case 9:n=n.body;break;default:n=n.nodeName==="HTML"?n.ownerDocument.body:n}for(bn=Ua(n.firstChild),hi=a,Vt=!0,us=null,Da=!0,s=Fv(a,null,u,s),a.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(no(),u===h){a=Lr(n,a,s);break e}pi(n,a,u,s)}a=a.child}return a;case 26:return Nf(n,a),n===null?(s=ny(a.type,null,a.pendingProps,null))?a.memoizedState=s:Vt||(s=a.type,n=a.pendingProps,u=jf(Be.current).createElement(s),u[St]=a,u[Mt]=n,mi(u,s,n),Ct(u),a.stateNode=u):a.memoizedState=ny(a.type,n.memoizedProps,a.pendingProps,n.memoizedState),null;case 27:return at(a),n===null&&Vt&&(u=a.stateNode=$S(a.type,a.pendingProps,Be.current),hi=a,Da=!0,h=bn,Ts(a.type)?(Dm=h,bn=Ua(u.firstChild)):bn=h),pi(n,a,a.pendingProps.children,s),Nf(n,a),n===null&&(a.flags|=4194304),a.child;case 5:return n===null&&Vt&&((h=u=bn)&&(u=Qb(u,a.type,a.pendingProps,Da),u!==null?(a.stateNode=u,hi=a,bn=Ua(u.firstChild),Da=!1,h=!0):h=!1),h||cs(a)),at(a),h=a.type,m=a.pendingProps,T=n!==null?n.memoizedProps:null,u=m.children,bm(h,m)?u=null:T!==null&&bm(h,T)&&(a.flags|=32),a.memoizedState!==null&&(h=Tp(n,a,hb,null,null,s),Ku._currentValue=h),Nf(n,a),pi(n,a,u,s),a.child;case 6:return n===null&&Vt&&((n=s=bn)&&(s=Jb(s,a.pendingProps,Da),s!==null?(a.stateNode=s,hi=a,bn=null,n=!0):n=!1),n||cs(a)),null;case 13:return Vx(n,a,s);case 4:return pe(a,a.stateNode.containerInfo),u=a.pendingProps,n===null?a.child=lo(a,null,u,s):pi(n,a,u,s),a.child;case 11:return Nx(n,a,a.type,a.pendingProps,s);case 7:return pi(n,a,a.pendingProps,s),a.child;case 8:return pi(n,a,a.pendingProps.children,s),a.child;case 12:return pi(n,a,a.pendingProps.children,s),a.child;case 10:return u=a.pendingProps,fs(a,a.type,u.value),pi(n,a,u.children,s),a.child;case 9:return h=a.type._context,u=a.pendingProps.children,ao(a),h=di(h),u=u(h),a.flags|=1,pi(n,a,u,s),a.child;case 14:return Ox(n,a,a.type,a.pendingProps,s);case 15:return Px(n,a,a.type,a.pendingProps,s);case 19:return Xx(n,a,s);case 31:return Sb(n,a,s);case 22:return Fx(n,a,s,a.pendingProps);case 24:return ao(a),u=di(kn),n===null?(h=pp(),h===null&&(h=gn,m=hp(),h.pooledCache=m,m.refCount++,m!==null&&(h.pooledCacheLanes|=s),h=m),a.memoizedState={parent:u,cache:h},_p(a),fs(a,kn,h)):((n.lanes&s)!==0&&(gp(n,a),wu(a,null,null,s),Cu()),h=n.memoizedState,m=a.memoizedState,h.parent!==u?(h={parent:u,cache:u},a.memoizedState=h,a.lanes===0&&(a.memoizedState=a.updateQueue.baseState=h),fs(a,kn,u)):(u=m.cache,fs(a,kn,u),u!==h.cache&&fp(a,[kn],s,!0))),pi(n,a,a.pendingProps.children,s),a.child;case 29:throw a.pendingProps}throw Error(i(156,a.tag))}function Ur(n){n.flags|=4}function Jp(n,a,s,u,h){if((a=(n.mode&32)!==0)&&(a=!1),a){if(n.flags|=16777216,(h&335544128)===h)if(n.stateNode.complete)n.flags|=8192;else if(vS())n.flags|=8192;else throw oo=vf,mp}else n.flags&=-16777217}function Yx(n,a){if(a.type!=="stylesheet"||(a.state.loading&4)!==0)n.flags&=-16777217;else if(n.flags|=16777216,!oy(a))if(vS())n.flags|=8192;else throw oo=vf,mp}function Pf(n,a){a!==null&&(n.flags|=4),n.flags&16384&&(a=n.tag!==22?be():536870912,n.lanes|=a,dl|=a)}function Pu(n,a){if(!Vt)switch(n.tailMode){case"hidden":a=n.tail;for(var s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n.tail=null:s.sibling=null;break;case"collapsed":s=n.tail;for(var u=null;s!==null;)s.alternate!==null&&(u=s),s=s.sibling;u===null?a||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function An(n){var a=n.alternate!==null&&n.alternate.child===n.child,s=0,u=0;if(a)for(var h=n.child;h!==null;)s|=h.lanes|h.childLanes,u|=h.subtreeFlags&65011712,u|=h.flags&65011712,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)s|=h.lanes|h.childLanes,u|=h.subtreeFlags,u|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=u,n.childLanes=s,a}function Mb(n,a,s){var u=a.pendingProps;switch(sp(a),a.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return An(a),null;case 1:return An(a),null;case 3:return s=a.stateNode,u=null,n!==null&&(u=n.memoizedState.cache),a.memoizedState.cache!==u&&(a.flags|=2048),Cr(kn),Ce(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(n===null||n.child===null)&&(el(a)?Ur(a):n===null||n.memoizedState.isDehydrated&&(a.flags&256)===0||(a.flags|=1024,lp())),An(a),null;case 26:var h=a.type,m=a.memoizedState;return n===null?(Ur(a),m!==null?(An(a),Yx(a,m)):(An(a),Jp(a,h,null,u,s))):m?m!==n.memoizedState?(Ur(a),An(a),Yx(a,m)):(An(a),a.flags&=-16777217):(n=n.memoizedProps,n!==u&&Ur(a),An(a),Jp(a,h,n,u,s)),null;case 27:if(Ie(a),s=Be.current,h=a.type,n!==null&&a.stateNode!=null)n.memoizedProps!==u&&Ur(a);else{if(!u){if(a.stateNode===null)throw Error(i(166));return An(a),null}n=Ae.current,el(a)?bv(a):(n=$S(h,u,s),a.stateNode=n,Ur(a))}return An(a),null;case 5:if(Ie(a),h=a.type,n!==null&&a.stateNode!=null)n.memoizedProps!==u&&Ur(a);else{if(!u){if(a.stateNode===null)throw Error(i(166));return An(a),null}if(m=Ae.current,el(a))bv(a);else{var T=jf(Be.current);switch(m){case 1:m=T.createElementNS("http://www.w3.org/2000/svg",h);break;case 2:m=T.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;default:switch(h){case"svg":m=T.createElementNS("http://www.w3.org/2000/svg",h);break;case"math":m=T.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;case"script":m=T.createElement("div"),m.innerHTML="<script><\/script>",m=m.removeChild(m.firstChild);break;case"select":m=typeof u.is=="string"?T.createElement("select",{is:u.is}):T.createElement("select"),u.multiple?m.multiple=!0:u.size&&(m.size=u.size);break;default:m=typeof u.is=="string"?T.createElement(h,{is:u.is}):T.createElement(h)}}m[St]=a,m[Mt]=u;e:for(T=a.child;T!==null;){if(T.tag===5||T.tag===6)m.appendChild(T.stateNode);else if(T.tag!==4&&T.tag!==27&&T.child!==null){T.child.return=T,T=T.child;continue}if(T===a)break e;for(;T.sibling===null;){if(T.return===null||T.return===a)break e;T=T.return}T.sibling.return=T.return,T=T.sibling}a.stateNode=m;e:switch(mi(m,h,u),h){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}u&&Ur(a)}}return An(a),Jp(a,a.type,n===null?null:n.memoizedProps,a.pendingProps,s),null;case 6:if(n&&a.stateNode!=null)n.memoizedProps!==u&&Ur(a);else{if(typeof u!="string"&&a.stateNode===null)throw Error(i(166));if(n=Be.current,el(a)){if(n=a.stateNode,s=a.memoizedProps,u=null,h=hi,h!==null)switch(h.tag){case 27:case 5:u=h.memoizedProps}n[St]=a,n=!!(n.nodeValue===s||u!==null&&u.suppressHydrationWarning===!0||VS(n.nodeValue,s)),n||cs(a,!0)}else n=jf(n).createTextNode(u),n[St]=a,a.stateNode=n}return An(a),null;case 31:if(s=a.memoizedState,n===null||n.memoizedState!==null){if(u=el(a),s!==null){if(n===null){if(!u)throw Error(i(318));if(n=a.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(i(557));n[St]=a}else no(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;An(a),n=!1}else s=lp(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=s),n=!0;if(!n)return a.flags&256?(ra(a),a):(ra(a),null);if((a.flags&128)!==0)throw Error(i(558))}return An(a),null;case 13:if(u=a.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(h=el(a),u!==null&&u.dehydrated!==null){if(n===null){if(!h)throw Error(i(318));if(h=a.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(i(317));h[St]=a}else no(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;An(a),h=!1}else h=lp(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=h),h=!0;if(!h)return a.flags&256?(ra(a),a):(ra(a),null)}return ra(a),(a.flags&128)!==0?(a.lanes=s,a):(s=u!==null,n=n!==null&&n.memoizedState!==null,s&&(u=a.child,h=null,u.alternate!==null&&u.alternate.memoizedState!==null&&u.alternate.memoizedState.cachePool!==null&&(h=u.alternate.memoizedState.cachePool.pool),m=null,u.memoizedState!==null&&u.memoizedState.cachePool!==null&&(m=u.memoizedState.cachePool.pool),m!==h&&(u.flags|=2048)),s!==n&&s&&(a.child.flags|=8192),Pf(a,a.updateQueue),An(a),null);case 4:return Ce(),n===null&&Sm(a.stateNode.containerInfo),An(a),null;case 10:return Cr(a.type),An(a),null;case 19:if(ne(zn),u=a.memoizedState,u===null)return An(a),null;if(h=(a.flags&128)!==0,m=u.rendering,m===null)if(h)Pu(u,!1);else{if(Pn!==0||n!==null&&(n.flags&128)!==0)for(n=a.child;n!==null;){if(m=Mf(n),m!==null){for(a.flags|=128,Pu(u,!1),n=m.updateQueue,a.updateQueue=n,Pf(a,n),a.subtreeFlags=0,n=s,s=a.child;s!==null;)Sv(s,n),s=s.sibling;return _e(zn,zn.current&1|2),Vt&&Ar(a,u.treeForkCount),a.child}n=n.sibling}u.tail!==null&&Ot()>Hf&&(a.flags|=128,h=!0,Pu(u,!1),a.lanes=4194304)}else{if(!h)if(n=Mf(m),n!==null){if(a.flags|=128,h=!0,n=n.updateQueue,a.updateQueue=n,Pf(a,n),Pu(u,!0),u.tail===null&&u.tailMode==="hidden"&&!m.alternate&&!Vt)return An(a),null}else 2*Ot()-u.renderingStartTime>Hf&&s!==536870912&&(a.flags|=128,h=!0,Pu(u,!1),a.lanes=4194304);u.isBackwards?(m.sibling=a.child,a.child=m):(n=u.last,n!==null?n.sibling=m:a.child=m,u.last=m)}return u.tail!==null?(n=u.tail,u.rendering=n,u.tail=n.sibling,u.renderingStartTime=Ot(),n.sibling=null,s=zn.current,_e(zn,h?s&1|2:s&1),Vt&&Ar(a,u.treeForkCount),n):(An(a),null);case 22:case 23:return ra(a),yp(),u=a.memoizedState!==null,n!==null?n.memoizedState!==null!==u&&(a.flags|=8192):u&&(a.flags|=8192),u?(s&536870912)!==0&&(a.flags&128)===0&&(An(a),a.subtreeFlags&6&&(a.flags|=8192)):An(a),s=a.updateQueue,s!==null&&Pf(a,s.retryQueue),s=null,n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),u=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(u=a.memoizedState.cachePool.pool),u!==s&&(a.flags|=2048),n!==null&&ne(ro),null;case 24:return s=null,n!==null&&(s=n.memoizedState.cache),a.memoizedState.cache!==s&&(a.flags|=2048),Cr(kn),An(a),null;case 25:return null;case 30:return null}throw Error(i(156,a.tag))}function Eb(n,a){switch(sp(a),a.tag){case 1:return n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 3:return Cr(kn),Ce(),n=a.flags,(n&65536)!==0&&(n&128)===0?(a.flags=n&-65537|128,a):null;case 26:case 27:case 5:return Ie(a),null;case 31:if(a.memoizedState!==null){if(ra(a),a.alternate===null)throw Error(i(340));no()}return n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 13:if(ra(a),n=a.memoizedState,n!==null&&n.dehydrated!==null){if(a.alternate===null)throw Error(i(340));no()}return n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 19:return ne(zn),null;case 4:return Ce(),null;case 10:return Cr(a.type),null;case 22:case 23:return ra(a),yp(),n!==null&&ne(ro),n=a.flags,n&65536?(a.flags=n&-65537|128,a):null;case 24:return Cr(kn),null;case 25:return null;default:return null}}function qx(n,a){switch(sp(a),a.tag){case 3:Cr(kn),Ce();break;case 26:case 27:case 5:Ie(a);break;case 4:Ce();break;case 31:a.memoizedState!==null&&ra(a);break;case 13:ra(a);break;case 19:ne(zn);break;case 10:Cr(a.type);break;case 22:case 23:ra(a),yp(),n!==null&&ne(ro);break;case 24:Cr(kn)}}function Fu(n,a){try{var s=a.updateQueue,u=s!==null?s.lastEffect:null;if(u!==null){var h=u.next;s=h;do{if((s.tag&n)===n){u=void 0;var m=s.create,T=s.inst;u=m(),T.destroy=u}s=s.next}while(s!==h)}}catch(O){rn(a,a.return,O)}}function gs(n,a,s){try{var u=a.updateQueue,h=u!==null?u.lastEffect:null;if(h!==null){var m=h.next;u=m;do{if((u.tag&n)===n){var T=u.inst,O=T.destroy;if(O!==void 0){T.destroy=void 0,h=a;var W=s,fe=O;try{fe()}catch(ye){rn(h,W,ye)}}}u=u.next}while(u!==m)}}catch(ye){rn(a,a.return,ye)}}function Zx(n){var a=n.updateQueue;if(a!==null){var s=n.stateNode;try{zv(a,s)}catch(u){rn(n,n.return,u)}}}function Kx(n,a,s){s.props=co(n.type,n.memoizedProps),s.state=n.memoizedState;try{s.componentWillUnmount()}catch(u){rn(n,a,u)}}function Iu(n,a){try{var s=n.ref;if(s!==null){switch(n.tag){case 26:case 27:case 5:var u=n.stateNode;break;case 30:u=n.stateNode;break;default:u=n.stateNode}typeof s=="function"?n.refCleanup=s(u):s.current=u}}catch(h){rn(n,a,h)}}function rr(n,a){var s=n.ref,u=n.refCleanup;if(s!==null)if(typeof u=="function")try{u()}catch(h){rn(n,a,h)}finally{n.refCleanup=null,n=n.alternate,n!=null&&(n.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(h){rn(n,a,h)}else s.current=null}function jx(n){var a=n.type,s=n.memoizedProps,u=n.stateNode;try{e:switch(a){case"button":case"input":case"select":case"textarea":s.autoFocus&&u.focus();break e;case"img":s.src?u.src=s.src:s.srcSet&&(u.srcset=s.srcSet)}}catch(h){rn(n,n.return,h)}}function $p(n,a,s){try{var u=n.stateNode;Wb(u,n.type,s,a),u[Mt]=a}catch(h){rn(n,n.return,h)}}function Qx(n){return n.tag===5||n.tag===3||n.tag===26||n.tag===27&&Ts(n.type)||n.tag===4}function em(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Qx(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.tag===27&&Ts(n.type)||n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function tm(n,a,s){var u=n.tag;if(u===5||u===6)n=n.stateNode,a?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(n,a):(a=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,a.appendChild(n),s=s._reactRootContainer,s!=null||a.onclick!==null||(a.onclick=ba));else if(u!==4&&(u===27&&Ts(n.type)&&(s=n.stateNode,a=null),n=n.child,n!==null))for(tm(n,a,s),n=n.sibling;n!==null;)tm(n,a,s),n=n.sibling}function Ff(n,a,s){var u=n.tag;if(u===5||u===6)n=n.stateNode,a?s.insertBefore(n,a):s.appendChild(n);else if(u!==4&&(u===27&&Ts(n.type)&&(s=n.stateNode),n=n.child,n!==null))for(Ff(n,a,s),n=n.sibling;n!==null;)Ff(n,a,s),n=n.sibling}function Jx(n){var a=n.stateNode,s=n.memoizedProps;try{for(var u=n.type,h=a.attributes;h.length;)a.removeAttributeNode(h[0]);mi(a,u,s),a[St]=n,a[Mt]=s}catch(m){rn(n,n.return,m)}}var Nr=!1,Yn=!1,nm=!1,$x=typeof WeakSet=="function"?WeakSet:Set,si=null;function Tb(n,a){if(n=n.containerInfo,Em=ih,n=fv(n),Kd(n)){if("selectionStart"in n)var s={start:n.selectionStart,end:n.selectionEnd};else e:{s=(s=n.ownerDocument)&&s.defaultView||window;var u=s.getSelection&&s.getSelection();if(u&&u.rangeCount!==0){s=u.anchorNode;var h=u.anchorOffset,m=u.focusNode;u=u.focusOffset;try{s.nodeType,m.nodeType}catch{s=null;break e}var T=0,O=-1,W=-1,fe=0,ye=0,Te=n,he=null;t:for(;;){for(var ve;Te!==s||h!==0&&Te.nodeType!==3||(O=T+h),Te!==m||u!==0&&Te.nodeType!==3||(W=T+u),Te.nodeType===3&&(T+=Te.nodeValue.length),(ve=Te.firstChild)!==null;)he=Te,Te=ve;for(;;){if(Te===n)break t;if(he===s&&++fe===h&&(O=T),he===m&&++ye===u&&(W=T),(ve=Te.nextSibling)!==null)break;Te=he,he=Te.parentNode}Te=ve}s=O===-1||W===-1?null:{start:O,end:W}}else s=null}s=s||{start:0,end:0}}else s=null;for(Tm={focusedElem:n,selectionRange:s},ih=!1,si=a;si!==null;)if(a=si,n=a.child,(a.subtreeFlags&1028)!==0&&n!==null)n.return=a,si=n;else for(;si!==null;){switch(a=si,m=a.alternate,n=a.flags,a.tag){case 0:if((n&4)!==0&&(n=a.updateQueue,n=n!==null?n.events:null,n!==null))for(s=0;s<n.length;s++)h=n[s],h.ref.impl=h.nextImpl;break;case 11:case 15:break;case 1:if((n&1024)!==0&&m!==null){n=void 0,s=a,h=m.memoizedProps,m=m.memoizedState,u=s.stateNode;try{var $e=co(s.type,h);n=u.getSnapshotBeforeUpdate($e,m),u.__reactInternalSnapshotBeforeUpdate=n}catch(ft){rn(s,s.return,ft)}}break;case 3:if((n&1024)!==0){if(n=a.stateNode.containerInfo,s=n.nodeType,s===9)Rm(n);else if(s===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Rm(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((n&1024)!==0)throw Error(i(163))}if(n=a.sibling,n!==null){n.return=a.return,si=n;break}si=a.return}}function eS(n,a,s){var u=s.flags;switch(s.tag){case 0:case 11:case 15:Pr(n,s),u&4&&Fu(5,s);break;case 1:if(Pr(n,s),u&4)if(n=s.stateNode,a===null)try{n.componentDidMount()}catch(T){rn(s,s.return,T)}else{var h=co(s.type,a.memoizedProps);a=a.memoizedState;try{n.componentDidUpdate(h,a,n.__reactInternalSnapshotBeforeUpdate)}catch(T){rn(s,s.return,T)}}u&64&&Zx(s),u&512&&Iu(s,s.return);break;case 3:if(Pr(n,s),u&64&&(n=s.updateQueue,n!==null)){if(a=null,s.child!==null)switch(s.child.tag){case 27:case 5:a=s.child.stateNode;break;case 1:a=s.child.stateNode}try{zv(n,a)}catch(T){rn(s,s.return,T)}}break;case 27:a===null&&u&4&&Jx(s);case 26:case 5:Pr(n,s),a===null&&u&4&&jx(s),u&512&&Iu(s,s.return);break;case 12:Pr(n,s);break;case 31:Pr(n,s),u&4&&iS(n,s);break;case 13:Pr(n,s),u&4&&aS(n,s),u&64&&(n=s.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&(s=Nb.bind(null,s),$b(n,s))));break;case 22:if(u=s.memoizedState!==null||Nr,!u){a=a!==null&&a.memoizedState!==null||Yn,h=Nr;var m=Yn;Nr=u,(Yn=a)&&!m?Fr(n,s,(s.subtreeFlags&8772)!==0):Pr(n,s),Nr=h,Yn=m}break;case 30:break;default:Pr(n,s)}}function tS(n){var a=n.alternate;a!==null&&(n.alternate=null,tS(a)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(a=n.stateNode,a!==null&&yn(a)),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}var wn=null,Gi=!1;function Or(n,a,s){for(s=s.child;s!==null;)nS(n,a,s),s=s.sibling}function nS(n,a,s){if(ge&&typeof ge.onCommitFiberUnmount=="function")try{ge.onCommitFiberUnmount(xe,s)}catch{}switch(s.tag){case 26:Yn||rr(s,a),Or(n,a,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Yn||rr(s,a);var u=wn,h=Gi;Ts(s.type)&&(wn=s.stateNode,Gi=!1),Or(n,a,s),Yu(s.stateNode),wn=u,Gi=h;break;case 5:Yn||rr(s,a);case 6:if(u=wn,h=Gi,wn=null,Or(n,a,s),wn=u,Gi=h,wn!==null)if(Gi)try{(wn.nodeType===9?wn.body:wn.nodeName==="HTML"?wn.ownerDocument.body:wn).removeChild(s.stateNode)}catch(m){rn(s,a,m)}else try{wn.removeChild(s.stateNode)}catch(m){rn(s,a,m)}break;case 18:wn!==null&&(Gi?(n=wn,ZS(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,s.stateNode),yl(n)):ZS(wn,s.stateNode));break;case 4:u=wn,h=Gi,wn=s.stateNode.containerInfo,Gi=!0,Or(n,a,s),wn=u,Gi=h;break;case 0:case 11:case 14:case 15:gs(2,s,a),Yn||gs(4,s,a),Or(n,a,s);break;case 1:Yn||(rr(s,a),u=s.stateNode,typeof u.componentWillUnmount=="function"&&Kx(s,a,u)),Or(n,a,s);break;case 21:Or(n,a,s);break;case 22:Yn=(u=Yn)||s.memoizedState!==null,Or(n,a,s),Yn=u;break;default:Or(n,a,s)}}function iS(n,a){if(a.memoizedState===null&&(n=a.alternate,n!==null&&(n=n.memoizedState,n!==null))){n=n.dehydrated;try{yl(n)}catch(s){rn(a,a.return,s)}}}function aS(n,a){if(a.memoizedState===null&&(n=a.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null))))try{yl(n)}catch(s){rn(a,a.return,s)}}function bb(n){switch(n.tag){case 31:case 13:case 19:var a=n.stateNode;return a===null&&(a=n.stateNode=new $x),a;case 22:return n=n.stateNode,a=n._retryCache,a===null&&(a=n._retryCache=new $x),a;default:throw Error(i(435,n.tag))}}function If(n,a){var s=bb(n);a.forEach(function(u){if(!s.has(u)){s.add(u);var h=Ob.bind(null,n,u);u.then(h,h)}})}function Vi(n,a){var s=a.deletions;if(s!==null)for(var u=0;u<s.length;u++){var h=s[u],m=n,T=a,O=T;e:for(;O!==null;){switch(O.tag){case 27:if(Ts(O.type)){wn=O.stateNode,Gi=!1;break e}break;case 5:wn=O.stateNode,Gi=!1;break e;case 3:case 4:wn=O.stateNode.containerInfo,Gi=!0;break e}O=O.return}if(wn===null)throw Error(i(160));nS(m,T,h),wn=null,Gi=!1,m=h.alternate,m!==null&&(m.return=null),h.return=null}if(a.subtreeFlags&13886)for(a=a.child;a!==null;)rS(a,n),a=a.sibling}var Wa=null;function rS(n,a){var s=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:Vi(a,n),ki(n),u&4&&(gs(3,n,n.return),Fu(3,n),gs(5,n,n.return));break;case 1:Vi(a,n),ki(n),u&512&&(Yn||s===null||rr(s,s.return)),u&64&&Nr&&(n=n.updateQueue,n!==null&&(u=n.callbacks,u!==null&&(s=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=s===null?u:s.concat(u))));break;case 26:var h=Wa;if(Vi(a,n),ki(n),u&512&&(Yn||s===null||rr(s,s.return)),u&4){var m=s!==null?s.memoizedState:null;if(u=n.memoizedState,s===null)if(u===null)if(n.stateNode===null){e:{u=n.type,s=n.memoizedProps,h=h.ownerDocument||h;t:switch(u){case"title":m=h.getElementsByTagName("title")[0],(!m||m[Sn]||m[St]||m.namespaceURI==="http://www.w3.org/2000/svg"||m.hasAttribute("itemprop"))&&(m=h.createElement(u),h.head.insertBefore(m,h.querySelector("head > title"))),mi(m,u,s),m[St]=n,Ct(m),u=m;break e;case"link":var T=ry("link","href",h).get(u+(s.href||""));if(T){for(var O=0;O<T.length;O++)if(m=T[O],m.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&m.getAttribute("rel")===(s.rel==null?null:s.rel)&&m.getAttribute("title")===(s.title==null?null:s.title)&&m.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){T.splice(O,1);break t}}m=h.createElement(u),mi(m,u,s),h.head.appendChild(m);break;case"meta":if(T=ry("meta","content",h).get(u+(s.content||""))){for(O=0;O<T.length;O++)if(m=T[O],m.getAttribute("content")===(s.content==null?null:""+s.content)&&m.getAttribute("name")===(s.name==null?null:s.name)&&m.getAttribute("property")===(s.property==null?null:s.property)&&m.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&m.getAttribute("charset")===(s.charSet==null?null:s.charSet)){T.splice(O,1);break t}}m=h.createElement(u),mi(m,u,s),h.head.appendChild(m);break;default:throw Error(i(468,u))}m[St]=n,Ct(m),u=m}n.stateNode=u}else sy(h,n.type,n.stateNode);else n.stateNode=ay(h,u,n.memoizedProps);else m!==u?(m===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):m.count--,u===null?sy(h,n.type,n.stateNode):ay(h,u,n.memoizedProps)):u===null&&n.stateNode!==null&&$p(n,n.memoizedProps,s.memoizedProps)}break;case 27:Vi(a,n),ki(n),u&512&&(Yn||s===null||rr(s,s.return)),s!==null&&u&4&&$p(n,n.memoizedProps,s.memoizedProps);break;case 5:if(Vi(a,n),ki(n),u&512&&(Yn||s===null||rr(s,s.return)),n.flags&32){h=n.stateNode;try{Di(h,"")}catch($e){rn(n,n.return,$e)}}u&4&&n.stateNode!=null&&(h=n.memoizedProps,$p(n,h,s!==null?s.memoizedProps:h)),u&1024&&(nm=!0);break;case 6:if(Vi(a,n),ki(n),u&4){if(n.stateNode===null)throw Error(i(162));u=n.memoizedProps,s=n.stateNode;try{s.nodeValue=u}catch($e){rn(n,n.return,$e)}}break;case 3:if($f=null,h=Wa,Wa=Qf(a.containerInfo),Vi(a,n),Wa=h,ki(n),u&4&&s!==null&&s.memoizedState.isDehydrated)try{yl(a.containerInfo)}catch($e){rn(n,n.return,$e)}nm&&(nm=!1,sS(n));break;case 4:u=Wa,Wa=Qf(n.stateNode.containerInfo),Vi(a,n),ki(n),Wa=u;break;case 12:Vi(a,n),ki(n);break;case 31:Vi(a,n),ki(n),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,If(n,u)));break;case 13:Vi(a,n),ki(n),n.child.flags&8192&&n.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Bf=Ot()),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,If(n,u)));break;case 22:h=n.memoizedState!==null;var W=s!==null&&s.memoizedState!==null,fe=Nr,ye=Yn;if(Nr=fe||h,Yn=ye||W,Vi(a,n),Yn=ye,Nr=fe,ki(n),u&8192)e:for(a=n.stateNode,a._visibility=h?a._visibility&-2:a._visibility|1,h&&(s===null||W||Nr||Yn||fo(n)),s=null,a=n;;){if(a.tag===5||a.tag===26){if(s===null){W=s=a;try{if(m=W.stateNode,h)T=m.style,typeof T.setProperty=="function"?T.setProperty("display","none","important"):T.display="none";else{O=W.stateNode;var Te=W.memoizedProps.style,he=Te!=null&&Te.hasOwnProperty("display")?Te.display:null;O.style.display=he==null||typeof he=="boolean"?"":(""+he).trim()}}catch($e){rn(W,W.return,$e)}}}else if(a.tag===6){if(s===null){W=a;try{W.stateNode.nodeValue=h?"":W.memoizedProps}catch($e){rn(W,W.return,$e)}}}else if(a.tag===18){if(s===null){W=a;try{var ve=W.stateNode;h?KS(ve,!0):KS(W.stateNode,!1)}catch($e){rn(W,W.return,$e)}}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===n)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break e;for(;a.sibling===null;){if(a.return===null||a.return===n)break e;s===a&&(s=null),a=a.return}s===a&&(s=null),a.sibling.return=a.return,a=a.sibling}u&4&&(u=n.updateQueue,u!==null&&(s=u.retryQueue,s!==null&&(u.retryQueue=null,If(n,s))));break;case 19:Vi(a,n),ki(n),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,If(n,u)));break;case 30:break;case 21:break;default:Vi(a,n),ki(n)}}function ki(n){var a=n.flags;if(a&2){try{for(var s,u=n.return;u!==null;){if(Qx(u)){s=u;break}u=u.return}if(s==null)throw Error(i(160));switch(s.tag){case 27:var h=s.stateNode,m=em(n);Ff(n,m,h);break;case 5:var T=s.stateNode;s.flags&32&&(Di(T,""),s.flags&=-33);var O=em(n);Ff(n,O,T);break;case 3:case 4:var W=s.stateNode.containerInfo,fe=em(n);tm(n,fe,W);break;default:throw Error(i(161))}}catch(ye){rn(n,n.return,ye)}n.flags&=-3}a&4096&&(n.flags&=-4097)}function sS(n){if(n.subtreeFlags&1024)for(n=n.child;n!==null;){var a=n;sS(a),a.tag===5&&a.flags&1024&&a.stateNode.reset(),n=n.sibling}}function Pr(n,a){if(a.subtreeFlags&8772)for(a=a.child;a!==null;)eS(n,a.alternate,a),a=a.sibling}function fo(n){for(n=n.child;n!==null;){var a=n;switch(a.tag){case 0:case 11:case 14:case 15:gs(4,a,a.return),fo(a);break;case 1:rr(a,a.return);var s=a.stateNode;typeof s.componentWillUnmount=="function"&&Kx(a,a.return,s),fo(a);break;case 27:Yu(a.stateNode);case 26:case 5:rr(a,a.return),fo(a);break;case 22:a.memoizedState===null&&fo(a);break;case 30:fo(a);break;default:fo(a)}n=n.sibling}}function Fr(n,a,s){for(s=s&&(a.subtreeFlags&8772)!==0,a=a.child;a!==null;){var u=a.alternate,h=n,m=a,T=m.flags;switch(m.tag){case 0:case 11:case 15:Fr(h,m,s),Fu(4,m);break;case 1:if(Fr(h,m,s),u=m,h=u.stateNode,typeof h.componentDidMount=="function")try{h.componentDidMount()}catch(fe){rn(u,u.return,fe)}if(u=m,h=u.updateQueue,h!==null){var O=u.stateNode;try{var W=h.shared.hiddenCallbacks;if(W!==null)for(h.shared.hiddenCallbacks=null,h=0;h<W.length;h++)Iv(W[h],O)}catch(fe){rn(u,u.return,fe)}}s&&T&64&&Zx(m),Iu(m,m.return);break;case 27:Jx(m);case 26:case 5:Fr(h,m,s),s&&u===null&&T&4&&jx(m),Iu(m,m.return);break;case 12:Fr(h,m,s);break;case 31:Fr(h,m,s),s&&T&4&&iS(h,m);break;case 13:Fr(h,m,s),s&&T&4&&aS(h,m);break;case 22:m.memoizedState===null&&Fr(h,m,s),Iu(m,m.return);break;case 30:break;default:Fr(h,m,s)}a=a.sibling}}function im(n,a){var s=null;n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),n=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(n=a.memoizedState.cachePool.pool),n!==s&&(n!=null&&n.refCount++,s!=null&&Eu(s))}function am(n,a){n=null,a.alternate!==null&&(n=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==n&&(a.refCount++,n!=null&&Eu(n))}function Ya(n,a,s,u){if(a.subtreeFlags&10256)for(a=a.child;a!==null;)oS(n,a,s,u),a=a.sibling}function oS(n,a,s,u){var h=a.flags;switch(a.tag){case 0:case 11:case 15:Ya(n,a,s,u),h&2048&&Fu(9,a);break;case 1:Ya(n,a,s,u);break;case 3:Ya(n,a,s,u),h&2048&&(n=null,a.alternate!==null&&(n=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==n&&(a.refCount++,n!=null&&Eu(n)));break;case 12:if(h&2048){Ya(n,a,s,u),n=a.stateNode;try{var m=a.memoizedProps,T=m.id,O=m.onPostCommit;typeof O=="function"&&O(T,a.alternate===null?"mount":"update",n.passiveEffectDuration,-0)}catch(W){rn(a,a.return,W)}}else Ya(n,a,s,u);break;case 31:Ya(n,a,s,u);break;case 13:Ya(n,a,s,u);break;case 23:break;case 22:m=a.stateNode,T=a.alternate,a.memoizedState!==null?m._visibility&2?Ya(n,a,s,u):zu(n,a):m._visibility&2?Ya(n,a,s,u):(m._visibility|=2,cl(n,a,s,u,(a.subtreeFlags&10256)!==0||!1)),h&2048&&im(T,a);break;case 24:Ya(n,a,s,u),h&2048&&am(a.alternate,a);break;default:Ya(n,a,s,u)}}function cl(n,a,s,u,h){for(h=h&&((a.subtreeFlags&10256)!==0||!1),a=a.child;a!==null;){var m=n,T=a,O=s,W=u,fe=T.flags;switch(T.tag){case 0:case 11:case 15:cl(m,T,O,W,h),Fu(8,T);break;case 23:break;case 22:var ye=T.stateNode;T.memoizedState!==null?ye._visibility&2?cl(m,T,O,W,h):zu(m,T):(ye._visibility|=2,cl(m,T,O,W,h)),h&&fe&2048&&im(T.alternate,T);break;case 24:cl(m,T,O,W,h),h&&fe&2048&&am(T.alternate,T);break;default:cl(m,T,O,W,h)}a=a.sibling}}function zu(n,a){if(a.subtreeFlags&10256)for(a=a.child;a!==null;){var s=n,u=a,h=u.flags;switch(u.tag){case 22:zu(s,u),h&2048&&im(u.alternate,u);break;case 24:zu(s,u),h&2048&&am(u.alternate,u);break;default:zu(s,u)}a=a.sibling}}var Bu=8192;function fl(n,a,s){if(n.subtreeFlags&Bu)for(n=n.child;n!==null;)lS(n,a,s),n=n.sibling}function lS(n,a,s){switch(n.tag){case 26:fl(n,a,s),n.flags&Bu&&n.memoizedState!==null&&fA(s,Wa,n.memoizedState,n.memoizedProps);break;case 5:fl(n,a,s);break;case 3:case 4:var u=Wa;Wa=Qf(n.stateNode.containerInfo),fl(n,a,s),Wa=u;break;case 22:n.memoizedState===null&&(u=n.alternate,u!==null&&u.memoizedState!==null?(u=Bu,Bu=16777216,fl(n,a,s),Bu=u):fl(n,a,s));break;default:fl(n,a,s)}}function uS(n){var a=n.alternate;if(a!==null&&(n=a.child,n!==null)){a.child=null;do a=n.sibling,n.sibling=null,n=a;while(n!==null)}}function Hu(n){var a=n.deletions;if((n.flags&16)!==0){if(a!==null)for(var s=0;s<a.length;s++){var u=a[s];si=u,fS(u,n)}uS(n)}if(n.subtreeFlags&10256)for(n=n.child;n!==null;)cS(n),n=n.sibling}function cS(n){switch(n.tag){case 0:case 11:case 15:Hu(n),n.flags&2048&&gs(9,n,n.return);break;case 3:Hu(n);break;case 12:Hu(n);break;case 22:var a=n.stateNode;n.memoizedState!==null&&a._visibility&2&&(n.return===null||n.return.tag!==13)?(a._visibility&=-3,zf(n)):Hu(n);break;default:Hu(n)}}function zf(n){var a=n.deletions;if((n.flags&16)!==0){if(a!==null)for(var s=0;s<a.length;s++){var u=a[s];si=u,fS(u,n)}uS(n)}for(n=n.child;n!==null;){switch(a=n,a.tag){case 0:case 11:case 15:gs(8,a,a.return),zf(a);break;case 22:s=a.stateNode,s._visibility&2&&(s._visibility&=-3,zf(a));break;default:zf(a)}n=n.sibling}}function fS(n,a){for(;si!==null;){var s=si;switch(s.tag){case 0:case 11:case 15:gs(8,s,a);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var u=s.memoizedState.cachePool.pool;u!=null&&u.refCount++}break;case 24:Eu(s.memoizedState.cache)}if(u=s.child,u!==null)u.return=s,si=u;else e:for(s=n;si!==null;){u=si;var h=u.sibling,m=u.return;if(tS(u),u===s){si=null;break e}if(h!==null){h.return=m,si=h;break e}si=m}}}var Ab={getCacheForType:function(n){var a=di(kn),s=a.data.get(n);return s===void 0&&(s=n(),a.data.set(n,s)),s},cacheSignal:function(){return di(kn).controller.signal}},Rb=typeof WeakMap=="function"?WeakMap:Map,$t=0,gn=null,It=null,Ht=0,an=0,sa=null,vs=!1,hl=!1,rm=!1,Ir=0,Pn=0,xs=0,ho=0,sm=0,oa=0,dl=0,Gu=null,Xi=null,om=!1,Bf=0,hS=0,Hf=1/0,Gf=null,Ss=null,$n=0,ys=null,pl=null,zr=0,lm=0,um=null,dS=null,Vu=0,cm=null;function la(){return($t&2)!==0&&Ht!==0?Ht&-Ht:H.T!==null?_m():At()}function pS(){if(oa===0)if((Ht&536870912)===0||Vt){var n=rt;rt<<=1,(rt&3932160)===0&&(rt=262144),oa=n}else oa=536870912;return n=aa.current,n!==null&&(n.flags|=32),oa}function Wi(n,a,s){(n===gn&&(an===2||an===9)||n.cancelPendingCommit!==null)&&(ml(n,0),Ms(n,Ht,oa,!1)),Ee(n,s),(($t&2)===0||n!==gn)&&(n===gn&&(($t&2)===0&&(ho|=s),Pn===4&&Ms(n,Ht,oa,!1)),sr(n))}function mS(n,a,s){if(($t&6)!==0)throw Error(i(327));var u=!s&&(a&127)===0&&(a&n.expiredLanes)===0||Fe(n,a),h=u?Db(n,a):hm(n,a,!0),m=u;do{if(h===0){hl&&!u&&Ms(n,a,0,!1);break}else{if(s=n.current.alternate,m&&!Cb(s)){h=hm(n,a,!1),m=!1;continue}if(h===2){if(m=a,n.errorRecoveryDisabledLanes&m)var T=0;else T=n.pendingLanes&-536870913,T=T!==0?T:T&536870912?536870912:0;if(T!==0){a=T;e:{var O=n;h=Gu;var W=O.current.memoizedState.isDehydrated;if(W&&(ml(O,T).flags|=256),T=hm(O,T,!1),T!==2){if(rm&&!W){O.errorRecoveryDisabledLanes|=m,ho|=m,h=4;break e}m=Xi,Xi=h,m!==null&&(Xi===null?Xi=m:Xi.push.apply(Xi,m))}h=T}if(m=!1,h!==2)continue}}if(h===1){ml(n,0),Ms(n,a,0,!0);break}e:{switch(u=n,m=h,m){case 0:case 1:throw Error(i(345));case 4:if((a&4194048)!==a)break;case 6:Ms(u,a,oa,!vs);break e;case 2:Xi=null;break;case 3:case 5:break;default:throw Error(i(329))}if((a&62914560)===a&&(h=Bf+300-Ot(),10<h)){if(Ms(u,a,oa,!vs),Se(u,0,!0)!==0)break e;zr=a,u.timeoutHandle=YS(_S.bind(null,u,s,Xi,Gf,om,a,oa,ho,dl,vs,m,"Throttled",-0,0),h);break e}_S(u,s,Xi,Gf,om,a,oa,ho,dl,vs,m,null,-0,0)}}break}while(!0);sr(n)}function _S(n,a,s,u,h,m,T,O,W,fe,ye,Te,he,ve){if(n.timeoutHandle=-1,Te=a.subtreeFlags,Te&8192||(Te&16785408)===16785408){Te={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ba},lS(a,m,Te);var $e=(m&62914560)===m?Bf-Ot():(m&4194048)===m?hS-Ot():0;if($e=hA(Te,$e),$e!==null){zr=m,n.cancelPendingCommit=$e(TS.bind(null,n,a,m,s,u,h,T,O,W,ye,Te,null,he,ve)),Ms(n,m,T,!fe);return}}TS(n,a,m,s,u,h,T,O,W)}function Cb(n){for(var a=n;;){var s=a.tag;if((s===0||s===11||s===15)&&a.flags&16384&&(s=a.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var u=0;u<s.length;u++){var h=s[u],m=h.getSnapshot;h=h.value;try{if(!na(m(),h))return!1}catch{return!1}}if(s=a.child,a.subtreeFlags&16384&&s!==null)s.return=a,a=s;else{if(a===n)break;for(;a.sibling===null;){if(a.return===null||a.return===n)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function Ms(n,a,s,u){a&=~sm,a&=~ho,n.suspendedLanes|=a,n.pingedLanes&=~a,u&&(n.warmLanes|=a),u=n.expirationTimes;for(var h=a;0<h;){var m=31-Xe(h),T=1<<m;u[m]=-1,h&=~T}s!==0&&Re(n,s,a)}function Vf(){return($t&6)===0?(ku(0),!1):!0}function fm(){if(It!==null){if(an===0)var n=It.return;else n=It,Rr=io=null,Rp(n),rl=null,bu=0,n=It;for(;n!==null;)qx(n.alternate,n),n=n.return;It=null}}function ml(n,a){var s=n.timeoutHandle;s!==-1&&(n.timeoutHandle=-1,Zb(s)),s=n.cancelPendingCommit,s!==null&&(n.cancelPendingCommit=null,s()),zr=0,fm(),gn=n,It=s=br(n.current,null),Ht=a,an=0,sa=null,vs=!1,hl=Fe(n,a),rm=!1,dl=oa=sm=ho=xs=Pn=0,Xi=Gu=null,om=!1,(a&8)!==0&&(a|=a&32);var u=n.entangledLanes;if(u!==0)for(n=n.entanglements,u&=a;0<u;){var h=31-Xe(u),m=1<<h;a|=n[h],u&=~m}return Ir=a,uf(),s}function gS(n,a){Tt=null,H.H=Nu,a===al||a===gf?(a=Nv(),an=3):a===mp?(a=Nv(),an=4):an=a===kp?8:a!==null&&typeof a=="object"&&typeof a.then=="function"?6:1,sa=a,It===null&&(Pn=1,Lf(n,Ra(a,n.current)))}function vS(){var n=aa.current;return n===null?!0:(Ht&4194048)===Ht?La===null:(Ht&62914560)===Ht||(Ht&536870912)!==0?n===La:!1}function xS(){var n=H.H;return H.H=Nu,n===null?Nu:n}function SS(){var n=H.A;return H.A=Ab,n}function kf(){Pn=4,vs||(Ht&4194048)!==Ht&&aa.current!==null||(hl=!0),(xs&134217727)===0&&(ho&134217727)===0||gn===null||Ms(gn,Ht,oa,!1)}function hm(n,a,s){var u=$t;$t|=2;var h=xS(),m=SS();(gn!==n||Ht!==a)&&(Gf=null,ml(n,a)),a=!1;var T=Pn;e:do try{if(an!==0&&It!==null){var O=It,W=sa;switch(an){case 8:fm(),T=6;break e;case 3:case 2:case 9:case 6:aa.current===null&&(a=!0);var fe=an;if(an=0,sa=null,_l(n,O,W,fe),s&&hl){T=0;break e}break;default:fe=an,an=0,sa=null,_l(n,O,W,fe)}}wb(),T=Pn;break}catch(ye){gS(n,ye)}while(!0);return a&&n.shellSuspendCounter++,Rr=io=null,$t=u,H.H=h,H.A=m,It===null&&(gn=null,Ht=0,uf()),T}function wb(){for(;It!==null;)yS(It)}function Db(n,a){var s=$t;$t|=2;var u=xS(),h=SS();gn!==n||Ht!==a?(Gf=null,Hf=Ot()+500,ml(n,a)):hl=Fe(n,a);e:do try{if(an!==0&&It!==null){a=It;var m=sa;t:switch(an){case 1:an=0,sa=null,_l(n,a,m,1);break;case 2:case 9:if(Lv(m)){an=0,sa=null,MS(a);break}a=function(){an!==2&&an!==9||gn!==n||(an=7),sr(n)},m.then(a,a);break e;case 3:an=7;break e;case 4:an=5;break e;case 7:Lv(m)?(an=0,sa=null,MS(a)):(an=0,sa=null,_l(n,a,m,7));break;case 5:var T=null;switch(It.tag){case 26:T=It.memoizedState;case 5:case 27:var O=It;if(T?oy(T):O.stateNode.complete){an=0,sa=null;var W=O.sibling;if(W!==null)It=W;else{var fe=O.return;fe!==null?(It=fe,Xf(fe)):It=null}break t}}an=0,sa=null,_l(n,a,m,5);break;case 6:an=0,sa=null,_l(n,a,m,6);break;case 8:fm(),Pn=6;break e;default:throw Error(i(462))}}Lb();break}catch(ye){gS(n,ye)}while(!0);return Rr=io=null,H.H=u,H.A=h,$t=s,It!==null?0:(gn=null,Ht=0,uf(),Pn)}function Lb(){for(;It!==null&&!Zt();)yS(It)}function yS(n){var a=Wx(n.alternate,n,Ir);n.memoizedProps=n.pendingProps,a===null?Xf(n):It=a}function MS(n){var a=n,s=a.alternate;switch(a.tag){case 15:case 0:a=Bx(s,a,a.pendingProps,a.type,void 0,Ht);break;case 11:a=Bx(s,a,a.pendingProps,a.type.render,a.ref,Ht);break;case 5:Rp(a);default:qx(s,a),a=It=Sv(a,Ir),a=Wx(s,a,Ir)}n.memoizedProps=n.pendingProps,a===null?Xf(n):It=a}function _l(n,a,s,u){Rr=io=null,Rp(a),rl=null,bu=0;var h=a.return;try{if(xb(n,h,a,s,Ht)){Pn=1,Lf(n,Ra(s,n.current)),It=null;return}}catch(m){if(h!==null)throw It=h,m;Pn=1,Lf(n,Ra(s,n.current)),It=null;return}a.flags&32768?(Vt||u===1?n=!0:hl||(Ht&536870912)!==0?n=!1:(vs=n=!0,(u===2||u===9||u===3||u===6)&&(u=aa.current,u!==null&&u.tag===13&&(u.flags|=16384))),ES(a,n)):Xf(a)}function Xf(n){var a=n;do{if((a.flags&32768)!==0){ES(a,vs);return}n=a.return;var s=Mb(a.alternate,a,Ir);if(s!==null){It=s;return}if(a=a.sibling,a!==null){It=a;return}It=a=n}while(a!==null);Pn===0&&(Pn=5)}function ES(n,a){do{var s=Eb(n.alternate,n);if(s!==null){s.flags&=32767,It=s;return}if(s=n.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!a&&(n=n.sibling,n!==null)){It=n;return}It=n=s}while(n!==null);Pn=6,It=null}function TS(n,a,s,u,h,m,T,O,W){n.cancelPendingCommit=null;do Wf();while($n!==0);if(($t&6)!==0)throw Error(i(327));if(a!==null){if(a===n.current)throw Error(i(177));if(m=a.lanes|a.childLanes,m|=ep,it(n,s,m,T,O,W),n===gn&&(It=gn=null,Ht=0),pl=a,ys=n,zr=s,lm=m,um=h,dS=u,(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?(n.callbackNode=null,n.callbackPriority=0,Pb($,function(){return wS(),null})):(n.callbackNode=null,n.callbackPriority=0),u=(a.flags&13878)!==0,(a.subtreeFlags&13878)!==0||u){u=H.T,H.T=null,h=G.p,G.p=2,T=$t,$t|=4;try{Tb(n,a,s)}finally{$t=T,G.p=h,H.T=u}}$n=1,bS(),AS(),RS()}}function bS(){if($n===1){$n=0;var n=ys,a=pl,s=(a.flags&13878)!==0;if((a.subtreeFlags&13878)!==0||s){s=H.T,H.T=null;var u=G.p;G.p=2;var h=$t;$t|=4;try{rS(a,n);var m=Tm,T=fv(n.containerInfo),O=m.focusedElem,W=m.selectionRange;if(T!==O&&O&&O.ownerDocument&&cv(O.ownerDocument.documentElement,O)){if(W!==null&&Kd(O)){var fe=W.start,ye=W.end;if(ye===void 0&&(ye=fe),"selectionStart"in O)O.selectionStart=fe,O.selectionEnd=Math.min(ye,O.value.length);else{var Te=O.ownerDocument||document,he=Te&&Te.defaultView||window;if(he.getSelection){var ve=he.getSelection(),$e=O.textContent.length,ft=Math.min(W.start,$e),dn=W.end===void 0?ft:Math.min(W.end,$e);!ve.extend&&ft>dn&&(T=dn,dn=ft,ft=T);var ae=uv(O,ft),K=uv(O,dn);if(ae&&K&&(ve.rangeCount!==1||ve.anchorNode!==ae.node||ve.anchorOffset!==ae.offset||ve.focusNode!==K.node||ve.focusOffset!==K.offset)){var ue=Te.createRange();ue.setStart(ae.node,ae.offset),ve.removeAllRanges(),ft>dn?(ve.addRange(ue),ve.extend(K.node,K.offset)):(ue.setEnd(K.node,K.offset),ve.addRange(ue))}}}}for(Te=[],ve=O;ve=ve.parentNode;)ve.nodeType===1&&Te.push({element:ve,left:ve.scrollLeft,top:ve.scrollTop});for(typeof O.focus=="function"&&O.focus(),O=0;O<Te.length;O++){var Me=Te[O];Me.element.scrollLeft=Me.left,Me.element.scrollTop=Me.top}}ih=!!Em,Tm=Em=null}finally{$t=h,G.p=u,H.T=s}}n.current=a,$n=2}}function AS(){if($n===2){$n=0;var n=ys,a=pl,s=(a.flags&8772)!==0;if((a.subtreeFlags&8772)!==0||s){s=H.T,H.T=null;var u=G.p;G.p=2;var h=$t;$t|=4;try{eS(n,a.alternate,a)}finally{$t=h,G.p=u,H.T=s}}$n=3}}function RS(){if($n===4||$n===3){$n=0,j();var n=ys,a=pl,s=zr,u=dS;(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?$n=5:($n=0,pl=ys=null,CS(n,n.pendingLanes));var h=n.pendingLanes;if(h===0&&(Ss=null),Rn(s),a=a.stateNode,ge&&typeof ge.onCommitFiberRoot=="function")try{ge.onCommitFiberRoot(xe,a,void 0,(a.current.flags&128)===128)}catch{}if(u!==null){a=H.T,h=G.p,G.p=2,H.T=null;try{for(var m=n.onRecoverableError,T=0;T<u.length;T++){var O=u[T];m(O.value,{componentStack:O.stack})}}finally{H.T=a,G.p=h}}(zr&3)!==0&&Wf(),sr(n),h=n.pendingLanes,(s&261930)!==0&&(h&42)!==0?n===cm?Vu++:(Vu=0,cm=n):Vu=0,ku(0)}}function CS(n,a){(n.pooledCacheLanes&=a)===0&&(a=n.pooledCache,a!=null&&(n.pooledCache=null,Eu(a)))}function Wf(){return bS(),AS(),RS(),wS()}function wS(){if($n!==5)return!1;var n=ys,a=lm;lm=0;var s=Rn(zr),u=H.T,h=G.p;try{G.p=32>s?32:s,H.T=null,s=um,um=null;var m=ys,T=zr;if($n=0,pl=ys=null,zr=0,($t&6)!==0)throw Error(i(331));var O=$t;if($t|=4,cS(m.current),oS(m,m.current,T,s),$t=O,ku(0,!1),ge&&typeof ge.onPostCommitFiberRoot=="function")try{ge.onPostCommitFiberRoot(xe,m)}catch{}return!0}finally{G.p=h,H.T=u,CS(n,a)}}function DS(n,a,s){a=Ra(s,a),a=Vp(n.stateNode,a,2),n=ps(n,a,2),n!==null&&(Ee(n,2),sr(n))}function rn(n,a,s){if(n.tag===3)DS(n,n,s);else for(;a!==null;){if(a.tag===3){DS(a,n,s);break}else if(a.tag===1){var u=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(Ss===null||!Ss.has(u))){n=Ra(s,n),s=Lx(2),u=ps(a,s,2),u!==null&&(Ux(s,u,a,n),Ee(u,2),sr(u));break}}a=a.return}}function dm(n,a,s){var u=n.pingCache;if(u===null){u=n.pingCache=new Rb;var h=new Set;u.set(a,h)}else h=u.get(a),h===void 0&&(h=new Set,u.set(a,h));h.has(s)||(rm=!0,h.add(s),n=Ub.bind(null,n,a,s),a.then(n,n))}function Ub(n,a,s){var u=n.pingCache;u!==null&&u.delete(a),n.pingedLanes|=n.suspendedLanes&s,n.warmLanes&=~s,gn===n&&(Ht&s)===s&&(Pn===4||Pn===3&&(Ht&62914560)===Ht&&300>Ot()-Bf?($t&2)===0&&ml(n,0):sm|=s,dl===Ht&&(dl=0)),sr(n)}function LS(n,a){a===0&&(a=be()),n=eo(n,a),n!==null&&(Ee(n,a),sr(n))}function Nb(n){var a=n.memoizedState,s=0;a!==null&&(s=a.retryLane),LS(n,s)}function Ob(n,a){var s=0;switch(n.tag){case 31:case 13:var u=n.stateNode,h=n.memoizedState;h!==null&&(s=h.retryLane);break;case 19:u=n.stateNode;break;case 22:u=n.stateNode._retryCache;break;default:throw Error(i(314))}u!==null&&u.delete(a),LS(n,s)}function Pb(n,a){return pn(n,a)}var Yf=null,gl=null,pm=!1,qf=!1,mm=!1,Es=0;function sr(n){n!==gl&&n.next===null&&(gl===null?Yf=gl=n:gl=gl.next=n),qf=!0,pm||(pm=!0,Ib())}function ku(n,a){if(!mm&&qf){mm=!0;do for(var s=!1,u=Yf;u!==null;){if(n!==0){var h=u.pendingLanes;if(h===0)var m=0;else{var T=u.suspendedLanes,O=u.pingedLanes;m=(1<<31-Xe(42|n)+1)-1,m&=h&~(T&~O),m=m&201326741?m&201326741|1:m?m|2:0}m!==0&&(s=!0,PS(u,m))}else m=Ht,m=Se(u,u===gn?m:0,u.cancelPendingCommit!==null||u.timeoutHandle!==-1),(m&3)===0||Fe(u,m)||(s=!0,PS(u,m));u=u.next}while(s);mm=!1}}function Fb(){US()}function US(){qf=pm=!1;var n=0;Es!==0&&qb()&&(n=Es);for(var a=Ot(),s=null,u=Yf;u!==null;){var h=u.next,m=NS(u,a);m===0?(u.next=null,s===null?Yf=h:s.next=h,h===null&&(gl=s)):(s=u,(n!==0||(m&3)!==0)&&(qf=!0)),u=h}$n!==0&&$n!==5||ku(n),Es!==0&&(Es=0)}function NS(n,a){for(var s=n.suspendedLanes,u=n.pingedLanes,h=n.expirationTimes,m=n.pendingLanes&-62914561;0<m;){var T=31-Xe(m),O=1<<T,W=h[T];W===-1?((O&s)===0||(O&u)!==0)&&(h[T]=Ve(O,a)):W<=a&&(n.expiredLanes|=O),m&=~O}if(a=gn,s=Ht,s=Se(n,n===a?s:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u=n.callbackNode,s===0||n===a&&(an===2||an===9)||n.cancelPendingCommit!==null)return u!==null&&u!==null&&ht(u),n.callbackNode=null,n.callbackPriority=0;if((s&3)===0||Fe(n,s)){if(a=s&-s,a===n.callbackPriority)return a;switch(u!==null&&ht(u),Rn(s)){case 2:case 8:s=A;break;case 32:s=$;break;case 268435456:s=me;break;default:s=$}return u=OS.bind(null,n),s=pn(s,u),n.callbackPriority=a,n.callbackNode=s,a}return u!==null&&u!==null&&ht(u),n.callbackPriority=2,n.callbackNode=null,2}function OS(n,a){if($n!==0&&$n!==5)return n.callbackNode=null,n.callbackPriority=0,null;var s=n.callbackNode;if(Wf()&&n.callbackNode!==s)return null;var u=Ht;return u=Se(n,n===gn?u:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u===0?null:(mS(n,u,a),NS(n,Ot()),n.callbackNode!=null&&n.callbackNode===s?OS.bind(null,n):null)}function PS(n,a){if(Wf())return null;mS(n,a,!0)}function Ib(){Kb(function(){($t&6)!==0?pn(B,Fb):US()})}function _m(){if(Es===0){var n=nl;n===0&&(n=tt,tt<<=1,(tt&261888)===0&&(tt=256)),Es=n}return Es}function FS(n){return n==null||typeof n=="symbol"||typeof n=="boolean"?null:typeof n=="function"?n:ka(""+n)}function IS(n,a){var s=a.ownerDocument.createElement("input");return s.name=a.name,s.value=a.value,n.id&&s.setAttribute("form",n.id),a.parentNode.insertBefore(s,a),n=new FormData(n),s.parentNode.removeChild(s),n}function zb(n,a,s,u,h){if(a==="submit"&&s&&s.stateNode===h){var m=FS((h[Mt]||null).action),T=u.submitter;T&&(a=(a=T[Mt]||null)?FS(a.formAction):T.getAttribute("formAction"),a!==null&&(m=a,T=null));var O=new rf("action","action",null,u,h);n.push({event:O,listeners:[{instance:null,listener:function(){if(u.defaultPrevented){if(Es!==0){var W=T?IS(h,T):new FormData(h);Fp(s,{pending:!0,data:W,method:h.method,action:m},null,W)}}else typeof m=="function"&&(O.preventDefault(),W=T?IS(h,T):new FormData(h),Fp(s,{pending:!0,data:W,method:h.method,action:m},m,W))},currentTarget:h}]})}}for(var gm=0;gm<$d.length;gm++){var vm=$d[gm],Bb=vm.toLowerCase(),Hb=vm[0].toUpperCase()+vm.slice(1);Xa(Bb,"on"+Hb)}Xa(pv,"onAnimationEnd"),Xa(mv,"onAnimationIteration"),Xa(_v,"onAnimationStart"),Xa("dblclick","onDoubleClick"),Xa("focusin","onFocus"),Xa("focusout","onBlur"),Xa(nb,"onTransitionRun"),Xa(ib,"onTransitionStart"),Xa(ab,"onTransitionCancel"),Xa(gv,"onTransitionEnd"),q("onMouseEnter",["mouseout","mouseover"]),q("onMouseLeave",["mouseout","mouseover"]),q("onPointerEnter",["pointerout","pointerover"]),q("onPointerLeave",["pointerout","pointerover"]),U("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),U("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),U("onBeforeInput",["compositionend","keypress","textInput","paste"]),U("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),U("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),U("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xu));function zS(n,a){a=(a&4)!==0;for(var s=0;s<n.length;s++){var u=n[s],h=u.event;u=u.listeners;e:{var m=void 0;if(a)for(var T=u.length-1;0<=T;T--){var O=u[T],W=O.instance,fe=O.currentTarget;if(O=O.listener,W!==m&&h.isPropagationStopped())break e;m=O,h.currentTarget=fe;try{m(h)}catch(ye){lf(ye)}h.currentTarget=null,m=W}else for(T=0;T<u.length;T++){if(O=u[T],W=O.instance,fe=O.currentTarget,O=O.listener,W!==m&&h.isPropagationStopped())break e;m=O,h.currentTarget=fe;try{m(h)}catch(ye){lf(ye)}h.currentTarget=null,m=W}}}}function zt(n,a){var s=a[Qn];s===void 0&&(s=a[Qn]=new Set);var u=n+"__bubble";s.has(u)||(BS(a,n,2,!1),s.add(u))}function xm(n,a,s){var u=0;a&&(u|=4),BS(s,n,u,a)}var Zf="_reactListening"+Math.random().toString(36).slice(2);function Sm(n){if(!n[Zf]){n[Zf]=!0,Ci.forEach(function(s){s!=="selectionchange"&&(Gb.has(s)||xm(s,!1,n),xm(s,!0,n))});var a=n.nodeType===9?n:n.ownerDocument;a===null||a[Zf]||(a[Zf]=!0,xm("selectionchange",!1,a))}}function BS(n,a,s,u){switch(py(a)){case 2:var h=mA;break;case 8:h=_A;break;default:h=Pm}s=h.bind(null,a,s,n),h=void 0,!Hd||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(h=!0),u?h!==void 0?n.addEventListener(a,s,{capture:!0,passive:h}):n.addEventListener(a,s,!0):h!==void 0?n.addEventListener(a,s,{passive:h}):n.addEventListener(a,s,!1)}function ym(n,a,s,u,h){var m=u;if((a&1)===0&&(a&2)===0&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var O=u.stateNode.containerInfo;if(O===h)break;if(T===4)for(T=u.return;T!==null;){var W=T.tag;if((W===3||W===4)&&T.stateNode.containerInfo===h)return;T=T.return}for(;O!==null;){if(T=Mn(O),T===null)return;if(W=T.tag,W===5||W===6||W===26||W===27){u=m=T;continue e}O=O.parentNode}}u=u.return}X0(function(){var fe=m,ye=zd(s),Te=[];e:{var he=vv.get(n);if(he!==void 0){var ve=rf,$e=n;switch(n){case"keypress":if(nf(s)===0)break e;case"keydown":case"keyup":ve=OT;break;case"focusin":$e="focus",ve=Xd;break;case"focusout":$e="blur",ve=Xd;break;case"beforeblur":case"afterblur":ve=Xd;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ve=q0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ve=MT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ve=IT;break;case pv:case mv:case _v:ve=bT;break;case gv:ve=BT;break;case"scroll":case"scrollend":ve=ST;break;case"wheel":ve=GT;break;case"copy":case"cut":case"paste":ve=RT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ve=K0;break;case"toggle":case"beforetoggle":ve=kT}var ft=(a&4)!==0,dn=!ft&&(n==="scroll"||n==="scrollend"),ae=ft?he!==null?he+"Capture":null:he;ft=[];for(var K=fe,ue;K!==null;){var Me=K;if(ue=Me.stateNode,Me=Me.tag,Me!==5&&Me!==26&&Me!==27||ue===null||ae===null||(Me=hu(K,ae),Me!=null&&ft.push(Wu(K,Me,ue))),dn)break;K=K.return}0<ft.length&&(he=new ve(he,$e,null,s,ye),Te.push({event:he,listeners:ft}))}}if((a&7)===0){e:{if(he=n==="mouseover"||n==="pointerover",ve=n==="mouseout"||n==="pointerout",he&&s!==Id&&($e=s.relatedTarget||s.fromElement)&&(Mn($e)||$e[Et]))break e;if((ve||he)&&(he=ye.window===ye?ye:(he=ye.ownerDocument)?he.defaultView||he.parentWindow:window,ve?($e=s.relatedTarget||s.toElement,ve=fe,$e=$e?Mn($e):null,$e!==null&&(dn=l($e),ft=$e.tag,$e!==dn||ft!==5&&ft!==27&&ft!==6)&&($e=null)):(ve=null,$e=fe),ve!==$e)){if(ft=q0,Me="onMouseLeave",ae="onMouseEnter",K="mouse",(n==="pointerout"||n==="pointerover")&&(ft=K0,Me="onPointerLeave",ae="onPointerEnter",K="pointer"),dn=ve==null?he:Ea(ve),ue=$e==null?he:Ea($e),he=new ft(Me,K+"leave",ve,s,ye),he.target=dn,he.relatedTarget=ue,Me=null,Mn(ye)===fe&&(ft=new ft(ae,K+"enter",$e,s,ye),ft.target=ue,ft.relatedTarget=dn,Me=ft),dn=Me,ve&&$e)t:{for(ft=Vb,ae=ve,K=$e,ue=0,Me=ae;Me;Me=ft(Me))ue++;Me=0;for(var ut=K;ut;ut=ft(ut))Me++;for(;0<ue-Me;)ae=ft(ae),ue--;for(;0<Me-ue;)K=ft(K),Me--;for(;ue--;){if(ae===K||K!==null&&ae===K.alternate){ft=ae;break t}ae=ft(ae),K=ft(K)}ft=null}else ft=null;ve!==null&&HS(Te,he,ve,ft,!1),$e!==null&&dn!==null&&HS(Te,dn,$e,ft,!0)}}e:{if(he=fe?Ea(fe):window,ve=he.nodeName&&he.nodeName.toLowerCase(),ve==="select"||ve==="input"&&he.type==="file")var Kt=iv;else if(tv(he))if(av)Kt=$T;else{Kt=QT;var nt=jT}else ve=he.nodeName,!ve||ve.toLowerCase()!=="input"||he.type!=="checkbox"&&he.type!=="radio"?fe&&Ta(fe.elementType)&&(Kt=iv):Kt=JT;if(Kt&&(Kt=Kt(n,fe))){nv(Te,Kt,s,ye);break e}nt&&nt(n,he,fe),n==="focusout"&&fe&&he.type==="number"&&fe.memoizedProps.value!=null&&Jn(he,"number",he.value)}switch(nt=fe?Ea(fe):window,n){case"focusin":(tv(nt)||nt.contentEditable==="true")&&(Zo=nt,jd=fe,Su=null);break;case"focusout":Su=jd=Zo=null;break;case"mousedown":Qd=!0;break;case"contextmenu":case"mouseup":case"dragend":Qd=!1,hv(Te,s,ye);break;case"selectionchange":if(tb)break;case"keydown":case"keyup":hv(Te,s,ye)}var Rt;if(Yd)e:{switch(n){case"compositionstart":var Gt="onCompositionStart";break e;case"compositionend":Gt="onCompositionEnd";break e;case"compositionupdate":Gt="onCompositionUpdate";break e}Gt=void 0}else qo?$0(n,s)&&(Gt="onCompositionEnd"):n==="keydown"&&s.keyCode===229&&(Gt="onCompositionStart");Gt&&(j0&&s.locale!=="ko"&&(qo||Gt!=="onCompositionStart"?Gt==="onCompositionEnd"&&qo&&(Rt=W0()):(os=ye,Gd="value"in os?os.value:os.textContent,qo=!0)),nt=Kf(fe,Gt),0<nt.length&&(Gt=new Z0(Gt,n,null,s,ye),Te.push({event:Gt,listeners:nt}),Rt?Gt.data=Rt:(Rt=ev(s),Rt!==null&&(Gt.data=Rt)))),(Rt=WT?YT(n,s):qT(n,s))&&(Gt=Kf(fe,"onBeforeInput"),0<Gt.length&&(nt=new Z0("onBeforeInput","beforeinput",null,s,ye),Te.push({event:nt,listeners:Gt}),nt.data=Rt)),zb(Te,n,fe,s,ye)}zS(Te,a)})}function Wu(n,a,s){return{instance:n,listener:a,currentTarget:s}}function Kf(n,a){for(var s=a+"Capture",u=[];n!==null;){var h=n,m=h.stateNode;if(h=h.tag,h!==5&&h!==26&&h!==27||m===null||(h=hu(n,s),h!=null&&u.unshift(Wu(n,h,m)),h=hu(n,a),h!=null&&u.push(Wu(n,h,m))),n.tag===3)return u;n=n.return}return[]}function Vb(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5&&n.tag!==27);return n||null}function HS(n,a,s,u,h){for(var m=a._reactName,T=[];s!==null&&s!==u;){var O=s,W=O.alternate,fe=O.stateNode;if(O=O.tag,W!==null&&W===u)break;O!==5&&O!==26&&O!==27||fe===null||(W=fe,h?(fe=hu(s,m),fe!=null&&T.unshift(Wu(s,fe,W))):h||(fe=hu(s,m),fe!=null&&T.push(Wu(s,fe,W)))),s=s.return}T.length!==0&&n.push({event:a,listeners:T})}var kb=/\r\n?/g,Xb=/\u0000|\uFFFD/g;function GS(n){return(typeof n=="string"?n:""+n).replace(kb,`
`).replace(Xb,"")}function VS(n,a){return a=GS(a),GS(n)===a}function hn(n,a,s,u,h,m){switch(s){case"children":typeof u=="string"?a==="body"||a==="textarea"&&u===""||Di(n,u):(typeof u=="number"||typeof u=="bigint")&&a!=="body"&&Di(n,""+u);break;case"className":ke(n,"class",u);break;case"tabIndex":ke(n,"tabindex",u);break;case"dir":case"role":case"viewBox":case"width":case"height":ke(n,s,u);break;case"style":Cn(n,u,m);break;case"data":if(a!=="object"){ke(n,"data",u);break}case"src":case"href":if(u===""&&(a!=="a"||s!=="href")){n.removeAttribute(s);break}if(u==null||typeof u=="function"||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(s);break}u=ka(""+u),n.setAttribute(s,u);break;case"action":case"formAction":if(typeof u=="function"){n.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof m=="function"&&(s==="formAction"?(a!=="input"&&hn(n,a,"name",h.name,h,null),hn(n,a,"formEncType",h.formEncType,h,null),hn(n,a,"formMethod",h.formMethod,h,null),hn(n,a,"formTarget",h.formTarget,h,null)):(hn(n,a,"encType",h.encType,h,null),hn(n,a,"method",h.method,h,null),hn(n,a,"target",h.target,h,null)));if(u==null||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(s);break}u=ka(""+u),n.setAttribute(s,u);break;case"onClick":u!=null&&(n.onclick=ba);break;case"onScroll":u!=null&&zt("scroll",n);break;case"onScrollEnd":u!=null&&zt("scrollend",n);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(i(61));if(s=u.__html,s!=null){if(h.children!=null)throw Error(i(60));n.innerHTML=s}}break;case"multiple":n.multiple=u&&typeof u!="function"&&typeof u!="symbol";break;case"muted":n.muted=u&&typeof u!="function"&&typeof u!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(u==null||typeof u=="function"||typeof u=="boolean"||typeof u=="symbol"){n.removeAttribute("xlink:href");break}s=ka(""+u),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(s,""+u):n.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":u&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(s,""):n.removeAttribute(s);break;case"capture":case"download":u===!0?n.setAttribute(s,""):u!==!1&&u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(s,u):n.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":u!=null&&typeof u!="function"&&typeof u!="symbol"&&!isNaN(u)&&1<=u?n.setAttribute(s,u):n.removeAttribute(s);break;case"rowSpan":case"start":u==null||typeof u=="function"||typeof u=="symbol"||isNaN(u)?n.removeAttribute(s):n.setAttribute(s,u);break;case"popover":zt("beforetoggle",n),zt("toggle",n),Ze(n,"popover",u);break;case"xlinkActuate":Ye(n,"http://www.w3.org/1999/xlink","xlink:actuate",u);break;case"xlinkArcrole":Ye(n,"http://www.w3.org/1999/xlink","xlink:arcrole",u);break;case"xlinkRole":Ye(n,"http://www.w3.org/1999/xlink","xlink:role",u);break;case"xlinkShow":Ye(n,"http://www.w3.org/1999/xlink","xlink:show",u);break;case"xlinkTitle":Ye(n,"http://www.w3.org/1999/xlink","xlink:title",u);break;case"xlinkType":Ye(n,"http://www.w3.org/1999/xlink","xlink:type",u);break;case"xmlBase":Ye(n,"http://www.w3.org/XML/1998/namespace","xml:base",u);break;case"xmlLang":Ye(n,"http://www.w3.org/XML/1998/namespace","xml:lang",u);break;case"xmlSpace":Ye(n,"http://www.w3.org/XML/1998/namespace","xml:space",u);break;case"is":Ze(n,"is",u);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=cn.get(s)||s,Ze(n,s,u))}}function Mm(n,a,s,u,h,m){switch(s){case"style":Cn(n,u,m);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(i(61));if(s=u.__html,s!=null){if(h.children!=null)throw Error(i(60));n.innerHTML=s}}break;case"children":typeof u=="string"?Di(n,u):(typeof u=="number"||typeof u=="bigint")&&Di(n,""+u);break;case"onScroll":u!=null&&zt("scroll",n);break;case"onScrollEnd":u!=null&&zt("scrollend",n);break;case"onClick":u!=null&&(n.onclick=ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Er.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(h=s.endsWith("Capture"),a=s.slice(2,h?s.length-7:void 0),m=n[Mt]||null,m=m!=null?m[s]:null,typeof m=="function"&&n.removeEventListener(a,m,h),typeof u=="function")){typeof m!="function"&&m!==null&&(s in n?n[s]=null:n.hasAttribute(s)&&n.removeAttribute(s)),n.addEventListener(a,u,h);break e}s in n?n[s]=u:u===!0?n.setAttribute(s,""):Ze(n,s,u)}}}function mi(n,a,s){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":zt("error",n),zt("load",n);var u=!1,h=!1,m;for(m in s)if(s.hasOwnProperty(m)){var T=s[m];if(T!=null)switch(m){case"src":u=!0;break;case"srcSet":h=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(i(137,a));default:hn(n,a,m,T,s,null)}}h&&hn(n,a,"srcSet",s.srcSet,s,null),u&&hn(n,a,"src",s.src,s,null);return;case"input":zt("invalid",n);var O=m=T=h=null,W=null,fe=null;for(u in s)if(s.hasOwnProperty(u)){var ye=s[u];if(ye!=null)switch(u){case"name":h=ye;break;case"type":T=ye;break;case"checked":W=ye;break;case"defaultChecked":fe=ye;break;case"value":m=ye;break;case"defaultValue":O=ye;break;case"children":case"dangerouslySetInnerHTML":if(ye!=null)throw Error(i(137,a));break;default:hn(n,a,u,ye,s,null)}}Ke(n,m,O,W,fe,T,h,!1);return;case"select":zt("invalid",n),u=T=m=null;for(h in s)if(s.hasOwnProperty(h)&&(O=s[h],O!=null))switch(h){case"value":m=O;break;case"defaultValue":T=O;break;case"multiple":u=O;default:hn(n,a,h,O,s,null)}a=m,s=T,n.multiple=!!u,a!=null?Dt(n,!!u,a,!1):s!=null&&Dt(n,!!u,s,!0);return;case"textarea":zt("invalid",n),m=h=u=null;for(T in s)if(s.hasOwnProperty(T)&&(O=s[T],O!=null))switch(T){case"value":u=O;break;case"defaultValue":h=O;break;case"children":m=O;break;case"dangerouslySetInnerHTML":if(O!=null)throw Error(i(91));break;default:hn(n,a,T,O,s,null)}ta(n,u,h,m);return;case"option":for(W in s)if(s.hasOwnProperty(W)&&(u=s[W],u!=null))switch(W){case"selected":n.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:hn(n,a,W,u,s,null)}return;case"dialog":zt("beforetoggle",n),zt("toggle",n),zt("cancel",n),zt("close",n);break;case"iframe":case"object":zt("load",n);break;case"video":case"audio":for(u=0;u<Xu.length;u++)zt(Xu[u],n);break;case"image":zt("error",n),zt("load",n);break;case"details":zt("toggle",n);break;case"embed":case"source":case"link":zt("error",n),zt("load",n);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(fe in s)if(s.hasOwnProperty(fe)&&(u=s[fe],u!=null))switch(fe){case"children":case"dangerouslySetInnerHTML":throw Error(i(137,a));default:hn(n,a,fe,u,s,null)}return;default:if(Ta(a)){for(ye in s)s.hasOwnProperty(ye)&&(u=s[ye],u!==void 0&&Mm(n,a,ye,u,s,void 0));return}}for(O in s)s.hasOwnProperty(O)&&(u=s[O],u!=null&&hn(n,a,O,u,s,null))}function Wb(n,a,s,u){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var h=null,m=null,T=null,O=null,W=null,fe=null,ye=null;for(ve in s){var Te=s[ve];if(s.hasOwnProperty(ve)&&Te!=null)switch(ve){case"checked":break;case"value":break;case"defaultValue":W=Te;default:u.hasOwnProperty(ve)||hn(n,a,ve,null,u,Te)}}for(var he in u){var ve=u[he];if(Te=s[he],u.hasOwnProperty(he)&&(ve!=null||Te!=null))switch(he){case"type":m=ve;break;case"name":h=ve;break;case"checked":fe=ve;break;case"defaultChecked":ye=ve;break;case"value":T=ve;break;case"defaultValue":O=ve;break;case"children":case"dangerouslySetInnerHTML":if(ve!=null)throw Error(i(137,a));break;default:ve!==Te&&hn(n,a,he,ve,u,Te)}}Vn(n,T,O,W,fe,ye,m,h);return;case"select":ve=T=O=he=null;for(m in s)if(W=s[m],s.hasOwnProperty(m)&&W!=null)switch(m){case"value":break;case"multiple":ve=W;default:u.hasOwnProperty(m)||hn(n,a,m,null,u,W)}for(h in u)if(m=u[h],W=s[h],u.hasOwnProperty(h)&&(m!=null||W!=null))switch(h){case"value":he=m;break;case"defaultValue":O=m;break;case"multiple":T=m;default:m!==W&&hn(n,a,h,m,u,W)}a=O,s=T,u=ve,he!=null?Dt(n,!!s,he,!1):!!u!=!!s&&(a!=null?Dt(n,!!s,a,!0):Dt(n,!!s,s?[]:"",!1));return;case"textarea":ve=he=null;for(O in s)if(h=s[O],s.hasOwnProperty(O)&&h!=null&&!u.hasOwnProperty(O))switch(O){case"value":break;case"children":break;default:hn(n,a,O,null,u,h)}for(T in u)if(h=u[T],m=s[T],u.hasOwnProperty(T)&&(h!=null||m!=null))switch(T){case"value":he=h;break;case"defaultValue":ve=h;break;case"children":break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(i(91));break;default:h!==m&&hn(n,a,T,h,u,m)}wi(n,he,ve);return;case"option":for(var $e in s)if(he=s[$e],s.hasOwnProperty($e)&&he!=null&&!u.hasOwnProperty($e))switch($e){case"selected":n.selected=!1;break;default:hn(n,a,$e,null,u,he)}for(W in u)if(he=u[W],ve=s[W],u.hasOwnProperty(W)&&he!==ve&&(he!=null||ve!=null))switch(W){case"selected":n.selected=he&&typeof he!="function"&&typeof he!="symbol";break;default:hn(n,a,W,he,u,ve)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ft in s)he=s[ft],s.hasOwnProperty(ft)&&he!=null&&!u.hasOwnProperty(ft)&&hn(n,a,ft,null,u,he);for(fe in u)if(he=u[fe],ve=s[fe],u.hasOwnProperty(fe)&&he!==ve&&(he!=null||ve!=null))switch(fe){case"children":case"dangerouslySetInnerHTML":if(he!=null)throw Error(i(137,a));break;default:hn(n,a,fe,he,u,ve)}return;default:if(Ta(a)){for(var dn in s)he=s[dn],s.hasOwnProperty(dn)&&he!==void 0&&!u.hasOwnProperty(dn)&&Mm(n,a,dn,void 0,u,he);for(ye in u)he=u[ye],ve=s[ye],!u.hasOwnProperty(ye)||he===ve||he===void 0&&ve===void 0||Mm(n,a,ye,he,u,ve);return}}for(var ae in s)he=s[ae],s.hasOwnProperty(ae)&&he!=null&&!u.hasOwnProperty(ae)&&hn(n,a,ae,null,u,he);for(Te in u)he=u[Te],ve=s[Te],!u.hasOwnProperty(Te)||he===ve||he==null&&ve==null||hn(n,a,Te,he,u,ve)}function kS(n){switch(n){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Yb(){if(typeof performance.getEntriesByType=="function"){for(var n=0,a=0,s=performance.getEntriesByType("resource"),u=0;u<s.length;u++){var h=s[u],m=h.transferSize,T=h.initiatorType,O=h.duration;if(m&&O&&kS(T)){for(T=0,O=h.responseEnd,u+=1;u<s.length;u++){var W=s[u],fe=W.startTime;if(fe>O)break;var ye=W.transferSize,Te=W.initiatorType;ye&&kS(Te)&&(W=W.responseEnd,T+=ye*(W<O?1:(O-fe)/(W-fe)))}if(--u,a+=8*(m+T)/(h.duration/1e3),n++,10<n)break}}if(0<n)return a/n/1e6}return navigator.connection&&(n=navigator.connection.downlink,typeof n=="number")?n:5}var Em=null,Tm=null;function jf(n){return n.nodeType===9?n:n.ownerDocument}function XS(n){switch(n){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function WS(n,a){if(n===0)switch(a){case"svg":return 1;case"math":return 2;default:return 0}return n===1&&a==="foreignObject"?0:n}function bm(n,a){return n==="textarea"||n==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.children=="bigint"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Am=null;function qb(){var n=window.event;return n&&n.type==="popstate"?n===Am?!1:(Am=n,!0):(Am=null,!1)}var YS=typeof setTimeout=="function"?setTimeout:void 0,Zb=typeof clearTimeout=="function"?clearTimeout:void 0,qS=typeof Promise=="function"?Promise:void 0,Kb=typeof queueMicrotask=="function"?queueMicrotask:typeof qS<"u"?function(n){return qS.resolve(null).then(n).catch(jb)}:YS;function jb(n){setTimeout(function(){throw n})}function Ts(n){return n==="head"}function ZS(n,a){var s=a,u=0;do{var h=s.nextSibling;if(n.removeChild(s),h&&h.nodeType===8)if(s=h.data,s==="/$"||s==="/&"){if(u===0){n.removeChild(h),yl(a);return}u--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")u++;else if(s==="html")Yu(n.ownerDocument.documentElement);else if(s==="head"){s=n.ownerDocument.head,Yu(s);for(var m=s.firstChild;m;){var T=m.nextSibling,O=m.nodeName;m[Sn]||O==="SCRIPT"||O==="STYLE"||O==="LINK"&&m.rel.toLowerCase()==="stylesheet"||s.removeChild(m),m=T}}else s==="body"&&Yu(n.ownerDocument.body);s=h}while(s);yl(a)}function KS(n,a){var s=n;n=0;do{var u=s.nextSibling;if(s.nodeType===1?a?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(a?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),u&&u.nodeType===8)if(s=u.data,s==="/$"){if(n===0)break;n--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||n++;s=u}while(s)}function Rm(n){var a=n.firstChild;for(a&&a.nodeType===10&&(a=a.nextSibling);a;){var s=a;switch(a=a.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Rm(s),yn(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}n.removeChild(s)}}function Qb(n,a,s,u){for(;n.nodeType===1;){var h=s;if(n.nodeName.toLowerCase()!==a.toLowerCase()){if(!u&&(n.nodeName!=="INPUT"||n.type!=="hidden"))break}else if(u){if(!n[Sn])switch(a){case"meta":if(!n.hasAttribute("itemprop"))break;return n;case"link":if(m=n.getAttribute("rel"),m==="stylesheet"&&n.hasAttribute("data-precedence"))break;if(m!==h.rel||n.getAttribute("href")!==(h.href==null||h.href===""?null:h.href)||n.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin)||n.getAttribute("title")!==(h.title==null?null:h.title))break;return n;case"style":if(n.hasAttribute("data-precedence"))break;return n;case"script":if(m=n.getAttribute("src"),(m!==(h.src==null?null:h.src)||n.getAttribute("type")!==(h.type==null?null:h.type)||n.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin))&&m&&n.hasAttribute("async")&&!n.hasAttribute("itemprop"))break;return n;default:return n}}else if(a==="input"&&n.type==="hidden"){var m=h.name==null?null:""+h.name;if(h.type==="hidden"&&n.getAttribute("name")===m)return n}else return n;if(n=Ua(n.nextSibling),n===null)break}return null}function Jb(n,a,s){if(a==="")return null;for(;n.nodeType!==3;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!s||(n=Ua(n.nextSibling),n===null))return null;return n}function jS(n,a){for(;n.nodeType!==8;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!a||(n=Ua(n.nextSibling),n===null))return null;return n}function Cm(n){return n.data==="$?"||n.data==="$~"}function wm(n){return n.data==="$!"||n.data==="$?"&&n.ownerDocument.readyState!=="loading"}function $b(n,a){var s=n.ownerDocument;if(n.data==="$~")n._reactRetry=a;else if(n.data!=="$?"||s.readyState!=="loading")a();else{var u=function(){a(),s.removeEventListener("DOMContentLoaded",u)};s.addEventListener("DOMContentLoaded",u),n._reactRetry=u}}function Ua(n){for(;n!=null;n=n.nextSibling){var a=n.nodeType;if(a===1||a===3)break;if(a===8){if(a=n.data,a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"||a==="F!"||a==="F")break;if(a==="/$"||a==="/&")return null}}return n}var Dm=null;function QS(n){n=n.nextSibling;for(var a=0;n;){if(n.nodeType===8){var s=n.data;if(s==="/$"||s==="/&"){if(a===0)return Ua(n.nextSibling);a--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||a++}n=n.nextSibling}return null}function JS(n){n=n.previousSibling;for(var a=0;n;){if(n.nodeType===8){var s=n.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(a===0)return n;a--}else s!=="/$"&&s!=="/&"||a++}n=n.previousSibling}return null}function $S(n,a,s){switch(a=jf(s),n){case"html":if(n=a.documentElement,!n)throw Error(i(452));return n;case"head":if(n=a.head,!n)throw Error(i(453));return n;case"body":if(n=a.body,!n)throw Error(i(454));return n;default:throw Error(i(451))}}function Yu(n){for(var a=n.attributes;a.length;)n.removeAttributeNode(a[0]);yn(n)}var Na=new Map,ey=new Set;function Qf(n){return typeof n.getRootNode=="function"?n.getRootNode():n.nodeType===9?n:n.ownerDocument}var Br=G.d;G.d={f:eA,r:tA,D:nA,C:iA,L:aA,m:rA,X:oA,S:sA,M:lA};function eA(){var n=Br.f(),a=Vf();return n||a}function tA(n){var a=fi(n);a!==null&&a.tag===5&&a.type==="form"?gx(a):Br.r(n)}var vl=typeof document>"u"?null:document;function ty(n,a,s){var u=vl;if(u&&typeof a=="string"&&a){var h=wt(a);h='link[rel="'+n+'"][href="'+h+'"]',typeof s=="string"&&(h+='[crossorigin="'+s+'"]'),ey.has(h)||(ey.add(h),n={rel:n,crossOrigin:s,href:a},u.querySelector(h)===null&&(a=u.createElement("link"),mi(a,"link",n),Ct(a),u.head.appendChild(a)))}}function nA(n){Br.D(n),ty("dns-prefetch",n,null)}function iA(n,a){Br.C(n,a),ty("preconnect",n,a)}function aA(n,a,s){Br.L(n,a,s);var u=vl;if(u&&n&&a){var h='link[rel="preload"][as="'+wt(a)+'"]';a==="image"&&s&&s.imageSrcSet?(h+='[imagesrcset="'+wt(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(h+='[imagesizes="'+wt(s.imageSizes)+'"]')):h+='[href="'+wt(n)+'"]';var m=h;switch(a){case"style":m=xl(n);break;case"script":m=Sl(n)}Na.has(m)||(n=v({rel:"preload",href:a==="image"&&s&&s.imageSrcSet?void 0:n,as:a},s),Na.set(m,n),u.querySelector(h)!==null||a==="style"&&u.querySelector(qu(m))||a==="script"&&u.querySelector(Zu(m))||(a=u.createElement("link"),mi(a,"link",n),Ct(a),u.head.appendChild(a)))}}function rA(n,a){Br.m(n,a);var s=vl;if(s&&n){var u=a&&typeof a.as=="string"?a.as:"script",h='link[rel="modulepreload"][as="'+wt(u)+'"][href="'+wt(n)+'"]',m=h;switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":m=Sl(n)}if(!Na.has(m)&&(n=v({rel:"modulepreload",href:n},a),Na.set(m,n),s.querySelector(h)===null)){switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Zu(m)))return}u=s.createElement("link"),mi(u,"link",n),Ct(u),s.head.appendChild(u)}}}function sA(n,a,s){Br.S(n,a,s);var u=vl;if(u&&n){var h=En(u).hoistableStyles,m=xl(n);a=a||"default";var T=h.get(m);if(!T){var O={loading:0,preload:null};if(T=u.querySelector(qu(m)))O.loading=5;else{n=v({rel:"stylesheet",href:n,"data-precedence":a},s),(s=Na.get(m))&&Lm(n,s);var W=T=u.createElement("link");Ct(W),mi(W,"link",n),W._p=new Promise(function(fe,ye){W.onload=fe,W.onerror=ye}),W.addEventListener("load",function(){O.loading|=1}),W.addEventListener("error",function(){O.loading|=2}),O.loading|=4,Jf(T,a,u)}T={type:"stylesheet",instance:T,count:1,state:O},h.set(m,T)}}}function oA(n,a){Br.X(n,a);var s=vl;if(s&&n){var u=En(s).hoistableScripts,h=Sl(n),m=u.get(h);m||(m=s.querySelector(Zu(h)),m||(n=v({src:n,async:!0},a),(a=Na.get(h))&&Um(n,a),m=s.createElement("script"),Ct(m),mi(m,"link",n),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},u.set(h,m))}}function lA(n,a){Br.M(n,a);var s=vl;if(s&&n){var u=En(s).hoistableScripts,h=Sl(n),m=u.get(h);m||(m=s.querySelector(Zu(h)),m||(n=v({src:n,async:!0,type:"module"},a),(a=Na.get(h))&&Um(n,a),m=s.createElement("script"),Ct(m),mi(m,"link",n),s.head.appendChild(m)),m={type:"script",instance:m,count:1,state:null},u.set(h,m))}}function ny(n,a,s,u){var h=(h=Be.current)?Qf(h):null;if(!h)throw Error(i(446));switch(n){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(a=xl(s.href),s=En(h).hoistableStyles,u=s.get(a),u||(u={type:"style",instance:null,count:0,state:null},s.set(a,u)),u):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){n=xl(s.href);var m=En(h).hoistableStyles,T=m.get(n);if(T||(h=h.ownerDocument||h,T={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},m.set(n,T),(m=h.querySelector(qu(n)))&&!m._p&&(T.instance=m,T.state.loading=5),Na.has(n)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Na.set(n,s),m||uA(h,n,s,T.state))),a&&u===null)throw Error(i(528,""));return T}if(a&&u!==null)throw Error(i(529,""));return null;case"script":return a=s.async,s=s.src,typeof s=="string"&&a&&typeof a!="function"&&typeof a!="symbol"?(a=Sl(s),s=En(h).hoistableScripts,u=s.get(a),u||(u={type:"script",instance:null,count:0,state:null},s.set(a,u)),u):{type:"void",instance:null,count:0,state:null};default:throw Error(i(444,n))}}function xl(n){return'href="'+wt(n)+'"'}function qu(n){return'link[rel="stylesheet"]['+n+"]"}function iy(n){return v({},n,{"data-precedence":n.precedence,precedence:null})}function uA(n,a,s,u){n.querySelector('link[rel="preload"][as="style"]['+a+"]")?u.loading=1:(a=n.createElement("link"),u.preload=a,a.addEventListener("load",function(){return u.loading|=1}),a.addEventListener("error",function(){return u.loading|=2}),mi(a,"link",s),Ct(a),n.head.appendChild(a))}function Sl(n){return'[src="'+wt(n)+'"]'}function Zu(n){return"script[async]"+n}function ay(n,a,s){if(a.count++,a.instance===null)switch(a.type){case"style":var u=n.querySelector('style[data-href~="'+wt(s.href)+'"]');if(u)return a.instance=u,Ct(u),u;var h=v({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return u=(n.ownerDocument||n).createElement("style"),Ct(u),mi(u,"style",h),Jf(u,s.precedence,n),a.instance=u;case"stylesheet":h=xl(s.href);var m=n.querySelector(qu(h));if(m)return a.state.loading|=4,a.instance=m,Ct(m),m;u=iy(s),(h=Na.get(h))&&Lm(u,h),m=(n.ownerDocument||n).createElement("link"),Ct(m);var T=m;return T._p=new Promise(function(O,W){T.onload=O,T.onerror=W}),mi(m,"link",u),a.state.loading|=4,Jf(m,s.precedence,n),a.instance=m;case"script":return m=Sl(s.src),(h=n.querySelector(Zu(m)))?(a.instance=h,Ct(h),h):(u=s,(h=Na.get(m))&&(u=v({},s),Um(u,h)),n=n.ownerDocument||n,h=n.createElement("script"),Ct(h),mi(h,"link",u),n.head.appendChild(h),a.instance=h);case"void":return null;default:throw Error(i(443,a.type))}else a.type==="stylesheet"&&(a.state.loading&4)===0&&(u=a.instance,a.state.loading|=4,Jf(u,s.precedence,n));return a.instance}function Jf(n,a,s){for(var u=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),h=u.length?u[u.length-1]:null,m=h,T=0;T<u.length;T++){var O=u[T];if(O.dataset.precedence===a)m=O;else if(m!==h)break}m?m.parentNode.insertBefore(n,m.nextSibling):(a=s.nodeType===9?s.head:s,a.insertBefore(n,a.firstChild))}function Lm(n,a){n.crossOrigin==null&&(n.crossOrigin=a.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=a.referrerPolicy),n.title==null&&(n.title=a.title)}function Um(n,a){n.crossOrigin==null&&(n.crossOrigin=a.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=a.referrerPolicy),n.integrity==null&&(n.integrity=a.integrity)}var $f=null;function ry(n,a,s){if($f===null){var u=new Map,h=$f=new Map;h.set(s,u)}else h=$f,u=h.get(s),u||(u=new Map,h.set(s,u));if(u.has(n))return u;for(u.set(n,null),s=s.getElementsByTagName(n),h=0;h<s.length;h++){var m=s[h];if(!(m[Sn]||m[St]||n==="link"&&m.getAttribute("rel")==="stylesheet")&&m.namespaceURI!=="http://www.w3.org/2000/svg"){var T=m.getAttribute(a)||"";T=n+T;var O=u.get(T);O?O.push(m):u.set(T,[m])}}return u}function sy(n,a,s){n=n.ownerDocument||n,n.head.insertBefore(s,a==="title"?n.querySelector("head > title"):null)}function cA(n,a,s){if(s===1||a.itemProp!=null)return!1;switch(n){case"meta":case"title":return!0;case"style":if(typeof a.precedence!="string"||typeof a.href!="string"||a.href==="")break;return!0;case"link":if(typeof a.rel!="string"||typeof a.href!="string"||a.href===""||a.onLoad||a.onError)break;switch(a.rel){case"stylesheet":return n=a.disabled,typeof a.precedence=="string"&&n==null;default:return!0}case"script":if(a.async&&typeof a.async!="function"&&typeof a.async!="symbol"&&!a.onLoad&&!a.onError&&a.src&&typeof a.src=="string")return!0}return!1}function oy(n){return!(n.type==="stylesheet"&&(n.state.loading&3)===0)}function fA(n,a,s,u){if(s.type==="stylesheet"&&(typeof u.media!="string"||matchMedia(u.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var h=xl(u.href),m=a.querySelector(qu(h));if(m){a=m._p,a!==null&&typeof a=="object"&&typeof a.then=="function"&&(n.count++,n=eh.bind(n),a.then(n,n)),s.state.loading|=4,s.instance=m,Ct(m);return}m=a.ownerDocument||a,u=iy(u),(h=Na.get(h))&&Lm(u,h),m=m.createElement("link"),Ct(m);var T=m;T._p=new Promise(function(O,W){T.onload=O,T.onerror=W}),mi(m,"link",u),s.instance=m}n.stylesheets===null&&(n.stylesheets=new Map),n.stylesheets.set(s,a),(a=s.state.preload)&&(s.state.loading&3)===0&&(n.count++,s=eh.bind(n),a.addEventListener("load",s),a.addEventListener("error",s))}}var Nm=0;function hA(n,a){return n.stylesheets&&n.count===0&&nh(n,n.stylesheets),0<n.count||0<n.imgCount?function(s){var u=setTimeout(function(){if(n.stylesheets&&nh(n,n.stylesheets),n.unsuspend){var m=n.unsuspend;n.unsuspend=null,m()}},6e4+a);0<n.imgBytes&&Nm===0&&(Nm=62500*Yb());var h=setTimeout(function(){if(n.waitingForImages=!1,n.count===0&&(n.stylesheets&&nh(n,n.stylesheets),n.unsuspend)){var m=n.unsuspend;n.unsuspend=null,m()}},(n.imgBytes>Nm?50:800)+a);return n.unsuspend=s,function(){n.unsuspend=null,clearTimeout(u),clearTimeout(h)}}:null}function eh(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)nh(this,this.stylesheets);else if(this.unsuspend){var n=this.unsuspend;this.unsuspend=null,n()}}}var th=null;function nh(n,a){n.stylesheets=null,n.unsuspend!==null&&(n.count++,th=new Map,a.forEach(dA,n),th=null,eh.call(n))}function dA(n,a){if(!(a.state.loading&4)){var s=th.get(n);if(s)var u=s.get(null);else{s=new Map,th.set(n,s);for(var h=n.querySelectorAll("link[data-precedence],style[data-precedence]"),m=0;m<h.length;m++){var T=h[m];(T.nodeName==="LINK"||T.getAttribute("media")!=="not all")&&(s.set(T.dataset.precedence,T),u=T)}u&&s.set(null,u)}h=a.instance,T=h.getAttribute("data-precedence"),m=s.get(T)||u,m===u&&s.set(null,h),s.set(T,h),this.count++,u=eh.bind(this),h.addEventListener("load",u),h.addEventListener("error",u),m?m.parentNode.insertBefore(h,m.nextSibling):(n=n.nodeType===9?n.head:n,n.insertBefore(h,n.firstChild)),a.state.loading|=4}}var Ku={$$typeof:F,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function pA(n,a,s,u,h,m,T,O,W){this.tag=1,this.containerInfo=n,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=we(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=we(0),this.hiddenUpdates=we(null),this.identifierPrefix=u,this.onUncaughtError=h,this.onCaughtError=m,this.onRecoverableError=T,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=W,this.incompleteTransitions=new Map}function ly(n,a,s,u,h,m,T,O,W,fe,ye,Te){return n=new pA(n,a,s,T,W,fe,ye,Te,O),a=1,m===!0&&(a|=24),m=ia(3,null,null,a),n.current=m,m.stateNode=n,a=hp(),a.refCount++,n.pooledCache=a,a.refCount++,m.memoizedState={element:u,isDehydrated:s,cache:a},_p(m),n}function uy(n){return n?(n=Qo,n):Qo}function cy(n,a,s,u,h,m){h=uy(h),u.context===null?u.context=h:u.pendingContext=h,u=ds(a),u.payload={element:s},m=m===void 0?null:m,m!==null&&(u.callback=m),s=ps(n,u,a),s!==null&&(Wi(s,n,a),Ru(s,n,a))}function fy(n,a){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var s=n.retryLane;n.retryLane=s!==0&&s<a?s:a}}function Om(n,a){fy(n,a),(n=n.alternate)&&fy(n,a)}function hy(n){if(n.tag===13||n.tag===31){var a=eo(n,67108864);a!==null&&Wi(a,n,67108864),Om(n,67108864)}}function dy(n){if(n.tag===13||n.tag===31){var a=la();a=pt(a);var s=eo(n,a);s!==null&&Wi(s,n,a),Om(n,a)}}var ih=!0;function mA(n,a,s,u){var h=H.T;H.T=null;var m=G.p;try{G.p=2,Pm(n,a,s,u)}finally{G.p=m,H.T=h}}function _A(n,a,s,u){var h=H.T;H.T=null;var m=G.p;try{G.p=8,Pm(n,a,s,u)}finally{G.p=m,H.T=h}}function Pm(n,a,s,u){if(ih){var h=Fm(u);if(h===null)ym(n,a,u,ah,s),my(n,u);else if(vA(h,n,a,s,u))u.stopPropagation();else if(my(n,u),a&4&&-1<gA.indexOf(n)){for(;h!==null;){var m=fi(h);if(m!==null)switch(m.tag){case 3:if(m=m.stateNode,m.current.memoizedState.isDehydrated){var T=Ue(m.pendingLanes);if(T!==0){var O=m;for(O.pendingLanes|=2,O.entangledLanes|=2;T;){var W=1<<31-Xe(T);O.entanglements[1]|=W,T&=~W}sr(m),($t&6)===0&&(Hf=Ot()+500,ku(0))}}break;case 31:case 13:O=eo(m,2),O!==null&&Wi(O,m,2),Vf(),Om(m,2)}if(m=Fm(u),m===null&&ym(n,a,u,ah,s),m===h)break;h=m}h!==null&&u.stopPropagation()}else ym(n,a,u,null,s)}}function Fm(n){return n=zd(n),Im(n)}var ah=null;function Im(n){if(ah=null,n=Mn(n),n!==null){var a=l(n);if(a===null)n=null;else{var s=a.tag;if(s===13){if(n=c(a),n!==null)return n;n=null}else if(s===31){if(n=f(a),n!==null)return n;n=null}else if(s===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;n=null}else a!==n&&(n=null)}}return ah=n,null}function py(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(dt()){case B:return 2;case A:return 8;case $:case le:return 32;case me:return 268435456;default:return 32}default:return 32}}var zm=!1,bs=null,As=null,Rs=null,ju=new Map,Qu=new Map,Cs=[],gA="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function my(n,a){switch(n){case"focusin":case"focusout":bs=null;break;case"dragenter":case"dragleave":As=null;break;case"mouseover":case"mouseout":Rs=null;break;case"pointerover":case"pointerout":ju.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qu.delete(a.pointerId)}}function Ju(n,a,s,u,h,m){return n===null||n.nativeEvent!==m?(n={blockedOn:a,domEventName:s,eventSystemFlags:u,nativeEvent:m,targetContainers:[h]},a!==null&&(a=fi(a),a!==null&&hy(a)),n):(n.eventSystemFlags|=u,a=n.targetContainers,h!==null&&a.indexOf(h)===-1&&a.push(h),n)}function vA(n,a,s,u,h){switch(a){case"focusin":return bs=Ju(bs,n,a,s,u,h),!0;case"dragenter":return As=Ju(As,n,a,s,u,h),!0;case"mouseover":return Rs=Ju(Rs,n,a,s,u,h),!0;case"pointerover":var m=h.pointerId;return ju.set(m,Ju(ju.get(m)||null,n,a,s,u,h)),!0;case"gotpointercapture":return m=h.pointerId,Qu.set(m,Ju(Qu.get(m)||null,n,a,s,u,h)),!0}return!1}function _y(n){var a=Mn(n.target);if(a!==null){var s=l(a);if(s!==null){if(a=s.tag,a===13){if(a=c(s),a!==null){n.blockedOn=a,ln(n.priority,function(){dy(s)});return}}else if(a===31){if(a=f(s),a!==null){n.blockedOn=a,ln(n.priority,function(){dy(s)});return}}else if(a===3&&s.stateNode.current.memoizedState.isDehydrated){n.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}n.blockedOn=null}function rh(n){if(n.blockedOn!==null)return!1;for(var a=n.targetContainers;0<a.length;){var s=Fm(n.nativeEvent);if(s===null){s=n.nativeEvent;var u=new s.constructor(s.type,s);Id=u,s.target.dispatchEvent(u),Id=null}else return a=fi(s),a!==null&&hy(a),n.blockedOn=s,!1;a.shift()}return!0}function gy(n,a,s){rh(n)&&s.delete(a)}function xA(){zm=!1,bs!==null&&rh(bs)&&(bs=null),As!==null&&rh(As)&&(As=null),Rs!==null&&rh(Rs)&&(Rs=null),ju.forEach(gy),Qu.forEach(gy)}function sh(n,a){n.blockedOn===a&&(n.blockedOn=null,zm||(zm=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,xA)))}var oh=null;function vy(n){oh!==n&&(oh=n,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){oh===n&&(oh=null);for(var a=0;a<n.length;a+=3){var s=n[a],u=n[a+1],h=n[a+2];if(typeof u!="function"){if(Im(u||s)===null)continue;break}var m=fi(s);m!==null&&(n.splice(a,3),a-=3,Fp(m,{pending:!0,data:h,method:s.method,action:u},u,h))}}))}function yl(n){function a(W){return sh(W,n)}bs!==null&&sh(bs,n),As!==null&&sh(As,n),Rs!==null&&sh(Rs,n),ju.forEach(a),Qu.forEach(a);for(var s=0;s<Cs.length;s++){var u=Cs[s];u.blockedOn===n&&(u.blockedOn=null)}for(;0<Cs.length&&(s=Cs[0],s.blockedOn===null);)_y(s),s.blockedOn===null&&Cs.shift();if(s=(n.ownerDocument||n).$$reactFormReplay,s!=null)for(u=0;u<s.length;u+=3){var h=s[u],m=s[u+1],T=h[Mt]||null;if(typeof m=="function")T||vy(s);else if(T){var O=null;if(m&&m.hasAttribute("formAction")){if(h=m,T=m[Mt]||null)O=T.formAction;else if(Im(h)!==null)continue}else O=T.action;typeof O=="function"?s[u+1]=O:(s.splice(u,3),u-=3),vy(s)}}}function xy(){function n(m){m.canIntercept&&m.info==="react-transition"&&m.intercept({handler:function(){return new Promise(function(T){return h=T})},focusReset:"manual",scroll:"manual"})}function a(){h!==null&&(h(),h=null),u||setTimeout(s,20)}function s(){if(!u&&!navigation.transition){var m=navigation.currentEntry;m&&m.url!=null&&navigation.navigate(m.url,{state:m.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var u=!1,h=null;return navigation.addEventListener("navigate",n),navigation.addEventListener("navigatesuccess",a),navigation.addEventListener("navigateerror",a),setTimeout(s,100),function(){u=!0,navigation.removeEventListener("navigate",n),navigation.removeEventListener("navigatesuccess",a),navigation.removeEventListener("navigateerror",a),h!==null&&(h(),h=null)}}}function Bm(n){this._internalRoot=n}lh.prototype.render=Bm.prototype.render=function(n){var a=this._internalRoot;if(a===null)throw Error(i(409));var s=a.current,u=la();cy(s,u,n,a,null,null)},lh.prototype.unmount=Bm.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var a=n.containerInfo;cy(n.current,2,null,n,null,null),Vf(),a[Et]=null}};function lh(n){this._internalRoot=n}lh.prototype.unstable_scheduleHydration=function(n){if(n){var a=At();n={blockedOn:null,target:n,priority:a};for(var s=0;s<Cs.length&&a!==0&&a<Cs[s].priority;s++);Cs.splice(s,0,n),s===0&&_y(n)}};var Sy=e.version;if(Sy!=="19.2.0")throw Error(i(527,Sy,"19.2.0"));G.findDOMNode=function(n){var a=n._reactInternals;if(a===void 0)throw typeof n.render=="function"?Error(i(188)):(n=Object.keys(n).join(","),Error(i(268,n)));return n=d(a),n=n!==null?_(n):null,n=n===null?null:n.stateNode,n};var SA={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uh.isDisabled&&uh.supportsFiber)try{xe=uh.inject(SA),ge=uh}catch{}}return ec.createRoot=function(n,a){if(!r(n))throw Error(i(299));var s=!1,u="",h=Rx,m=Cx,T=wx;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(m=a.onCaughtError),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),a=ly(n,1,!1,null,null,s,u,null,h,m,T,xy),n[Et]=a.current,Sm(n),new Bm(a)},ec.hydrateRoot=function(n,a,s){if(!r(n))throw Error(i(299));var u=!1,h="",m=Rx,T=Cx,O=wx,W=null;return s!=null&&(s.unstable_strictMode===!0&&(u=!0),s.identifierPrefix!==void 0&&(h=s.identifierPrefix),s.onUncaughtError!==void 0&&(m=s.onUncaughtError),s.onCaughtError!==void 0&&(T=s.onCaughtError),s.onRecoverableError!==void 0&&(O=s.onRecoverableError),s.formState!==void 0&&(W=s.formState)),a=ly(n,1,!0,a,s??null,u,h,W,m,T,O,xy),a.context=uy(null),s=a.current,u=la(),u=pt(u),h=ds(u),h.callback=null,ps(s,h,u),s=u,a.current.lanes=s,Ee(a,s),sr(a),n[Et]=a.current,Sm(n),new lh(a)},ec.version="19.2.0",ec}var Dy;function UA(){if(Dy)return Vm.exports;Dy=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),Vm.exports=LA(),Vm.exports}var NA=UA();function Wr(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function cE(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xa={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Pc={duration:.5,overwrite:!1,delay:0},e0,vi,Dn,Ha=1e8,xn=1/Ha,B_=Math.PI*2,OA=B_/4,PA=0,fE=Math.sqrt,FA=Math.cos,IA=Math.sin,ci=function(e){return typeof e=="string"},In=function(e){return typeof e=="function"},ns=function(e){return typeof e=="number"},t0=function(e){return typeof e>"u"},xr=function(e){return typeof e=="object"},Ki=function(e){return e!==!1},n0=function(){return typeof window<"u"},ch=function(e){return In(e)||ci(e)},hE=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ri=Array.isArray,zA=/random\([^)]+\)/g,BA=/,\s*/g,Ly=/(?:-?\.?\d|\.)+/gi,dE=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Vl=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ym=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,pE=/[+-]=-?[.\d]+/,HA=/[^,'"\[\]\s]+/gi,GA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Un,ur,H_,i0,ya={},cd={},mE,_E=function(e){return(cd=nu(e,ya))&&ea},a0=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Fc=function(e,t){return!t&&console.warn(e)},gE=function(e,t){return e&&(ya[e]=t)&&cd&&(cd[e]=t)||ya},Ic=function(){return 0},VA={suppressEvents:!0,isStart:!0,kill:!1},Zh={suppressEvents:!0,kill:!1},kA={suppressEvents:!0},r0={},ks=[],G_={},vE,da={},qm={},Uy=30,Kh=[],s0="",o0=function(e){var t=e[0],i,r;if(xr(t)||In(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Kh.length;r--&&!Kh[r].targetTest(t););i=Kh[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new HE(e[r],i)))||e.splice(r,1);return e},wo=function(e){return e._gsap||o0(Ga(e))[0]._gsap},xE=function(e,t,i){return(i=e[t])&&In(i)?e[t]():t0(i)&&e.getAttribute&&e.getAttribute(t)||i},ji=function(e,t){return(e=e.split(",")).forEach(t)||e},Hn=function(e){return Math.round(e*1e5)/1e5||0},Ln=function(e){return Math.round(e*1e7)/1e7||0},ql=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},XA=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},fd=function(){var e=ks.length,t=ks.slice(0),i,r;for(G_={},ks.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},l0=function(e){return!!(e._initted||e._startAt||e.add)},SE=function(e,t,i,r){ks.length&&!vi&&fd(),e.render(t,i,!!(vi&&t<0&&l0(e))),ks.length&&!vi&&fd()},yE=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(HA).length<2?t:ci(e)?e.trim():e},ME=function(e){return e},Ma=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},WA=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},nu=function(e,t){for(var i in t)e[i]=t[i];return e},Ny=function o(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=xr(t[i])?o(e[i]||(e[i]={}),t[i]):t[i]);return e},hd=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},yc=function(e){var t=e.parent||Un,i=e.keyframes?WA(Ri(e.keyframes)):Ma;if(Ki(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},YA=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},EE=function(e,t,i,r,l){var c=e[r],f;if(l)for(f=t[l];c&&c[l]>f;)c=c._prev;return c?(t._next=c._next,c._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=c,t.parent=t._dp=e,t},wd=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var l=t._prev,c=t._next;l?l._next=c:e[i]===t&&(e[i]=c),c?c._prev=l:e[r]===t&&(e[r]=l),t._next=t._prev=t.parent=null},Ys=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Do=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},qA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},V_=function(e,t,i,r){return e._startAt&&(vi?e._startAt.revert(Zh):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ZA=function o(e){return!e||e._ts&&o(e.parent)},Oy=function(e){return e._repeat?iu(e._tTime,e=e.duration()+e._rDelay)*e:0},iu=function(e,t){var i=Math.floor(e=Ln(e/t));return e&&i===e?i-1:i},dd=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Dd=function(e){return e._end=Ln(e._start+(e._tDur/Math.abs(e._ts||e._rts||xn)||0))},Ld=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ln(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Dd(e),i._dirty||Do(i,e)),e},TE=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=dd(e.rawTime(),t),(!t._dur||jc(0,t.totalDuration(),i)-t._tTime>xn)&&t.render(i,!0)),Do(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-xn}},hr=function(e,t,i,r){return t.parent&&Ys(t),t._start=Ln((ns(i)?i:i||e!==Un?Pa(e,i,t):e._time)+t._delay),t._end=Ln(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),EE(e,t,"_first","_last",e._sort?"_start":0),k_(t)||(e._recent=t),r||TE(e,t),e._ts<0&&Ld(e,e._tTime),e},bE=function(e,t){return(ya.ScrollTrigger||a0("scrollTrigger",t))&&ya.ScrollTrigger.create(t,e)},AE=function(e,t,i,r,l){if(c0(e,t,l),!e._initted)return 1;if(!i&&e._pt&&!vi&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&vE!==ma.frame)return ks.push(e),e._lazy=[l,r],1},KA=function o(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||o(t))},k_=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},jA=function(e,t,i,r){var l=e.ratio,c=t<0||!t&&(!e._start&&KA(e)&&!(!e._initted&&k_(e))||(e._ts<0||e._dp._ts<0)&&!k_(e))?0:1,f=e._rDelay,p=0,d,_,v;if(f&&e._repeat&&(p=jc(0,e._tDur,t),_=iu(p,f),e._yoyo&&_&1&&(c=1-c),_!==iu(e._tTime,f)&&(l=1-c,e.vars.repeatRefresh&&e._initted&&e.invalidate())),c!==l||vi||r||e._zTime===xn||!t&&e._zTime){if(!e._initted&&AE(e,t,r,i,p))return;for(v=e._zTime,e._zTime=t||(i?xn:0),i||(i=t&&!v),e.ratio=c,e._from&&(c=1-c),e._time=0,e._tTime=p,d=e._pt;d;)d.r(c,d.d),d=d._next;t<0&&V_(e,t,i,!0),e._onUpdate&&!i&&ga(e,"onUpdate"),p&&e._repeat&&!i&&e.parent&&ga(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===c&&(c&&Ys(e,1),!i&&!vi&&(ga(e,c?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},QA=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},au=function(e,t,i,r){var l=e._repeat,c=Ln(t)||0,f=e._tTime/e._tDur;return f&&!r&&(e._time*=c/e._dur),e._dur=c,e._tDur=l?l<0?1e10:Ln(c*(l+1)+e._rDelay*l):c,f>0&&!r&&Ld(e,e._tTime=e._tDur*f),e.parent&&Dd(e),i||Do(e.parent,e),e},Py=function(e){return e instanceof Zi?Do(e):au(e,e._dur)},JA={_start:0,endTime:Ic,totalDuration:Ic},Pa=function o(e,t,i){var r=e.labels,l=e._recent||JA,c=e.duration()>=Ha?l.endTime(!1):e._dur,f,p,d;return ci(t)&&(isNaN(t)||t in r)?(p=t.charAt(0),d=t.substr(-1)==="%",f=t.indexOf("="),p==="<"||p===">"?(f>=0&&(t=t.replace(/=/,"")),(p==="<"?l._start:l.endTime(l._repeat>=0))+(parseFloat(t.substr(1))||0)*(d?(f<0?l:i).totalDuration()/100:1)):f<0?(t in r||(r[t]=c),r[t]):(p=parseFloat(t.charAt(f-1)+t.substr(f+1)),d&&i&&(p=p/100*(Ri(i)?i[0]:i).totalDuration()),f>1?o(e,t.substr(0,f-1),i)+p:c+p)):t==null?c:+t},Mc=function(e,t,i){var r=ns(t[1]),l=(r?2:1)+(e<2?0:1),c=t[l],f,p;if(r&&(c.duration=t[1]),c.parent=i,e){for(f=c,p=i;p&&!("immediateRender"in f);)f=p.vars.defaults||{},p=Ki(p.vars.inherit)&&p.parent;c.immediateRender=Ki(f.immediateRender),e<2?c.runBackwards=1:c.startAt=t[l-1]}return new Kn(t[0],c,t[l+1])},js=function(e,t){return e||e===0?t(e):t},jc=function(e,t,i){return i<e?e:i>t?t:i},Ti=function(e,t){return!ci(e)||!(t=GA.exec(e))?"":t[1]},$A=function(e,t,i){return js(i,function(r){return jc(e,t,r)})},X_=[].slice,RE=function(e,t){return e&&xr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&xr(e[0]))&&!e.nodeType&&e!==ur},eR=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var l;return ci(r)&&!t||RE(r,1)?(l=i).push.apply(l,Ga(r)):i.push(r)})||i},Ga=function(e,t,i){return Dn&&!t&&Dn.selector?Dn.selector(e):ci(e)&&!i&&(H_||!ru())?X_.call((t||i0).querySelectorAll(e),0):Ri(e)?eR(e,i):RE(e)?X_.call(e,0):e?[e]:[]},W_=function(e){return e=Ga(e)[0]||Fc("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ga(t,i.querySelectorAll?i:i===e?Fc("Invalid scope")||i0.createElement("div"):e)}},CE=function(e){return e.sort(function(){return .5-Math.random()})},wE=function(e){if(In(e))return e;var t=xr(e)?e:{each:e},i=Lo(t.ease),r=t.from||0,l=parseFloat(t.base)||0,c={},f=r>0&&r<1,p=isNaN(r)||f,d=t.axis,_=r,v=r;return ci(r)?_=v={center:.5,edges:.5,end:1}[r]||0:!f&&p&&(_=r[0],v=r[1]),function(g,x,M){var E=(M||t).length,S=c[E],y,C,F,R,D,N,w,b,L;if(!S){if(L=t.grid==="auto"?0:(t.grid||[1,Ha])[1],!L){for(w=-Ha;w<(w=M[L++].getBoundingClientRect().left)&&L<E;);L<E&&L--}for(S=c[E]=[],y=p?Math.min(L,E)*_-.5:r%L,C=L===Ha?0:p?E*v/L-.5:r/L|0,w=0,b=Ha,N=0;N<E;N++)F=N%L-y,R=C-(N/L|0),S[N]=D=d?Math.abs(d==="y"?R:F):fE(F*F+R*R),D>w&&(w=D),D<b&&(b=D);r==="random"&&CE(S),S.max=w-b,S.min=b,S.v=E=(parseFloat(t.amount)||parseFloat(t.each)*(L>E?E-1:d?d==="y"?E/L:L:Math.max(L,E/L))||0)*(r==="edges"?-1:1),S.b=E<0?l-E:l,S.u=Ti(t.amount||t.each)||0,i=i&&E<0?dR(i):i}return E=(S[g]-S.min)/S.max||0,Ln(S.b+(i?i(E):E)*S.v)+S.u}},Y_=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ln(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(ns(i)?0:Ti(i))}},DE=function(e,t){var i=Ri(e),r,l;return!i&&xr(e)&&(r=i=e.radius||Ha,e.values?(e=Ga(e.values),(l=!ns(e[0]))&&(r*=r)):e=Y_(e.increment)),js(t,i?In(e)?function(c){return l=e(c),Math.abs(l-c)<=r?l:c}:function(c){for(var f=parseFloat(l?c.x:c),p=parseFloat(l?c.y:0),d=Ha,_=0,v=e.length,g,x;v--;)l?(g=e[v].x-f,x=e[v].y-p,g=g*g+x*x):g=Math.abs(e[v]-f),g<d&&(d=g,_=v);return _=!r||d<=r?e[_]:c,l||_===c||ns(c)?_:_+Ti(c)}:Y_(e))},LE=function(e,t,i,r){return js(Ri(e)?!t:i===!0?!!(i=0):!r,function(){return Ri(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},tR=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(l,c){return c(l)},r)}},nR=function(e,t){return function(i){return e(parseFloat(i))+(t||Ti(i))}},iR=function(e,t,i){return NE(e,t,0,1,i)},UE=function(e,t,i){return js(i,function(r){return e[~~t(r)]})},aR=function o(e,t,i){var r=t-e;return Ri(e)?UE(e,o(0,e.length),t):js(i,function(l){return(r+(l-e)%r)%r+e})},rR=function o(e,t,i){var r=t-e,l=r*2;return Ri(e)?UE(e,o(0,e.length-1),t):js(i,function(c){return c=(l+(c-e)%l)%l||0,e+(c>r?l-c:c)})},zc=function(e){return e.replace(zA,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(BA);return LE(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},NE=function(e,t,i,r,l){var c=t-e,f=r-i;return js(l,function(p){return i+((p-e)/c*f||0)})},sR=function o(e,t,i,r){var l=isNaN(e+t)?0:function(x){return(1-x)*e+x*t};if(!l){var c=ci(e),f={},p,d,_,v,g;if(i===!0&&(r=1)&&(i=null),c)e={p:e},t={p:t};else if(Ri(e)&&!Ri(t)){for(_=[],v=e.length,g=v-2,d=1;d<v;d++)_.push(o(e[d-1],e[d]));v--,l=function(M){M*=v;var E=Math.min(g,~~M);return _[E](M-E)},i=t}else r||(e=nu(Ri(e)?[]:{},e));if(!_){for(p in t)u0.call(f,e,p,"get",t[p]);l=function(M){return d0(M,f)||(c?e.p:e)}}}return js(i,l)},Fy=function(e,t,i){var r=e.labels,l=Ha,c,f,p;for(c in r)f=r[c]-t,f<0==!!i&&f&&l>(f=Math.abs(f))&&(p=c,l=f);return p},ga=function(e,t,i){var r=e.vars,l=r[t],c=Dn,f=e._ctx,p,d,_;if(l)return p=r[t+"Params"],d=r.callbackScope||e,i&&ks.length&&fd(),f&&(Dn=f),_=p?l.apply(d,p):l.call(d),Dn=c,_},hc=function(e){return Ys(e),e.scrollTrigger&&e.scrollTrigger.kill(!!vi),e.progress()<1&&ga(e,"onInterrupt"),e},kl,OE=[],PE=function(e){if(e)if(e=!e.name&&e.default||e,n0()||e.headless){var t=e.name,i=In(e),r=t&&!i&&e.init?function(){this._props=[]}:e,l={init:Ic,render:d0,add:u0,kill:ER,modifier:MR,rawVars:0},c={targetTest:0,get:0,getSetter:h0,aliases:{},register:0};if(ru(),e!==r){if(da[t])return;Ma(r,Ma(hd(e,l),c)),nu(r.prototype,nu(l,hd(e,c))),da[r.prop=t]=r,e.targetTest&&(Kh.push(r),r0[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}gE(t,r),e.register&&e.register(ea,r,Qi)}else OE.push(e)},vn=255,dc={aqua:[0,vn,vn],lime:[0,vn,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,vn],navy:[0,0,128],white:[vn,vn,vn],olive:[128,128,0],yellow:[vn,vn,0],orange:[vn,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[vn,0,0],pink:[vn,192,203],cyan:[0,vn,vn],transparent:[vn,vn,vn,0]},Zm=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*vn+.5|0},FE=function(e,t,i){var r=e?ns(e)?[e>>16,e>>8&vn,e&vn]:0:dc.black,l,c,f,p,d,_,v,g,x,M;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),dc[e])r=dc[e];else if(e.charAt(0)==="#"){if(e.length<6&&(l=e.charAt(1),c=e.charAt(2),f=e.charAt(3),e="#"+l+l+c+c+f+f+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&vn,r&vn,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&vn,e&vn]}else if(e.substr(0,3)==="hsl"){if(r=M=e.match(Ly),!t)p=+r[0]%360/360,d=+r[1]/100,_=+r[2]/100,c=_<=.5?_*(d+1):_+d-_*d,l=_*2-c,r.length>3&&(r[3]*=1),r[0]=Zm(p+1/3,l,c),r[1]=Zm(p,l,c),r[2]=Zm(p-1/3,l,c);else if(~e.indexOf("="))return r=e.match(dE),i&&r.length<4&&(r[3]=1),r}else r=e.match(Ly)||dc.transparent;r=r.map(Number)}return t&&!M&&(l=r[0]/vn,c=r[1]/vn,f=r[2]/vn,v=Math.max(l,c,f),g=Math.min(l,c,f),_=(v+g)/2,v===g?p=d=0:(x=v-g,d=_>.5?x/(2-v-g):x/(v+g),p=v===l?(c-f)/x+(c<f?6:0):v===c?(f-l)/x+2:(l-c)/x+4,p*=60),r[0]=~~(p+.5),r[1]=~~(d*100+.5),r[2]=~~(_*100+.5)),i&&r.length<4&&(r[3]=1),r},IE=function(e){var t=[],i=[],r=-1;return e.split(Xs).forEach(function(l){var c=l.match(Vl)||[];t.push.apply(t,c),i.push(r+=c.length+1)}),t.c=i,t},Iy=function(e,t,i){var r="",l=(e+r).match(Xs),c=t?"hsla(":"rgba(",f=0,p,d,_,v;if(!l)return e;if(l=l.map(function(g){return(g=FE(g,t,1))&&c+(t?g[0]+","+g[1]+"%,"+g[2]+"%,"+g[3]:g.join(","))+")"}),i&&(_=IE(e),p=i.c,p.join(r)!==_.c.join(r)))for(d=e.replace(Xs,"1").split(Vl),v=d.length-1;f<v;f++)r+=d[f]+(~p.indexOf(f)?l.shift()||c+"0,0,0,0)":(_.length?_:l.length?l:i).shift());if(!d)for(d=e.split(Xs),v=d.length-1;f<v;f++)r+=d[f]+l[f];return r+d[v]},Xs=(function(){var o="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in dc)o+="|"+e+"\\b";return new RegExp(o+")","gi")})(),oR=/hsl[a]?\(/,zE=function(e){var t=e.join(" "),i;if(Xs.lastIndex=0,Xs.test(t))return i=oR.test(t),e[1]=Iy(e[1],i),e[0]=Iy(e[0],i,IE(e[1])),!0},Bc,ma=(function(){var o=Date.now,e=500,t=33,i=o(),r=i,l=1e3/240,c=l,f=[],p,d,_,v,g,x,M=function E(S){var y=o()-r,C=S===!0,F,R,D,N;if((y>e||y<0)&&(i+=y-t),r+=y,D=r-i,F=D-c,(F>0||C)&&(N=++v.frame,g=D-v.time*1e3,v.time=D=D/1e3,c+=F+(F>=l?4:l-F),R=1),C||(p=d(E)),R)for(x=0;x<f.length;x++)f[x](D,g,N,S)};return v={time:0,frame:0,tick:function(){M(!0)},deltaRatio:function(S){return g/(1e3/(S||60))},wake:function(){mE&&(!H_&&n0()&&(ur=H_=window,i0=ur.document||{},ya.gsap=ea,(ur.gsapVersions||(ur.gsapVersions=[])).push(ea.version),_E(cd||ur.GreenSockGlobals||!ur.gsap&&ur||{}),OE.forEach(PE)),_=typeof requestAnimationFrame<"u"&&requestAnimationFrame,p&&v.sleep(),d=_||function(S){return setTimeout(S,c-v.time*1e3+1|0)},Bc=1,M(2))},sleep:function(){(_?cancelAnimationFrame:clearTimeout)(p),Bc=0,d=Ic},lagSmoothing:function(S,y){e=S||1/0,t=Math.min(y||33,e)},fps:function(S){l=1e3/(S||240),c=v.time*1e3+l},add:function(S,y,C){var F=y?function(R,D,N,w){S(R,D,N,w),v.remove(F)}:S;return v.remove(S),f[C?"unshift":"push"](F),ru(),F},remove:function(S,y){~(y=f.indexOf(S))&&f.splice(y,1)&&x>=y&&x--},_listeners:f},v})(),ru=function(){return!Bc&&ma.wake()},Wt={},lR=/^[\d.\-M][\d.\-,\s]/,uR=/["']/g,cR=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],l=1,c=i.length,f,p,d;l<c;l++)p=i[l],f=l!==c-1?p.lastIndexOf(","):p.length,d=p.substr(0,f),t[r]=isNaN(d)?d.replace(uR,"").trim():+d,r=p.substr(f+1).trim();return t},fR=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},hR=function(e){var t=(e+"").split("("),i=Wt[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[cR(t[1])]:fR(e).split(",").map(yE)):Wt._CE&&lR.test(e)?Wt._CE("",e):i},dR=function(e){return function(t){return 1-e(1-t)}},Lo=function(e,t){return e&&(In(e)?e:Wt[e]||hR(e))||t},ko=function(e,t,i,r){i===void 0&&(i=function(p){return 1-t(1-p)}),r===void 0&&(r=function(p){return p<.5?t(p*2)/2:1-t((1-p)*2)/2});var l={easeIn:t,easeOut:i,easeInOut:r},c;return ji(e,function(f){Wt[f]=ya[f]=l,Wt[c=f.toLowerCase()]=i;for(var p in l)Wt[c+(p==="easeIn"?".in":p==="easeOut"?".out":".inOut")]=Wt[f+"."+p]=l[p]}),l},BE=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Km=function o(e,t,i){var r=t>=1?t:1,l=(i||(e?.3:.45))/(t<1?t:1),c=l/B_*(Math.asin(1/r)||0),f=function(_){return _===1?1:r*Math.pow(2,-10*_)*IA((_-c)*l)+1},p=e==="out"?f:e==="in"?function(d){return 1-f(1-d)}:BE(f);return l=B_/l,p.config=function(d,_){return o(e,d,_)},p},jm=function o(e,t){t===void 0&&(t=1.70158);var i=function(c){return c?--c*c*((t+1)*c+t)+1:0},r=e==="out"?i:e==="in"?function(l){return 1-i(1-l)}:BE(i);return r.config=function(l){return o(e,l)},r};ji("Linear,Quad,Cubic,Quart,Quint,Strong",function(o,e){var t=e<5?e+1:e;ko(o+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Wt.Linear.easeNone=Wt.none=Wt.Linear.easeIn;ko("Elastic",Km("in"),Km("out"),Km());(function(o,e){var t=1/e,i=2*t,r=2.5*t,l=function(f){return f<t?o*f*f:f<i?o*Math.pow(f-1.5/e,2)+.75:f<r?o*(f-=2.25/e)*f+.9375:o*Math.pow(f-2.625/e,2)+.984375};ko("Bounce",function(c){return 1-l(1-c)},l)})(7.5625,2.75);ko("Expo",function(o){return Math.pow(2,10*(o-1))*o+o*o*o*o*o*o*(1-o)});ko("Circ",function(o){return-(fE(1-o*o)-1)});ko("Sine",function(o){return o===1?1:-FA(o*OA)+1});ko("Back",jm("in"),jm("out"),jm());Wt.SteppedEase=Wt.steps=ya.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),l=t?1:0,c=1-xn;return function(f){return((r*jc(0,c,f)|0)+l)*i}}};Pc.ease=Wt["quad.out"];ji("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(o){return s0+=o+","+o+"Params,"});var HE=function(e,t){this.id=PA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:xE,this.set=t?t.getSetter:h0},Hc=(function(){function o(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,au(this,+t.duration,1,1),this.data=t.data,Dn&&(this._ctx=Dn,Dn.data.push(this)),Bc||ma.wake()}var e=o.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,au(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(ru(),!arguments.length)return this._tTime;var l=this._dp;if(l&&l.smoothChildTiming&&this._ts){for(Ld(this,i),!l._dp||l.parent||TE(l,this);l&&l.parent;)l.parent._time!==l._start+(l._ts>=0?l._tTime/l._ts:(l.totalDuration()-l._tTime)/-l._ts)&&l.totalTime(l._tTime,!0),l=l.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&hr(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===xn||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),SE(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Oy(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Oy(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var l=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*l,r):this._repeat?iu(this._tTime,l)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-xn?0:this._rts;if(this._rts===i)return this;var l=this.parent&&this._ts?dd(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-xn?0:this._rts,this.totalTime(jc(-Math.abs(this._delay),this.totalDuration(),l),r!==!1),Dd(this),qA(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ru(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==xn&&(this._tTime-=xn)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=Ln(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&hr(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Ki(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?dd(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=kA);var r=vi;return vi=i,l0(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),vi=r,this},e.globalTime=function(i){for(var r=this,l=arguments.length?i:r.rawTime();r;)l=r._start+l/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):l},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Py(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Py(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Pa(this,i),Ki(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Ki(r)),this._dur||(this._zTime=-xn),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-xn:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-xn,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,l;return!!(!i||this._ts&&this._initted&&i.isActive()&&(l=i.rawTime(!0))>=r&&l<this.endTime(!0)-xn)},e.eventCallback=function(i,r,l){var c=this.vars;return arguments.length>1?(r?(c[i]=r,l&&(c[i+"Params"]=l),i==="onUpdate"&&(this._onUpdate=r)):delete c[i],this):c[i]},e.then=function(i){var r=this,l=r._prom;return new Promise(function(c){var f=In(i)?i:ME,p=function(){var _=r.then;r.then=null,l&&l(),In(f)&&(f=f(r))&&(f.then||f===r)&&(r.then=_),c(f),r.then=_};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?p():r._prom=p})},e.kill=function(){hc(this)},o})();Ma(Hc.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-xn,_prom:0,_ps:!1,_rts:1});var Zi=(function(o){cE(e,o);function e(i,r){var l;return i===void 0&&(i={}),l=o.call(this,i)||this,l.labels={},l.smoothChildTiming=!!i.smoothChildTiming,l.autoRemoveChildren=!!i.autoRemoveChildren,l._sort=Ki(i.sortChildren),Un&&hr(i.parent||Un,Wr(l),r),i.reversed&&l.reverse(),i.paused&&l.paused(!0),i.scrollTrigger&&bE(Wr(l),i.scrollTrigger),l}var t=e.prototype;return t.to=function(r,l,c){return Mc(0,arguments,this),this},t.from=function(r,l,c){return Mc(1,arguments,this),this},t.fromTo=function(r,l,c,f){return Mc(2,arguments,this),this},t.set=function(r,l,c){return l.duration=0,l.parent=this,yc(l).repeatDelay||(l.repeat=0),l.immediateRender=!!l.immediateRender,new Kn(r,l,Pa(this,c),1),this},t.call=function(r,l,c){return hr(this,Kn.delayedCall(0,r,l),c)},t.staggerTo=function(r,l,c,f,p,d,_){return c.duration=l,c.stagger=c.stagger||f,c.onComplete=d,c.onCompleteParams=_,c.parent=this,new Kn(r,c,Pa(this,p)),this},t.staggerFrom=function(r,l,c,f,p,d,_){return c.runBackwards=1,yc(c).immediateRender=Ki(c.immediateRender),this.staggerTo(r,l,c,f,p,d,_)},t.staggerFromTo=function(r,l,c,f,p,d,_,v){return f.startAt=c,yc(f).immediateRender=Ki(f.immediateRender),this.staggerTo(r,l,f,p,d,_,v)},t.render=function(r,l,c){var f=this._time,p=this._dirty?this.totalDuration():this._tDur,d=this._dur,_=r<=0?0:Ln(r),v=this._zTime<0!=r<0&&(this._initted||!d),g,x,M,E,S,y,C,F,R,D,N,w;if(this!==Un&&_>p&&r>=0&&(_=p),_!==this._tTime||c||v){if(f!==this._time&&d&&(_+=this._time-f,r+=this._time-f),g=_,R=this._start,F=this._ts,y=!F,v&&(d||(f=this._zTime),(r||!l)&&(this._zTime=r)),this._repeat){if(N=this._yoyo,S=d+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(S*100+r,l,c);if(g=Ln(_%S),_===p?(E=this._repeat,g=d):(D=Ln(_/S),E=~~D,E&&E===D&&(g=d,E--),g>d&&(g=d)),D=iu(this._tTime,S),!f&&this._tTime&&D!==E&&this._tTime-D*S-this._dur<=0&&(D=E),N&&E&1&&(g=d-g,w=1),E!==D&&!this._lock){var b=N&&D&1,L=b===(N&&E&1);if(E<D&&(b=!b),f=b?0:_%d?d:_,this._lock=1,this.render(f||(w?0:Ln(E*S)),l,!d)._lock=0,this._tTime=_,!l&&this.parent&&ga(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,D=E),f&&f!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,p=this._tDur,L&&(this._lock=2,f=b?d:-1e-4,this.render(f,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!y)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(C=QA(this,Ln(f),Ln(g)),C&&(_-=g-(g=C._start))),this._tTime=_,this._time=g,this._act=!!F,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,f=0),!f&&_&&d&&!l&&!D&&(ga(this,"onStart"),this._tTime!==_))return this;if(g>=f&&r>=0)for(x=this._first;x;){if(M=x._next,(x._act||g>=x._start)&&x._ts&&C!==x){if(x.parent!==this)return this.render(r,l,c);if(x.render(x._ts>0?(g-x._start)*x._ts:(x._dirty?x.totalDuration():x._tDur)+(g-x._start)*x._ts,l,c),g!==this._time||!this._ts&&!y){C=0,M&&(_+=this._zTime=-xn);break}}x=M}else{x=this._last;for(var I=r<0?r:g;x;){if(M=x._prev,(x._act||I<=x._end)&&x._ts&&C!==x){if(x.parent!==this)return this.render(r,l,c);if(x.render(x._ts>0?(I-x._start)*x._ts:(x._dirty?x.totalDuration():x._tDur)+(I-x._start)*x._ts,l,c||vi&&l0(x)),g!==this._time||!this._ts&&!y){C=0,M&&(_+=this._zTime=I?-xn:xn);break}}x=M}}if(C&&!l&&(this.pause(),C.render(g>=f?0:-xn)._zTime=g>=f?1:-1,this._ts))return this._start=R,Dd(this),this.render(r,l,c);this._onUpdate&&!l&&ga(this,"onUpdate",!0),(_===p&&this._tTime>=this.totalDuration()||!_&&f)&&(R===this._start||Math.abs(F)!==Math.abs(this._ts))&&(this._lock||((r||!d)&&(_===p&&this._ts>0||!_&&this._ts<0)&&Ys(this,1),!l&&!(r<0&&!f)&&(_||f||!p)&&(ga(this,_===p&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(_<p&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,l){var c=this;if(ns(l)||(l=Pa(this,l,r)),!(r instanceof Hc)){if(Ri(r))return r.forEach(function(f){return c.add(f,l)}),this;if(ci(r))return this.addLabel(r,l);if(In(r))r=Kn.delayedCall(0,r);else return this}return this!==r?hr(this,r,l):this},t.getChildren=function(r,l,c,f){r===void 0&&(r=!0),l===void 0&&(l=!0),c===void 0&&(c=!0),f===void 0&&(f=-Ha);for(var p=[],d=this._first;d;)d._start>=f&&(d instanceof Kn?l&&p.push(d):(c&&p.push(d),r&&p.push.apply(p,d.getChildren(!0,l,c)))),d=d._next;return p},t.getById=function(r){for(var l=this.getChildren(1,1,1),c=l.length;c--;)if(l[c].vars.id===r)return l[c]},t.remove=function(r){return ci(r)?this.removeLabel(r):In(r)?this.killTweensOf(r):(r.parent===this&&wd(this,r),r===this._recent&&(this._recent=this._last),Do(this))},t.totalTime=function(r,l){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ln(ma.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),o.prototype.totalTime.call(this,r,l),this._forcing=0,this):this._tTime},t.addLabel=function(r,l){return this.labels[r]=Pa(this,l),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,l,c){var f=Kn.delayedCall(0,l||Ic,c);return f.data="isPause",this._hasPause=1,hr(this,f,Pa(this,r))},t.removePause=function(r){var l=this._first;for(r=Pa(this,r);l;)l._start===r&&l.data==="isPause"&&Ys(l),l=l._next},t.killTweensOf=function(r,l,c){for(var f=this.getTweensOf(r,c),p=f.length;p--;)zs!==f[p]&&f[p].kill(r,l);return this},t.getTweensOf=function(r,l){for(var c=[],f=Ga(r),p=this._first,d=ns(l),_;p;)p instanceof Kn?XA(p._targets,f)&&(d?(!zs||p._initted&&p._ts)&&p.globalTime(0)<=l&&p.globalTime(p.totalDuration())>l:!l||p.isActive())&&c.push(p):(_=p.getTweensOf(f,l)).length&&c.push.apply(c,_),p=p._next;return c},t.tweenTo=function(r,l){l=l||{};var c=this,f=Pa(c,r),p=l,d=p.startAt,_=p.onStart,v=p.onStartParams,g=p.immediateRender,x,M=Kn.to(c,Ma({ease:l.ease||"none",lazy:!1,immediateRender:!1,time:f,overwrite:"auto",duration:l.duration||Math.abs((f-(d&&"time"in d?d.time:c._time))/c.timeScale())||xn,onStart:function(){if(c.pause(),!x){var S=l.duration||Math.abs((f-(d&&"time"in d?d.time:c._time))/c.timeScale());M._dur!==S&&au(M,S,0,1).render(M._time,!0,!0),x=1}_&&_.apply(M,v||[])}},l));return g?M.render(0):M},t.tweenFromTo=function(r,l,c){return this.tweenTo(l,Ma({startAt:{time:Pa(this,r)}},c))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Fy(this,Pa(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Fy(this,Pa(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+xn)},t.shiftChildren=function(r,l,c){c===void 0&&(c=0);var f=this._first,p=this.labels,d;for(r=Ln(r);f;)f._start>=c&&(f._start+=r,f._end+=r),f=f._next;if(l)for(d in p)p[d]>=c&&(p[d]+=r);return Do(this)},t.invalidate=function(r){var l=this._first;for(this._lock=0;l;)l.invalidate(r),l=l._next;return o.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var l=this._first,c;l;)c=l._next,this.remove(l),l=c;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Do(this)},t.totalDuration=function(r){var l=0,c=this,f=c._last,p=Ha,d,_,v;if(arguments.length)return c.timeScale((c._repeat<0?c.duration():c.totalDuration())/(c.reversed()?-r:r));if(c._dirty){for(v=c.parent;f;)d=f._prev,f._dirty&&f.totalDuration(),_=f._start,_>p&&c._sort&&f._ts&&!c._lock?(c._lock=1,hr(c,f,_-f._delay,1)._lock=0):p=_,_<0&&f._ts&&(l-=_,(!v&&!c._dp||v&&v.smoothChildTiming)&&(c._start+=Ln(_/c._ts),c._time-=_,c._tTime-=_),c.shiftChildren(-_,!1,-1/0),p=0),f._end>l&&f._ts&&(l=f._end),f=d;au(c,c===Un&&c._time>l?c._time:l,1,1),c._dirty=0}return c._tDur},e.updateRoot=function(r){if(Un._ts&&(SE(Un,dd(r,Un)),vE=ma.frame),ma.frame>=Uy){Uy+=xa.autoSleep||120;var l=Un._first;if((!l||!l._ts)&&xa.autoSleep&&ma._listeners.length<2){for(;l&&!l._ts;)l=l._next;l||ma.sleep()}}},e})(Hc);Ma(Zi.prototype,{_lock:0,_hasPause:0,_forcing:0});var pR=function(e,t,i,r,l,c,f){var p=new Qi(this._pt,e,t,0,1,YE,null,l),d=0,_=0,v,g,x,M,E,S,y,C;for(p.b=i,p.e=r,i+="",r+="",(y=~r.indexOf("random("))&&(r=zc(r)),c&&(C=[i,r],c(C,e,t),i=C[0],r=C[1]),g=i.match(Ym)||[];v=Ym.exec(r);)M=v[0],E=r.substring(d,v.index),x?x=(x+1)%5:E.substr(-5)==="rgba("&&(x=1),M!==g[_++]&&(S=parseFloat(g[_-1])||0,p._pt={_next:p._pt,p:E||_===1?E:",",s:S,c:M.charAt(1)==="="?ql(S,M)-S:parseFloat(M)-S,m:x&&x<4?Math.round:0},d=Ym.lastIndex);return p.c=d<r.length?r.substring(d,r.length):"",p.fp=f,(pE.test(r)||y)&&(p.e=0),this._pt=p,p},u0=function(e,t,i,r,l,c,f,p,d,_){In(r)&&(r=r(l||0,e,c));var v=e[t],g=i!=="get"?i:In(v)?d?e[t.indexOf("set")||!In(e["get"+t.substr(3)])?t:"get"+t.substr(3)](d):e[t]():v,x=In(v)?d?xR:XE:f0,M;if(ci(r)&&(~r.indexOf("random(")&&(r=zc(r)),r.charAt(1)==="="&&(M=ql(g,r)+(Ti(g)||0),(M||M===0)&&(r=M))),!_||g!==r||q_)return!isNaN(g*r)&&r!==""?(M=new Qi(this._pt,e,t,+g||0,r-(g||0),typeof v=="boolean"?yR:WE,0,x),d&&(M.fp=d),f&&M.modifier(f,this,e),this._pt=M):(!v&&!(t in e)&&a0(t,r),pR.call(this,e,t,g,r,x,p||xa.stringFilter,d))},mR=function(e,t,i,r,l){if(In(e)&&(e=Ec(e,l,t,i,r)),!xr(e)||e.style&&e.nodeType||Ri(e)||hE(e))return ci(e)?Ec(e,l,t,i,r):e;var c={},f;for(f in e)c[f]=Ec(e[f],l,t,i,r);return c},GE=function(e,t,i,r,l,c){var f,p,d,_;if(da[e]&&(f=new da[e]).init(l,f.rawVars?t[e]:mR(t[e],r,l,c,i),i,r,c)!==!1&&(i._pt=p=new Qi(i._pt,l,e,0,1,f.render,f,0,f.priority),i!==kl))for(d=i._ptLookup[i._targets.indexOf(l)],_=f._props.length;_--;)d[f._props[_]]=p;return f},zs,q_,c0=function o(e,t,i){var r=e.vars,l=r.ease,c=r.startAt,f=r.immediateRender,p=r.lazy,d=r.onUpdate,_=r.runBackwards,v=r.yoyoEase,g=r.keyframes,x=r.autoRevert,M=e._dur,E=e._startAt,S=e._targets,y=e.parent,C=y&&y.data==="nested"?y.vars.targets:S,F=e._overwrite==="auto"&&!e0,R=e.timeline,D=r.easeReverse||v,N,w,b,L,I,V,k,J,Y,Q,H,G,te;if(R&&(!g||!l)&&(l="none"),e._ease=Lo(l,Pc.ease),e._rEase=D&&(Lo(D)||e._ease),e._from=!R&&!!r.runBackwards,e._from&&(e.ratio=1),!R||g&&!r.stagger){if(J=S[0]?wo(S[0]).harness:0,G=J&&r[J.prop],N=hd(r,r0),E&&(E._zTime<0&&E.progress(1),t<0&&_&&f&&!x?E.render(-1,!0):E.revert(_&&M?Zh:VA),E._lazy=0),c){if(Ys(e._startAt=Kn.set(S,Ma({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!E&&Ki(p),startAt:null,delay:0,onUpdate:d&&function(){return ga(e,"onUpdate")},stagger:0},c))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vi||!f&&!x)&&e._startAt.revert(Zh),f&&M&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(_&&M&&!E){if(t&&(f=!1),b=Ma({overwrite:!1,data:"isFromStart",lazy:f&&!E&&Ki(p),immediateRender:f,stagger:0,parent:y},N),G&&(b[J.prop]=G),Ys(e._startAt=Kn.set(S,b)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vi?e._startAt.revert(Zh):e._startAt.render(-1,!0)),e._zTime=t,!f)o(e._startAt,xn,xn);else if(!t)return}for(e._pt=e._ptCache=0,p=M&&Ki(p)||p&&!M,w=0;w<S.length;w++){if(I=S[w],k=I._gsap||o0(S)[w]._gsap,e._ptLookup[w]=Q={},G_[k.id]&&ks.length&&fd(),H=C===S?w:C.indexOf(I),J&&(Y=new J).init(I,G||N,e,H,C)!==!1&&(e._pt=L=new Qi(e._pt,I,Y.name,0,1,Y.render,Y,0,Y.priority),Y._props.forEach(function(ee){Q[ee]=L}),Y.priority&&(V=1)),!J||G)for(b in N)da[b]&&(Y=GE(b,N,e,H,I,C))?Y.priority&&(V=1):Q[b]=L=u0.call(e,I,b,"get",N[b],H,C,0,r.stringFilter);e._op&&e._op[w]&&e.kill(I,e._op[w]),F&&e._pt&&(zs=e,Un.killTweensOf(I,Q,e.globalTime(t)),te=!e.parent,zs=0),e._pt&&p&&(G_[k.id]=1)}V&&qE(e),e._onInit&&e._onInit(e)}e._onUpdate=d,e._initted=(!e._op||e._pt)&&!te,g&&t<=0&&R.render(Ha,!0,!0)},_R=function(e,t,i,r,l,c,f,p){var d=(e._pt&&e._ptCache||(e._ptCache={}))[t],_,v,g,x;if(!d)for(d=e._ptCache[t]=[],g=e._ptLookup,x=e._targets.length;x--;){if(_=g[x][t],_&&_.d&&_.d._pt)for(_=_.d._pt;_&&_.p!==t&&_.fp!==t;)_=_._next;if(!_)return q_=1,e.vars[t]="+=0",c0(e,f),q_=0,p?Fc(t+" not eligible for reset. Try splitting into individual properties"):1;d.push(_)}for(x=d.length;x--;)v=d[x],_=v._pt||v,_.s=(r||r===0)&&!l?r:_.s+(r||0)+c*_.c,_.c=i-_.s,v.e&&(v.e=Hn(i)+Ti(v.e)),v.b&&(v.b=_.s+Ti(v.b))},gR=function(e,t){var i=e[0]?wo(e[0]).harness:0,r=i&&i.aliases,l,c,f,p;if(!r)return t;l=nu({},t);for(c in r)if(c in l)for(p=r[c].split(","),f=p.length;f--;)l[p[f]]=l[c];return l},vR=function(e,t,i,r){var l=t.ease||r||"power1.inOut",c,f;if(Ri(t))f=i[e]||(i[e]=[]),t.forEach(function(p,d){return f.push({t:d/(t.length-1)*100,v:p,e:l})});else for(c in t)f=i[c]||(i[c]=[]),c==="ease"||f.push({t:parseFloat(e),v:t[c],e:l})},Ec=function(e,t,i,r,l){return In(e)?e.call(t,i,r,l):ci(e)&&~e.indexOf("random(")?zc(e):e},VE=s0+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",kE={};ji(VE+",id,stagger,delay,duration,paused,scrollTrigger",function(o){return kE[o]=1});var Kn=(function(o){cE(e,o);function e(i,r,l,c){var f;typeof r=="number"&&(l.duration=r,r=l,l=null),f=o.call(this,c?r:yc(r))||this;var p=f.vars,d=p.duration,_=p.delay,v=p.immediateRender,g=p.stagger,x=p.overwrite,M=p.keyframes,E=p.defaults,S=p.scrollTrigger,y=r.parent||Un,C=(Ri(i)||hE(i)?ns(i[0]):"length"in r)?[i]:Ga(i),F,R,D,N,w,b,L,I;if(f._targets=C.length?o0(C):Fc("GSAP target "+i+" not found. https://gsap.com",!xa.nullTargetWarn)||[],f._ptLookup=[],f._overwrite=x,M||g||ch(d)||ch(_)){r=f.vars;var V=r.easeReverse||r.yoyoEase;if(F=f.timeline=new Zi({data:"nested",defaults:E||{},targets:y&&y.data==="nested"?y.vars.targets:C}),F.kill(),F.parent=F._dp=Wr(f),F._start=0,g||ch(d)||ch(_)){if(N=C.length,L=g&&wE(g),xr(g))for(w in g)~VE.indexOf(w)&&(I||(I={}),I[w]=g[w]);for(R=0;R<N;R++)D=hd(r,kE),D.stagger=0,V&&(D.easeReverse=V),I&&nu(D,I),b=C[R],D.duration=+Ec(d,Wr(f),R,b,C),D.delay=(+Ec(_,Wr(f),R,b,C)||0)-f._delay,!g&&N===1&&D.delay&&(f._delay=_=D.delay,f._start+=_,D.delay=0),F.to(b,D,L?L(R,b,C):0),F._ease=Wt.none;F.duration()?d=_=0:f.timeline=0}else if(M){yc(Ma(F.vars.defaults,{ease:"none"})),F._ease=Lo(M.ease||r.ease||"none");var k=0,J,Y,Q;if(Ri(M))M.forEach(function(H){return F.to(C,H,">")}),F.duration();else{D={};for(w in M)w==="ease"||w==="easeEach"||vR(w,M[w],D,M.easeEach);for(w in D)for(J=D[w].sort(function(H,G){return H.t-G.t}),k=0,R=0;R<J.length;R++)Y=J[R],Q={ease:Y.e,duration:(Y.t-(R?J[R-1].t:0))/100*d},Q[w]=Y.v,F.to(C,Q,k),k+=Q.duration;F.duration()<d&&F.to({},{duration:d-F.duration()})}}d||f.duration(d=F.duration())}else f.timeline=0;return x===!0&&!e0&&(zs=Wr(f),Un.killTweensOf(C),zs=0),hr(y,Wr(f),l),r.reversed&&f.reverse(),r.paused&&f.paused(!0),(v||!d&&!M&&f._start===Ln(y._time)&&Ki(v)&&ZA(Wr(f))&&y.data!=="nested")&&(f._tTime=-xn,f.render(Math.max(0,-_)||0)),S&&bE(Wr(f),S),f}var t=e.prototype;return t.render=function(r,l,c){var f=this._time,p=this._tDur,d=this._dur,_=r<0,v=r>p-xn&&!_?p:r<xn?0:r,g,x,M,E,S,y,C,F;if(!d)jA(this,r,l,c);else if(v!==this._tTime||!r||c||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==_||this._lazy){if(g=v,F=this.timeline,this._repeat){if(E=d+this._rDelay,this._repeat<-1&&_)return this.totalTime(E*100+r,l,c);if(g=Ln(v%E),v===p?(M=this._repeat,g=d):(S=Ln(v/E),M=~~S,M&&M===S?(g=d,M--):g>d&&(g=d)),y=this._yoyo&&M&1,y&&(g=d-g),S=iu(this._tTime,E),g===f&&!c&&this._initted&&M===S)return this._tTime=v,this;M!==S&&this.vars.repeatRefresh&&!y&&!this._lock&&g!==E&&this._initted&&(this._lock=c=1,this.render(Ln(E*M),!0).invalidate()._lock=0)}if(!this._initted){if(AE(this,_?r:g,c,l,v))return this._tTime=0,this;if(f!==this._time&&!(c&&this.vars.repeatRefresh&&M!==S))return this;if(d!==this._dur)return this.render(r,l,c)}if(this._rEase){var R=g<f;if(R!==this._inv){var D=R?f:d-f;this._inv=R,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=f,this._invRecip=D?(R?-1:1)/D:0,this._invScale=R?-this.ratio:1-this.ratio,this._invEase=R?this._rEase:this._ease}this.ratio=C=this._invRatio+this._invScale*this._invEase((g-this._invTime)*this._invRecip)}else this.ratio=C=this._ease(g/d);if(this._from&&(this.ratio=C=1-C),this._tTime=v,this._time=g,!this._act&&this._ts&&(this._act=1,this._lazy=0),!f&&v&&!l&&!S&&(ga(this,"onStart"),this._tTime!==v))return this;for(x=this._pt;x;)x.r(C,x.d),x=x._next;F&&F.render(r<0?r:F._dur*F._ease(g/this._dur),l,c)||this._startAt&&(this._zTime=r),this._onUpdate&&!l&&(_&&V_(this,r,l,c),ga(this,"onUpdate")),this._repeat&&M!==S&&this.vars.onRepeat&&!l&&this.parent&&ga(this,"onRepeat"),(v===this._tDur||!v)&&this._tTime===v&&(_&&!this._onUpdate&&V_(this,r,!0,!0),(r||!d)&&(v===this._tDur&&this._ts>0||!v&&this._ts<0)&&Ys(this,1),!l&&!(_&&!f)&&(v||f||y)&&(ga(this,v===p?"onComplete":"onReverseComplete",!0),this._prom&&!(v<p&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),o.prototype.invalidate.call(this,r)},t.resetTo=function(r,l,c,f,p){Bc||ma.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),_;return this._initted||c0(this,d),_=this._ease(d/this._dur),_R(this,r,l,c,f,_,d,p)?this.resetTo(r,l,c,f,1):(Ld(this,0),this.parent||EE(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,l){if(l===void 0&&(l="all"),!r&&(!l||l==="all"))return this._lazy=this._pt=0,this.parent?hc(this):this.scrollTrigger&&this.scrollTrigger.kill(!!vi),this;if(this.timeline){var c=this.timeline.totalDuration();return this.timeline.killTweensOf(r,l,zs&&zs.vars.overwrite!==!0)._first||hc(this),this.parent&&c!==this.timeline.totalDuration()&&au(this,this._dur*this.timeline._tDur/c,0,1),this}var f=this._targets,p=r?Ga(r):f,d=this._ptLookup,_=this._pt,v,g,x,M,E,S,y;if((!l||l==="all")&&YA(f,p))return l==="all"&&(this._pt=0),hc(this);for(v=this._op=this._op||[],l!=="all"&&(ci(l)&&(E={},ji(l,function(C){return E[C]=1}),l=E),l=gR(f,l)),y=f.length;y--;)if(~p.indexOf(f[y])){g=d[y],l==="all"?(v[y]=l,M=g,x={}):(x=v[y]=v[y]||{},M=l);for(E in M)S=g&&g[E],S&&((!("kill"in S.d)||S.d.kill(E)===!0)&&wd(this,S,"_pt"),delete g[E]),x!=="all"&&(x[E]=1)}return this._initted&&!this._pt&&_&&hc(this),this},e.to=function(r,l){return new e(r,l,arguments[2])},e.from=function(r,l){return Mc(1,arguments)},e.delayedCall=function(r,l,c,f){return new e(l,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:l,onReverseComplete:l,onCompleteParams:c,onReverseCompleteParams:c,callbackScope:f})},e.fromTo=function(r,l,c){return Mc(2,arguments)},e.set=function(r,l){return l.duration=0,l.repeatDelay||(l.repeat=0),new e(r,l)},e.killTweensOf=function(r,l,c){return Un.killTweensOf(r,l,c)},e})(Hc);Ma(Kn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ji("staggerTo,staggerFrom,staggerFromTo",function(o){Kn[o]=function(){var e=new Zi,t=X_.call(arguments,0);return t.splice(o==="staggerFromTo"?5:4,0,0),e[o].apply(e,t)}});var f0=function(e,t,i){return e[t]=i},XE=function(e,t,i){return e[t](i)},xR=function(e,t,i,r){return e[t](r.fp,i)},SR=function(e,t,i){return e.setAttribute(t,i)},h0=function(e,t){return In(e[t])?XE:t0(e[t])&&e.setAttribute?SR:f0},WE=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},yR=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},YE=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},d0=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},MR=function(e,t,i,r){for(var l=this._pt,c;l;)c=l._next,l.p===r&&l.modifier(e,t,i),l=c},ER=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?wd(this,t,"_pt"):t.dep||(i=1),t=r;return!i},TR=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},qE=function(e){for(var t=e._pt,i,r,l,c;t;){for(i=t._next,r=l;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:c)?t._prev._next=t:l=t,(t._next=r)?r._prev=t:c=t,t=i}e._pt=l},Qi=(function(){function o(t,i,r,l,c,f,p,d,_){this.t=i,this.s=l,this.c=c,this.p=r,this.r=f||WE,this.d=p||this,this.set=d||f0,this.pr=_||0,this._next=t,t&&(t._prev=this)}var e=o.prototype;return e.modifier=function(i,r,l){this.mSet=this.mSet||this.set,this.set=TR,this.m=i,this.mt=l,this.tween=r},o})();ji(s0+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(o){return r0[o]=1});ya.TweenMax=ya.TweenLite=Kn;ya.TimelineLite=ya.TimelineMax=Zi;Un=new Zi({sortChildren:!1,defaults:Pc,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});xa.stringFilter=zE;var Uo=[],jh={},bR=[],zy=0,AR=0,Qm=function(e){return(jh[e]||bR).map(function(t){return t()})},Z_=function(){var e=Date.now(),t=[];e-zy>2&&(Qm("matchMediaInit"),Uo.forEach(function(i){var r=i.queries,l=i.conditions,c,f,p,d;for(f in r)c=ur.matchMedia(r[f]).matches,c&&(p=1),c!==l[f]&&(l[f]=c,d=1);d&&(i.revert(),p&&t.push(i))}),Qm("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),zy=e,Qm("matchMedia"))},ZE=(function(){function o(t,i){this.selector=i&&W_(i),this.data=[],this._r=[],this.isReverted=!1,this.id=AR++,t&&this.add(t)}var e=o.prototype;return e.add=function(i,r,l){In(i)&&(l=r,r=i,i=In);var c=this,f=function(){var d=Dn,_=c.selector,v;return d&&d!==c&&d.data.push(c),l&&(c.selector=W_(l)),Dn=c,v=r.apply(c,arguments),In(v)&&c._r.push(v),Dn=d,c.selector=_,c.isReverted=!1,v};return c.last=f,i===In?f(c,function(p){return c.add(null,p)}):i?c[i]=f:f},e.ignore=function(i){var r=Dn;Dn=null,i(this),Dn=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof o?i.push.apply(i,r.getTweens()):r instanceof Kn&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var l=this;if(i?(function(){for(var f=l.getTweens(),p=l.data.length,d;p--;)d=l.data[p],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(_){return f.splice(f.indexOf(_),1)}));for(f.map(function(_){return{g:_._dur||_._delay||_._sat&&!_._sat.vars.immediateRender?_.globalTime(0):-1/0,t:_}}).sort(function(_,v){return v.g-_.g||-1/0}).forEach(function(_){return _.t.revert(i)}),p=l.data.length;p--;)d=l.data[p],d instanceof Zi?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof Kn)&&d.revert&&d.revert(i);l._r.forEach(function(_){return _(i,l)}),l.isReverted=!0})():this.data.forEach(function(f){return f.kill&&f.kill()}),this.clear(),r)for(var c=Uo.length;c--;)Uo[c].id===this.id&&Uo.splice(c,1)},e.revert=function(i){this.kill(i||{})},o})(),RR=(function(){function o(t){this.contexts=[],this.scope=t,Dn&&Dn.data.push(this)}var e=o.prototype;return e.add=function(i,r,l){xr(i)||(i={matches:i});var c=new ZE(0,l||this.scope),f=c.conditions={},p,d,_;Dn&&!c.selector&&(c.selector=Dn.selector),this.contexts.push(c),r=c.add("onMatch",r),c.queries=i;for(d in i)d==="all"?_=1:(p=ur.matchMedia(i[d]),p&&(Uo.indexOf(c)<0&&Uo.push(c),(f[d]=p.matches)&&(_=1),p.addListener?p.addListener(Z_):p.addEventListener("change",Z_)));return _&&r(c,function(v){return c.add(null,v)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},o})(),pd={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return PE(r)})},timeline:function(e){return new Zi(e)},getTweensOf:function(e,t){return Un.getTweensOf(e,t)},getProperty:function(e,t,i,r){ci(e)&&(e=Ga(e)[0]);var l=wo(e||{}).get,c=i?ME:yE;return i==="native"&&(i=""),e&&(t?c((da[t]&&da[t].get||l)(e,t,i,r)):function(f,p,d){return c((da[f]&&da[f].get||l)(e,f,p,d))})},quickSetter:function(e,t,i){if(e=Ga(e),e.length>1){var r=e.map(function(_){return ea.quickSetter(_,t,i)}),l=r.length;return function(_){for(var v=l;v--;)r[v](_)}}e=e[0]||{};var c=da[t],f=wo(e),p=f.harness&&(f.harness.aliases||{})[t]||t,d=c?function(_){var v=new c;kl._pt=0,v.init(e,i?_+i:_,kl,0,[e]),v.render(1,v),kl._pt&&d0(1,kl)}:f.set(e,p);return c?d:function(_){return d(e,p,i?_+i:_,f,1)}},quickTo:function(e,t,i){var r,l=ea.to(e,Ma((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),c=function(p,d,_){return l.resetTo(t,p,d,_)};return c.tween=l,c},isTweening:function(e){return Un.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Lo(e.ease,Pc.ease)),Ny(Pc,e||{})},config:function(e){return Ny(xa,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,l=e.defaults,c=e.extendTimeline;(r||"").split(",").forEach(function(f){return f&&!da[f]&&!ya[f]&&Fc(t+" effect requires "+f+" plugin.")}),qm[t]=function(f,p,d){return i(Ga(f),Ma(p||{},l),d)},c&&(Zi.prototype[t]=function(f,p,d){return this.add(qm[t](f,xr(p)?p:(d=p)&&{},this),d)})},registerEase:function(e,t){Wt[e]=Lo(t)},parseEase:function(e,t){return arguments.length?Lo(e,t):Wt},getById:function(e){return Un.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Zi(e),r,l;for(i.smoothChildTiming=Ki(e.smoothChildTiming),Un.remove(i),i._dp=0,i._time=i._tTime=Un._time,r=Un._first;r;)l=r._next,(t||!(!r._dur&&r instanceof Kn&&r.vars.onComplete===r._targets[0]))&&hr(i,r,r._start-r._delay),r=l;return hr(Un,i,0),i},context:function(e,t){return e?new ZE(e,t):Dn},matchMedia:function(e){return new RR(e)},matchMediaRefresh:function(){return Uo.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||Z_()},addEventListener:function(e,t){var i=jh[e]||(jh[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=jh[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:aR,wrapYoyo:rR,distribute:wE,random:LE,snap:DE,normalize:iR,getUnit:Ti,clamp:$A,splitColor:FE,toArray:Ga,selector:W_,mapRange:NE,pipe:tR,unitize:nR,interpolate:sR,shuffle:CE},install:_E,effects:qm,ticker:ma,updateRoot:Zi.updateRoot,plugins:da,globalTimeline:Un,core:{PropTween:Qi,globals:gE,Tween:Kn,Timeline:Zi,Animation:Hc,getCache:wo,_removeLinkedListItem:wd,reverting:function(){return vi},context:function(e){return e&&Dn&&(Dn.data.push(e),e._ctx=Dn),Dn},suppressOverwrites:function(e){return e0=e}}};ji("to,from,fromTo,delayedCall,set,killTweensOf",function(o){return pd[o]=Kn[o]});ma.add(Zi.updateRoot);kl=pd.to({},{duration:0});var CR=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},wR=function(e,t){var i=e._targets,r,l,c;for(r in t)for(l=i.length;l--;)c=e._ptLookup[l][r],c&&(c=c.d)&&(c._pt&&(c=CR(c,r)),c&&c.modifier&&c.modifier(t[r],e,i[l],r))},Jm=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,l,c){c._onInit=function(f){var p,d;if(ci(l)&&(p={},ji(l,function(_){return p[_]=1}),l=p),t){p={};for(d in l)p[d]=t(l[d]);l=p}wR(f,l)}}}},ea=pd.registerPlugin({name:"attr",init:function(e,t,i,r,l){var c,f,p;this.tween=i;for(c in t)p=e.getAttribute(c)||"",f=this.add(e,"setAttribute",(p||0)+"",t[c],r,l,0,0,c),f.op=c,f.b=p,this._props.push(c)},render:function(e,t){for(var i=t._pt;i;)vi?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Jm("roundProps",Y_),Jm("modifiers"),Jm("snap",DE))||pd;Kn.version=Zi.version=ea.version="3.15.0";mE=1;n0()&&ru();Wt.Power0;Wt.Power1;Wt.Power2;Wt.Power3;Wt.Power4;Wt.Linear;Wt.Quad;Wt.Cubic;Wt.Quart;Wt.Quint;Wt.Strong;Wt.Elastic;Wt.Back;Wt.SteppedEase;Wt.Bounce;Wt.Sine;Wt.Expo;Wt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var By,Bs,Zl,p0,bo,Hy,m0,DR=function(){return typeof window<"u"},is={},Mo=180/Math.PI,Kl=Math.PI/180,Ml=Math.atan2,Gy=1e8,_0=/([A-Z])/g,LR=/(left|right|width|margin|padding|x)/i,UR=/[\s,\(]\S/,dr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},K_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},NR=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},OR=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},PR=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},FR=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},KE=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},jE=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},IR=function(e,t,i){return e.style[t]=i},zR=function(e,t,i){return e.style.setProperty(t,i)},BR=function(e,t,i){return e._gsap[t]=i},HR=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},GR=function(e,t,i,r,l){var c=e._gsap;c.scaleX=c.scaleY=i,c.renderTransform(l,c)},VR=function(e,t,i,r,l){var c=e._gsap;c[t]=i,c.renderTransform(l,c)},Nn="transform",Ji=Nn+"Origin",kR=function o(e,t){var i=this,r=this.target,l=r.style,c=r._gsap;if(e in is&&l){if(this.tfm=this.tfm||{},e!=="transform")e=dr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(f){return i.tfm[f]=Yr(r,f)}):this.tfm[e]=c.x?c[e]:Yr(r,e),e===Ji&&(this.tfm.zOrigin=c.zOrigin);else return dr.transform.split(",").forEach(function(f){return o.call(i,f,t)});if(this.props.indexOf(Nn)>=0)return;c.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ji,t,"")),e=Nn}(l||t)&&this.props.push(e,t,l[e])},QE=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},XR=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,l,c;for(l=0;l<e.length;l+=3)e[l+1]?e[l+1]===2?t[e[l]](e[l+2]):t[e[l]]=e[l+2]:e[l+2]?i[e[l]]=e[l+2]:i.removeProperty(e[l].substr(0,2)==="--"?e[l]:e[l].replace(_0,"-$1").toLowerCase());if(this.tfm){for(c in this.tfm)r[c]=this.tfm[c];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),l=m0(),(!l||!l.isStart)&&!i[Nn]&&(QE(i),r.zOrigin&&i[Ji]&&(i[Ji]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},JE=function(e,t){var i={target:e,props:[],revert:XR,save:kR};return e._gsap||ea.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},$E,j_=function(e,t){var i=Bs.createElementNS?Bs.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Bs.createElement(e);return i&&i.style?i:Bs.createElement(e)},va=function o(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(_0,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&o(e,su(t)||t,1)||""},Vy="O,Moz,ms,Ms,Webkit".split(","),su=function(e,t,i){var r=t||bo,l=r.style,c=5;if(e in l&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);c--&&!(Vy[c]+e in l););return c<0?null:(c===3?"ms":c>=0?Vy[c]:"")+e},Q_=function(){DR()&&window.document&&(By=window,Bs=By.document,Zl=Bs.documentElement,bo=j_("div")||{style:{}},j_("div"),Nn=su(Nn),Ji=Nn+"Origin",bo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",$E=!!su("perspective"),m0=ea.core.reverting,p0=1)},ky=function(e){var t=e.ownerSVGElement,i=j_("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),l;r.style.display="block",i.appendChild(r),Zl.appendChild(i);try{l=r.getBBox()}catch{}return i.removeChild(r),Zl.removeChild(i),l},Xy=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},e1=function(e){var t,i;try{t=e.getBBox()}catch{t=ky(e),i=1}return t&&(t.width||t.height)||i||(t=ky(e)),t&&!t.width&&!t.x&&!t.y?{x:+Xy(e,["x","cx","x1"])||0,y:+Xy(e,["y","cy","y1"])||0,width:0,height:0}:t},t1=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&e1(e))},qs=function(e,t){if(t){var i=e.style,r;t in is&&t!==Ji&&(t=Nn),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(_0,"-$1").toLowerCase())):i.removeAttribute(t)}},Hs=function(e,t,i,r,l,c){var f=new Qi(e._pt,t,i,0,1,c?jE:KE);return e._pt=f,f.b=r,f.e=l,e._props.push(i),f},Wy={deg:1,rad:1,turn:1},WR={grid:1,flex:1},Zs=function o(e,t,i,r){var l=parseFloat(i)||0,c=(i+"").trim().substr((l+"").length)||"px",f=bo.style,p=LR.test(t),d=e.tagName.toLowerCase()==="svg",_=(d?"client":"offset")+(p?"Width":"Height"),v=100,g=r==="px",x=r==="%",M,E,S,y;if(r===c||!l||Wy[r]||Wy[c])return l;if(c!=="px"&&!g&&(l=o(e,t,i,"px")),y=e.getCTM&&t1(e),(x||c==="%")&&(is[t]||~t.indexOf("adius")))return M=y?e.getBBox()[p?"width":"height"]:e[_],Hn(x?l/M*v:l/100*M);if(f[p?"width":"height"]=v+(g?c:r),E=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!d?e:e.parentNode,y&&(E=(e.ownerSVGElement||{}).parentNode),(!E||E===Bs||!E.appendChild)&&(E=Bs.body),S=E._gsap,S&&x&&S.width&&p&&S.time===ma.time&&!S.uncache)return Hn(l/S.width*v);if(x&&(t==="height"||t==="width")){var C=e.style[t];e.style[t]=v+r,M=e[_],C?e.style[t]=C:qs(e,t)}else(x||c==="%")&&!WR[va(E,"display")]&&(f.position=va(e,"position")),E===e&&(f.position="static"),E.appendChild(bo),M=bo[_],E.removeChild(bo),f.position="absolute";return p&&x&&(S=wo(E),S.time=ma.time,S.width=E[_]),Hn(g?M*l/v:M&&l?v/M*l:0)},Yr=function(e,t,i,r){var l;return p0||Q_(),t in dr&&t!=="transform"&&(t=dr[t],~t.indexOf(",")&&(t=t.split(",")[0])),is[t]&&t!=="transform"?(l=Vc(e,r),l=t!=="transformOrigin"?l[t]:l.svg?l.origin:_d(va(e,Ji))+" "+l.zOrigin+"px"):(l=e.style[t],(!l||l==="auto"||r||~(l+"").indexOf("calc("))&&(l=md[t]&&md[t](e,t,i)||va(e,t)||xE(e,t)||(t==="opacity"?1:0))),i&&!~(l+"").trim().indexOf(" ")?Zs(e,t,l,i)+i:l},YR=function(e,t,i,r){if(!i||i==="none"){var l=su(t,e,1),c=l&&va(e,l,1);c&&c!==i?(t=l,i=c):t==="borderColor"&&(i=va(e,"borderTopColor"))}var f=new Qi(this._pt,e.style,t,0,1,YE),p=0,d=0,_,v,g,x,M,E,S,y,C,F,R,D;if(f.b=i,f.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=va(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(E=e.style[t],e.style[t]=r,r=va(e,t)||r,E?e.style[t]=E:qs(e,t)),_=[i,r],zE(_),i=_[0],r=_[1],g=i.match(Vl)||[],D=r.match(Vl)||[],D.length){for(;v=Vl.exec(r);)S=v[0],C=r.substring(p,v.index),M?M=(M+1)%5:(C.substr(-5)==="rgba("||C.substr(-5)==="hsla(")&&(M=1),S!==(E=g[d++]||"")&&(x=parseFloat(E)||0,R=E.substr((x+"").length),S.charAt(1)==="="&&(S=ql(x,S)+R),y=parseFloat(S),F=S.substr((y+"").length),p=Vl.lastIndex-F.length,F||(F=F||xa.units[t]||R,p===r.length&&(r+=F,f.e+=F)),R!==F&&(x=Zs(e,t,E,F)||0),f._pt={_next:f._pt,p:C||d===1?C:",",s:x,c:y-x,m:M&&M<4||t==="zIndex"?Math.round:0});f.c=p<r.length?r.substring(p,r.length):""}else f.r=t==="display"&&r==="none"?jE:KE;return pE.test(r)&&(f.e=0),this._pt=f,f},Yy={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},qR=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Yy[i]||i,t[1]=Yy[r]||r,t.join(" ")},ZR=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,l=t.u,c=i._gsap,f,p,d;if(l==="all"||l===!0)r.cssText="",p=1;else for(l=l.split(","),d=l.length;--d>-1;)f=l[d],is[f]&&(p=1,f=f==="transformOrigin"?Ji:Nn),qs(i,f);p&&(qs(i,Nn),c&&(c.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Vc(i,1),c.uncache=1,QE(r)))}},md={clearProps:function(e,t,i,r,l){if(l.data!=="isFromStart"){var c=e._pt=new Qi(e._pt,t,i,0,0,ZR);return c.u=r,c.pr=-10,c.tween=l,e._props.push(i),1}}},Gc=[1,0,0,1,0,0],n1={},i1=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},qy=function(e){var t=va(e,Nn);return i1(t)?Gc:t.substr(7).match(dE).map(Hn)},g0=function(e,t){var i=e._gsap||wo(e),r=e.style,l=qy(e),c,f,p,d;return i.svg&&e.getAttribute("transform")?(p=e.transform.baseVal.consolidate().matrix,l=[p.a,p.b,p.c,p.d,p.e,p.f],l.join(",")==="1,0,0,1,0,0"?Gc:l):(l===Gc&&!e.offsetParent&&e!==Zl&&!i.svg&&(p=r.display,r.display="block",c=e.parentNode,(!c||!e.offsetParent&&!e.getBoundingClientRect().width)&&(d=1,f=e.nextElementSibling,Zl.appendChild(e)),l=qy(e),p?r.display=p:qs(e,"display"),d&&(f?c.insertBefore(e,f):c?c.appendChild(e):Zl.removeChild(e))),t&&l.length>6?[l[0],l[1],l[4],l[5],l[12],l[13]]:l)},J_=function(e,t,i,r,l,c){var f=e._gsap,p=l||g0(e,!0),d=f.xOrigin||0,_=f.yOrigin||0,v=f.xOffset||0,g=f.yOffset||0,x=p[0],M=p[1],E=p[2],S=p[3],y=p[4],C=p[5],F=t.split(" "),R=parseFloat(F[0])||0,D=parseFloat(F[1])||0,N,w,b,L;i?p!==Gc&&(w=x*S-M*E)&&(b=R*(S/w)+D*(-E/w)+(E*C-S*y)/w,L=R*(-M/w)+D*(x/w)-(x*C-M*y)/w,R=b,D=L):(N=e1(e),R=N.x+(~F[0].indexOf("%")?R/100*N.width:R),D=N.y+(~(F[1]||F[0]).indexOf("%")?D/100*N.height:D)),r||r!==!1&&f.smooth?(y=R-d,C=D-_,f.xOffset=v+(y*x+C*E)-y,f.yOffset=g+(y*M+C*S)-C):f.xOffset=f.yOffset=0,f.xOrigin=R,f.yOrigin=D,f.smooth=!!r,f.origin=t,f.originIsAbsolute=!!i,e.style[Ji]="0px 0px",c&&(Hs(c,f,"xOrigin",d,R),Hs(c,f,"yOrigin",_,D),Hs(c,f,"xOffset",v,f.xOffset),Hs(c,f,"yOffset",g,f.yOffset)),e.setAttribute("data-svg-origin",R+" "+D)},Vc=function(e,t){var i=e._gsap||new HE(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,l=i.scaleX<0,c="px",f="deg",p=getComputedStyle(e),d=va(e,Ji)||"0",_,v,g,x,M,E,S,y,C,F,R,D,N,w,b,L,I,V,k,J,Y,Q,H,G,te,ee,z,P,ne,_e,Ae,Ne;return _=v=g=E=S=y=C=F=R=0,x=M=1,i.svg=!!(e.getCTM&&t1(e)),p.translate&&((p.translate!=="none"||p.scale!=="none"||p.rotate!=="none")&&(r[Nn]=(p.translate!=="none"?"translate3d("+(p.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(p.rotate!=="none"?"rotate("+p.rotate+") ":"")+(p.scale!=="none"?"scale("+p.scale.split(" ").join(",")+") ":"")+(p[Nn]!=="none"?p[Nn]:"")),r.scale=r.rotate=r.translate="none"),w=g0(e,i.svg),i.svg&&(i.uncache?(te=e.getBBox(),d=i.xOrigin-te.x+"px "+(i.yOrigin-te.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),J_(e,G||d,!!G||i.originIsAbsolute,i.smooth!==!1,w)),D=i.xOrigin||0,N=i.yOrigin||0,w!==Gc&&(V=w[0],k=w[1],J=w[2],Y=w[3],_=Q=w[4],v=H=w[5],w.length===6?(x=Math.sqrt(V*V+k*k),M=Math.sqrt(Y*Y+J*J),E=V||k?Ml(k,V)*Mo:0,C=J||Y?Ml(J,Y)*Mo+E:0,C&&(M*=Math.abs(Math.cos(C*Kl))),i.svg&&(_-=D-(D*V+N*J),v-=N-(D*k+N*Y))):(Ne=w[6],_e=w[7],z=w[8],P=w[9],ne=w[10],Ae=w[11],_=w[12],v=w[13],g=w[14],b=Ml(Ne,ne),S=b*Mo,b&&(L=Math.cos(-b),I=Math.sin(-b),G=Q*L+z*I,te=H*L+P*I,ee=Ne*L+ne*I,z=Q*-I+z*L,P=H*-I+P*L,ne=Ne*-I+ne*L,Ae=_e*-I+Ae*L,Q=G,H=te,Ne=ee),b=Ml(-J,ne),y=b*Mo,b&&(L=Math.cos(-b),I=Math.sin(-b),G=V*L-z*I,te=k*L-P*I,ee=J*L-ne*I,Ae=Y*I+Ae*L,V=G,k=te,J=ee),b=Ml(k,V),E=b*Mo,b&&(L=Math.cos(b),I=Math.sin(b),G=V*L+k*I,te=Q*L+H*I,k=k*L-V*I,H=H*L-Q*I,V=G,Q=te),S&&Math.abs(S)+Math.abs(E)>359.9&&(S=E=0,y=180-y),x=Hn(Math.sqrt(V*V+k*k+J*J)),M=Hn(Math.sqrt(H*H+Ne*Ne)),b=Ml(Q,H),C=Math.abs(b)>2e-4?b*Mo:0,R=Ae?1/(Ae<0?-Ae:Ae):0),i.svg&&(G=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!i1(va(e,Nn)),G&&e.setAttribute("transform",G))),Math.abs(C)>90&&Math.abs(C)<270&&(l?(x*=-1,C+=E<=0?180:-180,E+=E<=0?180:-180):(M*=-1,C+=C<=0?180:-180)),t=t||i.uncache,i.x=_-((i.xPercent=_&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-_)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+c,i.y=v-((i.yPercent=v&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-v)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+c,i.z=g+c,i.scaleX=Hn(x),i.scaleY=Hn(M),i.rotation=Hn(E)+f,i.rotationX=Hn(S)+f,i.rotationY=Hn(y)+f,i.skewX=C+f,i.skewY=F+f,i.transformPerspective=R+c,(i.zOrigin=parseFloat(d.split(" ")[2])||!t&&i.zOrigin||0)&&(r[Ji]=_d(d)),i.xOffset=i.yOffset=0,i.force3D=xa.force3D,i.renderTransform=i.svg?jR:$E?a1:KR,i.uncache=0,i},_d=function(e){return(e=e.split(" "))[0]+" "+e[1]},$m=function(e,t,i){var r=Ti(t);return Hn(parseFloat(t)+parseFloat(Zs(e,"x",i+"px",r)))+r},KR=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,a1(e,t)},po="0deg",tc="0px",mo=") ",a1=function(e,t){var i=t||this,r=i.xPercent,l=i.yPercent,c=i.x,f=i.y,p=i.z,d=i.rotation,_=i.rotationY,v=i.rotationX,g=i.skewX,x=i.skewY,M=i.scaleX,E=i.scaleY,S=i.transformPerspective,y=i.force3D,C=i.target,F=i.zOrigin,R="",D=y==="auto"&&e&&e!==1||y===!0;if(F&&(v!==po||_!==po)){var N=parseFloat(_)*Kl,w=Math.sin(N),b=Math.cos(N),L;N=parseFloat(v)*Kl,L=Math.cos(N),c=$m(C,c,w*L*-F),f=$m(C,f,-Math.sin(N)*-F),p=$m(C,p,b*L*-F+F)}S!==tc&&(R+="perspective("+S+mo),(r||l)&&(R+="translate("+r+"%, "+l+"%) "),(D||c!==tc||f!==tc||p!==tc)&&(R+=p!==tc||D?"translate3d("+c+", "+f+", "+p+") ":"translate("+c+", "+f+mo),d!==po&&(R+="rotate("+d+mo),_!==po&&(R+="rotateY("+_+mo),v!==po&&(R+="rotateX("+v+mo),(g!==po||x!==po)&&(R+="skew("+g+", "+x+mo),(M!==1||E!==1)&&(R+="scale("+M+", "+E+mo),C.style[Nn]=R||"translate(0, 0)"},jR=function(e,t){var i=t||this,r=i.xPercent,l=i.yPercent,c=i.x,f=i.y,p=i.rotation,d=i.skewX,_=i.skewY,v=i.scaleX,g=i.scaleY,x=i.target,M=i.xOrigin,E=i.yOrigin,S=i.xOffset,y=i.yOffset,C=i.forceCSS,F=parseFloat(c),R=parseFloat(f),D,N,w,b,L;p=parseFloat(p),d=parseFloat(d),_=parseFloat(_),_&&(_=parseFloat(_),d+=_,p+=_),p||d?(p*=Kl,d*=Kl,D=Math.cos(p)*v,N=Math.sin(p)*v,w=Math.sin(p-d)*-g,b=Math.cos(p-d)*g,d&&(_*=Kl,L=Math.tan(d-_),L=Math.sqrt(1+L*L),w*=L,b*=L,_&&(L=Math.tan(_),L=Math.sqrt(1+L*L),D*=L,N*=L)),D=Hn(D),N=Hn(N),w=Hn(w),b=Hn(b)):(D=v,b=g,N=w=0),(F&&!~(c+"").indexOf("px")||R&&!~(f+"").indexOf("px"))&&(F=Zs(x,"x",c,"px"),R=Zs(x,"y",f,"px")),(M||E||S||y)&&(F=Hn(F+M-(M*D+E*w)+S),R=Hn(R+E-(M*N+E*b)+y)),(r||l)&&(L=x.getBBox(),F=Hn(F+r/100*L.width),R=Hn(R+l/100*L.height)),L="matrix("+D+","+N+","+w+","+b+","+F+","+R+")",x.setAttribute("transform",L),C&&(x.style[Nn]=L)},QR=function(e,t,i,r,l){var c=360,f=ci(l),p=parseFloat(l)*(f&&~l.indexOf("rad")?Mo:1),d=p-r,_=r+d+"deg",v,g;return f&&(v=l.split("_")[1],v==="short"&&(d%=c,d!==d%(c/2)&&(d+=d<0?c:-c)),v==="cw"&&d<0?d=(d+c*Gy)%c-~~(d/c)*c:v==="ccw"&&d>0&&(d=(d-c*Gy)%c-~~(d/c)*c)),e._pt=g=new Qi(e._pt,t,i,r,d,NR),g.e=_,g.u="deg",e._props.push(i),g},Zy=function(e,t){for(var i in t)e[i]=t[i];return e},JR=function(e,t,i){var r=Zy({},i._gsap),l="perspective,force3D,transformOrigin,svgOrigin",c=i.style,f,p,d,_,v,g,x,M;r.svg?(d=i.getAttribute("transform"),i.setAttribute("transform",""),c[Nn]=t,f=Vc(i,1),qs(i,Nn),i.setAttribute("transform",d)):(d=getComputedStyle(i)[Nn],c[Nn]=t,f=Vc(i,1),c[Nn]=d);for(p in is)d=r[p],_=f[p],d!==_&&l.indexOf(p)<0&&(x=Ti(d),M=Ti(_),v=x!==M?Zs(i,p,d,M):parseFloat(d),g=parseFloat(_),e._pt=new Qi(e._pt,f,p,v,g-v,K_),e._pt.u=M||0,e._props.push(p));Zy(f,r)};ji("padding,margin,Width,Radius",function(o,e){var t="Top",i="Right",r="Bottom",l="Left",c=(e<3?[t,i,r,l]:[t+l,t+i,r+i,r+l]).map(function(f){return e<2?o+f:"border"+f+o});md[e>1?"border"+o:o]=function(f,p,d,_,v){var g,x;if(arguments.length<4)return g=c.map(function(M){return Yr(f,M,d)}),x=g.join(" "),x.split(g[0]).length===5?g[0]:x;g=(_+"").split(" "),x={},c.forEach(function(M,E){return x[M]=g[E]=g[E]||g[(E-1)/2|0]}),f.init(p,x,v)}});var r1={name:"css",register:Q_,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,l){var c=this._props,f=e.style,p=i.vars.startAt,d,_,v,g,x,M,E,S,y,C,F,R,D,N,w,b,L;p0||Q_(),this.styles=this.styles||JE(e),b=this.styles.props,this.tween=i;for(E in t)if(E!=="autoRound"&&(_=t[E],!(da[E]&&GE(E,t,i,r,e,l)))){if(x=typeof _,M=md[E],x==="function"&&(_=_.call(i,r,e,l),x=typeof _),x==="string"&&~_.indexOf("random(")&&(_=zc(_)),M)M(this,e,E,_,i)&&(w=1);else if(E.substr(0,2)==="--")d=(getComputedStyle(e).getPropertyValue(E)+"").trim(),_+="",Xs.lastIndex=0,Xs.test(d)||(S=Ti(d),y=Ti(_),y?S!==y&&(d=Zs(e,E,d,y)+y):S&&(_+=S)),this.add(f,"setProperty",d,_,r,l,0,0,E),c.push(E),b.push(E,0,f[E]);else if(x!=="undefined"){if(p&&E in p?(d=typeof p[E]=="function"?p[E].call(i,r,e,l):p[E],ci(d)&&~d.indexOf("random(")&&(d=zc(d)),Ti(d+"")||d==="auto"||(d+=xa.units[E]||Ti(Yr(e,E))||""),(d+"").charAt(1)==="="&&(d=Yr(e,E))):d=Yr(e,E),g=parseFloat(d),C=x==="string"&&_.charAt(1)==="="&&_.substr(0,2),C&&(_=_.substr(2)),v=parseFloat(_),E in dr&&(E==="autoAlpha"&&(g===1&&Yr(e,"visibility")==="hidden"&&v&&(g=0),b.push("visibility",0,f.visibility),Hs(this,f,"visibility",g?"inherit":"hidden",v?"inherit":"hidden",!v)),E!=="scale"&&E!=="transform"&&(E=dr[E],~E.indexOf(",")&&(E=E.split(",")[0]))),F=E in is,F){if(this.styles.save(E),L=_,x==="string"&&_.substring(0,6)==="var(--"){if(_=va(e,_.substring(4,_.indexOf(")"))),_.substring(0,5)==="calc("){var I=e.style.perspective;e.style.perspective=_,_=va(e,"perspective"),I?e.style.perspective=I:qs(e,"perspective")}v=parseFloat(_)}if(R||(D=e._gsap,D.renderTransform&&!t.parseTransform||Vc(e,t.parseTransform),N=t.smoothOrigin!==!1&&D.smooth,R=this._pt=new Qi(this._pt,f,Nn,0,1,D.renderTransform,D,0,-1),R.dep=1),E==="scale")this._pt=new Qi(this._pt,D,"scaleY",D.scaleY,(C?ql(D.scaleY,C+v):v)-D.scaleY||0,K_),this._pt.u=0,c.push("scaleY",E),E+="X";else if(E==="transformOrigin"){b.push(Ji,0,f[Ji]),_=qR(_),D.svg?J_(e,_,0,N,0,this):(y=parseFloat(_.split(" ")[2])||0,y!==D.zOrigin&&Hs(this,D,"zOrigin",D.zOrigin,y),Hs(this,f,E,_d(d),_d(_)));continue}else if(E==="svgOrigin"){J_(e,_,1,N,0,this);continue}else if(E in n1){QR(this,D,E,g,C?ql(g,C+_):_);continue}else if(E==="smoothOrigin"){Hs(this,D,"smooth",D.smooth,_);continue}else if(E==="force3D"){D[E]=_;continue}else if(E==="transform"){JR(this,_,e);continue}}else E in f||(E=su(E)||E);if(F||(v||v===0)&&(g||g===0)&&!UR.test(_)&&E in f)S=(d+"").substr((g+"").length),v||(v=0),y=Ti(_)||(E in xa.units?xa.units[E]:S),S!==y&&(g=Zs(e,E,d,y)),this._pt=new Qi(this._pt,F?D:f,E,g,(C?ql(g,C+v):v)-g,!F&&(y==="px"||E==="zIndex")&&t.autoRound!==!1?FR:K_),this._pt.u=y||0,F&&L!==_?(this._pt.b=d,this._pt.e=L,this._pt.r=PR):S!==y&&y!=="%"&&(this._pt.b=d,this._pt.r=OR);else if(E in f)YR.call(this,e,E,d,C?C+_:_);else if(E in e)this.add(e,E,d||e[E],C?C+_:_,r,l);else if(E!=="parseTransform"){a0(E,_);continue}F||(E in f?b.push(E,0,f[E]):typeof e[E]=="function"?b.push(E,2,e[E]()):b.push(E,1,d||e[E])),c.push(E)}}w&&qE(this)},render:function(e,t){if(t.tween._time||!m0())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Yr,aliases:dr,getSetter:function(e,t,i){var r=dr[t];return r&&r.indexOf(",")<0&&(t=r),t in is&&t!==Ji&&(e._gsap.x||Yr(e,"x"))?i&&Hy===i?t==="scale"?HR:BR:(Hy=i||{})&&(t==="scale"?GR:VR):e.style&&!t0(e.style[t])?IR:~t.indexOf("-")?zR:h0(e,t)},core:{_removeProperty:qs,_getMatrix:g0}};ea.utils.checkPrefix=su;ea.core.getStyleSaver=JE;(function(o,e,t,i){var r=ji(o+","+e+","+t,function(l){is[l]=1});ji(e,function(l){xa.units[l]="deg",n1[l]=1}),dr[r[13]]=o+","+e,ji(i,function(l){var c=l.split(":");dr[c[1]]=r[c[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ji("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(o){xa.units[o]="px"});ea.registerPlugin(r1);var kc=ea.registerPlugin(r1)||ea;kc.core.Tween;const e_=[[[.38,.33,-.035,.31,-.29,.02,-.69,0,1],[.38,.33,.035,.31,-.29,.02,.69,0,1]],[[.39,.3,-.12,.18,-.27,.02,-.7,.025,.92],[.37,.4,.07,.38,-.35,.02,.68,.065,1.04]],[[.36,.37,-.025,.35,-.32,.02,-.66,.025,1],[.36,.37,.025,.35,-.32,.02,.66,.025,1]],[[.4,.39,.075,.18,-.31,.035,-.7,.015,.82],[.39,.4,.11,.25,-.34,.035,.74,.075,.82]],[[.43,.43,-.12,.39,-.08,.4,-.73,.02,.8],[.43,.43,.12,.39,-.08,.4,.73,.02,.8]],[[.41,.28,-.025,-.03,-.1,.06,-.73,-.055,.85],[.41,.28,.025,-.03,-.1,.06,.73,-.055,.85]]],$R=[.85,1.16,.8,1.05,1.3,1.7],Qh=(o,e=0,t=1)=>Math.min(t,Math.max(e,o)),$_=o=>(o=Qh(o),o*o*(3-2*o)),Ky=(o,e,t)=>o+(e-o)*t,fh=o=>o.map(e=>e.slice());function _o(o){return o<0||o>.28?0:o<.085?$_(o/.085):1-$_((o-.085)/.195)}function jy(o=0){let e=fh(e_[o]),t=fh(e),i=o,r=3,l=0,c=9,f=3.4,p=0,d=9,_=[0,0];return{select(v){if(!e_[v])throw new RangeError("Unknown expression");e=fh(t),i=v,r=0},greet(){d=0},step(v,{still:g=!1,pointer:x=[0,0],tracking:M=!1}={}){const E=Qh(v,0,.04);g||(l+=E,r+=E,c+=E,d+=E);const S=$R[i];g&&(r=S+2);const y=g?1:$_((r-(i===4?.2:.12))/S);let C=1,F=1;if(!g&&r<S+.4){if(i===4){const L=Math.sin(Qh(r/.32)*Math.PI)*.22;C+=L,F+=L}else if(i!==5){const L=_o((r-.04)*(i===1?1.05:1.35));C-=L*.78,F-=L*(i===1?.18:.72)}const b=Math.sin(Math.max(0,r-.32)*13)*Math.exp(-Math.max(0,r-.32)*6)*.095;r>.32&&(C+=b,F+=b*.8)}!g&&l>f&&r>1.8&&(c=0,p++,f=l+3.1+(Math.sin(p*19.3)+1)*1.35);const R=g?0:Math.max(_o(c),p%4===0?_o(c-.33)*.75:0);C*=1-R*.96,F*=1-(g?0:Math.max(_o(c-.023),p%4===0?_o(c-.35)*.75:0))*.96,g||(C*=1-_o(d)*.98,F*=1-_o(d-.13)*.4);const D=g?0:Math.sin(l*1.35)*.012;t=e.map((b,L)=>b.map((I,V)=>Ky(I,e_[i][L][V],y))),t.forEach((b,L)=>{b[1]*=1+D,b[7]+=D*.25;const I=Qh(L===0?C:F,.035,1.25);b[1]*=I,b[3]*=I,b[4]*=I,b[5]*=I});let N=[0,0];if(i===3&&(N=[-.7,.55]),i===1&&(N=[.36,.18]),i===5&&(N=[0,-.18]),M&&!g&&i!==3&&i!==5&&(N=[x[0]*.65,x[1]*.5]),!g){const b=Math.floor(l/2.7),L=Math.sin(b*37.2);if(N[0]+=L*.07,N[1]+=Math.cos(b*21.1)*.035,i===3){const I=Math.sin(l*.72);N[0]+=I*.22}i===2&&t.forEach(I=>I[7]+=Math.sin(l*1.9)*.008),i===4&&r<1.8&&t.forEach(I=>I[7]+=Math.sin(Math.max(0,r-.3)*12)*Math.exp(-Math.max(0,r-.3)*2)*.03)}const w=g?1:1-Math.exp(-E*(M?12:7));return _=_.map((b,L)=>Ky(b,N[L],w)),{eyes:fh(t),gaze:_.slice(),time:l,age:r,state:i,energy:i===5?.45:1,transitioning:r<S+.2}}}}const s1=(o,e,t)=>Math.min(t,Math.max(e,o));function eC(o,e=1){const[t,i,,r,l,c]=o;if(r-l-c<.15&&c<.15){const v=e<.7,g=v?.065:-.018,x=v?.045:0,M=.014;return`M ${-t*94} ${x*100} Q 0 ${(x+g)*100} ${t*94} ${x*100} Q 0 ${(x+g+M*2)*100} ${-t*94} ${(x+M)*100} Z`}const p=[],d=[];for(let v=0;v<=96;v++){const g=-t+2*t*v/96,x=g/t,M=i*Math.pow(Math.max(0,1-Math.pow(Math.abs(x),3.2)),1/3.2),E=s1((c-.1)/.3,0,1),S=Math.max(0,1-x*x),y=(1-E)*Math.min(M,r+.025*x*x)+E*(.39*S+.012),C=(1-E)*Math.max(-M,l+c*S)+E*(.27*S-.012);y>=C&&(p.push([g*100,-y*100]),d.push([g*100,-C*100]))}const _=[...p,...d.reverse()];return _.length?"M "+_.map(v=>v.map(g=>g.toFixed(2)).join(" ")).join(" L ")+" Z":""}function tC({frame:o,intensity:e=1}){const t=mt.useId().replace(/:/g,""),{eyes:i,gaze:r=[0,0],energy:l=1}=o;return X.jsxs("svg",{viewBox:"0 0 340 170",width:"100%",height:"100%",className:"eye-artwork","aria-hidden":"true",children:[X.jsxs("defs",{children:[X.jsxs("linearGradient",{id:t+"light",x1:"0",y1:"0",x2:".18",y2:"1",children:[X.jsx("stop",{stopColor:"#e4faff"}),X.jsx("stop",{offset:".42",stopColor:"#b0e4f2"}),X.jsx("stop",{offset:"1",stopColor:"#579cbd"})]}),X.jsx("filter",{id:t+"bloom",x:"-50%",y:"-80%",width:"200%",height:"260%",children:X.jsx("feGaussianBlur",{stdDeviation:"2.2"})})]}),i.map((c,f)=>{const p=eC(c,l),d=t+"clip"+f,_=c[3]-c[4]-c[5]<.14;return X.jsxs("g",{transform:`translate(${170+c[6]*100+r[0]*2},${85-c[7]*100-r[1]*2}) rotate(${-c[2]*57.296})`,opacity:e*(l<.7?.66:1),children:[X.jsx("defs",{children:X.jsx("clipPath",{id:d,children:X.jsx("path",{d:p})})}),X.jsx("path",{d:p,fill:"#8bdcff",opacity:".26",filter:`url(#${t}bloom)`}),X.jsx("path",{d:p,fill:`url(#${t}light)`}),X.jsxs("g",{clipPath:`url(#${d})`,opacity:_?0:1-s1((c[5]-.1)/.3,0,1),children:[X.jsx("ellipse",{cx:r[0]*11,cy:-r[1]*10+2,rx:c[0]*35,ry:c[1]*62,fill:"#020509"}),X.jsx("ellipse",{cx:r[0]*11-4,cy:-r[1]*10-11,rx:"2.6",ry:"3.7",fill:"#f0fcff",opacity:".75"}),X.jsx("path",{d:`M ${-c[0]*80} ${-c[3]*80} Q 0 ${-c[3]*110} ${c[0]*80} ${-c[3]*80}`,stroke:"#edfcff",strokeWidth:"1.1",opacity:".55",fill:"none"})]})]},f)})]})}const gd=[{name:"Present",copy:"Slow blinks · Direct gaze"},{name:"Curious",copy:"Raised eyelid · Following gaze"},{name:"Listening",copy:"Steady gaze · Small nod"},{name:"Thinking",copy:"Side glance · Brief pause"},{name:"Joyful",copy:"Lifted lower lids · Quick blink"},{name:"Quiet",copy:"Lowered eyelids · Slow breathing"}];function o1({state:o=0,still:e=!1,pulse:t=0,intensity:i=1,interactive:r=!0,className:l=""}){const c=mt.useRef(),f=mt.useRef({state:o,still:e,pulse:t,intensity:i});f.current={state:o,still:e,pulse:t,intensity:i};const[p,d]=mt.useState(()=>jy(o).step(0,{still:!0}));return mt.useEffect(()=>{const _=c.current,v=jy(o);let g=[0,0],x=!1,M,E=0,S=o,y=t,C=!0;const F=_.closest(".echo-art")||_.closest(".hero-product")||_,R=b=>{const L=F.getBoundingClientRect();g=[Math.max(-1,Math.min(1,((b.clientX-L.left)/L.width-.5)*2)),Math.max(-1,Math.min(1,-((b.clientY-L.top)/L.height-.5)*2))],x=!0},D=()=>x=!1;r&&(F.addEventListener("pointermove",R),F.addEventListener("pointerleave",D));const N=new IntersectionObserver(([b])=>C=b.isIntersecting,{rootMargin:"50px"});N.observe(_);const w=b=>{if(M=requestAnimationFrame(w),b-E<30)return;const L=E?Math.min(.04,(b-E)/1e3):1/30;if(E=b,!C||document.hidden)return;const I=f.current,V=S!==I.state;V&&(v.select(I.state),S=I.state),y!==I.pulse&&(V||v.greet(),y=I.pulse),d(v.step(L,{still:I.still,pointer:g,tracking:x}))};return M=requestAnimationFrame(w),()=>{cancelAnimationFrame(M),N.disconnect(),F.removeEventListener("pointermove",R),F.removeEventListener("pointerleave",D)}},[]),X.jsx("div",{ref:c,className:"optics "+l,role:"img","aria-label":gd[o].name+" living-eye expression",children:X.jsx(tC,{frame:p,intensity:i})})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const v0="186",nC=0,Qy=1,iC=2,Jh=1,aC=2,pc=3,Fo=0,$i=1,qr=2,Qr=0,Tc=1,Jy=2,$y=3,eM=4,rC=5,Bl=100,sC=101,oC=102,lC=103,uC=104,cC=200,fC=201,hC=202,dC=203,l1=204,u1=205,pC=206,mC=207,_C=208,gC=209,vC=210,xC=211,SC=212,yC=213,MC=214,eg=0,tg=1,ng=2,Xc=3,ig=4,ag=5,rg=6,sg=7,c1=0,EC=1,TC=2,gr=0,f1=1,h1=2,d1=3,p1=4,m1=5,_1=6,g1=7,v1=300,Io=301,ou=302,t_=303,n_=304,Ud=306,og=1e3,Kr=1001,lg=1002,_i=1003,bC=1004,hh=1005,Ai=1006,i_=1007,Ao=1008,Ba=1009,x1=1010,S1=1011,Wc=1012,x0=1013,Sr=1014,pr=1015,yr=1016,S0=1017,y0=1018,Yc=1020,y1=35902,M1=35899,E1=1021,T1=1022,$a=1023,as=1026,Ro=1027,b1=1028,M0=1029,zo=1030,E0=1031,T0=1033,$h=33776,ed=33777,td=33778,nd=33779,ug=35840,cg=35841,fg=35842,hg=35843,dg=36196,pg=37492,mg=37496,_g=37488,gg=37489,vd=37490,vg=37491,xg=37808,Sg=37809,yg=37810,Mg=37811,Eg=37812,Tg=37813,bg=37814,Ag=37815,Rg=37816,Cg=37817,wg=37818,Dg=37819,Lg=37820,Ug=37821,Ng=36492,Og=36494,Pg=36495,Fg=36283,Ig=36284,xd=36285,zg=36286,AC=3200,tM=0,RC=1,Is="",Fa="srgb",Sd="srgb-linear",yd="linear",on="srgb",a_=7680,CC=519,wC=512,DC=513,LC=514,b0=515,UC=516,NC=517,A0=518,OC=519,PC=35044,nM="300 es",mr=2e3,Md=2001;function FC(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Ed(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function IC(){const o=Ed("canvas");return o.style.display="block",o}const iM={};function aM(...o){const e="THREE."+o.shift();console.log(e,...o)}function A1(o){const e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=o[1];t&&t.isStackTrace?o[0]+=" "+t.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function _t(...o){o=A1(o);const e="THREE."+o.shift();{const t=o[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...o)}}function Qt(...o){o=A1(o);const e="THREE."+o.shift();{const t=o[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...o)}}function jl(...o){const e=o.join(" ");e in iM||(iM[e]=!0,_t(...o))}function zC(o,e,t){return new Promise(function(i,r){function l(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:r();break;case o.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:i()}}setTimeout(l,t)})}const BC={[eg]:tg,[ng]:rg,[ig]:sg,[Xc]:ag,[tg]:eg,[rg]:ng,[sg]:ig,[ag]:Xc};class Xo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const l=r.indexOf(t);l!==-1&&r.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let l=0,c=r.length;l<c;l++)r[l].call(this,e);e.target=null}}}const Si=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],r_=Math.PI/180,Bg=180/Math.PI;function Qc(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Si[o&255]+Si[o>>8&255]+Si[o>>16&255]+Si[o>>24&255]+"-"+Si[e&255]+Si[e>>8&255]+"-"+Si[e>>16&15|64]+Si[e>>24&255]+"-"+Si[t&63|128]+Si[t>>8&255]+"-"+Si[t>>16&255]+Si[t>>24&255]+Si[i&255]+Si[i>>8&255]+Si[i>>16&255]+Si[i>>24&255]).toLowerCase()}function Xt(o,e,t){return Math.max(e,Math.min(t,o))}function HC(o,e){return(o%e+e)%e}function s_(o,e,t){return(1-t)*o+t*e}function nc(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Yi(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const z0=class z0{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),l=this.x-e.x,c=this.y-e.y;return this.x=l*i-c*r+e.x,this.y=l*r+c*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};z0.prototype.isVector2=!0;let en=z0;class cu{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,l,c,f){let p=i[r+0],d=i[r+1],_=i[r+2],v=i[r+3],g=l[c+0],x=l[c+1],M=l[c+2],E=l[c+3];if(v!==E||p!==g||d!==x||_!==M){let S=p*g+d*x+_*M+v*E;S<0&&(g=-g,x=-x,M=-M,E=-E,S=-S);let y=1-f;if(S<.9995){const C=Math.acos(S),F=Math.sin(C);y=Math.sin(y*C)/F,f=Math.sin(f*C)/F,p=p*y+g*f,d=d*y+x*f,_=_*y+M*f,v=v*y+E*f}else{p=p*y+g*f,d=d*y+x*f,_=_*y+M*f,v=v*y+E*f;const C=1/Math.sqrt(p*p+d*d+_*_+v*v);p*=C,d*=C,_*=C,v*=C}}e[t]=p,e[t+1]=d,e[t+2]=_,e[t+3]=v}static multiplyQuaternionsFlat(e,t,i,r,l,c){const f=i[r],p=i[r+1],d=i[r+2],_=i[r+3],v=l[c],g=l[c+1],x=l[c+2],M=l[c+3];return e[t]=f*M+_*v+p*x-d*g,e[t+1]=p*M+_*g+d*v-f*x,e[t+2]=d*M+_*x+f*g-p*v,e[t+3]=_*M-f*v-p*g-d*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,l=e._z,c=e._order,f=Math.cos,p=Math.sin,d=f(i/2),_=f(r/2),v=f(l/2),g=p(i/2),x=p(r/2),M=p(l/2);switch(c){case"XYZ":this._x=g*_*v+d*x*M,this._y=d*x*v-g*_*M,this._z=d*_*M+g*x*v,this._w=d*_*v-g*x*M;break;case"YXZ":this._x=g*_*v+d*x*M,this._y=d*x*v-g*_*M,this._z=d*_*M-g*x*v,this._w=d*_*v+g*x*M;break;case"ZXY":this._x=g*_*v-d*x*M,this._y=d*x*v+g*_*M,this._z=d*_*M+g*x*v,this._w=d*_*v-g*x*M;break;case"ZYX":this._x=g*_*v-d*x*M,this._y=d*x*v+g*_*M,this._z=d*_*M-g*x*v,this._w=d*_*v+g*x*M;break;case"YZX":this._x=g*_*v+d*x*M,this._y=d*x*v+g*_*M,this._z=d*_*M-g*x*v,this._w=d*_*v-g*x*M;break;case"XZY":this._x=g*_*v-d*x*M,this._y=d*x*v-g*_*M,this._z=d*_*M+g*x*v,this._w=d*_*v+g*x*M;break;default:_t("Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],l=t[8],c=t[1],f=t[5],p=t[9],d=t[2],_=t[6],v=t[10],g=i+f+v;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(_-p)*x,this._y=(l-d)*x,this._z=(c-r)*x}else if(i>f&&i>v){const x=2*Math.sqrt(1+i-f-v);this._w=(_-p)/x,this._x=.25*x,this._y=(r+c)/x,this._z=(l+d)/x}else if(f>v){const x=2*Math.sqrt(1+f-i-v);this._w=(l-d)/x,this._x=(r+c)/x,this._y=.25*x,this._z=(p+_)/x}else{const x=2*Math.sqrt(1+v-i-f);this._w=(c-r)/x,this._x=(l+d)/x,this._y=(p+_)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,l=e._z,c=e._w,f=t._x,p=t._y,d=t._z,_=t._w;return this._x=i*_+c*f+r*d-l*p,this._y=r*_+c*p+l*f-i*d,this._z=l*_+c*d+i*p-r*f,this._w=c*_-i*f-r*p-l*d,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,l=e._z,c=e._w,f=this.dot(e);f<0&&(i=-i,r=-r,l=-l,c=-c,f=-f);let p=1-t;if(f<.9995){const d=Math.acos(f),_=Math.sin(d);p=Math.sin(p*d)/_,t=Math.sin(t*d)/_,this._x=this._x*p+i*t,this._y=this._y*p+r*t,this._z=this._z*p+l*t,this._w=this._w*p+c*t,this._onChangeCallback()}else this._x=this._x*p+i*t,this._y=this._y*p+r*t,this._z=this._z*p+l*t,this._w=this._w*p+c*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),l=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const B0=class B0{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rM.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rM.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,l=e.elements;return this.x=l[0]*t+l[3]*i+l[6]*r,this.y=l[1]*t+l[4]*i+l[7]*r,this.z=l[2]*t+l[5]*i+l[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,l=e.elements,c=1/(l[3]*t+l[7]*i+l[11]*r+l[15]);return this.x=(l[0]*t+l[4]*i+l[8]*r+l[12])*c,this.y=(l[1]*t+l[5]*i+l[9]*r+l[13])*c,this.z=(l[2]*t+l[6]*i+l[10]*r+l[14])*c,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,l=e.x,c=e.y,f=e.z,p=e.w,d=2*(c*r-f*i),_=2*(f*t-l*r),v=2*(l*i-c*t);return this.x=t+p*d+c*v-f*_,this.y=i+p*_+f*d-l*v,this.z=r+p*v+l*_-c*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,l=e.elements;return this.x=l[0]*t+l[4]*i+l[8]*r,this.y=l[1]*t+l[5]*i+l[9]*r,this.z=l[2]*t+l[6]*i+l[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this.z=Xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this.z=Xt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,l=e.z,c=t.x,f=t.y,p=t.z;return this.x=r*p-l*f,this.y=l*c-i*p,this.z=i*f-r*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return o_.copy(this).projectOnVector(e),this.sub(o_)}reflect(e){return this.sub(o_.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};B0.prototype.isVector3=!0;let de=B0;const o_=new de,rM=new cu,H0=class H0{constructor(e,t,i,r,l,c,f,p,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,l,c,f,p,d)}set(e,t,i,r,l,c,f,p,d){const _=this.elements;return _[0]=e,_[1]=r,_[2]=f,_[3]=t,_[4]=l,_[5]=p,_[6]=i,_[7]=c,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,l=this.elements,c=i[0],f=i[3],p=i[6],d=i[1],_=i[4],v=i[7],g=i[2],x=i[5],M=i[8],E=r[0],S=r[3],y=r[6],C=r[1],F=r[4],R=r[7],D=r[2],N=r[5],w=r[8];return l[0]=c*E+f*C+p*D,l[3]=c*S+f*F+p*N,l[6]=c*y+f*R+p*w,l[1]=d*E+_*C+v*D,l[4]=d*S+_*F+v*N,l[7]=d*y+_*R+v*w,l[2]=g*E+x*C+M*D,l[5]=g*S+x*F+M*N,l[8]=g*y+x*R+M*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8];return t*c*_-t*f*d-i*l*_+i*f*p+r*l*d-r*c*p}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8],v=_*c-f*d,g=f*p-_*l,x=d*l-c*p,M=t*v+i*g+r*x;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=v*E,e[1]=(r*d-_*i)*E,e[2]=(f*i-r*c)*E,e[3]=g*E,e[4]=(_*t-r*p)*E,e[5]=(r*l-f*t)*E,e[6]=x*E,e[7]=(i*p-d*t)*E,e[8]=(c*t-i*l)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,l,c,f){const p=Math.cos(l),d=Math.sin(l);return this.set(i*p,i*d,-i*(p*c+d*f)+c+e,-r*d,r*p,-r*(-d*c+p*f)+f+t,0,0,1),this}scale(e,t){return jl("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(l_.makeScale(e,t)),this}rotate(e){return jl("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(l_.makeRotation(-e)),this}translate(e,t){return jl("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(l_.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};H0.prototype.isMatrix3=!0;let xt=H0;const l_=new xt,sM=new xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),oM=new xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function GC(){const o={enabled:!0,workingColorSpace:Sd,spaces:{},convert:function(r,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===on&&(r.r=Jr(r.r),r.g=Jr(r.g),r.b=Jr(r.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(r.applyMatrix3(this.spaces[l].toXYZ),r.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===on&&(r.r=Ql(r.r),r.g=Ql(r.g),r.b=Ql(r.b))),r},workingToColorSpace:function(r,l){return this.convert(r,this.workingColorSpace,l)},colorSpaceToWorking:function(r,l){return this.convert(r,l,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Is?yd:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,l=this.workingColorSpace){return r.fromArray(this.spaces[l].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,l,c){return r.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,l){return jl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(r,l)},toWorkingColorSpace:function(r,l){return jl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(r,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return o.define({[Sd]:{primaries:e,whitePoint:i,transfer:yd,toXYZ:sM,fromXYZ:oM,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Fa},outputColorSpaceConfig:{drawingBufferColorSpace:Fa}},[Fa]:{primaries:e,whitePoint:i,transfer:on,toXYZ:sM,fromXYZ:oM,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Fa}}}),o}const kt=GC();function Jr(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Ql(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let El;class VC{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{El===void 0&&(El=Ed("canvas")),El.width=e.width,El.height=e.height;const r=El.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=El}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ed("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),l=r.data;for(let c=0;c<l.length;c++)l[c]=Jr(l[c]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Jr(t[i]/255)*255):t[i]=Jr(t[i]);return{data:t,width:e.width,height:e.height}}else return _t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kC=0;class R0{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:kC++}),this.uuid=Qc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let l;if(Array.isArray(r)){l=[];for(let c=0,f=r.length;c<f;c++)r[c].isDataTexture?l.push(u_(r[c].image)):l.push(u_(r[c]))}else l=u_(r);i.url=l}return t||(e.images[this.uuid]=i),i}}function u_(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?VC.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(_t("Texture: Unable to serialize Texture."),{})}let XC=0;const c_=new de;class Bi extends Xo{constructor(e=Bi.DEFAULT_IMAGE,t=Bi.DEFAULT_MAPPING,i=Kr,r=Kr,l=Ai,c=Ao,f=$a,p=Ba,d=Bi.DEFAULT_ANISOTROPY,_=Is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:XC++}),this.uuid=Qc(),this.name="",this.source=new R0(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=l,this.minFilter=c,this.anisotropy=d,this.format=f,this.internalFormat=null,this.type=p,this.offset=new en(0,0),this.repeat=new en(1,1),this.center=new en(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(c_).x}get height(){return this.source.getSize(c_).y}get depth(){return this.source.getSize(c_).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){_t(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){_t(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==v1)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case og:e.x=e.x-Math.floor(e.x);break;case Kr:e.x=e.x<0?0:1;break;case lg:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case og:e.y=e.y-Math.floor(e.y);break;case Kr:e.y=e.y<0?0:1;break;case lg:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bi.DEFAULT_IMAGE=null;Bi.DEFAULT_MAPPING=v1;Bi.DEFAULT_ANISOTROPY=1;const G0=class G0{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,l=this.w,c=e.elements;return this.x=c[0]*t+c[4]*i+c[8]*r+c[12]*l,this.y=c[1]*t+c[5]*i+c[9]*r+c[13]*l,this.z=c[2]*t+c[6]*i+c[10]*r+c[14]*l,this.w=c[3]*t+c[7]*i+c[11]*r+c[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,l;const p=e.elements,d=p[0],_=p[4],v=p[8],g=p[1],x=p[5],M=p[9],E=p[2],S=p[6],y=p[10];if(Math.abs(_-g)<.01&&Math.abs(v-E)<.01&&Math.abs(M-S)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+E)<.1&&Math.abs(M+S)<.1&&Math.abs(d+x+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const F=(d+1)/2,R=(x+1)/2,D=(y+1)/2,N=(_+g)/4,w=(v+E)/4,b=(M+S)/4;return F>R&&F>D?F<.01?(i=0,r=.707106781,l=.707106781):(i=Math.sqrt(F),r=N/i,l=w/i):R>D?R<.01?(i=.707106781,r=0,l=.707106781):(r=Math.sqrt(R),i=N/r,l=b/r):D<.01?(i=.707106781,r=.707106781,l=0):(l=Math.sqrt(D),i=w/l,r=b/l),this.set(i,r,l,t),this}let C=Math.sqrt((S-M)*(S-M)+(v-E)*(v-E)+(g-_)*(g-_));return Math.abs(C)<.001&&(C=1),this.x=(S-M)/C,this.y=(v-E)/C,this.z=(g-_)/C,this.w=Math.acos((d+x+y-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this.z=Xt(this.z,e.z,t.z),this.w=Xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this.z=Xt(this.z,e,t),this.w=Xt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};G0.prototype.isVector4=!0;let Fn=G0;class WC extends Xo{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Fn(0,0,e,t),this.scissorTest=!1,this.viewport=new Fn(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},l=new Bi(r),c=i.count;for(let f=0;f<c;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ai,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,l=this.textures.length;r<l;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new R0(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class er extends WC{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class R1 extends Bi{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_i,this.minFilter=_i,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class YC extends Bi{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_i,this.minFilter=_i,this.wrapR=Kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Cd=class Cd{constructor(e,t,i,r,l,c,f,p,d,_,v,g,x,M,E,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,l,c,f,p,d,_,v,g,x,M,E,S)}set(e,t,i,r,l,c,f,p,d,_,v,g,x,M,E,S){const y=this.elements;return y[0]=e,y[4]=t,y[8]=i,y[12]=r,y[1]=l,y[5]=c,y[9]=f,y[13]=p,y[2]=d,y[6]=_,y[10]=v,y[14]=g,y[3]=x,y[7]=M,y[11]=E,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Cd().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Tl.setFromMatrixColumn(e,0).length(),l=1/Tl.setFromMatrixColumn(e,1).length(),c=1/Tl.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*l,t[5]=i[5]*l,t[6]=i[6]*l,t[7]=0,t[8]=i[8]*c,t[9]=i[9]*c,t[10]=i[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,l=e.z,c=Math.cos(i),f=Math.sin(i),p=Math.cos(r),d=Math.sin(r),_=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const g=c*_,x=c*v,M=f*_,E=f*v;t[0]=p*_,t[4]=-p*v,t[8]=d,t[1]=x+M*d,t[5]=g-E*d,t[9]=-f*p,t[2]=E-g*d,t[6]=M+x*d,t[10]=c*p}else if(e.order==="YXZ"){const g=p*_,x=p*v,M=d*_,E=d*v;t[0]=g+E*f,t[4]=M*f-x,t[8]=c*d,t[1]=c*v,t[5]=c*_,t[9]=-f,t[2]=x*f-M,t[6]=E+g*f,t[10]=c*p}else if(e.order==="ZXY"){const g=p*_,x=p*v,M=d*_,E=d*v;t[0]=g-E*f,t[4]=-c*v,t[8]=M+x*f,t[1]=x+M*f,t[5]=c*_,t[9]=E-g*f,t[2]=-c*d,t[6]=f,t[10]=c*p}else if(e.order==="ZYX"){const g=c*_,x=c*v,M=f*_,E=f*v;t[0]=p*_,t[4]=M*d-x,t[8]=g*d+E,t[1]=p*v,t[5]=E*d+g,t[9]=x*d-M,t[2]=-d,t[6]=f*p,t[10]=c*p}else if(e.order==="YZX"){const g=c*p,x=c*d,M=f*p,E=f*d;t[0]=p*_,t[4]=E-g*v,t[8]=M*v+x,t[1]=v,t[5]=c*_,t[9]=-f*_,t[2]=-d*_,t[6]=x*v+M,t[10]=g-E*v}else if(e.order==="XZY"){const g=c*p,x=c*d,M=f*p,E=f*d;t[0]=p*_,t[4]=-v,t[8]=d*_,t[1]=g*v+E,t[5]=c*_,t[9]=x*v-M,t[2]=M*v-x,t[6]=f*_,t[10]=E*v+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qC,e,ZC)}lookAt(e,t,i){const r=this.elements;return ua.subVectors(e,t),ua.lengthSq()===0&&(ua.z=1),ua.normalize(),Ds.crossVectors(i,ua),Ds.lengthSq()===0&&(Math.abs(i.z)===1?ua.x+=1e-4:ua.z+=1e-4,ua.normalize(),Ds.crossVectors(i,ua)),Ds.normalize(),dh.crossVectors(ua,Ds),r[0]=Ds.x,r[4]=dh.x,r[8]=ua.x,r[1]=Ds.y,r[5]=dh.y,r[9]=ua.y,r[2]=Ds.z,r[6]=dh.z,r[10]=ua.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,l=this.elements,c=i[0],f=i[4],p=i[8],d=i[12],_=i[1],v=i[5],g=i[9],x=i[13],M=i[2],E=i[6],S=i[10],y=i[14],C=i[3],F=i[7],R=i[11],D=i[15],N=r[0],w=r[4],b=r[8],L=r[12],I=r[1],V=r[5],k=r[9],J=r[13],Y=r[2],Q=r[6],H=r[10],G=r[14],te=r[3],ee=r[7],z=r[11],P=r[15];return l[0]=c*N+f*I+p*Y+d*te,l[4]=c*w+f*V+p*Q+d*ee,l[8]=c*b+f*k+p*H+d*z,l[12]=c*L+f*J+p*G+d*P,l[1]=_*N+v*I+g*Y+x*te,l[5]=_*w+v*V+g*Q+x*ee,l[9]=_*b+v*k+g*H+x*z,l[13]=_*L+v*J+g*G+x*P,l[2]=M*N+E*I+S*Y+y*te,l[6]=M*w+E*V+S*Q+y*ee,l[10]=M*b+E*k+S*H+y*z,l[14]=M*L+E*J+S*G+y*P,l[3]=C*N+F*I+R*Y+D*te,l[7]=C*w+F*V+R*Q+D*ee,l[11]=C*b+F*k+R*H+D*z,l[15]=C*L+F*J+R*G+D*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],l=e[12],c=e[1],f=e[5],p=e[9],d=e[13],_=e[2],v=e[6],g=e[10],x=e[14],M=e[3],E=e[7],S=e[11],y=e[15],C=p*x-d*g,F=f*x-d*v,R=f*g-p*v,D=c*x-d*_,N=c*g-p*_,w=c*v-f*_;return t*(E*C-S*F+y*R)-i*(M*C-S*D+y*N)+r*(M*F-E*D+y*w)-l*(M*R-E*N+S*w)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],l=e[1],c=e[5],f=e[9],p=e[2],d=e[6],_=e[10];return t*(c*_-f*d)-i*(l*_-f*p)+r*(l*d-c*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8],v=e[9],g=e[10],x=e[11],M=e[12],E=e[13],S=e[14],y=e[15],C=t*f-i*c,F=t*p-r*c,R=t*d-l*c,D=i*p-r*f,N=i*d-l*f,w=r*d-l*p,b=_*E-v*M,L=_*S-g*M,I=_*y-x*M,V=v*S-g*E,k=v*y-x*E,J=g*y-x*S,Y=C*J-F*k+R*V+D*I-N*L+w*b;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/Y;return e[0]=(f*J-p*k+d*V)*Q,e[1]=(r*k-i*J-l*V)*Q,e[2]=(E*w-S*N+y*D)*Q,e[3]=(g*N-v*w-x*D)*Q,e[4]=(p*I-c*J-d*L)*Q,e[5]=(t*J-r*I+l*L)*Q,e[6]=(S*R-M*w-y*F)*Q,e[7]=(_*w-g*R+x*F)*Q,e[8]=(c*k-f*I+d*b)*Q,e[9]=(i*I-t*k-l*b)*Q,e[10]=(M*N-E*R+y*C)*Q,e[11]=(v*R-_*N-x*C)*Q,e[12]=(f*L-c*V-p*b)*Q,e[13]=(t*V-i*L+r*b)*Q,e[14]=(E*F-M*D-S*C)*Q,e[15]=(_*D-v*F+g*C)*Q,this}scale(e){const t=this.elements,i=e.x,r=e.y,l=e.z;return t[0]*=i,t[4]*=r,t[8]*=l,t[1]*=i,t[5]*=r,t[9]*=l,t[2]*=i,t[6]*=r,t[10]*=l,t[3]*=i,t[7]*=r,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),l=1-i,c=e.x,f=e.y,p=e.z,d=l*c,_=l*f;return this.set(d*c+i,d*f-r*p,d*p+r*f,0,d*f+r*p,_*f+i,_*p-r*c,0,d*p-r*f,_*p+r*c,l*p*p+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,l,c){return this.set(1,i,l,0,e,1,c,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,l=t._x,c=t._y,f=t._z,p=t._w,d=l+l,_=c+c,v=f+f,g=l*d,x=l*_,M=l*v,E=c*_,S=c*v,y=f*v,C=p*d,F=p*_,R=p*v,D=i.x,N=i.y,w=i.z;return r[0]=(1-(E+y))*D,r[1]=(x+R)*D,r[2]=(M-F)*D,r[3]=0,r[4]=(x-R)*N,r[5]=(1-(g+y))*N,r[6]=(S+C)*N,r[7]=0,r[8]=(M+F)*w,r[9]=(S-C)*w,r[10]=(1-(g+E))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const l=this.determinantAffine();if(l===0)return i.set(1,1,1),t.identity(),this;let c=Tl.set(r[0],r[1],r[2]).length();const f=Tl.set(r[4],r[5],r[6]).length(),p=Tl.set(r[8],r[9],r[10]).length();l<0&&(c=-c),qa.copy(this);const d=1/c,_=1/f,v=1/p;return qa.elements[0]*=d,qa.elements[1]*=d,qa.elements[2]*=d,qa.elements[4]*=_,qa.elements[5]*=_,qa.elements[6]*=_,qa.elements[8]*=v,qa.elements[9]*=v,qa.elements[10]*=v,t.setFromRotationMatrix(qa),i.x=c,i.y=f,i.z=p,this}makePerspective(e,t,i,r,l,c,f=mr,p=!1){const d=this.elements,_=2*l/(t-e),v=2*l/(i-r),g=(t+e)/(t-e),x=(i+r)/(i-r);let M,E;if(p)M=l/(c-l),E=c*l/(c-l);else if(f===mr)M=-(c+l)/(c-l),E=-2*c*l/(c-l);else if(f===Md)M=-c/(c-l),E=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return d[0]=_,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=v,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=M,d[14]=E,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,i,r,l,c,f=mr,p=!1){const d=this.elements,_=2/(t-e),v=2/(i-r),g=-(t+e)/(t-e),x=-(i+r)/(i-r);let M,E;if(p)M=1/(c-l),E=c/(c-l);else if(f===mr)M=-2/(c-l),E=-(c+l)/(c-l);else if(f===Md)M=-1/(c-l),E=-l/(c-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return d[0]=_,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=v,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=M,d[14]=E,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Cd.prototype.isMatrix4=!0;let jn=Cd;const Tl=new de,qa=new jn,qC=new de(0,0,0),ZC=new de(1,1,1),Ds=new de,dh=new de,ua=new de,lM=new jn,uM=new cu;class Bo{constructor(e=0,t=0,i=0,r=Bo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,l=r[0],c=r[4],f=r[8],p=r[1],d=r[5],_=r[9],v=r[2],g=r[6],x=r[10];switch(t){case"XYZ":this._y=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-_,x),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(f,x),this._z=Math.atan2(p,d)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,x),this._z=Math.atan2(-c,d)):(this._y=0,this._z=Math.atan2(p,l));break;case"ZYX":this._y=Math.asin(-Xt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(p,l)):(this._x=0,this._z=Math.atan2(-c,d));break;case"YZX":this._z=Math.asin(Xt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(f,x));break;case"XZY":this._z=Math.asin(-Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-_,x),this._y=0);break;default:_t("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return lM.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lM,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uM.setFromEuler(this),this.setFromQuaternion(uM,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bo.DEFAULT_ORDER="XYZ";class C1{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let KC=0;const cM=new de,bl=new cu,Hr=new jn,ph=new de,ic=new de,jC=new de,QC=new cu,fM=new de(1,0,0),hM=new de(0,1,0),dM=new de(0,0,1),pM={type:"added"},JC={type:"removed"},Al={type:"childadded",child:null},f_={type:"childremoved",child:null};class Sa extends Xo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:KC++}),this.uuid=Qc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sa.DEFAULT_UP.clone();const e=new de,t=new Bo,i=new cu,r=new de(1,1,1);function l(){i.setFromEuler(t,!1)}function c(){t.setFromQuaternion(i,void 0,!1)}t._onChange(l),i._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new jn},normalMatrix:{value:new xt}}),this.matrix=new jn,this.matrixWorld=new jn,this.matrixAutoUpdate=Sa.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new C1,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bl.setFromAxisAngle(e,t),this.quaternion.multiply(bl),this}rotateOnWorldAxis(e,t){return bl.setFromAxisAngle(e,t),this.quaternion.premultiply(bl),this}rotateX(e){return this.rotateOnAxis(fM,e)}rotateY(e){return this.rotateOnAxis(hM,e)}rotateZ(e){return this.rotateOnAxis(dM,e)}translateOnAxis(e,t){return cM.copy(e).applyQuaternion(this.quaternion),this.position.add(cM.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fM,e)}translateY(e){return this.translateOnAxis(hM,e)}translateZ(e){return this.translateOnAxis(dM,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ph.copy(e):ph.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ic.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hr.lookAt(ic,ph,this.up):Hr.lookAt(ph,ic,this.up),this.quaternion.setFromRotationMatrix(Hr),r&&(Hr.extractRotation(r.matrixWorld),bl.setFromRotationMatrix(Hr),this.quaternion.premultiply(bl.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pM),Al.child=e,this.dispatchEvent(Al),Al.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(JC),f_.child=e,this.dispatchEvent(f_),f_.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pM),Al.child=e,this.dispatchEvent(Al),Al.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const c=this.children[i].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let l=0,c=r.length;l<c;l++)r[l].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,e,jC),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,QC,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*i-l[8]*r,l[13]+=i-l[1]*t-l[5]*i-l[9]*r,l[14]+=r-l[2]*t-l[6]*i-l[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(f=>({...f,boundingBox:f.boundingBox?f.boundingBox.toJSON():void 0,boundingSphere:f.boundingSphere?f.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(f=>({...f})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function l(f,p){return f[p.uuid]===void 0&&(f[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const p=f.shapes;if(Array.isArray(p))for(let d=0,_=p.length;d<_;d++){const v=p[d];l(e.shapes,v)}else l(e.shapes,p)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let p=0,d=this.material.length;p<d;p++)f.push(l(e.materials,this.material[p]));r.material=f}else r.material=l(e.materials,this.material);if(this.children.length>0){r.children=[];for(let f=0;f<this.children.length;f++)r.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let f=0;f<this.animations.length;f++){const p=this.animations[f];r.animations.push(l(e.animations,p))}}if(t){const f=c(e.geometries),p=c(e.materials),d=c(e.textures),_=c(e.images),v=c(e.shapes),g=c(e.skeletons),x=c(e.animations),M=c(e.nodes);f.length>0&&(i.geometries=f),p.length>0&&(i.materials=p),d.length>0&&(i.textures=d),_.length>0&&(i.images=_),v.length>0&&(i.shapes=v),g.length>0&&(i.skeletons=g),x.length>0&&(i.animations=x),M.length>0&&(i.nodes=M)}return i.object=r,i;function c(f){const p=[];for(const d in f){const _=f[d];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Sa.DEFAULT_UP=new de(0,1,0);Sa.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mh extends Sa{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $C={type:"move"};class h_{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mh,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mh,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new de,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new de),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mh,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new de,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new de,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,l=null,c=null;const f=this._targetRay,p=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){c=!0;for(const E of e.hand.values()){const S=t.getJointPose(E,i),y=this._getHandJoint(d,E);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const _=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],g=_.position.distanceTo(v.position),x=.02,M=.005;d.inputState.pinching&&g>x+M?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=x-M&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,i),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));f!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&l!==null&&(r=l),r!==null&&(f.matrix.fromArray(r.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,r.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(r.linearVelocity)):f.hasLinearVelocity=!1,r.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(r.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent($C)))}return f!==null&&(f.visible=r!==null),p!==null&&(p.visible=l!==null),d!==null&&(d.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mh;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const w1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ls={h:0,s:0,l:0},_h={h:0,s:0,l:0};function d_(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}class nn{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fa){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=kt.workingColorSpace){return this.r=e,this.g=t,this.b=i,kt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=kt.workingColorSpace){if(e=HC(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const l=i<=.5?i*(1+t):i+t-i*t,c=2*i-l;this.r=d_(c,l,e+1/3),this.g=d_(c,l,e),this.b=d_(c,l,e-1/3)}return kt.colorSpaceToWorking(this,r),this}setStyle(e,t=Fa){function i(l){l!==void 0&&parseFloat(l)<1&&_t("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=r[1],f=r[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return i(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return i(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return i(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:_t("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=r[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(l,16),t);_t("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fa){const i=w1[e.toLowerCase()];return i!==void 0?this.setHex(i,t):_t("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}copyLinearToSRGB(e){return this.r=Ql(e.r),this.g=Ql(e.g),this.b=Ql(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fa){return kt.workingToColorSpace(yi.copy(this),e),Math.round(Xt(yi.r*255,0,255))*65536+Math.round(Xt(yi.g*255,0,255))*256+Math.round(Xt(yi.b*255,0,255))}getHexString(e=Fa){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(yi.copy(this),t);const i=yi.r,r=yi.g,l=yi.b,c=Math.max(i,r,l),f=Math.min(i,r,l);let p,d;const _=(f+c)/2;if(f===c)p=0,d=0;else{const v=c-f;switch(d=_<=.5?v/(c+f):v/(2-c-f),c){case i:p=(r-l)/v+(r<l?6:0);break;case r:p=(l-i)/v+2;break;case l:p=(i-r)/v+4;break}p/=6}return e.h=p,e.s=d,e.l=_,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(yi.copy(this),t),e.r=yi.r,e.g=yi.g,e.b=yi.b,e}getStyle(e=Fa){kt.workingToColorSpace(yi.copy(this),e);const t=yi.r,i=yi.g,r=yi.b;return e!==Fa?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ls),this.setHSL(Ls.h+e,Ls.s+t,Ls.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ls),e.getHSL(_h);const i=s_(Ls.h,_h.h,t),r=s_(Ls.s,_h.s,t),l=s_(Ls.l,_h.l,t);return this.setHSL(i,r,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,l=e.elements;return this.r=l[0]*t+l[3]*i+l[6]*r,this.g=l[1]*t+l[4]*i+l[7]*r,this.b=l[2]*t+l[5]*i+l[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yi=new nn;nn.NAMES=w1;class e3 extends Sa{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bo,this.environmentIntensity=1,this.environmentRotation=new Bo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Za=new de,Gr=new de,p_=new de,Vr=new de,Rl=new de,Cl=new de,mM=new de,m_=new de,__=new de,g_=new de,v_=new Fn,x_=new Fn,S_=new Fn;class Ja{constructor(e=new de,t=new de,i=new de){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Za.subVectors(e,t),r.cross(Za);const l=r.lengthSq();return l>0?r.multiplyScalar(1/Math.sqrt(l)):r.set(0,0,0)}static getBarycoord(e,t,i,r,l){Za.subVectors(r,t),Gr.subVectors(i,t),p_.subVectors(e,t);const c=Za.dot(Za),f=Za.dot(Gr),p=Za.dot(p_),d=Gr.dot(Gr),_=Gr.dot(p_),v=c*d-f*f;if(v===0)return l.set(0,0,0),null;const g=1/v,x=(d*p-f*_)*g,M=(c*_-f*p)*g;return l.set(1-x-M,M,x)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Vr)===null?!1:Vr.x>=0&&Vr.y>=0&&Vr.x+Vr.y<=1}static getInterpolation(e,t,i,r,l,c,f,p){return this.getBarycoord(e,t,i,r,Vr)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(l,Vr.x),p.addScaledVector(c,Vr.y),p.addScaledVector(f,Vr.z),p)}static getInterpolatedAttribute(e,t,i,r,l,c){return v_.setScalar(0),x_.setScalar(0),S_.setScalar(0),v_.fromBufferAttribute(e,t),x_.fromBufferAttribute(e,i),S_.fromBufferAttribute(e,r),c.setScalar(0),c.addScaledVector(v_,l.x),c.addScaledVector(x_,l.y),c.addScaledVector(S_,l.z),c}static isFrontFacing(e,t,i,r){return Za.subVectors(i,t),Gr.subVectors(e,t),Za.cross(Gr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Za.subVectors(this.c,this.b),Gr.subVectors(this.a,this.b),Za.cross(Gr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ja.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ja.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,l){return Ja.getInterpolation(e,this.a,this.b,this.c,t,i,r,l)}containsPoint(e){return Ja.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ja.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,l=this.c;let c,f;Rl.subVectors(r,i),Cl.subVectors(l,i),m_.subVectors(e,i);const p=Rl.dot(m_),d=Cl.dot(m_);if(p<=0&&d<=0)return t.copy(i);__.subVectors(e,r);const _=Rl.dot(__),v=Cl.dot(__);if(_>=0&&v<=_)return t.copy(r);const g=p*v-_*d;if(g<=0&&p>=0&&_<=0)return c=p/(p-_),t.copy(i).addScaledVector(Rl,c);g_.subVectors(e,l);const x=Rl.dot(g_),M=Cl.dot(g_);if(M>=0&&x<=M)return t.copy(l);const E=x*d-p*M;if(E<=0&&d>=0&&M<=0)return f=d/(d-M),t.copy(i).addScaledVector(Cl,f);const S=_*M-x*v;if(S<=0&&v-_>=0&&x-M>=0)return mM.subVectors(l,r),f=(v-_)/(v-_+(x-M)),t.copy(r).addScaledVector(mM,f);const y=1/(S+E+g);return c=E*y,f=g*y,t.copy(i).addScaledVector(Rl,c).addScaledVector(Cl,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jc{constructor(e=new de(1/0,1/0,1/0),t=new de(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ka.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ka.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ka.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const l=i.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,f=l.count;c<f;c++)e.isMesh===!0?e.getVertexPosition(c,Ka):Ka.fromBufferAttribute(l,c),Ka.applyMatrix4(e.matrixWorld),this.expandByPoint(Ka);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gh.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gh.copy(i.boundingBox)),gh.applyMatrix4(e.matrixWorld),this.union(gh)}const r=e.children;for(let l=0,c=r.length;l<c;l++)this.expandByObject(r[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ka),Ka.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ac),vh.subVectors(this.max,ac),wl.subVectors(e.a,ac),Dl.subVectors(e.b,ac),Ll.subVectors(e.c,ac),Us.subVectors(Dl,wl),Ns.subVectors(Ll,Dl),go.subVectors(wl,Ll);let t=[0,-Us.z,Us.y,0,-Ns.z,Ns.y,0,-go.z,go.y,Us.z,0,-Us.x,Ns.z,0,-Ns.x,go.z,0,-go.x,-Us.y,Us.x,0,-Ns.y,Ns.x,0,-go.y,go.x,0];return!y_(t,wl,Dl,Ll,vh)||(t=[1,0,0,0,1,0,0,0,1],!y_(t,wl,Dl,Ll,vh))?!1:(xh.crossVectors(Us,Ns),t=[xh.x,xh.y,xh.z],y_(t,wl,Dl,Ll,vh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ka).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ka).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const kr=[new de,new de,new de,new de,new de,new de,new de,new de],Ka=new de,gh=new Jc,wl=new de,Dl=new de,Ll=new de,Us=new de,Ns=new de,go=new de,ac=new de,vh=new de,xh=new de,vo=new de;function y_(o,e,t,i,r){for(let l=0,c=o.length-3;l<=c;l+=3){vo.fromArray(o,l);const f=r.x*Math.abs(vo.x)+r.y*Math.abs(vo.y)+r.z*Math.abs(vo.z),p=e.dot(vo),d=t.dot(vo),_=i.dot(vo);if(Math.max(-Math.max(p,d,_),Math.min(p,d,_))>f)return!1}return!0}const qn=new de,Sh=new en;let t3=0;class $r extends Xo{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:t3++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=PC,this.updateRanges=[],this.gpuType=pr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,l=this.itemSize;r<l;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Sh.fromBufferAttribute(this,t),Sh.applyMatrix3(e),this.setXY(t,Sh.x,Sh.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qn.fromBufferAttribute(this,t),qn.applyMatrix3(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qn.fromBufferAttribute(this,t),qn.applyMatrix4(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qn.fromBufferAttribute(this,t),qn.applyNormalMatrix(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qn.fromBufferAttribute(this,t),qn.transformDirection(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nc(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Yi(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nc(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yi(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nc(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yi(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nc(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yi(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nc(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yi(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Yi(t,this.array),i=Yi(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Yi(t,this.array),i=Yi(i,this.array),r=Yi(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,l){return e*=this.itemSize,this.normalized&&(t=Yi(t,this.array),i=Yi(i,this.array),r=Yi(r,this.array),l=Yi(l,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class D1 extends $r{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class L1 extends $r{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class es extends $r{constructor(e,t,i){super(new Float32Array(e),t,i)}}const n3=new Jc,rc=new de,M_=new de;class C0{constructor(e=new de,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):n3.setFromPoints(e).getCenter(i);let r=0;for(let l=0,c=e.length;l<c;l++)r=Math.max(r,i.distanceToSquared(e[l]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rc.subVectors(e,this.center);const t=rc.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(rc,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(M_.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rc.copy(e.center).add(M_)),this.expandByPoint(rc.copy(e.center).sub(M_))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let i3=0;const Oa=new jn,E_=new Sa,Ul=new de,ca=new Jc,sc=new Jc,oi=new de;class rs extends Xo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:i3++}),this.uuid=Qc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(FC(e)?L1:D1)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const l=new xt().getNormalMatrix(e);i.applyNormalMatrix(l),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Oa.makeRotationFromQuaternion(e),this.applyMatrix4(Oa),this}rotateX(e){return Oa.makeRotationX(e),this.applyMatrix4(Oa),this}rotateY(e){return Oa.makeRotationY(e),this.applyMatrix4(Oa),this}rotateZ(e){return Oa.makeRotationZ(e),this.applyMatrix4(Oa),this}translate(e,t,i){return Oa.makeTranslation(e,t,i),this.applyMatrix4(Oa),this}scale(e,t,i){return Oa.makeScale(e,t,i),this.applyMatrix4(Oa),this}lookAt(e){return E_.lookAt(e),E_.updateMatrix(),this.applyMatrix4(E_.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ul).negate(),this.translate(Ul.x,Ul.y,Ul.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,l=e.length;r<l;r++){const c=e[r];i.push(c.x,c.y,c.z||0)}this.setAttribute("position",new es(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const l=e[r];t.setXYZ(r,l.x,l.y,l.z||0)}e.length>t.count&&_t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new de(-1/0,-1/0,-1/0),new de(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const l=t[i];ca.setFromBufferAttribute(l),this.morphTargetsRelative?(oi.addVectors(this.boundingBox.min,ca.min),this.boundingBox.expandByPoint(oi),oi.addVectors(this.boundingBox.max,ca.max),this.boundingBox.expandByPoint(oi)):(this.boundingBox.expandByPoint(ca.min),this.boundingBox.expandByPoint(ca.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new C0);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new de,1/0);return}if(e){const i=this.boundingSphere.center;if(ca.setFromBufferAttribute(e),t)for(let l=0,c=t.length;l<c;l++){const f=t[l];sc.setFromBufferAttribute(f),this.morphTargetsRelative?(oi.addVectors(ca.min,sc.min),ca.expandByPoint(oi),oi.addVectors(ca.max,sc.max),ca.expandByPoint(oi)):(ca.expandByPoint(sc.min),ca.expandByPoint(sc.max))}ca.getCenter(i);let r=0;for(let l=0,c=e.count;l<c;l++)oi.fromBufferAttribute(e,l),r=Math.max(r,i.distanceToSquared(oi));if(t)for(let l=0,c=t.length;l<c;l++){const f=t[l],p=this.morphTargetsRelative;for(let d=0,_=f.count;d<_;d++)oi.fromBufferAttribute(f,d),p&&(Ul.fromBufferAttribute(e,d),oi.add(Ul)),r=Math.max(r,i.distanceToSquared(oi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,l=t.uv;let c=this.getAttribute("tangent");(c===void 0||c.count!==i.count)&&(c=new $r(new Float32Array(4*i.count),4),this.setAttribute("tangent",c));const f=[],p=[];for(let b=0;b<i.count;b++)f[b]=new de,p[b]=new de;const d=new de,_=new de,v=new de,g=new en,x=new en,M=new en,E=new de,S=new de;function y(b,L,I){d.fromBufferAttribute(i,b),_.fromBufferAttribute(i,L),v.fromBufferAttribute(i,I),g.fromBufferAttribute(l,b),x.fromBufferAttribute(l,L),M.fromBufferAttribute(l,I),_.sub(d),v.sub(d),x.sub(g),M.sub(g);const V=1/(x.x*M.y-M.x*x.y);isFinite(V)&&(E.copy(_).multiplyScalar(M.y).addScaledVector(v,-x.y).multiplyScalar(V),S.copy(v).multiplyScalar(x.x).addScaledVector(_,-M.x).multiplyScalar(V),f[b].add(E),f[L].add(E),f[I].add(E),p[b].add(S),p[L].add(S),p[I].add(S))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let b=0,L=C.length;b<L;++b){const I=C[b],V=I.start,k=I.count;for(let J=V,Y=V+k;J<Y;J+=3)y(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const F=new de,R=new de,D=new de,N=new de;function w(b){D.fromBufferAttribute(r,b),N.copy(D);const L=f[b];F.copy(L),F.sub(D.multiplyScalar(D.dot(L))).normalize(),R.crossVectors(N,L);const V=R.dot(p[b])<0?-1:1;c.setXYZW(b,F.x,F.y,F.z,V)}for(let b=0,L=C.length;b<L;++b){const I=C[b],V=I.start,k=I.count;for(let J=V,Y=V+k;J<Y;J+=3)w(e.getX(J+0)),w(e.getX(J+1)),w(e.getX(J+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new $r(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let g=0,x=i.count;g<x;g++)i.setXYZ(g,0,0,0);const r=new de,l=new de,c=new de,f=new de,p=new de,d=new de,_=new de,v=new de;if(e)for(let g=0,x=e.count;g<x;g+=3){const M=e.getX(g+0),E=e.getX(g+1),S=e.getX(g+2);r.fromBufferAttribute(t,M),l.fromBufferAttribute(t,E),c.fromBufferAttribute(t,S),_.subVectors(c,l),v.subVectors(r,l),_.cross(v),f.fromBufferAttribute(i,M),p.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),f.add(_),p.add(_),d.add(_),i.setXYZ(M,f.x,f.y,f.z),i.setXYZ(E,p.x,p.y,p.z),i.setXYZ(S,d.x,d.y,d.z)}else for(let g=0,x=t.count;g<x;g+=3)r.fromBufferAttribute(t,g+0),l.fromBufferAttribute(t,g+1),c.fromBufferAttribute(t,g+2),_.subVectors(c,l),v.subVectors(r,l),_.cross(v),i.setXYZ(g+0,_.x,_.y,_.z),i.setXYZ(g+1,_.x,_.y,_.z),i.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)oi.fromBufferAttribute(e,t),oi.normalize(),e.setXYZ(t,oi.x,oi.y,oi.z)}toNonIndexed(){function e(f,p){const d=f.array,_=f.itemSize,v=f.normalized,g=new d.constructor(p.length*_);let x=0,M=0;for(let E=0,S=p.length;E<S;E++){f.isInterleavedBufferAttribute?x=p[E]*f.data.stride+f.offset:x=p[E]*_;for(let y=0;y<_;y++)g[M++]=d[x++]}return new $r(g,_,v)}if(this.index===null)return _t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rs,i=this.index.array,r=this.attributes;for(const f in r){const p=r[f],d=e(p,i);t.setAttribute(f,d)}const l=this.morphAttributes;for(const f in l){const p=[],d=l[f];for(let _=0,v=d.length;_<v;_++){const g=d[_],x=e(g,i);p.push(x)}t.morphAttributes[f]=p}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let f=0,p=c.length;f<p;f++){const d=c[f];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const d in p)p[d]!==void 0&&(e[d]=p[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const p in i){const d=i[p];e.data.attributes[p]=d.toJSON(e.data)}const r={};let l=!1;for(const p in this.morphAttributes){const d=this.morphAttributes[p],_=[];for(let v=0,g=d.length;v<g;v++){const x=d[v];_.push(x.toJSON(e.data))}_.length>0&&(r[p]=_,l=!0)}l&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere=f.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const d in r){const _=r[d];this.setAttribute(d,_.clone(t))}const l=e.morphAttributes;for(const d in l){const _=[],v=l[d];for(let g=0,x=v.length;g<x;g++)_.push(v[g].clone(t));this.morphAttributes[d]=_}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let d=0,_=c.length;d<_;d++){const v=c[d];this.addGroup(v.start,v.count,v.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const T_=new de,a3=new de,r3=new xt;class Fs{constructor(e=new de(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=T_.subVectors(i,t).cross(a3.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(T_),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return i===!0&&(c<0||c>1)?null:t.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||r3.getNormalMatrix(e),r=this.coplanarPoint(T_).applyMatrix4(e),l=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let s3=0;class Nd extends Xo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:s3++}),this.uuid=Qc(),this.name="",this.type="Material",this.blending=Tc,this.side=Fo,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=l1,this.blendDst=u1,this.blendEquation=Bl,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nn(0,0,0),this.blendAlpha=0,this.depthFunc=Xc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=CC,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=a_,this.stencilZFail=a_,this.stencilZPass=a_,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){_t(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){_t(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(l=>l.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(l){const c=[];for(const f in l){const p=l[f];delete p.metadata,c.push(p)}return c}if(t){const l=r(e.textures),c=r(e.images);l.length>0&&(i.textures=l),c.length>0&&(i.images=c)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nn().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Fs().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new en().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new en().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let l=0;l!==r;++l)i[l]=t[l].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Xr=new de,b_=new de,yh=new de,Mh=new de;class o3{constructor(e=new de,t=new de(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Xr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xr.copy(this.origin).addScaledVector(this.direction,t),Xr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){b_.copy(e).add(t).multiplyScalar(.5),yh.copy(t).sub(e).normalize(),Mh.copy(this.origin).sub(b_);const l=e.distanceTo(t)*.5,c=-this.direction.dot(yh),f=Mh.dot(this.direction),p=-Mh.dot(yh),d=Mh.lengthSq(),_=Math.abs(1-c*c);let v,g,x,M;if(_>0)if(v=c*p-f,g=c*f-p,M=l*_,v>=0)if(g>=-M)if(g<=M){const E=1/_;v*=E,g*=E,x=v*(v+c*g+2*f)+g*(c*v+g+2*p)+d}else g=l,v=Math.max(0,-(c*g+f)),x=-v*v+g*(g+2*p)+d;else g=-l,v=Math.max(0,-(c*g+f)),x=-v*v+g*(g+2*p)+d;else g<=-M?(v=Math.max(0,-(-c*l+f)),g=v>0?-l:Math.min(Math.max(-l,-p),l),x=-v*v+g*(g+2*p)+d):g<=M?(v=0,g=Math.min(Math.max(-l,-p),l),x=g*(g+2*p)+d):(v=Math.max(0,-(c*l+f)),g=v>0?l:Math.min(Math.max(-l,-p),l),x=-v*v+g*(g+2*p)+d);else g=c>0?-l:l,v=Math.max(0,-(c*g+f)),x=-v*v+g*(g+2*p)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,v),r&&r.copy(b_).addScaledVector(yh,g),x}intersectSphere(e,t){if(e.radius<0)return null;Xr.subVectors(e.center,this.origin);const i=Xr.dot(this.direction),r=Xr.dot(Xr)-i*i,l=e.radius*e.radius;if(r>l)return null;const c=Math.sqrt(l-r),f=i-c,p=i+c;return p<0?null:f<0?this.at(p,t):this.at(f,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,l,c,f,p;const d=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return d>=0?(i=(e.min.x-g.x)*d,r=(e.max.x-g.x)*d):(i=(e.max.x-g.x)*d,r=(e.min.x-g.x)*d),_>=0?(l=(e.min.y-g.y)*_,c=(e.max.y-g.y)*_):(l=(e.max.y-g.y)*_,c=(e.min.y-g.y)*_),i>c||l>r||((l>i||isNaN(i))&&(i=l),(c<r||isNaN(r))&&(r=c),v>=0?(f=(e.min.z-g.z)*v,p=(e.max.z-g.z)*v):(f=(e.max.z-g.z)*v,p=(e.min.z-g.z)*v),i>p||f>r)||((f>i||i!==i)&&(i=f),(p<r||r!==r)&&(r=p),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Xr)!==null}intersectTriangle(e,t,i,r,l){const c=this.origin,f=this.direction,p=f.x,d=f.y,_=f.z,v=e.x-c.x,g=e.y-c.y,x=e.z-c.z,M=t.x-c.x,E=t.y-c.y,S=t.z-c.z,y=i.x-c.x,C=i.y-c.y,F=i.z-c.z,R=Math.abs(p),D=Math.abs(d),N=Math.abs(_);let w,b,L,I,V,k,J,Y,Q,H,G,te;if(R>=D&&R>=N?(L=p,k=v,Q=M,te=y,p>=0?(w=d,b=_,I=g,V=x,J=E,Y=S,H=C,G=F):(w=_,b=d,I=x,V=g,J=S,Y=E,H=F,G=C)):D>=N?(L=d,k=g,Q=E,te=C,d>=0?(w=_,b=p,I=x,V=v,J=S,Y=M,H=F,G=y):(w=p,b=_,I=v,V=x,J=M,Y=S,H=y,G=F)):(L=_,k=x,Q=S,te=F,_>=0?(w=p,b=d,I=v,V=g,J=M,Y=E,H=y,G=C):(w=d,b=p,I=g,V=v,J=E,Y=M,H=C,G=y)),L===0)return null;const ee=w/L,z=b/L,P=1/L,ne=I-ee*k,_e=V-z*k,Ae=J-ee*Q,Ne=Y-z*Q,Be=H-ee*te,ie=G-z*te,pe=Be*Ne-ie*Ae,Ce=ne*ie-_e*Be,at=Ae*_e-Ne*ne;if(r){if(pe<0||Ce<0||at<0)return null}else if((pe<0||Ce<0||at<0)&&(pe>0||Ce>0||at>0))return null;const Ie=pe+Ce+at;if(Ie===0)return null;const st=P*(pe*k+Ce*Q+at*te);return(Ie>0?st<0:st>0)?null:this.at(st/Ie,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class U1 extends Nd{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bo,this.combine=c1,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _M=new jn,xo=new o3,Eh=new C0,gM=new de,Th=new de,bh=new de,Ah=new de,A_=new de,Rh=new de,vM=new de,Ch=new de;class Mr extends Sa{constructor(e=new rs,t=new U1){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=r.length;l<c;l++){const f=r[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,l=i.morphAttributes.position,c=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const f=this.morphTargetInfluences;if(l&&f){Rh.set(0,0,0);for(let p=0,d=l.length;p<d;p++){const _=f[p],v=l[p];_!==0&&(A_.fromBufferAttribute(v,e),c?Rh.addScaledVector(A_,_):Rh.addScaledVector(A_.sub(t),_))}t.add(Rh)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,l=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Eh.copy(i.boundingSphere),Eh.applyMatrix4(l),xo.copy(e.ray).recast(e.near),!(Eh.containsPoint(xo.origin)===!1&&(xo.intersectSphere(Eh,gM)===null||xo.origin.distanceToSquared(gM)>(e.far-e.near)**2))&&(_M.copy(l).invert(),xo.copy(e.ray).applyMatrix4(_M),!(i.boundingBox!==null&&xo.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,xo)))}_computeIntersections(e,t,i){let r;const l=this.geometry,c=this.material,f=l.index,p=l.attributes.position,d=l.attributes.uv,_=l.attributes.uv1,v=l.attributes.normal,g=l.groups,x=l.drawRange;if(f!==null)if(Array.isArray(c))for(let M=0,E=g.length;M<E;M++){const S=g[M],y=c[S.materialIndex],C=Math.max(S.start,x.start),F=Math.min(f.count,Math.min(S.start+S.count,x.start+x.count));for(let R=C,D=F;R<D;R+=3){const N=f.getX(R),w=f.getX(R+1),b=f.getX(R+2);r=wh(this,y,e,i,d,_,v,N,w,b),r&&(r.faceIndex=Math.floor(R/3),r.face.materialIndex=S.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),E=Math.min(f.count,x.start+x.count);for(let S=M,y=E;S<y;S+=3){const C=f.getX(S),F=f.getX(S+1),R=f.getX(S+2);r=wh(this,c,e,i,d,_,v,C,F,R),r&&(r.faceIndex=Math.floor(S/3),t.push(r))}}else if(p!==void 0)if(Array.isArray(c))for(let M=0,E=g.length;M<E;M++){const S=g[M],y=c[S.materialIndex],C=Math.max(S.start,x.start),F=Math.min(p.count,Math.min(S.start+S.count,x.start+x.count));for(let R=C,D=F;R<D;R+=3){const N=R,w=R+1,b=R+2;r=wh(this,y,e,i,d,_,v,N,w,b),r&&(r.faceIndex=Math.floor(R/3),r.face.materialIndex=S.materialIndex,t.push(r))}}else{const M=Math.max(0,x.start),E=Math.min(p.count,x.start+x.count);for(let S=M,y=E;S<y;S+=3){const C=S,F=S+1,R=S+2;r=wh(this,c,e,i,d,_,v,C,F,R),r&&(r.faceIndex=Math.floor(S/3),t.push(r))}}}}function l3(o,e,t,i,r,l,c,f){let p;if(e.side===$i?p=i.intersectTriangle(c,l,r,!0,f):p=i.intersectTriangle(r,l,c,e.side===Fo,f),p===null)return null;Ch.copy(f),Ch.applyMatrix4(o.matrixWorld);const d=t.ray.origin.distanceTo(Ch);return d<t.near||d>t.far?null:{distance:d,point:Ch.clone(),object:o}}function wh(o,e,t,i,r,l,c,f,p,d){o.getVertexPosition(f,Th),o.getVertexPosition(p,bh),o.getVertexPosition(d,Ah);const _=l3(o,e,t,i,Th,bh,Ah,vM);if(_){const v=new de;Ja.getBarycoord(vM,Th,bh,Ah,v),r&&(_.uv=Ja.getInterpolatedAttribute(r,f,p,d,v,new en)),l&&(_.uv1=Ja.getInterpolatedAttribute(l,f,p,d,v,new en)),c&&(_.normal=Ja.getInterpolatedAttribute(c,f,p,d,v,new de),_.normal.dot(i.direction)>0&&_.normal.multiplyScalar(-1));const g={a:f,b:p,c:d,normal:new de,materialIndex:0};Ja.getNormal(Th,bh,Ah,g.normal),_.face=g,_.barycoord=v}return _}class u3 extends Bi{constructor(e=null,t=1,i=1,r,l,c,f,p,d=_i,_=_i,v,g){super(null,c,f,p,d,_,r,l,v,g),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const So=new C0,c3=new en(.5,.5),Dh=new de;class N1{constructor(e=new Fs,t=new Fs,i=new Fs,r=new Fs,l=new Fs,c=new Fs){this.planes=[e,t,i,r,l,c]}set(e,t,i,r,l,c){const f=this.planes;return f[0].copy(e),f[1].copy(t),f[2].copy(i),f[3].copy(r),f[4].copy(l),f[5].copy(c),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=mr,i=!1){const r=this.planes,l=e.elements,c=l[0],f=l[1],p=l[2],d=l[3],_=l[4],v=l[5],g=l[6],x=l[7],M=l[8],E=l[9],S=l[10],y=l[11],C=l[12],F=l[13],R=l[14],D=l[15];if(r[0].setComponents(d-c,x-_,y-M,D-C).normalize(),r[1].setComponents(d+c,x+_,y+M,D+C).normalize(),r[2].setComponents(d+f,x+v,y+E,D+F).normalize(),r[3].setComponents(d-f,x-v,y-E,D-F).normalize(),i)r[4].setComponents(p,g,S,R).normalize(),r[5].setComponents(d-p,x-g,y-S,D-R).normalize();else if(r[4].setComponents(d-p,x-g,y-S,D-R).normalize(),t===mr)r[5].setComponents(d+p,x+g,y+S,D+R).normalize();else if(t===Md)r[5].setComponents(p,g,S,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),So.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),So.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(So)}intersectsSprite(e){So.center.set(0,0,0);const t=c3.distanceTo(e.center);return So.radius=.7071067811865476+t,So.applyMatrix4(e.matrixWorld),this.intersectsSphere(So)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Dh.x=r.normal.x>0?e.max.x:e.min.x,Dh.y=r.normal.y>0?e.max.y:e.min.y,Dh.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Dh)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class O1 extends Bi{constructor(e=[],t=Io,i,r,l,c,f,p,d,_){super(e,t,i,r,l,c,f,p,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qc extends Bi{constructor(e,t,i=Sr,r,l,c,f=_i,p=_i,d,_=as,v=1){if(_!==as&&_!==Ro)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:t,depth:v};super(g,r,l,c,f,p,_,i,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new R0(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class f3 extends qc{constructor(e,t=Sr,i=Io,r,l,c=_i,f=_i,p,d=as){const _={width:e,height:e,depth:1},v=[_,_,_,_,_,_];super(e,e,t,i,r,l,c,f,p,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class P1 extends Bi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $c extends rs{constructor(e=1,t=1,i=1,r=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:l,depthSegments:c};const f=this;r=Math.floor(r),l=Math.floor(l),c=Math.floor(c);const p=[],d=[],_=[],v=[];let g=0,x=0;M("z","y","x",-1,-1,i,t,e,c,l,0),M("z","y","x",1,-1,i,t,-e,c,l,1),M("x","z","y",1,1,e,i,t,r,c,2),M("x","z","y",1,-1,e,i,-t,r,c,3),M("x","y","z",1,-1,e,t,i,r,l,4),M("x","y","z",-1,-1,e,t,-i,r,l,5),this.setIndex(p),this.setAttribute("position",new es(d,3)),this.setAttribute("normal",new es(_,3)),this.setAttribute("uv",new es(v,2));function M(E,S,y,C,F,R,D,N,w,b,L){const I=R/w,V=D/b,k=R/2,J=D/2,Y=N/2,Q=w+1,H=b+1;let G=0,te=0;const ee=new de;for(let z=0;z<H;z++){const P=z*V-J;for(let ne=0;ne<Q;ne++){const _e=ne*I-k;ee[E]=_e*C,ee[S]=P*F,ee[y]=Y,d.push(ee.x,ee.y,ee.z),ee[E]=0,ee[S]=0,ee[y]=N>0?1:-1,_.push(ee.x,ee.y,ee.z),v.push(ne/w),v.push(1-z/b),G+=1}}for(let z=0;z<b;z++)for(let P=0;P<w;P++){const ne=g+P+Q*z,_e=g+P+Q*(z+1),Ae=g+(P+1)+Q*(z+1),Ne=g+(P+1)+Q*z;p.push(ne,_e,Ne),p.push(_e,Ae,Ne),te+=6}f.addGroup(x,te,L),x+=te,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $c(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ef extends rs{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const l=e/2,c=t/2,f=Math.floor(i),p=Math.floor(r),d=f+1,_=p+1,v=e/f,g=t/p,x=[],M=[],E=[],S=[];for(let y=0;y<_;y++){const C=y*g-c;for(let F=0;F<d;F++){const R=F*v-l;M.push(R,-C,0),E.push(0,0,1),S.push(F/f),S.push(1-y/p)}}for(let y=0;y<p;y++)for(let C=0;C<f;C++){const F=C+d*y,R=C+d*(y+1),D=C+1+d*(y+1),N=C+1+d*y;x.push(F,R,N),x.push(R,D,N)}this.setIndex(x),this.setAttribute("position",new es(M,3)),this.setAttribute("normal",new es(E,3)),this.setAttribute("uv",new es(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ef(e.width,e.height,e.widthSegments,e.heightSegments)}}function lu(o){const e={};for(const t in o){e[t]={};for(const i in o[t]){const r=o[t][i];if(xM(r))r.isRenderTargetTexture?(_t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(xM(r[0])){const l=[];for(let c=0,f=r.length;c<f;c++)l[c]=r[c].clone();e[t][i]=l}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Oi(o){const e={};for(let t=0;t<o.length;t++){const i=lu(o[t]);for(const r in i)e[r]=i[r]}return e}function xM(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function h3(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function F1(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}const d3={clone:lu,merge:Oi};var p3=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m3=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tr extends Nd{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p3,this.fragmentShader=m3,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lu(e.uniforms),this.uniformsGroups=h3(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const c=this.uniforms[r].value;c&&c.isTexture?t.uniforms[r]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[r]={type:"m4",value:c.toArray()}:t.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new nn().setHex(r.value);break;case"v2":this.uniforms[i].value=new en().fromArray(r.value);break;case"v3":this.uniforms[i].value=new de().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Fn().fromArray(r.value);break;case"m3":this.uniforms[i].value=new xt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new jn().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class _3 extends tr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class g3 extends Nd{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=AC,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class v3 extends Nd{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Lh=new de,Uh=new cu,or=new de;class I1 extends Sa{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jn,this.projectionMatrix=new jn,this.projectionMatrixInverse=new jn,this.coordinateSystem=mr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lh,Uh,or),or.x===1&&or.y===1&&or.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lh,Uh,or.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Lh,Uh,or),or.x===1&&or.y===1&&or.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lh,Uh,or.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Os=new de,SM=new en,yM=new en;class Qa extends I1{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bg*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(r_*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bg*2*Math.atan(Math.tan(r_*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Os.x,Os.y).multiplyScalar(-e/Os.z),Os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Os.x,Os.y).multiplyScalar(-e/Os.z)}getViewSize(e,t){return this.getViewBounds(e,SM,yM),t.subVectors(yM,SM)}setViewOffset(e,t,i,r,l,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(r_*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,l=-.5*r;const c=this.view;if(this.view!==null&&this.view.enabled){const p=c.fullWidth,d=c.fullHeight;l+=c.offsetX*r/p,t-=c.offsetY*i/d,r*=c.width/p,i*=c.height/d}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class w0 extends I1{constructor(e=-1,t=1,i=1,r=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let l=i-e,c=i+e,f=r+t,p=r-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=d*this.view.offsetX,c=l+d*this.view.width,f-=_*this.view.offsetY,p=f-_*this.view.height}this.projectionMatrix.makeOrthographic(l,c,f,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Nl=-90,Ol=1;class x3 extends Sa{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qa(Nl,Ol,e,t);r.layers=this.layers,this.add(r);const l=new Qa(Nl,Ol,e,t);l.layers=this.layers,this.add(l);const c=new Qa(Nl,Ol,e,t);c.layers=this.layers,this.add(c);const f=new Qa(Nl,Ol,e,t);f.layers=this.layers,this.add(f);const p=new Qa(Nl,Ol,e,t);p.layers=this.layers,this.add(p);const d=new Qa(Nl,Ol,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,l,c,f,p]=t;for(const d of t)this.remove(d);if(e===mr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Md)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,f,p,d,_]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,1,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,2,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(i,3,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),e.setRenderTarget(i,4,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,_),e.setRenderTarget(v,g,x),e.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class S3 extends Qa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const V0=class V0{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const l=this.elements;return l[0]=e,l[2]=t,l[1]=i,l[3]=r,this}};V0.prototype.isMatrix2=!0;let MM=V0;function EM(o,e,t,i){const r=y3(i);switch(t){case E1:return o*e;case b1:return o*e/r.components*r.byteLength;case M0:return o*e/r.components*r.byteLength;case zo:return o*e*2/r.components*r.byteLength;case E0:return o*e*2/r.components*r.byteLength;case T1:return o*e*3/r.components*r.byteLength;case $a:return o*e*4/r.components*r.byteLength;case T0:return o*e*4/r.components*r.byteLength;case $h:case ed:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case td:case nd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case cg:case hg:return Math.max(o,16)*Math.max(e,8)/4;case ug:case fg:return Math.max(o,8)*Math.max(e,8)/2;case dg:case pg:case _g:case gg:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case mg:case vd:case vg:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case xg:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Sg:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case yg:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Mg:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Eg:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Tg:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case bg:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Ag:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Rg:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Cg:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case wg:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Dg:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Lg:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Ug:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Ng:case Og:case Pg:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Fg:case Ig:return Math.ceil(o/4)*Math.ceil(e/4)*8;case xd:case zg:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function y3(o){switch(o){case Ba:case x1:return{byteLength:1,components:1};case Wc:case S1:case yr:return{byteLength:2,components:1};case S0:case y0:return{byteLength:2,components:4};case Sr:case x0:case pr:return{byteLength:4,components:1};case y1:case M1:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:v0}}));typeof window<"u"&&(window.__THREE__?_t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=v0);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function z1(){let o=null,e=!1,t=null,i=null;function r(l,c){i=o.requestAnimationFrame(r),t(l,c)}return{start:function(){e!==!0&&t!==null&&o!==null&&(i=o.requestAnimationFrame(r),e=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){o=l}}}function M3(o){const e=new WeakMap;function t(f,p){const d=f.array,_=f.usage,v=d.byteLength,g=o.createBuffer();o.bindBuffer(p,g),o.bufferData(p,d,_),f.onUploadCallback();let x;if(d instanceof Float32Array)x=o.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=o.HALF_FLOAT;else if(d instanceof Uint16Array)f.isFloat16BufferAttribute?x=o.HALF_FLOAT:x=o.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=o.SHORT;else if(d instanceof Uint32Array)x=o.UNSIGNED_INT;else if(d instanceof Int32Array)x=o.INT;else if(d instanceof Int8Array)x=o.BYTE;else if(d instanceof Uint8Array)x=o.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:f.version,size:v}}function i(f,p,d){const _=p.array,v=p.updateRanges;if(o.bindBuffer(d,f),v.length===0)o.bufferSubData(d,0,_);else{v.sort((x,M)=>x.start-M.start);let g=0;for(let x=1;x<v.length;x++){const M=v[g],E=v[x];E.start<=M.start+M.count+1?M.count=Math.max(M.count,E.start+E.count-M.start):(++g,v[g]=E)}v.length=g+1;for(let x=0,M=v.length;x<M;x++){const E=v[x];o.bufferSubData(d,E.start*_.BYTES_PER_ELEMENT,_,E.start,E.count)}p.clearUpdateRanges()}p.onUploadCallback()}function r(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const p=e.get(f);p&&(o.deleteBuffer(p.buffer),e.delete(f))}function c(f,p){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const _=e.get(f);(!_||_.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const d=e.get(f);if(d===void 0)e.set(f,t(f,p));else if(d.version<f.version){if(d.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,f,p),d.version=f.version}}return{get:r,remove:l,update:c}}var E3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T3=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,b3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,A3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R3=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,w3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,D3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,L3=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,U3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,O3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,F3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,I3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,B3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,G3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,V3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,k3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,X3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,W3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Y3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,q3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Z3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,K3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$3="gl_FragColor = linearToOutputTexel( gl_FragColor );",ew=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,aw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ow=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,mw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,_w=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yw=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ew=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bw=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Aw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ww=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ow=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ww=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Yw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$w=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,e2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,t2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,n2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,i2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,r2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,s2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,o2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,l2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,u2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,f2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,h2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,d2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,p2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,m2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,g2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,v2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,x2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,S2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,y2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,M2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const E2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,D2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,L2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,U2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,N2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,O2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,z2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,H2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,V2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,X2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,W2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Z2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,J2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eD=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tD=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lt={alphahash_fragment:E3,alphahash_pars_fragment:T3,alphamap_fragment:b3,alphamap_pars_fragment:A3,alphatest_fragment:R3,alphatest_pars_fragment:C3,aomap_fragment:w3,aomap_pars_fragment:D3,batching_pars_vertex:L3,batching_vertex:U3,begin_vertex:N3,beginnormal_vertex:O3,bsdfs:P3,iridescence_fragment:F3,bumpmap_pars_fragment:I3,clipping_planes_fragment:z3,clipping_planes_pars_fragment:B3,clipping_planes_pars_vertex:H3,clipping_planes_vertex:G3,color_fragment:V3,color_pars_fragment:k3,color_pars_vertex:X3,color_vertex:W3,common:Y3,cube_uv_reflection_fragment:q3,defaultnormal_vertex:Z3,displacementmap_pars_vertex:K3,displacementmap_vertex:j3,emissivemap_fragment:Q3,emissivemap_pars_fragment:J3,colorspace_fragment:$3,colorspace_pars_fragment:ew,envmap_fragment:tw,envmap_common_pars_fragment:nw,envmap_pars_fragment:iw,envmap_pars_vertex:aw,envmap_physical_pars_fragment:mw,envmap_vertex:rw,fog_vertex:sw,fog_pars_vertex:ow,fog_fragment:lw,fog_pars_fragment:uw,gradientmap_pars_fragment:cw,lightmap_pars_fragment:fw,lights_lambert_fragment:hw,lights_lambert_pars_fragment:dw,lights_pars_begin:pw,lights_toon_fragment:_w,lights_toon_pars_fragment:gw,lights_phong_fragment:vw,lights_phong_pars_fragment:xw,lights_physical_fragment:Sw,lights_physical_pars_fragment:yw,lights_fragment_begin:Mw,lights_fragment_maps:Ew,lights_fragment_end:Tw,lightprobes_pars_fragment:bw,logdepthbuf_fragment:Aw,logdepthbuf_pars_fragment:Rw,logdepthbuf_pars_vertex:Cw,logdepthbuf_vertex:ww,map_fragment:Dw,map_pars_fragment:Lw,map_particle_fragment:Uw,map_particle_pars_fragment:Nw,metalnessmap_fragment:Ow,metalnessmap_pars_fragment:Pw,morphinstance_vertex:Fw,morphcolor_vertex:Iw,morphnormal_vertex:zw,morphtarget_pars_vertex:Bw,morphtarget_vertex:Hw,normal_fragment_begin:Gw,normal_fragment_maps:Vw,normal_pars_fragment:kw,normal_pars_vertex:Xw,normal_vertex:Ww,normalmap_pars_fragment:Yw,clearcoat_normal_fragment_begin:qw,clearcoat_normal_fragment_maps:Zw,clearcoat_pars_fragment:Kw,iridescence_pars_fragment:jw,opaque_fragment:Qw,packing:Jw,premultiplied_alpha_fragment:$w,project_vertex:e2,dithering_fragment:t2,dithering_pars_fragment:n2,roughnessmap_fragment:i2,roughnessmap_pars_fragment:a2,shadowmap_pars_fragment:r2,shadowmap_pars_vertex:s2,shadowmap_vertex:o2,shadowmask_pars_fragment:l2,skinbase_vertex:u2,skinning_pars_vertex:c2,skinning_vertex:f2,skinnormal_vertex:h2,specularmap_fragment:d2,specularmap_pars_fragment:p2,tonemapping_fragment:m2,tonemapping_pars_fragment:_2,transmission_fragment:g2,transmission_pars_fragment:v2,uv_pars_fragment:x2,uv_pars_vertex:S2,uv_vertex:y2,worldpos_vertex:M2,background_vert:E2,background_frag:T2,backgroundCube_vert:b2,backgroundCube_frag:A2,cube_vert:R2,cube_frag:C2,depth_vert:w2,depth_frag:D2,distance_vert:L2,distance_frag:U2,equirect_vert:N2,equirect_frag:O2,linedashed_vert:P2,linedashed_frag:F2,meshbasic_vert:I2,meshbasic_frag:z2,meshlambert_vert:B2,meshlambert_frag:H2,meshmatcap_vert:G2,meshmatcap_frag:V2,meshnormal_vert:k2,meshnormal_frag:X2,meshphong_vert:W2,meshphong_frag:Y2,meshphysical_vert:q2,meshphysical_frag:Z2,meshtoon_vert:K2,meshtoon_frag:j2,points_vert:Q2,points_frag:J2,shadow_vert:$2,shadow_frag:eD,sprite_vert:tD,sprite_frag:nD},We={common:{diffuse:{value:new nn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xt}},envmap:{envMap:{value:null},envMapRotation:{value:new xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xt},normalScale:{value:new en(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new de},probesMax:{value:new de},probesResolution:{value:new de}},points:{diffuse:{value:new nn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0},uvTransform:{value:new xt}},sprite:{diffuse:{value:new nn(16777215)},opacity:{value:1},center:{value:new en(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}}},fr={basic:{uniforms:Oi([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Oi([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new nn(0)},envMapIntensity:{value:1}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Oi([We.common,We.specularmap,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.fog,We.lights,{emissive:{value:new nn(0)},specular:{value:new nn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Oi([We.common,We.envmap,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.roughnessmap,We.metalnessmap,We.fog,We.lights,{emissive:{value:new nn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Oi([We.common,We.aomap,We.lightmap,We.emissivemap,We.bumpmap,We.normalmap,We.displacementmap,We.gradientmap,We.fog,We.lights,{emissive:{value:new nn(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Oi([We.common,We.bumpmap,We.normalmap,We.displacementmap,We.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Oi([We.points,We.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Oi([We.common,We.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Oi([We.common,We.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Oi([We.common,We.bumpmap,We.normalmap,We.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Oi([We.sprite,We.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xt}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distance:{uniforms:Oi([We.common,We.displacementmap,{referencePosition:{value:new de},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distance_vert,fragmentShader:Lt.distance_frag},shadow:{uniforms:Oi([We.lights,We.fog,{color:{value:new nn(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};fr.physical={uniforms:Oi([fr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xt},clearcoatNormalScale:{value:new en(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xt},sheen:{value:0},sheenColor:{value:new nn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xt},transmissionSamplerSize:{value:new en},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xt},attenuationDistance:{value:0},attenuationColor:{value:new nn(0)},specularColor:{value:new nn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xt},anisotropyVector:{value:new en},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xt}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};const Nh={r:0,b:0,g:0},iD=new jn,B1=new xt;B1.set(-1,0,0,0,1,0,0,0,1);function aD(o,e,t,i,r,l){const c=new nn(0);let f=r===!0?0:1,p,d,_=null,v=0,g=null;function x(C){let F=C.isScene===!0?C.background:null;if(F&&F.isTexture){const R=C.backgroundBlurriness>0;F=e.get(F,R)}return F}function M(C){let F=!1;const R=x(C);R===null?S(c,f):R&&R.isColor&&(S(R,1),F=!0);const D=o.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,l):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(o.autoClear||F)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function E(C,F){const R=x(F);R&&(R.isCubeTexture||R.mapping===Ud)?(d===void 0&&(d=new Mr(new $c(1,1,1),new tr({name:"BackgroundCubeMaterial",uniforms:lu(fr.backgroundCube.uniforms),vertexShader:fr.backgroundCube.vertexShader,fragmentShader:fr.backgroundCube.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,N,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=R,d.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(iD.makeRotationFromEuler(F.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(B1),d.material.toneMapped=kt.getTransfer(R.colorSpace)!==on,(_!==R||v!==R.version||g!==o.toneMapping)&&(d.material.needsUpdate=!0,_=R,v=R.version,g=o.toneMapping),d.layers.enableAll(),C.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new Mr(new ef(2,2),new tr({name:"BackgroundMaterial",uniforms:lu(fr.background.uniforms),vertexShader:fr.background.vertexShader,fragmentShader:fr.background.fragmentShader,side:Fo,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,p.material.toneMapped=kt.getTransfer(R.colorSpace)!==on,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(_!==R||v!==R.version||g!==o.toneMapping)&&(p.material.needsUpdate=!0,_=R,v=R.version,g=o.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null))}function S(C,F){C.getRGB(Nh,F1(o)),t.buffers.color.setClear(Nh.r,Nh.g,Nh.b,F,l)}function y(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return c},setClearColor:function(C,F=1){c.set(C),f=F,S(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(C){f=C,S(c,f)},render:M,addToRenderList:E,dispose:y}}function rD(o,e){const t=o.getParameter(o.MAX_VERTEX_ATTRIBS),i={},r=g(null);let l=r,c=!1;function f(V,k,J,Y,Q){let H=!1;const G=v(V,Y,J,k);l!==G&&(l=G,d(l.object)),H=x(V,Y,J,Q),H&&M(V,Y,J,Q),Q!==null&&e.update(Q,o.ELEMENT_ARRAY_BUFFER),(H||c)&&(c=!1,R(V,k,J,Y),Q!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function p(){return o.createVertexArray()}function d(V){return o.bindVertexArray(V)}function _(V){return o.deleteVertexArray(V)}function v(V,k,J,Y){const Q=Y.wireframe===!0;let H=i[k.id];H===void 0&&(H={},i[k.id]=H);const G=V.isInstancedMesh===!0?V.id:0;let te=H[G];te===void 0&&(te={},H[G]=te);let ee=te[J.id];ee===void 0&&(ee={},te[J.id]=ee);let z=ee[Q];return z===void 0&&(z=g(p()),ee[Q]=z),z}function g(V){const k=[],J=[],Y=[];for(let Q=0;Q<t;Q++)k[Q]=0,J[Q]=0,Y[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:J,attributeDivisors:Y,object:V,attributes:{},index:null}}function x(V,k,J,Y){const Q=l.attributes,H=k.attributes;let G=0;const te=J.getAttributes();for(const ee in te)if(te[ee].location>=0){const P=Q[ee];let ne=H[ee];if(ne===void 0&&(ee==="instanceMatrix"&&V.instanceMatrix&&(ne=V.instanceMatrix),ee==="instanceColor"&&V.instanceColor&&(ne=V.instanceColor)),P===void 0||P.attribute!==ne||ne&&P.data!==ne.data)return!0;G++}return l.attributesNum!==G||l.index!==Y}function M(V,k,J,Y){const Q={},H=k.attributes;let G=0;const te=J.getAttributes();for(const ee in te)if(te[ee].location>=0){let P=H[ee];P===void 0&&(ee==="instanceMatrix"&&V.instanceMatrix&&(P=V.instanceMatrix),ee==="instanceColor"&&V.instanceColor&&(P=V.instanceColor));const ne={};ne.attribute=P,P&&P.data&&(ne.data=P.data),Q[ee]=ne,G++}l.attributes=Q,l.attributesNum=G,l.index=Y}function E(){const V=l.newAttributes;for(let k=0,J=V.length;k<J;k++)V[k]=0}function S(V){y(V,0)}function y(V,k){const J=l.newAttributes,Y=l.enabledAttributes,Q=l.attributeDivisors;J[V]=1,Y[V]===0&&(o.enableVertexAttribArray(V),Y[V]=1),Q[V]!==k&&(o.vertexAttribDivisor(V,k),Q[V]=k)}function C(){const V=l.newAttributes,k=l.enabledAttributes;for(let J=0,Y=k.length;J<Y;J++)k[J]!==V[J]&&(o.disableVertexAttribArray(J),k[J]=0)}function F(V,k,J,Y,Q,H,G){G===!0?o.vertexAttribIPointer(V,k,J,Q,H):o.vertexAttribPointer(V,k,J,Y,Q,H)}function R(V,k,J,Y){E();const Q=Y.attributes,H=J.getAttributes(),G=k.defaultAttributeValues;for(const te in H){const ee=H[te];if(ee.location>=0){let z=Q[te];if(z===void 0&&(te==="instanceMatrix"&&V.instanceMatrix&&(z=V.instanceMatrix),te==="instanceColor"&&V.instanceColor&&(z=V.instanceColor)),z!==void 0){const P=z.normalized,ne=z.itemSize,_e=e.get(z);if(_e===void 0)continue;const Ae=_e.buffer,Ne=_e.type,Be=_e.bytesPerElement,ie=Ne===o.INT||Ne===o.UNSIGNED_INT||z.gpuType===x0;if(z.isInterleavedBufferAttribute){const pe=z.data,Ce=pe.stride,at=z.offset;if(pe.isInstancedInterleavedBuffer){for(let Ie=0;Ie<ee.locationSize;Ie++)y(ee.location+Ie,pe.meshPerAttribute);V.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Ie=0;Ie<ee.locationSize;Ie++)S(ee.location+Ie);o.bindBuffer(o.ARRAY_BUFFER,Ae);for(let Ie=0;Ie<ee.locationSize;Ie++)F(ee.location+Ie,ne/ee.locationSize,Ne,P,Ce*Be,(at+ne/ee.locationSize*Ie)*Be,ie)}else{if(z.isInstancedBufferAttribute){for(let pe=0;pe<ee.locationSize;pe++)y(ee.location+pe,z.meshPerAttribute);V.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let pe=0;pe<ee.locationSize;pe++)S(ee.location+pe);o.bindBuffer(o.ARRAY_BUFFER,Ae);for(let pe=0;pe<ee.locationSize;pe++)F(ee.location+pe,ne/ee.locationSize,Ne,P,ne*Be,ne/ee.locationSize*pe*Be,ie)}}else if(G!==void 0){const P=G[te];if(P!==void 0)switch(P.length){case 2:o.vertexAttrib2fv(ee.location,P);break;case 3:o.vertexAttrib3fv(ee.location,P);break;case 4:o.vertexAttrib4fv(ee.location,P);break;default:o.vertexAttrib1fv(ee.location,P)}}}}C()}function D(){L();for(const V in i){const k=i[V];for(const J in k){const Y=k[J];for(const Q in Y){const H=Y[Q];for(const G in H)_(H[G].object),delete H[G];delete Y[Q]}}delete i[V]}}function N(V){if(i[V.id]===void 0)return;const k=i[V.id];for(const J in k){const Y=k[J];for(const Q in Y){const H=Y[Q];for(const G in H)_(H[G].object),delete H[G];delete Y[Q]}}delete i[V.id]}function w(V){for(const k in i){const J=i[k];for(const Y in J){const Q=J[Y];if(Q[V.id]===void 0)continue;const H=Q[V.id];for(const G in H)_(H[G].object),delete H[G];delete Q[V.id]}}}function b(V){for(const k in i){const J=i[k],Y=V.isInstancedMesh===!0?V.id:0,Q=J[Y];if(Q!==void 0){for(const H in Q){const G=Q[H];for(const te in G)_(G[te].object),delete G[te];delete Q[H]}delete J[Y],Object.keys(J).length===0&&delete i[k]}}}function L(){I(),c=!0,l!==r&&(l=r,d(l.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:f,reset:L,resetDefaultState:I,dispose:D,releaseStatesOfGeometry:N,releaseStatesOfObject:b,releaseStatesOfProgram:w,initAttributes:E,enableAttribute:S,disableUnusedAttributes:C}}function sD(o,e,t){let i;function r(p){i=p}function l(p,d){o.drawArrays(i,p,d),t.update(d,i,1)}function c(p,d,_){_!==0&&(o.drawArraysInstanced(i,p,d,_),t.update(d,i,_))}function f(p,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,p,0,d,0,_);let g=0;for(let x=0;x<_;x++)g+=d[x];t.update(g,i,1)}this.setMode=r,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function oD(o,e,t,i){let r;function l(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=o.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function c(w){return!(w!==$a&&i.convert(w)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(w){const b=w===yr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Ba&&w!==pr&&!b&&i.convert(w)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function p(w){if(w==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const _=p(d);_!==d&&(_t("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const v=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&g===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),M=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),y=o.getParameter(o.MAX_VERTEX_ATTRIBS),C=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),F=o.getParameter(o.MAX_VARYING_VECTORS),R=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),D=o.getParameter(o.MAX_SAMPLES),N=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:p,textureFormatReadable:c,textureTypeReadable:f,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:M,maxTextureSize:E,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:C,maxVaryings:F,maxFragmentUniforms:R,maxSamples:D,samples:N}}function lD(o){const e=this;let t=null,i=0,r=!1,l=!1;const c=new Fs,f=new xt,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const x=v.length!==0||g||i!==0||r;return r=g,i=v.length,x},this.beginShadows=function(){l=!0,_(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,g){t=_(v,g,0)},this.setState=function(v,g,x){const M=v.clippingPlanes,E=v.clipIntersection,S=v.clipShadows,y=o.get(v);if(!r||M===null||M.length===0||l&&!S)l?_(null):d();else{const C=l?0:i,F=C*4;let R=y.clippingState||null;p.value=R,R=_(M,g,F,x);for(let D=0;D!==F;++D)R[D]=t[D];y.clippingState=R,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=C}};function d(){p.value!==t&&(p.value=t,p.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function _(v,g,x,M){const E=v!==null?v.length:0;let S=null;if(E!==0){if(S=p.value,M!==!0||S===null){const y=x+E*4,C=g.matrixWorldInverse;f.getNormalMatrix(C),(S===null||S.length<y)&&(S=new Float32Array(y));for(let F=0,R=x;F!==E;++F,R+=4)c.copy(v[F]).applyMatrix4(C,f),c.normal.toArray(S,R),S[R+3]=c.constant}p.value=S,p.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,S}}const Xl=4,uD=6,cD=20,fD=256,oc=new w0,TM=new nn;let R_=null,C_=0,w_=0,D_=!1;const hD=new de,yo=new de;class bM{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,l={}){const{size:c=256,position:f=hD}=l;R_=this._renderer.getRenderTarget(),C_=this._renderer.getActiveCubeFace(),w_=this._renderer.getActiveMipmapLevel(),D_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,i,r,p,f),t>0&&this._blur(p,0,0,t),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=CM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=RM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(R_,C_,w_),this._renderer.xr.enabled=D_,e.scissorTest=!1,Pl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Io||e.mapping===ou?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),R_=this._renderer.getRenderTarget(),C_=this._renderer.getActiveCubeFace(),w_=this._renderer.getActiveMipmapLevel(),D_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:yr,format:$a,colorSpace:Sd,depthBuffer:!1},r=AM(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=AM(e,t,i);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dD(l)),this._blurMaterial=mD(l,e,t),this._ggxMaterial=pD(l,e,t)}return r}_compileMaterial(e){const t=new Mr(new rs,e);this._renderer.compile(t,oc)}_sceneToCubeUV(e,t,i,r,l){const p=new Qa(90,1,t,i),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,x=v.toneMapping;v.getClearColor(TM),v.toneMapping=gr,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(r),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mr(new $c,new U1({name:"PMREM.Background",side:$i,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,S=E.material;let y=!1;const C=e.background;C?C.isColor&&(S.color.copy(C),e.background=null,y=!0):(S.color.copy(TM),y=!0);for(let F=0;F<6;F++){const R=F%3;R===0?(p.up.set(0,d[F],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x+_[F],l.y,l.z)):R===1?(p.up.set(0,0,d[F]),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y+_[F],l.z)):(p.up.set(0,d[F],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y,l.z+_[F]));const D=this._cubeSize;Pl(r,R*D,F>2?D:0,D,D),v.setRenderTarget(r),y&&v.render(E,p),v.render(e,p)}v.toneMapping=x,v.autoClear=g,e.background=C}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Io||e.mapping===ou;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=CM()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=RM());const l=r?this._cubemapMaterial:this._equirectMaterial,c=this._lodMeshes[0];c.material=l;const f=l.uniforms;f.envMap.value=e;const p=this._cubeSize;Pl(t,0,0,3*p,2*p),i.setRenderTarget(t),i.render(c,oc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let l=1;l<r;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,l=this._pingPongRenderTarget,c=this._ggxMaterial,f=this._lodMeshes[i];f.material=c;const p=c.uniforms,d=i/(this._lodMeshes.length-1),_=t/(this._lodMeshes.length-1),v=Math.sqrt(d*d-_*_),g=d*1.25,x=v*g,{_lodMax:M}=this,E=this._sizeLods[i],S=3*E*(i>M-Xl?i-M+Xl:0),y=4*(this._cubeSize-E);p.envMap.value=e.texture,p.roughness.value=x,p.mipInt.value=M-t,Pl(l,S,y,3*E,2*E),r.setRenderTarget(l),r.render(f,oc),p.envMap.value=l.texture,p.roughness.value=0,p.mipInt.value=M-i,Pl(e,S,y,3*E,2*E),r.setRenderTarget(e),r.render(f,oc)}_blur(e,t,i,r){const l=this._pingPongRenderTarget,c=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,l,t,i,c),this._blurPass(l,e,i,i,c)}_blurPass(e,t,i,r,l){const c=this._renderer,f=this._blurMaterial,p=this._lodMeshes[r];p.material=f;const d=f.uniforms;d.envMap.value=e.texture,d.sigma.value=l,d.mipInt.value=this._lodMax-i;const _=this._sizeLods[r],v=3*_*(r>this._lodMax-Xl?r-this._lodMax+Xl:0),g=4*(this._cubeSize-_);Pl(t,v,g,3*_,2*_),c.setRenderTarget(t),c.render(p,oc)}}function dD(o){const e=[],t=[];let i=o;const r=o-Xl+1+uD;for(let l=0;l<r;l++){const c=Math.pow(2,i);e.push(c);const f=1/(c-2),p=-f,d=1+f,_=[p,p,d,p,d,d,p,p,d,d,p,d],v=6,g=6,x=3,M=new Float32Array(x*g*v),E=new Float32Array(x*g*v);for(let y=0;y<v;y++){const C=y%3*2/3-1,F=y>2?0:-1,R=[C,F,0,C+2/3,F,0,C+2/3,F+1,0,C,F,0,C+2/3,F+1,0,C,F+1,0];M.set(R,x*g*y);for(let D=0;D<g;D++){const N=_[D*2]*2-1,w=_[D*2+1]*2-1;y===0?yo.set(1,w,N):y===1?yo.set(-N,1,-w):y===2?yo.set(-N,w,1):y===3?yo.set(-1,w,-N):y===4?yo.set(-N,-1,w):yo.set(N,w,-1),yo.toArray(E,(y*g+D)*x)}}const S=new rs;S.setAttribute("position",new $r(M,x)),S.setAttribute("outputDirection",new $r(E,x)),t.push(new Mr(S,null)),i>Xl&&i--}return{lodMeshes:t,sizeLods:e}}function AM(o,e,t){const i=new er(o,e,t);return i.texture.mapping=Ud,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pl(o,e,t,i,r){o.viewport.set(e,t,i,r),o.scissor.set(e,t,i,r)}function pD(o,e,t){return new tr({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:fD,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Od(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qr,depthTest:!1,depthWrite:!1})}function mD(o,e,t){return new tr({name:"SphericalGaussianBlur",defines:{SAMPLES:cD,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Od(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Qr,depthTest:!1,depthWrite:!1})}function RM(){return new tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qr,depthTest:!1,depthWrite:!1})}function CM(){return new tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qr,depthTest:!1,depthWrite:!1})}function Od(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class H1 extends er{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new O1(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new $c(5,5,5),l=new tr({name:"CubemapFromEquirect",uniforms:lu(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$i,blending:Qr});l.uniforms.tEquirect.value=t;const c=new Mr(r,l),f=t.minFilter;return t.minFilter===Ao&&(t.minFilter=Ai),new x3(1,10,this).update(e,c),t.minFilter=f,c.geometry.dispose(),c.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,i,r);e.setRenderTarget(l)}}function _D(o){let e=new WeakMap,t=new WeakMap,i=null;function r(g,x=!1){return g==null?null:x?c(g):l(g)}function l(g){if(g&&g.isTexture){const x=g.mapping;if(x===t_||x===n_)if(e.has(g)){const M=e.get(g).texture;return f(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const E=new H1(M.height);return E.fromEquirectangularTexture(o,g),e.set(g,E),g.addEventListener("dispose",d),f(E.texture,g.mapping)}else return null}}return g}function c(g){if(g&&g.isTexture){const x=g.mapping,M=x===t_||x===n_,E=x===Io||x===ou;if(M||E){let S=t.get(g);const y=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==y)return i===null&&(i=new bM(o)),S=M?i.fromEquirectangular(g,S):i.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,t.set(g,S),S.texture;if(S!==void 0)return S.texture;{const C=g.image;return M&&C&&C.height>0||E&&C&&p(C)?(i===null&&(i=new bM(o)),S=M?i.fromEquirectangular(g):i.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,t.set(g,S),g.addEventListener("dispose",_),S.texture):null}}}return g}function f(g,x){return x===t_?g.mapping=Io:x===n_&&(g.mapping=ou),g}function p(g){let x=0;const M=6;for(let E=0;E<M;E++)g[E]!==void 0&&x++;return x===M}function d(g){const x=g.target;x.removeEventListener("dispose",d);const M=e.get(x);M!==void 0&&(e.delete(x),M.dispose())}function _(g){const x=g.target;x.removeEventListener("dispose",_);const M=t.get(x);M!==void 0&&(t.delete(x),M.dispose())}function v(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:v}}function gD(o){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=o.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&jl("WebGLRenderer: "+i+" extension not supported."),r}}}function vD(o,e,t,i){const r={},l=new WeakMap;function c(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",c),delete r[g.id];const x=l.get(g);x&&(e.remove(x),l.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function f(v,g){return r[g.id]===!0||(g.addEventListener("dispose",c),r[g.id]=!0,t.memory.geometries++),g}function p(v){const g=v.attributes;for(const x in g)e.update(g[x],o.ARRAY_BUFFER)}function d(v){const g=[],x=v.index,M=v.attributes.position;let E=0;if(M===void 0)return;if(x!==null){const C=x.array;E=x.version;for(let F=0,R=C.length;F<R;F+=3){const D=C[F+0],N=C[F+1],w=C[F+2];g.push(D,N,N,w,w,D)}}else{const C=M.array;E=M.version;for(let F=0,R=C.length/3-1;F<R;F+=3){const D=F+0,N=F+1,w=F+2;g.push(D,N,N,w,w,D)}}const S=new(M.count>=65535?L1:D1)(g,1);S.version=E;const y=l.get(v);y&&e.remove(y),l.set(v,S)}function _(v){const g=l.get(v);if(g){const x=v.index;x!==null&&g.version<x.version&&d(v)}else d(v);return l.get(v)}return{get:f,update:p,getWireframeAttribute:_}}function xD(o,e,t){let i;function r(v){i=v}let l,c;function f(v){l=v.type,c=v.bytesPerElement}function p(v,g){o.drawElements(i,g,l,v*c),t.update(g,i,1)}function d(v,g,x){x!==0&&(o.drawElementsInstanced(i,g,l,v*c,x),t.update(g,i,x))}function _(v,g,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,l,v,0,x);let E=0;for(let S=0;S<x;S++)E+=g[S];t.update(E,i,1)}this.setMode=r,this.setIndex=f,this.render=p,this.renderInstances=d,this.renderMultiDraw=_}function SD(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(l,c,f){switch(t.calls++,c){case o.TRIANGLES:t.triangles+=f*(l/3);break;case o.LINES:t.lines+=f*(l/2);break;case o.LINE_STRIP:t.lines+=f*(l-1);break;case o.LINE_LOOP:t.lines+=f*l;break;case o.POINTS:t.points+=f*l;break;default:Qt("WebGLInfo: Unknown draw mode:",c);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function yD(o,e,t){const i=new WeakMap,r=new Fn;function l(c,f,p){const d=c.morphTargetInfluences,_=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,v=_!==void 0?_.length:0;let g=i.get(f);if(g===void 0||g.count!==v){let I=function(){b.dispose(),i.delete(f),f.removeEventListener("dispose",I)};var x=I;g!==void 0&&g.texture.dispose();const M=f.morphAttributes.position!==void 0,E=f.morphAttributes.normal!==void 0,S=f.morphAttributes.color!==void 0,y=f.morphAttributes.position||[],C=f.morphAttributes.normal||[],F=f.morphAttributes.color||[];let R=0;M===!0&&(R=1),E===!0&&(R=2),S===!0&&(R=3);let D=f.attributes.position.count*R,N=1;D>e.maxTextureSize&&(N=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*N*4*v),b=new R1(w,D,N,v);b.type=pr,b.needsUpdate=!0;const L=R*4;for(let V=0;V<v;V++){const k=y[V],J=C[V],Y=F[V],Q=D*N*4*V;for(let H=0;H<k.count;H++){const G=H*L;M===!0&&(r.fromBufferAttribute(k,H),w[Q+G+0]=r.x,w[Q+G+1]=r.y,w[Q+G+2]=r.z,w[Q+G+3]=0),E===!0&&(r.fromBufferAttribute(J,H),w[Q+G+4]=r.x,w[Q+G+5]=r.y,w[Q+G+6]=r.z,w[Q+G+7]=0),S===!0&&(r.fromBufferAttribute(Y,H),w[Q+G+8]=r.x,w[Q+G+9]=r.y,w[Q+G+10]=r.z,w[Q+G+11]=Y.itemSize===4?r.w:1)}}g={count:v,texture:b,size:new en(D,N)},i.set(f,g),f.addEventListener("dispose",I)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",c.morphTexture,t);else{let M=0;for(let S=0;S<d.length;S++)M+=d[S];const E=f.morphTargetsRelative?1:1-M;p.getUniforms().setValue(o,"morphTargetBaseInfluence",E),p.getUniforms().setValue(o,"morphTargetInfluences",d)}p.getUniforms().setValue(o,"morphTargetsTexture",g.texture,t),p.getUniforms().setValue(o,"morphTargetsTextureSize",g.size)}return{update:l}}function MD(o,e,t,i,r){let l=new WeakMap;function c(d){const _=r.render.frame,v=d.geometry,g=e.get(d,v);if(l.get(g)!==_&&(e.update(g),l.set(g,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",p)===!1&&d.addEventListener("dispose",p),l.get(d)!==_&&(t.update(d.instanceMatrix,o.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,o.ARRAY_BUFFER),l.set(d,_))),d.isSkinnedMesh){const x=d.skeleton;l.get(x)!==_&&(x.update(),l.set(x,_))}return g}function f(){l=new WeakMap}function p(d){const _=d.target;_.removeEventListener("dispose",p),i.releaseStatesOfObject(_),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:c,dispose:f}}const ED={[f1]:"LINEAR_TONE_MAPPING",[h1]:"REINHARD_TONE_MAPPING",[d1]:"CINEON_TONE_MAPPING",[p1]:"ACES_FILMIC_TONE_MAPPING",[_1]:"AGX_TONE_MAPPING",[g1]:"NEUTRAL_TONE_MAPPING",[m1]:"CUSTOM_TONE_MAPPING"};function TD(o,e,t,i,r,l){const c=new er(e,t,{type:o,depthBuffer:r,stencilBuffer:l,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let f=null,p=null;const d=new rs;d.setAttribute("position",new es([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new es([0,2,0,0,2,0],2));const _=new _3({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),v=new Mr(d,_),g=new w0(-1,1,1,-1,0,1);let x=null,M=null,E=!1,S,y=null,C=[],F=!1;this.setSize=function(R,D){c.setSize(R,D),f!==null&&f.setSize(R,D),p!==null&&p.setSize(R,D);for(let N=0;N<C.length;N++){const w=C[N];w.setSize&&w.setSize(R,D)}},this.setEffects=function(R){C=R,F=C.length>0&&C[0].isRenderPass===!0;const D=c.width,N=c.height;C.length>0&&f===null&&(f=new er(D,N,{type:yr,depthBuffer:!1,stencilBuffer:!1}),p=new er(D,N,{type:yr,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<C.length;w++){const b=C[w];b.setSize&&b.setSize(D,N)}},this.begin=function(R,D){if(E||R.toneMapping===gr&&C.length===0)return!1;if(y=D,D!==null){const N=D.width,w=D.height;(c.width!==N||c.height!==w)&&this.setSize(N,w)}return F===!1&&R.setRenderTarget(c),S=R.toneMapping,R.toneMapping=gr,!0},this.hasRenderPass=function(){return F},this.end=function(R,D){R.toneMapping=S,E=!0;let N=c,w=f;for(let b=0;b<C.length;b++){const L=C[b];L.enabled!==!1&&(L.render(R,w,N,D),L.needsSwap!==!1&&(N=w,w=w===f?p:f))}if(x!==R.outputColorSpace||M!==R.toneMapping){x=R.outputColorSpace,M=R.toneMapping,_.defines={},kt.getTransfer(x)===on&&(_.defines.SRGB_TRANSFER="");const b=ED[M];b&&(_.defines[b]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=N.texture,R.setRenderTarget(y),R.render(v,g),y=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){c.dispose(),f!==null&&f.dispose(),p!==null&&p.dispose(),d.dispose(),_.dispose()}}const G1=new Bi,Hg=new qc(1,1),V1=new R1,k1=new YC,X1=new O1,wM=[],DM=[],LM=new Float32Array(16),UM=new Float32Array(9),NM=new Float32Array(4);function fu(o,e,t){const i=o[0];if(i<=0||i>0)return o;const r=e*t;let l=wM[r];if(l===void 0&&(l=new Float32Array(r),wM[r]=l),e!==0){i.toArray(l,0);for(let c=1,f=0;c!==e;++c)f+=t,o[c].toArray(l,f)}return l}function ni(o,e){if(o.length!==e.length)return!1;for(let t=0,i=o.length;t<i;t++)if(o[t]!==e[t])return!1;return!0}function ii(o,e){for(let t=0,i=e.length;t<i;t++)o[t]=e[t]}function Pd(o,e){let t=DM[e];t===void 0&&(t=new Int32Array(e),DM[e]=t);for(let i=0;i!==e;++i)t[i]=o.allocateTextureUnit();return t}function bD(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function AD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ni(t,e))return;o.uniform2fv(this.addr,e),ii(t,e)}}function RD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ni(t,e))return;o.uniform3fv(this.addr,e),ii(t,e)}}function CD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ni(t,e))return;o.uniform4fv(this.addr,e),ii(t,e)}}function wD(o,e){const t=this.cache,i=e.elements;if(i===void 0){if(ni(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),ii(t,e)}else{if(ni(t,i))return;NM.set(i),o.uniformMatrix2fv(this.addr,!1,NM),ii(t,i)}}function DD(o,e){const t=this.cache,i=e.elements;if(i===void 0){if(ni(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),ii(t,e)}else{if(ni(t,i))return;UM.set(i),o.uniformMatrix3fv(this.addr,!1,UM),ii(t,i)}}function LD(o,e){const t=this.cache,i=e.elements;if(i===void 0){if(ni(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),ii(t,e)}else{if(ni(t,i))return;LM.set(i),o.uniformMatrix4fv(this.addr,!1,LM),ii(t,i)}}function UD(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function ND(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ni(t,e))return;o.uniform2iv(this.addr,e),ii(t,e)}}function OD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ni(t,e))return;o.uniform3iv(this.addr,e),ii(t,e)}}function PD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ni(t,e))return;o.uniform4iv(this.addr,e),ii(t,e)}}function FD(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function ID(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ni(t,e))return;o.uniform2uiv(this.addr,e),ii(t,e)}}function zD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ni(t,e))return;o.uniform3uiv(this.addr,e),ii(t,e)}}function BD(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ni(t,e))return;o.uniform4uiv(this.addr,e),ii(t,e)}}function HD(o,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(o.uniform1i(this.addr,r),i[0]=r);let l;this.type===o.SAMPLER_2D_SHADOW?(Hg.compareFunction=t.isReversedDepthBuffer()?A0:b0,l=Hg):l=G1,t.setTexture2D(e||l,r)}function GD(o,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(o.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||k1,r)}function VD(o,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(o.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||X1,r)}function kD(o,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(o.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||V1,r)}function XD(o){switch(o){case 5126:return bD;case 35664:return AD;case 35665:return RD;case 35666:return CD;case 35674:return wD;case 35675:return DD;case 35676:return LD;case 5124:case 35670:return UD;case 35667:case 35671:return ND;case 35668:case 35672:return OD;case 35669:case 35673:return PD;case 5125:return FD;case 36294:return ID;case 36295:return zD;case 36296:return BD;case 35678:case 36198:case 36298:case 36306:case 35682:return HD;case 35679:case 36299:case 36307:return GD;case 35680:case 36300:case 36308:case 36293:return VD;case 36289:case 36303:case 36311:case 36292:return kD}}function WD(o,e){o.uniform1fv(this.addr,e)}function YD(o,e){const t=fu(e,this.size,2);o.uniform2fv(this.addr,t)}function qD(o,e){const t=fu(e,this.size,3);o.uniform3fv(this.addr,t)}function ZD(o,e){const t=fu(e,this.size,4);o.uniform4fv(this.addr,t)}function KD(o,e){const t=fu(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function jD(o,e){const t=fu(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function QD(o,e){const t=fu(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function JD(o,e){o.uniform1iv(this.addr,e)}function $D(o,e){o.uniform2iv(this.addr,e)}function eL(o,e){o.uniform3iv(this.addr,e)}function tL(o,e){o.uniform4iv(this.addr,e)}function nL(o,e){o.uniform1uiv(this.addr,e)}function iL(o,e){o.uniform2uiv(this.addr,e)}function aL(o,e){o.uniform3uiv(this.addr,e)}function rL(o,e){o.uniform4uiv(this.addr,e)}function sL(o,e,t){const i=this.cache,r=e.length,l=Pd(t,r);ni(i,l)||(o.uniform1iv(this.addr,l),ii(i,l));let c;this.type===o.SAMPLER_2D_SHADOW?c=Hg:c=G1;for(let f=0;f!==r;++f)t.setTexture2D(e[f]||c,l[f])}function oL(o,e,t){const i=this.cache,r=e.length,l=Pd(t,r);ni(i,l)||(o.uniform1iv(this.addr,l),ii(i,l));for(let c=0;c!==r;++c)t.setTexture3D(e[c]||k1,l[c])}function lL(o,e,t){const i=this.cache,r=e.length,l=Pd(t,r);ni(i,l)||(o.uniform1iv(this.addr,l),ii(i,l));for(let c=0;c!==r;++c)t.setTextureCube(e[c]||X1,l[c])}function uL(o,e,t){const i=this.cache,r=e.length,l=Pd(t,r);ni(i,l)||(o.uniform1iv(this.addr,l),ii(i,l));for(let c=0;c!==r;++c)t.setTexture2DArray(e[c]||V1,l[c])}function cL(o){switch(o){case 5126:return WD;case 35664:return YD;case 35665:return qD;case 35666:return ZD;case 35674:return KD;case 35675:return jD;case 35676:return QD;case 5124:case 35670:return JD;case 35667:case 35671:return $D;case 35668:case 35672:return eL;case 35669:case 35673:return tL;case 5125:return nL;case 36294:return iL;case 36295:return aL;case 36296:return rL;case 35678:case 36198:case 36298:case 36306:case 35682:return sL;case 35679:case 36299:case 36307:return oL;case 35680:case 36300:case 36308:case 36293:return lL;case 36289:case 36303:case 36311:case 36292:return uL}}class fL{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=XD(t.type)}}class hL{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cL(t.type)}}class dL{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let l=0,c=r.length;l!==c;++l){const f=r[l];f.setValue(e,t[f.id],i)}}}const L_=/(\w+)(\])?(\[|\.)?/g;function OM(o,e){o.seq.push(e),o.map[e.id]=e}function pL(o,e,t){const i=o.name,r=i.length;for(L_.lastIndex=0;;){const l=L_.exec(i),c=L_.lastIndex;let f=l[1];const p=l[2]==="]",d=l[3];if(p&&(f=f|0),d===void 0||d==="["&&c+2===r){OM(t,d===void 0?new fL(f,o,e):new hL(f,o,e));break}else{let v=t.map[f];v===void 0&&(v=new dL(f),OM(t,v)),t=v}}}class id{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let c=0;c<i;++c){const f=e.getActiveUniform(t,c),p=e.getUniformLocation(t,f.name);pL(f,p,this)}const r=[],l=[];for(const c of this.seq)c.type===e.SAMPLER_2D_SHADOW||c.type===e.SAMPLER_CUBE_SHADOW||c.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(c):l.push(c);r.length>0&&(this.seq=r.concat(l))}setValue(e,t,i,r){const l=this.map[t];l!==void 0&&l.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let l=0,c=t.length;l!==c;++l){const f=t[l],p=i[f.id];p.needsUpdate!==!1&&f.setValue(e,p.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,l=e.length;r!==l;++r){const c=e[r];c.id in t&&i.push(c)}return i}}function PM(o,e,t){const i=o.createShader(e);return o.shaderSource(i,t),o.compileShader(i),i}const mL=37297;let _L=0;function gL(o,e){const t=o.split(`
`),i=[],r=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let c=r;c<l;c++){const f=c+1;i.push(`${f===e?">":" "} ${f}: ${t[c]}`)}return i.join(`
`)}const FM=new xt;function vL(o){kt._getMatrix(FM,kt.workingColorSpace,o);const e=`mat3( ${FM.elements.map(t=>t.toFixed(4))} )`;switch(kt.getTransfer(o)){case yd:return[e,"LinearTransferOETF"];case on:return[e,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function IM(o,e,t){const i=o.getShaderParameter(e,o.COMPILE_STATUS),l=(o.getShaderInfoLog(e)||"").trim();if(i&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return t.toUpperCase()+`

`+l+`

`+gL(o.getShaderSource(e),f)}else return l}function xL(o,e){const t=vL(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const SL={[f1]:"Linear",[h1]:"Reinhard",[d1]:"Cineon",[p1]:"ACESFilmic",[_1]:"AgX",[g1]:"Neutral",[m1]:"Custom"};function yL(o,e){const t=SL[e];return t===void 0?(_t("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oh=new de;function ML(){kt.getLuminanceCoefficients(Oh);const o=Oh.x.toFixed(4),e=Oh.y.toFixed(4),t=Oh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function EL(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mc).join(`
`)}function TL(o){const e=[];for(const t in o){const i=o[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function bL(o,e){const t={},i=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const l=o.getActiveAttrib(e,r),c=l.name;let f=1;l.type===o.FLOAT_MAT2&&(f=2),l.type===o.FLOAT_MAT3&&(f=3),l.type===o.FLOAT_MAT4&&(f=4),t[c]={type:l.type,location:o.getAttribLocation(e,c),locationSize:f}}return t}function mc(o){return o!==""}function zM(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function BM(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AL=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gg(o){return o.replace(AL,CL)}const RL=new Map;function CL(o,e){let t=Lt[e];if(t===void 0){const i=RL.get(e);if(i!==void 0)t=Lt[i],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gg(t)}const wL=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function HM(o){return o.replace(wL,DL)}function DL(o,e,t,i){let r="";for(let l=parseInt(e);l<parseInt(t);l++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return r}function GM(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const LL={[Jh]:"SHADOWMAP_TYPE_PCF",[pc]:"SHADOWMAP_TYPE_VSM"};function UL(o){return LL[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const NL={[Io]:"ENVMAP_TYPE_CUBE",[ou]:"ENVMAP_TYPE_CUBE",[Ud]:"ENVMAP_TYPE_CUBE_UV"};function OL(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":NL[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const PL={[ou]:"ENVMAP_MODE_REFRACTION"};function FL(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":PL[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const IL={[c1]:"ENVMAP_BLENDING_MULTIPLY",[EC]:"ENVMAP_BLENDING_MIX",[TC]:"ENVMAP_BLENDING_ADD"};function zL(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":IL[o.combine]||"ENVMAP_BLENDING_NONE"}function BL(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function HL(o,e,t,i){const r=o.getContext(),l=t.defines;let c=t.vertexShader,f=t.fragmentShader;const p=UL(t),d=OL(t),_=FL(t),v=zL(t),g=BL(t),x=EL(t),M=TL(l),E=r.createProgram();let S,y,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(mc).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(mc).join(`
`),y.length>0&&(y+=`
`)):(S=[GM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mc).join(`
`),y=[GM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+_:"",t.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gr?"#define TONE_MAPPING":"",t.toneMapping!==gr?Lt.tonemapping_pars_fragment:"",t.toneMapping!==gr?yL("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,xL("linearToOutputTexel",t.outputColorSpace),ML(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mc).join(`
`)),c=Gg(c),c=zM(c,t),c=BM(c,t),f=Gg(f),f=zM(f,t),f=BM(f,t),c=HM(c),f=HM(f),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,S=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",t.glslVersion===nM?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nM?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const F=C+S+c,R=C+y+f,D=PM(r,r.VERTEX_SHADER,F),N=PM(r,r.FRAGMENT_SHADER,R);r.attachShader(E,D),r.attachShader(E,N),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function w(V){if(o.debug.checkShaderErrors){const k=r.getProgramInfoLog(E)||"",J=r.getShaderInfoLog(D)||"",Y=r.getShaderInfoLog(N)||"",Q=k.trim(),H=J.trim(),G=Y.trim();let te=!0,ee=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(te=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(r,E,D,N);else{const z=IM(r,D,"vertex"),P=IM(r,N,"fragment");Qt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+Q+`
`+z+`
`+P)}else Q!==""?_t("WebGLProgram: Program Info Log:",Q):(H===""||G==="")&&(ee=!1);ee&&(V.diagnostics={runnable:te,programLog:Q,vertexShader:{log:H,prefix:S},fragmentShader:{log:G,prefix:y}})}r.deleteShader(D),r.deleteShader(N),b=new id(r,E),L=bL(r,E)}let b;this.getUniforms=function(){return b===void 0&&w(this),b};let L;this.getAttributes=function(){return L===void 0&&w(this),L};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(E,mL)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_L++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=D,this.fragmentShader=N,this}let GL=0;class VL{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new kL(e),t.set(e,i)),i}}class kL{constructor(e){this.id=GL++,this.code=e,this.usedTimes=0}}function XL(o){return o===zo||o===vd||o===xd}function WL(o,e,t,i,r,l){const c=new C1,f=new VL,p=new Set,d=[],_=new Map,v=i.logarithmicDepthBuffer;let g=i.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(b){return p.add(b),b===0?"uv":`uv${b}`}function E(b,L,I,V,k,J){const Y=V.fog,Q=k.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?V.environment:null,G=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,te=e.get(b.envMap||H,G),ee=te&&te.mapping===Ud?te.image.height:null,z=x[b.type];b.precision!==null&&(g=i.getMaxPrecision(b.precision),g!==b.precision&&_t("WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const P=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ne=P!==void 0?P.length:0;let _e=0;Q.morphAttributes.position!==void 0&&(_e=1),Q.morphAttributes.normal!==void 0&&(_e=2),Q.morphAttributes.color!==void 0&&(_e=3);let Ae,Ne,Be,ie;if(z){const it=fr[z];Ae=it.vertexShader,Ne=it.fragmentShader}else{Ae=b.vertexShader,Ne=b.fragmentShader;const it=f.getVertexShaderStage(b),Re=f.getFragmentShaderStage(b);f.update(b,it,Re),Be=it.id,ie=Re.id}const pe=o.getRenderTarget(),Ce=o.state.buffers.depth.getReversed(),at=k.isInstancedMesh===!0,Ie=k.isBatchedMesh===!0,st=!!b.map,lt=!!b.matcap,je=!!te,ct=!!b.aoMap,gt=!!b.lightMap,re=!!b.bumpMap&&b.wireframe===!1,bt=!!b.normalMap,qt=!!b.displacementMap,pn=!!b.emissiveMap,ht=!!b.metalnessMap,Zt=!!b.roughnessMap,j=b.anisotropy>0,Ot=b.clearcoat>0,dt=b.dispersion>0,B=b.retroreflectivity>0,A=b.iridescence>0,$=b.sheen>0,le=b.transmission>0,me=j&&!!b.anisotropyMap,Oe=Ot&&!!b.clearcoatMap,De=Ot&&!!b.clearcoatNormalMap,xe=Ot&&!!b.clearcoatRoughnessMap,ge=A&&!!b.iridescenceMap,Pe=A&&!!b.iridescenceThicknessMap,Xe=$&&!!b.sheenColorMap,He=$&&!!b.sheenRoughnessMap,ze=!!b.specularMap,Le=!!b.specularColorMap,tt=!!b.specularIntensityMap,rt=le&&!!b.transmissionMap,Z=le&&!!b.thicknessMap,Ue=!!b.gradientMap,Se=!!b.alphaMap,Fe=b.alphaTest>0,Ve=!!b.alphaHash,be=!!b.extensions;let we=gr;b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(we=o.toneMapping);const Ee={shaderID:z,shaderType:b.type,shaderName:b.name,vertexShader:Ae,fragmentShader:Ne,defines:b.defines,customVertexShaderID:Be,customFragmentShaderID:ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Ie,batchingColor:Ie&&k._colorsTexture!==null,instancing:at,instancingColor:at&&k.instanceColor!==null,instancingMorph:at&&k.morphTexture!==null,outputColorSpace:pe===null?o.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:st,matcap:lt,envMap:je,envMapMode:je&&te.mapping,envMapCubeUVHeight:ee,aoMap:ct,lightMap:gt,bumpMap:re,normalMap:bt,displacementMap:qt,emissiveMap:pn,normalMapObjectSpace:bt&&b.normalMapType===RC,normalMapTangentSpace:bt&&b.normalMapType===tM,packedNormalMap:bt&&b.normalMapType===tM&&XL(b.normalMap.format),metalnessMap:ht,roughnessMap:Zt,anisotropy:j,anisotropyMap:me,clearcoat:Ot,clearcoatMap:Oe,clearcoatNormalMap:De,clearcoatRoughnessMap:xe,dispersion:dt,retroreflection:B,iridescence:A,iridescenceMap:ge,iridescenceThicknessMap:Pe,sheen:$,sheenColorMap:Xe,sheenRoughnessMap:He,specularMap:ze,specularColorMap:Le,specularIntensityMap:tt,transmission:le,transmissionMap:rt,thicknessMap:Z,gradientMap:Ue,opaque:b.transparent===!1&&b.blending===Tc&&b.alphaToCoverage===!1,alphaMap:Se,alphaTest:Fe,alphaHash:Ve,combine:b.combine,mapUv:st&&M(b.map.channel),aoMapUv:ct&&M(b.aoMap.channel),lightMapUv:gt&&M(b.lightMap.channel),bumpMapUv:re&&M(b.bumpMap.channel),normalMapUv:bt&&M(b.normalMap.channel),displacementMapUv:qt&&M(b.displacementMap.channel),emissiveMapUv:pn&&M(b.emissiveMap.channel),metalnessMapUv:ht&&M(b.metalnessMap.channel),roughnessMapUv:Zt&&M(b.roughnessMap.channel),anisotropyMapUv:me&&M(b.anisotropyMap.channel),clearcoatMapUv:Oe&&M(b.clearcoatMap.channel),clearcoatNormalMapUv:De&&M(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&M(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&M(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&M(b.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&M(b.sheenColorMap.channel),sheenRoughnessMapUv:He&&M(b.sheenRoughnessMap.channel),specularMapUv:ze&&M(b.specularMap.channel),specularColorMapUv:Le&&M(b.specularColorMap.channel),specularIntensityMapUv:tt&&M(b.specularIntensityMap.channel),transmissionMapUv:rt&&M(b.transmissionMap.channel),thicknessMapUv:Z&&M(b.thicknessMap.channel),alphaMapUv:Se&&M(b.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(bt||j),vertexNormals:!!Q.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Q.attributes.uv&&(st||Se),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||Q.attributes.normal===void 0&&bt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Ce,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:_e,numSunLights:L.sun.length,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numSunLightShadows:L.sunShadowMap.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:b.dithering,shadowMapEnabled:o.shadowMap.enabled&&I.length>0,shadowMapType:o.shadowMap.type,toneMapping:we,decodeVideoTexture:st&&b.map.isVideoTexture===!0&&kt.getTransfer(b.map.colorSpace)===on,decodeVideoTextureEmissive:pn&&b.emissiveMap.isVideoTexture===!0&&kt.getTransfer(b.emissiveMap.colorSpace)===on,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===qr,flipSided:b.side===$i,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:be&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&b.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ee.vertexUv1s=p.has(1),Ee.vertexUv2s=p.has(2),Ee.vertexUv3s=p.has(3),p.clear(),Ee}function S(b){const L=[];if(b.shaderID?L.push(b.shaderID):(L.push(b.customVertexShaderID),L.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)L.push(I),L.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(L,b),C(L,b),L.push(o.outputColorSpace)),L.push(b.customProgramCacheKey),L.join()}function y(b,L){b.push(L.precision),b.push(L.outputColorSpace),b.push(L.envMapMode),b.push(L.envMapCubeUVHeight),b.push(L.mapUv),b.push(L.alphaMapUv),b.push(L.lightMapUv),b.push(L.aoMapUv),b.push(L.bumpMapUv),b.push(L.normalMapUv),b.push(L.displacementMapUv),b.push(L.emissiveMapUv),b.push(L.metalnessMapUv),b.push(L.roughnessMapUv),b.push(L.anisotropyMapUv),b.push(L.clearcoatMapUv),b.push(L.clearcoatNormalMapUv),b.push(L.clearcoatRoughnessMapUv),b.push(L.iridescenceMapUv),b.push(L.iridescenceThicknessMapUv),b.push(L.sheenColorMapUv),b.push(L.sheenRoughnessMapUv),b.push(L.specularMapUv),b.push(L.specularColorMapUv),b.push(L.specularIntensityMapUv),b.push(L.transmissionMapUv),b.push(L.thicknessMapUv),b.push(L.combine),b.push(L.fogExp2),b.push(L.sizeAttenuation),b.push(L.morphTargetsCount),b.push(L.morphAttributeCount),b.push(L.numSunLights),b.push(L.numDirLights),b.push(L.numPointLights),b.push(L.numSpotLights),b.push(L.numSpotLightMaps),b.push(L.numHemiLights),b.push(L.numRectAreaLights),b.push(L.numSunLightShadows),b.push(L.numDirLightShadows),b.push(L.numPointLightShadows),b.push(L.numSpotLightShadows),b.push(L.numSpotLightShadowsWithMaps),b.push(L.numLightProbes),b.push(L.shadowMapType),b.push(L.toneMapping),b.push(L.numClippingPlanes),b.push(L.numClipIntersection),b.push(L.depthPacking)}function C(b,L){c.disableAll(),L.instancing&&c.enable(0),L.instancingColor&&c.enable(1),L.instancingMorph&&c.enable(2),L.matcap&&c.enable(3),L.envMap&&c.enable(4),L.normalMapObjectSpace&&c.enable(5),L.normalMapTangentSpace&&c.enable(6),L.clearcoat&&c.enable(7),L.iridescence&&c.enable(8),L.alphaTest&&c.enable(9),L.vertexColors&&c.enable(10),L.vertexAlphas&&c.enable(11),L.vertexUv1s&&c.enable(12),L.vertexUv2s&&c.enable(13),L.vertexUv3s&&c.enable(14),L.vertexTangents&&c.enable(15),L.anisotropy&&c.enable(16),L.alphaHash&&c.enable(17),L.batching&&c.enable(18),L.dispersion&&c.enable(19),L.retroreflection&&c.enable(24),L.batchingColor&&c.enable(20),L.gradientMap&&c.enable(21),L.packedNormalMap&&c.enable(22),L.vertexNormals&&c.enable(23),b.push(c.mask),c.disableAll(),L.fog&&c.enable(0),L.useFog&&c.enable(1),L.flatShading&&c.enable(2),L.logarithmicDepthBuffer&&c.enable(3),L.reversedDepthBuffer&&c.enable(4),L.skinning&&c.enable(5),L.morphTargets&&c.enable(6),L.morphNormals&&c.enable(7),L.morphColors&&c.enable(8),L.premultipliedAlpha&&c.enable(9),L.shadowMapEnabled&&c.enable(10),L.doubleSided&&c.enable(11),L.flipSided&&c.enable(12),L.useDepthPacking&&c.enable(13),L.dithering&&c.enable(14),L.transmission&&c.enable(15),L.sheen&&c.enable(16),L.opaque&&c.enable(17),L.pointsUvs&&c.enable(18),L.decodeVideoTexture&&c.enable(19),L.decodeVideoTextureEmissive&&c.enable(20),L.alphaToCoverage&&c.enable(21),L.numLightProbeGrids>0&&c.enable(22),L.hasPositionAttribute&&c.enable(23),b.push(c.mask)}function F(b){const L=x[b.type];let I;if(L){const V=fr[L];I=d3.clone(V.uniforms)}else I=b.uniforms;return I}function R(b,L){let I=_.get(L);return I!==void 0?++I.usedTimes:(I=new HL(o,L,b,r),d.push(I),_.set(L,I)),I}function D(b){if(--b.usedTimes===0){const L=d.indexOf(b);d[L]=d[d.length-1],d.pop(),_.delete(b.cacheKey),b.destroy()}}function N(b){f.remove(b)}function w(){f.dispose()}return{getParameters:E,getProgramCacheKey:S,getUniforms:F,acquireProgram:R,releaseProgram:D,releaseShaderCache:N,programs:d,dispose:w}}function YL(){let o=new WeakMap;function e(c){return o.has(c)}function t(c){let f=o.get(c);return f===void 0&&(f={},o.set(c,f)),f}function i(c){o.delete(c)}function r(c,f,p){o.get(c)[f]=p}function l(){o=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:l}}function qL(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.materialVariant!==e.materialVariant?o.materialVariant-e.materialVariant:o.z!==e.z?o.z-e.z:o.id-e.id}function VM(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function kM(){const o=[];let e=0;const t=[],i=[],r=[];function l(){e=0,t.length=0,i.length=0,r.length=0}function c(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function f(g,x,M,E,S,y){let C=o[e];return C===void 0?(C={id:g.id,object:g,geometry:x,material:M,materialVariant:c(g),groupOrder:E,renderOrder:g.renderOrder,z:S,group:y},o[e]=C):(C.id=g.id,C.object=g,C.geometry=x,C.material=M,C.materialVariant=c(g),C.groupOrder=E,C.renderOrder=g.renderOrder,C.z=S,C.group=y),e++,C}function p(g,x,M,E,S,y,C){C.reversedDepth===!0&&(S=-S);const F=f(g,x,M,E,S,y);M.transmission>0?i.push(F):M.transparent===!0?r.push(F):t.push(F)}function d(g,x,M,E,S,y){const C=f(g,x,M,E,S,y);M.transmission>0?i.unshift(C):M.transparent===!0?r.unshift(C):t.unshift(C)}function _(g,x){t.length>1&&t.sort(g||qL),i.length>1&&i.sort(x||VM),r.length>1&&r.sort(x||VM)}function v(){for(let g=e,x=o.length;g<x;g++){const M=o[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:i,transparent:r,init:l,push:p,unshift:d,finish:v,sort:_}}function ZL(){let o=new WeakMap;function e(i,r){const l=o.get(i);let c;return l===void 0?(c=new kM,o.set(i,[c])):r>=l.length?(c=new kM,l.push(c)):c=l[r],c}function t(){o=new WeakMap}return{get:e,dispose:t}}function KL(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new de,color:new nn};break;case"SpotLight":t={position:new de,direction:new de,color:new nn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new de,color:new nn,distance:0,decay:0};break;case"HemisphereLight":t={direction:new de,skyColor:new nn,groundColor:new nn};break;case"RectAreaLight":t={color:new nn,position:new de,halfWidth:new de,halfHeight:new de};break}return o[e.id]=t,t}}}function jL(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new en};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new en};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new en,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let QL=0;function JL(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function $L(o){const e=new KL,t=jL(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new de);const r=new de,l=new jn,c=new jn;function f(d){let _=0,v=0,g=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let x=0,M=0,E=0,S=0,y=0,C=0,F=0,R=0,D=0,N=0,w=0,b=0,L=0,I=0;d.sort(JL);for(let k=0,J=d.length;k<J;k++){const Y=d[k],Q=Y.color,H=Y.intensity,G=Y.distance;let te=null;if(Y.shadow&&Y.shadow.map&&(Y.shadow.map.texture.format===zo?te=Y.shadow.map.texture:te=Y.shadow.map.depthTexture||Y.shadow.map.texture),Y.isAmbientLight)_+=Q.r*H,v+=Q.g*H,g+=Q.b*H;else if(Y.isLightProbe){for(let ee=0;ee<9;ee++)i.probe[ee].addScaledVector(Y.sh.coefficients[ee],H);I++}else if(Y.isSunLight){const ee=e.get(Y);if(ee.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const z=Y.shadow,P=t.get(Y);P.shadowIntensity=z.intensity,P.shadowBias=z.bias,P.shadowNormalBias=z.normalBias,P.shadowRadius=z.radius,P.shadowMapSize.copy(z.mapSize).multiply(z.getFrameExtents()),i.sunShadow[M]=P,i.sunShadowMap[M]=te;const ne=z.getViewportCount();for(let _e=0;_e<ne;_e++)i.sunShadowMatrix[E+_e]=z.getMatrix(_e),i.sunShadowCascade[E+_e]=z._cascadeData[_e];E+=ne,M++}i.sun[x]=ee,x++}else if(Y.isDirectionalLight){const ee=e.get(Y);if(ee.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const z=Y.shadow,P=t.get(Y);P.shadowIntensity=z.intensity,P.shadowBias=z.bias,P.shadowNormalBias=z.normalBias,P.shadowRadius=z.radius,P.shadowMapSize=z.mapSize,i.directionalShadow[S]=P,i.directionalShadowMap[S]=te,i.directionalShadowMatrix[S]=Y.shadow.matrix,D++}i.directional[S]=ee,S++}else if(Y.isSpotLight){const ee=e.get(Y);ee.position.setFromMatrixPosition(Y.matrixWorld),ee.color.copy(Q).multiplyScalar(H),ee.distance=G,ee.coneCos=Math.cos(Y.angle),ee.penumbraCos=Math.cos(Y.angle*(1-Y.penumbra)),ee.decay=Y.decay,i.spot[C]=ee;const z=Y.shadow;if(Y.map&&(i.spotLightMap[b]=Y.map,b++,z.updateMatrices(Y),Y.castShadow&&L++),i.spotLightMatrix[C]=z.matrix,Y.castShadow){const P=t.get(Y);P.shadowIntensity=z.intensity,P.shadowBias=z.bias,P.shadowNormalBias=z.normalBias,P.shadowRadius=z.radius,P.shadowMapSize=z.mapSize,i.spotShadow[C]=P,i.spotShadowMap[C]=te,w++}C++}else if(Y.isRectAreaLight){const ee=e.get(Y);ee.color.copy(Q).multiplyScalar(H),ee.halfWidth.set(Y.width*.5,0,0),ee.halfHeight.set(0,Y.height*.5,0),i.rectArea[F]=ee,F++}else if(Y.isPointLight){const ee=e.get(Y);if(ee.color.copy(Y.color).multiplyScalar(Y.intensity),ee.distance=Y.distance,ee.decay=Y.decay,Y.castShadow){const z=Y.shadow,P=t.get(Y);P.shadowIntensity=z.intensity,P.shadowBias=z.bias,P.shadowNormalBias=z.normalBias,P.shadowRadius=z.radius,P.shadowMapSize=z.mapSize,P.shadowCameraNear=z.camera.near,P.shadowCameraFar=z.camera.far,i.pointShadow[y]=P,i.pointShadowMap[y]=te,i.pointShadowMatrix[y]=Y.shadow.matrix,N++}i.point[y]=ee,y++}else if(Y.isHemisphereLight){const ee=e.get(Y);ee.skyColor.copy(Y.color).multiplyScalar(H),ee.groundColor.copy(Y.groundColor).multiplyScalar(H),i.hemi[R]=ee,R++}}F>0&&(o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=We.LTC_FLOAT_1,i.rectAreaLTC2=We.LTC_FLOAT_2):(i.rectAreaLTC1=We.LTC_HALF_1,i.rectAreaLTC2=We.LTC_HALF_2)),i.ambient[0]=_,i.ambient[1]=v,i.ambient[2]=g;const V=i.hash;(V.sunLength!==x||V.directionalLength!==S||V.pointLength!==y||V.spotLength!==C||V.rectAreaLength!==F||V.hemiLength!==R||V.numSunShadows!==M||V.numDirectionalShadows!==D||V.numPointShadows!==N||V.numSpotShadows!==w||V.numSpotMaps!==b||V.numLightProbes!==I)&&(i.sun.length=x,i.directional.length=S,i.spot.length=C,i.rectArea.length=F,i.point.length=y,i.hemi.length=R,i.sunShadow.length=M,i.sunShadowMap.length=M,i.sunShadowMatrix.length=E,i.sunShadowCascade.length=E,i.directionalShadow.length=D,i.directionalShadowMap.length=D,i.directionalShadowMatrix.length=D,i.pointShadow.length=N,i.pointShadowMap.length=N,i.pointShadowMatrix.length=N,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+b-L,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=I,V.sunLength=x,V.directionalLength=S,V.pointLength=y,V.spotLength=C,V.rectAreaLength=F,V.hemiLength=R,V.numSunShadows=M,V.numDirectionalShadows=D,V.numPointShadows=N,V.numSpotShadows=w,V.numSpotMaps=b,V.numLightProbes=I,i.version=QL++)}function p(d,_){let v=0,g=0,x=0,M=0,E=0,S=0;const y=_.matrixWorldInverse;for(let C=0,F=d.length;C<F;C++){const R=d[C];if(R.isSunLight){const D=i.sun[v];D.direction.setFromMatrixPosition(R.matrixWorld),D.direction.transformDirection(y),v++}else if(R.isDirectionalLight){const D=i.directional[g];D.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(y),g++}else if(R.isSpotLight){const D=i.spot[M];D.position.setFromMatrixPosition(R.matrixWorld),D.position.applyMatrix4(y),D.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(y),M++}else if(R.isRectAreaLight){const D=i.rectArea[E];D.position.setFromMatrixPosition(R.matrixWorld),D.position.applyMatrix4(y),c.identity(),l.copy(R.matrixWorld),l.premultiply(y),c.extractRotation(l),D.halfWidth.set(R.width*.5,0,0),D.halfHeight.set(0,R.height*.5,0),D.halfWidth.applyMatrix4(c),D.halfHeight.applyMatrix4(c),E++}else if(R.isPointLight){const D=i.point[x];D.position.setFromMatrixPosition(R.matrixWorld),D.position.applyMatrix4(y),x++}else if(R.isHemisphereLight){const D=i.hemi[S];D.direction.setFromMatrixPosition(R.matrixWorld),D.direction.transformDirection(y),S++}}}return{setup:f,setupView:p,state:i}}function XM(o){const e=new $L(o),t=[],i=[],r=[];function l(g){v.camera=g,t.length=0,i.length=0,r.length=0}function c(g){t.push(g)}function f(g){i.push(g)}function p(g){r.push(g)}function d(){e.setup(t)}function _(g){e.setupView(t,g)}const v={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:v,setupLights:d,setupLightsView:_,pushLight:c,pushShadow:f,pushLightProbeGrid:p}}function eU(o){let e=new WeakMap;function t(r,l=0){const c=e.get(r);let f;return c===void 0?(f=new XM(o),e.set(r,[f])):l>=c.length?(f=new XM(o),c.push(f)):f=c[l],f}function i(){e=new WeakMap}return{get:t,dispose:i}}const tU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,iU=[new de(1,0,0),new de(-1,0,0),new de(0,1,0),new de(0,-1,0),new de(0,0,1),new de(0,0,-1)],aU=[new de(0,-1,0),new de(0,-1,0),new de(0,0,1),new de(0,0,-1),new de(0,-1,0),new de(0,-1,0)],WM=new jn,lc=new de,U_=new de;function rU(o,e,t){let i=new N1;const r=new en,l=new en,c=new Fn,f=new g3,p=new v3,d={},_=t.maxTextureSize,v={[Fo]:$i,[$i]:Fo,[qr]:qr},g=new tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new en},radius:{value:4}},vertexShader:tU,fragmentShader:nU}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const M=new rs;M.setAttribute("position",new $r(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Mr(M,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jh;let y=this.type;this.render=function(N,w,b){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||N.length===0)return;this.type===aC&&(_t("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jh);const L=o.getRenderTarget(),I=o.getActiveCubeFace(),V=o.getActiveMipmapLevel(),k=o.state;k.setBlending(Qr),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const J=y!==this.type;J&&w.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(Q=>Q.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,Q=N.length;Y<Q;Y++){const H=N[Y],G=H.shadow;if(G===void 0){_t("WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const te=G.getFrameExtents();r.multiply(te),l.copy(G.mapSize),(r.x>_||r.y>_)&&(r.x>_&&(l.x=Math.floor(_/te.x),r.x=l.x*te.x,G.mapSize.x=l.x),r.y>_&&(l.y=Math.floor(_/te.y),r.y=l.y*te.y,G.mapSize.y=l.y));const ee=o.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ee,G.map===null||J===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===pc){if(H.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new er(r.x,r.y,{format:zo,type:yr,minFilter:Ai,magFilter:Ai,generateMipmaps:!1}),G.map.texture.name=H.name+".shadowMap",G.map.depthTexture=new qc(r.x,r.y,pr),G.map.depthTexture.name=H.name+".shadowMapDepth",G.map.depthTexture.format=as,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=_i,G.map.depthTexture.magFilter=_i}else H.isPointLight?(G.map=new H1(r.x),G.map.depthTexture=new f3(r.x,Sr)):(G.map=new er(r.x,r.y),G.map.depthTexture=new qc(r.x,r.y,Sr)),G.map.depthTexture.name=H.name+".shadowMap",G.map.depthTexture.format=as,this.type===Jh?(G.map.depthTexture.compareFunction=ee?A0:b0,G.map.depthTexture.minFilter=Ai,G.map.depthTexture.magFilter=Ai):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=_i,G.map.depthTexture.magFilter=_i);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const z=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();H.isPointLight!==!0&&G.updateMatrices(H,b);for(let P=0;P<z;P++){const ne=G.getCamera(P);if(H.isPointLight){const _e=G.camera,Ae=G.matrix,Ne=H.distance||_e.far;Ne!==_e.far&&(_e.far=Ne,_e.updateProjectionMatrix()),lc.setFromMatrixPosition(H.matrixWorld),_e.position.copy(lc),U_.copy(_e.position),U_.add(iU[P]),_e.up.copy(aU[P]),_e.lookAt(U_),_e.updateMatrixWorld(),Ae.makeTranslation(-lc.x,-lc.y,-lc.z),WM.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),G._frustum.setFromProjectionMatrix(WM,_e.coordinateSystem,_e.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)o.setRenderTarget(G.map,P),o.clear();else{P===0&&(o.setRenderTarget(G.map),o.clear());const _e=G.getViewport(P);c.set(l.x*_e.x,l.y*_e.y,l.x*_e.z,l.y*_e.w),k.viewport(c)}i=G.getFrustum(P),R(w,b,ne,H,this.type)}G.isPointLightShadow!==!0&&this.type===pc&&C(G,b),G.needsUpdate=!1}y=this.type,S.needsUpdate=!1,o.setRenderTarget(L,I,V)};function C(N,w){const b=e.update(E);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,x.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),N.mapPass===null?N.mapPass=new er(r.x,r.y,{format:zo,type:yr}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),g.uniforms.shadow_pass.value=N.map.depthTexture,g.uniforms.resolution.value.set(N.map.width,N.map.height),g.uniforms.radius.value=N.radius,o.setRenderTarget(N.mapPass),o.clear(),o.renderBufferDirect(w,null,b,g,E,null),x.uniforms.shadow_pass.value=N.mapPass.texture,x.uniforms.resolution.value.set(N.map.width,N.map.height),x.uniforms.radius.value=N.radius,o.setRenderTarget(N.map),o.clear(),o.renderBufferDirect(w,null,b,x,E,null)}function F(N,w,b,L){let I=null;const V=b.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(V!==void 0)I=V;else if(I=b.isPointLight===!0?p:f,o.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const k=I.uuid,J=w.uuid;let Y=d[k];Y===void 0&&(Y={},d[k]=Y);let Q=Y[J];Q===void 0&&(Q=I.clone(),Y[J]=Q,w.addEventListener("dispose",D)),I=Q}if(I.visible=w.visible,I.wireframe=w.wireframe,L===pc?I.side=w.shadowSide!==null?w.shadowSide:w.side:I.side=w.shadowSide!==null?w.shadowSide:v[w.side],I.alphaMap=w.alphaMap,I.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,I.map=w.map,I.clipShadows=w.clipShadows,I.clippingPlanes=w.clippingPlanes,I.clipIntersection=w.clipIntersection,I.displacementMap=w.displacementMap,I.displacementScale=w.displacementScale,I.displacementBias=w.displacementBias,I.wireframeLinewidth=w.wireframeLinewidth,I.linewidth=w.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const k=o.properties.get(I);k.light=b}return I}function R(N,w,b,L,I){if(N.visible===!1)return;if(N.layers.test(w.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&I===pc)&&(!N.frustumCulled||N.intersectsFrustum(i))){N.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,N.matrixWorld);const J=e.update(N),Y=N.material;if(Array.isArray(Y)){const Q=J.groups;for(let H=0,G=Q.length;H<G;H++){const te=Q[H],ee=Y[te.materialIndex];if(ee&&ee.visible){const z=F(N,ee,L,I);N.onBeforeShadow(o,N,w,b,J,z,te),o.renderBufferDirect(b,null,J,z,N,te),N.onAfterShadow(o,N,w,b,J,z,te)}}}else if(Y.visible){const Q=F(N,Y,L,I);N.onBeforeShadow(o,N,w,b,J,Q,null),o.renderBufferDirect(b,null,J,Q,N,null),N.onAfterShadow(o,N,w,b,J,Q,null)}}const k=N.children;for(let J=0,Y=k.length;J<Y;J++)R(k[J],w,b,L,I)}function D(N){N.target.removeEventListener("dispose",D);for(const b in d){const L=d[b],I=N.target.uuid;I in L&&(L[I].dispose(),delete L[I])}}}function sU(o,e){function t(){let Z=!1;const Ue=new Fn;let Se=null;const Fe=new Fn(0,0,0,0);return{setMask:function(Ve){Se!==Ve&&!Z&&(o.colorMask(Ve,Ve,Ve,Ve),Se=Ve)},setLocked:function(Ve){Z=Ve},setClear:function(Ve,be,we,Ee,it){it===!0&&(Ve*=Ee,be*=Ee,we*=Ee),Ue.set(Ve,be,we,Ee),Fe.equals(Ue)===!1&&(o.clearColor(Ve,be,we,Ee),Fe.copy(Ue))},reset:function(){Z=!1,Se=null,Fe.set(-1,0,0,0)}}}function i(){let Z=!1,Ue=!1,Se=null,Fe=null,Ve=null;return{setReversed:function(be){if(Ue!==be){const we=e.get("EXT_clip_control");be?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),Ue=be;const Ee=Ve;Ve=null,this.setClear(Ee)}},getReversed:function(){return Ue},setTest:function(be){be?pe(o.DEPTH_TEST):Ce(o.DEPTH_TEST)},setMask:function(be){Se!==be&&!Z&&(o.depthMask(be),Se=be)},setFunc:function(be){if(Ue&&(be=BC[be]),Fe!==be){switch(be){case eg:o.depthFunc(o.NEVER);break;case tg:o.depthFunc(o.ALWAYS);break;case ng:o.depthFunc(o.LESS);break;case Xc:o.depthFunc(o.LEQUAL);break;case ig:o.depthFunc(o.EQUAL);break;case ag:o.depthFunc(o.GEQUAL);break;case rg:o.depthFunc(o.GREATER);break;case sg:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Fe=be}},setLocked:function(be){Z=be},setClear:function(be){Ve!==be&&(Ve=be,Ue&&(be=1-be),o.clearDepth(be))},reset:function(){Z=!1,Se=null,Fe=null,Ve=null,Ue=!1}}}function r(){let Z=!1,Ue=null,Se=null,Fe=null,Ve=null,be=null,we=null,Ee=null,it=null;return{setTest:function(Re){Z||(Re?pe(o.STENCIL_TEST):Ce(o.STENCIL_TEST))},setMask:function(Re){Ue!==Re&&!Z&&(o.stencilMask(Re),Ue=Re)},setFunc:function(Re,ot,Qe){(Se!==Re||Fe!==ot||Ve!==Qe)&&(o.stencilFunc(Re,ot,Qe),Se=Re,Fe=ot,Ve=Qe)},setOp:function(Re,ot,Qe){(be!==Re||we!==ot||Ee!==Qe)&&(o.stencilOp(Re,ot,Qe),be=Re,we=ot,Ee=Qe)},setLocked:function(Re){Z=Re},setClear:function(Re){it!==Re&&(o.clearStencil(Re),it=Re)},reset:function(){Z=!1,Ue=null,Se=null,Fe=null,Ve=null,be=null,we=null,Ee=null,it=null}}}const l=new t,c=new i,f=new r,p=new WeakMap,d=new WeakMap;let _={},v={},g={},x=new WeakMap,M=[],E=null,S=!1,y=null,C=null,F=null,R=null,D=null,N=null,w=null,b=new nn(0,0,0),L=0,I=!1,V=null,k=null,J=null,Y=null,Q=null;const H=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,te=0;const ee=o.getParameter(o.VERSION);ee.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(ee)[1]),G=te>=1):ee.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),G=te>=2);let z=null,P={};const ne=o.getParameter(o.SCISSOR_BOX),_e=o.getParameter(o.VIEWPORT),Ae=new Fn().fromArray(ne),Ne=new Fn().fromArray(_e);function Be(Z,Ue,Se,Fe){const Ve=new Uint8Array(4),be=o.createTexture();o.bindTexture(Z,be),o.texParameteri(Z,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(Z,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let we=0;we<Se;we++)Z===o.TEXTURE_3D||Z===o.TEXTURE_2D_ARRAY?o.texImage3D(Ue,0,o.RGBA,1,1,Fe,0,o.RGBA,o.UNSIGNED_BYTE,Ve):o.texImage2D(Ue+we,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Ve);return be}const ie={};ie[o.TEXTURE_2D]=Be(o.TEXTURE_2D,o.TEXTURE_2D,1),ie[o.TEXTURE_CUBE_MAP]=Be(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[o.TEXTURE_2D_ARRAY]=Be(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),ie[o.TEXTURE_3D]=Be(o.TEXTURE_3D,o.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),f.setClear(0),pe(o.DEPTH_TEST),c.setFunc(Xc),re(!1),bt(Qy),pe(o.CULL_FACE),ct(Qr);function pe(Z){_[Z]!==!0&&(o.enable(Z),_[Z]=!0)}function Ce(Z){_[Z]!==!1&&(o.disable(Z),_[Z]=!1)}function at(Z,Ue){return g[Z]!==Ue?(o.bindFramebuffer(Z,Ue),g[Z]=Ue,Z===o.DRAW_FRAMEBUFFER&&(g[o.FRAMEBUFFER]=Ue),Z===o.FRAMEBUFFER&&(g[o.DRAW_FRAMEBUFFER]=Ue),!0):!1}function Ie(Z,Ue){let Se=M,Fe=!1;if(Z){Se=x.get(Ue),Se===void 0&&(Se=[],x.set(Ue,Se));const Ve=Z.textures;if(Se.length!==Ve.length||Se[0]!==o.COLOR_ATTACHMENT0){for(let be=0,we=Ve.length;be<we;be++)Se[be]=o.COLOR_ATTACHMENT0+be;Se.length=Ve.length,Fe=!0}}else Se[0]!==o.BACK&&(Se[0]=o.BACK,Fe=!0);Fe&&o.drawBuffers(Se)}function st(Z){return E!==Z?(o.useProgram(Z),E=Z,!0):!1}const lt={[Bl]:o.FUNC_ADD,[sC]:o.FUNC_SUBTRACT,[oC]:o.FUNC_REVERSE_SUBTRACT};lt[lC]=o.MIN,lt[uC]=o.MAX;const je={[cC]:o.ZERO,[fC]:o.ONE,[hC]:o.SRC_COLOR,[l1]:o.SRC_ALPHA,[vC]:o.SRC_ALPHA_SATURATE,[_C]:o.DST_COLOR,[pC]:o.DST_ALPHA,[dC]:o.ONE_MINUS_SRC_COLOR,[u1]:o.ONE_MINUS_SRC_ALPHA,[gC]:o.ONE_MINUS_DST_COLOR,[mC]:o.ONE_MINUS_DST_ALPHA,[xC]:o.CONSTANT_COLOR,[SC]:o.ONE_MINUS_CONSTANT_COLOR,[yC]:o.CONSTANT_ALPHA,[MC]:o.ONE_MINUS_CONSTANT_ALPHA};function ct(Z,Ue,Se,Fe,Ve,be,we,Ee,it,Re){if(Z===Qr){S===!0&&(Ce(o.BLEND),S=!1);return}if(S===!1&&(pe(o.BLEND),S=!0),Z!==rC){if(Z!==y||Re!==I){if((C!==Bl||D!==Bl)&&(o.blendEquation(o.FUNC_ADD),C=Bl,D=Bl),Re)switch(Z){case Tc:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Jy:o.blendFunc(o.ONE,o.ONE);break;case $y:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case eM:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:Qt("WebGLState: Invalid blending: ",Z);break}else switch(Z){case Tc:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Jy:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case $y:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eM:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",Z);break}F=null,R=null,N=null,w=null,b.set(0,0,0),L=0,y=Z,I=Re}return}Ve=Ve||Ue,be=be||Se,we=we||Fe,(Ue!==C||Ve!==D)&&(o.blendEquationSeparate(lt[Ue],lt[Ve]),C=Ue,D=Ve),(Se!==F||Fe!==R||be!==N||we!==w)&&(o.blendFuncSeparate(je[Se],je[Fe],je[be],je[we]),F=Se,R=Fe,N=be,w=we),(Ee.equals(b)===!1||it!==L)&&(o.blendColor(Ee.r,Ee.g,Ee.b,it),b.copy(Ee),L=it),y=Z,I=!1}function gt(Z,Ue){Z.side===qr?Ce(o.CULL_FACE):pe(o.CULL_FACE);let Se=Z.side===$i;Ue&&(Se=!Se),re(Se),Z.blending===Tc&&Z.transparent===!1?ct(Qr):ct(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),c.setFunc(Z.depthFunc),c.setTest(Z.depthTest),c.setMask(Z.depthWrite),l.setMask(Z.colorWrite);const Fe=Z.stencilWrite;f.setTest(Fe),Fe&&(f.setMask(Z.stencilWriteMask),f.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),f.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),pn(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?pe(o.SAMPLE_ALPHA_TO_COVERAGE):Ce(o.SAMPLE_ALPHA_TO_COVERAGE)}function re(Z){V!==Z&&(Z?o.frontFace(o.CW):o.frontFace(o.CCW),V=Z)}function bt(Z){Z!==nC?(pe(o.CULL_FACE),Z!==k&&(Z===Qy?o.cullFace(o.BACK):Z===iC?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Ce(o.CULL_FACE),k=Z}function qt(Z){Z!==J&&(G&&o.lineWidth(Z),J=Z)}function pn(Z,Ue,Se){Z?(pe(o.POLYGON_OFFSET_FILL),(Y!==Ue||Q!==Se)&&(Y=Ue,Q=Se,c.getReversed()&&(Ue=-Ue),o.polygonOffset(Ue,Se))):Ce(o.POLYGON_OFFSET_FILL)}function ht(Z){Z?pe(o.SCISSOR_TEST):Ce(o.SCISSOR_TEST)}function Zt(Z){Z===void 0&&(Z=o.TEXTURE0+H-1),z!==Z&&(o.activeTexture(Z),z=Z)}function j(Z,Ue,Se){Se===void 0&&(z===null?Se=o.TEXTURE0+H-1:Se=z);let Fe=P[Se];Fe===void 0&&(Fe={type:void 0,texture:void 0},P[Se]=Fe),(Fe.type!==Z||Fe.texture!==Ue)&&(z!==Se&&(o.activeTexture(Se),z=Se),o.bindTexture(Z,Ue||ie[Z]),Fe.type=Z,Fe.texture=Ue)}function Ot(){const Z=P[z];Z!==void 0&&Z.type!==void 0&&(o.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function dt(){try{o.compressedTexImage2D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function B(){try{o.compressedTexImage3D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function A(){try{o.texSubImage2D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function $(){try{o.texSubImage3D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function le(){try{o.compressedTexSubImage2D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function me(){try{o.compressedTexSubImage3D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function Oe(){try{o.texStorage2D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function De(){try{o.texStorage3D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function xe(){try{o.texImage2D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function ge(){try{o.texImage3D(...arguments)}catch(Z){Qt("WebGLState:",Z)}}function Pe(Z){return v[Z]!==void 0?v[Z]:o.getParameter(Z)}function Xe(Z,Ue){v[Z]!==Ue&&(o.pixelStorei(Z,Ue),v[Z]=Ue)}function He(Z){Ae.equals(Z)===!1&&(o.scissor(Z.x,Z.y,Z.z,Z.w),Ae.copy(Z))}function ze(Z){Ne.equals(Z)===!1&&(o.viewport(Z.x,Z.y,Z.z,Z.w),Ne.copy(Z))}function Le(Z,Ue){let Se=d.get(Ue);Se===void 0&&(Se=new WeakMap,d.set(Ue,Se));let Fe=Se.get(Z);Fe===void 0&&(Fe=o.getUniformBlockIndex(Ue,Z.name),Se.set(Z,Fe))}function tt(Z,Ue){const Fe=d.get(Ue).get(Z);p.get(Ue)!==Fe&&(o.uniformBlockBinding(Ue,Fe,Z.__bindingPointIndex),p.set(Ue,Fe))}function rt(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),c.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),_={},v={},z=null,P={},g={},x=new WeakMap,M=[],E=null,S=!1,y=null,C=null,F=null,R=null,D=null,N=null,w=null,b=new nn(0,0,0),L=0,I=!1,V=null,k=null,J=null,Y=null,Q=null,Ae.set(0,0,o.canvas.width,o.canvas.height),Ne.set(0,0,o.canvas.width,o.canvas.height),l.reset(),c.reset(),f.reset()}return{buffers:{color:l,depth:c,stencil:f},enable:pe,disable:Ce,bindFramebuffer:at,drawBuffers:Ie,useProgram:st,setBlending:ct,setMaterial:gt,setFlipSided:re,setCullFace:bt,setLineWidth:qt,setPolygonOffset:pn,setScissorTest:ht,activeTexture:Zt,bindTexture:j,unbindTexture:Ot,compressedTexImage2D:dt,compressedTexImage3D:B,texImage2D:xe,texImage3D:ge,pixelStorei:Xe,getParameter:Pe,updateUBOMapping:Le,uniformBlockBinding:tt,texStorage2D:Oe,texStorage3D:De,texSubImage2D:A,texSubImage3D:$,compressedTexSubImage2D:le,compressedTexSubImage3D:me,scissor:He,viewport:ze,reset:rt}}function oU(o,e,t,i,r,l,c){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new en,_=new WeakMap,v=new Set;let g;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(B,A){return M?new OffscreenCanvas(B,A):Ed("canvas")}function S(B,A,$){let le=1;const me=dt(B);if((me.width>$||me.height>$)&&(le=$/Math.max(me.width,me.height)),le<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const Oe=Math.floor(le*me.width),De=Math.floor(le*me.height);g===void 0&&(g=E(Oe,De));const xe=A?E(Oe,De):g;return xe.width=Oe,xe.height=De,xe.getContext("2d").drawImage(B,0,0,Oe,De),_t("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+Oe+"x"+De+")."),xe}else return"data"in B&&_t("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),B;return B}function y(B){return B.generateMipmaps}function C(B){o.generateMipmap(B)}function F(B){return B.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?o.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function R(B,A,$,le,me,Oe=!1){if(B!==null){if(o[B]!==void 0)return o[B];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let De;le&&(De=e.get("EXT_texture_norm16"),De||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let xe=A;if(A===o.RED&&($===o.FLOAT&&(xe=o.R32F),$===o.HALF_FLOAT&&(xe=o.R16F),$===o.UNSIGNED_BYTE&&(xe=o.R8),$===o.UNSIGNED_SHORT&&De&&(xe=De.R16_EXT),$===o.SHORT&&De&&(xe=De.R16_SNORM_EXT)),A===o.RED_INTEGER&&($===o.UNSIGNED_BYTE&&(xe=o.R8UI),$===o.UNSIGNED_SHORT&&(xe=o.R16UI),$===o.UNSIGNED_INT&&(xe=o.R32UI),$===o.BYTE&&(xe=o.R8I),$===o.SHORT&&(xe=o.R16I),$===o.INT&&(xe=o.R32I)),A===o.RG&&($===o.FLOAT&&(xe=o.RG32F),$===o.HALF_FLOAT&&(xe=o.RG16F),$===o.UNSIGNED_BYTE&&(xe=o.RG8),$===o.UNSIGNED_SHORT&&De&&(xe=De.RG16_EXT),$===o.SHORT&&De&&(xe=De.RG16_SNORM_EXT)),A===o.RG_INTEGER&&($===o.UNSIGNED_BYTE&&(xe=o.RG8UI),$===o.UNSIGNED_SHORT&&(xe=o.RG16UI),$===o.UNSIGNED_INT&&(xe=o.RG32UI),$===o.BYTE&&(xe=o.RG8I),$===o.SHORT&&(xe=o.RG16I),$===o.INT&&(xe=o.RG32I)),A===o.RGB_INTEGER&&($===o.UNSIGNED_BYTE&&(xe=o.RGB8UI),$===o.UNSIGNED_SHORT&&(xe=o.RGB16UI),$===o.UNSIGNED_INT&&(xe=o.RGB32UI),$===o.BYTE&&(xe=o.RGB8I),$===o.SHORT&&(xe=o.RGB16I),$===o.INT&&(xe=o.RGB32I)),A===o.RGBA_INTEGER&&($===o.UNSIGNED_BYTE&&(xe=o.RGBA8UI),$===o.UNSIGNED_SHORT&&(xe=o.RGBA16UI),$===o.UNSIGNED_INT&&(xe=o.RGBA32UI),$===o.BYTE&&(xe=o.RGBA8I),$===o.SHORT&&(xe=o.RGBA16I),$===o.INT&&(xe=o.RGBA32I)),A===o.RGB&&($===o.UNSIGNED_SHORT&&De&&(xe=De.RGB16_EXT),$===o.SHORT&&De&&(xe=De.RGB16_SNORM_EXT),$===o.UNSIGNED_INT_5_9_9_9_REV&&(xe=o.RGB9_E5),$===o.UNSIGNED_INT_10F_11F_11F_REV&&(xe=o.R11F_G11F_B10F)),A===o.RGBA){const ge=Oe?yd:kt.getTransfer(me);$===o.FLOAT&&(xe=o.RGBA32F),$===o.HALF_FLOAT&&(xe=o.RGBA16F),$===o.UNSIGNED_BYTE&&(xe=ge===on?o.SRGB8_ALPHA8:o.RGBA8),$===o.UNSIGNED_SHORT&&De&&(xe=De.RGBA16_EXT),$===o.SHORT&&De&&(xe=De.RGBA16_SNORM_EXT),$===o.UNSIGNED_SHORT_4_4_4_4&&(xe=o.RGBA4),$===o.UNSIGNED_SHORT_5_5_5_1&&(xe=o.RGB5_A1)}return(xe===o.R16F||xe===o.R32F||xe===o.RG16F||xe===o.RG32F||xe===o.RGBA16F||xe===o.RGBA32F)&&e.get("EXT_color_buffer_float"),xe}function D(B,A){let $;return B?A===null||A===Sr||A===Yc?$=o.DEPTH24_STENCIL8:A===pr?$=o.DEPTH32F_STENCIL8:A===Wc&&($=o.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Sr||A===Yc?$=o.DEPTH_COMPONENT24:A===pr?$=o.DEPTH_COMPONENT32F:A===Wc&&($=o.DEPTH_COMPONENT16),$}function N(B,A){return y(B)===!0||B.isFramebufferTexture&&B.minFilter!==_i&&B.minFilter!==Ai?Math.log2(Math.max(A.width,A.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?A.mipmaps.length:1}function w(B){const A=B.target;A.removeEventListener("dispose",w),L(A),A.isVideoTexture&&_.delete(A),A.isHTMLTexture&&v.delete(A)}function b(B){const A=B.target;A.removeEventListener("dispose",b),V(A)}function L(B){const A=i.get(B);if(A.__webglInit===void 0)return;const $=B.source,le=x.get($);if(le){const me=le[A.__cacheKey];me.usedTimes--,me.usedTimes===0&&I(B),Object.keys(le).length===0&&x.delete($)}i.remove(B)}function I(B){const A=i.get(B);o.deleteTexture(A.__webglTexture);const $=B.source,le=x.get($);delete le[A.__cacheKey],c.memory.textures--}function V(B){const A=i.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),i.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(A.__webglFramebuffer[le]))for(let me=0;me<A.__webglFramebuffer[le].length;me++)o.deleteFramebuffer(A.__webglFramebuffer[le][me]);else o.deleteFramebuffer(A.__webglFramebuffer[le]);A.__webglDepthbuffer&&o.deleteRenderbuffer(A.__webglDepthbuffer[le])}else{if(Array.isArray(A.__webglFramebuffer))for(let le=0;le<A.__webglFramebuffer.length;le++)o.deleteFramebuffer(A.__webglFramebuffer[le]);else o.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&o.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&o.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let le=0;le<A.__webglColorRenderbuffer.length;le++)A.__webglColorRenderbuffer[le]&&o.deleteRenderbuffer(A.__webglColorRenderbuffer[le]);A.__webglDepthRenderbuffer&&o.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const $=B.textures;for(let le=0,me=$.length;le<me;le++){const Oe=i.get($[le]);Oe.__webglTexture&&(o.deleteTexture(Oe.__webglTexture),c.memory.textures--),i.remove($[le])}i.remove(B)}let k=0;function J(){k=0}function Y(){return k}function Q(B){k=B}function H(){const B=k;return B>=r.maxTextures&&_t("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+r.maxTextures),k+=1,B}function G(B){const A=[];return A.push(B.wrapS),A.push(B.wrapT),A.push(B.wrapR||0),A.push(B.magFilter),A.push(B.minFilter),A.push(B.anisotropy),A.push(B.internalFormat),A.push(B.format),A.push(B.type),A.push(B.generateMipmaps),A.push(B.premultiplyAlpha),A.push(B.flipY),A.push(B.unpackAlignment),A.push(B.colorSpace),A.join()}function te(B,A){const $=i.get(B);if(B.isVideoTexture&&j(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&$.__version!==B.version){const le=B.image;if(le===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce($,B,A);return}}else B.isExternalTexture&&($.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(o.TEXTURE_2D,$.__webglTexture,o.TEXTURE0+A)}function ee(B,A){const $=i.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&$.__version!==B.version){Ce($,B,A);return}else B.isExternalTexture&&($.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(o.TEXTURE_2D_ARRAY,$.__webglTexture,o.TEXTURE0+A)}function z(B,A){const $=i.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&$.__version!==B.version){Ce($,B,A);return}t.bindTexture(o.TEXTURE_3D,$.__webglTexture,o.TEXTURE0+A)}function P(B,A){const $=i.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&$.__version!==B.version){at($,B,A);return}t.bindTexture(o.TEXTURE_CUBE_MAP,$.__webglTexture,o.TEXTURE0+A)}const ne={[og]:o.REPEAT,[Kr]:o.CLAMP_TO_EDGE,[lg]:o.MIRRORED_REPEAT},_e={[_i]:o.NEAREST,[bC]:o.NEAREST_MIPMAP_NEAREST,[hh]:o.NEAREST_MIPMAP_LINEAR,[Ai]:o.LINEAR,[i_]:o.LINEAR_MIPMAP_NEAREST,[Ao]:o.LINEAR_MIPMAP_LINEAR},Ae={[wC]:o.NEVER,[OC]:o.ALWAYS,[DC]:o.LESS,[b0]:o.LEQUAL,[LC]:o.EQUAL,[A0]:o.GEQUAL,[UC]:o.GREATER,[NC]:o.NOTEQUAL};function Ne(B,A){if(A.type===pr&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Ai||A.magFilter===i_||A.magFilter===hh||A.magFilter===Ao||A.minFilter===Ai||A.minFilter===i_||A.minFilter===hh||A.minFilter===Ao)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(B,o.TEXTURE_WRAP_S,ne[A.wrapS]),o.texParameteri(B,o.TEXTURE_WRAP_T,ne[A.wrapT]),(B===o.TEXTURE_3D||B===o.TEXTURE_2D_ARRAY)&&o.texParameteri(B,o.TEXTURE_WRAP_R,ne[A.wrapR]),o.texParameteri(B,o.TEXTURE_MAG_FILTER,_e[A.magFilter]),o.texParameteri(B,o.TEXTURE_MIN_FILTER,_e[A.minFilter]),A.compareFunction&&(o.texParameteri(B,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(B,o.TEXTURE_COMPARE_FUNC,Ae[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===_i||A.minFilter!==hh&&A.minFilter!==Ao||A.type===pr&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");o.texParameterf(B,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Be(B,A){let $=!1;B.__webglInit===void 0&&(B.__webglInit=!0,A.addEventListener("dispose",w));const le=A.source;let me=x.get(le);me===void 0&&(me={},x.set(le,me));const Oe=G(A);if(Oe!==B.__cacheKey){me[Oe]===void 0&&(me[Oe]={texture:o.createTexture(),usedTimes:0},c.memory.textures++,$=!0),me[Oe].usedTimes++;const De=me[B.__cacheKey];De!==void 0&&(me[B.__cacheKey].usedTimes--,De.usedTimes===0&&I(A)),B.__cacheKey=Oe,B.__webglTexture=me[Oe].texture}return $}function ie(B,A,$){return Math.floor(Math.floor(B/$)/A)}function pe(B,A,$,le){const Oe=B.updateRanges;if(Oe.length===0)t.texSubImage2D(o.TEXTURE_2D,0,0,0,A.width,A.height,$,le,A.data);else{Oe.sort((Xe,He)=>Xe.start-He.start);let De=0;for(let Xe=1;Xe<Oe.length;Xe++){const He=Oe[De],ze=Oe[Xe],Le=He.start+He.count,tt=ie(ze.start,A.width,4),rt=ie(He.start,A.width,4);ze.start<=Le+1&&tt===rt&&ie(ze.start+ze.count-1,A.width,4)===tt?He.count=Math.max(He.count,ze.start+ze.count-He.start):(++De,Oe[De]=ze)}Oe.length=De+1;const xe=t.getParameter(o.UNPACK_ROW_LENGTH),ge=t.getParameter(o.UNPACK_SKIP_PIXELS),Pe=t.getParameter(o.UNPACK_SKIP_ROWS);t.pixelStorei(o.UNPACK_ROW_LENGTH,A.width);for(let Xe=0,He=Oe.length;Xe<He;Xe++){const ze=Oe[Xe],Le=Math.floor(ze.start/4),tt=Math.ceil(ze.count/4),rt=Le%A.width,Z=Math.floor(Le/A.width),Ue=tt,Se=1;t.pixelStorei(o.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(o.UNPACK_SKIP_ROWS,Z),t.texSubImage2D(o.TEXTURE_2D,0,rt,Z,Ue,Se,$,le,A.data)}B.clearUpdateRanges(),t.pixelStorei(o.UNPACK_ROW_LENGTH,xe),t.pixelStorei(o.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(o.UNPACK_SKIP_ROWS,Pe)}}function Ce(B,A,$){let le=o.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(le=o.TEXTURE_2D_ARRAY),A.isData3DTexture&&(le=o.TEXTURE_3D);const me=Be(B,A),Oe=A.source;t.bindTexture(le,B.__webglTexture,o.TEXTURE0+$);const De=i.get(Oe);if(Oe.version!==De.__version||me===!0){if(t.activeTexture(o.TEXTURE0+$),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){const Se=kt.getPrimaries(kt.workingColorSpace),Fe=A.colorSpace===Is?null:kt.getPrimaries(A.colorSpace),Ve=A.colorSpace===Is||Se===Fe?o.NONE:o.BROWSER_DEFAULT_WEBGL;t.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve)}t.pixelStorei(o.UNPACK_ALIGNMENT,A.unpackAlignment);let ge=S(A.image,!1,r.maxTextureSize);ge=Ot(A,ge);const Pe=l.convert(A.format,A.colorSpace),Xe=l.convert(A.type);let He=R(A.internalFormat,Pe,Xe,A.normalized,A.colorSpace,A.isVideoTexture);Ne(le,A);let ze;const Le=A.mipmaps,tt=A.isVideoTexture!==!0,rt=De.__version===void 0||me===!0,Z=Oe.dataReady,Ue=N(A,ge);if(A.isDepthTexture)He=D(A.format===Ro,A.type),rt&&(tt?t.texStorage2D(o.TEXTURE_2D,1,He,ge.width,ge.height):t.texImage2D(o.TEXTURE_2D,0,He,ge.width,ge.height,0,Pe,Xe,null));else if(A.isDataTexture)if(Le.length>0){tt&&rt&&t.texStorage2D(o.TEXTURE_2D,Ue,He,Le[0].width,Le[0].height);for(let Se=0,Fe=Le.length;Se<Fe;Se++)ze=Le[Se],tt?Z&&t.texSubImage2D(o.TEXTURE_2D,Se,0,0,ze.width,ze.height,Pe,Xe,ze.data):t.texImage2D(o.TEXTURE_2D,Se,He,ze.width,ze.height,0,Pe,Xe,ze.data);A.generateMipmaps=!1}else tt?(rt&&t.texStorage2D(o.TEXTURE_2D,Ue,He,ge.width,ge.height),Z&&pe(A,ge,Pe,Xe)):t.texImage2D(o.TEXTURE_2D,0,He,ge.width,ge.height,0,Pe,Xe,ge.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){tt&&rt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,Ue,He,Le[0].width,Le[0].height,ge.depth);for(let Se=0,Fe=Le.length;Se<Fe;Se++)if(ze=Le[Se],A.format!==$a)if(Pe!==null)if(tt){if(Z)if(A.layerUpdates.size>0){const Ve=EM(ze.width,ze.height,A.format,A.type);for(const be of A.layerUpdates){const we=ze.data.subarray(be*Ve/ze.data.BYTES_PER_ELEMENT,(be+1)*Ve/ze.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Se,0,0,be,ze.width,ze.height,1,Pe,we)}}else t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,Se,0,0,0,ze.width,ze.height,ge.depth,Pe,ze.data)}else t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,Se,He,ze.width,ze.height,ge.depth,0,ze.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else tt?Z&&t.texSubImage3D(o.TEXTURE_2D_ARRAY,Se,0,0,0,ze.width,ze.height,ge.depth,Pe,Xe,ze.data):t.texImage3D(o.TEXTURE_2D_ARRAY,Se,He,ze.width,ze.height,ge.depth,0,Pe,Xe,ze.data);A.layerUpdates.size>0&&A.clearLayerUpdates()}else{tt&&rt&&t.texStorage2D(o.TEXTURE_2D,Ue,He,Le[0].width,Le[0].height);for(let Se=0,Fe=Le.length;Se<Fe;Se++)ze=Le[Se],A.format!==$a?Pe!==null?tt?Z&&t.compressedTexSubImage2D(o.TEXTURE_2D,Se,0,0,ze.width,ze.height,Pe,ze.data):t.compressedTexImage2D(o.TEXTURE_2D,Se,He,ze.width,ze.height,0,ze.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?Z&&t.texSubImage2D(o.TEXTURE_2D,Se,0,0,ze.width,ze.height,Pe,Xe,ze.data):t.texImage2D(o.TEXTURE_2D,Se,He,ze.width,ze.height,0,Pe,Xe,ze.data)}else if(A.isDataArrayTexture)if(tt){if(rt&&t.texStorage3D(o.TEXTURE_2D_ARRAY,Ue,He,ge.width,ge.height,ge.depth),Z)if(A.layerUpdates.size>0){const Se=EM(ge.width,ge.height,A.format,A.type);for(const Fe of A.layerUpdates){const Ve=ge.data.subarray(Fe*Se/ge.data.BYTES_PER_ELEMENT,(Fe+1)*Se/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Fe,ge.width,ge.height,1,Pe,Xe,Ve)}A.clearLayerUpdates()}else t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Pe,Xe,ge.data)}else t.texImage3D(o.TEXTURE_2D_ARRAY,0,He,ge.width,ge.height,ge.depth,0,Pe,Xe,ge.data);else if(A.isData3DTexture)tt?(rt&&t.texStorage3D(o.TEXTURE_3D,Ue,He,ge.width,ge.height,ge.depth),Z&&t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Pe,Xe,ge.data)):t.texImage3D(o.TEXTURE_3D,0,He,ge.width,ge.height,ge.depth,0,Pe,Xe,ge.data);else if(A.isFramebufferTexture){if(rt)if(tt)t.texStorage2D(o.TEXTURE_2D,Ue,He,ge.width,ge.height);else{let Se=ge.width,Fe=ge.height;for(let Ve=0;Ve<Ue;Ve++)t.texImage2D(o.TEXTURE_2D,Ve,He,Se,Fe,0,Pe,Xe,null),Se>>=1,Fe>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in o){const Se=o.canvas;if(Se.hasAttribute("layoutsubtree")||Se.setAttribute("layoutsubtree","true"),ge.parentNode!==Se){Se.appendChild(ge),v.add(A),Se.onpaint=Fe=>{const Ve=Fe.changedElements;for(const be of v)Ve.includes(be.image)&&(be.needsUpdate=!0)},Se.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,ge);else{const Ve=o.RGBA,be=o.RGBA,we=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,Ve,be,we,ge)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(Le.length>0){if(tt&&rt){const Se=dt(Le[0]);t.texStorage2D(o.TEXTURE_2D,Ue,He,Se.width,Se.height)}for(let Se=0,Fe=Le.length;Se<Fe;Se++)ze=Le[Se],tt?Z&&t.texSubImage2D(o.TEXTURE_2D,Se,0,0,Pe,Xe,ze):t.texImage2D(o.TEXTURE_2D,Se,He,Pe,Xe,ze);A.generateMipmaps=!1}else if(tt){if(rt){const Se=dt(ge);t.texStorage2D(o.TEXTURE_2D,Ue,He,Se.width,Se.height)}Z&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,Pe,Xe,ge)}else t.texImage2D(o.TEXTURE_2D,0,He,Pe,Xe,ge);y(A)&&C(le),De.__version=Oe.version,A.onUpdate&&A.onUpdate(A)}B.__version=A.version}function at(B,A,$){if(A.image.length!==6)return;const le=Be(B,A),me=A.source;t.bindTexture(o.TEXTURE_CUBE_MAP,B.__webglTexture,o.TEXTURE0+$);const Oe=i.get(me);if(me.version!==Oe.__version||le===!0){t.activeTexture(o.TEXTURE0+$);const De=kt.getPrimaries(kt.workingColorSpace),xe=A.colorSpace===Is?null:kt.getPrimaries(A.colorSpace),ge=A.colorSpace===Is||De===xe?o.NONE:o.BROWSER_DEFAULT_WEBGL;t.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(o.UNPACK_ALIGNMENT,A.unpackAlignment),t.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Pe=A.isCompressedTexture||A.image[0].isCompressedTexture,Xe=A.image[0]&&A.image[0].isDataTexture,He=[];for(let be=0;be<6;be++)!Pe&&!Xe?He[be]=S(A.image[be],!0,r.maxCubemapSize):He[be]=Xe?A.image[be].image:A.image[be],He[be]=Ot(A,He[be]);const ze=He[0],Le=l.convert(A.format,A.colorSpace),tt=l.convert(A.type),rt=R(A.internalFormat,Le,tt,A.normalized,A.colorSpace),Z=A.isVideoTexture!==!0,Ue=Oe.__version===void 0||le===!0,Se=me.dataReady;let Fe=N(A,ze);Ne(o.TEXTURE_CUBE_MAP,A);let Ve;if(Pe){Z&&Ue&&t.texStorage2D(o.TEXTURE_CUBE_MAP,Fe,rt,ze.width,ze.height);for(let be=0;be<6;be++){Ve=He[be].mipmaps;for(let we=0;we<Ve.length;we++){const Ee=Ve[we];A.format!==$a?Le!==null?Z?Se&&t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we,0,0,Ee.width,Ee.height,Le,Ee.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we,rt,Ee.width,Ee.height,0,Ee.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?Se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we,0,0,Ee.width,Ee.height,Le,tt,Ee.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we,rt,Ee.width,Ee.height,0,Le,tt,Ee.data)}}}else{if(Ve=A.mipmaps,Z&&Ue){Ve.length>0&&Fe++;const be=dt(He[0]);t.texStorage2D(o.TEXTURE_CUBE_MAP,Fe,rt,be.width,be.height)}for(let be=0;be<6;be++)if(Xe){Z?Se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,He[be].width,He[be].height,Le,tt,He[be].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,rt,He[be].width,He[be].height,0,Le,tt,He[be].data);for(let we=0;we<Ve.length;we++){const it=Ve[we].image[be].image;Z?Se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we+1,0,0,it.width,it.height,Le,tt,it.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we+1,rt,it.width,it.height,0,Le,tt,it.data)}}else{Z?Se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Le,tt,He[be]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,rt,Le,tt,He[be]);for(let we=0;we<Ve.length;we++){const Ee=Ve[we];Z?Se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we+1,0,0,Le,tt,Ee.image[be]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+be,we+1,rt,Le,tt,Ee.image[be])}}}y(A)&&C(o.TEXTURE_CUBE_MAP),Oe.__version=me.version,A.onUpdate&&A.onUpdate(A)}B.__version=A.version}function Ie(B,A,$,le,me,Oe){const De=l.convert($.format,$.colorSpace),xe=l.convert($.type),ge=R($.internalFormat,De,xe,$.normalized,$.colorSpace),Pe=i.get(A),Xe=i.get($);if(Xe.__renderTarget=A,!Pe.__hasExternalTextures){const He=Math.max(1,A.width>>Oe),ze=Math.max(1,A.height>>Oe);me===o.TEXTURE_3D||me===o.TEXTURE_2D_ARRAY?t.texImage3D(me,Oe,ge,He,ze,A.depth,0,De,xe,null):t.texImage2D(me,Oe,ge,He,ze,0,De,xe,null)}t.bindFramebuffer(o.FRAMEBUFFER,B),Zt(A)?f.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,le,me,Xe.__webglTexture,0,ht(A)):(me===o.TEXTURE_2D||me>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,le,me,Xe.__webglTexture,Oe),t.bindFramebuffer(o.FRAMEBUFFER,null)}function st(B,A,$){if(o.bindRenderbuffer(o.RENDERBUFFER,B),A.depthBuffer){const le=A.depthTexture,me=le&&le.isDepthTexture?le.type:null,Oe=D(A.stencilBuffer,me),De=A.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;Zt(A)?f.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ht(A),Oe,A.width,A.height):$?o.renderbufferStorageMultisample(o.RENDERBUFFER,ht(A),Oe,A.width,A.height):o.renderbufferStorage(o.RENDERBUFFER,Oe,A.width,A.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,De,o.RENDERBUFFER,B)}else{const le=A.textures;for(let me=0;me<le.length;me++){const Oe=le[me],De=l.convert(Oe.format,Oe.colorSpace),xe=l.convert(Oe.type),ge=R(Oe.internalFormat,De,xe,Oe.normalized,Oe.colorSpace);Zt(A)?f.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ht(A),ge,A.width,A.height):$?o.renderbufferStorageMultisample(o.RENDERBUFFER,ht(A),ge,A.width,A.height):o.renderbufferStorage(o.RENDERBUFFER,ge,A.width,A.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function lt(B,A,$){const le=A.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(o.FRAMEBUFFER,B),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const me=i.get(A.depthTexture);if(me.__renderTarget=A,(!me.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),le){if(me.__webglInit===void 0&&(me.__webglInit=!0,A.depthTexture.addEventListener("dispose",w)),me.__webglTexture===void 0){me.__webglTexture=o.createTexture(),t.bindTexture(o.TEXTURE_CUBE_MAP,me.__webglTexture),Ne(o.TEXTURE_CUBE_MAP,A.depthTexture);const Pe=l.convert(A.depthTexture.format),Xe=l.convert(A.depthTexture.type);let He;A.depthTexture.format===as?He=o.DEPTH_COMPONENT24:A.depthTexture.format===Ro&&(He=o.DEPTH24_STENCIL8);for(let ze=0;ze<6;ze++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,He,A.width,A.height,0,Pe,Xe,null)}}else te(A.depthTexture,0);const Oe=me.__webglTexture,De=ht(A),xe=le?o.TEXTURE_CUBE_MAP_POSITIVE_X+$:o.TEXTURE_2D,ge=A.depthTexture.format===Ro?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(A.depthTexture.format===as)Zt(A)?f.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ge,xe,Oe,0,De):o.framebufferTexture2D(o.FRAMEBUFFER,ge,xe,Oe,0);else if(A.depthTexture.format===Ro)Zt(A)?f.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ge,xe,Oe,0,De):o.framebufferTexture2D(o.FRAMEBUFFER,ge,xe,Oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(B){const A=i.get(B),$=B.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==B.depthTexture){const le=B.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),le){const me=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,le.removeEventListener("dispose",me)};le.addEventListener("dispose",me),A.__depthDisposeCallback=me}A.__boundDepthTexture=le}if(B.depthTexture&&!A.__autoAllocateDepthBuffer)if($)for(let le=0;le<6;le++)lt(A.__webglFramebuffer[le],B,le);else{const le=B.texture.mipmaps;le&&le.length>0?lt(A.__webglFramebuffer[0],B,0):lt(A.__webglFramebuffer,B,0)}else if($){A.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(o.FRAMEBUFFER,A.__webglFramebuffer[le]),A.__webglDepthbuffer[le]===void 0)A.__webglDepthbuffer[le]=o.createRenderbuffer(),st(A.__webglDepthbuffer[le],B,!1);else{const me=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Oe=A.__webglDepthbuffer[le];o.bindRenderbuffer(o.RENDERBUFFER,Oe),o.framebufferRenderbuffer(o.FRAMEBUFFER,me,o.RENDERBUFFER,Oe)}}else{const le=B.texture.mipmaps;if(le&&le.length>0?t.bindFramebuffer(o.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(o.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=o.createRenderbuffer(),st(A.__webglDepthbuffer,B,!1);else{const me=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Oe=A.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Oe),o.framebufferRenderbuffer(o.FRAMEBUFFER,me,o.RENDERBUFFER,Oe)}}t.bindFramebuffer(o.FRAMEBUFFER,null)}function ct(B,A,$){const le=i.get(B);A!==void 0&&Ie(le.__webglFramebuffer,B,B.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),$!==void 0&&je(B)}function gt(B){const A=B.texture,$=i.get(B),le=i.get(A);B.addEventListener("dispose",b);const me=B.textures,Oe=B.isWebGLCubeRenderTarget===!0,De=me.length>1;if(De||(le.__webglTexture===void 0&&(le.__webglTexture=o.createTexture()),le.__version=A.version,c.memory.textures++),Oe){$.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer[xe]=[];for(let ge=0;ge<A.mipmaps.length;ge++)$.__webglFramebuffer[xe][ge]=o.createFramebuffer()}else $.__webglFramebuffer[xe]=o.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer=[];for(let xe=0;xe<A.mipmaps.length;xe++)$.__webglFramebuffer[xe]=o.createFramebuffer()}else $.__webglFramebuffer=o.createFramebuffer();if(De)for(let xe=0,ge=me.length;xe<ge;xe++){const Pe=i.get(me[xe]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=o.createTexture(),c.memory.textures++)}if(B.samples>0&&Zt(B)===!1){$.__webglMultisampledFramebuffer=o.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let xe=0;xe<me.length;xe++){const ge=me[xe];$.__webglColorRenderbuffer[xe]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,$.__webglColorRenderbuffer[xe]);const Pe=l.convert(ge.format,ge.colorSpace),Xe=l.convert(ge.type),He=R(ge.internalFormat,Pe,Xe,ge.normalized,ge.colorSpace,B.isXRRenderTarget===!0),ze=ht(B);o.renderbufferStorageMultisample(o.RENDERBUFFER,ze,He,B.width,B.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+xe,o.RENDERBUFFER,$.__webglColorRenderbuffer[xe])}o.bindRenderbuffer(o.RENDERBUFFER,null),B.depthBuffer&&($.__webglDepthRenderbuffer=o.createRenderbuffer(),st($.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Oe){t.bindTexture(o.TEXTURE_CUBE_MAP,le.__webglTexture),Ne(o.TEXTURE_CUBE_MAP,A);for(let xe=0;xe<6;xe++)if(A.mipmaps&&A.mipmaps.length>0)for(let ge=0;ge<A.mipmaps.length;ge++)Ie($.__webglFramebuffer[xe][ge],B,A,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ge);else Ie($.__webglFramebuffer[xe],B,A,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);y(A)&&C(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let xe=0,ge=me.length;xe<ge;xe++){const Pe=me[xe],Xe=i.get(Pe);let He=o.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(He=B.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(He,Xe.__webglTexture),Ne(He,Pe),Ie($.__webglFramebuffer,B,Pe,o.COLOR_ATTACHMENT0+xe,He,0),y(Pe)&&C(He)}t.unbindTexture()}else{let xe=o.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(xe=B.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(xe,le.__webglTexture),Ne(xe,A),A.mipmaps&&A.mipmaps.length>0)for(let ge=0;ge<A.mipmaps.length;ge++)Ie($.__webglFramebuffer[ge],B,A,o.COLOR_ATTACHMENT0,xe,ge);else Ie($.__webglFramebuffer,B,A,o.COLOR_ATTACHMENT0,xe,0);y(A)&&C(xe),t.unbindTexture()}B.depthBuffer&&je(B)}function re(B){const A=B.textures;for(let $=0,le=A.length;$<le;$++){const me=A[$];if(y(me)){const Oe=F(B),De=i.get(me).__webglTexture;t.bindTexture(Oe,De),C(Oe),t.unbindTexture()}}}const bt=[],qt=[];function pn(B){if(B.samples>0){if(Zt(B)===!1){const A=B.textures,$=B.width,le=B.height;let me=o.COLOR_BUFFER_BIT;const Oe=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,De=i.get(B),xe=A.length>1;if(xe)for(let Pe=0;Pe<A.length;Pe++)t.bindFramebuffer(o.FRAMEBUFFER,De.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pe,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,De.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pe,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const ge=B.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(o.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(o.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Pe=0;Pe<A.length;Pe++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(me|=o.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(me|=o.STENCIL_BUFFER_BIT)),xe){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,De.__webglColorRenderbuffer[Pe]);const Xe=i.get(A[Pe]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Xe,0)}o.blitFramebuffer(0,0,$,le,0,0,$,le,me,o.NEAREST),p===!0&&(bt.length=0,qt.length=0,bt.push(o.COLOR_ATTACHMENT0+Pe),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(bt.push(Oe),qt.push(Oe),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,qt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),xe)for(let Pe=0;Pe<A.length;Pe++){t.bindFramebuffer(o.FRAMEBUFFER,De.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pe,o.RENDERBUFFER,De.__webglColorRenderbuffer[Pe]);const Xe=i.get(A[Pe]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,De.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Pe,o.TEXTURE_2D,Xe,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&p){const A=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[A])}}}function ht(B){return Math.min(r.maxSamples,B.samples)}function Zt(B){const A=i.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function j(B){const A=c.render.frame;_.get(B)!==A&&(_.set(B,A),B.update())}function Ot(B,A){const $=B.colorSpace,le=B.format,me=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||$!==Sd&&$!==Is&&(kt.getTransfer($)===on?(le!==$a||me!==Ba)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",$)),A}function dt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(d.width=B.naturalWidth||B.width,d.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(d.width=B.displayWidth,d.height=B.displayHeight):(d.width=B.width,d.height=B.height),d}this.allocateTextureUnit=H,this.resetTextureUnits=J,this.getTextureUnits=Y,this.setTextureUnits=Q,this.setTexture2D=te,this.setTexture2DArray=ee,this.setTexture3D=z,this.setTextureCube=P,this.rebindTextures=ct,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=pn,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=Zt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lU(o,e){function t(i,r=Is){let l;const c=kt.getTransfer(r);if(i===Ba)return o.UNSIGNED_BYTE;if(i===S0)return o.UNSIGNED_SHORT_4_4_4_4;if(i===y0)return o.UNSIGNED_SHORT_5_5_5_1;if(i===y1)return o.UNSIGNED_INT_5_9_9_9_REV;if(i===M1)return o.UNSIGNED_INT_10F_11F_11F_REV;if(i===x1)return o.BYTE;if(i===S1)return o.SHORT;if(i===Wc)return o.UNSIGNED_SHORT;if(i===x0)return o.INT;if(i===Sr)return o.UNSIGNED_INT;if(i===pr)return o.FLOAT;if(i===yr)return o.HALF_FLOAT;if(i===E1)return o.ALPHA;if(i===T1)return o.RGB;if(i===$a)return o.RGBA;if(i===as)return o.DEPTH_COMPONENT;if(i===Ro)return o.DEPTH_STENCIL;if(i===b1)return o.RED;if(i===M0)return o.RED_INTEGER;if(i===zo)return o.RG;if(i===E0)return o.RG_INTEGER;if(i===T0)return o.RGBA_INTEGER;if(i===$h||i===ed||i===td||i===nd)if(c===on)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(i===$h)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ed)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===td)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nd)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(i===$h)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ed)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===td)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nd)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ug||i===cg||i===fg||i===hg)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(i===ug)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cg)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fg)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===hg)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dg||i===pg||i===mg||i===_g||i===gg||i===vd||i===vg)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(i===dg||i===pg)return c===on?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(i===mg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(i===_g)return l.COMPRESSED_R11_EAC;if(i===gg)return l.COMPRESSED_SIGNED_R11_EAC;if(i===vd)return l.COMPRESSED_RG11_EAC;if(i===vg)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===xg||i===Sg||i===yg||i===Mg||i===Eg||i===Tg||i===bg||i===Ag||i===Rg||i===Cg||i===wg||i===Dg||i===Lg||i===Ug)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(i===xg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Sg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===yg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Eg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Tg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ag)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Dg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lg)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ug)return c===on?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ng||i===Og||i===Pg)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(i===Ng)return c===on?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Og)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pg)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fg||i===Ig||i===xd||i===zg)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(i===Fg)return l.COMPRESSED_RED_RGTC1_EXT;if(i===Ig)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xd)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zg)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Yc?o.UNSIGNED_INT_24_8:o[i]!==void 0?o[i]:null}return{convert:t}}const uU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class fU{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new P1(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new tr({vertexShader:uU,fragmentShader:cU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mr(new ef(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hU extends Xo{constructor(e,t){super();const i=this;let r=null,l=1,c=null,f="local-floor",p=1,d=null,_=null,v=null,g=null,x=null,M=null;const E=typeof XRWebGLBinding<"u",S=new fU,y={},C=t.getContextAttributes();let F=null,R=null;const D=[],N=[],w=new en;let b=null,L=null;const I=new Qa;I.viewport=new Fn;const V=new Qa;V.viewport=new Fn;const k=[I,V],J=new S3;let Y=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let pe=D[ie];return pe===void 0&&(pe=new h_,D[ie]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(ie){let pe=D[ie];return pe===void 0&&(pe=new h_,D[ie]=pe),pe.getGripSpace()},this.getHand=function(ie){let pe=D[ie];return pe===void 0&&(pe=new h_,D[ie]=pe),pe.getHandSpace()};function H(ie){const pe=N.indexOf(ie.inputSource);if(pe===-1)return;const Ce=D[pe];Ce!==void 0&&(Ce.update(ie.inputSource,ie.frame,d||c),Ce.dispatchEvent({type:ie.type,data:ie.inputSource}))}function G(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",te);for(let ie=0;ie<D.length;ie++){const pe=N[ie];pe!==null&&(N[ie]=null,D[ie].disconnect(pe))}Y=null,Q=null,S.reset();for(const ie in y)delete y[ie];if(e.setRenderTarget(F),x=null,g=null,v=null,r=null,R=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(w.width,w.height,!1),L!==null){const ie=L.camera;ie.fov=L.fov,ie.zoom=L.zoom,ie.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){l=ie,i.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){f=ie,i.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||c},this.setReferenceSpace=function(ie){d=ie},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return v===null&&E&&(v=new XRWebGLBinding(r,t)),v},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(F=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",G),r.addEventListener("inputsourceschange",te),C.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(w),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ce=null,at=null,Ie=null;C.depth&&(Ie=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ce=C.stencil?Ro:as,at=C.stencil?Yc:Sr);const st={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:l};v=this.getBinding(),g=v.createProjectionLayer(st),r.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),R=new er(g.textureWidth,g.textureHeight,{format:$a,type:Ba,depthTexture:new qc(g.textureWidth,g.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,Ce),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Ce={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:l};x=new XRWebGLLayer(r,t,Ce),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),R=new er(x.framebufferWidth,x.framebufferHeight,{format:$a,type:Ba,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(p),d=null,c=await r.requestReferenceSpace(f),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function te(ie){for(let pe=0;pe<ie.removed.length;pe++){const Ce=ie.removed[pe],at=N.indexOf(Ce);at>=0&&(N[at]=null,D[at].disconnect(Ce))}for(let pe=0;pe<ie.added.length;pe++){const Ce=ie.added[pe];let at=N.indexOf(Ce);if(at===-1){for(let st=0;st<D.length;st++)if(st>=N.length){N.push(Ce),at=st;break}else if(N[st]===null){N[st]=Ce,at=st;break}if(at===-1)break}const Ie=D[at];Ie&&Ie.connect(Ce)}}const ee=new de,z=new de;function P(ie,pe,Ce){ee.setFromMatrixPosition(pe.matrixWorld),z.setFromMatrixPosition(Ce.matrixWorld);const at=ee.distanceTo(z),Ie=pe.projectionMatrix.elements,st=Ce.projectionMatrix.elements,lt=Ie[14]/(Ie[10]-1),je=Ie[14]/(Ie[10]+1),ct=(Ie[9]+1)/Ie[5],gt=(Ie[9]-1)/Ie[5],re=(Ie[8]-1)/Ie[0],bt=(st[8]+1)/st[0],qt=lt*re,pn=lt*bt,ht=at/(-re+bt),Zt=ht*-re;if(pe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Zt),ie.translateZ(ht),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Ie[10]===-1)ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const j=lt+ht,Ot=je+ht,dt=qt-Zt,B=pn+(at-Zt),A=ct*je/Ot*j,$=gt*je/Ot*j;ie.projectionMatrix.makePerspective(dt,B,A,$,j,Ot),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function ne(ie,pe){pe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(pe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let pe=ie.near,Ce=ie.far;S.texture!==null&&(S.depthNear>0&&(pe=S.depthNear),S.depthFar>0&&(Ce=S.depthFar)),J.near=V.near=I.near=pe,J.far=V.far=I.far=Ce,(Y!==J.near||Q!==J.far)&&(r.updateRenderState({depthNear:J.near,depthFar:J.far}),Y=J.near,Q=J.far),J.layers.mask=ie.layers.mask|6,I.layers.mask=J.layers.mask&-5,V.layers.mask=J.layers.mask&-3;const at=ie.parent,Ie=J.cameras;ne(J,at);for(let st=0;st<Ie.length;st++)ne(Ie[st],at);Ie.length===2?P(J,I,V):J.projectionMatrix.copy(I.projectionMatrix),L===null&&ie.isPerspectiveCamera&&(L={camera:ie,fov:ie.fov,zoom:ie.zoom}),_e(ie,J,at)};function _e(ie,pe,Ce){Ce===null?ie.matrix.copy(pe.matrixWorld):(ie.matrix.copy(Ce.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(pe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Bg*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(g===null&&x===null))return p},this.setFoveation=function(ie){p=ie,g!==null&&(g.fixedFoveation=ie),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=ie)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(J)},this.getCameraTexture=function(ie){return y[ie]};let Ae=null;function Ne(ie,pe){if(_=pe.getViewerPose(d||c),M=pe,_!==null){const Ce=_.views;x!==null&&(e.setRenderTargetFramebuffer(R,x.framebuffer),e.setRenderTarget(R));let at=!1;Ce.length!==J.cameras.length&&(J.cameras.length=0,at=!0);for(let je=0;je<Ce.length;je++){const ct=Ce[je];let gt=null;if(x!==null)gt=x.getViewport(ct);else{const bt=v.getViewSubImage(g,ct);gt=bt.viewport,je===0&&(e.setRenderTargetTextures(R,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(R))}let re=k[je];re===void 0&&(re=new Qa,re.layers.enable(je),re.viewport=new Fn,k[je]=re),re.matrix.fromArray(ct.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(ct.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(gt.x,gt.y,gt.width,gt.height),je===0&&(J.matrix.copy(re.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),at===!0&&J.cameras.push(re)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){v=i.getBinding();const je=v.getDepthInformation(Ce[0]);je&&je.isValid&&je.texture&&S.init(je,r.renderState)}if(Ie&&Ie.includes("camera-access")&&E){e.state.unbindTexture(),v=i.getBinding();for(let je=0;je<Ce.length;je++){const ct=Ce[je].camera;if(ct){let gt=y[ct];gt||(gt=new P1,y[ct]=gt);const re=v.getCameraImage(ct);gt.sourceTexture=re}}}}for(let Ce=0;Ce<D.length;Ce++){const at=N[Ce],Ie=D[Ce];at!==null&&Ie!==void 0&&Ie.update(at,pe,d||c)}Ae&&Ae(ie,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),M=null}const Be=new z1;Be.setAnimationLoop(Ne),this.setAnimationLoop=function(ie){Ae=ie},this.dispose=function(){}}}const dU=new jn,W1=new xt;W1.set(-1,0,0,0,1,0,0,0,1);function pU(o,e){function t(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function i(S,y){y.color.getRGB(S.fogColor.value,F1(o)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function r(S,y,C,F,R){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?l(S,y):y.isMeshLambertMaterial?(l(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(l(S,y),v(S,y)):y.isMeshPhongMaterial?(l(S,y),_(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(l(S,y),g(S,y),y.isMeshPhysicalMaterial&&x(S,y,R)):y.isMeshMatcapMaterial?(l(S,y),M(S,y)):y.isMeshDepthMaterial?l(S,y):y.isMeshDistanceMaterial?(l(S,y),E(S,y)):y.isMeshNormalMaterial?l(S,y):y.isLineBasicMaterial?(c(S,y),y.isLineDashedMaterial&&f(S,y)):y.isPointsMaterial?p(S,y,C,F):y.isSpriteMaterial?d(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,t(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,t(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,t(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===$i&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,t(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===$i&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,t(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,t(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const C=e.get(y),F=C.envMap,R=C.envMapRotation;F&&(S.envMap.value=F,S.envMapRotation.value.setFromMatrix4(dU.makeRotationFromEuler(R)).transpose(),F.isCubeTexture&&F.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(W1),S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,t(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,S.aoMapTransform))}function c(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,t(y.map,S.mapTransform))}function f(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function p(S,y,C,F){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*C,S.scale.value=F*.5,y.map&&(S.map.value=y.map,t(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,t(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function d(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,t(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,t(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function _(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function v(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function g(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function x(S,y,C){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===$i&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.retroreflectivity>0&&(S.retroreflectivity.value=y.retroreflectivity),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=C.texture,S.transmissionSamplerSize.value.set(C.width,C.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,S.specularIntensityMapTransform))}function M(S,y){y.matcap&&(S.matcap.value=y.matcap)}function E(S,y){const C=e.get(y).light;S.referencePosition.value.setFromMatrixPosition(C.matrixWorld),S.nearDistance.value=C.shadow.camera.near,S.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function mU(o,e,t,i){let r={},l={},c=[];const f=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(R,D){const N=D.program;i.uniformBlockBinding(R,N)}function d(R,D){let N=r[R.id];N===void 0&&(S(R),N=_(R),r[R.id]=N,R.addEventListener("dispose",C));const w=D.program;i.updateUBOMapping(R,w);const b=e.render.frame;l[R.id]!==b&&(g(R),l[R.id]=b)}function _(R){const D=v();R.__bindingPointIndex=D;const N=o.createBuffer(),w=R.__size,b=R.usage;return o.bindBuffer(o.UNIFORM_BUFFER,N),o.bufferData(o.UNIFORM_BUFFER,w,b),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,D,N),N}function v(){for(let R=0;R<f;R++)if(c.indexOf(R)===-1)return c.push(R),R;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const D=r[R.id],N=R.uniforms,w=R.__cache;o.bindBuffer(o.UNIFORM_BUFFER,D);for(let b=0,L=N.length;b<L;b++){const I=N[b];if(Array.isArray(I))for(let V=0,k=I.length;V<k;V++)x(I[V],b,V,w);else x(I,b,0,w)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function x(R,D,N,w){if(E(R,D,N,w)===!0){const b=R.__offset,L=R.value;if(Array.isArray(L)){let I=0;for(let V=0;V<L.length;V++){const k=L[V],J=y(k);M(k,R.__data,I),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(I+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else M(L,R.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,b,R.__data)}}function M(R,D,N){typeof R=="number"||typeof R=="boolean"?D[0]=R:R.isMatrix3?(D[0]=R.elements[0],D[1]=R.elements[1],D[2]=R.elements[2],D[3]=0,D[4]=R.elements[3],D[5]=R.elements[4],D[6]=R.elements[5],D[7]=0,D[8]=R.elements[6],D[9]=R.elements[7],D[10]=R.elements[8],D[11]=0):ArrayBuffer.isView(R)?D.set(new R.constructor(R.buffer,R.byteOffset,D.length)):R.toArray(D,N)}function E(R,D,N,w){const b=R.value,L=D+"_"+N;if(w[L]===void 0)return typeof b=="number"||typeof b=="boolean"?w[L]=b:ArrayBuffer.isView(b)?w[L]=b.slice():w[L]=b.clone(),!0;{const I=w[L];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return w[L]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(I.equals(b)===!1)return I.copy(b),!0}}return!1}function S(R){const D=R.uniforms;let N=0;const w=16;for(let L=0,I=D.length;L<I;L++){const V=Array.isArray(D[L])?D[L]:[D[L]];for(let k=0,J=V.length;k<J;k++){const Y=V[k],Q=Array.isArray(Y.value)?Y.value:[Y.value];for(let H=0,G=Q.length;H<G;H++){const te=Q[H],ee=y(te),z=N%w,P=z%ee.boundary,ne=z+P;N+=P,ne!==0&&w-ne<ee.storage&&(N+=w-ne),Y.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=N,N+=ee.storage}}}const b=N%w;return b>0&&(N+=w-b),R.__size=N,R.__cache={},this}function y(R){const D={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(D.boundary=4,D.storage=4):R.isVector2?(D.boundary=8,D.storage=8):R.isVector3||R.isColor?(D.boundary=16,D.storage=12):R.isVector4?(D.boundary=16,D.storage=16):R.isMatrix3?(D.boundary=48,D.storage=48):R.isMatrix4?(D.boundary=64,D.storage=64):R.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(D.boundary=16,D.storage=R.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",R),D}function C(R){const D=R.target;D.removeEventListener("dispose",C);const N=c.indexOf(D.__bindingPointIndex);c.splice(N,1),o.deleteBuffer(r[D.id]),delete r[D.id],delete l[D.id]}function F(){for(const R in r)o.deleteBuffer(r[R]);c=[],r={},l={}}return{bind:p,update:d,dispose:F}}const _U=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let lr=null;function gU(){return lr===null&&(lr=new u3(_U,16,16,zo,yr),lr.name="DFG_LUT",lr.minFilter=Ai,lr.magFilter=Ai,lr.wrapS=Kr,lr.wrapT=Kr,lr.generateMipmaps=!1,lr.needsUpdate=!0),lr}class vU{constructor(e={}){const{canvas:t=IC(),context:i=null,depth:r=!0,stencil:l=!1,alpha:c=!1,antialias:f=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:x=Ba}=e;this.isWebGLRenderer=!0;let M;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=i.getContextAttributes().alpha}else M=c;const E=x,S=new Set([T0,E0,M0]),y=new Set([Ba,Sr,Wc,Yc,S0,y0]),C=new Uint32Array(4),F=new Int32Array(4),R=new de;let D=null,N=null;const w=[],b=[];let L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let V=!1,k=null,J=null,Y=null,Q=null;this._outputColorSpace=Fa;let H=0,G=0,te=null,ee=-1,z=null;const P=new Fn,ne=new Fn;let _e=null;const Ae=new nn(0);let Ne=0,Be=t.width,ie=t.height,pe=1,Ce=null,at=null;const Ie=new Fn(0,0,Be,ie),st=new Fn(0,0,Be,ie);let lt=!1;const je=new N1;let ct=!1,gt=!1;const re=new jn,bt=new de,qt=new Fn,pn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ht=!1;function Zt(){return te===null?pe:1}let j=i;function Ot(U,q){return t.getContext(U,q)}let dt,B,A,$,le,me,Oe,De,xe,ge,Pe,Xe,He,ze,Le,tt,rt,Z,Ue,Se,Fe,Ve,be;try{const U={alpha:!0,depth:r,stencil:l,antialias:f,premultipliedAlpha:p,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${v0}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",Re,!1),t.addEventListener("webglcontextcreationerror",ot,!1),j===null){const q="webgl2";if(j=Ot(q,U),j===null)throw Ot(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}we()}catch(U){throw t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",Re,!1),t.removeEventListener("webglcontextcreationerror",ot,!1),Qt("WebGLRenderer: "+U.message),U}function we(){dt=new gD(j),dt.init(),Fe=new lU(j,dt),B=new oD(j,dt,e,Fe),A=new sU(j,dt),B.reversedDepthBuffer&&g&&A.buffers.depth.setReversed(!0),J=j.createFramebuffer(),Y=j.createFramebuffer(),Q=j.createFramebuffer(),$=new SD(j),le=new YL,me=new oU(j,dt,A,le,B,Fe,$),Oe=new _D(I),De=new M3(j),Ve=new rD(j,De),xe=new vD(j,De,$,Ve),ge=new MD(j,xe,De,Ve,$),Z=new yD(j,B,me),Le=new lD(le),Pe=new WL(I,Oe,dt,B,Ve,Le),Xe=new pU(I,le),He=new ZL,ze=new eU(dt),rt=new aD(I,Oe,A,ge,M,p),tt=new rU(I,ge,B),be=new mU(j,$,B,A),Ue=new sD(j,dt,$),Se=new xD(j,dt,$),$.programs=Pe.programs,I.capabilities=B,I.extensions=dt,I.properties=le,I.renderLists=He,I.shadowMap=tt,I.state=A,I.info=$}E!==Ba&&(L=new TD(E,t.width,t.height,f,r,l));const Ee=new hU(I,j);this.xr=Ee,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const U=dt.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){const U=dt.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(U){U!==void 0&&(pe=U,this.setSize(Be,ie,!1))},this.getSize=function(U){return U.set(Be,ie)},this.setSize=function(U,q,ce=!0){if(Ee.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}Be=U,ie=q,t.width=Math.floor(U*pe),t.height=Math.floor(q*pe),ce===!0&&(t.style.width=U+"px",t.style.height=q+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,U,q)},this.getDrawingBufferSize=function(U){return U.set(Be*pe,ie*pe).floor()},this.setDrawingBufferSize=function(U,q,ce){Be=U,ie=q,pe=ce,t.width=Math.floor(U*ce),t.height=Math.floor(q*ce),this.setViewport(0,0,U,q)},this.setEffects=function(U){if(E===Ba){Qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(U){for(let q=0;q<U.length;q++)if(U[q].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(U||[])},this.getCurrentViewport=function(U){return U.copy(P)},this.getViewport=function(U){return U.copy(Ie)},this.setViewport=function(U,q,ce,se){U.isVector4?Ie.set(U.x,U.y,U.z,U.w):Ie.set(U,q,ce,se),A.viewport(P.copy(Ie).multiplyScalar(pe).round())},this.getScissor=function(U){return U.copy(st)},this.setScissor=function(U,q,ce,se){U.isVector4?st.set(U.x,U.y,U.z,U.w):st.set(U,q,ce,se),A.scissor(ne.copy(st).multiplyScalar(pe).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(U){A.setScissorTest(lt=U)},this.setOpaqueSort=function(U){Ce=U},this.setTransparentSort=function(U){at=U},this.getClearColor=function(U){return U.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(U=!0,q=!0,ce=!0){let se=0;if(U){let oe=!1;if(te!==null){const Ge=te.texture.format;oe=S.has(Ge)}if(oe){const Ge=te.texture.type,Ze=y.has(Ge),ke=rt.getClearColor(),Ye=rt.getClearAlpha(),qe=ke.r,yt=ke.g,Ut=ke.b;Ze?(C[0]=qe,C[1]=yt,C[2]=Ut,C[3]=Ye,j.clearBufferuiv(j.COLOR,0,C)):(F[0]=qe,F[1]=yt,F[2]=Ut,F[3]=Ye,j.clearBufferiv(j.COLOR,0,F))}else se|=j.COLOR_BUFFER_BIT}q&&(se|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ce&&(se|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),se!==0&&j.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(U){U.setRenderer(this),k=U},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",Re,!1),t.removeEventListener("webglcontextcreationerror",ot,!1),rt.dispose(),He.dispose(),ze.dispose(),le.dispose(),Oe.dispose(),ge.dispose(),Ve.dispose(),be.dispose(),Pe.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",St),Ee.removeEventListener("sessionend",Mt),Et.stop()};function it(U){U.preventDefault(),aM("WebGLRenderer: Context Lost."),V=!0}function Re(){aM("WebGLRenderer: Context Restored."),V=!1;const U=$.autoReset,q=tt.enabled,ce=tt.autoUpdate,se=tt.needsUpdate,oe=tt.type;we(),$.autoReset=U,tt.enabled=q,tt.autoUpdate=ce,tt.needsUpdate=se,tt.type=oe}function ot(U){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function Qe(U){const q=U.target;q.removeEventListener("dispose",Qe),pt(q)}function pt(U){Rn(U),le.remove(U)}function Rn(U){const q=le.get(U).programs;q!==void 0&&(q.forEach(function(ce){Pe.releaseProgram(ce)}),U.isShaderMaterial&&Pe.releaseShaderCache(U))}this.renderBufferDirect=function(U,q,ce,se,oe,Ge){q===null&&(q=pn);const Ze=oe.isMesh&&oe.matrixWorld.determinantAffine()<0,ke=En(U,q,ce,se,oe);A.setMaterial(se,Ze);let Ye=ce.index,qe=1;if(se.wireframe===!0){if(Ye=xe.getWireframeAttribute(ce),Ye===void 0)return;qe=2}const yt=ce.drawRange,Ut=ce.attributes.position;let Je=yt.start*qe,Yt=(yt.start+yt.count)*qe;Ge!==null&&(Je=Math.max(Je,Ge.start*qe),Yt=Math.min(Yt,(Ge.start+Ge.count)*qe)),Ye!==null?(Je=Math.max(Je,0),Yt=Math.min(Yt,Ye.count)):Ut!=null&&(Je=Math.max(Je,0),Yt=Math.min(Yt,Ut.count));const Tn=Yt-Je;if(Tn<0||Tn===1/0)return;Ve.setup(oe,se,ke,ce,Ye);let _n,wt=Ue;if(Ye!==null&&(_n=De.get(Ye),wt=Se,wt.setIndex(_n)),oe.isMesh)se.wireframe===!0?(A.setLineWidth(se.wireframeLinewidth*Zt()),wt.setMode(j.LINES)):wt.setMode(j.TRIANGLES);else if(oe.isLine){let Vn=se.linewidth;Vn===void 0&&(Vn=1),A.setLineWidth(Vn*Zt()),oe.isLineSegments?wt.setMode(j.LINES):oe.isLineLoop?wt.setMode(j.LINE_LOOP):wt.setMode(j.LINE_STRIP)}else oe.isPoints?wt.setMode(j.POINTS):oe.isSprite&&wt.setMode(j.TRIANGLES);if(oe.isBatchedMesh)if(dt.get("WEBGL_multi_draw"))wt.renderMultiDraw(oe._multiDrawStarts,oe._multiDrawCounts,oe._multiDrawCount);else{const Vn=oe._multiDrawStarts,Ke=oe._multiDrawCounts,Jn=oe._multiDrawCount,Dt=Ye?De.get(Ye).bytesPerElement:1,wi=le.get(se).currentProgram.getUniforms();for(let ta=0;ta<Jn;ta++)wi.setValue(j,"_gl_DrawID",ta),wt.render(Vn[ta]/Dt,Ke[ta])}else if(oe.isInstancedMesh)wt.renderInstances(Je,Tn,oe.count);else if(ce.isInstancedBufferGeometry){const Vn=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,Ke=Math.min(ce.instanceCount,Vn);wt.renderInstances(Je,Tn,Ke)}else wt.render(Je,Tn)};function At(U,q,ce,se){k!==null&&U.isNodeMaterial&&k.setObject(se,U),ct===!0&&Le.setState(U,ce,!1),U.transparent===!0&&U.side===qr&&U.forceSinglePass===!1?(U.side=$i,U.needsUpdate=!0,yn(U,q,se),U.side=Fo,U.needsUpdate=!0,yn(U,q,se),U.side=qr):yn(U,q,se)}this.compile=function(U,q,ce=null){ce===null&&(ce=U),k!==null&&k.renderStart(U,q,ce),N=ze.get(ce),N.init(q),b.push(N),ce.traverseVisible(function(oe){oe.isLight&&oe.layers.test(q.layers)&&(N.pushLight(oe),oe.castShadow&&N.pushShadow(oe))}),U!==ce&&U.traverseVisible(function(oe){oe.isLight&&oe.layers.test(q.layers)&&(N.pushLight(oe),oe.castShadow&&N.pushShadow(oe))}),N.setupLights(),k!==null&&k.updateLights(N.state.lightsArray),gt=this.localClippingEnabled,ct=Le.init(this.clippingPlanes,gt),ct===!0&&Le.setGlobalState(this.clippingPlanes,q),k!==null&&tt.render(N.state.shadowsArray,ce,q);const se=new Set;return U.traverse(function(oe){if(!(oe.isMesh||oe.isPoints||oe.isLine||oe.isSprite))return;const Ge=oe.material;if(Ge)if(Array.isArray(Ge))for(let Ze=0;Ze<Ge.length;Ze++){const ke=Ge[Ze];At(ke,ce,q,oe),se.add(ke)}else At(Ge,ce,q,oe),se.add(Ge)}),N=b.pop(),k!==null&&k.renderEnd(),se},this.compileAsync=function(U,q,ce=null){const se=this.compile(U,q,ce);return new Promise(oe=>{function Ge(){if(se.forEach(function(Ze){const Ye=le.get(Ze).currentProgram;(Ye===void 0||Ye.isReady())&&se.delete(Ze)}),se.size===0){oe(U);return}setTimeout(Ge,10)}dt.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let ln=null;function mn(U){ln&&ln(U)}function St(){Et.stop()}function Mt(){Et.start()}const Et=new z1;Et.setAnimationLoop(mn),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(U){ln=U,Ee.setAnimationLoop(U),U===null?Et.stop():Et.start()},Ee.addEventListener("sessionstart",St),Ee.addEventListener("sessionend",Mt),this.render=function(U,q){if(q!==void 0&&q.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;k!==null&&k.renderStart(U,q);const ce=Ee.enabled===!0&&Ee.isPresenting===!0,se=L!==null&&(te===null||ce)&&L.begin(I,te);if(U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(q),q=Ee.getCamera()),U.isScene===!0&&U.onBeforeRender(I,U,q,te),N=ze.get(U,b.length),N.init(q),N.state.textureUnits=me.getTextureUnits(),b.push(N),re.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),je.setFromProjectionMatrix(re,mr,q.reversedDepth),gt=this.localClippingEnabled,ct=Le.init(this.clippingPlanes,gt),D=He.get(U,w.length),D.init(),w.push(D),Ee.enabled===!0&&Ee.isPresenting===!0){const Ze=I.xr.getDepthSensingMesh();Ze!==null&&Qn(Ze,q,-1/0,I.sortObjects)}Qn(U,q,0,I.sortObjects),D.finish(),k!==null&&k.updateLights(N.state.lightsArray),I.sortObjects===!0&&D.sort(Ce,at),ht=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,ht&&rt.addToRenderList(D,U),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ct===!0&&Le.beginShadows();const oe=N.state.shadowsArray;if(tt.render(oe,U,q),ct===!0&&Le.endShadows(),(se&&L.hasRenderPass())===!1){const Ze=D.opaque,ke=D.transmissive;if(N.setupLights(),q.isArrayCamera){const Ye=q.cameras;if(ke.length>0)for(let qe=0,yt=Ye.length;qe<yt;qe++){const Ut=Ye[qe];ai(Ze,ke,U,Ut)}ht&&rt.render(U);for(let qe=0,yt=Ye.length;qe<yt;qe++){const Ut=Ye[qe];un(D,U,Ut,Ut.viewport)}}else ke.length>0&&ai(Ze,ke,U,q),ht&&rt.render(U),un(D,U,q)}te!==null&&G===0&&(me.updateMultisampleRenderTarget(te),me.updateRenderTargetMipmap(te)),se&&L.end(I),U.isScene===!0&&U.onAfterRender(I,U,q),Ve.resetDefaultState(),ee=-1,z=null,b.pop(),b.length>0?(N=b[b.length-1],me.setTextureUnits(N.state.textureUnits),ct===!0&&Le.setGlobalState(I.clippingPlanes,N.state.camera)):N=null,w.pop(),w.length>0?D=w[w.length-1]:D=null,k!==null&&k.renderEnd()};function Qn(U,q,ce,se){if(U.visible===!1)return;if(U.layers.test(q.layers)){if(U.isGroup)ce=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(q);else if(U.isLightProbeGrid)N.pushLightProbeGrid(U);else if(U.isLight)N.pushLight(U),U.castShadow&&N.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||U.intersectsFrustum(je)){se&&qt.setFromMatrixPosition(U.matrixWorld).applyMatrix4(re);const Ze=ge.update(U),ke=U.material;ke.visible&&D.push(U,Ze,ke,ce,qt.z,null,q)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||U.intersectsFrustum(je))){const Ze=ge.update(U),ke=U.material;if(se&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),qt.copy(U.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),qt.copy(Ze.boundingSphere.center)),qt.applyMatrix4(U.matrixWorld).applyMatrix4(re)),Array.isArray(ke)){const Ye=Ze.groups;for(let qe=0,yt=Ye.length;qe<yt;qe++){const Ut=Ye[qe],Je=ke[Ut.materialIndex];Je&&Je.visible&&D.push(U,Ze,Je,ce,qt.z,Ut,q)}}else ke.visible&&D.push(U,Ze,ke,ce,qt.z,null,q)}}const Ge=U.children;for(let Ze=0,ke=Ge.length;Ze<ke;Ze++)Qn(Ge[Ze],q,ce,se)}function un(U,q,ce,se){const{opaque:oe,transmissive:Ge,transparent:Ze}=U;N.setupLightsView(ce),ct===!0&&Le.setGlobalState(I.clippingPlanes,ce),se&&A.viewport(P.copy(se)),oe.length>0&&ri(oe,q,ce),Ge.length>0&&ri(Ge,q,ce),Ze.length>0&&ri(Ze,q,ce),A.buffers.depth.setTest(!0),A.buffers.depth.setMask(!0),A.buffers.color.setMask(!0),A.setPolygonOffset(!1)}function ai(U,q,ce,se){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[se.id]===void 0){const Je=dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[se.id]=new er(1,1,{generateMipmaps:!0,type:Je?yr:Ba,minFilter:Ao,samples:Math.max(4,B.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}const Ge=N.state.transmissionRenderTarget[se.id],Ze=se.viewport||P;Ge.setSize(Ze.z*I.transmissionResolutionScale,Ze.w*I.transmissionResolutionScale);const ke=I.getRenderTarget(),Ye=I.getActiveCubeFace(),qe=I.getActiveMipmapLevel();I.setRenderTarget(Ge),I.getClearColor(Ae),Ne=I.getClearAlpha(),Ne<1&&I.setClearColor(16777215,.5),I.clear(),ht&&rt.render(ce);const yt=I.toneMapping;I.toneMapping=gr;const Ut=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),N.setupLightsView(se),ct===!0&&Le.setGlobalState(I.clippingPlanes,se),ri(U,ce,se),me.updateMultisampleRenderTarget(Ge),me.updateRenderTargetMipmap(Ge),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Yt=0,Tn=q.length;Yt<Tn;Yt++){const _n=q[Yt],{object:wt,geometry:Vn,material:Ke,group:Jn}=_n;if(Ke.side===qr&&wt.layers.test(se.layers)){const Dt=Ke.side;Ke.side=$i,Ke.needsUpdate=!0,Sn(wt,ce,se,Vn,Ke,Jn),Ke.side=Dt,Ke.needsUpdate=!0,Je=!0}}Je===!0&&(me.updateMultisampleRenderTarget(Ge),me.updateRenderTargetMipmap(Ge))}I.setRenderTarget(ke,Ye,qe),I.setClearColor(Ae,Ne),Ut!==void 0&&(se.viewport=Ut),I.toneMapping=yt}function ri(U,q,ce){const se=q.isScene===!0?q.overrideMaterial:null;for(let oe=0,Ge=U.length;oe<Ge;oe++){const Ze=U[oe],{object:ke,geometry:Ye,group:qe}=Ze;let yt=Ze.material;yt.allowOverride===!0&&se!==null&&(yt=se),ke.layers.test(ce.layers)&&Sn(ke,q,ce,Ye,yt,qe)}}function Sn(U,q,ce,se,oe,Ge){k!==null&&oe.isNodeMaterial&&k.setObject(U,oe),U.onBeforeRender(I,q,ce,se,oe,Ge),U.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),oe.onBeforeRender(I,q,ce,se,U,Ge),oe.transparent===!0&&oe.side===qr&&oe.forceSinglePass===!1?(oe.side=$i,oe.needsUpdate=!0,I.renderBufferDirect(ce,q,se,oe,U,Ge),oe.side=Fo,oe.needsUpdate=!0,I.renderBufferDirect(ce,q,se,oe,U,Ge),oe.side=qr):I.renderBufferDirect(ce,q,se,oe,U,Ge),U.onAfterRender(I,q,ce,se,oe,Ge)}function yn(U,q,ce){q.isScene!==!0&&(q=pn);const se=le.get(U),oe=N.state.lights,Ge=N.state.shadowsArray,Ze=oe.state.version,ke=Pe.getParameters(U,oe.state,Ge,q,ce,N.state.lightProbeGridArray),Ye=Pe.getProgramCacheKey(ke);let qe=se.programs;se.environment=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?q.environment:null,se.fog=q.fog;const yt=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap;se.envMap=Oe.get(U.envMap||se.environment,yt),se.envMapRotation=se.environment!==null&&U.envMap===null?q.environmentRotation:U.envMapRotation,qe===void 0&&(U.addEventListener("dispose",Qe),qe=new Map,se.programs=qe);let Ut=qe.get(Ye);if(Ut!==void 0){if(se.currentProgram===Ut&&se.lightsStateVersion===Ze)return fi(U,ke),Ut}else ke.uniforms=Pe.getUniforms(U),k!==null&&U.isNodeMaterial&&k.build(U,ce,ke),U.onBeforeCompile(ke,I),Ut=Pe.acquireProgram(ke,Ye),qe.set(Ye,Ut),se.uniforms=ke.uniforms;const Je=se.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(Je.clippingPlanes=Le.uniform),fi(U,ke),se.needsLights=Ci(U),se.lightsStateVersion=Ze,se.needsLights&&(Je.ambientLightColor.value=oe.state.ambient,Je.lightProbe.value=oe.state.probe,Je.sunLights.value=oe.state.sun,Je.sunLightShadows.value=oe.state.sunShadow,Je.directionalLights.value=oe.state.directional,Je.directionalLightShadows.value=oe.state.directionalShadow,Je.spotLights.value=oe.state.spot,Je.spotLightShadows.value=oe.state.spotShadow,Je.rectAreaLights.value=oe.state.rectArea,Je.ltc_1.value=oe.state.rectAreaLTC1,Je.ltc_2.value=oe.state.rectAreaLTC2,Je.pointLights.value=oe.state.point,Je.pointLightShadows.value=oe.state.pointShadow,Je.hemisphereLights.value=oe.state.hemi,Je.sunShadowMatrix.value=oe.state.sunShadowMatrix,Je.sunShadowCascade.value=oe.state.sunShadowCascade,Je.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,Je.spotLightMatrix.value=oe.state.spotLightMatrix,Je.spotLightMap.value=oe.state.spotLightMap,Je.pointShadowMatrix.value=oe.state.pointShadowMatrix),se.lightProbeGrid=N.state.lightProbeGridArray.length>0,se.currentProgram=Ut,se.uniformsList=null,Ut}function Mn(U){if(U.uniformsList===null){const q=U.currentProgram.getUniforms();U.uniformsList=id.seqWithValue(q.seq,U.uniforms)}return U.uniformsList}function fi(U,q){const ce=le.get(U);ce.outputColorSpace=q.outputColorSpace,ce.batching=q.batching,ce.batchingColor=q.batchingColor,ce.instancing=q.instancing,ce.instancingColor=q.instancingColor,ce.instancingMorph=q.instancingMorph,ce.skinning=q.skinning,ce.morphTargets=q.morphTargets,ce.morphNormals=q.morphNormals,ce.morphColors=q.morphColors,ce.morphTargetsCount=q.morphTargetsCount,ce.numClippingPlanes=q.numClippingPlanes,ce.numIntersection=q.numClipIntersection,ce.vertexAlphas=q.vertexAlphas,ce.vertexTangents=q.vertexTangents,ce.toneMapping=q.toneMapping}function Ea(U,q){if(U.length===0)return null;if(U.length===1)return U[0].texture!==null?U[0]:null;R.setFromMatrixPosition(q.matrixWorld);for(let ce=0,se=U.length;ce<se;ce++){const oe=U[ce];if(oe.texture!==null&&oe.boundingBox.containsPoint(R))return oe}return null}function En(U,q,ce,se,oe){q.isScene!==!0&&(q=pn),me.resetTextureUnits();const Ge=q.fog,Ze=se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial?q.environment:null,ke=te===null?I.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:kt.workingColorSpace,Ye=se.isMeshStandardMaterial||se.isMeshLambertMaterial&&!se.envMap||se.isMeshPhongMaterial&&!se.envMap,qe=Oe.get(se.envMap||Ze,Ye),yt=se.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,Ut=!!ce.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),Je=!!ce.morphAttributes.position,Yt=!!ce.morphAttributes.normal,Tn=!!ce.morphAttributes.color;let _n=gr;se.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(_n=I.toneMapping);const wt=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Vn=wt!==void 0?wt.length:0,Ke=le.get(se),Jn=N.state.lights;if(ct===!0&&(gt===!0||U!==z)){const cn=U===z&&se.id===ee;Le.setState(se,U,cn)}let Dt=!1;se.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==Jn.state.version||Ke.outputColorSpace!==ke||oe.isBatchedMesh&&Ke.batching===!1||!oe.isBatchedMesh&&Ke.batching===!0||oe.isBatchedMesh&&Ke.batchingColor===!0&&oe._colorsTexture===null||oe.isBatchedMesh&&Ke.batchingColor===!1&&oe._colorsTexture!==null||oe.isInstancedMesh&&Ke.instancing===!1||!oe.isInstancedMesh&&Ke.instancing===!0||oe.isSkinnedMesh&&Ke.skinning===!1||!oe.isSkinnedMesh&&Ke.skinning===!0||oe.isInstancedMesh&&Ke.instancingColor===!0&&oe.instanceColor===null||oe.isInstancedMesh&&Ke.instancingColor===!1&&oe.instanceColor!==null||oe.isInstancedMesh&&Ke.instancingMorph===!0&&oe.morphTexture===null||oe.isInstancedMesh&&Ke.instancingMorph===!1&&oe.morphTexture!==null||Ke.envMap!==qe||se.fog===!0&&Ke.fog!==Ge||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Le.numPlanes||Ke.numIntersection!==Le.numIntersection)||Ke.vertexAlphas!==yt||Ke.vertexTangents!==Ut||Ke.morphTargets!==Je||Ke.morphNormals!==Yt||Ke.morphColors!==Tn||Ke.toneMapping!==_n||Ke.morphTargetsCount!==Vn||!!Ke.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(Dt=!0):(Dt=!0,Ke.__version=se.version);let wi=Ke.currentProgram;Dt===!0&&(wi=yn(se,q,oe),k&&se.isNodeMaterial&&k.onUpdateProgram(se,wi,Ke));let ta=!1,Di=!1,ss=!1;const Jt=wi.getUniforms(),Cn=Ke.uniforms;if(A.useProgram(wi.program)&&(ta=!0,Di=!0,ss=!0),se.id!==ee&&(ee=se.id,Di=!0),Ke.needsLights){const cn=Ea(N.state.lightProbeGridArray,oe);Ke.lightProbeGrid!==cn&&(Ke.lightProbeGrid=cn,Di=!0)}if(ta||z!==U){A.buffers.depth.getReversed()&&U.reversedDepth!==!0&&(U._reversedDepth=!0,U.updateProjectionMatrix()),Jt.setValue(j,"projectionMatrix",U.projectionMatrix),Jt.setValue(j,"viewMatrix",U.matrixWorldInverse);const nr=Jt.map.cameraPosition;nr!==void 0&&nr.setValue(j,bt.setFromMatrixPosition(U.matrixWorld)),B.logarithmicDepthBuffer&&Jt.setValue(j,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&Jt.setValue(j,"isOrthographic",U.isOrthographicCamera===!0),z!==U&&(z=U,Di=!0,ss=!0)}if(Ke.needsLights&&(Jn.state.sunShadowMap.length>0&&Jt.setValue(j,"sunShadowMap",Jn.state.sunShadowMap,me),Jn.state.directionalShadowMap.length>0&&Jt.setValue(j,"directionalShadowMap",Jn.state.directionalShadowMap,me),Jn.state.spotShadowMap.length>0&&Jt.setValue(j,"spotShadowMap",Jn.state.spotShadowMap,me),Jn.state.pointShadowMap.length>0&&Jt.setValue(j,"pointShadowMap",Jn.state.pointShadowMap,me)),oe.isSkinnedMesh){Jt.setOptional(j,oe,"bindMatrix"),Jt.setOptional(j,oe,"bindMatrixInverse");const cn=oe.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Jt.setValue(j,"boneTexture",cn.boneTexture,me))}oe.isBatchedMesh&&(Jt.setOptional(j,oe,"batchingTexture"),Jt.setValue(j,"batchingTexture",oe._matricesTexture,me),Jt.setOptional(j,oe,"batchingIdTexture"),Jt.setValue(j,"batchingIdTexture",oe._indirectTexture,me),Jt.setOptional(j,oe,"batchingColorTexture"),oe._colorsTexture!==null&&Jt.setValue(j,"batchingColorTexture",oe._colorsTexture,me));const Ta=ce.morphAttributes;if((Ta.position!==void 0||Ta.normal!==void 0||Ta.color!==void 0)&&Z.update(oe,ce,wi),(Di||Ke.receiveShadow!==oe.receiveShadow)&&(Ke.receiveShadow=oe.receiveShadow,Jt.setValue(j,"receiveShadow",oe.receiveShadow)),(se.isMeshStandardMaterial||se.isMeshLambertMaterial||se.isMeshPhongMaterial)&&se.envMap===null&&q.environment!==null&&(Cn.envMapIntensity.value=q.environmentIntensity),Cn.dfgLUT!==void 0&&(Cn.dfgLUT.value=gU()),Di){if(Jt.setValue(j,"toneMappingExposure",I.toneMappingExposure),Ke.needsLights&&Ct(Cn,ss),Ge&&se.fog===!0&&Xe.refreshFogUniforms(Cn,Ge),Xe.refreshMaterialUniforms(Cn,se,pe,ie,N.state.transmissionRenderTarget[U.id]),Ke.needsLights&&Ke.lightProbeGrid){const cn=Ke.lightProbeGrid;Cn.probesSH.value=cn.texture,Cn.probesMin.value.copy(cn.boundingBox.min),Cn.probesMax.value.copy(cn.boundingBox.max),Cn.probesResolution.value.copy(cn.resolution)}id.upload(j,Mn(Ke),Cn,me)}if(se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(id.upload(j,Mn(Ke),Cn,me),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&Jt.setValue(j,"center",oe.center),Jt.setValue(j,"modelViewMatrix",oe.modelViewMatrix),Jt.setValue(j,"normalMatrix",oe.normalMatrix),Jt.setValue(j,"modelMatrix",oe.matrixWorld),se.uniformsGroups!==void 0){const cn=se.uniformsGroups;for(let nr=0,ka=cn.length;nr<ka;nr++){const ba=cn[nr];be.update(ba,wi),be.bind(ba,wi)}}return wi}function Ct(U,q){U.ambientLightColor.needsUpdate=q,U.lightProbe.needsUpdate=q,U.sunLights.needsUpdate=q,U.sunLightShadows.needsUpdate=q,U.directionalLights.needsUpdate=q,U.directionalLightShadows.needsUpdate=q,U.pointLights.needsUpdate=q,U.pointLightShadows.needsUpdate=q,U.spotLights.needsUpdate=q,U.spotLightShadows.needsUpdate=q,U.rectAreaLights.needsUpdate=q,U.hemisphereLights.needsUpdate=q}function Ci(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(U,q,ce){const se=le.get(U);se.__autoAllocateDepthBuffer=U.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),le.get(U.texture).__webglTexture=q,le.get(U.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ce,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(U,q){const ce=le.get(U);ce.__webglFramebuffer=q,ce.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(U,q=0,ce=0){te=U,H=q,G=ce;let se=null,oe=!1,Ge=!1;if(U){const ke=le.get(U);if(ke.__useDefaultFramebuffer!==void 0){A.bindFramebuffer(j.FRAMEBUFFER,ke.__webglFramebuffer),P.copy(U.viewport),ne.copy(U.scissor),_e=U.scissorTest,A.viewport(P),A.scissor(ne),A.setScissorTest(_e),ee=-1;return}else if(ke.__webglFramebuffer===void 0)me.setupRenderTarget(U);else if(ke.__hasExternalTextures)me.rebindTextures(U,le.get(U.texture).__webglTexture,le.get(U.depthTexture).__webglTexture);else if(U.depthBuffer){const yt=U.depthTexture;if(ke.__boundDepthTexture!==yt){if(yt!==null&&le.has(yt)&&(U.width!==yt.image.width||U.height!==yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(U)}}const Ye=U.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ge=!0);const qe=le.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(qe[q])?se=qe[q][ce]:se=qe[q],oe=!0):U.samples>0&&me.useMultisampledRTT(U)===!1?se=le.get(U).__webglMultisampledFramebuffer:Array.isArray(qe)?se=qe[ce]:se=qe,P.copy(U.viewport),ne.copy(U.scissor),_e=U.scissorTest}else P.copy(Ie).multiplyScalar(pe).floor(),ne.copy(st).multiplyScalar(pe).floor(),_e=lt;if(ce!==0&&(se=J),A.bindFramebuffer(j.FRAMEBUFFER,se)&&A.drawBuffers(U,se),A.viewport(P),A.scissor(ne),A.setScissorTest(_e),oe){const ke=le.get(U.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+q,ke.__webglTexture,ce)}else if(Ge){const ke=q;for(let Ye=0;Ye<U.textures.length;Ye++){const qe=le.get(U.textures[Ye]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+Ye,qe.__webglTexture,ce,ke)}}else if(U!==null&&ce!==0){const ke=le.get(U.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,ke.__webglTexture,ce)}ee=-1};function Er(U){const q=le.get(U);return(q.__readFormat!==U.format||q.__readType!==U.type)&&(q.__readFormat=U.format,q.__readType=U.type,q.__formatReadable=B.textureFormatReadable(U.format),q.__typeReadable=B.textureTypeReadable(U.type)),q}this.readRenderTargetPixels=function(U,q,ce,se,oe,Ge,Ze,ke=0){if(!(U&&U.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=le.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ye=Ye[Ze]),Ye){A.bindFramebuffer(j.FRAMEBUFFER,Ye);try{const qe=U.textures[ke],yt=qe.format,Ut=qe.type;U.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+ke);const Je=Er(qe);if(Je.__formatReadable===!1){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Je.__typeReadable===!1){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=U.width-se&&ce>=0&&ce<=U.height-oe&&j.readPixels(q,ce,se,oe,Fe.convert(yt),Fe.convert(Ut),Ge)}finally{const qe=te!==null?le.get(te).__webglFramebuffer:null;A.bindFramebuffer(j.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(U,q,ce,se,oe,Ge,Ze,ke=0){if(!(U&&U.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=le.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&Ze!==void 0&&(Ye=Ye[Ze]),Ye)if(q>=0&&q<=U.width-se&&ce>=0&&ce<=U.height-oe){A.bindFramebuffer(j.FRAMEBUFFER,Ye);const qe=U.textures[ke],yt=qe.format,Ut=qe.type;U.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+ke);const Je=Er(qe);if(Je.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Je.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Yt=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,Yt),j.bufferData(j.PIXEL_PACK_BUFFER,Ge.byteLength,j.STREAM_READ),j.readPixels(q,ce,se,oe,Fe.convert(yt),Fe.convert(Ut),0),j.bindBuffer(j.PIXEL_PACK_BUFFER,null);const Tn=te!==null?le.get(te).__webglFramebuffer:null;A.bindFramebuffer(j.FRAMEBUFFER,Tn);const _n=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await zC(j,_n,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,Yt),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Ge),j.bindBuffer(j.PIXEL_PACK_BUFFER,null),j.deleteBuffer(Yt),j.deleteSync(_n),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(U,q=null,ce=0){const se=Math.pow(2,-ce),oe=Math.floor(U.image.width*se),Ge=Math.floor(U.image.height*se),Ze=q!==null?q.x:0,ke=q!==null?q.y:0;me.setTexture2D(U,0),j.copyTexSubImage2D(j.TEXTURE_2D,ce,0,0,Ze,ke,oe,Ge),A.unbindTexture()},this.copyTextureToTexture=function(U,q,ce=null,se=null,oe=0,Ge=0){let Ze,ke,Ye,qe,yt,Ut,Je,Yt,Tn;const _n=U.isCompressedTexture?U.mipmaps[Ge]:U.image;if(ce!==null)Ze=ce.max.x-ce.min.x,ke=ce.max.y-ce.min.y,Ye=ce.isBox3?ce.max.z-ce.min.z:1,qe=ce.min.x,yt=ce.min.y,Ut=ce.isBox3?ce.min.z:0;else{const Cn=Math.pow(2,-oe);Ze=Math.floor(_n.width*Cn),ke=Math.floor(_n.height*Cn),U.isDataArrayTexture?Ye=_n.depth:U.isData3DTexture?Ye=Math.floor(_n.depth*Cn):Ye=1,qe=0,yt=0,Ut=0}se!==null?(Je=se.x,Yt=se.y,Tn=se.z):(Je=0,Yt=0,Tn=0);const wt=Fe.convert(q.format),Vn=Fe.convert(q.type);let Ke;q.isData3DTexture?(me.setTexture3D(q,0),Ke=j.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(me.setTexture2DArray(q,0),Ke=j.TEXTURE_2D_ARRAY):(me.setTexture2D(q,0),Ke=j.TEXTURE_2D),A.activeTexture(j.TEXTURE0),A.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,q.flipY),A.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),A.pixelStorei(j.UNPACK_ALIGNMENT,q.unpackAlignment);const Jn=A.getParameter(j.UNPACK_ROW_LENGTH),Dt=A.getParameter(j.UNPACK_IMAGE_HEIGHT),wi=A.getParameter(j.UNPACK_SKIP_PIXELS),ta=A.getParameter(j.UNPACK_SKIP_ROWS),Di=A.getParameter(j.UNPACK_SKIP_IMAGES);A.pixelStorei(j.UNPACK_ROW_LENGTH,_n.width),A.pixelStorei(j.UNPACK_IMAGE_HEIGHT,_n.height),A.pixelStorei(j.UNPACK_SKIP_PIXELS,qe),A.pixelStorei(j.UNPACK_SKIP_ROWS,yt),A.pixelStorei(j.UNPACK_SKIP_IMAGES,Ut);const ss=U.isDataArrayTexture||U.isData3DTexture,Jt=q.isDataArrayTexture||q.isData3DTexture;if(U.isDepthTexture){const Cn=le.get(U),Ta=le.get(q),cn=le.get(Cn.__renderTarget),nr=le.get(Ta.__renderTarget);A.bindFramebuffer(j.READ_FRAMEBUFFER,cn.__webglFramebuffer),A.bindFramebuffer(j.DRAW_FRAMEBUFFER,nr.__webglFramebuffer);for(let ka=0;ka<Ye;ka++)ss&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,le.get(U).__webglTexture,oe,Ut+ka),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,le.get(q).__webglTexture,Ge,Tn+ka)),j.blitFramebuffer(qe,yt,Ze,ke,Je,Yt,Ze,ke,j.DEPTH_BUFFER_BIT,j.NEAREST);A.bindFramebuffer(j.READ_FRAMEBUFFER,null),A.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(oe!==0||U.isRenderTargetTexture||le.has(U)){const Cn=le.get(U),Ta=le.get(q);A.bindFramebuffer(j.READ_FRAMEBUFFER,Y),A.bindFramebuffer(j.DRAW_FRAMEBUFFER,Q);for(let cn=0;cn<Ye;cn++)ss?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Cn.__webglTexture,oe,Ut+cn):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Cn.__webglTexture,oe),Jt?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ta.__webglTexture,Ge,Tn+cn):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ta.__webglTexture,Ge),oe!==0?j.blitFramebuffer(qe,yt,Ze,ke,Je,Yt,Ze,ke,j.COLOR_BUFFER_BIT,j.NEAREST):Jt?j.copyTexSubImage3D(Ke,Ge,Je,Yt,Tn+cn,qe,yt,Ze,ke):j.copyTexSubImage2D(Ke,Ge,Je,Yt,qe,yt,Ze,ke);A.bindFramebuffer(j.READ_FRAMEBUFFER,null),A.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Jt?U.isDataTexture||U.isData3DTexture?j.texSubImage3D(Ke,Ge,Je,Yt,Tn,Ze,ke,Ye,wt,Vn,_n.data):q.isCompressedArrayTexture?j.compressedTexSubImage3D(Ke,Ge,Je,Yt,Tn,Ze,ke,Ye,wt,_n.data):j.texSubImage3D(Ke,Ge,Je,Yt,Tn,Ze,ke,Ye,wt,Vn,_n):U.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Ge,Je,Yt,Ze,ke,wt,Vn,_n.data):U.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Ge,Je,Yt,_n.width,_n.height,wt,_n.data):j.texSubImage2D(j.TEXTURE_2D,Ge,Je,Yt,Ze,ke,wt,Vn,_n);A.pixelStorei(j.UNPACK_ROW_LENGTH,Jn),A.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Dt),A.pixelStorei(j.UNPACK_SKIP_PIXELS,wi),A.pixelStorei(j.UNPACK_SKIP_ROWS,ta),A.pixelStorei(j.UNPACK_SKIP_IMAGES,Di),Ge===0&&q.generateMipmaps&&j.generateMipmap(Ke),A.unbindTexture()},this.initRenderTarget=function(U){le.get(U).__webglFramebuffer===void 0&&me.setupRenderTarget(U)},this.initTexture=function(U){U.isCubeTexture?me.setTextureCube(U,0):U.isData3DTexture?me.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?me.setTexture2DArray(U,0):me.setTexture2D(U,0),A.unbindTexture()},this.resetState=function(){H=0,G=0,te=null,A.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}}function xU({still:o=!1}){const e=mt.useRef(),t=mt.useRef(o);return t.current=o,mt.useEffect(()=>{const i=e.current;let r;try{r=new vU({alpha:!0,antialias:!1,powerPreference:"low-power"})}catch{return}r.setPixelRatio(Math.min(devicePixelRatio,1.25)),i.appendChild(r.domElement);const l=new e3,c=new w0(-1,1,1,-1,0,2);c.position.z=1;const f={t:{value:0},aspect:{value:1}},p=new ef(2,2),d=new tr({uniforms:f,transparent:!0,vertexShader:"varying vec2 v;void main(){v=uv;gl_Position=vec4(position,1.);}",fragmentShader:"precision highp float;varying vec2 v;uniform float t,aspect;void main(){vec2 p=(v-.5)*vec2(aspect,1.);float a=atan(p.y,p.x);float rad=length(p);float ring=0.;for(int i=0;i<5;i++){float fi=float(i);float rr=.32+fi*.032+sin(a*3.+t*.25+fi)*.018;ring+=exp(-pow((rad-rr)*80.,2.))*(.03+fi*.008)*( .35+.65*pow(max(0.,cos(a+t*.12+fi*.3)),8.));}vec3 col=mix(vec3(.04,.14,.4),vec3(.06,.62,.85),.5+.5*sin(a+t*.1))*ring;float glow=exp(-length(p-vec2(.25,-.1))*4.)*.13;col+=vec3(.02,.16,.2)*glow;float scan=pow(max(0.,sin(a*37.+rad*38.-t*.2)),80.)*exp(-pow((rad-.42)*13.,2.))*.03;col+=vec3(.07,.3,.4)*scan;gl_FragColor=vec4(col*6.,1.);}"});l.add(new Mr(p,d));const _=()=>{const y=i.getBoundingClientRect();r.setSize(y.width,y.height,!1),f.aspect.value=y.width/y.height};_();const v=new ResizeObserver(_);v.observe(i);let g=!0;const x=new IntersectionObserver(([y])=>g=y.isIntersecting);x.observe(i);let M,E=performance.now();function S(y){M=requestAnimationFrame(S);const C=Math.min(.04,(y-E)/1e3);E=y,!(!g||document.hidden)&&(t.current||(f.t.value+=C),r.render(l,c))}return M=requestAnimationFrame(S),()=>{cancelAnimationFrame(M),v.disconnect(),x.disconnect(),p.dispose(),d.dispose(),r.dispose(),r.domElement.remove()}},[]),X.jsx("div",{className:"aura",ref:e,"aria-hidden":"true"})}const SU=29.371,yU=[{start:0,state:0,speaker:"",text:"A familiar hello."},{start:1.1,end:5.384,state:2,speaker:"YOU",text:"Hey, ELF. First day here. I don't know anyone."},{start:6.384,end:11.267,state:1,speaker:"ELF",text:"Hey. New places can feel big. Want a little company?"},{start:11.917,end:14.503,state:2,speaker:"YOU",text:"Could you help me find the design studio?"},{start:14.623,state:3,speaker:"",text:"A moment to think."},{start:15.503,end:19.749,state:3,speaker:"ELF",text:"Let me think... Found it. We can go together."},{start:17.053,state:4,speaker:"ELF",text:"Let me think... Found it. We can go together."},{start:20.399,end:24.102,state:2,speaker:"YOU",text:"Thanks. That makes this place feel a little less strange."},{start:25.102,end:26.721,state:4,speaker:"ELF",text:"That's what old friends are for."},{start:27.371,state:5,speaker:"",text:"A little more human."}],Wl={duration:SU,cues:yU};function MU(o){return Wl.cues.filter(e=>o>=e.start).at(-1)||Wl.cues[0]}function EU(o,e){const t=mt.useRef(null),i=mt.useRef(null),r=mt.useRef(o),l=mt.useRef(-1),c=mt.useRef(!1),f=mt.useRef(!1),p=mt.useRef(0),[d,_]=mt.useState(!1),[v,g]=mt.useState(!1),[x,M]=mt.useState(null),[E,S]=mt.useState(0),[y,C]=mt.useState("");r.current=o,mt.useEffect(()=>{const w=new Audio("./assets/audio/first-day.mp3");w.preload="none",w.volume=.85,t.current=w;const b=()=>{if(!f.current)return;const J=MU(w.currentTime);S(w.currentTime/Wl.duration),J.start!==l.current&&(l.current=J.start,M(J),r.current(J.state))},L=()=>{f.current=!1,g(!1),M(null),S(0),r.current(0)},I=()=>{L(),C("Audio could not load. Please try again.")};w.addEventListener("timeupdate",b),w.addEventListener("ended",L),w.addEventListener("error",I);const V=()=>{document.hidden&&f.current&&(w.pause(),f.current=!1,g(!1),M(null))},k=()=>{var J;p.current++,w.pause(),(J=i.current)==null||J.pause(),L(),l.current=-1};return document.addEventListener("elf-film-start",k),document.addEventListener("visibilitychange",V),()=>{var J;p.current++,f.current=!1,w.pause(),w.removeEventListener("timeupdate",b),w.removeEventListener("ended",L),w.removeEventListener("error",I),(J=i.current)==null||J.pause(),document.removeEventListener("visibilitychange",V),document.removeEventListener("elf-film-start",k)}},[]),mt.useEffect(()=>{var w,b;f.current&&(e?(w=t.current)==null||w.pause():(b=t.current)==null||b.play().catch(()=>{f.current=!1,g(!1),C("Press Hear ELF to resume audio.")}))},[e]);const F=()=>{var w;p.current++,f.current=!1,(w=t.current)==null||w.pause(),g(!1),M(null),S(0),l.current=-1},R=()=>{var L;document.dispatchEvent(new Event("elf-dialogue-start"));const w=++p.current;(L=i.current)==null||L.pause();const b=t.current;b&&(C(""),b.currentTime=0,b.muted=!1,c.current=!0,_(!0),l.current=-1,f.current=!0,g(!0),M(Wl.cues[0]),r.current(Wl.cues[0].state),b.play().catch(()=>{w===p.current&&(f.current=!1,g(!1),M(null),C("Press Hear ELF to start audio."))}))},D=w=>{var L;if(!c.current)return;(L=i.current)==null||L.pause();const b=new Audio(`./assets/audio/feel-${w}.mp3`);i.current=b,b.volume=.48,b.play().catch(()=>{})};return{sound:d,active:v,cue:x,progress:E,error:y,start:R,stop:F,sfx:D,toggle:()=>{var b;const w=!c.current;c.current=w,_(w),t.current&&(t.current.muted=!w),w?f.current||D(0):(b=i.current)==null||b.pause()},duration:Wl.duration}}const Ph=({type:o,...e})=>X.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.3",...e,children:o==="play"?X.jsx("path",{d:"m9 5 10 7-10 7z"}):o==="pause"?X.jsx(X.Fragment,{children:X.jsx("path",{d:"M8 5v14M16 5v14"})}):o==="arrow"?X.jsx("path",{d:"M5 12h14m-6-6 6 6-6 6"}):o==="spark"?X.jsx("path",{d:"M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z"}):null});function TU({i:o}){return X.jsx("svg",{viewBox:"0 0 50 30","aria-hidden":"true",fill:"currentColor",children:o===4?X.jsx(X.Fragment,{children:X.jsx("path",{d:"M5 18q8-18 17 0q-9-7-17 0M28 18q8-18 17 0q-9-7-17 0"})}):o===5?X.jsx(X.Fragment,{children:X.jsx("path",{d:"M6 14q7 6 15 0v3q-7 6-15 0M29 14q7 6 15 0v3q-7 6-15 0"})}):X.jsxs(X.Fragment,{children:[X.jsx("rect",{x:"7",y:o===1||o===3?"13":"6",width:"13",height:o===1||o===3?"10":"19",rx:"5"}),X.jsx("rect",{x:"30",y:o===3?"11":"5",width:"13",height:o===3?"12":"21",rx:"5"}),X.jsx("ellipse",{cx:o===3?"12":"14",cy:"16",rx:"3",ry:"5",fill:"#13212b"}),X.jsx("ellipse",{cx:o===3?"35":"37",cy:"15",rx:"3",ry:"5",fill:"#13212b"})]})})}function Y1({embedded:o=!1,parentStill:e=!1,onFilm:t}){const i=vT(),[r,l]=mt.useState(0),[c,f]=mt.useState(0),[p,d]=mt.useState(!1),[_,v]=mt.useState(!i),[g,x]=mt.useState(!0),[M,E]=mt.useState(!0),[S,y]=mt.useState(!1),C=EU(V=>l(V),p||e),F=mt.useRef(),R=mt.useRef(),D=i||e||p,N=gd[r],w=o?"h3":"h1";mt.useEffect(()=>{if(!_||D||S||C.active)return;const V=setInterval(()=>l(k=>(k+1)%6),5200);return()=>clearInterval(V)},[_,D,S,C.active]),mt.useEffect(()=>{const V=kc.context(()=>{D||kc.fromTo(".echo-arrival",{y:20,opacity:0},{y:0,opacity:1,duration:1.25,stagger:.12,ease:"power3.out"})},F);return()=>V.revert()},[]);const b=V=>{C.stop();const k=(V+6)%6;l(k),f(J=>J+1),v(!1),C.sfx(k)},L=()=>{C.stop(),t?t():y(!0)},I=()=>{if(C.active){C.stop();return}d(!1),v(!1),x(!0),E(!0),C.start()};return X.jsxs("section",{ref:F,className:"echo-experience "+(o?"is-embedded ":"")+(D?"is-still ":"")+(C.active?"is-dialogue ":"")+(g&&M?"face-closeup":""),"aria-label":"ECHO immersive expression experience",onKeyDown:V=>{V.target.tagName!=="INPUT"&&(V.key==="ArrowRight"&&(V.preventDefault(),b(r+1)),V.key==="ArrowLeft"&&(V.preventDefault(),b(r-1)))},children:[X.jsx("div",{className:"echo-atmosphere",children:X.jsx(xU,{still:D})}),X.jsx("div",{className:"echo-grain"}),X.jsx("div",{className:"echo-wordscape","aria-hidden":"true",children:"ECHO"}),X.jsxs("header",{className:"echo-top echo-arrival",children:[X.jsxs("a",{className:"echo-identity",href:"./","aria-label":"ELF ECHO project",children:[X.jsx(Ph,{type:"spark"}),X.jsxs("span",{children:["ECHO",X.jsx("span",{className:"echo-edition",children:"by ELF"})]})]}),X.jsxs("div",{className:"echo-top-right",children:[X.jsx("span",{className:"echo-collection",children:"ROBOT EXPRESSION STUDY"}),X.jsxs("a",{href:o?"#top":"./",children:[o?"THE STORY":"THE PROJECT"," ",X.jsx("span",{children:"↗"})]})]})]}),X.jsxs("div",{className:"echo-art",onPointerDown:()=>{C.active||(f(V=>V+1),C.sfx(0))},onPointerMove:V=>{const k=V.currentTarget.getBoundingClientRect();R.current&&!D&&(R.current.style.opacity="1",R.current.style.transform=`translate(${V.clientX-k.left}px,${V.clientY-k.top}px)`)},onPointerLeave:()=>{R.current&&(R.current.style.opacity="0")},children:[g?X.jsx("div",{className:"echo-body",children:X.jsx(xT,{state:r,still:D,pulse:c})}):X.jsx(o1,{state:r,pulse:c,still:D,className:"echo-eyes"}),X.jsx("div",{className:"echo-cursor",ref:R,"aria-hidden":"true",children:X.jsx(Ph,{type:"spark"})})]}),X.jsxs("aside",{className:"echo-side-label echo-arrival",children:[X.jsx("span",{children:"A LITTLE MORE HUMAN"}),X.jsx("span",{children:"2026"})]}),X.jsxs("div",{className:"echo-message",children:[X.jsxs("span",{className:"echo-count",children:["0",r+1," ",X.jsx("span",{children:"/"})," 06"]}),X.jsx(w,{children:N.name}),X.jsx("p",{className:C.active?"echo-dialogue-caption":"",children:C.active&&C.cue?X.jsxs(X.Fragment,{children:[X.jsx("span",{className:"echo-speaker",children:C.cue.speaker||"ELF × ECHO"}),C.cue.text]}):N.copy})]},r),X.jsxs("div",{className:"echo-play echo-arrival",children:[X.jsxs("button",{className:"echo-hear",onClick:I,"aria-label":C.active?"Stop English dialogue":"Play English dialogue",children:[X.jsxs("span",{className:"echo-sound-bars","aria-hidden":"true",children:[X.jsx("i",{}),X.jsx("i",{}),X.jsx("i",{}),X.jsx("i",{})]}),X.jsxs("span",{children:[C.active?"Stop dialogue":"Hear ELF",X.jsx("small",{children:C.active?"FIRST DAY / OLD FRIEND":"ENGLISH · 29 SEC"})]})]}),C.active&&X.jsx("div",{className:"echo-audio-progress",role:"progressbar","aria-label":"Dialogue progress","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(C.progress*100),children:X.jsx("i",{style:{transform:`scaleX(${C.progress})`}})}),C.error&&X.jsx("span",{className:"echo-audio-error",role:"status",children:C.error}),X.jsxs("button",{onClick:L,className:"echo-film","aria-label":"Play showcase film",children:[X.jsx("span",{className:"echo-film-icon",children:X.jsx(Ph,{type:"play"})}),X.jsxs("span",{children:["Meet ECHO",X.jsx("small",{children:"40-SECOND SHOWCASE FILM"})]})]})]}),X.jsxs("footer",{className:"echo-bottom echo-arrival",children:[X.jsxs("div",{className:"echo-view",children:[X.jsx("button",{className:g&&M?"selected":"","aria-pressed":g&&M,onClick:()=>{x(!0),E(!0)},children:"Face"}),X.jsx("span",{children:"/"}),X.jsx("button",{className:g&&!M?"selected":"","aria-pressed":g&&!M,onClick:()=>{x(!0),E(!1)},children:"On ELF"}),X.jsx("span",{children:"/"}),X.jsx("button",{className:g?"":"selected","aria-pressed":!g,onClick:()=>x(!1),children:"Eyes"})]}),X.jsx("nav",{className:"echo-moods","aria-label":"Choose a feeling",children:gd.map((V,k)=>X.jsxs("button",{className:r===k?"selected":"",onClick:()=>b(k),"aria-label":V.name,"aria-pressed":r===k,children:[X.jsx(TU,{i:k}),X.jsx("span",{className:"echo-mood-label",children:V.name}),X.jsx("i",{})]},V.name))}),X.jsxs("div",{className:"echo-transport",children:[X.jsx("button",{className:C.sound?"active":"","aria-label":C.sound?"Mute sound":"Enable sound effects","aria-pressed":C.sound,onClick:C.toggle,children:X.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.4","aria-hidden":"true",children:[X.jsx("path",{d:"M4 9h4l5-4v14l-5-4H4z"}),C.sound?X.jsx("path",{d:"M16 8q5 4 0 8m3-11q8 7 0 14"}):X.jsx("path",{d:"m17 9 5 6m0-6-5 6"})]})}),X.jsx("button",{className:_?"active":"","aria-pressed":_,onClick:()=>{C.stop(),v(V=>!V)},"aria-label":_?"Stop automatic expressions":"Start automatic expressions",children:X.jsx("span",{className:"echo-cycle-icon",children:"↻"})}),X.jsx("button",{"aria-label":D?"Resume motion":"Pause motion","aria-pressed":p,onClick:()=>d(V=>!V),children:X.jsx(Ph,{type:D?"play":"pause"})})]})]}),X.jsxs("div",{className:"echo-footnote",children:[X.jsx("span",{children:"MOVE TO MEET ITS GAZE · TAP TO SAY HELLO"}),X.jsx("span",{children:"ELF × ECHO · JOEY ZHAO"})]}),S&&X.jsx(qU,{close:()=>y(!1),still:D})]})}const bc="./assets/",bU={en:{back:"All Work",tag:"ELF × ECHO / INDUSTRIAL DESIGN & INTERACTION",title:X.jsxs(X.Fragment,{children:["A little",X.jsx("br",{}),X.jsx("em",{children:"more human"})]}),intro:"ELF is a shared campus companion for students adapting to a new environment. ECHO extends the original design with an animated face.",role:"DESIGN",roleValue:"Joey Zhao · Individual project",scope:"ORIGINAL ELF",scopeValue:"Research · Sketching · Modeling · Rendering",new:"2026 / ECHO",newValue:"Expression · Interaction · Motion",nav:["Research","Sketches","Form","Campus","Expressions"],process:"Original ELF / Design process",hero:"ELF / Original product rendering",zoom:"Open full-size image",research:"A new campus",researchText:"The project began with cross-cultural adaptation: unfamiliar surroundings, language barriers and finding company on a large campus.",researchCaption:"Campus context and cross-cultural adaptation research",referencesCaption:"Product references / Mobility, feedback and robot character",historical:"Research and references from the original project",sketch:"Sketches & exploration",sketchText:"Exploring head proportions, a wheeled body, a detachable controller and the charging station.",sketchCaption:"Original sketch sheet / Form, components and interaction ideas",form:"An Old Friend",formText:"The concept links a familiar character to a student’s account, so the same companion could be accessed through different robots—even on another campus.",conceptCaption:"Old Friend / Character, colours and personalisation",viewsCaption:"Product views / Sensors, controller, face screen and charging",campus:"Around campus",campusText:"Shared stations near dormitories, playgrounds and lakesides. Students could call an ELF for a walk and return it when finished.",stationCaption:"Charging station / Shared access across campus",walkCaption:"Campus scenarios / Walking and companionship",early:"The first expressions",earlyText:"The original face already explored sleep, urgency, conversation and social encounters. These drawings are the starting point for ECHO.",earlyCaption:"Early expression and social interaction studies",echo:"2026 / ECHO CONCEPT EXTENSION",echoTitle:"ECHO expression system",echoText:"Six animated states for the original black visor. Black pupils show gaze direction; eyelids, blinks and timing distinguish listening, thinking and rest.",playHint:"Choose an expression or play the English conversation",motion:"Pause motion",resume:"Resume motion",film:"Watch the film",filmInfo:"40 SEC · ENGLISH DIALOGUE",filmTitle:"First day / Old friend",note:"Original ELF research, sketches and renders appear above in full. ECHO adds the animated face, dialogue and film. The interactive shell is an AI-assisted visualisation based on ELF; the original drawings remain the form reference.",limits:"Scripted concept demonstration; navigation and emotion recognition are not implemented.",credits:"Credits",top:"Back to top"},zh:{back:"全部作品",tag:"ELF × ECHO / 工业设计与交互",title:X.jsxs(X.Fragment,{children:["多一点",X.jsx("br",{}),X.jsx("em",{children:"人的温度"})]}),intro:"ELF 是为初到陌生环境的学生设计的共享校园陪伴机器人。ECHO 在原设计上延展面部表情与交互。",role:"设计",roleValue:"Joey Zhao / 赵越 · 独立项目",scope:"原始 ELF",scopeValue:"调研 · 草图 · 建模 · 渲染",new:"2026 / ECHO",newValue:"表情 · 交互 · 动效",nav:["调研","Sketch","造型","校园场景","表情"],process:"原始 ELF / 设计过程",hero:"ELF / 原始产品渲染",zoom:"查看完整大图",research:"初到校园",researchText:"项目从跨文化适应出发，关注陌生环境、语言障碍，以及学生在大型校园中对陪伴的需求。",researchCaption:"校园背景与跨文化适应调研",referencesCaption:"产品参考 / 移动方式、交互反馈与机器人角色",historical:"保留原项目的研究资料与参考",sketch:"Sketch 与造型探索",sketchText:"从头身比例、轮式身体，逐步探索可拆卸控制器、充电站与交互方式。",sketchCaption:"原始草图 / 造型、部件与交互构想",form:"一位 Old Friend",formText:"将熟悉的角色与学生账号关联。即使换一台机器人，或来到另一所校园，也能延续与同一位“老朋友”的相处。",conceptCaption:"Old Friend / 角色、配色与个性化概念",viewsCaption:"产品视图 / 传感器、控制器、面屏与充电结构",campus:"校园里的 ELF",campusText:"共享站点分布在宿舍、操场和湖畔。学生可以通过手机呼叫 ELF 一起散步，结束后归还。",stationCaption:"充电站 / 校园共享服务场景",walkCaption:"校园场景 / 散步与陪伴",early:"最初的表情",earlyText:"原设计已经探索了休眠、催促、对话和社交时的表情。ECHO 从这组手稿继续延展。",earlyCaption:"早期表情与社交互动探索",echo:"2026 / ECHO 概念延展",echoTitle:"ECHO 表情系统",echoText:"为原有黑色面屏设计六种动态状态。黑色瞳孔交代注视方向，通过眼睑、眨眼与停顿区分倾听、思考和休息。",playHint:"选择表情，或播放英文对话",motion:"暂停动效",resume:"恢复动效",film:"观看影片",filmInfo:"40 秒 · 英文对白",filmTitle:"初到校园 / 遇见老朋友",note:"以上完整保留原始 ELF 的调研、草图与渲染。ECHO 新增动态表情、对白和影片。交互演示中的外壳为基于 ELF 的 AI 辅助视觉，造型仍以原始图纸为准。",limits:"编排式概念演示，未实现导航与情绪识别。",credits:"制作与素材",top:"回到顶部"}};function AU({page:o,caption:e,zoom:t,hero:i=!1}){return X.jsxs("figure",{className:"process-spread "+(i?"process-cover":""),"data-source-page":o,children:[X.jsx("a",{href:bc+"original-"+o+".jpg",target:"_blank",rel:"noreferrer","aria-label":e+" / "+t,children:X.jsx("img",{src:bc+"original-"+o+".jpg",alt:e,width:"2016",height:"1260",loading:i?"eager":"lazy",decoding:"async"})}),X.jsxs("figcaption",{children:[X.jsx("span",{children:e}),X.jsxs("a",{href:bc+"original-"+o+".jpg",target:"_blank",rel:"noreferrer",children:[o," / ",t," ↗"]})]})]})}function uc({id:o,num:e,title:t,text:i,children:r}){return X.jsxs("section",{className:"process-chapter",id:o,children:[X.jsxs("div",{className:"process-heading",children:[X.jsxs("span",{className:"case-kicker",children:[e," / ELF"]}),X.jsx("h2",{children:t}),X.jsx("p",{children:i})]}),r]})}function RU(){const[o,e]=mt.useState(()=>localStorage.getItem("lang")==="zh"?"zh":"en"),[t,i]=mt.useState(!1),[r,l]=mt.useState(!1),[c,f]=mt.useState(!1),p=mt.useRef(),d=vT(),_=bU[o],v=d||t;mt.useEffect(()=>{const E=()=>{var S;return(S=p.current)==null?void 0:S.pause()};return document.addEventListener("elf-dialogue-start",E),()=>document.removeEventListener("elf-dialogue-start",E)},[]),mt.useEffect(()=>{document.documentElement.lang=o==="zh"?"zh-CN":"en"},[o]);const g=E=>{e(E),localStorage.setItem("lang",E)},x=()=>{var E,S;(E=p.current)==null||E.scrollIntoView({behavior:d?"auto":"smooth",block:"center"}),(S=p.current)==null||S.play().then(()=>l(!0)).catch(()=>l(!1))},M=(E,S,y=!1)=>X.jsx(AU,{page:E,caption:S,zoom:_.zoom,hero:y});return X.jsxs("main",{className:"case-v07 process-case "+(o==="zh"?"case-zh":""),id:"top",children:[X.jsx("header",{className:"project-page-nav",children:X.jsxs("nav",{className:"nav-content","aria-label":"Project navigation",children:[X.jsxs("a",{className:"back-link",href:"https://www.joeyzhao.cc/#projects",children:["← ",_.back]}),X.jsxs("div",{className:"lang-toggle",children:[X.jsx("button",{className:o==="en"?"active":"","aria-pressed":o==="en",onClick:()=>g("en"),children:"EN"}),X.jsx("span",{children:"/"}),X.jsx("button",{className:o==="zh"?"active":"","aria-pressed":o==="zh",onClick:()=>g("zh"),children:"中"})]})]})}),X.jsxs("section",{className:"case-intro wrap",children:[X.jsx("span",{className:"case-kicker",children:_.tag}),X.jsxs("div",{className:"case-heading",children:[X.jsx("h1",{children:_.title}),X.jsxs("div",{children:[X.jsx("p",{children:_.intro}),X.jsxs("a",{className:"case-film-link",href:"#playground",children:[_.echoTitle,X.jsx("span",{children:"↗"})]})]})]})]}),X.jsx("div",{className:"process-hero",children:M(50,_.hero,!0)}),X.jsx("div",{className:"case-metadata wrap",children:[[_.role,_.roleValue],[_.scope,_.scopeValue],[_.new,_.newValue]].map(([E,S])=>X.jsxs("div",{children:[X.jsx("span",{children:E}),X.jsx("p",{children:S})]},E))}),X.jsxs("nav",{className:"process-index wrap","aria-label":_.process,children:[X.jsx("span",{children:_.process}),X.jsx("div",{children:["research","sketches","form","campus","expressions"].map((E,S)=>X.jsxs("a",{href:"#"+E,children:[String(S+1).padStart(2,"0")," ",_.nav[S]]},E))})]}),X.jsxs("div",{className:"process-originals",children:[X.jsxs(uc,{id:"research",num:"01",title:_.research,text:_.researchText,children:[M(51,_.researchCaption),M(52,_.referencesCaption),X.jsxs("p",{className:"process-source-note",children:[_.historical," / pp. 51–52"]})]}),X.jsx(uc,{id:"sketches",num:"02",title:_.sketch,text:_.sketchText,children:M(53,_.sketchCaption)}),X.jsxs(uc,{id:"form",num:"03",title:_.form,text:_.formText,children:[M(54,_.conceptCaption),M(58,_.viewsCaption)]}),X.jsxs(uc,{id:"campus",num:"04",title:_.campus,text:_.campusText,children:[M(55,_.stationCaption),M(56,_.walkCaption)]}),X.jsx(uc,{id:"expressions",num:"05",title:_.early,text:_.earlyText,children:M(57,_.earlyCaption)})]}),X.jsxs("section",{id:"playground",children:[X.jsxs("div",{className:"echo-extension-intro wrap",children:[X.jsx("span",{className:"case-kicker",children:_.echo}),X.jsxs("div",{className:"case-split",children:[X.jsx("h2",{children:_.echoTitle}),X.jsx("p",{className:"case-prose",children:_.echoText})]}),X.jsxs("div",{className:"case-play-intro",children:[X.jsx("p",{children:_.playHint}),X.jsx("button",{onClick:()=>i(E=>!E),"aria-pressed":t,children:t?_.resume:_.motion})]})]}),X.jsx(Y1,{embedded:!0,parentStill:v,onFilm:x})]}),X.jsxs("section",{className:"case-film-section wrap",id:"film",children:[X.jsxs("div",{className:"process-heading",children:[X.jsx("span",{className:"case-kicker",children:"ECHO / FILM"}),X.jsx("h2",{children:_.filmTitle}),X.jsx("p",{children:_.filmInfo})]}),X.jsxs("div",{className:"case-cinema",children:[X.jsx("video",{ref:p,controls:r,playsInline:!0,preload:"none",poster:bc+"film-poster.jpg",src:bc+"ELF-A-Little-More-Human-v08.mp4",onPlay:()=>{l(!0),document.dispatchEvent(new Event("elf-film-start"))},onEnded:()=>l(!1),onError:()=>f(!0),"aria-label":"ELF showcase film"}),!r&&X.jsxs("button",{className:"case-video-invite",onClick:x,children:[X.jsx("span",{children:"▷"}),X.jsx("b",{children:_.film})]}),c&&X.jsx("p",{className:"film-error",children:"The film could not load. Please refresh to try again."})]}),X.jsxs("p",{className:"case-music-credit",children:["Music: ",X.jsx("a",{href:"https://www.scottbuckley.com.au/library/computations/",target:"_blank",rel:"noreferrer",children:"Computations in a Snowstorm (No Cello)"})," — Scott Buckley · ",X.jsx("a",{href:"https://creativecommons.org/licenses/by/4.0/",target:"_blank",rel:"noreferrer",children:"CC BY 4.0"})]})]}),X.jsxs("footer",{className:"case-footer wrap",children:[X.jsxs("div",{className:"process-colophon",children:[X.jsx("span",{className:"case-kicker",children:"ELF × ECHO / JOEY ZHAO"}),X.jsxs("div",{children:[X.jsx("p",{children:_.note}),X.jsx("p",{children:_.limits})]})]}),X.jsxs("details",{children:[X.jsx("summary",{children:_.credits}),X.jsxs("p",{children:["Original ELF research and industrial design: Joey Zhao, portfolio pp.50–58. ECHO: 2026 concept extension. Shell imagery: AI-assisted visualisation. Voices: ElevenLabs / Eleven v3, Macy & Mark; Free-plan draft, commercial rights not established. Sound effects: synthesized. React, GSAP, Three.js and Remotion; Syne and DM Mono under SIL OFL. ECHO references: ",X.jsx("a",{href:"https://www.behance.net/gallery/180270669/AiCo-Characters-face-design",children:"AiCo"})," and ",X.jsx("a",{href:"https://www.behance.net/gallery/71843869/Animated-eyes-for-Leobot-Scrub",children:"Leobot Scrub"}),"."]})]}),X.jsxs("div",{className:"case-footer-bottom",children:[X.jsx("span",{children:"© 2026 Joey Zhao"}),X.jsxs("a",{href:"https://www.joeyzhao.cc/#projects",children:["← ",_.back]}),X.jsxs("a",{href:"#top",children:[_.top," ↑"]})]})]})]})}function CU(o,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}function wU(o,e,t){return e&&CU(o.prototype,e),o}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var gi,ad,_a,Gs,Vs,Jl,q1,Eo,$l,Z1,jr,ja,K1,j1=function(){return gi||typeof window<"u"&&(gi=window.gsap)&&gi.registerPlugin&&gi},Q1=1,Yl=[],Ft=[],vr=[],Ac=Date.now,Vg=function(e,t){return t},DU=function(){var e=$l.core,t=e.bridge||{},i=e._scrollers,r=e._proxies;i.push.apply(i,Ft),r.push.apply(r,vr),Ft=i,vr=r,Vg=function(c,f){return t[c](f)}},Ws=function(e,t){return~vr.indexOf(e)&&vr[vr.indexOf(e)+1][t]},Rc=function(e){return!!~Z1.indexOf(e)},Ni=function(e,t,i,r,l){return e.addEventListener(t,i,{passive:r!==!1,capture:!!l})},Ui=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},Fh="scrollLeft",Ih="scrollTop",kg=function(){return jr&&jr.isPressed||Ft.cache++},Td=function(e,t){var i=function r(l){if(l||l===0){Q1&&(_a.history.scrollRestoration="manual");var c=jr&&jr.isPressed;l=r.v=Math.round(l)||(jr&&jr.iOS?1:0),e(l),r.cacheID=Ft.cache,c&&Vg("ss",l)}else(t||Ft.cache!==r.cacheID||Vg("ref"))&&(r.cacheID=Ft.cache,r.v=e());return r.v+r.offset};return i.offset=0,e&&i},zi={s:Fh,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Td(function(o){return arguments.length?_a.scrollTo(o,ti.sc()):_a.pageXOffset||Gs[Fh]||Vs[Fh]||Jl[Fh]||0})},ti={s:Ih,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:zi,sc:Td(function(o){return arguments.length?_a.scrollTo(zi.sc(),o):_a.pageYOffset||Gs[Ih]||Vs[Ih]||Jl[Ih]||0})},qi=function(e,t){return(t&&t._ctx&&t._ctx.selector||gi.utils.toArray)(e)[0]||(typeof e=="string"&&gi.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},LU=function(e,t){for(var i=t.length;i--;)if(t[i]===e||t[i].contains(e))return!0;return!1},Ks=function(e,t){var i=t.s,r=t.sc;Rc(e)&&(e=Gs.scrollingElement||Vs);var l=Ft.indexOf(e),c=r===ti.sc?1:2;!~l&&(l=Ft.push(e)-1),Ft[l+c]||Ni(e,"scroll",kg);var f=Ft[l+c],p=f||(Ft[l+c]=Td(Ws(e,i),!0)||(Rc(e)?r:Td(function(d){return arguments.length?e[i]=d:e[i]})));return p.target=e,f||(p.smooth=gi.getProperty(e,"scrollBehavior")==="smooth"),p},Xg=function(e,t,i){var r=e,l=e,c=Ac(),f=c,p=t||50,d=Math.max(500,p*3),_=function(M,E){var S=Ac();E||S-c>p?(l=r,r=M,f=c,c=S):i?r+=M:r=l+(M-l)/(S-f)*(c-f)},v=function(){l=r=i?0:r,f=c=0},g=function(M){var E=f,S=l,y=Ac();return(M||M===0)&&M!==r&&_(M),c===f||y-f>d?0:(r+(i?S:-S))/((i?y:c)-E)*1e3};return{update:_,reset:v,getVelocity:g}},cc=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},YM=function(e){var t=Math.max.apply(Math,e),i=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(i)?t:i},J1=function(){$l=gi.core.globals().ScrollTrigger,$l&&$l.core&&DU()},$1=function(e){return gi=e||j1(),!ad&&gi&&typeof document<"u"&&document.body&&(_a=window,Gs=document,Vs=Gs.documentElement,Jl=Gs.body,Z1=[_a,Gs,Vs,Jl],gi.utils.clamp,K1=gi.core.context||function(){},Eo="onpointerenter"in Jl?"pointer":"mouse",q1=Gn.isTouch=_a.matchMedia&&_a.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in _a||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ja=Gn.eventTypes=("ontouchstart"in Vs?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Vs?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Q1=0},500),ad=1),$l||J1(),ad};zi.op=ti;Ft.cache=0;var Gn=(function(){function o(t){this.init(t)}var e=o.prototype;return e.init=function(i){ad||$1(gi)||console.warn("Please gsap.registerPlugin(Observer)"),$l||J1();var r=i.tolerance,l=i.dragMinimum,c=i.type,f=i.target,p=i.lineHeight,d=i.debounce,_=i.preventDefault,v=i.onStop,g=i.onStopDelay,x=i.ignore,M=i.wheelSpeed,E=i.event,S=i.onDragStart,y=i.onDragEnd,C=i.onDrag,F=i.onPress,R=i.onRelease,D=i.onRight,N=i.onLeft,w=i.onUp,b=i.onDown,L=i.onChangeX,I=i.onChangeY,V=i.onChange,k=i.onToggleX,J=i.onToggleY,Y=i.onHover,Q=i.onHoverEnd,H=i.onMove,G=i.ignoreCheck,te=i.isNormalizer,ee=i.onGestureStart,z=i.onGestureEnd,P=i.onWheel,ne=i.onEnable,_e=i.onDisable,Ae=i.onClick,Ne=i.scrollSpeed,Be=i.capture,ie=i.allowClicks,pe=i.lockAxis,Ce=i.onLockAxis;this.target=f=qi(f)||Vs,this.vars=i,x&&(x=gi.utils.toArray(x)),r=r||1e-9,l=l||0,M=M||1,Ne=Ne||1,c=c||"wheel,touch,pointer",d=d!==!1,p||(p=parseFloat(_a.getComputedStyle(Jl).lineHeight)||22);var at,Ie,st,lt,je,ct,gt,re=this,bt=0,qt=0,pn=i.passive||!_&&i.passive!==!1,ht=Ks(f,zi),Zt=Ks(f,ti),j=ht(),Ot=Zt(),dt=~c.indexOf("touch")&&!~c.indexOf("pointer")&&ja[0]==="pointerdown",B=Rc(f),A=f.ownerDocument||Gs,$=[0,0,0],le=[0,0,0],me=0,Oe=function(){return me=Ac()},De=function(Ee,it){return(re.event=Ee)&&x&&LU(Ee.target,x)||it&&dt&&Ee.pointerType!=="touch"||G&&G(Ee,it)},xe=function(){re._vx.reset(),re._vy.reset(),Ie.pause(),v&&v(re)},ge=function(){var Ee=re.deltaX=YM($),it=re.deltaY=YM(le),Re=Math.abs(Ee)>=r,ot=Math.abs(it)>=r;V&&(Re||ot)&&V(re,Ee,it,$,le),Re&&(D&&re.deltaX>0&&D(re),N&&re.deltaX<0&&N(re),L&&L(re),k&&re.deltaX<0!=bt<0&&k(re),bt=re.deltaX,$[0]=$[1]=$[2]=0),ot&&(b&&re.deltaY>0&&b(re),w&&re.deltaY<0&&w(re),I&&I(re),J&&re.deltaY<0!=qt<0&&J(re),qt=re.deltaY,le[0]=le[1]=le[2]=0),(lt||st)&&(H&&H(re),st&&(S&&st===1&&S(re),C&&C(re),st=0),lt=!1),ct&&!(ct=!1)&&Ce&&Ce(re),je&&(P(re),je=!1),at=0},Pe=function(Ee,it,Re){$[Re]+=Ee,le[Re]+=it,re._vx.update(Ee),re._vy.update(it),d?at||(at=requestAnimationFrame(ge)):ge()},Xe=function(Ee,it){pe&&!gt&&(re.axis=gt=Math.abs(Ee)>Math.abs(it)?"x":"y",ct=!0),gt!=="y"&&($[2]+=Ee,re._vx.update(Ee,!0)),gt!=="x"&&(le[2]+=it,re._vy.update(it,!0)),d?at||(at=requestAnimationFrame(ge)):ge()},He=function(Ee){if(!De(Ee,1)){Ee=cc(Ee,_);var it=Ee.clientX,Re=Ee.clientY,ot=it-re.x,Qe=Re-re.y,pt=re.isDragging;re.x=it,re.y=Re,(pt||(ot||Qe)&&(Math.abs(re.startX-it)>=l||Math.abs(re.startY-Re)>=l))&&(st||(st=pt?2:1),pt||(re.isDragging=!0),Xe(ot,Qe))}},ze=re.onPress=function(we){De(we,1)||we&&we.button||(re.axis=gt=null,Ie.pause(),re.isPressed=!0,we=cc(we),bt=qt=0,re.startX=re.x=we.clientX,re.startY=re.y=we.clientY,re._vx.reset(),re._vy.reset(),Ni(te?f:A,ja[1],He,pn,!0),re.deltaX=re.deltaY=0,F&&F(re))},Le=re.onRelease=function(we){if(!De(we,1)){Ui(te?f:A,ja[1],He,!0);var Ee=!isNaN(re.y-re.startY),it=re.isDragging,Re=it&&(Math.abs(re.x-re.startX)>3||Math.abs(re.y-re.startY)>3),ot=cc(we);!Re&&Ee&&(re._vx.reset(),re._vy.reset(),_&&ie&&gi.delayedCall(.08,function(){if(Ac()-me>300&&!we.defaultPrevented){if(we.target.click)we.target.click();else if(A.createEvent){var Qe=A.createEvent("MouseEvents");Qe.initMouseEvent("click",!0,!0,_a,1,ot.screenX,ot.screenY,ot.clientX,ot.clientY,!1,!1,!1,!1,0,null),we.target.dispatchEvent(Qe)}}})),re.isDragging=re.isGesturing=re.isPressed=!1,v&&it&&!te&&Ie.restart(!0),st&&ge(),y&&it&&y(re),R&&R(re,Re)}},tt=function(Ee){return Ee.touches&&Ee.touches.length>1&&(re.isGesturing=!0)&&ee(Ee,re.isDragging)},rt=function(){return(re.isGesturing=!1)||z(re)},Z=function(Ee){if(!De(Ee)){var it=ht(),Re=Zt();Pe((it-j)*Ne,(Re-Ot)*Ne,1),j=it,Ot=Re,v&&Ie.restart(!0)}},Ue=function(Ee){if(!De(Ee)){Ee=cc(Ee,_),P&&(je=!0);var it=(Ee.deltaMode===1?p:Ee.deltaMode===2?_a.innerHeight:1)*M;Pe(Ee.deltaX*it,Ee.deltaY*it,0),v&&!te&&Ie.restart(!0)}},Se=function(Ee){if(!De(Ee)){var it=Ee.clientX,Re=Ee.clientY,ot=it-re.x,Qe=Re-re.y;re.x=it,re.y=Re,lt=!0,v&&Ie.restart(!0),(ot||Qe)&&Xe(ot,Qe)}},Fe=function(Ee){re.event=Ee,Y(re)},Ve=function(Ee){re.event=Ee,Q(re)},be=function(Ee){return De(Ee)||cc(Ee,_)&&Ae(re)};Ie=re._dc=gi.delayedCall(g||.25,xe).pause(),re.deltaX=re.deltaY=0,re._vx=Xg(0,50,!0),re._vy=Xg(0,50,!0),re.scrollX=ht,re.scrollY=Zt,re.isDragging=re.isGesturing=re.isPressed=!1,K1(this),re.enable=function(we){return re.isEnabled||(Ni(B?A:f,"scroll",kg),c.indexOf("scroll")>=0&&Ni(B?A:f,"scroll",Z,pn,Be),c.indexOf("wheel")>=0&&Ni(f,"wheel",Ue,pn,Be),(c.indexOf("touch")>=0&&q1||c.indexOf("pointer")>=0)&&(Ni(f,ja[0],ze,pn,Be),Ni(A,ja[2],Le),Ni(A,ja[3],Le),ie&&Ni(f,"click",Oe,!0,!0),Ae&&Ni(f,"click",be),ee&&Ni(A,"gesturestart",tt),z&&Ni(A,"gestureend",rt),Y&&Ni(f,Eo+"enter",Fe),Q&&Ni(f,Eo+"leave",Ve),H&&Ni(f,Eo+"move",Se)),re.isEnabled=!0,re.isDragging=re.isGesturing=re.isPressed=lt=st=!1,re._vx.reset(),re._vy.reset(),j=ht(),Ot=Zt(),we&&we.type&&ze(we),ne&&ne(re)),re},re.disable=function(){re.isEnabled&&(Yl.filter(function(we){return we!==re&&Rc(we.target)}).length||Ui(B?A:f,"scroll",kg),re.isPressed&&(re._vx.reset(),re._vy.reset(),Ui(te?f:A,ja[1],He,!0)),Ui(B?A:f,"scroll",Z,Be),Ui(f,"wheel",Ue,Be),Ui(f,ja[0],ze,Be),Ui(A,ja[2],Le),Ui(A,ja[3],Le),Ui(f,"click",Oe,!0),Ui(f,"click",be),Ui(A,"gesturestart",tt),Ui(A,"gestureend",rt),Ui(f,Eo+"enter",Fe),Ui(f,Eo+"leave",Ve),Ui(f,Eo+"move",Se),re.isEnabled=re.isPressed=re.isDragging=!1,_e&&_e(re))},re.kill=re.revert=function(){re.disable();var we=Yl.indexOf(re);we>=0&&Yl.splice(we,1),jr===re&&(jr=0)},Yl.push(re),te&&Rc(f)&&(jr=re),re.enable(E)},wU(o,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),o})();Gn.version="3.15.0";Gn.create=function(o){return new Gn(o)};Gn.register=$1;Gn.getAll=function(){return Yl.slice()};Gn.getById=function(o){return Yl.filter(function(e){return e.vars.id===o})[0]};j1()&&gi.registerPlugin(Gn);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var et,Hl,Pt,sn,pa,tn,D0,bd,Zc,Cc,_c,zh,Mi,Fd,Wg,Fi,qM,ZM,Gl,eT,N_,tT,Pi,Yg,nT,iT,Ps,qg,L0,eu,U0,wc,Zg,O_,Bh=1,Ei=Date.now,P_=Ei(),Va=0,gc=0,KM=function(e,t,i){var r=ha(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return i["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},jM=function(e,t){return t&&(!ha(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},UU=function o(){return gc&&requestAnimationFrame(o)},QM=function(){return Fd=1},JM=function(){return Fd=0},cr=function(e){return e},vc=function(e){return Math.round(e*1e5)/1e5||0},aT=function(){return typeof window<"u"},rT=function(){return et||aT()&&(et=window.gsap)&&et.registerPlugin&&et},Ho=function(e){return!!~D0.indexOf(e)},sT=function(e){return(e==="Height"?U0:Pt["inner"+e])||pa["client"+e]||tn["client"+e]},oT=function(e){return Ws(e,"getBoundingClientRect")||(Ho(e)?function(){return ud.width=Pt.innerWidth,ud.height=U0,ud}:function(){return Zr(e)})},NU=function(e,t,i){var r=i.d,l=i.d2,c=i.a;return(c=Ws(e,"getBoundingClientRect"))?function(){return c()[r]}:function(){return(t?sT(l):e["client"+l])||0}},OU=function(e,t){return!t||~vr.indexOf(e)?oT(e):function(){return ud}},_r=function(e,t){var i=t.s,r=t.d2,l=t.d,c=t.a;return Math.max(0,(i="scroll"+r)&&(c=Ws(e,i))?c()-oT(e)()[l]:Ho(e)?(pa[i]||tn[i])-sT(r):e[i]-e["offset"+r])},Hh=function(e,t){for(var i=0;i<Gl.length;i+=3)(!t||~t.indexOf(Gl[i+1]))&&e(Gl[i],Gl[i+1],Gl[i+2])},ha=function(e){return typeof e=="string"},bi=function(e){return typeof e=="function"},xc=function(e){return typeof e=="number"},To=function(e){return typeof e=="object"},fc=function(e,t,i){return e&&e.progress(t?0:1)&&i&&e.pause()},Fl=function(e,t,i){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,i)}):t(e,i);r&&r.totalTime&&(e.callbackAnimation=r)}},Il=Math.abs,lT="left",uT="top",N0="right",O0="bottom",No="width",Oo="height",Dc="Right",Lc="Left",Uc="Top",Nc="Bottom",Zn="padding",Ia="margin",uu="Width",P0="Height",ei="px",za=function(e){return Pt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},PU=function(e){var t=za(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},$M=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Zr=function(e,t){var i=t&&za(e)[Wg]!=="matrix(1, 0, 0, 1, 0, 0)"&&et.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return i&&i.progress(0).kill(),r},Ad=function(e,t){var i=t.d2;return e["offset"+i]||e["client"+i]||0},cT=function(e){var t=[],i=e.labels,r=e.duration(),l;for(l in i)t.push(i[l]/r);return t},FU=function(e){return function(t){return et.utils.snap(cT(e),t)}},F0=function(e){var t=et.utils.snap(e),i=Array.isArray(e)&&e.slice(0).sort(function(r,l){return r-l});return i?function(r,l,c){c===void 0&&(c=.001);var f;if(!l)return t(r);if(l>0){for(r-=c,f=0;f<i.length;f++)if(i[f]>=r)return i[f];return i[f-1]}else for(f=i.length,r+=c;f--;)if(i[f]<=r)return i[f];return i[0]}:function(r,l,c){c===void 0&&(c=.001);var f=t(r);return!l||Math.abs(f-r)<c||f-r<0==l<0?f:t(l<0?r-e:r+e)}},IU=function(e){return function(t,i){return F0(cT(e))(t,i.direction)}},Gh=function(e,t,i,r){return i.split(",").forEach(function(l){return e(t,l,r)})},ui=function(e,t,i,r,l){return e.addEventListener(t,i,{passive:!r,capture:!!l})},li=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},Vh=function(e,t,i){i=i&&i.wheelHandler,i&&(e(t,"wheel",i),e(t,"touchmove",i))},eE={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},kh={toggleActions:"play",anticipatePin:0},Rd={top:0,left:0,center:.5,bottom:1,right:1},rd=function(e,t){if(ha(e)){var i=e.indexOf("="),r=~i?+(e.charAt(i-1)+1)*parseFloat(e.substr(i+1)):0;~i&&(e.indexOf("%")>i&&(r*=t/100),e=e.substr(0,i-1)),e=r+(e in Rd?Rd[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Xh=function(e,t,i,r,l,c,f,p){var d=l.startColor,_=l.endColor,v=l.fontSize,g=l.indent,x=l.fontWeight,M=sn.createElement("div"),E=Ho(i)||Ws(i,"pinType")==="fixed",S=e.indexOf("scroller")!==-1,y=E?tn:i.tagName==="IFRAME"?i.contentDocument.body:i,C=e.indexOf("start")!==-1,F=C?d:_,R="border-color:"+F+";font-size:"+v+";color:"+F+";font-weight:"+x+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return R+="position:"+((S||p)&&E?"fixed;":"absolute;"),(S||p||!E)&&(R+=(r===ti?N0:O0)+":"+(c+parseFloat(g))+"px;"),f&&(R+="box-sizing:border-box;text-align:left;width:"+f.offsetWidth+"px;"),M._isStart=C,M.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),M.style.cssText=R,M.innerText=t||t===0?e+"-"+t:e,y.children[0]?y.insertBefore(M,y.children[0]):y.appendChild(M),M._offset=M["offset"+r.op.d2],sd(M,0,r,C),M},sd=function(e,t,i,r){var l={display:"block"},c=i[r?"os2":"p2"],f=i[r?"p2":"os2"];e._isFlipped=r,l[i.a+"Percent"]=r?-100:0,l[i.a]=r?"1px":0,l["border"+c+uu]=1,l["border"+f+uu]=0,l[i.p]=t+"px",et.set(e,l)},Nt=[],Kg={},Kc,tE=function(){return Ei()-Va>34&&(Kc||(Kc=requestAnimationFrame(ts)))},zl=function(){(!Pi||!Pi.isPressed||Pi.startX>tn.clientWidth)&&(Ft.cache++,Pi?Kc||(Kc=requestAnimationFrame(ts)):ts(),Va||Vo("scrollStart"),Va=Ei())},F_=function(){iT=Pt.innerWidth,nT=Pt.innerHeight},Sc=function(e){Ft.cache++,(e===!0||!Mi&&!tT&&!sn.fullscreenElement&&!sn.webkitFullscreenElement&&(!Yg||iT!==Pt.innerWidth||Math.abs(Pt.innerHeight-nT)>Pt.innerHeight*.25))&&bd.restart(!0)},Go={},zU=[],fT=function o(){return li(Bt,"scrollEnd",o)||Co(!0)},Vo=function(e){return Go[e]&&Go[e].map(function(t){return t()})||zU},fa=[],hT=function(e){for(var t=0;t<fa.length;t+=5)(!e||fa[t+4]&&fa[t+4].query===e)&&(fa[t].style.cssText=fa[t+1],fa[t].getBBox&&fa[t].setAttribute("transform",fa[t+2]||""),fa[t+3].uncache=1)},dT=function(){return Ft.forEach(function(e){return bi(e)&&++e.cacheID&&(e.rec=e())})},I0=function(e,t){var i;for(Fi=0;Fi<Nt.length;Fi++)i=Nt[Fi],i&&(!t||i._ctx===t)&&(e?i.kill(1):i.revert(!0,!0));wc=!0,t&&hT(t),t||Vo("revert")},pT=function(e,t){Ft.cache++,(t||!Ii)&&Ft.forEach(function(i){return bi(i)&&i.cacheID++&&(i.rec=0)}),ha(e)&&(Pt.history.scrollRestoration=L0=e)},Ii,Po=0,nE,BU=function(){if(nE!==Po){var e=nE=Po;requestAnimationFrame(function(){return e===Po&&Co(!0)})}},mT=function(){tn.appendChild(eu),U0=!Pi&&eu.offsetHeight||Pt.innerHeight,tn.removeChild(eu)},iE=function(e){return Zc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Co=function(e,t){if(pa=sn.documentElement,tn=sn.body,D0=[Pt,sn,pa,tn],Va&&!e&&!wc){ui(Bt,"scrollEnd",fT);return}mT(),Ii=Bt.isRefreshing=!0,wc||dT();var i=Vo("refreshInit");eT&&Bt.sort(),t||I0(),Ft.forEach(function(r){bi(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),Nt.slice(0).forEach(function(r){return r.refresh()}),wc=!1,Nt.forEach(function(r){if(r._subPinOffset&&r.pin){var l=r.vars.horizontal?"offsetWidth":"offsetHeight",c=r.pin[l];r.revert(!0,1),r.adjustPinSpacing(r.pin[l]-c),r.refresh()}}),Zg=1,iE(!0),Nt.forEach(function(r){var l=_r(r.scroller,r._dir),c=r.vars.end==="max"||r._endClamp&&r.end>l,f=r._startClamp&&r.start>=l;(c||f)&&r.setPositions(f?l-1:r.start,c?Math.max(f?l:r.start+1,l):r.end,!0)}),iE(!1),Zg=0,i.forEach(function(r){return r&&r.render&&r.render(-1)}),Ft.forEach(function(r){bi(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),pT(L0,1),bd.pause(),Po++,Ii=2,ts(2),Nt.forEach(function(r){return bi(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Ii=Bt.isRefreshing=!1,Vo("refresh")},jg=0,od=1,Oc,ts=function(e){if(e===2||!Ii&&!wc){Bt.isUpdating=!0,Oc&&Oc.update(0);var t=Nt.length,i=Ei(),r=i-P_>=50,l=t&&Nt[0].scroll();if(od=jg>l?-1:1,Ii||(jg=l),r&&(Va&&!Fd&&i-Va>200&&(Va=0,Vo("scrollEnd")),_c=P_,P_=i),od<0){for(Fi=t;Fi-- >0;)Nt[Fi]&&Nt[Fi].update(0,r);od=1}else for(Fi=0;Fi<t;Fi++)Nt[Fi]&&Nt[Fi].update(0,r);Bt.isUpdating=!1}Kc=0},Qg=[lT,uT,O0,N0,Ia+Nc,Ia+Dc,Ia+Uc,Ia+Lc,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ld=Qg.concat([No,Oo,"boxSizing","max"+uu,"max"+P0,"position",Ia,Zn,Zn+Uc,Zn+Dc,Zn+Nc,Zn+Lc]),HU=function(e,t,i){tu(i);var r=e._gsap;if(r.spacerIsNative)tu(r.spacerState);else if(e._gsap.swappedIn){var l=t.parentNode;l&&(l.insertBefore(e,t),l.removeChild(t))}e._gsap.swappedIn=!1},I_=function(e,t,i,r){if(!e._gsap.swappedIn){for(var l=Qg.length,c=t.style,f=e.style,p;l--;)p=Qg[l],c[p]=i[p];c.position=i.position==="absolute"?"absolute":"relative",i.display==="inline"&&(c.display="inline-block"),f[O0]=f[N0]="auto",c.flexBasis=i.flexBasis||"auto",c.overflow="visible",c.boxSizing="border-box",c[No]=Ad(e,zi)+ei,c[Oo]=Ad(e,ti)+ei,c[Zn]=f[Ia]=f[uT]=f[lT]="0",tu(r),f[No]=f["max"+uu]=i[No],f[Oo]=f["max"+P0]=i[Oo],f[Zn]=i[Zn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},GU=/([A-Z])/g,tu=function(e){if(e){var t=e.t.style,i=e.length,r=0,l,c;for((e.t._gsap||et.core.getCache(e.t)).uncache=1;r<i;r+=2)c=e[r+1],l=e[r],c?t[l]=c:t[l]&&t.removeProperty(l.replace(GU,"-$1").toLowerCase())}},Wh=function(e){for(var t=ld.length,i=e.style,r=[],l=0;l<t;l++)r.push(ld[l],i[ld[l]]);return r.t=e,r},VU=function(e,t,i){for(var r=[],l=e.length,c=i?8:0,f;c<l;c+=2)f=e[c],r.push(f,f in t?t[f]:e[c+1]);return r.t=e.t,r},ud={left:0,top:0},aE=function(e,t,i,r,l,c,f,p,d,_,v,g,x,M){bi(e)&&(e=e(p)),ha(e)&&e.substr(0,3)==="max"&&(e=g+(e.charAt(4)==="="?rd("0"+e.substr(3),i):0));var E=x?x.time():0,S,y,C;if(x&&x.seek(0),isNaN(e)||(e=+e),xc(e))x&&(e=et.utils.mapRange(x.scrollTrigger.start,x.scrollTrigger.end,0,g,e)),f&&sd(f,i,r,!0);else{bi(t)&&(t=t(p));var F=(e||"0").split(" "),R,D,N,w;C=qi(t,p)||tn,R=Zr(C)||{},(!R||!R.left&&!R.top)&&za(C).display==="none"&&(w=C.style.display,C.style.display="block",R=Zr(C),w?C.style.display=w:C.style.removeProperty("display")),D=rd(F[0],R[r.d]),N=rd(F[1]||"0",i),e=R[r.p]-d[r.p]-_+D+l-N,f&&sd(f,N,r,i-N<20||f._isStart&&N>20),i-=i-N}if(M&&(p[M]=e||-.001,e<0&&(e=0)),c){var b=e+i,L=c._isStart;S="scroll"+r.d2,sd(c,b,r,L&&b>20||!L&&(v?Math.max(tn[S],pa[S]):c.parentNode[S])<=b+1),v&&(d=Zr(f),v&&(c.style[r.op.p]=d[r.op.p]-r.op.m-c._offset+ei))}return x&&C&&(S=Zr(C),x.seek(g),y=Zr(C),x._caScrollDist=S[r.p]-y[r.p],e=e/x._caScrollDist*g),x&&x.seek(E),x?e:Math.round(e)},kU=/(webkit|moz|length|cssText|inset)/i,rE=function(e,t,i,r){if(e.parentNode!==t){var l=e.style,c,f;if(t===tn){e._stOrig=l.cssText,f=za(e);for(c in f)!+c&&!kU.test(c)&&f[c]&&typeof l[c]=="string"&&c!=="0"&&(l[c]=f[c]);l.top=i,l.left=r}else l.cssText=e._stOrig;et.core.getCache(e).uncache=1,t.appendChild(e)}},_T=function(e,t,i){var r=t,l=r;return function(c){var f=Math.round(e());return f!==r&&f!==l&&Math.abs(f-r)>3&&Math.abs(f-l)>3&&(c=f,i&&i()),l=r,r=Math.round(c),r}},Yh=function(e,t,i){var r={};r[t.p]="+="+i,et.set(e,r)},sE=function(e,t){var i=Ks(e,t),r="_scroll"+t.p2,l=function c(f,p,d,_,v){var g=c.tween,x=p.onComplete,M={};d=d||i();var E=_T(i,d,function(){g.kill(),c.tween=0});return v=_&&v||0,_=_||f-d,g&&g.kill(),p[r]=f,p.inherit=!1,p.modifiers=M,M[r]=function(){return E(d+_*g.ratio+v*g.ratio*g.ratio)},p.onUpdate=function(){Ft.cache++,c.tween&&ts()},p.onComplete=function(){c.tween=0,x&&x.call(g)},g=c.tween=et.to(e,p),g};return e[r]=i,i.wheelHandler=function(){return l.tween&&l.tween.kill()&&(l.tween=0)},ui(e,"wheel",i.wheelHandler),Bt.isTouch&&ui(e,"touchmove",i.wheelHandler),l},Bt=(function(){function o(t,i){Hl||o.register(et)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),qg(this),this.init(t,i)}var e=o.prototype;return e.init=function(i,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!gc){this.update=this.refresh=this.kill=cr;return}i=$M(ha(i)||xc(i)||i.nodeType?{trigger:i}:i,kh);var l=i,c=l.onUpdate,f=l.toggleClass,p=l.id,d=l.onToggle,_=l.onRefresh,v=l.scrub,g=l.trigger,x=l.pin,M=l.pinSpacing,E=l.invalidateOnRefresh,S=l.anticipatePin,y=l.onScrubComplete,C=l.onSnapComplete,F=l.once,R=l.snap,D=l.pinReparent,N=l.pinSpacer,w=l.containerAnimation,b=l.fastScrollEnd,L=l.preventOverlaps,I=i.horizontal||i.containerAnimation&&i.horizontal!==!1?zi:ti,V=!v&&v!==0,k=qi(i.scroller||Pt),J=et.core.getCache(k),Y=Ho(k),Q=("pinType"in i?i.pinType:Ws(k,"pinType")||Y&&"fixed")==="fixed",H=[i.onEnter,i.onLeave,i.onEnterBack,i.onLeaveBack],G=V&&i.toggleActions.split(" "),te="markers"in i?i.markers:kh.markers,ee=Y?0:parseFloat(za(k)["border"+I.p2+uu])||0,z=this,P=i.onRefreshInit&&function(){return i.onRefreshInit(z)},ne=NU(k,Y,I),_e=OU(k,Y),Ae=0,Ne=0,Be=0,ie=Ks(k,I),pe,Ce,at,Ie,st,lt,je,ct,gt,re,bt,qt,pn,ht,Zt,j,Ot,dt,B,A,$,le,me,Oe,De,xe,ge,Pe,Xe,He,ze,Le,tt,rt,Z,Ue,Se,Fe,Ve;if(z._startClamp=z._endClamp=!1,z._dir=I,S*=45,z.scroller=k,z.scroll=w?w.time.bind(w):ie,Ie=ie(),z.vars=i,r=r||i.animation,"refreshPriority"in i&&(eT=1,i.refreshPriority===-9999&&(Oc=z)),J.tweenScroll=J.tweenScroll||{top:sE(k,ti),left:sE(k,zi)},z.tweenTo=pe=J.tweenScroll[I.p],z.scrubDuration=function(Re){tt=xc(Re)&&Re,tt?Le?Le.duration(Re):Le=et.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:tt,paused:!0,onComplete:function(){return y&&y(z)}}):(Le&&Le.progress(1).kill(),Le=0)},r&&(r.vars.lazy=!1,r._initted&&!z.isReverted||r.vars.immediateRender!==!1&&i.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),z.animation=r.pause(),r.scrollTrigger=z,z.scrubDuration(v),He=0,p||(p=r.vars.id)),R&&((!To(R)||R.push)&&(R={snapTo:R}),"scrollBehavior"in tn.style&&et.set(Y?[tn,pa]:k,{scrollBehavior:"auto"}),Ft.forEach(function(Re){return bi(Re)&&Re.target===(Y?sn.scrollingElement||pa:k)&&(Re.smooth=!1)}),at=bi(R.snapTo)?R.snapTo:R.snapTo==="labels"?FU(r):R.snapTo==="labelsDirectional"?IU(r):R.directional!==!1?function(Re,ot){return F0(R.snapTo)(Re,Ei()-Ne<500?0:ot.direction)}:et.utils.snap(R.snapTo),rt=R.duration||{min:.1,max:2},rt=To(rt)?Cc(rt.min,rt.max):Cc(rt,rt),Z=et.delayedCall(R.delay||tt/2||.1,function(){var Re=ie(),ot=Ei()-Ne<500,Qe=pe.tween;if((ot||Math.abs(z.getVelocity())<10)&&!Qe&&!Fd&&Ae!==Re){var pt=(Re-lt)/ht,Rn=r&&!V?r.totalProgress():pt,At=ot?0:(Rn-ze)/(Ei()-_c)*1e3||0,ln=et.utils.clamp(-pt,1-pt,Il(At/2)*At/.185),mn=pt+(R.inertia===!1?0:ln),St,Mt,Et=R,Qn=Et.onStart,un=Et.onInterrupt,ai=Et.onComplete;if(St=at(mn,z),xc(St)||(St=mn),Mt=Math.max(0,Math.round(lt+St*ht)),Re<=je&&Re>=lt&&Mt!==Re){if(Qe&&!Qe._initted&&Qe.data<=Il(Mt-Re))return;R.inertia===!1&&(ln=St-pt),pe(Mt,{duration:rt(Il(Math.max(Il(mn-Rn),Il(St-Rn))*.185/At/.05||0)),ease:R.ease||"power3",data:Il(Mt-Re),onInterrupt:function(){return Z.restart(!0)&&un&&Fl(z,un)},onComplete:function(){z.update(),Ae=ie(),r&&!V&&(Le?Le.resetTo("totalProgress",St,r._tTime/r._tDur):r.progress(St)),He=ze=r&&!V?r.totalProgress():z.progress,C&&C(z),ai&&Fl(z,ai)}},Re,ln*ht,Mt-Re-ln*ht),Qn&&Fl(z,Qn,pe.tween)}}else z.isActive&&Ae!==Re&&Z.restart(!0)}).pause()),p&&(Kg[p]=z),g=z.trigger=qi(g||x!==!0&&x),Ve=g&&g._gsap&&g._gsap.stRevert,Ve&&(Ve=Ve(z)),x=x===!0?g:qi(x),ha(f)&&(f={targets:g,className:f}),x&&(M===!1||M===Ia||(M=!M&&x.parentNode&&x.parentNode.style&&za(x.parentNode).display==="flex"?!1:Zn),z.pin=x,Ce=et.core.getCache(x),Ce.spacer?Zt=Ce.pinState:(N&&(N=qi(N),N&&!N.nodeType&&(N=N.current||N.nativeElement),Ce.spacerIsNative=!!N,N&&(Ce.spacerState=Wh(N))),Ce.spacer=dt=N||sn.createElement("div"),dt.classList.add("pin-spacer"),p&&dt.classList.add("pin-spacer-"+p),Ce.pinState=Zt=Wh(x)),i.force3D!==!1&&et.set(x,{force3D:!0}),z.spacer=dt=Ce.spacer,Xe=za(x),Oe=Xe[M+I.os2],A=et.getProperty(x),$=et.quickSetter(x,I.a,ei),I_(x,dt,Xe),Ot=Wh(x)),te){qt=To(te)?$M(te,eE):eE,re=Xh("scroller-start",p,k,I,qt,0),bt=Xh("scroller-end",p,k,I,qt,0,re),B=re["offset"+I.op.d2];var be=qi(Ws(k,"content")||k);ct=this.markerStart=Xh("start",p,be,I,qt,B,0,w),gt=this.markerEnd=Xh("end",p,be,I,qt,B,0,w),w&&(Fe=et.quickSetter([ct,gt],I.a,ei)),!Q&&!(vr.length&&Ws(k,"fixedMarkers")===!0)&&(PU(Y?tn:k),et.set([re,bt],{force3D:!0}),xe=et.quickSetter(re,I.a,ei),Pe=et.quickSetter(bt,I.a,ei))}if(w){var we=w.vars.onUpdate,Ee=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){z.update(0,0,1),we&&we.apply(w,Ee||[])})}if(z.previous=function(){return Nt[Nt.indexOf(z)-1]},z.next=function(){return Nt[Nt.indexOf(z)+1]},z.revert=function(Re,ot){if(!ot)return z.kill(!0);var Qe=Re!==!1||!z.enabled,pt=Mi;Qe!==z.isReverted&&(Qe&&(Ue=Math.max(ie(),z.scroll.rec||0),Be=z.progress,Se=r&&r.progress()),ct&&[ct,gt,re,bt].forEach(function(Rn){return Rn.style.display=Qe?"none":"block"}),Qe&&(Mi=z,z.update(Qe)),x&&(!D||!z.isActive)&&(Qe?HU(x,dt,Zt):I_(x,dt,za(x),De)),Qe||z.update(Qe),Mi=pt,z.isReverted=Qe)},z.refresh=function(Re,ot,Qe,pt){if(!((Mi||!z.enabled)&&!ot)){if(x&&Re&&Va){ui(o,"scrollEnd",fT);return}!Ii&&P&&P(z),Mi=z,pe.tween&&!Qe&&(pe.tween.kill(),pe.tween=0),Le&&Le.pause(),E&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Ge){return Ge.vars.immediateRender&&Ge.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),z.isReverted||z.revert(!0,!0),z._subPinOffset=!1;var Rn=ne(),At=_e(),ln=w?w.duration():_r(k,I),mn=ht<=.01||!ht,St=0,Mt=pt||0,Et=To(Qe)?Qe.end:i.end,Qn=i.endTrigger||g,un=To(Qe)?Qe.start:i.start||(i.start===0||!g?0:x?"0 0":"0 100%"),ai=z.pinnedContainer=i.pinnedContainer&&qi(i.pinnedContainer,z),ri=g&&Math.max(0,Nt.indexOf(z))||0,Sn=ri,yn,Mn,fi,Ea,En,Ct,Ci,Er,U,q,ce,se,oe;for(te&&To(Qe)&&(se=et.getProperty(re,I.p),oe=et.getProperty(bt,I.p));Sn-- >0;)Ct=Nt[Sn],Ct.end||Ct.refresh(0,1)||(Mi=z),Ci=Ct.pin,Ci&&(Ci===g||Ci===x||Ci===ai)&&!Ct.isReverted&&(q||(q=[]),q.unshift(Ct),Ct.revert(!0,!0)),Ct!==Nt[Sn]&&(ri--,Sn--);for(bi(un)&&(un=un(z)),un=KM(un,"start",z),lt=aE(un,g,Rn,I,ie(),ct,re,z,At,ee,Q,ln,w,z._startClamp&&"_startClamp")||(x?-.001:0),bi(Et)&&(Et=Et(z)),ha(Et)&&!Et.indexOf("+=")&&(~Et.indexOf(" ")?Et=(ha(un)?un.split(" ")[0]:"")+Et:(St=rd(Et.substr(2),Rn),Et=ha(un)?un:(w?et.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,lt):lt)+St,Qn=g)),Et=KM(Et,"end",z),je=Math.max(lt,aE(Et||(Qn?"100% 0":ln),Qn,Rn,I,ie()+St,gt,bt,z,At,ee,Q,ln,w,z._endClamp&&"_endClamp"))||-.001,St=0,Sn=ri;Sn--;)Ct=Nt[Sn]||{},Ci=Ct.pin,Ci&&Ct.start-Ct._pinPush<=lt&&!w&&Ct.end>0&&(yn=Ct.end-(z._startClamp?Math.max(0,Ct.start):Ct.start),(Ci===g&&Ct.start-Ct._pinPush<lt||Ci===ai)&&isNaN(un)&&(St+=yn*(1-Ct.progress)),Ci===x&&(Mt+=yn));if(lt+=St,je+=St,z._startClamp&&(z._startClamp+=St),z._endClamp&&!Ii&&(z._endClamp=je||-.001,je=Math.min(je,_r(k,I))),ht=je-lt||(lt-=.01)&&.001,mn&&(Be=et.utils.clamp(0,1,et.utils.normalize(lt,je,Ue))),z._pinPush=Mt,ct&&St&&(yn={},yn[I.a]="+="+St,ai&&(yn[I.p]="-="+ie()),et.set([ct,gt],yn)),x&&!(Zg&&z.end>=_r(k,I)))yn=za(x),Ea=I===ti,fi=ie(),le=parseFloat(A(I.a))+Mt,!ln&&je>1&&(ce=(Y?sn.scrollingElement||pa:k).style,ce={style:ce,value:ce["overflow"+I.a.toUpperCase()]},Y&&za(tn)["overflow"+I.a.toUpperCase()]!=="scroll"&&(ce.style["overflow"+I.a.toUpperCase()]="scroll")),I_(x,dt,yn),Ot=Wh(x),Mn=Zr(x,!0),Er=Q&&Ks(k,Ea?zi:ti)(),M?(De=[M+I.os2,ht+Mt+ei],De.t=dt,Sn=M===Zn?Ad(x,I)+ht+Mt:0,Sn&&(De.push(I.d,Sn+ei),dt.style.flexBasis!=="auto"&&(dt.style.flexBasis=Sn+ei)),tu(De),ai&&Nt.forEach(function(Ge){Ge.pin===ai&&Ge.vars.pinSpacing!==!1&&(Ge._subPinOffset=!0)}),Q&&ie(Ue)):(Sn=Ad(x,I),Sn&&dt.style.flexBasis!=="auto"&&(dt.style.flexBasis=Sn+ei)),Q&&(En={top:Mn.top+(Ea?fi-lt:Er)+ei,left:Mn.left+(Ea?Er:fi-lt)+ei,boxSizing:"border-box",position:"fixed"},En[No]=En["max"+uu]=Math.ceil(Mn.width)+ei,En[Oo]=En["max"+P0]=Math.ceil(Mn.height)+ei,En[Ia]=En[Ia+Uc]=En[Ia+Dc]=En[Ia+Nc]=En[Ia+Lc]="0",En[Zn]=yn[Zn],En[Zn+Uc]=yn[Zn+Uc],En[Zn+Dc]=yn[Zn+Dc],En[Zn+Nc]=yn[Zn+Nc],En[Zn+Lc]=yn[Zn+Lc],j=VU(Zt,En,D),Ii&&ie(0)),r?(U=r._initted,N_(1),r.render(r.duration(),!0,!0),me=A(I.a)-le+ht+Mt,ge=Math.abs(ht-me)>1,Q&&ge&&j.splice(j.length-2,2),r.render(0,!0,!0),U||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),N_(0)):me=ht,ce&&(ce.value?ce.style["overflow"+I.a.toUpperCase()]=ce.value:ce.style.removeProperty("overflow-"+I.a));else if(g&&ie()&&!w)for(Mn=g.parentNode;Mn&&Mn!==tn;)Mn._pinOffset&&(lt-=Mn._pinOffset,je-=Mn._pinOffset),Mn=Mn.parentNode;q&&q.forEach(function(Ge){return Ge.revert(!1,!0)}),z.start=lt,z.end=je,Ie=st=Ii?Ue:ie(),!w&&!Ii&&(Ie<Ue&&ie(Ue),z.scroll.rec=0),z.revert(!1,!0),Ne=Ei(),Z&&(Ae=-1,Z.restart(!0)),Mi=0,r&&V&&(r._initted||Se)&&r.progress()!==Se&&r.progress(Se||0,!0).render(r.time(),!0,!0),(mn||Be!==z.progress||w||E||r&&!r._initted)&&(r&&!V&&(r._initted||Be||r.vars.immediateRender!==!1)&&r.totalProgress(w&&lt<-.001&&!Be?et.utils.normalize(lt,je,0):Be,!0),z.progress=mn||(Ie-lt)/ht===Be?0:Be),x&&M&&(dt._pinOffset=Math.round(z.progress*me)),Le&&Le.invalidate(),isNaN(se)||(se-=et.getProperty(re,I.p),oe-=et.getProperty(bt,I.p),Yh(re,I,se),Yh(ct,I,se-(pt||0)),Yh(bt,I,oe),Yh(gt,I,oe-(pt||0))),mn&&!Ii&&z.update(),_&&!Ii&&!pn&&(pn=!0,_(z),pn=!1)}},z.getVelocity=function(){return(ie()-st)/(Ei()-_c)*1e3||0},z.endAnimation=function(){fc(z.callbackAnimation),r&&(Le?Le.progress(1):r.paused()?V||fc(r,z.direction<0,1):fc(r,r.reversed()))},z.labelToScroll=function(Re){return r&&r.labels&&(lt||z.refresh()||lt)+r.labels[Re]/r.duration()*ht||0},z.getTrailing=function(Re){var ot=Nt.indexOf(z),Qe=z.direction>0?Nt.slice(0,ot).reverse():Nt.slice(ot+1);return(ha(Re)?Qe.filter(function(pt){return pt.vars.preventOverlaps===Re}):Qe).filter(function(pt){return z.direction>0?pt.end<=lt:pt.start>=je})},z.update=function(Re,ot,Qe){if(!(w&&!Qe&&!Re)){var pt=Ii===!0?Ue:z.scroll(),Rn=Re?0:(pt-lt)/ht,At=Rn<0?0:Rn>1?1:Rn||0,ln=z.progress,mn,St,Mt,Et,Qn,un,ai,ri;if(ot&&(st=Ie,Ie=w?ie():pt,R&&(ze=He,He=r&&!V?r.totalProgress():At)),S&&x&&!Mi&&!Bh&&Va&&(!At&&lt<pt+(pt-st)/(Ei()-_c)*S?At=1e-4:At===1&&je>pt+(pt-st)/(Ei()-_c)*S&&(At=.9999)),At!==ln&&z.enabled){if(mn=z.isActive=!!At&&At<1,St=!!ln&&ln<1,un=mn!==St,Qn=un||!!At!=!!ln,z.direction=At>ln?1:-1,z.progress=At,Qn&&!Mi&&(Mt=At&&!ln?0:At===1?1:ln===1?2:3,V&&(Et=!un&&G[Mt+1]!=="none"&&G[Mt+1]||G[Mt],ri=r&&(Et==="complete"||Et==="reset"||Et in r))),L&&(un||ri)&&(ri||v||!r)&&(bi(L)?L(z):z.getTrailing(L).forEach(function(fi){return fi.endAnimation()})),V||(Le&&!Mi&&!Bh?(Le._dp._time-Le._start!==Le._time&&Le.render(Le._dp._time-Le._start),Le.resetTo?Le.resetTo("totalProgress",At,r._tTime/r._tDur):(Le.vars.totalProgress=At,Le.invalidate().restart())):r&&r.totalProgress(At,!!(Mi&&(Ne||Re)))),x){if(Re&&M&&(dt.style[M+I.os2]=Oe),!Q)$(vc(le+me*At));else if(Qn){if(ai=!Re&&At>ln&&je+1>pt&&pt+1>=_r(k,I),D)if(!Re&&(mn||ai)){var Sn=Zr(x,!0),yn=pt-lt;rE(x,tn,Sn.top+(I===ti?yn:0)+ei,Sn.left+(I===ti?0:yn)+ei)}else rE(x,dt);tu(mn||ai?j:Ot),ge&&At<1&&mn||$(le+(At===1&&!ai?me:0))}}R&&!pe.tween&&!Mi&&!Bh&&Z.restart(!0),f&&(un||F&&At&&(At<1||!O_))&&Zc(f.targets).forEach(function(fi){return fi.classList[mn||F?"add":"remove"](f.className)}),c&&!V&&!Re&&c(z),Qn&&!Mi?(V&&(ri&&(Et==="complete"?r.pause().totalProgress(1):Et==="reset"?r.restart(!0).pause():Et==="restart"?r.restart(!0):r[Et]()),c&&c(z)),(un||!O_)&&(d&&un&&Fl(z,d),H[Mt]&&Fl(z,H[Mt]),F&&(At===1?z.kill(!1,1):H[Mt]=0),un||(Mt=At===1?1:3,H[Mt]&&Fl(z,H[Mt]))),b&&!mn&&Math.abs(z.getVelocity())>(xc(b)?b:2500)&&(fc(z.callbackAnimation),Le?Le.progress(1):fc(r,Et==="reverse"?1:!At,1))):V&&c&&!Mi&&c(z)}if(Pe){var Mn=w?pt/w.duration()*(w._caScrollDist||0):pt;xe(Mn+(re._isFlipped?1:0)),Pe(Mn)}Fe&&Fe(-pt/w.duration()*(w._caScrollDist||0))}},z.enable=function(Re,ot){z.enabled||(z.enabled=!0,ui(k,"resize",Sc),Y||ui(k,"scroll",zl),P&&ui(o,"refreshInit",P),Re!==!1&&(z.progress=Be=0,Ie=st=Ae=ie()),ot!==!1&&z.refresh())},z.getTween=function(Re){return Re&&pe?pe.tween:Le},z.setPositions=function(Re,ot,Qe,pt){if(w){var Rn=w.scrollTrigger,At=w.duration(),ln=Rn.end-Rn.start;Re=Rn.start+ln*Re/At,ot=Rn.start+ln*ot/At}z.refresh(!1,!1,{start:jM(Re,Qe&&!!z._startClamp),end:jM(ot,Qe&&!!z._endClamp)},pt),z.update()},z.adjustPinSpacing=function(Re){if(De&&Re){var ot=De.indexOf(I.d)+1;De[ot]=parseFloat(De[ot])+Re+ei,De[1]=parseFloat(De[1])+Re+ei,tu(De)}},z.disable=function(Re,ot){if(Re!==!1&&z.revert(!0,!0),z.enabled&&(z.enabled=z.isActive=!1,ot||Le&&Le.pause(),Ue=0,Ce&&(Ce.uncache=1),P&&li(o,"refreshInit",P),Z&&(Z.pause(),pe.tween&&pe.tween.kill()&&(pe.tween=0)),!Y)){for(var Qe=Nt.length;Qe--;)if(Nt[Qe].scroller===k&&Nt[Qe]!==z)return;li(k,"resize",Sc),Y||li(k,"scroll",zl)}},z.kill=function(Re,ot){z.disable(Re,ot),Le&&!ot&&Le.kill(),p&&delete Kg[p];var Qe=Nt.indexOf(z);Qe>=0&&Nt.splice(Qe,1),Qe===Fi&&od>0&&Fi--,Qe=0,Nt.forEach(function(pt){return pt.scroller===z.scroller&&(Qe=1)}),Qe||Ii||(z.scroll.rec=0),r&&(r.scrollTrigger=null,Re&&r.revert({kill:!1}),ot||r.kill()),ct&&[ct,gt,re,bt].forEach(function(pt){return pt.parentNode&&pt.parentNode.removeChild(pt)}),Oc===z&&(Oc=0),x&&(Ce&&(Ce.uncache=1),Qe=0,Nt.forEach(function(pt){return pt.pin===x&&Qe++}),Qe||(Ce.spacer=0)),i.onKill&&i.onKill(z)},Nt.push(z),z.enable(!1,!1),Ve&&Ve(z),r&&r.add&&!ht){var it=z.update;z.update=function(){z.update=it,Ft.cache++,lt||je||z.refresh()},et.delayedCall(.01,z.update),ht=.01,lt=je=0}else z.refresh();x&&BU()},o.register=function(i){return Hl||(et=i||rT(),aT()&&window.document&&o.enable(),Hl=gc),Hl},o.defaults=function(i){if(i)for(var r in i)kh[r]=i[r];return kh},o.disable=function(i,r){gc=0,Nt.forEach(function(c){return c[r?"kill":"disable"](i)}),li(Pt,"wheel",zl),li(sn,"scroll",zl),clearInterval(zh),li(sn,"touchcancel",cr),li(tn,"touchstart",cr),Gh(li,sn,"pointerdown,touchstart,mousedown",QM),Gh(li,sn,"pointerup,touchend,mouseup",JM),bd.kill(),Hh(li);for(var l=0;l<Ft.length;l+=3)Vh(li,Ft[l],Ft[l+1]),Vh(li,Ft[l],Ft[l+2])},o.enable=function(){if(Pt=window,sn=document,pa=sn.documentElement,tn=sn.body,et){if(Zc=et.utils.toArray,Cc=et.utils.clamp,qg=et.core.context||cr,N_=et.core.suppressOverwrites||cr,L0=Pt.history.scrollRestoration||"auto",jg=Pt.pageYOffset||0,et.core.globals("ScrollTrigger",o),tn){gc=1,eu=document.createElement("div"),eu.style.height="100vh",eu.style.position="absolute",mT(),UU(),Gn.register(et),o.isTouch=Gn.isTouch,Ps=Gn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Yg=Gn.isTouch===1,ui(Pt,"wheel",zl),D0=[Pt,sn,pa,tn],et.matchMedia?(o.matchMedia=function(_){var v=et.matchMedia(),g;for(g in _)v.add(g,_[g]);return v},et.addEventListener("matchMediaInit",function(){dT(),I0()}),et.addEventListener("matchMediaRevert",function(){return hT()}),et.addEventListener("matchMedia",function(){Co(0,1),Vo("matchMedia")}),et.matchMedia().add("(orientation: portrait)",function(){return F_(),F_})):console.warn("Requires GSAP 3.11.0 or later"),F_(),ui(sn,"scroll",zl);var i=tn.hasAttribute("style"),r=tn.style,l=r.borderTopStyle,c=et.core.Animation.prototype,f,p;for(c.revert||Object.defineProperty(c,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",f=Zr(tn),ti.m=Math.round(f.top+ti.sc())||0,zi.m=Math.round(f.left+zi.sc())||0,l?r.borderTopStyle=l:r.removeProperty("border-top-style"),i||(tn.setAttribute("style",""),tn.removeAttribute("style")),zh=setInterval(tE,250),et.delayedCall(.5,function(){return Bh=0}),ui(sn,"touchcancel",cr),ui(tn,"touchstart",cr),Gh(ui,sn,"pointerdown,touchstart,mousedown",QM),Gh(ui,sn,"pointerup,touchend,mouseup",JM),Wg=et.utils.checkPrefix("transform"),ld.push(Wg),Hl=Ei(),bd=et.delayedCall(.2,Co).pause(),Gl=[sn,"visibilitychange",function(){var _=Pt.innerWidth,v=Pt.innerHeight;sn.hidden?(qM=_,ZM=v):(qM!==_||ZM!==v)&&Sc()},sn,"DOMContentLoaded",Co,Pt,"load",Co,Pt,"resize",Sc],Hh(ui),Nt.forEach(function(_){return _.enable(0,1)}),p=0;p<Ft.length;p+=3)Vh(li,Ft[p],Ft[p+1]),Vh(li,Ft[p],Ft[p+2])}else if(sn){var d=function _(){o.enable(),sn.removeEventListener("DOMContentLoaded",_)};sn.addEventListener("DOMContentLoaded",d)}}},o.config=function(i){"limitCallbacks"in i&&(O_=!!i.limitCallbacks);var r=i.syncInterval;r&&clearInterval(zh)||(zh=r)&&setInterval(tE,r),"ignoreMobileResize"in i&&(Yg=o.isTouch===1&&i.ignoreMobileResize),"autoRefreshEvents"in i&&(Hh(li)||Hh(ui,i.autoRefreshEvents||"none"),tT=(i.autoRefreshEvents+"").indexOf("resize")===-1)},o.scrollerProxy=function(i,r){var l=qi(i),c=Ft.indexOf(l),f=Ho(l);~c&&Ft.splice(c,f?6:2),r&&(f?vr.unshift(Pt,r,tn,r,pa,r):vr.unshift(l,r))},o.clearMatchMedia=function(i){Nt.forEach(function(r){return r._ctx&&r._ctx.query===i&&r._ctx.kill(!0,!0)})},o.isInViewport=function(i,r,l){var c=(ha(i)?qi(i):i).getBoundingClientRect(),f=c[l?No:Oo]*r||0;return l?c.right-f>0&&c.left+f<Pt.innerWidth:c.bottom-f>0&&c.top+f<Pt.innerHeight},o.positionInViewport=function(i,r,l){ha(i)&&(i=qi(i));var c=i.getBoundingClientRect(),f=c[l?No:Oo],p=r==null?f/2:r in Rd?Rd[r]*f:~r.indexOf("%")?parseFloat(r)*f/100:parseFloat(r)||0;return l?(c.left+p)/Pt.innerWidth:(c.top+p)/Pt.innerHeight},o.killAll=function(i){if(Nt.slice(0).forEach(function(l){return l.vars.id!=="ScrollSmoother"&&l.kill()}),i!==!0){var r=Go.killAll||[];Go={},r.forEach(function(l){return l()})}},o})();Bt.version="3.15.0";Bt.saveStyles=function(o){return o?Zc(o).forEach(function(e){if(e&&e.style){var t=fa.indexOf(e);t>=0&&fa.splice(t,5),fa.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),et.core.getCache(e),qg())}}):fa};Bt.revert=function(o,e){return I0(!o,e)};Bt.create=function(o,e){return new Bt(o,e)};Bt.refresh=function(o){return o?Sc(!0):(Hl||Bt.register())&&Co(!0)};Bt.update=function(o){return++Ft.cache&&ts(o===!0?2:0)};Bt.clearScrollMemory=pT;Bt.maxScroll=function(o,e){return _r(o,e?zi:ti)};Bt.getScrollFunc=function(o,e){return Ks(qi(o),e?zi:ti)};Bt.getById=function(o){return Kg[o]};Bt.getAll=function(){return Nt.filter(function(o){return o.vars.id!=="ScrollSmoother"})};Bt.isScrolling=function(){return!!Va};Bt.snapDirectional=F0;Bt.addEventListener=function(o,e){var t=Go[o]||(Go[o]=[]);~t.indexOf(e)||t.push(e)};Bt.removeEventListener=function(o,e){var t=Go[o],i=t&&t.indexOf(e);i>=0&&t.splice(i,1)};Bt.batch=function(o,e){var t=[],i={},r=e.interval||.016,l=e.batchMax||1e9,c=function(d,_){var v=[],g=[],x=et.delayedCall(r,function(){_(v,g),v=[],g=[]}).pause();return function(M){v.length||x.restart(!0),v.push(M.trigger),g.push(M),l<=v.length&&x.progress(1)}},f;for(f in e)i[f]=f.substr(0,2)==="on"&&bi(e[f])&&f!=="onRefreshInit"?c(f,e[f]):e[f];return bi(l)&&(l=l(),ui(Bt,"refresh",function(){return l=e.batchMax()})),Zc(o).forEach(function(p){var d={};for(f in i)d[f]=i[f];d.trigger=p,t.push(Bt.create(d))}),t};var oE=function(e,t,i,r){return t>r?e(r):t<0&&e(0),i>r?(r-t)/(i-t):i<0?t/(t-i):1},z_=function o(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Gn.isTouch?" pinch-zoom":""):"none",e===pa&&o(tn,t)},qh={auto:1,scroll:1},XU=function(e){var t=e.event,i=e.target,r=e.axis,l=(t.changedTouches?t.changedTouches[0]:t).target,c=l._gsap||et.core.getCache(l),f=Ei(),p;if(!c._isScrollT||f-c._isScrollT>2e3){for(;l&&l!==tn&&(l.scrollHeight<=l.clientHeight&&l.scrollWidth<=l.clientWidth||!(qh[(p=za(l)).overflowY]||qh[p.overflowX]));)l=l.parentNode;c._isScroll=l&&l!==i&&!Ho(l)&&(qh[(p=za(l)).overflowY]||qh[p.overflowX]),c._isScrollT=f}(c._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},gT=function(e,t,i,r){return Gn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&XU,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return i&&ui(sn,Gn.eventTypes[0],uE,!1,!0)},onDisable:function(){return li(sn,Gn.eventTypes[0],uE,!0)}})},WU=/(input|label|select|textarea)/i,lE,uE=function(e){var t=WU.test(e.target.tagName);(t||lE)&&(e._gsapAllow=!0,lE=t)},YU=function(e){To(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,i=t.normalizeScrollX,r=t.momentum,l=t.allowNestedScroll,c=t.onRelease,f,p,d=qi(e.target)||pa,_=et.core.globals().ScrollSmoother,v=_&&_.get(),g=Ps&&(e.content&&qi(e.content)||v&&e.content!==!1&&!v.smooth()&&v.content()),x=Ks(d,ti),M=Ks(d,zi),E=1,S=(Gn.isTouch&&Pt.visualViewport?Pt.visualViewport.scale*Pt.visualViewport.width:Pt.outerWidth)/Pt.innerWidth,y=0,C=bi(r)?function(){return r(f)}:function(){return r||2.8},F,R,D=gT(d,e.type,!0,l),N=function(){return R=!1},w=cr,b=cr,L=function(){p=_r(d,ti),b=Cc(Ps?1:0,p),i&&(w=Cc(0,_r(d,zi))),F=Po},I=function(){g._gsap.y=vc(parseFloat(g._gsap.y)+x.offset)+"px",g.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(g._gsap.y)+", 0, 1)",x.offset=x.cacheID=0},V=function(){if(R){requestAnimationFrame(N);var te=vc(f.deltaY/2),ee=b(x.v-te);if(g&&ee!==x.v+x.offset){x.offset=ee-x.v;var z=vc((parseFloat(g&&g._gsap.y)||0)-x.offset);g.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+z+", 0, 1)",g._gsap.y=z+"px",x.cacheID=Ft.cache,ts()}return!0}x.offset&&I(),R=!0},k,J,Y,Q,H=function(){L(),k.isActive()&&k.vars.scrollY>p&&(x()>p?k.progress(1)&&x(p):k.resetTo("scrollY",p))};return g&&et.set(g,{y:"+=0"}),e.ignoreCheck=function(G){return Ps&&G.type==="touchmove"&&V()||E>1.05&&G.type!=="touchstart"||f.isGesturing||G.touches&&G.touches.length>1},e.onPress=function(){R=!1;var G=E;E=vc((Pt.visualViewport&&Pt.visualViewport.scale||1)/S),k.pause(),G!==E&&z_(d,E>1.01?!0:i?!1:"x"),J=M(),Y=x(),L(),F=Po},e.onRelease=e.onGestureStart=function(G,te){if(x.offset&&I(),!te)Q.restart(!0);else{Ft.cache++;var ee=C(),z,P;i&&(z=M(),P=z+ee*.05*-G.velocityX/.227,ee*=oE(M,z,P,_r(d,zi)),k.vars.scrollX=w(P)),z=x(),P=z+ee*.05*-G.velocityY/.227,ee*=oE(x,z,P,_r(d,ti)),k.vars.scrollY=b(P),k.invalidate().duration(ee).play(.01),(Ps&&k.vars.scrollY>=p||z>=p-1)&&et.to({},{onUpdate:H,duration:ee})}c&&c(G)},e.onWheel=function(){k._ts&&k.pause(),Ei()-y>1e3&&(F=0,y=Ei())},e.onChange=function(G,te,ee,z,P){if(Po!==F&&L(),te&&i&&M(w(z[2]===te?J+(G.startX-G.x):M()+te-z[1])),ee){x.offset&&I();var ne=P[2]===ee,_e=ne?Y+G.startY-G.y:x()+ee-P[1],Ae=b(_e);ne&&_e!==Ae&&(Y+=Ae-_e),x(Ae)}(ee||te)&&ts()},e.onEnable=function(){z_(d,i?!1:"x"),Bt.addEventListener("refresh",H),ui(Pt,"resize",H),x.smooth&&(x.target.style.scrollBehavior="auto",x.smooth=M.smooth=!1),D.enable()},e.onDisable=function(){z_(d,!0),li(Pt,"resize",H),Bt.removeEventListener("refresh",H),D.kill()},e.lockAxis=e.lockAxis!==!1,f=new Gn(e),f.iOS=Ps,Ps&&!x()&&x(1),Ps&&et.ticker.add(cr),Q=f._dc,k=et.to(f,{ease:"power4",paused:!0,inherit:!1,scrollX:i?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:_T(x,x(),function(){return k.pause()})},onUpdate:ts,onComplete:Q.vars.onComplete}),f};Bt.sort=function(o){if(bi(o))return Nt.sort(o);var e=Pt.pageYOffset||0;return Bt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Pt.innerHeight}),Nt.sort(o||function(t,i){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((i.vars.containerAnimation?1e6:i._sortY)+(i.vars.refreshPriority||0)*-1e6)})};Bt.observe=function(o){return new Gn(o)};Bt.normalizeScroll=function(o){if(typeof o>"u")return Pi;if(o===!0&&Pi)return Pi.enable();if(o===!1){Pi&&Pi.kill(),Pi=o;return}var e=o instanceof Gn?o:YU(o);return Pi&&Pi.target===e.target&&Pi.kill(),Ho(e.target)&&(Pi=e),e};Bt.core={_getVelocityProp:Xg,_inputObserver:gT,_scrollers:Ft,_proxies:vr,bridge:{ss:function(){Va||Vo("scrollStart"),Va=Ei()},ref:function(){return Mi}}};rT()&&et.registerPlugin(Bt);kc.registerPlugin(Bt);const Jg="./assets/";function vT(){const[o,e]=mt.useState(()=>matchMedia("(prefers-reduced-motion: reduce)").matches);return mt.useEffect(()=>{const t=matchMedia("(prefers-reduced-motion: reduce)"),i=()=>e(t.matches);return t.addEventListener("change",i),()=>t.removeEventListener("change",i)},[]),o}function xT({state:o,still:e,pulse:t=0,className:i=""}){const r=mt.useRef();return mt.useEffect(()=>{const l=kc.to(r.current,{rotation:e?0:[0,-2.5,.6,1.8,0,-.7][o],y:e?0:[0,-3,0,2,-6,4][o],duration:e?0:1.15,delay:e?0:.22,ease:"elastic.out(1,.8)"});return()=>l.kill()},[o,e,t]),X.jsx("div",{className:"robot "+i+(e?" is-still":""),"data-feeling":o,children:X.jsxs("div",{className:"robot-pose",ref:r,children:[X.jsx("img",{className:"robot-shell",src:Jg+"elf-cutout.png",alt:"ELF white shell, swept side pods and original wheeled silhouette; 2026 concept visualization"}),X.jsx("div",{className:"robot-visor",children:X.jsx(o1,{state:o,still:e,pulse:t,interactive:!0})})]})})}function qU({close:o}){const e=mt.useRef();return mt.useEffect(()=>{const t=document.activeElement;return e.current.showModal(),document.body.style.overflow="hidden",()=>{document.body.style.overflow="",t==null||t.focus()}},[]),X.jsxs("dialog",{ref:e,className:"reel",onCancel:o,"aria-label":"ELF showcase film",children:[X.jsxs("div",{className:"reel-top",children:[X.jsx("span",{className:"mono",children:"ELF × ECHO / A LITTLE MORE HUMAN"}),X.jsx("button",{onClick:o,"aria-label":"Close film",children:"CLOSE ×"})]}),X.jsx("video",{src:Jg+"ELF-A-Little-More-Human-v08.mp4",poster:Jg+"film-poster.jpg",controls:!0,autoPlay:!0,playsInline:!0,style:{position:"absolute",width:"100%",height:"100%",objectFit:"contain"}})]})}function ZU(){return X.jsx(RU,{})}function KU(){return X.jsxs("main",{className:"face-sheet",children:[X.jsxs("header",{children:[X.jsxs("div",{children:[X.jsx("span",{className:"mono",children:"ELF × ECHO / CHARACTER STUDY 05"}),X.jsx("h1",{children:"Six expressions"})]}),X.jsx("a",{href:"./Face-Playground.html",children:"PLAY THE EXPRESSIONS ↗"})]}),X.jsx("section",{className:"face-sheet-grid",children:gd.map((o,e)=>X.jsxs("figure",{children:[X.jsx("div",{className:"sheet-face",children:X.jsx(xT,{state:e,still:!0})}),X.jsxs("figcaption",{children:[X.jsxs("span",{className:"mono",children:["0",e+1]}),X.jsxs("div",{children:[X.jsx("h2",{children:o.name}),X.jsx("p",{children:o.copy})]})]})]},o.name))}),X.jsxs("footer",{children:[X.jsx("span",{children:"ORIGINAL ELF FORM · 2026 CONCEPT EXTENSION"}),X.jsx("span",{children:"JOEY ZHAO"})]})]})}NA.createRoot(document.getElementById("root")).render(X.jsx(AA.StrictMode,{children:/\/Expressions(?:\.html)?\/?$/i.test(location.pathname)?X.jsx(KU,{}):/\/Face-Playground(?:\.html)?\/?$/i.test(location.pathname)?X.jsx(Y1,{}):X.jsx(ZU,{})}));
