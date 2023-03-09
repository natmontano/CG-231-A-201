/**
 * Geometria: Construye una geometria THREEJS y la retoma
 * ENTRADAS: vx = Arreglo de vertices(arreglo de arreglos de enteros)
 * SALIDA: geom = Geometria generada a partir de vx
 */
function Geometria(vx){
    geom=new THREE.Geometry();
    var vertices = vx.length;
    var largoVertice = vertices.length;
    for (i = 0; i < largoVertice; i++) {
        [x,y,z] = [vx[i][0],vx[i][1],vx[i][2]];
        vector = new THREE.Vector3(x, y, z);
        geom.vertices.push(vector);
    }
    return geom;
/**
 * Translacion: Construye la matriz de translacion THREEJS para el vector vt y la retorna
 * ENTRADAS: vt = Vector de translacion (arreglo de enteros)
 * SALIDA: matrizT = Matriz de translacion para le vetor vt
 */
}
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);  
            return matrizT;     
    }
/**
 * Escalado: Construye la matriz de escalado THREEJS para el vector vs y la retorna
 * ENTRADAS: vs = Vector de escalado (arreglo de enteros)
 * SALIDA: matrizS = Matriz de escalado para le vetor vs
 */
function Escalado(vs){
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
        return matrizS;

}
 /**
 * EscaladoReal: Aplica el vector de escalado vs al objeto fig
 * ENTRADAS: fig = Objeto tipo THREE.Line que representa el objeto grafico
 *           posini = Posicion inicial del fig (array de enteros)
 *           vs = Vector de escalado (arreglo de enteros)
 * SALIDA: 
 */
 function EscaladoReal(fig,posini,vs){
    tr = [-posini[0],-posini[1],-posini[2]];  //Vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));
    fig.applyMatrix(Escalado(vs));
    fig.applyMatrix(Traslacion(posini));
}
function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    //Creación de las Figuras
    //Geometria de la Piramide
    lado= 30; //lado de la base de la piramide 
    h= 45; //altura de la piramide
    [v1,v2,v3,v4,v5]=[[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]]
    var vertices = [v1,v2,v3,v4,v5,v1,v2,v3,v4,v5];
    geomPiramide= Geometria(vertices);


    //Colores para las piramides
    color=[{color:0xFF0000},{color:0x0000FF}];


    // Material para las piramides
    material=[];
    for(i=0;i<2;i++)
         material[i] =new THREE.ParticleBasicMaterial((color[i]));

    
    // Figuras para las piramides
    piramide=[];
    for(i=0;i<2;i++)
         piramide.push (new THREE.Line(geomPiramide,material[i]));
    

    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for(i=0;i<2;i++)
        scene.add(piramide[i]);

    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;