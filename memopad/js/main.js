var value = [];

// カテゴリー追加ボタンを押したときの動作
$("#add").on("click", function (){
    // [key：category,value=入力値]をlocalstorageに保存
    var key = "category";
    value.push($("#category").val());
    localStorage.setItem(key, JSON.stringify(value));
    $("#category").val("");

    // 登録したカテゴリーをHTMLに表示
    for (i = value.length - 1; i < value.length; i++) {
        const html = `
        <li>
        <div class="ctglist">
        <a href="#${value[i]}">${value[i]}</a>
        <button class="ctgdelete" id="${value[i]}-delete"}>削除</button>
        </div>
        </li>`;

        $("#list").append(html);

        // 登録したカテゴリーの動画追加エリアを設定
        const conthtml = `
    <div class="content" id="${value[i]}">
        <div class="content-header">
            <h1>#${value[i]}</h1>
            <div class="video-search">
                <input type="text" class="video-name" id="${value[i]}-name" placeholder="人名や動画名・URLを入力"></input>
                <button class="video-add" id="${value[i]}-add">追加</button>
               </div>
        </div>
        <div class="content-video" id="${value[i]}-video">
        </div>
    </div>`;

        $("main").append(conthtml);
        
        // 動画追加用のキーと空のvalueを定義
        var videokey = value[i];
        var videovalue = [];
        localStorage.setItem(videokey,videovalue);
        console.log(videovalue);

    }

    // 動画の追加ボタンをクリックしたときの動作（ワンクリックで２回動作する場合があるためunbindを追加）
    $(".video-add").unbind("click");
    $(".video-add").on("click", function () {
        // クリックしたボタンのidを取得
        var thisid = this.id;
        // クリックしたボタンの親要素（３つ目）のidを取得
        parentid = $("#"+thisid).parent().parent().parent().attr('id');

        // inputエリアに入力した値をvideovalueにpush
        videovalue.push($("#"+parentid+"-name").val());

        localStorage.setItem(videokey,JSON.stringify(videovalue));
        
        // pushされた値をiframeタグに挿入し動画を表示
        var videos = JSON.parse(localStorage.getItem(parentid));
        for(c=videos.length-1;c<videos.length;c++){
            const videohtml = `
            <div class="youtube" id="${parentid}-youtube">
            <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videos[c]}" frameborder="0" allowfullscreen="" id="${videos[c]}"></iframe>
            <button class="youtube-dlt" id="${videos[c]}-dlt">削除</button>`;
            $("#"+parentid+"-video").append(videohtml);
        }
        $("#"+parentid+"-name").val("");
    })

    // カテゴリーの削除ボタンを押したときの動作
    $(".ctgdelete").unbind("click");
   $(".ctgdelete").on("click", function () {
        // 削除ボタンを押したカテゴリーのIDを取得
        var thisdltid = this.id;
        var index = $("#"+thisdltid).parent().parent().index();
        var dltparentid = $("#"+thisdltid).parent().find('a').text();
    
        // HTMLから削除しlocalstorageからも削除
        $(`#${value[index]}`).remove();
        $("li").eq(index).remove();
        value.splice(index,1);
        localStorage.setItem("category",JSON.stringify(value));
        console.log(value);
        localStorage.removeItem(dltparentid);
    });

        // 動画の削除ボタンを押したときの動作
        $(".youtube-dlt").on("click",function(){
            var thisid = this.id;
            var videoctg = $("#"+thisid).parent().parent().parent().attr('id');
            var videoindex = $("#"+thisid).parent().index();
            var videotitle = $("#"+thisid).parent().find('iframe').attr('id');
            console.log(videoctg);
            $(`#${videolist[videoindex]}`).remove;
            $("#"+thisid).parent().remove();
    
            videolist.splice(videoindex,1);
            localStorage.setItem(`${videoctg}`,JSON.stringify(videolist));
            localStorage.removeItem(videotitle);
        })
});

// 全削除ボタンを押したときの動作
$("#clear").on("click", function () {
    localStorage.clear();
    $("#list").empty();
    $(".content").remove();
});

// ページload時の動作 
if (JSON.parse(localStorage.length) == 0) {
    ctgvalue = [];
} else {
    ctgvalue = JSON.parse(localStorage.getItem("category"))
};

// localstorageに保存されている値を表示
for (var i = 0; i < ctgvalue.length; i++) {
    const html = `
    <li>
    <div class="ctglist">
    <a href="#${ctgvalue[i]}">${ctgvalue[i]}</a>
    <button class="ctgdelete" id="${ctgvalue[i]}-delete"}>削除</button>
    </div>
    </li>`;

    $("#list").append(html);

    const conthtml = `
    <div class="content" id="${ctgvalue[i]}">
        <div class="content-header">
            <h1>#${ctgvalue[i]}</h1>
            <div class="video-search">
                <input type="text" class="video-name" id="${ctgvalue[i]}-name" placeholder="人名や動画名・URLを入力"></input>
                <button class="video-add" id="${ctgvalue[i]}-add">追加</button>
            </div>
        </div>
        <div class="content-video" id="${ctgvalue[i]}-video">
        </div>
    </div>`;

    $("main").append(conthtml);
    var videokey = ctgvalue[i];
    var videovalue = [];
    $(".video-add").unbind("click");
    $(".video-add").on("click", function () {
        // クリックしたボタンのidを取得
        var thisid = this.id;
        // クリックしたボタンの親要素（３つ目）のidを取得
        parentid = $("#"+thisid).parent().parent().parent().attr('id');

        // inputエリアに入力した値をvideovalueにpush
        videovalue.push($("#"+parentid+"-name").val());

        localStorage.setItem(videokey,JSON.stringify(videovalue));
        
        var videos = JSON.parse(localStorage.getItem(parentid));
        for(c=videos.length-1;c<videos.length;c++){
            const videohtml = `
            <div class="youtube" id="${parentid}-youtube">
            <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videos[c]}" frameborder="0" allowfullscreen="" id="${videos[c]}"></iframe>
            <button class="youtube-dlt" id="${videos[c]}-dlt">削除</button>`;
            $("#"+parentid+"-video").append(videohtml);
        }
        $("#"+parentid+"-name").val("");

    })

    $(".ctgdelete").unbind("click");
 $(".ctgdelete").on("click", function () {
        var thisdltid = this.id;
        var index = $("#"+thisdltid).parent().parent().index();
        var dltparentid = $("#"+thisdltid).parent().find('a').text();

        $(`#${ctgvalue[index]}`).remove();
        $("li").eq(index).remove();
        ctgvalue.splice(index,1);
        localStorage.setItem("category",JSON.stringify(ctgvalue));
        console.log(ctgvalue);
        localStorage.removeItem(dltparentid);
    });

}

// 更新時にYouTube動画が消えてしまう（サーバーが違う）ため
// localstorageに保存されている値を再度iframeタグに挿入して動画を表示
for(var t=0;t<ctgvalue.length;t++){
    var ctgnum = ctgvalue[t];
    var videolist = JSON.parse(localStorage.getItem(ctgnum));
    for(var i =0;i<videolist.length;i++){
    const videohtml =`
    <div class="youtube" id="${ctgnum}-youtube">
    <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videolist[i]}" frameborder="0" allowfullscreen="" id="${videolist[i]}"></iframe>
    <button class="youtube-dlt" id="${videolist[i]}-dlt">削除</button>`;
    $("#"+ctgnum+"-video").append(videohtml);
    }

    // 動画の削除ボタンを押したときの動作
    $(".youtube-dlt").on("click",function(){
        var thisid = this.id;
        var videoctg = $("#"+thisid).parent().parent().parent().attr('id');
        var videoindex = $("#"+thisid).parent().index();
        var videotitle = $("#"+thisid).parent().find('iframe').attr('id');
        console.log(videoctg);
        $(`#${videolist[videoindex]}`).remove;
        $("#"+thisid).parent().remove();

        videolist.splice(videoindex,1);
        localStorage.setItem(`${videoctg}`,JSON.stringify(videolist));
        localStorage.removeItem(videotitle);
    })
}

// カテゴリー追加の後に別のカテゴリーに動画を追加すると、
// 間違ったキーの中にvalueが格納されてしまう