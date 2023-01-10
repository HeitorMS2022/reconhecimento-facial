Webcam.set({
    width: 350,
    height: 200,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("webcam");
Webcam.attach(camera);

function capturar(){
    Webcam.snap(function (data_uri){
        document.getElementById("resultado").innerHTML = '<img id="webcam_img" src="'+data_uri+'">';
    });
}

console.log("versão ml5:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9YfuXNPz4/model.json', modelLoaded);

function modelLoaded(){
    console.log("modelo carregado");
}

function start(){
    img = document.getElementById('webcam_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("pessoa").innerHTML = result[0].label;
        document.getElementById("porcentagem").innerHTML = result[0].confidence.toFixed(3);
    }
}