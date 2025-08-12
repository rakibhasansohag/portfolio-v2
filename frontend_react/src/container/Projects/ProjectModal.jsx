import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useIsMobile from '../../hooks/useIsMobile';

import './Projects.scss';

const overlayVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariant = {
	hidden: { opacity: 0, y: 30, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: 'spring', stiffness: 300, damping: 28 },
	},
	exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const ProjectModal = ({ project, onClose }) => {
	const isMobile = useIsMobile(900);
	const [index, setIndex] = useState(0);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	useEffect(() => {
		if (project) setIndex(0);
	}, [project]);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft')
				setIndex((i) => (i - 1 + images.length) % images.length);
			if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
		};
		if (project) {
			document.addEventListener('keydown', onKey);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [project, onClose]);

	if (!project) return null;

	const images =
		project.images && project.images.length
			? project.images
			: project.image
			? [project.image]
			: [];

	// ---------- touch handlers for mobile swipe ----------
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = () => {
		if (touchStartX.current == null || touchEndX.current == null) return;
		const diff = touchStartX.current - touchEndX.current;
		const threshold = 40; // px to consider swipe
		if (diff > threshold) {
			// swipe left -> next
			setIndex((i) => (i + 1) % images.length);
		} else if (diff < -threshold) {
			// swipe right -> prev
			setIndex((i) => (i - 1 + images.length) % images.length);
		}
		touchStartX.current = null;
		touchEndX.current = null;
	};

	return createPortal(
		<AnimatePresence>
			<motion.div
				className='modal-overlay'
				variants={overlayVariant}
				initial='hidden'
				animate='visible'
				exit='hidden'
				onClick={onClose}
			>
				<motion.div
					className='modal-wrapper'
					variants={modalVariant}
					initial='hidden'
					animate='visible'
					exit='exit'
					onClick={(e) => e.stopPropagation()}
				>
					<button
						className='modal-close'
						onClick={onClose}
						aria-label='Close modal'
					>
						<FiX />
					</button>

					<div className='modal-content'>
						<div className='modal-left'>
							{/* MOBILE: swipeable carousel (only shows on mobile via CSS + isMobile logic) */}
							{isMobile ? (
								<div
									className='mobile-carousel'
									onTouchStart={handleTouchStart}
									onTouchMove={handleTouchMove}
									onTouchEnd={handleTouchEnd}
								>
									{images.length > 1 && (
										<button
											className='gallery-nav left'
											onClick={() =>
												setIndex((i) => (i - 1 + images.length) % images.length)
											}
											aria-hidden={!isMobile}
										>
											<FiChevronLeft />
										</button>
									)}

									<motion.img
										key={images[index]}
										src={images[index]}
										alt={`${project.title} - ${index + 1}`}
										initial={{ opacity: 0, x: 30 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -30 }}
										transition={{ duration: 0.28 }}
										loading='lazy'
									/>

									{images.length > 1 && (
										<button
											className='gallery-nav right'
											onClick={() => setIndex((i) => (i + 1) % images.length)}
											aria-hidden={!isMobile}
										>
											<FiChevronRight />
										</button>
									)}

									{/* dots */}
									{images.length > 1 && (
										<div className='carousel-dots'>
											{images.map((_, i) => (
												<button
													key={i}
													className={`dot ${i === index ? 'active' : ''}`}
													onClick={() => setIndex(i)}
													aria-label={`Show image ${i + 1}`}
												/>
											))}
										</div>
									)}
								</div>
							) : (
								// DESKTOP: show all images (or whatever layout you prefer)
								<div className='desktop-images'>
									{images.map((src, i) => (
										<img
											key={i}
											src={src}
											alt={`${project.title} - ${i + 1}`}
											loading='lazy'
										/>
									))}
								</div>
							)}
						</div>

						<div className='modal-right'>
							<h3>{project.title}</h3>
							<p className='modal-short'>{project.short}</p>

							<div className='modal-section'>
								<h4>About this project</h4>
								{project.longDescription &&
								project.longDescription.length > 0 ? (
									project.longDescription.map((para, i) => (
										<p key={i} className='modal-description'>
											{para}
										</p>
									))
								) : (
									<p className='modal-description'>{project.solution}</p>
								)}
							</div>

							<div className='modal-section'>
								<h4>Tech stack</h4>
								<ul className='stack-list'>
									{project.stack?.map((s, i) => (
										<li key={i}>{s}</li>
									))}
								</ul>
							</div>

							<div className='modal-section'>
								<h4>Challenges</h4>
								<ul>
									{project.challenges?.map((c, i) => (
										<li key={i}>{c}</li>
									))}
								</ul>
							</div>

							<div className='modal-section'>
								<h4>How I solved it</h4>
								<p>{project.solution}</p>
							</div>

							<div className='modal-actions'>
								<a
									href={project.github}
									target='_blank'
									rel='noopener noreferrer'
									className='btn ghost'
								>
									View Code
								</a>
								<a
									href={project.live}
									target='_blank'
									rel='noopener noreferrer'
									className='btn ghost'
								>
									Visit Live
								</a>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		document.body,
	);
};

export default ProjectModal;
