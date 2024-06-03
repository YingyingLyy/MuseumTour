/*
 * @Author: 懒羊羊 20009201322@xidian.edu.cn
 * @Date: 2024-03-27 20:58:59
 * @LastEditors: 懒羊羊 20009201322@xidian.edu.cn
 * @LastEditTime: 2024-03-27 21:00:04
 * @FilePath: \vtour\js\cameraController.js
 * @Description: 
 */
import * as THREE from "three";

class VRControls {
    constructor (camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;

        this.target = new THREE.Vector3(0, 0, 0); // 相机的注视点坐标

        this.isMouseDown = false; // 记录鼠标是否按下
        this.addEventListener(); // 监听鼠标事件

        // 配置属性
        this.rotationSpeed = 0.015;
    }

    addEventListener () {
        this.domElement.addEventListener("mousedown", () => {
            this.isMouseDown = true;
        });

        this.domElement.addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });

        this.domElement.addEventListener("mousemove", (event) => {
            if (!this.isMouseDown) return;
            // 这里涉及到欧拉角旋转顺序问题，若顺序不当则会导致轴向的变化，这里使用YXZ顺序
            this.camera.rotation.y -= event.movementX * 0.015;
            this.camera.rotation.x -= event.movementY * 0.015;
            this.camera.rotation.z -= 0.0;

            /**
             * 将相机在垂直方向的角度限制在0-180度之内
             */
   
            if (this.camera.rotation.x < 1 / 180 * Math.PI - 1 / 2 * Math.PI) {
                this.camera.rotation.x = 1 / 180 * Math.PI - 1 / 2 * Math.PI;
            }
            if (this.camera.rotation.x > 1 / 2 * Math.PI - 1 / 180 * Math.PI) {
                this.camera.rotation.x = 1 / 2 * Math.PI - 1 / 180 * Math.PI;
            }


        });
    }
}

export { VRControls };
