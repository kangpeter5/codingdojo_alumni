alumniApp.controller('profileController', function(userFactory, loginFactory, jobFactory, $scope, $location, $routeParams){
  $scope.newJob = {};
  $scope.changeUser = {};
  $scope.stacks = [];
  $scope.locations = [];


  function getUsers(){

      userFactory.getUsers(function(data){
          // console.log(data, "this is coming from my factory var controller");
          $scope.users = data;  
        })
  }
  getUsers();

  function getCurrentUser(){
    loginFactory.getUser(function(data){
      console.log("__profileController, getCurrentUser__ data: ",data);
      $scope.currentUser = data;
      console.log("__profileController, getCurrentUser__ $scope.currentUser: ", $scope.currentUser);
    })
  }

  getCurrentUser();
  // console.log($scope.currentUser);

  function getJobs(){

      jobFactory.getJobs(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.jobs = data; 
        })

  }
  getJobs();

  function getStacks(){

      jobFactory.getStacks(function(data){
          console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.stacks = data; 
          console.log($scope.stacks[0].name)
          $scope.changeUser.primaryStack = $scope.stacks[0].name
         
        })
      
  }
  // getStacks();

  function getLocations(){

    userFactory.getLocations(function(data){
        $scope.locations = data; 
        console.log($scope.locations);
        console.log($scope.locations[0].name);

        $scope.changeUser.primaryLocation = $scope.locations[0].name
      })
  }
  // getLocations();

  $scope.addUser = function(newUser){
      console.log(newUser);
       // this is form data getting passed through from HTML View
        userFactory.createUser(newUser,function(){ 
          $scope.newUser = {};    // sets input fields to clear.
           $location.path('/signup');
          getUsers();              
        })
      }

  $scope.updateUser = function(changeUser){
    changeUser._id = $scope.currentUser._id;
      console.log("_ profileController, updating user now_", changeUser._id);
       // this is from data getting passed through from HTML View
        userFactory.updateUser(changeUser,function(){
          $scope.changeUser = {};    // sets input fields to clear.
          $location.path('/dashboard/my-profile');
          getUsers();
        })
      }
});