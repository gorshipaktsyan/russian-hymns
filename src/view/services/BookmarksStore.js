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

class BookmarksStore {
  set (key, value) {
    const currentDate = new Date()
    const savedHymnsList = persistentStore.get(key) || []
    const hymnObject = { date: currentDate, number: value }
    const updatedHymns = [...new Set([hymnObject, ...savedHymnsList])]
    persistentStore.set(key, updatedHymns)
  }
  get (key) {
    const savedHymns = persistentStore.get(key) || []
    const result = []
    savedHymns.forEach(saved => {
      const number = saved.number
      const matchingHymn = hymns.find(h => h.number === number)
      if (matchingHymn) {
        const formattedDate = formattingDate(saved.date)
        if (!result[formattedDate]) {
          result[formattedDate] = []
        }
        result[formattedDate].push({
          ...matchingHymn,
          date: saved.date,
          formattedDate: formattedDate
        })
      }
    })
    return result
  }
  remove (key, id) {
    try {
      const hymns = persistentStore.get(key) || []
      const updatedHymns = hymns.filter(hymn => hymn.number !== id)
      console.log(hymns)
      persistentStore.set(key, updatedHymns)
    } catch (error) {
      console.error(
        `Error removing item "${key}" from local storage: ${error.message}`
      )
    }
  }
}
const bookmarksStore = new BookmarksStore()

export default bookmarksStore
