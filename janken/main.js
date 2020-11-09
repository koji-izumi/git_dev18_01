// jsを記述する際はここに記載していく


$(".start-btn").on("click", function(){
    $("#janken-bgm").get(0).play();
    $(".start-btn").css("display","none");
    $(".start h2").html("声に合わせて<br>ボタンを選択");

    $(".youhand").on("click", function(event){
        $("#janken-bgm").get(0).pause();
        $("#pon-bgm").get(0).play();
        $(".start h2").css("display","none");
        $(".janken").css("visibility","hidden");
        $(".reload").css("display","block");

        var youHand = event.target.id;
        if(youHand=="you-gu"){
            youHand = 0;
        } else if(youHand=="you-choki"){
            youHand=1;
        } else if (youHand=="you-pa"){
            youHand=2;
        }
        var cpuHand = Math.floor(Math.random() * 3);

        var youhandimg =document.createElement("img");
        if(youHand==0){
            youhandimg.src="img/janken_gu.jpeg";
        }else if(youHand==1){
            youhandimg.src="img/janken_choki.jpeg";
        }else if(youHand==2){
            youhandimg.src="img/janken_pa.jpeg";
        }
        var cpuhandimg =document.createElement("img");
        if(cpuHand==0){
            cpuhandimg.src="img/janken_gu.jpeg";
        }else if(cpuHand==1){
            cpuhandimg.src="img/janken_choki.jpeg";
        }else if(cpuHand==2){
            cpuhandimg.src="img/janken_pa.jpeg";
        }
         

        youhandimg.className="handimg";
        cpuhandimg.className="handimg";
        var battlehand = document.getElementById("battle-hand");
        battlehand.appendChild(youhandimg);
        battlehand.appendChild(cpuhandimg);
        $(".battlehand").css("flexDirection","row");

        function battle(){
            if((youHand==0&&cpuHand==0)||(youHand==1&&cpuHand==1)||(youHand==2&&cpuHand==2)){
                // battlleresult: 0:私の勝ち 1:あいこ 2:CPUの勝ち
                var battleresult = 1; 
            }else if (youHand==0&&cpuHand==1){
                var battleresult = 0;
            }else if(youHand==0&&cpuHand==2){
                var battleresult = 2;
            }else if(youHand==1&&cpuHand==0){
                var battleresult = 2;
            }else if(youHand==1&&cpuHand==2){
                var battleresult = 0;
            }else if (youHand==2&&cpuHand==0){
                var battleresult = 0;
            }else if (youHand==2&&cpuHand==1){
                var battleresult = 2;
            }
            
            var resultmsg = document.createElement("p");
            resultmsg.className="resultmsg";

            if(battleresult==0){
                resultmsg.textContent = "勝ち！";
            }else if(battleresult==1){
                resultmsg.textContent = "あいこ！";
            }else{
                resultmsg.textContent ="負け！"
            }

            var start = document.getElementById("start");
            start.prepend(resultmsg);
        }

        battle();
    })

})



