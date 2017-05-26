const state = {
  todo: [],
  doing: [],
  done: []
}

const mutations = {
  'LOAD_FROM_STORAGE' (state) {
    state.todo = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []
    state.doing = JSON.parse(localStorage.getItem('doing')) ? JSON.parse(localStorage.getItem('doing')) : []
    state.done = JSON.parse(localStorage.getItem('done')) ? JSON.parse(localStorage.getItem('done')) : []
  },
  'SAVE_TO_STORAGE' (state) {
    localStorage.setItem('todo', JSON.stringify(state.todo))
    localStorage.setItem('doing', JSON.stringify(state.doing))
    localStorage.setItem('done', JSON.stringify(state.done))
  },
  'REMOVE_TASK' (state, taskId) {
    let isRemoved = false
    for (let i = 0; i < state.todo.length; i++) {
      if (state.todo[i].id === taskId) {
        state.todo.splice(i, 1)
        isRemoved = true
      }
    }
    if (!isRemoved) {
      for (let i = 0; i < state.doing.length; i++) {
        if (state.doing[i].id === taskId) {
          state.doing.splice(i, 1)
          isRemoved = true
        }
      }
    }
    if (!isRemoved) {
      for (let i = 0; i < state.done.length; i++) {
        if (state.done[i].id === taskId) {
          state.done.splice(i, 1)
          isRemoved = true
        }
      }
    }
  },
  'UPDATE_LIST' (state, payload) {
    switch (payload.listName) {
      case 'todo':
        state.todo = payload.list
        break
      case 'doing':
        state.doing = payload.list
        break
      case 'done':
        state.done = payload.list
        break
    }
  },
  'CREATE_TASK' (state, task) {
    state.todo.unshift(task)
  },
  'UPDATE_TASK' (state, {reactiveTask, changedTask}) {
    for (let k in changedTask) {
      reactiveTask[k] = changedTask[k]
    }
  }
}

const actions = {
  loadFromStorage ({commit}) {
    commit('LOAD_FROM_STORAGE')
  },
  saveToStorage ({commit}) {
    commit('SAVE_TO_STORAGE')
  },
  removeTask ({commit}, taskId) {
    commit('REMOVE_TASK', taskId)
    commit('SAVE_TO_STORAGE')
  },
  updateList ({commit}, payload) {
    commit('UPDATE_LIST', payload)
    commit('SAVE_TO_STORAGE')
  },
  createTask ({commit}, task) {
    commit('CREATE_TASK', task)
    commit('SAVE_TO_STORAGE')
  },
  updateTask ({commit}, payload) {
    commit('UPDATE_TASK', payload)
    commit('SAVE_TO_STORAGE')
  }
}

const getters = {
  getTaskById: (state, getters) => (id) => {
    let arr = state.todo.concat(state.doing).concat(state.done)
    return arr.find((task) => {
      return task.id === id
    })
  },
  todo (state) {
    return state.todo
  },
  doing (state) {
    return state.doing
  },
  done (state) {
    return state.done
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
