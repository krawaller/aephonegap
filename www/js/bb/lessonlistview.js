(function(){CATS.bb.LessonListView=CATS.bb.RootView.extend({template:$("#lessonlisttemplate").html(),tagName:"div",className:"lessonindex viewbox",localizeid:"lessonindex",category:"school",initialize:function(o){this.constructor.__super__.initialize.apply(this,[o]);return this.lessonLinkAware()},render:function(){var lang,lessondef,lessonid,lessons,list,listitems;this.setContent(this.template);this.setTitle("lessonlistheadline",true);this.setUI("lessonlist");this.localize();lang=CATS.settings.lang;lessons=CATS.school.lessons;listitems=[];for(lessonid in lessons){lessondef=lessons[lessonid];listitems.push(this.lessonLink(lessonid))}list=$("<div class='davidlist'>"+listitems.join("")+"</div>");this.ui.lessonlist.append(list);return this}})}).call(this);