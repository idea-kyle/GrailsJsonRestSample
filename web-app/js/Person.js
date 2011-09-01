
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Person Model
  // ----------
  window.Person = Backbone.GrailsModel.extend({
    
    urlRoot: 'api/persons'

  });

  // Person Collection
  // ---------------
  window.PersonList = Backbone.GrailsCollection.extend({

    // Reference to this collection's model.
    model: Person,
    url: 'api/persons'

  });

  // Create our global collection of **Persons**.
  window.Persons = new PersonList;

});