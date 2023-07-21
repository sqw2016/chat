import React from 'react';

import styles from "./index.module.less";

const ChatInput: React.FC = () => {
	const onChange = (e) => {
		const textarea = e.target;
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	};

	return <textarea className={styles.textarea} onChange={onChange} rows="1" />;
}

export default ChatInput;
