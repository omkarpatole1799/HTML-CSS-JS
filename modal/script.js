const dialog = document.querySelector('dialog')

const openModal = document.querySelector('.open-modal')
const closeModal = document.querySelector('.close-modal')


console.log(openModal, '==openModal==')


openModal.addEventListener('click', function(){
    dialog.showModal()
})

closeModal.addEventListener('click', function(){
    dialog.close()
})