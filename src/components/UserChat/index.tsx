import React from "react"
import styles from "./index.module.less";

interface UserChatProps {
	content: string
}

const UserChat: React.FC<UserChatProps> = ({ content }) => {
	return <div className={styles.userChat}>
		<div className={styles.icon}>
			U
		</div>
		<div>{content}</div>
	</div>;
};

export default UserChat;
