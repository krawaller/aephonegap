(function(){var Abs,And,Cbrt,Cube,DivTest,E,Eq,Err,FALSE,Frac,Fraction,Geq,Gt,I,IfElse,IntTest,Leq,ListConstr,Log,Lt,Neg,Neq,Not,Num,OK,Or,PERCENT,PI,PlusMinus,Pow,Power,Prod,Product,Root,Sqrt,Square,Sum,TRUE,UNDEFINED,arrsplit,deepcopy,exportTo,five,fixAssumptionPath,flipRel,flipper,four,funcs,intersection,isErr,isOK,k,makeCheck,mixin,one,opRel,ops,printObj,three,two,v,x,y,z,zero,__slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};ListConstr=function(type){return function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];if(Array.isArray(kids[0])){kids=kids[0]}return{type:type,objs:kids}}};And=ListConstr("AND");Or=ListConstr("OR");Product=ListConstr("product");Sum=ListConstr("sum");Not=function(child){return{type:"NOT",objs:[child]}};Abs=function(child){return{type:"absolute",objs:[child]}};TRUE={type:"true"};FALSE={type:"false"};UNDEFINED={type:"const",val:"undefined"};PERCENT={type:"const",val:"percent"};I={type:"const",val:"i"};PI={type:"const",val:"pi"};E={type:"const",val:"e"};Eq=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"eq",objs:kids}};Lt=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"lt",objs:kids}};Leq=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"leq",objs:kids}};Gt=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"gt",objs:kids}};Geq=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"geq",objs:kids}};Neq=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"relation",val:"neq",objs:kids}};flipper={eq:"eq",neq:"neq",lt:"gt",gt:"lt",leq:"geq",geq:"leq"};ops={eq:"neq",neq:"eq",lt:"geq",gt:"leq",leq:"gt",geq:"lt"};flipRel=function(rel){rel=deepcopy(rel);rel.val=flipper[rel.val||"eq"];return rel};opRel=function(rel){rel=deepcopy(rel);rel.val=ops[rel.val||"eq"];return rel};fixAssumptionPath=function(obj,aim,assuming,report,assumingpre,deps){var res;if(aim==null){aim=[]}if(assumingpre==null){assumingpre=[]}if(assumingpre.length){obj=deps.lookUp(obj,assumingpre)}res=function(){var _ref;if(!assuming||assuming===obj.type){return{aim:aim}}else if(obj.type==="OR"&&assuming!=="OR"){switch(obj.objs[0].type){case"AND":switch(assuming){case"AND":return{aim:[0].concat(aim)};case"relation":return{aim:[0,0].concat(aim)};default:throw"NOPE! :("}break;case"ifelse":switch(assuming){case"ifelse":return{aim:[0].concat(aim)};case"AND":if(!aim.length){throw"assumed and, was ifelse, but no aim depth to fix! "+(report||"")}return{aim:[0,1].concat(aim.slice(1)),alsopath:[0,2].concat(aim)};case"relation":return{aim:[0,1].concat(aim),alsopath:[0,2,0].concat(aim)};default:throw"NAAH! :("}break;default:console.log("ASSUMING "+assuming+" AIM "+aim.join("-")+" PRE "+assumingpre.join("-"));printObj(obj);throw"SORRY :("}}else if(obj.type==="ifelse"&&assuming==="relation"){return{aim:[1].concat(aim),alsopath:[2,0].concat(aim)}}else if(obj.type==="ifelse"&&assuming==="AND"){if(!aim.length){throw"assumed and, was ifelse, but no aim depth to fix! "+(report||"")}return{aim:[1].concat(aim.slice(1)),alsopath:[2].concat(aim)}}else if(obj.type!=="AND"&&assuming==="AND"){if(!aim.length){throw"assumed and, wasnt and, but no aim depth to fix! "+(report||"")}return{aim:aim.slice(1)}}else if(((_ref=obj.type)==="AND"||_ref==="OR")&&assuming==="relation"){return{aim:[0].concat(aim)}}else if(obj.type==="AND"&&assuming==="ifelse"&&aim[0]===2){return{aim:aim.slice(1)}}else{throw"couldn't fix assumption! assumption="+assuming+", objtype="+obj.type+", aim="+aim.join(",")}}();if(assumingpre.length){res.aim=assumingpre.concat(res.aim);if(res.alsopath){res.alsopath=assumingpre.concat(res.alsopath)}}return res};IfElse=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"ifelse",objs:kids}};DivTest=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"DIVTEST",objs:kids}};IntTest=function(child){return{type:"isinteger",objs:[child]}};Neg=function(child){return{type:"negation",objs:[child]}};PlusMinus=function(child){return{type:"plusminus",objs:[child]}};Power=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"power",objs:kids}};Fraction=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"fraction",objs:kids}};Sqrt=function(kid){return{type:"root",objs:[kid,two]}};Square=function(kid){return{type:"power",objs:[kid,two]}};Cube=function(kid){return{type:"power",objs:[kid,tree]}};Cbrt=function(kid){return{type:"root",objs:[kid,three]}};Root=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"root",objs:kids}};Log=function(){var kids;kids=1<=arguments.length?__slice.call(arguments,0):[];return{type:"log",objs:kids.length===1?kids.concat(Num(10)):kids}};Num=function(v){var dec,decmax,split,whole;if(typeof parseFloat(v)!=="number"){throw"Not number: "+v}v=""+v;if(v[0]==="."){v="0"+v}split=v.split(".");if(split.length===2){decmax=8;whole=split[0],dec=split[1];if(dec.length>decmax){dec=dec.substr(0,decmax-1)+(parseInt(dec[decmax]||"0")<5?dec[decmax-1]:1+parseInt(dec[decmax-1]))}v=whole+"."+dec}if(v>=0){return{type:"number",val:""+v}}else{return Neg(Num(-1*v))}};Prod=Product;Frac=Fraction;Pow=Power;zero=Num(0);one=Num(1);two=Num(2);three=Num(3);four=Num(4);five=Num(5);x={type:"variable",val:"x"};y={type:"variable",val:"y"};z={type:"variable",val:"z"};Err=function(){var addr,code,extra;code=arguments[0],addr=arguments[1],extra=3<=arguments.length?__slice.call(arguments,2):[];return[code,addr].concat(extra)};OK="ALLOK";isOK=function(obj){return obj===OK};isErr=function(obj){return Array.isArray(obj)&&obj.length>=1&&typeof obj[0]==="string"};printObj=function(o,depth){var c,_i,_len,_ref,_results;if(depth==null){depth=1}if(depth===1){console.log("\n")}if(!o){return console.log(Array(depth).join("--"),"DEATH!!")}else{console.log(Array(depth).join("--"),o.type,o.val?o.val:"");if(o.objs){_ref=o.objs;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(printObj(c,depth+1))}return _results}}};makeCheck=function(){var arg,args,path,pos,type,validate,_i,_len;args=1<=arguments.length?__slice.call(arguments,0):[];type=validate=path=void 0;for(pos=_i=0,_len=args.length;_i<_len;pos=++_i){arg=args[pos];switch(typeof arg){case"string":type=arg;break;case"function":validate=arg;break;default:path=arg}}return{type:type,validate:validate,path:path}};mixin=function(){var k,o,objs,source,v,_i,_len,_ref;objs=1<=arguments.length?__slice.call(arguments,0):[];o={};_ref=objs.reverse();for(_i=0,_len=_ref.length;_i<_len;_i++){source=_ref[_i];for(k in source){v=source[k];o[k]=v}}return o};arrsplit=function(arr,fn){var fail,item,pass,pos,_i,_len;pass=[];fail=[];for(pos=_i=0,_len=arr.length;_i<_len;pos=++_i){item=arr[pos];(fn(item,pos)?pass:fail).push(item)}return[pass,fail]};deepcopy=function(o){var key,res,val;if(typeof o==="string"){return o+""}if(typeof o==="number"){return o}res=Array.isArray(o)?[]:{};for(key in o){val=o[key];res[key]=typeof val==="object"?deepcopy(val):val}return res};intersection=function(a,b){var value,_i,_len,_ref,_results;if(a.length>b.length){_ref=[b,a],a=_ref[0],b=_ref[1]}_results=[];for(_i=0,_len=a.length;_i<_len;_i++){value=a[_i];if(__indexOf.call(b,value)>=0){_results.push(value)}}return _results};if(typeof exports==="undefined"){exportTo=this.CATS.math.toolhelpers}else{exportTo=exports}funcs={fixAssumptionPath:fixAssumptionPath,opRel:opRel,flipRel:flipRel,IfElse:IfElse,DivTest:DivTest,IntTest:IntTest,Square:Square,Cube:Cube,PlusMinus:PlusMinus,Log:Log,Abs:Abs,PI:PI,Root:Root,Sqrt:Sqrt,Cbrt:Cbrt,arrsplit:arrsplit,E:E,I:I,PERCENT:PERCENT,intersection:intersection,UNDEFINED:UNDEFINED,deepcopy:deepcopy,isErr:isErr,isOK:isOK,mixin:mixin,Prod:Prod,Frac:Frac,Pow:Pow,Eq:Eq,Leq:Leq,Gt:Gt,Geq:Geq,Lt:Lt,Neq:Neq,four:four,five:five,And:And,Or:Or,Not:Not,TRUE:TRUE,FALSE:FALSE,makeCheck:makeCheck,x:x,y:y,z:z,Neg:Neg,Product:Product,Sum:Sum,Power:Power,Fraction:Fraction,Num:Num,zero:zero,one:one,two:two,three:three,Err:Err,OK:OK,printObj:printObj};for(k in funcs){v=funcs[k];exportTo[k]=v}}).call(this);