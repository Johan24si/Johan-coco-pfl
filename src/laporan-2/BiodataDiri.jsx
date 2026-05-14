// Child Components
function Header() {
    return <h1>Biodata Diri</h1>;
}

function Foto() {
    return (
        <div>
            <img src="/img/profile.jpg" width="150" alt="Foto Profil" />
        </div>
    );
}

function Nama(props) {
    return <h3>Nama: {props.namaa}</h3>;
}

function Nim(props) {
    return <p>NIM: {props.nim}</p>;
}

function Jurusan(props) {
    return <p>Jurusan: {props.jurusan}</p>;
}

function Tanggal() {
    return <p>Tanggal: {new Date().toLocaleDateString()}</p>;
}

// Parent Component
export default function BiodataDiri() {

    const data = {
        nama: "johan",
        nim: "123456",
        jurusan: "Teknik Informatika"
    };

    return (
        <div>
            <Header />
            <Foto />
            <hr />
            <Nama nama={data.nama} />
            <Nim nim={data.nim} />
            <Jurusan jurusan={data.jurusan} />
            <Tanggal />
        </div>
    );
}