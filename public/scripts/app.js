angular
    .module("ibm-watson",
    [
        "ngRoute",
        "ui.bootstrap"

    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/scripts/views/tone_analyzer.html",
                controller: "ToneAnalyzerController",
                controllerAs: "tac"
            })
            .when("/conversation", {
                templateUrl: "/scripts/views/conversation.html",
                controller: "ConversationController",
                controllerAs: "sc"
            })
            .otherwise({
                redirectTo: "/"
            })
    }])
    .controller("ToneAnalyzerController", ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
        var vm = this;
        vm.helloWorld = "Hello worlds";
        vm.helloworld2 = "hi";
        vm.msg = ""
        vm.errors = undefined
        vm.analyze = function () {
            console.log("msg", vm.msg);
            var options = {
                url: "/api/tone-analyzer",
                method: "POST",
                data: {
                    msg:vm.msg
                }
            }
            $http(options).then(function (success) {
                console.log("function",success)
               var  data = success.data
               if (data.success){
                   vm.tones = data.tone.document_tone.tone_categories
                   vm.text = data.text
                   console.log(vm.tones)
               }else {
                   vm.errors = data.err
               }
            }, function (err) {
                console.log("function",err)
            })
        }
    }])
    .controller("ConversationController", ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
        var vm = this;
        vm.helloWorld = "Hello worlds";
        vm.helloworld2 = "hi";
    }])
    .controller("NavBarController", ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
        var vm = this;
        vm.helloWorld = "Hello worlds";
        vm.brand = "NeilTran94";
        vm.routeMap = {
            "": "ToneAnalyzer",
            "conversation": "Conversation"
        }
        $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl, newState, oldState) {

            tokenizeUrl = newUrl.split("/")
            lastPart = tokenizeUrl[tokenizeUrl.length - 1]
            vm.currentState = vm.routeMap[lastPart];

        })
    }])