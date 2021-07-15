const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => { 

	const contexteAudio = new AudioContext(); // méthodes et propriétés lier au son AudioContext
	const src = contexteAudio.createMediaElementSource(audioPlayer); // reateMediaElementSource = les sources de audio pour manipuler les fréquences...
	const analyseur = contexteAudio.createAnalyser(); // représentation de données audio

	const canvas = document.getElementById('canvas'); // canvas c'est l'écran
	// que l'audio prennent bien l'espace qu'on lui donne même si marquer dans CSS
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d'); // des rectangles en 2d

	src.connect(analyseur);
	analyseur.connect(contexteAudio.destination); // destinatio = la ou va sortir le son

	analyseur.fftSize = 1024; // fftSize = transformation de frouiller rapide, traite le signal numérique pour fournir la fréquence

	const frequencesAudio = analyseur.frequencyBinCount;
	console.log(frequencesAudio);

	const tableauFrequences = new Uint8Array(frequencesAudio); // tableau de toutes les fréquences qui se joue, se convertie en petit rectangle (animation)

	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;

	const largeurBarre = (WIDTH / tableauFrequences.length) + 2
	; // largeur du canvas diviser par nombre de tableauFRequence.length + 2 = rajoute de la largeur au barre
	let hauteurBarre;
	let x; // sa position sur x

	function retourneBarre() { // dessiner les barres

		requestAnimationFrame(retourneBarre)

		x = 0;

		analyseur.getByteFrequencyData(tableauFrequences); // méthode qui retourne une valeur entre 0 et 255 /fréquence de notre tableauFrequence, qui gère la couleur et la hauteur des rectangles 2d

		ctx.fillStyle = "#000"; //le fond du canvas
		ctx.fillRect(0,0,WIDTH,HEIGHT); // dessine le fond en noir et dessiner chaque petit rectangle dessus

		for(let i = 0; i < frequencesAudio; i++){ // nombre de fréquences qu'il va y avoir et chaque fréquence on dessine un petit rectangle

			hauteurBarre = tableauFrequences[i];

			let r = 250; // couleurs entre 0 et 250
			let g = 50; 
			let b = i;

			ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; // code couleurs
			ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre) // démarre de bas en haut, - hauteur c'est pour voir les barres

			x += largeurBarre +1; // les barres se créer les unes à cotés des autres
		}
	}
	retourneBarre();
})