const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
    if (user) {
        loggedInLinks.forEach((link) => (link.style.display = "block"));
        loggedOutLinks.forEach((link) => (link.style.display = "none"));
    } else {
        loggedInLinks.forEach((link) => (link.style.display = "none"));
        loggedOutLinks.forEach((link) => (link.style.display = "block"));
    }
};

function guardar() {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha = document.getElementById('fecha').value;
    db.collection("users").add({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}




var datosPerson = document.querySelector('#datosPerson')

db.collection("users").onSnapshot((querySnapshot) => {
    datosPerson.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        datosPerson.innerHTML += `
                        <div class="row">
                            <div class="col-6">
                                    <small>Datos de la persona:</small><br>
                                    <small>Nombre: ${doc.data().first}</small><br>
                                    <small>Apellidos: ${doc.data().last}</small><br>
                                    <small>Fecha de nacimiento: ${doc.data().born}</small>
                                    <br>
                                </div>
                                <div class="col-6">

                                        <small style="text-align:center;">Acciones</small><br><br>
                                    <div class="row">
                                        <div class="col-6">
                                            <button type="button" class="btn btn-danger btn-sm btn-block"><i class="material-icons text-center " onclick="eliminar('${doc.id}')">delete</i></button> 
                                        </div>
                                        <div class="col-6">
                                            <button type="button" class="btn btn-warning btn-sm btn-block" onclick="editar('${doc.id}', '${doc.data().first}','${doc.data().last}','${doc.data().born}')"><i class="material-icons text-center">create</i></button><br>
                                        </div>
                                </div>

                            </div>
                        </div><hr>`;
    });
});



function eliminar(id) {
    db.collection("users").doc(id).delete().then(function() {
        console.log("Eliminaste un dato");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function editar(id, nombre, apellido, fecha) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    var butonEditar = document.getElementById('editar');
    butonEditar.innerHTML = 'Editar';

    butonEditar.onclick = function() {
        var washingtonRef = db.collection("users").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;


        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
                first: nombre,
                last: apellido,
                born: fecha
            })
            .then(function() {
                console.log("Document successfully updated!");
                butonEditar.innerHTML = 'Guardar';
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';

            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }







    const registrarform = document.querySelector('#registrar-form');
    registrarform.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit');
        const registraremail = document.querySelector('#registrar-email').value;
        const registrarpassword = document.querySelector('#registrar-password').value;
        console.log(registraremail, registrarpassword);
        firebase.auth().createUserWithEmailAndPassword(registraremail, registrarpassword)
            .then((user) => {
                registrarform.reset();
                $('#registrar').modal('hide')
            })
    })
    const ingresarform = document.querySelector('#ingresar-form');
    ingresarform.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("correcto ingreso");
        const ingresaremail = document.querySelector('#ingresar-email').value;
        const ingresarpassword = document.querySelector('#ingresar-password').value;
        console.log(ingresaremail, ingresarpassword);

        firebase.auth().signInWithEmailAndPassword(ingresaremail, ingresarpassword)
            .then((user) => {
                ingresarform.reset();
                $('#ingresar').modal('hide')
                console.log("ingresaste correctamente");
            })
    })
    const salir = document.querySelector('#salir');
    salir.addEventListener('click', e => {
        e.preventDefault();
        auth.signOut()
            .then(() => {
                console.log("Saliste de tu cuenta");
                location.reload();
            })
    })



}


const nombreUsuario = document.querySelector('#datosCliente')
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //console.log("Ingresaste");
        console.log(user);
        db.collection("publicaciones")
            .get()
            .then((snapshot) => {
                viapost(snapshot.docs);
                loginCheck(user);
            });

        nombreUsuario.innerHTML = user.displayName;

    } else {
        viapost([])
        loginCheck(user);
        console.log("Saliste");

    }
})
const viapost = data => {
        if (data.length) {

        } else {


        }
    }
    //google

const googleB = document.querySelector('#google');
googleB.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            console.log("ingreso google ");
            ingresarform.reset();
            $('#ingresar').modal('hide')
        })
        .catch(err => {
            console.log(err);
        })

    console.log('click en google');
})

//facebook


const facebookButton = document.querySelector('#face');
facebookButton.addEventListener('click', e => {
    e.preventDefault();
    ingresarform.reset();
    $("#ingresar").modal("hide");

    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            console.log("facebook sign in");

        })
        .catch(err => {
            console.log(err);
        })

})


db.collection("francia")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById('descripcionParis').innerHTML += '<p>Pais: ' + doc.data().pais + '</p><p>Lugares Turisticos: ' + doc.data().lugaresTuristicos + '</p><small>Descripcion: ' + doc.data().descripcion + '</small>'
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

db.collection("londres")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById('descripcionLondres').innerHTML += '<p>Pais: ' + doc.data().pais + '</p><p>Lugares Turisticos: ' + doc.data().lugaresturisticos + '</p><small>Descripcion: ' + doc.data().descripcion + '</small>'
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
db.collection("españa")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById('descripcionEspana').innerHTML += '<p>Pais: ' + doc.data().pais + '</p><p>Lugares Turisticos: ' + doc.data().lugaresTuristicos + '</p><small>Descripcion: ' + doc.data().descripcion + '</small>'
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
db.collection("marruecos")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            document.getElementById('descripcionMarruecos').innerHTML += '<p>Pais: ' + doc.data().pais + '</p><p>Lugares Turisticos: ' + doc.data().lugaresTuristicos + '</p><small>Descripcion: ' + doc.data().descripcion + '</small>'
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });