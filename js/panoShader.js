/*
 * @Author: 懒羊羊 20009201322@xidian.edu.cn
 * @Date: 2024-03-27 20:57:32
 * @LastEditors: 懒羊羊 20009201322@xidian.edu.cn
 * @LastEditTime: 2024-03-27 21:01:40
 * @FilePath: \vtour\js\panoShader.js 
 */

  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { ref, onMounted } from "vue";
  var currentHome = 'home1';
  var scene = new THREE.Scene();
  
  // 光源设置
  var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight1.position.set(400, 200, 300);
  scene.add(directionalLight1);
  var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-400, -200, -300);
  scene.add(directionalLight2);
  var ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  
  // 相机设置
  // 透视投影相机
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500);
  // 设置相机位置
  camera.position.set(0, 0, -1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  var renderer = new THREE.WebGLRenderer({
    antialias: true // 开启锯齿
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  var container = ref(null);
  
  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  
  // 添加模型
  var geometry = new THREE.SphereGeometry(50, 6, 6);
  var textureLoader = new THREE.TextureLoader();
  var material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./input_origin/1.jpg'),
    side: THREE.BackSide // 设置背面可见
  });
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  
  onMounted(() => {
    // 添加轨道控制器
    var controls = new OrbitControls(camera, container.value);
    controls.enableDamping = true; // 加阻尼
    controls.enablePan = false; // 禁止拖拽
    controls.enableZoom = false; // 禁止缩放
    container.value.appendChild(renderer.domElement);
    render();
  });
  
