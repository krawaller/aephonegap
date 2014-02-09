(function(){var Abs,And,E,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,Leq,Log,Lt,Neg,Neq,Not,Num,OK,Or,PI,Pow,Power,Prod,Product,Root,Sum,TRUE,UNDEFINED,approxLog,approxLogBase10,baseBothSidesOfRel,collapseLogOfRoot,collapsePowWithBaseLogFacInExp,collapsePowWithSecretBaseLogInExp,collapseSecretNumLog,deepcopy,exportTo,five,fixPowWithBaseLogTermInExp,flattenLogOfContainedPowNum,flattenLogOfSecretPowNum,forbidLogBaseOne,forbidLogBaseZero,four,funcs,illegalLog,isErr,k,logBothSidesOfRel,logOfBasePowToExp,logOfBaseToOne,logOfFracToSum,logOfI,logOfNegNum,logOfPowToProd,logOfProdToSum,logOneToZero,logToFracOfLogs,makeCheck,mergePosNegLogTerms,mixin,one,powWithBaseLogExpToExp,printObj,three,two,v,x,y,z,zero,_ref;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),I=_ref.I,PI=_ref.PI,E=_ref.E,Log=_ref.Log,Abs=_ref.Abs,isErr=_ref.isErr,Root=_ref.Root,UNDEFINED=_ref.UNDEFINED,deepcopy=_ref.deepcopy,mixin=_ref.mixin,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;logToFracOfLogs={info:{name:"logToFracOfLogs",effect:"condsimpl",example:{str:"5log3",argument:Num(10)},tags:["log"],lesson:"log101"},prints:{instructs:["ARGenternewbase"],errors:["ARGcannotbe0or1","AUTOonlysimplifbaseisnt10"]},target:"log",argument:{instruction:"ARGenternewbase",validate:function(o){if(o.deps.equal(o.argument,zero)||o.deps.equal(o.argument,zero)){return Err("ARGcannotbe0or1")}else{return OK}}},auto:function(_arg){var base,deps,logee,_ref1,_ref2,_ref3;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,logee=_ref2[0],base=_ref2[1];if((_ref3=base.type)==="power"||_ref3==="fraction"||_ref3==="negation"||_ref3==="product"){return{argument:Num(10)}}else{return Err("AUTOonlysimplifbaseisnt10")}},perform:function(_arg){var argument,base,logee,_ref1,_ref2;argument=_arg.argument,_ref1=_arg.target,_ref2=_ref1.objs,logee=_ref2[0],base=_ref2[1];return{result:Frac(Log(logee,argument),Log(base,argument))}}};illegalLog={info:{name:"illegalLog",effect:"integrity",example:"log 0",tags:["log","undefinedval","number0"],lesson:"log101"},prints:{errors:["TARmustbelogofzero"]},target:{type:"log",validate:function(_arg){var deps,z,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,z=_ref2[0];if(deps.equal(z,zero)){return OK}else{return Err("TARmustbelogofzero")}}},perform:function(){return{result:UNDEFINED,undef:true}}};approxLogBase10={info:{name:"approxLog",effect:"decimalifying",example:"log 12",tags:["log","decimal","approximate","base10log"],lesson:"decimalnums"},prints:{errors:["TARmustbelogofnum","TARbasemustbe10","TARmustntbelog0"]},target:{type:"log",validate:function(_arg){var base,deps,num,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,num=_ref2[0],base=_ref2[1];if(!deps.equal(base,Num(10))){return Err("TARbasemustbe10")}else if(num.type!=="number"){return Err("TARmustbelogofnum",[0])}else if(num.val==="0"){return Err("TARmustntbelog0",[0])}else{return OK}}},perform:function(_arg){var num,numres;num=_arg.target.objs[0];numres=Math.log(parseFloat(num.val))/Math.log(10);return{result:Num(numres),approx:numres*1e3!==Math.floor(numres*1e3)}}};logOfI={info:{name:"logOfI",effect:"simplifying",example:"log i",tags:["log","constanti","pi"],lesson:"log102"},prints:{errors:["TARmustbelogofzero"]},target:{type:"log",validate:function(_arg){var base,deps,i,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,i=_ref2[0],base=_ref2[1];if(deps.equal(i,I)){return OK}else{return Err("TARmustbelogofzero")}}},perform:function(o){return{result:Frac(Prod(I,PI),Prod(two,Log(o.target.objs[1],E)))}}};powWithBaseLogExpToExp={info:{name:"powWithBaseLogExpToExp",effect:"simplifying",example:"10^log x",tags:["log","power"],lesson:"log101"},prints:{errors:["TARexpmustbelog","TARbasemustbeexplogbase"]},target:{type:"power",validate:function(o){if(o.target.objs[1].type!=="log"){return Err("TARexpmustbelog")}else if(o.deps.equal(o.target.objs[0],o.target.objs[1].objs[1])){return OK}else{return Err("TARbasemustbeexplogbase")}}},perform:function(o){return{result:o.target.objs[1].objs[0]}}};logOfProdToSum={info:{name:"logOfProdToSum",effect:"simplifying",example:"log (xy)",tags:["log"],lesson:"log101"},prints:{errors:["TARmustbelogofprod"]},target:{type:"log",validate:function(o){if(o.target.objs[0].type==="product"){return OK}else{return Err("TARmustbelogofprod")}}},perform:function(o){var base,fac,facs,n,nums,prodlen,_i,_results;base=o.target.objs[1];facs=o.target.objs[0].objs;prodlen=facs.length;nums=function(){_results=[];for(var _i=0;0<=prodlen?_i<prodlen:_i>prodlen;0<=prodlen?_i++:_i--){_results.push(_i)}return _results}.apply(this);return{beforemarks:function(){var _j,_len,_results1;_results1=[];for(_j=0,_len=nums.length;_j<_len;_j++){n=nums[_j];_results1.push([0,n])}return _results1}(),aftermarks:function(){var _j,_len,_results1;_results1=[];for(_j=0,_len=nums.length;_j<_len;_j++){n=nums[_j];_results1.push([n,0])}return _results1}(),result:Sum(function(){var _j,_len,_results1;_results1=[];for(_j=0,_len=facs.length;_j<_len;_j++){fac=facs[_j];_results1.push(Log(fac,base))}return _results1}())}}};logOfPowToProd={info:{name:"logOfPowToProd",effect:"simplifying",example:"log (2^x)",tags:["log"],lesson:"log101"},prints:{errors:["TARmustbelogofpow","DIRforexp"]},target:{type:"log",validate:function(o){if(o.target.objs[0].type==="power"){return OK}else{return Err("TARmustbelogofpow")}}},direction:{instruction:"DIRforexp"},perform:function(_arg){var direction,logbase,powbase,powexp,_ref1,_ref2,_ref3,_ref4;direction=_arg.direction,_ref1=_arg.target,_ref2=_ref1.objs,_ref3=_ref2[0],_ref4=_ref3.objs,powbase=_ref4[0],powexp=_ref4[1],logbase=_ref2[1];return{beforemarks:[[0,1]],aftermarks:[[0]],result:direction==="right"?Prod(Log(powbase,logbase),powexp):Prod(powexp,Log(powbase,logbase))}}};logOfBaseToOne={info:{name:"logOfBaseToOne",effect:"simplifying",example:"log 10",tags:["log","number1"],uses:["logToFracOfLogs","sameNumerDenomFracToOne"],lesson:"log101"},prints:{errors:["TARmustbelogofbase"]},target:{type:"log",validate:function(o){if(o.deps.equal(o.target.objs[0],o.target.objs[1])){return OK}else{return Err("TARmustbelogofbase")}}},perform:function(o){o["do"]("logToFracOfLogs","splitlogtofrac",{argument:o.target.objs[0]});return o["do"]("sameNumerDenomFracToOne","collapsefractoone")}};collapsePowWithBaseLogFacInExp={info:{name:"collapsePowWithBaseLogFacInExp",effect:"simplifying",example:{str:"z^(y*zlogx)",selection:[[1]]},uses:["prodExpPowToSelectPowBase","powWithBaseLogExpToExp"],tags:["log"],lesson:"log102"},prints:{errors:["TARexpmustbeprod","SELmustbelogwithpowbasebase"],steps:["buildtop","collapseinner"]},target:{type:"power",validate:function(o){if(o.target.objs[1].type==="product"){return OK}else{return Err("TARexpmustbeprod")}}},selection:{max:1,from:[1],filter:function(o){if(o.item.type==="log"&&o.deps.equal(o.item.objs[1],o.target.objs[0])){return OK}else{return Err("SELmustbelogwithpowbasebase")}}},perform:function(o){var facpos,i,others,outof;facpos=o.selection[0][0];outof=o.target.objs[1].objs.length;others=function(){var _i,_results;_results=[];for(i=_i=0;0<=outof?_i<outof:_i>outof;i=0<=outof?++_i:--_i){if(i!==facpos){_results.push(i)}}return _results}();o["do"]("prodExpPowToSelectPowBase","buildtop",{selection:[others]});o["do"]("powWithBaseLogExpToExp","collapseinner",{aim:[0]});return o.beforemark([[0],[1,facpos]])}};collapsePowWithSecretBaseLogInExp={info:{name:"collapsePowWithSecretBaseLogInExp",effect:"simplifying",example:{str:"25^((3*5log x)",choices:["facs"],selection:[[1]]},uses:["turnNumToPow","powBasePowToProdExp","absorbProductFacs","collapsePowWithBaseLogFacInExp"],tags:["log"],lesson:"log102"},prints:{errors:["TARbasemustbenum"],steps:[],instructions:["CHOfacopt","SELlogsecretnumpow"]},target:{type:"power",validate:function(o){if(o.target.objs[0].type!=="number"){return Err("TARbasemustbenum",[0])}else{return OK}}},selection:{instruction:"SELlogsecretnumpow",max:1,from:function(o){if(o.target.objs[1].type==="product"){return o.target.objs[1].objs}else{return[o.target.objs[1]]}},filter:function(o){var base,num,pow;if(o.item.type!=="log"||o.item.objs[1].type!=="number"){return Err("SELmustselnumericlog")}else if(o.deps.equal(o.item.objs[0],o.target.objs[0])){return Err("SELmustntbesameasbaseshouldbesecret")}else{num=parseFloat(o.target.objs[0].val);base=parseFloat(o.item.objs[1].val);pow=Math.round(1e6*Math.log(num)/Math.log(base))/1e6;if(pow!==Math.floor(pow)){return Err("SELlogbasemustbesecretnumpow")}else{return OK}}}},perform:function(o){var base,facpos,facs,i,num,others,outof,pow;num=parseFloat(o.target.objs[0].val);facs=o.target.objs[1].type==="product"?o.target.objs[1].objs:[o.target.objs[1]];facpos=o.selection[0][0];base=parseFloat(facs[facpos].objs[1].val);pow=Math.round(1e6*Math.log(num)/Math.log(base))/1e6;o.report("qqq");o["do"]("turnNumToPow","firstturnnumtopow",{aim:[0],argument:Pow(Num(base),Num(pow))});o.report("NUMTURNEDTOPOW");o["do"]("powBasePowToProdExp","flattenfirst");o.report("mooo");o["try"]("absorbProductFacs","flattenexp",[1]);outof=o.target.objs[1].objs.length;others=function(){var _i,_results;_results=[];for(i=_i=0;0<=outof?_i<outof:_i>outof;i=0<=outof?++_i:--_i){if(i!==facpos+1){_results.push(i)}}return _results}();o.report("ANDNOW!");return o["do"]("collapsePowWithBaseLogFacInExp","finallyfix",{selection:[[facpos+1]]})}};collapseLogOfRoot={info:{name:"collapseLogOfRoot",effect:"simplifying",example:"log cbrt x",uses:["rootToOneNumFracExpPow","logOfPowToProd","multFacsIntoFrac"],tags:["log","root"],lesson:"roots101"},prints:{errors:["TARmustbelogofroot"],steps:["firstroottopow","thenflattentoprod","finallymult"]},target:{type:"log",validate:function(o){if(o.target.objs[0].type==="root"){return OK}else{return Err("TARmustbelogofroot")}}},perform:function(o){o["do"]("rootToOneNumFracExpPow","firstroottopow",{aim:[0]});o["do"]("logOfPowToProd","thenflattentoprod");return o["do"]("multFacsIntoFrac","finallymult",{selection:[[0],[1]]})}};logOfBasePowToExp={info:{name:"logOfBasePowToExp",effect:"simplifying",example:"log 10^x",uses:["logOfPowToProd","logOfBaseToOne","purgeOneFacs"],tags:["log"],lesson:"log101"},prints:{errors:["TARmustbelogofbasepow"],steps:["logpowtoprod","logbasetoone","finallyremove1fac"]},target:{type:"log",validate:function(o){if(o.target.objs[0].type==="power"&&o.deps.equal(o.target.objs[0].objs[0],o.target.objs[1])){return OK}else{return Err("TARmustbelogofbasepow")}}},perform:function(o){o["do"]("logOfPowToProd","logpowtoprod");o["do"]("logOfBaseToOne","logbasetoone",{aim:[1]});return o["do"]("purgeOneFacs","finallyremove1fac",{selection:[[1]]})}};logOneToZero={info:{name:"logOneToZero",effect:"simplifying",example:"log 1",uses:["oneToZeroExpPower","logOfPowToProd","zeroFacProdToZero"],tags:["log","number1","number0"],lesson:"log102"},prints:{errors:["TARmustbelogone"],steps:["turnonetopow","flattenlogtoprod","thenturntozero"]},target:{type:"log",validate:function(o){if(o.deps.equal(o.target.objs[0],one)){return OK}else{return Err("TARmustbelogone")}}},perform:function(o){o["do"]("oneToZeroExpPower","turnonetopow",{aim:[0],argument:o.target.objs[1]});o["do"]("logOfPowToProd","flattenlogtoprod");return o["do"]("zeroFacProdToZero","thenturntozero",{selection:[[0]]})}};flattenLogOfSecretPowNum={info:{name:"flattenLogOfSecretPowNum",effect:"simplifying",example:"log 10000",uses:["turnNumToPow","logOfBasePowToExp"],tags:["log"],lesson:"log102"},prints:{errors:["TARmustbelogofnum","TARmustbenumbaselog","TARmustbelogofsecretpownum"]},target:{type:"log",validate:function(o){var base,log,num;if(o.target.objs[0].type!=="number"){return Err("TARmustbelogofnum")}else if(o.deps.equal(o.target.objs[0],o.target.objs[1])){return Err("TARmusntactuallybebase")}else if(o.target.objs[1].type!=="number"){return Err("TARmustbenumbaselog")}else{base=parseFloat(o.target.objs[1].val);num=parseFloat(o.target.objs[0].val);log=Math.round(1e6*Math.log(num)/Math.log(base))/1e6;if(num>1&&log===Math.round(log)&&Math.pow(base,log)===num){return OK}else{return Err("TARmustbelogofsecretpownum")}}}},perform:function(o){var base,log,num;base=parseFloat(o.target.objs[1].val);num=parseFloat(o.target.objs[0].val);log=Math.round(Math.round(1e4*Math.log(num)/Math.log(base))/1e4);o["do"]("turnNumToPow","numtopow",{aim:[0],argument:Pow(Num(base),Num(log))});return o["do"]("logOfBasePowToExp","flattenthelogofpow")}};logOfFracToSum={info:{name:"logOfFracToSum",effect:"simplifying",example:"log x/y",uses:["extractFacsFromFrac","oneNumerFracToNegExpPow","logOfProdToSum","logOfPowToProd","negOneFacBiProdToNeg"],tags:["log"],lesson:"log102"},prints:{errors:["TARmustbelogoffrac"]},target:{type:"log",validate:function(o){if(o.target.objs[0].type==="fraction"){return OK}else{return Err("TARmustbelogoffrac")}}},perform:function(o){if(!o.deps.equal(o.target.objs[0].objs[0],one)){o["do"]("extractFacsFromFrac","extractnumer",{aim:[0],selection:[[0],[]],choices:["self","self"],direction:"left"});o["do"]("oneNumerFracToNegExpPow","movedenomtonumer",{aim:[0,1]});o["do"]("logOfProdToSum","splitlogtosum");o["do"]("logOfPowToProd","shootdownexp",{aim:[1]});return o["do"]("negOneFacBiProdToNeg","collapseneg",{aim:[1]})}else{o.report("WOO,ONENUMER");o["do"]("oneNumerFracToNegExpPow","movedenomtonumer",{aim:[0]});o.report("POWIFIED IT!");o["do"]("logOfPowToProd","shootdownexp");o.report("PRODIFIED!");o["do"]("negOneFacBiProdToNeg","collapseneg");return o.report("DONE!")}}};flattenLogOfContainedPowNum={info:{name:"flattenLogOfContainedPowNum",effect:"simplifying",example:"log 400",uses:["numToProd","logOfProdToSum","logOfBaseToOne","flattenLogOfSecretPowNum"],tags:["log"],lesson:"log102"},prints:{errors:["TARmustntbelog0","TARmustbelogofnum","TARmustbenumbaselog","TARmustbelogofcontainedsecretnum","TARmusntbesameassecretnum"],steps:[]},target:{type:"log",validate:function(o){var base,log,max,num,pow,rest,secretnum,_i;if(o.target.objs[0].type!=="number"){return Err("TARmustbelogofnum")}else if(o.target.objs[0].val==="0"){return Err("TARmustntbelog0")}else if(o.target.objs[1].type!=="number"){return Err("TARmustbenumbaselog")}else{base=parseFloat(o.target.objs[1].val);num=parseFloat(o.target.objs[0].val);log=Math.floor(Math.round(1e6*Math.log(num)/Math.log(base))/1e6);if(log===0){return Err("TARmusntbesameassecretnum")}else{max=0;for(pow=_i=2;2<=log?_i<=log:_i>=log;pow=2<=log?++_i:--_i){secretnum=Math.pow(base,pow);rest=num/secretnum;if(log===Math.floor(log)&&secretnum===Math.floor(secretnum)&&rest===Math.floor(rest)&&rest>1){max=pow}}if(max){return OK}else{return Err("TARmustbelogofcontainedsecretnum")}}}}},perform:function(o){var base,found,maxpow,num,pow,rest,secretnum,usedpow,_i,_j,_len,_ref1,_results;base=parseFloat(o.target.objs[1].val);num=parseFloat(o.target.objs[0].val);maxpow=Math.floor(Math.round(1e6*Math.log(num)/Math.log(base))/1e6);found=false;usedpow=0;_ref1=function(){_results=[];for(var _j=1;1<=maxpow?_j<=maxpow:_j>=maxpow;1<=maxpow?_j++:_j--){_results.push(_j)}return _results}.apply(this).reverse();for(_i=0,_len=_ref1.length;_i<_len;_i++){pow=_ref1[_i];if(!!found){continue}secretnum=Math.pow(base,pow);rest=num/secretnum;usedpow=pow;if(secretnum===Math.floor(secretnum)&&rest===Math.floor(rest)){found=true}}if(!found){throw"NoPow!"}o["do"]("numToProd","factorisenumtofreesecretnum",{aim:[0],argument:Prod(Num(secretnum),Num(rest))});o["do"]("logOfProdToSum","splitlogtosum");if(usedpow===1){return o["do"]("logOfBaseToOne","nowflattenbaselog",{aim:[0]})}else{return o["do"]("flattenLogOfSecretPowNum","nowlogoutsecretnum",{aim:[0]})}}};mergePosNegLogTerms={info:{name:"mergePosNegLogTerms",effect:"simplifying",example:{str:"(log2)-(log6)",selection:[[0],[1]]},uses:["exposeFacInNumber","logOfProdToSum","absorbSumTerms","addExpressions","purgeZeroTerms","absorbNegSum"],tags:["log"],lesson:"log102"},target:{type:"sum"},prints:{errors:["AUTOnoposneglogtermwithsamebaseandcommonterm"]},auto:function(_arg){var check,deps,log,neglog,negnum,negpos,pos,posnum,target,_i,_j,_len,_len1,_ref1,_ref2;target=_arg.target,deps=_arg.deps;_ref1=target.objs;for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){log=_ref1[pos];if(!(log.type==="log"&&log.objs[0].type==="number"&&parseFloat(log.objs[0].val)>1)){continue}posnum=parseFloat(log.objs[0].val);_ref2=target.objs;for(negpos=_j=0,_len1=_ref2.length;_j<_len1;negpos=++_j){neglog=_ref2[negpos];if(!(neglog.type==="negation"&&neglog.objs[0].type==="log"&&neglog.objs[0].objs[0].type==="number"&&parseFloat(neglog.objs[0].objs[0].val)>1)){continue}negnum=parseFloat(neglog.objs[0].objs[0].val);if(deps.equal(log.objs[1],neglog.objs[0].objs[1])){check=deps.commonNumFacPairer({obj1:log.objs[0],obj2:neglog.objs[0].objs[0],deps:deps});if(check){return{selection:[[pos],[negpos]]}}}}}return Err("AUTOnoposneglogtermwithsamebaseandcommonterm")},perform:function(o){var choices,fac,foo,log,logpos,neglog,neglogpos,neglogsurvives,pos,poslogsurvives,sels,_ref1,_ref2,_ref3,_ref4;_ref1=o.selection,_ref2=_ref1[0],logpos=_ref2[0],_ref3=_ref1[1],neglogpos=_ref3[0];o.beforemark([logpos]);o.beforemark([neglogpos]);log=o.target.objs[logpos];neglog=o.target.objs[neglogpos];_ref4=o.deps.commonNumFacPairer({obj1:log.objs[0],obj2:neglog.objs[0].objs[0],deps:o.deps}),foo=_ref4[0],fac=_ref4[1];if(!o.deps.equal(log.objs[0],fac)){poslogsurvives=true;o["do"]("exposeFacInNumber","freefacinposlog",{aim:[logpos,0],argument:fac,direction:"left"});o["do"]("logOfProdToSum","splitposlog",{aim:[logpos]});o["do"]("absorbSumTerms","absposlogbits",{selection:[[logpos]]});if(logpos<neglogpos){neglogpos=neglogpos+1}}if(!o.deps.equal(neglog.objs[0].objs[0],fac)){neglogsurvives=true;o["do"]("exposeFacInNumber","freefacinneglog",{aim:[neglogpos,0,0],argument:fac,direction:"left"});o["do"]("logOfProdToSum","splitneglog",{aim:[neglogpos,0]});o["do"]("absorbNegSum","absneglogsum",{selection:[[neglogpos]]});if(neglogpos<logpos){logpos=logpos+1}}sels=function(){var _i,_ref5,_results;_results=[];for(pos=_i=0,_ref5=o.target.objs.length;0<=_ref5?_i<_ref5:_i>_ref5;pos=0<=_ref5?++_i:--_i){_results.push(pos===logpos||pos===neglogpos?[0]:[])}return _results}();choices=function(){var _i,_ref5,_results;_results=[];for(pos=_i=0,_ref5=o.target.objs.length;0<=_ref5?_i<_ref5:_i>_ref5;pos=0<=_ref5?++_i:--_i){_results.push(pos===logpos?"self":pos===neglogpos?"negchild":"none")}return _results}();o["do"]("addExpressions","nowmerge",{selection:sels,choices:choices});o["do"]("purgeZeroTerms","removezero",{selection:[[Math.min(logpos,neglogpos)]]});if(neglogpos>logpos){neglogpos=neglogpos-1}else{logpos=logpos-1}if(neglogsurvives&&!poslogsurvives&&neglogpos>logpos){neglogpos=neglogpos-1}if(poslogsurvives&&!neglogsurvives&&logpos>neglogpos){logpos=logpos-1}if(o.target.type==="sum"){if(poslogsurvives){o.aftermark([logpos])}if(neglogsurvives){o.aftermark([neglogpos])}}return o}};fixPowWithBaseLogTermInExp={info:{name:"fixPowWithBaseLogTermInExp",effect:"simplifying",example:{str:"e^(x+ln2)",selection:[[1]]},uses:["splitSumExpPow","powWithBaseLogExpToExp"],tags:["log","power","sumexponent"],lesson:"log102"},prints:{errors:["TARexpmustbesum","SELtermmustbelog"]},target:{type:"power",validate:function(o){if(o.target.objs[1].type==="sum"){return OK}else{return Err("TARexpmustbesum",[1])}}},selection:{from:[1],max:1,filter:function(o){if(o.item.type==="log"&&o.deps.equal(o.item.objs[1],o.target.objs[0])){return OK}else{return Err("SELtermmustbelog")}}},perform:function(o){o["do"]("splitSumExpPow","extractexplogterm",{direction:"left",selection:o.selection});return o["do"]("powWithBaseLogExpToExp","nowflatten",{aim:[0]})}};logBothSidesOfRel={info:{name:"logBothSidesOfRel",effect:"complicating",example:"x=y",tags:["log","relation"],lesson:"relationmanip"},target:{type:"relation"},perform:function(_arg){var arg,left,right,val,_ref1,_ref2;arg=_arg.argument,_ref1=_arg.target,val=_ref1.val,_ref2=_ref1.objs,left=_ref2[0],right=_ref2[1];return{result:{type:"relation",val:val,objs:[Log(left,arg||Num(10)),Log(right,arg||Num(10))]}}}};baseBothSidesOfRel={info:{name:"baseBothSidesOfRel",effect:"complicating",example:{str:"logx = 7",argument:Num(10)},tags:["log","relation"],lesson:"relationmanip"},target:{type:"relation"},perform:function(_arg){var arg,left,right,val,_ref1,_ref2;arg=_arg.argument,_ref1=_arg.target,val=_ref1.val,_ref2=_ref1.objs,left=_ref2[0],right=_ref2[1];return{result:{type:"relation",val:val,objs:[Pow(arg,left),Pow(arg,right)]}}}};logOfNegNum={info:{name:"logOfNegNum",effect:"simplifying",example:"log -5",tags:["log","constanti"],uses:["negToNegOneFacProd","logOfProdToSum","negOneToISquared","logOfI","elimFacWithFracFac","logOfBaseToOne","oneDenomFracToNumer"],lesson:"complexconst"},target:{type:"log"},prints:{errors:["TARMmustbelogofnegnum"]},target:{type:"log",validate:function(_arg){var deps,neg,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,neg=_ref2[0];if(neg.type==="negation"&&neg.objs[0].type==="number"&&neg.objs[0].val!=="0"){return OK}else{return Err("TARmustbelogofnegnum")}}},perform:function(o){var lpath;if(!o.deps.equal(o.target.objs[0],Neg(one))){o["do"]("negToNegOneFacProd","splitneg",{aim:[0],direction:"left"});o["do"]("logOfProdToSum","splitlog");lpath=[0]}else{lpath=[]}o["do"]("negOneToISquared","formi2",{aim:lpath.concat([0])});o["do"]("logOfPowToProd","prodify",{aim:lpath});o["do"]("logOfI","collapsecomplexlog",{aim:lpath.concat([1])});o["do"]("elimFacWithFracFac","multandelim2",{aim:lpath,choices:["facs"],selection:[[0],[1],[0]]});o["try"]("logOfBaseToOne","wasnaturalsoflatten",{aim:lpath.concat([1])});return o["try"]("oneDenomFracToNumer","andclean",{aim:lpath})}};forbidLogBaseOne={info:{name:"forbidLogBaseOne",effect:"integrity",example:"1logx",tags:["log","undefinedval","number1"],uses:["logToFracOfLogs","logOneToZero","zeroDenomFracToUndef"],lesson:"log102"},prints:{errors:["TARbasemustbeone"]},target:{type:"log",validate:function(_arg){var base,deps,logee,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,logee=_ref2[0],base=_ref2[1];if(deps.equal(base,one)){return OK}else{return Err("TARbasemustbeone")}}},perform:function(o){o["do"]("logToFracOfLogs","firstmakefrac",{argument:Num(10)});o["do"]("logOneToZero","denomtozero",{aim:[1]});return o["do"]("zeroDenomFracToUndef","fractoundef")}};forbidLogBaseZero={info:{name:"forbidLogBaseZero",effect:"integrity",example:"0logx",tags:["log","undefinedval","number0"],uses:["logToFracOfLogs","illegalLog","undefChildObjToUndef"],lesson:"log101"},prints:{errors:["TARbasemustbezero"]},target:{type:"log",validate:function(_arg){var base,deps,logee,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,logee=_ref2[0],base=_ref2[1];if(deps.equal(base,zero)){return OK}else{return Err("TARbasemustbezero")}}},perform:function(o){o["do"]("logToFracOfLogs","firstmakefrac",{argument:Num(10)});o["do"]("illegalLog","denomtoundef",{aim:[1]});return o["do"]("undefChildObjToUndef","fractoundef",{hunt:[[1]]})}};collapseSecretNumLog={info:{name:"collapseSecretNumLog",effect:"simplifying",example:"4log2",uses:["logToFracOfLogs","numToProd","mergeSameBaseFacs","logOfPowToProd","eliminateFromFrac"],tags:["log"],lesson:"log102"},prints:{errors:["TARlogbasemustbenumber","TARlogtargetmustbenumber","TARlogtargetmusthavenumexp","TARbasemustbepowofnum"],steps:["factorisetofacpow","mergefacstopower","finallycollapselog","andcollapseabsnum"]},target:{type:"log",validate:function(o){var logbase,numval,safety,test,trgt,whichlog;whichlog=o.target.objs[1];trgt=o.target.objs[0];if(whichlog.type!=="number"){return Err("TARlogbasemustbenumber",[1])}else if(trgt.type!=="number"){return Err("TARlogtargetmustbenumber",[0])}else{logbase=parseFloat(o.target.objs[1].val);numval=parseFloat(o.target.objs[0].val);if(numval>=logbase&&numval>1){return Err("TARbasemustbepowofnum",[0])}else{test=numval;safety=0;console.log("GONAN WHILELOOP ",logbase,numval);while(test<logbase&&safety<50){safety++;test*=numval;if(test===logbase){return OK}}return Err("TARbasemustbepowofnum",[0])}}}},perform:function(o){var logbase,n,newfac,numval;logbase=parseFloat(o.target.objs[1].val);numval=parseFloat(o.target.objs[0].val);newfac=Math.round(Math.pow(logbase,1/numval));console.log("NUMVAL",numval,"LOGBASE",logbase,"NEWFAC",newfac);o["do"]("logToFracOfLogs","splitlogtofrac",{argument:Num(10)});o["do"]("numToProd","factorisetofacpow",{aim:[1,0],argument:Prod(function(){var _i,_results;_results=[];for(n=_i=0;0<=newfac?_i<newfac:_i>newfac;n=0<=newfac?++_i:--_i){_results.push(Num(numval))}return _results}())});o["do"]("mergeSameBaseFacs","mergefacstopower",{aim:[1,0],selection:[function(){var _i,_results;_results=[];for(n=_i=0;0<=newfac?_i<newfac:_i>newfac;n=0<=newfac?++_i:--_i){_results.push(n)}return _results}()]});o["do"]("logOfPowToProd","splitdenomlog",{aim:[1],direction:"left"});return o["do"]("eliminateFromFrac","elimlogs",{choices:["self","facs"],selection:[[0],[1]]})}};approxLog={info:{name:"approxLog",effect:"decimalifying",example:"5log 12",tags:["log","decimal","approximate"],uses:["logToFracOfLogs","approxLogBase10","fracToDecNum"],lesson:"log101"},prints:{errors:["TARmustbelogofnum","TARbasemustbenum","TARmustntbelog0","TARbasemustntbe10"]},target:{type:"log",validate:function(_arg){var base,num,_ref1;_ref1=_arg.target.objs,num=_ref1[0],base=_ref1[1];if(num.type!=="number"){return Err("TARmustbelogofnum",[0])}else if(num.val==="0"){return Err("TARmustntbelog0",[0])}else if(base.type!=="number"){return Err("TARbasemustbenum",[1])}else if(base.val==="10"){return Err("TARbasemustntbe10",[1])}else{return OK}}},perform:function(o){o["do"]("logToFracOfLogs","rewritetobase10",{argument:Num(10)});o["do"]("approxLogBase10","approxnumer",{aim:[0]});o["do"]("approxLogBase10","approxdenom",{aim:[1]});return o["do"]("fracToDecNum","approxfrac")}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={approxLogBase10:approxLogBase10,collapseSecretNumLog:collapseSecretNumLog,forbidLogBaseZero:forbidLogBaseZero,forbidLogBaseOne:forbidLogBaseOne,logToFracOfLogs:logToFracOfLogs,logOfNegNum:logOfNegNum,logOfI:logOfI,collapseLogOfRoot:collapseLogOfRoot,fixPowWithBaseLogTermInExp:fixPowWithBaseLogTermInExp,baseBothSidesOfRel:baseBothSidesOfRel,logBothSidesOfRel:logBothSidesOfRel,mergePosNegLogTerms:mergePosNegLogTerms,illegalLog:illegalLog,approxLog:approxLog,collapsePowWithSecretBaseLogInExp:collapsePowWithSecretBaseLogInExp,collapsePowWithBaseLogFacInExp:collapsePowWithBaseLogFacInExp,powWithBaseLogExpToExp:powWithBaseLogExpToExp,logOfFracToSum:logOfFracToSum,flattenLogOfContainedPowNum:flattenLogOfContainedPowNum,logOfProdToSum:logOfProdToSum,flattenLogOfSecretPowNum:flattenLogOfSecretPowNum,logOneToZero:logOneToZero,logOfBasePowToExp:logOfBasePowToExp,logOfBaseToOne:logOfBaseToOne,logOfPowToProd:logOfPowToProd};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);