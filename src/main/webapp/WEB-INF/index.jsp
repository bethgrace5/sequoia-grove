<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html ng-app='sequoiaGroveApp'>

  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel='stylesheet' href='webjars/bootstrap/3.2.0/css/bootstrap.min.css'>
    <link rel="stylesheet" href="styles/main.scss">
    <!-- endbuild -->
  </head>
  <body ng-controller="MainCtrl">

    <header-menu></header-menu>

    <!-- main view -->
    <div id="main-content" class="container-fluid" ng-view=""></div>

    <footer-menu></footer-menu>

    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script type="text/javascript" src="webjars/jquery/2.1.1/jquery.min.js"></script>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script type="text/javascript" src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
    <script src="bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
    <!--script type="text/javascript" src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:js({.tmp,app}) scripts/scripts.js -->
    <script src="js/app.js"></script><!-- our controller -->
    <script src="js/controllers/about.js"></script>
    <script src="js/controllers/home.js"></script>
    <script src="js/controllers/employee.js"></script>
    <script src="js/controllers/login.js"></script>
    <script src="js/controllers/main.js"></script>
    <script src="js/controllers/request.js"></script>
    <script src="js/controllers/schedule.js"></script>
    <script src="js/directives/header-menu.js"></script>
    <script src="js/directives/footer-menu.js"></script>
    <script src="js/directives/schedule-edit.js"></script>
    <script src="js/directives/schedule-shift-edit.js"></script>
    <script src="js/directives/schedule-delivery-edit.js"></script>
    <script src="js/directives/schedule-view.js"></script>
    <script src="js/directives/employee-availibility.js"></script>
    <script src="js/directives/employee-info.js"></script>
    <script src="js/directives/request-history.js"></script>
    <script src="js/directives/request-pending.js"></script>
    <script src="js/directives/request-submit.js"></script>
    <!-- endbuild -->

</body>
</html>
