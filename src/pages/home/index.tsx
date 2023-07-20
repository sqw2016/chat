import ChatInput from "@/components/ChatInput";

import styles from './index.module.less';

const Home = () => (
	<div className={styles.container}>
		<div className={styles.header}>
			<label htmlFor="size">
				请选择字数限制
				<select name="size">
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
					<option value="400">400</option>
					<option value="500">500</option>
				</select>
			</label>
			<label htmlFor="style">
				请选择文风
				<select name="style">
					<option value="1">抖音</option>
					<option value="2">微博</option>
				</select>
			</label>
		</div>
		<div className={styles.content}>body</div>
		<div className={styles.input}>
			<ChatInput />
		</div>
	</div>
);

export default Home
