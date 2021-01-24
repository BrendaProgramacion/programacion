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
    /*
    const viajes = document.querySelector('.mamon');
    const viapost = data => {
            if (data.length) {
                var html = '';
                data.forEach(doc => {
                    const posttr = doc.data()
                    const li = `
                        <div class="item ">
                            <div class=" container cardPresentacion">
                                <div class="card">
                                    <img src="img/imgt1.jpg">
                                    <p>Desatino:${posttr.Destino}</p>
                                    <p>${posttr.Tour}</p>
                                    <p>Precio: $${posttr.Costo}</p>
                                    <a href="#">Leer más</a>
                                </div>
                            </div>
                        </div>
                `;
                    html += li;

                });

                console.log(html);
                viajes.innerHTML = html;
            } else {
                viajes.innerHTML = '<h4 class="text-white">Aqui van las tarjetas de los viajes </h4>';

            }
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //console.log("Ingresaste");
                db.collection('publicaciones').get().then((snapshot) => {
                    querySelector.forEach(function(doc) {
                        console.log(doc.id, "=>", doc.data());
                    })
                })
            } else {
                console.log("Saliste");

            }
        })
db.collection("publicaciones").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc, index) {
        console.log(doc.id, " => ", doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
        document.querySelector('.mamon').innerHTML +=

            '<div class="item "><div class=" container cardPresentacion"><div class="card"><img src="img/imgt1.jpg"><p>Desatino:${posttr.Destino}</p><p>${posttr.Tour}</p><p>Precio:' + doc.data().titulo[0] + '</p><a href="#">Leer más</a></div></div></div>'

    });
});*/