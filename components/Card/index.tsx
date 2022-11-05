import styles from './Card.module.css';

type CardProps = {
	title?: string;
	bgColor?: string;
} & React.ButtonHTMLAttributes<HTMLObjectElement>;

const Card: React.FunctionComponent<CardProps> = (props) => {
	const bgColor =
		props.bgColor ||
		'bg-background-light-secondary dark:bg-background-dark-secondary';
	return (
		<div className={`${styles.root} ${bgColor}`}>
			<div className={styles.title}>{props.title}</div>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

export default Card;
