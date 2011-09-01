
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Task Model
  // ----------
  window.Task = Backbone.GrailsModel.extend({
    
	dateFields: ["dueOn"],
    urlRoot: 'api/tasks'

  });

  // Task Collection
  // ---------------
  window.TaskList = Backbone.GrailsCollection.extend({

    // Reference to this collection's model.
    model: Task,
    url: 'api/tasks'

  });

  // Create our global collection of **Tasks**.
  window.Tasks = new TaskList;

});