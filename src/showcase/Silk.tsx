'use client';

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, type RefObject, type Ref } from 'react';
import { Color, Vector2, type Mesh, type ShaderMaterial } from 'three';

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;
uniform vec2  uMouse;
uniform float uMouseStrength;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  // Fluid mouse hover / touch gesture ripple displacement
  vec2 toMouse     = vUv - uMouse;
  float dist       = length(toMouse);
  float influence  = exp(-dist * 4.5) * uMouseStrength;
  vec2 ripple      = normalize(toMouse + vec2(0.0001)) * sin(dist * 20.0 - tOffset * 2.5) * influence * 0.12;
  tex += ripple;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  // Gentle subtle luminescence under mouse cursor or finger touch
  float mouseGlow = influence * 0.22;

  float grain = rnd / 15.0 * uNoiseIntensity;
  vec3 result = (uColor + vec3(mouseGlow)) * pattern - vec3(grain);
  if (uLightMode > 0.5) {
    float fold = smoothstep(0.28, 0.9, pattern);
    float specular = smoothstep(0.72, 0.98, pattern);
    vec3 shadowColor = uColor * 0.72;
    vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
    vec3 lightBase = mix(shadowColor, bodyColor, fold);
    lightBase = mix(lightBase, vec3(1.0), specular * 0.92 + mouseGlow);
    float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
    float grainSignal = (rnd + fineNoise - 1.0);
    float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
    result = lightBase + grainSignal * grainStrength;
  }
  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`;

interface MouseState {
  targetX: number;
  targetY: number;
  currX: number;
  currY: number;
  targetStrength: number;
  currStrength: number;
}

interface SilkPlaneProps {
  uniforms: Record<string, { value: unknown }>;
  mouseStateRef: React.MutableRefObject<MouseState>;
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms, mouseStateRef }, ref) {
  const { viewport } = useThree();
  const meshRef = ref as RefObject<Mesh>;

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [meshRef, viewport]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as ShaderMaterial;
      mat.uniforms.uTime.value += 0.1 * delta;

      // Smooth organic lerp with inertia for pointer coordinates and ripple strength
      const ms = mouseStateRef.current;
      const lerpFactor = Math.min(delta * 7.0, 1.0);
      ms.currX += (ms.targetX - ms.currX) * lerpFactor;
      ms.currY += (ms.targetY - ms.currY) * lerpFactor;

      const strengthLerp = Math.min(delta * 3.5, 1.0);
      ms.currStrength += (ms.targetStrength - ms.currStrength) * strengthLerp;

      (mat.uniforms.uMouse.value as Vector2).set(ms.currX, ms.currY);
      mat.uniforms.uMouseStrength.value = ms.currStrength;
    }
  });

  return (
    <mesh ref={meshRef as Ref<Mesh>}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
});
SilkPlane.displayName = 'SilkPlane';

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  lightMode?: boolean;
}

const Silk = ({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0,
  lightMode = false,
}: SilkProps) => {
  const meshRef = useRef<Mesh>(null);

  const mouseStateRef = useRef<MouseState>({
    targetX: 0.5,
    targetY: 0.5,
    currX: 0.5,
    currY: 0.5,
    targetStrength: 0,
    currStrength: 0,
  });

  // Track mouse hover on laptop and touch gestures on Android/iOS
  useEffect(() => {
    let decayTimeout: ReturnType<typeof setTimeout>;

    const handlePointer = (clientX: number, clientY: number) => {
      if (typeof window === 'undefined') return;
      const x = clientX / window.innerWidth;
      const y = 1.0 - clientY / window.innerHeight; // WebGL UV is bottom-up
      mouseStateRef.current.targetX = x;
      mouseStateRef.current.targetY = y;
      mouseStateRef.current.targetStrength = 1.0;

      clearTimeout(decayTimeout);
      decayTimeout = setTimeout(() => {
        mouseStateRef.current.targetStrength = 0.0;
      }, 1500);
    };

    const onPointerMove = (e: PointerEvent) => {
      handlePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
      clearTimeout(decayTimeout);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uLightMode: { value: lightMode ? 1 : 0 },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    (uniforms.uColor.value as Color).setRGB(...hexToNormalizedRGB(color));
    uniforms.uRotation.value = rotation;
    uniforms.uLightMode.value = lightMode ? 1 : 0;
  }, [speed, scale, noiseIntensity, color, rotation, lightMode, uniforms]);

  return (
    <Canvas dpr={[1, 2]} frameloop="always">
      <SilkPlane ref={meshRef} uniforms={uniforms} mouseStateRef={mouseStateRef} />
    </Canvas>
  );
};

export default Silk;
