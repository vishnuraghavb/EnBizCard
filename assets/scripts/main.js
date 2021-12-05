let m = document.getElementById('modal'),
  c = document.getElementById('close'),
  ki = document.getElementById('keyInfo'),
  cv = document.getElementById('copyView'),
  curl = document.getElementById('copyURL'),
  qrv = document.getElementById('qrView'),
  qr = document.getElementById('qr'),
  s = document.getElementById('share'),
  sqr = document.getElementById('showQR'),
  sk = document.getElementById('showKey')

function tC(e) {
  '2rem' == e.style.top
    ? ((e.style.visibility = 'visible'),
      (e.style.top = '0px'),
      (e.style.opacity = 1))
    : ((e.style.top = '2rem'),
      (e.style.opacity = 0),
      setTimeout(() => {
        e.style.visibility = 'hidden'
      }, 200))
}
function dN(value) {
  value.style.display = 'none'
}
window.addEventListener('load', () => {
  ;(document.querySelector('#topActions').style.display = 'flex'),
    (qr.innerHTML = new QRCode({
      content: window.location.href,
      container: 'svg-viewbox',
      join: !0,
      ecl: 'L',
      padding: 0,
    }).svg())
})
navigator.canShare
  ? s.addEventListener('click', () => {
      navigator.share({
        title: document.title,
        text: 'You can view my Digital Business Card here:',
        url: window.location.href,
      })
    })
  : s.addEventListener('click', () => {
      tC(m), (cv.style.display = 'flex'), dN(qrv), ki ? dN(ki) : null
    })

sqr.addEventListener('click', () => {
  tC(m), (qrv.style.display = 'block'), dN(cv), ki ? dN(ki) : null
})

if (sk) {
  sk.addEventListener('click', () => {
    tC(m), ki ? (ki.style.display = 'flex') : null, dN(cv), dN(qrv)
  })
}

c.addEventListener('click', () => tC(m)),
  curl.addEventListener('click', async () => {
    let action = curl.querySelectorAll('.action')[1]
    await navigator.clipboard.writeText(window.location.href).then((e) => {
      action.innerText = 'Copied'
      setTimeout(() => {
        action.innerText = 'Copy URL'
      }, 1e3)
    })
  })
