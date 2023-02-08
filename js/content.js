chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
      title = $('H1').text();
      console.log(title);

      // イラスト数の取得
      cnt = 1;
      pagingEleTxt = $('div[aria-label="プレビュー"]').text();
      console.log(pagingEleTxt);
      if (!isBlank(pagingEleTxt)) {
            cnt = pagingEleTxt.slice(pagingEleTxt.indexOf('/') + 1)
      }
      console.log(cnt);

      url = $('a[href*="i.pximg.net/img-original"]').attr("href");
      console.log(url);
      urls = []
      for (var i = 0; i < cnt; i++) {
            urls.push(url.replace('_p0.','_p'+ i+'.'));
      }
      console.log(urls);

      userName = $('a.klpipK > div').text();
      console.log(userName);

      let tags = [];
      tagsEle = $("ul.gZfuPH > li");
      tagsEle.each(function(i) {
            i = i+1;
            //Tagの最後(+)だけ除外する
            if(i != tagsEle.length){
                  tag = $(this).find('a').text();
                  tags.push(tag);
                  console.log(i + ': ' + tag);
            }
      });
      const response = {
            "title": title,
            "tags": tags,
            "url": urls,
            "user":{
                  "name": userName
            }
      }
      console.log(response);
      sendResponse(response);
});

function isBlank(val){
      return (val == null || val === "");
}