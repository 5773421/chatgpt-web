const fs = require('fs')
const paths = require('path')
const path = paths.join(__dirname, 'keywords')

const map = {}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path, { encoding: 'UTF-8' }),
})

lineReader.on('line', (line) => {
  if (!line)
    return
  addWord(line)
})

function addWord(word) {
  let parent = map

  for (let i = 0; i < word.length; i++) {
    if (!parent[word[i]])
      parent[word[i]] = {}
    parent = parent[word[i]]
  }
  parent.isEnd = true
}

function filter(s, cb) {
  let parent = map
  let isHave = false
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '*')
      continue

    let found = false
    let skip = 0
    let sWord = ''

    for (let j = i; j < s.length; j++) {
      if (!parent[s[j]]) {
        // console.log('skip ', s[j])
        found = false
        skip = j - i
        parent = map
        break
      }

      sWord = sWord + s[j]
      if (parent[s[j]].isEnd) {
        found = true
        isHave = true
        skip = j - i
        break
      }
      parent = parent[s[j]]
    }

    if (skip > 1)
      i += skip - 1

    if (!found)
      continue

    let stars = '*'
    for (let k = 0; k < skip; k++)
      stars = `${stars}*`

    const reg = new RegExp(sWord, 'g')
    s = s.replace(reg, stars)
  }

  if (typeof cb === 'function')
    cb(isHave, s)

  return s
}

module.exports = {
  filter,
}
