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
        <div class="ctg-list">
        <a href="#${value[i]}">${value[i]}</a>
        <button class="ctg-delete" id="${value[i]}-delete"}>削除</button>
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
        var videoKey = value[i];
        var videoValue = [];
        localStorage.setItem(videoKey,videoValue);
        console.log(videoValue);

    }

    // 動画の追加ボタンをクリックしたときの動作（ワンクリックで２回動作する場合があるためunbindを追加）
    $(".video-add").unbind("click");
    $(".video-add").on("click", function () {
        // クリックしたボタンのidを取得
        var thisId = this.id;
        // クリックしたボタンの親要素（３つ目）のidを取得
        var parentId = $("#"+thisId).parent().parent().parent().attr('id');

        // inputエリアに入力した値をvideovalueにpush
        videoValue.push($("#"+parentId+"-name").val());

        localStorage.setItem(videoKey,JSON.stringify(videoValue));
        
        // pushされた値をiframeタグに挿入し動画を表示
        var videos = JSON.parse(localStorage.getItem(parentId));
        for(c=videos.length-1;c<videos.length;c++){
            const videohtml = `
            <div class="youtube" id="${parentId}-youtube">
            <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videos[c]}" frameborder="0" allowfullscreen="" id="${videos[c]}"></iframe>
            <button class="youtube-dlt" id="${videos[c]}-dlt">削除</button>`;
            $("#"+parentId+"-video").append(videohtml);
        }
        $("#"+parentId+"-name").val("");
    })

    // カテゴリーの削除ボタンを押したときの動作
    $(".ctg-delete").unbind("click");
   $(".ctg-delete").on("click", function () {
        // 削除ボタンを押したカテゴリーのIDを取得
        var thisDltId = this.id;
        var index = $("#"+thisDltId).parent().parent().index();
        var dltParentId = $("#"+thisDltId).parent().find('a').text();
    
        // HTMLから削除しlocalstorageからも削除
        $(`#${value[index]}`).remove();
        $("li").eq(index).remove();
        value.splice(index,1);
        localStorage.setItem("category",JSON.stringify(value));
        console.log(value);
        localStorage.removeItem(dltParentId);
    });

        // 動画の削除ボタンを押したときの動作
        $(".youtube-dlt").on("click",function(){
            var thisId = this.id;
            var videoCtg = $("#"+thisId).parent().parent().parent().attr('id');
            var videoIndex = $("#"+thisId).parent().index();
            var videoTitle = $("#"+thisId).parent().find('iframe').attr('id');
            console.log(videoCtg);
            $(`#${videoList[videoIndex]}`).remove;
            $("#"+thisId).parent().remove();
    
            videoList.splice(videoIndex,1);
            localStorage.setItem(`${videoCtg}`,JSON.stringify(videoList));
            localStorage.removeItem(videoTitle);
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
    ctgValue = [];
} else {
    ctgValue = JSON.parse(localStorage.getItem("category"))
};

// localstorageに保存されている値を表示
for (var i = 0; i < ctgValue.length; i++) {
    const html = `
    <li>
    <div class="ctglist">
    <a href="#${ctgValue[i]}">${ctgValue[i]}</a>
    <button class="ctgdelete" id="${ctgValue[i]}-delete"}>削除</button>
    </div>
    </li>`;

    $("#list").append(html);

    const conthtml = `
    <div class="content" id="${ctgValue[i]}">
        <div class="content-header">
            <h1>#${ctgValue[i]}</h1>
            <div class="video-search">
                <input type="text" class="video-name" id="${ctgValue[i]}-name" placeholder="人名や動画名・URLを入力"></input>
                <button class="video-add" id="${ctgValue[i]}-add">追加</button>
            </div>
        </div>
        <div class="content-video" id="${ctgValue[i]}-video">
        </div>
    </div>`;

    $("main").append(conthtml);
    var videoKey = ctgValue[i];
    var videoValue = [];
    $(".video-add").unbind("click");
    $(".video-add").on("click", function () {
        // クリックしたボタンのidを取得
        var thisId = this.id;
        // クリックしたボタンの親要素（３つ目）のidを取得
        var parentId = $("#"+thisId).parent().parent().parent().attr('id');

        // inputエリアに入力した値をvideovalueにpush
        videoValue.push($("#"+parentId+"-name").val());

        localStorage.setItem(videoKey,JSON.stringify(videoValue));
        
        var videos = JSON.parse(localStorage.getItem(parentId));
        for(c=videos.length-1;c<videos.length;c++){
            const videohtml = `
            <div class="youtube" id="${parentId}-youtube">
            <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videos[c]}" frameborder="0" allowfullscreen="" id="${videos[c]}"></iframe>
            <button class="youtube-dlt" id="${videos[c]}-dlt">削除</button>`;
            $("#"+parentId+"-video").append(videohtml);
        }
        $("#"+parentId+"-name").val("");

    })

    $(".ctg-delete").unbind("click");
 $(".ctg-delete").on("click", function () {
        var thisDltId = this.id;
        var index = $("#"+thisDltId).parent().parent().index();
        var dltParentId = $("#"+thisDltId).parent().find('a').text();

        $(`#${ctgValue[index]}`).remove();
        $("li").eq(index).remove();
        ctgValue.splice(index,1);
        localStorage.setItem("category",JSON.stringify(ctgValue));
        console.log(ctgValue);
        localStorage.removeItem(dltParentId);
    });

}

// 更新時にYouTube動画が消えてしまう（サーバーが違う）ため
// localstorageに保存されている値を再度iframeタグに挿入して動画を表示
for(var t=0;t<ctgValue.length;t++){
    var ctgNum = ctgValue[t];
    var videoList = JSON.parse(localStorage.getItem(ctgNum));
    for(var i =0;i<videoList.length;i++){
    const videohtml =`
    <div class="youtube" id="${ctgNum}-youtube">
    <iframe width="100%" height="360" src="https://www.youtube.com/embed?listType=search&list=${videoList[i]}" frameborder="0" allowfullscreen="" id="${videoList[i]}"></iframe>
    <button class="youtube-dlt" id="${videoList[i]}-dlt">削除</button>`;
    $("#"+ctgNum+"-video").append(videohtml);
    }

    // 動画の削除ボタンを押したときの動作
    $(".youtube-dlt").on("click",function(){
        var thisId = this.id;
        var videoCtg = $("#"+thisId).parent().parent().parent().attr('id');
        var videoIndex = $("#"+thisId).parent().index();
        var videoTitle = $("#"+thisId).parent().find('iframe').attr('id');
        console.log(videoCtg);
        $(`#${videoList[videoIndex]}`).remove;
        $("#"+thisId).parent().remove();

        videoList.splice(videoIndex,1);
        localStorage.setItem(`${videoCtg}`,JSON.stringify(videoList));
        localStorage.removeItem(videoTitle);
    })
}

// カテゴリー追加の後に別のカテゴリーに動画を追加すると、
// 間違ったキーの中にvalueが格納されてしまう