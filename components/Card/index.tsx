import styles from './Card.module.css';

type CardProps = {
	title?: string;
	className?: string;
} & React.ButtonHTMLAttributes<HTMLObjectElement>;

const Card: React.FunctionComponent<CardProps> = (props) => {
	return (
		<div
			className={`${styles.root} bg-background-light-secondary dark:bg-background-dark-secondary ${props.className}`}
		>
			<div className={styles.title}>{props.title}</div>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

export default Card;
