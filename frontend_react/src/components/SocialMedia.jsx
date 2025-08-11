import React from 'react';

import { BsGithub } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const SocialMedia = () => {
	return (
		<div className='app__social'>
			<div>
				<a
					href='https://www.linkedin.com/in/rakib-hasan-sohag'
					target='_blank'
					rel='noreferrer'
				>
					<FaLinkedinIn />
				</a>
			</div>
			<div>
				<a
					href='https://www.facebook.com/RakibHasanSohag133'
					target='_blank'
					rel='noreferrer'
				>
					<FaFacebookF />
				</a>
			</div>
			<div>
				<a
					href='https://github.com/devoloper-rakib'
					target='_blank'
					rel='noreferrer'
				>
					<BsGithub />
				</a>
			</div>
		</div>
	);
};

export default SocialMedia;
