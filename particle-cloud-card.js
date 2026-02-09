/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$1.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:true,type:String,converter:n$2,reflect:false,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return  false;this[d$1]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=true,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$1,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$1+w):s+n$1+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$1)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$1),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$1),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$1,t+1));)v.push({type:7,index:r}),t+=n$1.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}}s.finalized=true,s._$litElement$=true,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * Particle Cloud Card for Home Assistant
 *
 * Ambient, theme-aware particle visualization for numeric entities.
 * - Swarm (boids) motion + optional mist/cloud density layer
 * - Vortex mode (orbiting/spiral field) + runtime toggle
 * - Visual editor (UI) with:
 *   - Entity picker + "Use current value as Normal" + "Auto Low/High"
 *   - Centered normalization (low / normal / high)
 *   - Normal baselines: speed/color/size (0..1)
 *   - 3-stop color picker (low/mid/high)
 *   - Mode dropdown, particle count slider, fps slider, toggles
 *   - Debug toggle + mist ratio + lerp factor
 * - DPR-correct canvas scaling (no cumulative scaling)
 * - Container ResizeObserver (responsive)
 * - Pixel-coordinate particles (consistent physics)
 *
 * Release: v0.2.0
 */

//import { LitElement, html, css } from "https://unpkg.com/lit@2.8.0/index.js?module"; // For Local builds

class ParticleCloudCard extends s {
  static get properties() {
    return {
      _hass: { type: Object },
      _config: { type: Object },
      _mode: { type: String },
    };
  }

  constructor() {
    super();
    this.particles = [];
    this.animationFrame = null;
    this.lastDrawTime = 0;
    this.noiseTime = 0;

    this._initialized = false;
    this._targets = { speed: 0, color: 0, size: 0 };
    this._currents = { speed: 0, color: 0, size: 0 };

    this._lerpFactor = 0.06;

    this.width = 0;
    this.height = 0;
    this._dpr = 1;

    this._theme = {
      text: "rgba(255,255,255,0.9)",
      bg: "rgb(0,0,0)",
      card: "rgba(0,0,0,0)",
      isDark: true,
    };
    this._lastThemeCheck = 0;

    // Mist
    this._mistRatio = 0.64;
    this._mistCanvas = null;
    this._mistCtx = null;

    // Resize observer handle
    this._resizeObserver = null;

    // Canvas handles
    this.canvas = null;
    this.ctx = null;

    // Mode
    this._mode = "swarm";
  }

  // ------------------------------
  // Home Assistant integration
  // ------------------------------

  static getConfigElement() {
    return document.createElement("particle-cloud-card-editor");
  }

  setConfig(config) {
    if (!config || (!config.entity && !config.entity_speed && !config.entity_color && !config.entity_size)) {
      throw new Error("Define at least one entity (entity, entity_speed, entity_color, entity_size).");
    }

    this._config = {
      // Backward-compatible min/max normalization
      min: 0,
      max: 1,

      // Centered normalization (recommended)
      normal: undefined,
      low: undefined,
      high: undefined,

      // Baselines at "normal" (0..1)
      normal_speed: 0.35,
      normal_color: 0.50,
      normal_size: 0.45,

      // Performance
      fps: 24,
      particle_count: 220,

      // Visual toggles
      mist: true,
      debug: false,

      // Mode + toggle
      mode: "swarm", // "swarm" | "vortex"
      show_mode_toggle: true,

      // Advanced tuning
      mist_ratio: 0.64,
      lerp_factor: 0.06,

      // Palette (3-stop default)
      palette: [
        [0, "#00ff00"],
        [0.5, "#ffff00"],
        [1, "#ff0000"],
      ],

      ...config,
    };

    // Keep old per-feature min/max defaults (fallback mode)
    ["speed", "color", "size"].forEach((r) => {
      if (this._config[`${r}_min`] === undefined) this._config[`${r}_min`] = this._config.min;
      if (this._config[`${r}_max`] === undefined) this._config[`${r}_max`] = this._config.max;
    });

    // Apply advanced tuning (fallbacks aligned with defaults)
    this._lerpFactor = this._clamp(this._config.lerp_factor, 0.01, 0.30, 0.06);
    this._mistRatio = this._clamp(this._config.mist_ratio, 0.10, 0.80, 0.64);

    this._resizeMistCanvas();

    // Init mode from config unless localStorage already has a choice
    const stored = this._readStoredMode();
    const cfgMode = String(this._config.mode || "swarm").toLowerCase();
    const safeCfg = (cfgMode === "vortex" || cfgMode === "swarm") ? cfgMode : "swarm";
    this._mode = stored || safeCfg;
  }

  set hass(hass) {
    const old = this._hass;
    this._hass = hass;

    // Only update targets after config exists and we're connected
    if (this._initialized && this._config) this._updateTargets();

    this.requestUpdate("_hass", old);
  }

  getCardSize() {
    return 3;
  }

  static getStubConfig() {
    return {
      type: "custom:particle-cloud-card",
      entity: "sensor.energy_power",
      normal: 3000,
      low: 1500,
      high: 4500,
      normal_speed: 0.35,
      normal_color: 0.50,
      normal_size: 0.45,
      particle_count: 220,
      fps: 24,
      mist: true,
      mode: "swarm",
      show_mode_toggle: true,
      mist_ratio: 0.64,
      lerp_factor: 0.06,
    };
  }

  // ------------------------------
  // Lifecycle
  // ------------------------------

  connectedCallback() {
    super.connectedCallback();

    // Mark initialized only when we are actually connected
    this._initialized = true;

    this.updateComplete.then(() => {
      this._setupCanvas();
      this._setupMistCanvas();
      this._updateTheme();
      this._handleResize();
      this._initParticles();
      if (this._hass) this._updateTargets();
      this._startAnimation();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  // ------------------------------
  // Setup / resize
  // ------------------------------

  _setupCanvas() {
    const canvas = this.shadowRoot?.querySelector("canvas");
    const container = this.shadowRoot?.querySelector(".container");
    if (!canvas || !container) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._handleResize());
      this._resizeObserver.observe(container);
    }
  }

  _handleResize() {
    if (!this.canvas || !this.ctx) return;

    const container = this.shadowRoot?.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);

    const prevW = this.width;
    const prevH = this.height;

    const dpr = window.devicePixelRatio || 1;
    this._dpr = dpr;

    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);

    // Reset then scale: no cumulative scaling
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.width = w;
    this.height = h;

    this._resizeMistCanvas();

    // Re-seed particles on significant size change
    if (this._config && (Math.abs(w - prevW) > 40 || Math.abs(h - prevH) > 40)) {
      this._initParticles();
    }
  }

  // ------------------------------
  // Particles
  // ------------------------------

  _initParticles() {
    const { width, height } = this;
    const cx = width / 2;
    const cy = height / 2;

    this.particles = [];
    const count = Math.max(1, this._config?.particle_count || 200);

    for (let i = 0; i < count; i++) {
      const x = cx + (Math.random() - 0.5) * width * 0.6;
      const y = cy + (Math.random() - 0.5) * height * 0.6;

      const a = Math.random() * Math.PI * 2;
      const s = 0.6 + Math.random() * 0.8;

      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        size: Math.random() * 2.5 + 1.5,
        phase: Math.random() * Math.PI * 2,
        vr: 0.15 + Math.pow(Math.random(), 2.2) * 0.85,
      });
    }
  }

  _clamp(x, lo, hi, fallback = 0) {
    const n = Number(x);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(lo, Math.min(hi, n));
  }

  _logNorm(x, min, max) {
    const mnRaw = Number(min);
    const mn = Number.isFinite(mnRaw) && mnRaw > 0 ? mnRaw : 1e-3;
    const mx = Math.max(mn + 1e-6, Number(max));
    const xv = Number.isFinite(x) ? x : 0;
    const xc = Math.max(0, Math.min(xv, mx));

    const denom = Math.log1p(mx / mn);
    if (!Number.isFinite(denom) || denom === 0) return 0;

    const n = Math.log1p(xc / mn) / denom;
    return Math.max(0, Math.min(1, n));
  }

  _centeredDeviation(val) {
    const n = Number(this._config?.normal);
    if (!Number.isFinite(n) || n === 0) return null;

    const loCfg = Number(this._config?.low);
    const hiCfg = Number(this._config?.high);

    const lo = Number.isFinite(loCfg) ? loCfg : n * 0.5;
    const hi = Number.isFinite(hiCfg) ? hiCfg : n * 1.5;

    if (!Number.isFinite(val)) return 0;

    if (val <= n) {
      const denom = (n - lo) || 1e-6;
      const t = (n - val) / denom;
      return -Math.max(0, Math.min(1, t));
    } else {
      const denom = (hi - n) || 1e-6;
      const t = (val - n) / denom;
      return Math.max(0, Math.min(1, t));
    }
  }

  _updateTargets() {
    if (!this._hass || !this._config) return;

    const useCentered = Number.isFinite(Number(this._config.normal));

    // Gains (fixed for simplicity)
    const gSpeed = 0.55;
    const gColor = 0.70;
    const gSize = 0.45;

    ["speed", "color", "size"].forEach((feature) => {
      const entityId = this._config[`entity_${feature}`] || this._config.entity;
      const st = entityId ? this._hass.states[entityId] : null;
      if (!st) return;

      const val = parseFloat(st.state);
      if (!Number.isFinite(val)) return;

      if (useCentered) {
        const d = this._centeredDeviation(val);
        if (d === null) return;

        const base =
          feature === "speed" ? (this._config.normal_speed ?? 0.35) :
          feature === "color" ? (this._config.normal_color ?? 0.50) :
          (this._config.normal_size ?? 0.45);

        const gain =
          feature === "speed" ? gSpeed :
          feature === "color" ? gColor :
          gSize;

        this._targets[feature] = this._clamp(base + d * gain, 0, 1, base);
      } else {
        const min = this._config[`${feature}_min`];
        const max = this._config[`${feature}_max`];
        this._targets[feature] = this._logNorm(val, min, max);
      }
    });
  }

  // ------------------------------
  // Helpers
  // ------------------------------

  _ensureRgb(color) {
    if (!color || typeof color !== "string") return "rgb(255, 255, 255)";
    if (color.startsWith("rgb")) return color;

    let hex = color.replace("#", "").trim();
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  _interpolateColor(t) {
    const raw = Array.isArray(this._config?.palette) ? this._config.palette : [];
    const palette = [...raw]
      .map((item) => (Array.isArray(item) ? { stop: item[0], color: item[1] } : item))
      .filter((p) => p && Number.isFinite(p.stop) && typeof p.color === "string")
      .sort((a, b) => a.stop - b.stop);

    if (!palette.length) return "rgb(255, 255, 255)";

    const first = palette[0];
    const last = palette[palette.length - 1];
    if (t <= first.stop) return this._ensureRgb(first.color);
    if (t >= last.stop) return this._ensureRgb(last.color);

    for (let i = 0; i < palette.length - 1; i++) {
      const s = palette[i], e = palette[i + 1];
      if (t >= s.stop && t <= e.stop) {
        const localT = (t - s.stop) / (e.stop - s.stop || 1);

        const m1 = this._ensureRgb(s.color).match(/\d+/g);
        const m2 = this._ensureRgb(e.color).match(/\d+/g);
        if (!m1 || !m2 || m1.length < 3 || m2.length < 3) return "rgb(255,255,255)";

        const c1 = m1.slice(0, 3).map(Number);
        const c2 = m2.slice(0, 3).map(Number);

        const r = Math.round(c1[0] + localT * (c2[0] - c1[0]));
        const g = Math.round(c1[1] + localT * (c2[1] - c1[1]));
        const b = Math.round(c1[2] + localT * (c2[2] - c1[2]));
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
    return this._ensureRgb(first.color);
  }

  _noise(x, y, t) {
    return (
      Math.sin(x * 1.5 + t) * Math.cos(y * 1.2 - t * 0.8) +
      Math.sin(y * 2.1 + t * 0.5) * 0.5
    );
  }

  _cssVar(name, fallback = "") {
    const v = getComputedStyle(this).getPropertyValue(name);
    return (v && v.trim()) ? v.trim() : fallback;
  }

  _parseRgb(str) {
    if (!str || typeof str !== "string") return null;
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3] };
  }

  _luminance({ r, g, b }) {
    const srgb = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  _updateTheme() {
    const primaryText = this._cssVar("--primary-text-color", "rgb(255,255,255)");
    const primaryBg = this._cssVar("--primary-background-color", "rgb(0,0,0)");
    const cardBg = this._cssVar("--card-background-color", "rgba(0,0,0,0)");

    const bgRgb = this._parseRgb(primaryBg) || { r: 0, g: 0, b: 0 };
    const isDark = this._luminance(bgRgb) < 0.35;

    this._theme = { text: primaryText, bg: primaryBg, card: cardBg, isDark };
  }

  // ------------------------------
  // Mode storage + toggle
  // ------------------------------

  _storageKey() {
    const ent =
      this._config?.entity ||
      this._config?.entity_speed ||
      this._config?.entity_color ||
      this._config?.entity_size ||
      "no-entity";
    const nm = this._config?.name || "";
    return `particle-cloud-card:mode:${ent}:${nm}`;
  }

  _readStoredMode() {
    try {
      const v = localStorage.getItem(this._storageKey());
      return (v === "swarm" || v === "vortex") ? v : null;
    } catch (_) {
      return null;
    }
  }

  _storeMode(mode) {
    try { localStorage.setItem(this._storageKey(), mode); } catch (_) {}
  }

  _toggleMode(e) {
    e?.stopPropagation?.();
    const next = (this._mode === "swarm") ? "vortex" : "swarm";
    this._mode = next;
    this._storeMode(next);
    this.requestUpdate();
  }

  // ------------------------------
  // Mist layer
  // ------------------------------

  _setupMistCanvas() {
    this._mistCanvas = document.createElement("canvas");
    this._mistCtx = this._mistCanvas.getContext("2d");
    this._resizeMistCanvas();
  }

  _resizeMistCanvas() {
    if (!this._mistCanvas) return;
    const w = Math.max(1, Math.floor(this.width * (this._mistRatio ?? 0.64)));
    const h = Math.max(1, Math.floor(this.height * (this._mistRatio ?? 0.64)));
    this._mistCanvas.width = w;
    this._mistCanvas.height = h;
  }

  // ------------------------------
  // Animation
  // ------------------------------

  _startAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

    const animate = (now) => {
      this.animationFrame = requestAnimationFrame(animate);

      const frameInterval = 1000 / (this._config?.fps || 30);
      if (now - this.lastDrawTime < frameInterval) return;
      this.lastDrawTime = now;

      if (!this.ctx || !this._hass || !this._config) return;
      if (this.width <= 1 || this.height <= 1) return;

      this._draw(now);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // ------------------------------
  // Motion models
  // ------------------------------

  _stepSwarm(params) {
    const { width, height, centerX, centerY, n, nm } = params;

    const maxSpeed = 0.8 + nm * 3.4;
    const neighborDist = 80 - nm * 30;
    const separationDist = 26 - nm * 10;

    const alignW = 0.9 + nm * 0.7;
    const cohesionW = 0.18 + nm * 0.45;
    const separationW = 2.2 - nm * 0.6;
    const noiseW = 0.18 + nm * 0.25;

    const windX = this._noise(10, 0, this.noiseTime * 0.35) * (0.06 + nm * 0.18);
    const windY = this._noise(0, 10, this.noiseTime * 0.35) * (0.06 + nm * 0.18);

    const roostX = centerX + this._noise(100, 0, this.noiseTime * 0.18) * 40;
    const roostY = centerY + this._noise(0, 100, this.noiseTime * 0.18) * 40;
    const roostW = 0.002 + nm * 0.006;

    const boundW = 0.0015 + nm * 0.003;
    const margin = 18;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      let count = 0;
      let avgVX = 0, avgVY = 0;
      let centerX2 = 0, centerY2 = 0;
      let sepX = 0, sepY = 0;

      for (let j = 0; j < this.particles.length; j++) {
        if (i === j) continue;
        const q = this.particles[j];
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > neighborDist * neighborDist) continue;

        count++;
        avgVX += q.vx;
        avgVY += q.vy;
        centerX2 += q.x;
        centerY2 += q.y;

        if (d2 < separationDist * separationDist && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const inv = 1 / d;

          const close = 1 - Math.min(1, d / separationDist); // 0..1
          const rep = inv * (0.6 + (1 - n) * 1.4) * (0.5 + close * close * 2.0);

          sepX -= dx * rep;
          sepY -= dy * rep;
        }
      }

      let ax = 0, ay = 0;

      if (count > 0) {
        avgVX /= count;
        avgVY /= count;
        ax += (avgVX - p.vx) * alignW * 0.05;
        ay += (avgVY - p.vy) * alignW * 0.05;

        centerX2 /= count;
        centerY2 /= count;
        ax += (centerX2 - p.x) * cohesionW * 0.0007;
        ay += (centerY2 - p.y) * cohesionW * 0.0007;

        ax += sepX * separationW * 0.12;
        ay += sepY * separationW * 0.12;
      }

      p.phase += 0.03 + n * 0.05;
      ax += this._noise(p.x * 0.01, p.y * 0.01, this.noiseTime) * noiseW * 0.7;
      ay += this._noise(p.y * 0.01, p.x * 0.01, this.noiseTime + 7.7) * noiseW * 0.7;

      ax += windX;
      ay += windY;

      ax += (roostX - p.x) * roostW;
      ay += (roostY - p.y) * roostW;

      if (p.x < margin) ax += (margin - p.x) * boundW;
      if (p.x > width - margin) ax -= (p.x - (width - margin)) * boundW;
      if (p.y < margin) ay += (margin - p.y) * boundW;
      if (p.y > height - margin) ay -= (p.y - (height - margin)) * boundW;

      p.vx += ax;
      p.vy += ay;

      const sp = Math.hypot(p.vx, p.vy) || 1;
      if (sp > maxSpeed) {
        p.vx = (p.vx / sp) * maxSpeed;
        p.vy = (p.vy / sp) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;
    }
  }

  _stepVortex(params) {
    const { width, height, centerX, centerY, n, nm } = params;

    const baseOmega = 0.006 + nm * 0.030;
    const swirlPull = 0.0035 + nm * 0.014;
    const inward = 0.0012 + nm * 0.004;
    const centerPull = 0.0008 + (1 - n) * 0.0025;
    const noiseW = 0.08 + nm * 0.20;
    const maxSpeed = 1.2 + nm * 4.2;

    const margin = 10;
    const maxR = Math.min(width, height) * (0.38 + (1 - n) * 0.06);
    const minR = Math.min(width, height) * 0.06;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const r = Math.hypot(dx, dy) || 1;

      const targetR = minR + p.vr * (maxR - minR);

      const tx = -dy / r;
      const ty = dx / r;

      const omega = baseOmega * (0.6 + 0.8 * (1 - Math.min(1, r / maxR)));

      let ax = 0, ay = 0;

      ax += tx * omega * 180;
      ay += ty * omega * 180;

      const radialErr = (targetR - r);
      ax += (dx / r) * radialErr * swirlPull;
      ay += (dy / r) * radialErr * swirlPull;
      ax += (-dx) * centerPull;
      ay += (-dy) * centerPull;

      const spiralDir = this._noise(p.vr * 9.1, 3.3, this.noiseTime * 0.6) > 0 ? 1 : -1;
      ax += (dx / r) * spiralDir * inward * 60;
      ay += (dy / r) * spiralDir * inward * 60;

      p.phase += 0.03 + n * 0.08;
      ax += this._noise(p.x * 0.012, p.y * 0.012, this.noiseTime) * noiseW * 0.9;
      ay += this._noise(p.y * 0.012, p.x * 0.012, this.noiseTime + 4.2) * noiseW * 0.9;

      p.vx = (p.vx + ax) * 0.985;
      p.vy = (p.vy + ay) * 0.985;

      const sp = Math.hypot(p.vx, p.vy) || 1;
      if (sp > maxSpeed) {
        p.vx = (p.vx / sp) * maxSpeed;
        p.vy = (p.vy / sp) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < margin) p.x = margin, p.vx *= -0.4;
      if (p.x > width - margin) p.x = width - margin, p.vx *= -0.4;
      if (p.y < margin) p.y = margin, p.vy *= -0.4;
      if (p.y > height - margin) p.y = height - margin, p.vy *= -0.4;
    }
  }

  _draw(now) {
    const { ctx, width, height } = this;
    const centerX = width / 2;
    const centerY = height / 2;

    if (now - this._lastThemeCheck > 1000) {
      this._lastThemeCheck = now;
      this._updateTheme();
    }

    ["speed", "color", "size"].forEach((f) => {
      this._currents[f] += (this._targets[f] - this._currents[f]) * this._lerpFactor;
    });

    const currentColor = this._interpolateColor(this._currents.color);
    const colorRGBA = (a) => currentColor.replace("rgb", "rgba").replace(")", `, ${a})`);

    this.noiseTime += 0.008 + this._currents.speed * 0.02;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // ---- Mist layer ----
    if (this._config.mist && this._mistCtx && this._mistCanvas) {
      const mctx = this._mistCtx;
      const mw = Math.max(1, this._mistCanvas.width);
      const mh = Math.max(1, this._mistCanvas.height);

      mctx.setTransform(1, 0, 0, 1, 0, 0);
      mctx.clearRect(0, 0, mw, mh);

      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = "rgba(255,255,255,0.10)";

      const blurPx = 6 + this._currents.size * 10;
      const canFilter = typeof mctx.filter === "string";
      if (canFilter) mctx.filter = `blur(${blurPx}px)`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const x = (p.x / width) * mw;
        const y = (p.y / height) * mh;
        const r = 6 + p.size * 2;
        mctx.beginPath();
        mctx.arc(x, y, r, 0, Math.PI * 2);
        mctx.fill();
      }

      if (canFilter) mctx.filter = "none";

      mctx.globalCompositeOperation = "source-in";
      mctx.fillStyle = colorRGBA(0.22);
      mctx.fillRect(0, 0, mw, mh);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(this._mistCanvas, 0, 0, width, height);
    }

    // ---------- Motion model selection ----------
    const n = this._currents.speed;      // 0..1
    const nm = Math.pow(n, 1.8);         // calmer in low/mid range
    const mode = (this._mode === "vortex") ? "vortex" : "swarm";
    const params = { width, height, centerX, centerY, n, nm };

    if (mode === "vortex") this._stepVortex(params);
    else this._stepSwarm(params);

    // ---------- DRAW ----------
    ctx.globalCompositeOperation = "source-over";

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      const rad = Math.max(1.1, p.size * 0.8);
      const halo = rad * 1.3;

      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
      g.addColorStop(0, colorRGBA(0.10));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = colorRGBA(0.85);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Debug overlay (optional)
    if (this._config.debug) {
      const ent = this._config.entity;
      const raw = ent ? this._hass.states[ent]?.state : "-";

      ctx.globalCompositeOperation = "source-over";
      ctx.save();
      ctx.fillStyle = this._theme?.isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)";
      ctx.fillRect(6, 6, 260, 104);
      ctx.fillStyle =
        this._theme?.text ||
        (this._theme?.isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)");
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Mode: ${mode}`, 12, 12);
      ctx.fillText(`Value: ${raw}`, 12, 28);
      ctx.fillText(`tgt(speed): ${this._targets.speed.toFixed(3)}`, 12, 44);
      ctx.fillText(`tgt(size):  ${this._targets.size.toFixed(3)}`, 12, 60);
      ctx.fillText(`tgt(color): ${this._targets.color.toFixed(3)}`, 12, 76);
      ctx.fillText(`lerp: ${this._lerpFactor.toFixed(2)} mistRatio: ${this._mistRatio.toFixed(2)}`, 12, 92);
      ctx.restore();
    }
  }

  _inEditorPreview() {
    const host = this.getRootNode()?.host;
    return !!(
      this.closest("hui-dialog-edit-card") ||
      this.closest("hui-dialog-edit-lovelace-card") ||
      this.closest("hui-card-element-editor") ||
      this.closest("ha-card-preview") ||
      this.closest("hui-card-preview") ||
      this.closest("hui-dialog") ||
      host?.tagName?.toLowerCase().includes("hui-dialog")
    );
  }

  render() {
    const entityId =
      this._config?.entity ||
      this._config?.entity_speed ||
      this._config?.entity_color ||
      this._config?.entity_size;

    const stateObj = entityId ? this._hass?.states?.[entityId] : null;

    const name =
      this._config?.name ||
      stateObj?.attributes?.friendly_name ||
      "";

    const value = stateObj?.state;
    const unit = stateObj?.attributes?.unit_of_measurement || "";

    const hasValue = value !== undefined && value !== null && value !== "unknown" && value !== "unavailable";
    const header = name ? (hasValue ? `${name}: ${value} ${unit}`.trim() : name) : "";

    const showToggle = !!this._config?.show_mode_toggle;
    const icon = (this._mode === "vortex") ? "mdi:tornado" : "mdi:fish";
    const inPreview = this._inEditorPreview();

    return x`
      <div class=${inPreview ? "previewWrap" : ""}>
        <ha-card .header=${header}>
          <div class="container ${inPreview ? "preview" : ""}">
            <canvas></canvas>

            ${showToggle ? x`
              <button class="modeBtn" @click=${this._toggleMode} title="Toggle mode">
                <ha-icon .icon=${icon}></ha-icon>
              </button>
            ` : ""}
          </div>
        </ha-card>
      </div>
    `;
  }

  static get styles() {
    return i$1`
      :host { display: block; }

      ha-card {
        background: transparent;
        box-shadow: none;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        position: relative;
        width: 100%;
      }

      .previewWrap {
        max-width: 200px;
        margin: 0 auto;
      }

      .container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
      }

      .container.preview {
        padding-bottom: 0 !important;
        height: 180px;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .modeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(0,0,0,0.20);
        backdrop-filter: blur(6px);
        display: grid;
        place-items: center;
        cursor: pointer;
        padding: 0;
      }

      .modeBtn ha-icon {
        color: var(--primary-text-color);
        opacity: 0.85;
        width: 18px;
        height: 18px;
      }

      .modeBtn:hover {
        background: rgba(0,0,0,0.30);
        border-color: rgba(255,255,255,0.28);
      }
    `;
  }
}

/* ---------------------------------------------------------
 * ParticleCloudCardEditor
 * --------------------------------------------------------- */
class ParticleCloudCardEditor extends s {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    const palette = Array.isArray(config?.palette) ? config.palette : [
      [0, "#00ff00"],
      [0.5, "#ffff00"],
      [1, "#ff0000"],
    ];

    this._config = {
      mode: "swarm",
      particle_count: 220,
      fps: 24,
      mist: true,
      show_mode_toggle: true,
      debug: false,
      mist_ratio: 0.64,
      lerp_factor: 0.06,

      normal: config?.normal ?? undefined,
      low: config?.low,
      high: config?.high,

      normal_speed: config?.normal_speed ?? 0.35,
      normal_color: config?.normal_color ?? 0.50,
      normal_size:  config?.normal_size  ?? 0.45,

      palette,
      ...config,
    };
  }

  _emit(newConfig) {
    const c = newConfig || {};

    const ordered = {
      type: "custom:particle-cloud-card",
      entity: c.entity,

      ...(c.name ? { name: c.name } : {}),

      mode: c.mode ?? "swarm",
      particle_count: c.particle_count ?? 220,
      fps: c.fps ?? 24,

      mist: c.mist !== false,
      show_mode_toggle: c.show_mode_toggle !== false,
      debug: !!c.debug,

      ...(Number.isFinite(Number(c.normal)) ? { normal: Number(c.normal) } : {}),
      ...(Number.isFinite(Number(c.low)) ? { low: Number(c.low) } : {}),
      ...(Number.isFinite(Number(c.high)) ? { high: Number(c.high) } : {}),

      normal_speed: c.normal_speed ?? 0.35,
      normal_color: c.normal_color ?? 0.5,
      normal_size: c.normal_size ?? 0.45,

      palette: Array.isArray(c.palette) ? c.palette : [
        [0, "#00ff00"],
        [0.5, "#ffff00"],
        [1, "#ff0000"],
      ],

      mist_ratio: c.mist_ratio ?? 0.64,
      lerp_factor: c.lerp_factor ?? 0.06,
    };

    Object.keys(ordered).forEach((k) => {
      if (ordered[k] === undefined) delete ordered[k];
    });

    this._config = ordered;

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: ordered },
      bubbles: true,
      composed: true,
    }));
  }

  _num(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  _clamp01(x) {
    const n = Number(x);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(1, n));
  }

  _getEntityStateValue(entityId) {
    if (!this.hass || !entityId) return null;
    const st = this.hass.states?.[entityId];
    if (!st) return null;
    const v = parseFloat(st.state);
    return Number.isFinite(v) ? v : null;
  }

  _setNormalToCurrent() {
    const c = this._config || {};
    const v = this._getEntityStateValue(c.entity);
    if (v === null) return;
    this._emit({ ...c, normal: v });
  }

  _setLowHighFromNormal() {
    const c = this._config || {};
    const n = Number(c.normal);
    if (!Number.isFinite(n) || n === 0) return;
    this._emit({ ...c, low: n * 0.5, high: n * 1.5 });
  }

  _onAnyChanged(ev) {
    if (!this._config) return;
    const key = ev.target?.dataset?.key;
    if (!key) return;

    if (ev.target.tagName?.toLowerCase() === "ha-switch") {
      this._emit({ ...this._config, [key]: !!ev.target.checked });
      return;
    }

    const raw = ev.detail?.value ?? ev.target.value;

    const optionalNumeric = new Set(["normal", "low", "high"]);
    if (optionalNumeric.has(key) && (raw === "" || raw === null || raw === undefined)) {
      const next = { ...this._config };
      delete next[key];
      this._emit(next);
      return;
    }

    const numeric = new Set([
      "normal","low","high",
      "particle_count","fps",
      "normal_speed","normal_color","normal_size",
      "mist_ratio","lerp_factor",
    ]);

    if (numeric.has(key)) {
      const next = { ...this._config, [key]: this._num(raw, this._config[key]) };
      this._emit(next);
      return;
    }

    if (key === "name" && raw === "") {
      const next = { ...this._config };
      delete next.name;
      this._emit(next);
      return;
    }

    this._emit({ ...this._config, [key]: raw });
  }

  _onSelectChanged(key, ev) {
    const value = ev?.target?.value;
    this._emit({ ...this._config, [key]: value });
  }

  _getPalette3() {
    const p = Array.isArray(this._config?.palette) ? this._config.palette : [];
    const a = p[0] || [0, "#00ff00"];
    const b = p[1] || [0.5, "#ffff00"];
    const c = p[2] || [1, "#ff0000"];
    return {
      s0: this._clamp01(this._num(a[0], 0)),
      c0: a[1] || "#00ff00",
      s1: this._clamp01(this._num(b[0], 0.5)),
      c1: b[1] || "#ffff00",
      s2: this._clamp01(this._num(c[0], 1)),
      c2: c[1] || "#ff0000",
    };
  }

  _setPaletteStop(idx, kind, value) {
    const pal = this._getPalette3();
    let s0 = pal.s0, s1 = pal.s1, s2 = pal.s2;
    let c0 = pal.c0, c1 = pal.c1, c2 = pal.c2;

    if (idx === 0 && kind === "stop") s0 = this._clamp01(value);
    if (idx === 1 && kind === "stop") s1 = this._clamp01(value);
    if (idx === 2 && kind === "stop") s2 = this._clamp01(value);

    if (idx === 0 && kind === "color") c0 = String(value || c0);
    if (idx === 1 && kind === "color") c1 = String(value || c1);
    if (idx === 2 && kind === "color") c2 = String(value || c2);

    s0 = Math.min(s0, s1);
    s2 = Math.max(s2, s1);

    this._emit({
      ...this._config,
      palette: [
        [s0, c0],
        [s1, c1],
        [s2, c2],
      ],
    });
  }

  _toggleRow(label, key, checked) {
    return x`
      <label class="toggleRow">
        <span>${label}</span>
        <ha-switch
          .checked=${checked}
          data-key=${key}
          @change=${this._onAnyChanged}
        ></ha-switch>
      </label>
    `;
  }

  _paletteRow(label, idx, stop, color) {
    return x`
      <div class="palRow">
        <div class="palLabel">${label}</div>

        <ha-textfield
          type="number"
          min="0" max="1" step="0.01"
          .value=${stop}
          .label=${"Stop (0..1)"}
          @input=${(e) => this._setPaletteStop(idx, "stop", e.target.value)}
        ></ha-textfield>

        <div class="colorBox">
          <div class="colorLabel">Color</div>
          <input
            class="colorInput"
            type="color"
            .value=${color}
            @input=${(e) => this._setPaletteStop(idx, "color", e.target.value)}
          />
          <div class="hex">${color}</div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.hass) return x``;
    const c = this._config || {};
    const pal = this._getPalette3();
    const current = this._getEntityStateValue(c.entity);

    return x`
      <div class="grid">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${c.entity || ""}
          .label=${"Entity"}
          allow-custom-entity
          data-key="entity"
          @value-changed=${this._onAnyChanged}
        ></ha-entity-picker>

        <ha-textfield
          .value=${c.name || ""}
          .label=${"Name override (optional)"}
          data-key="name"
          @input=${this._onAnyChanged}
        ></ha-textfield>

        <div class="sectionTitle">Normalization (low / normal / high)</div>

        <div class="row3">
          <ha-textfield
            type="number"
            .value=${c.normal ?? ""}
            .label=${"Normal"}
            data-key="normal"
            @input=${this._onAnyChanged}
          ></ha-textfield>

          <ha-textfield
            type="number"
            .value=${c.low ?? ""}
            .label=${"Low (optional)"}
            placeholder="defaults to normal*0.5"
            data-key="low"
            @input=${this._onAnyChanged}
          ></ha-textfield>

          <ha-textfield
            type="number"
            .value=${c.high ?? ""}
            .label=${"High (optional)"}
            placeholder="defaults to normal*1.5"
            data-key="high"
            @input=${this._onAnyChanged}
          ></ha-textfield>
        </div>

        <div class="buttonRow">
          <mwc-button
            outlined
            @click=${this._setNormalToCurrent}
            ?disabled=${!c.entity}
          >
            Use current value as Normal
          </mwc-button>

          <mwc-button
            outlined
            @click=${this._setLowHighFromNormal}
            ?disabled=${!Number.isFinite(Number(c.normal))}
          >
            Auto Low/High (±50%)
          </mwc-button>

          <div class="hint">Current: ${current === null ? "—" : current}</div>
        </div>

        <div class="sectionTitle">At “normal” (set baselines)</div>

        <div class="row3">
          <div class="sliderBox">
            <div class="sliderLabel">Normal speed: ${(c.normal_speed ?? 0.35).toFixed(2)}</div>
            <ha-slider
              min="0" max="1" step="0.01"
              .value=${c.normal_speed ?? 0.35}
              data-key="normal_speed"
              @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "normal_speed" }, value: e.target.value } })}
            ></ha-slider>
          </div>

          <div class="sliderBox">
            <div class="sliderLabel">Normal color: ${(c.normal_color ?? 0.50).toFixed(2)}</div>
            <ha-slider
              min="0" max="1" step="0.01"
              .value=${c.normal_color ?? 0.50}
              data-key="normal_color"
              @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "normal_color" }, value: e.target.value } })}
            ></ha-slider>
          </div>

          <div class="sliderBox">
            <div class="sliderLabel">Normal size: ${(c.normal_size ?? 0.45).toFixed(2)}</div>
            <ha-slider
              min="0" max="1" step="0.01"
              .value=${c.normal_size ?? 0.45}
              data-key="normal_size"
              @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "normal_size" }, value: e.target.value } })}
            ></ha-slider>
          </div>
        </div>

        <div class="sectionTitle">3-stop palette</div>
        <div class="paletteGrid">
          ${this._paletteRow("Low", 0, pal.s0, pal.c0)}
          ${this._paletteRow("Mid", 1, pal.s1, pal.c1)}
          ${this._paletteRow("High", 2, pal.s2, pal.c2)}
        </div>

        <div class="sectionTitle">Motion & performance</div>

        <ha-select
          .label=${"Mode"}
          .value=${c.mode || "swarm"}
          data-key="mode"
          @selected=${(ev) => this._onSelectChanged("mode", ev)}
        >
          <mwc-list-item value="swarm">Swarm</mwc-list-item>
          <mwc-list-item value="vortex">Vortex</mwc-list-item>
        </ha-select>

        <div class="row2">
          <div class="sliderBox">
            <div class="sliderLabel">Particles: ${c.particle_count ?? 220}</div>
            <ha-slider
              min="50" max="800" step="10"
              .value=${c.particle_count ?? 220}
              data-key="particle_count"
              @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "particle_count" }, value: e.target.value } })}
            ></ha-slider>
          </div>

          <div class="sliderBox">
            <div class="sliderLabel">FPS: ${c.fps ?? 24}</div>
            <ha-slider
              min="10" max="60" step="1"
              .value=${c.fps ?? 24}
              data-key="fps"
              @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "fps" }, value: e.target.value } })}
            ></ha-slider>
          </div>
        </div>

        <div class="toggles">
          ${this._toggleRow("Mist", "mist", c.mist !== false)}
          ${this._toggleRow("Show mode button", "show_mode_toggle", c.show_mode_toggle !== false)}
          ${this._toggleRow("Debug", "debug", !!c.debug)}
        </div>

        <details class="advanced">
          <summary>Advanced</summary>

          <div class="row2">
            <div class="sliderBox">
              <div class="sliderLabel">Mist ratio: ${(c.mist_ratio ?? 0.64).toFixed(2)}</div>
              <ha-slider
                min="0.10" max="0.80" step="0.01"
                .value=${c.mist_ratio ?? 0.64}
                data-key="mist_ratio"
                @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "mist_ratio" }, value: e.target.value } })}
              ></ha-slider>
            </div>

            <div class="sliderBox">
              <div class="sliderLabel">Lerp factor: ${(c.lerp_factor ?? 0.06).toFixed(2)}</div>
              <ha-slider
                min="0.01" max="0.30" step="0.01"
                .value=${c.lerp_factor ?? 0.06}
                data-key="lerp_factor"
                @change=${(e) => this._onAnyChanged({ target: { dataset: { key: "lerp_factor" }, value: e.target.value } })}
              ></ha-slider>
            </div>
          </div>
        </details>
      </div>
    `;
  }

  static get styles() {
    return i$1`
      .grid { display: grid; gap: 12px; }
      .sectionTitle { font-weight: 600; margin-top: 6px; opacity: 0.9; }

      .row2 { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
      .row3 { display: grid; gap: 12px; grid-template-columns: 1fr 1fr 1fr; }

      .sliderBox { padding: 6px 0; }
      .sliderLabel { font-size: 12px; opacity: 0.8; margin-bottom: 4px; }

      .buttonRow {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
      }

      .hint { opacity: 0.75; font-size: 12px; }

      .toggles { display: grid; gap: 8px; }
      .toggleRow { display: flex; justify-content: space-between; align-items: center; }

      .paletteGrid { display: grid; gap: 10px; }
      .palRow {
        display: grid;
        gap: 10px;
        grid-template-columns: 60px 1fr 180px;
        align-items: center;
      }

      .palLabel { font-weight: 600; opacity: 0.85; }
      .colorBox { display: grid; gap: 6px; }
      .colorInput { width: 100%; height: 36px; border: none; }

      details.advanced summary {
        cursor: pointer;
        user-select: none;
        margin-top: 6px;
      }
    `;
  }
}

/* ---------------------------------------------------------
 * Safe define guards (prevents double-define crashes)
 * --------------------------------------------------------- */
if (!customElements.get("particle-cloud-card")) {
  customElements.define("particle-cloud-card", ParticleCloudCard);
}
if (!customElements.get("particle-cloud-card-editor")) {
  customElements.define("particle-cloud-card-editor", ParticleCloudCardEditor);
}

/* ---------------------------------------------------------
 * Lovelace card picker metadata
 * --------------------------------------------------------- */
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "particle-cloud-card")) {
  window.customCards.push({
    type: "particle-cloud-card",
    name: "Particle Cloud Card",
    description: "Ambient swarm + vortex + mist particle visualization for numeric sensors",
    preview: true,
    documentationURL: "https://github.com/sonite/particle-cloud-card",
    author: "Christian Gruffman",
  });
}
