(function(){CATS.bb.LanguageSelectView=CATS.bb.BaseView.extend({template:$("#languageselectviewtemplate").html(),tagName:"div",localizeid:"languageselect",className:"languageselect davidmodalcontent",events:{"click .englishbutton":"setEnglish","click .swedishbutton":"setSwedish"},setEnglish:function(){return this.setLang("en")},setSwedish:function(){return this.setLang("sv")},toggleTextReport:function(){CATS.settings.textreportmode=CATS.settings.textreportmode==="yes"?"no":"yes";return Backbone.trigger("settextreportmode")},initialize:function(o){return this.constructor.__super__.initialize.apply(this,[o])},render:function(){var info;this.$el.html(this.template);this.localize();this.setUI("infolist");this.ui.infolist.html(function(){var _results;_results=[];for(info in CATS.texts.info){_results.push(this.infoLink(info,console.log("INFO",info)))}return _results}.call(this).join(""));return this},setLang:function(lang){CATS.settings.lang=lang;this.buildTemplates(lang);this.setInfo(lang);Backbone.trigger("setlang",lang);return this.kill()},buildTemplates:function(lang){var locid,selector,tobefixed;CATS.cache.templates={};tobefixed={"#wordviewtemplate":"word","#toolinfoviewtemplate":"toolinfo","#lessonviewtemplate":"lesson","#sequenceviewtemplate":"sequence","#operationviewtemplate":"operation","#mastersequenceviewtemplate":"mastersequence","#toolindextemplate":"toolindex","#lessonlisttemplate":"lessonindex","#expressionsviewtemplate":"expressions","#historyviewtemplate":"historyview","#examplesviewtemplate":"examplesview","#reporttextviewtemplate":"reporttext","#mathviewtemplate":"mathview"};for(selector in tobefixed){locid=tobefixed[selector];CATS.cache.templates[selector]=this.buildTemplate(selector,locid,lang)}return $("#templates").remove()},setInfo:function(lang){var childnum,def,name,texts,_ref;childnum=lang==="en"?1:2;texts=$("#helptexts");_ref=CATS.texts.help;for(name in _ref){def=_ref[name];def.html=texts.find("#"+name+" > div:nth-child("+childnum+")").html();def.shorthtml=texts.find("#"+name+" > div:nth-child("+(childnum+2)+")").html()}return texts.remove()},buildTemplate:function(templatesel,localizeid,lang){var templ,text,textid,ui;templ=$(templatesel);ui=CATS.texts.ui[localizeid];for(textid in ui){text=ui[textid][lang];templ.find("."+textid).html(text+(textid.match(/button|btn|alternative|bug/)?"":this.reportLink("text",["ui",localizeid,textid,lang].join("-"))))}return templ.html()}})}).call(this);