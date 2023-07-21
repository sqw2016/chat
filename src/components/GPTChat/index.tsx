import MarkdownView from "@/components/GPTChat/MarkdownView";
import gptIcon from "@/assets/chatgpt-icon.svg"

import styles from "./index.module.less";

const GPTChat = () => {
	return (
		<div className={styles.gptChat}>
			<div className={styles.icon}>
				<img src={gptIcon} alt=""/>
			</div>
			<MarkdownView />
		</div>
	);
};

export default GPTChat;
