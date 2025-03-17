function addTask()
{
    const task=document.getElementById('task');
    if(task.value.trim()!="")
    {
        upadateTask(task.value);
        task.value="";
    }
    else
    {
        alert("Please enter task")
    }
    
}
function upadateTask(taskname)
{
    let tasklist=document.getElementById('list');
    const task = document.createElement('div');
    task.classList.add('tasks');

    // Create paragraph for task text
    const para = document.createElement('p');
    para.textContent = taskname;
    task.appendChild(para);

    // Create edit button
    const penButton = document.createElement('button');
    penButton.classList.add('pen');
    penButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    task.appendChild(penButton);

    // Create delete button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    task.appendChild(trashButton);

    // Create check button
    const checkButton = document.createElement('button');
    checkButton.classList.add('check');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    task.appendChild(checkButton);
    penButton.addEventListener('click', () => {
        const newText = prompt('Edit task:', para.textContent);
        if (newText !== null) {
            para.textContent = newText;
        }
    });

    trashButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            task.remove();
        }
    });

    checkButton.addEventListener('click', () => {
        task.classList.toggle('completed');
    });


    tasklist.appendChild(task);


}