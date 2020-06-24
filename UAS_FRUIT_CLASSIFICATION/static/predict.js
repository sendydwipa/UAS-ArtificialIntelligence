'<link rel="stylesheet" type="text/css" href="style.css">'

$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}
	
	let file = $("#image-selector").prop('files')[0];
	var filename = $("#image-selector" ).val().replace(/.*(\/|\\)/, '');
	// console.log(filename);
	$('.apa').text(filename);
	reader.readAsDataURL(file);
});

let model;
$( document ).ready(async function () {
	$('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadGraphModel('model/model.json');
    console.log( "Model loaded." );
	$('.progress-bar').hide();
});

$("#predict-button").click(async function () {
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	console.log( "Loading image..." );
	let tensor = tf.browser.fromPixels(image, 3)
		.resizeNearestNeighbor([224, 224]) // change the image size
		.expandDims()
		.toFloat()
		.reverse(-1); // RGB -> BGR
	let predictions = await model.predict(tensor).data();
	console.log(predictions);
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] // we are selecting the value from the obj
			};
		}).sort(function (a, b) {
			return b.probability - a.probability;
		}).slice(0, 1);

	$("#prediction-list").empty();
	var desc_nanas = 'Nanas adalah tanaman yang berasal dari Amerika tropis, yaitu Brazil, Argentina dan Peru. Buah nanas mempunyai berbagai macam kandungan gizi yaitu protein, lemak, karbohidrat, fosfor, kalori, zat besi, vitamin (A, B).';
	var desc_alpokat = 'Alpukat merupakan jenis buah yang memiliki kandungan lemak tinggi, sekitar 20 kali lebih tinggi dibanding buah-buahan lain. Rasanya creamy dan gurih mirip mentega. Nama latin tanaman alpukat adalah Persea americana, diyakini berasal dari Amerika Tengah. Dalam satu sajian buah alpukat (sekitar 50 gram) terdapat mengandung 80 kalori, 8 gram lemak, 4 gram karbohidrat dan sekitar 1 gram protein. Selain itu terdapat juga berbagai macam vitamin seperti C, B6, E dan K. Juga mengandung mineral pentig seperti magnesium dan potassium.';
	var desc_anggur = 'Anggur merupakan tanaman buah berupa perdu merambat yang termasuk ke dalam keluarga Vitaceae. Salah satu jenis olahan buah anggur yang sering kita jumpai adalah kismis. Salah satu manfaat buah anggur bagi kesehatan yaitu menjaga kesehatan jantung, tulang dan menunda penuaan';
	var desc_apel = 'Buah apel mengandung Serat makanan (fiber), Vitamin C dan berbagai jenis Antioksidan yang tinggi. Manfaat memakan buah aple yaitu menurunkan resiko diabetes, penyakit jantung, mencegah katarak dan meningkatkan sistem kekebalan tubuh';
	var desc_pisang = 'Buah pisang kaya akan kandungan serat. Nutrisi ini bermanfaat dalam melancarkan pencernaan. manfaat buah pisang yaitu; menurunkan tekanan dardah, mengandung serat tinggi, baik untuk pencernaan.';
	var desc_buah_naga = 'Buah naga mengandung vitamin, mineral, antioksidan, serat, fitonutrien, polifenol, dan zat lain yang sangat bermanfaat bagi kesehatan tubuh. Khasiat dari buah naga antara lain adalah untuk meningkatkan sistem kekebalan tubuh, kesehatan pencernaan, kesehatan jantung, kesehatan kulit, kesehatan tulang, diabates, anemia, dan lain sebagainya.';
	var desc_delima = 'Buah delima yang memiliki nama latin Punica granatum, merupakan jenis buah yang masuk ke dalam kelompok berry. Buah ini mengandung berbagai nutrisi, seperti protein, karbohidrat, serat, dan vitamin yang dibutuhkan oleh tubuh, termasuk vitamin C, vitamin B kompleks, folat, vitamin E, serta vitamin K.';
	var desc_durian = 'Buah durian adalah salah satu buah tropis populer yang terkenal akan aroma dan rasanya. Manfaat buah durian; sumber antioksidan vitamin c yang baik, mengandung lemak sehat, kaya akan serat makanan, juga mengandung mineral, kalium, asam amino, dan vitamin B-kompleks';
	var desc_jambu_air = 'Jambu air adalah sumber vitamin C dan A, serat, kalsium, tiamin, niasin, potasium, myricetin, hexahydroxyflavone, fenolik, flavonoid dan zat besi. Di dalam jambu air pun terdapat kandungan air yang sangat banyak dan biasanya sering dijadikan rujak buah.';
	var desc_jeruk = 'Jeruk merupakan buah sitrus memiliki banyak kandungan vitamin C untuk membantu memangkas kolesterol jahat karena kandungan serat larut di dalamnya. Jeruk dapat melancarkan pencernaan karena merupakan sumber serta yang dapat mengeluarkan kotoran sehingga mencegah sindrom iritasi usus besar';
	var desc_kedondong = 'Kandungan zat besi serta vitamin B1 dalam kedondong membantu pembentukan sel-sel darah merah untuk mengatasi anemia. Vitamin C pada buah kedondong mengontrol kadar kolesterol dan membantu pemulihan setelah sakit. Kandungan kalsium dan fosfornya membantu untuk menjaga kesehatan dan kekuatan tulang dan gigi.';
	var desc_kiwi = 'Manfaat buah kiwi bagi tubuh adalah sebagai sumber nutrisi yang kaya akan vitamin C, vitamin A, vitamin E, vitamin K, kalium, asam amino, folat, dan kalsium. Selain itu, buah ini juga mengandung banyak antioksidan dan merupakan sumber serat.';
	var desc_manggis = 'Ada beragam nutrisi yang terkandung dalam buah manggis, di antaranya adalah vitamin C, vitamin B2, folat, magnesium, dan xanthones. Kandungan nutrisi di dalam buah manggis tersebut diyakini dapat menurunkan berat badan, meningkatkan daya tahan tubuh, bahkan mencegah penyakit kanker.';
	var desc_nangka = 'Nangka merupakan sumber makanan yang kaya vitamin A, C, thiamin, kalium, kalsium, riboflavin, zat besi, niasin, dan seng. Buah ini juga mempunyai serat yang rendah kalori sehingga baik untuk pasien penyakit jantung.';
	var desc_pepaya = 'Buah pepaya disebut memiliki kandungan vitamin C yang tinggi, bahkan lebih tinggi dari vitamin C pada buah jeruk. Selain itu, buah pepaya juga banyak mengandung vitamin A, vitamin B1, B3, B5, vitamin E, vitamin K, serat, kalsium, folat, potasium, dan magnesium.';
	var desc_pir = 'Buah pir memiliki vitamin C tinggi, vitamin B, K, tembaga, magnesium, dan kalium. Vitamin C dalam buah pir mampu memberi 12 persen kebutuhan harian, yang baik dalam melindungi DNA tetap sehat, menjaga metabolisme, memperbaiki jaringan yang rusak, dan menghentikan mutase sel.';
	var desc_rambutan = 'Buah rambutan memiliki kandungan nutrisi yang sangat banyak, mulai dari karbohidrat, serat, lemak, protein, hingga mengandung vitamin C. Rambutan dipercaya mampu menjaga kesehatan jantung dan menyehatkan pembuluh darah karena mengandung vitamin C cukup tinggi';
	var desc_salak = 'Salak adalah sejenis palma dengan buah yang biasa dimakan. Dalam bahasa Inggris disebut salak atau snake fruit, sementara nama ilmiahnya adalah Salacca zalacca. Buah ini disebut snake fruit karena kulitnya mirip dengan sisik ular. Salak mengandung segudang nutrisi yang penting untuk tubuh, seperti protein, zat besi, kalium, kalsium, beta karoten, karbohidrat, fosfor, vitamin A, vitamin C, dan berbagai antioksidan.';
	var desc_sirsak = 'Sirsak merupakan buah yang nikmat untuk dimakan, dengan daging buah yang berwarna putih. Kandungan vitamin C dan antioksidan yang terdapat di dalam buah sirsak berperan sebagai antioksidan yang membantu menangkal radikal bebas di dalam tubuh serta mengurangi risiko untuk terkena penyakit kronis, seperti diabetes dan hipertensi.';
	var desc_stroberi = 'Stroberi (Strawberry) atau dalam bahasa Indonesia dikenal juga dengan sebutan Arbei adalah buah yang berwarna kehijauan sangat berkembang dan berubah menjadi warna merah setelah matang. Buah yang aslinya berasal dari benua Eropa. Buah Stroberi (Strawberry) mengandung berbagai antioksidan, senyawa tumbuhan, mangan dan vitamin C yang sangat bermanfaat bagi kesehatan tubuh manusia.';
	top5.forEach(function (p) {
		// $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
		switch(p.className) {
			case "alpokat":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_alpokat} </p>
					</li>`
				);
				break;
			case "anggur":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_anggur} </p>
					</li>`
				);
				break;
			case "apel":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_apel} </p>
						</li>`
					);
				break;
			case "buah_naga":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_buah_naga} </p>
					</li>`
				);
				break;
			case "delima":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_delima} </p>
					</li>`
				);
				break;
			case "durian":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_durian} </p>
					</li>`
				);
				break;
			case "jambu_air":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_jambu_air} </p>
					</li>`
				);
				break;
			case "jeruk":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_jeruk} </p>
					</li>`
				);
				break;
			case "kedondong":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_kedondong} </p>
					</li>`
				);
				break;
			case "kiwi":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_kiwi} </p>
					</li>`
				);
				break;
			case "manggis":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_manggis} </p>
					</li>`
				);
				break;
			case "nanas":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_nanas} </p>
					</li>`
				);
				break;
			case "nangka":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_nangka} </p>
					</li>`
				);
				break;
			case "pepaya":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_pepaya} </p>
					</li>`
				);
				break;
			case "pir":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_pir} </p>
					</li>`
				);
				break;
			case "pisang":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_pisang} </p>
					</li>`
				);
				break;
			case "rambutan":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_rambutan} </p>
					</li>`
				);
				break;
			case "salak":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_salak} </p>
					</li>`
				);
				break;
			case "sirsak":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_sirsak} </p>
					</li>`
				);
				break;
			case "strawberry":
				$("#prediction-list").append(
					`<li>
						<h2 class="text-center text-uppercase" style="margin-top: 20px"> ${p.className} </h2>
						<p class="text-center">Akurasi : <b>${p.probability.toFixed(6)}</b></p>
						<p class="paragraph"> ${desc_stroberi} </p>
					</li>`
				);
				break;
			default:
				alert('maaf, gambar buah yang anda masukkan tidak terprediksi!');
			}

	});
});
