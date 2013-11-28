(function(){var And,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,Leq,Lt,Neg,Neq,Not,Num,OK,Or,Pow,Power,Prod,Product,Sum,TRUE,absorbNegSum,absorbSumTerms,addEqualDenomFracs,addExpressions,addMirroredExpression,addMirroredNumber,addNumericDenomFracs,addNumericFracToNumber,addTermWithNumerTerm,addZero,addition,additionValueAndUnit,arrsplit,deepcopy,exportTo,findAddableObjects,five,four,funcs,getMergeNumericInstructions,getOppositeNumeric,getTerms,isErr,isMirrorSums,isNumeric,isNumericInclFrac,k,makeCheck,mergeAllNumTerms,mergeNegNumTerms,mergePosNumTerms,mixin,numToSum,numberValue,one,printObj,purgeZeroTerms,splitTermsToSum,subtractInSum,subtraction,three,two,v,x,y,z,zero,zeroToMirroredExpression,_ref,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};_ref=typeof require==="undefined"?this.CATS.math.toolhelpers:require("./toolhelpers"),isErr=_ref.isErr,deepcopy=_ref.deepcopy,mixin=_ref.mixin,arrsplit=_ref.arrsplit,Prod=_ref.Prod,Frac=_ref.Frac,Pow=_ref.Pow,Eq=_ref.Eq,Leq=_ref.Leq,Gt=_ref.Gt,Geq=_ref.Geq,Lt=_ref.Lt,Neq=_ref.Neq,four=_ref.four,five=_ref.five,And=_ref.And,Or=_ref.Or,Not=_ref.Not,TRUE=_ref.TRUE,FALSE=_ref.FALSE,makeCheck=_ref.makeCheck,x=_ref.x,y=_ref.y,z=_ref.z,Neg=_ref.Neg,Product=_ref.Product,Sum=_ref.Sum,Power=_ref.Power,Fraction=_ref.Fraction,Num=_ref.Num,zero=_ref.zero,one=_ref.one,two=_ref.two,three=_ref.three,Err=_ref.Err,OK=_ref.OK,printObj=_ref.printObj;getOppositeNumeric=function(obj){var ret;ret=deepcopy(obj);if(ret.type==="negation"){return ret.objs[0]}else if(ret.type==="fraction"){if(ret.objs[0].type==="negation"){ret.objs[0]=ret.objs[0].objs[0];return ret}else if(ret.objs[1].type==="negation"){ret.objs[1]=ret.objs[1].objs[0];return ret}else{return Neg(ret)}}else{return Neg(ret)}};isMirrorSums=function(_arg){var deps,firstchildnegs,firstchildspirit,n,obj1,obj2,s1,s2,secondchildnegs,secondchildspirit,_i,_ref1,_ref2;deps=_arg.deps,obj1=_arg.obj1,obj2=_arg.obj2;if(obj1.type==="sum"&&obj2.type==="sum"){s1=deps.getSpiritObj(obj1);s2=deps.getSpiritObj(obj2);for(n=_i=0,_ref1=obj1.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;n=0<=_ref1?++_i:--_i){firstchildspirit=deps.getSpiritObj(s1.spirit.objs[n]);secondchildspirit=deps.getSpiritObj(s2.spirit.objs[n]);if(!deps.isKindredSpirits({obj1:firstchildspirit.spirit,obj2:secondchildspirit.spirit,deps:deps}).result){return false}firstchildnegs=s1.neganalysis.childnegs[s1.reorder[n]]+firstchildspirit.neganalysis.childnegcount;secondchildnegs=s2.neganalysis.childnegs[s2.reorder[n]]+secondchildspirit.neganalysis.childnegcount;if(!((_ref2=firstchildnegs-secondchildnegs)===1||_ref2===-1)){return false}}return true}else{return false}};getTerms=function(obj){if(obj.type==="sum"){return obj.objs}else{return[obj]}};isNumeric=function(o){return o.type==="number"||o.type==="negation"&&o.objs[0].type==="number"};isNumericInclFrac=function(obj){var check;check=obj.type==="negation"?obj.objs[0]:obj;if(check.type==="number"){return true}else if(check.type==="fraction"){if(!isNumeric(check.objs[0])){return false}if(!isNumeric(check.objs[1])){return false}return true}else{return false}};numberValue=function(o){return parseFloat(o.type==="number"?o.val:-o.objs[0].val)};additionValueAndUnit=function(o,deps){var fac,facprod,facs,numfacs,numprod,prodfacs,_i,_len;if(deps.isNumeric(o)){return[o,"VOID"]}else if(o.type==="product"||o.type==="negation"&&o.objs[0].type==="product"){if(o.type==="negation"){numfacs=[Neg(one)];prodfacs=o.objs[0].objs}else{numfacs=[];prodfacs=o.objs}facs=[];for(_i=0,_len=prodfacs.length;_i<_len;_i++){fac=prodfacs[_i];if(deps.isNumeric(fac)){numfacs.push(fac)}else if(fac.type==="negation"){numfacs.push(Neg(one));facs.push(fac.objs[0])}else{facs.push(fac)}}numprod=deps.collapseStubList(Prod(numfacs.sort(utils.sortFacs)));facprod=deps.collapseStubList(Prod(facs.sort(utils.sortFacs)));return[numprod,facprod]}else if(o.type==="negation"){return[Neg(one),o.objs[0]]}else{return[one,o]}};findAddableObjects=function(o,o2,deps){return deps.FindSubLists(function(o,o2){var o2base,obase,val,_ref1,_ref2;_ref1=deps.additionValueAndUnit(o),val=_ref1[0],obase=_ref1[1];_ref2=deps.additionValueAndUnit(o2),val=_ref2[0],o2base=_ref2[1];return obase!=="VOID"&&deps.equal(obase,o2base)})};getMergeNumericInstructions=function(sum){var length,negnums,pos,posnums,term;length=sum.objs.length;posnums=function(){var _i,_len,_ref1,_results;_ref1=sum.objs;_results=[];for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){term=_ref1[pos];if(term.type==="number"){_results.push(pos)}}return _results}();negnums=function(){var _i,_len,_ref1,_results;_ref1=sum.objs;_results=[];for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){term=_ref1[pos];if(term.type==="negation"&&term.objs[0].type==="number"){_results.push(pos)}}return _results}();if(posnums.length+negnums.length<2){return false}else if(length===2){if(posnums.length===2){return["addition",{selection:[[0,1]]}]}else if(negnums.length===1&&posnums.length===1){return["subtraction",{selection:[[0,1]]}]}else{return["mergeNegNumTerms",{selection:[[0,1]]}]}}else{if(negnums.length===0){return["mergePosNumTerms",{selection:[posnums]}]}else if(posnums.length===0){return["mergeNegNumTerms",{selection:[negnums]}]}else{return["mergeAllNumTerms",{selection:[posnums.concat(negnums).sort()]}]}}};absorbSumTerms={info:{name:"absorbSumTerms",opposite:"splitTermsToSum",effect:"simplifying",example:{str:"x+(2+y)+z",selection:[[1]]},tags:["sum","sumterm"],lesson:"sum101"},prints:{errors:["mustselectsum"]},target:"sum",selection:{filter:"sum"},perform:function(_arg){var at,child,innersum,marks,pos,s,selection,target,term,terms,_i,_j,_len,_len1,_ref1,_ref2;target=_arg.target,selection=_arg.selection;terms=[];marks=[];at=0;_ref1=target.objs;for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){term=_ref1[pos];if(__indexOf.call(selection[0],pos)>=0){innersum=target.objs[pos];_ref2=innersum.objs;for(_j=0,_len1=_ref2.length;_j<_len1;_j++){child=_ref2[_j];terms.push(child);marks.push([at]);at++}}else{at++;terms.push(term)}}return{result:Sum(terms),beforemarks:function(){var _k,_len2,_ref3,_results;_ref3=selection[0];_results=[];for(_k=0,_len2=_ref3.length;_k<_len2;_k++){s=_ref3[_k];_results.push([s])}return _results}(),aftermarks:marks}}};addition={info:{name:"addition",effect:"simplifying",example:"2+3",tags:["sum","number"],lesson:"sum101"},prints:{errors:["mustbebisum","mustbenumterms"]},target:{type:"sum",validate:function(_arg){var deps,term1,term2,term3,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,term1=_ref2[0],term2=_ref2[1],term3=_ref2[2];if(term3){return Err("mustbebisum")}else if(term1.type!=="number"){return Err("mustbenumterms",[0])}else if(term2.type!=="number"){return Err("mustbenumterms",[1])}else{return OK}}},perform:function(_arg){var term1,term2,_ref1;_ref1=_arg.target.objs,term1=_ref1[0],term2=_ref1[1];return{result:Num(parseFloat(term1.val)+parseFloat(term2.val)),beforemarks:[[0],[1]]}}};subtraction={info:{name:"subtraction",effect:"simplifying",example:"4-1",tags:["sum","number","negativenumberterm","negativenumber"]},prints:{errors:["mustbebisum","termsmustbenumeric","termsmustbenumeric","mustcontainneg"]},target:{type:"sum",validate:function(_arg){var deps,term1,term2,term3,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,term1=_ref2[0],term2=_ref2[1],term3=_ref2[2];if(term3){return Err("mustbebisum")}else if(!deps.isNumeric(term1)){return Err("termsmustbenumeric",[0])}else if(!deps.isNumeric(term2)){return Err("termsmustbenumeric",[1])}else if(term1.type!=="negation"&&term2.type!=="negation"){return Err("mustcontainneg")}else{return OK}}},perform:function(_arg){var deps,term1,term2,_ref1,_ref2;deps=_arg.deps,_ref1=_arg.target,_ref2=_ref1.objs,term1=_ref2[0],term2=_ref2[1];return{result:Num(deps.numberValue(term1)+deps.numberValue(term2))}}};addZero={info:{name:"addZero",effect:"complicating",opposite:"purgeZeroTerms",example:"x",tags:["sum","number0","introduce"],lesson:"sum101"},target:"math",direction:"choosesideforterm",perform:function(_arg){var direction,target;target=_arg.target,direction=_arg.direction;if(direction==="right"){return{result:Sum(target,Num(0)),aftermarks:[[1]]}}else{return{result:Sum(Num(0),target),aftermarks:[[0]]}}}};splitTermsToSum={info:{name:"splitTermsToSum",effect:"complicating",example:{str:"1+2+3+4+5",selection:[[1,4]]},opposite:"absorbSumTerms",tags:["sum","sumterm"],lesson:"sum101"},target:"sum",selection:{minleft:1,min:2},perform:function(_arg){var chosen,deps,remaining,s,sel,selection,target,_ref1;deps=_arg.deps,target=_arg.target,selection=_arg.selection;sel=selection[0];_ref1=arrsplit(target.objs,function(o,pos){return __indexOf.call(sel,pos)>=0}),chosen=_ref1[0],remaining=_ref1[1];remaining.splice(sel[0],0,Sum(chosen));return{result:deps.collapseStubList(Sum(remaining)),beforemarks:function(){var _i,_len,_results;_results=[];for(_i=0,_len=sel.length;_i<_len;_i++){s=sel[_i];_results.push([s])}return _results}(),aftermarks:[[sel[0]]]}}};numToSum={info:{name:"numToSum",effect:"complicating",example:{str:"4",argument:Sum(three,one)},tags:["sum","number"],lesson:"sum101"},prints:{errors:["mustbesamevaluesum"],instructions:["entersamevaluesum"]},target:"number",argument:{instruction:"entersamevaluesum",type:"sum",validate:function(o){var sum,term,_i,_len,_ref1;sum=0;_ref1=o.argument.objs;for(_i=0,_len=_ref1.length;_i<_len;_i++){term=_ref1[_i];sum+=o.deps.numberValue(term)}if(sum!==o.deps.numberValue(o.target)){return Err("mustbesamevaluesum")}else{return OK}}},perform:function(_arg){var argument;argument=_arg.argument;return{result:argument}}};purgeZeroTerms={info:{name:"purgeZeroTerms",effect:"simplifying",opposite:"addZero",example:{str:"x+0+y+0",selection:[[1,3]]},tags:["sum","number0","remove"],lesson:"sum101"},prints:{errors:["mustselectzero"]},target:"sum",selection:{minleft:1,filter:"zero"},perform:function(_arg){var beforemarks,deps,p,pos,selection,target,term,terms,_i,_len,_ref1;deps=_arg.deps,target=_arg.target,selection=_arg.selection;beforemarks=[];terms=[];_ref1=target.objs;for(pos=_i=0,_len=_ref1.length;_i<_len;pos=++_i){term=_ref1[pos];if(__indexOf.call(selection[0],pos)<0){terms.push(term)}}return{result:deps.collapseStubList(Sum(terms)),beforemarks:function(){var _j,_len1,_ref2,_results;_ref2=selection[0];_results=[];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){p=_ref2[_j];_results.push([p])}return _results}()}}};mergePosNumTerms={info:{name:"mergePosNumTerms",effect:"simplifying",example:{str:"2+x+8",selection:[[0,2]]},uses:["splitTermsToSum","addition"],tags:["merge","sum","numericterm"],lesson:"sum102"},prints:{steps:["groupaddpair","addpair","addpaircollapsesum"]},target:"sum",selection:{min:2,filter:"number"},perform:function(o){var n,s,sel,_i,_ref1;sel=o.selection[0].sort(function(o1,o2){if(o1>o2){return 1}else{return-1}});for(n=_i=_ref1=sel.length-1;_ref1<=1?_i<=1:_i>=1;n=_ref1<=1?++_i:--_i){if(o.target.objs.length>2){o["do"]("splitTermsToSum","groupaddpair",{selection:[[sel[n-1],sel[n]]]});o["do"]("addition","addpair",{aim:[sel[n-1]]})}else{o["do"]("addition","addpaircollapsesum")}}if(o.target.type==="sum"){o.aftermark([[sel[0]]])}return o.beforemark(function(){var _j,_len,_results;_results=[];for(_j=0,_len=sel.length;_j<_len;_j++){s=sel[_j];_results.push([s])}return _results}())}};subtractInSum={info:{name:"subtractInSum",effect:"simplifying",example:{str:"1-y-2",selection:[[2],[0]]},uses:["splitTermsToSum","subtraction"],tags:["sum","merge","numericterm","negativenumberterm"],lesson:"sum102"},prints:{steps:["firstgroupinvolvedterms","thendothesubtraction"]},target:"sum",selection:{max:1,makefirstunique:true,questions:[{filter:"negnum"},{filter:"numeric"}]},perform:function(o){var bothpos;o.beforemark(o.selection);bothpos=o.selection[0].concat(o.selection[1]).sort();if(o.target.objs.length===2){o["do"]("subtraction","thendothesubtraction")}else{o["do"]("splitTermsToSum","firstgroupinvolvedterms",{selection:[bothpos]});o["do"]("subtraction","thendothesubtraction",{aim:[bothpos[0]]})}return o.aftermark([bothpos[0]])}};absorbNegSum={info:{name:"absorbNegSum",effect:"simplifying",example:{str:"x-(y+z)",selection:[[1]]},uses:["collapseNegSum","absorbSumTerms"],tags:["negativesum","sum"]},prints:{errors:["SELmustbenegsum"]},target:"sum",selection:{filter:function(_arg){var item;item=_arg.item;if(item.type==="negation"&&item.objs[0].type==="sum"){return OK}else{return Err("SELmustbenegsum")}}},perform:function(o){var pos,size,term,_i,_ref1;pos=o.selection[0][0];size=o.target.objs[pos].objs[0].objs.length;o.beforemark([pos]);for(term=_i=pos,_ref1=pos+size;pos<=_ref1?_i<=_ref1:_i>=_ref1;term=pos<=_ref1?++_i:--_i){o.aftermark(term)}o["do"]("collapseNegSum","firstcollapsesum",{aim:[pos]});return o["do"]("absorbSumTerms","thenflattensum",{selection:[[pos]]})}};mergeNegNumTerms={info:{name:"mergeNegNumTerms",effect:"simplifying",example:{str:"-1+x-4+2",selection:[[0,2]]},uses:["splitTermsToSum","biSumToProd","addition","negToNegOneFacProd","extractFacsFromTerms","mergePosNumTerms","negOneFacBiProdToNeg"],tags:["sum","negativenumberterm","merge","numericterm"]},prints:{errors:["mustbenegnum"],steps:["groupnegterms","expandneg","extractnegone","mergenegvals","negatingresult"]},target:"sum",selection:{min:2,filter:function(_arg){var item;item=_arg.item;if(item.type==="negation"&&item.objs[0].type==="number"){return OK}else{return Err("mustbenegnum")}}},perform:function(o){var addr,i,n,s,sel,_i,_ref1;sel=o.selection[0].sort();if(o.target.objs.length>sel.length){o["do"]("splitTermsToSum","groupnegterms");addr=[sel[0]]}else{addr=[]}for(n=_i=0,_ref1=sel.length;0<=_ref1?_i<_ref1:_i>_ref1;n=0<=_ref1?++_i:--_i){o["do"]("negToNegOneFacProd","expandneg",{direction:"left",aim:addr.concat([n])})}if(sel.length===2){o["do"]("biSumToProd","extractnegone",{aim:addr,selection:[[0],[0]],direction:"left"});o["do"]("addition","mergenegvals",{aim:addr.concat([1])})}else{o["do"]("extractFacsFromTerms","extractnegone",{direction:"left",aim:addr,selection:function(){var _j,_len,_results;_results=[];for(_j=0,_len=sel.length;_j<_len;_j++){s=sel[_j];_results.push([0])}return _results}(),choices:function(){var _j,_len,_results;_results=[];for(_j=0,_len=sel.length;_j<_len;_j++){s=sel[_j];_results.push("facs")}return _results}()});o["do"]("mergePosNumTerms","mergenegvals",{aim:addr.concat([1]),selection:[function(){var _j,_len,_results;_results=[];for(n=_j=0,_len=sel.length;_j<_len;n=++_j){i=sel[n];_results.push(n)}return _results}()]})}o["do"]("negOneFacBiProdToNeg","negatingresult",{aim:addr});if(o.target.type==="sum"){o.aftermark([[sel[0]]])}return o.beforemark(function(){var _j,_len,_results;_results=[];for(_j=0,_len=sel.length;_j<_len;_j++){s=sel[_j];_results.push([s])}return _results}())}};mergeAllNumTerms={info:{name:"mergeAllNumTerms",effect:"simplifying",example:{str:"1-y-2-3+x+8",selection:[[0,2,3,5]]},uses:["splitTermsToSum","mergePosNumTerms","mergeNegNumTerms","subtractInSum","addNumericDenomFracs","addNumericFracToNumber","zeroFacExprToZero"],tags:["sum","numericterm","negativenumberterm","merge"]},prints:{errors:["lessthantwonumterms"],steps:["gathernumerictermstomerge","mergeallposterms","mergeallnegterms","mergeposnegterms","mergeallnumfracs","mergenumandfrac"]},target:"sum",selection:{min:2,filter:"numericinclfrac"},auto:function(o){var okterms,_i,_ref1,_results;okterms=function(){_results=[];for(var _i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(n){return o.deps.isOK(o.deps.performCheck({check:"numericinclfrac",item:o.target.objs[n],deps:o.deps}))});if(okterms.length<2){return Err("lessthantwonumterms")}else{return{selection:[okterms]}}},perform:function(o){var path,s,sel,_i,_len;sel=o.selection[0];if(sel.length<o.target.objs.length){o["do"]("splitTermsToSum","gathernumerictermstomerge");path=[sel[0]]}else{path=[]}for(_i=0,_len=sel.length;_i<_len;_i++){s=sel[_i];o.beforemark([s])}o["try"]("mergePosNumTerms","mergeallposterms",{aim:path});o["try"]("mergeNegNumTerms","mergeallnegterms",{aim:path});o["try"]("subtractInSum","mergeposnegterms",{aim:path});o["try"]("addNumericDenomFracs","mergeallnumfracs",{aim:path});o["try"]("addNumericFracToNumber","mergenumandfrac",{aim:path});o["try"]("zeroFacExprToZero","zeronumerfractozero",{aim:path});if(o.target.type==="sum"){o.aftermark([sel[0]])}return o}};addMirroredNumber={info:{name:"addMirroredNumber",effect:"complicating",example:{str:"x",argument:three},uses:["addZero","numToSum","absorbSumTerms"],tags:["sum","introduce"]},prints:{steps:["addzerototransform","expandzero","absorbresultingsum"],instructions:["choosesideforterm"]},target:"math",direction:"choosesideforterm",argument:{type:"numeric"},perform:function(o){o["do"]("addZero","addzerototransform");o["do"]("numToSum","expandzero",{aim:[o.dirnum()],argument:Sum(o.argument,o.argument.type==="negation"?o.argument.objs[0]:Neg(o.argument))});o["do"]("absorbSumTerms","absorbresultingsum",{selection:[[o.dirnum()]]});return o.aftermark([[o.dirnum()],[o.dirnum()+1]])}};zeroToMirroredExpression={info:{name:"zeroToMirroredExpression",effect:"complicating",example:{str:"0",argument:x},uses:["zeroToZeroFacProd","numToSum","distribute","purgeOneFacs","negOneFacBiProdToNeg","collapseTwoNegFacs"],tags:["number0","split"]},prints:{steps:["turnzerotoprodwithexpr","splitzero","multinexpr","collapseonefac","collapsenegonefac"]},target:"zero",argument:{},perform:function(o){var arg;arg=o.argument;o["do"]("zeroToZeroFacProd","turnzerotoprodwithexpr",{argument:Product(zero,arg)});o["do"]("numToSum","splitzero",{aim:[0],argument:Sum(one,Neg(one))});o["do"]("distribute","multinexpr",{selection:[[0]],direction:"right"});o["do"]("purgeOneFacs","collapseonefac",{aim:[0],selection:[[0]]});if(arg.type!=="negation"){o["do"]("negOneFacBiProdToNeg","collapsenegonefac",{aim:[1],selection:[[0]]})}else{o["do"]("collapseTwoNegFacs","collapsenegonefac",{aim:[1],selection:[[0,1]]})}return o.aftermark([[0],[1]])}};addMirroredExpression={info:{name:"addMirroredExpression",effect:"complicating",example:{str:"2",argument:x},uses:["addZero","zeroToMirroredExpression","absorbSumTerms"],tags:["introduce"]},prints:{steps:["addzerototransform","expandzerotoexpr","absorbresultingsum"],instructions:["choosesideforexpression"]},target:"math",argument:{},direction:"choosesideforexpression",perform:function(o){var dirnum;dirnum=o.dirnum();o["do"]("addZero","addzerototransform");o["do"]("zeroToMirroredExpression","expandzerotoexpr",{aim:[dirnum]});o["do"]("absorbSumTerms","absorbresultingsum",{selection:[[dirnum]]});return o.aftermark([[dirnum],[dirnum+1]])}};addExpressions={info:{name:"addExpressions",effect:"simplifying",example:{str:"2x+y-x",selection:[[1],[],[0]],choices:["facs","none","negchild"]},uses:["extractFacsFromTerms","mergeAllNumTerms","purgeOneFacs","negOneFacBiProdToNeg","absorbProductFacs","zeroFacProdToZero","multFacsIntoFrac","collapseNegNumerFacNegFrac","collapseNegDenomFacNegFrac","collapseDoubleNeg"],tags:["sum","merge"]},prints:{errors:["mustselectkindredfacs","noaddablefacsinterms"],steps:["weextractexpressionstoadd","thendotheadding","cleanupremainingone","cleanupremainingnegone","flattenresultingprod","zeroleftmeanszeroresult","mergeexpressionintonumfac","mergenumfacintofracexpression"]},target:"sum",selection:{totalmin:2,or0:true,questions:function(_arg){var choices,deps,n,target,term,_i,_len,_ref1,_results;target=_arg.target,deps=_arg.deps,choices=_arg.choices;_ref1=target.objs;_results=[];for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){term=_ref1[n];_results.push({options:deps.getFacs(target.objs[n],choices!=null?choices[n]:void 0)})}return _results}},choices:{questions:function(o){var n,ret,_i,_ref1;ret=[];for(n=_i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;n=0<=_ref1?++_i:--_i){ret.push({options:["none"].concat(o.deps.getFacOptions(o.target.objs[n]))})}return ret}},validate:function(o){var chosen,facpos,prod,sel,termfacs,termnum,_i,_j,_len,_len1,_ref1,_ref2;chosen=[];_ref1=o.selection;for(termnum=_i=0,_len=_ref1.length;_i<_len;termnum=++_i){sel=_ref1[termnum];if(!sel.length){continue}termfacs=o.deps.getFacs(o.target.objs[termnum],o.choices[termnum]);chosen.push(o.deps.collapseStubList(Prod(function(){var _j,_len1,_results;_results=[];for(_j=0,_len1=sel.length;_j<_len1;_j++){facpos=sel[_j];_results.push(termfacs[facpos])}return _results}())))}_ref2=chosen.slice(1);for(_j=0,_len1=_ref2.length;_j<_len1;_j++){prod=_ref2[_j];if(o.deps.isKindredSpirits(mixin({obj1:prod,obj2:chosen[0]},o)).result===false){return Err("mustselectkindredfacs")}}return OK},auto:function(o){var analysis,foundanything,foundhere,i,n,nosimpl,ret,simpl,sourcechoice,sourcedenom,sourcefac,sourceposs,sourcepossid,sourceresidue,sourcesels,sourceterm,sum,targetchoice,targetdenom,targetfac,targetposs,targetpossid,targetremains,targetsels,targetterm,termnums,_i,_j,_k,_l,_len,_len1,_ref1,_ref2,_ref3,_ref4;sum=o.target;termnums=sum.objs.length;analysis=function(){var _i,_results;_results=[];for(n=_i=0;0<=termnums?_i<termnums:_i>termnums;n=0<=termnums?++_i:--_i){_results.push(o.deps.getFacPossibilities(mixin({obj:o.target.objs[n]},o)))}return _results}();nosimpl=[];simpl=[];for(sourceterm=_i=0,_ref1=termnums-1;0<=_ref1?_i<_ref1:_i>_ref1;sourceterm=0<=_ref1?++_i:--_i){_ref2=analysis[sourceterm];for(sourcepossid=_j=0,_len=_ref2.length;_j<_len;sourcepossid=++_j){sourceposs=_ref2[sourcepossid];sourcechoice=sourceposs[0],sourcesels=sourceposs[1],sourcefac=sourceposs[2],sourceresidue=sourceposs[3],sourcedenom=sourceposs[4];if(!(o.deps.equal(sourcefac,one)||sourceresidue.length>1||sourceresidue.length&&!o.deps.isNumeric(sourceresidue[0])||sourcedenom&&!o.deps.isNumeric(sourcedenom))){foundanything=false;ret={selection:function(){var _k,_results;_results=[];for(i=_k=0;0<=sourceterm?_k<sourceterm:_k>sourceterm;i=0<=sourceterm?++_k:--_k){_results.push([])}return _results}().concat([sourcesels]),choices:function(){var _k,_results;_results=[];for(i=_k=0;0<=sourceterm?_k<sourceterm:_k>sourceterm;i=0<=sourceterm?++_k:--_k){_results.push("none")}return _results}().concat([sourcechoice]),toadd:sourcefac};for(targetterm=_k=_ref3=sourceterm+1;_ref3<=termnums?_k<termnums:_k>termnums;targetterm=_ref3<=termnums?++_k:--_k){foundhere=0;_ref4=analysis[targetterm];for(targetpossid=_l=0,_len1=_ref4.length;_l<_len1;targetpossid=++_l){targetposs=_ref4[targetpossid];if(!!foundhere){continue}targetchoice=targetposs[0],targetsels=targetposs[1],targetfac=targetposs[2],targetremains=targetposs[3],targetdenom=targetposs[4];if(o.deps.isKindredSpirits(mixin({obj1:sourcefac,obj2:targetfac},o)).result){if(!(targetremains.length>1||targetremains.length&&!o.deps.isNumeric(targetremains[0])||targetdenom&&!o.deps.isNumeric(targetdenom))){console.log("FOUND",targetremains.length);printObj(targetfac);printObj(targetremains[0]);foundhere=1;foundanything=true;ret.selection.push(targetsels);ret.choices.push(targetchoice)}}}if(!foundhere){ret.selection.push([]);ret.choices.push("none")}}if(foundanything){if(ret.nosimpl){nosimpl.push(ret)}else{simpl.push(ret)}}}}}if(simpl.length===0){return Err("NOSIMPL")}else{simpl.sort(function(a,b){if(a.toadd.type==="product"&&a.toadd.objs.filter(function(fac){return fac.type==="number"}).length){return 1}else{return-1}});return simpl[0]}},perform:function(o){var chose,n,path,remains,sels,sum,_i,_j,_k,_len,_ref1,_ref2,_ref3,_results;sels=o.selection;_ref2=arrsplit(function(){_results=[];for(var _i=0,_ref1=sels.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this),function(n){return sels[n].length}),chose=_ref2[0],remains=_ref2[1];for(_j=0,_len=chose.length;_j<_len;_j++){n=chose[_j];o.beforemark([n])}if(remains.length){o.aftermark(chose[0])}path=remains.length?[chose[0]]:[];o.doIf("extractFacsFromTerms","weextractexpressionstoadd",{direction:"right"});sum=o.deps.lookUp(o.target,path.concat(0));if(sum&&sum.type==="sum"){for(n=_k=0,_ref3=sum.objs.length;0<=_ref3?_k<_ref3:_k>_ref3;n=0<=_ref3?++_k:--_k){o["try"]("collapseNegNumerFacNegFrac","fixpart",{aim:path.concat([0,n])});o["try"]("collapseNegDenomFacNegFrac","fixpart",{aim:path.concat([0,n])});o["try"]("collapseDoubleNeg","fixpart",{aim:path.concat([0,n])})}}o["try"]("mergeAllNumTerms","thendotheadding",{aim:path.concat(0)});o["try"]("purgeOneFacs","cleanupremainingone",{aim:path});o["try"]("negOneFacBiProdToNeg","cleanupremainingnegone",{aim:path});o["try"]("zeroFacProdToZero","zeroleftmeanszeroresult",{aim:path});o["try"]("absorbProductFacs","flattenresultingprod",{aim:path});o.doIf("multFacsIntoFrac","mergeexpressionintonumfac",{aim:path,selection:[[0],[1]]});return o.doIf("multFacsIntoFrac","mergenumfacintofracexpression",{aim:path,selection:[[1],[0]]})}};addEqualDenomFracs={info:{name:"addEqualDenomFracs",effect:"simplifying",example:{str:"(1/x)+z+(4/x)",selection:[[0,2]]},uses:["multiplyByOne","moveNegFromFracToFloorFac","moveNegBetweenFloorsInFrac","extractFacsFromFrac","oneDenomFracToNumer","addExpressions","multFacsIntoFrac"],tags:["sum","merge","denominator","fractionterm","fraction"]},prints:{errors:["mustbefracornegfrac","mustselectsamedenomfracs","nosamedenomfracsinsum"],steps:["multbyonetokeep","extractdenominator","movenegtonumer","removeonedenom","addnakedenomstogether","putnumerback","denegfrac"]},target:"sum",selection:{min:2,filter:function(o){if(o.item.type!=="fraction"&&!(o.item.type==="negation"&&o.item.objs[0].type==="fraction")){return Err("mustbefracornegfrac")}else{return OK}},validate:function(o){var denoms,n,_i,_ref1;denoms=function(){var _i,_len,_ref1,_results;_ref1=o.selection[0];_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){n=_ref1[_i];_results.push(o.deps.digIfNeg(o.deps.digIfNeg(o.target.objs[n]).objs[1]))}return _results}();for(n=_i=0,_ref1=denoms.length-1;0<=_ref1?_i<_ref1:_i>_ref1;n=0<=_ref1?++_i:--_i){if(!o.deps.isKindredSpirits(mixin({obj1:denoms[n],obj2:denoms[n+1]},o)).result){return Err("mustselectsamedenomfracs")}}return OK}},auto:function(o){var hisdenom,m,matches,mydenom,n,obj,terms,_i,_j,_ref1,_ref2,_ref3;terms=function(){var _i,_len,_ref1,_results;_ref1=o.target.objs;_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){obj=_ref1[_i];_results.push(o.deps.digIfNeg(obj))}return _results}();for(m=_i=0,_ref1=terms.length-1;0<=_ref1?_i<_ref1:_i>_ref1;m=0<=_ref1?++_i:--_i){if(terms[m].type==="fraction"){matches=[m];mydenom=o.deps.digIfNeg(terms[m].objs[1]);for(n=_j=_ref2=m+1,_ref3=terms.length;_ref2<=_ref3?_j<_ref3:_j>_ref3;n=_ref2<=_ref3?++_j:--_j){if(terms[n].type==="fraction"){hisdenom=o.deps.digIfNeg(terms[n].objs[1]);if(o.deps.isKindredSpirits(mixin({obj1:mydenom,obj2:hisdenom},o)).result){matches.push(n)}}}if(matches.length>1){return{selection:[matches]}}}}return Err("nosamedenomfracsinsum")},perform:function(o){var choices,chose,fracpos,n,numterms,remains,sels,someneg,somepos,_i,_j,_k,_l,_len,_len1,_len2,_ref1,_results;numterms=o.target.objs.length;sels=o.selection[0];choices=o.choices;_ref1=arrsplit(function(){_results=[];for(var _i=0;0<=numterms?_i<numterms:_i>numterms;0<=numterms?_i++:_i--){_results.push(_i)}return _results}.apply(this),function(n){return __indexOf.call(sels,n)>=0}),chose=_ref1[0],remains=_ref1[1];for(_j=0,_len=chose.length;_j<_len;_j++){n=chose[_j];o.beforemark([n])}if(remains.length){o.aftermark(chose[0])}somepos=someneg=false;for(_k=0,_len1=chose.length;_k<_len1;_k++){fracpos=chose[_k];if(o.target.objs[fracpos].type==="negation"){o["do"]("moveNegFromFracToFloorFac","denegfrac",{aim:[fracpos],choices:["numer","self"],selection:[[0]]})}if(o.target.objs[fracpos].objs[1].type==="negation"){someneg=true}else{somepos=true}}for(_l=0,_len2=chose.length;_l<_len2;_l++){fracpos=chose[_l];if(somepos&&someneg&&o.target.objs[fracpos].objs[1].type==="negation"){o["do"]("moveNegBetweenFloorsInFrac","movenegtonumer",{aim:[fracpos],choices:["denom","self","self"],selection:[[0],[0]]})}if(o.deps.equal(o.target.objs[fracpos].objs[0],one)){o["do"]("multiplyByOne","multbyonetokeep",{aim:[fracpos],direction:"left"})}else{o["do"]("extractFacsFromFrac","extractdenominator",{aim:[fracpos],selection:[[],[0]],choices:["self","self"],direction:"right"});o["try"]("oneDenomFracToNumer","removeonedenom",{aim:[fracpos,0]})}}o["do"]("addExpressions","addnakedenomstogether",{selection:function(){var _m,_results1;_results1=[];for(n=_m=0;0<=numterms?_m<numterms:_m>numterms;n=0<=numterms?++_m:--_m){_results1.push(__indexOf.call(sels,n)>=0?[1]:[])}return _results1}(),choices:function(){var _m,_results1;_results1=[];for(n=_m=0;0<=numterms?_m<numterms:_m>numterms;n=0<=numterms?++_m:--_m){_results1.push(__indexOf.call(sels,n)>=0?"facs":"none")}return _results1}()});return o["try"]("multFacsIntoFrac","putdnumerback",{aim:o.target.type==="sum"?[sels[0]]:[]})}};addNumericDenomFracs={info:{name:"addNumericDenomFracs",effect:"simplifying",example:{str:"(1/4)+(2/3)",selection:[[0,1]],argument:Num(12)},uses:["prolongNumericFraction","addEqualDenomFracs"],tags:["fraction","sum","fractionterm","merge","fraction"]},prints:{errors:["mustbeposnegfrac","mustbenumericdenom","mustbeposnumoverone","notallfracdenomsdivideargument","sumdoesnthavetwonumericdenomfracs"],steps:["weturntocorrectdenominator","finallyaddfracstogether"],instructions:["entercommondenominator"]},target:"sum",selection:{min:2,filter:function(_arg){var deps,frac,item;deps=_arg.deps,item=_arg.item;frac=deps.digIfNeg(item);if(frac.type!=="fraction"){return Err("mustbeposnegfrac")}else if(deps.isNumeric(frac.objs[1])){return OK}else{return Err("mustbenumericdenom")}}},argument:{instruction:"entercommondenominator",type:"number",validate:function(o){if(o.deps.numberValue(o.argument)>1){return OK}else{return Err("mustbeposnumoverone")}}},validate:function(o){var denom,denoms,dividecheck,term,_i,_len;denoms=function(){var _i,_len,_ref1,_results;_ref1=o.selection[0];_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){term=_ref1[_i];_results.push(o.deps.digIfNeg(o.target.objs[term]).objs[1])}return _results}();for(_i=0,_len=denoms.length;_i<_len;_i++){denom=denoms[_i];if(denom.type==="negation"){denom=denom.objs[0]}dividecheck=o.deps.divideCheck(mixin({obj1:o.argument,obj2:denom},o));if(!dividecheck.found){return Err("notallfracdenomsdivideargument")}}return OK},auto:function(o){var denom,n,numfracdenoms,numfracpositions,smallestdiv,_i,_j,_len,_ref1,_ref2,_results;numfracpositions=function(){_results=[];for(var _i=0,_ref1=o.target.objs.length;0<=_ref1?_i<_ref1:_i>_ref1;0<=_ref1?_i++:_i--){_results.push(_i)}return _results}.apply(this).filter(function(n){var obj;obj=o.deps.digIfNeg(o.target.objs[n]);return obj.type==="fraction"&&o.deps.isNumeric(obj.objs[1])});if(numfracpositions.length<2){return Err("sumdoesnthavetwonumericdenomfracs")}else{numfracdenoms=function(){var _j,_len,_results1;_results1=[];for(_j=0,_len=numfracpositions.length;_j<_len;_j++){n=numfracpositions[_j];_results1.push(o.deps.digIfNeg(o.deps.digIfNeg(o.target.objs[n]).objs[1]))}return _results1}();smallestdiv=numfracdenoms[0];_ref2=numfracdenoms.slice(1);for(_j=0,_len=_ref2.length;_j<_len;_j++){denom=_ref2[_j];smallestdiv=o.deps.findSmallestCommonDivisor(smallestdiv,denom)}return{selection:[numfracpositions],argument:smallestdiv}}},perform:function(o){var arg,denom,fracpositions,missing,path,pos,sel,_i,_j,_len,_len1;fracpositions=o.selection[0];for(_i=0,_len=fracpositions.length;_i<_len;_i++){sel=fracpositions[_i];o.beforemark([sel])}if(fracpositions.length<o.target.objs.length){o.aftermark([fracpositions[0]])}arg=o.argument;for(_j=0,_len1=fracpositions.length;_j<_len1;_j++){pos=fracpositions[_j];path=o.target.objs[pos].type==="negation"?[pos,0]:[pos];denom=o.deps.digIfNeg(o.target.objs[pos]).objs[1];missing=o.deps.divideCheck(mixin({obj1:arg,obj2:denom.type==="negation"?denom.objs[0]:denom},o)).minrest;if(!o.deps.equal(missing,one)){o["do"]("prolongNumericFraction","weturntocorrectdenominator",{aim:path,direction:"right",argument:denom.type!=="negation"?missing:Neg(missing)})}}return o["do"]("addEqualDenomFracs","finallyaddfracstogether")
}};addNumericFracToNumber={info:{name:"addNumericFracToNumber",effect:"simplifying",example:{str:"4+3/5",selection:[[1],[0]]},uses:["divideByOne","addNumericDenomFracs"],tags:["sum","merge","fractionterm","fraction"]},prints:{instructions:["selectnumfrac","selectposnegnum"],errors:["mustbeposnegfrac","numermustbenumeric","denommustbenumeric"],steps:["turnnumbertofraction","addfractionstogether"]},target:"sum",selection:{max:1,questions:[{instruction:"selectnumfrac",filter:function(o){var item,path;if(o.item.type==="negation"){item=o.item.objs[0];path=[0]}else{item=o.item;path=[]}if(item.type!=="fraction"){return Err("mustbeposnegfrac")}else if(!o.deps.isNumeric(item.objs[0])){return Err("numermustbenumeric",path.concat([0]))}else if(!o.deps.isNumeric(item.objs[1])){return Err("denommustbenumeric",path.concat([1]))}else{return OK}}},{instruction:"selectposnegnum",filter:"numeric"}]},perform:function(o){var denom,fracpos,numpos,_ref1,_ref2,_ref3;_ref1=o.selection,_ref2=_ref1[0],fracpos=_ref2[0],_ref3=_ref1[1],numpos=_ref3[0];denom=o.deps.digIfNeg(o.deps.digIfNeg(o.target.objs[fracpos]).objs[1]);o.beforemark(o.selection);if(o.target.objs.length>2){o.aftermark([fracpos])}o["do"]("divideByOne","turnnumbertofraction",{aim:[numpos]});return o["do"]("addNumericDenomFracs","addfractionstogether",{selection:[[numpos,fracpos].sort()],argument:denom})}};addTermWithNumerTerm={info:{name:"addTermWithNumerTerm",effect:"simplifying",example:{str:"(x+1)/2+x",selection:[[0],[0],[1]]},uses:["moveNegFromFracToFloorFac","sumNumerFracToSum","splitTermsToSum","addExpressions","absorbSumTerms","addEqualDenomFracs"],tags:["addition"]},prints:{errors:["SELmustbesumnumerfrac","AUTOnoaddables","SELcantaddfractoitself","SELnotnumeric"],instructions:["SELfracwithterms","SELwhichnumterm","SELtermtoaddwith"],steps:["moveneg","splitnumersumfrac","collectaddables","andfinallyadd","absorbres","andfinallyfinallybacktogether"]},target:"sum",selection:{max:1,questions:[{filter:function(o){if(o.item.type==="fraction"&&o.item.objs[0].type==="sum"||o.item.type==="negation"&&o.item.objs[0].type==="fraction"&&o.item.objs[0].objs[0].type==="sum"){return OK}else{return Err("SELmustbesumnumerfrac")}},instruction:"SELfracwithterms"},{instruction:"SELwhichnumterm",from:function(o){var frac;frac=o.target.objs[o.selection[0][0]];if(frac.type==="negation"){frac=frac.objs[0]}return frac.objs[0].objs}},{instruction:"SELtermtoaddwith",filter:function(o,pos){if(pos===o.selection[0][0]){return Err("SELcantaddfractoitself")}else if(o.item.type==="number"||o.item.type==="negation"&&o.item.type==="number"){return Err("SELnotnumeric")}else{return OK}}}]},auto:function(o){var frac,fracpos,numer,numerterm,numertermpos,result,term,termpos,testsum,_i,_j,_k,_len,_len1,_len2,_ref1,_ref2,_ref3;_ref1=o.target.objs;for(fracpos=_i=0,_len=_ref1.length;_i<_len;fracpos=++_i){frac=_ref1[fracpos];if(!(frac.type==="fraction"&&frac.objs[0].type==="sum"||frac.type==="negation"&&frac.objs[0].type==="fraction"&&frac.objs[0].objs[0].type==="sum")){continue}if(frac.type==="negation"){frac=frac.objs[0]}numer=frac.objs[0];_ref2=numer.objs;for(numertermpos=_j=0,_len1=_ref2.length;_j<_len1;numertermpos=++_j){numerterm=_ref2[numertermpos];if(numerterm.type!=="number"&&!(numerterm.type==="negation"&&numerterm.objs[0].type==="number")){_ref3=o.target.objs;for(termpos=_k=0,_len2=_ref3.length;_k<_len2;termpos=++_k){term=_ref3[termpos];if(!(termpos!==fracpos)){continue}testsum=Sum(numerterm,term);result=o.deps.generateOpInputForTarget({deps:o.deps,tool:o.deps.addExpressions,target:testsum});if(result.choices){return{selection:[[fracpos],[numertermpos],[termpos]]}}}}}}return Err("AUTOnoaddables")},perform:function(o){var fracpos,newnumertermpos,numertermpos,numerterms,path,termpos,_ref1,_ref2,_ref3,_ref4;_ref1=o.selection,_ref2=_ref1[0],fracpos=_ref2[0],_ref3=_ref1[1],numertermpos=_ref3[0],_ref4=_ref1[2],termpos=_ref4[0];if(o.target.objs[fracpos].type==="negation"){o["do"]("moveNegFromFracToFloorFac","moveneg",{aim:[fracpos],choices:["denom","self"],selection:[[0]]});o.beforemark([[fracpos,0,0,numertermpos],[termpos]])}else{o.beforemark([[fracpos,0,numertermpos],[termpos]])}numerterms=o.target.objs[fracpos].objs[0].objs.length;o["do"]("sumNumerFracToSum","splitnumersumfrac",{aim:[fracpos]});o["do"]("absorbSumTerms","absorbres",{selection:[[fracpos]]});if(termpos>fracpos){termpos+=numerterms-1}newnumertermpos=numertermpos+fracpos;o.report("OK frac",fracpos,"newnumertermpos",newnumertermpos,"term",termpos,"length",numerterms);if(o.target.objs.length>2){o["do"]("splitTermsToSum","collectaddables",{selection:[[termpos,newnumertermpos].sort()]});path=[termpos,newnumertermpos].sort().slice(0,1)}else{path=[]}o["try"]("addExpressions","andfinallyadd",{aim:path});o["try"]("addEqualDenomFracs","andfinallyfinallybacktogether");return o.aftermark(o.target.type==="sum"?[fracpos,0,numertermpos]:[0,numertermpos])}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}funcs={addTermWithNumerTerm:addTermWithNumerTerm,absorbNegSum:absorbNegSum,isNumericInclFrac:isNumericInclFrac,getOppositeNumeric:getOppositeNumeric,isMirrorSums:isMirrorSums,getTerms:getTerms,addNumericFracToNumber:addNumericFracToNumber,addNumericDenomFracs:addNumericDenomFracs,addEqualDenomFracs:addEqualDenomFracs,addExpressions:addExpressions,mergeAllNumTerms:mergeAllNumTerms,subtractInSum:subtractInSum,getMergeNumericInstructions:getMergeNumericInstructions,numberValue:numberValue,addMirroredExpression:addMirroredExpression,zeroToMirroredExpression:zeroToMirroredExpression,addMirroredNumber:addMirroredNumber,mergeNegNumTerms:mergeNegNumTerms,mergePosNumTerms:mergePosNumTerms,isNumeric:isNumeric,subtraction:subtraction,addition:addition,additionValueAndUnit:additionValueAndUnit,findAddableObjects:findAddableObjects,addZero:addZero,purgeZeroTerms:purgeZeroTerms,absorbSumTerms:absorbSumTerms,splitTermsToSum:splitTermsToSum,numToSum:numToSum};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);