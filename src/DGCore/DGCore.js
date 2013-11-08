L.DG = L.DG || {};

L.DG.loaderParams = window.loaderBackup;

window.loaderBackup = undefined;

L.Icon.Default.imagePath  = '__BASE_URL__/img/vendors/leaflet';

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', '__GA_CODE__', 'none');
ga('send', 'pageview');
