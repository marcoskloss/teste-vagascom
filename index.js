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

    handleSubmit.setButtonEnabledVerifier() 
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
    handleSubmit.setButtonEnabledVerifier() 
  },

  verifyInput(fromEvent) {
    const inputValue = this.counterElement.value

    if(fromEvent) {
      this.stickers = inputValue

      if(this.stickers <= 0) {
        minusBtn.classList.add('disabled')
      } else {
        minusBtn.classList.remove('disabled')
      }

    } else {
      if(this.stickers <= 0) {
        minusBtn.classList.add('disabled')
      } else {
        minusBtn.classList.remove('disabled')
      }
    }
    
    if(isNaN(inputValue) || this.stickers < 0) {
        this.addError()
    } else {
      this.removeError()
    }
  },

  addError() {
    this.counterElement.classList.add('error')
  },

  removeError() {
    this.counterElement.classList.remove('error')
  }
}

const plusBtn = document.querySelector("#plusBtn")
plusBtn.addEventListener('click', () => {
  counter.add()
})

const minusBtn = document.querySelector("#minusBtn")
minusBtn.addEventListener('click', () => {
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
        submitMessage.checkboxErrorMessage()
        handleSubmit.buttonDisabled()
        throw new Error('checkbox error')
      }
    }

    if (counter) {
      if (subject === 0) {
        submitMessage.counterErrorMessage()
        handleSubmit.buttonDisabled()
        throw new Error('counter error')
      }
    }
  }
}

const submitBtn = document.querySelector('footer button')
submitBtn.addEventListener('click', (evt) => {
  evt.preventDefault()

  try {
    order.setAmount(counter.stickers)
    order.setStickers(selectSticker.stickers)
    submitMessage.sucessMessage()

    console.log("quantidade\n", order.amount)
    console.log("tipo\n", order.selectedStickers)
    console.log("descricao\n", order.description)
  } catch (e) {
    console.log(e);
  }
})

const handleSubmit = {
  messageElement: document.querySelector('.submit-message'),
  button: document.querySelector('footer button'),

  buttonEnabled() {
    this.button.classList.remove('disabled')
  },

  buttonDisabled() {
    this.button.classList.add('disabled')
  },

  setButtonEnabledVerifier() {
    let hasSticker

    for(let sticker in selectSticker.stickers) {
      if (selectSticker.stickers[sticker].isSelected) {
        hasSticker = true
      }
    }

    if (counter.stickers > 0 && hasSticker)  {
      this.buttonEnabled()
    } else {
      this.buttonDisabled()
    }
  },

  counterErrorMessage() {
    this.clearMessageElementClasses()

    const errorMessage = 'Escolha ao menos a quantia de 1 sticker!'
    this.messageElement.innerHTML = errorMessage
    this.messageElement.classList.add('error-text')
    this.messageElement.classList.add('is-active')
  },

  checkboxErrorMessage() {
    this.clearMessageElementClasses()

    const errorMessage = 'Escolha ao menos um tipo de sticker!'
    this.messageElement.innerHTML = errorMessage
    this.messageElement.classList.add('error-text')
    this.messageElement.classList.add('is-active')
  },

  sucessMessage() {
    this.clearMessageElementClasses()

    this.messageElement.innerHTML = 'Formulário enviado com sucesso!'
    this.messageElement.classList.add('sucess-text')
    this.messageElement.classList.add('is-active')
  },

  clearMessageElementClasses() {
    this.messageElement.classList.remove('error-text')
    this.messageElement.classList.remove('sucess-text')
  }

}

// const Modal = {
//   modalElement: document.querySelector('.modal-container'),

//   close() {
//     this.modalElement.classList.remove('is-active')
//   },

//   open() {
//     this.modalElement.classList.add('is-active')
//   }
// }





