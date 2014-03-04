(function(){var And,Carrier,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,Leq,Lt,Neg,Neq,Not,Num,OK,Or,Pow,Power,Prod,Product,Sum,TRUE,deepcopy,exportTo,five,fixAssumptionPath,four,funcs,isErr,k,makeCheck,mixin,one,optexts,printObj,three,tools,two,v,x,y,z,zero,_ref,__slice=[].slice;tools=typeof require==="undefined"?this.CATS.math:require("./tools");optexts=(typeof require==="undefined"?this.CATS.texts:require("../../../build/texts_op")).tools;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),fixAssumptionPath=_ref.fixAssumptionPath,isErr=_ref.isErr,deepcopy=_ref.deepcopy,mixin=_ref.mixin,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;Carrier=function(){Carrier.prototype["try"]=function(toolname,because,aim,report,assuming,asspre){var alsopath,e,input,pottarget,pottool,_ref1;aim=(aim!=null?aim.aim:void 0)||aim||[];try{_ref1=fixAssumptionPath(this.target,aim,assuming,toolname+"-"+because,asspre,this.deps),aim=_ref1.aim,alsopath=_ref1.alsopath;pottarget=deepcopy(this.deps.lookUp(this.target,aim))}catch(_error){e=_error;return this}pottool=this.deps[toolname];if(!pottool){throw"COULDNT FIND TOOL "+toolname}input=this.deps.generateOpInputForTarget(mixin({target:pottarget,tool:pottool,deps:this.deps,settings:this.settings}));if(report){this.report("OK, try result","selection",input.selection,"aim",aim,isErr(input),input[0])}if(!isErr(input)){input.aim=aim;this.target=pottarget;this["do"](toolname,because,input);if(alsopath){this["try"](toolname,"LOGICPATHDOUBLE",alsopath,report,false)}}return this};Carrier.prototype.doIf=function(toolname,because,input){var aim,alsopath,check,e,pottarget,pottool,_ref1,_ref2;if((_ref1=input.aim)==null){input.aim=[]}try{_ref2=fixAssumptionPath(this.target,input.aim,input.assuming,toolname+"-"+because,input.assumingpre,this.deps),aim=_ref2.aim,alsopath=_ref2.alsopath;pottarget=deepcopy(this.deps.lookUp(this.target,aim))}catch(_error){e=_error;return this}pottool=this.deps[toolname];if(!pottool){throw"COULDNT FIND TOOL "+toolname}check=this.deps.validateInput(mixin(input,{target:pottarget,tool:pottool},this));if(input.report&&isErr(check)){console.log("DOIF FAIL",toolname,check,input)}if(!isErr(check)){this.target=pottarget;this["do"](toolname,because,mixin({assuming:void 0,aim:aim},input));if(alsopath){this.doIf(toolname,"LOGICPATHDOUBLE",mixin({aim:alsopath,assuming:void 0},input))}}return this};Carrier.prototype["do"]=function(toolname,because,input){var aim,alsopath,check,flag,l,newstep,oppath,result,_i,_j,_k,_len,_len1,_len2,_ref1,_ref10,_ref2,_ref3,_ref4,_ref5,_ref6,_ref7,_ref8,_ref9;if(!input&&typeof because!=="string"){input=because;because="unknown"}if(input==null){input={}}if((_ref1=input.aim)==null){input.aim=[]}_ref2=fixAssumptionPath(this.target,input.aim,input.assuming,toolname+"-"+because,input.assumingpre,this.deps),aim=_ref2.aim,alsopath=_ref2.alsopath;oppath=this.path.concat(aim);if(!(because==="simplifying"||because==="decimalifying"||because==="example")){if((tools[this.parent].info.uses||[]).indexOf(toolname)===-1){throw"Unregistered substep! Parent "+this.parent+", Child "+toolname}_ref3=["sv","en"];for(_i=0,_len=_ref3.length;_i<_len;_i++){l=_ref3[_i];if(because!=="LOGICPATHDOUBLE"&&!((_ref4=optexts[this.parent])!=null?(_ref5=_ref4[l])!=null?(_ref6=_ref5.steps)!=null?_ref6[because]:void 0:void 0:void 0)){throw"Unregistered substep text! Parent "+this.parent+", Child "+toolname+", Because "+because}}}newstep=new this.deps.Carrier(mixin({path:oppath,before:deepcopy(this.after),deps:this.deps,target:deepcopy(this.deps.lookUp(this.after,oppath)),result:deepcopy(this.deps.lookUp(this.after,oppath)),settings:this.settings,parent:toolname},input,this));delete newstep.beforemarks;delete newstep.aftermarks;delete newstep.assuming;if(!mixin({tool:this.deps[toolname]},newstep).tool){console.log(this.deps);throw"COULDNT FIND TOOL "+toolname}check=this.deps.validateInput(mixin({tool:this.deps[toolname]},newstep));if(isErr(check)){console.log("INTERNAL USAGE ERROR for ",toolname,check,"wasgonna",because);_ref7=["selection","argument","hunt","choices","direction","rearrange"];for(_j=0,_len1=_ref7.length;_j<_len1;_j++){input=_ref7[_j];if(this.deps[toolname][input]){console.log("....Input",input,newstep[input],"def",this.deps[toolname][input])}}console.log("WORLD and targetpath",newstep.path);printObj(newstep.before);console.log("target",oppath,input.assuming);printObj(newstep.target);throw"Internal usage error"}result=this.deps[toolname].perform(newstep);if(!result){console.log("TOOL GAVE NO RESULT",toolname,newstep)}result.before=deepcopy(this.after);result.path=oppath;result.after=this.deps.exchangeChild(result.before,result.result,oppath);result.because=because;result.who=toolname;if((_ref8=result.deps)==null){result.deps=this.deps}this.steps.push((_ref9=result.because)==="simplifying"||_ref9==="manual"||_ref9==="example"?this.deps.collapseSingleSteps(result):result);this.after=deepcopy(result.after);this.result=deepcopy(this.deps.lookUp(this.after,this.path));this.target=this.result;_ref10=["approx","undef"];for(_k=0,_len2=_ref10.length;_k<_len2;_k++){flag=_ref10[_k];if(result[flag]){this[flag]=true}}if(alsopath){this["do"](toolname,"LOGICPATHDOUBLE",mixin({aim:alsopath,assuming:void 0},input))}return this};function Carrier(data){var _ref1,_ref2,_ref3;this.deps=mixin(data.deps,tools);this.mixin(data);if((_ref1=this.before)==null){this.before=this.target}if((_ref2=this.after)==null){this.after=deepcopy(this.before)}if((_ref3=this.path)==null){this.path=[]}this.steps=[]}Carrier.prototype.mixin=function(source){var k,v;for(k in source){v=source[k];this[k]=v}return this};Carrier.prototype.beforemark=function(marks,ifelse){var mark;marks=!Array.isArray(marks)?[[marks]]:Array.isArray(marks[0])?marks:[marks];if(ifelse==="and"&&this.target.type==="ifelse"){marks=function(){var _i,_len,_results;_results=[];for(_i=0,_len=marks.length;_i<_len;_i++){mark=marks[_i];_results.push([1].concat(mark.slice(1)))}return _results}()}this.beforemarks=(this.beforemarks||[]).concat(marks);return this};Carrier.prototype.aftermark=function(marks,ifelse){var mark;marks=!Array.isArray(marks)?[[marks]]:Array.isArray(marks[0])?marks:[marks];if(ifelse==="and"&&this.target.type==="ifelse"){marks=function(){var _i,_len,_results;_results=[];for(_i=0,_len=marks.length;_i<_len;_i++){mark=marks[_i];_results.push([1].concat(mark.slice(1)))}return _results}()}this.aftermarks=(this.aftermarks||[]).concat(marks);return this};Carrier.prototype.flag=function(flag,val){this[flag]=val||true;return this};Carrier.prototype.dirnum=function(){if(this.direction==="right"){return 1}else{return 0}};Carrier.prototype.oppdir=function(){if(this.direction==="right"){return"left"}else{return"right"}};Carrier.prototype.oppdirnum=function(){if(this.direction==="right"){return 0}else{return 1}};Carrier.prototype.report=function(){var data;data=1<=arguments.length?__slice.call(arguments,0):[];console.log(data);printObj(this.target);return this};return Carrier}();if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={Carrier:Carrier};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);