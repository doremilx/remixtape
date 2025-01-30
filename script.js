window.addEventListener('load', function () {
    // Assure que l'écran de chargement dure au minimum 1 seconde
    const loadingScreen = document.querySelector('.loading-screen');
  
    // Temporisation minimum de 1 seconde
    setTimeout(function () {
      loadingScreen.style.display = 'none';
    }, 1000); // 1000 ms = 1 seconde
  });
/* Creation d'un curseur personnalisé grâce à une vidéo tuto youtube ! */
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e){
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;



    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});


var audio = new Audio(); // Une seule instance pour toutes les musiques
var currentButton = null; // Pour suivre le bouton actif

fetch("musiques.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Générer le HTML pour chaque musique
        data.forEach(function(musique) {
            document.querySelector(".liste-musiques").innerHTML += `
              <section>
              <img src=${musique.cover} alt="Image de la Cover de ${musique.musique}">
                <h2>${musique.musique}</h2>
                <p>Artiste : <strong> ${musique.artiste} </strong> </p>
                <p>${musique.descriptionMusique}</p>
                <p>Album : <strong>${musique.album}</strong></p>
                <div class="redirection">
                <a href="${musique.youtube}" target="_blank"> <img src="Logos/Icon-YouTube.png" title="Lien vers la musique originale sur Youtube" class="youtube"></a>
                <a href="${musique.spotify}" target="_blank"> <img src="Logos/Icon-Spotify.png" title="Lien vers la musique originale sur Spotify" class="spotify"></a>
                </div>
                <button class="bouton-play" data-music-url="${musique.lien}">⏵</button>
              </section>`;

              document.querySelector("#creditsAfficher").innerHTML += `
              <li><strong>${musique.musique}</strong> ${musique.credit}</li>
              `
        });

        // Ajouter des écouteurs d'événements sur les boutons
        var buttons = document.querySelectorAll(".bouton-play");
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                var musicUrl = button.getAttribute("data-music-url"); // URL de la musique

                // Pause l'audio actuel si un autre bouton est cliqué
                if (currentButton && currentButton !== button) {
                    currentButton.innerHTML = "⏵"; // Réinitialise l'ancien bouton
                    audio.pause();
                }
                
 // Gestion de la pause/reprise pour le même bouton
 if (currentButton === button && !audio.paused) {
    audio.pause(); // Mettre la musique en pause
    button.innerHTML = "⏵"; // Remettre le bouton en état "lecture"
    currentButton = null; // Plus de bouton actif
} 
// Lecture d'une nouvelle musique ou reprise
else {
    audio.src = musicUrl; // Charger la musique
    audio.play(); // Jouer la musique
    button.innerHTML = "⏸"; // Mettre le bouton en état "pause"
    currentButton = button; // Mettre à jour le bouton actif
}

// Remettre l'icône à "⏵" à la fin de la musique
audio.addEventListener("ended", function() {
    if (currentButton === button) {
        button.innerHTML = "⏵"; // Réinitialiser le bouton
        currentButton = null; // Plus de bouton actif
    }
});
});
});
});

document.querySelector('.boutonCredits').addEventListener('click', function(event){
    event.preventDefault()
    
    if (document.querySelector('.BlocCredit').hasAttribute('hidden')){
        document.querySelector('.BlocCredit').removeAttribute('hidden')
    }
    else{document.querySelector('.BlocCredit').setAttribute('hidden', 'true')}
    window.scrollTo(0,1000000)
    })



    document.querySelector('.bouton-envoi').addEventListener('click', function(event) {
        const emailField = document.querySelector('#email');
        
        // Vérifie si le champ email est vide ou invalide
        if (!emailField.value || !emailField.checkValidity()) {
          event.preventDefault();  // Empêche la soumission du formulaire
          alert('Veuillez renseigner un email valide.');
          console.log('Adresse mail non valide')
          document.querySelector('#email').style.border = 'solid red 1.5px';
        } else {
          // Soumettre le formulaire si tout est valide
          


function mettreAJourAffichage() {
    var titre = document.querySelector('#titre').value;
    var description = document.querySelector('#description').value;
    var artiste = document.querySelector('#artiste').value;
    var lienaudio = document.querySelector('#lienaudio').value;
    var image = document.querySelector('#image').value;


    document.querySelector(".musique-formulaire").innerHTML += `
        <section class="proposition">
        <img src="${image}" alt="" class="imgChoisie">
            <h2>${titre}</h2>
            <p>Artiste : <strong> ${artiste} </strong> </p>
            <p>${description}</p>
            <a href='${lienaudio}' target="_blank"> Lien de la musique proposée <a>
            
        </section>
    `;

    console.log("Une nouvelle musique a été ajoutée !");
}

// Événement sur le bouton pour afficher les informations

    mettreAJourAffichage()

    var urlVisitee = 'https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=lin&courriel=' + document.querySelector('#email').value + '&message='+ document.querySelector('#titre').value + " ; Description transmise : " + document.querySelector('#description').value + " ; Lien de l'audio transmise : " + document.querySelector('#lienaudio').value

    console.log(document.querySelector('#titre').value)
    console.log("URL générée :", urlVisitee);

    // Appeler l'API avec fetch
    fetch(urlVisitee).then(function(response) {
        response.json().then(function(data){
            console.log("Réponse reçue : ");
            console.log(data);

        });
    })

    alert('Bien envoyé')
;
document.querySelector('#email').style.border = 'solid blue 1.5px'

}
});



document.querySelector('.clear').addEventListener('click', function(){
    document.querySelectorAll('.proposition').forEach(function(valeur){
        valeur.remove()
    })
})

