var comptadorHotels = 0;

        //Generar el Json del llitat d'hotels.
        function generarJsonHotels() {
            var llistaHotels = new Array();

            //Cada input hiden te el class jsonHotel. El getElementsByClassName ens retorna una llista d'elements.
            //Els recorrerem per recollir le dades dels hotels.
            var liHotels = document.getElementsByClassName("jsonHotel");
            //Comprovem si en tenim algún.
            if (liHotels != null) {
                for (var i = 0; i < liHotels.length; i++) {    
                    elementHotel =  liHotels.item(i);
                    var objHotel = new Object();
                    objHotel = JSON.parse(elementHotel.value);               
                    llistaHotels.push(objHotel);
                }
            }
            var jsonString = JSON.stringify(llistaHotels);
            document.getElementById("JsonText").innerText = jsonString;
        }

        /************
        Funció auxiliar per quan afegim o modificam un hotel.
        Revisarem si les dades estan completades correctament.
        Es podria fer amb subfuncions per controlar els diferents tipus de dades. Strings, numerics etc.
        **************/
        function controlDeLesDades() {
            var strErrors = "";

            //Si el nom no l'han introduit serà error.
            if (document.getElementById("nomHotel").value == "") {
                //El \n és un bot de linea.
                strErrors += "Nom no introduït\n";
            }

            if (document.getElementById("estrellesHotel").value == "0") {
                //El \n és un bot de linea.
                strErrors += "Número d'estrelles no introduït\n";
            }
            if (document.getElementById("mascotes").value == null){
                strErrors += "Mascotes no introduides\n";
            }
            if (document.getElementById("habitacions").value == "0"){
                strErrors += "Nombre d'Habitacions no introduit\n";
            }
            if (document.getElementById("capacitat").value == "0"){
                strErrors += "Capacitat maxima no introduida\n";
            }
            return strErrors;
        }

        //Generar l'objecte d'un hotel amb les dades introduides.
        function generarObjHotel(id) {
            var hotel = new Object();
            hotel.id = id;
            hotel.nom = document.getElementById("nomHotel").value;
            hotel.estrelles = document.getElementById("estrellesHotel").value;    
            hotel.mascotes =document.getElementById("mascotes").checked;    
            hotel.numHabitacions =document.getElementById("habitacions").value;       
            hotel.capacitatMaxima =document.getElementById("capacitat").value;  
            hotel.eMascotes=document.getElementById("eMascotes").checked;
            hotel.tipomascota=document.getElementById("tipomascota").checked;     
            hotel.piscina =document.getElementById("piscina").checked;
            hotel.gimnas = document.getElementById("gimnas").checked;
            hotel.date =document.getElementById("date").value;    
            hotel.email = document.getElementById("email").value;  
            
            return hotel;
        }
        
        //Afegirem un hotel. Controlarem si les dades són correctes i el ficarem a la llista i generarem el Json.
        function afegirHotel() {
            var dadesCompletes = controlDeLesDades();
            var idLlista = comptadorHotels;
            comptadorHotels += 1;
            if (dadesCompletes == "") {
                var objHotel = generarObjHotel(idLlista);
                //Crearem un element més a la llista d'hotels
                var strHtmlHotel = "<li id=\"liHotel" + idLlista + "\">";
                //Crearem un input hidden. Com un text, però no visible per guardar el Json de l'hotel
                strHtmlHotel += "<label id=\"lblNomHot" + idLlista + "\">" + objHotel.nom + "</label>";
                strHtmlHotel += "<input type=\"hidden\" class=\"jsonHotel\" id=\"jsonHotel" + idLlista + "\" value=\"\" />";
                //Crearem un botó per eliminar l'hotel
                strHtmlHotel += "<button onclick=\"eliminarHotel(" + idLlista + ")\">Eliminar</button>";
                //Crearem un botó per modificar l'hotel
                strHtmlHotel += "<button onclick=\"modificarHotel(" + idLlista + ")\">Modificar</button>";
                strHtmlHotel += "</li>";
                var jsonHotel = JSON.stringify(objHotel);
                document.getElementById("llistaHotels").innerHTML += strHtmlHotel;
                //Asignam el json al input hidden del hotel. Ho faig aquí així no he de fer el parse de les ". Ja ho fa javascript automàtic.
                document.getElementById("jsonHotel" + idLlista).value = jsonHotel;
                netejarCamps();
                alert("Afegit correctament");
            } else {
                alert("Falten dades per completar:\n" + dadesCompletes);
            }
        }

        //Modificació de les dades d'un hotel.
        function desarModificacioHotel() {
            var idLlista = document.getElementById("idHotel").value;
            var dadesCompletes = controlDeLesDades();
            if (dadesCompletes == "") {
                var objHotel = generarObjHotel(idLlista);
                document.getElementById("lblNomHot" + idLlista).innerHTML = objHotel.nom;
                var jsonHotel = JSON.stringify(objHotel);
                document.getElementById("jsonHotel" + idLlista).value = jsonHotel;
                netejarCamps();
            }
        }

        //Carregam les dades al main i preparam el botons per desar modificacions i no ficar un nou hotel
        function modificarHotel(idLi) {
            var objHotel = new Object();
            objHotel = JSON.parse(document.getElementById("jsonHotel" + idLi).value);
            document.getElementById("nomHotel").value = objHotel.nom;
            document.getElementById("estrellesHotel").value = objHotel.estrelles;
            document.getElementById("idHotel").value = idLi;
            document.getElementById("capacitat").value= objHotel.capacitatMaxima;
            document.getElementById("email").value= objHotel.email; 
            document.getElementById("habitacions").value= objHotel.numHabitacions;      
            document.getElementById("date").value= objHotel.date;
            document.getElementById("piscina").checked= objHotel.piscina;
            document.getElementById("gimnas").checked= objHotel.gimnas;
            document.getElementById("tipomascota").checked=objHotel.tipomascota;
            document.getElementById("eMascotes").checked= objHotel.eMascotes;
            document.getElementById("mascotes").checked= objHotel.mascotes;
            document.getElementById("modificar").style.display = "inline";
            document.getElementById("afegir").style.display = "none";
        }

        //Deixam tots els camps sense valors, per realitzar la pròxima operació.
        function netejarCamps() {
            document.getElementById("nomHotel").value = "";
            document.getElementById("estrellesHotel").value = 0;
            document.getElementById("idHotel").value = "";
            document.getElementById("habitacions").value= 0;
            document.getElementById("capacitat").value= 0;
            document.getElementById("mascotes").checked= false;           
            document.getElementById("email").value= " ";
            document.getElementById("piscina").checked= false;           
            document.getElementById("gimnas").checked= false;          
            document.getElementById("eMascotes").checked= false;           
            document.getElementById("tipomascota").checked= false;           
            document.getElementById("date").value= " ";           

            //Deixam la visibilitat dels botons per defecte.
            document.getElementById("modificar").style.display = "none";
            document.getElementById("afegir").style.display = "inline";
        }

        //Eliminar un hotel. Seleccionat l'hotel l'eliminam de la llista.
        function eliminarHotel(idLi) {
            var hotel = document.getElementById("liHotel"+idLi);
            if (!hotel) {
                alert("L'hotel seleccioninat no existeix.");
            } else {
                if (confirm("Segur que vols eliminar l'hotel?")) {
                    var nodePare = hotel.parentNode;
                    nodePare.removeChild(hotel);
                    alert("Eliminat correctament.");
                }
            }
        }

        function controlMascotes() {
            if (document.getElementById("mascotes").checked == true) {                
                document.getElementById("dvMascotes").style.display = "block";
            } else {
                document.getElementById("dvMascotes").style.display = "none";
            }
        }          