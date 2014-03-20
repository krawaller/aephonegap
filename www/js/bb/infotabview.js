(function(){CATS.bb.InfoTabView=CATS.bb.BaseView.extend({tagName:"div",localizeid:"infotab",category:"info",className:"viewbox",noprocess:true,events:{"click .textreportmodeonbutton":"toggleTextReport","click .textreportmodeoffbutton":"toggleTextReport","click .hidehelpbutton":"toggleHideHelpMode","click .showhelpbutton":"toggleHideHelpMode"},toggleTextReport:function(){CATS.settings.textreportmode=CATS.settings.textreportmode==="yes"?"no":"yes";return Backbone.trigger("settextreportmode")},toggleHideHelpMode:function(){CATS.settings.hidehelpmode=CATS.settings.hidehelpmode==="yes"?"no":"yes";return Backbone.trigger("sethidehelpmode")},initialize:function(o){this.listenTo(Backbone,"forgottool",this.updateContent);this.listenTo(Backbone,"learnedtool",this.updateContent);this.listenTo(Backbone,"updatelesson",this.updateContent);return this.constructor.__super__.initialize.apply(this,[o])},render:function(){var help,info;this.setTitle("infotabheadline",true);this.setContent(CATS.cache.templates["#infotabviewtemplate"]);this.setUI("infolist","statuscontent","helpitemlist");this.ui.infolist.html(function(){var _results;_results=[];for(info in CATS.texts.info){_results.push(this.infoLink(info))}return _results}.call(this).join(""));this.ui.helpitemlist.html(function(){var _results;_results=[];for(help in CATS.texts.help){if(!(help==="infoitemview"||help==="helpitemview")){_results.push(this.helpLink(help))}}return _results}.call(this).join(""));this.updateContent();return this},updateContent:function(){this.ui.statuscontent.setText("statuscontent");this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%VERSION",CATS.texts.latestversion));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%AMOUNT",CATS.texts.count.ops-2));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%GLOSSARY",CATS.texts.count.words-1));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%LESSONS",CATS.texts.count.lessons));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%WORDS",CATS.texts.count[CATS.settings.lang].total));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%LEARNEDOPS",CATS.school.numberOfLearnedOps()));this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%FINISHEDLESSONS",CATS.school.numberOfLearnedLessons()));return this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%TYPES",CATS.texts.count.types))}})}).call(this);