goog.provide("com.project.MyAppModule");goog.require("com.project.controller.MainController");angular.module("MyApp").controller("MainController",com.project.controller.MainController);goog.provide("com.project.controller.MainController");com.project.controller.MainController=function MainController($scope){$scope.title="Hello world !"};