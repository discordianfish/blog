(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{214:function(e,t,a){"use strict";a.r(t);a(92),a(93);var r=a(5),i=a.n(r),s=a(0),n=a.n(s),l=a(14),o=a.n(l),d=a(219),c=a.n(d),u=a(65),f=a.n(u),p=a(216),h=a.n(p),m=a(215),g=a(38),y=a(67),b=a.n(y),E=g.a.rhythm,S=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.posts,t=0;return e.map(function(e){t++;var a,r=f()(e,"frontmatter.title")||e.fields.slug,i=f()(e,"frontmatter.image")||null,s=f()(e,"frontmatter.imageWidth")||"50%",l={height:E(13),paddingRight:t%2==0?"0em":E(1)};return a=i&&i.childImageSharp?n.a.createElement("div",null,n.a.createElement(c.a,{style:{margin:[E(.2),E(.25),E(.25-.2),0].join(" "),float:"left",height:E(4.5),width:s},fluid:i.childImageSharp.fluid}),n.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.excerpt}})):n.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.excerpt}}),n.a.createElement("div",{key:e.fields.slug,className:b.a.preview,style:l},n.a.createElement(o.a,{style:{boxShadow:"none"},to:e.fields.slug},n.a.createElement("h3",{style:{marginBottom:E(.25)}},r),n.a.createElement("small",null,e.frontmatter.date),n.a.createElement("div",{className:b.a.excerpt},a),n.a.createElement("p",{className:b.a.readMore},"…")))})},t}(n.a.Component);a.d(t,"pageQuery",function(){return w});g.a.rhythm;var v=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=f()(this,"props.data.site.siteMetadata.title"),t=f()(this,"props.data.allMarkdownRemark.edges"),a=[],r=[];t.map(function(e){var t=e.node,i=f()(t,"frontmatter.tags");i&&i.includes("case-study")?a.push(t):i&&i.includes("hidden")||r.push(t)});return n.a.createElement("div",{className:b.a.index},n.a.createElement(h.a,{title:e},n.a.createElement("html",{lang:"en"})),n.a.createElement(m.a,null),n.a.createElement("h1",null,"Case Studies"),n.a.createElement(S,{posts:a}),n.a.createElement("h1",null,"Blog"),n.a.createElement(S,{posts:r}))},t}(n.a.Component),w=(t.default=v,"2334127377")},215:function(e,t,a){"use strict";var r=a(5),i=a.n(r),s=a(0),n=a.n(s),l=a(217),o=a.n(l),d=a(38),c=a(14),u=a.n(c),f=(a(210),d.a.rhythm),p=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){return n.a.createElement("div",{style:{display:"flex",marginBottom:f(2.5)}},n.a.createElement("img",{src:o.a,alt:"Johannes Ziemke",style:{marginRight:f(.5),marginBottom:0,width:f(2),height:f(2)}}),n.a.createElement("p",null,"By ",n.a.createElement("strong",null,"Johannes Ziemke"),"."," ",n.a.createElement("br",null),n.a.createElement("strong",null,n.a.createElement(u.a,{to:"/hire-me"},"Hire me")),".",n.a.createElement("br",null)),n.a.createElement("span",{style:{marginLeft:"auto"}},n.a.createElement("a",{href:"https://twitter.com/discordianfish"},n.a.createElement("i",{className:"icon-twitter"})),n.a.createElement("br",null),n.a.createElement("a",{href:"https://github.com/discordianfish"},n.a.createElement("i",{className:"icon-github-circled"})),n.a.createElement("br",null),n.a.createElement(u.a,{to:"/impressum"},"Impressum")))},t}(n.a.Component);t.a=p},217:function(e,t,a){e.exports=a.p+"static/profile-pic-48cfba6532f636655f0832025b69d3fd.jpg"},219:function(e,t,a){"use strict";var r=a(8);t.__esModule=!0,t.default=void 0;var i,s=r(a(5)),n=r(a(39)),l=r(a(90)),o=r(a(91)),d=r(a(0)),c=r(a(4)),u=function(e){var t=(0,o.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f=Object.create({}),p=function(e){var t=u(e),a=t.fluid?t.fluid.src:t.fixed.src;return f[a]||!1},h=new WeakMap;var m=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){if(h.has(e.target)){var t=h.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),h.delete(e.target),t())}})},{rootMargin:"200px"})),i);return a&&(a.observe(e),h.set(e,t)),function(){a.unobserve(e),h.delete(e)}},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSetWebp?"<source type='image/webp' srcset=\""+e.srcSetWebp+'" '+a+"/>":"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",s=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ';return"<picture>"+r+"<img "+(e.width?'width="'+e.width+'" ':"")+(e.height?'height="'+e.height+'" ':"")+a+i+t+n+s+(e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"")+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=d.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,s=e.style,n=e.onLoad,c=e.onError,u=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError"]);return d.default.createElement("img",(0,o.default)({sizes:a,srcSet:r,src:i},u,{onLoad:n,onError:c,ref:t,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},s)}))});y.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var b=function(e){function t(t){var a;a=e.call(this,t)||this;var r=!0,i=!1,s=t.fadeIn,l=p(t);!l&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=!1,i=!0),"undefined"==typeof window&&(r=!1),t.critical&&(r=!0,i=!1);var o=!(t.critical&&!t.fadeIn);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,IOSupported:i,fadeIn:s,hasNoScript:o,seenBefore:l},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)((0,n.default)(a))),a.handleRef=a.handleRef.bind((0,n.default)((0,n.default)(a))),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&(this.cleanUpListeners=m(e,function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=t.fluid?t.fluid.src:t.fixed.src,f[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,s=void 0===i?{}:i,n=e.imgStyle,l=void 0===n?{}:n,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,h=e.fluid,m=e.fixed,b=e.backgroundColor,E=e.durationFadeIn,S=e.Tag,v=e.itemProp,w=this.state.imgLoaded||!1===this.state.fadeIn,L=!0===this.state.fadeIn&&!this.state.imgCached,I=(0,o.default)({opacity:w?1:0,transition:L?"opacity "+E+"ms":"none"},l),R="boolean"==typeof b?"lightgray":b,z={transitionDelay:E+"ms"},N=(0,o.default)({opacity:this.state.imgLoaded?0:1},L&&z,l,f),O={title:t,alt:this.state.isVisible?"":a,style:N,className:p};if(h){var C=h;return d.default.createElement(S,{className:(r||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden"},s),ref:this.handleRef,key:"fluid-"+JSON.stringify(C.srcSet)},d.default.createElement(S,{style:{width:"100%",paddingBottom:100/C.aspectRatio+"%"}}),R&&d.default.createElement(S,{title:t,style:(0,o.default)({backgroundColor:R,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&z)}),C.base64&&d.default.createElement(y,(0,o.default)({src:C.base64},O)),C.tracedSVG&&d.default.createElement(y,(0,o.default)({src:C.tracedSVG},O)),this.state.isVisible&&d.default.createElement("picture",null,C.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:C.srcSetWebp,sizes:C.sizes}),d.default.createElement(y,{alt:a,title:t,sizes:C.sizes,src:C.src,crossOrigin:this.props.crossOrigin,srcSet:C.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,o.default)({alt:a,title:t},C))}}))}if(m){var k=m,x=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:k.width,height:k.height},s);return"inherit"===s.display&&delete x.display,d.default.createElement(S,{className:(r||"")+" gatsby-image-wrapper",style:x,ref:this.handleRef,key:"fixed-"+JSON.stringify(k.srcSet)},R&&d.default.createElement(S,{title:t,style:(0,o.default)({backgroundColor:R,width:k.width,opacity:this.state.imgLoaded?0:1,height:k.height},L&&z)}),k.base64&&d.default.createElement(y,(0,o.default)({src:k.base64},O)),k.tracedSVG&&d.default.createElement(y,(0,o.default)({src:k.tracedSVG},O)),this.state.isVisible&&d.default.createElement("picture",null,k.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:k.srcSetWebp,sizes:k.sizes}),d.default.createElement(y,{alt:a,title:t,width:k.width,height:k.height,sizes:k.sizes,src:k.src,crossOrigin:this.props.crossOrigin,srcSet:k.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,o.default)({alt:a,title:t},k))}}))}return null},t}(d.default.Component);b.defaultProps={critical:!1,fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div"};var E=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string}),S=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string});b.propTypes={resolutions:E,sizes:S,fixed:E,fluid:S,fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string};var v=b;t.default=v}}]);
//# sourceMappingURL=component---src-pages-index-js-abab903171be8064d22a.js.map