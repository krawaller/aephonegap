(function(){var examples;examples=typeof require==="undefined"?this.CATS.texts.examples:require("../app/texts_examples");CATS.bb.ParserView=CATS.bb.RootView.extend({template:$("#parsertemplate").html(),localizeid:"parser",category:"calc",events:{"click .buttoncalculate":"enterMath","focus .textfield":"focusTextField","keyup .textfield":"inputKeypress","click .cancelbutton":"cancelInputView","click .calcbutton":"enterMath","click .textclearerbtn":"clearInput","click .expressionsbutton":"showExpressions"},showExpressions:function(){return Backbone.trigger("modal","expressions")},className:"parserview viewbox",clearInput:function(e){var me;if(this.ui.textfield.val()){me=this;setTimeout(function(){me.ui.textfield.val("").focus();me.$el.removeClass("notempty");return me.analyzeMathEntry("")},200)}e.preventDefault();return false},updateClearBtn:function(){return this.$el[this.ui.textfield.val()===""?"removeClass":"addClass"]("notempty")},cancelInputView:function(e){},analyzeMathEntry:function(txt,force){var me;me=this;if(force){this.analyzeMathEntryDo(txt)}if(txt!==this.before){this.before=txt;clearTimeout(this.timeout);return this.timeout=setTimeout(function(){return me.analyzeMathEntryDo(txt)},200)}},analyzeMathEntryDo:function(txt){var e,err,lang,mathml,o;console.log("MATHENTRY",txt);try{o=CATS.app.parseExpression(txt,CATS.settings);mathml=CATS.app.mathmlprinter(o,[],[],true,CATS.settings,true);lang=CATS.settings.lang;this.ui.math.empty();if(o.type==="void"){return this.ui.description.html(CATS.texts.processText(CATS.texts.ui.mathview.noentry[lang],lang))}else{this.ui.math.html(mathml);this.typeset(this.ui.math);this.ui.description.html(CATS.texts.ui.mathview.enteredbeginning[lang]+" "+CATS.texts.processText(CATS.texts.describe(o,lang),lang));err=CATS.app.check(o);if(err&&err[0]==="noparse"){return this.setError(err[0],err[1])}else{if(this.showingerror){this.showingerror=false;clearTimeout(this.errortimeout);return this.ui.errormsg.fadeOut("fast")}}}}catch(_error){e=_error;this.cancelInputView();console.log("Analysis ERROR, sending to raven",e);Backbone.trigger("modal","reporttext",{why:"analysiserror",str:txt});Raven.captureException(e);throw e}},focusTextField:function(){var me;this.ui.errormsg.hide();Backbone.trigger("focusTextField");this.analyzeMathEntry(this.ui.textfield.val());this.beforetext=this.ui.textfield.val();this.updateClearBtn();me=this;setTimeout(function(){var _base;return typeof(_base=me.ui.textfield.get(0)).select==="function"?_base.select():void 0});return CATS.parser=true},blurFix:function(){return CATS.parser=false},initialize:function(o){var def,headline,list,name,x,_i,_len;this.instruction=(o!=null?o.instruction:void 0)||"enterexpressiontosimplify";_.bind(this.cancelInputView,this);_.bind(this.analyzeMathEntryDo,this);_.bind(this.doMath,this);this.listenTo(Backbone,"inputparsertext",this.remoteInput);this.listenTo(Backbone,"blurTextField",this.blurFix);this.listenTo(Backbone,"modal",this.blurField);this.constructor.__super__.initialize.apply(this,arguments);this.examples={};for(headline in examples){def=examples[headline];for(name in def){list=def[name];if(!(name!=="headline")){continue}console.log("BUILDING",headline,name,list);for(_i=0,_len=list.length;_i<_len;_i++){x=list[_i];this.examples[x]=true}}}console.log("DID ALL EXAMPLES",this.examples);CATS.history=JSON.parse(localStorage.getItem("ALGEBRAEXPLORERCALCHIST")||JSON.stringify({all:{}}));return Backbone.trigger("newcalc")},blurField:function(){return this.ui.textfield.blur()},setHistory:function(str){var datestr,now;if(!this.examples[str]&&!CATS.history.all[str]){now=new Date;datestr=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();if(!CATS.history[datestr]){CATS.history[datestr]=[]}CATS.history[datestr].push(str);CATS.history.all[str]=true;localStorage.setItem("ALGEBRAEXPLORERCALCHIST",JSON.stringify(CATS.history));return Backbone.trigger("updatedhistory")}},render:function(){this.setContent(this.template);this.setTitle("parserheadline",true);this.setUI("parserinput","textfield","errormsg","math","struct","cancelbutton","calcbutton","description","newcalcbutton");this.localize();return this},localizeSpecial:function(){this.ui.textfield.attr("placeholder",CATS.texts.ui.parser.inputplaceholder[CATS.settings.lang]);console.log("LOCSPEC",CATS.settings.lang);this.analyzeMathEntry(this.ui.textfield.val(),true);this.old=this.ui.calcbutton.html();return this},remoteInput:function(text,source){this.ui.textfield.val(text);console.log("REMOTE INPUT",text,source,this.ui.textfield,this.ui.textfield.val());return this.focusTextField()},setError:function(errorid,errordata){var me;console.log("SETTING ERROR",errorid,this.ui.errormsg);this.ui.errormsg.html(this.getText(["ui","parser","error"+errorid,CATS.settings.lang],true,false,true)+(errordata?" '"+errordata+"'":""));if(this.showingerror){clearTimeout(this.errortimeout)}else{this.showingerror=true;this.ui.errormsg.fadeIn("fast")}me=this;return this.errortimeout=setTimeout(function(){me.showingerror=false;return me.ui.errormsg.fadeOut("fast")},2e3)},inputKeypress:function(e){console.log("KKKKK",e.keyCode,e.charCode);if(e.keyCode===13){return this.enterMath()}else{this.updateClearBtn();return this.analyzeMathEntry(this.ui.textfield.val())}},enterMath:function(e,source){var error,me,o,obj,str;this.ui.calcbutton.blur();this.ui.errormsg.empty();str=this.ui.textfield.val();if(str===""){console.log("WHAT THE EFFF",this.ui.textfield);return this.setError("empty")}else{obj=CATS.app.parseExpression(str,CATS.settings);this.lastentry=str;error=CATS.app.check(obj);if(error){console.log("ERROR",error);return this.setError(error[0],error[1])}else{this.old=this.ui.calcbutton.html();this.ui.calcbutton.css("min-width",this.ui.calcbutton.outerWidth());this.ui.calcbutton.html(this.getLoadingHTML());this.ui.calcbutton.addClass("disabled");o=new CATS.math.Carrier({target:obj});o.simplifiers=CATS.math.simplifiers;me=this;return setTimeout(function(){return me.doMath(o,source,str,true)},50)}}},doMath:function(o,source,str,byuser){var calcerror,e,me,result,_ref;try{result=CATS.math.simplifyAndDecimalify(o,CATS.math);console.log("DID SIMPLDEC",result)}catch(_error){e=_error;this.cancelInputView();console.log("CALC ERROR, sending to raven",e);Backbone.trigger("modal","reporttext",{why:"calcerror",str:str});Raven.captureException(e);this.ui.calcbutton.html(this.old);this.ui.calcbutton.removeClass("disabled");throw e;calcerror=e}if(calcerror){this.ui.calcbutton.html(this.old);this.ui.calcbutton.removeClass("disabled");return this.setError("calc",calcerror)}else if(result.toshow==="none"){this.ui.calcbutton.html(this.old);this.ui.calcbutton.removeClass("disabled");return this.setError("cannotsimplify")}else{if(byuser){this.setHistory(str)}if(result.toshow==="onlysimpl"){result=result.simpl}if(result.toshow==="onlydec"){result=result.dec}if((_ref=result.because)==null){result.because=result.who||source}result.inputstring=str;console.log("TOSHOW",result);this.ui.calcbutton.html(this.old);this.ui.calcbutton.removeClass("disabled");me=this;if(result.toshow==="both"){return setTimeout(function(){return me.$el.trigger("showcalcresult",{result:result.simpl,dec:result.dec})},10)}else{return setTimeout(function(){return me.$el.trigger("showcalcresult",{result:result})},10)}}}})}).call(this);