import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl';
import { useEffect, useRef } from 'react';

const BackgroundParticles = () => {
  const containerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ 
      depth: false, 
      alpha: true,
      antialias: true 
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, 20); // Default cameraDistance is 20

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    // Mouse movement disabled
    // const handleMouseMove = (e) => {
    //   const rect = container.getBoundingClientRect();
    //   const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    //   const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    //   mouseRef.current = { x, y };
    // };

    // window.addEventListener("mousemove", handleMouseMove);

    const count = 700; // Default particleCount
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      // Default white color #ffffff
      colors.set([1, 1, 1], i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const vertex = /* glsl */ `
      attribute vec3 position;
      attribute vec4 random;
      attribute vec3 color;
      
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpread;
      uniform float uBaseSize;
      uniform float uSizeRandomness;
      uniform vec2 uMouse;
      
      varying vec4 vRandom;
      varying vec3 vColor;
      
      void main() {
        vRandom = random;
        vColor = color;
        
        vec3 pos = position * uSpread;
        pos.z *= 10.0;
        
        vec4 mPos = modelMatrix * vec4(pos, 1.0);
        float t = uTime;

        // Mouse influence disabled
        // float dist = length(pos.xy - uMouse * uSpread);
        // float influence = smoothstep(5.0, 0.0, dist);
        // mPos.xy += uMouse * influence * 2.0;
        
        mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
        mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
        mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
        
        vec4 mvPos = viewMatrix * mPos;
        gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      
      uniform float uTime;
      varying vec4 vRandom;
      varying vec3 vColor;
      
      void main() {
        vec2 uv = gl_PointCoord.xy;
        float d = length(uv - vec2(0.5));
        
        if(d > 0.5) {
          discard;
        }
        gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: 13 }, // Default particleSpread
        uBaseSize: { value: 100 }, // Default particleBaseSize
        uSizeRandomness: { value: 1 }, // Default sizeRandomness
        uMouse: { value: [0, 0] },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * 0.5; // Default speed is 0.1

      program.uniforms.uTime.value = elapsed * 0.001;
      // Mouse uniforms disabled
      // program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];

      if (!false) { // Default disableRotation is false
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * 0.1;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default BackgroundParticles; 