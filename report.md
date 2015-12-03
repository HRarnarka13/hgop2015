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
