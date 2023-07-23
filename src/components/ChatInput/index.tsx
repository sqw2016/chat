import React, {useRef, useEffect} from 'react';
import SendIcon from "@/components/SVGIcons/SendIcon"
import Loading from "@/components/SVGIcons/Loading"

import styles from "./index.module.less";

const ChatInput: React.FC = ({value, onChange, loading, onSubmit}) => {
	const ref = useRef()

	useEffect(() => {
		const textarea = ref.current;
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + "px";
	}, [value])


	return <div className={styles.inputContainer}>
		<textarea ref={ref} value={value} className={styles.textarea} onChange={onChange} rows="1" />
		{!loading && <SendIcon className={styles.btn} onClick={onSubmit} />}
		{loading && <Loading className={styles.loading} />}
	</div>;
}

export default ChatInput;
