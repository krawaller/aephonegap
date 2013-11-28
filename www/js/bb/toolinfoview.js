(function(){CATS.bb.ToolinfoView=CATS.bb.BaseView.extend({template:$("#toolinfoviewtemplate").html(),tagName:"div",className:"toolinfo davidmodalcontent",localizeid:"toolinfo",events:{"click .buttonexample":"showExample","click .explanationbutton":"explanationSection","click .linkbutton":"linkSection","click .coursebutton":"schoolSection","click .learnbutton":"learnTool","click .forgetbutton":"forgetTool","click .killstacktabbutton":"killMeFromRoot"},learnTool:function(){CATS.school.learnTool(this.toolname);return this.updateSchool(this.toolname)},forgetTool:function(){var deps;deps=CATS.school.countDeps(this.toolname);if(!deps||confirm(this.getText(["ui","toolinfo","confirmforget"+(deps===1?"single":"multi"),CATS.settings.lang],true,false,true).replace("%s",CATS.texts.numberStr(deps,CATS.settings.lang)))){CATS.school.forgetTool(this.toolname);return this.updateSchool(this.toolname)}},explanationSection:function(e){this.$el.removeClass("linksection schoolsection").addClass("explanationsection");this.ui.coursebutton.removeClass("active");this.ui.linkbutton.removeClass("active");return this.ui.explanationbutton.addClass("active")},linkSection:function(e){this.$el.removeClass("explanationsection schoolsection").addClass("linksection");this.ui.coursebutton.removeClass("active");this.ui.explanationbutton.removeClass("active");return this.ui.linkbutton.addClass("active")},schoolSection:function(e){this.$el.removeClass("explanationsection linksection").addClass("schoolsection");this.ui.linkbutton.removeClass("active");this.ui.explanationbutton.removeClass("active");return this.ui.coursebutton.addClass("active")},render:function(){this.$el.html("<p class='picktool centerbox'></p>");this.localize();this.lessonLinkAware();this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.$el.html(this.template);this.setUI("nameparagraph","tuses","tusedby","beforecontainer","aftercontainer","associatedwordslist","linkbutton","explanationbutton","lessonholder","instructionholder","lessonheadline","coursebutton");this.setUIprocessTexts("usedbyinfo","usedbynoneinfo","usesinfo","usesnoneinfo");this.localize();return this},showItem:function(toolname){var def,lang,line,list,tname,word,_i,_j,_len,_len1,_ref,_ref1,_ref2,_ref3;lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}this.toolname=toolname;this.def=def=CATS.math[toolname];this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(1)",this.ui.beforecontainer);this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(2)",this.ui.aftercontainer);this.explanationSection();_ref=["targets","returns","effect","explanation"];for(_i=0,_len=_ref.length;_i<_len;_i++){line=_ref[_i];this.setText("."+line+"paragraph",["tools",toolname,CATS.settings.lang,line])}if(def.info.uses){this.ui.tuses.html("<div class='davidlist'>"+function(){var _j,_len1,_ref1,_results;_ref1=def.info.uses;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){tname=_ref1[_j];_results.push(this.toolLink(tname))}return _results}.call(this).join("")+"</div>");this.ui.usesinfo.show();this.ui.usesnoneinfo.hide()}else{this.ui.tuses.empty();this.ui.usesinfo.hide();this.ui.usesnoneinfo.show()}if((_ref1=def.info.usedby)!=null?_ref1.length:void 0){this.ui.tusedby.html("<div class='davidlist'>"+function(){var _j,_len1,_ref2,_results;_ref2=def.info.usedby;_results=[];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){tname=_ref2[_j];_results.push(this.toolLink(tname))}return _results}.call(this).join("")+"</div>");this.ui.usedbyinfo.show();this.ui.usedbynoneinfo.hide()}else{this.ui.tusedby.empty();this.ui.usedbyinfo.hide();this.ui.usedbynoneinfo.show()}if(def.info.lesson){this.ui.lessonholder.html(this.lessonLink(def.info.lesson))}else{this.ui.lessonholder.html(this.getText(["ui","toolinfo","nolesson",CATS.settings.lang]))}_ref2=def.info.tags;for(_j=0,_len1=_ref2.length;_j<_len1;_j++){word=_ref2[_j];if(!((_ref3=CATS.texts.links[word])!=null?_ref3.headline:void 0)){throw"MISSING LINK "+def.info.name+" ---- "+word}}list=function(){var _k,_len2,_ref4,_results;_ref4=def.info.tags;_results=[];for(_k=0,_len2=_ref4.length;_k<_len2;_k++){word=_ref4[_k];_results.push(this.wordLink(word))}return _results}.call(this);this.ui.associatedwordslist.html(list.join(" "));console.log("--- Showing tool ---",toolname);this.updateSchool(toolname);this.listenTo(Backbone,"learnedtool",this.maybeUpdateSchool);this.listenTo(Backbone,"forgottool",this.maybeUpdateSchool);this.listenTo(Backbone,"losttouchoftool",this.maybeUpdateSchool);this.listenTo(Backbone,"qualifiedtool",this.maybeUpdateSchool);return this},maybeUpdateSchool:function(toolname){if(this.toolname===toolname){return this.updateSchool(toolname)}},updateSchool:function(toolname){var colour,str;colour=CATS.school.getToolStatus(toolname);this.$el.removeClass("toolinfored toolinfoyellow toolinfogreen");this.$el.addClass("toolinfo"+colour);this.ui.nameparagraph.html(this.toolLink(toolname,CATS.settings.lang,true));str="learninstruction"+colour;if(colour==="yellow"){str+=CATS.math[this.toolname].info.uses?"complex":"basic"}return this.ui.instructionholder.html(this.getText(["ui","toolinfo",str,CATS.settings.lang]))},showExample:function(){var carrier,exampleinput,step;if(!this.def.info){console.log("WTF exempel utan info?!",this.toolname,this.def)}exampleinput=CATS.math.exampleInput(this.def.info.example);carrier=new CATS.math.Carrier({target:exampleinput.target});carrier["do"](this.toolname,"example",exampleinput);step=carrier.steps[0];step.because="toolexample";return this.$el.trigger("showcalcresult",{result:step})}})}).call(this);