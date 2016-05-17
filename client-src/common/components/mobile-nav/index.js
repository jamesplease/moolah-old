import yo from 'yo-yo';
import Nav from '../nav';

export default () => {
  return yo`
    <div className="mobile-nav">
      ${Nav()}
    </div>
  `;
};
