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
                controllerAs: "sc",
                resolve: {
                    initial_context: function ($http) {
                        return { "intents": [], "entities": [], "input": {}, "output": { "log_messages": [], "text": ["Hi. It looks like a nice drive today. What would you like me to do?  "], "nodes_visited": ["Start And Initialize Context"] }, "context": { "conversation_id": "6c3dfb23-3002-464c-bc46-7b6aec969e5f", "system": { "dialog_stack": [{ "dialog_node": "root" }], "dialog_turn_counter": 1, "dialog_request_counter": 1, "_node_output_map": { "Start And Initialize Context": [0, 0] }, "branch_exited": true, "branch_exited_reason": "completed" }, "AConoff": "off", "lightonoff": "off", "musiconoff": "off", "appl_action": "", "heateronoff": "off", "volumeonoff": "off", "wipersonoff": "off", "default_counter": 0 } }
                        /*return $http.get("/api/conversation").then(function (success) {
                            return success.data.tone
                        }, function (error) {
                            return error
                        })*/
                    }
                }
            })
            .otherwise({
                redirectTo: "/"
            })
    }])
    .directive('dlKeyCode', dlKeyCode)
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
                    msg: vm.msg
                }
            }
            $http(options).then(function (success) {
                console.log("function", success)
                var data = success.data
                if (data.success) {
                    vm.tones = data.tone.document_tone.tone_categories
                    vm.text = data.text
                    console.log(vm.tones)
                } else {
                    vm.errors = data.err
                }
            }, function (err) {
                console.log("function", err)
            })
        }
    }])
    .controller("ConversationController", ["$scope", "$interval", "$http", "initial_context", function ($scope, $interval, $http, initial_context) {
        var vm = this;
        vm.helloWorld = "Hello worlds";
        vm.helloworld2 = "hi";
        vm.context = initial_context.context;
        vm.watsonAvatar = "data:image/png;base64,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"

        vm.defaultUserAvatar = "data:image/jpeg;base64,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"

        vm.conversation = [];
        var watson_response = {
            entity: "watson",
            text: initial_context.output.text[0],
            avatar: vm.watsonAvatar
        }
        vm.conversation.push(watson_response)
        vm.submit = function (event) {
            vm.submitting = true;

            var options = {
                method: "POST",
                url: "/api/conversation",
                data: {
                    msg: vm.msg,
                    context: vm.context,
                }

            }
            $http(options).then(function (success) {

                vm.msg = "";
                var data = success.data;
                vm.context = data.tone.context;
                var watson_response = {
                    entity: "watson",
                    text: data.tone.output.text[data.tone.output.text.length - 1],
                    avatar: vm.watsonAvatar
                }
                var user_response = {
                    entity: "user",
                    text: data.text,
                       avatar: vm.defaultUserAvatar
                }
                vm.conversation.push(user_response)
                vm.conversation.push(watson_response)
                vm.submitting = false;
            }, function (error) {
                vm.submitting = false;
                console.log("error", error)
            })
        }
        vm.evaluateSubmission = function (event) {
            console.log(event)
        }
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

function dlKeyCode() {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element.bind("keypress", function (event) {
                var keyCode = event.which || event.keyCode;

                if (keyCode == $attrs.code) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.dlKeyCode, { $event: event });
                    });

                }
            });
        }
    };
}