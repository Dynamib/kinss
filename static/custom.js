$(function () {
    // 立刻刷新rss
    $("i.fa-refresh").click(function () {
        $.getJSON("/api?action=refresh", function (result) {
            if (result['state'] === 'success') {
                alert("正在抓取，请在几秒后刷新。");
            };
        });
    });

    $('#navbar').on('click', 'li', function () { //监听每个rss源的点击
        show_article_list(this);
        scroll_to_end($("#page-wrapper"), 'top');
    });

    //监听翻页按钮的点击
    $('i.nav-btn-up').on('click', function () {
        scroll_content($("#navbar"), 'up');
    });
    $('i.nav-btn-down').on('click', function () {
        scroll_content($("#navbar"), 'down');
    });
    $('i.page-btn-down').on('click', function () {
        scroll_content($("#page-wrapper"), 'down');
    });
    $('i.page-btn-up').on('click', function () {
        scroll_content($("#page-wrapper"), 'up');
    });
    $('i.top-btn').on('click', function () {
        scroll_to_end($("#page-wrapper"), 'top');
    }); $('i.end-btn').on('click', function () {
        scroll_to_end($("#page-wrapper"), 'end');
    });

    $("#navbtn").click(function () {
        $(this).toggleClass("fa-rotate-90");
        $("#navbar").toggle();
    });

    if (location.pathname === "/article") {
        $("li.all.btn").click();
    } else {
    };

});


function show_article_list(obj) {
    if ($(obj).attr('class').indexOf("btn") != -1) { //上面四个大类
        var url = $(obj).attr('eachurl')
    } else if ($(obj).attr('class').indexOf("each-feed") != -1) { //每个Feed源
        var url = "/api?action=getlist&type=each&url=" + encodeURIComponent($(obj).attr('eachurl'))
    } else {
    };

    $.getJSON(url, function (result) {
        if (result['state'] === 'success') {
            var html = '<ul>';
            for (var i in result["data"]) {
                var li = '<li>\
                <p class="feed-title">'+ result["data"][i].feed_title + '</p>\
                <p class="article-title">'+ result["data"][i].article_title + '</p>\
                </li>';
                html += li;
            }
            html += "</ul>"
            $("#page-content").html(html);
        };
    });
}

function scroll_content(obj, direction) {
    var t = 500;
    var pos = $(obj).scrollTop();
    if (direction === 'up') {
        $(obj).scrollTop(pos - t);
    } else if (direction === 'down') {
        $(obj).scrollTop(pos + t);
    };
}

function scroll_to_end(obj, direction) {
    if (direction === 'top') {
        $(obj).scrollTop(0);
    } else if (direction === 'end') {
        $(obj).scrollTop($(obj)[0].scrollHeight);
    };
}