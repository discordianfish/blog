(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{207:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return w});a(223),a(224),a(62);var i=a(5),r=a.n(i),s=a(0),n=a.n(s),l=a(8),o=a.n(l),d=a(227),c=a.n(d),u=a(65),f=a.n(u),h=a(209),p=a.n(h),g=a(211),m=a(42),y=a(228),b=a.n(y),v=m.a.rhythm,S=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=f()(this,"props.data.site.siteMetadata.title"),t=f()(this,"props.data.allMarkdownRemark.edges"),a=[],i=[];t.map(function(e){var t=e.node,r=f()(t,"frontmatter.tags");r&&r.includes("case-study")?a.push(t):i.push(t)});var r=0;return n.a.createElement("div",{className:b.a.index},n.a.createElement(p.a,{title:e},n.a.createElement("html",{lang:"en"})),n.a.createElement(g.a,null),n.a.createElement("h1",null,"Blog"),i.map(function(e){r++;var t,a=f()(e,"frontmatter.title")||e.fields.slug,i=f()(e,"frontmatter.image")||null,s={height:v(13),paddingRight:r%2==0?"0em":v(1)};return t=i&&i.childImageSharp?n.a.createElement("div",null,n.a.createElement(c.a,{style:{margin:[v(.2),v(.25),v(.25-.2),0].join(" "),float:"left",height:v(4.5),minWidth:"50%"},fluid:i.childImageSharp.fluid}),n.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.excerpt}})):n.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.excerpt}}),n.a.createElement("div",{key:e.fields.slug,className:b.a.preview,style:s},n.a.createElement(o.a,{style:{boxShadow:"none"},to:e.fields.slug},n.a.createElement("h3",{style:{marginBottom:v(.25)}},a),n.a.createElement("small",null,e.frontmatter.date),n.a.createElement("div",{className:b.a.excerpt},t),n.a.createElement("p",{className:b.a.readMore},"…")))}))},t}(n.a.Component);t.default=S;var w="4126162606"},223:function(e,t,a){"use strict";var i=a(7),r=a(61)(!0);i(i.P,"Array",{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),a(64)("includes")},224:function(e,t,a){"use strict";var i=a(7),r=a(225);i(i.P+i.F*a(226)("includes"),"String",{includes:function(e){return!!~r(this,e,"includes").indexOf(e,arguments.length>1?arguments[1]:void 0)}})},225:function(e,t,a){var i=a(95),r=a(28);e.exports=function(e,t,a){if(i(t))throw TypeError("String#"+a+" doesn't accept regex!");return String(r(e))}},226:function(e,t,a){var i=a(4)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[i]=!1,!"/./"[e](t)}catch(e){}}return!0}},227:function(e,t,a){"use strict";var i=a(29);t.__esModule=!0,t.default=void 0;var r,s=i(a(5)),n=i(a(41)),l=i(a(93)),o=i(a(94)),d=i(a(0)),c=i(a(1)),u=function(e){var t=(0,o.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},h=function(e){var t=u(e),a=t.fluid?t.fluid.src:t.fixed.src;return!!f[a]||(f[a]=!0,!1)},p=[];var g=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){p.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),p.push([e,t])},m=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+a+"/>":"",r=e.srcSet?'<source srcSet="'+e.srcSet+'" '+a+"/>":"",s=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',l=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+i+r+"<img "+l+o+t+n+s+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=d.default.forwardRef(function(e,t){var a=e.style,i=e.onLoad,r=e.onError,s=(0,l.default)(e,["style","onLoad","onError"]);return d.default.createElement("img",(0,o.default)({},s,{onLoad:i,onError:r,ref:t,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))});y.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var b=function(e){function t(t){var a;a=e.call(this,t)||this;var i=!0,r=!0,s=!1,l=t.fadeIn,o=h(t);!o&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=!1,r=!1,s=!0),"undefined"==typeof window&&(i=!1,r=!1),t.critical&&(i=!0,r=!1,s=!1);var c=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:i,imgLoaded:r,IOSupported:s,fadeIn:l,hasNoScript:c,seenBefore:o},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)((0,n.default)(a))),a.handleRef=a.handleRef.bind((0,n.default)((0,n.default)(a))),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&g(e,function(){t.setState({isVisible:!0})})},a.handleImageLoaded=function(){this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,i=e.className,r=e.style,s=void 0===r?{}:r,n=e.imgStyle,l=void 0===n?{}:n,c=e.placeholderStyle,f=void 0===c?{}:c,h=e.fluid,p=e.fixed,g=e.backgroundColor,b=e.Tag,v="boolean"==typeof g?"lightgray":g,S=(0,o.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},l,f),w=(0,o.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},l);if(h){var E=h;return d.default.createElement(b,{className:(i||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden"},s),ref:this.handleRef,key:"fluid-"+JSON.stringify(E.srcSet)},d.default.createElement(b,{style:{width:"100%",paddingBottom:100/E.aspectRatio+"%"}}),E.base64&&d.default.createElement(y,{alt:this.state.isVisible?"":a,title:t,src:E.base64,style:S}),E.tracedSVG&&d.default.createElement(y,{alt:this.state.isVisible?"":a,title:t,src:E.tracedSVG,style:S}),v&&d.default.createElement(b,{title:t,style:{backgroundColor:v,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&d.default.createElement("picture",null,E.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:E.srcSetWebp,sizes:E.sizes}),d.default.createElement("source",{srcSet:E.srcSet,sizes:E.sizes}),d.default.createElement(y,{alt:a,title:t,src:E.src,style:w,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,o.default)({alt:a,title:t},E))}}))}if(p){var I=p,L=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:I.width,height:I.height},s);return"inherit"===s.display&&delete L.display,d.default.createElement(b,{className:(i||"")+" gatsby-image-wrapper",style:L,ref:this.handleRef,key:"fixed-"+JSON.stringify(I.srcSet)},I.base64&&d.default.createElement(y,{alt:this.state.isVisible?"":a,title:t,src:I.base64,style:S}),I.tracedSVG&&d.default.createElement(y,{alt:this.state.isVisible?"":a,title:t,src:I.tracedSVG,style:S}),v&&d.default.createElement(b,{title:t,style:{backgroundColor:v,width:I.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:I.height}}),this.state.isVisible&&d.default.createElement("picture",null,I.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:I.srcSetWebp,sizes:I.sizes}),d.default.createElement("source",{srcSet:I.srcSet,sizes:I.sizes}),d.default.createElement(y,{alt:a,title:t,width:I.width,height:I.height,src:I.src,style:w,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,o.default)({alt:a,title:t,width:I.width,height:I.height},I))}}))}return null},t}(d.default.Component);b.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var v=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string}),S=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string});b.propTypes={resolutions:v,sizes:S,fixed:v,fluid:S,fadeIn:c.default.bool,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,Tag:c.default.string};var w=b;t.default=w},228:function(e,t,a){e.exports={index:"blog-module--index--cp_H4",excerpt:"blog-module--excerpt--2Ki1J",readMore:"blog-module--readMore--3qzu9",preview:"blog-module--preview--1uC7p"}}}]);
//# sourceMappingURL=component---src-pages-index-js-d8bcddc900cb9636d7f5.js.map