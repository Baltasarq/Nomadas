// nomadas.js
/*  Juan Vélez llega a la colonia de Epicuren tras recibir la Corte del
 *  virreinato una petición de auxilio de sus habitantes. 
 * 
 *  generado por FI.JS@txtMap, v0.1/ v0.6 20140612
 *  Tue Jun 27 16:07:25 2017
 */

ctrl.setTitle( "Nómadas" );
ctrl.setIntro(
    "<p><i>Nómadas que buscan los ángulos de la tranquilidad,\
    <br/>en las nieblas del norte, en los tumultos civilizados,\
    <br/>entre los claros, oscuros, y la monotonía de los días que pasan,\
    <br/>caminante que vas,\
    <br/>buscando la paz en el crepúsculo.\
    <br/>La encontrarás...\
    <br/>la encontrarás,\
    <br/>al final de tu camino.\
    <br/>(...)\
    <br/>Como un extranjero no siento ataduras del sentimiento, (...)\
    <br/>Forastero que buscas,\
    <br/>la dimensión insondable,\
    <br/>la encontrarás,\
    <br/>fuera de la ciudad,\
    <br/>al final de tu camino.\
    <br/>Nómadas, </i>Franco Battiato</p>\
    <p>Juan Vélez llega a la colonia de Epicuren, por encargo del Virrey de \
    Nueva España. Un emisario había llegado hacía pocas semanas a la Corte \
    pidiendo ayuda para el asentamiento. Desgraciadamente, su viaje había sido \
    terrible y parecía no estar en sus cabales: hablaba de monstruos terribles.\
    </p>"
);

ctrl.setPic( "res/dock.jpg" );
ctrl.setAuthor( "baltasarq@gmail.com" );
ctrl.setVersion( "1.0 20170630" );

// *** Locs --

var locAsentamiento = ctrl.places.creaLoc(
	"Asentamiento",
	[ "asentamiento" ],
	"A la ${salida hacia el bosque sobre la colina, oeste}, te encuentras \
	con un pequeño ${asentamiento, ex poblado} en la ladera \
	de la cumbre de la colina. Varias ${cabañas, ex cabanas} se agarran \
	a la pendiente, de una forma un tanto desordenada."
);
locAsentamiento.pic = "res/settlement.jpg";

locAsentamiento.preExamine = function() {
    var toret = this.desc;

    if ( npcSuperviviente.status == 0 ) {
        toret += "<br/>Un ${hombre, habla con hombre} se encuentra \
                  sentado fuera de una de las \
                  cabañas. No parece haberte visto todavía.";
    }

    return toret;
}

var locBordeDelBosque = ctrl.places.creaLoc(
	"Borde del bosque",
	[ "borde del bosque" ],
	"Un ${bosque frondoso, ex selva} comienza al ${norte, n} de este lugar. El camino se interna en él desde el ${este, este}."
);
locBordeDelBosque.pic = "res/forest_dense.jpg";

var locBosquePocoDenso = ctrl.places.creaLoc(
	"Bosque poco denso",
	[ "bosque poco denso" ],
	"El camino atraviesa un ${bosque poco denso, ex sotobosque}, de ${oeste, oeste} a ${este, este}."
);
locBosquePocoDenso.pic = "res/forest_open.jpg";

var locCaminoDeLaMina = ctrl.places.creaLoc(
	"Camino de la mina",
	[ "camino de la mina" ],
	"Múltiples ${herramientas y restos abandonados, ex herramientas} \
	 se encuentran abandonados, esparcidos al borde del camino \
	 que de forma bastante llana discurre de ${este, este} a ${oeste, oeste}."
);
locCaminoDeLaMina.pic = "res/path_mine.jpg";

var locCaminoDeLaSierra = ctrl.places.creaLoc(
	"Camino de la sierra",
	[ "camino de la sierra" ],
	"Una senda ${parte abruptamente hacia las montañas, norte}, \
	escalando por entre ${rocas, ex rocas} \
	que parecen querer proteger ciertos pasos del viento. \
	El camino principal sigue la falda de la ${sierra, ex sierra} \
	de ${este, este} a ${oeste, oeste}."
);
locCaminoDeLaSierra.pic = "res/path_mountains.jpg";

objSierra = ctrl.creaObj(
    "sierra",
    [ "montanas", "falda" ],
    "La sierra se eleva hacia el ${norte, norte}.",
    locCaminoDeLaSierra,
    Ent.Scenery
);

locCaminoDeLaSierra.preGo = function() {
    var toret = "";
    
    if ( parser.sentence.term1 == "norte" ) {
        if ( npcSuperviviente.owner == locCaminoDeLaSierra ) {
            goAction.exe( parser.sentence );
            ++npcSuperviviente.status;
            toret = "${D. Diego, habla con Diego} te indica que más allá de \
                     de las montañas se encuentra una mina en la que \
                     la colonia trabajaba justo antes del ataque de los \
                     nómadas.";
        } else {
            toret = "No le ves sentido a continuar un fatigoso viaje, \
                     dejando atrás la zona de la colonia.";
        }
    } else {
        goAction.exe( parser.sentence );
    }
    
    return toret;
};

var locCaminoDeLosCultivos = ctrl.places.creaLoc(
	"Camino de los cultivos",
	[ "camino de los cultivos" ],
	"Una pista permite, el acceso a varios ${campos de cultivo, ex campos}. Desde aquí se ${puede llegar al bosque, oeste}, al oeste, ${desde una granja, este}, en lontananza, en sentido contrario."
);
locCaminoDeLosCultivos.pic = "res/path_farm.jpg";

var locCaminoDelLago = ctrl.places.creaLoc(
	"Camino del lago",
	[ "camino del lago" ],
	"Desde este lugar, puede apreciarse una pequeña ${vereda, ex vereda} que ${desciende hacia un lago, sur}, mientras el camino principal ${continúa hacia las montañas, oeste}."
);
locCaminoDelLago.pic = "res/path_mountain_lake.jpg";

var locCaminoDelMolino = ctrl.places.creaLoc(
	"Camino del molino",
	[ "camino del molino" ],
	"Una suave pendiente desde el ${este, este} lleva hasta el río, donde puedes ver que se asienta un ${molino, oeste}."
);
locCaminoDelMolino.pic = "res/path_mill_river.jpg";

var locCaminoDelMuelle = ctrl.places.creaLoc(
	"Camino del muelle",
	[ "camino del muelle" ],
	"El camino asciende suavemente la ladera de una ${colina, norte} cuya ${vegetación, ex vegetacion} se dispone alrededor del sendero, desde el ${embarcadero, sur}. ${Una senda, ex senda} desciende hacia el ${oeste, oeste}, supones que hacia un río, pues el suave murmullo puede oírse desde aquí."
);
locCaminoDelMuelle.pic = "res/path_from_docks.jpg";

var locCaminoHaciaElBosque = ctrl.places.creaLoc(
	"Camino hacia el bosque",
	[ "camino hacia el bosque" ],
	"En las lindes de un bosque. El camino se interna en la ${arboleda, ex arboleda} caminando hacia el ${este, este}, desde la plaza principal del ${pueblo, ex pueblo}, avanzando hacia el ${sur, sur}."
);
locCaminoHaciaElBosque.pic = "res/path_forest_border.jpg";

var locCirco = ctrl.places.creaLoc(
	"Circo",
	[ "circo" ],
	"El camino ha ascendido aquí hasta ${una depresión rodeada de picos, ex depresion} de distintas alturas. Se puede descender por dos lados, hacia un ${lago al sur, sur}, y hacia un ${cañón herboso al este, este}."
);
locCirco.pic = "res/depression.jpg";

var locClaroDelBosque = ctrl.places.creaLoc(
	"Claro del bosque",
	[ "claro" ],
	"Un ${hermoso claro, ex apertura} del bosque en el fondo del ${valle, ex valle}, escondido por la densa vegetación. Siguiendo la suave pendiente, puedes salir del claro ${hacia el centro del valle, e}."
);
locClaroDelBosque.pic = "res/clear_forest.jpg";

var locColinaBoscosa = ctrl.places.creaLoc(
	"Colina boscosa",
	[ "colina" ],
	"El bosque asciende por una suave colina, desde su ${interior, oeste}, hasta la ${cumbre de la colina misma, este}."
);
locColinaBoscosa.pic = "res/hill_forest.jpg";

var locColinas = ctrl.places.creaLoc(
	"Colinas",
	[ "lomas" ],
	"Las colinas ${escalan por sobre la zona residencial de Epicuren, sur}, ${hacia las faldas de las montañas, norte}. Desde aquí tienes una magnífica ${vista de la colonia, ex vista}."
);
locColinas.pic = "res/hills_north.jpg";

var objVista = ctrl.creaObj(
        "vista",
        [ "panorama" ],
        "La colonia parece una maqueta a tus pies, asentada sobre una \
        planicie pegada a la costa.",
        locColinas,
        Ent.Scenery
);


var locCruceDeCaminos = ctrl.places.creaLoc(
	"Cruce de caminos",
	[ "cruce de caminos" ],
	"${La senda, ex senda} se divide aquí en dos, hacia el ${sur, sur} y ${desde el interior de un bosque poco denso, oeste}, ${continúa hacia la salida del bosque, este}."
);
locCruceDeCaminos.pic = "res/path_divides.jpg";

var locEntradaDeLaMina = ctrl.places.creaLoc(
	"Entrada de la mina",
	[ "entrada" ],
	"Una ${boca oscura, ex mina} \
	guarda la entrada a una mina excavada en la roca. Un camino parte \
	de la mina hacia el ${oeste, oeste}."
);
locEntradaDeLaMina.pic = "res/mine_entrance.jpg";

var locEpicuren = ctrl.places.creaLoc(
	"Epicuren",
	[ "epicuren" ],
	"La plaza del pueblo de Epicuren, desde donde puedes ver \
	${la iglesia, ex iglesia}. Un camino sale hacia un \
	${bosque, ex bosque}, viajando al ${norte, norte}, otro continúa \
	${hacia la zona residencial, oeste}."
);
locEpicuren.pic = "res/town.jpg";

var locEscuela = ctrl.places.creaLoc(
	"Finca de la Escuela",
	[ "finca" ],
	"El edificio sin terminar para ${una escuela, ex escuela}. De nuevo, aunque el estado es de marcado abandono, y que está sin rematar, no está muy deteriorado. El camino que ${proviene del norte, n}, termina aquí."
);
locEscuela.pic = "res/school.jpg";

var locGranja = ctrl.places.creaLoc(
	"Granja",
	[ "granja" ],
	"Una ${granja, ex granero} en evidente estado de abandono, se sitúa en el centro de varios campos de cultivo, que se ${extienden hacia el oeste, oeste}."
);
locGranja.pic = "res/barn.jpg";

var locIglesia = ctrl.places.creaLoc(
	"Iglesia",
	[ "iglesia" ],
	"El interior de la iglesia, sombrío y húmedo, te resulta desagradable. Puedes ver un ${altar, ex altar} a medio construir... el resto del edificio está vacío. Solo se puede ${salir, salir}."
);
locIglesia.pic = "res/church.jpg";
locIglesia.preExit = function() {
    ctrl.goto( locEpicuren );
    return "La claridad daña temporalmente tus ojos.";
}

var locInteriorDelBosque = ctrl.places.creaLoc(
	"Interior del bosque",
	[ "interior del bosque" ],
	"El ${camino, ex pista} se bifurca aquí para permitir caminar hacia el ${este, este}, o en sentido contrario, ${bajando hacia un pequeño valle, oeste}. Una pequeña depresión ${encamina al paso del río, sur}. El bosque empieza a mostrar mucha ${vegetación, ex arbustos} aquí, hasta el punto de que por momentos es complicado avanzar."
);
locInteriorDelBosque.pic = "res/path_inside_forest.jpg";
locInteriorDelBosque.preGo = function() {
    var toret = "";
    
    if ( parser.sentence.term1 == "sur" ) {
        toret = "Has cruzado el puente con mucho cuidado.";
    }
    
    goAction.exe( parser.sentence );
    return toret;
};

var locLago = ctrl.places.creaLoc(
	"Promontorio",
	[],
	"El camino se torna menos pedregoso a medida que se aleja de la orilla ${hacia las montañas, norte}. Puedes ver una ${casa, ex casa} en un pequeño promontorio sobre la ${superficie del agua, ex lago}."
);
locLago.pic = "res/house_lake.jpg";

var objCuevaLago = ctrl.creaObj(
    "cueva",
    [],
    "En lontananza, se puede ver una cueva con una apertura sobre \
    la superficie del agua, junto a una pequeña playa de guijarros.",
    locLago,
    Ent.Scenery
);

var locHabitacionCasaLago = ctrl.places.creaLoc(
    "habitación",
    [ "habitacion", "estancia", "casa" ],
    "La habitación en la que te encuentras es la mejor. \
     El resto está demasiado sucio \
     como para que te interesa. Apenas sí se puede ver por las ventanas. \
     Puedes ${salir, sal}."
);
locHabitacionCasaLago.pic = "res/room.jpg";
locHabitacionCasaLago.preExit = function() {
    return ctrl.goto( locLago );
};

var objRemo = ctrl.creaObj(
    "remo",
    [ "pala" ],
    "Una pala en buenas condiciones.",
    locHabitacionCasaLago,
    Ent.Portable
);

var locOrillaLago = ctrl.places.creaLoc(
    "Orilla opuesta",
    [],
    "Los guijarros de la reducida playa crujen bajo tus pies. \
     La entrada a la cueva está al pie mismo de la playa, \
     ligeramente ladeada con respecto a la misma. \
     Se puede ${entrar, este} sin complicaciones. \
     Has varado ${el bote, ex bote} en la orilla."
);
locOrillaLago.pic = "res/lake_shore.jpg";

var locCueva = ctrl.places.creaLoc(
    "Cueva",
    [ "astillero" ],
    "Dentro de la cueva encuentras varios ${restos, ex restos} \
     que te hacen pensar en que se le dio un uso de astillero a la misma. Seguramente es donde se construyó el bote en el que llegaste. \
     Solo se puede ${salir, oeste}, al exterior."
);
locCueva.pic = "res/cave.jpg";
locCueva.setExitBi( "oeste", locOrillaLago );

var objRestos = ctrl.creaObj(
    "restos",
    [ "herramientas" ],
    "Distintas herramientas, relacionadas con la construcción de botes.",
    locCueva,
    Ent.Scenery
);

objRestos.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objCuerda ) ) {
        objCuerda.moveTo( this.owner );
        toret += " De entre todas ellas, localizas ${una cuerda, coge cuerda}.";
    }
    
    return toret;
};

var objCuerda = ctrl.creaObj(
    "cuerda",
    [ "cordaje" ],
    "Una fuerte cuerda.",
    ctrl.places.limbo,
    Ent.Portable
);

var locLlanura = ctrl.places.creaLoc(
	"Llanura",
	[ "llanura" ],
	"Una sorprendente llanura se extiende aparentemente en todas direcciones, con las ${montañas, ex montanas} delimitándola al noreste y ${densos bosques, ex bosques} al noroeste. Las ${colinas, ex lomas} se sitúan al ${sur, sur} en un claro declive del terreno,  a pesar de todo. Dos sendas parten en sentidos contrarios de la dirección ${este, este} a ${oeste, oeste}."
);
locLlanura.pic = "res/plain.jpg";

var locMolino = ctrl.places.creaLoc(
	"Represa del Molino",
	[ "represa" ],
	"Un ${gran molino, ex molino} se yergue sobre ${el río, ex rapidos}. \
	Aunque abandonado, se percibe aún la fuerza que gestionaba diariamente \
	cuando estaba en uso. Un abrupto camino ${asciende hacia el este, e}."
);
locMolino.pic = "res/mill.jpg";

var locMuelle = ctrl.places.creaLoc(
	"Muelle",
	[ "muelle" ],
	"Las olas lamen las gruesas ${piedras, ex piedras} de la orilla, suaves cantos rodados pulidos por los contínuos embates de la mar. El ${dañado muelle, ex atracadero} apenas se mantiene ya sobre el agua, acusando un grave descuido. ${Un camino, norte} discurre ascendente desde el muelle. Observas cómo tus huellas se graban sobre el polvo, siendo las únicas en el suelo."
);
locMuelle.pic = "res/dock.jpg";

var locPasaje = ctrl.places.creaLoc(
	"Pasaje",
	[ "pasaje" ],
	"El túnel continúa desde ${la entrada, oeste} hacia el interior, \
	pero lo más destacable es un ${agujero en el suelo, ex agujero} \
	ligeramente apartado hacia un lateral."
);
locPasaje.pic = "res/tunnel.jpg";

locPasaje.preGo = function() {
    var toret = "";
    
    if ( parser.sentence.term1 == "abajo" ) {
        if ( ctrl.isPresent( objCuerda ) ) {
            ctrl.goto( locSantuario );
            toret = "Atando la cuerda, habéis podido bajar al hueco inferior. \
                     ${Don Diego, habla con Diego} \
                     mira a su alrededor, maravillado.";
        }
    } else {
        goAction.exe( parser.sentence );
    }
    
    return toret;
};

var locPuente = ctrl.places.creaLoc(
	"Paso sobre el río",
	[],
	"${Un puente, ex puente} sobre ${el río, ex rio}, \
	casi comido por la ${vegetación, ex zarzas}, \
	permite continuar avanzando hacia el ${norte, norte}, \
	mientras un ${sendero, ex sendero} parte al pie del puente \
	y se ${dirige hacia los límites del bosque, sur}."
);
locPuente.pic = "res/bridge.jpg";

locPuente.preGo = function() {
    var toret = "Imposible.";
    
    if ( parser.sentence.term1 == "norte" ) {
        toret = "Es demasiado inseguro, no es posible.";
        if ( objAnclajes.secured ) {
            ctrl.goto( locInteriorDelBosque );
            toret = "Has cruzado el puente muy cuidadosamente.";
        }
    } else {
        toret = goAction.exe( parser.sentence );
    }
    
    return toret;
}

var locResidencialDeEpicuren = ctrl.places.creaLoc(
	"Residencial de Epicuren",
	[ "residencial de epicuren" ],
	"La colonia de Epicuren solo es un ${asentamiento, ex asentamiento} incipiente, desde aquí, la zona residencial del pueblo, puedes ver ${algunas casas, ex casas}, y la ${iglesia yendo hacia el este, este}. ${Bajando hacia el embarcadero, sur}, se alcanza la base de esta planicie, que por otra parte rompen las ${colinas, ex colinas},  ${subiendo hacia el norte, n}."
);
locResidencialDeEpicuren.pic = "res/residential.jpg";

var locSantuario = ctrl.places.creaLoc(
	"Santuario",
	[ "santuario" ],
	"De sección circular, esta cueva agrandada y profundizada en la roca está repleta de ${inscripciones, ex inscripciones}, que hacen suponer su función de lugar de culto."
);
locSantuario.pic = "res/santuary.jpg";

var locValleEnCortado = ctrl.places.creaLoc(
	"Valle en cortado",
	[ "valle en cortado" ],
	"Un cañón recubierto de distinta vida vegetal se abre hacia el ${este, este}."
);
locValleEnCortado.pic = "res/canyon.jpg";

var locValleFrondoso = ctrl.places.creaLoc(
	"Valle frondoso",
	[ "valle frondoso" ],
	"Una vegetación casi selvática forma el fondo de este valle. La espesura no te permite apreciar ningún otro camino aparte del que sube hacia la ${salida del valle, e}."
);
locValleFrondoso.pic = "res/forest_selvatic.jpg";

// *** Compas --


// -- locAsentamiento
locAsentamiento.setExit( "oeste", locColinaBoscosa );

// -- locBordeDelBosque
locBordeDelBosque.setExit( "norte", locPuente );
locBordeDelBosque.setExit( "este", locLlanura );

// -- locBosquePocoDenso
locBosquePocoDenso.setExit( "este", locCruceDeCaminos );
locBosquePocoDenso.setExit( "oeste", locCaminoHaciaElBosque );

// -- locCaminoDeLaMina
locCaminoDeLaMina.setExit( "este", locEntradaDeLaMina );
locCaminoDeLaMina.setExit( "oeste", locValleEnCortado );

// -- locCaminoDeLaSierra
locCaminoDeLaSierra.setExit( "norte", locCirco );
locCaminoDeLaSierra.setExit( "este", locCaminoDelLago );
locCaminoDeLaSierra.setExit( "oeste", locLlanura );

// -- locCaminoDeLosCultivos
locCaminoDeLosCultivos.setExit( "este", locGranja );
locCaminoDeLosCultivos.setExit( "oeste", locCruceDeCaminos );

// -- locCaminoDelLago
locCaminoDelLago.setExit( "sur", locLago );
locCaminoDelLago.setExit( "oeste", locCaminoDeLaSierra );

// -- locCaminoDelMolino
locCaminoDelMolino.setExit( "este", locCaminoDelMuelle );
locCaminoDelMolino.setExit( "oeste", locMolino );

// -- locCaminoDelMuelle
locCaminoDelMuelle.setExit( "norte", locResidencialDeEpicuren );
locCaminoDelMuelle.setExit( "sur", locMuelle );
locCaminoDelMuelle.setExit( "oeste", locCaminoDelMolino );

// -- locCaminoHaciaElBosque
locCaminoHaciaElBosque.setExit( "sur", locEpicuren );
locCaminoHaciaElBosque.setExit( "este", locBosquePocoDenso );

// -- locCirco
locCirco.setExit( "sur", locCaminoDeLaSierra );
locCirco.setExit( "este", locValleEnCortado );

// -- locClaroDelBosque
locClaroDelBosque.setExit( "este", locValleFrondoso );

// -- locColinaBoscosa
locColinaBoscosa.setExit( "este", locAsentamiento );
locColinaBoscosa.setExit( "oeste", locInteriorDelBosque );

// -- locColinas
locColinas.setExit( "norte", locLlanura );
locColinas.setExit( "sur", locResidencialDeEpicuren );

// -- locCruceDeCaminos
locCruceDeCaminos.setExit( "sur", locEscuela );
locCruceDeCaminos.setExit( "este", locCaminoDeLosCultivos );
locCruceDeCaminos.setExit( "oeste", locBosquePocoDenso );

// -- locEntradaDeLaMina
locEntradaDeLaMina.setExit( "este", locPasaje );
locEntradaDeLaMina.setExit( "oeste", locCaminoDeLaMina );

// -- locEpicuren
locEpicuren.setExit( "norte", locCaminoHaciaElBosque );
locEpicuren.setExit( "oeste", locResidencialDeEpicuren );

// -- locEscuela
locEscuela.setExit( "norte", locCruceDeCaminos );

// -- locGranja
locGranja.setExit( "oeste", locCaminoDeLosCultivos );

// -- locIglesia
locIglesia.setExit( "afuera", locEpicuren );

// -- locInteriorDelBosque
locInteriorDelBosque.setExit( "sur", locPuente );
locInteriorDelBosque.setExit( "este", locColinaBoscosa );
locInteriorDelBosque.setExit( "oeste", locValleFrondoso );

// -- locLago
locLago.setExit( "norte", locCaminoDelLago );

// -- locLlanura
locLlanura.setExit( "sur", locColinas );
locLlanura.setExit( "este", locCaminoDeLaSierra );
locLlanura.setExit( "oeste", locBordeDelBosque );

// -- locMolino
locMolino.setExit( "este", locCaminoDelMolino );

// -- locMuelle
locMuelle.setExit( "norte", locCaminoDelMuelle );

// -- locPasaje
locPasaje.setExit( "oeste", locEntradaDeLaMina );
locPasaje.setExit( "abajo", locSantuario );

// -- locPuente
locPuente.setExit( "sur", locBordeDelBosque );

// -- locResidencialDeEpicuren
locResidencialDeEpicuren.setExit( "norte", locColinas );
locResidencialDeEpicuren.setExit( "sur", locCaminoDelMuelle );
locResidencialDeEpicuren.setExit( "este", locEpicuren );

// -- locSantuario
locSantuario.setExit( "arriba", locPasaje );

// -- locValleEnCortado
locValleEnCortado.setExit( "este", locCaminoDeLaMina );
locValleEnCortado.setExit( "oeste", locCirco );

// -- locValleFrondoso
locValleFrondoso.setExit( "este", locInteriorDelBosque );

// *** Objs --

var objAgujero = ctrl.creaObj(
	"agujero",
	[ "agujero" ],
	"El agujero permite ver la estancia inferior, \
	pero desde este lugar no es sencillo adivinar de qué se trata, \
	al margen de estar excavada en la roca. \
	Podrías ${descender, abajo} por el hueco.",
	locPasaje,
	Ent.Scenery
);
objAgujero.status = 0;

objAgujero.preExamine = function() {
    var toret = this.desc;
    
    if ( this.status == 0 ) {
        ++this.status;
        ++npcSuperviviente.status;
        toret += " ${Don Diego, habla con Diego} mira el agujero, nervioso, \
                  afirmando que no sabía nada de esto.";
    }

    return toret;
}

var objAltar = ctrl.creaObj(
	"altar",
	[ "altar" ],
	"El altar no tiene nada especial... está completamente desnudo.",
	locIglesia,
	Ent.Scenery
);

objAltar.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objNota ) ) {
        objNota.moveTo( ctrl.places.getCurrentLoc() );
        toret += " Curioseas y soplas para levantar una densa nuble de polvo, \
                   dejando al descubierto una ${nota, coge nota} que no habías \
                   apreciado antes.";
    }
    
    return toret;
};

var objAnclajes = ctrl.creaObj(
	"anclajes",
	[ "anclajes" ],
	"Los anclajes están sueltos, con sus amarres desperdigados por el suelo.",
	locPuente,
	Ent.Scenery
);
objAnclajes.secured = false;
objAnclajes.preExamine = function() {
    var toret = this.desc;
    
    if ( !this.secured ) {
        if ( ctrl.personas.getPlayer().has( objEstaca ) ) {
            toret += "<br/>Podrías ${asegurar el cordaje con la estaca, deja estaca} que llevas...";
        }
    } else {
        toret = "Los anclajes son ahora firmes y seguros.";
    }
    
    return toret;
}

var objApertura = ctrl.creaObj(
	"apertura",
	[ "apertura" ],
	"El claro es como un respiro en medio de tanta vegetación.",
	locClaroDelBosque,
	Ent.Scenery
);

var objArboleda = ctrl.creaObj(
	"arboleda",
	[ "arboleda" ],
	"La arboleda, de ejemplares con bastante separación entre ellos, comienza aquí.",
	locCaminoHaciaElBosque,
	Ent.Scenery
);

var objArbustos = ctrl.creaObj(
	"arbustos",
	[ "arbustos" ],
	"La vegetación se cierra aquí sobre el ${camino, ex camino}.",
	locInteriorDelBosque,
	Ent.Scenery
);

var objAsentamiento = ctrl.creaObj(
	"asentamiento",
	[ "asentamiento" ],
	"Se trata de una colonia en una fase inicial de asentamiento. Esta es la zona residencial, mientras el centro del pueblo se sitúa ${hacia el este, este}.",
	locResidencialDeEpicuren,
	Ent.Scenery
);

var objBordes = ctrl.creaObj(
	"bordes",
	[ "bordes" ],
	"Los bordes de las zanjas empiezan a perderse, pareciendo todo el terreno llano.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objBosque = ctrl.creaObj(
	"bosque",
	[ "bosque" ],
	"El bosque se sitúa hacia el ${noreste, n}, aunque no en pendiente.",
	locEpicuren,
	Ent.Scenery
);

var objBosques = ctrl.creaObj(
	"bosques",
	[ "bosques" ],
	"Rodea la meseta por el noroeste.",
	locLlanura,
	Ent.Scenery
);

var objBote = ctrl.creaObj(
	"bote",
	[ "bote" ],
	"Un bote en perfecto estado, aunque a la vez mostrando signos evidentes \
	de no haber sido usado en mucho tiempo.",
	locLago,
	Ent.Scenery
);

objBote.preExamine = function() {
    var toret = this.desc;
    
    if ( this.owner == locLago ) {
        toret += " Podrías ${cruzar el lago, entra en bote}, hacia la cueva.";
    } else {
        toret += " Podrías ${cruzar el lago, entra en bote}, hacia la casa.";
    }
    
    return toret;
};

objBote.preEnter = function() {
    var toret = "¡Necesitas un remo!";

    if ( ctrl.personas.getPlayer().has( objRemo ) ) {
        if ( this.owner == locLago ) {
            this.moveTo( locOrillaLago );
            ctrl.goto( locOrillaLago );
            toret = "Remando con esfuerzo, has llegado a tu destino: la cueva.";
        } else {
            this.moveTo( locLago );
            ctrl.goto( locLago );
            toret = "Remando con esfuerzo, has llegado de vuelta a la casa.";
        }
    }

    return toret;
}

var objCabanas = ctrl.creaObj(
	"cabanas",
	[ "cabanas" ],
	"Se trata de sólidas construcciones de toscos troncos, no tablones.",
	locAsentamiento,
	Ent.Scenery
);

var objCampos = ctrl.creaObj(
	"campos",
	[ "campos" ],
	"Los campos mantienen cosechas que ya se han perdido, y nadie recogerá. Las malas hierbas empiezan a destruir el cuidado ${trabajo, ex trabajos} de años, ordenando los cultivos.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objCasa = ctrl.creaObj(
	"casa",
	[ "casa" ],
	"Una curiosa casa a la orilla del ${lago, ex lago}. \
	La ${entrada, ex entrada} al nivel del suelo llama tu atención. \
	En la orilla pedregosa, puedes ver un ${bote, ex bote}.",
	locLago,
	Ent.Scenery
);

objCasa.preExamine = function() {
    var toret = this.desc;
    
    if ( objEntrada.freed ) {
        toret += " También puedes ${entrar, entra en casa} en el edificio.";
    }
    
    return toret;
};

objCasa.preEnter = function() {
    var toret = "";
    
    if ( objEntrada.freed ) {
        ctrl.goto( locHabitacionCasaLago );
        toret = "Has entrado apartando telarañas y polvo...";
    } else {
        toret = "La entrada está bloqueada; no es posible entrar.";
    }
    
    return toret;
}

var objEntrada = ctrl.creaObj(
    "entrada",
    [ "puerta", "tablones", "tablon" ],
    "Un marco como entrada de la casa, donde debería haber una puerta.",
    locLago,
    Ent.Scenery
);
objEntrada.freed = false;

objEntrada.preExamine = function() {
    var toret = this.desc;

    if ( !this.freed ) {
        toret += " Está condenada con gruesos tablones.";

        if ( ctrl.personas.getPlayer().has( objPalanca ) ) {
            toret += " Quizás sea posible ${forzar, golpea tablones} \
                      los tablones con la palanca.";
        }
    } else {
        toret += " El paso está ahora libre, puedes ${entrar, entra en casa}.";
    }

    return toret;
};

objEntrada.preAttack = function() {
    var toret = "¿Para qué? El paso ya está libre.";
    
    if ( !this.freed ) {
        if ( ctrl.personas.getPlayer().has( objPalanca ) ) {
            this.freed = true;
            toret = "Fuerzas los tablones con la palanca, quitándolos del medio.";
        } else {
            toret = "No puedes hacer gran cosa con las manos desnudas.";
        }
    }
     
    return toret;
};

var objCasas = ctrl.creaObj(
	"casas",
	[ "casas" ],
	"Puedes ver varias casas, deterioradas por el abandono de algunos años. No están en peligro de derrumbe, pero se nota que hace tiempo que no se habitan.",
	locResidencialDeEpicuren,
	Ent.Scenery
);

var objDepresion = ctrl.creaObj(
	"depresión",
	[ "depresion" ],
	"Las montañas rodean un hoyo natural, que seguramente se llena de agua en invierno, pero que ahora se encuentra en pleno estío.",
	locCirco,
	Ent.Scenery
);

var objColinas = ctrl.creaObj(
	"colinas",
	[ "colinas" ],
	"${Hacia el norte, norte} puedes ver las colinas que delimitan el asentamiento por ese lado.",
	locResidencialDeEpicuren,
	Ent.Scenery
);

var objConstrucciones = ctrl.creaObj(
	"construcciones",
	[ "construcciones" ],
	"Diferentes edificios, la mayoría sin terminar y abandonados.",
	locEpicuren,
	Ent.Scenery
);

var objEscuela = ctrl.creaObj(
	"escuela",
	[ "escuela" ],
	"Al final del camino se asienta una pequeña escuela. El edificio, terminado pero sin rematar, y abandonado, se alza como un fantasma entre los árboles. Está completamente vacío.",
	locEscuela,
	Ent.Scenery
);

var objEstaca = ctrl.creaObj(
	"estaca",
	[ "estaca" ],
	"Es una estaca fuerte, acabada en punta.",
	ctrl.places.limbo,
	Ent.Portable
);

objEstaca.preDrop = function() {
    var toret = "";
    
    if ( ctrl.places.getCurrentLoc() ) {
        objEstaca.moveTo( ctrl.places.limbo );
        objAnclajes.secured = true;
        toret = "Anudas el cordaje en la estaca, y la clavas fuertemente. \
                 Ahora sí que se puede cruzar, ha quedado firme.";
        
    } else {
        toret = dropAction.exe( parser.sentence );
    }
    
    return toret;
};

var objEstacas = ctrl.creaObj(
	"estacas",
	[ "estacas" ],
	"Las estacas mantienen las divisiones entre sectores de cultivo, distintas semillas...",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

objEstacas.preExamine = function() {
    var toret = this.desc;

    if ( ctrl.places.limbo.has( objEstaca ) ) {
        toret += " Vaya, una de ellas ${parece suelta, coge estaca}."
        objEstaca.moveTo( ctrl.places.getCurrentLoc() );
    }

    return toret;
}

var objGranero = ctrl.creaObj(
	"granero",
	[ "granero" ],
	"Se trata de un gran granero en el que guardar y tratar cosechas. No hay nada en su interior más que algo de ${paja, ex paja}.",
	locGranja,
	Ent.Scenery
);

var objHerramientas = ctrl.creaObj(
	"herramientas",
	[ "herramientas" ],
	"Picos, palas, carretas y demás material.",
	locCaminoDeLaMina,
	Ent.Scenery
);

var objIglesia = ctrl.creaObj(
	"iglesia",
	[ "iglesia" ],
	"La iglesia parece no estar rematada; \
	si bien la estructura está completa, está claro que algo muy \
	importante interrumpió la ornamentación exterior. \
	Podrías ${entrar, entra en iglesia} en ella; \
	al contrario que el resto de ${construcciones, ex construcciones}, \
	todavía no ha sido invadido por la maleza.",
	locEpicuren,
	Ent.Scenery
);

objIglesia.preEnter = function() {
    ctrl.goto( locIglesia );
    return "Tus ojos han tardado un rato en adaptarse del todo a la oscuridad.";
};

var objInscripciones = ctrl.creaObj(
	"inscripciones",
	[ "inscripciones" ],
	"No puedes descrifrarlas, no se parecen a nada que conozcas.",
	locSantuario,
	Ent.Scenery
);

var objLago = ctrl.creaObj(
	"lago",
	[ "lago" ],
	"Puedes apreciar un intenso color verde en el agua. En la orilla frente a la casa,  puedes ver un ${bote, ex bote}. Al otro lado del lago, \
	fuera de tu alcance, puedes ver ${una cueva, ex cueva}.",
	locLago,
	Ent.Scenery
);

var objLomas = ctrl.creaObj(
	"lomas",
	[ "lomas" ],
	"Situadas al ${sur, sur}, son otro de los límites naturales de esta planicie.",
	locLlanura,
	Ent.Scenery
);

var objMina = ctrl.creaObj(
	"mina",
	[ "mina" ],
	"No parece invitar a entrar con la negrura que exhibe. \
	 Pero puedes ${intentar hacerlo, este}.",
	locEntradaDeLaMina,
	Ent.Scenery
);

var objMolino = ctrl.creaObj(
	"molino",
	[ "molino" ],
	"La entrada del molino está taponada con zarzas, aunque por lo que puedes ver por las ventanas, no hay nada interesante en su interior.",
	locMolino,
	Ent.Scenery
);

objMolino.preExamine = function() {
    var toret = objMolino.desc;
    
    if ( objPalanca.owner == ctrl.places.limbo ) {
        objPalanca.moveTo( this.owner );
        toret += " Eso sí, en un lateral puedes ver una ${palanca, coge palanca}.";
    }
    
    return toret;
};

var objPalanca = ctrl.creaObj(
    "palanca",
    [ "barra" ],
    "Una barra de hierro que sirve como palanca.",
    ctrl.places.limbo
);

var objMontanas = ctrl.creaObj(
	"montanas",
	[ "montanas" ],
	"Las montanas son pedregosas, en contraste con esta llanura, aunque no muy altas.",
	locLlanura,
	Ent.Scenery
);

var objMuelle = ctrl.creaObj(
	"atracadero",
	[ "atracadero" ],
	"El muelle se encuentra en un penoso estado, fruto del abandono de años. ¿Cuánto tiempo habrá pasado desde el aviso hasta tu llegada?",
	locMuelle,
	Ent.Scenery
);

var objNota = ctrl.creaObj(
	"nota",
	[ "nota" ],
	"El texto es escueto: \"Huimos al norte, más allá de las colinas.\"",
	ctrl.places.limbo,
	Ent.Portable
);

objNota.preTake = function() {
    this.moveTo( ctrl.personas.getPlayer() );
    return "Cogida.<br/>" + this.desc;
};

var objPaja = ctrl.creaObj(
	"paja",
	[ "paja" ],
	"Paja y más paja.",
	locGranja,
	Ent.Scenery
);

var objPiedras = ctrl.creaObj(
	"piedras",
	[ "piedras" ],
	"Pesados cantos rodados, suaves en sus formas.",
	locMuelle,
	Ent.Scenery
);

var objPista = ctrl.creaObj(
	"pista",
	[ "pista" ],
	"El camino está realmente muy transitado en este lugar.",
	locInteriorDelBosque,
	Ent.Scenery
);

var objPoblado = ctrl.creaObj(
	"poblado",
	[ "poblado" ],
	"Son varias ${cabañas, ex cabanas} que están habitadas, o al menos lo estuvieron hasta hace muy poco. Si bien parecen sólidas, su diseño no parece tan meditado como las de la colonia, mostrando distintos grados de acabado.",
	locAsentamiento,
	Ent.Scenery
);

var objPueblo = ctrl.creaObj(
	"pueblo",
	[ "pueblo" ],
	"El pueblo se sitúa en lontananza, hacia el ${sur, sur}.",
	locCaminoHaciaElBosque,
	Ent.Scenery
);

var objPuente = ctrl.creaObj(
	"puente",
	[ "puente" ],
	"El puente está decrépito y abandonado. Fijándote en ${los anclajes, ex anclajes}, te das cuenta de que el deterioro del puente no es natural, sino deliberado. Alguien no está interesado en que sea ${cruzado, norte}.",
	locPuente,
	Ent.Scenery
);

var objRapidos = ctrl.creaObj(
	"rápidos",
	[ "rapidos" ],
	"El río discurre de norte a sur, en una zona de rápidos que le dan gran fuerza a las aguas.",
	locMolino,
	Ent.Scenery
);

var objRiegos = ctrl.creaObj(
	"riegos",
	[ "riegos" ],
	"Canalizaban el agua que se vertía abundantemente para asegurar la correcta hidratación de cada ${sector, ex sectores} de los cultivos.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objRio = ctrl.creaObj(
	"rio",
	[ "rio" ],
	"Discurre de norte a suroeste.",
	locPuente,
	Ent.Scenery
);

var objRocas = ctrl.creaObj(
	"rocas",
	[ "rocas" ],
	"Muchas de ellas son altas, de caprichosas formas.",
	locCaminoDeLaSierra,
	Ent.Scenery
);

var objSectores = ctrl.creaObj(
	"sectores",
	[ "sectores" ],
	"Las plantaciones se dividían en sectores, cultivando distintos tipos de semillas y tubérculos.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objSelva = ctrl.creaObj(
	"selva",
	[ "selva" ],
	"Un bosque frondoso y húmedo.",
	locBordeDelBosque,
	Ent.Scenery
);

var objSenda = ctrl.creaObj(
	"senda",
	[ "senda" ],
	"Marcada como nunca durante el camino, queda claro que pasaban carromatos con frecuencia por esta parte.",
	locCruceDeCaminos,
	Ent.Scenery
);

var objSendero = ctrl.creaObj(
	"sendero",
	[ "sendero" ],
	"Te sorprende que exista un sendero, y un puente, en este lugar. Está claro que se trata de una zona habitada... ¿aunque, quizás también abandonada?",
	locPuente,
	Ent.Scenery
);

var objSotobosque = ctrl.creaObj(
	"sotobosque",
	[ "sotobosque" ],
	"El bosque es amplio, permitiendo pasar la luz del sol. El suelo está también bastante limpio de matojos.",
	locBosquePocoDenso,
	Ent.Scenery
);

var objTrabajos = ctrl.creaObj(
	"trabajos",
	[ "trabajos" ],
	"${Vallas, ex vallas}, ${zanjas, ex zanjas}, ${riegos, ex riegos}... el trabajo realizado es incomensurable.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objVallas = ctrl.creaObj(
	"vallas",
	[ "vallas" ],
	"Las vallas están ahí para que el ganado no interfiera con las cosechas. Están basadas en gruesas ${estacas, ex estacas}, que dividen también ${distintos sectores, ex sectores}.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objValle = ctrl.creaObj(
	"valle",
	[ "valle" ],
	"Es angosto y denso.",
	locClaroDelBosque,
	Ent.Scenery
);

var objVegetacion = ctrl.creaObj(
	"vegetacion",
	[ "vegetacion" ],
	"Bastante densa, aunque agradable a la vista.",
	locCaminoDelMuelle,
	Ent.Scenery
);

var objVereda = ctrl.creaObj(
	"vereda",
	[ "vereda" ],
	"Serpentea por entre colinas y pasos rocosos, conformándose como una pequeña tira sin vegetación.",
	locCaminoDelLago,
	Ent.Scenery
);

var objZanjas = ctrl.creaObj(
	"zanjas",
	[ "zanjas" ],
	"Las zanjas han empezado a suavizar sus ${bordes, ex bordes}: en muy poco tiempo, será imposible distinguirlas del resto del terreno.",
	locCaminoDeLosCultivos,
	Ent.Scenery
);

var objZarzas = ctrl.creaObj(
	"zarzas",
	[ "zarzas" ],
	"Las zarzas impiden el acceso al río, que de hecho no parece demasiado profundo.",
	locPuente,
	Ent.Scenery
);

// NPC =========================================================================
var npcSuperviviente = ctrl.personas.creaPersona(
                "colono",
                [ "diego", "yañez", "supervivivente", "hombre", "colono" ],
                "Superviviente de la colonia de Epicuren.",
                locAsentamiento
);
npcSuperviviente.status = 0;

function amenities() {
    return "Este relato fue creado para la <i>JAMCanciones</i> en 2017.<br/> \
            El objetivo era crear ficción interactiva basada en relatos de \
            frontera, inspirándose en ciertas canciones, como por ejemplo, \
            la que elegí para esta ocasión: <i>Nómadas</i>, \
            de Franco Battiato."
}

var htmlRestartEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.<br/>\
                         <i><a href='#' onClick=\"javascript: \
                         document.getElementById('pAmenity').\
                         style.display='block'; return false\">\
                         Ver curiosidades</a>.</i></p>\
                         <p id='pAmenity' align='right' style='display: none'>"
                         + amenities()
                         + "</p>";

npcSuperviviente.final = function() {
    var player = ctrl.personas.getPlayer();
    
    ctrl.print( "Ambos admiraron con detenimiento los los grabados \
                 e inscripciones." );
    this.say( "Esto esclarece el misterio, Don Juan." );
    player.say( "Así es, Don Diego." );
    
    var dvCmds = ctrl.getHtmlPart( "dvCmds" );
    dvCmds.style.display = "none";
    ctrl.endGame( "Los nómadas defendían su santuario, su lugar de culto."
                       + htmlRestartEnding,
                    "res/santuary.jpg" );
}

npcSuperviviente.preTalk = function() {
    var toret = "Sombrío, no parece interesado en hablar más.";
    var player = ctrl.personas.getPlayer();
    var loc = ctrl.places.getCurrentLoc();

    ctrl.clearAnswers();
    
    if ( loc == locSantuario ) {
        this.status = 99;
        toret = this.final();
    }
    else
    if ( this.status == 2
      && loc != locClaroDelBosque )
    {
        this.status = 3;
    }
    else
    if ( loc == locPasaje ) {
        this.status = 99;
    }
    
    if ( this.status == 0 ) {
        toret = "";
        ++this.status;
        
        player.say( "Buenos días, buen hombre, soy Juan Vélez, \
                     enviado por el Virrey de Nueva España, \
                     para socorrerles..." );
        this.say( "Pero... pero... ¿solo voecencia?" );
        player.say( "¿Esperábais un ejército, acaso?" );
        ctrl.print( "Por su cara, puedes suponer \
                     que la respuesta es afirmativa." );
        player.say( "¿Podéis decirme vuestro nombre?" );
        this.say( "Por supuesto, excusadme. Soy Diego Yañez, \
                   colono de Epicuren." );
        this.id = "Diego Yañez";
        player.say( "Decidme, entonces, Don Diego, ¿qué ha pasado aquí?" );
        this.say( "Ha sido terrible, pero... temo que todo haya terminado ya. \
                    Vuestro viaje ha sido inútil... \
                    ¿qué os ha retrasado tanto?" );
        player.say( "Nada a mi persona, pero vuestro emisario naufragó en su \
                     viaje a la Corte del Virreinato, y temo que las penurias \
                     por las que pasó le retrasaran media docena de años, \
                     y le... trastornaran un tanto." );
        this.say( "¿Trastornado?¡Santo cielo!" );
        player.say( "Estaba muy deshidratado, pero además hablaba de que \
                     a la colonia la habían atacado unos monstruos." );
        this.say( "Y así fue, me temo..." );
        ctrl.print( "Te preguntas si este hombre \
                     no habrá enloquecido también" );
        player.say( "Pero... ¿qué decís?" );
        ctrl.print( "Decides que es necesario seguir interrogándole, \
                     hasta llegar al fondo de todo esto." );
    }
    else
    if ( this.status == 1 ) {
        toret = "";
        ++this.status;
        
        this.say( "Será mejor que os lo enseñe..." );
        player.say( "De acuerdo..." );
        ctrl.print( "Don Diego te ha guiado colina abajo; seguisteis avanzando \
                     hacia el oeste, hasta un claro del bosque, muy en \
                     el interior del valle." );
        
        this.moveTo( locClaroDelBosque );
        ctrl.goto( locClaroDelBosque );
    }
    else
    if ( this.status == 2 ) {
        toret = "";
        ++this.status;
        
        player.say( "¿Este es el monstruo que atacó?" );
        this.say( "Sí." );
        player.say( "No es un monstruo. No son monstruos." );
        this.say( "Pero ellos..." );
        ctrl.print( "Meneas la cabeza hacia los lados, descartando la protesta de \
                     D. Diego." );
        player.say( "Les conozco. Han atacado otras colonias. No sabemos por qué. \
                     Siempre llevan estas pieles cubriéndoles el cuerpo, \
                     para intimidar, supongo, a sus enemigos." );
        ctrl.print( "D. Diego sigue sin acercarse, un temor cerval le invade." );
        player.say( "¿Qué le pasó a este?" );
        this.say( "Fue el único que se aventuró por estos lares, después de que \
                   abandonásemos la colonia, inutilizáramos el puente, \
                   y nos asentáramos aquí. Por algún motivo, \
                   vino solo, le vimos llegar y le matamos. Le dejamos ahí, no nos \
                   atrevimos a más." );
        player.say( "¿Quiénes?" );
        this.say( "Mis compañeros, amigos, vecinos... todos muertos o huídos en las \
                   embarcaciones a un lugar más favorable." );
        this.say( "¿Cómo es que a Corte nos envió aquí, conociendo el peligro?" );
        ctrl.print( "Haces un amplio gesto semicircular con la mano." );
        player.say( "Solo han atacado media docena de asentamientos. Sabemos muy poco \
                     de ellos. ¿Dónde van a atacar?¿Por qué lo hacen? Ni siquiera son \
                     habitantes de las tierras de las colonias, siempre aparecen \
                     después... No sabemos gran cosa. Les llamamos los nómadas." );
        
        npcNomada.id = "nómada";
        ++npcNomada.status;
    }
    else
    if ( this.status == 3 ) {
        toret = "";
        player.say( "Entonces, ¿el ataque de los nómadas propició la huída \
                     de las gentes?" );
        this.say( "Sí, así es... dejaron la colonia... no sé a dónde fueron." );
        player.say( "Quiero seguir explorando la colonia... \
                     tiene que haber algo más." );
        this.say( "Contad con mi ayuda." );
    }
    else
    if ( this.status == 4 ) {
        toret = "";
        ++this.status;

        player.say( "¿Una mina?¿Aquí?" );
        this.say( "Nos dimos cuenta de que había buenos minerales \
                   en un valle al este de aquí." );
        player.say( "Supongo, Don Diego, que se refiere a oro." );
        this.say( "Pues sí." );
        player.say( "¿Y cómo horadaron la roca bajo los ataques \
                    de los nómadas?" );
        this.say( "Los ataques de los nómadas vinieron después... \
                   justo después de empezar, ahora que lo pienso." );
        player.say( "Interesante. \
                     Guiadme, es el momento de explorar esa mina." );
        this.say( "De acuerdo. En realidad es muy sencillo llegar, \
                   el trasiego de materiales y herramientas ha creado \
                   caminos evidentes." );
    }
    else
    if ( this.status == 5 ) {
        toret = "";

        player.say( "No sabía que había planes para una mina." );
        this.say( "Nos dimos cuenta de que había buenos minerales \
                   en otro valle, al noreste de la colonia." );
        player.say( "Querría ver esa mina." );
        this.say( "De acuerdo." );
    }
    else
    if ( this.status == 6 ) {
        toret = "";
        ++this.status;

        player.say( "¿Una mina?¿Aquí?" );
        this.say( "Nos dimos cuenta de que había buenos minerales \
                   en un valle al este de aquí." );
        player.say( "Supongo, Don Diego, que se refiere a oro." );
        this.say( "Pues sí." );
        player.say( "¿Y cómo horadaron la roca bajo los ataques \
                    de los nómadas?" );
        this.say( "Los ataques de los nómadas vinieron después... \
                   justo después de empezar, ahora que lo pienso." );
        player.say( "Interesante. \
                     Guiadme, es el momento de explorar esa mina." );
        this.say( "De acuerdo. En realidad es muy sencillo llegar, \
                   el trasiego de materiales y herramientas ha creado \
                   caminos evidentes." );
    }
    else
    if ( this.status == 7 ) {
        toret = "";

        player.say( "No sabía que había planes para una mina." );
        this.say( "Nos dimos cuenta de que había buenos minerales \
                   en otro valle, al noreste de la colonia." );
        player.say( "Querría ver esa mina." );
        this.say( "De acuerdo." );
    }

    return toret;
}

var npcNomada = ctrl.personas.creaPersona(
                "monstruo",
                [ "monstruo", "nomada" ],
                "Uno de los atacantes de la colonia de Epicuren.",
                locClaroDelBosque
);
npcNomada.status = 0;

npcNomada.preTalk = function() {
    var toret = "Un nómada muerto.";
    ctrl.clearAnswers();
    
    if ( this.status == 0 ) {
        toret = "";
        ctrl.print( "Está muerto, y desde hace tiempo. Lo volteas (para horror \
            de tu acompañante), y compruebas que no es más que un hombre envuelto en \
            piel de oso. Está concienzudamente disfrazado, eso sí." );
    }
    else
    if ( this.status == 1 ) {
        toret = "";
        ctrl.print( "El nómada está muerto." );
    }
    
    return toret;
}

// Player & booting ============================================================
var pc = ctrl.personas.creaPersona(
                "Juan Vélez",
                [ "jugador", "juan", "velez" ],
                "Juan Vélez, un explorador español, \
                 enviado por la Corte del Virreinato de Nueva España.",
                locMuelle
);

pc.postAction = function() {
    if ( npcSuperviviente.status > 0
      && npcSuperviviente.owner != ctrl.places.getCurrentLoc() )
    {
        npcSuperviviente.moveTo( ctrl.places.getCurrentLoc() );
        ctrl.print( "D. ${Diego, habla con Diego} va contigo." );
    }
}

var objBrujula = ctrl.creaObj(
	"brújula",
	[ "brujula" ],
	"Indica la dirección.",
	pc,
	Ent.Portable
);

objBrujula.firstTime = true;
objBrujula.preExamine = function() {
    var toret = objBrujula.desc + "<br/>";
    
    if ( this.firstTime ) {
        this.firstTime = false;
        toret += " Es equipamiento básico para cualquier explorador.<br/>";
    }
    
    toret += actions.execute( "exits" );
    
    return toret;
}

var objOrdenes = ctrl.creaObj(
	"ordenes",
	[ "ordenes" ],
	"Tus órdenes, en papel: \"<i>Estimado Don Vélez: Diríjase con la mayor \
	premura a la colonia de Epicuren, de donde ha venido con grandes penurias \
	un emisario adviritiendo del gran peligro que corren sus gentes, peligro \
	que dado el tiempo pasado esperamos y deseamos haya sido conjurado.<br/>\
	Atentamente: Pedro de la Cerda.</i>\"",
	pc,
	Ent.Portable
);


ctrl.personas.changePlayer( pc );
//ctrl.places.ponInicio( locMuelle );
ctrl.places.ponInicio( locLlanura );
objCuerda.moveTo( pc );
npcSuperviviente.status = 3;

