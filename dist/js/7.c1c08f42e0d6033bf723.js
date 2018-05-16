(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7o3r":function(t,e,r){"use strict";r.r(e);var o,n=r("wSGE"),i=r.n(n),a=r("o0o1"),s=r.n(a),l=r("yXPU"),c=r.n(l),m=r("ta7f"),u={name:"login",data:function(){return{userInfo:{},loginForm:{email:"",password:""}}},validations:{loginForm:{email:{required:m.required,email:m.email},password:{required:m.required,minLength:Object(m.minLength)(6)}}},methods:{login:(o=c()(s.a.mark(function t(){var e;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$http.login(this.loginForm);case 2:(e=t.sent)&&(this.Alert.success(e.message),this.$storage.setItem("user",e.data),this.userInfo=e.data,this.logined(),this.closeLogin());case 4:case"end":return t.stop()}},t,this)})),function(){return o.apply(this,arguments)}),closeLogin:function(){this.$emit("close","Login")},logined:function(){this.$emit("isLogin",this.userInfo)},gotoRegister:function(){this.$emit("goto","Register")}}},p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"user_mask",on:{click:function(e){return e.target!==e.currentTarget?null:t.closeLogin(e)}}},[r("form",{staticClass:"form"},[r("h3",[t._v("登  录")]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.loginForm.email,expression:"loginForm.email",modifiers:{trim:!0}}],attrs:{type:"email",placeholder:"邮箱"},domProps:{value:t.loginForm.email},on:{blur:[function(e){t.$v.loginForm.email.$touch()},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.loginForm,"email",e.target.value.trim())}}}),t._v(" "),r("span",[t._v("邮箱")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.loginForm.email.$dirty&&!t.$v.loginForm.email.required?r("li",{key:"null"},[t._v("请输入邮箱地址")]):t._e(),t._v(" "),t.$v.loginForm.email.$dirty&&!t.$v.loginForm.email.email?r("li",{key:"error"},[t._v("请输入正确的邮箱地址")]):t._e()])]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.loginForm.password,expression:"loginForm.password",modifiers:{trim:!0}}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.loginForm.password},on:{blur:[function(e){t.$v.loginForm.password.$touch()},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.loginForm,"password",e.target.value.trim())}}}),t._v(" "),r("span",[t._v("密码")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.loginForm.password.$dirty&&!t.$v.loginForm.password.required?r("li",[t._v("请输入密码")]):t._e(),t._v(" "),t.$v.loginForm.password.$dirty&&!t.$v.loginForm.password.minLength?r("li",[t._v("密码至少6个字符")]):t._e()])]),t._v(" "),r("button",{staticClass:"submit",attrs:{disabled:t.$v.loginForm.$invalid},on:{click:function(e){return e.preventDefault(),t.login(e)}}},[t._v("立即登录")]),t._v(" "),r("div",{staticClass:"form_bottom",on:{click:t.gotoRegister}},[t._v("未有账号，注册")])])])};p._withStripped=!0;var v=r("JFUb"),d=Object(v.a)(u,p,[],!1,null,null,null);d.options.__file="src/components/login.vue";var g,f=d.exports,h={name:"register",data:function(){return{registerForm:{email:"",name:"",password:"",repeatPassword:""}}},validations:{registerForm:{email:{required:m.required,email:m.email},name:{required:m.required},password:{required:m.required,minLength:Object(m.minLength)(6)},repeatPassword:{required:m.required,sameAsPassword:Object(m.sameAs)("password")}}},methods:{register:(g=c()(s.a.mark(function t(){var e;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$http.register(this.registerForm);case 2:(e=t.sent)&&(this.Alert.success(e.message),this.gotoLogin());case 4:case"end":return t.stop()}},t,this)})),function(){return g.apply(this,arguments)}),closeRegister:function(){this.$emit("close","Register")},gotoLogin:function(){this.$emit("goto","Login")}}},_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"user_mask",on:{click:function(e){return e.target!==e.currentTarget?null:t.closeRegister(e)}}},[r("form",{staticClass:"form"},[r("h3",[t._v("注  册")]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.email,expression:"registerForm.email",modifiers:{trim:!0}}],attrs:{type:"email",placeholder:"邮箱"},domProps:{value:t.registerForm.email},on:{blur:[function(e){t.$v.registerForm.email.$touch()},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.registerForm,"email",e.target.value.trim())}}}),t._v(" "),r("span",[t._v("邮箱")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.registerForm.email.$dirty&&!t.$v.registerForm.email.required?r("li",[t._v("请输入邮箱地址")]):t._e(),t._v(" "),t.$v.registerForm.email.$dirty&&!t.$v.registerForm.email.email?r("li",[t._v("请输入正确的邮箱地址")]):t._e()])]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.name,expression:"registerForm.name",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"昵称"},domProps:{value:t.registerForm.name},on:{input:[function(e){e.target.composing||t.$set(t.registerForm,"name",e.target.value.trim())},function(e){t.$v.registerForm.name.$touch()}],blur:function(e){t.$forceUpdate()}}}),t._v(" "),r("span",[t._v("昵称")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.registerForm.name.$dirty&&!t.$v.registerForm.name.required?r("li",[t._v("请输入昵称")]):t._e()])]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.password,expression:"registerForm.password",modifiers:{trim:!0}}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.registerForm.password},on:{blur:[function(e){t.$v.registerForm.password.$touch()},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.registerForm,"password",e.target.value.trim())}}}),t._v(" "),r("span",[t._v("密码")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.registerForm.password.$dirty&&!t.$v.registerForm.password.required?r("li",[t._v("请输入密码")]):t._e(),t._v(" "),t.$v.registerForm.password.$dirty&&!t.$v.registerForm.password.minLength?r("li",[t._v("密码至少6个字符")]):t._e()])]),t._v(" "),r("div",{staticClass:"field"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.repeatPassword,expression:"registerForm.repeatPassword",modifiers:{trim:!0}}],attrs:{type:"password",placeholder:"确认密码"},domProps:{value:t.registerForm.repeatPassword},on:{blur:[function(e){t.$v.registerForm.repeatPassword.$touch()},function(e){t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.registerForm,"repeatPassword",e.target.value.trim())}}}),t._v(" "),r("span",[t._v("确认密码")]),t._v(" "),r("ul",{staticClass:"noti_list"},[t.$v.registerForm.repeatPassword.$dirty&&!t.$v.registerForm.repeatPassword.required?r("li",[t._v("请输入密码")]):t._e(),t._v(" "),t.$v.registerForm.repeatPassword.$dirty&&!t.$v.registerForm.repeatPassword.sameAsPassword?r("li",[t._v("两次密码输入不一致")]):t._e()])]),t._v(" "),r("button",{staticClass:"submit",attrs:{disabled:t.$v.registerForm.$invalid},on:{click:function(e){return e.preventDefault(),t.register(e)}}},[t._v("立即注册")]),t._v(" "),r("div",{staticClass:"form_bottom",on:{click:t.gotoLogin}},[t._v("已有账号，去登录")])])])};_._withStripped=!0;var w=Object(v.a)(h,_,[],!1,null,null,null);w.options.__file="src/components/register.vue";var $=w.exports,x={name:"backToTop",data:function(){return{}},methods:{scrollToTop:function(){var t=setInterval(function(){var e=document.querySelector("#view"),r=e.scrollTop,o=Math.floor(-r/5);e.scrollTop=r+o,0===r&&clearInterval(t)},30)}}},F=function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"top_wrap",on:{click:this.scrollToTop}})};F._withStripped=!0;var b=!1;var k=function(t){b||r("K18l")},y=Object(v.a)(x,F,[],!1,k,"data-v-4e63a812",null);y.options.__file="src/components/backToTop/backToTop.vue";var C={name:"Navigator",components:{BackToTop:y.exports,Login:f,Register:$},data:function(){return{isLogin:!1,showLogin:!1,showRegister:!1,avatar:"",showBackToTop:!1,tabs:[{path:"/memo",name:"便笺"},{path:"/note",name:"笔记"},{path:"/about",name:"关于"}],user:{}}},methods:{closeForm:function(t){this["show".concat(t)]=!1},goTo:function(t){this.showLogin=!1,this.showRegister=!1,this["show".concat(t)]=!0},gotoUserInfo:function(){this.user?this.$router.push({path:"/user"}):this.goTo("Login")},checkLogin:function(t){this.user=t,location.reload()},logout:function(){location.reload()}},created:function(){var t=this.$storage.getItem("user");t&&(this.user=t)},mounted:function(){var t=this;this.avatar=i.a;var e=document.querySelector("#view");e.onscroll=function(){var r=e.scrollTop;t.showBackToTop=r>=800}}},L=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"body"},[r("div",{staticClass:"nav clear"},[r("div",{staticClass:"logo"},[r("router-link",{attrs:{to:"/home"}},[t._v("Weeken")])],1),t._v(" "),r("ul",t._l(t.tabs,function(e){return r("li",{key:e.path},[r("router-link",{class:t.$route.path.includes(e.path)?"router-link-active":"",attrs:{to:e.path}},[t._v(t._s(e.name))])],1)})),t._v(" "),t.user.id?r("div",{staticClass:"user clear"},[r("div",{staticClass:"avatar",on:{click:t.gotoUserInfo}},[r("img",{attrs:{src:t.user.avatar||t.avatar,alt:""}})]),t._v(" "),r("div",{staticClass:"user_info"},[r("p",{staticClass:"name"},[t._v(t._s(t.user.name))]),t._v(" "),r("p",{staticClass:"type"},[t._v(t._s(t.user.type))])])]):r("div",{staticClass:"operation"},[r("p",{staticClass:"name",on:{click:function(e){t.showLogin=!0}}},[t._v("登 录")]),t._v(" "),r("p",{staticClass:"type",on:{click:function(e){t.showRegister=!0}}},[t._v("注 册")])])]),t._v(" "),r("transition",{attrs:{name:"backToTop",mode:"out-in"}},[t.showBackToTop?r("back-to-top"):t._e()],1),t._v(" "),r("div",{staticClass:"view",attrs:{id:"view"}},[r("transition",{attrs:{name:"fade",mode:"out-in"}},[r("router-view",{attrs:{"user-info":t.user},on:{logout:t.logout}})],1)],1),t._v(" "),r("transition",{attrs:{name:"fade",mode:"out-in"}},[t.showLogin?r("login",{on:{close:t.closeForm,goto:t.goTo,isLogin:t.checkLogin}}):t._e(),t._v(" "),t.showRegister?r("register",{on:{close:t.closeForm,goto:t.goTo}}):t._e()],1)],1)};L._withStripped=!0;var T=!1;var q=function(t){T||r("VtVc")},P=Object(v.a)(C,L,[],!1,q,"data-v-c2702212",null);P.options.__file="src/components/navigator.vue";e.default=P.exports},"8VKa":function(t,e,r){var o=r("sEG9");(t.exports=r("I1BE")(!1)).push([t.i,'\n@font-face {\n  font-family: "arrow";\n  src: url('+o(r("pnPu"))+");\n  font-display: swap;\n}\n.top_wrap[data-v-4e63a812] {\n  position: fixed;\n  right: 30px;\n  bottom: 50px;\n  width: 40px;\n  height: 40px;\n  z-index: 200000;\n  border-radius: 50%;\n  color: #aaa;\n  background-color: #fff;\n  opacity: .6;\n  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);\n  font: 18px/40px arrow;\n  text-align: center;\n  cursor: pointer;\n  transition: all .4s ease;\n}\n.top_wrap[data-v-4e63a812]:before {\n  content: '\\EA3A';\n}\n",""])},"Ds+8":function(t,e,r){t.exports=r.p+"fonts/Lobster-Regular.c61b048.ttf"},K18l:function(t,e,r){var o=r("8VKa");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,r("SZ7m").default)("03337352",o,!1,{})},VtVc:function(t,e,r){var o=r("ksqA");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,r("SZ7m").default)("d2062b34",o,!1,{})},ksqA:function(t,e,r){var o=r("sEG9");(t.exports=r("I1BE")(!1)).push([t.i,'\n@font-face {\n  font-family: "Lobster";\n  src: url('+o(r("Ds+8"))+");\n  font-display: swap;\n}\n.body[data-v-c2702212] {\n  width: 100%;\n  height: 100%;\n}\n.nav[data-v-c2702212] {\n  background: #2196f3;\n  height: 70px;\n  width: 100%;\n  padding: 0 40px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n}\n.nav .logo[data-v-c2702212] {\n  width: 90px;\n  float: left;\n  transition: all .2s linear;\n}\n.nav .logo[data-v-c2702212]:hover {\n  -webkit-transform: scale(1.2);\n      -ms-transform: scale(1.2);\n          transform: scale(1.2);\n}\n.nav .logo > a[data-v-c2702212] {\n  width: 90px;\n  font: 28px/70px Lobster;\n  font-family: Lobster !important;\n  color: #fff;\n}\n.nav ul[data-v-c2702212] {\n  float: left;\n  margin-left: 30px;\n}\n.nav ul li[data-v-c2702212] {\n  display: inline-block;\n  float: left;\n  width: 60px;\n  line-height: 70px;\n  margin: 0 20px;\n  white-space: nowrap;\n}\n.nav ul li > a[data-v-c2702212] {\n  display: block;\n  height: 100%;\n  font: 700 20px/70px microsoft yahei;\n  letter-spacing: 5px;\n  color: rgba(255, 255, 255, 0.6);\n  text-align: center;\n  transition: all .2s linear;\n}\n.nav ul li > a[data-v-c2702212]:hover {\n  color: rgba(255, 255, 255, 0.8);\n}\n.nav ul li > a.router-link-active[data-v-c2702212] {\n  color: #fff;\n  font-size: 26px;\n}\n.nav .user[data-v-c2702212] {\n  float: right;\n  height: 100%;\n}\n.nav .user .avatar[data-v-c2702212] {\n  float: left;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  overflow: hidden;\n  background-color: #eee;\n  margin-top: 10px;\n  margin-right: 20px;\n  cursor: pointer;\n}\n.nav .user .avatar > img[data-v-c2702212] {\n  width: 100%;\n  height: 100%;\n}\n.nav .user .user_info[data-v-c2702212] {\n  float: left;\n  height: 50px;\n  margin-top: 10px;\n}\n.nav .user .user_info > p[data-v-c2702212] {\n  font: 12px/25px microsoft yahei;\n  color: #fff;\n}\n.nav .operation[data-v-c2702212] {\n  float: right;\n  height: 50px;\n  margin-top: 10px;\n}\n.nav .operation > p[data-v-c2702212] {\n  font: 12px/25px microsoft yahei;\n  color: #fff;\n  cursor: pointer;\n}\n.nav .operation > p[data-v-c2702212]:hover {\n  text-decoration: underline;\n}\n.view[data-v-c2702212] {\n  position: fixed;\n  top: 70px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: scroll;\n}\n",""])},pnPu:function(t,e,r){t.exports=r.p+"fonts/arrow.4124ad8.woff"},wSGE:function(t,e,r){t.exports=r.p+"images/user.png"}}]);