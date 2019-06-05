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
    pidiendo ayuda para el asentamiento. \
    Desgraciadamente, su viaje había sido \
    terrible y parecía no estar en sus cabales: \
    hablaba de monstruos terribles.\
    </p>"
);

ctrl.setPic( "res/dock.jpg" );
ctrl.setAuthor( "baltasarq@gmail.com" );
ctrl.setVersion( "2.0 20170922" );

// *** Locs --

var locAsentamiento = ctrl.places.creaLoc(
    "Asentamiento",
    [ "asentamiento" ],
    "La salida del bosque al ${oeste, oeste} se enfrenta a \
    un pequeño ${asentamiento, ex poblado} sobre la ladera \
    en la cumbre de la colina. Varias ${cabañas, ex cabanas} se agarran \
    a la pendiente, de una forma un tanto desordenada."
);
locAsentamiento.pic = "res/settlement.jpg";
locAsentamiento.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.personas.getPlayer().say( "¡Por fin! Gentes de la colonia." );
    }

    if ( npcSuperviviente.status == 0 ) {
        ctrl.print( "<br/>Un hombre (presumes que un colono), se encuentra \
                  sentado fuera de una de las \
                  cabañas. No parece haberte visto todavía." );
    }

    return;
};

var locBordeDelBosque = ctrl.places.creaLoc(
    "Borde del bosque",
    [ "borde del bosque" ],
    "Un ${bosque frondoso, ex selva} comienza al ${norte, n} de este lugar. \
    El camino se interna en él en un brusco giro que proviene \
    desde el ${este, este}."
);
locBordeDelBosque.pic = "res/forest_dense.jpg";

var locBosquePocoDenso = ctrl.places.creaLoc(
    "Bosque poco denso",
    [ "bosque poco denso" ],
    "El camino atraviesa un ${bosque poco denso, ex sotobosque}, \
    en la dirección ${este, este} a ${oeste, oeste}."
);
locBosquePocoDenso.pic = "res/forest_open.jpg";

var locCaminoDeLaMina = ctrl.places.creaLoc(
    "Camino de la mina",
    [ "camino de la mina" ],
    "Múltiples ${herramientas y restos de todo tipo, ex herramientas} \
    se encuentran abandonados, esparcidos al borde del camino \
    que de forma bastante llana discurre de ${este, este} a ${oeste, oeste}."
);
locCaminoDeLaMina.pic = "res/path_mine.jpg";

var locCaminoDeLaSierra = ctrl.places.creaLoc(
    "Camino de la sierra",
    [ "camino de la sierra" ],
    "Una senda parte abruptamente hacia ${las montañas, ex sierra} \
    al ${norte, norte}, escalando por entre ${rocas, ex rocas} \
    que parecen querer proteger ciertos pasos del viento. \
    El camino principal sigue la falda de la ${sierra, ex sierra}, \
    de ${este, este} a ${oeste, oeste}."
);
locCaminoDeLaSierra.pic = "res/path_mountains.jpg";

var objSierra = ctrl.creaObj(
    "sierra",
    [ "montanas", "falda" ],
    "La sierra se eleva hacia el ${norte, norte}.",
    locCaminoDeLaSierra,
    Ent.Scenery
);

var objRocas = ctrl.creaObj(
    "rocas",
    [ "rocas" ],
    "Muchas de ellas son altas, de caprichosas formas.",
    locCaminoDeLaSierra,
    Ent.Scenery
);

objRocas.preExamine = function() {
    var toret = objRocas.desc;

    if ( ctrl.places.limbo.has( objPiedraAfilada ) ) {
        objPiedraAfilada.moveTo( this.owner );
        ctrl.places.updateDesc();
        toret += " En el suelo, algunos gajos de las grandes rocas \
                  se disponen de forma escalonada. Una de ellas, está tan \
                  afilada que llama tu atención.";
    }

    return toret;
};

var objPiedraAfilada = ctrl.creaObj(
    "piedra",
    [ "roca" ],
    "Pesada y de gran filo.",
    ctrl.places.limbo,
    Ent.Portable
);

locCaminoDeLaSierra.preGo = function() {
    var toret = "";

    if ( parser.sentence.term1 == "norte" ) {
        if ( npcSuperviviente.owner == locCaminoDeLaSierra ) {
            if ( npcSuperviviente.status <= 3 ) {
                ++npcSuperviviente.status;
                npcSuperviviente.say( "Más allá de \
                        de estas montañas se encuentra una mina en la que \
                        la colonia trabajaba justo antes del ataque de los \
                        nómadas." );
                toret = "Presientes que continuar con la conversación \
                        dará lugar a interesantes descubrimientos.";
            } else {
                toret = "Continuáis caminando, sombríos.";
            }

            goAction.exe( parser.sentence );
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
    "Una pista permite el acceso a varios ${campos de cultivo, ex campos}. \
    Desde aquí se puede llegar al bosque al ${oeste, oeste}, \
    en sentido opuesto a una granja al ${este, este}, en lontananza."
);
locCaminoDeLosCultivos.pic = "res/path_farm.jpg";

var locCaminoDelLago = ctrl.places.creaLoc(
    "Camino del lago",
    [ "camino del lago" ],
    "Desde este lugar, puede apreciarse una pequeña ${vereda, ex vereda} \
    que desciende hacia un lago al ${sur, sur}, mientras el camino principal \
    continúa hacia las montañas al ${oeste, oeste}."
);
locCaminoDelLago.pic = "res/path_mountain_lake.jpg";

var locCaminoDelMolino = ctrl.places.creaLoc(
    "Camino del molino",
    [ "camino del molino" ],
    "Una suave pendiente desciende desde el ${este, este} \
    hasta el río al ${oeste, oeste}, \
    donde puedes ver que se asienta un molino."
);
locCaminoDelMolino.pic = "res/path_mill_river.jpg";

var locCaminoDelMuelle = ctrl.places.creaLoc(
    "Camino del muelle",
    [ "camino del muelle" ],
    "El camino asciende suavemente la ladera de una colina al ${norte, norte} \
    cuya ${vegetación, ex vegetacion} se dispone alrededor del sendero, \
    desde el embarcadero al ${sur, sur}. Una ${senda, ex senda} \
    desciende hacia el ${oeste, oeste}, supones que hacia un río, \
    pues el suave murmullo puede oírse desde aquí."
);
locCaminoDelMuelle.pic = "res/path_from_docks.jpg";

ctrl.creaObj(
    "senda",
    [ "sendero" ],
    "Desciende hacia el murmullo de un río, al ${oeste, oeste}.",
    locCaminoDelMuelle,
    Ent.Scenery
);

var locCaminoHaciaElBosque = ctrl.places.creaLoc(
    "Camino hacia el bosque",
    [ "camino hacia el bosque" ],
    "En las lindes de un bosque. El camino se interna en la \
    ${arboleda, ex arboleda} hacia el ${este, este}, \
    desde la plaza principal del ${pueblo, ex pueblo}, \
    en un amplio giro desde el ${sur, sur}."
);
locCaminoHaciaElBosque.pic = "res/path_forest_border.jpg";

var locCirco = ctrl.places.creaLoc(
    "Circo",
    [ "circo" ],
    "El camino ha ascendido aquí hasta una \
    ${depresión rodeada de picos, ex depresion} de distintas alturas. \
    Se puede descender por dos lados, hacia un lago al ${sur, sur}, \
    y por un cañón herboso al ${este, este}."
);
locCirco.pic = "res/depression.jpg";

var locClaroDelBosque = ctrl.places.creaLoc(
    "Claro del bosque",
    [ "claro" ],
    "Un ${hermoso claro, ex apertura} del bosque en el fondo del \
    ${valle, ex valle}, escondido por la densa vegetación. \
    Siguiendo la suave pendiente, puedes salir del claro hacia una \
    zona superior del valle al ${este, este}."
);
locClaroDelBosque.pic = "res/clear_forest.jpg";
locClaroDelBosque.preGo = function() {
    var toret = "";

    if ( npcSuperviviente.status < 3 ) {
        toret = actions.execute( "talk", "colono" );
        toret += "<br/>Ahora sí piensas que podéis abandonar este lugar.";
    } else {
        toret = goAction.exe( parser.sentence );
    }

    return toret;
};

var locColinaBoscosa = ctrl.places.creaLoc(
    "Colina boscosa",
    [ "colina" ],
    "El bosque asciende perezoso por una suave colina, desde su \
    interior al ${oeste, oeste}, hasta la cumbre de la \
    colina misma al ${este, este}."
);
locColinaBoscosa.pic = "res/hill_forest.jpg";

var locColinas = ctrl.places.creaLoc(
    "Colinas",
    [ "lomas" ],
    "Las colinas escalan por sobre la \
    zona residencial de Epicuren al ${sur, sur}, \
    elevándose hasta las faldas de las montañas al ${norte, norte}. \
    Desde aquí tienes una magnífica ${vista de la colonia, ex vista}."
);
locColinas.pic = "res/hills_north.jpg";

ctrl.creaObj(
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
    "${La senda, ex senda} viene desde el interior de un bosque poco denso al \
    ${oeste, oeste} para dividirse aquí en dos: hacia el ${sur, sur}, \
    con un ramal un poco más estrecho, \
    y de cara a la salida del bosque al ${este, este}."
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
    "La plaza del pueblo de Epicuren. Desde aquí se ve \
    ${la iglesia, ex iglesia}. Un camino sale hacia un \
    ${bosque, ex bosque} al ${norte, norte}, \
    otro continúa hacia la zona residencial al ${oeste, oeste}."
);
locEpicuren.pic = "res/town.jpg";
locEpicuren.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.print( "Contemplas la plaza del malogrado pueblo." );
        ctrl.personas.getPlayer().say(
            "Estas gentes tuvieron tiempo de organizarse." );
    }
};

var locEscuela = ctrl.places.creaLoc(
    "Finca de la Escuela",
    [ "finca" ],
    "El edificio sin terminar para una futura ${escuela, ex escuela}. \
    De nuevo compruebas que no hay un deterioro avanzado, \
    aunque la apariencia es de marcado abandono. \
    Podrías ${entrar, s} en ella. \
    Al lado, hay un ${pozo, ex pozo}. \
    El camino que proviene del ${norte, n}, termina a los pies de la entrada."
);
locEscuela.pic = "res/school.jpg";

var objPozo = ctrl.creaObj(
    "pozo",
    [],
    "Un pozo artesano, del que sobresale un metro del cerco de piedra \
     se asienta muy cerca de la ${escuela, ex escuela}, \
     rematado en su parte superior con un soporte.",
    locEscuela,
    Ent.Scenery
);
objPozo.extended = true;

objPozo.preExamine = function() {
    var toret = objPozo.desc;

    if ( this.extended ) {
        toret += " Del soporte cuelga una polea \
                   que podrías ${usar, tira de pozo}. \
                   Una cuerda se pierde en la oscura hoquedad.";
    } else {
        toret += " El cubo está recogido, colgando muy cercano a la polea.";
    }

    return toret;
};

objPozo.prePull = function() {
    var toret = "El cubo ya está recogido.";

    if ( this.extended ) {
        this.extended = false;
        ctrl.print( "Haciendo girar la polea chirriante, \
                 recoges lentamente la cuerda, con alguna dificultad, \
                 pues pasado el primer tramo, la parte mojada se encontraba \
                 hinchada al haber estado sumergida." );
        ctrl.personas.getPlayer().say( "El cubo está podrido y resquebrajado, \
                 es ya inútil para contener el agua en su interior." );
        ctrl.achievements.achieved( "bucket" );
        toret = "Te sientes raro, \
                 como explorando los restos de una civilización ajena. \
                 De nuevo preguntas sin respuesta alguna hostigan tu mente.";
    }

    return toret;
};

var locInteriorEscuela = ctrl.places.creaLoc(
    "Interior de la escuela",
    [],
    "Abandonada y rota, las alimañas han dejado el aula desangelada, \
     con restos por el suelo y la ${pizarra, ex pizarra} resquebrajada. \
     Los ${pupitres, ex pupitres}, como ajenos a la situación, \
     todavía se alzan en sus antiguas posiciones. \
     El ${atril, ex atril} del profesor destaca al fondo. \
     La puerta, colgando de sus goznes, permite la salida al ${norte, n}."
);
locInteriorEscuela.pic = "res/school_interior.jpg";
locInteriorEscuela.setExitBi( "norte", locEscuela );

var objPizarra = ctrl.creaObj(
    "pizarra",
    [],
    "Resquebrajada por varios lugares, no sirve ya de mucho ahora.",
    locInteriorEscuela,
    Ent.Scenery
);

ctrl.creaObj(
    "atril",
    [],
    "Vacío, no contiene nada de interés.",
    locInteriorEscuela,
    Ent.Scenery
);

ctrl.creaObj(
    "pupitres",
    [ "pupitre" ],
    "Sobre el más cercano, puedes ver un ${libro, ex libro}.",
    locInteriorEscuela,
    Ent.Scenery
);

var objLibro = ctrl.creaObj(
    "libro",
    [ "quijote" ],
    "Lees: \"En un lugar de la mancha, de cuyo nombre no quiero acordarme, \
    no ha mucho tiempo que vivía un hidalgo...\".",
    locInteriorEscuela,
    Ent.Scenery
);
objLibro.read = false;

objLibro.preExamine = function() {
    var toret = objLibro.desc;

    if ( !this.read ) {
        ctrl.personas.getPlayer().say( "Es emocionante encontrar \
                                        uno de los más recientes maravillas \
                                        de nuestra literatura en este lugar \
                                        abandonado por la mano de Dios... \
                                        y por sus colonos." );
        ctrl.achievements.achieved( "curious" );
        this.read = true;
        toret += "<p>Con gran respeto, soplas la generosa capa de polvo \
                  que se ha depositado sobre las hojas, \
                  pasando después una mano, acariciando las hojas.</p>";
    } else {
        toret = "Ya habías leído \"Don Quijote\" antes. \
                 Te deleitas, sin embargo, curioseando por entre \
                 las primeras páginas.";
    }

    return toret;
};

var locGranja = ctrl.places.creaLoc(
    "Granja",
    [ "granja" ],
    "Una ${granja, ex granero} en evidente estado de abandono, \
    se sitúa en el centro de varios campos de cultivo, \
    que se extienden hacia el ${oeste, oeste}."
);
locGranja.pic = "res/barn.jpg";
locGranja.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.personas.getPlayer().say(
            "De nuevo, esa sensación de abandono... \
            ¿Qué puede haber pasado aquí? \
            Las tierras son fértiles y dadivosas."
        );
    }
};

var locIglesia = ctrl.places.creaLoc(
    "Iglesia",
    [ "iglesia" ],
    "El interior de la iglesia, sombrío y húmedo, te resulta desagradable. \
    Puedes ver un ${altar, ex altar} a medio construir... \
    el resto del edificio está vacío. Solo se puede ${salir, salir}."
);
locIglesia.pic = "res/church.jpg";
locIglesia.preExit = function() {
    ctrl.goto( locEpicuren );
    return "La claridad daña temporalmente tus ojos.";
};
locIglesia.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.print( "Te santiguas frente al altar." );
        ctrl.personas.getPlayer().say(
            "Por Dios que solventaré este misterio, encontrando a \
             las buenas gentes de Epicuren." );
    }
};

var locInteriorDelBosque = ctrl.places.creaLoc(
    "Interior del bosque",
    [ "interior del bosque" ],
    "El ${camino, ex pista} se bifurca aquí para permitir avanzar \
    hacia el ${este, este}, o en sentido contrario, \
    bajando hacia un pequeño valle al ${oeste, oeste}. \
    Una ligera depresión encamina al paso del río al ${sur, sur}. \
    El bosque empieza a mostrar mucha ${vegetación, ex arbustos} aquí, \
    hasta el punto de que por momentos es complicado avanzar."
);
locInteriorDelBosque.pic = "res/path_inside_forest.jpg";
locInteriorDelBosque.preGo = function() {
    var toret = "";
    var player = ctrl.personas.getPlayer();

    if ( parser.sentence.term1 == "sur" ) {
        toret = "Has cruzado el puente con mucho cuidado.";

        if ( npcSuperviviente.owner == this ) {
            toret += " Don Diego parece inquieto.";
            player.say(
                "No temáis D. Diego, he explorado la colonia \
                 sin peligros ni impedimentos." );
            npcSuperviviente.say( "Lo siento, no puedo evitarlo. \
                                   ¿Habéis ido allende las montañas?" );
            player.say( "No me pareció oportuno." );
            npcSuperviviente.say( "Allí empezó todo..." );
        }
    }

    goAction.exe( parser.sentence );
    return toret;
};

var locLago = ctrl.places.creaLoc(
    "Promontorio",
    [],
    "El camino se torna menos pedregoso a medida que se aleja de la orilla \
    hacia las ${montañas, ex sierra} al ${norte, norte}, \
    mientras muchas pequeñas piedras lisas se acumulan \
    en la orilla del ${lago, ex lago}. \
    Puedes ver una ${casa, ex casa} en un pequeño promontorio \
    sobre la superficie del agua."
);
locLago.pic = "res/house_lake.jpg";
locLago.objs.push( objSierra );
locLago.doEachTurn = function() {
    if ( this.has( objRemo )
      || ctrl.personas.getPlayer().has( objRemo ) )
    {
        objRemo.moveTo( objBote );
        ctrl.print( "Has colocado el remo en el bote." );
    }

    return;
};

locLago.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.personas.getPlayer().say(
            "¡Hola! ¿Qué tenemos aquí? \
             Parece un conjunto interesante..."
        );
    }

    return;
};

ctrl.creaObj(
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
     Puedes ${salir, sal}. \
     Contra una de las paredes hay un ${armario, ex armario}."
);
locHabitacionCasaLago.pic = "res/room.jpg";
locHabitacionCasaLago.preExit = function() {
    return ctrl.goto( locLago );
};

var objArmario = ctrl.creaObj(
    "armario",
    [ "puerta", "puertas", "hoja", "hojas", "cadena", "cierre" ],
    "Un armario se encuentra situado contra \
    la pared contraria a la puerta de la habitación.",
    locHabitacionCasaLago,
    Ent.Scenery
);

objArmario.unlocked = false;
objArmario.preExamine = function() {
    var toret = objArmario.desc;
    var player = ctrl.personas.getPlayer();

    if ( !this.unlocked ) {
        toret += " La apertura de las hojas está completamente bloqueada \
                   por una cadena.";

        if ( player.has( objCantoRodado )
          || player.has( objPiedraAfilada )
        )
        {
            toret += " Se te ocurre que podrías \
                       ${romper la cadena, golpea cadena}, usando \
                       el canto rodado del río.";
        }
        else
        if ( player.has( objPalanca ) ) {
            toret += " Se te ocurre que podrías intentar \
                       ${forzar la cadena, golpea cadena}, usando \
                       la palanca.";
        }
    } else {
        toret += " Las hojas están semiabiertas, \
                   permitiendo ver el interior, ";
        if ( objArmario.owner.has( objRemo ) ) {
            toret += "donde hay ${un remo, coge remo}.";
        } else {
            toret += "que está vacío.";
        }
    }

    return toret;
};

objArmario.preAttack = function() {
    var player = ctrl.personas.getPlayer();
    var toret = "Golpeas la cadena";

    if ( player.has( objCantoRodado )
      || player.has( objPiedraAfilada ) )
    {
        objRemo.moveTo( this.owner );
        objArmario.unlocked = true;
        toret += " con la piedra, rompiéndola al tercer intento. \
                  las ${hojas del armario, ex armario} se abren, libres...";
    }
    else
    if ( player.has( objPalanca ) ) {
        toret = "Aunque la cadena es demasiado corta como para poder abrir \
                  las puertas del armario, también es demasiado larga como \
                  para poder hacer fuerza con la palanca.";
    } else {
        toret += "... sin efecto alguno.";
    }

    return toret;
};

var objRemo = ctrl.creaObj(
    "remo",
    [ "pala" ],
    "Una pala en buenas condiciones.",
    ctrl.places.limbo,
    Ent.Portable
);

var locOrillaLago = ctrl.places.creaLoc(
    "Orilla opuesta",
    [],
    "Los guijarros de la reducida playa crujen bajo tus pies. \
     La entrada a la cueva está al pie mismo del arenal, \
     ligeramente ladeada con respecto a la misma. \
     Se puede ${entrar, este} sin complicaciones. \
     Has varado ${el bote, ex bote} en la orilla."
);
locOrillaLago.pic = "res/lake_shore.jpg";

var locCueva = ctrl.places.creaLoc(
    "Cueva",
    [ "astillero" ],
    "Dentro de la cueva encuentras varios ${restos, ex restos} \
     que te hacen pensar en que se le dio un uso de astillero a la misma. \
     Seguramente es donde se construyó el bote en el que llegaste. \
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
        ctrl.places.updateDesc();
        toret += " De entre todas ellas, \
                  localizas ${una cuerda, coge cuerda}.";
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
    "Una sorprendente llanura se extiende aparentemente en todas direcciones, \
    excepto allende el horizonte, donde se aprecian \
    las ${montañas al noreste, ex montanas} por un lado, \
    y ${densos bosques, ex bosques} por el otro. \
    Las ${colinas, ex lomas} se sitúan al ${sur, sur} \
    en un claro declive del terreno, a pesar de todo. \
    Dos sendas parten en sentidos contrarios de la dirección ${este, este} \
    a ${oeste, oeste}."
);
locLlanura.pic = "res/plain.jpg";

var locMolino = ctrl.places.creaLoc(
    "Represa del Molino",
    [ "represa" ],
    "Un ${gran molino, ex molino} se yergue sobre ${el río, ex rapidos}. \
    Aunque abandonado, se percibe aún la fuerza que gestionaba diariamente \
    cuando estaba en uso. Tiene adosado un pequeño almacén, hacia el \
    ${norte, n}. Un abrupto camino asciende hacia el ${este, e}."
);
locMolino.pic = "res/mill.jpg";

var locAlmacen = ctrl.places.creaLoc(
    "almacén",
    [ "almacen" ],
    "Húmedo y frío, este lugar no ha tenido el mantenimiento que debiera. \
     Hay aquí ${saquetas de grano, ex saquetas}, \
     puestas sin aparente orden ni concierto. \
     Puedes salir hacia el ${sur, sur}."
);
locAlmacen.setExitBi( "sur", locMolino );
locAlmacen.pic = "res/store.jpg";

var objSaquetas = ctrl.creaObj(
    "saquetas de grano",
    [ "saqueta", "grano", "saquetas", "sacos", "saco" ],
    "Saquetas de grano, la mayoría de ellas con la tela podrida, y el grano \
     desparramado por el suelo, seguramente como alimento para ratas y otras \
     alimañas. Parecen haber sido guardadas a toda prisa, sin pensar en que \
     el grano dure pasados los inviernos.",
    locAlmacen,
    Ent.Scenery
);
objSaquetas.vecesApartadas = 0;
objSaquetas.preExamine = function() {
    var toret = this.desc;

    if ( objCajas.owner == ctrl.places.limbo ) {
        toret += " Al fondo, tras las saquetas, parece haber algo más... \
                   podrías ${apartarlas, empuja saquetas} para ver lo que es.";
    }

    return toret;
};

objSaquetas.prePush = function() {
    var toret = "Vas apartando saquetas, pero hay mucho trabajo \
                 por delante, todavía.";

    ++this.vecesApartadas;
    if ( this.vecesApartadas > 2 ) {
        objCajas.moveTo( this.owner );
        toret = "Solo un cuarto del almacén está lleno de ${cajas, ex cajas}.";
        locAlmacen.desc += "<br/>Has ido apartando las saquetas hasta dejar \
                           al descubierto unas ${cajas, ex cajas}.";
        ctrl.personas.getPlayer().say(
                        "Estoy como avanzando por capas. En la primera, la más \
                         reciente, almacenaban el grano descuidadamente, en \
                         saquetas, \
                         aún sabiendo que no aguantaría mucho tiempo. \
                         Estas cajas, en cambio, \
                         correspondientes a la etapa más antigua, \
                         sí están preparadas para \
                         resistir durante largas temporadas \
                         las inclemencias del tiempo." );
        ctrl.places.updateDesc();
    }

    return toret;
};

var objCajas = ctrl.creaObj(
    "cajas de grano",
    [ "cajas", "grano", "caja" ],
    "Sólidas cajas que, presumes, estarán llenas de grano. Estas sí parecen \
     haber sido almacenadas correctamente para las épocas duras.",
    ctrl.places.limbo,
    Ent.Scenery
);
objCajas.primeraVezExaminado = true;
objCajas.preExamine = function() {
    var toret = this.desc;

    if ( this.primeraVezExaminado ) {
        this.primeraVezExaminado = false;
        objPalanca.moveTo( this.owner );
        ctrl.places.updateDesc();
        toret += " De entre las cajas, aparece una \
                  ${palanca, coge palanca}.";
        ctrl.achievements.achieved( "perseverant" );
    }

    return toret;
};

var locMuelle = ctrl.places.creaLoc(
    "Muelle",
    [ "muelle" ],
    "Las olas lamen las gruesas ${piedras, ex piedras} de la orilla, \
     suaves cantos rodados pulidos por los continuos embates de la mar. \
     El ${dañado muelle, ex atracadero} apenas se mantiene ya sobre el agua, \
     acusando un grave descuido. \
     Un camino discurre ascendente desde el muelle hacia el ${norte, norte}. \
     Observas cómo tus huellas se graban sobre el polvo, \
     siendo las únicas en el suelo."
);
locMuelle.pic = "res/dock.jpg";

var locPasaje = ctrl.places.creaLoc(
    "Pasaje",
    [ "pasaje" ],
    "El túnel continúa desde ${la salida, oeste} hacia el interior, \
    pero lo más destacable es un ${agujero en el suelo, ex agujero} \
    ligeramente apartado hacia un lateral, como si se hubiera desprendido \
    el suelo al crear el túnel."
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
        } else {
            toret = "No ves forma de descender. De hecho, parece que solo \
                     podríais descolgaros hasta abajo.";
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
    y se dirige hacia los límites del bosque al ${sur, sur}."
);
locPuente.pic = "res/bridge.jpg";
locPuente.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.personas.getPlayer().say(
            "¿Un puente tan alejado de la colonia? ¿Por qué?"
        );
    }
};

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
};

var locResidencialDeEpicuren = ctrl.places.creaLoc(
    "Residencial de Epicuren",
    [ "residencial de epicuren" ],
    "La colonia de Epicuren solo es un ${asentamiento, ex asentamiento} \
    incipiente, desde aquí, la zona residencial del pueblo, puedes ver \
    ${algunas casas, ex casas}, y la iglesia yendo hacia el ${este, este}. \
    Bajando hacia el embarcadero al ${sur, sur}, \
    se alcanza la base de esta planicie, \
    que por otra parte rompen las ${colinas, ex colinas}, \
    subiendo hacia el ${norte, n}."
);
locResidencialDeEpicuren.pic = "res/residential.jpg";
locResidencialDeEpicuren.postExamine = function() {
    if ( this.getTimesExamined() == 1 ) {
        ctrl.personas.getPlayer().say(
                            "Es desolador, inmensamente vacío... \
                             Aquí no hay nadie." );
    }
};

var locSantuario = ctrl.places.creaLoc(
    "Santuario",
    [ "santuario" ],
    "De sección circular, esta cueva agrandada y profundizada en la roca \
    está repleta de ${inscripciones, ex inscripciones}, \
    que hacen suponer su función de lugar de culto. \
    Un pequeño ${túnel, ex tunel} sale hacia el ${este, este}."
);
locSantuario.pic = "res/santuary.jpg";

var locTunelSantuario = ctrl.places.creaLoc(
    "Túnel",
    [ "tunel", "pasaje", "pasadizo" ],
    "Este bajo pasadizo en semipenumbra comunica el santuario, \
     al ${oeste, oeste}, con una sala más pequeña al ${este, este}."
);
locTunelSantuario.setExitBi( "oeste", locSantuario );
locTunelSantuario.pic = "res/tunnel_sanctuary.jpg";

var locSacristiaSantuario = ctrl.places.creaLoc(
    "Sala del guardián",
    [ "sacristia", "sala", "salon" ],
    "Una sala abovedada, también iluminada por alguna abertura en lo alto \
     alberga un reducido mobiliario, formado por una mesa, una silla \
     y poco más. Un túnel bajo parte hacia el ${oeste, oeste}."
);
locSacristiaSantuario.setExitBi( "oeste", locTunelSantuario );
locSacristiaSantuario.pic = "res/curator_room.jpg";

var objTunel = ctrl.creaObj(
    "Túnel",
    [ "tunel", "pasaje", "pasadizo" ],
    "El túnel está directamente excavado en la roca, y es ligeramente \
     más bajo que tú, por lo que es necesario caminar agachado por él.",
    locSantuario,
    Ent.Scenery
);
locSacristiaSantuario.objs.push( objTunel );

var locValleEnCortado = ctrl.places.creaLoc(
    "Valle en cortado",
    [ "valle en cortado" ],
    "Un cañón recubierto de distinta vida vegetal se abre \
     desde el ${oeste, oeste} hacia el ${este, este}."
);
locValleEnCortado.pic = "res/canyon.jpg";

var locValleFrondoso = ctrl.places.creaLoc(
    "Valle frondoso",
    [ "valle frondoso" ],
    "Una vegetación casi selvática forma el fondo de este valle. \
    La espesura no te permite apreciar ningún otro camino \
    aparte del que sube hacia un collado sobre el valle al ${este, e}."
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

// -- locClaroDelBosque
locClaroDelBosque.setExit( "este", locValleFrondoso );

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
        toret += "<br/>${Don Diego, habla con Diego} mira el agujero, \
                  nervioso, afirmando que no sabía nada de esto.";
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
        objNota.moveTo( this.owner );
        ctrl.places.updateDesc();
        toret += " Curioseas y soplas para levantar una densa nuble de polvo, \
                   dejando al descubierto una ${nota, coge nota} \
                   que no habías apreciado antes.";
    }

    return toret;
};

var objAnclajes = ctrl.creaObj(
    "anclajes",
    [ "anclajes" ],
    "Los anclajes están sueltos, \
     con sus amarres desperdigados por el suelo.",
    locPuente,
    Ent.Scenery
);
objAnclajes.secured = false;
objAnclajes.preExamine = function() {
    var toret = this.desc;
    var player = ctrl.personas.getPlayer();

    if ( !this.secured ) {
        if ( player.has( objEstaca ) ) {
            toret += "<br/>Podrías \
                      ${asegurar el cordaje con la estaca, deja estaca} \
                      que llevas...";
            player.say( "¿Es posible que alguien tenga tanto miedo? ¿A qué?" );
        } else {
            if ( player.has( objPalanca ) ) {
                toret += " Podrías intentar \
                          ${usar la barra, deja barra} \
                          para asegurar el cordaje, de manera que los \
                          amarres queden asegurados...";
            } else {
                toret += " Sería necesario tener un poste o algo \
                        al que poder \
                        atar todo el cordaje. Quien hiciera esto, \
                        no quiere que nadie cruce.";
            }

            player.say( "Piensa... \
                         es necesario clavar algo para atar el cordaje..." );
        }
    } else {
        toret = "Los anclajes son ahora firmes y seguros.";
    }

    return toret;
};

ctrl.creaObj(
    "apertura",
    [ "apertura" ],
    "El claro es como un respiro en medio de tanta vegetación.",
    locClaroDelBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "arboleda",
    [ "arboleda" ],
    "La arboleda, de ejemplares con bastante separación entre ellos, \
     comienza aquí.",
    locCaminoHaciaElBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "arbustos",
    [ "arbustos" ],
    "La vegetación se cierra aquí sobre el ${camino, ex pista}.",
    locInteriorDelBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "asentamiento",
    [ "asentamiento" ],
    "Se trata de una colonia en una fase inicial de asentamiento. \
    Esta es la zona residencial, mientras el centro del pueblo se sitúa \
    hacia el ${este, este}.",
    locResidencialDeEpicuren,
    Ent.Scenery
);

ctrl.creaObj(
    "bordes",
    [ "bordes" ],
    "Los bordes de las zanjas empiezan a perderse, \
     pareciendo todo el terreno llano.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "bosque",
    [ "bosque" ],
    "El bosque se sitúa hacia el ${noreste, n}, aunque no en pendiente.",
    locEpicuren,
    Ent.Scenery
);

ctrl.creaObj(
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

    if ( this.has( objRemo ) ) {
        if ( this.owner == locLago ) {
            this.moveTo( locOrillaLago );
            ctrl.goto( locOrillaLago );
            ctrl.achievements.achieve( "sailor" );
            toret = "Remando con esfuerzo, has llegado a tu destino: \
                     la cueva.";
        } else {
            this.moveTo( locLago );
            ctrl.goto( locLago );
            toret = "Remando con mucho esfuerzo, \
                     has llegado de vuelta a la casa.";
        }
    }

    return toret;
};

ctrl.creaObj(
    "cabanas",
    [ "cabanas" ],
    "Se trata de sólidas construcciones de toscos troncos, no tablones.",
    locAsentamiento,
    Ent.Scenery
);

ctrl.creaObj(
    "campos",
    [ "campos" ],
    "Los campos mantienen cosechas que ya se han perdido, y nadie recogerá. \
    Las malas hierbas empiezan a destruir el cuidado ${trabajo, ex trabajos} \
    de años, ordenando los cultivos.",
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
};

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
            toret = "Fuerzas los tablones con la palanca, \
                     quitándolos del medio.";
        } else {
            toret = "No puedes hacer gran cosa con las manos desnudas.";
        }
    }

    return toret;
};

ctrl.creaObj(
    "casas",
    [ "casas" ],
    "Puedes ver varias casas, deterioradas por el abandono de algunos años. No están en peligro de derrumbe, pero se nota que hace tiempo que no se habitan.",
    locResidencialDeEpicuren,
    Ent.Scenery
);

ctrl.creaObj(
    "depresión",
    [ "depresion" ],
    "Las montañas rodean un hoyo natural, que seguramente se llena de agua en invierno, pero que ahora se encuentra en pleno estío.",
    locCirco,
    Ent.Scenery
);

ctrl.creaObj(
    "colinas",
    [ "colinas" ],
    "${Hacia el norte, norte} puedes ver las colinas que delimitan el asentamiento por ese lado.",
    locResidencialDeEpicuren,
    Ent.Scenery
);

ctrl.creaObj(
    "construcciones",
    [ "construcciones" ],
    "Diferentes edificios, la mayoría sin terminar y abandonados.",
    locEpicuren,
    Ent.Scenery
);

ctrl.creaObj(
    "escuela",
    [ "escuela" ],
    "Al final del camino se asienta una pequeña escuela. \
    El edificio, terminado pero abandonado, \
    se alza como un fantasma entre los árboles. La puerta del apartado \
    edificio se encuentra entreabierta, \
    por lo que podrías ${entrar, s}.",
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
        ctrl.achievements.achieved( "engineer" );
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
    "Las estacas mantienen las divisiones entre sectores de cultivo, \
     distintas semillas...",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

objEstacas.preExamine = function() {
    var toret = this.desc;

    if ( ctrl.places.limbo.has( objEstaca ) ) {
        toret += " Vaya, una de ellas ${está suelta, coge estaca}.";
        objEstaca.moveTo( this.owner );
        ctrl.places.updateDesc();
        ctrl.achievements.achieved( "farmer" );
    }

    return toret;
};

ctrl.creaObj(
    "granero",
    [ "granero" ],
    "Se trata de un gran granero en el que guardar y tratar cosechas. No hay nada en su interior más que algo de ${paja, ex paja}.",
    locGranja,
    Ent.Scenery
);

ctrl.creaObj(
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

ctrl.creaObj(
    "inscripciones",
    [ "inscripciones" ],
    "No puedes descrifrarlas, no se parecen a nada que conozcas.",
    locSantuario,
    Ent.Scenery
);

ctrl.creaObj(
    "lago",
    [ "lago" ],
    "Puedes apreciar un intenso color verde en el agua, que asemeja \
    su bruñida superficie a un gran terciopelo esmeralda. \
    En la orilla frente a la casa,  puedes ver un ${bote, ex bote}. \
    Al otro lado del lago, fuera de tu alcance, \
    puedes ver ${una cueva, ex cueva}.",
    locLago,
    Ent.Scenery
);

ctrl.creaObj(
    "lomas",
    [ "lomas" ],
    "Situadas al ${sur, sur}, \
    son otro de los límites naturales de esta planicie.",
    locLlanura,
    Ent.Scenery
);

ctrl.creaObj(
    "mina",
    [ "mina" ],
    "No parece invitar a entrar con la negrura que exhibe. \
    Pero puedes ${intentar hacerlo, este}.",
    locEntradaDeLaMina,
    Ent.Scenery
);

ctrl.creaObj(
    "molino",
    [ "molino" ],
    "La entrada del molino está taponada con zarzas, \
     aunque por lo que puedes ver por las ventanas, \
     no hay nada interesante en su interior.",
    locMolino,
    Ent.Scenery
);

var objPalanca = ctrl.creaObj(
    "palanca",
    [ "barra" ],
    "Una barra de hierro que sirve como palanca.",
    ctrl.places.limbo
);
objPalanca.preDrop = function() {
    var toret = "No estoy seguro sin ella.";

    if ( ctrl.places.getCurrentLoc() == locPuente ) {
        ctrl.personas.getPlayer().say( "Mmm... no tiene una punta afilada \
                                        que se pueda clavar." );
        toret = "No funcionará.";
    }

    return toret;
};

ctrl.creaObj(
    "montanas",
    [ "montanas" ],
    "Las montanas son pedregosas, en contraste con esta llanura, \
     aunque no muy altas.",
    locLlanura,
    Ent.Scenery
);

ctrl.creaObj(
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

objNota.postTake = function() {
    ctrl.achievements.achieved( "flee_note" );
    ctrl.print( this.desc );
};

ctrl.creaObj(
    "paja",
    [ "paja" ],
    "Paja y más paja.",
    locGranja,
    Ent.Scenery
);

ctrl.creaObj(
    "piedras",
    [ "piedras" ],
    "Enormes y pesados cantos rodados, suaves en sus formas.",
    locMuelle,
    Ent.Scenery
);

ctrl.creaObj(
    "pista",
    [ "pista" ],
    "El camino está realmente muy transitado en este lugar.",
    locInteriorDelBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "poblado",
    [ "poblado" ],
    "Son varias ${cabañas, ex cabanas} que están habitadas, \
    o al menos lo estuvieron hasta hace muy poco. \
    Si bien parecen sólidas, su diseño no es tan meditado \
    como las de la colonia, mostrando distintos grados de acabado.",
    locAsentamiento,
    Ent.Scenery
);

ctrl.creaObj(
    "pueblo",
    [ "pueblo" ],
    "El pueblo se sitúa en lontananza, hacia el ${sur, sur}.",
    locCaminoHaciaElBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "puente",
    [ "puente" ],
    "El puente está decrépito y abandonado. Fijándote en \
    ${los anclajes, ex anclajes}, te das cuenta de que \
    el deterioro del puente no es natural, sino deliberado. \
    Alguien no está interesado en que sea ${cruzado, norte}.",
    locPuente,
    Ent.Scenery
);

var objRapidos = ctrl.creaObj(
    "rápidos",
    [ "rapidos" ],
    "El río discurre de norte a sur, en una zona de rápidos \
    que le dan gran fuerza a las aguas.",
    locMolino,
    Ent.Scenery
);

var objCantoRodado = ctrl.creaObj(
    "canto rodado",
    [ "canto", "rodado", "roca" ],
    "Un pesado aunque pulido canto rodado.",
    ctrl.places.limbo,
    Ent.Portable
);

objRapidos.preExamine = function() {
    var toret = objRapidos.desc;

    if ( ctrl.places.limbo.has( objCantoRodado ) ) {
        objCantoRodado.moveTo( this.owner );
        ctrl.places.updateDesc();
        toret += " En la orilla más cercana, se acumulan \
                   cantos rodados de gran tamaño.";
    } else {
        toret += " En ambas orillas se asientan cantos rodados \
                   de todos los tamaños.";
    }

    return toret;
};

ctrl.creaObj(
    "riegos",
    [ "riegos" ],
    "Canalizaban el agua que se vertía abundantemente para asegurar la correcta hidratación de cada ${sector, ex sectores} de los cultivos.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "rio",
    [ "rio" ],
    "Discurre de norte a suroeste.",
    locPuente,
    Ent.Scenery
);

ctrl.creaObj(
    "sectores",
    [ "sectores" ],
    "Las plantaciones se dividían en sectores, cultivando distintos tipos de semillas y tubérculos.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "selva",
    [ "selva" ],
    "Un bosque frondoso y húmedo.",
    locBordeDelBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "senda",
    [ "senda" ],
    "Marcada como nunca durante el camino, \
    queda claro que pasaban carromatos con frecuencia por esta parte.",
    locCruceDeCaminos,
    Ent.Scenery
);

ctrl.creaObj(
    "sendero",
    [ "sendero" ],
    "Te sorprende que exista un sendero, y un puente, en este lugar. \
    Está claro que se trata de una zona habitada... \
    ¿aunque, quizás también abandonada?",
    locPuente,
    Ent.Scenery
);

ctrl.creaObj(
    "sotobosque",
    [ "sotobosque" ],
    "El bosque es amplio, permitiendo pasar la luz del sol. \
    El suelo está también bastante limpio de matojos.",
    locBosquePocoDenso,
    Ent.Scenery
);

ctrl.creaObj(
    "trabajos",
    [ "trabajos" ],
    "${Vallas, ex vallas}, ${zanjas, ex zanjas}, ${riegos, ex riegos}... \
    el trabajo realizado es incomensurable.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "vallas",
    [ "vallas" ],
    "Las vallas están ahí para que el ganado no interfiera con las cosechas. \
    Están basadas en gruesas ${estacas, ex estacas}, \
    que dividen también ${distintos sectores, ex sectores}.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "valle",
    [ "valle" ],
    "Es angosto y denso.",
    locClaroDelBosque,
    Ent.Scenery
);

ctrl.creaObj(
    "vegetacion",
    [ "vegetacion" ],
    "Bastante densa, aunque agradable a la vista.",
    locCaminoDelMuelle,
    Ent.Scenery
);

ctrl.creaObj(
    "vereda",
    [ "vereda" ],
    "Serpentea por entre colinas y pasos rocosos, \
    conformándose como una pequeña tira sin vegetación.",
    locCaminoDelLago,
    Ent.Scenery
);

ctrl.creaObj(
    "zanjas",
    [ "zanjas" ],
    "Las zanjas han empezado a suavizar sus ${bordes, ex bordes}: \
    en muy poco tiempo, será imposible distinguirlas del resto del terreno.",
    locCaminoDeLosCultivos,
    Ent.Scenery
);

ctrl.creaObj(
    "zarzas",
    [ "zarzas" ],
    "Las zarzas impiden el acceso al río, \
     que de hecho no parece demasiado profundo.",
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

function amusing() {
    return "Este relato fue creado para la <i>JAMCanciones</i> en 2017.<br/> \
            El objetivo era crear ficción interactiva basada en relatos de \
            frontera, inspirándose en ciertas canciones, como por ejemplo, \
            la que elegí para esta ocasión: <i>Nómadas</i>, \
            de Franco Battiato.";
}

var htmlRestartEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.<br/>\
                         <i><a href='#' onClick=\"javascript: \
                         document.getElementById('pAmenity').\
                         style.display='block'; return false\">\
                         Ver curiosidades</a>.</i></p>\
                         <p id='pAmenity' align='right' style='display: none'>"
                         + amusing();

var ending = ctrl.creaObj(
    "ending",
    [],
    "",
    locSacristiaSantuario,
    Ent.Scenery
);

ending.preExamine = function() {
    var dvCmds = ctrl.getHtmlPart( "dvCmds" );
    dvCmds.style.display = "none";
    ctrl.endGame( "<p>El guardián os indica cómo salir de la cueva.<br/>\
                    Camináis apesadumbrados por un pedregoso sendero, \
                    camino del muelle al que arribasteis.<br/>\
                    ─D. Juan, parece que no hay posibilidades.<br/> \
                    ─Así es, D. Diego, mi misión ha fracasado. \
                    Debéis abandonar este lugar, \
                    pues será menester atacar con un gran ejército.<br/>\
                    ─Partiré con vos, si me lo permitís.<br/>\
                    ─Por supuesto."
        + htmlRestartEnding
        + "</p><p>Logros:<br/>"
        + ctrl.achievements.completedAsText() + "</p>",
        "res/dock.jpg" );
    return "";
};

npcSuperviviente.preTalk = function() {
    var toret = "Sombrío, no parece interesado en hablar más.";
    var player = ctrl.personas.getPlayer();
    var loc = ctrl.places.getCurrentLoc();

    ctrl.clearAnswers();

    if ( loc == locSacristiaSantuario ) {
        this.status = 6;
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
        this.say( "¿Trastornado? ¡Santo cielo!" );
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
        ctrl.print( "Meneas la cabeza hacia los lados, \
                     descartando la protesta de D. Diego." );
        player.say( "Les conozco. Han atacado otras colonias. \
                     No sabemos por qué. \
                     Siempre llevan estas pieles cubriéndoles el cuerpo, \
                     para intimidar, supongo, a sus enemigos." );
        ctrl.print( "No sin dificultad, retiras la piel de oso \
                     que hacía de vestimenta del nómada. \
                     La cabeza del oso cubría también su cara, \
                     mostrando unas curiosas manchas de pelo blanco \
                     alrededor de los ojos, huecos vacíos que, en conjunto \
                     actúan como una máscara completa. \
                     Aunque se puede ver ya que sin duda \
                     se trata de un hombre, ahora desnudo, \
                     D. Diego sigue sin acercarse, \
                     un temor cerval le invade." );
        player.say( "¿Qué le pasó a este?" );
        this.say( "Fue el único que se aventuró por estos lares, \
                   después de que abandonásemos la colonia, \
                   inutilizáramos el puente, \
                   y nos asentáramos aquí. Por algún motivo, \
                   vino solo, le vimos llegar y le matamos. \
                   Le dejamos ahí, no nos atrevimos a más." );
        player.say( "¿Quiénes?" );
        this.say( "Mis compañeros, amigos, vecinos... \
                   todos muertos o huídos en \
                   embarcaciones improvisadas a un lugar más favorable." );
        this.say( "¿Cómo es que la Corte nos envió aquí, \
                   conociendo el peligro?" );
        ctrl.print( "Haces un amplio gesto semicircular con la mano." );
        player.say( "Solo han atacado media docena de asentamientos. \
                     Sabemos muy poco de ellos. \
                     ¿Dónde van a atacar? ¿Por qué lo hacen? \
                     Ni siquiera son habitantes autóctonos de las tierras \
                     de las colonias, siempre aparecen después... \
                     No sabemos gran cosa. Solo que aparecen, \
                     atacan y se van a otra colonia... y entonces de nuevo \
                     atacan y se retiran. \
                     Por eso, les llamamos los nómadas." );

        npcNomada.id = "nómada";
        ++npcNomada.status;
    }
    else
    if ( this.status == 3 ) {
        toret = "";
        player.say( "Entonces, ¿el ataque de los nómadas propició la huída \
                     de las gentes?" );
        this.say( "Sí, así es... construyeron embarcaciones más o menos \
                  resistentes... Dejaron la colonia... \
                  no sé a dónde fueron. Ni si llegaron." );
        player.say( "Quiero seguir explorando la colonia... \
                     tiene que haber algo más." );
        this.say( "Contad con mi ayuda." );
    }
    else
    if ( this.status == 4 ) {
        toret = "";
        ++this.status;

        player.say( "¿Una mina? ¿Aquí?" );
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
                   al noreste de la colonia." );
        player.say( "Querría ver esa mina." );
        this.say( "De acuerdo." );
    }
    else
    if ( this.status == 6 ) {
        toret = "";
        this.say( "Es mejor que habléis con el guardián, D. Juan." );
        ctrl.print( "Asientes." );
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
            de tu acompañante), y compruebas que no es más que un hombre \
            envuelto en piel de oso. \
            Está concienzudamente disfrazado, eso sí." );
    }
    else
    if ( this.status == 1 ) {
        toret = "";
        ctrl.print( "El nómada está muerto." );
    }

    return toret;
};

var npcGuardian = ctrl.personas.creaPersona(
    "guardián nómada",
    [ "guardian", "nativo", "nomada" ],
    "El guardián del santuario nómada, un nativo con tan solo una \
    piel de oso sobre sus hombros, \
    con el cráneo y maxilar superior cubriendo su cabeza.",
    locSacristiaSantuario
);
npcGuardian.status = 0;
npcGuardian.preTalk = function() {
    var player = ctrl.personas.getPlayer();

    ctrl.clearAnswers();

    if ( this.status == 0 ) {
        this.say( "Saludos, extranjeros." );
        player.say( "¿Conoces nuestro idioma?" );
        this.say( "Hemos estudiado algunos de vuestros escritos." );
        player.say( "¿Pero cómo...?" );
        this.say( "Nuestra cultura es antigua, y nuestro conocimiento, \
                    extenso." );
        ctrl.print( "El guardián hace un gesto amplio con la mano. \
                    De alguna manera, sabes que este tema ha terminado." );
        player.say( "Soy D. Diego Vélez, emisario del Virrey de Nueva España, \
                    con poderes para pactar un acuerdo con vos." );
        ctrl.print( "Acompañas tu presentación con una cortés reverencia, \
                    como mandan los buenos usos y costumbres." );
        this.say( "Sed bienvenido. Soy el guardián de este templo." );
        ctrl.print( "Se instala un silencio tenso. Esperabas que tus palabras \
                    fuesen recibidas con mucho más entusiasmo." );
        ctrl.achievements.achieved( "ambassador" );
        ++this.status;
    }
    else
    if ( this.status == 1 ) {
        player.say( "Guardián, debemos llegar a un acuerdo para que \
                     nuestros pueblos puedan convivir en paz." );
        this.say( "Nosotros somos los dueños de esta tierra, no hay otro \
                   acuerdo posible que el que la abandonéis \
                   y no volváis más." );
        ctrl.print( "No esperabas, desde luego, una respuesta tan tajante." );
        player.say( "Pero..." );
        this.say( "Nuestro pueblo viaja continuamente, siguiendo \
                   estaciones y migraciones, de isla en isla, \
                   adorando a nuestros dioses \
                   en templos como este, repartidos por toda la Tierra." );
        ctrl.print( "Abre los brazos, como abarcando el lugar." );
        player.say( "La Tierra es vasta, nosotros provenimos \
                     del otro lado del océano." );
        ctrl.print( "No puedes evitar cierto sentimiento de superioridad." );
        this.say( "Entonces, deberíais volver allí." );
        ctrl.print( "Su respuesta, además de aniquilar tu \
                     sentimiento de superioridad, se te antoja ofensiva, \
                     aunque su rostro no refleja ninguna animosidad." );
        player.say( "Eso no es posible. Hemos venido para quedarnos." );
        this.say( "Sois un pueblo egoísta, entonces." );
        player.say( "Aquí hay recursos que en nuestro lugar de origen \
                     no tenemos." );
        this.say( "Podemos comerciar. Pero debéis volver a vuestra tierra." );
        ctrl.print( "Sacudes la cabeza." );
        player.say( "Eso no sucederá." );
        this.say( "Entonces habrá guerra, y os destruiremos." );
        ctrl.print( "De nuevo una respuesta ofensiva, \
                     expresada a la manera de la pura lógica." );

        ++this.status;
    }
    else
    if ( this.status == 2 ) {
        ctrl.print( "No sabes cómo plantearle la situación..." );
        player.say( "Los míos llegarán en grandes números, \
                     más aún que ahora." );
        ctrl.print( "Te apresuras a continuar." );
        player.say( "Nuestras técnicas y medios de guerra son superiores. \
                     Vosotros seréis aniquilados, cosa que no es necesaria \
                     teniendo en cuenta que podemos llegar a un acuerdo." );
        ctrl.print( "Parece que el guardián no está impresionado, \
                     ni siquiera interesado, pero es importante \
                     hacer llegar el mensaje completo." );
        player.say( "Podemos designar un grupo de islas \
                     que no hollaremos nunca, de forma que vuestro pueblo \
                     pueda vivir en paz en ellas." );
        this.say( "Mi pueblo se expande por todas las islas. Ya nos hemos \
                   enfrentado a otros enemigos, y les hemos vencido." );
        player.say( "No como nosotros. No podéis ganar." );
        this.say( "Ya lo hemos hecho." );
        ctrl.print( "De nuevo la aplastante lógica." );
        player.say( "No eran soldados, \
                     solo simples gentes que buscaban un futuro." );
        this.say( "Pero no el suyo, sino el nuestro." );
        ++this.status;
    }
    else
    if ( this.status == 3 ) {
        ctrl.print( "Intentas volver a hablar con el guardián, \
                     pero hace un gesto conminando a guardar silencio." );
        actions.execute( "examine", "ending" );
    }

    return;
};

// Achievements ================================================================
ctrl.achievements.add( "flee_note",
                       "Explorador (encontraste la nota de huida)." );
ctrl.achievements.add( "bucket",
                       "Ordenado (recogiste el cubo)." );
ctrl.achievements.add( "perseverant",
                       "Perseverante (encontraste la palanca)." );
ctrl.achievements.add( "curious",
                       "Curiosón (leíste el libro)." );
ctrl.achievements.add( "farmer",
                       "Granjero (encontraste la estaca)." );
ctrl.achievements.add( "engineer",
                       "Ingeniero (arreglaste el puente)." );
ctrl.achievements.add( "sailor",
                       "Navegante (cruzaste el lago)." );
ctrl.achievements.add( "ambassador",
                       "Embajador (hablaste con el guardián)." );

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
        var dvDesc = document.getElementById( "dvDesc" );
        var pMsg = document.createElement( "p" );

        npcSuperviviente.moveTo( ctrl.places.getCurrentLoc() );
        pMsg.innerHTML = ctrl.cnvtTextLinksToHtml(
                "D. ${Diego, habla con Diego} va contigo." );
        dvDesc.append( pMsg );
    }
};

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
};

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
ctrl.places.ponInicio( locMuelle );
