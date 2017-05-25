const state = {
  todo: [
    {
      id: 1,
      title: 'Read Books',
      description: 'fd kjdfb ksfh fkjbds fkjdvb',
      city: 'Kiev',
      date: '20.06.2016',
      weather: {
        icon: '02d',
        main: 'Rain',
        description: 'small rain'
      }
    },
    {
      id: 12,
      title: 'Eat Cookie',
      description: 'fd kjdfb ksfh fkjbds fkjdvb',
      city: 'Lviv',
      date: '04.06.2016',
      weather: {
        icon: '01d',
        main: 'Sun',
        description: 'small rain'
      }
    }
  ],
  doing: [
    {
      id: 9,
      title: 'Watch Movie',
      description: 'fd kjdfb ksfh fkjbds fkjdvb',
      city: 'Odessa',
      date: '29.05.2016',
      weather: {
        icon: '01d',
        main: 'Sun',
        description: 'small rain'
      }
    }
  ],
  done: []
}

const mutations = {
  // 'BUY_STOCK'(state, {stockId, quantity, stockPrice}) {
  //   const record = state.stocks.find(element => element.id === stockId);
  //   if (record) {
  //     record.quantity += quantity;
  //   } else {
  //     state.stocks.push({
  //       id: stockId,
  //       quantity: quantity
  //     });
  //   }
  //   state.funds -= stockPrice * quantity;
  // },
  // 'SELL_STOCK'(state, {stockId, quantity, stockPrice}) {
  //   const record = state.stocks.find(element => element.id === stockId);
  //   if (record.quantity > quantity) {
  //     record.quantity -= quantity;
  //   } else {
  //     state.stocks.splice(state.stocks.indexOf(record), 1);
  //   }
  //   state.funds += stockPrice * quantity;
  // },
  // 'SET_PORTFOLIO' (state, portfolio) {
  //   state.funds = portfolio.funds;
  //   state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  // }
  'LOAD_FROM_STORAGE' (state) {
    // state.todo = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []
    // state.doing = JSON.parse(localStorage.getItem('doing')) ? JSON.parse(localStorage.getItem('doing')) : []
    // state.done = JSON.parse(localStorage.getItem('done')) ? JSON.parse(localStorage.getItem('done')) : []
    state.todo = [
      {
        id: 1,
        title: 'Read Books',
        description: 'fd kjdfb ksfh fkjbds fkjdvb',
        city: 'Kiev',
        date: '20.06.2016',
        created: '12213',
        weather: {
          icon: '02d',
          main: 'Rain',
          description: 'small rain'
        }
      },
      {
        id: 12,
        title: 'Eat Cookie',
        description: 'fd kjdfb ksfh fkjbds fkjdvb',
        city: 'Lviv',
        date: '04.06.2016',
        created: 'kjlkj',
        weather: {
          icon: '01d',
          main: 'Sun',
          description: 'small rain'
        }
      },
      {
        id: 150,
        title: 'Make Video',
        description: 'fd kjdfb ksfh fkjbds fkjdvb',
        city: 'Lviv',
        date: '04.06.2016',
        created: 'jkjklh',
        weather: {
          icon: '01d',
          main: 'Sun',
          description: 'small rain'
        }
      }
    ]
    state.doing = [
      {
        id: 9,
        title: 'Watch Movie',
        description: 'fd kjdfb ksfh fkjbds fkjdvb',
        city: 'Odessa',
        date: '29.05.2016',
        weather: {
          icon: '01d',
          main: 'Sun',
          description: 'small rain'
        }
      }
    ]
    state.done = []
  },
  'SAVE_TO_STORAGE' (state) {
    // localStorage.setItem('todo', JSON.stringify(state.todo))
    // localStorage.setItem('doing', JSON.stringify(state.doing))
    // localStorage.setItem('done', JSON.stringify(state.done))
  },
  'REMOVE_TASK' (state, taskId) {
    let isRemoved = false
    for (let i = 0; i < state.todo.length; i++) {
      console.log(taskId)
      console.log(state.todo[i].id)
      console.log('----')
      if (state.todo[i].id === taskId) {
        state.todo.splice(i, 1)
        isRemoved = true
      }
    }
    if (isRemoved) {
      // this.saveToStorage()
    } else {
      for (let i = 0; i < state.doing.length; i++) {
        if (state.doing[i].id === taskId) {
          state.doing.splice(i, 1)
          isRemoved = true
        }
      }
    }
    if (isRemoved) {
      // this.saveToStorage()
    } else {
      for (let i = 0; i < state.todo.done; i++) {
        if (state.done[i].id === taskId) {
          state.done.splice(i, 1)
          isRemoved = true
        }
      }
    }
  },
  'CHANGE_TASK_POSITION' (state, {from, to}) {
    state.todo[from] = state.todo.splice(to, 1, state.todo[from])[0]
    // let b = state.todo[from]
    // state.todo[from] = state.todo[to]
    // state.todo[to] = b
    // state.todo.sort()
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
  },
  changeTaskPosition ({commit}, payload) {
    commit('CHANGE_TASK_POSITION', payload)
  }
}

const getters = {
  // stockPortfolio (state, getters) {
  //   return state.stocks.map(stock => {
  //     const record = getters.stocks.find(element => element.id === stock.id)
  //     return {
  //       id: stock.id,
  //       quantity: stock.quantity,
  //       name: record.name,
  //       price: record.price
  //     }
  //   })
  // },
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
