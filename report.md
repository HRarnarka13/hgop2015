# Report
## Vagrant
Vagrant er tól sem gefur þér aðgang að virtual vél. Eins og í þessu verkefni, setjum við upp sameignilega möppu fyrir source kóðan sem við setjum á virtual vélina með því að nota vagrant. Síðan erum við með aðra vél til þess að prófa verkefnið á. Þannig við erum með tvær vagrant tengingar í þessu verkefni, eina vél fyrir þróun (e. development) og aðra fyrir prófanir.

## VirtualBox
VirtualBox er forrit sem býður notandaum að keyra upp virtual vél á tölvunni sinni, tengjast henni og geta séð vélina á desktop. Þar með getur notandi sett um windows vél á macanum sínum og keyrt hana upp eins og hvert annað gluggaforrit. Með VirtualBox getum við tengst þróunarvélinni okkar t.d. séð hvort að Firefox vafrin keyris örugglega upp þegar við keyrum testin okkar.

## Grunt
Grunt er þjónusta sem hjápar forritum að keyra alls konar verkferla í JavaScript verkefnum. Það er stjórnað frá command line og automate-ar verkferla eins og t.d að pakka saman nokkrum javascript skrám í eina skrá og þjappa hana. Í okkar verkefni notum við grunt til þess að þjappa saman skrám keyra unit test og keyra hýsingu á localhost fyrir verkefnið okkar, þannig við getum tengst með því að fara t.d. á `localhost:9000`.

## NPM
NPM er umsjónarkerfi fyrir þróunar pakka (e. package manager), fyrir verkefni skrifuð í *nodejs*. Það gerir forritum auðvildara að viðhalda og sækja dependenies fyrir nodejs verkefni. Segjum sem svo að við erum að fara búa til vef þjónustu og við höfum ákveðið að nota `express` til þess að hjálpa okkur að gera apa (e. API). Þá getum við náð í kóðan sem við þrufum með því að keyra `npm install --save express` og þá sér npm um að sækja pakkan fyrir okkur.

## Nodejs
Nodejs er runtime umhverfi til þess að þróa vef-lausnir. Það er bæði óháð stýrikerfnum (e. cross-platform) og open-source. Nodejs lausnir eru skrifaðar í JavaScript og síðan er eru þær keyrðar með nodejs umhverfinu.

## Bower
Bower er einnig umsjónar kerfi fyrir pakka (e. package manager) fyrir javascript lausnir. Auðveldar uppsetingu og viðhald á javascript library-um. Segjum sem svo að við erum að gera vefsíðu og við höfum ákveðið að nota bootstrap til þess að hjálpa okkur að gera síðuna okkar fallegri. Þá getum við náð í bootstrap pakkan með því að keyra `bower install --save bootstrap`.

## Okkar ferli
Við erum með allan kóðan okkar bæði inná okkar vél og virtual vél sem við getum tengst með vagrant eða virtualbox. Við erum með kóðan í shared möppu þannig allar breytingar sem við gerum á okkar vél fer strax inn á þróunarvélina. Við erum með scriptu sem heitir `dockerbuild.sh` sem buildar með grunt og docker þannig allar breytingarnar eru tilbúinar til þess að prófa og pusha. Síðan getum við keyrt aðra scriptu `deploy` sem pushar breytingarnar á docker og sækjir og keyrir dockerbuildið á annari virtual vél sem við notum fyrir test.  Við erum með ssh tengingu á milli þrónunarvélarinnar og test vélarninnar.


## Day 9
### Load tests
Það var að taka mig um 4 og hálfa sekúndur að keyra 1000 leiki sem þar sem gert er 5 sinnum þar til annar notandinn vinnur. Þar með setti ég timeout í 6 sekúndur.

### Does the load test run in serial or in parallel?
Þar sem **Nodejs** er *asynchronous IO* eða *non-blocking IO* þá keyra *load testin* samhliða (in *parallel*). Hvert process býður ekki eftir að næsta er búið að keyra og niðurstöður komnar. Process fer á stað um leið o fyrra process hefur verið sent til velbúnaðarins í röð tilbúið fyrir keyrslu, niðrustöðurnar koma síðan seinna.

Í þessu verkefni má sjá í `server/fluid-api/tictactoeFluid.js` þá er fallið `executeCommand` asynchronous. Það tekur við einni skipun og síðan falli sem `executeCommand` kallar á þegar það er búið að keyra allar skipaninar (þegar `commands.length > 0`).

## Day 10
### Qustions
**What does this give us? Who would use the capability to track versions and why? Who would use capability to deploy any version and why?**

Þetta gefur okkur kleyft að hvert einasta commit á github er potential release með sitt eigið version númer. Þá geta líka önnur kerfi sem nota kerfið okkar notað eldri útgáfur af kerfinu okkar frekar auðveldlega.

**What was wrong with having docker push in the deployment script rather than in the `dockerbuild.sh` script?**

Þar sem testin og production þurfa ekkert endilega að keyra á sömu vel þá væri frekar lélegt að þrufa builda docker imageið á hveri vél, það er mun hreynna að pulla bara og runna.

**How does the "deploy any version, anywhere" build feature work? Hint: Track `GIT_COMMIT`**

Við getum núna bara áhveðið hvaða version við viljum að fari í production með því að senda með `GIT_COMMIT`-ið með þegar við buildum docker image og þá töggum við það með `GIT_COMMIT` og þá getum við nálgast það version.


## Jenkins scripts
### Commit stage
```
export DISPLAY=:0
export PATH=/sbin:/usr/sbin:/bin:/usr/local/bin
npm install
bower install
./dockerbuild.sh arnkari93/tictactoe
```

### Deploy test stage
```
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env
./deploy.sh 192.168.33.10 arnkari93/tictactoe $GIT_UPSTREAM_HASH 9000
```

### Acceptance stage
I made a script for this but it restarts the docker container so I only used it locally
```
export PATH=/sbin:/usr/sbin:/bin:/usr/local/bin
npm install
export ACCEPTANCE_URL=http://192.168.33.10:9000
grunt mochaTest:acceptance
```

### Capacity stage
I made a script for this but it restarts the docker container so I only used it locally
```
export PATH=/sbin:/usr/sbin:/bin:/usr/local/bin
npm install
export ACCEPTANCE_URL=http://192.168.33.10:9000
grunt mochaTest:load
```

### Deploy Production stage
```
export GIT_UPSTREAM_HASH=$(<dist/githash.txt)
env
./deploy.sh 192.168.33.10 arnkari93/tictactoe $GIT_UPSTREAM_HASH 9000
```
