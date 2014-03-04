(function(){var And,E,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,Leq,Lt,Neg,Neq,Not,Num,OK,Or,PERCENT,PI,Pow,Power,Prod,Product,Sum,TRUE,UNDEFINED,autoFillQuestion,autoFillSelection,calculateToolDependencies,collapseSingleSteps,compileChoices,compileHunt,compileQuestion,compileSelection,decimalifier,decimalifyingPriority,deepcopy,exampleInput,exportTo,findSimplifyOpp,findSimplifyOppForObj,findSimplifyOppForOp,findSimplifyOppNew,five,four,funcs,gatherDecimalifiers,gatherDesperates,gatherSimplifiers,generateOpInputForTarget,getSelectionQuestionBase,intersection,isErr,isOK,k,makeCheck,mixin,one,parser,performCheck,preprocessToolDefs,printObj,simplificationPriority,simplifier,simplify,simplifyAndDecimalify,targettypesforobjtype,three,tools,two,v,validateChoices,validateHunt,validateInput,validateQuestion,validateRearrange,validateSelection,x,y,z,zero,_ref,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};tools=typeof require==="undefined"?this.CATS.math:require("./tools");parser=typeof require==="undefined"?this.CATS.app.parseExpression:require("../app/parser").parseExpression;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),E=_ref.E,PI=_ref.PI,I=_ref.I,PERCENT=_ref.PERCENT,UNDEFINED=_ref.UNDEFINED,deepcopy=_ref.deepcopy,intersection=_ref.intersection,isErr=_ref.isErr,mixin=_ref.mixin,isOK=_ref.isOK,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;preprocessToolDefs=function(toolbox){var def,deps,tooldeps,toolname;deps=toolbox.calculateToolDependencies(toolbox);for(toolname in deps){tooldeps=deps[toolname];toolbox[toolname].info.usedby=tooldeps}for(toolname in toolbox){def=toolbox[toolname];if(!(def.info&&!(toolname==="simplifier"||toolname==="decimalifier"))){continue}if(!def.target){def.target={type:"all"}}else if(typeof def.target==="string"){def.target={type:def.target}}if(!def.target.type){def.target.type="all"}}return toolbox};calculateToolDependencies=function(tools){var ret,tooldef,toolname,usertooldef,usertoolname,_ref1;ret={};for(toolname in tools){tooldef=tools[toolname];if(!tooldef.info){continue}ret[toolname]=[];for(usertoolname in tools){usertooldef=tools[usertoolname];if((_ref1=usertooldef.info)!=null?_ref1.uses:void 0){if(__indexOf.call(usertooldef.info.uses,toolname)>=0){ret[toolname].push(usertoolname)}}}}return ret};collapseSingleSteps=function(o){var fixedsteps,step,_i,_len,_ref1;if(!o.steps){return o}else if(o.steps.length===1){return collapseSingleSteps(mixin({because:o.because},o.steps[0]))}else{fixedsteps=[];_ref1=o.steps;for(_i=0,_len=_ref1.length;_i<_len;_i++){step=_ref1[_i];if(!(step.steps&&step.steps.length===0)){fixedsteps.push(collapseSingleSteps(step))}}o.steps=fixedsteps;return o}};targettypesforobjtype={number:["all","math","number","decnum","one","zero","numeric","numericinclfrac"],negation:["all","math","negation","negone","negnum","numeric","numericinclfrac"],isinteger:["all","isinteger"],log:["all","math","log"],DIVTEST:["all","DIVTEST"],"true":["all","true"],"false":["all","false"],"const":["all","math","const","undefined","percent","i","pi","e"],NOT:["all","NOT","not"],AND:["all","AND","and"],OR:["all","OR","or"],ifelse:["all","ifelse"],fraction:["all","math","fraction","numericinclfrac"],sum:["all","math","sum"],product:["all","math","product"],variable:["all","math","variable"],power:["all","math","power"],plusminus:["all","plusminus","math"],absolute:["all","math","absolute"],relation:["all","relation","equality"],root:["all","math","root"]};gatherSimplifiers=function(ops){var objtype,opdef,opname,ret,targettypes,_ref1,_ref2,_ref3;ret={};for(objtype in targettypesforobjtype){targettypes=targettypesforobjtype[objtype];ret[objtype]=[];for(opname in ops){opdef=ops[opname];if(!(opname==="simplifier"||opname==="decimalifier")){if((_ref1=opdef!=null?(_ref2=opdef.info)!=null?_ref2.effect:void 0:void 0)==="simplifying"||_ref1==="condsimpl"||_ref1==="integrity"){if(_ref3=opdef.target.type,__indexOf.call(targettypes,_ref3)>=0){ret[objtype].push(opname)}}}}ret[objtype].sort(function(o1,o2){if(tools.simplificationPriority[o1]>tools.simplificationPriority[o2]){return 1}else{return-1}})}return ret};gatherDesperates=function(ops){var objtype,opdef,opname,ret,targettypes,_ref1,_ref2,_ref3,_ref4;ret={};for(objtype in targettypesforobjtype){targettypes=targettypesforobjtype[objtype];ret[objtype]=[];for(opname in ops){opdef=ops[opname];if(!(opname==="simplifier"||opname==="decimalifier")){if((opdef!=null?(_ref1=opdef.info)!=null?_ref1.desperate:void 0:void 0)&&((_ref2=opdef!=null?(_ref3=opdef.info)!=null?_ref3.effect:void 0:void 0)==="simplifying"||_ref2==="condsimpl"||_ref2==="integrity")){if(_ref4=opdef.target.type,__indexOf.call(targettypes,_ref4)>=0){ret[objtype].push(opname)}}}}ret[objtype].sort(function(o1,o2){if(tools.simplificationPriority[o1]>tools.simplificationPriority[o2]){return 1}else{return-1}})}return ret};gatherDecimalifiers=function(ops){var objtype,opdef,opname,ret,targettypes,_ref1,_ref2,_ref3;ret={};for(objtype in targettypesforobjtype){targettypes=targettypesforobjtype[objtype];ret[objtype]=[];for(opname in ops){opdef=ops[opname];if(!(opname==="simplifier"||opname==="decimalifier"||opname==="decNumToFrac"||opname==="integerifyDecNumsInFrac")){if((_ref1=opdef!=null?(_ref2=opdef.info)!=null?_ref2.effect:void 0:void 0)==="simplifying"||_ref1==="condsimpl"||_ref1==="integrity"||_ref1==="decimalifying"){if(_ref3=opdef.target.type,__indexOf.call(targettypes,_ref3)>=0){ret[objtype].push(opname)}}}}ret[objtype].sort(function(o1,o2){if(tools.simplificationPriority[o1]>tools.simplificationPriority[o2]){return 1}else{return-1}})}return ret};findSimplifyOppNew=function(o,toolset,desperates){var desperate,found,ret,set,_i,_len,_ref1;if(desperates==null){desperates=[]}_ref1=[toolset,desperates,desperates,desperates];for(desperate=_i=0,_len=_ref1.length;_i<_len;desperate=++_i){set=_ref1[desperate];found=findSimplifyOppForObj(o.target,o.deps,set,desperate);if(found.result){ret={addr:found.addr,input:found.result,opname:found.opname};return ret}}return false};findSimplifyOppForObj=function(obj,deps,toolset,desperatelevel,addr,found){var child,givenup,n,opname,res,_i,_j,_len,_len1,_ref1,_ref2;if(addr==null){addr=[]}if(found==null){found={}}givenup=false;_ref1=toolset[obj.type];for(_i=0,_len=_ref1.length;_i<_len;_i++){opname=_ref1[_i];if(!givenup){if(found.level<=tools.simplificationPriority[opname]){givenup=true}else{res=deps.generateOpInputForTarget({target:obj,addr:addr,desperate:desperatelevel,SIMPLIFYING:true,deps:deps,tool:deps[opname]});if(!isErr(res)){found.opname=opname;found.result=res;found.level=tools.simplificationPriority[opname];found.addr=addr}}}}if(obj.objs){_ref2=obj.objs;for(n=_j=0,_len1=_ref2.length;_j<_len1;n=++_j){child=_ref2[n];found=findSimplifyOppForObj(child,deps,toolset,desperatelevel,addr.concat(n),found)}}return found};findSimplifyOpp=function(o,toolset,desperates){var desperate,opname,res,set,_i,_j,_len,_len1,_ref1,_ref2;if(desperates==null){desperates=[]}_ref1=[toolset,desperates,desperates,desperates];for(desperate=_i=0,_len=_ref1.length;_i<_len;desperate=++_i){set=_ref1[desperate];_ref2=set[o.target.type];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){opname=_ref2[_j];res=o.deps.findSimplifyOppForOp({target:o.target,deps:o.deps,desperate:desperate,tool:o.deps[opname]});if(res){res.opname=opname;return res}}}return false};findSimplifyOppForOp=function(o,addr){var child,childres,lookingat,name,pos,res,_i,_len,_ref1,_ref2,_ref3;if(addr==null){addr=[]}name=(_ref1=o.tool)!=null?(_ref2=_ref1.info)!=null?_ref2.name:void 0:void 0;lookingat=o.deps.lookUp(o.target,addr);res=o.deps.generateOpInputForTarget(mixin({target:lookingat,SIMPLIFYING:true},o));if(!isErr(res)){return{input:res,addr:addr,desperate:o.desperate}}else if(lookingat.objs){_ref3=lookingat.objs;for(pos=_i=0,_len=_ref3.length;_i<_len;pos=++_i){child=_ref3[pos];if(!childres){childres=o.deps.findSimplifyOppForOp(o,addr.concat(pos))}}return childres||false}else{return false}};generateOpInputForTarget=function(o){var autoresult,compsel,deps,filledsel,ret,targettest,tool;tool=o.tool,deps=o.deps;ret={};if(tool.target){targettest=o.deps.performCheck(mixin({check:tool.target},{item:o.target},o));if(!isOK(targettest)){return targettest}}if(tool.auto){autoresult=tool.auto(o);if(!(autoresult[0]==="NOSIMPL"&&!o.SIMPLIFYING)){return autoresult}}if(tool.selection){compsel=o.deps.compileSelection(mixin({sdef:tool.selection},o));filledsel=o.deps.autoFillSelection(mixin({compsel:compsel},o));if(isErr(filledsel)){if(tool.selection.error){return Err(tool.selection.error)}else{return filledsel}}else{ret.selection=filledsel}}return ret};performCheck=function(o){var def,deps,item,obj,res,_ref1;item=o.item||o.target;deps=o.deps;def=o.check||{};if(typeof def==="string"){def={type:def}}if(def.path){item=o.deps.lookUp(o.item,def.path)}if(!item){return Err("wrongformat")}if(def.type&&def.type!=="all"){switch(def.type){case"equality":if(!(item.type==="relation"&&item.val==="eq")){return Err("mustbeequality")}break;case"negnum":if(!(item.type==="negation"&&item.objs[0].type==="number")){return Err("mustbenegativenumber")}break;case"decnum":if(!(item.type==="number"&&parseFloat(item.val)!==Math.floor(parseFloat(item.val)))){return Err("mustbedecnum")}break;case"zero":if(!tools.equal(item,zero)){return Err("mustbezero")}break;case"one":if(!tools.equal(item,one)){return Err("mustbeone")}break;case"negone":if(!tools.equal(item,Neg(one))){return Err("mustbenegone")}break;case"math":if(item.type!=="variable"&&o.deps.isLogic(item)){return Err("mustbemath")}break;case"numeric":if(!(item.type==="number"||item.type==="negation"&&item.objs[0].type==="number")){return Err("mustbenumeric")}break;case"true":if(!tools.equal(item,TRUE)){return Err("mustbetrue")}break;case"false":if(!tools.equal(item,FALSE)){return Err("mustbefalse")}break;case"undefined":if(!tools.equal(item,UNDEFINED)){return Err("mustbeundefined")}break;case"percent":if(!tools.equal(item,PERCENT)){return Err("mustbepercent")}break;case"i":if(!tools.equal(item,I)){return Err("mustbei")}break;case"pi":if(!tools.equal(item,PI)){return Err("mustbepi")}break;case"e":if(!tools.equal(item,E)){return Err("mustbee")}break;case"numericinclfrac":if(item.type==="negation"&&item.objs[0].type==="negation"){return Err("nodoubleneg")}obj=o.deps.digIfNeg(item);if(obj.type==="fraction"){if(!o.deps.isNumeric(obj.objs[0])||!o.deps.isNumeric(obj.objs[1])){return Err("mustbenumornumfrac")}}else{if(!o.deps.isNumeric(obj)){return Err("mustbenumornumfrac")}}break;default:if(((_ref1=item.type)!=null?_ref1.toLowerCase():void 0)!==def.type.toLowerCase()){return Err("mustbe"+def.type)}}}if(def!=null?def.validate:void 0){res=def.validate(o);if(def.path&&isErr(res)&&res.length===2){res[1]=def.path.concat(res[1])}return res}else{return OK}};getSelectionQuestionBase=function(o){var seldef;seldef=o.sdef||{};return seldef.question&&[seldef.question]||typeof seldef.questions==="function"&&seldef.questions(o)||seldef.questions||[{}]};compileQuestion=function(o){var allowed,def,deps,filtermsgs,from,i,item,options,pos,qdef,ret,sdef,target,_i,_ref1,_results;sdef=o.sdef,qdef=o.qdef,target=o.target,deps=o.deps;def=mixin(qdef||{},sdef||{});from=def.from;options=def.options||Array.isArray(from)&&deps.lookUp(target,from).objs||typeof from==="function"&&from(o)||target.objs;if(def.filter){if(typeof def.filter==="function"){filtermsgs=function(){var _i,_len,_results;_results=[];for(_i=0,_len=options.length;_i<_len;_i++){i=options[_i];_results.push(def.filter(mixin({item:i},o),i))}return _results}()}else{filtermsgs=function(){var _i,_len,_results;_results=[];for(_i=0,_len=options.length;_i<_len;_i++){i=options[_i];_results.push(deps.performCheck(mixin({item:i,check:def.filter},o)))}return _results}()}allowed=function(){var _i,_len,_results;_results=[];for(pos=_i=0,_len=filtermsgs.length;_i<_len;pos=++_i){item=filtermsgs[pos];if(tools.isOK(item)){_results.push(pos)}}return _results}()}else{allowed=def.allowed||function(){_results=[];for(var _i=0,_ref1=options.length-1;0<=_ref1?_i<=_ref1:_i>=_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this)}ret=mixin({options:options,allowed:allowed,filtermsgs:filtermsgs},def,{min:1,max:Math.min(options.length-(def.minleft||0),allowed.length)});ret.mustselectall=ret.min===ret.max;return ret};compileSelection=function(o){var q,qnum,questions,_ref1;if((_ref1=o.sdef)==null){o.sdef=o.tool.selection}questions=function(){var _i,_len,_ref2,_results;_ref2=o.deps.getSelectionQuestionBase(o);_results=[];for(qnum=_i=0,_len=_ref2.length;_i<_len;qnum=++_i){q=_ref2[qnum];_results.push(o.deps.compileQuestion(mixin({qnum:qnum,qdef:q},o)))}return _results}();return mixin({questions:questions,deps:o.deps},o.sdef)};autoFillQuestion=function(q){var max,min;max=q.max||666;min=q.min||0;if(!q.allowed.length){return Err("qnoallowed")}else if(min>max){return Err("qminhigherthanmax")}else if(min>q.allowed.length){return Err("qminhigherthanlength")}else{return q.allowed.slice(0,max)}};autoFillSelection=function(_arg){var compsel,deps,firstfill,q,qfill,ret,_i,_j,_len,_len1,_ref1,_ref2,_ref3;compsel=_arg.compsel,deps=_arg.deps;ret=[];if(!((_ref1=compsel.questions)!=null?_ref1.length:void 0)){return Err("selnoquestions")}else{if(compsel.makefirstunique){firstfill=deps.autoFillQuestion(compsel.questions[0]);_ref2=compsel.questions.slice(1);for(_i=0,_len=_ref2.length;_i<_len;_i++){q=_ref2[_i];q.allowed=q.allowed.filter(function(i){return!(__indexOf.call(firstfill,i)>=0)})}}_ref3=compsel.questions;for(_j=0,_len1=_ref3.length;_j<_len1;_j++){q=_ref3[_j];qfill=deps.autoFillQuestion(q);if(isErr(qfill)){return qfill}ret.push(qfill)}return ret}};simplifyAndDecimalify=function(o,math){var dec,descs,simpl;descs=["no","single","multi"];simpl=simplify(o,math.simplifiers,"simplifier",math.desperates);if(simpl.undef){simpl.because="simpltoundef";return{total:"undef",simpldesc:"undef",simpl:simpl,toshow:"onlysimpl"}}else{dec=simplify(new CATS.math.Carrier({target:simpl.result||simpl.target}),math.decimalifiers,"decimalifier",math.desperates);dec.because="decimalify"+(dec.approx?"approx":"")+descs[Math.min(dec.steps.length,2)]+(simpl.steps.length?"aftersimpl":"butnosimpl");if(simpl.steps.length+dec.steps.length===0){return{simpl:simpl,toshow:"none"}}else{simpl.because="simplify"+descs[Math.min(simpl.steps.length,2)]+(dec.steps.length?"anddec":"butnodec");return{simpl:simpl,dec:dec,toshow:{10:"onlysimpl",11:"both",1:"onlydec"}[10*Math.min(simpl.steps.length,1)+Math.min(dec.steps.length,1)]}}}};simplify=function(o,toolset,who,desperates){var i,opp;if(who==null){who="simplifier"}i=60;console.log(who," --- initiating",desperates);while(i--&&(opp=o.deps.findSimplifyOppNew(o,toolset,desperates))){console.log(who," --- found something!",opp);o["do"](opp.opname,"simplifying",mixin({aim:opp.addr},opp.input||{},o))}o.who=who;console.log(who," --- DONE!");printObj(o.target);return o};simplifier={info:{name:"simplifier",effect:"simplifying"},target:"all"};decimalifier={info:{name:"decimalifier",effect:"decimalifying"},target:"all"};validateQuestion=function(q,qsel){var ans,pos,_i,_len;if(!Array.isArray(qsel)){return Err("providedfaultyqselection")}else if(qsel.length<q.min&&!(q.or0&&qsel.length===0)){return Err("didntmakeenoughselectionsinquestion")}else if(qsel.length>q.max){console.log("OMG",qsel,"MAX",q.max,"WTF",q);return Err("madetoomanyselectionsinquestion")}else if(q.minleft&&q.minleft>q.options.length-qsel.length){return Err("didntleaveenoughselectionsinquestion")}else{for(pos=_i=0,_len=qsel.length;_i<_len;pos=++_i){ans=qsel[pos];if(typeof ans!=="number"){return Err("providednonnumericans",pos)}if(ans>q.options.length){return Err("choseoutofrangeans",pos)}if(!(__indexOf.call(q.allowed,ans)>=0)){return Err("chosedisallowedanswerinselquestion",pos,q.allowed,q.options)}}return OK}};validateSelection=function(o){var anspos,forbidden,q,qans,qpos,res,totalans,_i,_j,_len,_len1,_ref1,_ref2;if(!o.selection){return Err("selectioninputmissing")}else if(!Array.isArray(o.selection)){return Err("providedfaultyselection")}else if(o.selection.length<o.compsel.questions.length){console.log(o.selection.length,"but wanted ",o.compsel.questions.length);return Err("didntanswerallquestions")}else if(o.selection.length>o.compsel.questions.length){console.log("COMPSELTOOMANY",o.selection.length,o.selection,o.compsel.questions);return Err("answeredunexistingquestions")}else{totalans=0;forbidden=o.compsel.makefirstunique?o.selection[0]:[];_ref1=o.compsel.questions;for(qpos=_i=0,_len=_ref1.length;_i<_len;qpos=++_i){q=_ref1[qpos];totalans+=o.selection[qpos].length;if(qpos&&forbidden.length){_ref2=o.selection[qpos];for(anspos=_j=0,_len1=_ref2.length;_j<_len1;anspos=++_j){qans=_ref2[anspos];if(__indexOf.call(forbidden,qans)>=0){return Err("violatedmakefirstunique",[qpos,anspos])}}}res=validateQuestion(q,o.selection[qpos]);if(!isOK(res)){return res.concat(["question"+qpos])}}if(o.compsel.totalmin&&o.compsel.totalmin>totalans){return Err("violatedtotalmin")}else if(o.compsel.validate){return o.compsel.validate(o)}else{return OK}}};validateChoices=function(o){var c,cnum,_i,_len,_ref1;if(!o.choices){return Err("choicesinputmissing")}else if(!Array.isArray(o.choices)){return Err("providedfaultychoices")}else if(o.choices.length<o.compchoice.questions.length){return Err("didntanswerallchoices")}else if(o.choices.length>o.compchoice.questions.length){console.log("DUMBASS!",o.compchoice,o.choices);return Err("answeredunexistingchoice")}else{_ref1=o.choices;for(cnum=_i=0,_len=_ref1.length;_i<_len;cnum=++_i){c=_ref1[cnum];if(typeof c!=="string"){return Err("faultychoice",cnum)}if(__indexOf.call(o.compchoice.questions[cnum].options,c)<0){return Err("unknownchoice",cnum)}}return OK}};validateHunt=function(o){var compquestion,item,n,test,victim,_i,_len,_ref1;if(!o.hunt){return Err("huntinputmissing")}else if(!Array.isArray(o.hunt)){return Err("providedfaultyhunt")}else if(o.hunt.length<(o.hdef.min||1)){return Err("toofewhuntans")}else if(o.hdef.max&&o.hunt.length>o.hdef.max){return Err("toomanyhuntans")}else if(!o.hdef.multiple){_ref1=o.hunt;for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){victim=_ref1[n];compquestion=o.comphunt.questions[n];if(!Array.isArray(victim)){console.log("MORON!!",victim);return Err("faultyhuntansformat",n)}item=o.deps.lookUp(compquestion.from,victim);if(!item){if(true){console.log("HUNT FUKKUP!! Here be the world:");printObj(o.target);console.log("We're selecting from this:");printObj(compquestion.from);console.log("My hunt path was this",victim);console.log("Which resulted in this item:");printObj(item);console.log("Weird, huh?")}return Err("faultyhuntpath",n)}test=o.deps.performCheck(mixin({check:o.hdef,item:item},o));if(isErr(test)){return test}}return OK}};compileHunt=function(o){var hdef,q,qnum,ret,_i,_len,_ref1;hdef=deepcopy(o.hdef);ret={questions:hdef.questions?hdef.questions:Array.isArray(hdef)?hdef:[hdef]};if(typeof ret.questions==="function"){ret.questions=ret.questions(o)}_ref1=ret.questions;for(qnum=_i=0,_len=_ref1.length;_i<_len;qnum=++_i){q=_ref1[qnum];ret.questions[qnum].fromPath=q.fromPath||hdef.fromPath||[];if(typeof ret.questions[qnum].fromPath==="function"){ret.questions[qnum].fromPath=ret.questions[qnum].fromPath(o)}ret.questions[qnum].from=o.deps.lookUp(o.target,ret.questions[qnum].fromPath)}return ret};validateRearrange=function(o){var n,obj,_i,_len,_ref1;if(!o.rearrange){return Err("rearrangeinputmissing")}else if(!Array.isArray(o.rearrange)){return Err("providedfaultyrearrange")}else if(o.deps.equal(o.rearrange,o.target.objs)){return Err("providedinitialorder")}else{_ref1=o.rearrange;for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){obj=_ref1[n];if(!obj.type){return Err("faultyrearrangeitem",n)}}return OK}};compileChoices=function(o){var cdef,q,qnum,ret,_i,_len,_ref1;cdef=deepcopy(o.cdef||o.tool.choices);ret={questions:cdef.questions?cdef.questions:Array.isArray(cdef)?cdef:[cdef]};if(typeof ret.questions==="function"){ret.questions=ret.questions(o)}_ref1=ret.questions;for(qnum=_i=0,_len=_ref1.length;_i<_len;qnum=++_i){q=_ref1[qnum];if(typeof q.options==="function"){ret.questions[qnum].options=q.options(o)}}return ret};validateInput=function(o,report){var q,test,_i,_len,_ref1,_ref2,_ref3;o.check=o.tool.target;test=o.deps.performCheck(o);if(isErr(test)){if(report){console.log("TARGET TROUBLE",o.tool.info.name,o.check,o.target)}return test}if(o.tool.argument){o.check=o.tool.argument;o.item=o.argument;test=o.deps.performCheck(o);if(isErr(test)){if(report){console.log("ARGUMENT TROUBLE",o.tool.info.name,o.check,o.argument)}return test}}if(o.tool.hunt){o.hdef=o.tool.hunt;o.comphunt=o.deps.compileHunt(o);test=o.deps.validateHunt(o);if(isErr(test)){if(report){console.log("HUNT TROUBLE",o.tool.info.name,o.hdef,o.hunt)}return test}}if(o.tool.rearrange){test=o.deps.validateRearrange(o);if(isErr(test)){return test}}if(o.tool.selection){o.sdef=o.tool.selection;o.compsel=o.deps.compileSelection(o);test=o.deps.validateSelection(o);if(isErr(test)){return test}}if(o.tool.choices){o.cdef=o.tool.choices;o.compchoice=o.deps.compileChoices(o);test=o.deps.validateChoices(o);if(isErr(test)){if(report){console.log("CHOICES TROUBLE",o.tool.info.name,(_ref1=o.compchoice.questions)!=null?_ref1.length:void 0);_ref2=o.compchoice.questions||[];for(_i=0,_len=_ref2.length;_i<_len;_i++){q=_ref2[_i];console.log(" ---- ",q)}console.log(" -------- SEL",o.choices);console.log(" -------- DEF",o.cdef)}return test}}if((_ref3=o.tool.direction)!=null?_ref3.validate:void 0){test=o.tool.direction.validate(o);if(isErr(test)){return test}}if(o.tool.validate){test=o.tool.validate(o);if(isErr(test)){return test}}return OK};exampleInput=function(example){var _ref1;if(typeof example==="string"){example={str:example}}if((_ref1=example.target)==null){example.target=parser(example.str)}if(typeof example.argument==="string"){example.argument=parser(example.argument)}return deepcopy(example)};decimalifyingPriority={piToDec:1e10,eToDec:1e10,fracToDecNum:1e8,fracWithNegNumToDecNum:1e8,approxLog:1e10,approxLogBase10:99999999,decimalifyFracFacs:1e11,numRootToDec:1e10,approxDecNumPow:1e10};simplificationPriority={forbidLogBaseOne:1,forbidLogBaseZero:1,undefinedChildToFalseInLogic:4,undefChildObjToUndef:5,illegalLog:2,zeroBaseExpPowToUndefined:2,zeroDenomFracToUndef:2,rootWithGradeZeroToUndef:2,integerifyDecNumsInFrac:4,decNumToFrac:5,evalIfElse:15,orWithTrueIsTrue:15,andWithFalseIsFalse:15,collapseIfElseWithSameBranches:15,complexComparisonToBool:15,collapseDoubleNot:30,andWithIncompatiblePartsToFalse:30,disjunctionWithNeqInCompToTrue:35,conjunctionWithOppsToFalse:28,disjunctionWithOppsToTrue:28,conjunctionWithHiddenOppsToFalse:29,disjunctionWithHiddenOppsToTrue:29,notTrueIsFalse:50,notFalseIsTrue:50,collapseNotRel:90,collapseNotOr:90,collapseNotAnd:90,purgeFalseFromOr:100,purgeTrueFromAnd:100,purgeDuplicatesFromLogic:100,purgeSpiritDuplicatesFromLogic:100,removeSuperfluousNeqsInAnd:100,removeSuperfluousEqsInOr:100,combineOppositeOrEqsToEqInAnd:100,swallowContainedComparisons:150,shaveRelsInOr:150,shaveCompWithEqInAnd:150,removeSuperfluousCompsInAnd:120,removeSuperfluousCompsInOrWithNeq:120,combineOppositeStrictCombsInOr:150,swallowContainedComparisonsInOr:150,removeInferredComp:150,unrollIfElse:8000000000666,killAbsInPlusMinus:1e4,killNegInPlusMinus:1e4,numericRelToBool:1e3,shaveRelsInAnd:1e3,zeroFacExprToZero:100,absorbOrsInAnd:9999999999,absorbSubAnds:1e4,absorbSubOrs:1e4,expandPlusMinusInRel:8000000668,plusMinusZeroToZero:100,collapseNegIntegerTest:25,collapseDecFracIntegerTest:31,evalNumIntegerTest:3,writeDivTestAsIntTest:300,evalNumericDivTest:100,neqIToTrue:15,eqIToFalse:15,fracExpPowToRoot:29,rootOfZeroIsZero:50,negOneFacBiProdToNeg:50,absorbSumTerms:50,subtraction:97,addition:49,sameNumerDenomFracToOne:50,sameSpiritNumerDenomFracToOne:51,oneDenomFracToNumer:39,multiplication:85,multiplyAllNumFacs:84,multiplyNumFacs:86,multiplyPosNegNum:90,purgeOneFacs:30,piToDec:1e10,eToDec:1e10,fracToDecNum:1e8,fracWithNegNumToDecNum:1e8,approxLog:1e10,decimalifyFracFacs:1e11,numRootToDec:1e10,approxLogBase10:99999999,logOfPowToProd:1e7,logOfBaseToOne:999999,logOfBasePowToExp:999999,logOneToZero:1e7,flattenLogOfSecretPowNum:999999,logOfProdToSum:1e7,flattenLogOfContainedPowNum:1e7,logOfFracToSum:8e9,powWithBaseLogExpToExp:8e9,collapsePowWithBaseLogFacInExp:8e9,collapsePowWithSecretBaseLogInExp:8000000010,mergePosNegLogTerms:1e8,collapseLogOfRoot:1e4,logOfI:1e3,logOfNegNum:1e4,logToFracOfLogs:8e9,expandAbsInCombLarger:1e4,expandAbsPartInRelAndFix:10001,expandAbsInCombSmaller:10002,collapseDoubleNeg:270,twoNegOneFacProdToOne:280,collapseTwoNegFacs:300,flattenNegProdFac:1e4,collapseNegDenomFacNegFrac:1e5,collapseNegNumerFacNegFrac:1e5,collapseNegFacNegFrac:1e4,collapseNegNumerDenomFacs:439,collapseNegProdWithNegFac:8e3,collapseNegOneFac:1e4,moveNegBetweenFacs:1e5,moveNegFromFacToProd:1e6,moveNegFromProdToFac:8e9,absorbNegSum:9999,collapseNegSum:1e4,mirrorSumWithNegInProd:1e4,mirrorSumWithNegInFrac:1e4,addTermWithNumerTerm:1e4,mergePosNumTerms:100,mergeNegNumTerms:101,mergeAllIntegerTerms:99,purgeZeroTerms:20,subtractInSum:1e4,mergeAllNumTerms:98,addExpressions:99,addEqualDenomFracs:100,addNumericDenomFracs:110,addNumericFracToNumber:120,movePowInFrac:501,mergeSameBaseNumerDenomFacs:450,zeroBasePowerToZero:5e3,powBasePowToProdExp:3e5,zeroExpPowerToOne:20,oneExpPowerToBase:21,zeroFacProdToZero:1e3,mergeBiSameBasePowFacs:448,mergeSameBaseFacs:449,negOneBaseTwoExpPowToOne:9e3,biProdBasePowToProd:1e4,collapseSameInnerBaseFacNumerDenomPows:1e4,powBasePowToFlatNiceExp:299,oneBasePowToOne:200,negOneBaseEvenFacExpPowToOne:1e4,negOneBaseOddFacExpPowToNegOne:1e4,splitNegBasePow:998,extractBaseFraction:1e4,negExpFacProdToFrac:9999,collapseSumBasePow:8e9,numericPowToNum:8e9,transformPowOfFracAndSimplify:50,fixPowWithBaseLogTermInExp:1e6,collapseRootAndSimplify:79,collapseRoot:80,collapseInnerExpNumRoot:100,collapseSecretNumRoot:100,collapseRootBasePow:80,collapseRootBaseProdExpPow:100,collapseRootBaseInnerFacProdExpPow:100,fracOfRootsToRootOfFracs:1e3,rootOfFracToFracOfRootsAndSimplify:999,collapseRootProd:100,collapsePartNumRoot:100,collapseRootOf1:100,collapseNumBasePowRoot:100,collapseNegSquareRoot:9e5,oneNumFracExpPowToRoot:8e9,collapseRootWithIndexOne:100,simplifyRootWithFracIndex:1e5,simplifyRootWithNegIndex:1e5,collapseAbsNum:8e3,collapseAbsPow:8e3,collapseAbsProd:9e3,collapseAbsFrac:9e3,collapseAbsNeg:1e4,collapseSumBaseSquare:9e3,mergeFracFacs:1e3,distributeFacs:8e9,distribute:8e9,absorbProductFacs:5e3,mergeSumFacs:440,eliminateNegMirrorFacsFromFrac:70,eliminateCommonInnerFacsInFrac:70,eliminateFromFrac:70,flattenFracNumerDenom:300,flattenFracNumer:340,flattenFracDenom:350,elimFacWithFracFac:4e3,multFacsIntoFrac:5e3,biFracProdToBiProdFrac:1e4,collapseNegOneDenom:440,eliminateFromSumsInFrac:1e4,eliminateMirrorSumFacsFromFrac:1e4,eliminateInnerNumFacsInSumsInFrac:1e4,eliminateSameBasePowsInSumsInFrac:1e4,collapseNegationsInSumsInFrac:1e4,percentToFrac:1e4,percentFacProdToFrac:9e3,iBaseTwoExpPowToNegOne:9e3,collapseIBaseEvenFacExpPow:1e4,collapseIBaseOddFacExpPow:11e3,biIProdToNegOne:1e4,collapsePowToNegOne:1e4,purgeEqualTermsFromRelation:1e3,eliminateSameFacsFromRelationSides:1e6,eliminateCommonInnerFacsInRel:1e6,collapseNegationsInSumsInRelation:1e7,mergeNumFracFacOnOppRelSides:1e3,zeroProdMethod:900,collapsePowInZeroRel:900,collapseRootInZeroRel:900,collapseRootInOneRel:900,collapseFracInOneRel:900,collapseFracInZeroRel:900,solveEqWithNoConstant:9999999,substitute:9e9,solveQuadraticEquation:9000000001,solveQuadHiddenInHigher:9000000001,solveQuadHiddenInRoot:9000000001,solvePowEq:9000000003,solveRootEq:9000000003,solveLogEq:9000000003,solveExpEq:9000000004,solveLinearEq:9000000005,liftVarFromDenomInRel:6666666,moveTermsBetweenSidesInRel:9000000100,flipRelation:900000001e4,collapseAbsI:1e8,collapseRootOfISquared:1e8,unravelEqOfPowAndOne:666666666,expandAbsToIfElse:666666666666666,approxDecNumPow:1e10,liftRootFromDenom:1e10};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={findSimplifyOppNew:findSimplifyOppNew,gatherDesperates:gatherDesperates,compileHunt:compileHunt,decimalifier:decimalifier,simplifyAndDecimalify:simplifyAndDecimalify,gatherDecimalifiers:gatherDecimalifiers,decimalifyingPriority:decimalifyingPriority,simplifier:simplifier,preprocessToolDefs:preprocessToolDefs,calculateToolDependencies:calculateToolDependencies,collapseSingleSteps:collapseSingleSteps,exampleInput:exampleInput,validateRearrange:validateRearrange,validateInput:validateInput,validateHunt:validateHunt,compileChoices:compileChoices,validateChoices:validateChoices,validateQuestion:validateQuestion,validateSelection:validateSelection,simplify:simplify,gatherSimplifiers:gatherSimplifiers,findSimplifyOpp:findSimplifyOpp,findSimplifyOppForOp:findSimplifyOppForOp,simplificationPriority:simplificationPriority,autoFillQuestion:autoFillQuestion,autoFillSelection:autoFillSelection,generateOpInputForTarget:generateOpInputForTarget,performCheck:performCheck,getSelectionQuestionBase:getSelectionQuestionBase,compileQuestion:compileQuestion,compileSelection:compileSelection};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);