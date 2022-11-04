import { PropsWithChildren } from 'react';
import styles from './CardContainer.module.css';

const CardContainer: React.FunctionComponent<PropsWithChildren> = (props) => {
	return <div className={styles.root}>{props.children}</div>;
};

export default CardContainer;
