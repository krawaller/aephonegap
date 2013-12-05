(function(){var Err,Fraction,Neg,NotEqual,Num,OK,Power,Prod,Product,Sum,addTwoNegOneFacsToExpression,collapseDoubleNeg,collapseNegDenomFacNegFrac,collapseNegNumerDenomFacs,collapseNegNumerFacNegFrac,collapseNegOneFac,collapseNegProdWithNegFac,collapseNegSum,collapseTwoNegFacs,deepcopy,digIfNeg,exhumeSteps,expandNegFacs,exportTo,flattenNegProd,flattenNegProdFac,funcs,hasAcceccibleNeg,isErr,isHalfNegSum,isPotNegOne,k,mirrorSumWithNegInFrac,mirrorSumWithNegInProd,mixin,moveNegBetweenFacs,moveNegBetweenFloorsInFrac,moveNegFromFacToProd,moveNegFromFloorFacToFrac,moveNegFromFracToFloorFac,moveNegFromProdToFac,negFromFracToNumer,negOneFacBiProdToNeg,negToNegOneFacProd,one,oneToTwoNegOneFacProd,printObj,twoNegOneFacProdToOne,v,zero,_ref;_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),mixin=_ref.mixin,deepcopy=_ref.deepcopy,isErr=_ref.isErr,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,NotEqual=_ref.NotEqual,Num=_ref.Num,Prod=_ref.Prod,Sum=_ref.Sum,zero=_ref.zero,one=_ref.one,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;digIfNeg=function(obj){if(obj.type==="negation"){return obj.objs[0]}else{return obj}};isPotNegOne=function(o){var child,_i,_len,_ref1;switch(item.type){case"negation":return true;case"product":case"fraction":_ref1=item.objs;for(_i=0,_len=_ref1.length;_i<_len;_i++){child=_ref1[_i];if(isPotNegOne(child)){return true}}}return false};exhumeSteps=function(_arg){var deps,negonepos,target;target=_arg.target,deps=_arg.deps;switch(target.type){case"negation":if(deps.equal(target,Neg(one))){return[]}else{return["negToNegOneFacProd",["NEGONEPROD",0]]}break;case"product":negonepos=deps.find(target,Neg(one));if(negonepos.length){return["NEGONEPROD",negonepos[0]]}}};hasAcceccibleNeg=function(obj,nodeeper){var fac,_i,_len,_ref1;switch(obj.type){case"negation":return true;case"product":_ref1=obj.objs;for(_i=0,_len=_ref1.length;_i<_len;_i++){fac=_ref1[_i];if(fac.type==="negation"){return true}}return false;case"fraction":if(nodeeper){return false}else{return hasAcceccibleNeg(obj.objs[0],true)||hasAcceccibleNeg(obj.objs[1],true)}break;default:return false}};isHalfNegSum=function(_arg){var deps,nope,obj,term,yup,_i,_len,_ref1;obj=_arg.obj,deps=_arg.deps;yup=0;nope=0;_ref1=obj.objs;for(_i=0,_len=_ref1.length;_i<_len;_i++){term=_ref1[_i];if(deps.hasAcceccibleNeg(term)){yup++}else{nope++}}return yup>=nope};negOneFacBiProdToNeg={info:{name:"negOneFacBiProdToNeg",effect:"simplifying",opposite:"negToNegOneFacProd",example:"-1*x",tags:["neg1","negation"],lesson:"negation101"},prints:{errors:["mustcontainnegone","musthavetwofacs"]},target:{type:"product",validate:function(_arg){var deps,fac1,fac2,fac3,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,fac1=_ref2[0],fac2=_ref2[1],fac3=_ref2[2];if(fac3){return Err("musthavetwofacs")}else if(!(deps.equal(fac1,Neg(one))||deps.equal(fac2,Neg(one)))){return Err("mustcontainnegone")}else{return OK}}},perform:function(_arg){var deps,facs,otherpos,_ref1;deps=_arg.deps,_ref1=_arg.target,facs=_ref1.objs;otherpos=deps.equal(facs[0],Neg(one))?1:0;return{result:Neg(facs[otherpos]),beforemarks:[[otherpos]],aftermarks:[[0]]}}};twoNegOneFacProdToOne={info:{name:"twoNegOneFacProdToOne",effect:"simplifying",opposite:"oneToTwoNegOneFacProd",example:"-1*-1",tags:["neg1","number1"],lesson:"negation101"},prints:{errors:["bothfacsmustbenegone","musthavetwofacs"]},target:{type:"product",validate:function(_arg){var deps,fac1,fac2,fac3,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,fac1=_ref2[0],fac2=_ref2[1],fac3=_ref2[2];if(fac3){return Err("musthavetwofacs")}else if(!deps.equal(fac1,Neg(one))){return Err("bothfacsmustbenegone",[0])}else if(!deps.equal(fac2,Neg(one))){return Err("bothfacsmustbenegone",[1])}else{return OK}}},perform:function(_arg){var target;target=_arg.target;return{result:one,beforemarks:[[0],[1]]}}};negToNegOneFacProd={info:{name:"negToNegOneFacProd",effect:"complicating",opposite:"negOneFacBiProdToNeg",example:"-x",tags:["negation","neg1"],lesson:"negation101"},prints:{instructions:["choosesidefornegonefac"]},target:"negation",direction:"choosesidefornegonefac",perform:function(_arg){var direction,inner,_ref1,_ref2;direction=_arg.direction,_ref1=_arg.target,_ref2=_ref1.objs,inner=_ref2[0];if(direction==="right"){return{result:Product(inner,Neg(one)),beforemarks:[[0]],aftermarks:[[0]]}}else{return{result:Product(Neg(one),inner),beforemarks:[[0]],aftermarks:[[1]]}}}};oneToTwoNegOneFacProd={info:{name:"oneToTwoNegOneFacProd",effect:"complicating",opposite:"twoNegOneFacProdToOne",example:"1",tags:["number1","neg1"],lesson:"negation101"},target:"one",perform:function(){return{result:Product(Neg(one),Neg(one))}}};expandNegFacs={info:{name:"expandNegFacs",effect:"complicating",example:{str:"-x*y*-z",selection:[[0,2]]},returns:"product",uses:["absorbProductFacs","negToNegOneFacProd"],tags:["negation","negativefactor","factorise"],lesson:"negation101"},prints:{errors:["mustselectneg"],steps:["firstweexpandfac","thenweabsorbprod"],instructions:["choosesideforfactors"]},target:"product",direction:"choosesideforfactors",selection:{filter:"negation"},perform:function(o){var n,sel,_i,_len,_ref1;_ref1=o.selection[0];for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){sel=_ref1[n];o.beforemark([sel]);o.aftermark([[sel+n],[sel+n+1]]);o["do"]("negToNegOneFacProd","firstweexpandfac",{aim:[sel+n]});o["do"]("absorbProductFacs","thenweabsorbprod",{selection:[[sel+n]]})}return o}};collapseDoubleNeg={info:{name:"collapseDoubleNeg",effect:"simplifying",example:"--x",returns:"math",uses:["negToNegOneFacProd","collapseTwoNegFacs"],tags:["negation","collapse"],lesson:"negation101"},prints:{errors:["mustbedoubleneg"],steps:["expandouterneg","thencollapsewithinner"]},target:{type:"negation",validate:function(_arg){var child;child=_arg.target.objs[0];if(child.type==="negation"){return OK}else{return Err("mustbedoubleneg")}}},perform:function(o){o["do"]("negToNegOneFacProd","expandouterneg");o["do"]("collapseTwoNegFacs","thencollapsewithinner",{selection:[[0,1]]});return o.beforemark([[0,0]])}};collapseNegProdWithNegFac={info:{name:"collapseNegProdWithNegFac",effect:"simplifying",example:{str:"-(x*-y*z)",selection:[[1]]},uses:["flattenNegProd","collapseTwoNegFacs"],tags:["negation","negativeproduct","negativefactor","product","collapse"]},prints:{errors:["mustbenegprod"],steps:["firstflattennegprod","nowcollapsenegfacwithnegone"]},target:{type:"negation",validate:function(_arg){var child;child=_arg.target.objs[0];if(child.type==="product"){return OK}else{return Err("mustbenegprod",[0])}}},selection:{max:1,from:[0],filter:"negation"},perform:function(o){var pos;pos=o.selection[0][0];o["do"]("flattenNegProd","firstflattennegprod",{direction:"left"});o["do"]("collapseTwoNegFacs","nowcollapsenegfacwithnegone",{selection:[[0,pos+1]]});return o.mixin({beforemarks:[[0,pos]],aftermarks:[[pos]]})}};collapseTwoNegFacs={info:{name:"collapseTwoNegFacs",effect:"simplifying",example:{str:"-x*y*-z",selection:[[0,2]]},uses:["twoNegOneFacProdToOne","expandNegFacs","splitFacsToProduct","purgeOneFacs"],tags:["product","negation","collapse"]},prints:{steps:["mergenegones","expandfac","absorbresult","groupnegones","purgingtheone"]},target:"product",selection:{min:2,max:2,filter:"negation"},perform:function(o){var first,firstisnegone,second,secondisnegone,_ref1;_ref1=o.selection[0],first=_ref1[0],second=_ref1[1];o.beforemark([[first],[second]]);firstisnegone=o.deps.equal(o.target.objs[first].objs[0],one);secondisnegone=o.deps.equal(o.target.objs[second].objs[0],one);if(firstisnegone&&secondisnegone&&o.target.objs.length===2){return o["do"]("twoNegOneFacProdToOne","mergenegones")}else{if(!(firstisnegone&&secondisnegone)){o["do"]("expandNegFacs","expandfac",{direction:"left",selection:[(firstisnegone?[]:[first]).concat(secondisnegone?[]:[second])]})}o["do"]("splitFacsToProduct","groupnegones",{selection:[[first,second+(firstisnegone?0:1)]]});o["do"]("twoNegOneFacProdToOne","mergenegones",{aim:[[first]]});o["do"]("purgeOneFacs","purgingtheone",{selection:[[first]]});return o.aftermark([[first],[second-(firstisnegone?1:0)]])}}};collapseNegNumerDenomFacs={info:{name:"collapseNegNumerDenomFacs",effect:"simplifying",example:{str:"-x/(y*-z)",selection:[[0],[1]],choices:["self","facs"]},uses:["negToNegOneFacProd","expandNegFacs","eliminateFromFrac"],tags:["negation","fraction","numeratorfactor","negativenumeratorfactor","denominatorfactor","negativedenominatorfactor"]},prints:{steps:["expandnegfac","killnegones"],instructions:["CHOnumerfactactic","CHOdenomfactactic","SELnegfacinnumer","SELnegfacindenom"],errors:["AUTOfrachasntnegfacsonbothfloors"]},target:"fraction",choices:{questions:[{instruction:"CHOnumerfactactic",options:function(o){return o.deps.getFacOptions(o.target.objs[0],true,true)}},{instruction:"CHOdenomfactactic",options:function(o){return o.deps.getFacOptions(o.target.objs[1],true,true)}}]},selection:{max:1,filter:"negation",questions:[{from:function(o){return o.deps.getFacs(o.target.objs[0],o.choices[0])},instruction:"SELnegfacinnumer"},{from:function(o){return o.deps.getFacs(o.target.objs[1],o.choices[1])},instruction:"SELnegfacindenom"}]},auto:function(o){var chosen,res,_ref1;res=o.deps.findFracFacPairs(mixin({allowdenom:true,nonegdig:true,pairer:o.deps.doubleNegFacPairer},o));chosen=(_ref1=res.doublenegs)!=null?_ref1[0]:void 0;if(chosen){return{selection:[[chosen[1]],[chosen[2]]],choices:chosen[0]}}else{return Err("AUTOfrachasntnegfacsonbothfloors")}},perform:function(o){var choices,floor,path,sel,sels,_i,_len,_ref1,_ref2;sels=o.selection;choices=o.choices;_ref1=[0,1];for(_i=0,_len=_ref1.length;_i<_len;_i++){floor=_ref1[_i];sel=sels[floor][0];path=[floor].concat(o.deps.facPath(choices[floor],sel));o.beforemark(path);o.aftermark(path);if(!o.deps.equal(o.deps.lookUp(o.target,path),Neg(one))){o["do"]("negToNegOneFacProd","expandnegfac",{aim:path,direction:"left"});if(o.deps.lookUp(o.target,path.slice(0,-1)).type==="product"){o["do"]("absorbProductFacs","flattenintoprod",{aim:path.slice(0,-1),selection:[[sel]]})}else{choices[floor]=o.deps.toProdPath(choices[floor])}if((_ref2=choices[floor].slice(0,5))==="numer"||_ref2==="denom"){if(choices[floor].slice(0,5)==="numer"){o["do"]("extractFacsFromFrac","liftoutnegfromnumer",{aim:[floor],choices:[choices[floor].slice(5),"self"],selection:[[sel],[]],direction:"left"})}else{o["do"]("extractFacsFromFrac","liftoutnegfromnumer",{aim:[floor],choices:["self",choices[floor].slice(5)],selection:[[],[sel]],direction:"left"});o.doIf("collapseNegOneDenom","liftupnegfromdenom",{aim:[floor,0]})}choices[floor]="facs";sels[floor]=[0]}}}return o["do"]("eliminateFromFrac","killnegones",{selection:sels,choices:choices})}};collapseNegNumerFacNegFrac={info:{name:"collapseNegNumerFacNegFrac",effect:"simplifying",example:{str:"-((y*-x)/3)",selection:[[1]]},uses:["negToNegOneFacProd","expandNegFacs","extractFacsFromFrac","collapseNegProdWithNegFac"],tags:["negation","fraction","numeratorfactor","negativenumeratorfactor"]},prints:{errors:["mustbenegfrac"],steps:["freenegone","extractnegonefac","collapsenegprodnegfac"]},target:{type:"negation",validate:function(_arg){var child;child=_arg.target.objs[0];if(child.type==="fraction"){return OK}else{return Err("mustbenegfrac",[0])}}},selection:{from:function(_arg){var deps,numer,_ref1,_ref2,_ref3,_ref4;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,_ref3=_ref2[0],_ref4=_ref3.objs,numer=_ref4[0];return deps.getFacs(numer)},max:1,filter:"negation"},perform:function(o){var facpos;facpos=o.selection[0][0];if(o.target.objs[0].objs[0].type==="negation"){o.beforemark([[0,0]]);if(!o.deps.equal(o.target.objs[0].objs[0],Neg(one))){o["do"]("negToNegOneFacProd","freenegone",{aim:[0,0],direction:"left"})}}else{o.beforemark([[0,0,facpos]]);if(!o.deps.equal(o.target.objs[0].objs[0].objs[facpos],Neg(one))){o["do"]("expandNegFacs","freenegone",{aim:[0,0],selection:[[facpos]],direction:"left"})}}o["do"]("extractFacsFromFrac","extractnegonefac",{aim:[0],selection:[[facpos],[]],choices:[o.target.objs[0].objs[0].type==="product"?"facs":"self",o.target.objs[0].objs[1].type==="product"?"facs":"self"]});return o["do"]("collapseNegProdWithNegFac","collapsenegprodnegfac",{selection:[[0]]})}};collapseNegDenomFacNegFrac={info:{name:"collapseNegDenomFacNegFrac",effect:"simplifying",example:{str:"-(3/(y*-x))",selection:[[1]]},uses:["prolongFraction","collapseNegNumerFacNegFrac","absorbProductFacs","collapseTwoNegFacs"],tags:["collapse","negation","fraction","denominatorfactor","negativedenominatorfactor"]},prints:{errors:["mustbenegfrac"],steps:["prolongwithnegone","collapsewithnewnegnumerfac","flattendenom","collapsenegdenomfacs"]},target:{type:"negation",validate:function(_arg){var child;child=_arg.target.objs[0];if(child.type==="fraction"){return OK}else{return Err("mustbenegfrac",[0])}}},selection:{from:function(_arg){var denom,deps,numer,_ref1,_ref2,_ref3,_ref4;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,_ref3=_ref2[0],_ref4=_ref3.objs,numer=_ref4[0],denom=_ref4[1];return deps.getFacs(denom)},max:1,filter:"negation"},perform:function(o){var denomwasprod,facpos;facpos=o.selection[0][0];denomwasprod=o.target.objs[0].objs[1].type==="product";o["do"]("prolongFraction","prolongwithnegone",{aim:[0],direction:"left",argument:Neg(one)});o["do"]("collapseNegNumerFacNegFrac","collapsewithnewnegnumerfac",{selection:[[0]]});if(denomwasprod){o["do"]("absorbProductFacs","flattendenom",{aim:[1],selection:[[1]]});o.beforemark([[0,1,facpos]])}else{o.beforemark([[0,1]])}return o["do"]("collapseTwoNegFacs","collapsenegdenomfacs",{aim:[1],selection:[[0,facpos+1]]})}};flattenNegProdFac={info:{name:"flattenNegProdFac",effect:"simplifying",example:{str:"x*(-(2*y))*z",selection:[[1]]},uses:["flattenNegProd","absorbProductFacs"],tags:["negativeproductfactor","productfactor","negation","product","negativeproduct"]},prints:{errors:["mustbenegprod"],steps:["firstflattennegprod","thenweabsorbprod"],instructions:["choosesidefornegoneinfac"]},target:"product",direction:"choosesidefornegoneinfac",selection:{max:1,filter:function(o){if(o.item.type==="negation"&&o.item.objs[0].type==="product"){return OK}else{return"mustbenegprod"}}},perform:function(o){var pos,sel,_i,_ref1;sel=o.selection;o.beforemark(sel[0]);o["do"]("flattenNegProd","firstflattennegprod",{aim:sel[0]});for(pos=_i=0,_ref1=o.target.objs[sel[0][0]].objs.length;0<=_ref1?_i<_ref1:_i>_ref1;pos=0<=_ref1?++_i:--_i){o.aftermark([pos+sel[0][0]])}return o["do"]("absorbProductFacs","thenweabsorbprod",{selection:sel})}};collapseNegOneFac={info:{name:"collapseNegOneFac",effect:"simplifying",example:{str:"x*(-1)*3*y",selection:[[1],[3]]},uses:["splitFacsToProduct","negOneFacBiProdToNeg"],tags:["neg1","negation","product"]},prints:{errors:["nonegonefac"],steps:["thennegifythefac","firstgatherfacandnegone"]},target:"product",selection:{max:1,makefirstunique:true,questions:[{filter:"negone"},{}]},auto:function(o){var fac,firstnum,negone,pos,_i,_len,_ref1;firstnum=negone=-1;_ref1=o.target.objs;for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){fac=_ref1[pos];if(o.deps.equal(fac,Neg(one))){negone=pos}if(fac.type==="number"&&firstnum===-1){firstnum=pos}}if(negone===-1){return Err("nonegonefac")}else{return{selection:[[negone],[firstnum!==-1?firstnum:negone===0?1:0]]}}},perform:function(o){var facpos,negone,_ref1,_ref2,_ref3;_ref1=o.selection,_ref2=_ref1[0],negone=_ref2[0],_ref3=_ref1[1],facpos=_ref3[0];o.beforemark(o.selection);if(o.target.objs.length===2){return o["do"]("negOneFacBiProdToNeg","thennegifythefac")}else{o["do"]("splitFacsToProduct","firstgatherfacandnegone",{selection:[[negone,facpos].sort()]});o["do"]("negOneFacBiProdToNeg","thennegifythefac",{aim:[Math.min(negone,facpos)]});return o.aftermark(Math.min(negone,facpos))}}};collapseNegSum={info:{name:"collapseNegSum",effect:"simplifying",example:"-(x+3)",uses:["negToNegOneFacProd","distribute","collapseTwoNegFacs","negOneFacBiProdToNeg"],tags:["negativesum","collapse","negation"]},prints:{errors:["mustbenegsum"]},target:{type:"negation",validate:function(o){if(o.target.objs[0].type==="sum"){return OK}else{return Err("mustbenegsum")}}},perform:function(o){o["do"]("negToNegOneFacProd","firstexpandneg",{direction:"left"});return o["do"]("mirrorSumWithNegInProd","thenmirrorthesum",{selection:[[0],[1]]})}};mirrorSumWithNegInFrac={info:{name:"mirrorSumWithNegInFrac",effect:"condsimpl",example:{str:"(x-3)/-x",choices:["denom"],selection:[[0],[0]]},uses:["moveNegBetweenFloorsInFrac","collapseNegSum"],tags:["fraction","negation","negativesum"]},target:"fraction",prints:{instructions:["CHOfloortogetnegationfrom","SELnegtousetomirrorsum","SELsumtomirrorwithneg"],errors:["nonegsumcombobetweenfloors"]},choices:{instruction:"CHOfloortogetnegationfrom",options:["numer","denom"]},selection:{max:1,questions:[{instruction:"SELnegtousetomirrorsum",filter:"negation",from:function(o){return o.deps.getFacs(o.target.objs[o.choices[0]==="numer"?0:1])}},{instruction:"SELsumtomirrorwithneg",filter:"sum",from:function(o){return o.deps.getFacs(o.target.objs[o.choices[0]==="numer"?1:0])}}]},auto:function(o){var f,floor,floorfacs,input,n,negs,ok,otherfloor,sum,sums,_i,_j,_k,_l,_len,_len1,_ref1,_ref2,_ref3,_results,_results1;floorfacs=[o.deps.getFacs(o.target.objs[0]),o.deps.getFacs(o.target.objs[1])];ok=false;_ref1=[[0,1],[1,0]];for(_i=0,_len=_ref1.length;_i<_len;_i++){f=_ref1[_i];floor=f[0],otherfloor=f[1];negs=function(){_results=[];for(var _j=0,_ref2=floorfacs[floor].length;0<=_ref2?_j<_ref2:_j>_ref2;0<=_ref2?_j++:_j--){_results.push(_j)}return _results}.apply(this).filter(function(n){return floorfacs[floor][n].type==="negation"});if(negs.length){sums=function(){_results1=[];for(var _k=0,_ref3=floorfacs[otherfloor].length;0<=_ref3?_k<_ref3:_k>_ref3;0<=_ref3?_k++:_k--){_results1.push(_k)}return _results1}.apply(this).filter(function(n){return floorfacs[otherfloor][n].type==="sum"});for(_l=0,_len1=sums.length;_l<_len1;_l++){n=sums[_l];sum=floorfacs[otherfloor][n];input={choices:[["numer","denom"][floor]],selection:[[negs[0]],[n]]};ok=true;if(o.deps.isHalfNegSum({obj:sum,deps:o.deps})){return input}}}}if(ok){return Err("NOSIMPL")}else{return Err("nonegsumcombobetweenfloors")}},perform:function(o){var negfloor,negpath,negtact,sumfloor,sumpath,sumtact,_ref1;_ref1=o.choices[0]==="numer"?[0,1]:[1,0],negfloor=_ref1[0],sumfloor=_ref1[1];negtact=o.target.objs[negfloor].type==="product"?"facs":"self";sumtact=o.target.objs[sumfloor].type==="product"?"facs":"self";negpath=negtact==="facs"?[negfloor,o.selection[0][0]]:[negfloor];sumpath=sumtact==="facs"?[sumfloor,o.selection[1][0]]:[sumfloor];o.beforemark(negpath);o.beforemark(sumpath);o.aftermark(negpath);o.aftermark(sumpath);o["do"]("moveNegBetweenFloorsInFrac","movenegtosumfloor",{choices:[o.choices[0],negtact,sumtact]});return o["do"]("collapseNegSum","mirrorthesum",{aim:sumpath})}};mirrorSumWithNegInProd={info:{name:"mirrorSumWithNegInProd",effect:"condsimpl",example:{str:"(x-3)*-x",selection:[[1],[0]]},uses:["negToNegOneFacProd","absorbProductFacs","distributeFacs","collapseTwoNegFacs","negOneFacBiProdToNeg","moveNegFromFracToFloorFac"],tags:["product","sumfactor","negation"]},prints:{instructions:["SELnegtousetomirrorsum","SELsumtomirrorwithneg"],errors:["nonegationstouse","nosumstonegate"]},target:"product",selection:{max:1,questions:[{instruction:["SELnegtousetomirrorsum"],filter:"negation"},{instruction:["SELsumtomirrorwithneg"],filter:"sum"}]},auto:function(o){var facs,length,negs,sum,sums,_i,_j,_k,_len,_results,_results1;facs=o.target.objs;length=facs.length;negs=function(){_results=[];for(var _i=0;0<=length?_i<length:_i>length;0<=length?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(n){return facs[n].type==="negation"});if(!negs.length){return Err("nonegationstouse")}else{sums=function(){_results1=[];for(var _j=0;0<=length?_j<length:_j>length;0<=length?_j++:_j--){_results1.push(_j)}return _results1}.apply(this).filter(function(n){return facs[n].type==="sum"});if(!sums.length){return Err("nosumstonegate")}else{for(_k=0,_len=sums.length;_k<_len;_k++){sum=sums[_k];if(o.deps.isHalfNegSum({obj:facs[sum],deps:o.deps})){return{selection:[[negs[0]],[sum]]}}}return Err("NOSIMPL")}}},perform:function(o){var neg,path,pos,sum,termnum,_i,_ref1,_ref2,_ref3,_ref4;_ref1=o.selection,_ref2=_ref1[0],neg=_ref2[0],_ref3=_ref1[1],sum=_ref3[0];if(!o.deps.equal(o.target.objs[neg],Neg(one))){o["do"]("negToNegOneFacProd","movenegtosum",{direction:"left",aim:[neg]});o["do"]("absorbProductFacs","absorbnegone",{selection:[[neg]]});if(neg<sum){sum++}}o["do"]("distributeFacs","movenegoneintosum",{selection:[[sum],[neg]],direction:"left"});pos=Math.min(sum,neg);path=o.target.type==="product"?[pos]:[];for(termnum=_i=0,_ref4=o.deps.lookUp(o.target,path).objs.length;0<=_ref4?_i<_ref4:_i>_ref4;termnum=0<=_ref4?++_i:--_i){o["try"]("collapseTwoNegFacs","negbecomespos",{aim:path.concat([termnum])});o["try"]("negOneFacBiProdToNeg","negifyterm",{aim:path.concat([termnum])});o["try"]("moveNegFromFracToFloorFac","negbecomespos")}return o.beforemark([[neg],[sum]])}};flattenNegProd={info:{name:"flattenNegProd",effect:"rephrasing",example:{str:"-(x*y)"},uses:["negToNegOneFacProd","absorbProductFacs"],tags:["negation","product","negativeproduct","factorise"]},prints:{instructions:["choosesidefornegone"],errors:["mustbenegprod"],steps:["extractnegone","flattenresult"]},target:{type:"negation",validate:function(_arg){var child;child=_arg.target.objs[0];if(child.type==="product"){return OK}else{return Err("mustbenegprod",[0])}}},direction:"choosesidefornegone",perform:function(o){var fac,pos,_i,_len,_ref1;o.beforemark([0]);_ref1=o.target.objs[0].objs;for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){fac=_ref1[pos];o.aftermark([pos+(o.direction==="right"?0:1)])}o["do"]("negToNegOneFacProd","extractnegone");return o["do"]("absorbProductFacs","flattenresult",{selection:[[o.direction==="right"?0:1]]})}};negFromFracToNumer={info:{name:"negFromFracToNumer",effect:"rephrasing",example:{str:"-(x/y)"},uses:["negToNegOneFacProd","multFacsIntoFrac"],tags:["negation","fraction","negativefraction"]},prints:{errors:["mustbenegfrac"],instructions:["choosesidefornegoneinnumer"],steps:["firstexpandneg","thenmultnegoneintonumer"]},target:{type:"negation",validate:function(o){if(o.target.objs[0].type==="fraction"){return OK}else{return Err("mustbenegfrac")}}},direction:"choosesidefornegoneinnumer",perform:function(o){o.aftermark([[0,o.dirnum()]]);o["do"]("negToNegOneFacProd","firstexpandneg");return o["do"]("multFacsIntoFrac","thenmultnegoneintonumer",{selection:[[o.oppdirnum()],[o.dirnum()]]})}};moveNegBetweenFacs={info:{name:"moveNegBetweenFacs",effect:"condsimpl",example:{str:"x*-y",selection:[[1],[0]]},tags:["negativefactor","negation","product"],uses:["expandNegFacs","rearrange","collapseNegOneFac"]},prints:{steps:["firstweextractthenegation","movethenegationsowedontchangeorder","thenwenegifytheotherfacinstead"]},target:"product",selection:{max:1,makefirstunique:true,questions:[{filter:"negation"},{}]},auto:function(o){var facs,negexpr,num,positions,_i,_ref1,_results;facs=o.target.objs;positions=function(){_results=[];for(var _i=0,_ref1=facs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this);negexpr=positions.filter(function(pos){return facs[pos].type==="negation"&&facs[pos].objs[0].type!=="number"})[0];num=positions.filter(function(pos){return o.deps.isNumeric(facs[pos])})[0];if(negexpr!==void 0&&num!==void 0){return{selection:[[negexpr],[num]]}}else{return Err("NOSIMPL")}},perform:function(o){var negpos,neworder,otherpos,_ref1,_ref2,_ref3;_ref1=o.selection,_ref2=_ref1[0],negpos=_ref2[0],_ref3=_ref1[1],otherpos=_ref3[0];o.beforemark([negpos]);o.aftermark([otherpos]);o["do"]("expandNegFacs","firstweextractthenegation",{selection:[[negpos]],direction:"left"});if(negpos<otherpos){neworder=o.target.objs.slice(0,negpos).concat(o.target.objs.slice(negpos+1,+(otherpos+1)+1||9e9)).concat(o.target.objs[negpos]).concat(o.target.objs.slice(otherpos+2));o["do"]("rearrange","movethenegationsowedontchangeorder",{rearrange:neworder});negpos=otherpos+1}return o["do"]("collapseNegOneFac","thenwenegifytheotherfacinstead",{selection:[[negpos],[otherpos]]})}};moveNegFromProdToFac={info:{name:"moveNegFromProdToFac",effect:"condsimpl",example:{str:"-(xy)",selection:[[1]]},uses:["negToNegOneFacProd","absorbProductFacs","collapseNegOneFac"],tags:["negativeproduct","negation","product","negativefactor"],opposite:"moveNegFromFacToProd"},prints:{steps:["wefreeprodnegation","andflattentoproduct","thennegifythefac"],errors:["mustbenegprod"]},target:{type:"negation",validate:function(o){if(o.target.objs[0].type==="product"){return OK}else{return Err("mustbenegprod",[0])}}},selection:{max:1,from:[0]},auto:function(o){var n,obj,_i,_len,_ref1;_ref1=o.target.objs[0].objs;for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){obj=_ref1[n];if(obj.type==="number"){return{selection:[[n]]}}}return Err("NOSIMPL")},perform:function(o){var fac;fac=o.selection[0][0];o["do"]("negToNegOneFacProd","wefreeprodnegation",{direction:"right"});o["do"]("absorbProductFacs","andflattentoproduct",{selection:[[0]]});o["do"]("collapseNegOneFac","thennegifythefac",{selection:[[o.target.objs.length-1],[fac]]});o.beforemark([0,fac]);return o.aftermark([fac])}};moveNegFromFacToProd={info:{name:"moveNegFromFacToProd",effect:"rephrasing",example:{str:"x*-y",selection:[[1]]},uses:["expandNegFacs","splitFacsToProduct","negOneFacBiProdToNeg"],tags:["negation","product","negativefactor","negativeproduct"],opposite:"moveNegFromProdToFac"},prints:{steps:["wefreenegtobemoved","andcollecttheotherfacs","finallycollapsethenegoverthem"]},target:"product",selection:{max:1,filter:"negation"},perform:function(o){var pos,_i,_ref1,_results;pos=o.selection[0][0];o.beforemark([[pos]]);if(!o.deps.equal(o.target.objs[pos],Neg(one))){o["do"]("expandNegFacs","wefreenegtobemoved",{selection:[[pos]],direction:"left"})}if(o.target.objs.length>2){o["do"]("splitFacsToProduct","andcollecttheotherfacs",{selection:[function(){_results=[];for(var _i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(i){return i!==pos})]})}return o["do"]("negOneFacBiProdToNeg","finallycollapsethenegoverthem",{selection:[[pos?1:0]]})}};moveNegBetweenFloorsInFrac={info:{name:"moveNegBetweenFloorsInFrac",effect:"rephrasing",example:{str:"((-y)*x)/z",choices:["numer","facs","self"],selection:[[0],[0]]},uses:["prolongFraction","collapseTwoNegFacs","absorbProductFacs","negOneFacBiProdToNeg","collapseNegOneFac"],tags:["negation","fraction","negativenumeratorfactor","negativedenominatorfactor"]},prints:{steps:["wemultbyonetoexpand","expandonetonegfrac","mergenegonesintoourfraction","removethefactobemoved","preparetoremovefactobemoved","insteadnegifytargetfac","preparetonegytargetfac"]},target:"fraction",choices:{questions:[{options:["numer","denom"]},{options:function(o){return["self"].concat(o.target.objs[o.choices[0]==="numer"?0:1].type==="product"?["facs"]:[])}},{options:function(o){return["self"].concat(o.target.objs[o.choices[0]==="numer"?1:0].type==="product"?["facs"]:[])}}]},selection:{max:1,questions:[{from:function(o){return o.deps.getFacs(o.target.objs[o.choices[0]==="numer"?0:1],o.choices[1])},filter:"negation"},{from:function(o){return o.deps.getFacs(o.target.objs[o.choices[0]==="numer"?1:0],o.choices[2])}}]},perform:function(o){var choices,from,sels,to,_ref1;sels=o.selection;choices=o.choices;_ref1=choices[0]==="numer"?[0,1]:[1,0],from=_ref1[0],to=_ref1[1];o["do"]("prolongFraction","weprolongwithnegone",{direction:"right",argument:Neg(one)});if(choices[1]==="self"){o.beforemark([from]);o["do"]("collapseTwoNegFacs","removethefactobemoved",{aim:[from],selection:[[0,1]]})}else{o.beforemark([from,sels[0][0]]);o["do"]("absorbProductFacs","flattensource"+["numer","denom"][from],{aim:[from],selection:[[0]]});o["do"]("collapseTwoNegFacs","removethefactobemoved",{aim:[from],selection:[[sels[0][0],o.target.objs[from].objs.length-1]]})}if(choices[2]==="self"){o.aftermark([to]);o["do"]("negOneFacBiProdToNeg","insteadnegifytargetfac",{aim:[to]})}else{o.aftermark([to,sels[1][0]]);o["do"]("absorbProductFacs","flattendest"+["numer","denom"][to],{aim:[to],selection:[[0]]});o["do"]("collapseNegOneFac","insteadnegifytargetfac",{aim:[to],selection:[[o.target.objs[to].objs.length-1],[sels[1][0]]]})}return o}};moveNegFromFloorFacToFrac={info:{name:"moveNegFromFloorFacToFrac",effect:"rephrasing",example:{str:"((-y)*x)/z",choices:["numer","facs"],selection:[[0]]},uses:["negToNegOneFacProd","expandNegFacs","extractFacsFromFrac","collapseNegOneDenom","negOneFacBiProdToNeg"],tags:["negation","fraction","negativefraction","negativenumeratorfactor","negativedenominatorfactor"],opposite:"moveNegFromFracToFloorFac"},prints:{steps:["removethefactobemoved","liftoutnegfromfrac","moveupnegfromdenom","finallyenvelopfrac"]},target:"fraction",choices:{questions:[{options:["numer","denom"]},{options:function(o){return["self"].concat(o.target.objs[o.choices[0]==="numer"?0:1].type==="product"?["facs"]:[])}}]},selection:{max:1,filter:"negation",from:function(o){return o.deps.getFacs(o.target.objs[o.choices[0]==="numer"?0:1],o.choices[1])}},perform:function(o){var choices,floor,sel;sel=o.selection[0][0];choices=o.choices;floor=choices[0]==="numer"?0:1;if(choices[1]==="self"){o.beforemark([floor]);o["do"]("negToNegOneFacProd","removethefactobemoved",{aim:[floor],direction:"left"})}else{o.beforemark([floor,sel]);o["do"]("expandNegFacs","removethefactobemoved",{direction:"left",aim:[floor],selection:[[sel]]})}o["do"]("extractFacsFromFrac","liftoutnegfromfrac",{direction:"left",selection:floor===0?[[sel],[]]:[[],[sel]],choices:floor?["self","facs"]:["facs","self"]});o["try"]("collapseNegOneDenom","moveupnegfromdenom",{aim:[0]});o["do"]("negOneFacBiProdToNeg","finallyenvelopfrac");return o}};moveNegFromFracToFloorFac={info:{name:"moveNegFromFracToFloorFac",effect:"rephrasing",example:{str:"-(x/(yz))",choices:["denom","facs"],selection:[[1]]},uses:["negToNegOneFacProd","divideByOne","prolongFraction","twoNegOneFacProdToOne","purgeOneFacs","biFracProdToBiProdFrac","negOneFacBiProdToNeg","absorbProductFacs","collapseNegOneFac"],tags:["negation","fraction","negativefraction","negativenumeratorfactor","negativedenominatorfactor"],opposite:"moveNegFromFloorFacToFrac"},prints:{errors:["mustbenegfrac"],steps:["expandnegtobemoved","turntofrac","preparemovingnegtodenom","collapsenumernegone","cleanupdenom","mergenegonesintoourfraction","removeresidue","insteadnegifytargetfac","preparetonegifyfac","negifychosenfac"]},target:{type:"negation",validate:function(_arg){var frac;frac=_arg.target.objs[0];if(frac.type==="fraction"){return OK}else{return Err("mustbenegfrac",[0])}}},choices:{questions:[{options:["numer","denom"]},{options:function(o){return["self"].concat(o.target.objs[0].objs[o.choices[0]==="numer"?0:1].type==="product"?["facs"]:[])}}]},selection:{max:1,from:function(o){return o.deps.getFacs(o.target.objs[0].objs[o.choices[0]==="numer"?0:1],o.choices[1])}},perform:function(o){var facchoice,facpos,floorchoice,leftover,to,_ref1,_ref2;_ref1=o.choices,floorchoice=_ref1[0],facchoice=_ref1[1];facpos=o.selection[0][0];_ref2=floorchoice==="numer"?[0,1]:[1,0],to=_ref2[0],leftover=_ref2[1];o["do"]("negToNegOneFacProd","expandnegtobemoved",{direction:"right"});o["do"]("divideByOne","turntofrac",{aim:[1]});if(floorchoice==="denom"){o["do"]("prolongFraction","preparemovingnegtodenom",{aim:[1],argument:Neg(one)});o["do"]("twoNegOneFacProdToOne","collapsenumernegone",{aim:[1,0]});o["try"]("purgeOneFacs","cleanupdenom",{aim:[1,1]})}o["do"]("biFracProdToBiProdFrac","mergenegonesintoourfraction");o["do"]("purgeOneFacs","removeresidue",{aim:[leftover],selection:[[1]]});if(facchoice==="self"){o["do"]("negOneFacBiProdToNeg","insteadnegifytargetfac",{aim:[to]});o.beforemark([0,to]);return o.aftermark([to])}else{o.beforemark([0,to,facpos]);o.aftermark([to,facpos]);
o["do"]("absorbProductFacs","preparetonegifyfac",{aim:[to],selection:[[0]]});return o["do"]("collapseNegOneFac","negifychosenfac",{aim:[to],selection:[[o.target.objs[to].objs.length-1],[facpos]]})}}};addTwoNegOneFacsToExpression={info:{name:"addTwoNegOneFacsToExpression",effect:"complicating",example:{str:"xzy",direction:"right"},uses:["multiplyByOne","oneToTwoNegOneFacProd","absorbProductFacs"],tags:["factorise","negation","neg1","introduce"],lesson:"negation101"},target:"math",prints:{instructions:"DIRsidefornegonefacs",steps:["multwithonetoturntonegones","splitonetotwonegones","flattentosingleprod"]},direction:"DIRsidefornegonefacs",perform:function(o){var offset;offset=o.dirnum()?o.deps.getFacs(o.target).length:0;o.aftermark([[offset],[offset+1]]);o["do"]("multiplyByOne","multwithonetoturntonegones");o["do"]("oneToTwoNegOneFacProd","splitonetotwonegones",{aim:[o.dirnum()]});return o["try"]("absorbProductFacs","flattentosingleprod")}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={mirrorSumWithNegInFrac:mirrorSumWithNegInFrac,addTwoNegOneFacsToExpression:addTwoNegOneFacsToExpression,mirrorSumWithNegInProd:mirrorSumWithNegInProd,isHalfNegSum:isHalfNegSum,hasAcceccibleNeg:hasAcceccibleNeg,collapseNegSum:collapseNegSum,digIfNeg:digIfNeg,moveNegFromFracToFloorFac:moveNegFromFracToFloorFac,moveNegFromFloorFacToFrac:moveNegFromFloorFacToFrac,moveNegBetweenFloorsInFrac:moveNegBetweenFloorsInFrac,moveNegFromFacToProd:moveNegFromFacToProd,moveNegFromProdToFac:moveNegFromProdToFac,moveNegBetweenFacs:moveNegBetweenFacs,collapseNegOneFac:collapseNegOneFac,negFromFracToNumer:negFromFracToNumer,flattenNegProdFac:flattenNegProdFac,flattenNegProd:flattenNegProd,collapseNegDenomFacNegFrac:collapseNegDenomFacNegFrac,collapseNegNumerFacNegFrac:collapseNegNumerFacNegFrac,collapseNegNumerDenomFacs:collapseNegNumerDenomFacs,exhumeSteps:exhumeSteps,isPotNegOne:isPotNegOne,collapseNegProdWithNegFac:collapseNegProdWithNegFac,collapseTwoNegFacs:collapseTwoNegFacs,collapseDoubleNeg:collapseDoubleNeg,expandNegFacs:expandNegFacs,twoNegOneFacProdToOne:twoNegOneFacProdToOne,negOneFacBiProdToNeg:negOneFacBiProdToNeg,oneToTwoNegOneFacProd:oneToTwoNegOneFacProd,negToNegOneFacProd:negToNegOneFacProd};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);