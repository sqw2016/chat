import styles from "./index.module.less";

const UserChat = ({ content }) => {
	return <div className={styles.userChat}>
		<div className={styles.icon}>
			U
		</div>
		<div>{content}</div>
	</div>;
};

export default UserChat;
