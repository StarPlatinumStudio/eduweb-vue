export const getDate = (dt) => {
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var day = dt.getDate()
  var hour = dt.getHours()
  var minut = dt.getMinutes()
  var second = dt.getSeconds()
  var arr = ['天', '一', '二', '三', '四', '五', '六']
  var week = dt.getDay()
  // 优化 --->补位
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day; hour = hour < 10 ? '0' + hour : hour
  minut = minut < 10 ? '0' + minut : minut
  second = second < 10 ? '0' + second : second
  // 定义一个补位的函数
  function buWei (i) {
    i = i < 10 ? '0' + i : i
    return i
  }
  return year + '年' + buWei(month) + '月' + buWei(day) + '日' + buWei(hour) + ':' + buWei(minut) + ':' + buWei(second) + '星期' + arr[week]
}
