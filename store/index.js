export const state = () => ({
  theme: 1,
})

export const mutations = {
  changeTheme(state, theme) {
    state.theme = theme
  },
}
export const actions = {
  changeTheme(state, theme) {
    state.commit('changeTheme', theme)
  },
}
