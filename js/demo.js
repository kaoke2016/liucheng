function start(txt){
var aaa=txt
  var rule=`
  {
    var kk=0
    var left1=500
    var top1=100
    var arr=[]
    function test(o) {
      alert(1111)
    }
  }
  Start
  = godraw
  godraw 
    = get+

  get
  =huo:huo{ 
    return huo; }
  /ifelse /iff /for

  iff "if内容"
  =_ "if("_ kuo:huo _"){"_ kuo2:get+ _ "}" { 
    var kuo3=kuo+"end"
    return {kuo,kuo2,kuo3}; 
  }
  ifelse "ifelse内容"
  =_ "if("_ kuo4:huo _"){"_ kuo5:get+ _ "}else(" _ kuo6:huo _ "){"_ kuo7:get+ _ "}" { 
  var kuo8=kuo4+"end"
  return {kuo4,kuo5,kuo6,kuo7,kuo8}; }
  for "for内容"
  =_ "for("_ kuo9:huo _"){"_ kuo10:get+ _ "}" { 
    var kuo11=kuo9+"end"
    return {kuo9,kuo10,kuo11}; 
  }

  huo "获取"
    =LB* _ "[" kuo:kuo"]" LB* { return kuo }
  kuo "括号内容"
  =[\\u4e00-\\u9fa5_\\-a-zA-Z0-9]+ { return text(); }
  _ "空白符"
    = [ \\t\\n\\r]*
  LB "换行符"
  = [ \\r\\n]
  `
  var parser=peg.generate(rule);
  var result=parser.parse(aaa)
  var jsson={ "class": "go.GraphLinksModel",
    "modelData": {"position":"-5 -5"},
    "nodeDataArray": [],
    "linkDataArray": []
  }

  var left1=500
  var top1=100
  var kk=0
  var forflag=true
  var endarr={ifend:[],elseend:[]}

function godraw(res){
  for (var i = 0; i < res.length; i++) {
    if(typeof res[i]==="object"){
    // 如果是if
      if(res[i].kuo){
        rgsi(res[i])
      }
    // 如果是if+else
      if(res[i].kuo4){
       
        rgsie(res[i])
      }
    // 如果是for
      if(res[i].kuo9){
       
        rgsf(res[i])
      }
    }

    // 如果是普通
    if(typeof res[i]==="string"){
      rgspt(res[i])
    }
  }
}
// 如果是if
function rgsi(res){
  if(res.kuo){
    top1=top1+100
    var loc1=left1+" "+top1
    jsson.nodeDataArray.push({"key":kk, "text":res.kuo, "remark":"", "loc":loc1,"figure":"Diamond"})
    jsson.linkDataArray.push({"from":(kk-1),"to":kk})
    kk=kk+1
  }
  if(res.kuo2){
    godraw(res.kuo2)
  }
  if(res.kuo3){
    top1=top1+100
    var loc1=left1+" "+top1
    var iff=endife(kk-1)
    
    jsson.linkDataArray.push({"from":(kk-1),"to":kk})
    jsson.nodeDataArray.push({"key":kk, "text":res.kuo3, "remark":"", "loc":loc1})
    kk=kk+1
  }
}
// 如果是if+else
function rgsie(res){
  
      if(res.kuo5){
        var top2=top1
        var left2=left1
        var kk2=kk
        var cc2=cc
        var ifr=ifcha(res.kuo5,res.kuo4,[top2,left2],kk2)
        top1=top2
        cc=cc2
        var elser=elsecha(res.kuo7,res.kuo6,[top2,left2],kk2)
        top1=ifr[0]>elser[0]?ifr[0]:elser[0]
        left1=left2
      }
      
      if(res.kuo8){
        top1=top1+100
        var loc1=left1+" "+top1
        jsson.nodeDataArray.push({"key":kk, "text":res.kuo8, "remark":"", "loc":loc1})
        var ifrend=endife(ifr[2])
        var elserend=endife(elser[2])
        jsson.linkDataArray.push({"from":ifrend,"to":kk})
        jsson.linkDataArray.push({"from":elserend,"to":kk})
        kk=kk+1
      }
}
// if分叉
function ifcha(arr,txt,loc,kk2){
  var ifw=txt
  left1=loc[1]-50*(cc+1)
  var top=loc[0]
  var iff=kk2-1
  for (var i = 0; i < arr.length; i++) {
    top1=top1+100

    if(typeof arr[i]==="string"){
      var loc1=left1+" "+top1
      if(ifw){
        jsson.linkDataArray.push({"from":iff,"to":kk,"text":ifw})
        ifw=null
      }else{
        iff=endife(iff)
        jsson.linkDataArray.push({"from":iff,"to":kk})
      }
      jsson.nodeDataArray.push({"key":kk, "text":arr[i],"remark":"", "loc":loc1})
      iff=kk
      kk=kk+1
    }else if(typeof arr[i]==="object"){
      cc=cc-1
      godraw([arr[i]])
    }
  }
  return [top1,kk,iff]
}
// else分叉
function elsecha(arr,txt,loc,kk2){
  var elsew=txt
  left1=loc[1]+50*(cc+1)
  var top=loc[0]
  var elsef=kk2-1
  for (var i = 0; i < arr.length; i++) {
    top1=top1+100
    if(typeof arr[i]==="string"){
      var loc1=left1+" "+top1
      if(elsew){
        jsson.linkDataArray.push({"from":elsef,"to":kk,"text":elsew})
        elsew=null
      }else{
        elsef=endife(elsef)
        jsson.linkDataArray.push({"from":elsef,"to":kk})
      }
      jsson.nodeDataArray.push({"key":kk, "text":arr[i],"remark":"", "loc":loc1})
      elsef=kk
      kk=kk+1
    }else if(typeof arr[i]==="object"){
      cc=cc-1
      godraw([arr[i]])
    }
  }
  return [top1,kk,elsef]
}
//判断ifelse结束点
function endife(data1){
  var arr=jsson.nodeDataArray.filter(item =>item.key==data1);
  var loc1=arr[0].loc.split(' ')
  for (var i = jsson.nodeDataArray.length-1; i >0 ; i--) {
    var tong=jsson.nodeDataArray[i].loc.split(' ')
    if(jsson.nodeDataArray[i].key!=data1 && jsson.nodeDataArray[i].key>data1){
      if(tong[0]==loc1[0] ){
        return jsson.nodeDataArray[i].key
      }
    }
  }
  return data1
}
// 层级
function ceng(arr){
  var level =0
  var queue = JSON.parse(JSON.stringify(arr))
  if(typeof queue==="object"){
    while (queue.length > 1) {
      var node = queue.pop()
      if(typeof node !=="object"){

      }else{
        // 判断是对象还是数组
        var pp=Array.isArray(node)
        if(pp){
          queue=node
          level =level+1
        }else{
          // level =level+1
          // 如果是对象就遍历
          for(let key in node){
            if(typeof node[key]==="object"){
              queue=node[key]
              level =level+1
               break;
            }
          }
        }
      }
    }
    return level
  }else{
    return level 
  }

}
// 如果是for
function rgsf(res){
  if(res.kuo9){
    var dd=kk
    top1=top1+100
    var loc1=left1+" "+top1
    jsson.nodeDataArray.push({"key":kk, "text":res.kuo9, "remark":"", "loc":loc1,"figure":"Diamond"})
    jsson.linkDataArray.push({"from":(kk-1),"to":kk})
    kk=kk+1
  }
  if(res.kuo10){
    godraw(res.kuo10)
  }
  if(res.kuo11){
    jsson.linkDataArray.push({"from":(kk-1),"to":dd,"fromSpot":"Bottom","toSpot":"Right"})
    jsson.linkDataArray.push({"from":dd,"to":kk,"fromSpot":"Left","toSpot":"Top"})
    forflag=false
    
  }
}
// 如果是普通
function rgspt(res,no){
  if(res=="开始"){
    var loc1=left1+" "+top1
    top1=top1+10
    jsson.nodeDataArray.push({"key":kk, "text":"开始", "figure":"Circle", "fill":"#4fba4f", "stepType":1, "loc":loc1})
    kk=kk+1
  }else if(res=="结束"){
    top1=top1+100
    var loc1=left1+" "+top1
    jsson.nodeDataArray.push({"key":kk, "text":"结束", "figure":"Circle", "fill":"#CE0620", "stepType":4, "loc":loc1})
    if(forflag){
      jsson.linkDataArray.push({"from":(kk-1),"to":kk})
    }else{
      forflag=true
    }
  }else{

    top1=top1+70
    var loc1=left1+" "+top1
    jsson.nodeDataArray.push({"key":kk, "text":res,"remark":"", "loc":loc1})
    if(forflag){
      jsson.linkDataArray.push({"from":(kk-1),"to":kk})
    }else{
      forflag=true
    }
    kk=kk+1
  }
}


var cc=ceng(result)
godraw(result)
return JSON.stringify(jsson)
}
// console.log(JSON.stringify(jsson))