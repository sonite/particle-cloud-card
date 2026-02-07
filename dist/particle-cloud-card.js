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
 * - DPR-correct canvas scaling (no cumulative scaling)
 * - Container ResizeObserver (responsive)
 * - Pixel-coordinate particles (consistent physics)
 *
 * Release: v0.1.0
 */


class ParticleCloudCard extends s {
  static get properties() {
    return {
      _hass: { type: Object },
      _config: { type: Object },
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
    this._mistRatio = 0.33;
    this._mistCanvas = null;
    this._mistCtx = null;

    // Resize observer handle
    this._resizeObserver = null;

    // Canvas handles
    this.canvas = null;
    this.ctx = null;
  }

  // ------------------------------
  // Home Assistant integration
  // ------------------------------

  setConfig(config) {
    if (!config || (!config.entity && !config.entity_speed && !config.entity_color && !config.entity_size)) {
      throw new Error(
        "Define at least one entity (entity, entity_speed, entity_color, entity_size)."
      );
    }

    this._config = {
      // Normalization defaults
      min: 0,
      max: 1,

      // Performance defaults (boids are O(N^2))
      fps: 24,
      particle_count: 220,

      // Visual toggles
      mist: true,
      show_value: true,
      debug: false,

      // Palette
      palette: [
        [0, "#00ff00"],
        [0.5, "#ffff00"],
        [1, "#ff0000"],
      ],

      ...config,
    };

    ["speed", "color", "size"].forEach((r) => {
      if (this._config[`${r}_min`] === undefined) this._config[`${r}_min`] = this._config.min;
      if (this._config[`${r}_max`] === undefined) this._config[`${r}_max`] = this._config.max;
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._initialized) this._updateTargets();
  }

  // Helps HA layout estimate the card height
  getCardSize() {
    return 3;
  }

  // Card picker / UI editor stub
  static getStubConfig() {
    return {
      type: "custom:particle-cloud-card",
      entity: "sensor.power",
      min: 0,
      max: 10000,
      particle_count: 180,
      fps: 24,
      mist: true,
      show_value: true,
    };
  }

  // Optional hook for a config editor element (safe to include even if you don't provide one)
  static getConfigElement() {
    return document.createElement("hui-error-card");
  }

  // ------------------------------
  // Lifecycle
  // ------------------------------

  connectedCallback() {
    super.connectedCallback();
    this._initialized = true;

    this.updateComplete.then(() => {
      this._setupCanvas();
      this._setupMistCanvas();
      this._updateTheme();
      this._handleResize(); // ensures width/height exist
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
    if (!canvas) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });

    const container = this.shadowRoot?.querySelector(".container");
    if (!container) return;

    // Only create once
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

    // CSS size
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    // Backing store
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);

    // Reset transform BEFORE scaling (prevents cumulative scaling)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.width = w;
    this.height = h;

    this._resizeMistCanvas();

    // Re-init particles on meaningful resize to avoid odd “offscreen” clumps.
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

      // random velocity
      const a = Math.random() * Math.PI * 2;
      const s = 0.6 + Math.random() * 0.8;

      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        size: Math.random() * 2.5 + 1.5,
        phase: Math.random() * Math.PI * 2, // for subtle wiggle
      });
    }
  }

  _updateTargets() {
    if (!this._hass || !this._config) return;

    // Log-ish normalization that works well for power-like signals:
    //  - preserves low-end detail
    //  - compresses high spikes
    const logNorm = (x, min, max) => {
      const mn = Math.max(1e-6, Number(min));
      const mx = Math.max(mn + 1e-6, Number(max));
      const xv = Number.isFinite(x) ? x : 0;
      const xc = Math.max(0, Math.min(xv, mx));

      const denom = Math.log1p(mx / mn);
      if (!Number.isFinite(denom) || denom === 0) return 0;

      const n = Math.log1p(xc / mn) / denom;
      return Math.max(0, Math.min(1, n));
    };

    ["speed", "color", "size"].forEach((feature) => {
      const entityId = this._config[`entity_${feature}`] || this._config.entity;
      const st = entityId ? this._hass.states[entityId] : null;
      if (!st) return;

      const val = parseFloat(st.state);
      if (!Number.isFinite(val)) return;

      const min = this._config[`${feature}_min`];
      const max = this._config[`${feature}_max`];

      this._targets[feature] = logNorm(val, min, max);
    });
  }

  // ------------------------------
  // Helpers
  // ------------------------------

  _ensureRgb(color) {
    if (!color) return "rgb(255, 255, 255)";
    if (typeof color !== "string") return "rgb(255, 255, 255)";
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

    this._theme = {
      text: primaryText,
      bg: primaryBg,
      card: cardBg,
      isDark,
    };
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
    const w = Math.max(1, Math.floor(this.width * this._mistRatio));
    const h = Math.max(1, Math.floor(this.height * this._mistRatio));
    this._mistCanvas.width = w;
    this._mistCanvas.height = h;
  }

  // ------------------------------
  // Animation
  // ------------------------------

  _startAnimation() {
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

  _draw(now) {
    const { ctx, width, height } = this;
    const centerX = width / 2;
    const centerY = height / 2;

    // Re-read theme vars occasionally (cheap)
    if (now - this._lastThemeCheck > 1000) {
      this._lastThemeCheck = now;
      this._updateTheme();
    }

    // Smooth transitions (targets -> currents)
    ["speed", "color", "size"].forEach((f) => {
      this._currents[f] += (this._targets[f] - this._currents[f]) * this._lerpFactor;
    });

    const currentColor = this._interpolateColor(this._currents.color);
    const colorRGBA = (a) => currentColor.replace("rgb", "rgba").replace(")", `, ${a})`);

    // Advance time
    this.noiseTime += 0.008 + this._currents.speed * 0.02;

    // Clear fully (no trails)
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // ---- Mist / cloud density layer (under the swarm dots) ----
    if (this._config.mist && this._mistCtx) {
      const mctx = this._mistCtx;
      const mw = this._mistCanvas.width;
      const mh = this._mistCanvas.height;

      // Clear mist buffer
      mctx.setTransform(1, 0, 0, 1, 0, 0);
      mctx.clearRect(0, 0, mw, mh);

      // Build density map (white alpha blobs)
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

      // Tint the density map with currentColor
      mctx.globalCompositeOperation = "source-in";
      mctx.fillStyle = colorRGBA(0.22);
      mctx.fillRect(0, 0, mw, mh);

      // Draw mist to main canvas
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(this._mistCanvas, 0, 0, width, height);
    }

    // ---------- SWARM (boids) ----------
    const n = this._currents.speed; // 0..1

    // Motion curve: calmer in low/mid range
    const nm = Math.pow(n, 1.8);

    // Motion tuning (birds feel)
    const maxSpeed = 0.8 + nm * 3.4;
    const neighborDist = 80 - nm * 30;
    const separationDist = 18 - nm * 6;

    const alignW = 0.9 + nm * 0.7;
    const cohesionW = 0.5 + nm * 0.4;
    const separationW = 1.3 + nm * 0.9;
    const noiseW = 0.18 + nm * 0.25;

    // Wind drift (slow, global)
    const windX = this._noise(10, 0, this.noiseTime * 0.35) * (0.06 + nm * 0.18);
    const windY = this._noise(0, 10, this.noiseTime * 0.35) * (0.06 + nm * 0.18);

    // Roost point (slowly drifting "center of gravity")
    const roostX = centerX + this._noise(100, 0, this.noiseTime * 0.18) * 40;
    const roostY = centerY + this._noise(0, 100, this.noiseTime * 0.18) * 40;
    const roostW = (0.010 * (1 - n)) + (0.004 * n);

    // Soft bounds (weakened) to avoid edge “ping-pong”
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
          const inv = 1 / Math.sqrt(d2);
          sepX -= dx * inv;
          sepY -= dy * inv;
        }
      }

      let ax = 0, ay = 0;

      if (count > 0) {
        // Alignment
        avgVX /= count;
        avgVY /= count;
        ax += (avgVX - p.vx) * alignW * 0.05;
        ay += (avgVY - p.vy) * alignW * 0.05;

        // Cohesion
        centerX2 /= count;
        centerY2 /= count;
        ax += (centerX2 - p.x) * cohesionW * 0.0007;
        ay += (centerY2 - p.y) * cohesionW * 0.0007;

        // Separation
        ax += sepX * separationW * 0.12;
        ay += sepY * separationW * 0.12;
      }

      // Flutter noise (local)
      p.phase += 0.03 + n * 0.05;
      ax += this._noise(p.x * 0.01, p.y * 0.01, this.noiseTime) * noiseW * 0.7;
      ay += this._noise(p.y * 0.01, p.x * 0.01, this.noiseTime + 7.7) * noiseW * 0.7;

      // Wind drift
      ax += windX;
      ay += windY;

      // Roost pull (keeps it centered)
      ax += (roostX - p.x) * roostW;
      ay += (roostY - p.y) * roostW;

      // Soft bounds
      if (p.x < margin) ax += (margin - p.x) * boundW;
      if (p.x > width - margin) ax -= (p.x - (width - margin)) * boundW;
      if (p.y < margin) ay += (margin - p.y) * boundW;
      if (p.y > height - margin) ay -= (p.y - (height - margin)) * boundW;

      // Integrate velocity
      p.vx += ax;
      p.vy += ay;

      // Limit speed
      const sp = Math.hypot(p.vx, p.vy) || 1;
      if (sp > maxSpeed) {
        p.vx = (p.vx / sp) * maxSpeed;
        p.vy = (p.vy / sp) * maxSpeed;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // ---------- DRAW ----------
      ctx.globalCompositeOperation = "source-over";

      const rad = Math.max(1.1, p.size * 0.8);
      const halo = rad * 1.3;

      // subtle halo
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
      g.addColorStop(0, colorRGBA(0.10));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
      ctx.fill();

      // core dot
      ctx.fillStyle = colorRGBA(0.85);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Optional value display (theme-aware)
    if (this._config.show_value) {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = this._theme?.text || "rgba(255, 255, 255, 0.9)";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const displayEntity =
        this._config.entity ||
        this._config.entity_color ||
        this._config.entity_speed ||
        this._config.entity_size;

      const raw = displayEntity ? this._hass.states[displayEntity]?.state : null;
      ctx.fillText(raw ?? "-", centerX, centerY);
    }

    // Debug overlay (optional)
    if (this._config.debug) {
      const ent = this._config.entity;
      const raw = ent ? this._hass.states[ent]?.state : "-";

      ctx.globalCompositeOperation = "source-over";
      ctx.save();
      ctx.fillStyle = this._theme?.isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)";
      ctx.fillRect(6, 6, 210, 70);
      ctx.fillStyle =
        this._theme?.text ||
        (this._theme?.isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)");
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Value: ${raw}`, 12, 12);
      ctx.fillText(`norm(speed): ${this._currents.speed.toFixed(3)}`, 12, 28);
      ctx.fillText(`norm(size):  ${this._currents.size.toFixed(3)}`, 12, 44);
      ctx.fillText(`norm(color): ${this._currents.color.toFixed(3)}`, 12, 60);
      ctx.restore();
    }
  }

  render() {
    return x`
      <ha-card>
        <div class="container">
          <canvas></canvas>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return i$1`
      :host { display: block; }

      ha-card {
        background: transparent; /* follow dashboard background */
        box-shadow: none;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        position: relative;
        width: 100%;
      }

      /* Square by default. Remove padding-bottom for non-square. */
      .container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
      }

      canvas {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
  }
}

customElements.define("particle-cloud-card", ParticleCloudCard);

// Show up in the Lovelace card picker list
window.customCards = window.customCards || [];
window.customCards.push({
  type: "particle-cloud-card",
  name: "Particle Cloud Card",
  description: "Ambient swarm + mist particle visualization for numeric sensors",
  preview: true,
  documentationURL: "https://github.com/sonite/particle-cloud-card",
  author: "Christian Gruffman",
});
//# sourceMappingURL=particle-cloud-card.js.map
