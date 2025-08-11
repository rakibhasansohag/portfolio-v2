import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.scss';
import AppWrap from '../../wrapper/AppWrap';

import { renderCanvas } from './renderCanvas';
import { Phone } from './Phone';

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const words = ['Front-End Developer', 'Back-End Developer', 'Problem Solver'];

const Header = () => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentWordIndex((prevIndex) =>
				prevIndex === words.length - 1 ? 0 : prevIndex + 1,
			);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		renderCanvas();
	}, []);

	const wordColors = words.map((_, index) =>
		index === currentWordIndex
			? `hsl(${(360 / words.length) * index}, 70%, 50%)`
			: 'black',
	);
	return (
		<div className='app__header app__flex'>
			<motion.div
				whileInView={{ x: [-100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className='app__header-info'
			>
				<span>
					HELLO
					<motion.div
						className='hello'
						role='img'
						aria-label='Waving Hand'
						animate={{ rotate: [0, -20, 0, 20, 0], scale: [1, 1.2, 1, 1.2, 1] }}
						transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
					>
						👋
					</motion.div>
					, I'M <br />
				</span>
				<h2> Rakib Hasan Sohag </h2>
				<p>
					A highly skilled{' '}
					<motion.span>
						{/* Non-animated span for other words (i don't know something will updated ) */}
					</motion.span>
					{words.map((word, index) => (
						<motion.span
							key={index}
							animate={{ color: wordColors[index] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								repeatType: 'loop',
								delay: 0,
							}}
							style={{
								display: index === currentWordIndex ? 'inline' : 'none',
							}}
						>
							{word}
						</motion.span>
					))}
					.
				</p>
			</motion.div>

			<motion.div
				className='app__header-phone'
				variant={scaleVariants}
				whileInView={scaleVariants.whileInView}
			>
				<Phone />
			</motion.div>
			<canvas id='canvas'></canvas>
		</div>
	);
};

export default AppWrap(Header, 'home');
