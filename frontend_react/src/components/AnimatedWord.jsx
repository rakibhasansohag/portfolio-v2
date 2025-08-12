import { motion } from 'framer-motion';

export default function AnimatedWord({ text, color }) {
	const letters = text.split('');

	const container = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.05 },
		},
	};

	const child = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.span
			style={{ display: 'inline-block', whiteSpace: 'pre' }}
			variants={container}
			initial='hidden'
			animate='visible'
			key={text}
		>
			{letters.map((char, i) => (
				<motion.span key={i} variants={child} style={{ color }}>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}
