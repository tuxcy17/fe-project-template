goog.provide("com.project.MyAppModule");

goog.require("com.project.controller.MainController");

angular.module('MyApp', []);
angular.module('MyApp').controller('MainController', com.project.controller.MainController);
