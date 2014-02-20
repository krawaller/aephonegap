(function(){var Abs,And,Cbrt,Cube,DivTest,E,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,IfElse,IntTest,Leq,Log,Lt,Neg,Neq,Not,Num,OK,Or,PERCENT,PI,PlusMinus,Pow,Power,Prod,Product,Root,Sqrt,Square,Sum,TRUE,UNDEFINED,absToPlusMinusInEq,arrsplit,collapseAbsFrac,collapseAbsI,collapseAbsNeg,collapseAbsNum,collapseAbsPow,collapseAbsProd,deepcopy,expandAbsInCombLarger,expandAbsInCombSmaller,expandAbsPartInRelAndFix,expandAbsToIfElse,expandPlusMinusInRel,exportTo,five,flipRel,four,funcs,intersection,isErr,isOK,k,killAbsInPlusMinus,killNegInPlusMinus,makeCheck,mixin,one,plusMinusZeroToZero,posNegOrToPlusMinus,printObj,three,two,v,x,y,z,zero,_ref;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),flipRel=_ref.flipRel,IfElse=_ref.IfElse,DivTest=_ref.DivTest,IntTest=_ref.IntTest,Square=_ref.Square,Cube=_ref.Cube,PlusMinus=_ref.PlusMinus,Log=_ref.Log,Abs=_ref.Abs,PI=_ref.PI,Root=_ref.Root,Sqrt=_ref.Sqrt,Cbrt=_ref.Cbrt,arrsplit=_ref.arrsplit,E=_ref.E,I=_ref.I,PERCENT=_ref.PERCENT,intersection=_ref.intersection,UNDEFINED=_ref.UNDEFINED,deepcopy=_ref.deepcopy,isErr=_ref.isErr,isOK=_ref.isOK,mixin=_ref.mixin,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;killNegInPlusMinus={info:{name:"killNegInPlusMinus",effect:"simplifying",example:{str:"+-(x*-y)",selection:[[1]],choices:["facs"]},tags:["plusminus","negation","negativefactor"],uses:["expandPlusMinusInRel","moveNegFromFacToProd","collapseDoubleNeg","posNegOrToPlusMinus"],lesson:"posneg"},target:"plusminus",choices:{options:function(o){return o.deps.getFacOptions(o.target.objs[0])}},selection:{filter:"negation",from:function(o){return o.deps.getFacs(o.target.objs[0],o.choices[0])}},auto:function(o){var analysis,choice,fac,possibility,residue,sels,_i,_len;analysis=o.deps.getFacPossibilities(mixin({oneatatime:true,allowdenom:false,obj:o.target.objs[0]},o));for(_i=0,_len=analysis.length;_i<_len;_i++){possibility=analysis[_i];choice=possibility[0],sels=possibility[1],fac=possibility[2],residue=possibility[3];if(fac.type==="negation"){return{choices:[choice],selection:[sels]}}}return Err("AUTOnoneginplusminus")},perform:function(o){var facchoice,facsel,negpath;facchoice=o.choices[0];facsel=o.selection[0][0];negpath=o.deps.facPath(facchoice,facsel);o.beforemark([0].concat(negpath));o.aftermark([0].concat(negpath));o["do"]("expandPlusMinusInRel","expandplusminus",{hunt:[[]]});if(facchoice!=="self"){o["do"]("moveNegFromFacToProd","makefirstprodneg",{aim:[0].concat(negpath.slice(0,-1)),selection:[[facsel]]});o["do"]("moveNegFromFacToProd","makesecondprodneg",{aim:[1,0].concat(negpath.slice(0,-1)),selection:[[facsel]]})}o["do"]("collapseDoubleNeg","collapsedouble",{aim:[1]});return o["do"]("posNegOrToPlusMinus","andplusminusify",{selection:[[0],[1]]})}};killAbsInPlusMinus={info:{name:"killAbsInPlusMinus",effect:"simplifying",example:{str:"+-(x*|y|)",selection:[[1]],choices:["facs"]},tags:["absolute","plusminus"],uses:["expandAbsToIfElse","killNegInPlusMinus","collapseIfElseWithSameBranches"],lesson:"posneg"},target:"plusminus",choices:{options:function(o){return o.deps.getFacOptions(o.target.objs[0])}},selection:{filter:"absolute",from:function(o){return o.deps.getFacs(o.target.objs[0],o.choices[0])}},auto:function(o){var analysis,choice,fac,possibility,residue,sels,_i,_len;analysis=o.deps.getFacPossibilities(mixin({oneatatime:true,allowdenom:false,obj:o.target.objs[0]},o));for(_i=0,_len=analysis.length;_i<_len;_i++){possibility=analysis[_i];choice=possibility[0],sels=possibility[1],fac=possibility[2],residue=possibility[3];if(fac.type==="absolute"){return{choices:[choice],selection:[sels]}}}return Err("AUTOnoabsinplusminus")},perform:function(o){var abspath,facchoice,facsel;facchoice=o.choices[0];facsel=o.selection[0][0];abspath=o.deps.facPath(facchoice,facsel);o.beforemark([0].concat(abspath));o.aftermark([0].concat(abspath));o["do"]("expandAbsToIfElse","expandabs",{hunt:[[0].concat(abspath)]});o["do"]("killNegInPlusMinus","removeneg",{aim:[1],selection:[[facsel]],choices:[facchoice]});return o["do"]("collapseIfElseWithSameBranches","nowcollapse")}};expandAbsToIfElse={info:{name:"expandAbsToIfElse",effect:"simplifying",example:{str:"|x|",hunt:[[]]},tags:["absolute","ifelse"],lesson:"posneg"},target:"all",auto:function(o){var abspaths,exps,lookfor,varname,varpaths,_ref1;varpaths={};_ref1=o.deps.varDependency(o.target);for(varname in _ref1){exps=_ref1[varname];lookfor=Abs({type:"variable",val:varname});abspaths=o.deps.findAllPathsTo(o.target,lookfor);if(abspaths.length){return{hunt:abspaths}}}return Err("AUTOnoabs")},hunt:{instruction:"HUNTtheabs",type:"absolute",multiple:true},perform:function(o){var abschild,aftermarks,negversion,obj,path,posversion,_i,_len,_ref1;path=o.hunt[0];if(o.hunt.length===1&&o.hunt[0].length===0){obj=o.target.objs[0];return{result:IfElse(Lt(obj,zero),Neg(obj),obj)}}else{abschild=o.deps.lookUp(o.target,o.hunt[0]).objs[0];negversion=deepcopy(o.target);posversion=deepcopy(o.target);aftermarks=[];_ref1=o.hunt;for(_i=0,_len=_ref1.length;_i<_len;_i++){path=_ref1[_i];negversion=o.deps.exchangeChild(negversion,Neg(abschild),path);posversion=o.deps.exchangeChild(posversion,abschild,path);aftermarks.push([1].concat(path));aftermarks.push([2].concat(path))}return{result:IfElse(Lt(abschild,zero),negversion,posversion),beforemarks:o.hunt,aftermarks:aftermarks}}}};posNegOrToPlusMinus={info:{name:"posNegOrToPlusMinus",effect:"complicating",example:{str:"x or -x",selection:[[1],[0]]},tags:["plusminus","logicor"],lesson:"posneg",opposite:"expandPlusMinusInRel"},target:"OR",selection:{max:1,makefirstunique:true,questions:[{filter:"negation"},{}]},validate:function(o){if(o.deps.equal(o.target.objs[o.selection[0][0]].objs[0],o.target.objs[o.selection[1][0]])){return OK}else{return Err("VALmustbeposneg")}},perform:function(o){return{beforemarks:[[0],[1]],result:PlusMinus(o.target.objs[o.selection[1][0]])}}};collapseAbsNeg={info:{name:"collapseAbsNeg",effect:"simplifying",example:"|-x|",tags:["absolute","negation"],lesson:"posneg"},prints:{errors:["TARmustbeabsneg"]},target:{type:"absolute",validate:function(_arg){var n;n=_arg.target.objs[0];if(n.type==="negation"){return OK}else{return Err("TARmustbeabsnum",[0])}}},perform:function(_arg){var inner;inner=_arg.target.objs[0].objs[0];return{beforemarks:[[0,0]],aftermarks:[[0]],result:Abs(inner)}}};collapseAbsI={info:{name:"collapseAbsI",effect:"simplifying",example:"|i|",tags:["absolute","constanti","number1"],lesson:"complexconst"},target:{type:"absolute",validate:function(_arg){var deps,n,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,n=_ref2[0];if(deps.equal(n,I)){return OK}else{return Err("TARmustbeabi",[0])}}},perform:function(o){return{result:one,beforemarks:[[0]]}}};collapseAbsNum={info:{name:"collapseAbsNum",effect:"simplifying",example:"|7|",tags:["absolute","integer","naturalnum"],uses:["expandAbsToIfElse","numericRelToBool","evalIfElse"],lesson:"posneg"},prints:{errors:["TARmustbeabsnum"]},target:{type:"absolute",validate:function(_arg){var n,_ref1;n=_arg.target.objs[0];if(n.type==="number"||(_ref1=n.val)==="pi"||_ref1==="e"){return OK}else{return Err("TARmustbeabsnum")}}},perform:function(o){o.beforemark([[0]]);o["do"]("expandAbsToIfElse","writeasbranch",{hunt:[[]]});o["do"]("numericRelToBool","notlessthan0",{aim:[0],choices:["false"]});return o["do"]("evalIfElse","selectposbranch")}};collapseAbsPow={info:{name:"collapseAbsPow",effect:"simplifying",example:"|x^y|",tags:["absolute","power"],lesson:"posneg"},prints:{errors:["TARmustbeabspow"]},target:{type:"absolute",validate:function(_arg){var n;n=_arg.target.objs[0];if(n.type==="power"){return OK}else{return Err("TARmustbeabspow")}}},perform:function(_arg){var base,exp,_ref1;_ref1=_arg.target.objs[0].objs,base=_ref1[0],exp=_ref1[1];return{result:Pow(Abs(base),exp)}}};collapseAbsFrac={info:{name:"collapseAbsFrac",effect:"simplifying",example:"|x/y|",tags:["absolute","fraction"],lesson:"posneg"},prints:{errors:["TARmustbeabsfrac"]},target:{type:"absolute",validate:function(_arg){var n;n=_arg.target.objs[0];if(n.type==="fraction"){return OK}else{return Err("TARmustbeabsfrac")}}},perform:function(_arg){var denom,numer,_ref1;_ref1=_arg.target.objs[0].objs,numer=_ref1[0],denom=_ref1[1];return{result:Frac(Abs(numer),Abs(denom))}}};collapseAbsProd={info:{name:"collapseAbsProd",effect:"simplifying",example:"|xyx|",tags:["product","absolute"],lesson:"posneg"},prints:{errors:["TARmustbeabsprod"]},target:{type:"absolute",validate:function(_arg){var n;n=_arg.target.objs[0];if(n.type==="product"){return OK}else{return Err("TARmustbeabsprod")}}},perform:function(_arg){var fac,facs;facs=_arg.target.objs[0].objs;return{result:Prod(function(){var _i,_len,_results;_results=[];for(_i=0,_len=facs.length;_i<_len;_i++){fac=facs[_i];_results.push(Abs(fac))}return _results}())}}};plusMinusZeroToZero={info:{name:"plusMinusZeroToZero",effect:"simplifying",example:"+-0",tags:["number0","plusminus"],uses:["expandPlusMinusInRel","zeroFacExprToZero","purgeDuplicatesFromLogic"],lesson:"posneg"},prints:{errors:["TARpartmustbezero"]},target:{type:"plusminus",validate:function(o){if(o.deps.equal(o.target.objs[0],zero)){return OK}else{return Err("TARpartmustbezero")}}},perform:function(o){o["do"]("expandPlusMinusInRel","firstexpand",{hunt:[[]]});o["do"]("zeroFacExprToZero","thennegzerotozero",{aim:[1],selection:[[0]],choices:["negchild"]});return o["do"]("purgeDuplicatesFromLogic","removedouble",{selection:[[0,1]]})}};expandPlusMinusInRel={info:{name:"expandPlusMinusInRel",effect:"simplifying",example:{str:"x=y+(+-7)",hunt:[[1,1]]},tags:["logic","logicor","relation","plusminus"],opposite:"posNegOrToPlusMinus",lesson:"posneg",desperate:true},auto:function(o){var findplusminus,whereisit,_ref1;findplusminus=function(obj,path){var child,n,test,_i,_len,_ref1;if(obj.type==="plusminus"){return path}else if(obj.objs){_ref1=obj.objs;for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){child=_ref1[n];test=findplusminus(child,path.concat(n));if(test){return test}}return false}else{return false}};whereisit=findplusminus(o.target,[]);if(whereisit&&(o.target.type==="relation"||o.desperate===1&&!((_ref1=o.target.type)==="AND"||_ref1==="OR")||o.desperate===2)){return{hunt:[whereisit]}}else{return Err("AUTOnoplusminus")}},hunt:{filter:"plusminus"},perform:function(o){var path,plusminusobj;path=o.hunt[0];plusminusobj=o.deps.lookUp(o.target,path).objs[0];return{result:Or(o.deps.exchangeChild(o.target,plusminusobj,path),o.deps.exchangeChild(o.target,Neg(plusminusobj),path)),beforemarks:[o.hunt],aftermarks:[[0].concat(o.hunt),[1].concat(o.hunt)]}}};absToPlusMinusInEq={info:{name:"absToPlusMinusInEq",effect:"simplifying",example:{str:"|x|=4",selection:[[0]]},tags:["relation","absolute","equality","plusminus"],lesson:"posneg"},target:{type:"relation",validate:function(o){var _ref1;if((_ref1=o.target.val)==="eq"||_ref1==="neq"){return OK}else{return Err("TARmustnenoncomb")}}},selection:{max:1,filter:"absolute"},perform:function(_arg){var left,right,side,val,_ref1,_ref2,_ref3,_ref4;_ref1=_arg.selection,_ref2=_ref1[0],side=_ref2[0],_ref3=_arg.target,val=_ref3.val,_ref4=_ref3.objs,left=_ref4[0],right=_ref4[1];return{result:side?{type:"relation",val:val,objs:[PlusMinus(left),right.objs[0]]}:{type:"relation",val:val,objs:[left.objs[0],PlusMinus(right)]},beforemarks:[[side,0]],aftermarks:[[side]]}}};expandAbsInCombSmaller={info:{name:"expandAbsInCombSmaller",effect:"simplifying",example:{str:"|x|<4",selection:[[0]]},tags:["relation","absolute","comparison"],lesson:"posneg"},target:{type:"relation",validate:function(o){if(o.target.val[0]==="l"&&o.target.objs[0].type==="absolute"||o.target.val[0]==="g"&&o.target.objs[1].type==="absolute"){return OK}else{return Err("TARmustbecompabssmall")}}},selection:{max:1,filter:"absolute"},perform:function(_arg){var deps,left,r,right,side,val,_ref1,_ref2,_ref3,_ref4;deps=_arg.deps,_ref1=_arg.selection,_ref2=_ref1[0],side=_ref2[0],_ref3=_arg.target,val=_ref3.val,_ref4=_ref3.objs,left=_ref4[0],right=_ref4[1];r=side===0?And({type:"relation",val:val,objs:[left.objs[0],right]},flipRel({type:"relation",val:val,objs:[left.objs[0],Neg(right)]}),{type:"relation",val:val,objs:[zero,right]}):And({type:"relation",val:val,objs:[left,right.objs[0]]},flipRel({type:"relation",val:val,objs:[Neg(left),right.objs[0]]}),{type:"relation",val:val,objs:[left,zero]});return{result:r,beforemarks:[[side,0]],aftermarks:[[0,side],[1,side],[2,1]]}}};expandAbsInCombLarger={info:{name:"expandAbsInCombSmaller",effect:"simplifying",example:{str:"5<|x|",selection:[[1]]},tags:["relation","absolute","comparison"],lesson:"posneg"},target:{type:"relation",validate:function(o){if(o.target.val[0]==="g"&&o.target.objs[0].type==="absolute"||o.target.val[0]==="l"&&o.target.objs[1].type==="absolute"){return OK}else{return Err("TARmustbecompabslarge")}}},selection:{max:1,filter:"absolute"},perform:function(_arg){var deps,left,r,right,side,val,_ref1,_ref2,_ref3,_ref4;deps=_arg.deps,_ref1=_arg.selection,_ref2=_ref1[0],side=_ref2[0],_ref3=_arg.target,val=_ref3.val,_ref4=_ref3.objs,left=_ref4[0],right=_ref4[1];r=side===0?Or({type:"relation",val:val,objs:[left.objs[0],right]},flipRel({type:"relation",val:val,objs:[left.objs[0],Neg(right)]})):Or({type:"relation",val:val,objs:[left,right.objs[0]]},flipRel({type:"relation",val:val,objs:[Neg(left),right.objs[0]]}));return{result:r,beforemarks:[[side,0]],aftermarks:[[0,side],[1,side],[2,1]]}}};expandAbsPartInRelAndFix={info:{name:"expandAbsPartInRelAndFix",effect:"simplifying",example:{str:"|x|<4",selection:[[0]]},tags:["relation","absolute"],uses:["expandAbsInCombSmaller","expandAbsInCombLarger","absToPlusMinusInEq","numericRelToBool","purgeTrueFromAnd","andWithFalseIsFalse"],lesson:"posneg"},target:"relation",selection:{max:1,filter:"absolute"},perform:function(o){var sel;sel=o.selection;o.doIf("absToPlusMinusInEq","expandabsineq",{selection:sel});o.doIf("expandAbsInCombSmaller","expandabsincombsmall",{selection:sel});o.doIf("expandAbsInCombLarger","expandabsincombbig",{selection:sel});o["try"]("numericRelToBool","fixzerocond",{aim:[2]});o.doIf("purgeTrueFromAnd","cleanfromzerocond",{selection:[[2]]});return o.doIf("andWithFalseIsFalse","thiswenttoshit",{selection:[[2]]})}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={killNegInPlusMinus:killNegInPlusMinus,collapseAbsI:collapseAbsI,expandAbsPartInRelAndFix:expandAbsPartInRelAndFix,expandAbsInCombLarger:expandAbsInCombLarger,expandAbsInCombSmaller:expandAbsInCombSmaller,absToPlusMinusInEq:absToPlusMinusInEq,killAbsInPlusMinus:killAbsInPlusMinus,posNegOrToPlusMinus:posNegOrToPlusMinus,collapseAbsNeg:collapseAbsNeg,expandPlusMinusInRel:expandPlusMinusInRel,expandAbsToIfElse:expandAbsToIfElse,plusMinusZeroToZero:plusMinusZeroToZero,collapseAbsFrac:collapseAbsFrac,collapseAbsPow:collapseAbsPow,collapseAbsProd:collapseAbsProd,collapseAbsNum:collapseAbsNum};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);