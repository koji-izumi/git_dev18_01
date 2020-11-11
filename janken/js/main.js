// jsを記述する際はここに記載していく
var tiles = [];
var battleresult = 0;
var cpuvalue = 0;
var myvalue = 0;
var yourlocation = 0;
var cpulocation = 15;
var imgYou = document.createElement("img");
var imgCPU = document.createElement("img");
var jankenAudio = document.getElementById("janken-bgm");
var ponAudio = document.getElementById("pon-bgm");

// 初期化関数
function init() {
    // 2行15列のテーブルを用意
    var table = document.getElementById("table");

    for (var i = 0; i < 2; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 15; j++) {
            var td = document.createElement("td");
            var index = j;
            td.className = "tile";
            td.index = index;
            td.value = index;
            if (index == 14) {
                td.textContent = 'Goal';
            }
            tr.appendChild(td);
            tiles.push(td);
        }
        table.appendChild(tr);
    }
    // プレイヤーをインデックス0番目、CPUをインデックス15番目に配置
    putYOU(0);
    putCPU(15);
}

// プレイヤーの画像を用意して位置を取得
function putYOU(i) {
    imgYou.src = "img/icon-you.png";
    imgYou.className = "img imgyou";
    tiles[i].appendChild(imgYou);
    yourlocation = tiles[i].index;
    console.log(yourlocation);
}
// CPUの画像を用意して位置を取得
function putCPU(i) {
    imgCPU.src = "img/sazae.jpg";
    imgCPU.className = "img imgcpu";
    tiles[i].appendChild(imgCPU);
    cpulocation = tiles[i].index + 15;
    console.log(cpulocation);
}

// 「対戦を始める」ボタンをクリックしたときの動作
$(".start-btn").on("click", function battle() {
    $("#janken-bgm").get(0).play();
    $(".start-btn").css("display", "none");
    $(".start h2").html("声に合わせて<br>ボタンを選択");

    // 出し手をクリックしたときの動作
    $(".youhand").on("click", function click(event) {
        $("#janken-bgm").get(0).pause();
        jankenAudio.currentTime = 0;
        $("#pon-bgm").get(0).play();
        $(".start h2").css("display", "none");
        $(".janken").css("visibility", "hidden");
        $(".next-btn,.reload-btn").css("display", "block");

        // 選んだ出し手を数字に変換
        var youHand = event.target.id;
        if (youHand == "you-gu") {
            youHand = 0;
        } else if (youHand == "you-choki") {
            youHand = 1;
        } else if (youHand == "you-pa") {
            youHand = 2;
        }

        // CPUの出し手をランダム関数で取得
        var cpuHand = Math.floor(Math.random() * 3);

        // プレイヤーが選んだ出し手の画像を取得
        var youhandimg = document.createElement("img");
        if (youHand == 0) {
            youhandimg.src = "img/janken_gu.jpeg";
        } else if (youHand == 1) {
            youhandimg.src = "img/janken_choki.jpeg";
        } else if (youHand == 2) {
            youhandimg.src = "img/janken_pa.jpeg";
        }
        // CPUが選んだ出し手の画像を取得
        var cpuhandimg = document.createElement("img");
        if (cpuHand == 0) {
            cpuhandimg.src = "img/janken_gu.jpeg";
        } else if (cpuHand == 1) {
            cpuhandimg.src = "img/janken_choki.jpeg";
        } else if (cpuHand == 2) {
            cpuhandimg.src = "img/janken_pa.jpeg";
        }
        // お互いの出し手を中央に配置
        youhandimg.className = "handimg";
        cpuhandimg.className = "handimg";
        var battlehand = document.getElementById("battle-hand");
        battlehand.appendChild(youhandimg);
        battlehand.appendChild(cpuhandimg);


        // じゃんけんの勝負の結果を数字に変換して取得
        function result() {
                // battlleresult: 0:私の勝ち 1:あいこ 2:CPUの勝ち
                // myvalue,cpuvalueは進むマス目の数
            if ((youHand == 0 && cpuHand == 0) || (youHand == 1 && cpuHand == 1) || (youHand == 2 && cpuHand == 2)) {
                // あいこの処理
                battleresult = 1;
            } else if (youHand == 0 && cpuHand == 1 && cpulocation >= 17) {
                // グーでプレイヤーが勝ったときの処理
                battleresult = 0;
                cpuvalue = -2;
            } else if (youHand == 0 && cpuHand == 2&&cpulocation <=24 ) {
                // パーでCPUが勝ったときの処理（配列の処理を間違えたので値を一つずつ）
                battleresult = 2;
                cpuvalue = 5;
            } else if (youHand == 0 && cpuHand == 2&&cpulocation <=25 ) {
                battleresult = 2;
                cpuvalue = 4;
            } else if (youHand == 0 && cpuHand == 2&&cpulocation <=26 ) {
                battleresult = 2;
                cpuvalue = 3;
            } else if (youHand == 0 && cpuHand == 2&&cpulocation <=27 ) {
                battleresult = 2;
                cpuvalue = 2;
            } else if (youHand == 0 && cpuHand == 2&&cpulocation <=28 ) {
                battleresult = 2;
                cpuvalue = 1;
            } else if (youHand == 1 && cpuHand == 0 && yourlocation >= 2) {
                // グーでCPUが勝ったときの処理
                battleresult = 2;
                myvalue = -2;
            } else if (youHand == 1 && cpuHand == 2 && yourlocation <= 12) {
                // チョキでプレイヤーが勝ったときの処理
                battleresult = 0;
                myvalue = 2;
            } else if (youHand == 1 && cpuHand == 2 && yourlocation <= 13) {
                battleresult = 0;
                myvalue = 1;
            } else if (youHand == 2 && cpuHand == 0 && yourlocation <= 9) {
                // パーでプレイヤーが勝ったときの処理
                battleresult = 0;
                myvalue = 5;
            } else if (youHand == 2 && cpuHand == 0 && yourlocation <= 10) {
                battleresult = 0;
                myvalue = 4;
            } else if (youHand == 2 && cpuHand == 0 && yourlocation <= 11) {
                battleresult = 0;
                myvalue = 3;
            } else if (youHand == 2 && cpuHand == 0 && yourlocation <= 12) {
                battleresult = 0;
                myvalue = 2;
            } else if (youHand == 2 && cpuHand == 0 && yourlocation <= 13) {
                battleresult = 0;
                myvalue = 1;
            } else if (youHand == 2 && cpuHand == 1 && cpulocation <= 27) {
                // チョキでCPUが勝ったときの処理
                battleresult = 2;
                cpuvalue = 2;
            } else if (youHand == 2 && cpuHand == 1 && cpulocation <= 28) {
                battleresult = 2;
                cpuvalue = 1;
            }

            // じゃんけんの結果をメッセージで表示
            var resultmsg = document.createElement("p");
            resultmsg.className = "resultmsg";

            if (battleresult == 0) {
                resultmsg.textContent = "勝ち！";
            } else if (battleresult == 1) {
                resultmsg.textContent = "あいこ！";
            } else {
                resultmsg.textContent = "負け！"
            }

            var message = document.getElementById("start");
            message.prepend(resultmsg);


        }

        result();

        // じゃんけんの結果に応じてプレイヤーとCPUの位置を移動
        putYOU(yourlocation + myvalue);
        putCPU(cpulocation + cpuvalue);

        // どちらかがゴールしたときの処理
        function finish() {
            if(yourlocation==14){
                setTimeout(function(){
                    alert('あなたの勝ちです！');
                    $("#katsuo-bgm").get(0).play();
                },1000);
                $(".next-btn").css("display","none");
            }else if (cpulocation==29){
                setTimeout(function(){
                    alert('あなたの負けです!');
                },1000);
                $(".next-btn").css("display","none");
            }
        }
        finish();

        // じゃんけんの結果をリセット
        myvalue = 0;
        cpuvalue = 0;

    })

    // 「次の対戦へ」ボタンを押したときの動作
    $(".next-btn").on("click", function () {  
        $(".next-btn,.reload-btn,.resultmsg,.handimg").css("display","none");

        $("#janken-bgm").get(0).play();
        $("#pon-bgm").get(0).pause();
        ponAudio.currentTime =0;
        $(".start h2").css("display", "block");
        $(".janken").css("visibility", "visible");
    })
})