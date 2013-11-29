(function(){var And,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,Leq,Lt,Neg,Neq,Not,Num,OK,Or,Pow,Power,Prod,Product,Sum,TRUE,UNDEFINED,biIProdToNegOne,collapseIBaseEvenFacExpPow,collapseIBaseOddFacExpPow,deepcopy,eToDec,eqIToFalse,exportTo,five,four,funcs,iBaseTwoExpPowToNegOne,k,makeCheck,mixin,negOneToBiIProd,negOneToISquared,neqIToTrue,one,percentFacProdToFrac,percentToFrac,piToDec,printObj,three,two,v,x,y,z,zero,_ref;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),I=_ref.I,UNDEFINED=_ref.UNDEFINED,deepcopy=_ref.deepcopy,mixin=_ref.mixin,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;percentToFrac={info:{name:"percentToFrac",effect:"simplifying",example:"%",tags:["percent"]},target:"percent",perform:function(o){return{result:Frac(one,Num(100))}}};biIProdToNegOne={info:{name:"biIProdToNegOne",effect:"simplifying",example:"i*i",opposite:"negOneToBiIProd",tags:["constanti","neg1"]},prints:{errors:["mustbeitimesi"]},target:{type:"product",validate:function(_arg){var deps,fac1,fac2,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,fac1=_ref2[0],fac2=_ref2[1];if(!deps.equal(fac1,I)){return Err("mustbeitimesi",[0])}else if(!deps.equal(fac2,I)){return Err("mustbeitimesi",[1])}else{return OK}}},perform:function(o){return{result:Neg(one)}}};piToDec={info:{name:"piToDec",effect:"decimalifying",example:"pi",tags:["pi","approximate","decimal"],lesson:"decimalnums"},target:"pi",perform:function(){return{result:Num(Math.PI),approx:true}}};eToDec={info:{name:"eToDec",effect:"decimalifying",example:"e",tags:["e","approximate","decimal"],lesson:"decimalnums"},target:"e",perform:function(){return{result:Num(Math.E),approx:true}}};negOneToBiIProd={info:{name:"negOneToBiIProd",effect:"complicating",example:"-1",opposite:"biIProdToNegOne",tags:["neg1","constanti"]},target:{type:"negone"},perform:function(o){return{result:Prod(I,I)}}};negOneToISquared={info:{name:"negOneToISquared",effect:"complicating",example:"-1",tags:["neg1","constanti"],uses:["negOneToBiIProd","mergeSameBaseFacs"],opposite:"iBaseTwoExpPowToNegOne"},target:{type:"negone"},perform:function(o){o["do"]("negOneToBiIProd","firsttobiprod");return o["do"]("mergeSameBaseFacs","thenmerge",{selection:[[0,1]]})}};iBaseTwoExpPowToNegOne={info:{name:"iBaseTwoExpPowToNegOne",effect:"simplifying",example:"i2",uses:["extractPartFromPow","biIProdToNegOne"],tags:["constanti","neg1"],opposite:"negOneToISquared"},prints:{errors:["basemustbei","expmustbetwo"]},target:{type:"power",validate:function(_arg){var base,deps,exp,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,base=_ref2[0],exp=_ref2[1];if(!deps.equal(base,I)){return Err("basemustbei",[0])}else if(!deps.equal(exp,two)){return Err("expmustbetwo",[1])}else{return OK}}},perform:function(o){o["do"]("extractPartFromPow","splitpow",{argument:one});return o["do"]("biIProdToNegOne","biiisnegone")}};percentFacProdToFrac={info:{name:"percentFacProdToFrac",effect:"simplifying",example:{str:"53%",selection:[[1]]},uses:["percentToFrac","multFacsIntoFrac"],tags:["percent"]},prints:{steps:["turnpercenttofrac","multotherfacsintopercentfrac"]},target:"product",selection:{max:1,filter:"percent"},perform:function(o){var pos,_i,_ref1,_results;pos=o.selection[0][0];o.beforemark([[pos]]);o["do"]("percentToFrac","turnpercenttofrac",{aim:[pos]});return o["do"]("multFacsIntoFrac","multotherfacsintopercentfrac",{selection:[[pos],function(){_results=[];for(var _i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(n){return n!==pos})]})}};collapseIBaseEvenFacExpPow={info:{name:"collapseIBaseEvenFacExpPow",effect:"simplifying",example:{str:"(i)^-(4*x)",choices:["negchildfacs"],selection:[[0]]},uses:["negToNegOneFacProd","absorbProductFacs","expandNegFacs","negToNegOneFacProd","iBaseTwoExpPowToNegOne","extractPartFromPow","numToProd","prodExpPowToSelectPowBase","negOneBaseOddFacExpPowToNegOne","negOneBaseEvenFacExpPowToOne","purgeOneFacs","collapseNegOneFac"],tags:["constanti","number1","power"]},prints:{errors:["basemustbei","mustbeevennum","noevenexpfacs"],instructions:["chooseexpfactactic"],steps:["freetheexpfromneg","freechosenfacfromneg","collapseibaseexptwo","collapsechosenfac","nowsplitthepow","hackatexp","flattenexpprod","buildpowwithexptwo"]},target:{type:"power",validate:function(o){if(o.deps.equal(o.target.objs[0],I)){return OK}else{return Err("basemustbei")}}},choices:{instruction:"chooseexpfactactic",options:function(o){return o.deps.getFacOptions(o.target.objs[1])}},selection:{max:1,from:function(o){return o.deps.getFacs(o.target.objs[1],o.choices[0])},filter:function(o){var analysis,tocheck;tocheck=o.item||o.target;if(tocheck.type==="negation"){tocheck=tocheck.objs[0]}if(tocheck.type==="power"){tocheck=tocheck.objs[0]}if(tocheck.type==="number"){analysis=o.deps.divideCheck({obj1:tocheck,obj2:two,deps:o.deps});if(analysis.found){return OK}else{return Err("mustbeevennum")}}else{return Err("mustbeevennum")}}},auto:function(o){var analysis,choice,pos,tocheck,_i,_j,_len,_len1,_ref1,_ref2;_ref1=o.deps.getFacOptions(o.target.objs[1]);for(_i=0,_len=_ref1.length;_i<_len;_i++){choice=_ref1[_i];_ref2=o.deps.getFacs(o.target.objs[1],choice);for(pos=_j=0,_len1=_ref2.length;_j<_len1;pos=++_j){tocheck=_ref2[pos];if(tocheck.type==="negation"){tocheck=tocheck.objs[0]}if(tocheck.type==="power"){tocheck=tocheck.objs[0]}if(tocheck.type==="number"){analysis=o.deps.divideCheck({obj1:tocheck,obj2:two,deps:o.deps});if(analysis.found){return{choices:[choice],selection:[[pos]]}}}}}return Err("noevenexpfacs")},perform:function(o){var analysis,choice,path,rest,sel,_i,_ref1,_results;sel=o.selection[0][0];choice=o.choices[0];o.beforemark([1].concat(o.deps.facPath(choice,sel)));if(o.deps.equal(o.target.objs[1],two)){return o["do"]("iBaseTwoExpPowToNegOne","collapseibaseexptwo")}else{if(o.target.objs[1].type==="negation"){o["do"]("negToNegOneFacProd","freetheexpfromneg",{aim:[1],direction:"right"});o["try"]("absorbProductFacs","flattenexpprod",{aim:[1]})}path=o.target.objs[1].type==="product"?[1,sel]:[1];if(o.deps.lookUp(o.target,path).type==="negation"){if(o.target.objs[1].type==="product"){o["do"]("expandNegFacs","freechosenfacfromneg",{aim:[1],selection:[[sel]],direction:"right"})}else{o["do"]("negToNegOneFacProd","freechosenfacfromneg",{aim:[1],direction:"right"})}}path=o.target.objs[1].type==="product"?[1,sel]:[1];if(o.deps.lookUp(o.target,path).type==="power"){o["do"]("extractPartFromPow","extractevenfacfrombase",{aim:path,direction:"left",argument:one})}path=o.target.objs[1].type==="product"?[1,sel]:[1];analysis=o.deps.divideCheck({obj1:o.deps.lookUp(o.target,path),obj2:two,deps:o.deps});if(!o.deps.equal(analysis.divided,two)){o["do"]("numToProd","factorisetofreetwo",{aim:path,argument:Prod(two,analysis.minrest)});o["try"]("absorbProductFacs","flattenexpprod",{aim:[1]})}rest=function(){_results=[];for(var _i=0,_ref1=o.target.objs[1].objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(i){return i!==sel});o["do"]("prodExpPowToSelectPowBase","buildpowwithexptwo",{selection:[rest]});o["do"]("iBaseTwoExpPowToNegOne","collapseibaseexptwo",{aim:[0]});o["try"]("negOneBaseOddFacExpPowToNegOne","collapsenegonebasepowoddexp");o["try"]("negOneBaseEvenFacExpPowToOne","collapsenegonebasepowevenexp");o["try"]("purgeOneFacs","cleanupresidueone");return o["try"]("collapseNegOneFac","cleanupresiduenegone")}}};collapseIBaseOddFacExpPow={info:{name:"collapseIBaseOddFacExpPow",effect:"simplifying",example:{str:"(i)^-(5x)",choices:["negchildfacs"],selection:[[0]]},uses:["negToNegOneFacProd","absorbProductFacs","expandNegFacs","prodExpPowToSelectPowBase","extractPartFromPow","collapseIBaseEvenFacExpPow","collapseNegOneFac","purgeOneFacs","moveNegFromFacToProd"],tags:["constanti","power"]},prints:{errors:["basemustbei","mustbeoddnum","nooddexpfacs"],instructions:["chooseexpfactactic"],steps:["freetheexpfromneg","flattenexpprod","freechosenfacfromneg","buildoddexppow","extractsingleifrompow","collapseremainingevenexpfacpow","cleanupresidue","putnegback"]},target:{type:"power",validate:function(o){if(o.deps.equal(o.target.objs[0],I)){return OK}else{return Err("basemustbei")}}},choices:{instruction:"chooseexpfactactic",options:function(o){return o.deps.getFacOptions(o.target.objs[1])}},selection:{max:1,from:function(o){return o.deps.getFacs(o.target.objs[1],o.choices[0])},filter:function(o){var analysis,tocheck;tocheck=o.item||o.target;if(tocheck.type==="negation"){tocheck=tocheck.objs[0]}if(tocheck.type==="number"&&o.deps.isWholeNumber(tocheck)){analysis=o.deps.divideCheck({obj1:tocheck,obj2:two,deps:o.deps});if(analysis.found){return Err("mustbeoddnum")}else{return OK}}else{return Err("mustbeoddnum")}}},auto:function(o){var analysis,choice,pos,tocheck,_i,_j,_len,_len1,_ref1,_ref2;_ref1=o.deps.getFacOptions(o.target.objs[1]);for(_i=0,_len=_ref1.length;_i<_len;_i++){choice=_ref1[_i];_ref2=o.deps.getFacs(o.target.objs[1],choice);for(pos=_j=0,_len1=_ref2.length;_j<_len1;pos=++_j){tocheck=_ref2[pos];if(tocheck.type==="negation"){tocheck=tocheck.objs[0]}if(tocheck.type==="number"&&o.deps.isWholeNumber(tocheck)){analysis=o.deps.divideCheck({obj1:tocheck,obj2:two,deps:o.deps});if(analysis.found===0){return{choices:[choice],selection:[[pos]]}}}}}return Err("nooddexpfacs")},perform:function(o){var expwasneg,path,rest,sel,_i,_ref1,_results;sel=o.selection[0][0];if(o.target.objs[1].type==="negation"){expwasneg=true;o["do"]("negToNegOneFacProd","freetheexpfromneg",{aim:[1],direction:"right"});o["try"]("absorbProductFacs","flattenexpprod",{aim:[1]})}path=o.target.objs[1].type==="product"?[1,sel]:[1];if(o.deps.lookUp(o.target,path).type==="negation"){if(o.target.objs[1].type==="product"){o["do"]("expandNegFacs","freechosenfacfromneg",{aim:[1],selection:[[sel]],direction:"right"})}else{o["do"]("negToNegOneFacProd","freechosenfacfromneg",{aim:[1],direction:"right"})}}if(o.target.objs[1].type==="product"){rest=function(){_results=[];for(var _i=0,_ref1=o.target.objs[1].objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(i){return i!==sel});o["do"]("prodExpPowToSelectPowBase","buildoddexppow",{selection:[rest]});path=[0]}else{path=[]}o["do"]("extractPartFromPow","extractsingleifrompow",{aim:path,direction:"left",argument:one});o["try"]("collapseIBaseEvenFacExpPow","collapseremainingevenexpfacpow",{aim:path.concat([1])});o["try"]("purgeOneFacs","cleanupresidueone",{aim:path});o["try"]("collapseNegOneFac","cleanupresiduenegone",{aim:path});if(expwasneg){o["try"]("moveNegFromFacToProd","putnegback",{aim:[1]})}return o}};eqIToFalse={info:{name:"eqIToFalse",effect:"simplifying",example:"i=3",tags:["logic","constanti","logicfalse"]},prints:{errors:["TARnotexactlyonesidewithi"]},target:{type:"equality",validate:function(o){var l,r;l=o.deps.containsTypeWithVal(o.target.objs[0],"const","i");r=o.deps.containsTypeWithVal(o.target.objs[1],"const","i");if(l&&!r&&Object.keys(o.deps.varDependency(o.target.objs[1])).length===0){return OK}else if(r&&!l&&Object.keys(o.deps.varDependency(o.target.objs[0])).length===0){return OK}else{return Err("TARnotexactlyonesidewithi")}}},perform:function(o){return{result:FALSE}}};neqIToTrue={info:{name:"neqIToTrue",effect:"simplifying",example:"i!=3",tags:["logic","constanti","logictrue"]},target:{type:"relation",validate:function(o){var l,r;if(o.target.val==="neq"){l=o.deps.containsTypeWithVal(o.target.objs[0],"const","i");r=o.deps.containsTypeWithVal(o.target.objs[1],"const","i");if(l&&!r&&Object.keys(o.deps.varDependency(o.target.objs[1])).length===0){return OK}else if(r&&!l&&Object.keys(o.deps.varDependency(o.target.objs[0])).length===0){return OK}else{return Err("TARnotexactlyonesidewithi")}}else{return Err("TARnotexactlyonesidewithi")}}},perform:function(o){return{result:TRUE}}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={neqIToTrue:neqIToTrue,eqIToFalse:eqIToFalse,eToDec:eToDec,piToDec:piToDec,negOneToBiIProd:negOneToBiIProd,negOneToISquared:negOneToISquared,biIProdToNegOne:biIProdToNegOne,collapseIBaseOddFacExpPow:collapseIBaseOddFacExpPow,collapseIBaseEvenFacExpPow:collapseIBaseEvenFacExpPow,iBaseTwoExpPowToNegOne:iBaseTwoExpPowToNegOne,percentToFrac:percentToFrac,percentFacProdToFrac:percentFacProdToFrac};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);