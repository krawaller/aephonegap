(function(){CATS.bb.RootView=CATS.bb.BaseView.extend({rootMe:function(root){this.$el.addClass("root").attr("data-root",root);this.$el.on("click","a.wordlink",this.goToWord);this.$el.on("click","a.toollink",this.goToTool);this.$el.on("click","a.infolink",this.goToInfo);this.$el.on("click",".helplink",this.goToHelp);this.$el.on("click","a.lessonlink",this.goToLesson);this.$el.on("click","a.expressionitem",this.inputExpression);this.$el.on("click","button.expressionsbutton",this.goToExpressions);this.$el.on("showcalcresult",this.showCalcResult);this.$el.on("click",".mathobj",this.showMath);this.stack=[];this.rootname=root;return this},initialize:function(o){_.bindAll(this,"goToWord","goToTool","goToLesson","goToInfo","goToHelp","goToExpressions","inputExpression","popStack","showCalcResult","showMath");this.listenTo(Backbone,"mainnav",this.clearAll);return this.idme()},clearAll:function(section,oldsection){var v,_i,_len,_ref;if(section===this.rootname&&section===oldsection){console.log("CLEARING ROOT",this.rootname);_ref=this.stack;for(_i=0,_len=_ref.length;_i<_len;_i++){v=_ref[_i];v.killMeFromRoot()}return this.stack=[]}},popStack:function(double){this.stack.pop();if(double){return console.log("Navigated to last, so went back instead! now",this.stack)}else{return console.log("Went back, now: ",this.stack)}},goToWord:function(e){return this.link(e,"word")},goToTool:function(e){return this.link(e,"tool")},goToLesson:function(e){return this.link(e,"lesson")},goToInfo:function(e){return this.link(e,"info")},goToHelp:function(e){return this.link(e,"help")},goToExpressions:function(e){return this.link(e,"expressions")},inputExpression:function(e){return this.link(e,"expression")},showMath:function(e){return this.link(e,"mathobj")},link:function(e,category){var constructors,data,goal,view,_base;constructors={word:CATS.bb.WordView,tool:CATS.bb.ToolinfoView,lesson:CATS.bb.LessonView,info:CATS.bb.InfoItemView,help:CATS.bb.HelpItemView,expressions:CATS.bb.ExpressionsView,expression:CATS.bb.ParserView,mathobj:CATS.bb.MathView};data=$(e.currentTarget).attr("linkto");goal=category+(data||"");if(category==="expression"){data=$(e.currentTarget).text();if(this.rootname==="calc"&&this.stack.length===1){this.removeView(this.stack[this.stack.length-1],true);return this.bottomview.showItem(data)}}e.stopPropagation();e.preventDefault();if(this.stack.length&&this.stack[this.stack.length-1].DESCRIPTION===goal){return}if(this.stack.length>1&&this.stack[this.stack.length-2].DESCRIPTION===goal){if(category==="expression"){this.stack[this.stack.length-2].showItem(data)}return this.removeView(this.stack[this.stack.length-1],true)}view=new constructors[category];view.noroot=true;if(typeof(_base=view.render()).showItem==="function"){_base.showItem(data)}view.DESCRIPTION=goal;return this.stackView(view)},removeView:function(view,last){var pos,s;pos=this.stack.indexOf(view);view.killMeFromRoot();console.log("Removed view",view.DESCRIPTION,"from pos",pos,"total",this.stack.length);return this.stack=function(){var _i,_len,_ref,_results;_ref=this.stack;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){s=_ref[_i];if(s!==view){_results.push(s)}}return _results}.call(this)},stackView:function(view){var root;root=this;this.$el.append(view.$el.css({"background-color":"white","z-index":5}).addClass("sequencehiddenright sequence nonrootview").on("click",".gobackbutton",function(){return root.removeView(view)}));setTimeout(function(){return view.$el.removeClass("sequencehiddenright")},30);return this.stack.push(view)},showCalcResult:function(e,obj){var goal,resultview;console.log("CALCRESULT",e,obj);goal="EXAMLPLE-"+obj.result.who;if(this.stack.length>1&&this.stack[this.stack.length-2].DESCRIPTION===goal){return this.removeView(this.stack[this.stack.length-1],true)}resultview=new CATS.bb.ResultView;resultview.DESCRIPTION=goal;resultview.render().show(obj.result,obj.dec,void 0,!!obj.dec);return this.stackView(resultview)}})}).call(this);