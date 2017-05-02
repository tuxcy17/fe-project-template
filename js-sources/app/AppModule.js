goog.provide("com.project.MyAppModule");

goog.require("com.project.controller.MainController");

/**
 @ngInject
 */
angular.module('MyApp').controller('MainController', com.project.controller.MainController);
