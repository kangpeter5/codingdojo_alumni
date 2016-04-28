alumniApp.controller('profileController', function(userFactory, loginFactory, jobFactory, $scope, $location, $routeParams){
  $scope.newJob = {};
  $scope.newUser = {};
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
      $scope.currentUser = data;
      // console.log($scope.currentUser)
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
  // getJobs();

  function getStacks(){

      jobFactory.getStacks(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.stacks = data; 
          console.log($scope.stacks[0].user)
          $scope.newUser.primaryStack = $scope.stacks[0].user
         
        })
      
  }
  // getStacks();

  function getLocations(){

    userFactory.getLocations(function(data){
        $scope.locations = data; 
        console.log($scope.locations)
        console.log($scope.locations[0].name)
        console.log($scope.newUser)
        $scope.newUser.primaryLocation = $scope.locations[0].name
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
      console.log(changeUser);
       // this is form data getting passed through from HTML View
        userFactory.createUser(changeUser,function(){ 
          $scope.changeUser = {};    // sets input fields to clear.
          $location.path('/dashboard/my-profile');
          getUsers();              
        })
      }

  // var id = $routeParams.id

  // console.log(id, "coming from the controller")

  // function getJobsDetail(inputId){

  //     jobFactory.getJobsDetail(inputId, function(data){
  //         console.log(data, "from Factory, back into Controller");
  //         $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
  //       })

  // }
  // getJobsDetail(id);

      // $scope.login = function(user){
      //       loginFactory.login(user, function(){

      //       loginFactory.getUser(function(user){
      //       console.log(user);
      //       // $location.path('/userUpdate');

      //       })

      //    })
      //   }

      // loginFactory.getUser(function(user){
      //       // console.log(user);
      //       $scope.currentUser = user;
      //   })

      //  console.log($scope.currentUser)