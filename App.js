let InputAddInputEL = document.getElementById("InputAddInputEL")
let OptionCategoryEL = document.getElementById("OptionCategoryEL")
let RoutineAccordionListEL = document.getElementById("Routine-AccordionListEL")
let RoutineHeaderEL = document.getElementById("Routineheader")
let Alert = document.getElementById("Alert")
let Routine = []
let Ibadah = []
let NonRoutine = []
let ToBuy = []

function RenderBadge(task, taskname) {
    const IncompleteCount = task.filter(item => item.completed === false).length;
    console.log(`Total Items in ${taskname} is ${IncompleteCount}`)
    console.log(RoutineHeaderEL)

    let x = ""
    x = `<button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseOne"
        aria-expanded="false"
        aria-controls="flush-collapseOne"
      >
        ${taskname}<span class="badge rounded-pill text-bg-primary ms-2">${IncompleteCount}</span>
      </button>`

    RoutineHeaderEL.innerHTML = x
}

function RenderList(InputAddInputEL, OptionCategoryEL, categoryArray, categoryList) {
    const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
    const taskObject = { taskname: OptionCategoryEL.value, id: randomId, text: InputAddInputEL.value, completed: false };

    if (OptionCategoryEL.value === "Routine") {

        //push into array
        categoryArray.push(taskObject)
        console.log(categoryArray)

       RenderBadge(Routine, 'Routine')

        //save to local storage
        // localStorage.setItem("routine", JSON.stringify(Routine));

        let ListItems = "";
        categoryArray.forEach((Item) => {
            ListItems += `<li id="Routine-${Item.id}" class="list-group-item ms-0 p-0 d-flex justify-content-between">
              ${Item.text}
              <div>
                <input
                  id="${Item.id}"
                  onchange="CheckCheckbox(${Item.id})"
                  class="form-check-input me-3"
                  type="checkbox"
                  value=""
                /><button
                  id="${Item.id}"
                  onclick="Remove(${Item.id})"
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                ></button>
              </div>
            </li>`
        });
        categoryList.innerHTML = ListItems
    }
}

function CheckCheckbox(id) {
    CheckBoxEL = document.getElementById(id)
    IsChecked = CheckBoxEL.checked

    console.log(id)

    if (IsChecked) {
        console.log(CheckBoxEL.checked)
        const foundItem = [...Routine, ...NonRoutine, ...Ibadah]
            .find(item => item.id === id);

        if (foundItem) {
            foundItem.completed = true
            console.log(foundItem)
        }

        let element = document.getElementById(`Routine-${id}`);
        if (element) {
            element.classList.add("text-decoration-line-through")
        }
    }

    else {
        console.log(CheckBoxEL.checked)
        const foundItem = [...Routine, ...NonRoutine, ...Ibadah]
            .find(item => item.id === id);

        if (foundItem) {
            foundItem.completed = false
            console.log(foundItem)
            
        }

        let element = document.getElementById(`Routine-${id}`);
        if (element) {
            element.classList.remove("text-decoration-line-through")
        }
    }

    

}


function Add() {
    if (InputAddInputEL.value === "") {
        Alert.innerHTML = `<div class="alert alert-danger" role="alert">
            Please insert input!
        </div>`;

        // Set a timeout to clear the alert after 3 seconds (3000 milliseconds)
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
        RenderList(InputAddInputEL, OptionCategoryEL, Routine, RoutineAccordionListEL)
    }
}


function Remove(id) {
    const foundItem = [...Routine, ...NonRoutine, ...Ibadah]
        .find(item => item.id === id);


    const sourceArray = [Routine, NonRoutine, Ibadah].find(array =>
        array.some(item => item.id === id)
    );

    console.log(sourceArray)

    if (sourceArray) {
        // Find the index in the correct array and remove the item
        const index = sourceArray.findIndex(item => item.id === id);
        console.log(index)
        if (index !== -1) {
            sourceArray.splice(index, 1);
            console.log(`Item removed from the array`);
        }

        console.log(Routine)

        let RemoveElement = document.getElementById(`Routine-${id}`)

        if (RemoveElement) {
            RemoveElement.remove()
        }
    }
}


// function Reset() {
//     Routine = []
//     Ibadah = []
//     NonRoutine = []
//     ToBuy = []
//     localStorage.setItem("routine", JSON.stringify(Routine));
//     localStorage.clear()
// }
RenderBadge(Routine, 'Routine')