'use strict';
var App;
(function(App) {
    angular.module('app', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages'])
        .config(function($routeProvider, $locationProvider, $httpProvider) {
            $routeProvider.when('/', {
                    templateUrl: '/templates/Home.html',
                    controller: app.Controllers.HomeController,
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('HTTPFactory');
        });
})(App || (App = {}));

"use strict";
/*Only needed for the controls*/
var phone = document.getElementById("phone_1"),
    iframe = document.getElementById("frame_1");

/*View*/
function updateView(view) {
    if (view) {
        phone.className = "phone view_" + view;
    }
}

/*Controls*/
function updateIframe() {
    iframe.src = document.getElementById("iframeURL").value;

    phone.style.width = document.getElementById("iframeWidth").value + "px";
    phone.style.height = document.getElementById("iframeHeight").value + "px";

    /*Idea by /u/aerosole*/
    document.getElementById("wrapper").style.perspective = (
        document.getElementById("iframePerspective").checked ? "1000px" : "none"
    );
}
updateIframe();

/*Events*/
document.getElementById("controls").addEventListener("change", function() {
    updateIframe();
});

document.getElementById("views").addEventListener("click", function(evt) {
    updateView(evt.target.value);
});
'use strict';
var app;
(function(app) {
    var Controllers;
    (function(Controllers) {
        var HomeController = (function() {
            function HomeController(HomeService) {
                this.HomeService = HomeService;
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));

"use strict";
var app;
(function(app) {
    var Services;
    (function(Services) {
        angular.module('app').factory('HTTPFactory', function($window) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};
                    config.headers['Accepts'] = 'application/json';
                    config.headers['Content-Type'] = 'application/json';
                    return config;
                }
            };
        });
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));

"use strict";
var app;
(function(app) {
    var Services;
    (function(Services) {
        var HomeService = (function() {
            function HomeService() {}
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));