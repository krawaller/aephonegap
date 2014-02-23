(function(){var Abs,And,DivTest,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,IfElse,Leq,Lt,Neg,Neq,Not,Num,OK,Or,Pow,Power,Prod,Product,Root,Sum,TRUE,UNDEFINED,collapseInnerExpNumRoot,collapseNegSquareRoot,collapseNumBasePowRoot,collapsePartNumRoot,collapseRoot,collapseRootAndSimplify,collapseRootBaseInnerFacProdExpPow,collapseRootBasePow,collapseRootBaseProdExpPow,collapseRootOfISquared,collapseRootProd,collapseRootWithIndexOne,collapseSecretNumRoot,deepcopy,exportTo,five,four,fracExpPowToRoot,fracOfRootsToRootOfFrac,funcs,isErr,isPositive,k,makeCheck,mixin,numRootToDec,objToRootProd,one,oneNumFracExpPowToRoot,printObj,rootOfFracToFracOfRoots,rootOfFracToFracOfRootsAndSimplify,rootOfZeroIsZero,rootToOneNumFracExpPow,rootWithGradeZeroToUndef,simplifyRootWithFracIndex,simplifyRootWithNegIndex,three,two,v,x,y,z,zero,_ref;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),I=_ref.I,IfElse=_ref.IfElse,DivTest=_ref.DivTest,Abs=_ref.Abs,isErr=_ref.isErr,Root=_ref.Root,UNDEFINED=_ref.UNDEFINED,deepcopy=_ref.deepcopy,mixin=_ref.mixin,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;isPositive=function(item){var _ref1,_ref2;return item.type==="number"||item.type==="const"&&((_ref1=item.val)==="pi"||_ref1==="e")||((_ref2=item.type)==="fraction"||_ref2==="power")&&isPositive(item.objs[0])&&isPositive(item.objs[1]||item.type==="log")};numRootToDec={info:{name:"numRootToDec",effect:"decimalifying",example:"sqrt 24",tags:["approximate","decimal","root"],lesson:"roots101",uses:["rootToOneNumFracExpPow","fracToDecNum","approxDecNumPow"]},prints:{errors:["TARgrademustbenum"]},target:{type:"root",validate:function(_arg){var grade,rad,_ref1;_ref1=_arg.target.objs,rad=_ref1[0],grade=_ref1[1];if(rad.type!=="number"){return Err("TARradmustbenum",[0])}else if(grade.type!=="number"){return Err("TARgrademustbenum",[1])}else{return OK}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","writeaspow");o["do"]("fracToDecNum","turnexptodec",{aim:[1]});return o["do"]("approxDecNumPow","finallypowtodec")}};oneNumFracExpPowToRoot={info:{name:"oneNumFracExpPowToRoot",effect:"simplifying",example:"3^(1/4)",tags:["root","power"],opposite:"rootToOneNumFracExpPow",lesson:"roots102"},prints:{errors:["TARexpmustbefracwithnumer1"]},target:{type:"power",validate:function(_arg){var base,deps,exp,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,base=_ref2[0],exp=_ref2[1];if(exp.type==="fraction"&&deps.equal(exp.objs[0],one)){return OK}else{return Err("TARexpmustbefracwithnumer1")}}},perform:function(_arg){var base,denom,num,_ref1,_ref2,_ref3;_ref1=_arg.target.objs,base=_ref1[0],_ref2=_ref1[1],_ref3=_ref2.objs,num=_ref3[0],denom=_ref3[1];return{result:Root(base,denom)}}};collapseRootProd={info:{name:"collapseRootProd",effect:"simplifying",example:"sqrt(xy)",tags:["root"],uses:["rootToOneNumFracExpPow","biProdBasePowToProd","oneNumFracExpPowToRoot"],lesson:"roots102"},prints:{errors:["TARmustberootprod"]},target:{type:"root",validate:function(_arg){var n;n=_arg.target.objs[0];if(n.type==="product"){return OK}else{return Err("TARmustberootprod")}}},perform:function(o){var n,_i,_ref1;o["do"]("rootToOneNumFracExpPow","writeaspow");o["do"]("biProdBasePowToProd","powtoprod");for(n=_i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;n=0<=_ref1?++_i:--_i){o["do"]("oneNumFracExpPowToRoot","powtoroot",{aim:[n]})}return o}};collapseRootAndSimplify={info:{name:"collapseRootAndSimplify",effect:"simplifying",example:"sqrt (x2",tags:["root","power","ifelse"],uses:["collapseRoot","evalNumericDivTest","evalIfElse","collapseAbsNum","collapseAbsNeg"],lesson:"roots103"},prints:{errors:["TARroottargetmustbepow","TARroottargetexpmustmatchrootnum"]},target:{type:"root",validate:function(o){var trgt;trgt=o.target.objs[0];if(trgt.type!=="power"){return Err("TARroottargetmustbepow",[0])}else if(!o.deps.equal(trgt.objs[1],o.target.objs[1])){return Err("TARroottargetexpmustmatchrootnum",[0,1])}else{return OK}}},perform:function(o){o["do"]("collapseRoot","collapseroot");o["try"]("evalNumericDivTest","evaltest",{aim:[0]});o["try"]("evalIfElse","choosebranch");o["try"]("collapseAbsNeg","collapseabs");return o["try"]("collapseAbsNum","andfinallyabsnum")}};collapseRoot={info:{name:"collapseRoot",effect:"simplifying",example:"sqrt (x2)",tags:["root","power","ifelse"],lesson:"roots103"},prints:{errors:["TARroottargetmustbepow","TARroottargetexpmustmatchrootnum"]},target:{type:"root",validate:function(o){var trgt;trgt=o.target.objs[0];if(trgt.type!=="power"){return Err("TARroottargetmustbepow",[0])}else if(!o.deps.equal(trgt.objs[1],o.target.objs[1])){return Err("TARroottargetexpmustmatchrootnum",[0,1])}else{return OK}}},perform:function(_arg){var base,cheat,exp,grade,_ref1,_ref2,_ref3,_ref4;cheat=_arg.cheat,_ref1=_arg.target,_ref2=_ref1.objs,_ref3=_ref2[0],_ref4=_ref3.objs,base=_ref4[0],exp=_ref4[1],grade=_ref2[1];if(cheat){return{result:base}}else{return{result:IfElse(DivTest(grade,two),Abs(base),base)}}}};collapseRootBasePow={info:{name:"collapseRootBasePow",effect:"simplifying",example:"(sqrt x)^2",tags:["root","power"],uses:["rootToOneNumFracExpPow","powBasePowToProdExp","elimFacWithFracFac","oneExpPowerToBase"],lesson:"roots101"},prints:{errors:["TARbasemustberoot","TARbaserootordermustmatchexp"]},target:{type:"power",validate:function(o){var base;base=o.target.objs[0];if(base.type!=="root"){return Err("TARbasemustberoot",[0])}else if(!o.deps.equal(base.objs[1],o.target.objs[1])){return Err("TARbaserootordermustmatchexp",[0,1])}else{return OK}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","rewritetofrac",{aim:[0]});o["do"]("powBasePowToProdExp","flattentower");o["do"]("elimFacWithFracFac","multinandelim",{aim:[1],selection:[[1],[0],[0]],choices:["self"]});return o["do"]("oneExpPowerToBase","remove1exp")}};fracOfRootsToRootOfFrac={info:{name:"fracOfRootsToRootOfFrac",effect:"simplifying",example:"(sqrt x)/(sqrt y)",tags:["root","fraction"],uses:["rootToOneNumFracExpPow","fracOfPowsToPowOfFrac","oneNumFracExpPowToRoot"],lesson:"roots102",opposite:"rootOfFracToFracOfRoots"},target:{type:"fraction",validate:function(_arg){var denom,deps,numer,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,numer=_ref2[0],denom=_ref2[1];if(numer.type!=="root"){return Err("TARnumermustberoot",[0])}else if(denom.type!=="root"){return Err("TARdenommustberoot",[1])}else if(!deps.equal(numer.objs[1],denom.objs[1])){return Err("TARdiffrootindex")}else{return OK}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","rewritenumerator",{aim:[0]});o["do"]("rootToOneNumFracExpPow","rewritedenominator",{aim:[1]});o["do"]("fracOfPowsToPowOfFrac","nowchangetopow");return o["do"]("oneNumFracExpPowToRoot","finallywriteasroot")}};rootOfFracToFracOfRoots={info:{name:"rootOfFracToFracOfRoots",effect:"complicating",example:"sqrt (x/y)",tags:["root","fraction"],uses:["rootToOneNumFracExpPow","extractBaseFraction","oneNumFracExpPowToRoot"],opposite:"fracOfRootsToRootOfFrac",lesson:"roots102"},target:{type:"root",validate:function(_arg){var frac;frac=_arg.target.objs[0];if(frac.type==="fraction"){return OK}else{return Err("TARmustberootoffrac")}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","rewriteasfrac");o["do"]("extractBaseFraction","tofracofpows");o["do"]("oneNumFracExpPowToRoot","rewritenumer",{aim:[0]});o["do"]("oneNumFracExpPowToRoot","rewritedenom",{aim:[1]});o.beforemark([[0,0],[0,1]]);return o.aftermark([[0,0],[0,1]])}};rootToOneNumFracExpPow={info:{name:"rootToOneNumFracExpPow",effect:"complicating",example:"sqrt x",tags:["root","power"],opposite:"oneNumFracExpPowToRoot",lesson:"roots101"},target:"root",perform:function(_arg){var grade,radicand,_ref1;_ref1=_arg.target.objs,radicand=_ref1[0],grade=_ref1[1];return{result:Pow(radicand,Frac(one,grade)),beforemarks:[[1]],aftermarks:[[1,1]]}}};rootOfZeroIsZero={info:{name:"rootOfZeroIsZero",effect:"simplifying",example:"xroot0",tags:["root","number0","collapse"],uses:["zeroToPow","collapseRoot"],lesson:"roots103"},prints:{errors:["TARradmustbezero"]},target:{type:"root",validate:function(_arg){var deps,grade,rad,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,rad=_ref2[0],grade=_ref2[1];if(deps.equal(rad,zero)){return OK}else{return Err("TARradmustbezero",[0])}}},perform:function(o){o["do"]("zeroToPow","firstturn0topow",{aim:[0],argument:o.target.objs[1]});o["do"]("collapseRoot","thencollapseroot",{cheat:true});return o.beforemark([0])}};fracExpPowToRoot={info:{name:"fracExpPowToRoot",effect:"simplifying",example:"3^(2/5)",uses:["extractFacsFromFrac","prodExpPowToPowBase","oneNumFracExpPowToRoot"],tags:["power","root"],lesson:"roots102"},prints:{errors:["TARexpmustbefracwithnotnumer1"]},target:{type:"power",validate:function(_arg){var base,deps,exp,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,base=_ref2[0],exp=_ref2[1];if(exp.type==="fraction"&&!deps.equal(exp.objs[0],one)){return OK}else{return Err("TARexpmustbefracwithnotnumer1")}}},perform:function(o){o["do"]("extractFacsFromFrac","extractnum",{aim:[1],choices:["self","self"],selection:[[0],[]],direction:"left"});o["do"]("prodExpPowToPowBase","buildtower",{selection:[[1]]});return o["do"]("oneNumFracExpPowToRoot","thenrootify")}};rootOfFracToFracOfRootsAndSimplify={info:{name:"rootOfFracToFracOfRootsAndSimplify",effect:"simplifying",example:"sqrt (4/x)",uses:["rootOfFracToFracOfRoots","collapseRootAndSimplify","collapseInnerExpNumRoot","collapseSecretNumRoot","collapseNegSquareRoot"],tags:["root","fraction"],lesson:"roots103",circle:["collapseNegSquareRoot"]},target:{type:"root",validate:function(_arg){var deps,index,op,rad,radicand,result,root,_i,_j,_len,_len1,_ref1,_ref2,_ref3,_ref4;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(radicand.type!=="fraction"){return Err("TARmustberootoffrac")}else{_ref3=radicand.objs;for(_i=0,_len=_ref3.length;_i<_len;_i++){rad=_ref3[_i];root=Root(rad,index);_ref4=["collapseRootAndSimplify","collapseInnerExpNumRoot","collapseSecretNumRoot","collapseNegSquareRoot"];for(_j=0,_len1=_ref4.length;_j<_len1;_j++){op=_ref4[_j];result=deps.generateOpInputForTarget({deps:deps,tool:deps[op],target:root});if(!isErr(result)){return OK}}}return Err("TARcannotsimplify")}}},perform:function(o){var floor,n,op,_i,_j,_len,_len1,_ref1,_ref2;o["do"]("rootOfFracToFracOfRoots","firstmakeintofrac");_ref1=["numer","denom"];for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){floor=_ref1[n];_ref2=["collapseRootAndSimplify","collapseInnerExpNumRoot","collapseSecretNumRoot","collapseNegSquareRoot"];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){op=_ref2[_j];o["try"](op,"nowwesimplify"+floor+"by"+op.toLowerCase(),{aim:[n]})}}return o}};collapseInnerExpNumRoot={info:{name:"collapseInnerExpNumRoot",effect:"simplifying",example:"sqrt (x^6)",uses:["exposeFacInNumber","prodExpPowToPowBase","collapseRoot"],tags:["power","root","radicand"],lesson:"roots103"},prints:{errors:["TARmustbenumericroot","TARroottargetmustbepow","TARroottargetmusthavenumexp","TARroottargetexpmustbedividablebyrootorder"],steps:["extractrootorderdivrestinexp","buildpowtoflatten","finallycollapseroot"]},target:{type:"root",validate:function(o){var trgt,whichroot;whichroot=o.target.objs[1];trgt=o.target.objs[0];if(whichroot.type!=="number"){return Err("TARmustbenumericroot",[1])}else if(trgt.type!=="power"){return Err("TARroottargetmustbepow",[0])}else if(trgt.objs[1].type!=="number"){return Err("TARroottargetmusthavenumexp",[0,1])}else if(!o.deps.divideCheck(mixin({obj1:trgt.objs[1],obj2:whichroot},o)).found){return Err("TARroottargetexpmustbedividablebyrootorder",[0,1])}else{return OK}}},perform:function(o){var divcheck;divcheck=o.deps.divideCheck(mixin({obj1:o.target.objs[0].objs[1],obj2:o.target.objs[1]},o));o["do"]("exposeFacInNumber","extractrootorderdivrestinexp",{aim:[0,1],direction:"left",argument:divcheck.minrest});o["do"]("prodExpPowToPowBase","buildpowtoflatten",{aim:[0],selection:[[1]]});return o["do"]("collapseRoot","finallycollapseroot",{cheat:true})}};collapseSecretNumRoot={info:{name:"collapseSecretNumRoot",effect:"simplifying",example:"sqrt 16",uses:["numToProd","mergeSameBaseFacs","collapseNumBasePowRoot"],tags:["root"],lesson:"roots103"},prints:{errors:["TARrootordermustbenumber","TARroottargetmustbenumber","TARroottargetmusthavenumexp","TARpowbasecannotbefactoredtopowofrootorder"],steps:["factorisetofacpow","mergefacstopower","finallycollapseroot","andcollapseabsnum"]},target:{type:"root",validate:function(o){var numval,res,rootorder,trgt,whichroot;whichroot=o.target.objs[1];trgt=o.target.objs[0];if(whichroot.type!=="number"){return Err("TARrootordermustbenumber",[1])}else if(trgt.type!=="number"){return Err("TARroottargetmustbenumber",[0])}else{rootorder=parseFloat(o.target.objs[1].val);numval=parseFloat(o.target.objs[0].val);res=Math.pow(numval,1/rootorder);if(res!==Math.floor(res)){return Err("TARpowbasecannotbefactoredtopowofrootorder",[0])}else{return OK}}}},perform:function(o){var n,newfac,numval,rootorder;rootorder=parseFloat(o.target.objs[1].val);numval=parseFloat(o.target.objs[0].val);newfac=Math.pow(numval,1/rootorder);o["do"]("numToProd","factorisetofacpow",{aim:[0],argument:Prod(function(){var _i,_results;_results=[];for(n=_i=0;0<=rootorder?_i<rootorder:_i>rootorder;n=0<=rootorder?++_i:--_i){_results.push(Num(newfac))}return _results}())});o["do"]("mergeSameBaseFacs","mergefacstopower",{aim:[0],selection:[function(){var _i,_results;_results=[];for(n=_i=0;0<=rootorder?_i<rootorder:_i>rootorder;n=0<=rootorder?++_i:--_i){_results.push(n)}return _results}()]});return o["do"]("collapseNumBasePowRoot","finallycollapseroot")}};collapseNumBasePowRoot={info:{name:"collapseNumBasePowRoot",effect:"simplifying",example:"sqrt (5^2)",tags:["root","power"],uses:["collapseRoot","collapseAbsNum","collapseIfElseWithSameBranches"],lesson:"roots103"},prints:{errors:["TARroottargetmustbepow","TARroottargetexpmustmatchrootnum","TARrootpowbasemustbenum"]},target:{type:"root",validate:function(o){var base,exp,grade,pow,_ref1,_ref2,_ref3;_ref1=o.target.objs,pow=_ref1[0],grade=_ref1[1];if(pow.type!=="power"){return Err("TARroottargetmustbepow",[0])}else{_ref2=pow.objs,base=_ref2[0],exp=_ref2[1];if(!o.deps.equal(exp,grade)){return Err("TARroottargetexpmustmatchrootnum",[0,1])}else if(!(base.type==="number"||((_ref3=base.val)==="pi"||_ref3==="e"))){return Err("TARrootpowbasemustbenum",[0,0])}else{return OK}}}},perform:function(o){o["do"]("collapseRoot","collapseroot");o["do"]("collapseAbsNum","andcollapseabsnum",{aim:[1]});return o["do"]("collapseIfElseWithSameBranches","nowcollapse")}};collapseNegSquareRoot={info:{name:"collapseNegSquareRoot",effect:"simplifying",example:"sqrt -5",uses:["negToNegOneFacProd","collapseRootProd","negOneToISquared","collapseRootOfISquared"],tags:["root","constanti","squareroot"],lesson:"complexconst"},prints:{errors:["TARmustbesquareroot","TARmustberootofneg"],steps:["firstexpandneg","splitrootprod","buildisquare","finallycollapseiroot"]},target:{type:"root",validate:function(_arg){var deps,index,radicand,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(!deps.equal(index,two)){return Err("TARmustbesquareroot",[1])}else if(radicand.type!=="negation"){return Err("TARmustberootofneg",[0])}else{return OK}}},perform:function(o){var p;if(!o.deps.equal(o.target.objs[0],Neg(one))){o["do"]("negToNegOneFacProd","firstexpandneg",{aim:[0],direction:"right"});o["do"]("collapseRootProd","splitrootprod");p=[1]}else{p=[]}o["do"]("negOneToISquared","buildisquare",{aim:p.concat([0])});return o["do"]("collapseRootOfISquared","collapserootofi",{aim:p})}};collapseRootOfISquared={info:{name:"collapseRootOfISquared",effect:"simplifying",example:"sqrt (i2)",tags:["root","constanti","exponent2","squareroot"],lesson:"complexconst"},target:{type:"root",validate:function(_arg){var equal,index,radicand,_ref1,_ref2,_ref3;_ref1=_arg.deps,equal=_ref1.equal,_ref2=_arg.target,_ref3=_ref2.objs,radicand=_ref3[0],index=_ref3[1];if(equal(index,two)&&radicand.type==="power"&&equal(radicand.objs[1],two)&&equal(radicand.objs[0],I)){return OK}else{return Err("TARmustbepowi")}}},perform:function(o){return{result:I}}};collapsePartNumRoot={info:{name:"collapsePartNumRoot",effect:"simplifying",example:"Cbrt 3648",tags:["root"],uses:["numToProd","mergeSameBaseFacs","collapseRootProd","collapseNumBasePowRoot"],lesson:"roots103"},prints:{errors:["TARnoinnernumroot"]},target:{type:"root",validate:function(o){if(o.deps.faclistGradeNumber(o.target.objs[0],o.target.objs[1])){return OK}else{return Err("TARnoinnernumroot")}}},perform:function(o){var facs,grade,n;grade=parseInt(o.target.objs[1].val);facs=o.deps.faclistGradeNumber(o.target.objs[0],o.target.objs[1]);o["do"]("numToProd","factorisenumber",{aim:[0],argument:Prod(facs)});o["do"]("mergeSameBaseFacs","collect",{aim:[0],selection:[function(){var _i,_results;_results=[];for(n=_i=0;0<=grade?_i<grade:_i>grade;n=0<=grade?++_i:--_i){_results.push(n)}return _results}()]});o["do"]("collapseRootProd","collapserootprod");return o["do"]("collapseNumBasePowRoot","nowcollapsenumroot",{aim:[0]})}};collapseRootBaseProdExpPow={info:{name:"collapseRootBaseProdExpPow",effect:"simplifying",example:{str:"(sqrt x)^(2x)",selection:[[0]]},uses:["prodExpPowToSelectPowBase","collapseRootBasePow"],tags:["root","radicand","productexponent","power"],lesson:"roots101"},prints:{errors:["TARbasemustberoot","TARexpmustbeprod","SELdoesntmatchrootorder"],steps:["buildpowtoflatten","nowcollapsematchingpowroot"]},target:{type:"power",validate:function(o){if(o.target.objs[0].type!=="root"){return Err("TARbasemustberoot")}else if(o.target.objs[1].type!=="product"){return Err("TARexpmustbeprod")}else{return OK}}},selection:{max:1,from:[1],filter:function(o){var rootorder;rootorder=o.target.objs[0].objs[1];if(!o.deps.equal(rootorder,o.item)){return Err("SELdoesntmatchrootorder")}else{return OK}}},perform:function(o){var rest,s;rest=function(){var _i,_ref1,_results;_results=[];for(s=_i=0,_ref1=o.target.objs[1].objs.length;0<=_ref1?_i<_ref1:_i>_ref1;s=0<=_ref1?++_i:--_i){if(s!==o.selection[0][0]){_results.push(s)}}return _results}();o["do"]("prodExpPowToSelectPowBase","buildpowtoflatten",{selection:[rest]});return o["do"]("collapseRootBasePow","nowcollapsematchingpowroot",{aim:[0]})}};collapseRootBaseInnerFacProdExpPow={info:{name:"collapseRootBaseInnerFacProdExpPow",effect:"simplifying",example:{str:"(sqrt x)^(6y)",selection:[[0]]},uses:["exposeFacInNumber","absorbProductFacs","collapseRootBaseProdExpPow"],tags:["root","radicand","productexponent","power"],lesson:"roots101"},prints:{errors:["TARbasemustberoot","TARrootbasemustbenumorder","SELmustselectnumber","SELfacisntdividedbybaserootorder"],instructions:[],steps:["exposerootorderinfac","flattenexpprod","nowcollapsematchingpowroot"]},target:{type:"power",validate:function(o){if(o.target.objs[0].type!=="root"){return Err("TARbasemustberoot")}else if(o.target.objs[0].objs[1].type!=="number"){return Err("TARrootbasemustbenumorder")}else{return OK}}},selection:{max:1,from:function(o){return o.deps.getFacs(o.target.objs[1])},filter:function(o){var divcheck;if(o.item.type!=="number"){return Err("SELmustselectnumber")}else{divcheck=o.deps.divideCheck(mixin({obj1:o.item,obj2:o.target.objs[0].objs[1]},o));if(!divcheck.found){return Err("SELfacisntdividedbybaserootorder")}else{return OK}}}},perform:function(o){var path,sel,wasprod;sel=o.selection[0][0];if(o.target.objs[1].type==="product"){wasprod=true;path=[1,sel]}else{path=[1]}o["do"]("exposeFacInNumber","exposerootorderinfac",{aim:path,direction:"left",argument:o.target.objs[0].objs[1]});if(wasprod){o["do"]("absorbProductFacs","flattenexpprod",{aim:[1],selection:[[sel]]})}return o["do"]("collapseRootBaseProdExpPow","nowcollapsematchingpowroot",{selection:[[sel]]})}};rootWithGradeZeroToUndef={info:{name:"rootWithGradeZeroToUndef",effect:"integrity",example:"0rootx",tags:["root","number0","undefinedval"],uses:["rootToOneNumFracExpPow","zeroDenomFracToUndef","undefChildObjToUndef"],lesson:"roots101"},prints:{errors:["TARindexmustbe0"],steps:["rewritetofrac","exptoundef","nowalltoundef"]},target:{type:"root",validate:function(_arg){var deps,index,radicand,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(deps.equal(index,zero)){return OK}else{return Err("TARindexmustbe0",[1])}}},perform:function(o){o.beforemark([1]);o["do"]("rootToOneNumFracExpPow","rewritetofrac");o["do"]("zeroDenomFracToUndef","exptoundef",{aim:[1]});return o["do"]("undefChildObjToUndef","nowalltoundef",{hunt:[[1]]})}};collapseRootWithIndexOne={info:{name:"collapseRootWithIndexOne",effect:"simplifying",example:"1rootx",tags:["root","number1"],uses:["rootToOneNumFracExpPow","oneDenomFracToNumer","oneExpPowerToBase"],lesson:"roots101"},prints:{errors:["TARindexmustbe1"],steps:["rewritetofrac"]},target:{type:"root",validate:function(_arg){var deps,index,radicand,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(deps.equal(index,one)){return OK}else{return Err("TARindexmustbe1",[1])}}},perform:function(o){o.beforemark([1]);o["do"]("rootToOneNumFracExpPow","rewritetofrac");o["do"]("oneDenomFracToNumer","collapseexp",{aim:[1]});return o["do"]("oneExpPowerToBase","collapsepow")}};simplifyRootWithFracIndex={info:{name:"simplifyRootWithFracIndex",effect:"simplifying",example:"(2/3)rootx",tags:["root"],uses:["rootToOneNumFracExpPow","flattenFracDenom","fracExpPowToRoot"],lesson:"roots102"},prints:{errors:["TARindexmustbefrac"],steps:[]},target:{type:"root",validate:function(_arg){var deps,index,radicand,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(index.type==="fraction"){return OK}else{return Err("TARindexmustbefrac",[1])}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","rewritetofrac");o["do"]("flattenFracDenom","flattenexp",{aim:[1]});return o.doIf("fracExpPowToRoot","thentoroot",{})}};simplifyRootWithNegIndex={info:{name:"simplifyRootWithNegIndex",effect:"simplifying",example:"(-x)rooty",tags:["root"],uses:["rootToOneNumFracExpPow","moveNegFromFloorFacToFrac","negToNegOneFacProd","prodExpPowToPowBase","negExpFacProdToFrac","oneNumFracExpPowToRoot"],lesson:"roots102"},prints:{errors:["TARindexmustbeneg"],steps:[]},target:{type:"root",validate:function(_arg){var deps,index,radicand,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,radicand=_ref2[0],index=_ref2[1];if(index.type==="negation"){return OK}else{return Err("TARindexmustbeneg",[1])}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","rewritetopow");o["do"]("moveNegFromFloorFacToFrac","extractnegtofracexp",{aim:[1],choices:["denom","self"],selection:[[0]]});o["do"]("negToNegOneFacProd","splitnegexp",{aim:[1],direction:"right"});o["do"]("prodExpPowToPowBase","buildup",{selection:[[1]]});o["do"]("negExpFacProdToFrac","turntofrac",{selection:[[0]]});return o["do"]("oneNumFracExpPowToRoot","backtorootform",{aim:[1]})}};objToRootProd={info:{name:"objToRootProd",effect:"complicating",example:{str:"x",argument:two},tags:["root","factorise","squareroot"],uses:["raiseByOne","oneToSameNumerDenomFrac","numToSum","sumNumerFracToSum","biSumExpPowToProd","oneNumFracExpPowToRoot"],lesson:"roots102"},target:"math",perform:function(o){var n,num,rootindex;rootindex=o.argument;num=parseInt(rootindex.val);o["do"]("raiseByOne","createexptosplit");o["do"]("oneToSameNumerDenomFrac","exptofrac",{aim:[1],argument:{type:"number",val:"2"}});o["do"]("numToSum","splitexpnumer",{aim:[1,0],argument:Sum(function(){var _i,_results;_results=[];for(n=_i=0;0<=num?_i<num:_i>num;n=0<=num?++_i:--_i){_results.push(one)}return _results}())});o["do"]("sumNumerFracToSum","splitexptosum",{aim:[1]});o["do"]("biSumExpPowToProd","toprod");o["do"]("oneNumFracExpPowToRoot","firsttoroot",{aim:[0]});return o["do"]("oneNumFracExpPowToRoot","andsecondtoroot",{aim:[1]})}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={collapseRootOfISquared:collapseRootOfISquared,collapseRootAndSimplify:collapseRootAndSimplify,objToRootProd:objToRootProd,simplifyRootWithNegIndex:simplifyRootWithNegIndex,simplifyRootWithFracIndex:simplifyRootWithFracIndex,collapseRootWithIndexOne:collapseRootWithIndexOne,rootWithGradeZeroToUndef:rootWithGradeZeroToUndef,rootToOneNumFracExpPow:rootToOneNumFracExpPow,isPositive:isPositive,rootOfZeroIsZero:rootOfZeroIsZero,fracExpPowToRoot:fracExpPowToRoot,oneNumFracExpPowToRoot:oneNumFracExpPowToRoot,numRootToDec:numRootToDec,collapseNegSquareRoot:collapseNegSquareRoot,collapseNumBasePowRoot:collapseNumBasePowRoot,collapsePartNumRoot:collapsePartNumRoot,collapseRootProd:collapseRootProd,rootOfFracToFracOfRootsAndSimplify:rootOfFracToFracOfRootsAndSimplify,fracOfRootsToRootOfFrac:fracOfRootsToRootOfFrac,rootOfFracToFracOfRoots:rootOfFracToFracOfRoots,collapseRootBaseInnerFacProdExpPow:collapseRootBaseInnerFacProdExpPow,collapseRootBaseProdExpPow:collapseRootBaseProdExpPow,collapseRootBasePow:collapseRootBasePow,collapseSecretNumRoot:collapseSecretNumRoot,collapseInnerExpNumRoot:collapseInnerExpNumRoot,collapseRoot:collapseRoot};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);