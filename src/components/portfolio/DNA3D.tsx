import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PAIRS = 22;
const RADIUS = 1.1;
const RISE = 0.28;
const TWIST = 0.42;
const COLORS = ["#e0957a", "#c9a24a", "#5f8f74", "#e8a7a0"]; // sindoor, gold, leaf, blush

function Helix() {
	const group = useRef<THREE.Group>(null);
	const items = useMemo(() => {
		const out: {
			a: THREE.Vector3;
			b: THREE.Vector3;
			c1: string;
			c2: string;
		}[] = [];
		for (let i = 0; i < PAIRS; i++) {
			const t = i * TWIST;
			const y = (i - PAIRS / 2) * RISE;
			out.push({
				a: new THREE.Vector3(
					Math.cos(t) * RADIUS,
					y,
					Math.sin(t) * RADIUS,
				),
				b: new THREE.Vector3(
					Math.cos(t + Math.PI) * RADIUS,
					y,
					Math.sin(t + Math.PI) * RADIUS,
				),
				c1: COLORS[i % 4] ?? "#e59aa6",
				c2: COLORS[(i + 2) % 4] ?? "#8fb89a",
			});
		}
		return out;
	}, []);

	const backbone = useMemo(() => {
		const mk = (off: number) =>
			new THREE.CatmullRomCurve3(
				Array.from({ length: PAIRS * 3 }, (_, k) => {
					const i = k / 3;
					const t = i * TWIST + off;
					return new THREE.Vector3(
						Math.cos(t) * RADIUS,
						(i - PAIRS / 2) * RISE,
						Math.sin(t) * RADIUS,
					);
				}),
			);
		return [mk(0), mk(Math.PI)];
	}, []);

	useFrame((state, delta) => {
		const g = group.current;
		if (!g) return;
		const dt = Math.min(delta, 0.05);
		g.rotation.y += dt * 0.35;
		const tx = state.pointer.y * 0.25;
		const tz = -state.pointer.x * 0.25 + 0.35;
		g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-3 * dt));
		g.rotation.z += (tz - g.rotation.z) * (1 - Math.exp(-3 * dt));
	});

	return (
		<group ref={group} rotation={[0, 0, 0.35]}>
			{backbone.map((curve, i) => (
				<mesh key={i}>
					<tubeGeometry args={[curve, 300, 0.07, 12, false]} />
					<meshPhysicalMaterial
						color="#f4ece4"
						roughness={0.25}
						clearcoat={1}
					/>
				</mesh>
			))}
			{items.map(({ a, b, c1, c2 }, i) => {
				const mid = a.clone().lerp(b, 0.5);
				const dir = b.clone().sub(a);
				const len = dir.length() / 2;
				const quat = new THREE.Quaternion().setFromUnitVectors(
					new THREE.Vector3(0, 1, 0),
					dir.clone().normalize(),
				);
				const m1 = a.clone().lerp(mid, 0.5);
				const m2 = b.clone().lerp(mid, 0.5);
				return (
					<group key={i}>
						<mesh position={m1} quaternion={quat}>
							<cylinderGeometry args={[0.045, 0.045, len, 10]} />
							<meshStandardMaterial color={c1} roughness={0.4} />
						</mesh>
						<mesh position={m2} quaternion={quat}>
							<cylinderGeometry args={[0.045, 0.045, len, 10]} />
							<meshStandardMaterial color={c2} roughness={0.4} />
						</mesh>
						<mesh position={a}>
							<sphereGeometry args={[0.13, 20, 20]} />
							<meshPhysicalMaterial
								color={c1}
								roughness={0.2}
								clearcoat={1}
							/>
						</mesh>
						<mesh position={b}>
							<sphereGeometry args={[0.13, 20, 20]} />
							<meshPhysicalMaterial
								color={c2}
								roughness={0.2}
								clearcoat={1}
							/>
						</mesh>
					</group>
				);
			})}
		</group>
	);
}

function Cells() {
	const cells = useMemo(
		() => [
			{ p: [-2.3, 1.6, -1] as const, s: 0.35, c: "#f2c9cf" },
			{ p: [2.2, -1.8, -0.5] as const, s: 0.28, c: "#c9dfcf" },
			{ p: [2.4, 2.1, -1.5] as const, s: 0.2, c: "#ecd9ad" },
			{ p: [-2.1, -2.2, -1.2] as const, s: 0.22, c: "#c3dbe3" },
		],
		[],
	);
	return (
		<>
			{cells.map((c, i) => (
				<Float
					key={i}
					speed={1.5 + i * 0.3}
					floatIntensity={1.2}
					rotationIntensity={0.6}
				>
					<mesh position={c.p as unknown as THREE.Vector3Tuple}>
						<sphereGeometry args={[c.s, 32, 32]} />
						<meshPhysicalMaterial
							color={c.c}
							transmission={0.6}
							roughness={0.15}
							thickness={0.5}
						/>
					</mesh>
					<mesh position={c.p as unknown as THREE.Vector3Tuple}>
						<sphereGeometry args={[c.s * 0.4, 16, 16]} />
						<meshStandardMaterial color="#c97b88" roughness={0.5} />
					</mesh>
				</Float>
			))}
		</>
	);
}

export default function DNA3D() {
	return (
		<Canvas
			resize={{ offsetSize: true }}
			dpr={[1, 2]}
			camera={{ position: [0.15, 0.08, 6.35], fov: 36 }}
			gl={{ alpha: true, antialias: true }}
		>
			<ambientLight intensity={0.7} />
			<directionalLight position={[4, 6, 5]} intensity={1.6} />
			<directionalLight
				position={[-5, -2, -3]}
				intensity={0.5}
				color="#f2c9cf"
			/>
			<Environment resolution={64}>
				<Lightformer
					intensity={2}
					position={[0, 5, 0]}
					scale={[10, 10, 1]}
				/>
				<Lightformer
					intensity={1}
					color="#f6d8dd"
					position={[-5, 1, -1]}
					rotation-y={Math.PI / 2}
					scale={[20, 1, 1]}
				/>
				<Lightformer
					intensity={1}
					color="#d8eadc"
					position={[5, -1, -1]}
					rotation-y={-Math.PI / 2}
					scale={[20, 1, 1]}
				/>
			</Environment>
			<Helix />
			<Cells />
		</Canvas>
	);
}
