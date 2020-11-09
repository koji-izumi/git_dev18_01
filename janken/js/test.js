jsを記述する際はここに記載していく
console.log("はじめてのジャバスクリプト");
console.log(23 + 5);
console.log(2000 - 1800);
console.log("18+5");

let name = "泉晃治";
console.log(name);
console.log("name");

var point = 90;

if (point >= 80) {
    console.log(name + 'さん、素晴らしい!おめでとう!');
} else {
    console.log(name + 'さん、もっと頑張りましょう!');
};


$(function () {
    // この中に書いていく
    var random = Math.floor(Math.random() * 5);

    if (random == 0) {
        console.log('大吉');
    } else if (random == 1) {
        console.log('中吉');
    } else if (random == 2) {
        console.log('小吉');
    } else if (random == 3) {
        console.log('吉');
    } else if (random == 4) {
        console.log('凶');
    }
    // 下は消さない
});

$(".button").on("click", function () {
    // $(".button").css("color", "red");
    // $(".kekka").html("押されましたよ");
    $(".kekka").css("fontSize", "");
    $(".kekka").css("color", "");
    $(".kekka").css("textAlign", "");
    var random = Math.floor(Math.random() * 5);

    if (random == 0) {
        $(".kekka").html("大吉");
        $(".kekka").css("fontSize", "64px");
        $(".kekka").css("color", "red");
        $(".kekka").css("textAlign", "center");
    } else if (random == 1) {
        $(".kekka").html("中吉");
    } else if (random == 2) {
        $(".kekka").html("小吉");
    } else if (random == 3) {
        $(".kekka").html("吉");
    } else if (random == 4) {
        $(".kekka").html("凶");
    }
    // この下は消さない
  });

