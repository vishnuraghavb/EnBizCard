let pC = document.querySelectorAll('.pCtrl'),
  pP = document.querySelectorAll('.playPause'),
  srcs = document.querySelectorAll('.source')
srcs.forEach((e) => {
  ;(e.style.pointerEvents = 'none'), e.removeAttribute('controls')
}),
  pC.forEach((e, l) => {
    e.style.display = 'flex'
    let r = e.querySelector('.currentTime'),
      s = e.querySelector('.seekBar'),
      t = e.querySelector('.playPause'),
      o = t.querySelector('.play'),
      a = t.querySelector('.pause')
    srcs[l].addEventListener('timeupdate', () => {
      let e = srcs[l].currentTime,
        t = (100 / srcs[l].duration) * e
      ;(s.value = t),
        100 == t &&
          ((s.value = 0),
          (o.style.display = 'block'),
          (a.style.display = 'none'))
      let u = Math.floor(e / 60),
        c = Math.floor(e % 60)
      u.toString().length < 2 && (u = '0' + u),
        c.toString().length < 2 && (c = '0' + c),
        (r.value = u + ':' + c)
    }),
      s.addEventListener('change', () => {
        srcs[l].currentTime = srcs[l].duration * (parseInt(s.value) / 100)
      }),
      t.addEventListener('click', () => {
        srcs[l].paused
          ? (srcs.forEach((e, r) => {
              l != r && (e.paused || e.pause())
            }),
            pP.forEach((e, l) => {
              let r = e.querySelector('.play'),
                s = e.querySelector('.pause')
              ;(r.style.display = 'block'), (s.style.display = 'none')
            }),
            srcs[l].play(),
            (o.style.display = 'none'),
            (a.style.display = 'block'))
          : (srcs[l].pause(),
            (a.style.display = 'none'),
            (o.style.display = 'block'))
      })
  })
