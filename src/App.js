import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  furnitureVariants,
  positions,
  forVariants,
  addedVariants,
  kindVariants,
  forFilters,
  statusVariants,
  levelVariants
} from './mock'

const getRandom = (number) => {
  return Math.floor(number * Math.random())
}

const getRandomArray = (array) => {
  return array[getRandom(array.length)]
}

export const App = () => {
  const [isReady, setReady] = useState(false)
  const [position, setPosition] = useState(null)
  const [isParams, setIsParams] = useState(false)
  const [furnitue, setFurniture] = useState('')
  const [added, setAdded] = useState('')
  const [forWho, setForWho] = useState('')
  const [kind, setKind] = useState('')
  const [status, setStatus] = useState('')
  const [level, setLevel] = useState('')
  const [filters, setFilters] = useState({})
  const [isAll, setIsAll] = useState(false)
  const [isInput, setIsInput] = useState(false)
  const [password, setPassword] = useState('')

  const getRandomPosition = () => {
    const position = getRandomArray(filterPositions)
    if (position) {
      setPosition(position)
      setReady(true) 
    } else {
      console.error('position not found')
    }
  }

  const onResetParams = () => {
    setFilters({})
    setKind('')
    setForWho('')
    setFurniture('')
    setAdded('')
    setStatus('')
    setLevel('')
  }

  const toggleParams = () => {
    onResetParams()
    if (!isParams) {
      setStatus('новая')
    }
    setIsParams(!isParams)
  }

  const onReset = () => {
    setPosition(null)
    setReady(false)
    onResetParams()
    setIsParams(false)
    setIsAll(false)
  }

  const getButtonText = () => {
    if (filterPositions.length) {
      if (isParams) {
        if (filterPositions.length === 1) {
          return 'Показать позу' 
        }
        return `Выбрать рандомно среди ${filterPositions.length} подобранных`
      }
      return 'Выбрать позу рандомно' 
    }
    return 'Невозможно выбрать'
  }

  const getButton = () => (
    <button
      className="App-button"
      onClick={getRandomPosition}
      disabled={!filterPositions.length}
    >
      {getButtonText()}
    </button>
  )

  useEffect(() => {
    const filtersObj = {}
    if (furnitue) {
      filtersObj.furniture = furnitue
    }
    if (forWho) {
      filtersObj.for = forFilters[forWho]
    }
    if (added) {
      filtersObj.added = added
    }
    if (kind) {
      filtersObj.kind = kind
    }
    if (status) {
      filtersObj.status = status
    }
    if (level) {
      filtersObj.level = level
    }
     setFilters(filtersObj) 
  }, [furnitue, forWho, added, kind, status, level])

  const filterPositions = useMemo(() => {
    return positions.filter(position => 
      (
        !filters.added ||
        filters.added === position.added
      ) && (
        !filters.furniture ||
        !position.furniture.length ||
        position.furniture.includes(filters.furniture)
      ) && (
        !filters.kind ||
        position.kind.length <= 0 ||
        position.kind.includes(filters.kind)
      ) && (
        !filters.for ||
        filters.for.includes(position.for)
      ) && (
        !filters.status ||
        filters.status === position.status
      ) && (
        !filters.level ||
        filters.level === position.level
      )
    ) 
  }, [filters])

  return (
    <div className="App">
      <header className="App-header">
        {isAll ? '' : isReady ? 'Ты выбрала позу - ' + position.name :
        'Предлагаю тебе выбрать, чем мы сегодня займемся?'}
      </header>
      <div className="App-content">
        {!isAll && isReady ?
          <div className="App-result">
            <img
              className="App-result__image"
              src={position.image}
              alt="error"
            />
            <div className="App-result__description">
              {position.description}
            </div>
          </div> :
          <div className="App-chose">
            <p className="App-chose__title">
              Выбралось {filterPositions.length} позиций
            </p>
            <div className="App-chose__buttons">
              {getButton()}
              <button
                onClick={toggleParams}
                className="App-button"
              >
                {isParams ? 'Сбросить параметры' : 'Выбрать по параметрам'}
              </button>
              {isInput ? <div>
                <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
                <button onClick={() => {
                  if (password === '49') {
                    setIsAll(true)
                    setIsInput(false)
                    setPassword('')
                  }
                  setIsInput(false)
                }}>Отправить</button>
              </div> : <button
                onClick={() => {
                  if(isAll) {
                    setIsAll(false)
                    setIsInput(false)
                   } else {
                    setIsInput(true)
                  }
                }}
                className="App-button"
              >
                {isAll ? 'Сбросить' : 'Показать все'}
              </button>}
            </div>
            {isParams ?
              <div className="App-chose__params">
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери новую, редкую или обычную  позу
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={status}
                    onChange={(event) => {
                      setStatus(event.target.value)
                    }}
                  >
                    <option value=''>Любая</option>
                    {statusVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери место
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={furnitue}
                    onChange={(event) => {
                      setFurniture(event.target.value)
                    }}
                  >
                    <option value=''>Любое</option>
                    {furnitureVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери для кого поза
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={forWho}
                    onChange={(event) => {
                      setForWho(event.target.value)
                    }}
                  >
                    <option value="">Неважно</option>
                    {forVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери что будем использовать
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={added}
                    onChange={(event) => {
                      setAdded(event.target.value)
                    }}
                  >
                    <option value="">Неважно</option>
                    {addedVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери вид секса
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={kind}
                    onChange={(event) => {
                      setKind(event.target.value)
                    }}
                  >
                    <option value="">Любой</option>
                    {kindVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose-params">
                  <p className="App-chose-params__title">
                    Выбери сложность позы
                  </p>
                  <select
                    className="App-chose-params__select"
                    value={level}
                    onChange={(event) => {
                      setLevel(event.target.value)
                    }}
                  >
                    <option value="">Любая</option>
                    {levelVariants.map((option, i) =>
                      <option key={i}>{option}</option>
                    )}
                  </select>
                </div>
                <div className="App-chose__buttons">
                  {getButton()}
                </div>
              </div> :
              <div className="App-chose__description">
                Ты можешь выбрать позу случайно.{' '}
                А можешь выбрать параметры, чего именно тебе сегодня хочется
              </div>
            }
            {isAll && <div>
              {filterPositions.map(pos => 
                <div className="App-result">
                   <p className="App-chose__title">
                    {pos.name}
                  </p>
                  <img
                    className="App-result__image"
                    src={pos.image}
                    alt="error"
                  />
                  <p className="App-result__description">
                    {pos.description}
                  </p>
                </div>
              )}
            </div>}
          </div>  
        }
      </div>
      <footer className="App-footer">
        {(isReady || isAll) && <button className="App-button" onClick={onReset}>
          Заново
        </button>}
      </footer>
    </div>
  );
}

export default App;
