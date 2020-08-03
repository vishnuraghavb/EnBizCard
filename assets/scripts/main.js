let sC = document.getElementById('shareContainer'),
  cBtn = document.getElementById('closeBtn'),
  cURL = document.getElementById('copyURL'),
  cSURL = document.getElementById('copyShareURL'),
  dQR = document.getElementById('displayQRCode'),
  qrc = document.getElementById('qrcode'),
  s = document.getElementById('share'),
  sQRC = document.getElementById('showQRCode'),
  pKI = document.getElementById('pubKeyInfo'),
  sPK = document.getElementById('showPubKey')

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
  ;(document.querySelector('#actions').style.display = 'flex'),
    (qrc.innerHTML = new QRCode({
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
      tC(sC),
        (cURL.style.display = 'flex'),
        dN(dQR),
        pKI ? dN(pKI) : null
    })

sQRC.addEventListener('click', () => {
  tC(sC),
    (dQR.style.display = 'block'),
    dN(cURL),
    pKI ? dN(pKI) : null
})

if (sPK) {
  sPK.addEventListener('click', () => {
    tC(sC),
      pKI ? (pKI.style.display = 'flex') : null,
      dN(cURL),
      dN(dQR)
  })
}

cBtn.addEventListener('click', () => tC(sC)),
  cSURL.addEventListener('click', async () => {
    let action = cSURL.querySelectorAll('.action')[1]
    await navigator.clipboard.writeText(window.location.href).then((e) => {
      action.innerText = 'Copied'
      setTimeout(() => {
        action.innerText = 'Copy URL'
      }, 1e3)
    })
  })
