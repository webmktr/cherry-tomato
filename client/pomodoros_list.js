  Template.pomodorosList.helpers({
    list: function () {
      return Pomodoros.find({userID: Meteor.user()._id}, {sort: {startDate: -1}});
    }
  });
  Template.pomodorosList.events({
    "submit form": function (event, template) {
      //stop default action
      event.preventDefault();

      var goal = event.target.goal.value;
      //validate

      //insert into database
      Pomodoros.insert({goal: goal, startDate: new Date(), userID: Meteor.user()._id});

      //clear the value
      template.find('form').reset();

      //call a method on the server
      Meteor.call('pomodoroFinished');
    },

    "click .deleteButton": function (event) {
      Pomodoros.remove({_id: this._id});
    }
  });
