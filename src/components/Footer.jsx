// Footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter, faPinterest, faLinkedin} from "@fortawesome/free-brands-svg-icons";

import { getYear } from '../utilities/getDates';

const Footer = ({ copyright, author }) => (
	<footer>
        <div className='quicklink-wrapper'>
            <ul className='quicklink-list'>
                <li>
                    <a href="#" className='quicklink-link'>FAQ</a>
                </li>
                <li>
                    <a href="#" className='quicklink-link'>Help Center</a>
                </li><li>
                    <a href="#" className='quicklink-link'>Terms of Use</a>
                </li><li>
                    <a href="#" className='quicklink-link'>Privacy</a>
                </li>
            </ul>
            <ul className='social-list'>
                <li>
                    <a href="#" className='social-link'><FontAwesomeIcon icon={faFacebookF} className="fb-icon"/></a>
                </li>
                <li>
                    <a href="#" className='social-link'><FontAwesomeIcon icon={faXTwitter} className="x-icon"/></a>
                </li>
                <li>
                    <a href="#" className='social-link'><FontAwesomeIcon icon={faPinterest} className="pinterest-icon"/></a>
                </li>
                <li>
                    <a href="#" className='social-link'><FontAwesomeIcon icon={faLinkedin} className="linkedin-icon"/></a>
                </li>
            </ul>
        </div>
        <p>&copy; {copyright} {author}</p>
    </footer>
);

Footer.defaultProps = {
    author: 'Awesome Corp.',
    copyright: getYear()
}

export default Footer;