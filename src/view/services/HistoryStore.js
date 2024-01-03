import hymns from './storage/hymns.json'
import persistentStore from './PersistentStore'

function formattingDate (date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }
  const dateFormatter = new Intl.DateTimeFormat('ru', options)
  return dateFormatter.format(new Date(date))
}

class HistoryStore {
  set (key, value) {
    const hymnIds = Array.isArray(value) ? value : [value]
    const currentDate = new Date()
    const searchedNumbers = persistentStore.get(key) || []
    const hymnObject = { date: currentDate, number: hymnIds }
    const updatedHymns = [...new Set([hymnObject, ...searchedNumbers])]
    persistentStore.set(key, updatedHymns)
    return hymnIds
  }
  get (key) {
    const history = persistentStore.get(key) || []
    const result = []
    history.forEach(searched => {
      searched.number.forEach(number => {
        const matchingHymn = hymns.find(h => h.number === number)
        if (matchingHymn) {
          const formattedDate = formattingDate(searched.date)
          if (!result[formattedDate]) {
            result[formattedDate] = []
          }
          result[formattedDate].push({
            ...matchingHymn,
            date: searched.date,
            formattedDate: formattedDate
          })
        }
      })
    })
    return result
  }
}
const historyStore = new HistoryStore()

export default historyStore
