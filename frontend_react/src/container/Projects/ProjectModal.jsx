import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const overlayVariant = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

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
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'Escape') onClose();
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
					onClick={(e) => e.stopPropagation()} // prevent overlay click bubbling
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
							<img
								src={project.images?.[0]}
								alt={project.title}
								loading='lazy'
							/>
							<img
								src={project.images?.[1]}
								alt={project.title}
								loading='lazy'
							/>
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
									{project.stack.map((s, i) => (
										<li key={i}>{s}</li>
									))}
								</ul>
							</div>

							<div className='modal-section'>
								<h4>Challenges</h4>
								<ul>
									{project.challenges.map((c, i) => (
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
