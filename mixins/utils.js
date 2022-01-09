export default {
  methods: {
    randomStr(len) {
      let c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let s = ''
      for (let i = 0; i < len; i++)
        s += c.charAt(Math.floor(Math.random() * c.length))
      return s
    },
    getSVG(item) {
      let svg = require(`~/assets/icons/${item.icon}.svg?include`)
      if (item.gradientIcon) {
        for (let i = 1; i < 10; i++) {
          let regex = new RegExp(`gradient${i}`, 'g')
          if (regex.test(svg)) svg = svg.replace(regex, this.randomStr(7))
          else break
        }
        return svg
      } else return svg
    },
  },
}
