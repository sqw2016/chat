import React from "react"
import MarkdownView from "@/components/GPTChat/MarkdownView";
import gptIcon from "@/assets/chatgpt-icon.svg"

import styles from "./index.module.less";

interface GPTChatProps {
	content: string
	onOver?: () => void,
	isNew: boolean
}

const GPTChat: React.FC<GPTChatProps> = ({content, onOver, isNew }) => {
	return (
		<div className={styles.gptChat}>
			<div className={styles.icon}>
				<img src={gptIcon} alt=""/>
			</div>
			<MarkdownView onOver={onOver} isNew={isNew} content={content} />
		</div>
	);
};

export default GPTChat;
