const selectSticker = {
  stickers: {
    'react': { isSelected: false },
    'vue': { isSelected: false },
    'angular': { isSelected: false }
  },

  verifyCheck(label) {   
    const checkbox = label.parentNode.children[1]

    const [ ...classes ] = checkbox.classList

    const isChecked = classes.some(item => item === 'checked')
    
    isChecked ? this.uncheck(checkbox, label) : this.check(checkbox, label)
  },

  check(checkbox, label) {
    checkbox.classList.add('checked')

    if (checkbox === label) {
      const sticker = checkbox
                      .parentNode
                      .children[2]
                      .innerText
                      .toLowerCase()

      this.stickers[sticker].isSelected = true
    } else {

        const sticker = label.innerText.toLowerCase()
        this.stickers[sticker].isSelected = true
    }
  },

  uncheck(checkbox, label) {  
    checkbox.classList.remove('checked')

    if (checkbox === label) {
      const sticker = checkbox
                      .parentNode
                      .children[2]
                      .innerText
                      .toLowerCase()

      this.stickers[sticker].isSelected = false
    } else {

      const sticker = label.innerText.toLowerCase()
      this.stickers[sticker].isSelected = false
    }
  }
}

const counter = {
  counterElement: document.querySelector('#stickers-quantity'),
  stickers: 0,

  add() {
    this.stickers++
    this.verifyInput(false)
    this.renderResult()
  },

  remove() {
    if(this.stickers <= 0) return 
    this.stickers--
    this.verifyInput(false)


    this.renderResult()
  
  },

  renderResult() {
    this.counterElement.value = this.stickers
  },

  verifyInput(fromEvent) {
    const inputValue = this.counterElement.value

    if (fromEvent) {
      this.stickers = inputValue

      if (this.stickers <= 0) {
        minusBtn.classList.add('svg-disabled')
      } else {
        minusBtn.classList.remove('svg-disabled')
      }

    } else {
      if (this.stickers <= 0) {
        minusBtn.classList.add('svg-disabled')
      } else {
        minusBtn.classList.remove('svg-disabled')
      }
    }
    
    if (isNaN(inputValue) || this.stickers < 0) {
        this.addError()
        minusBtn.classList.add('svg-disabled')
        plusBtn.classList.add('svg-disabled')
    } else {
      this.removeError()
      plusBtn.classList.remove('svg-disabled')
    }
  },

  addError() {
    this.counterElement.classList.add('error')
  },

  removeError() {
    this.counterElement.classList.remove('error')
  }
}

const plusBtn = document.querySelector(".plusBtn")
plusBtn.addEventListener('click', () => {

  const [ ...plusBtnHTMLclasses ] = plusBtn.classList
  const isDisabled = plusBtnHTMLclasses.includes('svg-disabled')

  if (isDisabled) return

  counter.add()
})

const minusBtn = document.querySelector(".minusBtn")
minusBtn.addEventListener('click', () => {
  
  const [ ...minusBtnHTMLclasses ] = minusBtn.classList
  const isDisabled = minusBtnHTMLclasses.includes('svg-disabled')

  if (isDisabled) return

  counter.remove()
})

counter.counterElement.addEventListener('change', () => {
  counter.verifyInput(true)
})

const descriptionElement= document.querySelector('textarea')
descriptionElement.addEventListener('change', () => {
  const descriptionText = descriptionElement.value
  
  order.setDescription(descriptionText)
})


const order = {
  selectedStickers: [],

  amount: 0,

  description: '',

  setDescription(description) {
    this.description = description
  },
  
  setStickers(stickers) {
    for(let sticker in stickers) {
      if (stickers[sticker].isSelected) {
        this.selectedStickers.push(sticker)
      }
    }
    this.validate({ checkbox: true, counter: false, subject: this.selectedStickers })
  },

  setAmount(amount) {
    this.validate({ checkbox: false, counter: true, subject: amount })
    this.amount = amount    
  },


  validate({ checkbox, counter, subject }) {
    if (checkbox) {
      if (subject.length === 0) {
        handleSubmit.checkboxErrorMessage()

        throw new Error('checkbox error')
      }
    }

    if (counter) {
      if (subject === 0) {
        handleSubmit.counterErrorMessage()

        throw new Error('counter error')
      }
    }
  }
}

const submitBtn = document.querySelector('footer button')
submitBtn.addEventListener('click', (evt) => {
  evt.preventDefault()

  const messageElement = handleSubmit.messageElement
  const [ ...messageElementHTMLclasses ] = messageElement.classList
  const alreadySubmittedWithSuccess = messageElementHTMLclasses.includes('success-text')
  
  if (alreadySubmittedWithSuccess) return

  try {
    order.setAmount(counter.stickers)
    order.setStickers(selectSticker.stickers)
    handleSubmit.successMessage()

    console.log("quantidade\n", order.amount)
    console.log("tipo\n", order.selectedStickers)
    console.log("descricao\n", order.description)
  } catch (e) {
    console.log(e);
  }
})

const handleSubmit = {
  messageElement: document.querySelector('.submit-message'),
  messageElementContainer: document.querySelector('footer'),
  button: document.querySelector('footer button'),

  counterErrorMessage() {
    this.clearMessageElementClasses()

    const errorMessage = 'Escolha ao menos a quantia de 1 sticker!'
    this.messageElement.innerHTML = errorMessage
    this.messageElement.classList.add('error-text')
    
    this.messageElementContainer.classList.add('has-message')
    
    this.messageElement.classList.add('is-active')
  },

  checkboxErrorMessage() {
    this.clearMessageElementClasses()

    const errorMessage = 'Escolha ao menos um tipo de sticker!'
    this.messageElement.innerHTML = errorMessage
    this.messageElement.classList.add('error-text')

    this.messageElementContainer.classList.add('has-message')
    
    this.messageElement.classList.add('is-active')
  },

  successMessage() {
    this.clearMessageElementClasses()

    this.messageElement.innerHTML = 'Formulário enviado com successo!'
    this.messageElement.classList.add('success-text')

    this.messageElementContainer.classList.add('has-message')
  
    this.messageElement.classList.add('is-active')
  },

  clearMessageElementClasses() {
    this.messageElement.classList.remove('error-text')
    this.messageElement.classList.remove('success-text')
    this.messageElementContainer.classList.remove('has-message')
  }
}







