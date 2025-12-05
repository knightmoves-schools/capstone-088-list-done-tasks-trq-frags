let tasks = [
    {description: 'pack spikes for track meet', status: 'todo'}, 
    {description: 'make my bed', status: 'todo'}, 
    {description: 'walk the dog', status: 'todo'},
    {description: 'write draft english paper', status: 'doing'},
    {description: 'sanding art project', status: 'doing'},
    {description: 'wash the dishes', status: 'done'},
    {description: 'finish math homework', status: 'done'},
    {description: 'practice my trumpet', status: 'done'}];
            
function drawCard(index, task){
    return `<div id="task-${index}" class="card">
        <div class="task-menu">
            <div class="menu-bar  ${task.status}">...</div>
            <ul class="task-menu-items">
                <li><a href="/edit/${index}">Edit</a></li>
                <li><a href="/delete/${index}">Delete</a></li>
            </ul>
        </div>
        ${task.description}
    </div>`
}

function drawTodoCards(){
    let output = '';
    tasks.forEach((task, index) => {
        if(task.status == 'todo'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}

function drawDoingCards(){
    let output = '';
    
    tasks.forEach((task, index) => {
        if(task.status == 'doing'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}



function drawDoneCards(){
    
}

document.getElementById('todo-cards').innerHTML = drawTodoCards();
document.getElementById('doing-cards').innerHTML = drawDoingCards();
document.getElementById('done-cards').innerHTML = drawDoneCards();
