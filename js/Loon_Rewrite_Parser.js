/****************************
支持将Surge重写解析至Loon Stash
说明
原脚本作者@小白脸 脚本修改@chengkongyiban
感谢@xream 提供的echo-response.js
插件图标用的 @Keikinn 的 StickerOnScreen项目，感谢
***************************/
const isStashiOS = 'undefined' !== typeof $environment && $environment['stash-version'];
const isLooniOS = 'undefined' != typeof $loon;
var jsctype
if (isStashiOS){
    jsctype = "stash";
}else if (isLooniOS){
    jsctype = "loon";
}else{jsctype = "";};
var name = "";
var desc = "";
var author = "";
var homepage = "";
var req
var urlArg
if (isLooniOS){
    req = $request.url.replace(/ln$|ln\?.*/,'');
    if ($request.url.indexOf("ln?") != -1){
        urlArg = "?" + $request.url.split("ln?")[1];
    }else{urlArg = ""};
    
}else if (isStashiOS){
    req = $request.url.replace(/sg\.stoverride$|sg\.stoverride\?.*/,'');
    if ($request.url.indexOf("sg.stoverride?") != -1){
        urlArg = "?" + $request.url.split("sg.stoverride?")[1];
    }else{urlArg = ""};
};
var rewriteName = req.substring(req.lastIndexOf('/') + 1).split('.')[0];
var original = [];//用于获取原文行号
//获取参数
var nName = urlArg.search(/\?n=|&n=/) != -1 ? (urlArg.split(/\?n=|&n=/)[1].split("&")[0].split("+")) : null;
var Pin0 = urlArg.search(/\?y=|&y=/) != -1 ? (urlArg.split(/\?y=|&y=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var Pout0 = urlArg.search(/\?x=|&x=/) != -1 ? (urlArg.split(/\?x=|&x=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var hnAdd = urlArg.search(/\?hnadd=|&hnadd=/) != -1 ? (urlArg.split(/\?hnadd=|&hnadd=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var hnDel = urlArg.search(/\?hndel=|&hndel=/) != -1 ? (urlArg.split(/\?hndel=|&hndel=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var jsConverter = urlArg.search(/\?jsc=|&jsc=/) != -1 ? (urlArg.split(/\?jsc=|&jsc=/)[1].split("&")[0].split("+")) : null;
var iconStatus = urlArg.indexOf("i=") != -1 ? false : true;
var icon = "";
var delNoteSc = urlArg.indexOf("del=") != -1 ? true : false;
//修改名字和简介
if (nName === null){
	name = rewriteName;
    desc = name;
}else{
	name = nName[0] != "" ? nName[0] : rewriteName;
	desc = nName[1] != undefined ? nName[1] : name;
};
if (rewriteName == "tieba"){
	name = "百度贴吧";
	desc = "过滤百度贴吧广告";
	author = "app2smile";
	homepage = "https://github.com/app2smile/rules";
};
name = name + "去广告";
if (isLooniOS){
	name = "#!name=" + decodeURIComponent(name);
	desc = "#!desc=" + decodeURIComponent(desc);
	author = "#!author=" + decodeURIComponent(author);
	homepage = "#!homepage=" + decodeURIComponent(homepage);
}else if (isStashiOS){
	name = "name: " + decodeURIComponent(name);
	desc = "desc: " + decodeURIComponent(desc);
};

//随机图标开关，不传入参数默认为开
if (iconStatus === false){
	icon = "#!icon=";
}else{
	const stickerStartNum = 1000;
const stickerSum = 335;
let randomStickerNum = parseInt(stickerStartNum + Math.random() * stickerSum).toString();
   icon = "#!icon=" + "https://github.com/KeiKinn/StickerOnScreen/raw/main/Stickers/Sticker_" + randomStickerNum +".png";
};
let randomStickerNum = rewriteName;
   icon = "#!icon=" + "https://raw.githubusercontent.com/love796-QAQ/Private-Loon-Library/main/icon/" + randomStickerNum +".png";

if (isLooniOS){
    General = (General[0] || '') && `[General]\n\n${General.join("\n\n")}`;
    
    script = (script[0] || '') && `[Script]\n\n${script.join("\n\n")}`;

URLRewrite = (URLRewrite[0] || '') && `[Rewrite]\n\n${URLRewrite.join("\n")}`;

URLRewrite = URLRewrite.replace(/"/gi,'')

rules = (rules[0] || '') && `[Rule]\n\n${rules.join("\n")}`;

others = (others[0] || '') && `${others.join("\n")}`;

body = `${name}
${desc}
${author}
${homepage}
${icon}


${General}


${rules}


${URLRewrite}


${script}


${MITM}`
		.replace(/t&zd;/g,',')
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}else if (isStashiOS){
    
    General = (General[0] || '') && `${General.join("\n")}`;
    
    rules = (rules[0] || '') && `rules:\n${rules.join("\n")}`;

script = (script[0] || '') && `  script:\n${script.join("\n\n")}`;

providers = (providers[0] || '') && `script-providers:\n${providers.join("\n")}`;

cron = (cron[0] || '') && `cron:\n  script:\n${cron.join("\n")}`;

URLRewrite = (URLRewrite[0] || '') && `  rewrite:\n${URLRewrite.join("\n")}`;

URLRewrite = URLRewrite.replace(/"/gi,'')

HeaderRewrite = (HeaderRewrite[0] || '') && `  header-rewrite:\n${HeaderRewrite.join("\n")}`;

HeaderRewrite = HeaderRewrite.replace(/"/gi,'')

others = (others[0] || '') && `${others.join("\n")}`;

General = General.replace(/t&2;/g,'  ')
           .replace(/t&hn;/g,'    - ')
           .replace(/\,/g,'"\n    - "')

MITM = MITM.replace(/t&2;/g,'  ')
           .replace(/t&hn;/g,'    - ')
           .replace(/\,/g,'"\n    - "')

    if (URLRewrite != "" || script != "" || HeaderRewrite != "" || MITM != "" || General != ""){
httpFrame = `http:
${General}

${HeaderRewrite}

${URLRewrite}

${script}

${MITM}`
};



body = `${name}
${desc}

${rules}

${httpFrame}

${cron}

${providers}`
		.replace(/t&zd;/g,',')
		.replace(/script-providers:\n+$/g,'')
		.replace(/#      \n/gi,'\n')
		.replace(/      \n/g,"")
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}


if (isStashiOS) {
           others !="" && $notification.post("不支持的类型已跳过","第" + others,"点击查看原文，长按可展开查看跳过行",{url:req});
        } else {if (isLooniOS) {
       others !="" && $notification.post("不支持的类型已跳过","第" + others,"点击查看原文，长按可展开查看跳过行",req);}};

 $done({ response: { status: 200 ,body:body ,headers: {'Content-Type': 'text/plain; charset=utf-8'} } });
}//判断是否断网的反括号


})()
.catch((e) => {
		$notification.post(`${e}`,'','');
		$done()
	})


function http(req) {
  return new Promise((resolve, reject) =>
    $httpClient.get(req, (err, resp,data) => {
  resolve(data)
  })
)
}
