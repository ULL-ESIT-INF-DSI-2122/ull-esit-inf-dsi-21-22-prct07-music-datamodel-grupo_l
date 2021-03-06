import { Album } from "../clases-bases/album";
import { Artistas } from "../clases-bases/artistas";
import { Cancion } from "../clases-bases/cancion";
import { GenerosMusicales } from "../clases-bases/generosMusicales";
import { Grupos } from "../clases-bases/grupos";
import { Playlist } from "../clases-bases/playlist";
import  lowdb  =  require ( "lowdb" ) ; 
import  FileSync  =  require ( "lowdb/adapters/FileSync" ) ;

import LocalStorage from 'lowdb/adapters/LocalStorage';

/**
 * @type dbtype con los datos y sus tipos que se introducen en
 * la base de datos
 */
type dbtype = {
    canciones: {
        nombre: string;
        autor: string;
        duracion: string;
        genero: GenerosMusicales[];
        single: boolean;
        numReproducciones: number;
    }[],
    generosmusicales: {
        nombreGenero: string;
	    grupos: string[];
	    artistas: string[];
	    albumes: string[];
	    canciones: string[];
    }[],
    
    albumes: {
        nombreAlbum: string;
	    autores: Grupos | Artistas;
	    genero: GenerosMusicales[];
	    yearPublicacion: number;
	    canciones: Cancion[];
    }[],
    artistas: {
        nombreArtista: string;
	    grupos: string[];
        generos: GenerosMusicales[];
        albumes: string[];
        canciones: Cancion[];
        oyentes: number;
    }[],
    grupos: {
        nombreGrupo: string;
	    artistas: Artistas[];
	    yearGrupo: number;
	    genero: GenerosMusicales[];
	    albumes: Album[];
	    oyentes: number;
    }[];
    playlist: {
        nombrePlaylist: string;
	    canciones: Cancion[];
	    duracion: string;
	    generos: GenerosMusicales[];
    }[];
    playlistUsuario: {
        nombrePlaylist: string;
	    canciones: Cancion[];
	    duracion: string;
	    generos: GenerosMusicales[];
    }[];
};

/**
 * @class BaseDatos que almacenarÃ¡ los valores en una base de datos de tipo lowdb
 */
export class BaseDatos{
    private basedatos: lowdb.LowdbSync<dbtype>
   // lowdb.LowSync<dbtype>;
    //lowdb.JSONFile<dbtype>;
  
    
    public generosArrayLista: GenerosMusicales[];
    public cancionesArrayLista: Cancion[];
    public albumesArrayLista: Album[];
    public artistasArrayLista: Artistas[];
    public gruposArrayLista: Grupos[];
    public playArrayLista: Playlist[];
    public playUsuarioArrayLista: Playlist[];

    constructor(generosArray: GenerosMusicales[] = [], cancionesArray: Cancion[] = [], albumesArray: Album[] = [], artistasArray: Artistas[] = [], gruposArray: Grupos[] = [], playlistArray: Playlist[] = []) {
        this.basedatos = lowdb(new FileSync("data.json"));
        this.generosArrayLista = generosArray;
        this.cancionesArrayLista = cancionesArray;
        this.albumesArrayLista = albumesArray;
        this.artistasArrayLista = artistasArray;
        this.gruposArrayLista = gruposArray;
        this.playArrayLista = playlistArray;
        this.playUsuarioArrayLista = [];
        this.guardarBaseDatos();
    }

    /**
     * @method guardarBaseDatos que guarda en la base de datos los
     * gÃ©neros musicales, canciones, Ã¡lbumes, artistas y grupos de la app
     */
    guardarBaseDatos() {
        this.basedatos.set("generosmusicales", [this.generosArrayLista]).write();
        this.basedatos.set("canciones", [this.cancionesArrayLista]).write();
        this.basedatos.set("albumes", [this.albumesArrayLista]).write();
        this.basedatos.set("artistas", [this.artistasArrayLista]).write();
        this.basedatos.set("grupos", [this.gruposArrayLista]).write();
        this.basedatos.set("playlist", [this.playArrayLista]).write();
        this.basedatos.set("playlistUsuario", [this.playUsuarioArrayLista]).write();
    }

    /**
     * MÃ©todo pÃºblico para aÃ±adir el nuevo gÃ©nero musical en la base de datos
     * @param nuevoGenero a aÃ±adir
     */
    addNuevoGenero(nuevoGenero: GenerosMusicales) {
        this.generosArrayLista.push(nuevoGenero);
        this.guardarBaseDatos();
    }

    /**
     * MÃ©todo pÃºblico para aÃ±adir la nueva cancion en la base de datos
     * @param nuevaCancion a aÃ±adir
     */
    addNuevaCancion(nuevaCancion: Cancion) {
        this.cancionesArrayLista.push(nuevaCancion);
        this.guardarBaseDatos();
    }

    /**
     * MÃ©todo pÃºblico para aÃ±adir el nuevo Ã¡lbum en la base de datos
     * @param nuevoAlbum a aÃ±adir
     */
    addNuevoAlbum(nuevoAlbum: Album) {
        this.albumesArrayLista.push(nuevoAlbum);
        this.guardarBaseDatos();
    }

    /**
     * MÃ©todo pÃºblico para aÃ±adir el nuevo artista en la base de datos
     * @param nuevoArtista a aÃ±adir
     */
    addNuevoArtista(nuevoArtista: Artistas) {
        this.artistasArrayLista.push(nuevoArtista);
        this.guardarBaseDatos();
    }

    /**
     * MÃ©todo pÃºblico para aÃ±adir el nuevo grupo en la base de datos
     * @param nuevoGrupo a aÃ±adir
     */
    addNuevoGrupo(nuevoGrupo: Grupos) {
        this.gruposArrayLista.push(nuevoGrupo);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para aÃ±adir nueva playlist
     * @param nuevoPlay aÃ±ade nueva playlist
     */
    addNuevoPlay(nuevoPlay: Playlist) {
        this.playUsuarioArrayLista.push(nuevoPlay);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para borrar Ã¡lbum del array de Ã¡lbumes
     * @param numeroAlbum nÃºmero del Ã¡lbum a eliminar
     */
    delAlbum(numeroAlbum: number) {
        this.albumesArrayLista.splice(numeroAlbum, 1);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para eliminar artistas del array artistas
     * @param numeroArtista numero del artista a eliminar
     */
    delArtista(numeroArtista: number) {
        this.artistasArrayLista.splice(numeroArtista, 1);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para eliminar canciones del array de canciones
     * @param numeroCancion a eliminar
     */
    delCancion(numeroCancion: number) {
        this.cancionesArrayLista.splice(numeroCancion, 1);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para eliminar grupos del array grupos
     * @param numeroGrupos a eliminar
     */
    delGrupos(numeroGrupos: number) {
        this.gruposArrayLista.splice(numeroGrupos, 1);
        this.guardarBaseDatos();
    }
    /**
     * MÃ©todo para eliminar un gÃ©nero del array de gÃ©neros
     * @param numeroGenero a eliminar
     */
    delGenero(numeroGenero: number) {
        this.generosArrayLista.splice(numeroGenero, 1);
        this.guardarBaseDatos();
    }
    /**
     * 
     * @param numero 
     */
    delPlay(numero: number) {
        this.playArrayLista.splice(numero, 1);
        this.guardarBaseDatos();
    }
    /**
     * Getter de playlist del usuario
     * @returns playlist del usuario
     */
    getPlayLista(){
        return this.playUsuarioArrayLista;
    }
    /**
     * Setter de playlist del usuario
     * @param lista a modificar
     */
    setPlayLista(lista: Playlist[]){
        this.playUsuarioArrayLista = lista;
       this.guardarBaseDatos();
    }
}
