(function(){CATS.bb.ToolinfoView=CATS.bb.BaseView.extend({template:$("#toolinfoviewtemplate").html(),tagName:"div",className:"toolinfo viewbox",category:"tool",localizeid:"toolinfo",events:{"click .buttonexample":"showExample","click .explanationbutton":"explanationSection","click .linkbutton":"linkSection","click .coursebutton":"schoolSection","click .learnbutton":"learnTool","click .forgetbutton":"maybeForgetTool","click .forgetconfirmbutton":"forgetTool","click .killstacktabbutton":"killMeFromRoot"},learnTool:function(){CATS.school.learnTool(this.toolname);return this.updateSchool(this.toolname)},maybeForgetTool:function(){var deps;console.log("Before dep count",this.toolname);deps=CATS.school.countDeps(this.toolname);console.log("Ok, dep count for",this.toolname,"was",deps);if(!deps){return this.forgetTool()}else{this.ui.forgetconfirmbuttontext.html(this.getText(["ui","toolinfo","confirmforget"+(deps===1?"single":"multi"),CATS.settings.lang],true,false,true).replace("%NUM",CATS.texts.numberStr(deps,CATS.settings.lang)));this.$el.addClass("confirm");return this.timer=setTimeout(_.bind(function(){return this.$el.removeClass("confirm")},this),4e3)}},forgetTool:function(){CATS.school.forgetTool(this.toolname);this.updateSchool(this.toolname);delete this.timer;return this.$el.removeClass("confirm")},explanationSection:function(e){this.$el.removeClass("linksection schoolsection").addClass("explanationsection");this.ui.coursebutton.removeClass("active");this.ui.linkbutton.removeClass("active");this.ui.explanationbutton.addClass("active");return this.updateHelpLink("explanation")},linkSection:function(e){this.$el.removeClass("explanationsection schoolsection").addClass("linksection");this.ui.coursebutton.removeClass("active");this.ui.explanationbutton.removeClass("active");this.ui.linkbutton.addClass("active");return this.updateHelpLink("links")},schoolSection:function(e){this.$el.removeClass("explanationsection linksection").addClass("schoolsection");this.ui.linkbutton.removeClass("active");this.ui.explanationbutton.removeClass("active");this.ui.coursebutton.addClass("active");return this.updateHelpLink("school")},render:function(){this.localize();this.lessonLinkAware();this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(this.template);this.setUI("forgetconfirmbuttontext","nolesson","lessonbox","lessoninstructiontext","lessontrafficlight","operationtrafficlight","usesxinfo","nameparagraph","tuses","tusedby","beforecontainer","aftercontainer","associatedwordslist","linkbutton","explanationbutton","lessonlinkholder","instructiontext","lessonheadline","coursebutton","oppositebox","oppositelink");this.setUI("usedbyinfo","usedbynoneinfo","usedbysingleinfo","usesinfo","usesnoneinfo");this.localize();return this},showItem:function(toolname){var def,lang,line,list,tname,word,_i,_j,_len,_len1,_ref,_ref1,_ref2,_ref3;lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}this.toolname=toolname;this.def=def=CATS.math[toolname];this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(1)",this.ui.beforecontainer);this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(2)",this.ui.aftercontainer);this.explanationSection();_ref=["targets","returns","effect","explanation"];for(_i=0,_len=_ref.length;_i<_len;_i++){line=_ref[_i];this.setText("."+line+"paragraph",["tools",toolname,CATS.settings.lang,line])}if(def.info.uses){this.ui.tuses.html("<div class='davidlist'>"+function(){var _j,_len1,_ref1,_results;_ref1=def.info.uses;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){tname=_ref1[_j];_results.push(this.toolLink(tname))}return _results}.call(this).join("")+"</div>");this.ui.usesxinfo.show().html(this.ui.usesxinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.uses.length,lang)));this.ui.usesinfo.show().html(this.ui.usesinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.uses.length,lang)));this.ui.usesnoneinfo.hide()}else{this.ui.tuses.empty();this.ui.usesinfo.hide();this.ui.usesxinfo.hide();this.ui.usesnoneinfo.show()}if((_ref1=def.info.usedby)!=null?_ref1.length:void 0){this.ui.tusedby.html("<div class='davidlist'>"+function(){var _j,_len1,_ref2,_results;_ref2=def.info.usedby;_results=[];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){tname=_ref2[_j];_results.push(this.toolLink(tname))}return _results}.call(this).join("")+"</div>");this.ui.usedbynoneinfo.hide();if(def.info.usedby.length===1){this.ui.usedbyinfo.hide()}else{this.ui.usedbysingleinfo.hide();this.ui.usedbyinfo.show().html(this.ui.usedbyinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.usedby.length,lang)))}}else{this.ui.tusedby.empty();this.ui.usedbyinfo.hide();this.ui.usedbysingleinfo.hide();this.ui.usedbynoneinfo.show()}if(def.info.lesson){this.ui.lessonlinkholder.html(this.lessonLink(def.info.lesson));this.ui.nolesson.hide()}else{this.ui.lessonlinkholder.hide();this.ui.lessonbox.hide();this.ui.nolesson.show()}if(def.info.opposite){this.ui.oppositelink.append(this.toolLink(def.info.opposite))}else{this.ui.oppositebox.hide()}_ref2=def.info.tags;for(_j=0,_len1=_ref2.length;_j<_len1;_j++){word=_ref2[_j];if(!((_ref3=CATS.texts.links[word])!=null?_ref3.headline:void 0)){throw"MISSING LINK "+def.info.name+" ---- "+word}}list=function(){var _k,_len2,_ref4,_results;_ref4=def.info.tags;_results=[];for(_k=0,_len2=_ref4.length;_k<_len2;_k++){word=_ref4[_k];_results.push(this.wordLink(word))}return _results}.call(this);this.ui.associatedwordslist.html(list.join(" "));console.log("--- Showing tool ---",toolname);this.updateSchool(toolname);this.listenTo(Backbone,"learnedtool",this.maybeUpdateSchool);this.listenTo(Backbone,"forgottool",this.maybeUpdateSchool);this.listenTo(Backbone,"losttouchoftool",this.maybeUpdateSchool);this.listenTo(Backbone,"qualifiedtool",this.maybeUpdateSchool);return this},maybeUpdateSchool:function(toolname){if(this.toolname===toolname){return this.updateSchool(toolname)}},updateSchool:function(toolname){var colour,def,lang,left,lessoncolour,str;colour=CATS.school.getToolStatus(toolname);lang=CATS.settings.lang;def=CATS.math[this.toolname];this.$el.removeClass("toolinfored toolinfoyellow toolinfogreen");this.$el.addClass("toolinfo"+colour);this.setTitle(this.toolLink(toolname,lang,true));str="learninstruction"+colour+(def.info.uses?"complex":"basic");if(colour!=="green"&&def.info.circle){str+="circle";console.log("WE HAVE CIRCLE",this.toolname)}else{console.log("no circle for ",this.toolname)}if(colour==="yellow"&&def.info.uses&&!def.info.circle){str+=def.info.uses.length===2?2:"many"}this.ui.instructiontext.html(this.getText(["ui","toolinfo",str,lang]));if(def.info.uses){this.ui.instructiontext.html(this.ui.instructiontext.html().replace("%NUM",CATS.texts.numberStr(def.info.uses.length,lang)))}this.ui.operationtrafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic"+colour);if(this.def.info.lesson){lessoncolour=CATS.school.getLessonStatus(this.def.info.lesson);this.ui.lessontrafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic"+lessoncolour);left=CATS.school.remainingOpsInLesson(this.def.info.lesson);str="lesson"+lessoncolour+Math.min(colour==="green"?2:3,left)+(lessoncolour==="red"?colour==="green"?"yes":"no":"");this.ui.lessoninstructiontext.html(this.getText(["ui","toolinfo",str,lang]));if(left>=3){return this.ui.lessoninstructiontext.html(this.ui.lessoninstructiontext.html().replace("%NUM",CATS.texts.numberStr(left,lang)))}}},showExample:function(){var carrier,exampleinput,step;if(!this.def.info){console.log("WTF exempel utan info?!",this.toolname,this.def)}exampleinput=CATS.math.exampleInput(this.def.info.example);carrier=new CATS.math.Carrier({target:exampleinput.target});carrier["do"](this.toolname,"example",exampleinput);step=carrier.steps[0];step.because="toolexample";return this.$el.trigger("showcalcresult",{result:step})}})}).call(this);