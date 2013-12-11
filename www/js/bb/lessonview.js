(function(){CATS.bb.LessonView=CATS.bb.BaseView.extend({template:$("#lessonviewtemplate").html(),localizeid:"lesson",className:"lessonview viewbox",category:"school",events:{"click .canfinishbutton":"finishLesson","click .havefinishedbutton":"forgetLesson","click .killstacktabbutton":"killMeFromRoot","click .showexamplesbutton":"showExampleList","click .hideexamplesbutton":"hideExampleList"},finishLesson:function(){return CATS.school.learnLesson(this.lessonid)},forgetLesson:function(){return CATS.school.forgetLesson(this.lessonid)},render:function(){this.localize();this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(this.template);this.setUI("finishexplanation","trafficlight","lessondescription","toolsimplelist","toolexamplelist","lessonlinksection","linklist","togglebox");this.localize();this.listenTo(Backbone,"updatelesson",this.updateMe);return this},showItem:function(lessonid){var lang,lessondef,tname,toollinks,word,_i,_len,_ref;this.lessonid=lessonid;lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}lessondef=CATS.school.lessons[lessonid];this.updateMe();this.ui.lessondescription.html(CATS.texts.processText(lessondef.description[lang],lang));if(lessondef.links){this.ui.lessonlinksection.show();this.ui.toolsimplelist.empty();_ref=lessondef.links;for(_i=0,_len=_ref.length;_i<_len;_i++){word=_ref[_i];this.ui.linklist.append("<a href='#' class='wordlink davidlink' linkto='"+word+"'>"+CATS.texts.links[word].headline[lang]+"</a>")}}else{this.ui.lessonlinksection.hide()}toollinks=function(){var _j,_len1,_ref1,_results;_ref1=lessondef.tools;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){tname=_ref1[_j];_results.push(this.toolLink(tname,lang))}return _results}.call(this);this.ui.toolsimplelist.html(toollinks.join(""));return this},updateMe:function(){var left,status,str;this.setTitle(this.lessonLink(this.lessonid,true));this.$el.removeClass("canfinishlesson cannotfinishlesson havefinishedlesson");status=CATS.school.getLessonStatus(this.lessonid);left=CATS.school.remainingOpsInLesson(this.lessonid);str=status+(status!=="red"?"":Math.min(left,2))+"explanation";this.ui.finishexplanation.setText(str);this.ui.finishexplanation.html(this.ui.finishexplanation.html().replace("%NUM",CATS.texts.numberStr(left,CATS.settings.lang)));this.$el.addClass({yellow:"canfinishlesson",red:"cannotfinishlesson",green:"havefinishedlesson"}[status]);return this.ui.trafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic"+status)},showExampleList:function(e){var button,lang,lessonid,old;button=$(e.srcElement||e.target).closest("button");lessonid=this.lessonid;lang=CATS.settings.lang;if(this.havedrawnexamples){return this.changeToExampleList()}else{old=button.html();button.css("min-width",button.width());button.html(this.getLoadingHTML());return this.drawPreRenderedPart("#LESSONLIST"+lessonid+" > ."+lang,this.ui.toolexamplelist,_.bind(function(){this.changeToExampleList();button.html(old);return setTimeout(_.bind(this.updateAllMyToolLinks,this),10)},this))}},changeToExampleList:function(){return this.ui.togglebox.addClass("togglesecond")},hideExampleList:function(e){return this.ui.togglebox.removeClass("togglesecond")}})}).call(this);