(function(){CATS.bb.ResultView=CATS.bb.BaseView.extend({tagName:"div",localizeid:"resultview",category:"calc",className:"resultview viewbox",events:{"click .killstacktabbutton":"killMeFromRoot"},initialize:function(o){this.sequences=[];this.others=[];this.listenTo(Backbone,"setlang",this.setErrorMsg);this.listenTo(Backbone,"starttour",this.clearMe);return this.constructor.__super__.initialize.apply(this,[o])},template:$("#resultviewtemplate").html(),render:function(){this.setContent(this.template);this.setTitle("resultheadline");this.localize();this.setUI("sequencecontainer","errorcontainer","errormsg","errorjax","firstentry");this.ui.sequencecontainer.hide();return this},clearMe:function(){var sview,_i,_j,_len,_len1,_ref,_ref1;_ref=this.sequences;for(_i=0,_len=_ref.length;_i<_len;_i++){sview=_ref[_i];if(sview){if(sview!=null){sview.kill()}}}_ref1=this.others;for(_j=0,_len1=_ref1.length;_j<_len1;_j++){sview=_ref1[_j];if(sview){if(sview!=null){sview.kill()}}}if(this.errorjax){this.errorjax.kill()}this.ui.sequencecontainer.empty();return this.ui.errorcontainer.hide()},setErrorMsg:function(){if(this.errorid){return this.ui.errormsg.html(this.getText(["ui","parser","error"+this.errorid,CATS.settings.lang])+(this.errordata?" '"+this.errordata+"'":""))}},showError:function(o,errorid,errordata){this.errorid=errorid;this.errordata=errordata;this.ui.firstentry.hide();this.ui.sequencecontainer.show();this.clearMe();this.setErrorMsg();this.errorjax=new CATS.bb.jaxview(o,void 0,void 0,true);console.log("SHOWING ERROR",o,this.errorid,this.errordata,this.errorjax);this.ui.errorjax.empty().append(this.errorjax.render().el);this.ui.errorjax.attr("data-obj",JSON.stringify(o));this.typeset(this.ui.errorjax.get(0));this.ui.sequencecontainer.hide();return this.ui.errorcontainer.show()},show:function(o,errorid,errordata,noitsasimplwithdec){var newsequenceview;this.errorid=errorid;this.errordata=errordata;this.ui.sequencecontainer.show();this.ui.firstentry.hide();Backbone.trigger("closemodal");if(this.errorid&&!noitsasimplwithdec){return this.showError(o,this.errorid,this.errordata)}else{this.clearMe();this.sequences=[];newsequenceview=new CATS.bb.MasterSequenceView(o,noitsasimplwithdec?this.errorid:void 0);this.listenTo(newsequenceview,"zoom",function(sequenceview,path){return this.zoom(sequenceview,path)});this.listenTo(newsequenceview,"sequenceback",this.back);this.listenTo(newsequenceview,"sequencetop",this.top);this.listenTo(newsequenceview,"newsequenceview",this.newSequence);this.ui.sequencecontainer.show();this.ui.sequencecontainer.append(newsequenceview.el);newsequenceview.render().$el;this.zoom(newsequenceview,[],true);return this.childViews=[newsequenceview]}},newSequence:function(view){console.log("NEW SEQUENCE CAUGHT!",view);this.others.push(view);return this.ui.sequencecontainer.append(view.el)},zoom:function(sequenceview,path,master){if(path==null){path=[]}if(this.sequences.length){this.sequences[this.sequences.length-1].$el.addClass("sequencehiddenleft")}this.sequences.push(sequenceview);if(!master){return sequenceview.$el.removeClass("sequencehiddenleft").removeClass("sequencehiddenright").scrollTop(0)}},back:function(){if(this.sequences.length>1){this.sequences[this.sequences.length-1].$el.addClass("sequencehiddenright");this.sequences[this.sequences.length-2].$el.removeClass("sequencehiddenleft");return this.sequences.pop()}},top:function(){var _results;_results=[];while(this.sequences.length>1&&!this.sequences[this.sequences.length-1].master){this.sequences[this.sequences.length-1].$el.addClass("sequencehiddenright");this.sequences[this.sequences.length-2].$el.removeClass("sequencehiddenleft");_results.push(this.sequences.pop())}return _results}})}).call(this);