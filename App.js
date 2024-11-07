let InputAddInputEL = document.getElementById("InputAddInputEL")
let Alert = document.getElementById("Alert")
let OptionCategoryEL = document.getElementById("OptionCategoryEL")

let Routine = []
let Ibadah = []
let NonRoutine = []
let ToBuy = []

function Add() {
    if (InputAddInputEL.value === "") {
        Alert.innerHTML = `<div class="alert alert-danger" role="alert">
            Please insert input!
        </div>`;

        setTimeout(() => {
            Alert.innerHTML = "";
        }, 1000);
        return
    }

    if (OptionCategoryEL.value === "Category") {
        console.log(OptionCategoryEL.value)
        Alert.innerHTML = `<div class="alert alert-danger" role="alert">
            Please choose category!
        </div>`;

        setTimeout(() => {
            Alert.innerHTML = "";
        }, 1000);
        return;
    }

    if (OptionCategoryEL.value === "Routine") {
        RenderList('Routine', Routine)
        RenderBadge('Routine', Routine)
    }

    if (OptionCategoryEL.value === "Ibadah") {
        RenderList('Ibadah', Ibadah)
        RenderBadge('Ibadah', Ibadah)
    }

    if (OptionCategoryEL.value === "NonRoutine") {
        RenderList('NonRoutine', NonRoutine)
        RenderBadge('NonRoutine', NonRoutine)
    }

    if (OptionCategoryEL.value === "ToBuy") {
        RenderList('ToBuy', ToBuy)
        RenderBadge('ToBuy', ToBuy)
    }
}

function RenderList(Category, CategoryObject) {
    const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
    const TaskObject = { id: randomId, text: InputAddInputEL.value, completed: false };

    console.log(`You have selected category: ${Category}`)
    console.log(`The input you want to add is: ${InputAddInputEL.value}`)

    CategoryObject.push(TaskObject)

    console.log(CategoryObject)

    let AccordionListEL = `${Category}AccordionListEL`
    // console.log(AccordionListEL)
    let AccordionBody = document.getElementById(AccordionListEL)
    // console.log(AccordionBody)

    let ListItems = "";
    CategoryObject.forEach((Item) => {
        ListItems += `<li id=${Item.id} class="list-group-item ms-0 p-0 d-flex justify-content-between">
              ${Item.text}

              <div>
                <input
                  id=CheckBox-${Item.id}
                  onchange="CheckCheckbox(${Item.id}, ${Category}, '${Category}')"
                  class="form-check-input me-3"
                  type="checkbox"
                  value=""
                /><button
                  id=${Item.id}
                  onclick="Remove(${Item.id}, ${Category}, '${Category}')"
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                ></button>
              </div>
            </li>`

        AccordionBody.innerHTML = ListItems
    });

    console.log(ListItems)

}

function RenderBadge(Category, CategoryObject) {
    let x = `${Category}BadgeEL`
    console.log(x)

    let BadgeEL = document.getElementById(x)
    console.log(BadgeEL)

    console.log(CategoryObject)
    const IncompleteCount = CategoryObject.filter(item => item.completed === false).length;

    console.log(IncompleteCount)

    BadgeEL.innerHTML = `<span class="badge rounded-pill text-bg-primary ms-2"> ${IncompleteCount} </span>`

}

function CheckCheckbox(id, CategoryObject, categoryName) {

    let CheckBoxEL = document.getElementById(`CheckBox-${id}`)
    console.log(CheckBoxEL)
    console.log(CheckBoxEL.checked)

    if (CheckBoxEL.checked === true) {
        console.log(CategoryObject)
        CategoryObject.forEach((Item) => {
            if (Item.id === id) {
                console.log(`Item.id is equal to ${id}`)
                Item.completed = true
                let StrikeThroughElement = document.getElementById(id)
                console.log(StrikeThroughElement)
                StrikeThroughElement.classList.add("text-decoration-line-through")
            }
        })
        console.log(CategoryObject)
    }

    else {
        console.log(CategoryObject)
        CategoryObject.forEach((Item) => {
            if (Item.id === id) {
                Item.completed = false
                let StrikeThroughElement = document.getElementById(id)
                console.log(StrikeThroughElement)
                StrikeThroughElement.classList.remove("text-decoration-line-through")
            }
        })
        console.log(CategoryObject)
    }
    RenderBadge(categoryName, CategoryObject)
}

function Remove(id, CategoryObject, categoryName) {
    const foundItem = [...Routine, ...NonRoutine, ...Ibadah, ...ToBuy]
        .find(item => item.id === id);


    const sourceArray = [Routine, NonRoutine, Ibadah, ToBuy].find(array =>
        array.some(item => item.id === id)
    );
    console.log(foundItem)
    console.log(sourceArray)

    if (sourceArray) {
        const index = sourceArray.findIndex(item => item.id === id);
        console.log(index)
        if (index !== -1) {
            sourceArray.splice(index, 1);
            console.log(`Item removed from the ${CategoryObject}`);

            let RemoveElement = document.getElementById(id)
            console.log(RemoveElement)
            RemoveElement.remove()
            RenderBadge(categoryName, CategoryObject)
        }
    }
}


function Reset() {

}
