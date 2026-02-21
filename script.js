/* ======================
   SENHA (HASH)
====================== */

function verificarSenha(){
    const senhaDigitada = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    const hashCorreto = "39c4978ca7ee0c4ac8ceffa26ab5f81077e117997286e8efe7d756cea9674411";
    const hashDigitado = sha256(senhaDigitada);

    if(hashDigitado === hashCorreto){
        document.getElementById("lock").style.display = "none";
        document.getElementById("site").style.display = "block";
        erro.innerText = "";

        iniciarMusica();
    }else{
        erro.innerText = "Senha incorreta";
    }
}


/* ======================
   PLAYER MUSICAL (AUTO)
====================== */

const musica = document.getElementById('musicaAlbum');
const btnMusica = document.getElementById('btnMusica');
const player = document.getElementById('playerAlbum');

musica.volume = 0.35;
musica.preload = 'auto';

let tocando = false;

function iniciarMusica(){
    player.classList.add('visivel');

    musica.play().then(() => {
        btnMusica.innerText = '❚❚';
        tocando = true;
    }).catch(() => {
        // autoplay pode ser bloqueado — botão resolve
    });
}

// Play / Pause manual
btnMusica.addEventListener('click', () => {
    if(tocando){
        musica.pause();
        btnMusica.innerText = '▶';
    }else{
        musica.play();
        btnMusica.innerText = '❚❚';
    }
    tocando = !tocando;
});


/* ======================
   LIGHTBOX
====================== */

document.querySelectorAll(".foto img").forEach(img=>{
    img.addEventListener("click",()=>{
        document.querySelector(".lightbox img").src = img.src;
        document.querySelector(".lightbox").style.display="flex";
    });
});

document.querySelector(".lightbox").addEventListener("click",()=>{
    document.querySelector(".lightbox").style.display="none";
});

/* ======================
   BLOQUEAR LIGHTBOX NO DOWNLOAD DA FOTO
====================== */

document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', function(e){
        e.stopPropagation(); // impede subir para o img
    });
});

/* ======================
   DOWNLOAD FORÇADO DA FOTO
====================== */

document.querySelectorAll('.btn-download').forEach(btn => {

    btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const url = this.getAttribute('href');
        const nomeArquivo = url.split('/').pop();

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nomeArquivo);
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

});


/* ======================
   EFEITO TETRIS (SCROLL)
====================== */

const fotos = document.querySelectorAll('.foto');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            entry.target.style.transitionDelay = `${index * 70}ms`;
            entry.target.classList.add('aparecer');
        }
    });
}, { threshold: 0.15 });

fotos.forEach(foto => observer.observe(foto));


/* ======================
   BRILHO DA CAPA
====================== */

window.addEventListener('load', () => {
    document.getElementById('livroCapa').classList.add('ativo');
});


/* ======================
   VIDEO CONTROLE X MUSICA
====================== */

const videoPrincipal = document.getElementById('videoPrincipal');

if(videoPrincipal){

    videoPrincipal.addEventListener('play', () => {
        if(tocando){
            musica.pause();
            btnMusica.innerText = '▶';
            tocando = false;
        }
    });

}