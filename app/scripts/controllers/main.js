'use strict';

angular.module('batuApp')
  .controller('MainCtrl', function ($scope) {
    $scope.videoCollection = [
        { link: "0KSOMA3QBU0", start: 30, watched: false },
        { link: "hHimjVYsd6I", start: 20, watched: false },
        { link: "kHue-HaXXzg", start: 10, watched: false }]

    $scope.groupedCollection = _.groupBy($scope.videoCollection, 'watched');

    $scope.$watch('videoCollection', function() {
      $scope.groupedCollection = _.groupBy($scope.videoCollection, 'watched');
    }, true);

//      { link: "t1DZfMfJ63M", start: 0, watched: false },
//      { link: "7rEyS90qpDk", start: 0, watched: false },
//      { link: "eCuYHYdLc_s", start: 0, watched: false },
//      { link: "IbC5kEUIgF4", start: 0, watched: false },
//      { link: "IvLXoWs00Rs", start: 0, watched: false },
//      { link: "nNRm_SVo86k", start: 0, watched: false },
//      { link: "weM6f7ctNXw", start: 0, watched: false },
//      { link: "2zzzRiy7L4Y", start: 0, watched: false },
//      { link: "ie_t_uJTibA", start: 0, watched: false },
//      { link: "50n0xLkV9Mo", start: 0, watched: false },
//      { link: "abJh99APBaA", start: 0, watched: false },
//      { link: "qm-UvTyLN-E", start: 0, watched: false },
//      { link: "5d47OFYeb-g", start: 0, watched: false },
//      { link: "9ncjTGtMe20", start: 0, watched: false },
//      { link: "qRsHZaeIOi4", start: 0, watched: false },
//      { link: "n7ogS7chMis", start: 0, watched: false },
//      { link: "_tVO56JlUxs", start: 0, watched: false },
//      { link: "rar-4aSxGYA", start: 0, watched: false },
//      { link: "VDZBlD8O6Ys", start: 0, watched: false },
//      { link: "RBWNcaVV_8M", start: 0, watched: false },
//      { link: "oAmaXFqRAIQ", start: 0, watched: false },
//      { link: "FSJGTKDc114", start: 0, watched: false },
//      { link: "OxAVUPt-Wi8", start: 0, watched: false },
//      { link: "2WlFXCWJcWg", start: 0, watched: false },
//      { link: "O7_rwXjkLzA", start: 0, watched: false },
//      { link: "AjIq4s8m2WU", start: 0, watched: false },
//      { link: "FU2L-U9ky44", start: 0, watched: false },
//      { link: "IzSZO7JTqhE", start: 0, watched: false },
//      { link: "OuuvDFOEBKU", start: 0, watched: false },
//      { link: "AVuHBHYFV_8", start: 0, watched: false },
//      { link: "NWF1521xMb4", start: 0, watched: false },
//      { link: "gEMcKbgZ0No", start: 0, watched: false }

  }).directive('youtube',function(){
    return {
      restrict: 'E',
      template:
        '<h1>{{timer}}</h1><div id="ytplayer"></div>'+
        '<p><a class="btn btn-lg btn-success" data-ng-click="nextVideo()">Next</a></p>',
      scope: {
        videos: "="
      },
      controller: function($scope, $element, $timeout) {

        function startVideo(){
          var timerClick = function(){
            $timeout(function() {
              if ($scope.timer > 0 ) {
                $scope.timer--;
                $scope.$apply();
                timerClick();
              }
              else{
                $scope.player.seekTo($scope.currentVideo.start).playVideo();
              }
            } , 1000);
          };

          $scope.player.seekTo(0.5).pauseVideo();
          timerClick();
        }

        function nextIfFinished(e){
          if (e.data == 0){
            $scope.nextVideo();
          }
        }

        $scope.nextVideo = function() {
          var nextVideo = $scope.getRandomVideo();

          $scope.timer = 5;

          console.info("Loading Video "+ nextVideo.link);
          $scope.player.loadVideoById(nextVideo.link);
          startVideo();
        };

        $scope.getRandomVideo = function(){
          var numWatchedChecked = 0,
              exhaustedList = false;

          this.currentVideo =  this.videos[Math.floor(Math.random()* this.videos.length)];

          while ( this.currentVideo.watched == true && exhaustedList == false) {
            this.currentVideo =  this.videos[Math.floor(Math.random()* this.videos.length)];
            numWatchedChecked++;

            if (numWatchedChecked !== this.videos.length) exhaustedList = true;
          }

          this.currentVideo.watched = true;
          return this.currentVideo;
        };

        $scope.onYoutubeReady= function () {
          $scope.currentVideo = $scope.getRandomVideo();
          $scope.player = new YT.Player('ytplayer', {
            videoId: $scope.currentVideo.link,
            events: {
              'onReady': startVideo,
              'onStateChange': nextIfFinished
            }
          });

        };
      },

      link: function(scope, element, attr){
        scope.timer = 7;
        var tag = document.createElement('script');
        var firstScriptTag = document.getElementsByTagName('script')[0];
        tag.src = "https://www.youtube.com/player_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = scope.onYoutubeReady;
      }
    }
  });
