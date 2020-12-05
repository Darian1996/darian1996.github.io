
$(function() {
  // 标题等信息
  var titles = []
  // 正文内容
  var contents = []
  var searchData = null

  $('.page-search h1 img').css('opacity', 1)

  $.ajax({
    url: window.baseurl + '/search/search.xml',
    dataType: 'html',
    cache: true,
    timeout: 10000,
    success: function (data) {
      searchData = data
      $('.page-search h1 img').css('opacity', 0)
      $(data)
          .find('li')
          .each(function (i, v) {
            contents.push($(v).html())
          })
      $('.list-search .title-me').each(function (i, v) {
        titles.push($(v).html())
      })
      search($('#search-input').val())
    },
    error: function (err) {
      console.error('全文检索数据加载失败...')
    }
  })

  $('#search-input').on('input', function () {
    search($(this).val())
  })

  function encodeRegChar(str) {
    // \ 必须在第一位
    var arr = [
      '\\',
      '.',
      '^',
      '$',
      '*',
      '+',
      '?',
      '{',
      '}',
      '[',
      ']',
      '|',
      '(',
      ')'
    ]
    arr.forEach(function (c) {
      var r = new RegExp('\\' + c, 'g')
      str = str.replace(r, '\\' + c)
    })
    return str
  }

  function search(key) {
    if (!searchData) {
      return
    }
    // <>& 替换
    key = $.trim(key)
    key = key
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')

    var doms = document.querySelectorAll('.list-search .post-preview')
    var h1 = '<span class="hint">'
    var h2 = '</span>'
    for (let i = 0; i < doms.length; i++) {
      var title = titles[i]
      var content = contents[i]
      var dom_li = doms[i]
      var dom_title = dom_li.querySelector('.title-me')
      var dom_content = dom_li.querySelector('.content-me')

      dom_title.innerHTML = title
      dom_content.innerHTML = ''

      // 空字符隐藏
      if (key == '') {
        dom_li.setAttribute('hidden', true)
        continue
      }
      var hide = true
      var r1 = new RegExp(encodeRegChar(key), 'gi')
      var r2 = new RegExp(encodeRegChar(key), 'i')

      // 标题全局替换
      if (r1.test(title)) {
        hide = false
        dom_title.innerHTML = title.replace(r1, h1 + key + h2)
      }
      // 内容先找到第一个，然后确定100个字符，再对这100个字符做全局替换
      var cResult = r2.exec(content)
      if (cResult) {
        hide = false
        index = cResult.index
        var leftShifting = 10
        var left = index - leftShifting
        var right = index + (300 - leftShifting)
        if (left < 0) {
          right = right - left
        }
        content = content.substring(left, right)
        dom_content.innerHTML = content.replace(r1, h1 + key + h2) + '...'
      }
      // 内容未命中标题命中，内容直接展示前100个字符
      if (!cResult && !hide && content) {
        dom_content.innerHTML = content.substring(0, 200) + '...'
      }
      if (hide) {
        dom_li.setAttribute('hidden', true)
      } else {
        dom_li.removeAttribute('hidden')
      }
    }
  }
})