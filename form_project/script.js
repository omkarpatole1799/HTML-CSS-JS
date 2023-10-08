console.log('script loaded')

// elements
let formSubmitButton = document.getElementById('form-submit-button')

// input fields
let fName = document.getElementById('fName')
let lName = document.getElementById('lName')
let mobNo = document.getElementById('mobNo')
let email = document.getElementById('email')
let address = document.getElementById('address')
let male = document.getElementById('male')
let female = document.getElementById('female')
let courseCheckboxes = document.querySelectorAll('input[type="checkbox"]')

let tableBody = document.getElementById('table-body')
let sectionDetailsTable = document.getElementById('section-details-table')
// getting previous data from browser's localstorage
let data = localStorage.getItem('formData')

let allData = []
if (data !== null) {
    let parsedData = JSON.parse(data)
    parsedData.forEach((data, i) => {
        allData.push(data)
    })
}
if (allData.length === 0) {
    sectionDetailsTable.style.setProperty('display', 'none')
}

let tableHTML = allData.map((el, i) => {
    return `<tr>
                <td>${i + 1}</td>
                <td>${el.fName}</td>
                <td>${el.lName}</td>
                <td>${el.mobNo}</td>
                <td>${el.email}</td>
                <td>${el.address}</td>
                <td>${el.course}</td>
                <td>Male</td>
                <td>
                    <button class="delete-button button" data-id='${i + 1}'>
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
})

tableBody.insertAdjacentHTML('afterend', tableHTML.join(''))

// submitting form details
formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()
    let selectedCourseList = []
    courseCheckboxes.forEach((item, i) => {
        if (item.checked) {
            selectedCourseList.push(item.value)
        }
    })

    let formDataObject = {
        fName: fName.value,
        lName: lName.value,
        mobNo: mobNo.value,
        email: email.value,
        address: address.value,
        gender:
            male.checked == true
                ? 'Male'
                : female.checked == true
                ? 'Female'
                : '',
        course: selectedCourseList.join(','),
    }

    for (const el in formDataObject) {
        console.log(formDataObject[el])
        if (formDataObject[el] == '') {
            alert('Please fill all details.')
            return false
        }
    }

    allData.push(formDataObject)
    localStorage.setItem('formData', JSON.stringify(allData))
    alert('Successfully registered!!!')
    window.location.reload()
})

// delete the entry
let deleteButton = document.getElementsByClassName('delete-button')

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', function (e) {
        e.preventDefault()

        // confirm before deletion
        if (checkDeleteConfirmation() == false) {
            return false
        }

        let deletedId = Number(this.getAttribute('data-id'))
        console.log(deletedId)
        let remainingData = allData.filter((el, i) => {
            return i + 1 !== deletedId
        })
        localStorage.setItem('formData', JSON.stringify(remainingData))
        window.location.reload()
    })
}

function checkDeleteConfirmation() {
    let deleteConfirmStatus = window.confirm(
        'Do you want to delete this entry? '
    )
    return deleteConfirmStatus
}
