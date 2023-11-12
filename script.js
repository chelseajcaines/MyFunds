const budgetName = document.getElementById("budget_name")
const budgetAmount = document.getElementById("budget_amount")
const budgetInterval = document.getElementById("budget_interval")
const budgetType = document.getElementById("budget_type")

const budgetTemplate = document.querySelector("#budget_template")
const budgetDisplay = document.getElementById("budget_data_items")

const budgetSubmitButton = document.getElementById("budget_submit_button")
const budgetFormPopup = document.getElementById("budget_form_popup")
const budgetForm = document.getElementById("budget_form")

const incomeSource = document.getElementById("income_source")
const incomeType = document.getElementById("income_type")
const incomeInterval = document.getElementById("income_interval")
const incomeAmount = document.getElementById("income_amount")

const incomeTemplate = document.querySelector("#income_template")
const incomeDisplay = document.getElementById("income_data_items")

const incomeSubmitButton = document.getElementById("income_submit_button")
const incomeFormPopup = document.getElementById("income_form_popup")
const incomePopupButton = document.getElementById("income_popup_button")
const incomeForm = document.getElementById("income_form")

const expenseCategory = document.getElementById("expense_category")
const expenseProduct = document.getElementById("expense_product")
const expenseCost = document.getElementById("expense_cost")
const expenseDate = document.getElementById("expense_date")

const expensesTemplate = document.querySelector("#expenses_template")
const expensesDisplay = document.getElementById("expense_data_items")

const expensesSubmitButton = document.getElementById("expenses_submit_button")
const expensesFormPopup = document.getElementById("expenses_form_popup")
const expensesForm = document.getElementById("expenses_form")

const goalName = document.getElementById("goal_name")
const goalDate = document.getElementById("goal_date")
const goalTarget = document.getElementById("goal_target")
const goalCurrent = document.getElementById("goal_current")

const goalsTemplate = document.querySelector("#goals_template")
const goalsDisplay = document.getElementById("goal_data_items")

const goalsSubmitButton = document.getElementById("goals_submit_button")
const goalsFormPopup = document.getElementById("goals_form_popup")
const goalsForm = document.getElementById("goals_form")

const tabLinks = document.querySelectorAll("[tab_link]")
const addInputButtons = document.querySelectorAll(".add_input_button")
const closePopup = document.querySelectorAll(".close")
const allForms = document.querySelectorAll("[form]")
const logo = document.querySelector(".logo_container")

// Global variable to keep that state of whatever element is currently being edited

let uid_to_edit = ""

// Clear LocalStorage

localStorage.clear()

// Setting input max length to 6 characters

function limitInputLength(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength)
    }
}

// Displaying current weekday

function displayCurrentWeekday() {
    const currentDateElement = document.getElementById("current_weekday")
    const now = new Date()
    const options = {
        weekday: "long",
    }
    const formattedDay = now.toLocaleDateString("en-US", options)
    currentDateElement.textContent = formattedDay
}

displayCurrentWeekday()

// Displaying current date

function displayCurrentDate() {
    const currentDateElement = document.getElementById("current_date")
    const now = new Date()
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
    }
    const formattedDate = now.toLocaleDateString("en-US", options)
    currentDateElement.textContent = formattedDate
}

displayCurrentDate()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Navigating through tabs within the side bar

const hideAllTabContent = () => {
    const tabContent = document.querySelectorAll(".tab_content")
    tabContent.forEach((content) => {
        content.classList.remove("active")
    })
}

tabLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault()
        const linkTargetsContent = event.target.getAttribute("href")
        hideAllTabContent()
        const pageLoadContainer = document.querySelector(".page_load_container")
        pageLoadContainer.style.display = "none"
        document.querySelector(linkTargetsContent).classList.add("active")
    })
})

// Clicking the logo will display the "home" page

logo.addEventListener("click", () => {
    hideAllTabContent()
    const pageLoadContainer = document.querySelector(".page_load_container")
    pageLoadContainer.style.display = "block"
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Clicking the 'add input' button within the tab content to allow the form modal to appear

const hideAllPopups = () => {
    const formPopups = document.querySelectorAll(".form_popup")
    formPopups.forEach((popup) => {
        popup.style.display = "none"
    })
}

const hideAllFormErrorMessages = () => {
    const errorMessages = document.querySelectorAll(".error")
    errorMessages.forEach((message) => {
        message.style.display = "none"
    })
}

addInputButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonOpensPopup = button.getAttribute("form_popup")
        hideAllFormErrorMessages()
        hideAllPopups()
        const form = document.querySelector(buttonOpensPopup)
        form.style.display = "flex"

        form.addEventListener("click", (event) => {
            if (event.target === form) {
                form.style.display = "none"
                hideAllPopups()
            }
        })
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Clicking the 'X' in the form to hide it

closePopup.forEach((closeX) => {
    closeX.addEventListener("click", () => {
        const buttonClosesPopup = closeX.getAttribute("close_popup")
        document.querySelector(buttonClosesPopup).style.display = "none"
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Generating a unique identifier to attach to each data submittion

const uniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CLARKS EDIT CALLBACK

const handleEditCardData = (formType, uid) => {
    // Guard clause to protect against invalid input
    if (!formType || !uid) {
        console.log("Invalid input supplied to handleEditCardData.")
        return
    }

    // Retrieve item from LS based on uid
    const potential_card_data = localStorage.getItem(uid)

    if (potential_card_data === null)
        return console.log("Card Data not found in local storage.")
    alert = "Card data not found."

    uid_to_edit = uid

    const card_data = JSON.parse(potential_card_data)

    if (formType === "budget") {
        budgetName.value = card_data.budgetName
        budgetAmount.value = card_data.budgetAmount
        budgetInterval.value = card_data.budgetInterval
        budgetType.value = card_data.budgetType
        // Open the form popup
        budgetFormPopup.style.display = "flex"
    } else if (formType === "income") {
        incomeSource.value = card_data.incomeSource
        incomeType.value = card_data.incomeType
        incomeInterval.value = card_data.incomeInterval
        incomeAmount.value = card_data.incomeAmount
        // Open the form popup
        incomeFormPopup.style.display = "flex"
    } else if (formType === "expenses") {
        expenseCategory.value = card_data.expenseCategory
        expenseProduct.value = card_data.expenseProduct
        expenseCost.value = card_data.expenseCost
        expenseDate.value = card_data.expenseDate
        // Open the form popup
        expensesFormPopup.style.display = "flex"
    } else if (formType === "goals") {
        goalName.value = card_data.goalName
        goalDate.value = card_data.goalDate
        goalTarget.value = card_data.goalTarget
        goalCurrent.value = card_data.goalCurrent
        // Open the form popup
        goalsFormPopup.style.display = "flex"
    } else {
        throw new Error("Invalid formType supplied to handleEditCardData.")
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle remove card callback

const handleRemoveCard = (contentWrapper, uid) => {
    if (!contentWrapper || !uid) {
        console.log("Invalid input supplied to handleRemoveCard.")
        return
    }

    // Try to retrieve the item from the DOM
    const item_to_remove = contentWrapper.querySelector(`[uid="${uid}"]`)
    // Remove the item from the DOM
    if (item_to_remove) contentWrapper?.removeChild(item_to_remove)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Callback to insert user data into input fields and append card to DOM

const setProperties_displayData = (dataType, uid) => {
    //---------------------------------------------------------------------------
    if (dataType === "budgetCard") {
        // clone template
        const budgetClone = budgetTemplate.content.cloneNode(true)
        // insert data
        budgetClone.querySelector("[budget_name]").innerText = budgetName.value
        budgetClone.querySelector("[budget_amount]").innerText =
            "$" + budgetAmount.value
        budgetClone.querySelector("[budget_interval]").innerText =
            budgetInterval.value
        budgetClone.querySelector("[budget_type]").innerText = budgetType.value
        const budgetCardWrapper = budgetClone.querySelector("[uid]")
        budgetCardWrapper.setAttribute("uid", uid)
        // call back edit function
        budgetClone
            .querySelector("[budget_edit]")
            ?.addEventListener("click", () => handleEditCardData("budget", uid))
        // call back remove function
        budgetClone
            .querySelector("[budget_delete]")
            ?.addEventListener("click", () =>
                handleRemoveCard(budgetDisplay, uid)
            )
        // append card to DOM
        budgetDisplay.appendChild(budgetClone)

        //----------------------------------------------------------------------------
    } else if (dataType === "incomeCard") {
        // clone template
        const incomeClone = incomeTemplate.content.cloneNode(true)
        // insert data
        incomeClone.querySelector("[income_source]").innerText =
            incomeSource.value
        incomeClone.querySelector("[income_type]").innerText = incomeType.value
        incomeClone.querySelector("[income_interval]").innerText =
            incomeInterval.value
        incomeClone.querySelector("[income_amount]").innerText =
            "$" + incomeAmount.value
        const incomeCardWrapper = incomeClone.querySelector("[uid]")
        incomeCardWrapper.setAttribute("uid", uid)
        // call back edit function
        incomeClone
            .querySelector("[income_edit]")
            ?.addEventListener("click", () => handleEditCardData("income", uid))
        // call back remove function
        incomeClone
            .querySelector("[income_delete]")
            ?.addEventListener("click", () =>
                handleRemoveCard(incomeDisplay, uid)
            )
        // append card to DOM
        incomeDisplay.appendChild(incomeClone)
        //------------------------------------------------------------------------------
    } else if (dataType === "expenseCard") {
        // clone template
        const expenseClone = expensesTemplate.content.cloneNode(true)
        // insert data
        expenseClone.querySelector("[expense_category]").innerText =
            expenseCategory.value
        expenseClone.querySelector("[expense_product]").innerText =
            expenseProduct.value
        expenseClone.querySelector("[expense_cost]").innerText =
            "$" + expenseCost.value
        expenseClone.querySelector("[expense_date]").innerText =
            expenseDate.value
        const expenseCardWrapper = expenseClone.querySelector("[uid]")
        expenseCardWrapper.setAttribute("uid", uid)
        // call back edit function
        expenseClone
            .querySelector("[expense_edit]")
            ?.addEventListener("click", () =>
                handleEditCardData("expenses", uid)
            )
        // call back remove function
        expenseClone
            .querySelector("[expense_delete]")
            ?.addEventListener("click", () =>
                handleRemoveCard(expensesDisplay, uid)
            )
        // append card to DOM
        expensesDisplay.appendChild(expenseClone)
        //------------------------------------------------------------------------------
    } else if (dataType === "goalCard") {
        // clone template
        const goalClone = goalsTemplate.content.cloneNode(true)
        // insert data
        goalClone.querySelector("[goal_name]").innerText = goalName.value
        goalClone.querySelector("[goal_date]").innerText = goalDate.value
        goalClone.querySelector("[goal_target]").innerText =
            "/$" + goalTarget.value
        goalClone.querySelector("[goal_current]").innerText =
            "$" + goalCurrent.value
        const goalCardWrapper = goalClone.querySelector("[uid]")
        goalCardWrapper.setAttribute("uid", uid)
        // call back edit function
        goalClone
            .querySelector("[goal_edit]")
            ?.addEventListener("click", () => handleEditCardData("goals", uid))
        // call back remove function
        goalClone
            .querySelector("[goal_delete]")
            ?.addEventListener("click", () =>
                handleRemoveCard(goalsDisplay, uid)
            )
        // append card to DOM
        goalsDisplay.appendChild(goalClone)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Call backs to diplay data when submit button is clicked

const displayBudgetData = () => {
    const budgetDataToAdd = {
        budgetName: budgetName.value,
        budgetAmount: budgetAmount.value,
        budgetInterval: budgetInterval.value,
        budgetType: budgetType.value,
    }

    if (uid_to_edit !== "") {
        // Handle the edit update function
        localStorage.setItem(uid_to_edit, JSON.stringify(budgetDataToAdd))
        handleRemoveCard(budgetDisplay, uid_to_edit)
        setProperties_displayData("budgetCard", uid_to_edit)
        uid_to_edit = ""
    } else {
        // Handle the add new function
        const budgetUID = uniqueId()
        localStorage.setItem(budgetUID, JSON.stringify(budgetDataToAdd))
        setProperties_displayData("budgetCard", budgetUID)
    }

    budgetForm.reset()
}

const displayIncomeData = () => {
    const incomeDataToAdd = {
        incomeSource: incomeSource.value,
        incomeType: incomeType.value,
        incomeInterval: incomeInterval.value,
        incomeAmount: incomeAmount.value,
    }

    if (uid_to_edit !== "") {
        // Handle the edit update function
        localStorage.setItem(uid_to_edit, JSON.stringify(incomeDataToAdd))
        handleRemoveCard(incomeDisplay, uid_to_edit)
        setProperties_displayData("incomeCard", uid_to_edit)
        uid_to_edit = ""
    } else {
        // Handle the add new function
        const incomeUID = uniqueId()
        localStorage.setItem(incomeUID, JSON.stringify(incomeDataToAdd))
        setProperties_displayData("incomeCard", incomeUID)
    }

    incomeForm.reset()
}

const displayExpenseData = () => {
    const expenseDataToAdd = {
        expenseCategory: expenseCategory.value,
        expenseProduct: expenseProduct.value,
        expenseCost: expenseCost.value,
        expenseDate: expenseDate.value,
    }
    if (uid_to_edit !== "") {
        // Handle the edit update function
        localStorage.setItem(uid_to_edit, JSON.stringify(expenseDataToAdd))
        handleRemoveCard(expensesDisplay, uid_to_edit)
        setProperties_displayData("expenseCard", uid_to_edit)
        uid_to_edit = ""
    } else {
        // Handle the add new function
        const expenseUID = uniqueId()
        localStorage.setItem(expenseUID, JSON.stringify(expenseDataToAdd))
        setProperties_displayData("expenseCard", expenseUID)
    }

    expensesForm.reset()
}

const displayGoalsData = () => {
    const goalDataToAdd = {
        goalName: goalName.value,
        goalDate: goalDate.value,
        goalTarget: goalTarget.value,
        goalCurrent: goalCurrent.value,
    }

    if (uid_to_edit !== "") {
        // Handle the edit update function
        localStorage.setItem(uid_to_edit, JSON.stringify(goalDataToAdd))
        handleRemoveCard(goalsDisplay, uid_to_edit)
        setProperties_displayData("goalCard", uid_to_edit)
        uid_to_edit = ""
    } else {
        // Handle the add new function
        const goalsUID = uniqueId()
        localStorage.setItem(goalsUID, JSON.stringify(goalDataToAdd))
        setProperties_displayData("goalCard", goalsUID)
    }

    goalsForm.reset()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Attaching event listener to submit button

budgetSubmitButton.addEventListener("click", (e) => {
    if (
        budgetName.value === "" ||
        budgetAmount.value === "" ||
        budgetInterval.value === "" ||
        budgetType.value === ""
    ) {
        document.getElementById("budget_error").style.display = "block"
        return
    }
    e.preventDefault()
    // Determine if the data already exists or not
    displayBudgetData()
    budgetFormPopup.style.display = "none"
})

incomeSubmitButton.addEventListener("click", (e) => {
    if (
        incomeSource.value === "" ||
        incomeType.value === "" ||
        incomeInterval.value === "" ||
        incomeAmount.value === ""
    ) {
        document.getElementById("income_error").style.display = "block"
        return
    }
    e.preventDefault()
    // Determine if the data already exists or not
    displayIncomeData()
    incomeFormPopup.style.display = "none"
})

expensesSubmitButton.addEventListener("click", (e) => {
    if (
        expenseCategory.value === "" ||
        expenseProduct.value === "" ||
        expenseCost.value === "" ||
        expenseDate.value === ""
    ) {
        document.getElementById("expense_error").style.display = "block"
        return
    }
    e.preventDefault()
    // Determine if the data already exists or not
    displayExpenseData()
    expensesFormPopup.style.display = "none"
})

goalsSubmitButton.addEventListener("click", (e) => {
    if (
        goalName.value === "" ||
        goalDate.value === "" ||
        goalTarget.value === "" ||
        goalCurrent.value === ""
    ) {
        document.getElementById("goals_error").style.display = "block"
        return
    }
    e.preventDefault()
    // Determine if the data already exists or not
    displayGoalsData()
    goalsFormPopup.style.display = "none"
})
