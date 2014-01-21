/*global describe:false, it:false, expect:false, beforeEach:false, afterEach:false */
describe('L.DG.ProjectDetector', function () {
    var map,
        mapContainer = document.createElement('div'),
        loadProjectList,
        initZoom = 17,
        maxZoom = 18,
        maxDesertZoom = 13,
        start =        new L.LatLng(54.98117239821992, 82.88922250270844),
        project1 =     new L.LatLng(54.97902673261798, 82.819265127182),
        project2 =     new L.LatLng(54.98620210307464, 73.41429233551025),
        edgeProject1 = new L.LatLng(55.24446959522988, 82.85625815391539),
        edgeProject2 = new L.LatLng(55.27354174049191, 82.869873046875),
        edgeProject3 = new L.LatLng(55.28664323349526, 82.87656784057617),
        desert1 =      new L.LatLng(54.89635451954825, 82.40295410156249),
        desert2 =      new L.LatLng(61.1128985047811, 89.5414924621582),
        projects = [{"name":"Lemesos","type":"project","code":"limassol","min_zoom_level":11,"max_zoom_level":18,"bound":"POLYGON((32.8183135920422 34.7703607919795,33.1907346326954 34.7703607919795,33.1907346326954 34.543828645208,32.8183135920422 34.543828645208,32.8183135920422 34.7703607919795))","time_zone":"Europe\/Zaporozhye","time_zone_as_offset":120},{"name":"Praha","type":"project","code":"praha","min_zoom_level":10,"max_zoom_level":18,"bound":"POLYGON((14.2155277217641 50.1810860619148,14.7152445223582 50.1810860619148,14.7152445223582 49.9348969044027,14.2155277217641 49.9348969044027,14.2155277217641 50.1810860619148))","time_zone":"Europe\/Zurich","time_zone_as_offset":60},{"name":"Venezia e Padova","type":"project","code":"padova","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((11.3550232431058 45.7336769386342,12.611989529238 45.7336769386342,12.611989529238 45.0713376558613,11.3550232431058 45.0713376558613,11.3550232431058 45.7336769386342))","time_zone":"Europe\/Zurich","time_zone_as_offset":60},{"name":"Абакан","type":"project","code":"abakan","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((91.1443354808024 53.9015992237795,91.826689329138 53.9015992237795,91.826689329138 53.5690755803025,91.1443354808024 53.5690755803025,91.1443354808024 53.9015992237795))","time_zone":"Australia\/Perth","time_zone_as_offset":480},{"name":"Алматы","type":"project","code":"almaty","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((76.7159906086165 43.4691063161784,77.1084003112355 43.4691063161784,77.1084003112355 43.1080512730024,76.7159906086165 43.1080512730024,76.7159906086165 43.4691063161784))","time_zone":"Asia\/Almaty","time_zone_as_offset":360},{"name":"Архангельск","type":"project","code":"arkhangelsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.4581178651341 64.829966403236,41.3211748574 64.829966403236,41.3211748574 64.2843047076855,39.4581178651341 64.2843047076855,39.4581178651341 64.829966403236))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Астрахань","type":"project","code":"astrakhan","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((47.8630461016742 46.5114180775335,48.1858117752579 46.5114180775335,48.1858117752579 46.2412594867321,47.8630461016742 46.2412594867321,47.8630461016742 46.5114180775335))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Барнаул","type":"project","code":"barnaul","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((83.445791543646 53.4866943787094,84.0879338153482 53.4866943787094,84.0879338153482 53.1585977639815,83.445791543646 53.1585977639815,83.445791543646 53.4866943787094))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Белгород","type":"project","code":"belgorod","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((36.4192775775134 50.7012709431762,36.7297789370099 50.7012709431762,36.7297789370099 50.4896544448627,36.4192775775134 50.4896544448627,36.4192775775134 50.7012709431762))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Бийск","type":"project","code":"biysk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((84.568894420535 52.6467046304258,85.4924852879421 52.6467046304258,85.4924852879421 51.8999054951212,84.568894420535 51.8999054951212,84.568894420535 52.6467046304258))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Благовещенск","type":"project","code":"blagoveshensk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((127.345035030866 50.601633844749,127.764412543488 50.601633844749,127.764412543488 50.2234615511951,127.345035030866 50.2234615511951,127.345035030866 50.601633844749))","time_zone":"Pacific\/Saipan","time_zone_as_offset":600},{"name":"Братск","type":"project","code":"bratsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((101.316437021012 56.4068095441501,102.052454363083 56.4068095441501,102.052454363083 55.9965499100207,101.316437021012 55.9965499100207,101.316437021012 56.4068095441501))","time_zone":"Pacific\/Palau","time_zone_as_offset":540},{"name":"Брянск","type":"project","code":"bryansk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((34.1154331071157 53.4315561531109,34.6044250284011 53.4315561531109,34.6044250284011 53.1385223887195,34.1154331071157 53.1385223887195,34.1154331071157 53.4315561531109))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Великий Новгород","type":"project","code":"v_novgorod","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((31.1313939658036 58.6836311885553,31.514693692228 58.6836311885553,31.514693692228 58.4604190778863,31.1313939658036 58.4604190778863,31.1313939658036 58.6836311885553))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Владивосток","type":"project","code":"vladivostok","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((131.558590918904 43.6161504283504,132.343684663405 43.6161504283504,132.343684663405 42.8034461962733,131.558590918904 42.8034461962733,131.558590918904 43.6161504283504))","time_zone":"Asia\/Vladivostok","time_zone_as_offset":660},{"name":"Владимир","type":"project","code":"vladimir","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((40.1651931763547 56.4678197756757,40.6951681229221 56.4678197756757,40.6951681229221 56.0282399788355,40.1651931763547 56.0282399788355,40.1651931763547 56.4678197756757))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Волгоград","type":"project","code":"volgograd","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((43.9705863645171 48.9266703613049,44.9308652223232 48.9266703613049,44.9308652223232 48.3141240444038,43.9705863645171 48.3141240444038,43.9705863645171 48.9266703613049))","time_zone":"Europe\/Volgograd","time_zone_as_offset":240},{"name":"Вологда","type":"project","code":"vologda","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.6083029156408 59.337288389142,40.0779393511801 59.337288389142,40.0779393511801 59.1505226712228,39.6083029156408 59.1505226712228,39.6083029156408 59.337288389142))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Воронеж","type":"project","code":"voronezh","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((38.9911585992457 51.9109947234458,39.6130839296287 51.9109947234458,39.6130839296287 51.4755906563113,38.9911585992457 51.4755906563113,38.9911585992457 51.9109947234458))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Горно-Алтайск","type":"project","code":"gornoaltaysk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((85.4846103707099 52.1564900586413,86.4583690514453 52.1564900586413,86.4583690514453 51.2492150790215,85.4846103707099 51.2492150790215,85.4846103707099 52.1564900586413))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Донецк","type":"project","code":"donetsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((37.5105114759006 48.1899247415993,38.2461880378159 48.1899247415993,38.2461880378159 47.7957685848065,37.5105114759006 47.7957685848065,37.5105114759006 48.1899247415993))","time_zone":"Europe\/Zaporozhye","time_zone_as_offset":120},{"name":"Екатеринбург","type":"project","code":"ekaterinburg","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((60.2323966028444 57.0360972950617,60.9432235374996 57.0360972950617,60.9432235374996 56.5987021513683,60.2323966028444 56.5987021513683,60.2323966028444 57.0360972950617))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Иваново","type":"project","code":"ivanovo","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((40.7975852145327 57.0895563685234,41.1894046521273 57.0895563685234,41.1894046521273 56.8913133125287,40.7975852145327 56.8913133125287,40.7975852145327 57.0895563685234))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Ижевск","type":"project","code":"izhevsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((52.931947454527 57.0578890076638,53.4956246141919 57.0578890076638,53.4956246141919 56.6675426922706,52.931947454527 56.6675426922706,52.931947454527 57.0578890076638))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Иркутск","type":"project","code":"irkutsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((103.618852658405 52.6495505924526,104.970806765846 52.6495505924526,104.970806765846 51.71044322791,103.618852658405 51.71044322791,103.618852658405 52.6495505924526))","time_zone":"Asia\/Irkutsk","time_zone_as_offset":540},{"name":"Йошкар-Ола","type":"project","code":"yoshkarola","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((47.5724319612788 56.7614824692299,48.1532971666374 56.7614824692299,48.1532971666374 56.507529087234,47.5724319612788 56.507529087234,47.5724319612788 56.7614824692299))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Казань","type":"project","code":"kazan","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((48.2911801325349 55.9985322454191,49.5354766550953 55.9985322454191,49.5354766550953 55.566624053452,48.2911801325349 55.566624053452,48.2911801325349 55.9985322454191))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Калининград","type":"project","code":"kaliningrad","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((19.8390821705064 55.0555187580569,20.6635158804632 55.0555187580569,20.6635158804632 54.5341371370183,19.8390821705064 54.5341371370183,19.8390821705064 55.0555187580569))","time_zone":"Europe\/Kaliningrad","time_zone_as_offset":180},{"name":"Калуга","type":"project","code":"kaluga","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((35.8948119939691 54.7685233492904,36.4822327003993 54.7685233492904,36.4822327003993 54.3210239210904,35.8948119939691 54.3210239210904,35.8948119939691 54.7685233492904))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Караганда","type":"project","code":"karaganda","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((72.8600516717155 50.1326229416705,73.4106297749905 50.1326229416705,73.4106297749905 49.6499299929693,72.8600516717155 49.6499299929693,72.8600516717155 50.1326229416705))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Кемерово","type":"project","code":"kemerovo","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((85.9450122055261 55.534060936619,86.2636635393156 55.534060936619,86.2636635393156 55.2625138534828,85.9450122055261 55.2625138534828,85.9450122055261 55.534060936619))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Киров","type":"project","code":"kirov","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((49.0367663770153 58.7970043549467,49.9477913088461 58.7970043549467,49.9477913088461 58.4004858814638,49.0367663770153 58.4004858814638,49.0367663770153 58.7970043549467))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Комсомольск-на-Амуре","type":"project","code":"komsomolsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((136.772703976375 50.7214130071246,137.258493330626 50.7214130071246,137.258493330626 50.1898153432413,136.772703976375 50.1898153432413,136.772703976375 50.7214130071246))","time_zone":"Pacific\/Pohnpei","time_zone_as_offset":660},{"name":"Кострома","type":"project","code":"kostroma","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((40.7214314528393 57.9243829592332,41.1518646210719 57.9243829592332,41.1518646210719 57.6757320796169,40.7214314528393 57.6757320796169,40.7214314528393 57.9243829592332))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Краснодар","type":"project","code":"krasnodar","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((38.6500825329286 45.2653815716135,39.378568391423 45.2653815716135,39.378568391423 44.9435556842374,38.6500825329286 44.9435556842374,38.6500825329286 45.2653815716135))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Красноярск","type":"project","code":"krasnoyarsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((92.1268459376017 56.3082630472407,93.5992902138613 56.3082630472407,93.5992902138613 55.8114064527312,92.1268459376017 55.8114064527312,92.1268459376017 56.3082630472407))","time_zone":"Asia\/Krasnoyarsk","time_zone_as_offset":480},{"name":"Курган","type":"project","code":"kurgan","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((65.1546618560043 55.5302726292226,65.4828564344487 55.5302726292226,65.4828564344487 55.3686573686872,65.1546618560043 55.3686573686872,65.1546618560043 55.5302726292226))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Курск","type":"project","code":"kursk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((35.8893687648263 51.8427867523533,36.4353464048192 51.8427867523533,36.4353464048192 51.5567990218178,35.8893687648263 51.5567990218178,35.8893687648263 51.8427867523533))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Ленинск-Кузнецкий","type":"project","code":"lenkuz","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((85.7501030293026 54.7742516715452,86.5029026824457 54.7742516715452,86.5029026824457 54.1794040540713,85.7501030293026 54.1794040540713,85.7501030293026 54.7742516715452))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Липецк","type":"project","code":"lipetsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.3744800921161 52.7198786830929,39.8233601265717 52.7198786830929,39.8233601265717 52.4905469440511,39.3744800921161 52.4905469440511,39.3744800921161 52.7198786830929))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Магнитогорск","type":"project","code":"magnitogorsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((58.5231189875691 53.9270252267218,59.504225650363 53.9270252267218,59.504225650363 53.2298646461804,58.5231189875691 53.2298646461804,58.5231189875691 53.9270252267218))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Миасс","type":"project","code":"miass","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((59.5219849349792 55.2802177424849,60.2583981024067 55.2802177424849,60.2583981024067 54.8881931036358,59.5219849349792 54.8881931036358,59.5219849349792 55.2802177424849))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Москва","type":"project","code":"moscow","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((36.7589630172697 56.1094646431598,38.2250238753343 56.1094646431598,38.2250238753343 55.1040131823858,36.7589630172697 55.1040131823858,36.7589630172697 56.1094646431598))","time_zone":"Europe\/Moscow","time_zone_as_offset":240},{"name":"Набережные Челны","type":"project","code":"nabchelny","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((51.7114250627923 55.8651827851689,52.6281801090742 55.8651827851689,52.6281801090742 55.5366754261869,51.7114250627923 55.5366754261869,51.7114250627923 55.8651827851689))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Находка","type":"project","code":"nahodka","min_zoom_level":10,"max_zoom_level":17,"bound":"POLYGON((132.750811364162 42.9073313394081,133.039450970134 42.9073313394081,133.039450970134 42.7221231267481,132.750811364162 42.7221231267481,132.750811364162 42.9073313394081))","time_zone":"Pacific\/Pohnpei","time_zone_as_offset":660},{"name":"Нижневартовск","type":"project","code":"nizhnevartovsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((75.9222574760157 61.1909353239084,77.0285826551402 61.1909353239084,77.0285826551402 60.8511815164376,75.9222574760157 60.8511815164376,75.9222574760157 61.1909353239084))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Нижний Новгород","type":"project","code":"n_novgorod","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((43.2970731728989 56.4774114874299,44.2548108996246 56.4774114874299,44.2548108996246 56.0722356564038,43.2970731728989 56.0722356564038,43.2970731728989 56.4774114874299))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Нижний Тагил","type":"project","code":"ntagil","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((59.7631849329553 58.091706774704,60.3478866084889 58.091706774704,60.3478866084889 57.7492987817313,59.7631849329553 57.7492987817313,59.7631849329553 58.091706774704))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Новокузнецк","type":"project","code":"novokuznetsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((86.5106241240682 54.1214728229079,87.4636562190994 54.1214728229079,87.4636562190994 53.4975545258678,86.5106241240682 53.4975545258678,86.5106241240682 54.1214728229079))","time_zone":"Asia\/Novokuznetsk","time_zone_as_offset":420},{"name":"Новороссийск","type":"project","code":"novorossiysk","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((36.9363062350806 45.22280442473,38.6732772529791 45.22280442473,38.6732772529791 44.3059631725153,36.9363062350806 44.3059631725153,36.9363062350806 45.22280442473))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Новосибирск","type":"project","code":"novosibirsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((82.5066233234198 55.249037769223,83.3965344871157 55.249037769223,83.3965344871157 54.5530320570113,82.5066233234198 54.5530320570113,82.5066233234198 55.249037769223))","time_zone":"Asia\/Novosibirsk","time_zone_as_offset":420},{"name":"Норильск","type":"project","code":"norilsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((87.2622339747384 69.5621896598204,88.5071759134767 69.5621896598204,88.5071759134767 69.2428196344497,87.2622339747384 69.2428196344497,87.2622339747384 69.5621896598204))","time_zone":"Australia\/Perth","time_zone_as_offset":480},{"name":"Ноябрьск","type":"project","code":"noyabrsk","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((74.3047801709086 63.8791873568909,76.2633721443781 63.8791873568909,76.2633721443781 63.0182507918518,74.3047801709086 63.0182507918518,74.3047801709086 63.8791873568909))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Одесса","type":"project","code":"odessa","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((30.5121680854324 46.6567177668446,30.9112859220699 46.6567177668446,30.9112859220699 46.2534222975053,30.5121680854324 46.2534222975053,30.5121680854324 46.6567177668446))","time_zone":"Europe\/Zaporozhye","time_zone_as_offset":120},{"name":"Омск","type":"project","code":"omsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((72.883518056689 55.4176310710521,73.7716648331788 55.4176310710521,73.7716648331788 54.7851241556674,72.883518056689 54.7851241556674,72.883518056689 55.4176310710521))","time_zone":"Asia\/Omsk","time_zone_as_offset":420},{"name":"Оренбург","type":"project","code":"orenburg","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((54.9204112356902 51.9359752023275,55.4962313537867 51.9359752023275,55.4962313537867 51.6634793808206,54.9204112356902 51.6634793808206,54.9204112356902 51.9359752023275))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Орёл","type":"project","code":"orel","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((35.8541701972106 53.1037386640493,36.3152979186558 53.1037386640493,36.3152979186558 52.8389951504268,35.8541701972106 52.8389951504268,35.8541701972106 53.1037386640493))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Пенза","type":"project","code":"penza","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((44.7954767845065 53.3490815670803,45.3588094778041 53.3490815670803,45.3588094778041 53.0655659161754,44.7954767845065 53.0655659161754,44.7954767845065 53.3490815670803))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Пермь","type":"project","code":"perm","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((55.6104748809282 58.2439106356996,56.6620402087532 58.2439106356996,56.6620402087532 57.6859949491016,55.6104748809282 57.6859949491016,55.6104748809282 58.2439106356996))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Петрозаводск","type":"project","code":"petrozavodsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((34.093363842709 61.9594766105241,34.7088502132655 61.9594766105241,34.7088502132655 61.6914725136005,34.093363842709 61.6914725136005,34.093363842709 61.9594766105241))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Псков","type":"project","code":"pskov","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((28.1635000334044 57.8891060930882,28.4915311018215 57.8891060930882,28.4915311018215 57.727138316075,28.1635000334044 57.727138316075,28.1635000334044 57.8891060930882))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Пятигорск (КМВ)","type":"project","code":"minvody","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((42.5968656498674 44.305201929524,43.5306793172343 44.305201929524,43.5306793172343 43.8079984032029,42.5968656498674 43.8079984032029,42.5968656498674 44.305201929524))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Ростов-на-Дону","type":"project","code":"rostov","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.3566267164155 47.3681525231047,39.9248376699902 47.3681525231047,39.9248376699902 47.0533140895731,39.3566267164155 47.0533140895731,39.3566267164155 47.3681525231047))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Рязань","type":"project","code":"ryazan","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.4328766898999 54.8820829158336,39.992107259768 54.8820829158336,39.992107259768 54.4873429848056,39.4328766898999 54.4873429848056,39.4328766898999 54.8820829158336))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Самара","type":"project","code":"samara","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((49.7777262785619 53.7133860270841,50.5244714120615 53.7133860270841,50.5244714120615 53.0390499995792,49.7777262785619 53.0390499995792,49.7777262785619 53.7133860270841))","time_zone":"Europe\/Samara","time_zone_as_offset":240},{"name":"Санкт-Петербург","type":"project","code":"spb","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((29.410887756725 60.2925612927829,31.027970564171 60.2925612927829,31.027970564171 59.5352624772159,29.410887756725 59.5352624772159,29.410887756725 60.2925612927829))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Саранск","type":"project","code":"saransk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((44.8670169698616 54.3019028733515,45.5117203775483 54.3019028733515,45.5117203775483 53.9846323603945,44.8670169698616 53.9846323603945,44.8670169698616 54.3019028733515))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Саратов","type":"project","code":"saratov","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((45.7306106846332 51.6998087344978,46.3147731603713 51.6998087344978,46.3147731603713 51.3531626713,45.7306106846332 51.3531626713,45.7306106846332 51.6998087344978))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Смоленск","type":"project","code":"smolensk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((31.755001504537 54.8893106581675,32.268672709278 54.8893106581675,32.268672709278 54.6878754215539,31.755001504537 54.6878754215539,31.755001504537 54.8893106581675))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Сочи","type":"project","code":"sochi","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((38.9364797786113 44.3548123256112,40.4885113521202 44.3548123256112,40.4885113521202 43.3632496178243,38.9364797786113 43.3632496178243,38.9364797786113 44.3548123256112))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Ставрополь","type":"project","code":"stavropol","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((41.6581173932345 45.2695582221529,42.3241147976975 45.2695582221529,42.3241147976975 44.8929300058697,41.6581173932345 44.8929300058697,41.6581173932345 45.2695582221529))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Старый Оскол","type":"project","code":"staroskol","min_zoom_level":10,"max_zoom_level":18,"bound":"POLYGON((37.7448617880573 51.3779382416146,37.9821663673034 51.3779382416146,37.9821663673034 51.2468620449607,37.7448617880573 51.2468620449607,37.7448617880573 51.3779382416146))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Стерлитамак","type":"project","code":"sterlitamak","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((55.8056723040713 53.7369874227043,56.1328304013248 53.7369874227043,56.1328304013248 53.3028757439775,55.8056723040713 53.3028757439775,55.8056723040713 53.7369874227043))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Сургут","type":"project","code":"surgut","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((72.3817595885874 61.408288116163,73.7971635369636 61.408288116163,73.7971635369636 60.9771607347465,72.3817595885874 60.9771607347465,72.3817595885874 61.408288116163))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Сыктывкар","type":"project","code":"syktyvkar","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((50.4315252222466 61.9227104218883,51.2750804067923 61.9227104218883,51.2750804067923 61.5703415869885,50.4315252222466 61.5703415869885,50.4315252222466 61.9227104218883))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Тамбов","type":"project","code":"tambov","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((41.2688277629305 52.8265633899279,41.6015800103696 52.8265633899279,41.6015800103696 52.5613159039571,41.2688277629305 52.5613159039571,41.2688277629305 52.8265633899279))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Тверь","type":"project","code":"tver","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((35.5310822632707 57.0175458226224,36.3143004975127 57.0175458226224,36.3143004975127 56.6655940070652,35.5310822632707 56.6655940070652,35.5310822632707 57.0175458226224))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Тобольск","type":"project","code":"tobolsk","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((68.0274608751772 58.3372050129794,68.6305907883326 58.3372050129794,68.6305907883326 58.0611371413038,68.0274608751772 58.0611371413038,68.0274608751772 58.3372050129794))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Тольятти","type":"project","code":"togliatti","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((48.9618270525066 53.7081249887268,49.7967348039349 53.7081249887268,49.7967348039349 53.0282107862855,48.9618270525066 53.0282107862855,48.9618270525066 53.7081249887268))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Томск","type":"project","code":"tomsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((84.7686556875534 56.595694351039,85.2465320170589 56.595694351039,85.2465320170589 56.3480256948222,84.7686556875534 56.3480256948222,84.7686556875534 56.595694351039))","time_zone":"Indian\/Christmas","time_zone_as_offset":420},{"name":"Тула","type":"project","code":"tula","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((37.4140448375009 54.3185426467232,38.4215849166292 54.3185426467232,38.4215849166292 53.8995391613665,37.4140448375009 53.8995391613665,37.4140448375009 54.3185426467232))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Тюмень","type":"project","code":"tyumen","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((65.213221269303 57.26989015109,66.6908512966203 57.26989015109,66.6908512966203 56.397677717337,65.213221269303 56.397677717337,65.213221269303 57.26989015109))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Улан-Удэ","type":"project","code":"ulanude","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((107.358424044587 52.0564826224552,107.990789312552 52.0564826224552,107.990789312552 51.6913513059764,107.358424044587 51.6913513059764,107.358424044587 52.0564826224552))","time_zone":"Pacific\/Palau","time_zone_as_offset":540},{"name":"Ульяновск","type":"project","code":"ulyanovsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((48.0311106659387 54.4707244363832,48.7744246493397 54.4707244363832,48.7744246493397 54.1049833223472,48.0311106659387 54.1049833223472,48.0311106659387 54.4707244363832))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Уссурийск","type":"project","code":"ussuriysk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((131.749240834979 43.9718774762456,132.142052299271 43.9718774762456,132.142052299271 43.7080787964851,131.749240834979 43.7080787964851,131.749240834979 43.9718774762456))","time_zone":"Pacific\/Pohnpei","time_zone_as_offset":660},{"name":"Усть-Каменогорск","type":"project","code":"ustkam","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((82.4452167956114 50.0591923997841,82.8057165109743 50.0591923997841,82.8057165109743 49.8706923823373,82.4452167956114 49.8706923823373,82.4452167956114 50.0591923997841))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Уфа","type":"project","code":"ufa","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((55.715089903398 54.9572845119541,56.3124162040462 54.9572845119541,56.3124162040462 54.4785240916387,55.715089903398 54.4785240916387,55.715089903398 54.9572845119541))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Хабаровск","type":"project","code":"khabarovsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((134.873582147119 48.6071037196206,135.259035742696 48.6071037196206,135.259035742696 48.288577932731,134.873582147119 48.288577932731,134.873582147119 48.6071037196206))","time_zone":"Pacific\/Pohnpei","time_zone_as_offset":660},{"name":"Чебоксары","type":"project","code":"cheboksary","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((46.9895856527478 56.342026157718,47.6057602510651 56.342026157718,47.6057602510651 55.9808449646861,46.9895856527478 55.9808449646861,46.9895856527478 56.342026157718))","time_zone":"Indian\/Reunion","time_zone_as_offset":240},{"name":"Челябинск","type":"project","code":"chelyabinsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((61.1854857899909 55.3198263279035,61.7445803307041 55.3198263279035,61.7445803307041 54.9904624310221,61.1854857899909 54.9904624310221,61.1854857899909 55.3198263279035))","time_zone":"Indian\/Chagos","time_zone_as_offset":360},{"name":"Чита","type":"project","code":"chita","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((113.102112402006 52.1861143497386,113.639183600866 52.1861143497386,113.639183600866 51.9265020524875,113.102112402006 51.9265020524875,113.102112402006 52.1861143497386))","time_zone":"Pacific\/Saipan","time_zone_as_offset":600},{"name":"Южно-Сахалинск","type":"project","code":"yuzhnosakhalinsk","min_zoom_level":9,"max_zoom_level":17,"bound":"POLYGON((142.447679651114 47.5156338136541,142.971757647491 47.5156338136541,142.971757647491 46.5832086203485,142.447679651114 46.5832086203485,142.447679651114 47.5156338136541))","time_zone":"Pacific\/Pohnpei","time_zone_as_offset":660},{"name":"Якутск","type":"project","code":"yakutsk","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((129.525801926374 62.1878305569161,129.99230258239 62.1878305569161,129.99230258239 61.8005014397561,129.525801926374 61.8005014397561,129.525801926374 62.1878305569161))","time_zone":"Asia\/Yakutsk","time_zone_as_offset":600},{"name":"Ярославль","type":"project","code":"yaroslavl","min_zoom_level":9,"max_zoom_level":18,"bound":"POLYGON((39.7178413595536 57.7761985701891,40.0128826721599 57.7761985701891,40.0128826721599 57.5193090554516,39.7178413595536 57.5193090554516,39.7178413595536 57.7761985701891))","time_zone":"Indian\/Reunion","time_zone_as_offset":240}];

    function wktToBnd(wkt) {
        var arr,
            pointsArr,
            bracketsContent,
            regExp,
            southWest,
            northEast;

        wkt = wkt.replace(/, /g, ',');
        wkt.replace(' (', '(');

        arr = /^POLYGON\((.*)\)/.exec(wkt);
        regExp = /\((.*?)\)/g;

        bracketsContent = (regExp).exec(arr[1]);
        pointsArr = bracketsContent[1].split(',');
        southWest = pointsArr[0].split(' ');
        northEast = pointsArr[2].split(' ');

        return new L.LatLngBounds([parseFloat(southWest[1]), parseFloat(southWest[0])],
            [parseFloat(northEast[1]), parseFloat(northEast[0])]
        );
    }

    document.body.appendChild(mapContainer);
    mapContainer.style.width = 1900 + 'px';
    mapContainer.style.height = 600 + 'px';

    beforeEach(function () {

        loadProjectList = sinon.stub(L.DG.ProjectDetector.prototype, '_loadProjectList', function () {
            var projectsList = projects,
                verts, path;
            projectsList.forEach(function (project) {
                project.LatLngBounds = wktToBnd(project.bound);
            });

            this.projectsList = projectsList;
            this._searchProject();
        });

        map = new L.Map(mapContainer, {
            center: start,
            'zoom': 17,
            'geoclicker': true,
            'zoomAnimation': false
        });
    });

    afterEach(function () {
        map.remove();
        map = null;
        loadProjectList.restore();
    });

    describe('#setView', function () {

        it('go to from project to project', function () {
            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to from desert to project', function () {
            map.setView(desert1, maxZoom);
            expect(map.setView(project1, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

         it('go to from project1 to project2', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(project2)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project2);
        });

        it('go to from project to desert', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(desert1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to from desert1 to desert2', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.setView(desert2)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert2);
        });

        it('go to from desert1 to desert2', function () {
            map.setView(project1, maxZoom);

            expect(map.setView(edgeProject1)).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(edgeProject1);
        });

    });

    describe('#setZoom', function () {

        it('go to 18 zoom level in desert', function () {
            map.setView(desert1, maxDesertZoom);

            map.setZoom(maxZoom);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('go to 18 zoom level from 0', function () {
            map.setView(project1, 0);

            map.setZoom(maxZoom);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to 0 zoom level from 18', function () {
            map.setView(project1, maxZoom);

            map.setZoom(0);
            expect(map.getZoom()).to.be(0);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('go to max zoom level + 1', function () {
            map.setZoom(map.getMaxZoom() + 1);
            expect(map.getZoom()).to.be(map.getMaxZoom());
        });

        it('go to min zoom level - 1', function () {
            map.setZoom(map.getMinZoom() - 1);
            expect(map.getZoom()).to.be(map.getMinZoom());
        });
    });

    describe('#zoomIn', function () {

        it('call on maxZoom', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.zoomIn()).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('call on 16 level', function () {
            map.setView(desert1, 10);

            expect(map.zoomIn()).to.be(map);
            expect(map.getZoom()).to.be(11);
        });

    });

    describe('#zoomOut', function () {

        it('call on minZoom', function () {
            map.setView(desert1, 0);

            expect(map.zoomOut()).to.be(map);
            expect(map.getZoom()).to.be(0);
        });

        it('call on 16 level', function () {
            map.setView(desert1, 10);

            expect(map.zoomOut()).to.be(map);
            expect(map.getZoom()).to.be(9);
        });

    });

    describe('#setZoomAround', function () {

        it('zoom to other project', function () {
            map.setView(project1);

            expect(map.setZoomAround(project2, maxZoom)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('zoom in the project', function () {
            map.setView(start, 13);

            expect(map.setZoomAround(project1, maxZoom)).to.be(map);
            expect(map.getBounds().contains(project1)).to.be.ok();
            expect(map.getZoom()).to.be(maxZoom);
        });

        it('zoom in the project edge', function () {
            map.setView(edgeProject1, 12);

            expect(map.setZoomAround(edgeProject2, maxZoom)).to.be(map);
            expect(map.getBounds().contains(edgeProject2)).to.be.ok();
            expect(map.getZoom()).to.be(maxDesertZoom);
        });
    });

    describe('#fitBounds', function () {

        it('bound on project edge', function () {
            map.setView(project1, 8);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject1, edgeProject2))).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 8);

            expect(map.fitBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on project1 from project2 small zoom', function () {
            map.setView(project2, 8);

            expect(map.fitBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on desert from project1 max zoom', function () {
            map.setView(project1, 18);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });

        it('bound on desert from desert small zoom', function () {
            map.setView(edgeProject2, 8);

            expect(map.fitBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });
    });

    describe('#fitWorld', function () {

        it('fire from max zoom', function () {
            map.setView(project1, maxZoom);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });

        it('fire from min zoom', function () {
            map.setView(project1, 0);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });

        it('fire after min zoom 15', function () {
            map.setZoom(15);

            expect(map.fitWorld()).to.be(map);
            expect(map.getZoom()).to.be(1);
        });
    });

    describe('#panTo', function () {

        it('fire on project2 from project1', function () {
            map.setView(project1, 16);

            expect(map.panTo(project2)).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.be.equal(project2);
        });

        it('fire on desert from project1 max zoom', function () {
            map.setView(project1, maxZoom);

            expect(map.panTo(desert1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(desert1);
        });

        it('fire on project1 from desert', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.panTo(project1)).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(project1);
        });

        it('fire on project1 from project1', function () {
            map.setView(start, 15);

            expect(map.panTo(project1)).to.be(map);
            expect(map.getZoom()).to.be(15);
            expect(map.getCenter().distanceTo(project1)).to.be.below(15);
        });
    });

    describe('#panInsideBounds', function () {

        it('bound on project1 from project2', function () {
            map.setView(project2, 15);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

        it('bound on desert from project1 max zoom', function () {
            map.setView(project1, 18);

            expect(map.panInsideBounds(new L.LatLngBounds(edgeProject2, edgeProject3))).to.be(map);
            expect(map.getZoom()).to.be(13);
        });

        it('bound on project1 from desert', function () {
            map.setView(desert1, maxDesertZoom);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
        });

        it('bound on project1 from project1 small zoom', function () {
            map.setView(project1, 15);

            expect(map.panInsideBounds(new L.LatLngBounds(project1, start))).to.be(map);
            expect(map.getZoom()).to.be(15);
        });

    });

    describe('#panBy', function () {

        it('fire with viewport size', function () {
            map.setView(project1, 16);

            expect(map.panBy([1901, 601])).to.be(map);
            expect(map.getZoom()).to.be(16);
            expect(map.getCenter()).to.be.eql(new L.LatLng(54.971628386497684, 82.86006689071654));
        });

        it('fire on project edge from desert', function () {
            map.setView(edgeProject1, maxZoom);

            expect(map.panBy([0, -2000])).to.be(map);
            expect(map.getZoom()).to.be(maxDesertZoom);
            expect(map.getCenter()).to.be.equal(new L.LatLng(55.250493647659134, 82.85625815391539));
        });

        it('fire on project viewport', function () {
            map.setView(project1, maxZoom);

            expect(map.panBy([100, -200])).to.be(map);
            expect(map.getZoom()).to.be(maxZoom);
            expect(map.getCenter()).to.be.eql(new L.LatLng(54.97964243031826, 82.81980156898499));
        });

    });

    describe('#MaxZoom in options', function () {

        it('set less max project zoom and zoom to 20 in project', function () {
            expect(map.options.maxZoom = 16).to.be.equal(16);

            map.setView(project1, 20);

            expect(map.getZoom()).to.be.equal(16);
        });

        it('set less max project zoom and zoom to 20 in desert', function () {
            expect(map.options.maxZoom = 16).to.be.equal(16);

            map.setView(desert1, 20);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

        it('set more max project zoom and zoom to 20 in project', function () {
            expect(map.options.maxZoom = 19).to.be.equal(19);

            map.setView(project1, 20);

            expect(map.getZoom()).to.be.equal(19);
        });

        it('set more max project zoom and zoom to 20 in desert', function () {
            expect(map.options.maxZoom = 19).to.be.equal(19);

            map.setView(desert1, 20);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });

    });

    describe('#multiLayers', function () {
        var cloudmade2;
        beforeEach(function () {
            function getCloudMadeUrl(styleId) {
                return 'http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/' + styleId + '/256/{z}/{x}/{y}.png';
            }
            cloudmade2 = L.tileLayer(getCloudMadeUrl(998), {attribution: 'Hello world', minZoom: 5, maxZoom: 18}).addTo(map);
        });

        afterEach(function () {
            map.removeLayer(cloudmade2);
        });

        it('zoom to 18 in desert with added layer', function () {
            map.setView(desert1, maxZoom);

            expect(map.getZoom()).to.be.equal(maxZoom);
        });

        it('zoom to 18 in desert with remove layer', function () {
            map.removeLayer(cloudmade2);
            map.setView(desert1, maxZoom);

            expect(map.getZoom()).to.be.equal(maxDesertZoom);
        });
    });

    describe('#isProjectHere', function () {

        it('without params', function () {
            expect(map.projectDetector.isProjectHere()).to.not.be.ok();
        });

        it('in desert', function () {
            expect(map.projectDetector.isProjectHere(desert1)).to.not.be.ok();
        });

        it('in project', function () {
            expect(map.projectDetector.isProjectHere(project1)).to.have.property('name');
            expect(map.projectDetector.isProjectHere(project1).code).to.be.eql('novosibirsk');
        });
    });
});
