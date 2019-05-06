//初始化页面
console.log($(window).height(), $(window).width())
console.log($("main")[0].offsetWidth, $("main")[0].scrollHeight)
draw()


//初始化用户值
let login = prompt("请输入用户名")
// let login = "lerz"

if (window.localStorage.id == login) {
    console.log("有此用户")
    var id = localStorage.id,
        dataImg = JSON.parse(localStorage.dataImg),
        dataText = JSON.parse(localStorage.dataText)

    dataImg.forEach((a, i) => {
        console.log("背景图片功能已经载入")
        let img = new Image
        img.src = a
        $("#userbgbox .body")[0].appendChild(img)

    })

    $("main")[0].style.background = $("#userbgbox .body img")[0] ? `url(${$("#userbgbox .body img")[0].src}) no-repeat 0 0 ` : `background:url("test.jpg") no-repeat 0 0 ;`
    draw()
} else {
    console.log("无此用户")
    var {
        id,
        dataImg,
        dataText
    } = {
        id: login,
        dataImg: [],
        dataText: [],
    }
    savelocal(id, dataImg, dataText)
}
console.log(id)

//过程
//右下时间
let timeArea = $("#time div p")
setInterval(() => {
    timeArea.eq(1).html(`${time()[3]}/${time()[7]}/${time()[2]}`).end().eq(0).html(`${time()[4]}`)
}, 1000)


//公共方法
//背景渲染
function draw(){
    $("main").css({
        height: $(window).height() - 45 + "px",
        backgroundSize: $("main")[0].offsetWidth + "px " + $(window).height() + "px"
    })
}
//存到localstorage中
function savelocal(id, Img, Text) {
    window.localStorage.id = id
    window.localStorage.dataImg = JSON.stringify(Img)
    window.localStorage.dataText = JSON.stringify(Text)
}
//保存为本地文件
function savetolocation(inner, name) {
    let val = JSON.stringify(inner)
    var blob = new Blob([val], {
        type: "text/plain;charset=utf-80"
    })
    saveAs(blob, name)
    // savetolocation(obj,"用户文件.txt")
}
//时间
function time() {
    let now = new Date
    return [...String(now).split(" "), now.getMonth() + 1]
}


//读取文件 返回内容
// function readfile(a){
//     const file = new FileReader
//     var a 
//     file.onloadend = ()=>{
//         // console.log(file.result)
//         a = file.result
//         console.log(a)
//         return a 
//     }
//     file.readAsDataURL(a)
// 

// }





//事件区
//上传用户文件
Files.onchange = function () {
    let file = new FileReader
    file.onloadend = function (e) {
        console.log(JSON.parse(this.result))
        id = JSON.parse(this.result).id
        dataImg = JSON.parse(this.result).dataImg
        dataText = JSON.parse(this.result).dataText
    }
    file.readAsText(this.files[0])
}
$("#userfile .foot input").eq(0).click(function () {

    savelocal(id, dataImg, dataText)
    if(confirm("页面将会重载 请保导出当前状态")){
        location.reload()
    }
    // console.log(b)
})
//桌面按键
$("#bgChange").mouseup(
    function (e) {
        $("article").css("display", "block")
        $("#alert-title").html("更换壁纸")
        $("#userbgbox").css("display", "block")
        $("#userfile").css("display", "none")
    }
)
$("#loadUserFlie").mouseup(
    function (e) {
        $("article").css("display", "block")
        $("#alert-title").html("导入文件")
        $("#userbgbox").css("display", "none")
        $("#userfile").css("display", "block")
    }
)
// console.log($("#alertWindow header .tomin"))
//窗口按钮
$("#alertWindow header .close").mouseup(function () {
    // console.log(this)
    $("article").css("display", "none")
})
$("#alertWindow header .tomax").mouseup(function () {
    if ($("#alertWindow")[0].requestFullScreen) {
        $("#alertWindow")[0].requestFullScreen();
    } else if ($("#alertWindow")[0].webkitRequestFullScreen) {
        $("#alertWindow")[0].webkitRequestFullScreen();
    } else if ($("#alertWindow")[0].mozRequestFullScreen) {
        $("#alertWindow")[0].mozRequestFullScreen();
    }
})
$("#userbgbox .body")[0].ondragover = function (e) {
    e.preventDefault()
}
$("#userbgbox .body")[0].ondrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    // console.log(e.dataTransfer.files[0])
    // let imgsrc =  readfile(e.dataTransfer.files[0])
    const file = new FileReader

    file.onloadend = () => {
        // console.log(file.result)
        // file.result
        // console.log(a)
        // return a 
        // console.log(imgsrc)
        let img = new Image
        img.src = file.result
        this.appendChild(img)
        dataImg.unshift(file.result)
        savelocal(id, dataImg, dataText)
        // savetolocation({
        //     id,
        //     dataImg,
        //     dataText
        // },"用户文件lerz.txt")
    }
    file.readAsDataURL(e.dataTransfer.files[0])
}

$("#userbgbox .body img").click(function () {
    // $(this).attr("becheck",true).end()
    // console.log(this)
    $("#userbgbox .body img").each(function (a, b) {
        b.dataset["checked"] = false
    })
    this.dataset["checked"] = true
    $("#userbgbox .body img").css("box-shadow", "none")
    $(this).css("box-shadow", "0px 0px 15px black")
})
//确定键
$("#userbgbox .foot input").eq(0).click(function () {
    $("#userbgbox .body img").each((a, b) => {
        // console.log(b)
        if (b.dataset["checked"]) {
            console.log(b)
            // this.dataset["checked"] = true
            // $("#userbgbox .body img").css("box-shadow", "none")
            // $(this).css("box-shadow", "0px 0px 15px black")
            $("main")[0].style.background = `url(${b.src}) no-repeat 0 0 `
            console.log(b.src)
            let index = dataImg[a]
            dataImg.splice(a, 1)
            dataImg.unshift(index)
            savelocal(id, dataImg, dataText)
            $("article").css("display", "none")
            draw()
        }
    })
})

//取消按键
$("#userbgbox .foot input").eq(1).click(() => {
    $("article").css("display", "none")
})

//c存到本地
$("footer img").click(function () {
    savetolocation({
        id,
        dataImg,
        dataText
    }, "1新文件.txt")
})

$("footer input").keyup((e)=>{
    // console.log($("footer input"))
    switch(e.key){
        case "Enter" : ans($("footer input")[0].value)
        break
    }
    
})

function ans(str){
    let arr = [...str]
    // arr.forEach((a,b)=>{
    //     if()
    // })
    let text = []
    if(arr[arr.length-1]=="?"&&arr[arr.length-2]=="吗"){
        for(let i =0 ; i<arr.length-2 ;i++){
            text.push(arr[i])
        }
        text.push("!")
        console.log(text.join(""))
    }else{
        text.push("对不起我没看懂")
        console.log(text.join(""))
    }
}
// for(let a = 0 ; a<100;a++){
// }
// window.open("C:/Users/Administrator/Downloads/用户文件.txt")