window.U = {}
U.post = function callAjax(url, data, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              callback(xmlhttp.responseText);
          } else {
            console.log(xmlhttp.status)
          }
        }
    }
}
/*
let editor1 = atom.workspace.getActiveTextEditor()
editor1.getCursorBufferPosition()
Point {row: 20, column: 22}
*/
U.longCardFormat = function(card, aClass, long) {
  let aStyle = `
          border-style: solid;
          margin: 1px;
          padding:1px;
          width: 9rem;
          border-radius: 3%;
          height: 13rem;
          display: inline-block;
          word-wrap: break-word;
          overflow-y: auto;
          text-align: center;
          font-size: .8rem;
          background: linear-gradient( 180deg, rgb(122,122,125) 0%,rgba(0,0,0,0) 1%, rgba(0,0,0,0) 99%, rgb(122,122,125) 100%),
          linear-gradient( 90deg, rgb(92,82,75) 0%, #F4E9E4 2%, #F4E9E4 98%, rgb(92,82,75) 100%);`
  let unit = `<div style = "${aStyle}" class = "${aClass}">
  <b style='font-size: 1.1rem'>${card.name}</b><br>
  <i style=''>${card.blurb}</i><br>`
  if (card.graphics.handCard != undefined) {
    unit += `<img width='72px' height='72px' src = '${card.graphics.handCard}'</img><br>`
  }
  let stats = ``
  let count = 0;
  for (let ele in card.stats) {
    if (card.stats[ele] !== false) {
      if (typeof(card.stats[ele]) != 'object') {
          stats += `<span style=''>${ele}: ${card.stats[ele]}</span>`
          if (count % 2) stats += '<br>'
          else stats += ' | '
          count++
      } else {
        for (let item in card.stats[ele]) {
          stats += `<br><span style=''><b>${item}</b>: ${card.stats[ele][item]}</span>`
        }
      }
    }
  }
  let bountyColors = ['rgba(50, 230, 150, 1)', 'rgba(220, 220, 20, 1)', 'rgb(255, 80, 235)']
  let bounty = ` | bounty:[<span style='background-color: ${bountyColors[0]}'>${card.bounty.materia || 0}</span>
  <span style='background-color: ${bountyColors[1]}'>${card.bounty.energy || 0}</span>
  <span style='background-color: ${bountyColors[2]}'>${card.bounty.souls || 0}</span>]`
  unit += stats + bounty
  if (long == true) {
    unit += `<div ><i>"${card.flavor}"</i></div>`
  }
  unit +=  "</div>"
  return unit;
}
U.clone = function(json) {
  return JSON.parse(JSON.stringify(json))
}
U.createNode = function(type, obj) {
  if (!type) {
    console.log('missing type!')
  } else {
    let output = document.createElement(type);
    Object.keys(obj).forEach(function(ele) {
      if (ele == 'innerHTML')
        output.innerHTML = obj[ele];
      else
        output.setAttribute(ele, obj[ele]);
    })
    return output;
  }
}
U.getXY = function (el) {
  el = el.getBoundingClientRect();
  return [el.left + window.scrollX, el.top + window.scrollY]
}
U.createNotice= function(info) {

}
U.shuffle = function(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
