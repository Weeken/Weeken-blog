(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"14FB":function(n,a,t){var e=t("sEG9");(n.exports=t("I1BE")(!1)).push([n.i,'\n@font-face {\n  font-family: "Lobster";\n  src: url('+e(t("vlkD"))+");\n  font-display: swap;\n}\n@-webkit-keyframes movedown-data-v-159aeb00 {\n0% {\n    -webkit-transform: translateY(200px);\n            transform: translateY(200px);\n    opacity: 0;\n}\n50% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n    opacity: 0;\n}\n100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n}\n}\n@keyframes movedown-data-v-159aeb00 {\n0% {\n    -webkit-transform: translateY(200px);\n            transform: translateY(200px);\n    opacity: 0;\n}\n50% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n    opacity: 0;\n}\n100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n}\n}\n@-webkit-keyframes moveup-data-v-159aeb00 {\n0% {\n    -webkit-transform: translateY(-200px);\n            transform: translateY(-200px);\n    opacity: 0;\n}\n50% {\n    -webkit-transform: translateY(-100px);\n            transform: translateY(-100px);\n    opacity: 0;\n}\n100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n}\n}\n@keyframes moveup-data-v-159aeb00 {\n0% {\n    -webkit-transform: translateY(-200px);\n            transform: translateY(-200px);\n    opacity: 0;\n}\n50% {\n    -webkit-transform: translateY(-100px);\n            transform: translateY(-100px);\n    opacity: 0;\n}\n100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n}\n}\n@-webkit-keyframes zoom-data-v-159aeb00 {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    -webkit-transform: scale(1.6);\n            transform: scale(1.6);\n}\n100% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n}\n@keyframes zoom-data-v-159aeb00 {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    -webkit-transform: scale(1.6);\n            transform: scale(1.6);\n}\n100% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n}\n.move_up[data-v-159aeb00] {\n  -webkit-animation: moveup-data-v-159aeb00 0.8s ease-in-out;\n          animation: moveup-data-v-159aeb00 0.8s ease-in-out;\n}\n.move_down[data-v-159aeb00] {\n  -webkit-animation: movedown-data-v-159aeb00 0.8s ease-in-out;\n          animation: movedown-data-v-159aeb00 0.8s ease-in-out;\n}\n.home_wrap[data-v-159aeb00] {\n  width: 100%;\n  height: 100%;\n  background-image: url("+e(t("htXT"))+");\n  background-size: cover;\n  position: relative;\n}\n.home_wrap #canvas[data-v-159aeb00] {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.home_wrap .content[data-v-159aeb00] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  color: #fff;\n}\n.home_wrap .content .avatar[data-v-159aeb00] {\n  position: absolute;\n  top: 30%;\n  left: 0;\n  width: 100%;\n  height: 120px;\n}\n.home_wrap .content .avatar .avatar_wrap[data-v-159aeb00] {\n  display: inline-block;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.home_wrap .content .avatar .avatar_wrap[data-v-159aeb00]:hover {\n  -webkit-transform: scale(1.3);\n      -ms-transform: scale(1.3);\n          transform: scale(1.3);\n  -webkit-animation: zoom-data-v-159aeb00 .3s;\n          animation: zoom-data-v-159aeb00 .3s;\n}\n.home_wrap .content .avatar .avatar_wrap > img[data-v-159aeb00] {\n  width: 100%;\n  height: 100%;\n}\n.home_wrap .content .welcome[data-v-159aeb00] {\n  position: absolute;\n  width: 100%;\n  height: 80px;\n  top: 44%;\n  font: 24px/80px Lobster;\n}\n.home_wrap .content .nav[data-v-159aeb00] {\n  position: absolute;\n  width: 100%;\n  height: 80px;\n  top: 50%;\n}\n.home_wrap .content .nav li[data-v-159aeb00] {\n  display: inline-block;\n  font: 20px/25px microsoft yahei;\n  margin: 30px 80px 30px 40px;\n  white-space: nowrap;\n  transition: all .2s linear;\n  border-bottom: 2px solid #fff;\n  width: 0px;\n}\n.home_wrap .content .nav li > a[data-v-159aeb00] {\n  color: #fff;\n  text-decoration: none;\n}\n.home_wrap .content .nav li[data-v-159aeb00]:hover {\n  width: 80px;\n  margin-right: 0px;\n}\n",""])},"8F7I":function(n,a,t){var e=t("14FB");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,t("SZ7m").default)("44cf6abd",e,!1,{})},JQq4:function(n,a,t){"use strict";var e=t("9rUL"),i=t.n(e),o=function(){var n=this.$createElement,a=this._self._c||n;return a("transition",{attrs:{name:"fade"},on:{"after-leave":this.handleAfterLeave}},[a("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"w_loading"},[a("div",{staticClass:"mask"},[a("div",{staticClass:"loader"},this._l(5,function(n){return a("div",{key:n,staticClass:"dot"})}))])])])};o._withStripped=!0;var r=t("JFUb"),s=!1;var l=function(n){s||t("hAFh")},d=Object(r.a)({name:"loading",data:function(){return{visible:!0}},methods:{handleAfterLeave:function(){this.$emit("after-leave")}}},o,[],!1,l,"data-v-69166ade",null);d.options.__file="src/components/loading/src/loading.vue";var c,m=d.exports,f=i.a.extend(m);f.prototype.hide=function(){var n=this;this.$on("after-leave",function(){n.$el&&n.$el.parentNode&&n.$el.parentNode.removeChild(n.$el),n.$destroy()}),this.visible=!1};var h=function(n){return n=n||{},c=new f({el:document.createElement("div"),data:n}),document.body.appendChild(c.$el),c.$el.style.zIndex="10000000",i.a.nextTick(function(){c.visible=!0}),c};a.a={install:function(n){n.prototype.$loading=h},show:h}},"PcR/":function(n,a,t){"use strict";t.r(a);var e,i=t("JQq4"),o=t("lwsE"),r=t.n(o),s=t("W8MJ"),l=t.n(s),d=function(){function n(a,t,e){r()(this,n),this.x=a,this.y=t,this.r=20*Math.random()+3,this._mx=2*Math.random()-1,this._my=2*Math.random()-1,this.alpha=e}return l()(n,[{key:"drawCircle",value:function(n){var a=window.devicePixelRatio||1;n.scale(a,a),n.globalAlpha=this.alpha,n.beginPath(),n.arc(this.x,this.y,this.r,0,360),n.closePath(),n.fillStyle="rgba(204, 204, 204, .3)",n.fill()}},{key:"drawLine",value:function(n,a){var t=this.x-a.x,e=this.y-a.y;Math.sqrt(t*t+e*e)<150&&(n.beginPath(),n.moveTo(this.x,this.y),n.lineTo(a.x,a.y),n.closePath(),n.strokeStyle="rgba(204, 204, 204, 0.1)",n.stroke())}},{key:"move",value:function(n,a){this._mx=this.x+this.r<n&&this.x-this.r>0?this._mx:-this._mx,this._my=this.y+this.r<a&&this.y-this.r>0?this._my:-this._my,this.x+=this._mx/2,this.y+=this._my/2}}]),n}();window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var c={name:"Home",data:function(){return{tabs:[{path:"/memo",name:"我的便笺"},{path:"/note",name:"我的笔记"},{path:"/about",name:"有关于我"}]}},computed:{cvs:function(){return this.$refs.cvs},bg:function(){return this.$refs.bg}},methods:{preloadImg:function(){var n=this.bg.currentStyle||window.getComputedStyle(this.bg,!1),a=new Image;a.src=n.backgroundImage.slice(4,-1).replace(/"/g,""),a.complete?setTimeout(function(){e&&e.hide()},50):(a.onerror=function(){e&&e.hide()},a.onload=function(){e&&e.hide()})}},created:function(){e=i.a.show()},mounted:function(){var n=this.cvs,a=n.getContext("2d"),t=n.width=window.innerWidth,e=n.height=window.innerHeight,i=[];!function(n){for(var o=0;o<n;o++)i.push(new d(Math.random()*t,Math.random()*e,Math.random()/2));!function n(){a.clearRect(0,0,t,e),i.map(function(n){n.move(t,e),n.drawCircle(a)}),window.requestAnimationFrame(n)}()}(90),this.preloadImg()}},m=function(){var n=this,a=n.$createElement,t=n._self._c||a;return t("div",{ref:"bg",staticClass:"home_wrap"},[t("canvas",{ref:"cvs",attrs:{id:"canvas"}}),n._v(" "),t("div",{staticClass:"content"},[n._m(0),n._v(" "),t("div",{staticClass:"welcome move_up"},[n._v("If you have great talents, industry will improve them; if you have but moderate abilities, industry will supply their deficiency.")]),n._v(" "),t("div",{staticClass:"nav move_up"},[t("ul",n._l(n.tabs,function(a){return t("li",{key:a.path},[t("router-link",{attrs:{to:a.path}},[n._v(n._s(a.name))])],1)}))])])])},f=[function(){var n=this.$createElement,a=this._self._c||n;return a("div",{staticClass:"avatar move_down"},[a("div",{staticClass:"avatar_wrap"},[a("img",{attrs:{src:t("kV7A"),alt:"avatar"}})])])}];m._withStripped=!0;var h=t("JFUb"),v=!1;var p=function(n){v||t("8F7I")},b=Object(h.a)(c,m,f,!1,p,"data-v-159aeb00",null);b.options.__file="src/pages/noTab/home/home.vue";a.default=b.exports},hAFh:function(n,a,t){var e=t("xXWO");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);(0,t("SZ7m").default)("432fd427",e,!1,{})},htXT:function(n,a,t){n.exports=t.p+"images/bg.jpg"},kV7A:function(n,a,t){n.exports=t.p+"images/avatar.jpg"},vlkD:function(n,a,t){n.exports=t.p+"fonts/DancingScript-Bold.69cb5ff.ttf"},xXWO:function(n,a,t){(n.exports=t("I1BE")(!1)).push([n.i,"\n.w_loading[data-v-69166ade]{\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\n.w_loading .mask[data-v-69166ade]{\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n}\n.w_loading .mask .loader[data-v-69166ade] {\n  position: absolute;\n  top: 50%;\n  left: 40%;\n  margin-left: 10%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n}\n.w_loading .mask .loader .dot[data-v-69166ade] {\n  width: 24px;\n  height: 24px;\n  background: #3ac;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: slide-data-v-69166ade 1s infinite;\n          animation: slide-data-v-69166ade 1s infinite;\n}\n.w_loading .mask .loader .dot[data-v-69166ade]:nth-child(1) {\n  -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n  background: #32aacc;\n}\n.w_loading .mask .loader .dot[data-v-69166ade]:nth-child(2) {\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n  background: #64aacc;\n}\n.w_loading .mask .loader .dot[data-v-69166ade]:nth-child(3) {\n  -webkit-animation-delay: 0.3s;\n          animation-delay: 0.3s;\n  background: #96aacc;\n}\n.w_loading .mask .loader .dot[data-v-69166ade]:nth-child(4) {\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n  background: #c8aacc;\n}\n.w_loading .mask .loader .dot[data-v-69166ade]:nth-child(5) {\n  -webkit-animation-delay: 0.5s;\n          animation-delay: 0.5s;\n  background: #faaacc;\n}\n\n/*过渡效果*/\n.fade-enter-active[data-v-69166ade], .fade-leave-active[data-v-69166ade] {\n  transition: opacity .2s ease;\n}\n.fade-enter[data-v-69166ade], .fade-leave-active[data-v-69166ade] {\n  opacity: 0\n}\n.bounce-enter-active[data-v-69166ade] {\n  -webkit-animation: bounce-in-data-v-69166ade .2s;\n          animation: bounce-in-data-v-69166ade .2s;\n}\n.bounce-leave-active[data-v-69166ade] {\n  -webkit-animation: bounce-out-data-v-69166ade .2s;\n          animation: bounce-out-data-v-69166ade .2s;\n}\n@-webkit-keyframes bounce-in-data-v-69166ade {\n0% { -webkit-transform: scale(0); transform: scale(0);\n}\n50% { -webkit-transform: scale(1.2); transform: scale(1.2);\n}\n100% { -webkit-transform: scale(1); transform: scale(1);\n}\n}\n@keyframes bounce-in-data-v-69166ade {\n0% { -webkit-transform: scale(0); transform: scale(0);\n}\n50% { -webkit-transform: scale(1.2); transform: scale(1.2);\n}\n100% { -webkit-transform: scale(1); transform: scale(1);\n}\n}\n@-webkit-keyframes bounce-out-data-v-69166ade {\n0% { -webkit-transform: scale(1); transform: scale(1);\n}\n50% { -webkit-transform: scale(1.2); transform: scale(1.2);\n}\n100% { -webkit-transform: scale(0); transform: scale(0);\n}\n}\n@keyframes bounce-out-data-v-69166ade {\n0% { -webkit-transform: scale(1); transform: scale(1);\n}\n50% { -webkit-transform: scale(1.2); transform: scale(1.2);\n}\n100% { -webkit-transform: scale(0); transform: scale(0);\n}\n}\n@-webkit-keyframes slide-data-v-69166ade {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    opacity: 0.3;\n    -webkit-transform: scale(2);\n            transform: scale(2);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n@keyframes slide-data-v-69166ade {\n0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n50% {\n    opacity: 0.3;\n    -webkit-transform: scale(2);\n            transform: scale(2);\n}\n100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n}\n",""])}}]);