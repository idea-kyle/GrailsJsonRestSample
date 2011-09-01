function log(m){ log(m, 'info'); }
function log(m, t){
	$("#log").append('<li class=' + t + '>' + m + '</li>');
}

// script shared across pages
$(document).ready(function(){

	// show current todos
	getTasks();
	// show current persons
	
	// create new person
	
	// create new todo assigned to new person and existing person
	
	
} ); 

function handleError(c,response){
	log(response.responseText,'error');
}

function printTasks(tasks){
	_.each(tasks.models, function(t){ printTask(t); });
}
function printTask(t){
	log(t.get('name'));
}
function printPersons(persons){
	_.each(persons.models, function(p){ printPerson(p); });
}
function printPerson(p){
	log(p.get('name'));
}

function getTasks(){
	log('getting current todos...');
	window.Tasks.fetch({error:handleError,
						success:function(collection,response){printTasks(collection); getPersons(); }});
}
function getPersons(){
	log('getting current persons...');
	window.Persons.fetch({error:handleError,
						success:function(collection,response){printPersons(collection); newPerson(); }});
}
var ray;
function newPerson(){
	log('creating new person...')
	ray = new Person()
	ray.save({name:'ray'},{error:handleError,
			  success:function(m,r){ 
				  printPerson(m); 
				  newTask(); 
			}});
}
var eat;
function newTask(){
	log('creating new todo...')
	eat = new Task();
	eat.save({name:'eat',dueOn:new Date(),assignedTo:[ray.id,Persons.at(0).id]},
			{error:handleError,
			  success:function(m,r){ 
				  printTask(m); 
				  updateTask(eat);
			}});
}
function updateTask(t){
	t.save({assignedTo:[ray.id]},
			{error:handleError,
			  success:function(m,r){ 
				  printTask(m); 
				  updatePerson(ray);
			}});
}
function updatePerson(p){
	p.save({tasks:[eat.id]},
			{error:handleError,
			  success:function(m,r){ 
				  printPerson(m); 
				  log('done.')
			}});
}
