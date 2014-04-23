window.Mailer = Ember.Application.create();

// for fixtures
Mailer.ApplicationAdapter = DS.FixtureAdapter.extend();

// routes
Mailer.Router.map(function() {
  this.resource('todos', { path: '/' });
});

// models
Mailer.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Mailer.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

// controllers
Mailer.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    }
  },

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')

});

Mailer.TodoController = Ember.ObjectController.extend({
  actions: {
   editTodo: function() {
     this.set('isEditing', true);
   }
 },

 isEditing: false,
 isCompleted: function(key, value){
  var model = this.get('model');

  if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
});

// fixtures
Mailer.Todo.FIXTURES = [
{
 id: 1,
 title: 'Learn Ember.js',
 isCompleted: true
},
{
 id: 2,
 title: '...',
 isCompleted: false
},
{
 id: 3,
 title: 'Profit!',
 isCompleted: false
}
];