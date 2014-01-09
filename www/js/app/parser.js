(function(){var calc,check,containsVoid,ensureSource,exportTo,funs,k,makePostUnary,matcher,mixin,parseBinaryOperation,parseBlob,parseBoolean,parseConstant,parseExpression,parseFunction,parseInput,parseVariable,parseloc,print,readBinaryOperation,readBoolean,readConcept,readImplicitOperation,readNumber,readPostUnaryOperation,readPreUnaryOperation,v,__slice=[].slice;parseloc=typeof require==="undefined"?this.CATS.texts.parser:require("./texts_parser").parser;matcher=function(str,category,lang,logging){var arr,found,loc,match,matched,res,test,_i,_len;if(lang==null){lang="en"}loc=parseloc[category];if(logging){console.log("TRYING",str,category,lang)}for(found in loc){arr=[].concat(loc[found].all||[]).concat(loc[found][lang]||[]);if(logging){console.log("....looking for",found,"match")}for(_i=0,_len=arr.length;_i<_len;_i++){test=arr[_i];matched=false;if(typeof test==="string"){if(str.toLowerCase().slice(0,test.length)===test){match=test}}else{res=str.toLowerCase().match(test);if(res&&str.toLowerCase().slice(0,res[0].length)===res[0].toLowerCase()){match=res[0]}}if(logging){console.log(".... .... tested against",test,"result",res)}if(match){return{found:found,category:category,str:str,lang:lang,rest:str.slice(match.length),used:match,type:category}}}}return{}};mixin=function(){var k,o,objs,source,v,_i,_len,_ref;objs=1<=arguments.length?__slice.call(arguments,0):[];o={};_ref=objs.reverse();for(_i=0,_len=_ref.length;_i<_len;_i++){source=_ref[_i];for(k in source){v=source[k];o[k]=v}}return o};containsVoid=function(o){var child,_i,_len,_ref;if(o.type==="void"){return true}if(o.objs&&o.objs.length){_ref=o.objs;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(containsVoid(child)){return true}}}return false};check=function(o){if(o.rest&&o.rest.length&&o.rest.match(/^\s*\S/g)){return["noparse",o.rest]}else if(containsVoid(o)){return["hasvoid"]}else{return null}};print=function(o,depth){if(depth==null){depth=1}if(o.objs){return o.objs.forEach(function(c){return print(c,depth+1)})}};parseInput=function(str,opts){var o;if(str==null){str=""}if(opts==null){opts={lang:"en"}}o=parseExpression(str,opts);return print(o)};makePostUnary=function(blob,opts){var post;post=matcher(blob.rest,"postunary",opts!=null?opts.lang:void 0);if(post.found){post.type=post.found;post.objs=[blob];post.used=blob.used+post.used;return makePostUnary(post,opts)}return blob};ensureSource=function(o){var child,firstchild,lastchild,_i,_len,_ref;if(o.objs){_ref=o.objs;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];ensureSource(child)}}if(o.used===void 0){firstchild=o.objs[0];lastchild=o.objs[o.objs.length-1];o.used=firstchild.used+firstchild.rest.substr(0,firstchild.rest.length-lastchild.rest.length);o.rest=lastchild.rest}return o};parseFunction=function(str,opts){var arg,args,lookforfun,val,_ref;lookforfun=matcher(str,"function",opts!=null?opts.lang:void 0);val=lookforfun!=null?lookforfun.found:void 0;if(val){args=[];arg={rest:";"+str.substr(val.length+1)};while(arg.rest[0]===";"){arg=parseExpression(arg.rest.substr(1),opts);args.push(arg)}return{val:val,type:"function",objs:args,used:str.substr(0,str.length-arg.rest.length+(arg.rest[0]===")"?1:0)),rest:arg.rest.substr((_ref=arg.rest[0])===";"||_ref===")"?1:0)}}return void 0};parseVariable=function(str,opts){var val;if(str==null){str=""}if(opts==null){opts={}}val=str[0];return{type:"variable",val:val,used:val,rest:str.substr(val.length)}};parseBoolean=function(str,opts){var read;read=matcher(str.toLowerCase(),"boolean",opts.lang);if(read.found){return{type:read.found,rest:read.rest,used:read.used}}return void 0};parseBinaryOperation=function(prechar,str,opts){var op,startwhitespace;if(str==null){str=""}if(opts==null){opts={}}startwhitespace=(str.match(/^\s{1,}/g)||[""])[0];str=str.slice(startwhitespace.length);op=matcher(str,"binaryops",opts.lang);if(op.type==="binaryops"){op.type=op.found}else{op=matcher(str,"relation",opts.lang);if(op.type==="relation"){op.val=op.found}}if(!op.type){return{type:readImplicitOperation(prechar,str),rest:str,used:startwhitespace+"",implicit:true}}op.used=startwhitespace+op.used;return op};parseConstant=function(str,opts){var res;res=matcher(str,"const",(opts!=null?opts.lang:void 0)||"en");if(res.found){return{type:"const",val:res.found,rest:res.rest,used:res.used}}else{return void 0}};readConcept=function(str,opts){var match;match=(str.match(/"[^\"]*["]?/)||[""])[0];if(match){return{val:match.replace(/"/g,""),used:match,rest:str.substr(match.length)}}return{val:"",used:"",rest:str}};readImplicitOperation=function(c1,c2full,opts){var c2;if(c1==null){c1=""}if(c2full==null){c2full=""}c2=c2full[0]||"";if(c2==="-"||c2full.slice(0,5)==="minus"){return"sum"}if(c1.match(/[%0-9a-zA-ZÅÄÖåäö)|!"]/)&&c2.match(/[%a-zA-ZÅÄÖåäö(|"]/)){return"product"}if(c1.match(/[a-zA-ZÅÄÖåäö)|!"]/)&&c2.match(/[0-9]/)){return"power"}};readNumber=function(str,opts){var dec,decmax,ret,split,used,v,whole;if((opts!=null?opts.lang:void 0)==="sv"){str=str.replace(/\,/g,".")}ret=str.match(/^[0-9]*\.?[0-9]*/||[""])[0];used=ret;if(!!ret.match(/[\.]/)){ret=ret.replace(/0*$/g,"")}ret=ret.replace(/^0*/g,"");ret=ret.replace(/^\./,"0.");ret=ret.replace(/\.$/,"");ret=ret.replace(/^\.$/,"0");if(used.match(/^0{1,}$/)){ret="0"}v=""+(ret||"");if(v[0]==="."){v="0"+v}split=v.split(".");if(split.length===2){decmax=8;whole=split[0],dec=split[1];if(dec.length>decmax){dec=dec.substr(0,decmax-1)+(parseInt(dec[decmax]||"0")<5?dec[decmax-1]:1+parseInt(dec[decmax-1]))}v=whole+"."+dec}ret=v;return{used:used,val:ret||"",rest:str.substr(used.length)}};readBinaryOperation=function(str,opts){var c,match,r,regex,type,unary,v,_ref,_ref1;c=str[0];unary={"*":"product","/":"fraction","+":"sum","^":"power"};_ref={AND:/^(och|and)/i,OR:/^(eller|or)/i,XOR:/^(xor|xeller)/i,demo:/demo/i};for(type in _ref){regex=_ref[type];match=(str.match(regex)||[""])[0];if(match){return{type:type,used:match,rest:str.slice(match.length)}}}if(unary[c]){return{type:unary[c],used:c,rest:str.substr(1)}}_ref1={"<=":"leq",">=":"geq","=<":"leq","=>":"geq","<":"lt",">":"gt","=":"eq","!=":"neq","<>":"neq"};for(r in _ref1){v=_ref1[r];if(str.substr(0,r.length)===r){return{type:"relation",val:v,used:r,rest:str.substr(r.length)}}}return{type:"",used:"",rest:str}};readPostUnaryOperation=function(str,opts){var res,s,_ref;_ref={"!":"factorial"};for(s in _ref){res=_ref[s];if(str.substr(0,s.length)===s){return{type:res,used:s,rest:str.substr(s.length)}}}return{type:"",used:"",rest:str}};readPreUnaryOperation=function(str,opts){var match;match=matcher(str,"preunary",opts!=null?opts.lang:void 0);if(match&&match.type){match.type=match.found;return match}else{return{type:"",used:"",rest:str}}};readBoolean=function(str){var match;match=(str.match(/^(sant|falskt|true|false)/i)||[""])[0];if(match){return{val:match.match(/sant|true/i)?"true":"false",used:match,rest:str.substr(match.length)}}return{val:"",used:"",rest:str}};parseExpression=function(str,opts){var blob,expression,nextblob,op;if(str==null){str=""}if(opts==null){opts={}}if(opts.insideabs&&str[0]==="|"){return{type:"void",used:"",rest:str}}blob=parseBlob(str,opts);if(blob.rest){if(opts.insideabs&&blob.rest[0]==="|"){return blob}op=parseBinaryOperation(blob.used[blob.used.length-1],blob.rest,opts);if(op.type){nextblob=parseExpression(op.rest,opts);expression=calc(op.type,blob,nextblob,op.val);expression.rest=nextblob.rest;expression.used=blob.used+op.used+nextblob.used;return expression}}return blob};parseBlob=function(str,opts){var absolute,base,c,child,exp,expr,num,pow,pre,prev,read,ret,startwhitespace,_ref;if(str==null){str=""}if(opts==null){opts={}}ret="";if(str===""){return{type:"void",rest:"",used:""}}startwhitespace=(str.match(/^\s{1,}/g)||[""])[0];str=str.slice(startwhitespace.length);c=str[0]||"";if(c==="("){prev=opts.insideabs;opts.insideabs=false;expr=parseExpression(str.substr(1),opts);expr.isblock=true;if(expr.rest[0]===")"){expr.rest=expr.rest.substr(1);expr.used+=")"}expr.used=startwhitespace+"("+expr.used;opts.insideabs=prev;return makePostUnary(expr,opts)}if(c==="|"){expr=parseExpression(str.substr(1),mixin({insideabs:true},opts));absolute={type:"absolute",objs:[expr],rest:expr.rest,used:startwhitespace+"|"+expr.used};if(absolute.rest[0]==="|"){absolute.rest=absolute.rest.substr(1);absolute.used+="|"}return makePostUnary(absolute,opts)}pre=readPreUnaryOperation(str,opts);if(pre.type&&pre.type!=="IFELSEif"){child=parseBlob(pre.rest,opts);if(pre.type==="neutral"){child.used=pre.used+child.used;return child}pre.objs=[child];if(pre.type==="sqrt"){pre.type="root";pre.objs.push({type:"number",val:"2"})}else if(pre.type==="cbrt"){pre.type="root";pre.objs.push({type:"number",val:"3"})}else if(pre.type==="log"){pre.objs.push({type:"number",val:"10"})}else if(pre.type==="ln"){pre.type="log";pre.objs.push({type:"const",val:"e"})}pre.rest=child.rest;pre.used=startwhitespace+pre.used+child.used;return pre}else if(pre.type==="IFELSEif"){pre.type="ifelse";expr=parseExpression(pre.rest,opts);if(expr.type==="ifelse"){pre=expr;if(pre.objs[0].type==="void"){pre.objs=[pre.objs[1],pre.objs[0],pre.objs[2]]}}else{pre.objs=[expr,{type:"void"},{type:"void"}]}pre.rest=expr.rest;pre.used=startwhitespace+pre.used+expr.used;return pre}if(c.match(/[0-9\.]/)){read=readNumber(str,opts);num={type:"number",val:read.val,rest:read.rest,used:startwhitespace+read.used};if(false&&((_ref=read.rest[0])==="e"||_ref==="E")){exp=parseBlob(read.rest.slice(1),opts);base={type:"number",val:"10",used:read.rest[0],rest:read.rest.slice(1)};pow={type:"power",used:read.rest[0]+exp.used,rest:exp.rest,objs:[base,exp]};ret={type:"product",used:read.used+pow.used,rest:pow.rest,objs:[num,pow]}}else{ret=num}}else if(c==='"'){read=readConcept(str);ret={type:"variable",val:read.val,rest:read.rest,used:startwhitespace+read.used}}if(!ret){ret=parseConstant(str,opts)}if(!ret&&c.match(/[A-Za-zÅÄÖåäö]/)){ret=parseBoolean(str,opts)||parseFunction(str,opts)||parseVariable(str,opts)}if(ret){return makePostUnary(ret,opts)}return{type:"void",rest:str,used:startwhitespace+""}};calc=function(tool,a1,a2,toolarg){var _ref,_ref1,_ref2,_ref3,_ref4,_ref5,_ref6,_ref7,_ref8;if(tool.slice(0,3)==="REV"){tool=tool.slice(3);_ref=[a2,a1],a1=_ref[0],a2=_ref[1]}if(tool==="IFELSEelse"){console.log("IFELSEelse",a1,a2);return{type:"ifelse",objs:[{type:"void"},a1,a2]}}else if(tool==="IFELSEthen"){if(a2.type==="ifelse"){console.log("IFELSEthen with a2 ifelse",a1,a2);return{type:"ifelse",objs:[a1,a2.objs[1],a2.objs[2]]}}else{console.log("IFELSEthen with a2 not ifelse",a1,a2);return{type:"ifelse",objs:[a1,a2,{type:"void"}]}}}else if(!a2.isblock&&!(tool==="IFELSEelse"||tool==="IFELSEthen"||tool==="ifelse")&&a2.type==="ifelse"){if(a2.objs[0].type==="void"){console.log("a2 ifelse only last with other tool");return{type:"ifelse",objs:[{type:"void"},calc(tool,a1,a2.objs[1],toolarg),a2.objs[2]]}}else{console.log("a2 ifelse with other tool",tool,a1,a2);return{type:"ifelse",objs:[calc(tool,a1,a2.objs[0],toolarg)].concat(a2.objs.slice(1))}}}else if(!a2.isblock&&(tool==="sum"||tool==="product"||tool==="AND"||tool==="OR")&&tool===a2.type){return{type:tool,objs:[a1].concat(a2.objs)}}else if(tool==="AND"||tool==="OR"){return{type:tool,objs:[a1,a2]}}else if(!a2.isblock&&((_ref1=a2.type)==="AND"||_ref1==="OR")){return{type:a2.type,objs:[calc(tool,a1,a2.objs[0],toolarg)].concat(a2.objs.slice(1))}}else if(a2.type==="relation"&&!(a2.isblock||(_ref2=a1.type)==="AND"||_ref2==="OR")){return{type:"relation",val:a2.val,objs:[calc(tool,a1,a2.objs[0],toolarg),a2.objs[1]]}}else if(tool==="relation"&&!(a2.isblock||(_ref3=a2.type)==="AND"||_ref3==="OR")){return{type:"relation",objs:[a1,a2],val:toolarg}}else if(a2.type==="isinteger"&&!a2.isblock&&(tool==="fraction"||tool==="power")){return{type:a2.type,objs:[calc(tool,a1,a2.objs[0],toolarg)]}}else if(!a2.isblock&&!(tool==="sum"||tool==="product")&&((_ref4=a2.type)==="sum"||_ref4==="product")){return{type:a2.type,objs:[calc(tool,a1,a2.objs[0],toolarg)].concat(a2.objs.slice(1))}}else if(!a1.isblock&&a1.type==="log"&&(tool==="power"||tool==="fraction")){return{type:a1.type,objs:[{type:tool,objs:[a1.objs[0],a2]},a1.objs[1]]}}else if(tool==="log"&&!a1.isblock&&((_ref5=a1.type)==="sum"||_ref5==="product"||_ref5==="relation")){return{type:a1.type,val:toolarg,objs:[calc(tool,a1.objs[0],a2,toolarg)].concat(a1.objs.slice(1))}}else if(tool==="power"&&!a1.isblock&&a1.type==="negation"){return{type:a1.type,objs:[{type:tool,objs:[a1.objs[0],a2]}]}}else if(tool==="log"&&!a2.isblock&&a2.type==="negation"){return{type:a2.type,objs:[{type:tool,objs:[a1,a2.objs[0]]}]}}else if(tool==="root"&&!a1.isblock&&a1.type==="log"){return{type:a1.type,objs:[{type:tool,objs:[a2,a1.objs[0]]},a1.objs[1]]}}else if(tool==="root"){return{type:tool,objs:[a2,a1]}}else if(tool==="fraction"&&a2.type==="product"){return{type:"fraction",objs:[a1,a2]}}else if(tool==="fraction"&&!a1.isblock&&((_ref6=a1.type)==="negation"||_ref6==="plusminus")&&!(!a2.isblock&&((_ref7=a2.type)==="product"||_ref7==="sum"))){return{type:a1.type,objs:[{type:tool,objs:[a1.objs[0],a2]}]}}else if(a2.isblock){if(toolarg){return{type:tool,objs:[a1,a2],val:toolarg}}else{return{type:tool,objs:[a1,a2]}}}else if(!(tool==="sum"&&a2.type==="product")&&((_ref8=a2.type)==="sum"||_ref8==="product"||(tool==="power"||tool==="product")&&a2.type==="fraction"||tool==="fraction"&&a2.type==="product")){return{type:a2.type,objs:[calc(tool,a1,a2.objs[0],toolarg)].concat(a2.objs.slice(1))}}else{if(toolarg){return{type:tool,objs:[a1,a2],val:toolarg}}else{return{type:tool,objs:[a1,a2]}}}};if(typeof exports==="undefined"){exportTo=this.CATS.app}else{exportTo=exports}funs={parseConstant:parseConstant,matcher:matcher,readBoolean:readBoolean,check:check,containsVoid:containsVoid,ensureSource:ensureSource,parseFunction:parseFunction,makePostUnary:makePostUnary,parseExpression:parseExpression,parseBlob:parseBlob,readConcept:readConcept,readPostUnaryOperation:readPostUnaryOperation,readPreUnaryOperation:readPreUnaryOperation,parseBinaryOperation:parseBinaryOperation,readImplicitOperation:readImplicitOperation,readBinaryOperation:readBinaryOperation,calc:calc,readNumber:readNumber};for(k in funs){v=funs[k];exportTo[k]=v}}).call(this);