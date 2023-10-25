// FORMS

const MensajeContacto = {
	template : `
        <div v-if="nombre.lenght > 0 && correo.lenght > 0 && telefono.lenght > 0 && mensaje.lenght > 0">
            <p>El mensaje fue enviado exitosamente con el contenido:</p>
		<ul>
		<li>Nombre: {{ nombre }}</li>
		<li>Correo: {{ correo }}</li>
		<li>Teléfono: {{ telefono }}</li>
		<li>Mensaje: {{ mensaje }}</li>
		</ul>
        </div>
    `,

	props : [
        'nombre',
        'correo',
	    'telefono',
	    'mensaje',
    ],
}


const ContactForm= {
    template : `
    <section class="formulario container">
            <h2>Contacta con nosotros</h2>
            <form @submit.prevent="enviarFormulario" action="">
                <div>
                    <label for="name">Nombre:*</label>
                    <input type="text" name="name" id="name" placeholder="Nombre..." v-model="nombre">
                </div>
                <div class="msg-container">
                    <span class="msg" v-if="lessThanLimitName">
                        Te quedan {{ remainingCharsName }} caracteres restantes en el nombre.
                    </span>
                    <span class="msgError"  v-else>
                        Superaste el límite de caracteres disponibles que es de {{ limiteNombre }}.
                    </span>
                </div>
                <div>
                        <label for="email">Correo:*</label>
                        <input class="input-text-form" type="email" name="email" id="email" placeholder="Email..." v-model="email">
                </div>
                <div>
                    <label for="telefono">Teléfono:*</label>
                    <input class="input-text-form" type="number" name="telefono" id="telefono" placeholder="Teléfono..." v-model="telefono">
                </div>
                <div class="msg-container">
                    <span class="msg" v-if="lessThanLimitPhone">
                        El Teléfono debe tener menos de 10 caracteres.
                    </span>
                    <span class="msgError"  v-else>
                        Superaste el límite de caracteres disponibles que es de {{ limiteTelefono }}.
                    </span>
                </div>
                <div>
                    <label for="mensaje">Mensaje:*</label>
                    <textarea name="mensaje" id="mensaje" placeholder="Mensaje..." v-model="mensaje"></textarea>
                </div>
                <div class="msg-container">
                    <span class="msg" v-if="lessThanLimitMessage">
                        Te quedan {{ remainingCharsMessage }} caracteres restantes en el mensaje.
                    </span>
                    <span class="msgError"  v-else>
                        Superaste el límite de caracteres disponibles que es de {{ limiteMensaje }}.
                    </span>
                </div>
    
                <button class="enviar btn" :disabled="!canSubmit">
                    Enviar
                </button>

            </form>

            <mensaje-contacto :nombre="nombreMensaje" :correo="correoMensaje" :telefono="telefonoMensaje" :mensaje="mensajeMensaje"></mensaje-contacto>
    </section>
    `,
	
    methods : {
        enviarFormulario() {
            nombreMensaje = nombre,
            correoMensaje = correo,
            telefonoMensaje = telefono,
            mensajeMensaje = mensaje
        }
    },

    computed : {
        canSubmit() {
            return this.nombre.length > 0 && this.email.length > 0 && this.telefono.length > 0 && this.mensaje.length > 0
        },

        lessThanLimitName() {
            return this.nombre.length <= this.limiteNombre
        },

        remainingCharsName() {
            return this.limiteNombre - this.nombre.length
        },

        lessThanLimitPhone() {
            return this.telefono.length <= this.limiteTelefono
        },

        remainingCharsPhone() {
            return this.limiteTelefono - this.telefono.length
        },


        lessThanLimitMessage() {
            return this.mensaje.length <= this.limiteMensaje
        },

        remainingCharsMessage() {
            return this.limiteMensaje - this.mensaje.length
        },

    },

    components: {
        MensajeContacto
    },

    data() {
        return {
            limiteMensaje : 200,
            limiteNombre: 20,
            limiteTelefono: 10,
            nombre : '',
            email : '',
            telefono : '',
            mensaje : '',
            nombreMensaje : '',
            correoMensaje : '',
            telefonoMensaje : '',
            mensajeMensaje : ''
        }

    }
}


const PetForm= {
    template : `
    <section class="formulario container">
        <h2>Dinos que máscota te gustaría encontrar</h2>
        <form action="">
            <div>
                <label for="especie">Especie:*</label>

                <select name="especie" id="especie" v-model="especie">
                    <option v-for="especie in especiesMascotas">{{ especie }}</option>
                </select>

            </div>

            <div>
                    <h3 for="email">Tamaño:*</h3>

                    <div>
                        <div v-for="tamanioMascota in tamaniosMascotas" class="radio-input">
                            <input type="radio" :name="tamanioMascota.class" :id="tamanioMascota.class" :value="tamanioMascota.class" v-model="tamanio">
                            <label>{{ tamanioMascota.name }}</label>
                        </div>
                    </div>
            </div>
            <div>
                <label for="rango">Rango de búsqueda(en KM):*</label>
                <input class="input-text-form" type="number" name="rango" id="rango" placeholder="Rango..." v-model="rango">
            </div>

            <div>
                <label for="mensaje">Información adicional (opcional):</label>
                <textarea name="mensaje" id="mensaje" placeholder="Mensaje..." v-model="mensaje"></textarea>
            </div>
            <div>
                <span class="msg" v-if="lessThanLimitMessage">
                    Te quedan {{ remainingCharsMessage }} caracteres restantes en el mensaje.
                </span>
                <span class="msgError"  v-else>
                    Superaste el límite de caracteres disponibles que es de {{ limiteMensaje }}.
                </span>
            </div>

            <button class="enviar btn" :disabled="!canSubmit">
                Enviar
            </button>
        </form>
    </section>
    `,

    computed : {
        canSubmit() {
            return this.tamanio.length > 0 && this.rango.length > 0 && this.mensaje.length > 0
        },

        lessThanLimitMessage() {
            return this.mensaje.length <= this.limiteMensaje
        },

        remainingCharsMessage() {
            return this.limiteMensaje - this.mensaje.length
        },

    },

    data() {
        return {
            limiteMensaje : 200,
            especiesMascotas : ['Gato', 'Perro', 'Exótico'],
            tamaniosMascotas : [{name:'Pequeño',class:'small'},{name:'Mediano',class:'medium'},{name:'Grande',class:'big'}],
            tamanio : '',
            rango : '',
            mensaje : '',
            especie : ''
        }
    }
}

// INICIO

const Navbar = {
    template : `
        <div>
            <router-link to="/" class="nav-item">Inicio</router-link>
            <router-link to="/nosotros" class="nav-item">Sobre Nosotros</router-link>
            <router-link to="/servicios" class="nav-item">Servicios</router-link>
        </div>
    `
}

const BannerBienvenida = {
    template : `
        <div :class="clase">
            <div class="container">
                <h1>{{ titulo }}</h1>
                <p>{{ subtitulo }}</p>
                <button class="btn">Instalar App</button>
            </div>
        </div>
    `,
    props : ['clase','titulo', 'subtitulo']
}

// TABS
 
const TabsMenu = {
    template : `
    <section class="container seccion">
    <div class="tabs">
        <div class="nav-tabs">
                <div v-for="(seccion, index) in secciones" class="nav-tabs-item" @click="setActive(index)"  :class="{ 'active' : isActiveTab(index)}">
                    <img class="icon" :src=seccion.img>
                    {{ seccion.nombre }}
                </div>
        </div>
        <div class="tab-content">
            <div v-for="(seccion, index) in secciones" class="tab-pane" v-show="isActiveTab(index)">
                <div class="for-example">
                    <h3>
                        {{ seccion.titulo }}
                    </h3>
                    <img :src=seccion.imagenPrincioal>
                    <p>
                    {{ seccion.texto }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    </section>
    `,

    data() {
        return {
            activeTAb: 0
        }
    },

    methods : {
        setActive(tab){
            this.activeTAb = tab
        },
        isActiveTab(tab){
            return this.activeTAb === tab
        }
    },

    props: ['secciones', 'titulo'],
}

const TextoIntrodccion = {
    template : `
    <section class="container seccion">
            <div v-for="contenido in contenidos" class="card">
                <picture>
                    <img :src=contenido.img alt="">
                </picture>
                <div :class=contenido.class>
                    <h3>{{contenido.titulo}}</h3>
                    <p>
                    {{contenido.texto}}
                    </p>
                </div>   
            </div>
        </section>
    `,
    props: ['contenidos'],
}

const CardsEquipo = {
    template : `
    <section class="seccion">
            <h2 class="seccion-title">Nuestro Equipo</h2>
            <div  class="container equipo">
                <div v-for="miembro in miembros" class="equipo-card">
                    <img :src=miembro.img alt="">
                    <div class="equipo-card-text">
                        <h3>{{miembro.nombre}}</h3>
                        <p>{{miembro.puesto}}</p>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: ['miembros'],
}

const HomePage = {
    template : `
    <div>
        <banner-bienvenida clase="bienvenida banner-1" titulo="¡Bienvenido!" subtitulo="Descubre más sobre la mejor experiencia en adopción de mascotas."></banner-bienvenida>
        <texto-introdccion :contenidos="contenidos"></texto-introdccion>
        <tabs-menu :secciones="secciones" ></tabs-menu>
    </div>
    `,
    components : {
        BannerBienvenida,
        TextoIntrodccion,
        TabsMenu,
    },

    data() {
        return {
            secciones: [
                {
                        nombre: "Personas",
                        img: "./img/person.png",
                        imagenPrincioal : "./img/pet-adoption.jpg",
                        titulo: "Individuos interesados en adoptar",
                        texto: "Buscamos ayudar a las personas que no conocen lugares confiables en los que se puedan  adoptar una mascota, ofreciendo un medio accesible donde poder ver información clara y precisa de las mascotas en adopción, y a su vez poder contactar con las Asociaciones que las dan en adopción a travez de pasos muy sencillos.",
                    },
                    {
                        nombre: "Asociaciones",
                        img: "./img/dog-house.png",
                        imagenPrincioal : "./img/dog-adoption.jpg",
                        titulo: "Individuos interesados en dar en adopcion",
                        texto: "Para las asociaciones interesadas en buscarle un hogar a las mascotas que tienen a su cuidado les ofrecemos, poder agilizar el proceso de adopción facilitando el proceso de indicar que una mascota esta en adopción o ya se le encontró un hogar. A su vez, les ofrecemos la posiblidad de poder generar un registro con la información de las mascotas adoptadas y en adopción.",
                    },
                ],
            contenidos: [
                {
                    img: "./img/introduccion-1.png",
                    class : "contenido-card",
                    titulo: "El Problema detectado",
                    texto: "Debido a la creciente conciencia social que se está tomando sobre el cuidado de las mascotas y de animales en general, durante los últimos años cobró gran importancia la difusión de mascotas que están en adopción por medio de las redes sociales. Si bien estos medios son masivos y están muy cercanos al público general, la gestión de los mismos puede presentar dificultades.",
                },
                {
                    img: "./img/introduccion-2.png",
                    class : "contenido-card invertido",
                    titulo: "Nuestro Objetivo",
                    texto: "Se quiere facilitar el contacto entre los interesados en adoptar y dar en adopción a una mascota.",
                },
                {
                    img: "./img/introduccion-3.png",
                    class : "contenido-card",
                    titulo: "Nuestra Propuesta",
                    texto: "Lo que planteamos es una aplicación que permitirá a los diferentes interesados en adoptar a una mascota tener un medio de contacto con los interesados en adoptar una mascota. A su vez, permitirá cargar y actualizar los datos de los animales a los que se les están buscando un hogar, lo que permitirá tener un registro claro de las mascotas a las que ya le encontraron un hogar y a las que le siguen buscando uno. ",
                },
            ]
        }
    },
}


const UsPage = {
    template : `
    <div>
        <banner-bienvenida clase="bienvenida banner-2" titulo="Sobre Nosotros" subtitulo="Nuestra misión es facilitar el proceso de adopción para las mascotas sin hogar."></banner-bienvenida>
        <cards-equipo :miembros="miembros" ></cards-equipo>
        <contact-form></contact-form>
    </div>
    `,
    components : {
        BannerBienvenida,
        CardsEquipo,
        ContactForm
    },

    data() {
        return {
            miembros: [
                    {
                        nombre: "Laura Martinez",
                        img: "./img/person-1.png",
                        puesto : "Fundadora" 
                    },                 
                    {
                        nombre: "Marcelo Rodriguez",
                        img: "./img/person-2.png",
                        puesto : "Programador" 
                    }, 
                    {
                        nombre: "Lorena Lopez",
                        img: "./img/person-3.png",
                        puesto : "Programadora" 
                    }, 
                    {
                        nombre: "Gastón Gomez",
                        img: "./img/person-4.png",
                        puesto : "Diseñador" 
                    }, 
                ],
        }
    },
}

const ServicePage = {
    template : `
    <div>
        <banner-bienvenida clase="bienvenida banner-3" titulo="Nuestros Servicios" subtitulo="Amigable, cercano y de calidad."></banner-bienvenida>
        <tabs-menu :secciones="secciones" ></tabs-menu>
        <pet-form></pet-form>
    </div>
    `,
    components : {
        BannerBienvenida,
        TabsMenu,
        PetForm
    },

    data() {
        return {
            secciones: [
                {
                        nombre: "Gatos",
                        img: "./img/cat.png",
                        imagenPrincioal : "./img/cats.jpg",
                        titulo: "Compañeros felinos",
                        texto: "Cada gato tiene su propia historia, personalidad única y un deseo de encontrar un hogar donde puedan ser amados y cuidados. Nuestra misión es unir a estos gatos especiales con personas y familias que desean experimentar la alegría y el amor incondicional que un compañero felino puede brindar.",
                    },
                    {
                        nombre: "Perros",
                        img: "./img/dog.png",
                        imagenPrincioal : "./img/dogs.jpg",
                        titulo: "Compañeros caninos",
                        texto: "Promovemos no la adopción de nuestros compañeros peludos, sino que también abogamos por la importancia de respetar y proteger a estos fieles amigos. Creemos que todos los perros merecen una oportunidad y que a través de la adopción, podemos construir una comunidad más fuerte y un mundo más amable para los perros y las personas.",
                    },
                    {
                        nombre: "Exóticos",
                        img: "./img/bird.png",
                        imagenPrincioal : "./img/birds.jpg",
                        titulo: "Nos estamos expandiendo",
                        texto: "No solo nos interesa encontrale un hogar a los típicos animales que a uno se le podría ocrrurir adoptar como mascota, sino que estamos empezando a realizar el esfuerzo en encontrarle un hogar a animales mas peculiares en estado de necesidad, como por pueden ser aves.",
                    },
                ]
        }
    },
}




const router = new VueRouter({
    routes : [
        { path : "/", component : HomePage },
        { path : "/nosotros", component : UsPage },
        { path : "/servicios", component : ServicePage },
    ]
})



const app = new Vue ({

    router,
    components: {
        Navbar,
        TabsMenu
    },


    computed : {


    },


    data() {
        return {

        }
    },

    methods : {

    }

}).$mount("#app");